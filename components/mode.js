import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import Image from './img';

const Mode = (props) => {
  const audioRef = useRef(null);

  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Playback error:", error);
      });
    }
  };

  const handleSimpleClick = () => {
    // Simple: corresponds to Mode2 (pro mode false)
    if (props.onSelect) {
      props.onSelect('mode1');
      props.setProMode(false)
    }
  };

  const handleProClick = () => {
    // Pro Mode: corresponds to Mode1 (pro mode true)
    if (props.onSelect) {
      props.onSelect('mode2');
      props.setProMode(true);
    }
  };

  return (
    <>
       <audio ref={audioRef} src="/select.wav" />
      <div className={`mode-mode ${props.rootClassName}`}>
        <div className="mode-container1">
          <h1 className="mode-text10">
            {props.heading ?? (
              <Fragment>
                <span className="mode-text16">Beginners and Experts</span>
              </Fragment>
            )}
          </h1>
          <hr />
          <span className="mode-text11">
            {props.text ?? (
              <Fragment>
                <span className="mode-text17">
                  Select the Mode you prefer to use.
                </span>
              </Fragment>
            )}
          </span>
        </div>
        <div className="mode-container2" onClick={()=>handleClick()} >
          <div className="mode-container3" onClick={handleSimpleClick}>
            <span className="mode-text12">
              {props.text1 ?? (
                <Fragment>
                  <span className="mode-text18">Simple</span>
                </Fragment>
              )}
            </span>
            <Image
              src='/screenshot 2025-02-24 174240-1600w.png'
              alt={props.imageAlt}
              className="mode-image1"
              height="100%"
              width="100%"
            />
            <span className="mode-text13">
              {props.text2 ?? (
                <Fragment>
                  <span className="mode-text19">
                    Simple and satisfying UI interface for new and inexperienced users.
                  </span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="mode-container4" onClick={handleProClick}>
            <span className="mode-text14">
              {props.text3 ?? (
                <Fragment>
                  <span className="mode-text20">Pro Mode</span>
                </Fragment>
              )}
            </span>
            <Image
              src='/screenshot 2025-02-24 182027-1600w.png'
              alt={props.imageAlt1}
              className="mode-image2"
              height="100%"
              width="100%"
            />
            <span className="mode-text15">
              {props.text4 ?? (
                <Fragment>
                  <span className="mode-text21">
                    More detailed view and insight. For pro traders or experienced users.
                  </span>
                </Fragment>
              )}
            </span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .mode-mode {
          flex: 0 0 auto;
          display: flex;
          position: relative;
          align-items: center;
          flex-direction: column;
          height: auto;
        }
        .mode-container1 {
          gap: var(--dl-space-space-halfunit);
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
        }
        .mode-text10 {
          color: rgb(162, 162, 162);
        }
        .mode-text11 {
          color: rgb(158, 158, 158);
        }
        .mode-container2 {
          gap: 10px;
          width: 1539px;
          cursor: pointer;
          height: auto;
          display: flex;
          padding: var(--dl-space-space-unit);
          margin-top: var(--dl-space-space-unit);
          align-items: center;
          justify-content: center;
        }
        .mode-container3 {
          gap: var(--dl-space-space-oneandhalfunits);
          flex: 0 0 auto;
          width: 50%;
          display: flex;
          padding: var(--dl-space-space-unit);
          z-index: 1;
          align-items: center;
          border-color: rgba(100, 100, 100, 0.3);
          border-width: 1px;
          border-radius: 18px;
          flex-direction: column;
          backdrop-filter: blur(10px);
          justify-content: center;
          /* Highlight Simple (Mode2) if not in pro mode */
          border: ${!props.pro ? '2px solid orange' : 'none'};
        }
        .mode-text12 {
          color: rgb(144, 144, 144);
        }
        .mode-image1 {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: var(--dl-radius-radius-imageradius);
        }
        .mode-text13 {
          color: rgb(181, 181, 181);
        }
        .mode-container4 {
          gap: var(--dl-space-space-oneandhalfunits);
          flex: 0 0 auto;
          width: 50%;
          display: flex;
          padding: var(--dl-space-space-unit);
          z-index: 1;
          align-items: center;
          border-color: rgba(100, 100, 100, 0.3);
          border-width: 1px;
          border-radius: 18px;
          flex-direction: column;
          backdrop-filter: blur(10px);
          justify-content: center;
          /* Highlight Pro Mode (Mode1) if in pro mode */
          border: ${props.pro ? '2px solid green' : ''};
        }
        .mode-container4:hover{
          border: 2px solid green;
        }
        .mode-container5:hover{
          border: 2px solid orange;
        }
        .mode-text14 {
          color: #909090;
        }
        .mode-image2 {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: var(--dl-radius-radius-imageradius);
        }
        .mode-text15 {
          color: #b5b5b5;
        }
        .mode-text16,
        .mode-text17,
        .mode-text18,
        .mode-text19,
        .mode-text20,
        .mode-text21 {
          display: inline-block;
        }
        .moderoot-class-name {
          display: none;
        }
        @media (max-width: 479px) {
          .mode-text16 {
            font-size: 20px;
          }
          .mode-container2 {
            width: 100%;
            height: auto;
            flex-direction: column;
          }
          .mode-container3,
          .mode-container4 {
            width: 100%;
            height: 220px;
            margin-bottom: 10px;
          }
        }
      `}</style>
    </>
  );
};

Mode.defaultProps = {
  heading: undefined,
  text: undefined,
  text1: undefined,
  imageSrc: '/screenshot%202025-02-24%20174240-1600w.png',
  imageAlt: 'image',
  text2: undefined,
  text3: undefined,
  imageSrc1: '/screenshot%202025-02-24%20174253-1600w.png',
  imageAlt1: 'image',
  text4: undefined,
  rootClassName: '',
  setProMode: undefined,
  pro: undefined,
};

Mode.propTypes = {
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
  setProMode: PropTypes.func,
  pro: PropTypes.bool,
  onSelect: PropTypes.func,
};

export default Mode;
