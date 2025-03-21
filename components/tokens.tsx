import { useState, useEffect, useContext, useCallback } from 'react';
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
  fetchBalance: (tokens: Token[], accountAddress: string, currentChain: string) => Promise<Record<string, string>>;
}

const TokenSelect: React.FC<TokenSelectProps> = ({ onSelect, setModal, fetchBalance, accountAddress }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [balances, setBalances] = useState<{ [key: string]: string }>({});
  // Toggle to show/hide tokens with zero balance
  const [showZeroBalances, setShowZeroBalances] = useState(false);
  const { currentChain, changeChain, availableChains } = useContext(TokenContext);
  const account = useActiveAccount();
  const address = account?.address;
  const { data: balance, isLoading, isError } = useWalletBalance({
    chain: currentChain,
    address: address,
    client: client,
  });
  // Filter tokens based on search term
  const filteredTokens = Object.values(currentChain?.id === 1116 ? tokens : currentChain?.id ===1115 && tokenst).filter(token =>
    token.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.symbol?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  // Only display tokens with a non-zero balance if toggle is off.
  // When toggled on, display all tokens.
  const tokensToDisplay = filteredTokens.filter(token => {
    const balanc = balances[token.address] || '0.000';
    if (!showZeroBalances && balanc === '0.000' && token.symbol!=='CORE') {
      return false;
    }
    return true;
  });


  return (
    <div className="token-list">
      <div className="toggle-container">
        <label style={{display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'center', fontSize: '12px'}}>
          <input
            type="checkbox"
            checked={showZeroBalances}
            onChange={() => setShowZeroBalances(!showZeroBalances)}
          />
          Show zero balance
        </label>
      </div>
      {tokensToDisplay.map((token) => (
        <div
          key={token.address}
          className="token-item"
          onClick={() => onSelect(token)}
        >
          <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', alignItems: 'center' }}>
            <img src={token.image} alt={token.name} className="token-image" />
            <p style={{ fontSize: '16px' }}>{token.name}</p>
            {token.symbol!=='CORE' && <a href={currentChain?.id === 1116 && `https://scan.coredao.org/token/${token.address}`}>
              <svg width="16px" height="16px" viewBox="0 0 24 24" id="meteor-icon-kit__regular-external-link" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path fillRule="evenodd" clipRule="evenodd" d="M22 3.41421L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L20.5858 2H18C17.4477 2 17 1.55228 17 1C17 0.447715 17.4477 0 18 0H23C23.5523 0 24 0.447715 24 1V6C24 6.55228 23.5523 7 23 7C22.4477 7 22 6.55228 22 6V3.41421ZM12.9838 3C13.536 3 13.9838 3.44772 13.9838 4C13.9838 4.55228 13.536 5 12.9838 5H3C2.44772 5 2 5.44772 2 6V21C2 21.5523 2.44772 22 3 22H18.0011C18.5534 22 19.0011 21.5523 19.0011 20.9973L18.9734 11.0028C18.9719 10.4505 19.4184 10.0015 19.9706 10C20.5229 9.99847 20.9719 10.4449 20.9734 10.9972L21.0011 21C21.0011 22.6569 19.658 24 18.0011 24H3C1.34315 24 0 22.6569 0 21V6C0 4.34315 1.34315 3 3 3H12.9838Z" fill="#949494"></path>
                </g>
              </svg>
            </a>}
          </div>
          <div style={{ width: '20px' }} />
          <p>{token.symbol==='CORE' && balance?.displayValue>'0' ? formatNumber(Number(balance?.displayValue).toFixed(3)) : balances[token.address] || <div className="spinner" />}</p>
        </div>
      ))}

      <style jsx>{`
        .toggle-container {
          margin-bottom: 10px;
          font-size: 12px;
          color: white;
          display: flex;
          gap: 10px;
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
