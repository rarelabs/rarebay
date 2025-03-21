import React, { Fragment, useState, useEffect, useRef,  useCallback } from 'react'

import PropTypes from 'prop-types'
import { client } from '../lib/thirdweb-client';
import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";
import { useConnectModal, useActiveAccount, darkTheme, useSendTransaction, useWalletBalance } from "thirdweb/react";
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
import { Address, toTokens, toUnits, toWei, getContract as thirdwebGetContract, toEther, PreparedTransaction, prepareContractCall, prepareTransaction, getContract } from "thirdweb";
import { useReadContract } from "thirdweb/react";
import TransactionButton from "./SwapButton";
import { getUniswapV3Pool, exactInputSingle } from "thirdweb/extensions/uniswap";
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { formatNumber } from './swap';

const EXPIRATION_TIMES = {
  '1hr': 3600,
  '24hrs': 86400,
  '1wk': 604800,
  '1month': 2592000,
};

const Trade = (props: { rootClassName: any; imageAlt: string; button7: any; button: any; button6: any; button5: any; button8: any; button72: any; button4: any; }) => {
  const { currentChain, changeChain, availableChains, getTokenPrice } = useContext(TokenContext);
  const [poolAddress, setPoolAddress] = useState<Address>('0x0000000000000000000000000000000000000000');
  const [expiration, setExpiration] = useState(Math.floor(Date.now() / 1000) + EXPIRATION_TIMES['1wk']);
  useEffect(() => {
    const interval = setInterval(() => {
      setExpiration(Math.floor(Date.now() / 1000) + EXPIRATION_TIMES['1wk']);
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);
  const handleExpirationChange = (timeKey) => {
    setExpiration(Math.floor(Date.now() / 1000) + EXPIRATION_TIMES[timeKey]);
  };
  
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
  const [inputAmount, setInputAmount] = useState<string>('1'); // For user input
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

  const toggleSwapDirection = (token: any) => {
    setReversed(prev => !prev);
    setToken1(token2);
    setToken2(token1);
    setInputAmount(inputAmount); 
    setOutputAmount(outputAmount); 

if(!clicked){
  setClicked(true);
} else {
  setClicked(false);
}
    // Toggle between true and false
    if (standard) {
      // If we're setting to reversed (from standard), focus on input2
      setTimeout(() => input2Ref.current && input2Ref.current.focus(), 0);
    }
    if(reversed) {
      // If we're setting to standard (from reversed), focus on input1
      setTimeout(() => input1Ref.current && input1Ref.current.focus(), 0);
    }
  };
  useEffect(() => {
    // Assuming 'tokens' is globally available or imported from another file
    const usdtToken = Object.values(tokens).find(token => token.symbol === "USDT");
    const rareToken = Object.values(tokens).find(token => token.symbol === "RARE");
    const rareTokent = Object.values(tokenst).find(token => token.symbol === "TRARE");  
  }, []);
  const [balance, setBalance] = useState(BigInt(0));
  const [allowance, setAllowance] = useState(BigInt(0));
  const fetchAllowance = async (tokenIn: Token) => {
    // Use the token's address—not the whole token object.
    const tokenContract = thirdwebGetContract({
      client,
      chain: currentChain,
      address: tokenIn?.address as undefined,
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
      address: tokenIn.address as undefined
    });
    return balanceOf({
      contract: tokenContract,
      address: account?.address,
    });
  };

  // Memoize refetch callbacks.
  const refetchAllowance = useCallback(
    () => fetchAllowance(token1).then((allowance) => {
      // Process or store the allowance as needed.
      console.log("Fetched allowance:", allowance);
      // e.g., setAllowance(allowance);
    }),
    [token1, currentChain, account, poolAddress]
  );

  const refetchBalance = useCallback(
    () => fetchBalance(token1).then((balance) => {
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

  const buy = prepareContractCall({
    contract: getAmmContract(poolAddress, currentChain),
    method: "executeTimedLimitOrder",
    params: [inputAmountWei, inputAmountWei, BigInt(expiration), token1?.address],
  });
  const sell = prepareContractCall({
    contract: getAmmContract(poolAddress, currentChain),
    method: "executeTimedLimitOrder",
    params: [inputAmountWei, inputAmountWei, BigInt(expiration), token2?.address],
  });
  const WCORE_CONTRACT = getContract({
    address: '0x191e94fa59739e188dce837f7f6978d84727ad01',
    client: client,
    chain: currentChain
  });
  const wrap = prepareContractCall({
    contract: WCORE_CONTRACT,
    method: "function deposit()",
		params: [],
		value: inputAmountWei
  });
  const unwrap = prepareContractCall({
    contract: WCORE_CONTRACT,
    method: "function withdraw()",
		params: [],
		value: inputAmountWei
  });
  const tokenContract = thirdwebGetContract({
    client: client,
    chain: currentChain,
    address: inputToken?.address || token2?.address,  // Address of the token
  });
useEffect(() => {
  refetchBalance();
 if(allowance<inputBalance){
  refetchAllowance();
 } else {
   refetchAllowance();
 }
}, [inputToken, address]); 

useEffect(() => {
  const updateAllowance = async () => {
    if (inputToken && account?.address && poolAddress) {
      const newAllowance = await fetchAllowance(inputToken);
      setAllowance(newAllowance);
    }
  };

  updateAllowance();
  refetchBalance();
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



const [isInput1Focused, setIsInput1Focused] = useState(true);


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


const { data: native, isLoading, isError } = useWalletBalance({
  chain: currentChain,
  address: address,
  client: client,
});
const [price, setPrice] = useState(0);
const [price2, setPrice2] = useState(0);
const fetchPrice = async () => {
  const fetchedPrice = await getTokenPrice(token1?.symbol);
  setPrice(fetchedPrice);
};
const fetchPrice1 = async () => {
  const fetchedPrice1 = await getTokenPrice(token2?.symbol);
  setPrice2(fetchedPrice1);
};
const inputUSDValue = (
  Number(toEther(balance1)) * (price || 0)
).toFixed(2);

const outputUSDValue = (
  Number(toEther(balance2)) * 
  (price2 || 0)
).toFixed(2);
useEffect(() => {
  fetchPrice();
  fetchPrice1();
  const interval = setInterval(() => {
    fetchPrice();
    fetchPrice1();
  }, 30000); // 30 seconds refresh
  return () => clearInterval(interval);
}, [token1?.symbol]);

  return (
    <>
      <div className={`trade-trade ${props.rootClassName} `}>
        <div className="trade-container1"></div>
     
        <div className="trade-container3">
          <input
            type="number"
            placeholder={`0.000`}
            ref={input1Ref}
            min={0.00001}
            max={10000000}
            readOnly={reversed}
            onFocus={handleInput1Focus}
            value={isInput1Focused ? inputAmount : formatNumber(Number(outputAmount).toFixed(5))}
            onChange={(e) => handleInputChange(e.target.value as any, true)}
            disabled={load && reversed}
            className="trade-textinput1 input"
          />
        </div>
        <div className="trade-container4">
          <button onClick={() => handlePercentage(0.25)} type="button" className="trade-button3 button">
            <span>
              {props.button ?? (
                <Fragment>
                  <span className="trade-text29">25%</span>
                </Fragment>
              )}
            </span>
          </button>
          <button onClick={() => handlePercentage(0.5)} type="button" className="trade-button4 button">
            <span>
            <Fragment>
                  <span className="trade-text31">50%</span>
                </Fragment>
            </span>
          </button>
          <button onClick={() => handlePercentage(0.75)} type="button" className="trade-button5 button">
            <span>
            <Fragment>
                  <span className="trade-text26">75%</span>
                </Fragment>
            </span>
          </button>
          <button onClick={() => handlePercentage(0.99)} type="button" className="trade-button6 button">
            <span>
            <Fragment>
                  <span className="trade-text23">100%</span>
                </Fragment>
            </span>
          </button>
        </div>
        <div className="trade-container5">
          <span>
          <Fragment>
                <span className="trade-text21">${formatNumber(inputUSDValue)}</span>
              </Fragment>
          </span>
          <span className="trade-text17">
          <Fragment>
                <span className="trade-text30">{currentChain && token1?.symbol != 'CORE' ? formatNumber(Number(toTokens(balance1, 18))?.toFixed(5)):formatNumber(native?.displayValue)} {token1?.symbol}</span>
              </Fragment>
          </span>
        </div>
        <div className="trade-container6">
          <input
            type="number"
            max={10000000}
            min={0.001}
            placeholder={`0.000`}
            value={isInput1Focused ?  formatNumber(Number(outputAmount).toFixed(3)) : inputAmount}
            ref={input2Ref}
            readOnly={!reversed}
            disabled={!reversed && load}
            onFocus={handleInput2Focus}
            onChange={(e) => handleInputChange(e.target.value as any, false)}
            className="trade-textinput2 input"
          />
        </div>
        <div className="trade-container7">
          <span>
          <Fragment>
                <span className="trade-text28">${formatNumber(outputUSDValue)}</span>
              </Fragment>
          </span>
          <span className="trade-text19">
          <Fragment>
                <span className="trade-text22">{token2?.symbol != 'CORE' ? formatNumber(Number(toTokens(balance2, 18))?.toFixed(3)):formatNumber(native?.displayValue)} {token2?.symbol}</span>
              </Fragment>
          </span>
        </div>
        <div className="trade-container4">
        {Object.keys(EXPIRATION_TIMES).map((key) => (
          <button
            key={key}
            className="button"
            onClick={() => handleExpirationChange(key)}
          >
            {key}
          </button>
        ))}
      </div>
        <div className="trade-container8">
        <div className="trade-buyandsell">
          <div className="trade-container2">
            <button
             onClick={() => {
              setActiveSelector("token1");
              setShowModal(true);
            }}
            type="button" className="trade-button1 button">
              <span>
                {props.button5 ?? (
                  <Fragment>
                    <span className="trade-text27">
                    {
            inputBalance<inputAmountWei && token1?.symbol!='CORE' ?  <>
            Insufficient
            </> : (allowance < inputAmountWei) && token1?.symbol!='CORE' ? 
             <>
            <TransactionButton
                transaction={() => {
                    return approve({
                        contract: tokenContract,
                        amount: Number(inputAmount),
                        spender: poolAddress
                    })
                }}
                onSent="Approve your tokens for use..."
                onConfirmed="Tokens successfully approved for use."
                onError="Failed to approve tokens!"
                successCallback={refetchAllowance}
            >
             Approve
            </TransactionButton>
           </> :    <>
           <TransactionButton
          transaction={() => {
            return prepareTransaction(buy);
            
          }}
          onSent="Swap submitted..."
          onConfirmed="Successfully swapped."
          onError="Failed to complete swap."
          successCallback={refetchBalance}
      >
BUY
      </TransactionButton> 
   </>
          }
                    </span>
                  </Fragment>
                )}
              </span>
            </button>
            <button
              onClick={() => {
                setActiveSelector("token2");
                setShowModal(true);
              }}
            type="button" className="trade-button2 button">
              <span>
                {props.button6 ?? (
                  <Fragment>
                    <span className="trade-text25">
                    <span>
                {props.button5 ?? (
                  <Fragment>
                    <span className="trade-text27">
                    {
            inputBalance<inputAmountWei && token1?.symbol!='CORE' ?  <>
            Insufficient
            </> : (allowance < inputAmountWei) && token1?.symbol!='CORE' ? 
             <>
            <TransactionButton
                transaction={() => {
                    return approve({
                        contract: tokenContract,
                        amount: Number(inputAmount),
                        spender: poolAddress
                    })
                }}
                onSent="Approve your tokens for use..."
                onConfirmed="Tokens successfully approved for use."
                onError="Failed to approve tokens!"
                successCallback={refetchAllowance}
            >
             Approve
            </TransactionButton>
           </> :    <>
           <TransactionButton
          transaction={() => {
            return prepareTransaction(sell);
            
          }}
          onSent="Swap submitted..."
          onConfirmed="Successfully swapped."
          onError="Failed to complete swap."
          successCallback={refetchBalance}
      >
SELL
      </TransactionButton> 
   </>
          }
                    </span>
                  </Fragment>
                )}
              </span>
                    </span>
                  </Fragment>
                )}
              </span>
            </button>
          </div>
        </div>
      
        </div>
        <div className='note'>
Select
        </div>
      </div>
      <style jsx>
        {`
          .trade-trade {
            flex: 0 0 auto;
            width: 100%;
            height: auto;
            display: flex;
            position: relative;
            align-items: flex-start;
            padding-bottom: 20px;
            flex-direction: column;
          }
          .trade-container1 {
            width: 100%;
            height: auto;
            display: flex;
            align-items: flex-start;
          }
          .trade-buyandsell {
            gap: var(--dl-space-space-halfunit);
            width: 100%;
            height: auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: center;
            justify-content: center;
          }
          .trade-container2 {
            flex: 0 0 auto;
            width: 100%;
            cursor: pointer;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: flex-start;
            border-radius: 10px;
            backdrop-filter: blur(10px);
            justify-content: space-between;
            background-color: rgba(90, 90, 90, 0.2);
          }
          .trade-button1 {
            width: 49%;
            cursor: pointer;
            background-color: rgba(30, 148, 0, 0.63);
          }
          .trade-button2 {
            width: 49%;
            cursor: pointer;
            background-color: rgba(198, 0, 3, 0.63);
          }
          .trade-container3 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: flex-start;
          }
          .trade-textinput1 {
            width: 100%;
            padding: var(--dl-space-space-unit);
            border-width: 0px;
          }
          .trade-container4 {
            gap: var(--dl-space-space-halfunit);
            flex: 0 0 auto;
            width: 100%;
            cursor: pointer;
            display: grid;
            padding: var(--dl-space-space-halfunit);
            grid-template-columns: 1fr 1fr 1fr 1fr;
          }
          .trade-button3 {
            background-color: rgba(41, 41, 41, 0.41);
          }
          .trade-button4 {
            background-color: rgba(41, 41, 41, 0.41);
          }
          .trade-button5 {
            background-color: rgba(41, 41, 41, 0.41);
          }
          .trade-button6 {
            background-color: rgba(41, 41, 41, 0.41);
          }
          .trade-container5 {
            flex: 0 0 auto;
            width: 100%;
            height: auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: flex-start;
            justify-content: space-between;
          }
          .trade-text17 {
           
          }
          .trade-container6 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: flex-start;
          }
          .trade-textinput2 {
            width: 100%;
            padding: var(--dl-space-space-unit);
            border-width: 0px;
          }
          .trade-container7 {
            flex: 0 0 auto;
            width: 100%;
            height: auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: flex-start;
            justify-content: space-between;
          }
          .trade-text19 {
           
          }
          .trade-container8 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: flex-start;
            padding-left: var(--dl-space-space-halfunit);
            padding-right: var(--dl-space-space-halfunit);
          }
          .trade-button7 {
            color: rgb(154, 154, 154);
            width: 100%;
            font-size: 18px;
            font-style: normal;
            font-weight: 700;
            padding-top: var(--dl-space-space-unit);
            border-color: rgba(0, 0, 0, 0.2);
            border-width: 4px;
            border-radius: 100px;
            background-color: rgba(41, 41, 41, 0.41);
          }
          .trade-text20 {
            fill: var(--dl-color-theme-secondary1);
            color: var(--dl-color-theme-secondary1);
          }
          .trade-text21 {
            display: inline-block;
          }
          .trade-text22 {
            display: inline-block;
          }
          .trade-text23 {
            display: inline-block;
          }
          .trade-text24 {
            display: inline-block;
          }
          .trade-text25 {
            display: inline-block;
          }
          .trade-text26 {
            display: inline-block;
          }
          .trade-text27 {
            display: inline-block;
          }
          .trade-text28 {
            display: inline-block;
          }
          .trade-text29 {
            display: inline-block;
          }
          .trade-text30 {
            display: inline-block;
          }
          .trade-text31 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

Trade.defaultProps = {
  text6: undefined,
  text1: undefined,
  button3: undefined,
  button4: undefined,
  button6: undefined,
  rootClassName: '',
  button2: undefined,
  button5: undefined,
  text: undefined,
  button: undefined,
  textinputPlaceholder: 'Enter Amount',
  text11: undefined,
  button1: undefined,
}

Trade.propTypes = {
  text6: PropTypes.element,
  text1: PropTypes.element,
  button3: PropTypes.element,
  button4: PropTypes.element,
  button6: PropTypes.element,
  rootClassName: PropTypes.string,
  button2: PropTypes.element,
  button5: PropTypes.element,
  text: PropTypes.element,
  button: PropTypes.element,
  textinputPlaceholder: PropTypes.string,
  text11: PropTypes.element,
  button1: PropTypes.element,
}

export default Trade
