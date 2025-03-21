import React, { Fragment, useContext, useEffect, useState } from 'react'
import Head from 'next/head'

import { useTranslations } from 'next-intl'

import Nav from '../components/nav'
import TokenHeader from '../components/token-header'
import GridOne from '../components/grid-one'
import GridTwo from '../components/grid-two'
import GridThree from '../components/grid-three'
import Settings from '../components/settings'
import Resources from '../components/resources'
import Connect from '../components/connect'
import Connected from '../components/connected'
import Mobile from '../components/mobile'
import Modal from '../components/Modal'
import { LayoutProvider, useLayout } from '../lib/laytoutContext'
import { useActiveAccount, useReadContract } from 'thirdweb/react'
import { defineChain, getContract } from 'thirdweb'
import { client } from '../lib/thirdweb-client'
import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";
import { useConnectModal } from "thirdweb/react";
import { TokenContext } from '../lib/tokenContext'
import { useBackground } from '../lib/context'

const Home = (props) => {
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    console.log("Modal opened");
  };
  const closeModal = () => setIsModalOpen(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const openModal1 = () => {
    setIsModalOpen1(true);
    console.log("Modal opened");
  };
  const closeModal1 = () => setIsModalOpen1(false);

  const [isModalOpen3, setIsModalOpen3] = useState(false);

  const openModal3 = () => {
    setIsModalOpen3(true);
    console.log("Modal opened");
  };
  const closeModal3 = () => setIsModalOpen3(false);

  const [isModalOpen4, setIsModalOpen4] = useState(false);

  const openModal4 = () => {
    setIsModalOpen4(true);
    console.log("Modal opened");
  };
  const closeModal4 = () => setIsModalOpen4(false);

  const [isModalOpen5, setIsModalOpen5] = useState(false);

  const openModal5 = () => {
    setIsModalOpen5(true);
    console.log("Modal opened");
  };
  const closeModal5 = () => setIsModalOpen5(false);
  const [isModalOpen6, setIsModalOpen6] = useState(true);

  const openModal6 = () => {
    setIsModalOpen6(true);
    console.log("Modal opened");
  };
  const closeModal6 = () => setIsModalOpen6(false);

  const { gridOrder, toggleLayout, proMode, togglePro } = useLayout();
  const { showEarthContainer, toggleEarthContainer, setShowEarthContainer } = useBackground();

  const account = useActiveAccount();
  const address = account?.address;

  const [isPageHidden, setIsPageHidden] = useState(false);
  useEffect(()=>{
    if(proMode){
      setShowEarthContainer(false)
    }
  })
  useEffect(() => {
    if (isPageHidden) {
      document.body.style.overflow = "hidden";
      document.body.style.visibility = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.visibility = "visible";
    }

    return () => {
      // Cleanup in case component is unmounted
      document.body.style.overflow = "auto";
      document.body.style.visibility = "visible";
    };
  }, [isPageHidden]);
  const contract = getContract({
    client: client,
    chain: defineChain(1116), // Specify the chain ID
    address: "0x7f5eaB9bF5817da114AdF3a923EaED76F6e250F5" || "0xC49846Dc7CeFA803EA90443392080b534479eA95", // Contract address
  });
  const { data: balance, isPending } = useReadContract({
    contract: contract,
    method:
      "function balanceOf(address owner) view returns (uint256)",
    params: [address],
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
  const { currentChain, changeChain, availableChains } = useContext(TokenContext);
  const [newChainId, setNewChainId] = useState();

  const { connect, isConnecting } = useConnectModal();
  async function handleConnect() {
    const wallet = await connect({ client, chain: currentChain, size: 'compact', wallets: wallets, showThirdwebBranding: false, termsOfServiceUrl: "https://rarebay.xyz/terms", title: 'Rare Connect'}); // opens the connect modal
  }

 if (!account){
  return(
    <div className='modal'>
      <div className='modal-content'>
       <h2 style={{color: 'rgba(100, 100, 100, 0.5)'}}>-Connect Wallet-</h2>
     <hr />
       <p style={{fontSize: '13px', fontStyle: 'italic'}}>
        Please connect your wallet to access the Beta version.
       </p>
       <hr />
       <div style={{display: 'flex', gap: '20px'}}> 
      <div onClick={handleConnect} className='button'>{isConnecting ? <div className='spinner' /> : 'Çonnect'}</div> </div>
       <hr />
       <div  style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '0px'}}>
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
      </div>
    </div>
  )
 }


  return (
    <>
      {isModalOpen &&  <div onClick={closeModal} style={{position: 'fixed', zIndex: '600', height: '100%', width: '100%', overflow: 'hidden'}}><Resources isModalOpen={isModalOpen} /></div> }
      {isModalOpen1 &&  <div  style={{position: 'fixed', zIndex: '600', height: '100%', width: '100%', right: '0px', overflow: 'hidden'}} ><Connect closeModal1={closeModal1} /></div> }
      {isModalOpen4 && address && <div  style={{position: 'fixed', zIndex: '600', height: '100%', width: '100%', right: '0px', overflow: 'hidden'}} ><Connected proMode={proMode} closeModal4={closeModal4} /></div> }
      {isModalOpen3 &&  <div style={{position: 'fixed', zIndex: '900', height: '100%', right: '0px', width: '100%', overflow: 'hidden'}}><Settings proMode={proMode} toggleLayout={toggleLayout} closeModal3={closeModal3} /></div> }
      {isModalOpen5 &&  <div style={{position: 'fixed', zIndex: '900', height: '100%', right: '0px', width: '100%', overflow: 'hidden'}}>
        <div className='modal'  onClick={closeModal5}>
         <div className='modal-content'>
         <h2 style={{color: 'rgba(200, 200, 200, 0.7)'}}>Coming soon</h2><br></br>
          <p>Our devs are cooking🔥,<br /> Follow socials and stay tuned for updates</p>
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
         </div>
        </div>
      </div> }
  <div>
    <div className="home-container1">
        <Head>
          <title>RareBay | Interface</title>
          <meta property="og:title" content="RareBay | Interface" />
        </Head>
        <div className="home-container2">
          <Nav rootClassName="navroot-class-name" openModal={openModal} openModal1={openModal1} openModal4={openModal4}></Nav>
          <TokenHeader openModal3={openModal3}></TokenHeader>
        </div>
        <div className="home-layout">
       
        <GridOne togglePro={togglePro} proMode={proMode} visible={proMode || gridOrder[0] === 1} openModal3={openModal3} order={gridOrder[0]} rootClassName="grid-oneroot-class-name"></GridOne>
          <GridTwo
   order={gridOrder[1]}
   visible={proMode}
            heading={
              <Fragment>
                <span className="home-text28">Transactions</span>
              </Fragment>
            }
            heading1={
              <Fragment>
                <span className="home-text29">Holders</span>
              </Fragment>
            }
            heading2={
              <Fragment>
                <span className="home-text30">Liquidity</span>
              </Fragment>
            }
            rootClassName="grid-tworoot-class-name"
          ></GridTwo>
          <GridThree
       order={gridOrder[2]}
       visible={proMode}
            heading={
              <Fragment>
                <span className="home-text31">Trending</span>
              </Fragment>
            }
            heading1={
              <Fragment>
                <span className="home-text32">watchlist</span>
              </Fragment>
            }
            heading2={
              <Fragment>
                <span className="home-text33">Wallet</span>
              </Fragment>
            }
            rootClassName="grid-threeroot-class-name"
          ></GridThree>
        </div>

        <Resources
          text={
            <Fragment>
              <span className="home-text48">Resources</span>
            </Fragment>
          }
          text1={
            <Fragment>
              <span className="home-text49">Rarex</span>
            </Fragment>
          }
          text2={
            <Fragment>
              <span className="home-text50">NFT Marketplace</span>
            </Fragment>
          }
          text3={
            <Fragment>
              <span className="home-text51">soon</span>
            </Fragment>
          }
          text4={
            <Fragment>
              <span className="home-text52">Blogs</span>
            </Fragment>
          }
          text5={
            <Fragment>
              <span className="home-text53">soon</span>
            </Fragment>
          }
          text6={
            <Fragment>
              <span className="home-text54">Community</span>
            </Fragment>
          }
          text7={
            <Fragment>
              <span className="home-text55">GameFi</span>
            </Fragment>
          }
          text8={
            <Fragment>
              <span className="home-text56">Airdrop</span>
            </Fragment>
          }
          text9={
            <Fragment>
              <span className="home-text57">Mining</span>
            </Fragment>
          }
          text10={
            <Fragment>
              <span className="home-text58">DAO governance</span>
            </Fragment>
          }
          text11={
            <Fragment>
              <span className="home-text59">FAQ</span>
            </Fragment>
          }
          text12={
            <Fragment>
              <span className="home-text60">Documentation</span>
            </Fragment>
          }
          rootClassName="resourcesroot-class-name"
        ></Resources>
        <div className="home-container3"></div>
        <Mobile openModal={openModal} openModal1={openModal5} rootClassName="mobileroot-class-name" ></Mobile>
      </div>
    </div>
    </>
  )
}

export default function App() {
  return (
    <LayoutProvider>
      <Home />
    </LayoutProvider>
  );
}