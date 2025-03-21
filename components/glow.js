import React from 'react'
import Head from 'next/head'

import { useTranslations } from 'next-intl'

const Glow = (props) => {
  return (
    <>
      <div className="pools-container10" id='context'>
        <div className="pools-btc">
          <div className="pools-container11">
            <div className="pools-container12">
              <img
                src="/bitcoin-btc-logo-200h.webp"
                alt="image"
                className="pools-image1"
              />
              <div className="pools-container13">
                <span className="pools-text10">Bitcoin</span>
                <span>+0.0</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pools-ypc">
          <div className="pools-container14">
            <div className="pools-container15">
              <img
                src="/ypc.png"
                alt="image"
                className="pools-image2"
              />
              <div className="pools-container16">
                <span className="pools-text12">YPC</span>
                <span>+0.0</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pools-whls">
          <div className="pools-container17">
            <div className="pools-container18">
              <img src="/logo.png" alt="image" className="pools-image3" />
              <div className="pools-container19">
                <span className="pools-text14">WHALES</span>
                <span>+0.0</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pools-rare">
          <div className="pools-container20">
            <div className="pools-container21">
              <img src="/logo1.png" alt="image" className="pools-image4" />
            </div>
            <div className="pools-container22">
              <span className="pools-text16">RARE</span>
              <span>+0.0</span>
            </div>
          </div>
        </div>
        <div className="pools-core1">
          <div className="pools-container23">
            <div className="pools-container24">
              <img src="/core-200w.png" alt="image" className="pools-image5" />
              <div className="pools-container25">
                <span className="pools-core2">CORE</span>
                <span>+0.0</span>
              </div>
            </div>
          </div>
        </div>
       
        <div className="pools-stcore">
          <div className="pools-container26">
            <div className="pools-container27">
              <img
                src="/stcore.png"
                alt="image"
                className="pools-image6"
              />
              <div className="pools-container28">
                <span className="pools-text19">sTCORE</span>
                <span>+0.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .pools-container10 {
            color: gray;
            width: 100%;
            position: fixed;
            top: -100px;
            display: none;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
          }
          .pools-btc {
            flex: 0 0 auto;
            left: 98px;
            width: 130px;
            bottom: 178px;
            cursor: pointer;
            filter: blur(30px);
            height: 130px;
            display: flex;
            padding: 10px;
            position: absolute;
            transition: opacity 3s ease-in-out, transform 3s ease-in-out;
            align-items: center;
            border-radius: var(--dl-radius-radius-round);
            animation-name: bounce;
            animation-delay: 0s;
            justify-content: center;
            animation-duration: 10000ms;
            animation-direction: normal;
            animation-iteration-count: 1000;
            animation-timing-function: ease;
             transform: translateY(20px);
            transition: opacity 3s ease-in-out, transform 3s ease-in-out;
           
          }
          .pools-btc:hover {
            filter: blur();
            border-color: rgba(111, 33, 0, 0.3);
            border-width: 1px;
           
          }
          .pools-container11 {
            flex: 0 0 auto;
            width: 100%;
            height: 100%;
            display: flex;
            padding: 10px;
          transition: opacity 3s ease-in-out, transform 3s ease-in-out;
            align-items: flex-start;
            border-radius: var(--dl-radius-radius-round);
          }
          .pools-container11:hover {
            border-color: rgba(193, 87, 0, 0.47);
            border-width: 1px;
          }
          .pools-container12 {
            flex: 0 0 auto;
            width: 100%;
            height: 100%;
            display: flex;
            padding: var(--dl-space-space-unit);
              transition: opacity 3s ease-in-out, transform 3s ease-in-out; align-items: flex-start;
            border-radius: var(--dl-radius-radius-round);
            background-color: #f7931a;
          }

          .pools-image1 {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: var(--dl-radius-radius-round);
          }
          .pools-container13 {
            gap: var(--dl-space-space-halfunit);
            top: -7px;
            flex: 0 0 auto;
            left: 20px;
            color: transparent;
            width: 181px;
            height: 117px;
            display: flex;
            padding: var(--dl-space-space-unit);
            position: absolute;
              transition: opacity 3s ease-in-out, transform 3s ease-in-out; align-items: flex-end;
            flex-direction: column;
            justify-content: center;
          }
          .pools-container13:hover {
                color: lightgray;
          }
          .pools-text10 {
            fill: rgba(255, 146, 17, 0.32);
            font-style: normal;
            font-family: 'Arial';
            font-weight: 700;
          }
          .pools-ypc {
            flex: 0 0 auto;
            right: 171px;
            width: 130px;
            bottom: 198px;
            cursor: pointer;
            filter: blur(30px);
            height: 130px;
            display: flex;
            padding: 10px;
            position: absolute;
              transition: opacity 3s ease-in-out, transform 3s ease-in-out; align-items: center;
            border-radius: var(--dl-radius-radius-round);
            animation-name: shakeX;
            animation-delay: 0s;
            justify-content: center;
            animation-duration: 10000ms;
            animation-direction: normal;
            animation-iteration-count: 1000;
            animation-timing-function: ease;
             transform: translateY(20px);
            transition: opacity 1s ease-in-out, transform 1s ease-in-out;
          }
          .pools-ypc:hover {
            filter: blur();
            border-color: rgba(243, 0, 4, 0.26);
            border-width: 1px;
            border-radius: var(--dl-radius-radius-round);
          }
          .pools-container14 {
            flex: 0 0 auto;
            width: 100%;
            height: 100%;
            display: flex;
            padding: 10px;
              transition: opacity 3s ease-in-out, transform 3s ease-in-out; align-items: flex-start;
            border-radius: var(--dl-radius-radius-round);
          }
          .pools-container14:hover {
            border-color: rgba(243, 0, 4, 0.88);
            border-width: 1px;
          }
          .pools-container15 {
            flex: 0 0 auto;
            width: 100%;
            height: 100%;
            display: flex;
            padding: var(--dl-space-space-unit);
              transition: opacity 3s ease-in-out, transform 3s ease-in-out; align-items: flex-start;
            border-radius: var(--dl-radius-radius-imageradius);
          }

          .pools-image2 {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: var(--dl-radius-radius-radius4);
          }
          .pools-container16 {
            gap: var(--dl-space-space-halfunit);
            top: 2px;
            flex: 0 0 auto;
            color: transparent;
            right: -58px;
            width: 166px;
            height: 117px;
            display: flex;
            padding: var(--dl-space-space-unit);
            position: absolute;
              transition: opacity 3s ease-in-out, transform 3s ease-in-out; align-items: flex-end;
            flex-direction: column;
            justify-content: center;
          }
          .pools-container16:hover {
                color: lightgray;
          }
          .pools-text12 {
            fill: rgba(255, 146, 17, 0.32);
            font-style: normal;
            font-family: 'Arial';
            font-weight: 700;
          }
          .pools-whls {
            flex: 0 0 auto;
            left: 981px;
            width: 130px;
            bottom: 86px;
            cursor: pointer;
            filter: blur(30px);
            height: 130px;
            display: flex;
            padding: 10px;
            position: absolute;
              transition: opacity 3s ease-in-out, transform 3s ease-in-out; align-items: center;
            border-radius: var(--dl-radius-radius-imageradius);
            animation-name: shakeY;
            animation-delay: 0s;
            justify-content: center;
            animation-duration: 10000ms;
            animation-direction: normal;
            animation-iteration-count: 1000;
            animation-timing-function: ease;
             transform: translateY(20px);
            transition: opacity 1s ease-in-out, transform 1s ease-in-out;
          }
          .pools-whls:hover {
            filter: blur();
            border-color: rgba(232, 95, 0, 0.32);
            border-width: 1px;
          }
          .pools-container17 {
            flex: 0 0 auto;
            width: 100%;
            height: 100%;
            display: flex;
            padding: 10px;
              transition: opacity 3s ease-in-out, transform 3s ease-in-out; align-items: flex-start;
            border-radius: var(--dl-radius-radius-imageradius);
          }
          .pools-container17:hover {
            border-color: rgba(232, 95, 0, 0.89);
            border-width: 1px;
          }
          .pools-container18 {
            flex: 0 0 auto;
            width: 100%;
            height: 100%;
            display: flex;
            padding: var(--dl-space-space-unit);
              transition: opacity 3s ease-in-out, transform 3s ease-in-out; align-items: flex-start;
            border-radius: var(--dl-radius-radius-imageradius);
            background-color: #e85f00;
          }

          .pools-image3 {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: var(--dl-radius-radius-radius4);
          }
          .pools-container19 {
            gap: var(--dl-space-space-halfunit);
            top: -28px;
            flex: 0 0 auto;
            color: transparent;
            right: -94px;
            width: 216px;
            height: 147px;
            display: flex;
            padding: var(--dl-space-space-unit);
            position: absolute;
              transition: opacity 3s ease-in-out, transform 3s ease-in-out; align-items: flex-end;
            flex-direction: column;
            justify-content: center;
          }
          .pools-container19:hover {
                color: lightgray;
          }
          .pools-text14 {
            fill: rgba(255, 146, 17, 0.32);
            font-style: normal;
            font-family: 'Arial';
            font-weight: 700;
          }
          .pools-rare {
            top: 232px;
            flex: 0 0 auto;
            right: 198px;
            width: 130px;
            cursor: pointer;
            filter: blur(30px);
            height: 130px;
            display: flex;
            padding: 10px;
            position: absolute;
              transition: opacity 3s ease-in-out, transform 3s ease-in-out; align-items: center;
            border-radius: var(--dl-radius-radius-imageradius);
            animation-name: swing;
            animation-delay: 0s;
            justify-content: center;
            animation-duration: 20s;
            animation-direction: normal;
            animation-iteration-count: 1000;
            animation-timing-function: ease;
             transform: translateY(20px);
            transition: opacity 1s ease-in-out, transform 1s ease-in-out;
          }
          .pools-rare:hover {
            filter: blur();
            border-color: rgba(0, 168, 243, 0.23);
            border-width: 1px;
          }
          .pools-container20 {
            flex: 0 0 auto;
            width: 100%;
            height: 100%;
            display: flex;
            padding: 10px;
              transition: opacity 3s ease-in-out, transform 3s ease-in-out; align-items: flex-start;
            border-radius: var(--dl-radius-radius-imageradius);
          }
          .pools-container20:hover {
            border-color: rgba(0, 168, 243, 0.88);
            border-width: 1px;
          }
          .pools-container21 {
            flex: 0 0 auto;
            width: 100%;
            height: 100%;
            display: flex;
            padding: var(--dl-space-space-unit);
              transition: opacity 3s ease-in-out, transform 3s ease-in-out; align-items: flex-start;
            border-radius: var(--dl-radius-radius-imageradius);
            background-color: #00a8f3;
          }

          .pools-image4 {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: var(--dl-radius-radius-radius4);
          }
          .pools-container22 {
            gap: var(--dl-space-space-halfunit);
            top: -30px;
            flex: 0 0 auto;
            color: transparent;
            right: -77px;
            width: 198px;
            height: 151px;
            display: flex;
            padding: var(--dl-space-space-unit);
            position: absolute;
              transition: opacity 3s ease-in-out, transform 3s ease-in-out; align-items: flex-end;
            flex-direction: column;
            justify-content: center;
          }
          .pools-container22:hover {
                color: lightgray;
          }
          .pools-text16 {
            fill: rgba(255, 146, 17, 0.32);
            font-style: normal;
            font-family: 'Arial';
            font-weight: 700;
          }
          .pools-core1 {
            top: 242px;
            flex: 0 0 auto;
            left: 74px;
            width: 130px;
            cursor: pointer;
            filter: blur(30px);
            height: 130px;
            display: flex;
            padding: 10px;
            position: absolute;
              transition: opacity 3s ease-in-out, transform 3s ease-in-out; align-items: center;
            border-radius: 100px;
            animation-name: swing;
            animation-delay: 0s;
            justify-content: center;
            animation-duration: 30000ms;
            animation-direction: normal;
            animation-iteration-count: 1000;
            animation-timing-function: ease;
             transform: translateY(20px);
            transition: opacity 1s ease-in-out, transform 1s ease-in-out;
          }
          .pools-core1:hover {
            filter: blur();
            border-color: rgba(255, 146, 17, 0.12);
            border-width: 1px;
          }
          .pools-container23 {
            flex: 0 0 auto;
            width: 100%;
            height: 100%;
            display: flex;
              transition: opacity 3s ease-in-out, transform 3s ease-in-out; align-items: flex-start;
            border-radius: 100px;
          }
          .pools-container23:hover {
            border-color: rgba(255, 146, 17, 0.5);
            border-width: 1px;
          }
          .pools-container24 {
            flex: 0 0 auto;
            width: 100%;
            height: 100%;
            display: flex;
            padding: var(--dl-space-space-unit);
              transition: opacity 3s ease-in-out, transform 3s ease-in-out; align-items: center;
            border-radius: 100px;
            justify-content: center;
          }
          .pools-container24:hover {
            background-color: transparent;
          }
          .pools-image5 {
            width: 100%;
            object-fit: cover;
          }
          .pools-container25 {
            gap: var(--dl-space-space-halfunit);
            top: -5px;
            flex: 0 0 auto;
            color: transparent;
            right: -59px;
            width: 166px;
            height: 117px;
            display: flex;
            padding: var(--dl-space-space-unit);
            position: absolute;
              transition: opacity 3s ease-in-out, transform 3s ease-in-out; align-items: flex-end;
            flex-direction: column;
            justify-content: center;
          }
          .pools-container25:hover {
                color: lightgray;
          }
          .pools-core2 {
            fill: rgba(255, 146, 17, 0.32);
            font-style: normal;
            font-family: 'Arial';
            font-weight: 700;
          }
          .pools-stcore {
            flex: 0 0 auto;
            left: 488px;
            width: 130px;
            bottom: 53px;
            cursor: pointer;
            filter: blur(30px);
            height: 130px;
            display: flex;
            padding: 10px;
            position: absolute;
              transition: opacity 3s ease-in-out, transform 3s ease-in-out; align-items: center;
            border-radius: 100px;
            animation-name: shakeY;
            animation-delay: 0s;
            justify-content: center;
            animation-duration: 10000ms;
            animation-direction: normal;
            animation-iteration-count: 1000;
            animation-timing-function: ease;
             transform: translateY(20px);
            transition: opacity 1s ease-in-out, transform 1s ease-in-out;
          }
          .pools-stcore:hover {
            filter: blur();
            border-color: rgba(0, 168, 243, 0.23);
            border-width: 1px;
          }
          .pools-container26 {
            flex: 0 0 auto;
            width: 100%;
            height: 100%;
            display: flex;
            padding: 10px;
              transition: opacity 3s ease-in-out, transform 3s ease-in-out; align-items: flex-start;
            border-radius: 100px;
          }
          .pools-container26:hover {
            border-color: rgba(0, 168, 243, 0.61);
            border-width: 1px;
          }
          .pools-container27 {
            flex: 0 0 auto;
            width: 100%;
            height: 100%;
            display: flex;
              transition: opacity 3s ease-in-out, transform 3s ease-in-out; align-items: center;
            border-radius: 100px;
            justify-content: center;
          }
          .pools-container27:hover {
            background-color: transparent;
          }
          .pools-image6 {
            width: 100%;
            object-fit: cover;
          }
          .pools-container28 {
            gap: var(--dl-space-space-halfunit);
            top: -14px;
            flex: 0 0 auto;
            color: transparent;
            right: -81px;
            width: 205px;
            height: 135px;
            display: flex;
            padding: var(--dl-space-space-unit);
            position: absolute;
              transition: opacity 3s ease-in-out, transform 3s ease-in-out; align-items: flex-end;
            flex-direction: column;
            justify-content: center;
          }
          .pools-container28:hover {
                color: lightgray;
          }
          .pools-text19 {
            fill: rgba(255, 146, 17, 0.32);
            font-style: normal;
            font-family: 'Arial';
            font-weight: 700;
          }
          @media (max-width: 479px) {
            .pools-btc {
              left: 42px;
              bottom: 37px;
            }
            .pools-ypc {
              right: 27px;
              bottom: 149px;
            }
            .pools-whls {
              top: 96px;
              left: 296px;
              position: absolute;
            }
            .pools-rare {
              top: 428px;
              right: 69px;
            }
            .pools-core1 {
              top: 386px;
              left: -19px;
            }
            .pools-stcore {
              top: 85px;
              left: 25px;
              position: absolute;
            }
          }
        `}
      </style>
    </>
  )
}

export default Glow

