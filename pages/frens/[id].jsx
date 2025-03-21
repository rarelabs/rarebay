import React, { useState } from 'react'
import Head from 'next/head'
import Nav from '../../components/nav'
import ContentList4 from '../../components/content-list4'
import Footer from '../../components/foot'
import Resources from '../../components/resources'
import Connect from '../../components/connect'
import Connected from '../../components/connected'
import Settings from '../../components/settings'
import { useActiveAccount } from 'thirdweb/react'
import Mobile from '../../components/mobile'
import FAQ1 from '../../components/refer'
import { useRouter } from 'next/router'

const FAQ = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  
  const account = useActiveAccount();
  const address = account?.address
  const router = useRouter();
  
  const openModal = () => {
    setIsModalOpen(true);
    console.log("Modal opened");
  };

  const closeModal = () => setIsModalOpen(false);
  const openModal1 = () => {
    setIsModalOpen1(true);
    console.log("Modal opened");
  };
  const closeModal1 = () => setIsModalOpen1(false);
  const openModal3 = () => {
    setIsModalOpen3(true);
    console.log("Modal opened");
  };
  const closeModal3 = () => setIsModalOpen3(false);
  const openModal4 = () => {
    setIsModalOpen4(true);
    console.log("Modal opened");
  };
  const closeModal4 = () => setIsModalOpen4(false);
  
  const back = () => router?.back()

  // Function to share the page URL
  const [isModalOpen5, setIsModalOpen5] = useState(false);

  const openModal5 = () => {
    setIsModalOpen5(true);
    console.log("Modal opened");
  };
  const closeModal5 = () => setIsModalOpen5(false);


  return (
    <>
      {isModalOpen5 &&  <div style={{position: 'fixed', zIndex: '900', height: '100%', right: '0px', width: '100%', overflow: 'hidden'}}>
        <div className='modal'  onClick={closeModal5}>
         <div className='modal-content'>
         <h2 style={{color: 'rgba(200, 200, 200, 0.7)'}}>Coming soon</h2><br></br>
          <p>The devs are cooking🔥,<br /> Follow socials and stay tuned for updates</p>
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
      <div className='x'>
     
        <svg onClick={back} style={{ color: 'white', fill: 'white' }} xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 1024 1024">
          <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" />
          <path color="white" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" />
        </svg>
  
      </div>
      
      <Mobile openModal={openModal} openModal1={openModal5} rootClassName="mobileroot-class-name" ></Mobile>
      {isModalOpen && <div onClick={closeModal} style={{ position: 'fixed', zIndex: '600', height: '100%', width: '100%', overflow: 'hidden' }}><Resources isModalOpen={isModalOpen} /></div>}
      {isModalOpen1 && <div style={{ position: 'fixed', zIndex: '600', height: '100%', width: 'auto', right: '0px', overflow: 'hidden' }} ><Connect closeModal1={closeModal1} /></div>}
      {isModalOpen4 && address && <div style={{ position: 'fixed', zIndex: '600', height: '100%', width: 'auto', right: '0px', overflow: 'hidden' }} ><Connected closeModal4={closeModal4} /></div>}
      {isModalOpen3 && <div style={{ position: 'fixed', zIndex: '900', height: '100%', right: '0px', width: 'auto', overflow: 'hidden' }}><Settings toggleLayout={toggleLayout} closeModal3={closeModal3} /></div>}
      
      <div className="tc-container">
      <Head>
  <title>RareBay | Frens</title>
  <meta name="description" content="Bitcoin powered⚡ DeFi world.
Swap, Trade, Stake, Play, Earn, Learn, seamlessly, anywhere." />
  
  {/* Open Graph Meta Tags */}
  <meta property="og:title" content="RareBay | Interface" />
  <meta property="og:description" content="Bitcoin powered⚡ DeFi world.
Swap, Trade, Stake, Play, Earn, Learn, seamlessly, anywhere." />
  <meta property="og:image" content="https://rarebay.xyz/rare-900w.png" />  {/* Replace with your image URL */}
  <meta property="og:url" content={window.location.href} />
  
  {/* Twitter Meta Tags */}
  <meta name="twitter:card" content="RareBay | Interface" />
  <meta name="twitter:title" content="RareBay | Interface" />
  <meta name="twitter:description" content="Bitcoin powered⚡ DeFi world.
Swap, Trade, Stake, Play, Earn, Learn, seamlessly, anywhere." />
  <meta name="twitter:image" content="https://rarebay.xyz/rare-900w.png" />  {/* Replace with your image URL */}
</Head>

  
        <FAQ1 />
        <hr />    
       
  <div className='center'>
  <Footer rootClassName="footer-root-class-name2"></Footer>
      
  </div>
      </div>


      <style jsx>
        {`
          .tc-container {
            width: 100%;
            display: flex;
            z-index: 50;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
            background-size: cover;
            justify-content: center;
            color rgba(100, 100, 100, 0.5);
          }

          .share-button {
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #2d88ff;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .share-button:hover {
            background-color: #256ed4;
          }
        `}
      </style>
    </>
  )
}

export default FAQ
