// components/Loading.js
import styles from './Loading.module.css';
import { useEffect, useState } from 'react';

const Loading = () => {
   const facts = [
    "Did you know? The first Bitcoin transaction was for two pizzas.",
    "Did you know? There are over 5,000 different cryptocurrencies in circulation.",
    "Did you know? The total market cap of all cryptocurrencies surpassed $2 trillion in 2021.",
    "Did you know? Ethereum's founder, Vitalik Buterin, was just 19 when he conceived the idea.",
    "Did you know? Bitcoin has a fixed supply of 21 million coins.",
    "Did you know? The pseudonymous creator of Bitcoin is known as Satoshi Nakamoto.",
    "Did you know? The term 'HODL' originated from a misspelled forum post.",
    "Did you know? Cryptocurrency transactions are verified by network nodes through cryptography.",
    "Did you know? Litecoin is known as the 'silver' to Bitcoin's 'gold'.",
    "Did you know? The largest crypto exchange by trading volume is Binance.",
    "Did you know? RareBay is a Layer2 that is ₿itcoin secured",
    "Did you know? RareCoin is halved every 4 years just like Bitcoin",
    "Did you know? The concept of cryptocurrency predates Bitcoin. It was first described in 1998 by Wei Dai.",
    "Did you know? Bitcoin's price reached $1 for the first time in February 2011.",
    "Did you know? The smallest unit of Bitcoin is called a 'Satoshi', which is one hundred millionth of a Bitcoin.",
    "Did you know? In 2010, a programmer paid 10,000 Bitcoins for two pizzas. Today, those Bitcoins would be worth millions.",
    "Did you know? Ripple's XRP is designed primarily for digital payment processing.",
    "Did you know? Dogecoin, initially created as a joke, became one of the top 10 cryptocurrencies by market cap.",
    "Did you know? Bitcoin mining uses more electricity annually than the entire country of Argentina.",
    "Did you know? El Salvador was the first country to adopt Bitcoin as legal tender in 2021.",
    "Did you know? The first decentralized cryptocurrency was Bitcoin, which was created in 2009.",
    "Did you know? There are ATMs in several countries where you can buy and sell Bitcoin.",
    "Did you know? Ethereum allows developers to create decentralized applications (dApps) on its blockchain.",
    "Did you know? Cryptocurrencies can be stored in digital wallets, which can be hardware or software-based.",
    "Did you know? Tether (USDT) is a stablecoin, meaning its value is pegged to a fiat currency like the US dollar.",
    "Did you know? Binance Coin (BNB) was originally an Ethereum-based token before it migrated to its own blockchain.",
    "Did you know? RareBay is as Rare as you",
  ];
  const [randomFact, setRandomFact] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * facts.length);
    setRandomFact(facts[randomIndex]);
  }, []);

  return (
   <>
   <div className={styles.bd}>
   <div className={styles.hourglass}></div>
   <p style={{height: '100px', color: "rgba(165, 165, 165, 0.9)", fontSize: "14px", width: "100%", textAlign: "center", alignItems: "center", justifyContent: "center", padding: "10px", maxWidth: "350px"}}>
   {randomFact}
   </p>
   </div>
  
   </>
  );
};

export default Loading;
