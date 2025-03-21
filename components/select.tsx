import { useState, useEffect, useContext } from 'react';
import { FACTORY_CONTRACT, getAmmContract, tokens, FACTORY_CONTRACTT, getAmmContractt, tokenst, TokenContext } from '../lib/tokenContext';
import { ethers } from 'ethers';
import { useActiveAccount, useWalletBalance } from 'thirdweb/react';
import { client } from '../lib/thirdweb-client';
import { formatNumber } from './swap';


interface Token {
  address: string;
  name: string;
  symbol: string;
  image: string;
}

interface TokenSelectProps {
  onSelect: (token: Token) => void;
  setModal: any;
  accountAddress: any;
  fetchBalance: (tokens: Token[], accountAddress: string, currentChain: string) => Promise<Record<string, string>>;  // Updated to match fetchBalances signature
}


const TokenSelect: React.FC<TokenSelectProps> = ({ onSelect, setModal, fetchBalance, accountAddress }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [balances, setBalances] = useState<{ [key: string]: string }>({}); // Store token balances
  const { currentChain, changeChain, availableChains } = useContext(TokenContext);
  // Filter tokens based on search term
  const filteredTokens = Object.values(tokens).filter(token =>
    token.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.symbol?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const account = useActiveAccount();
  const address = account?.address;
  const { data: balance, isLoading, isError } = useWalletBalance({
    chain: currentChain,
    address: address,
    client: client,
  });

  useEffect(() => {
    const fetchAllBalances = async () => {
      try {
        const balanceMap = await fetchBalance(filteredTokens, accountAddress, currentChain);
        // Convert BigNumber balances to numbers with 3 decimal places
        const formattedBalances = Object.fromEntries(
          Object.entries(balanceMap).map(([address, balance]) => {
            const bigNumberBalance = ethers.getBigInt(balance);
            const formattedBalance = parseFloat(ethers.formatUnits(bigNumberBalance, 18)).toFixed(3);
            return [address, formattedBalance];
          })
        );
        setBalances(formattedBalances);
      } catch (error) {
        console.error('Failed to fetch balances:', error);
      }
    };

    if (filteredTokens.length > 0) {
      fetchAllBalances();
    }
  }, [filteredTokens, fetchBalance, accountAddress, currentChain]);
  return (
    <div className="token-list">
      <div className="x" onClick={setModal}>
        <svg width="24" height="24" viewBox="0 0 32 32">
          <path
            d="M2 6v20a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2m2 0h16v20H4v-9h10.17l-3.58 3.59L12 22l6-6l-6-6l-1.41 1.41L14.17 15H4z"
            fill="currentColor"
          ></path>
        </svg>
        back
      </div>
      <hr />
      <div style={{ display: 'flex', justifyContent: 'start', flexDirection: 'column', width: '100%', textAlign: 'start' }}>
        <h2 className="hh">Select Coin</h2>
        <div style={{ width: '100%', position: 'relative' }}>
          <input
            type="text"
            className="int"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search token..."
          />
          <div className="src">
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                stroke="#828282"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <hr />

      {/* Render filtered tokens */}
      {filteredTokens.map((token) => (
        <div
          key={token.address}
          className="token-item"
          onClick={() => accountAddress && onSelect(token)}
        >
         <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', alignItems: 'center' }}>
            <img src={token.image} alt={token.name} className="token-image" />
            <p style={{ fontSize: '16px' }}>{token.name}</p>
           {token.symbol !== 'ÇORE' &&  <a href={currentChain?.id === 1116 && `https://scan.coredao.org/token/${token?.address}`}>
              <svg width="16px" height="16px" viewBox="0 0 24 24" id="meteor-icon-kit__regular-external-link" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M22 3.41421L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L20.5858 2H18C17.4477 2 17 1.55228 17 1C17 0.447715 17.4477 0 18 0H23C23.5523 0 24 0.447715 24 1V6C24 6.55228 23.5523 7 23 7C22.4477 7 22 6.55228 22 6V3.41421ZM12.9838 3C13.536 3 13.9838 3.44772 13.9838 4C13.9838 4.55228 13.536 5 12.9838 5H3C2.44772 5 2 5.44772 2 6V21C2 21.5523 2.44772 22 3 22H18.0011C18.5534 22 19.0011 21.5523 19.0011 20.9973L18.9734 11.0028C18.9719 10.4505 19.4184 10.0015 19.9706 10C20.5229 9.99847 20.9719 10.4449 20.9734 10.9972L21.0011 21C21.0011 22.6569 19.658 24 18.0011 24H3C1.34315 24 0 22.6569 0 21V6C0 4.34315 1.34315 3 3 3H12.9838Z" fill="#949494"></path></g></svg>
            </a>}
          </div>
          <div style={{ width: '20px' }} />
          <p>{token.symbol==='CORE' && balance?.displayValue>'0' ? formatNumber(Number(balance?.displayValue).toFixed(3)) || <div className="spinner" /> : balances[token.address] || <div className="spinner" />}</p>
        </div>
      ))}

      <style jsx>{`
        .hh {
          margin-bottom: 5%;
          width: 100;
          font-size: 16px;
          color: rgba(226, 226, 226, 0.5);
          font-weight: 900;
        }
        .int {
          padding: 10px;
          background: transparent;
          border: 0px;
          color: #999999;
          padding: 3% 3%;
          border-radius: 16px;
          border: #5e5e5e54 0px solid;
          margin-bottom: 1%;
          width: 100%;
          font-weight: 900;
          border: solid 1px rgba(100, 100, 100, 0.3);
        }
        }
        .int {
          color: white;
        }
        .token-list {
          overflow: scroll;
          gap: 10;
          color: white;
          width: 100%;
          text-align: start;
          font-size: 10px;
        }
        .token-item {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          cursor: pointer;
          transition: background-color 0.3s;
          border-radius: 15px;
        }
        .token-item:hover {
          background-color: rgba(70, 70, 70, 0.5);
        }
        .token-image {
          width: 24px;
          height: 24px;
          margin-right: 10px;
          border-radius: 8px;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default TokenSelect;
