import React, { Fragment, useContext, useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'
import { useBackground } from '../lib/context';
import { useLayout } from '../lib/laytoutContext';
import { TokenContext } from '../lib/tokenContext';

const Settings = (props) => {
  const { toggleBackground, isDefaultBackground } = useBackground();
  const { isDivVisible, toggleDivVisibility } = useBackground();
  const { showEarthContainer, toggleEarthContainer, setShowEarthContainer } = useBackground();
  const { isAudioEnabled, toggleAudio } = useBackground();
  const { slippage, setSlippage } = useContext(TokenContext);
  // Helper to compute best slippage based on inputAmount
  const getAutoSlippage = (inputAmount) => {
    // Example logic: adjust thresholds as needed
    if (inputAmount < 100) return 0.1;
    if (inputAmount < 1000) return 0.5;
    if (inputAmount < 10000) return 1.0;
    return 1.5;
  };
  // Determine initial slippage option based on the global slippage value
  const initialOption = slippage === 0.1 || slippage === 0.5 ? slippage.toString() : 'auto';
  const [selectedOption, setSelectedOption] = useState(initialOption);
  const [customValue, setCustomValue] = useState(initialOption === 'custom' ? slippage.toString() : '');

  const handleSlippageClick = (value) => {
    if (value === 'custom') {
      setSelectedOption('custom');
      // If there's no custom value yet, default to 0.1%
      if (!customValue) {
        setCustomValue('0.1');
        setSlippage(0.1);
      }
    } else if (value === 'auto') {
      setSelectedOption('auto');
      // Use the inputAmount prop to calculate best slippage
      const bestSlippage = getAutoSlippage(props.inputAmount);
      setSlippage(bestSlippage);
    } else {
      setSelectedOption(value);
      setSlippage(parseFloat(value));
    }
  };

  return (
    <>
      <div className={`settings-settings ${props.rootClassName} `}>
        <div className="settings-container10">
          <span>
            {props.text ?? (
              <Fragment>
                <span className="settings-text29">Settings</span>
              </Fragment>
            )}
          </span>
          <svg onClick={props.closeModal3}  width="24" height="24" viewBox="0 0 32 32">
            <path
              d="M2 6v20a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2m2 0h16v20H4v-9h10.17l-3.58 3.59L12 22l6-6l-6-6l-1.41 1.41L14.17 15H4z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div className="settings-container11">
          <span>
            {props.text11 ?? (
              <Fragment>
                <span className="settings-text30">{isDefaultBackground ? 'Night-time' : 'Daytime'}</span>
              </Fragment>
            )}
          </span>
          {!isDefaultBackground ?  <svg width="24" height="24" viewBox="0 0 24 24"   onClick={toggleBackground} >
            <g
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            >
              <path d="M12 3V2m0 20v-1m9-9h1M2 12h1m15.5-6.5L20 4M4 20l1.5-1.5M4 4l1.5 1.5m13 13L20 20"></path>
              <circle r="4" cx="12" cy="12"></circle>
            </g>
          </svg> : <svg width="24" height="24" viewBox="0 0 36 36"   onClick={toggleBackground} >
            <path
              d="M31 27.19a1 1 0 0 0-1-.56h-.85a11 11 0 0 1-4.23-21.02a1 1 0 0 0 .61-1a1 1 0 0 0-.67-.91a14.7 14.7 0 0 0-5-.87a15.12 15.12 0 0 0 0 30.24a14.78 14.78 0 0 0 11-4.81a1 1 0 0 0 .14-1.07m-11.11 3.93a13.12 13.12 0 0 1 0-26.24a12 12 0 0 1 2 .16a13 13 0 0 0 5.72 23.53a12.75 12.75 0 0 1-7.72 2.55"
              fill="currentColor"
              className="clr-i-outline clr-i-outline-path-1"
            ></path>
            <path d="M0 0h36v36H0z" fill="none"></path>
          </svg>}
        </div>
        <div className='hid'>
        <div onClick={toggleEarthContainer} className="settings-container11">
          <span>
            {props.text11 ?? (
              <Fragment>
                <span className="settings-text30">Horizon Effect</span>
              </Fragment>
            )}
          </span>
          {!showEarthContainer ?  <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <rect x="5" y="7" width="14" height="10" rx="2" stroke="white" stroke-width="2"/> <rect x="7" y="9" width="5" height="6" rx="1" fill="orange"/> </g>

</svg> : <svg width="42px" height="42px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <rect x="5" y="7" width="14" height="10" rx="2" stroke="white" stroke-width="2"/> <rect x="12" y="9" width="5" height="6" rx="1" fill="limegreen"/> </g>

</svg>}
        </div>
        </div>
        <div onClick={toggleAudio} className="settings-container11">
          <span>
            {props.text11 ?? (
              <Fragment>
                <span className="settings-text30">Ocean Sounds</span>
              </Fragment>
            )}
          </span>
          {isAudioEnabled ? 
           <svg  width="32px" height="32px"  fill="#adadad" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#adadad"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" d="M11.553 3.064A.75.75 0 0112 3.75v16.5a.75.75 0 01-1.255.555L5.46 16H2.75A1.75 1.75 0 011 14.25v-4.5C1 8.784 1.784 8 2.75 8h2.71l5.285-4.805a.75.75 0 01.808-.13zM10.5 5.445l-4.245 3.86a.75.75 0 01-.505.195h-3a.25.25 0 00-.25.25v4.5c0 .138.112.25.25.25h3a.75.75 0 01.505.195l4.245 3.86V5.445z"></path><path d="M18.718 4.222a.75.75 0 011.06 0c4.296 4.296 4.296 11.26 0 15.556a.75.75 0 01-1.06-1.06 9.5 9.5 0 000-13.436.75.75 0 010-1.06z"></path><path d="M16.243 7.757a.75.75 0 10-1.061 1.061 4.5 4.5 0 010 6.364.75.75 0 001.06 1.06 6 6 0 000-8.485z"></path></g></svg>
            :
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="32px" height="32px"  fill="#adadad"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path stroke="#9e9e9e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.5 21H8a1 1 0 01-1-1v-8a1 1 0 011-1h7l5-5 1.586-1.586C22.846 3.154 25 4.047 25 5.828V6m-8 17l4.586 4.586c1.26 1.26 3.414.367 3.414-1.414V14.5M7 28L29 6"></path> </g></svg>}
        </div>
        <div className="settings-container11" onClick={toggleDivVisibility}>
          <span>
            {props.text11 ?? (
              <Fragment>
                <span className="settings-text30">Hover Prices</span>
              </Fragment>
            )}
          </span>
          {!isDivVisible ?  <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <rect x="5" y="7" width="14" height="10" rx="2" stroke="white" stroke-width="2"/> <rect x="7" y="9" width="5" height="6" rx="1" fill="orange"/> </g>

</svg> : <svg width="42px" height="42px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <rect x="5" y="7" width="14" height="10" rx="2" stroke="white" stroke-width="2"/> <rect x="12" y="9" width="5" height="6" rx="1" fill="limegreen"/> </g>

</svg>}
        </div>
        <div className="settings-container12">
          <span>
            {props.text12 ?? (
              <Fragment>
                <span className="settings-text33">Slippage</span>
              </Fragment>
            )}
          </span>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2v2a8 8 0 1 0 5.135 1.865L15 8V2h6l-2.447 2.447A9.98 9.98 0 0 1 22 12"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div className="settings-container13">
          <button className={`button slippage-option ${selectedOption === 'auto' ? 'selected' : ''}`}
            onClick={() => handleSlippageClick('auto')}>
            <span>
              {props.button4 ?? (
                <Fragment>
                  <span className="settings-text34">Auto</span>
                </Fragment>
              )}
            </span>
          </button>
          <button  className={`button slippage-option ${selectedOption === '0.1' ? 'selected' : ''}`}
            onClick={() => handleSlippageClick('0.1')}>
            <span>
              {props.button31 ?? (
                <Fragment>
                  <span className="settings-text35">0.1%</span>
                </Fragment>
              )}
            </span>
          </button>
          <button 
          className={`button slippage-option ${selectedOption === '0.5' ? 'selected' : ''}`}
          onClick={() => handleSlippageClick('0.5')}
          >
            <span>
              {props.button21 ?? (
                <Fragment>
                  <span className="settings-text36">0.5%</span>
                </Fragment>
              )}
            </span>
          </button>
           <button className={`button slippage-option ${selectedOption === 'custom' ? 'selected' : ''}`}
            onClick={() => handleSlippageClick('custom')} >
            <span>
              {props.button21 ?? (
                <Fragment>
                  <span className="settings-text36">
                    <input 
                    value={customValue}
                    onChange={(e) => {
                      setCustomValue(e.target.value);
                      const parsedValue = parseFloat(e.target.value);
                      if (!isNaN(parsedValue) && parsedValue < 2) {
                        setSlippage(parsedValue);
                      }
                    }}
                    type='number' className='input' placeholder='0.0%' style={{width: '80px', height: '30px', padding: '0px', background: 'none', border: 'none', textAlign: 'end'}} />
                  </span>
                </Fragment>
              )}
            </span>
          </button>
        </div>
     
      {props.proMode &&  
       <><div className="settings-container14">
       <span>
         {props.text2 ?? (
           <Fragment>
             <span className="settings-text32">Pro Mode Layout</span>
             <br>
             </br>
           <p style={{fontSize: '9px', fontStyle: 'italic', color: 'rgba(150, 150, 150, 0.4)'}}> Choose the location of the Swap component</p>
           </Fragment>
         )}
       </span>
       <svg width="24" height="24" viewBox="0 0 24 24">
         <path
           d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2v2a8 8 0 1 0 5.135 1.865L15 8V2h6l-2.447 2.447A9.98 9.98 0 0 1 22 12"
           fill="currentColor"
         ></path>
       </svg>
     </div>
     <div className="settings-container15">
         
          <div className="settings-container16" onClick={() => props.toggleLayout('left')}>
            <div className="settings-container17">
              <span className="settings-text17">
                {props.text3 ?? (
                  <Fragment>
                    <span className="settings-text27">L</span>
                  </Fragment>
                )}
              </span>
            </div>
          </div>
          <div className="settings-container18" onClick={() => props.toggleLayout('right')}>
            <div className="settings-container19">
              <span className="settings-text18">
                {props.text5 ?? (
                  <Fragment>
                    <span className="settings-text28">R</span>
                  </Fragment>
                )}
              </span>
            </div>
          </div>
        </div></>}
        <div className="settings-container20">
          <span>
            {props.text1 ?? (
              <Fragment>
                <span className="settings-text24">Gas Priority</span>
              </Fragment>
            )}
          </span>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2v2a8 8 0 1 0 5.135 1.865L15 8V2h6l-2.447 2.447A9.98 9.98 0 0 1 22 12"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div className="settings-container13">
          <button type="button" className="button">
            <span>
              {props.button ?? (
                <Fragment>
                  <span className="settings-text25">Auto</span>
                </Fragment>
              )}
            </span>
          </button>
          <button type="button" className="button">
            <span>
              {props.button3 ?? (
                <Fragment>
                  <span className="settings-text26">fast</span>
                </Fragment>
              )}
            </span>
          </button>
          <button type="button" className="button">
            <span>
              {props.button22 ?? (
                <Fragment>
                  <span className="settings-text37">Slow</span>
                </Fragment>
              )}
            </span>
          </button>
          <button type="button" className="button">
            <span>
              {props.button22 ?? (
                <Fragment>
                  <span className="settings-text37">Ultra</span>
                </Fragment>
              )}
            </span>
          </button>
        </div>
      </div>
      <style jsx>
        {`
         .slippage-option {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          margin-right: 10px;
          cursor: pointer;
        }
        .slippage-option.selected {
          border: 2px solid #adadad;
        }
          .settings-settings {
            flex: 0 0 auto;
            color: gray;
            width: 450px;
            cursor: pointer;
            height: 100%;
            display: flex;
            z-index: 500;
            position: fixed;
            right: 0px;
            align-items: center;
            border-color: rgba(175, 175, 175, 0.26);
            border-width: 1px;
            flex-direction: column;
            backdrop-filter: blur(30px);
            background: rgba(0, 0, 0, 0.5);
            color: white;
            justify-content: flex-start;
            border-top-width: 0px;
            border-right-width: 1px;
            border-bottom-width: 0px;
          }
          
          .settings-container10 {
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
          .settings-container11 {
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
          .settings-container12 {
            width: 100%;
            height: 63px;
            display: flex;
            padding: var(--dl-space-space-unit);
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
          }
          .settings-container13 {
            gap: var(--dl-space-space-halfunit);
            flex: 0 0 auto;
            width: 100%;
            display: grid;
            padding: var(--dl-space-space-halfunit);
            border-color: rgba(41, 41, 41, 0.15);
            border-width: 1px;
            border-top-width: 0px;
            border-left-width: 0px;
            border-right-width: 0px;
            grid-template-columns: 1fr 1fr 1fr 1fr;
          }
          .settings-container14 {
            width: 100%;
            height: auto;
            display: flex;
            padding: var(--dl-space-space-unit);
            align-items: center;
            padding-right: 16px;
            flex-direction: row;
            justify-content: space-between;
          }
          .settings-container15 {
            gap: var(--dl-space-space-halfunit);
            flex: 0 0 auto;
            width: 100%;
            display: grid;
            padding: var(--dl-space-space-halfunit);
            grid-template-columns: 1fr 1fr;
          }
          .settings-container16 {
            flex: 0 0 auto;
            width: 100%;
            height: var(--dl-size-size-medium);
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: center;
            border-color: rgba(41, 41, 41, 0.37);
            border-width: 4px;
            justify-content: flex-start;
            background-color: rgba(21, 21, 21, 0.54);
          }
          .settings-container17 {
            flex: 0 0 auto;
            width: 40px;
            padding: 1px;
            height: 100%;
            display: flex;
            align-items: center;
            border-color: rgba(224, 224, 224, 0.37);
            border-width: 1px;
            border-radius: var(--dl-radius-radius-radius4);
            flex-direction: column;
            justify-content: center;
          }
          .settings-text17 {
            color: #ffffff;
            font-size: 9px;
          }
          .settings-container18 {
            flex: 0 0 auto;
            width: 100%;
            height: var(--dl-size-size-medium);
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: center;
            border-color: rgba(41, 41, 41, 0.37);
            border-width: 4px;
            justify-content: flex-end;
            background-color: rgba(21, 21, 21, 0.54);
          }
          .settings-container18:hover:active{
            border-color: rgba(41, 241, 41, 0.37);
          }
          .settings-container16:hover:active{
            border-color: rgba(41, 241, 41, 0.37);
          }
          .settings-container19 {
            flex: 0 0 auto;
            width: 40px;
            padding: 1px;
            height: 100%;
            display: flex;
            align-items: center;
            border-color: rgba(224, 224, 224, 0.37);
            border-width: 1px;
            border-radius: var(--dl-radius-radius-radius4);
            flex-direction: column;
            justify-content: center;
          }
          .settings-text18 {
            color: #ffffff;
            font-size: 9px;
          }
          .settings-container20 {
            width: 100%;
            height: 63px;
            display: flex;
            padding: var(--dl-space-space-unit);
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
          }
          .settings-container21 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            border-color: rgba(41, 41, 41, 0.15);
            border-width: 1px;
            justify-content: space-between;
            border-top-width: 0px;
            border-left-width: 0px;
            gap: 10px;
            border-right-width: 0px;
          }
          .settings-text24 {
            display: inline-block;
          }
          .settings-text25 {
            display: inline-block;
          }
          .settings-text26 {
            display: inline-block;
          }
          .settings-text27 {
            display: inline-block;
          }
          .settings-text28 {
            display: inline-block;
          }
          .settings-text29 {
            display: inline-block;
          }
          .settings-text30 {
            display: inline-block;
          }
          .settings-text31 {
            display: inline-block;
          }
          .settings-text32 {
            display: inline-block;
          }
          .settings-text33 {
            display: inline-block;
          }
          .settings-text34 {
            display: inline-block;
          }
          .settings-text35 {
            display: inline-block;
          }
          .settings-text36 {
            display: inline-block;
          }
          .settings-text37 {
            display: inline-block;
          }
          .settingsroot-class-name {
            top: 0px;
            right: 0px;
            display: none;
            position: absolute;
          }
          @media (max-width: 479px) {
            .settings-settings {
              width: 100%;
            }
            .settings-container21 {
              gap: 10px;
              display: flex;
              justify-content: space-between;
            }
          }
        `}
      </style>
    </>
  )
}

Settings.defaultProps = {
  text1: undefined,
  button: undefined,
  button3: undefined,
  text3: undefined,
  text5: undefined,
  text: undefined,
  rootClassName: '',
  text11: undefined,
  button2: undefined,
  text2: undefined,
  text12: undefined,
  button4: undefined,
  button31: undefined,
  button21: undefined,
  button22: undefined,
  closeModal3: undefined,
  toggleLayout: undefined,
  proMode: undefined
}

Settings.propTypes = {
  text1: PropTypes.element,
  button: PropTypes.element,
  button3: PropTypes.element,
  text3: PropTypes.element,
  text5: PropTypes.element,
  text: PropTypes.element,
  rootClassName: PropTypes.string,
  text11: PropTypes.element,
  button2: PropTypes.element,
  text2: PropTypes.element,
  text12: PropTypes.element,
  button4: PropTypes.element,
  button31: PropTypes.element,
  button21: PropTypes.element,
  button22: PropTypes.element,
  closeModal3: PropTypes.any,
  toggleLayout: PropTypes.element,
  proMode: PropTypes.any
}

export default Settings
