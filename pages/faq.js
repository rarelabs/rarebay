import React, { useState } from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import ContentList4 from '../components/content-list4'
import Footer from '../components/foot'
import Resources from '../components/resources'
import Connect from '../components/connect'
import Connected from '../components/connected'
import Settings from '../components/settings'
import { useActiveAccount } from 'thirdweb/react'
import Mobile from '../components/mobile'
import FAQ1 from '../components/faq1'
import { useRouter } from 'next/router'

const FAQ = (props) => {
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
      const account = useActiveAccount();
      const address = account?.address
      const router = useRouter();
     function back(){
      router?.back()
    }
  return (
    <>
    <div className='x'>
    <svg onClick={back} style={{color: 'white', fill: 'white'}} xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 1024 1024"><path  d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"/><path color="white" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"/></svg>
    </div>
     <Mobile openModal={openModal} rootClassName="mobileroot-class-name" ></Mobile>
    {isModalOpen &&  <div onClick={closeModal} style={{position: 'fixed', zIndex: '600', height: '100%', width: '100%', overflow: 'hidden'}}><Resources isModalOpen={isModalOpen} /></div> }
      {isModalOpen1 &&  <div  style={{position: 'fixed', zIndex: '600', height: '100%', width: 'auto', right: '0px', overflow: 'hidden'}} ><Connect closeModal1={closeModal1} /></div> }
      {isModalOpen4 && address && <div  style={{position: 'fixed', zIndex: '600', height: '100%', width: 'auto', right: '0px', overflow: 'hidden'}} ><Connected closeModal4={closeModal4} /></div> }
      {isModalOpen3 &&  <div style={{position: 'fixed', zIndex: '900', height: '100%', right: '0px', width: 'auto', overflow: 'hidden'}}><Settings toggleLayout={toggleLayout} closeModal3={closeModal3} /></div> }
      <div className="tc-container">
      <Head>
  <title>RareBay | FAQ</title>
  <meta name="description" content="Bitcoin powered⚡ DeFi world.
Swap, Trade, Stake, Play, Earn, Learn, seamlessly, anywhere, anytime." />
  
  {/* Open Graph Meta Tags */}
  <meta property="og:title" content="RareBay | Interface" />
  <meta property="og:description" content="Bitcoin powered⚡ DeFi world.
Swap, Trade, Stake, Play, Earn, Learn, seamlessly, anywhere, anytime." />
  <meta property="og:image" content="https://rarebay.xyz/rare-900w.png" />  {/* Replace with your image URL */}
  <meta property="og:url" content={window.location.href} />
  
  {/* Twitter Meta Tags */}
  <meta name="twitter:card" content="RareBay | Interface" />
  <meta name="twitter:title" content="RareBay | Interface" />
  <meta name="twitter:description" content="Bitcoin powered⚡ DeFi world.
Swap, Trade, Stake, Play, Earn, Learn, seamlessly, anywhere, anytime." />
  <meta name="twitter:image" content="https://rarebay.xyz/rare-900w.png" />  {/* Replace with your image URL */}
</Head>
      <FAQ1 />
        <Footer rootClassName="footer-root-class-name2"></Footer>
      </div>
      <style jsx>
        {`
          .tc-container {
            width: 100%;
            display: flex;
            z-index: 310;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
            background-size: cover;
            justify-content: flex-start;
          }
        `}
      </style>
    </>
  )
}

export default FAQ
