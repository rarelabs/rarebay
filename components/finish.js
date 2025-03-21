import React, { Fragment, useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useActiveAccount } from "thirdweb/react";
import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";
import {
  darkTheme,
  useConnectModal,
} from "thirdweb/react";
import { TokenContext } from "../lib/tokenContext";
import { client } from "../lib/thirdweb-client";

const Introdunction = (props) => {
  const [progress, setProgress] = useState(0);
  const account = useActiveAccount();
  const address = account?.address;

  const sentences = [
    "Connecting user....",
    "Checking Network...",
    "Updating Wallets....",
    "Preparing Wallets....",
    "Onboarding User....",
    "Finalizing setup....",
    "Done.",
  ];

  const getRandomSymbols = (length) => {
    const symbols = "@#$!%&*?Bit!%()Coin";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += symbols[Math.floor(Math.random() * symbols.length)];
    }
    return result;
  };

  const shuffleText = (text) => {
    let chars = text.split("");
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars.join("");
  };
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
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    let sentence = sentences[index];

    const shuffleLoop = () => {
      if (address) return;
      let startIdx = Math.floor(Math.random() * (sentence.length - 4));
      let segment = sentence.slice(startIdx, startIdx + 4);
      let shuffledSegment = shuffleText(segment) + getRandomSymbols(2);
      let shuffled = sentence.slice(0, startIdx) + shuffledSegment + sentence.slice(startIdx + 3);
      setCurrentText(shuffled);

      setTimeout(shuffleLoop, 250);
    };

    if (!address) {
      shuffleLoop();
    } else {
      let revealIndex = 0;
      const revealInterval = setInterval(() => {
        setCurrentText(sentence.slice(0, revealIndex + 1));
        revealIndex++;

        if (revealIndex >= sentence.length) {
          clearInterval(revealInterval);
          setTimeout(() => {
            if (index < sentences.length - 1) {
              setIndex((prevIndex) => prevIndex + 1);
            } else {
              setPause(true);
            }
          }, 200);
        }
      }, 50);

      return () => clearInterval(revealInterval);
    }
  }, [index, address]);

  useEffect(() => {
    let interval;
    if (!address) {
      interval = setInterval(() => {
        setProgress((prev) => (prev < 10 ? prev + 2 : 10));
      }, 100);
    } else {
      interval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 2 : 100));
      }, 100);
    }

    return () => clearInterval(interval);
  }, [address]);
  const audioRef = useRef(null);

  // This useEffect now only plays the audio when the address is connected.
  useEffect(() => {
    if (address && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Auto-play failed (likely due to browser restrictions):", error);
      });
    }
  }, [address]);


  const { connect, isConnecting } = useConnectModal();
  async function handleConnect() {
    const wallet = await connect({ client: client, chain: currentChain, size: 'compact', wallets: wallets, showThirdwebBranding: false, termsOfServiceUrl: "https://rarebay.xyz/terms", title: 'Rare Connect', theme: {
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
    }});
     // opens the connect modal
  }

  
  return (
    <>
    <audio ref={audioRef} src="/load.wav" loop/>
      <div className={`introdunction-container1 ${props.rootClassName} `}>
        <div className="introdunction-container2">
          <div className="introdunction-container3">
            <img
              src='/jhjj-200w.webp'
              alt={props.imageAlt}
              className="introdunction-image"
            />
            <div className="introdunction-container4">
              <h1 className="introdunction-text1">
                {props.heading3 ?? (
                  <Fragment>
                    <h1 className="introdunction-text7">
                      <span className="introdunction-text8">Rare</span>
                      <span className="introdunction-text9">Bay</span>
                    </h1>
                  </Fragment>
                )}
              </h1>
            </div>
          </div>
          <h1 className="introdunction-text2">
            {props.heading1 ?? (
              <Fragment>
                <span className="introdunction-text5">Beta</span>
              </Fragment>
            )}
          </h1>
        </div>
        <div className="introdunction-container5">
          <div className='hourglass' />
          <hr />
          <div className="center-c">
          <progress className="progress-bar" max="100" value={progress}></progress>
          <hr />
          <p style={{color: 'white', height: '20px'}}>
          {currentText}
          </p>
          <hr />
          {!address && <button onClick={handleConnect} className="button" >Connect Wallet</button>}
        </div>
        </div>
        <div style={{height: '200px'}} />
      </div>
      <style jsx>
        {`
          .introdunction-container1 {
            width: 100%;
            height: auto;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .introdunction-container2 {
            gap: var(--dl-space-space-unit);
            flex: 0 0 auto;
            width: 535px;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .introdunction-container3 {
            gap: 5px;
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .introdunction-image {
            width: 50px;
            object-fit: cover;
            border-radius: 10px;
          }
          .introdunction-container4 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: flex-start;
            justify-content: center;
          }
          .introdunction-text1 {
            font-size: 50px;
          }
          .introdunction-text2 {
            color: rgb(208, 208, 208);
            font-size: 20px;
            font-weight: 300;
            padding-top: 5px;
            border-color: #545454;
            border-width: 1px;
            padding-left: 15px;
            border-radius: 8px;
            padding-right: 15px;
            padding-bottom: 5px;
            background-image: linear-gradient(
              to right,
              rgb(252, 0, 255) 0%,
              rgb(0, 219, 222) 100%
            );
          }
          .introdunction-container5 {
            flex: 0 0 auto;
            width: 867px;
            display: flex;
            margin-top: 3%;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 60px;
            margin-bottom: var(--dl-space-space-unit);
          }
          .introdunction-text3 {
            color: rgb(123, 123, 123);
            font-size: 16px;
            font-style: italic;
            font-weight: 100;
          }
          .introdunction-heading {
            color: rgb(123, 123, 123);
            font-style: normal;
            font-weight: 100;
            font-size: 18px;
            color: white;
          }
          .introdunction-text4 {
            display: inline-block;
          }
          .introdunction-text5 {
            display: inline-block;
          }
          .introdunction-text6 {
            display: inline-block;
          }
          .introdunction-text7 {
            display: inline-block;
            font-size: 50px;
          }
          .introdunction-text8 {
            color: #adadad;
          }
          .introdunction-text9 {
            color: rgba(74, 74, 74, 0.55);
          }

          @media (max-width: 479px) {
            .introdunction-container1 {
              width: 100%;
              height: 100%;
              display: flex;
              position: relative;
              align-items: start;
              flex-direction: column;
              justify-content: center;
              text-align: start;
              padding: 10px;
            }
            .introdunction-container2{
              width: 100%;
            }
            .introdunction-text1 {
              font-size: 30px;
            }
            .introdunction-container5 {
              width: 100%;
            }
            .introdunction-text7 {
              font-size: 30px;
            }
          }
        `}
      </style>
    </>
  )
}

Introdunction.defaultProps = {
  heading: undefined,
  heading1: undefined,
  heading2: undefined,
  imageSrc: '/android-icon-192x192-200h.png',
  imageAlt: 'image',
  heading3: undefined,
  rootClassName: '',
}

Introdunction.propTypes = {
  heading: PropTypes.element,
  heading1: PropTypes.element,
  heading2: PropTypes.element,
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  heading3: PropTypes.element,
  rootClassName: PropTypes.string,
}

export default Introdunction
