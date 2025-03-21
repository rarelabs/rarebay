import React from 'react'
import Link from 'next/link'

import PropTypes from 'prop-types'

const Footer = (props) => {
  return (
    <>
      <footer className={`footer-footer ${props.rootClassName} `}>
        
        <div className="footer-container">

          <img
            alt={props.imageAlt}
            src={props.imageSrc}
            className="footer-image"
          />
          <div className="footer-container1">
            <div className="footer-links-container">
              <div className="footer-container2">
                <div className="footer-container3">
                  <span className="footer-text">{props.text}</span>
                  <span className="footer-text01">
                    <Link href='/kyc'>KYC Registration</Link>
                    <br></br>
                  </span>
                  <span className="footer-text04">
                 <span> <Link href='/'>Tap to earn</Link></span>
                    <br></br>
                  </span>

                  <span className="footer-text07"><Link href='/nf-ts'>{props.text1}</Link></span>

                  <span className="footer-text08">
<Link href='/'>{props.text2}</Link></span>

                  <span>
<Link href='/documentation'>{props.text3}</Link></span>
                </div>
                <div className="footer-container4">
                  <span className="footer-text10">
{props.text4}
</span>
                  <span className="footer-text11">
<Link href='/fqa'>{props.text5}</Link></span>
                  <a   href="mailto:mail@rarebay.xyz?subject=" className="footer-text12">{props.text6}</a>
                </div>
              </div>
              <div className="footer-container5">
                <div className="footer-container6">
                  <span className="footer-text13">{props.text7}</span>
                  <span className="footer-text14">
<Link href='/terms'>{props.text8}</Link></span>
                  
                </div>
                <div className="footer-container7">
                  <span className="footer-text17">{props.text11}</span>
                  <span className="footer-text18">
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
              twitter
              </a>
                    <br></br>
                  </span>
                  <a href='https://discord.com/invite/scdXvAnxMK'>  <svg width="32" height="32" viewBox="0 0 32 32">
                <path
                  d="M25.7 7.1Q23 5.9 20 5.3h-.1c-.2.4-.5 1-.7 1.5c-2.2-.3-4.3-.3-6.4 0c-.2-.5-.5-1-.7-1.5H12q-3 .45-5.7 1.8C2.7 12.5 1.7 17.8 2.2 23v.1c2.4 1.8 4.7 2.8 7 3.5h.1c.5-.7 1-1.5 1.4-2.3v-.1c-.8-.3-1.5-.6-2.2-1c-.1 0-.1-.1 0-.1c.1-.1.3-.2.4-.3H9c4.6 2.1 9.5 2.1 14.1 0h.1c.1.1.3.2.4.3c.1 0 0 .1 0 .1c-.7.4-1.4.8-2.2 1c0 0-.1.1 0 .1c.4.8.9 1.6 1.4 2.3h.1c2.3-.7 4.6-1.8 7-3.5V23c.6-6-1-11.2-4.2-15.9M11.4 19.9c-1.4 0-2.5-1.3-2.5-2.8s1.1-2.8 2.5-2.8s2.5 1.3 2.5 2.8s-1.1 2.8-2.5 2.8m9.3 0c-1.4 0-2.5-1.3-2.5-2.8s1.1-2.8 2.5-2.8s2.5 1.3 2.5 2.8s-1.1 2.8-2.5 2.8"
                  fill="currentColor"
                ></path>
              </svg>
              discord
              </a>
              <br></br>
              <br></br>
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
              telegram
                 </a>
                 
                  <span>
                   
                    <br></br>
                  </span>
                </div>
              </div>
            </div>
            <hr />
            
            <span className="footer-text26">
              <span>© 2023-2025</span>
              <br></br>
              <br></br>
              <span> All Rights Reserved.</span>
            </span>
          </div>
        </div>

      </footer>
      <style jsx>
        {`
          .footer-footer {
            color: white;
            width: 100%;
            height: auto;
            display: flex;
            max-width: 100%;
            min-height: 100vh;
            align-items: center;
            padding-top: var(--dl-space-space-unit);
            border-color: #2d2d2d;
            border-width: 0px;
            padding-left: var(--dl-space-space-threeunits);
            padding-right: var(--dl-space-space-threeunits);
            flex-direction: row;

            backdrop-filter: blur(10px);
            justify-content: center;
            border-left-width: 0px;
            border-right-width: 0px;
            border-bottom-width: 0px;
          }
          .footer-container {
            width: 998px;
            height: auto;
            display: flex;
            align-items: space-between;
            flex-direction: column;
            justify-content: center;
          }
          .footer-image {
            width: 75px;
            height: 78px;
          }
          .footer-container1 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: space-between;
            flex-direction: column;
          }
          .footer-links-container {
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
          }
          .footer-container2 {
            display: flex;
            align-items: flex-start;
            flex-direction: row;
            justify-content: space-between;
          }
          .footer-container3 {
            flex: 0 0 auto;
            display: flex;
            align-items: flex-start;
            margin-right: var(--dl-space-space-sixunits);
            flex-direction: column;
            justify-content: flex-start;
          }
          .footer-text {
            font-weight: 700;
            margin-bottom: var(--dl-space-space-oneandhalfunits);
          }
          .footer-text01 {
            margin-bottom: var(--dl-space-space-unit);
          }
          .footer-text04 {
            margin-bottom: var(--dl-space-space-unit);
          }
          .footer-text07 {
            margin-bottom: var(--dl-space-space-unit);
          }
          .footer-text08 {
            margin-bottom: var(--dl-space-space-unit);
          }
          .footer-container4 {
            flex: 0 0 auto;
            display: flex;
            align-items: flex-start;
            margin-right: var(--dl-space-space-sixunits);
            flex-direction: column;
            justify-content: flex-start;
          }
          .footer-text10 {
            font-weight: 700;
            margin-bottom: var(--dl-space-space-oneandhalfunits);
          }
          .footer-text11 {
            margin-bottom: var(--dl-space-space-unit);
          }
          .footer-text12 {
            margin-bottom: var(--dl-space-space-unit);
          }
          .footer-container5 {
            display: flex;
            align-items: flex-start;
            flex-direction: row;
            justify-content: space-between;
          }
          .footer-container6 {
            flex: 0 0 auto;
            display: flex;
            align-items: flex-start;
            margin-right: var(--dl-space-space-sixunits);
            flex-direction: column;
            justify-content: flex-start;
          }
          .footer-text13 {
            font-weight: 700;
            margin-bottom: var(--dl-space-space-oneandhalfunits);
          }
          .footer-text14 {
            margin-bottom: var(--dl-space-space-unit);
          }
          .footer-text15 {
            margin-bottom: var(--dl-space-space-unit);
          }
          .footer-container7 {
            flex: 0 0 auto;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: flex-start;
          }
          .footer-text17 {
            font-weight: 700;
            margin-bottom: var(--dl-space-space-oneandhalfunits);
          }
          .footer-text18 {
            margin-bottom: var(--dl-space-space-unit);
          }
          .footer-text21 {
            margin-bottom: var(--dl-space-space-unit);
          }
          .footer-text22 {
            margin-bottom: var(--dl-space-space-unit);
          }
          .footer-text26 {
            margin-top: var(--dl-space-space-oneandhalfunits);
          }
          .footer-root-class-name {
            height: 100%;
          }

          .footer-root-class-name3 {
            height: 100%;
          }
          @media (max-width: 479px) {
            .footer-footer {
              gap: var(--dl-space-space-twounits);
              height: 690px;
              padding: var(--dl-space-space-twounits);
              justify-content: center;
              width: 100%;
            }
            .footer-container {
              width: 100%;
            }
            .footer-image {
              margin-bottom: 0px;
            }
            .footer-container1 {
              width: 100%;
            }
            .footer-links-container {
              width: auto;
              align-items: flex-start;
              flex-direction: column;
              justify-content: space-between;
            }
            .footer-container2 {
              width: auto;
              align-items: center;
              margin-right: 0px;
              justify-content: space-between;
            }
            .footer-container3 {
              margin-right: var(--dl-space-space-unit);
            }
            .footer-container4 {
              align-self: stretch;
            }
            .footer-container5 {
              width: auto;
              margin-top: var(--dl-space-space-threeunits);
            }
            .footer-container6 {
              margin-top: 0px;
            }
          }
        `}
      </style>
    </>
  )
}

Footer.defaultProps = {
  text10: 'Help center',
  text2: 'Goverance\n',
  text1: 'NFT Marketpalce',
  text: 'Utilities',
  text6: 'Email: mail@rarebay.xyz',
  text4: 'Company',
  text13: 'Telegram',
  rootClassName: '',
  text8: 'Terms of service',
  imageSrc: '/jhjj-200w.webp',
  text3: 'Documentation',
  text5: 'FAQ',
  text9: 'Privacy Policy',
  text7: 'Support',
  text12: 'Discord',
  imageAlt: 'logo',
  text11: 'Social',
}

Footer.propTypes = {
  text10: PropTypes.string,
  text2: PropTypes.string,
  text1: PropTypes.string,
  text: PropTypes.string,
  text6: PropTypes.string,
  text4: PropTypes.string,
  text13: PropTypes.string,
  rootClassName: PropTypes.string,
  text8: PropTypes.string,
  imageSrc: PropTypes.string,
  text3: PropTypes.string,
  text5: PropTypes.string,
  text9: PropTypes.string,
  text7: PropTypes.string,
  text12: PropTypes.string,
  imageAlt: PropTypes.string,
  text11: PropTypes.string,
}

export default Footer
