import React, { Fragment, useRef } from 'react'

import PropTypes from 'prop-types'
import { useBackground } from '../lib/context';
import Image from './img';

const Mode2 = (props) => {
  const { toggleBackground, isDefaultBackground } = useBackground();
  const { isDivVisible, toggleDivVisibility } = useBackground();
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
      <div className={`mode2-mode2 ${props.rootClassName} `}>
        <div className="mode2-container1">
          <h2 className="mode2-text10">
            {props.heading ?? (
              <Fragment>
                <span className="mode2-text16">Choose Pro theme</span>
              </Fragment>
            )}
          </h2>
          <span className="mode2-text11">
            {props.text ?? (
              <Fragment>
                <span className="mode2-text17">
                  Select either day or night 
                </span>
              </Fragment>
            )}
          </span>
        </div>
        <div className="mode2-container2" onClick={()=>handleClick()}>
          <div className="mode2-container3" onClick={isDefaultBackground && toggleBackground}>
            <span className="mode2-text12">
              {props.text1 ?? (
                <Fragment>
                  <span className="mode2-text18">GM</span>
                </Fragment>
              )}
            </span>
            <Image
              src={props.imageSrc}
              alt={props.imageAlt}
              className="mode2-image1"
              height="100%"
              width="100%"
            />
            <span className="mode2-text13">
              {props.text2 ?? (
                <Fragment>
                  <span className="mode2-text19">Day time theme without Horizon Effect</span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="mode2-container4"  onClick={!isDefaultBackground && toggleBackground}>
            <span className="mode2-text14">
              {props.text3 ?? (
                <Fragment>
                  <span className="mode2-text20">GN</span>
                </Fragment>
              )}
            </span>
            <Image
             height="100%"
             width="100%"
              src={props.imageSrc1}
              alt={props.imageAlt1}
              className="mode2-image2"
            />
            <span className="mode2-text15">
              {props.text4 ?? (
                <Fragment>
                  <span className="mode2-text21">Night time theme without Horizon Effect</span>
                </Fragment>
              )}
            </span>
          </div>
        </div>
        <div className="mode2-container5"></div>
        <div className="mode2-container6"></div>
      </div>
      <style jsx>
        {`
          .mode2-mode2 {
            flex: 0 0 auto;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: column;
          }
          .mode2-container1 {
            gap: var(--dl-space-space-halfunit);
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .mode2-text10 {
            color: rgb(222, 262, 262);
          }
          .mode2-text11 {
            color: rgb(158, 158, 158);
          }
          .mode2-container2 {
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
          .mode2-container3 {
            gap: var(--dl-space-space-oneandhalfunits);
            flex: 0 0 auto;
            width: 50%;
            height: 100%;
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
          .mode2-text12 {
            color: rgb(144, 144, 144);
          }
          .mode2-image1 {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: var(--dl-radius-radius-imageradius);
          }
          .mode2-text13 {
            color: rgb(181, 181, 181);
          }
          .mode2-container4 {
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
          .mode2-text14 {
            color: rgb(144, 144, 144);
          }
          .mode2-image2 {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: var(--dl-radius-radius-imageradius);
          }
          .mode2-text15 {
            color: rgb(181, 181, 181);
          }
         
          .mode2-text16 {
            display: inline-block;
          }
          .mode2-text17 {
            display: inline-block;
          }
          .mode2-text18 {
            display: inline-block;
          }
          .mode2-text19 {
            display: inline-block;
          }
          .mode2-text20 {
            display: inline-block;
          }
          .mode2-text21 {
            display: inline-block;
          }
          .mode2root-class-name {
            display: none;
          }
          @media (max-width: 479px) {
            .mode2-container2 {
              width: 100%;
              flex-direction: column;
            }
            .mode2-container3 {
              width: 100%;
              height: 210px;
              padding: 10px;
            }
            .mode2-container4 {
              width: 100%;
              height: 210px;
            }
            .mode2-container5 {
              top: 697px;
              left: 180px;
              width: 105px;
              height: 117px;
              position: fixed;
            }
            .mode2-container6 {
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

Mode2.defaultProps = {
  heading: undefined,
  text: undefined,
  text1: undefined,
  imageSrc: '/screenshot%202025-02-24%20182003-1600w.png',
  imageAlt: 'image',
  text2: undefined,
  text3: undefined,
  imageSrc1: '/screenshot%202025-02-24%20182027-1600w.png',
  imageAlt1: 'image',
  text4: undefined,
  rootClassName: '',
}

Mode2.propTypes = {
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

export default Mode2
