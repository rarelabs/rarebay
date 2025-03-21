import React, { Fragment, useContext } from 'react'

import PropTypes from 'prop-types'
import { useActiveAccount, useConnect } from "thirdweb/react";
import { client } from '../lib/thirdweb-client';
import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";
import { useConnectModal } from "thirdweb/react";
import { defineChain } from 'thirdweb';
import { TokenContext } from '../lib/tokenContext';
 

const Connect = (props) => {
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
  const {  currentChain, changeChain, availableChains } = useContext(TokenContext);
  async function handleConnect() {
    const wallet = await connect({ client, chain: currentChain, size: 'compact', wallets: wallets, showThirdwebBranding: false, termsOfServiceUrl: "https://rarebay.xyz/terms", title: 'Rare Connect', theme: {
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
    }}); // opens the connect modal
  }
const account = useActiveAccount();

  return (
    <>
      <div className={`connect-connect ${props.rootClassName} `}>
        <div className="connect-container1">
          <span>
            {props.text ?? (
              <Fragment>
                <span className="connect-text4">{!account ? 'Not Connected🔴' : 'Connected🟢'}</span>
              </Fragment>
            )}
          </span>
          <svg width="24" height="24" viewBox="0 0 32 32" onClick={props.closeModal1}>
            <path
              d="M2 6v20a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2m2 0h16v20H4v-9h10.17l-3.58 3.59L12 22l6-6l-6-6l-1.41 1.41L14.17 15H4z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div className="connect-container2"
        onClick={handleConnect}
        >
          <span>
            {props.text1 ?? (
              <Fragment>
                <span className="connect-text5">RareWallet</span>
              </Fragment>
            )}
          </span>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M19 12H5m14 0l-4 4m4-4l-4-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
        <div className="connect-container3">
          <span>
            {props.text2 ?? (
              <Fragment>
                <span className="connect-text6">Rarification</span>
              </Fragment>
            )}
          </span>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M19 12H5m14 0l-4 4m4-4l-4-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
      </div>
      <style jsx>
        {`
          .connect-connect {
            flex: 0 0 auto;
            color: gray;
            width: 378px;
            cursor: pointer;
            height: 100%;
            display: flex;
            z-index: 500;
            right: 0px;
            position: fixed;
            align-items: center;
            border-color: rgba(175, 175, 175, 0.26);
            border-width: 1px;
            flex-direction: column;
            backdrop-filter: blur(30px);
            justify-content: flex-start;
            border-top-width: 0px;
            border-right-width: 0px;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            border-bottom-width: 0px;
          }
          .connect-container1 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            padding: var(--dl-space-space-unit);
            align-items: center;
            border-color: rgba(41, 41, 41, 0.15);
            border-width: 1px;
            justify-content: space-between;
            border-top-width: 0px;
            border-left-width: 1px;
            border-right-width: 0px;
          }
          .connect-container2 {
            width: 100%;
            height: 63px;
            display: flex;
            padding: var(--dl-space-space-unit);
            align-items: center;
            border-color: rgba(41, 41, 41, 0.15);
            border-width: 1px;
            flex-direction: row;
            justify-content: space-between;
            border-top-width: 0px;
            border-left-width: 0px;
            border-right-width: 0px;
          }
          .connect-container3 {
            width: 100%;
            height: 63px;
            display: flex;
            padding: var(--dl-space-space-unit);
            align-items: center;
            border-color: rgba(41, 41, 41, 0.15);
            border-width: 1px;
            flex-direction: row;
            justify-content: space-between;
            border-top-width: 0px;
            border-left-width: 0px;
            border-right-width: 0px;
          }
          .connect-text4 {
            display: inline-block;
          }
          .connect-text5 {
            display: inline-block;
          }
          .connect-text6 {
            display: inline-block;
          }
          @media (max-width: 479px) {
            .connect-connect {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

Connect.defaultProps = {
  text: undefined,
  text1: undefined,
  rootClassName: '',
  text2: undefined,
  closeModal1: undefined
}

Connect.propTypes = {
  text: PropTypes.element,
  text1: PropTypes.element,
  rootClassName: PropTypes.string,
  text2: PropTypes.element,
  closeModal1: PropTypes.any
}

export default Connect
