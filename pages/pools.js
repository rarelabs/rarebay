import React, { Fragment, useState } from 'react'
import Head from 'next/head'

import { useTranslations } from 'next-intl'

import Nav from '../components/nav'
import Tabs2 from '../components/tabs2'
import Table from '../components/table'
import Mobile from '../components/mobile'
import PoolsTable from '../components/poolsTable'
import { useActiveAccount } from 'thirdweb/react'
import Settings from '../components/settings'
import Resources from '../components/resources'
import Connect from '../components/connect'
import Connected from '../components/connected'

const Pools = (props) => {
  const account = useActiveAccount();
  const address = account?.address;
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
  const [isModalOpen6, setIsModalOpen6] = useState(false);

  const openModal6 = () => {
    setIsModalOpen6(true);
    console.log("Modal opened");
  };
  const closeModal6 = () => setIsModalOpen6(false);
  
  return (
    <>
     {isModalOpen &&  <div onClick={closeModal} style={{position: 'fixed', zIndex: '600', height: '100%', width: '100%', overflow: 'hidden'}}><Resources /></div> }
      {isModalOpen1 &&  <div  style={{position: 'fixed', zIndex: '600', height: '100%', width: '100%', right: '0px', overflow: 'hidden'}} ><Connect closeModal1={closeModal1} /></div> }
      {isModalOpen4 && address && <div  style={{position: 'fixed', zIndex: '600', height: '100%', width: '100%', right: '0px', overflow: 'hidden'}} ><Connected proMode={false} closeModal4={closeModal4} /></div> }
      {isModalOpen3 &&  <div style={{position: 'fixed', zIndex: '900', height: '100%', right: '0px', width: '100%', overflow: 'hidden'}}><Settings proMode={false} toggleLayout={toggleLayout} closeModal3={closeModal3} /></div> }
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
      <div className="pools-container1">
        <Head>
          <title>RareBay | Interface</title>
          <meta
            property="og:title"
            content="Pools - Exciting Secondary Snake"
          />
        </Head>
        <div className="home-container2">
          <Nav closeModal1={closeModal1} closeModal={closeModal} rootClassName="navroot-class-name" openModal={openModal} openModal1={openModal1} openModal4={openModal4}></Nav>
          <Tabs2
           
           ></Tabs2>
        </div>
    
     <div className='center-c'>
     <PoolsTable />
     </div>
      <Mobile openModal={openModal} rootClassName="mobileroot-class-name" ></Mobile>
      </div>
      <style jsx>
        {`
          .pools-container1 {
            color: gray;
            width: 100%;
            display: flex;
            min-height: 100vh;
            align-items: flex-start;
            flex-direction: column;
            justify-content: flex-start;
          }
          .pools-text10 {
            display: inline-block;
          }
          .pools-text11 {
            display: inline-block;
          }
          .pools-text12 {
            display: inline-block;
          }
          .pools-text13 {
            display: inline-block;
            font-size: 28px;
            margin-right: var(--dl-space-space-halfunit);
          }
          .pools-text14 {
            color: #949494;
          }
          .pools-text15 {
            color: #414141;
          }
          .pools-container2 {
            flex: 0 0 auto;
            width: 100%;
            height: auto;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .pools-text16 {
            display: inline-block;
          }
          .pools-text17 {
            display: inline-block;
          }
          .pools-text18 {
            display: inline-block;
          }
          .pools-text19 {
            display: inline-block;
          }
          .pools-text20 {
            display: inline-block;
          }
          .pools-text21 {
            display: inline-block;
          }
          .pools-text22 {
            display: inline-block;
          }
          .pools-text23 {
            display: inline-block;
          }
          .pools-text24 {
            display: inline-block;
          }
          .pools-text25 {
            display: inline-block;
          }
          .pools-text26 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

export default Pools

