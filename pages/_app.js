import './style.css';

import { useEffect, useState } from "react";
import { BackgroundProvider, useBackground } from "../lib/context";
import { ThirdwebProvider, useActiveAccount } from 'thirdweb/react';
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { AutoConnect } from "thirdweb/react";
import { client } from '../lib/thirdweb-client';
import { ToastProvider } from '../utils/toast';
import Load from "../components/load";
import { useRouter } from 'next/router';
import { Analytics, track } from "@vercel/analytics/react";
import Web3 from 'web3';
import Link from 'next/link';
import { getLatestBlockNumber } from '../utils/blocks';
import Glow from '../components/glow';
import { TokenProvider } from '../lib/tokenContext';
import Tooltip from '../components/tooltip';
import ContentList4 from '../components/content-list4';
import { OkxProvider } from '../lib/bitcoin';
import Time from '../components/time';
import { LayoutProvider, useLayout } from '../lib/laytoutContext';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';

const logBlockedUser = (country) => {
  track('Blocked User', { country });
};



export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [userCountry, setUserCountry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(true);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(true);
  const [gasFee, setGasFee] = useState(null);
  const [agree, setAgree] = useState(false);

  // Connect to CoreDAO RPC endpoint
  const web3 = new Web3('https://rpc.coredao.org');

  // Function to fetch current gas price
  const [gasFeeWei, setGasFeeWei] = useState(null);

  // Connect to CoreDAO RPC endpoint
  // Function to fetch current gas price
  const fetchGasPrice = async () => {
    try {
      const gasPriceWei = await web3.eth.getGasPrice(); // Fetch gas price in Wei
      const gasPriceInteger = Math.floor(Number(gasPriceWei) / 1e9); // Convert Wei to an integer with human-readable units
      setGasFeeWei(gasPriceInteger);
    } catch (error) {
      console.error('Error fetching gas price:', error);
    }
  };

  // Fetch gas price initially and then every 60 seconds
  useEffect(() => {
    fetchGasPrice();
    const interval = setInterval(fetchGasPrice, 60000); // Refresh every minute

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const prohibitedLocations = ['US', 'KP', 'IR', 'RU', 'CH', 'IQ', 'EG', 'BD', 'EC', 'DZ', 'NP', 'PK'];

  useEffect(() => {
    const fetchLocation = async () => {
      if (typeof window !== 'undefined') {
        try {
          const res = await fetch('/api/analytics'); // Get location from API
          const data = await res.json();
          // Ensure the country code is uppercase for consistent checking.
          const country = data.country ? data.country.toUpperCase() : '';
  
          // Check each prohibited location one by one.
          let isProhibited = false;
          for (const loc of prohibitedLocations) {
            if (country === loc) {
              isProhibited = true;
              break;
            }
          }
          
          if (isProhibited) {
            logBlockedUser(country);
            setShowModal(true); // Show modal if the location is prohibited
            console.log('User prohibited');
          }
          setUserCountry(country);
        } catch (error) {
          console.error('Error fetching location:', error);
        }
      }
    };
  
    fetchLocation();
  }, []);
  

  // Disable right-click and print screen functionality
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if (
        e.code === 'PrintScreen' || // PrintScreen (May not work)
        (e.ctrlKey && e.shiftKey && e.key === "S") || // Windows Snipping Tool
        (e.metaKey && e.shiftKey && e.key === "4") // Mac Screenshot Shortcut
      ) {
        alert("Screenshots are not allowed!");
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText("Screenshots are not allowed!").catch(() => {});
      }
      document.addEventListener("keydown", (e) => {
        console.log(`Key: ${e.key}, Code: ${e.code}, KeyCode: ${e.keyCode}`);
      });
      
      if ((e.ctrlKey && e.shiftKey && e.key === "S") || (e.metaKey && e.shiftKey && e.key === "4")) {
        alert("Screenshots are disabled!");
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Manage loading states
  useEffect(() => {
    if (initialLoad) {
      const timer = setTimeout(() => {
        setLoading(false);
        setInitialLoad(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [initialLoad]);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setTimeout(() => setLoading(false), 1000);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  const wallets = [
    inAppWallet({
      auth: {
        options: [
          "discord",
          "telegram",
          "farcaster",
          "email",
          "x",
          "passkey",
          "phone",
          "google",
        ],
      },
    }),
    createWallet("io.metamask"),
    createWallet("com.bitget.web3"),
    createWallet("com.okex.wallet"),
  ];
  const [blockNumber, setBlockNumber] = useState(null);

  useEffect(() => {
    const fetchBlockNumber = async () => {
      try {
        const latestBlock = await getLatestBlockNumber();
        setBlockNumber(latestBlock);
      } catch (error) {
        console.error("Error fetching block number:", error);
      }
    };

    fetchBlockNumber();
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("Service Worker registered"))
        .catch((error) => console.error("Service Worker registration failed:", error));
    }
  }, []);

  return (
    <ThirdwebProvider>
      <OkxProvider>
     <TokenProvider>
     <BackgroundProvider>
        <ToastProvider>
          {loading ? (
            <Load />
          ) : (
            <>
              <div className='watermark' />
              <AutoConnect wallets={wallets} client={client} />
              <Analytics />
           
              {showModal && (
                <div className="modal">
                  <div className="modal-content">
                    <hr />
                    <hr />
                    <h2>Restricted region</h2>
                    <p className='red'>
                      Unfortunately, your region ({userCountry}) is not supported.
                      Proceeding on a restricted region violates the <Link style={{color: 'skyblue'}} href='/terms'>Terms of service</Link>
                    </p>
                    <hr />
                    <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '0px'}}>
              <a href='https://twitter.com/rarebay'>
              <svg  width="24px" height="24px" viewBox="0 0 24 24">
                <path
                  d="m3 21l7.548-7.548M21 3l-7.548 7.548m0 0L8 3H3l7.548 10.452m2.904-2.904L21 21h-5l-5.452-7.548"
                  fill="none"
                  color="currentColor"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              </a>
              <a href='https://discord.com/invite/scdXvAnxMK'>  <svg width="32" height="32" viewBox="0 0 32 32">
                <path
                  d="M25.7 7.1Q23 5.9 20 5.3h-.1c-.2.4-.5 1-.7 1.5c-2.2-.3-4.3-.3-6.4 0c-.2-.5-.5-1-.7-1.5H12q-3 .45-5.7 1.8C2.7 12.5 1.7 17.8 2.2 23v.1c2.4 1.8 4.7 2.8 7 3.5h.1c.5-.7 1-1.5 1.4-2.3v-.1c-.8-.3-1.5-.6-2.2-1c-.1 0-.1-.1 0-.1c.1-.1.3-.2.4-.3H9c4.6 2.1 9.5 2.1 14.1 0h.1c.1.1.3.2.4.3c.1 0 0 .1 0 .1c-.7.4-1.4.8-2.2 1c0 0-.1.1 0 .1c.4.8.9 1.6 1.4 2.3h.1c2.3-.7 4.6-1.8 7-3.5V23c.6-6-1-11.2-4.2-15.9M11.4 19.9c-1.4 0-2.5-1.3-2.5-2.8s1.1-2.8 2.5-2.8s2.5 1.3 2.5 2.8s-1.1 2.8-2.5 2.8m9.3 0c-1.4 0-2.5-1.3-2.5-2.8s1.1-2.8 2.5-2.8s2.5 1.3 2.5 2.8s-1.1 2.8-2.5 2.8"
                  fill="currentColor"
                ></path>
              </svg></a>
              <a href='https://t.me/rar3bay'>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M21 5L2 12.5l7 1M21 5l-2.5 15L9 13.5M21 5L9 13.5m0 0V19l3.249-3.277"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
                 </a>
             
            </div>
                    <button className='x' onClick={() => setShowModal(false)}>
<svg width="24" height="24" viewBox="0 0 32 32">
            <path
              d="M2 6v20a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2m2 0h16v20H4v-9h10.17l-3.58 3.59L12 22l6-6l-6-6l-1.41 1.41L14.17 15H4z"
              fill="currentColor"
            ></path>
          </svg>
          back

                    </button>
                  </div>
                </div>
              )}
              <div style={{display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'center', fontSize: '14px', position: 'fixed', left: '10px', bottom: '10px', padding: '5px', borderRadius: '10px', background: 'rgba(20, 20, 20, 0.5)', backdropFilter: 'blur(10px)', border: 'solid 1px rgba(50, 50, 50, 0.3)', color: 'lightgray', zIndex: '1'}} >
  <img src='/gass.png' width={20} />
  <p>{gasFeeWei !== null ? `${gasFeeWei} Wei` : '...'}</p>
  </div>
 <div style={{width: '100%', position: 'fixed', background: 'transparent'}}>
 <Time ></Time>
 </div>
              {!showModal && <> 
              
              <LayoutProvider>
             <ErrorBoundary>
              <div className='grd' />
               <Component {...pageProps} />
             </ErrorBoundary>
                </LayoutProvider></>}

          
              <Glow />
            </>
          )}
          
          {showModal3 && (
                <div style={{position: 'fixed', width: '100%', height: '100%', zIndex: '1000', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(10px)', top: '0px', overflow: 'scroll'}}>
                  <div className='x' onClick={() => setShowModal3(false)}>
<svg width="24" height="24" viewBox="0 0 32 32">
            <path
              d="M2 6v20a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2m2 0h16v20H4v-9h10.17l-3.58 3.59L12 22l6-6l-6-6l-1.41 1.41L14.17 15H4z"
              fill="currentColor"
            ></path>
          </svg>
          back

                  </div>
                 <ContentList4 close={() => {
            addToast('success', 'Successfuly agreed to the terms')
            setModal3(false)}} />
                  </div>)}
        </ToastProvider>
      </BackgroundProvider>
     </TokenProvider>
     </OkxProvider>
    </ThirdwebProvider>
  );
}
