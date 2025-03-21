import React, { Fragment, useEffect, useState } from 'react' 

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import GlassCoin from './coin'

const Scroll = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [animationStage, setAnimationStage] = useState('idle')

  const items = [
    props.text ?? (
      <Fragment>
        <span className="scroll-text26">Bay</span>
      </Fragment>
    ),
    props.text1 ?? (
      <Fragment>
        <span className="scroll-text27">Blogs</span>
      </Fragment>
    ),
    props.text3 ?? (
      <Fragment>
        <span className="scroll-text29">Community</span>
      </Fragment>
    ),
    props.text4 ?? (
      <Fragment>
        <span className="scroll-text30">Marketplace</span>
      </Fragment>
    ),
    props.text5 ?? (
      <Fragment>
        <span className="scroll-text31">Staking</span>
      </Fragment>
    ),
    props.text6 ?? (
      <Fragment>
        <span className="scroll-text32">Wallet</span>
      </Fragment>
    ),
    props.text7 ?? (
      <Fragment>
        <span className="scroll-text33">Ordinals</span>
      </Fragment>
    ),
    props.text8 ?? (
      <Fragment>
        <span className="scroll-text34">Games</span>
      </Fragment>
    ),
    props.text9 ?? (
      <Fragment>
        <span className="scroll-text35">Frens</span>
      </Fragment>
    ),
    props.text10 ?? (
      <Fragment>
        <span className="scroll-text36">Coin</span>
      </Fragment>
    ),
    props.text11 ?? (
      <Fragment>
        <span className="scroll-text37">Network</span>
      </Fragment>
    ),
  ]

  useEffect(() => {
    // If final item, idle duration is 5 seconds; otherwise, 3 seconds.
    const idleDuration = currentIndex === items.length - 1 ? 8000 : 1000
    const animDuration = 300 // 300ms for each slot animation
    let timeoutId

    if (animationStage === 'idle') {
      timeoutId = setTimeout(() => {
        setAnimationStage('slotOut')
      }, idleDuration)
    } else if (animationStage === 'slotOut') {
      timeoutId = setTimeout(() => {
        // Update index (looping back to first when finished)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
        setAnimationStage('slotIn')
      }, animDuration)
    } else if (animationStage === 'slotIn') {
      timeoutId = setTimeout(() => {
        setAnimationStage('idle')
      }, animDuration)
    }

    return () => clearTimeout(timeoutId)
  }, [animationStage, currentIndex, items.length])

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Detect if user installed the PWA
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowInstall(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', () => {});
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted install');
      setDeferredPrompt(null);
      setShowInstall(false);
    }
  };

  if(isInstalled){
    return (
      <>
        <div className={`scroll-container1 ${props.rootClassName} `}>
       <GlassCoin />
  <hr />
          <hr />
          <div className="scroll-container2">
            <div className="scroll-container3">
              <h1 className="scroll-text12">
                {props.heading ?? (
                  <Fragment>
                     <span className="scroll-text38">
                  Introducing 
                </span>
                    <span className="scroll-text25">RARE</span>
                  </Fragment>
                )}
              </h1>
            </div>
            <div className="scroll-container4">
              <div className="scroll-container5">
              <div
                  className={`slot-container ${
                    animationStage === 'slotOut'
                      ? 'slot-out'
                      : animationStage === 'slotIn'
                      ? 'slot-in'
                      : ''
                  }`}
                >
                  {items[currentIndex]}
                </div>
              </div>
            </div>
          
          </div>
          <span className="scroll-text11">
            {props.text12 ?? (
              <Fragment>
                <span className="scroll-text39">
                 RARE protocol is the utility token for the ecosystem, Built as Layer2 on CORE and Mineable via Proof of Interaction on Rare Network
                </span>
              </Fragment>
            )}
          </span>
          <hr />
          <hr />
          <button >
            
        <p
          onClick={() => window.location.href = window.location.origin}
        >
      <button 
          className='button'
        >
          Install Success✅
        </button> 
        </p>
      
          </button>  
        </div>
        <style jsx>
          {`
          .scroll-item {
            position: absolute;
            width: 100%;
            text-align: center;
            opacity: 0;
            transition: opacity 300ms ease;
          }
         .slot-container {
            width: 100%;
  font-size: 24px;
            position: relative;
          }
          .slot-out {
            animation: slotOut 300ms ease-in forwards;
          }
          .slot-in {
            animation: slotIn 300ms ease-out forwards;
          }
          @keyframes slotOut {
            0% {
              opacity: 1;
              transform: translateY(0);
            }
            100% {
              opacity: 0;
              transform: translateY(-100%);
            }
          }
          @keyframes slotIn {
            0% {
              opacity: 0;
              transform: translateY(100%);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
  
            .scroll-container1 {
              width: 100%;
              height: auto;
              padding: 20px;
              display: flex;
              overflow: hidden;
              position: relative;
              align-items: center;
              flex-direction: column;
              justify-content: center;
            }
            .scroll-text10 {
              color: #a4a4a4;
              font-style: italic;
              font-weight: 100;
  
            }
            .scroll-text11 {
              font-style: normal;
              font-weight: 100;
            }
            .scroll-container2 {
              width: 100%;
              height: auto;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .scroll-container3 {
              flex: 0 0 auto;
              width: auto;
              height: auto;
              display: flex;
              align-items: center;
              justify-content: center;
              
            }
            .scroll-text12 {
              color: rgb(255, 123, 0);
  display: flex;
  gap: 20px;
              text-shadow: 0px 0px 20px;
            }
            .scroll-container4 {
              flex: 0 0 auto;
              color: rgba(190, 190, 190, 0.9);
              width: auto;
              height: auto;
              display: flex;
              font-weight: 900;
              font-size: 24px;
              align-items: center;
              justify-content: flex-start;
            }
            .scroll-container5 {
              gap: 20px;
              flex: 0 0 auto;
              width: 100%;
              height: auto;
              display: flex;
              font-size: 24px;
              padding-left: 5px;
              padding-top: 2px;
              text-align: start;
              align-items: center;
              flex-direction: column;
              justify-content: center;
              filter: invert(18%) sepia(5%) saturate(191%) hue-rotate(186deg);
            }
          
            .scroll-text24 {
              color: transparent;
              text-shadow: none;
            }
            .scroll-text25 {
              display: inline-block;
            }
            .scroll-text26 {
              display: inline-block;
            }
            .scroll-text27 {
              display: inline-block;
            }
            .scroll-text28 {
              display: inline-block;
            }
            .scroll-text29 {
              display: inline-block;
            }
            .scroll-text30 {
              display: inline-block;
            }
            .scroll-text31 {
              display: inline-block;
            }
            .scroll-text32 {
              display: inline-block;
            }
            .scroll-text33 {
              display: inline-block;
            }
            .scroll-text34 {
              display: inline-block;
            }
            .scroll-text35 {
              display: inline-block;
            }
            .scroll-text36 {
              display: inline-block;
            }
            .scroll-text37 {
              display: inline-block;
            }
            .scroll-text38 {
              display: inline-block;
              color: white;
            }
            .scroll-text39 {
              color: #989898;
              max-width: 600px;
              display: inline-block;
              margin-top: 20px;
            }
            .scrollroot-class-name {
              display: none;
            }
            @media (max-width: 479px) {
              
              .scroll-container1 {
                height: 100%;
                padding: 10px;
                text-align: start;
              }
              .scroll-text10 {
                align-self: flex-start;
                text-align: start;
              }
             
              .scroll-text12{
                font-size: 16px !important;
              }
              .scroll-container5{
                font-size: 16px !important;
                padding-left: 5px;
                padding-top: 0px;
              }
            
              .scroll-container4{
                font-size: 16px !important;
              }
              .slot-container {
                width: 100%;
      font-size: 16px;
                position: relative;
              }
              .scroll-text11{
                text-align: start;
              }
            }
          `}
        </style>
      </>
    )
  }

  return (
    <>
      <div className={`scroll-container1 ${props.rootClassName} `}>
     <GlassCoin />
<hr />
        <hr />
        <div className="scroll-container2">
          <div className="scroll-container3">
            <h1 className="scroll-text12">
              {props.heading ?? (
                <Fragment>
                   <span className="scroll-text38">
                Introducing 
              </span>
                  <span className="scroll-text25">RARE</span>
                </Fragment>
              )}
            </h1>
          </div>
          <div className="scroll-container4">
            <div className="scroll-container5">
            <div
                className={`slot-container ${
                  animationStage === 'slotOut'
                    ? 'slot-out'
                    : animationStage === 'slotIn'
                    ? 'slot-in'
                    : ''
                }`}
              >
                {items[currentIndex]}
              </div>
            </div>
          </div>
        
        </div>
        <span className="scroll-text11">
          {props.text12 ?? (
            <Fragment>
              <span className="scroll-text39">
               RARE protocol is the utility token for the ecosystem, Built as Layer2 on CORE and Mineable via Proof of Interaction on Rare Network
              </span>
            </Fragment>
          )}
        </span>
        <hr />
        <hr />
        <button >
          
      <p
        id="installPWA"
        onClick={handleInstallClick}
      >
    <button 
        className='button'
      >
        Install Dapp[PWA] v1.0
      </button> 
      </p>
    
        </button>  
      </div>
      <style jsx>
        {`
        .scroll-item {
          position: absolute;
          width: 100%;
          text-align: center;
          opacity: 0;
          transition: opacity 300ms ease;
        }
       .slot-container {
          width: 100%;
font-size: 24px;
          position: relative;
        }
        .slot-out {
          animation: slotOut 300ms ease-in forwards;
        }
        .slot-in {
          animation: slotIn 300ms ease-out forwards;
        }
        @keyframes slotOut {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-100%);
          }
        }
        @keyframes slotIn {
          0% {
            opacity: 0;
            transform: translateY(100%);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

          .scroll-container1 {
            width: 100%;
            height: auto;
            padding: 20px;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .scroll-text10 {
            color: #a4a4a4;
            font-style: italic;
            font-weight: 100;

          }
          .scroll-text11 {
            font-style: normal;
            font-weight: 100;
          }
          .scroll-container2 {
            width: 100%;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .scroll-container3 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            
          }
          .scroll-text12 {
            color: rgb(255, 123, 0);
display: flex;
gap: 20px;
            text-shadow: 0px 0px 20px;
          }
          .scroll-container4 {
            flex: 0 0 auto;
            color: rgba(190, 190, 190, 0.9);
            width: auto;
            height: auto;
            display: flex;
            font-weight: 900;
            font-size: 24px;
            align-items: center;
            justify-content: flex-start;
          }
          .scroll-container5 {
            gap: 20px;
            flex: 0 0 auto;
            width: 100%;
            height: auto;
            display: flex;
            font-size: 24px;
            padding-left: 5px;
            padding-top: 2px;
            text-align: start;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            filter: invert(18%) sepia(5%) saturate(191%) hue-rotate(186deg);
          }
        
          .scroll-text24 {
            color: transparent;
            text-shadow: none;
          }
          .scroll-text25 {
            display: inline-block;
          }
          .scroll-text26 {
            display: inline-block;
          }
          .scroll-text27 {
            display: inline-block;
          }
          .scroll-text28 {
            display: inline-block;
          }
          .scroll-text29 {
            display: inline-block;
          }
          .scroll-text30 {
            display: inline-block;
          }
          .scroll-text31 {
            display: inline-block;
          }
          .scroll-text32 {
            display: inline-block;
          }
          .scroll-text33 {
            display: inline-block;
          }
          .scroll-text34 {
            display: inline-block;
          }
          .scroll-text35 {
            display: inline-block;
          }
          .scroll-text36 {
            display: inline-block;
          }
          .scroll-text37 {
            display: inline-block;
          }
          .scroll-text38 {
            display: inline-block;
            color: white;
          }
          .scroll-text39 {
            color: #989898;
            max-width: 600px;
            display: inline-block;
            margin-top: 20px;
          }
          .scrollroot-class-name {
            display: none;
          }
          @media (max-width: 479px) {
            
            .scroll-container1 {
              height: 100%;
              padding: 10px;
              text-align: start;
            }
            .scroll-text10 {
              align-self: flex-start;
              text-align: start;
            }
           
            .scroll-text12{
              font-size: 16px !important;
            }
            .scroll-container5{
              font-size: 16px !important;
              padding-left: 5px;
              padding-top: 0px;
            }
          
            .scroll-container4{
              font-size: 16px !important;
            }
            .slot-container {
              width: 100%;
    font-size: 16px;
              position: relative;
            }
            .scroll-text11{
              text-align: start;
            }
          }
        `}
      </style>
    </>
  )
}

Scroll.defaultProps = {
  heading: undefined,
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
  rootClassName: '',
  heading2: undefined,
  text12: undefined,
}

Scroll.propTypes = {
  heading: PropTypes.element,
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
  rootClassName: PropTypes.string,
  heading2: PropTypes.element,
  text12: PropTypes.element,
}

export default Scroll
