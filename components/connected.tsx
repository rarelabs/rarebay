import React, { Fragment, useState, useEffect, useContext, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useActiveAccount, useActiveWalletChain, useWalletBalance, useDisconnect, useActiveWallet, useSwitchActiveWalletChain } from 'thirdweb/react';
import { truncateAddress } from '../utils/truncateAddress';
import { useToast } from '../utils/toast';
import { AccountProvider, AccountName } from 'thirdweb/react';
import { client } from '../lib/thirdweb-client';
import useCopyToClipboard from './copy';
import Skeleton from './Skeleton/Skeleton';
import Spinner from './spinner';
import { TokenContext } from '../lib/tokenContext';
import { useBackground } from '../lib/context';
import Settings from './settings';
import { LayoutProvider, useLayout } from '../lib/laytoutContext';
import NFTGallery from './NFTs';
import TokenB from './tokens';
import Token from '../types/token';
import { balanceOf } from 'thirdweb/extensions/erc20';
import { getContract } from 'thirdweb';

// Define prop types for Connected component.
interface ConnectedProps {
  text5?: React.ReactElement;
  rootClassName?: string;
  text?: React.ReactElement;
  text4?: React.ReactElement;
  text2?: React.ReactElement;
  text1?: React.ReactElement;
  text3?: React.ReactElement;
  proMode?: any;
  closeModal4?: () => void;
}

const Connected: React.FC<ConnectedProps> = (props) => {
  const { toggleLayout, proMode, togglePro } = useLayout();
  const account = useActiveAccount();
  const address = account?.address;
  const { addToast } = useToast();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { copyToClipboard } = useCopyToClipboard();

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const handleCopyClick = () => {
    copyToClipboard(address || '').then((success) => {
      if (success) {
        addToast('success', 'Address copied');
      } else {
        addToast('error', 'Failed to copy address.');
      }
    });
  };

  const { currentChain, changeChain, availableChains, token1, setToken1, token2, setToken2 } = useContext(TokenContext);
  const [newChainId, setNewChainId] = useState<number | undefined>(undefined);

  // Assuming balance has displayValue and symbol
  const { data: balance, isLoading, isError } = useWalletBalance({
    chain: currentChain,
    address: address || '',
    client: client,
  });

  const [isMasked, setIsMasked] = useState<boolean>(true);
  const [coreData, setCoreData] = useState<{ price: number | null; change: number | null }>({ price: null, change: null });
  const [totalValue, setTotalValue] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen3, setIsModalOpen3] = useState<boolean>(false);

  const openModal3 = () => {
    setIsModalOpen3(true);
    console.log("Modal opened");
  };

  const closeModal3 = () => setIsModalOpen3(false);

  useEffect(() => {
    const fetchCoreData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=coredaoorg&vs_currencies=usd&include_24hr_change=true"
        );
        const data = await response.json();
        const price = data.coredaoorg.usd;
        const change = data.coredaoorg.usd_24h_change;
        setCoreData({ price, change });
        // Multiply balance's displayValue (assumed to be string) by price.
        const value = balance ? Number(balance.displayValue) * price : 0;
        setTotalValue(value);
      } catch (err) {
        setError("Failed to fetch CORE data");
        console.error(err);
      }
    };

    fetchCoreData();
  }, [balance]);

  const formatChange = (change: number): JSX.Element => {
    const formattedChange = change.toFixed(2);
    const color = change > 0 ? "green" : "red";
    const sign = change > 0 ? "+" : "";
    return <span style={{ color }}>{sign}{formattedChange}%</span>;
  };

  const toggleBalanceDisplay = () => {
    setIsMasked((prevState) => !prevState);
  };

  async function calculateCoreValue(): Promise<number | undefined> {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=coredaoorg&vs_currencies=usd');
      const data = await response.json();
      const corePriceInUSD = data.coredaoorg.usd;
      const totalVal = balance ? Number(balance.displayValue) * corePriceInUSD : 0;
      console.log(`CORE Price: $${corePriceInUSD}`);
      console.log(`Total Value: $${totalVal.toFixed(2)}`);
      return totalVal;
    } catch (error) {
      console.error('Error fetching CORE price:', error);
      return undefined;
    }
  }

  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();

  const handleChainChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newChainId = Number(event.target.value);
    changeChain(newChainId);
  };

  const [isModalOpen5, setIsModalOpen5] = useState<boolean>(false);

  const openModal5 = () => {
    setIsModalOpen5(true);
    console.log("Modal opened");
  };

  const closeModal5 = () => setIsModalOpen5(false);
  const act = useActiveWalletChain();

  // New function to fetch balances for an array of tokens.
  const fetchBalances = async (tokens: Token[], accountAddress: string, currentChain: string): Promise<Record<string, string>> => {
    const balances: Record<string, string> = {};

    for (const token of tokens) {
      const tokenContract = getContract({
        client: client,
        chain: currentChain as any,
        address: token.address,
      });

      try {
        const bal = await balanceOf({
          contract: tokenContract,
          address: accountAddress,
        });
        balances[token.address] = bal.toString();
      } catch (error) {
        console.error(`Failed to fetch balance for token ${token.name}:`, error);
        balances[token.address] = '0';
      }
    }

    return balances;
  };

  const refetchBalance = useCallback(
    () => {
      // Assuming token1 is defined and fetchBalance is defined elsewhere.
      fetchBalance(token1).then((bal) => {
        console.log("Fetched balance:", bal);
      });
    },
    [token1, currentChain, account]
  );

  // Single token balance fetch function.
  const fetchBalance = async (tokenIn: Token): Promise<string> => {
    const tokenContract = getContract({
      client,
      chain: currentChain as any,
      address: tokenIn.address,
    });
    try {
      const bal = await balanceOf({
        contract: tokenContract,
        address: account?.address || '',
      });
      return bal.toString();
    } catch (error) {
      console.error(`Failed to fetch balance for token ${tokenIn.name}:`, error);
      return '0';
    }
  };

  return (
    <>
      {isModalOpen3 && (
        <div style={{ position: 'fixed', zIndex: '900', height: '100%', right: '0px', width: '100%', overflow: 'hidden' }}>
          <Settings proMode={props.proMode} toggleLayout={props.proMode && toggleLayout} closeModal3={closeModal3 as any} />
        </div>
      )}
      {isModalOpen5 && (
        <div className='modal'>
          <div className='modal-content'>
            <div className='x' onClick={closeModal5}>
              <svg width="24" height="24" viewBox="0 0 32 32">
                <path
                  d="M2 6v20a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2m2 0h16v20H4v-9h10.17l-3.58 3.59L12 22l6-6l-6-6l-1.41 1.41L14.17 15H4z"
                  fill="currentColor"
                ></path>
              </svg>
              back
            </div>
            <hr />
            <hr />
            <h3>Select network</h3>
            <p className='note'>Switch to your network of choice</p>
         <div style={{width: '100%', justifyContent: 'start', display: 'flex', flexDirection: 'column', textAlign: 'start'}}>
         {availableChains?.map((chain) => (
              <ul key={chain.id}>
                <li style={{ listStyle: 'none' }} value={chain}>
                  {chain?.id === 1116 ? (
                    <div
                      onClick={() => {
                        currentChain.id!==1116 ? changeChain(1116) : addToast('info', 'Already on Mainnet');
                        closeModal5();
                      }}
                      style={{
                        display: 'flex',
                        gap: '10px',
                        padding: '10px',
                        width: '100%',
                        textAlign: 'start',
                        borderRadius: '10px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: currentChain.id===1116 ? 'green 1px solid' : 'solid 1px rgba(50, 50, 50)'
                      }}
                    >
                      <div className='col'>
                        <div className='center'>
                          <img src={'/core-200w.webp'} width={24} alt="CORE Mainnet" />
                          <p>CORE Mainnet🟢</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        gap: '10px',
                        padding: '10px',
                        width: '100%',
                        textAlign: 'start',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: currentChain.id===1115 ? 'orange 1px solid' : 'solid 1px rgba(50, 50, 50)',
                        borderRadius: '10px'
                      }}
                    >
                      <div
                        onClick={() => {
                          currentChain.id!==1115 ? changeChain(1115) : addToast('info', 'Already on Testnet');
                          closeModal5();
                        }}
                        className='col'
                      >
                        <div className='center'>
                          <img src={'/core-200w.webp'} width={24} alt="CORE Testnet" />
                          <p>CORE Testnet🟠</p>
                        </div>
        
                      </div>
                    </div>
                  )}
                  <hr />
                </li>
              </ul>
            ))}
         </div>
          </div>
        </div>
      )}
      <div className={`connected-connected ${props.rootClassName || ''}`}>
        <div className="connected-container10">
          <span>
            {props.text ?? (
              <Fragment>
                <span className="connected-text17">
                  {address ? (
                    <>
                      <div className='center' style={{ display: 'flex', gap: '10px' }} onClick={openModal5}>
                        <img src={act?.icon?.url || '/core-200w.webp'} width={24} alt="Chain Icon" />
                        {act?.id === 1116 && <p>CORE</p>}
                        {act?.id === 1115 && <p>TestCORE</p>}
                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g strokeWidth="0"></g>
                          <g strokeLinecap="round" strokeLinejoin="round"></g>
                          <g>
                            <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" fill="#949494"></path>
                          </g>
                        </svg>
                      </div>
                    </>
                  ) : 'Disconnected🔴'}
                </span>
              </Fragment>
            )}
          </span>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px' }}>
          <svg onClick={openModal3} width="24" height="24" viewBox="0 0 24 24" className="token-header-icon21">
            <path d="m21.32 9.55l-1.89-.63l.89-1.78A1 1 0 0 0 20.13 6L18 3.87a1 1 0 0 0-1.15-.19l-1.78.89l-.63-1.89A1 1 0 0 0 13.5 2h-3a1 1 0 0 0-.95.68l-.63 1.89l-1.78-.89A1 1 0 0 0 6 3.87L3.87 6a1 1 0 0 0-.19 1.15l.89 1.78l-1.89.63a1 1 0 0 0-.68.94v3a1 1 0 0 0 .68.95l1.89.63l-.89 1.78A1 1 0 0 0 3.87 18L6 20.13a1 1 0 0 0 1.15.19l1.78-.89l.63 1.89a1 1 0 0 0 .95.68h3a1 1 0 0 0 .95-.68l.63-1.89l1.78.89a1 1 0 0 0 1.13-.19L20.13 18a1 1 0 0 0 .19-1.15l-.89-1.78l1.89-.63a1 1 0 0 0 .68-.94v-3a1 1 0 0 0-.68-.95M20 12.78l-1.2.4A2 2 0 0 0 17.64 16l.57 1.14l-1.1 1.1l-1.11-.6a2 2 0 0 0-2.79 1.16l-.4 1.2h-1.59l-.4-1.2A2 2 0 0 0 8 17.64l-1.14.57l-1.1-1.1l.6-1.11a2 2 0 0 0-1.16-2.82l-1.2-.4v-1.56l1.2-.4A2 2 0 0 0 6.36 8l-.57-1.11l1.1-1.1L8 6.36a2 2 0 0 0 2.82-1.16l.4-1.2h1.56l.4 1.2A2 2 0 0 0 16 6.36l1.14-.57l1.1 1.1l-.6 1.11a2 2 0 0 0 1.16 2.79l1.2.4ZM12 8a4 4 0 1 0 4 4a4 4 0 0 0-4-4m0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2" fill="currentColor"></path>
          </svg>
          <svg
            onClick={() => {
              addToast('success', 'Wallet disconnected');
              disconnect(wallet);
            }}
            fill="lightgray"
            width="20px"
            height="20px"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M400 54.1c63 45 104 118.6 104 201.9 0 136.8-110.8 247.7-247.5 248C120 504.3 8.2 393 8 256.4 7.9 173.1 48.9 99.3 111.8 54.2c11.7-8.3 28-4.8 35 7.7L162.6 90c5.9 10.5 3.1 23.8-6.6 31-41.5 30.8-68 79.6-68 134.9-.1 92.3 74.5 168.1 168 168.1 91.6 0 168.6-74.2 168-169.1-.3-51.8-24.7-101.8-68.1-134-9.7-7.2-12.4-20.5-6.5-30.9l15.8-28.1c7-12.4 23.2-16.1 34.8-7.8zM296 264V24c0-13.3-10.7-24-24-24h-32c-13.3 0-24 10.7-24 24v240c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24z"/>
          </svg>
          <svg width="24" height="24" viewBox="0 0 32 32" onClick={props.closeModal4}>
            <path
              d="M2 6v20a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2m2 0h16v20H4v-9h10.17l-3.58 3.59L12 22l6-6l-6-6l-1.41 1.41L14.17 15H4z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        </div>
        <div className="connected-container11">
          <div className="connected-container12">
            <div className="connected-container13">
              <img src="/RAR31ONES (3).jpg" style={{ borderRadius: '100px', height: '42px', width: '42px', objectFit: 'cover' }} alt="User avatar" />
            </div>
           
<div className='center-c' style={{justifyContent: 'start'}} >
  <span> {props.text5 ?? (
                <Fragment>
                  <span className="connected-text16">{truncateAddress(address || '')}</span>
                </Fragment>
              )}
            </span>
            <AccountProvider address={address || ''} client={client} >
              <AccountName loadingComponent={<Skeleton width='100px' height='20px' />} style={{fontSize: '12px', opacity: '0.5'}} />
            </AccountProvider>
</div>
          </div>
          <svg width="20" height="20" viewBox="0 0 48 48" onClick={handleCopyClick}>
            <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round">
              <path d="M13 12.432v-4.62A2.813 2.813 0 0 1 15.813 5h24.374A2.813 2.813 0 0 1 43 7.813v24.375A2.813 2.813 0 0 1 40.188 35h-4.672" strokeLinecap="round"></path>
              <path d="M32.188 13H7.811A2.813 2.813 0 0 0 5 15.813v24.374A2.813 2.813 0 0 0 7.813 43h24.375A2.813 2.813 0 0 0 35 40.188V15.811A2.813 2.813 0 0 0 32.188 13Z"></path>
            </g>
          </svg>
        </div>
        <br />
        <div className="connected-container14">
          <span className="connected-text12">
            {props.text1 ?? (
              <Fragment>
                <span className="connected-text20">
                  {isMasked ? (
                    <>
                      <h2>${Number(coreData?.price! * Number(balance?.displayValue)).toFixed(3)}</h2>
                      <h5 style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center' }}>
                        {Number(balance?.displayValue).toFixed(3)} {balance?.symbol} <img src='/core-200w.webp' width={16} alt="CORE" />
                      </h5>
                    </>
                  ) : '*********'}
                </span>
                <br/>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px', flexDirection: 'column' }}>
                  <br />
                  <p style={{ color: 'lightgray', fontSize: '14px' }}>
                    Price: ${coreData.price && coreData.price.toFixed(2)}
                  </p> 
                  <p style={{ color: 'lightgray', fontSize: '14px' }}>
                    24h Change: {coreData.change !== null && formatChange(coreData.change) || 0.0}
                  </p>
                  <br />
                </div>
              </Fragment>
            )}
          </span>
          <svg width="24" height="24" viewBox="0 0 24 24" onClick={toggleBalanceDisplay}>
            <path d="m19.5 16l-2.475-3.396M12 17.5V14m-7.5 2l2.469-3.388M3 8c3.6 8 14.4 8 18 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
        <br />
        <div className="connected-container15">
          <span className="connected-text13">
            {props.text2 ?? (
              <Fragment>
                <span className="connected-text19">Tokens</span>
              </Fragment>
            )}
          </span>
          <span className="connected-text14">
            {props.text3 ?? (
              <Fragment>
                <span className="connected-text21">NFT</span>
              </Fragment>
            )}
          </span>
          <span className="connected-text15">
            {props.text4 ?? (
              <Fragment>
                <span className="connected-text18">History</span>
              </Fragment>
            )}
          </span>
        </div>
        <div className="connected-container16">
          <TokenB 
            fetchBalance={fetchBalances} 
            accountAddress={account?.address || ''} 
            onSelect={(token: Token) => {
              // Implement your onSelect functionality here.
              console.log("Selected token:", token);
            }} 
            setModal={undefined} 
          />
        </div>
        <div className="connected-container17">
          <p style={{fontSize: '10px'}}>By connecting your wallet, you agree to RareBay terms</p>
        </div>
      </div>
      <style jsx>
        {`
          .connected-connected {
            flex: 0 0 auto;
            color: gray;
            width: 450px;
            cursor: pointer;
            height: 100%;
            display: flex;
            z-index: 500;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            right: 0px;
            position: fixed;
            align-items: center;
            border-color: rgba(175, 175, 175, 0.26);
            border-width: 1px;
            flex-direction: column;
            backdrop-filter: blur(30px);
            justify-content: flex-start;
            border-top-width: 0px;
            border-right-width: 1px;
            border-bottom-width: 0px;
          }
          .connected-container10 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            padding: var(--dl-space-space-unit);
            align-items: center;
            border-color: rgba(41, 41, 41, 0.15);
            border-width: 1px;
            justify-content: space-between;
            border-top-width: 0px;
            border-left-width: 0px;
            border-right-width: 0px;
          }
          .connected-container11 {
            width: 100%;
            height: 63px;
            display: flex;
            padding: var(--dl-space-space-unit);
            align-items: center;
            border-color: rgba(41, 41, 41, 0.15);
            border-width: 1px;
            flex-direction: row;
            justify-content: space-between;
            border-top-width: 0px;
            border-left-width: 0px;
            border-right-width: 0px;
          }
          .connected-container12 {
            gap: var(--dl-space-space-unit);
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .connected-container13 {
            flex: 0 0 auto;
            width: var(--dl-size-size-small);
            height: var(--dl-size-size-small);
            display: flex;
            align-items: center;
            justify-content: center;
            border-color: rgba(120, 120, 120, 0.4);
            border-style: dashed;
            border-radius: 100px;
            background-image: linear-gradient(
              to right,
              #fc00ff 0%,
              #00dbde 100%
            );
          }
          .connected-container14 {
            width: 100%;
            height: auto;
            display: flex;
            padding: var(--dl-space-space-unit);
            align-items: center;
            border-color: rgba(41, 41, 41, 0.15);
            border-width: 1px;
            flex-direction: row;
            justify-content: space-between;
            border-top-width: 0px;
            border-left-width: 0px;
            border-right-width: 0px;
          }
          .connected-text12 {
            font-size: 20px;
            width: 100%;
          }
          .connected-container15 {
            gap: var(--dl-space-space-unit);
            flex: 0 0 auto;
            width: 100%;
            cursor: pointer;
            height: auto;
            display: flex;
            position: relative;
            align-items: center;
            border-color: rgba(120, 120, 120, 0.4);
            border-width: 1px;
            justify-content: flex-start;
            border-top-width: 0px;
            border-left-width: 0px;
            border-right-width: 0px;
          }
          .connected-text13 {
            padding: var(--dl-space-space-halfunit);
            
            border-color: #b3b3b3;
            border-width: 1px;
            border-top-width: 0px;
            border-left-width: 0px;
            border-right-width: 0px;
            border-bottom-width: 4px;
          }
          .connected-text14 {
            padding: var(--dl-space-space-halfunit);
            
            border-color: #b3b3b3;
            border-width: 1px;
            border-top-width: 0px;
            border-left-width: 0px;
            border-right-width: 0px;
            border-bottom-width: 0px;
          }
          .connected-text15 {
            padding: var(--dl-space-space-halfunit);
            
            border-color: #b3b3b3;
            border-width: 1px;
            border-top-width: 0px;
            border-left-width: 0px;
            border-right-width: 0px;
            border-bottom-width: 0px;
          }
          .connected-container16 {
            width: 100%;
            height: 80%;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: flex-start;
            flex-direction: column;
            overflow: scroll;
          }
          .connected-container17 {
            gap: var(--dl-space-space-oneandhalfunits);
            flex: 0 0 auto;
            width: 100%;
            padding: 10px;
            font-size: 10px;
            font-style: italic;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .connected-container18 {
            flex: 0 0 auto;
            width: 80%;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .connected-container19 {
            gap: var(--dl-space-space-unit);
            flex: 0 0 auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: center;
            justify-content: flex-start;
          }
          .connected-text16 {
            display: inline-block;
          }
          .connected-text17 {
            display: inline-block;
          }
          .connected-text18 {
            display: inline-block;
          }
          .connected-text19 {
            display: inline-block;
          }
          .connected-text20 {
            display: inline-block;
          }
          .connected-text21 {
            display: inline-block;
          }
          @media (max-width: 479px) {
            .connected-connected {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  );
};

export default Connected;
