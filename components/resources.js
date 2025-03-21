import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

const Resources = (props) => {
  return (
    <>
      <div className={`resources-resources ${props.rootClassName} `}>
        <div className="resources-container10">
          <span>
            {props.text ?? (
              <Fragment>
                <span className="resources-text23">Resources</span>
              </Fragment>
            )}
          </span>
          <svg width="24" height="24" viewBox="0 0 32 32">
            <path
              d="M2 6v20a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2m2 0h16v20H4v-9h10.17l-3.58 3.59L12 22l6-6l-6-6l-1.41 1.41L14.17 15H4z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div className="resources-container11">
          <div className="resources-container12">
           <Link href='/'>
           <span>
              {props.text1 ?? (
                <Fragment>
                  <span className="resources-text24">Swap</span>
                </Fragment>
              )}
            </span>
           </Link>
            <Link href='/pools'>
            <svg height="24" width="24" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 12H5m14 0l-4 4m4-4l-4-4"
              ></path>
            </svg>
              </Link>
          </div>
          <div className="resources-container12">
           
           <span>
              {props.text1 ?? (
                <Fragment>
                  <span className="resources-text24">Pools</span>
                </Fragment>
              )}
            </span>
  
          
            <Link href='/pools'>
           <svg height="24" width="24" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 12H5m14 0l-4 4m4-4l-4-4"
              ></path>
            </svg>
           </Link>
          </div>
          <div className="resources-container12">
            <span>
              {props.text2 ?? (
                <Fragment>
                  <span className="resources-text25">NFT Marketplace</span>
                </Fragment>
              )}
            </span>
            <span className="resources-text13">
              {props.text3 ?? (
                <Fragment>
                  <span className="resources-text26">soon</span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="resources-container12">
            <span>
              {props.text4 ?? (
                <Fragment>
                  <span className="resources-text27">Blogs</span>
                </Fragment>
              )}
            </span>
            <span className="resources-text15">
              {props.text5 ?? (
                <Fragment>
                  <span className="resources-text28">soon</span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="resources-container12">
           <Link href='/frens/RAR310NE'>
           <span>
              {props.text6 ?? (
                <Fragment>
                  <span className="resources-text29">Frens</span>
                </Fragment>
              )}
            </span>
           </Link>
           <Link href='/frens/RAR310NE'>
           <svg height="24" width="24" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 12H5m14 0l-4 4m4-4l-4-4"
              ></path>
            </svg>
           </Link>
          </div>
          <div className="resources-container12">
        <Link href='/game'>    <span>
              {props.text7 ?? (
                <Fragment>
                  <span className="resources-text30">GameFi</span>
                </Fragment>
              )}
            </span></Link>
            <Link href='/game'>
           <svg height="24" width="24" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 12H5m14 0l-4 4m4-4l-4-4"
              ></path>
            </svg>
           </Link>
          </div>
          <div className="resources-container12">
            <span>
              {props.text8 ?? (
                <Fragment>
                  <span className="resources-text31">Airdrop</span>
                </Fragment>
              )}
            </span>
            <span className="resources-text13">
              {props.text3 ?? (
                <Fragment>
                  <span className="resources-text26">soon</span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="resources-container12">
            <span>
              {props.text9 ?? (
                <Fragment>
                  <span className="resources-text32">Mining</span>
                </Fragment>
              )}
            </span>
            <span className="resources-text13">
              {props.text3 ?? (
                <Fragment>
                  <span className="resources-text26">soon</span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="resources-container12">
            <span>
              {props.text10 ?? (
                <Fragment>
                  <span className="resources-text33">DAO governance</span>
                </Fragment>
              )}
            </span>
            <span className="resources-text13">
              {props.text3 ?? (
                <Fragment>
                  <span className="resources-text26">soon</span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="resources-container12">
           <Link href='/faq'>
           <span>
              {props.text11 ?? (
                <Fragment>
                  <span className="resources-text34">FAQ</span>
                </Fragment>
              )}
            </span>
           </Link>
           <Link href='/faq'>
           <svg height="24" width="24" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 12H5m14 0l-4 4m4-4l-4-4"
              ></path>
            </svg>
           </Link>
          </div>
          <div className="resources-container12">
            <span>
              {props.text12 ?? (
                <Fragment>
                  <Link href='/'>
                  <span className="resources-text35">Documentation</span>
                  </Link>
                </Fragment>
              )}
            </span>
            <span className="resources-text13">
              {props.text3 ?? (
                <Fragment>
                  <span className="resources-text26">soon</span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="resources-container12">
            <span>
              {props.text12 ?? (
                <Fragment>
                  <Link href='/terms'>
                  <span className="resources-text35">Terms of service</span>
                  </Link>
                </Fragment>
              )}
            </span>
           <Link href='/terms'>
           <svg height="24" width="24" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 12H5m14 0l-4 4m4-4l-4-4"
              ></path>
            </svg>
            </Link>
          </div>
        </div>
        
        <div className="resources-container22">
          
          <div className="resources-container23">
            
          <div style={{paddingLeft: '10px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start', gap: '20px', marginTop: '0px'}}>
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
        <div style={{padding: '10px', paddingLeft: '10px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', gap: '5px', marginTop: '0px', textAlign: 'start'}}>
        <p style={{fontSize: '10px'}}>By using RareBay, you agree to to the Terms of Service
       </p>
       </div>
      </div>
      <style jsx>
        {`
          .resources-resources {
            flex: 0 0 auto;
            color: #5c5c5c;
            width: 400px;
            cursor: pointer;
            height: 100%;
            display: flex;
            z-index: 900;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            position: relative;
            align-items: center;
            border-color: rgba(175, 175, 175, 0.26);
            border-width: 1px;
            flex-direction: column;
            backdrop-filter: blur(30px);
            justify-content: flex-start;
            border-top-width: 0px;
            border-right-width: 1px;
            border-left: none;
            border-bottom-width: 0px;
          }
          .resources-container10 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            padding: var(--dl-space-space-unit);
            align-items: center;
            border-color: rgba(41, 41, 41, 0.15);
            border-width: 1px;
            justify-content: space-between;
            border-top-width: 0px;
            border-left-width: 0px;
            border-right-width: 0px;
          }
          .resources-container11 {
            gap: var(--dl-space-space-halfunit);
            width: 100%;
            height: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: flex-start;
          }
          .resources-container12 {
            flex: 0 0 auto;
            width: 100%;
            height: auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: center;
            justify-content: space-between;
          }
          .resources-container12:hover{
            background: linear-gradient(90deg, rgba(10, 20, 80, 0.6) 1.00%,rgba(0, 0, 0, 0.5) 100.00%);
          }
          .resources-container13 {
            flex: 0 0 auto;
            width: 100%;
            height: auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: center;
            justify-content: space-between;
          }
          .resources-text13 {
            padding: 4px;
            font-size: 10px;
            border-radius: var(--dl-radius-radius-radius4);
            background-color: rgb(0, 0, 0);
          }
          .resources-container14 {
            flex: 0 0 auto;
            width: 100%;
            height: auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: center;
            justify-content: space-between;
          }
          .resources-text15 {
            padding: 4px;
            font-size: 10px;
            border-radius: var(--dl-radius-radius-radius4);
            background-color: rgb(0, 0, 0);
          }
          .resources-container15 {
            flex: 0 0 auto;
            width: 100%;
            height: auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: center;
            justify-content: space-between;
          }
          .resources-container16 {
            flex: 0 0 auto;
            width: 100%;
            height: auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: center;
            justify-content: space-between;
          }
          .resources-container17 {
            flex: 0 0 auto;
            width: 100%;
            height: auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: center;
            justify-content: space-between;
          }
          .resources-container18 {
            flex: 0 0 auto;
            width: 100%;
            height: auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: center;
            justify-content: space-between;
          }
          .resources-container19 {
            flex: 0 0 auto;
            width: 100%;
            height: auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: center;
            justify-content: space-between;
          }
          .resources-container20 {
            flex: 0 0 auto;
            width: 100%;
            height: auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: center;
            justify-content: space-between;
          }
          .resources-container21 {
            flex: 0 0 auto;
            width: 100%;
            height: auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: center;
            justify-content: space-between;
          }
          .resources-container22 {
            gap: var(--dl-space-space-oneandhalfunits);
            flex: 0 0 auto;
            width: 100%;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .resources-container23 {
            flex: 0 0 auto;
            width: 100%;
            height: auto;
            display: flex;
            align-items: space-between;
            justify-content: center;
          }
          .resources-container24 {
            gap: var(--dl-space-space-unit);
            flex: 0 0 auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: center;
            justify-content: space-between;
            width: 60%;
          }
          .resources-text23 {
            display: inline-block;
          }
          .resources-text24 {
            display: inline-block;
          }
          .resources-text25 {
            display: inline-block;
          }
          .resources-text26 {
            display: inline-block;
          }
          .resources-text27 {
            display: inline-block;
          }
          .resources-text28 {
            display: inline-block;
          }
          .resources-text29 {
            display: inline-block;
          }
          .resources-text30 {
            display: inline-block;
          }
          .resources-text31 {
            display: inline-block;
          }
          .resources-text32 {
            display: inline-block;
          }
          .resources-text33 {
            display: inline-block;
          }
          .resources-text34 {
            display: inline-block;
          }
          .resources-text35 {
            display: inline-block;
          }
          .resourcesroot-class-name {
            left: 0px;
            bottom: 0px;
            display: none;
            position: absolute;
          }
          @media (max-width: 479px) {
            .resources-resources {
              width: 100%;
            }
            .resourcesroot-class-name {
              top: 0px;
              height: 100vh;
              display: none;
            }
          }
        `}
      </style>
    </>
  )
}

Resources.defaultProps = {
  text: undefined,
  text1: undefined,
  text2: undefined,
  text3: undefined,
  text4: undefined,
  text5: undefined,
  text6: undefined,
  text7: undefined,
  text8: undefined,
  text9: undefined,
  text10: undefined,
  text11: undefined,
  text12: undefined,
  rootClassName: '',
}

Resources.propTypes = {
  text: PropTypes.element,
  text1: PropTypes.element,
  text2: PropTypes.element,
  text3: PropTypes.element,
  text4: PropTypes.element,
  text5: PropTypes.element,
  text6: PropTypes.element,
  text7: PropTypes.element,
  text8: PropTypes.element,
  text9: PropTypes.element,
  text10: PropTypes.element,
  text11: PropTypes.element,
  text12: PropTypes.element,
  rootClassName: PropTypes.string,
}

export default Resources
