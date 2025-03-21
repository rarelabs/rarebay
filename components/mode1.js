import React, { Fragment, useRef } from 'react'

import PropTypes from 'prop-types'
import { useBackground } from '../lib/context';
import Image from './img';


const Mode1 = (props) => {
  const { toggleBackground, isDefaultBackground } = useBackground();
  const { showEarthContainer, toggleEarthContainer, setShowEarthContainer } = useBackground();
  const audioRef = useRef(null);

  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Playback error:", error);
      });
    }
  };
  return (
    <>
      <audio ref={audioRef} src="/select.wav" />
      <div className={`mode1-mode ${props.rootClassName} `} onClick={()=>handleClick()}>
        <div className="mode1-container1">
          <h2 className="mode1-text10">
            {props.heading ?? (
              <Fragment>
                <span className="mode1-text16">Choose simple theme</span>
              </Fragment>
            )}
          </h2>
          <span className="mode1-text11">
            {props.text ?? (
              <Fragment>
                <span className="mode1-text17">Select between day or night</span>
              </Fragment>
            )}
          </span>
        </div>
        <div className="mode1-container2" onClick={toggleEarthContainer}>
          <div className="mode1-container3"  onClick={isDefaultBackground && toggleBackground}>
            <span className="mode1-text12">
              {props.text1 ?? (
                <Fragment>
                  <span className="mode1-text18">GM</span>
                </Fragment>
              )}
            </span>
            <Image
              src='/Screenshot 2025-02-24 181535.png'
              alt={props.imageAlt}
              className="mode1-image1"
              height="100%"
              width="100%"
            />
            <span className="mode1-text13">
              {props.text2 ?? (
                <Fragment>
                  <span className="mode1-text19">Day time theme with Horizon Effect</span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="mode1-container4" onClick={!isDefaultBackground && toggleBackground}>
            <span className="mode1-text14">
              {props.text3 ?? (
                <Fragment>
                  <span className="mode1-text20">GN</span>
                </Fragment>
              )}
            </span>
            <Image
              src='/screenshot%202025-02-24%20174240-1600w.png'
              alt={props.imageAlt1}
              className="mode1-image2"
              height="100%"
              width="100%"
            />
            <span className="mode1-text15">
              {props.text4 ?? (
                <Fragment>
                  <span className="mode1-text21">Night time theme with Horizon Effect</span>
                </Fragment>
              )}
            </span>
          </div>
        </div>
        <div className="mode1-container5"></div>
        <div className="mode1-container6"></div>
      </div>
      <style jsx>
        {`
          .mode1-mode {
            flex: 0 0 auto;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: column;
          }
          .mode1-container1 {
            gap: var(--dl-space-space-halfunit);
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .mode1-text10 {
            color: rgb(222, 262, 262);
          }
          .mode1-text11 {
            color: rgb(158, 158, 158);
          }
          .mode1-container2 {
            gap: var(--dl-space-space-twounits);
            width: 1539px;
            cursor: pointer;
            height: auto;
            display: flex;
            padding: var(--dl-space-space-unit);
            margin-top: var(--dl-space-space-unit);
            align-items: center;
            justify-content: center;
          }
          .mode1-container3 {
            gap: var(--dl-space-space-oneandhalfunits);
            flex: 0 0 auto;
            width: 50%;
            height: auto;
            display: flex;
            padding: var(--dl-space-space-unit);
            z-index: 1;
            align-items: center;
            border-color: #5f5f5f;
            border-width: 1px;
            border-radius: 18px;
            flex-direction: column;
            backdrop-filter: blur(10px);
            justify-content: center;
          }
          .mode1-text12 {
            color: rgb(144, 144, 144);
          }
          .mode1-image1 {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: var(--dl-radius-radius-imageradius);
          }
          .mode1-text13 {
            color: rgb(181, 181, 181);
          }
          .mode1-container4 {
            gap: var(--dl-space-space-oneandhalfunits);
            flex: 0 0 auto;
            width: 50%;
            display: flex;
            padding: var(--dl-space-space-unit);
            z-index: 1;
            align-items: center;
            border-color: #5f5f5f;
            border-width: 1px;
            border-radius: 18px;
            flex-direction: column;
            backdrop-filter: blur(10px);
            justify-content: center;
          }
          .mode1-text14 {
            color: rgb(144, 144, 144);
          }
          .mode1-image2 {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: var(--dl-radius-radius-imageradius);
          }
          .mode1-text15 {
            color: rgb(181, 181, 181);
          }
      
          .mode1-text16 {
            display: inline-block;
          }
          .mode1-text17 {
            display: inline-block;
          }
          .mode1-text18 {
            display: inline-block;
          }
          .mode1-text19 {
            display: inline-block;
          }
          .mode1-text20 {
            display: inline-block;
          }
          .mode1-text21 {
            display: inline-block;
          }
          .mode1root-class-name {
            display: none;
          }
          @media (max-width: 479px) {
            .mode1-container2 {
              width: 100%;
              flex-direction: column;
              height: auto;
            }
            .mode1-container3 {
              width: 100%;
              height: 210px;
              padding: 5px;
            }
            .mode1-container4 {
              width: 100%;
              height: 210px;
              padding: 5px;
            }
            .mode1-container5 {
              top: 697px;
              left: 180px;
              width: 105px;
              height: 117px;
              position: fixed;
            }
            .mode1-container6 {
              top: 302px;
              left: 178px;
              right: 99px;
              width: 120px;
              height: 132px;
              position: fixed;
            }
          }
        `}
      </style>
    </>
  )
}

Mode1.defaultProps = {
  heading: undefined,
  text: undefined,
  text1: undefined,
  imageSrc: '/screenshot%202025-02-24%20181545-1600w.png',
  imageAlt: 'image',
  text2: undefined,
  text3: undefined,
  imageSrc1: '/screenshot%202025-02-24%20174240-1600w.png',
  imageAlt1: 'image',
  text4: undefined,
  rootClassName: '',
}

Mode1.propTypes = {
  heading: PropTypes.element,
  text: PropTypes.element,
  text1: PropTypes.element,
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  text2: PropTypes.element,
  text3: PropTypes.element,
  imageSrc1: PropTypes.string,
  imageAlt1: PropTypes.string,
  text4: PropTypes.element,
  rootClassName: PropTypes.string,
}

export default Mode1
