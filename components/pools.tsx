import React, { Fragment, useState, useEffect, useRef,  useCallback } from 'react'

import PropTypes from 'prop-types'
import { client } from '../lib/thirdweb-client';
import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";
import { useConnectModal, useActiveAccount, darkTheme, useSendTransaction } from "thirdweb/react";
import TokenSelect from './select';
import TokenSelectt from './select-test';
import {FACTORY_CONTRACT, getAmmContract, tokens, FACTORY_CONTRACTT, tokenst, getAmmContractt } from '../lib/tokenContext';
import { useToast } from '../utils/toast';
import { TokenContext
 } from '../lib/tokenContext';
 import { useContext } from 'react';
 import { approve } from "thirdweb/extensions/erc20";

import { allowance as thirdwebAllowance, balanceOf } from "thirdweb/extensions/erc20";
import Token from '../types/token';
import { Address, toTokens, toUnits, toWei, getContract as thirdwebGetContract, toEther, PreparedTransaction, prepareContractCall, prepareTransaction } from "thirdweb";
import { useReadContract } from "thirdweb/react";
import TransactionButton from "./SwapButton";
import { getUniswapV3Pool, exactInputSingle } from "thirdweb/extensions/uniswap";
import { ethers } from 'ethers';


type PoolData = [Address, Address, Address, Address, bigint]; // [token1, token2, poolAddress, oracleAddress, feeRate]

export function formatNumber(value: number | string | bigint, decimals: number = 3): string {
  let num: number;

  if (typeof value === "bigint") {
    num = Number(value); // Convert bigint to number safely
  } else if (typeof value === "string") {
    num = parseFloat(value); // Ensure it's a number
  } else {
    num = value;
  }

  return num.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

const Pools = (props: { rootClassName: any; imageAlt: string; button7: any; button: any; button6: any; button5: any; button8: any; button72: any; button4: any; }) => {
  const { currentChain, changeChain, availableChains } = useContext(TokenContext);
  const [poolAddress, setPoolAddress] = useState<Address>('0x5b1670639F70645D207d23e97D097BD9E8620c4b');

  const [isBuy, setIsBuy] = useState<boolean | null>(null);
  const [clicked, setClicked] = useState(false);

  const [focusedInput, setFocusedInput] = useState<number | null>(null);
  const [outputAmount, setOutputAmount] = useState<string>('');
  const account = useActiveAccount();
  const address = account?.address;
  const [showModal, setShowModal] = useState(false);
  const { token1, setToken1, token2, setToken2, getMinimumAmount } = useContext(TokenContext);
  const [activeSelector, setActiveSelector] = useState(null);
  const [reversed, setReversed] = useState(false); // State for reverse swap
  const [standard, setStandard] = useState(true); // State for standard swap
  const [inputAmount, setInputAmount] = useState<string>(''); // For user input
  const [inputAmount1, setInputAmount1] = useState<string>(''); // For user input
  const [slippage, setSlippage] = useState(0.1); // Set default slippage (1%)
  const {addToast} = useToast();
  const [minOutput, setMinOutput] = useState<string>('0'); // For user input
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const inputToken = reversed ? token2 : token1;
  const factoryContract = FACTORY_CONTRACT();
const factoryContractt = FACTORY_CONTRACTT();
const outputToken = reversed ? token1 : token2;

  const { data: fetchedPoolAddress, isPending: wait } = useReadContract({
    contract: currentChain.id===1116?factoryContract : factoryContractt,
    method: "getPair",
    params: [inputToken?.address, outputToken?.address],
  });
  const wallets = [
    inAppWallet({
      auth: {
        options: [
          "guest",
          "passkey",
        ],
      },
    }),
    createWallet("io.metamask"),
    createWallet("com.bitget.web3"),
    createWallet("com.okex.wallet"),
    createWallet("pro.tokenpocket"),
  ];
  const { connect, isConnecting } = useConnectModal();

  useEffect(() => {
    if (fetchedPoolAddress && fetchedPoolAddress !== "0x0000000000000000000000000000000000000000") {
      setPoolAddress(fetchedPoolAddress as Address);
    } else {
      // Set default pool address if none found
      setPoolAddress(currentChain?.id === 1116 
        ? "0x0000000000000000000000000000000000000000" 
        : "0x0000000000000000000000000000000000000000");
    }
  }, [fetchedPoolAddress, currentChain?.id]);

  async function handleConnect() {
    const wallet = await connect({ client, chain: currentChain, size: 'compact', wallets: wallets, showThirdwebBranding: false, termsOfServiceUrl: "https://rarebay.xyz/terms", title: 'Rare Connect', theme:
    darkTheme( {
      colors: {
        modalBg: "hsl(0, 0%, 8%)",
        borderColor: "hsl(0, 0%, 8%)",
        separatorLine: "hsl(0, 0%, 74%)",
        tertiaryBg: "hsl(0, 0%, 18%)",
        skeletonBg: "hsl(0, 0%, 33%)",
        secondaryText: "hsl(0, 0%, 74%)",
        selectedTextBg: "hsl(0, 0%, 32%)",
        selectedTextColor: "hsl(0, 0%, 30%)",
        primaryButtonText: "hsl(0, 0%, 35%)",
        secondaryButtonBg: "hsl(0, 0%, 28%)",
        secondaryButtonHoverBg: "hsl(0, 0%, 25%)",
        connectedButtonBg: "hsl(0, 0%, 70%)",
        connectedButtonBgHover: "hsl(231, 4%, 75%)",
        secondaryIconColor: "hsl(218, 100%, 63%)",
        secondaryIconHoverBg: "hsl(0, 0%, 50%)",
        accentText: "hsl(0, 0%, 21%)",
        primaryText: "hsl(240, 4%, 26%)",
        accentButtonBg: "hsl(0, 0%, 31%)",
        primaryButtonBg: "hsl(0, 0%, 36%)",
        secondaryIconHoverColor: "hsl(0, 0%, 83%)",
      },
    })}); // opens the connect modal
  }

  useEffect(() => {
    if (reversed) {
      input2Ref.current?.focus();
    } 
  }, [reversed]);
  const handleTokenSelect = (token: { address: any; }) => {

    if (activeSelector === "token1") {
      if (token.address === token2?.address) {
       addToast("error", "Token already selected");
        return;
      }
      setToken1(token);
    } else if (activeSelector === "token2") {
      if (token.address === token1?.address) {
       addToast("error", "Token already selected");
        return;
      }
      setToken2(token);
    }
    setShowModal(false); // Close modal after selecting a valid token
  };

  // Handle focus events
  const handleInput1Focus = () => {
    setIsInput1Focused(true);
    setReversed(false);
  };

  const handleInput2Focus = () => {
    setIsInput1Focused(false);
    setReversed(true);
  };


  
  useEffect(() => {
    const validateTokens = () => {
      const chainTokens = currentChain?.id === 1116 ? tokens : tokenst;
      
      if (token1 && !Object.values(chainTokens).some(t => t.address === token1.address)) {
        setToken1(null);
      }
      
      if (token2 && !Object.values(chainTokens).some(t => t.address === token2.address)) {
        setToken2(null);
      }
    };
  
    validateTokens();
    console.log("Current Factory:", currentChain?.id === 1116 ? factoryContract?.address : factoryContractt?.address);
    console.log("Pool Address:", poolAddress as string);
  }, [currentChain?.id]);


  useEffect(() => {
    // Assuming 'tokens' is globally available or imported from another file
    const usdtToken = Object.values(tokens).find(token => token.symbol === "USDT");
    const rareToken = Object.values(tokens).find(token => token.symbol === "RARE");
    const rareTokent = Object.values(tokenst).find(token => token.symbol === "TRARE");
   
  if(!token1){
    setToken1(null);
  }
  if(!token2){
    setToken2(null);
  }
  }, []);
  const [balance, setBalance] = useState(BigInt(0));
  const [allowance, setAllowance] = useState(BigInt(0));
  const fetchAllowance = async (tokenIn: Token) => {
    // Use the token's address—not the whole token object.
    const tokenContract = thirdwebGetContract({
      client,
      chain: currentChain,
      address: tokenIn?.address as Address,
    });
    return thirdwebAllowance({
      contract: tokenContract,
      owner: account?.address,
      spender: poolAddress,
    });
  };

  // Fetch the balance for a given token.
  const fetchBalance = async (tokenIn: Token) => {
    const tokenContract = thirdwebGetContract({
      client,
      chain: currentChain,
      address: tokenIn.address,
    });
    return balanceOf({
      contract: tokenContract,
      address: account?.address,
    });
  };

  // Memoize refetch callbacks.
  const refetchAllowance = useCallback(
    () => fetchAllowance(inputToken).then((allowance) => {
      // Process or store the allowance as needed.
      console.log("Fetched allowance:", allowance);
      // e.g., setAllowance(allowance);
    }),
    [inputToken, currentChain, account, poolAddress]
  );

  const refetchBalance = useCallback(
    () => fetchBalance(inputToken).then((balance) => {
      // Process or store the balance as needed.
      console.log("Fetched balance:", balance);
      // e.g., setBalance(balance);
    }),
    [token1, currentChain, account]
  );
  const data = ethers.toUtf8Bytes(''); // Empty data
  const { mutate: sendTransaction } = useSendTransaction();
  const inputAmountWei = inputAmount && !isNaN(Number(inputAmount)) 
  && toWei(inputAmount);
  const [isInput1Focused, setIsInput1Focused] = useState(true);

  const transaction = prepareContractCall({
    contract: currentChain.id===1116 ? factoryContract : factoryContractt,
    method: "createPair",
    params: [inputToken?.address, outputToken?.address],
  });
  const transaction2 = prepareContractCall({
    contract: getAmmContract(poolAddress, currentChain),
    method: "addLiquidity",
    params: [toWei(isInput1Focused ? inputAmount:inputAmount1), toWei(!isInput1Focused ? inputAmount1:inputAmount), address],
  });
  const tokenContract = thirdwebGetContract({
    client: client,
    chain: currentChain,
    address: inputToken?.address || token2?.address,  // Address of the token
  });
  useEffect(() => {
    refetchBalance();
    refetchAllowance()
}, [inputToken, address]);

useEffect(() => {
  const updateAllowance = async () => {
    if (inputToken && account?.address && poolAddress) {
      const newAllowance = await fetchAllowance(inputToken);
      setAllowance(newAllowance);
    }
  };

  updateAllowance();
  refetchAllowance();
}, [inputToken, account?.address, poolAddress]);









const [balance1, setBalance1] = useState(BigInt(0));
const [balance2, setBalance2] = useState(BigInt(0));

const inputBalance = reversed ? balance2 : balance1;

const handlePercentage = (percentage: number) => {
  const balanceEther = Number(toEther(inputBalance));
  setInputAmount(String((balanceEther * percentage).toFixed(4)));
};
useEffect(() => {
  if (!account?.address) return;

  const updateBalances = async () => {
    try {
      const [newBalance1, newBalance2] = await Promise.all([
        fetchBalance(token1),
        fetchBalance(token2),
      ]);

      setBalance1(newBalance1);
      setBalance2(newBalance2);
    } catch (error) {
      console.error("Error fetching balances:", error);
    }
  };

  updateBalances();
}, [account?.address, token1, token2]);

useEffect(() => {
  const rareToken = currentChain?.id === 1116 
    ? tokens["RareCoin"] 
    : tokenst["RareCoin"];
  setToken2(rareToken);
}, [currentChain?.id]); // Update when chain changes

const fetchBalances = async (tokens: Token[], accountAddress: any, currentChain: any) => {
  const balances: Record<string, string> = {};


  for (const token of tokens) {
    const tokenContract = thirdwebGetContract({
      client: client,
      chain: currentChain,
      address: token.address,  // Address of the token
    });

    try {
      const balance = await balanceOf({
        contract: tokenContract,
        address: accountAddress,
      });
      balances[token.address] = balance.toString();  // Convert BigNumber to string
    } catch (error) {
      console.error(`Failed to fetch balance for token ${token.name}:`, error);
      balances[token.address] = '0';  // In case of error, set balance to 0
    }
  }

  return balances;
};





// Fetch output amount from contract
const { data: outputAmountWei, isLoading: load, error } = useReadContract({
  contract: getAmmContract(poolAddress, currentChain),
  method: 'getAmountOut',
    params: [inputAmountWei, inputToken?.address],
});



useEffect(() => {
  if (error && !token1?.address===token2?.address) {
    setOutputAmount('');
  } else if (outputAmountWei) {
    setOutputAmount(toEther(outputAmountWei));
  }  else if (inputAmount === '' || inputAmount === '0')
    {
      setOutputAmount('');
    }
}, [outputAmountWei, error]);


const handleInputChange = useCallback(
  (value: string, isInput1: boolean) => {
    if (isInput1) {
      setInputAmount(value as any);
      
      setIsInput1Focused(true);
    } else {
      setInputAmount(value as any);
      setIsInput1Focused(false);
    }
    // Set loading state when input changes
    if (value && load){
      load
    };
  },
  [load]
);

const handleInputChange1 = useCallback(
  (value: string, isInput1: boolean) => {
    if (isInput1) {
      setInputAmount1(value as any);
      
      setIsInput1Focused(true);
    } else {
      setInputAmount1(value as any);
      setIsInput1Focused(false);
    }
    // Set loading state when input changes
    if (value && load){
      load
    };
  },
  [load]
);


const getPairAddress = (tokenAAddress: string, tokenBAddress: string) => {
  // This should compute or retrieve the pair address.
  return '0x900101d06a7426441ae63e9ab3b9b0f63be145f1'; // placeholder
};

const pairAddress = getPairAddress(token1?.address, token2?.address);
const { data: reserves, isPending } = useReadContract({
  contract: getAmmContract(poolAddress, currentChain),
  method: "getReserves",
  params: [],
});
const { 
  tokenPrices,
  handleReserveUpdate 
} = useContext(TokenContext);

// Add this useEffect to update reserves when they change
useEffect(() => {
  if (reserves && inputToken && outputToken) {
    handleReserveUpdate(
      inputToken,
      outputToken,
      { 
        reserveA: Number(reserves[0]), 
        reserveB: Number(reserves[1]) 
      }
    );
  }
}, [reserves, inputToken, outputToken, handleReserveUpdate]);
// Calculate USD values
const inputUSDValue = (
  Number(toEther(balance1)) * 
  (tokenPrices[token1?.symbol] || 0)
).toFixed(2);

const outputUSDValue = (
  Number(toEther(balance2)) * 
  (tokenPrices[token2?.symbol] || 0)
).toFixed(2);

return (
    <>

      {showModal &&
        <div className="modal">
          <div className="modal-content">
            {currentChain?.id===1116 ? <TokenSelect accountAddress={account?.address} fetchBalance={
              fetchBalances} setModal={(selector: any) => {
              setActiveSelector(selector)
              setShowModal(false)
            }} onSelect={handleTokenSelect} />:<TokenSelectt accountAddress={account?.address} fetchBalance={fetchBalances}  setModal={(selector: any) => {
              setActiveSelector(selector)
              setShowModal(false)
            }} onSelect={handleTokenSelect} />}
          </div>
        </div>
      }
      <div className={`swap-swap ${props.rootClassName} `}>
        <div className="swap-container1">
          <div className="swap-container2">
            <button type="button" className="swap-button1" 
             onClick={() => {
              setActiveSelector("token1");
              setShowModal(true);
            }}
            disabled={!account}
            style={{cursor: !account && 'not-allowed'}}
            >
              {token1 ? <img
                alt={props.imageAlt}
                src={token1?.image}
                className="swap-image1"
              /> : <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                <g id="SVGRepo_iconCarrier"> <path d="M12 19H12.01M8.21704 7.69689C8.75753 6.12753 10.2471 5 12 5C14.2091 5 16 6.79086 16 9C16 10.6565 14.9931 12.0778 13.558 12.6852C12.8172 12.9988 12.4468 13.1556 12.3172 13.2767C12.1629 13.4209 12.1336 13.4651 12.061 13.6634C12 13.8299 12 14.0866 12 14.6L12 16" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </g>

              </svg>}
              <span className="swap-text10">
                {props.button7 ?? (
                  <Fragment>
                    <span className="swap-text23">{token1 ? token1?.symbol : 'Select'}</span>
                  </Fragment>
                )}
              </span>
            </button>
          </div>
          <input
            type="number"
            placeholder={`0.000`}
            ref={input1Ref}
            min={0.001}
            max={10000000}
            value={inputAmount}
            className="swap-textinput1 input"
            onChange={(e) => handleInputChange(e.target.value as any, true)}
            onFocus={handleInput1Focus}
          />
          <div className="swap-container3">
            <button onClick={() => handlePercentage(0.25)}type="button" className="swap-button2 button">
              <span>
                {props.button ?? (
                  <Fragment>
                    <span className="swap-text22">25%</span>
                  </Fragment>
                )}
              </span>
            </button>
            <button
            onClick={() => handlePercentage(0.5)}
            type="button" className="swap-button2 button">
              <span>
                {props.button6 ?? (
                  <Fragment>
                    <span
              
                    className="swap-text26">50%</span>
                  </Fragment>
                )}
              </span>
            </button>
            <button
              onClick={() => handlePercentage(0.75)}
            type="button" className="swap-button2 button">
              <span>
                {props.button5 ?? (
                  <Fragment>
                    <span 
           
                    className="swap-text25">75%</span>
                  </Fragment>
                )}
              </span>
            </button>
            <button
           onClick={() => handlePercentage(0.98)}
            type="button" className="swap-button2 button">
              <span>
                {props.button8 ?? (
                  <Fragment
                 
                  >
                    <span  className="swap-text27">Max</span>
                  </Fragment>
                )}
              </span>
            </button>
          </div>
         {token1 &&  <div className="swap-container4">
            <span className="swap-text15">${formatNumber(inputUSDValue)}</span>
            <span className="swap-text16">{currentChain && formatNumber(Number(toTokens(balance1, 18))?.toFixed(3))} {token1?.symbol}</span>
          </div>}
        </div>
        <div 
        className={`swap-swapbutton`}>
      
        </div>
        <div className="swap-container6">
          <input
            type="number"
            max={10000000}
            min={0.001}
            placeholder={`0.000`}
            value={inputAmount1}
            className="swap-textinput2 input"
            ref={input2Ref}
            onFocus={handleInput2Focus}
            onChange={(e) => handleInputChange1(e.target.value as any, false)}
          />
          {
            token1 && <div className="swap-container7">
            <span className="swap-text17">${formatNumber(outputUSDValue)}</span>
            <span className="swap-text18">{formatNumber(Number(toTokens(balance2, 18))?.toFixed(3))} {token2?.symbol}</span>
          </div>
          }
          <div className="swap-container8">
            <button type="button" className="swap-button6" 
             onClick={() => {
              setActiveSelector("token2");
              setShowModal(true);
            }}
            disabled={!account}
            style={{cursor: !account && 'not-allowed'}}
            >
              {token2 ? <img
                alt={props.imageAlt}
                src={token2?.image}
                className="swap-image1"
              /> : <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                <g id="SVGRepo_iconCarrier"> <path d="M12 19H12.01M8.21704 7.69689C8.75753 6.12753 10.2471 5 12 5C14.2091 5 16 6.79086 16 9C16 10.6565 14.9931 12.0778 13.558 12.6852C12.8172 12.9988 12.4468 13.1556 12.3172 13.2767C12.1629 13.4209 12.1336 13.4651 12.061 13.6634C12 13.8299 12 14.0866 12 14.6L12 16" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </g>

              </svg>}
              <span className="swap-text19">
                {props.button72 ?? (
                  <Fragment>
                    <span className="swap-text24">{token2 ? token2?.symbol : 'Select'}</span>
                  </Fragment>
                )}
              </span>
            </button>
          </div>
        </div>
        <div className="swap-container9">
        {token1 && token2 ? <button type="button" className="swap-button7 button" >
            <span className="swap-text20">
          {
            (inputBalance<inputAmountWei) ?  <>
            Insufficient Amount
            </> : (allowance < inputAmountWei) ? 
             <>
            <TransactionButton
             disabled={toWei(inputAmount)>allowance}
                transaction={() => {
                    return approve({
                        contract: tokenContract,
                        amount: isInput1Focused ? inputAmount:inputAmount1,
                        spender: poolAddress
                    })
                }}
                onSent="Approve your tokens for use..."
                onConfirmed="Tokens successfully approved for use."
                onError="Failed to approve tokens!"
                successCallback={refetchAllowance}
            >
              {allowance<inputAmountWei ? `Approve ${inputToken?.symbol}` : 'Approved✅'}
            </TransactionButton>
           </> : 
           (balance2<toWei(inputAmount1)) ? <>
            Insufficient Amount
           </>
           :
           <>
            {allowance<toWei(inputAmount1) ?
           <TransactionButton
           disabled={toWei(inputAmount1)<allowance}
               transaction={() => {
                   return approve({
                       contract: tokenContract,
                       amount: !isInput1Focused ? inputAmount1:inputAmount,
                       spender: poolAddress
                   })
               }}
               onSent="Approve your tokens for use..."
               onConfirmed="Tokens successfully approved for use."
               onError="Failed to approve tokens!"
               successCallback={refetchAllowance}
           >
          {allowance<toWei(inputAmount1) ?  `Approve ${inputToken?.symbol}` : 'Approved✅'}
           </TransactionButton> :   <TransactionButton
          transaction={() => {
            return prepareTransaction(transaction2);
            
          }}
          onSent="Swap submitted..."
          onConfirmed="Successfully swapped."
          onError="Failed to complete swap."
          successCallback={refetchBalance}
      >
Mint RARE-LP
      </TransactionButton>}
          </>
          }
            </span>
          </button> : 
          <button type="button" className="swap-button7 button" >
          <span className="swap-text20">
            {props.button4 ?? (
              <Fragment>
                <span className="swap-text21">Select Token</span>
              </Fragment>
            )}
          </span>
        </button>
          }
        </div>
      </div>
        <div className="swap-container9">
  {fetchedPoolAddress==='0x0000000000000000000000000000000000000000' && <div style={{display: 'flex', gap: '5px', width: '100%'}}>
     <button type="button" className="swap-button7 button" >
     <TransactionButton
          transaction={() => {
            return prepareTransaction(transaction);
            
          }}
          onSent="Swap submitted..."
          onConfirmed="Successfully swapped."
          onError="Failed to complete swap."
          successCallback={refetchBalance}
          disabled={fetchedPoolAddress!==undefined}
      >
Create Pool
      </TransactionButton>
        </button> 
     </div>}
        </div>
      <style jsx>
        {`
        .swap-textinput1:disabled,
        .swap-textinput2:disabled {
          color: #888;
          cursor: progress;
          background-image: linear-gradient(
            120deg,
            transparent 25%,
            rgba(255,255,255,0.1) 50%,
            transparent 75%
          );
          background-size: 200% 100%;
          animation: loadingShimmer 1.5s infinite;
        }
        
        @keyframes loadingShimmer {
          from { background-position: 200% 0; }
          to { background-position: -150% 0; }
        }
          .swap-swap {
            gap: 5px;
            flex: 0 0 auto;
            width: 100%;
            height: auto;
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-direction: column;
          }
          .swap-container1 {
            width: 100%;
            height: 156px;
            display: flex;
            position: relative;
            align-items: flex-start;
            padding-top: var(--dl-space-space-halfunit);
            padding-left: var(--dl-space-space-halfunit);
            padding-right: var(--dl-space-space-halfunit);
            flex-direction: column;
            padding-bottom: 0px;
          }
          .swap-container2 {
            gap: var(--dl-space-space-halfunit);
            top: var(--dl-space-space-fourunits);
            flex: 0 0 auto;
            left: var(--dl-space-space-oneandhalfunits);
            width: auto;
            height: 50px;
            margin: auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            z-index: 100;
            position: absolute;
            transition: 0.3s;
            align-items: center;
           border-color: rgba(80, 80, 80, 0.3);
            border-width: 2px;
            border-radius: 20px;
            justify-content: center;
            backdrop-filter: blur(100px);
            background-color: rgba(1, 1, 1, 0.21);
          }
          .swap-container2:hover {
            transform: rotate(-1.5deg);
            border: solid 2px rgba(0, 90, 180);
            transition: ease 1s;
          }
          .swap-button1 {
            gap: var(--dl-space-space-halfunit);
            cursor: pointer;
            height: auto;
            display: flex;
            z-index: 1;
            align-items: center;
            justify-content: center;
            background-color: transparent;
          }
          .swap-image1 {
            width: 20px;
            object-fit: cover;
          }
          .swap-text10 {
            color: #c5c5c5;
          }
          .swap-textinput1 {
            width: 100%;
            height: 170px;
            font-size: 30px;
            text-align: end;
    
            border-width: 0px;
            padding-bottom: var(--dl-space-space-fourunits);
            background-color: rgba(53, 53, 53, 0.45);
            border: solid 2px rgba(100, 100, 100, 0.4);
            backdrop-filter: blur(10px);
            border: ${standard && isInput1Focused && 'solid 2px rgba(90, 220, 90)'};
            border: ${inputAmount==='0' && standard && 'solid 2px rgba(220, 90, 90)'};
          }
          .swap-textinput1:focus{          
            background-color: rgba(113, 113, 113, 0.4);
          }
          .swap-textinput2:focus{
            background-color: rgba(113, 113, 113, 0.4);
          }
          .swap-container3 {
            gap: var(--dl-space-space-halfunit);
            flex: 0 0 auto;
            right: var(--dl-space-space-unit);
            width: auto;
            bottom: var(--dl-space-space-twounits);
            height: 45px;
            z-index: 1;
            display: grid;
            padding: var(--dl-space-space-halfunit);
            position: absolute;
            font-size: 12px;
            align-self: flex-end;
            grid-template-columns: 1fr 1fr 1fr 1fr;
          }
          .swap-button2 {
            padding: var(--dl-space-space-halfunit);
            height: 30px;
            max-width: 45px;
            background-color: rgba(16, 16, 16, 0.24);
            border: solid 1px rgba(100, 100, 100, 0.2);
          }
          .swap-button2:hover{
            transform: rotate(-1.5deg);
            border: solid 1px rgba(0, 90, 180);
          }
          .swap-button3 {
            padding: var(--dl-space-space-halfunit);
            background-color: rgba(16, 16, 16, 0.54);
          }
          .swap-button4 {
            padding: var(--dl-space-space-halfunit);
            background-color: rgba(16, 16, 16, 0.54);
          }
          .swap-button5 {
            padding: var(--dl-space-space-halfunit);
            background-color: rgba(16, 16, 16, 0.54);
          }
          .swap-container4 {
            flex: 0 0 auto;
            left: 8px;
            right: var(--dl-space-space-unit);
            width: auto;
            bottom: var(--dl-space-space-unit);
            height: auto;
            display: flex;
            z-index: 100;
            position: absolute;
            align-self: flex-end;
            align-items: flex-start;
            padding-left: var(--dl-space-space-halfunit);
            justify-content: space-between;
          }
          .swap-text15 {
            color: rgba(100, 100, 100);
            font-size: 12px;
            padding-top: var(--dl-space-space-halfunit);
            padding-right: var(--dl-space-space-halfunit);
          }
          .swap-text16 {
            color: rgba(100, 100, 100);
            font-size: 12px;
            padding-top: var(--dl-space-space-halfunit);
            padding-right: var(--dl-space-space-halfunit);
          }
          .swap-swapbutton {
            flex: 0 0 auto;
            left: 0px;
            right: 0px;
            width: 100%;
            bottom: 194px;
            height: 0px;
            margin: auto;
            display: flex;
            position: absolute;
            align-self: center;
            align-items: center;
            justify-content: center;
            border-radius: 100px;
          }
          .swap-container5 {
            flex: 0 0 auto;
            width: 50px;
            cursor: pointer;
            height: 50px;
            display: flex;
            z-index: 6;
            align-items: center;
           
            
            border-radius: 100px;
            justify-content: center;
            background: rgba(113, 113, 113, 0.6);
             backdrop-filter: blur(100px);
             transform: rotate(-180deg);
             transition: 0.3s ease;
              border: solid 3px rgb(90, 220, 90);
              border: ${inputAmount==='0' && 'solid 3px rgba(220, 90, 90)'};
          }
          .swap-container5.clicked {
            background: rgba(113, 113, 113, 0.4);
             transform: rotate(180deg);
             transition: 0.3s ease;
          }
          
          .swap-icon1 {
            fill: var(--dl-color-theme-neutral-dark);
            color: #f3f3f3;
            width: 32px;
            height: 32px;
            transition: 0.3s;
          }
          .swap-container6 {
            width: 100%;
            height: auto;
            display: flex;
            align-self: center;
            align-items: flex-start;
            padding-top: 0px;
            padding-left: var(--dl-space-space-halfunit);
            padding-right: var(--dl-space-space-halfunit);
            padding-bottom: var(--dl-space-space-halfunit);
          }
          .swap-textinput2 {
            width: 100%;
            height: 124px;

            font-size: 30px;
            text-align: end;
            border-width: 0px;
            background-color: rgba(53, 53, 53, 0.45);
           border: solid 2px rgba(100, 100, 100, 0.4);
            backdrop-filter: blur(10px);
            border: ${reversed && 'solid 2px rgba(90, 220, 90)'};
            border: ${inputAmount==='0' && reversed && 'solid 2px rgba(220, 90, 90)'};
          }
          .swap-container7 {
            flex: 0 0 auto;
            left: 8px;
            right: var(--dl-space-space-unit);
            width: auto;
            bottom: 80px;
            height: auto;
            display: flex;
            z-index: 100;
            position: absolute;
            align-self: flex-end;
            align-items: flex-start;
            padding-left: var(--dl-space-space-unit);
            justify-content: space-between;
          }
          .swap-text17 {
            color: rgb(103, 103, 103);
            font-size: 12px;
            padding-top: var(--dl-space-space-halfunit);
            padding-right: var(--dl-space-space-halfunit);
          }
          .swap-text18 {
            color: rgb(103, 103, 103);
            font-size: 12px;
            padding-top: var(--dl-space-space-halfunit);
            padding-right: var(--dl-space-space-halfunit);
          }
          .swap-container8 {
            gap: var(--dl-space-space-halfunit);
            flex: 0 0 auto;
            left: var(--dl-space-space-oneandhalfunits);
            width: auto;
            bottom: 100px;
            cursor: pointer;
            height: 50px;
            margin: auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            z-index: 500;
            position: absolute;
            align-items: center;
           border-color: rgba(80, 80, 80, 0.3);
            border-width: 2px;
            border-radius: 20px;
            justify-content: center;
            backdrop-filter: blur(100px);
            background-color: rgba(1, 1, 1, 0.21);
          }
          .swap-container8:hover {
            transform: rotate(-1.5deg);
            border: solid 2px rgba(0, 90, 180);
            transition: ease 1s;
          }
          .swap-button6 {
            gap: var(--dl-space-space-halfunit);
            cursor: pointer;
            height: auto;
            display: flex;
            z-index: 1;
            align-items: center;
            justify-content: center;
            background-color: transparent;
          }
          .swap-image2 {
            width: 20px;
            object-fit: cover;
          }
          .swap-text19 {
            color: #c5c5c5;
          }
          .swap-container9 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: flex-start;
            padding-left: var(--dl-space-space-halfunit);
            padding-right: var(--dl-space-space-halfunit);
          }
          .swap-button7 {
            color: rgb(154, 154, 154);
            width: 100%;
            cursor: pointer;
            font-size: 18px;
            font-style: normal;
            transition: 0.3s;
            font-weight: 700;
            padding-top: var(--dl-space-space-unit);
            border-color: rgba(70, 70, 90, 0.4);
            border-width: 2px;
            border-type: solid;
            border-radius: 100px;
position: relative;
          }

          .swap-button7:hover {
            transform: rotate(-1.5deg);
            border: solid 2px rgba(0, 90, 180);
            transition: ease 1s;
          }
          .swap-text20 {
            fill: var(--dl-color-theme-secondary1);
            color: rgba(100, 100, 100);
          }
          .swap-text21 {
            display: inline-block;
          }
          .swap-text22 {
            display: inline-block;
          }
          .swap-text23 {
            display: inline-block;
          }
          .swap-text24 {
            display: inline-block;
          }
          .swap-text25 {
            display: inline-block;
          }
          .swap-text26 {
            display: inline-block;
          }
          .swap-text27 {
            display: inline-block;
          }

          @media (max-width: 1600px) {
            .swap-container7 {
              bottom: 74px;
            }
          }
          @media (max-width: 1200px) {
  .swap-container2 {
              top: 48px;
              left: 21px;
            }
            .swap-container3 {
              gap: 5;
              display: flex;
            }
            .swap-button2 {
              padding: 5px;
            }
            .swap-button3 {
              padding: 5px;
            }
            .swap-button4 {
              padding: 5px;
            }
            .swap-button5 {
              padding: 5px;
            }
            .swap-container7 {
              bottom: 74px;
            }
          }
          }
          @media (max-width: 479px) {
            .swap-container2 {
              top: 48px;
              left: 21px;
            }
            .swap-container3 {
              gap: 5;
              display: flex;
            }
            .swap-button2 {
              padding: 5px;
            }
            .swap-button3 {
              padding: 5px;
            }
            .swap-button4 {
              padding: 5px;
            }
            .swap-button5 {
              padding: 5px;
            }
            .swap-container7 {
              bottom: 74px;
            }
          }
        `}
      </style>
    </>
  )
}

Pools.defaultProps = {
  imageSrc: '/core-200w.png',
  imageAlt: 'image',
  imageSrc1: '/tether-usdt-logo-200h.png',
  button4: undefined,
  button: undefined,
  button7: undefined,
  imageAlt1: 'image',
  rootClassName: '',
  button72: undefined,
  button5: undefined,
  button6: undefined,
  button8: undefined,
}

Pools.propTypes = {
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  imageSrc1: PropTypes.string,
  button4: PropTypes.element,
  button: PropTypes.element,
  button7: PropTypes.element,
  imageAlt1: PropTypes.string,
  rootClassName: PropTypes.string,
  button72: PropTypes.element,
  button5: PropTypes.element,
  button6: PropTypes.element,
  button8: PropTypes.element,
}

export default Pools
