import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

import Search from './search'

const Tabs2 = (props) => {
  return (
    <>
      <div className="tabs2-tabs">
        <div className="tabs2-container">
          <span className="tabs2-text1">
            {props.text ?? (
              <Fragment>
                <span className="tabs2-text5">Pools</span>
              </Fragment>
            )}
          </span>
          <span className="tabs2-text2">
            {props.text1 ?? (
              <Fragment>
                <span className="tabs2-text6">Watchlist</span>
              </Fragment>
            )}
          </span>
          <span className="tabs2-text3">
            {props.text2 ?? (
              <Fragment>
                <span className="tabs2-text7">portfolio</span>
              </Fragment>
            )}
          </span>
        </div>
        <div className="tabs2-alerts">
          <button type="button" className="tabs2-button button">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <g
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              >
                <g>
                  <path d="M12 3V5" stroke-dasharray="4" stroke-dashoffset="4">
                    <animate
                      dur="0.2s"
                      fill="freeze"
                      values="4;0"
                      attributeName="stroke-dashoffset"
                    ></animate>
                  </path>
                  <path
                    d="M12 5C8.68629 5 6 7.68629 6 11L6 17C5 17 4 18 4 19H12M12 5C15.3137 5 18 7.68629 18 11L18 17C19 17 20 18 20 19H12"
                    stroke-dasharray="28"
                    stroke-dashoffset="28"
                  >
                    <animate
                      dur="0.4s"
                      fill="freeze"
                      begin="0.2s"
                      values="28;0"
                      attributeName="stroke-dashoffset"
                    ></animate>
                  </path>
                  <animatetransform
                    dur="6s"
                    type="rotate"
                    begin="0.8s"
                    values="0 12 3;3 12 3;-3 12 3;0 12 3;0 12 3"
                    keyTimes="0;0.05;0.15;0.2;1"
                    repeatCount="indefinite"
                    attributeName="transform"
                  ></animatetransform>
                </g>
                <path
                  d="M10 20C10 21.1046 10.8954 22 12 22C13.1046 22 14 21.1046 14 20"
                  stroke-dasharray="8"
                  stroke-dashoffset="8"
                >
                  <animate
                    dur="0.2s"
                    fill="freeze"
                    begin="0.6s"
                    values="8;0"
                    attributeName="stroke-dashoffset"
                  ></animate>
                  <animatetransform
                    dur="6s"
                    type="rotate"
                    begin="1s"
                    values="0 12 8;6 12 8;-6 12 8;0 12 8;0 12 8"
                    keyTimes="0;0.05;0.15;0.2;1"
                    repeatCount="indefinite"
                    attributeName="transform"
                  ></animatetransform>
                </path>
                <path
                  d="M22 6v4"
                  opacity="0"
                  stroke-dasharray="8"
                  stroke-dashoffset="8"
                >
                  <set to="1" begin="1s" attributeName="opacity"></set>
                  <animate
                    dur="0.2s"
                    fill="freeze"
                    begin="1s"
                    values="8;0"
                    attributeName="stroke-dashoffset"
                  ></animate>
                  <animate
                    dur="3s"
                    begin="1.7s"
                    values="2;3;3;2;2"
                    keyTimes="0;0.1;0.2;0.3;1"
                    repeatCount="indefinite"
                    attributeName="stroke-width"
                  ></animate>
                </path>
              </g>
              <circle
                r="1"
                cx="22"
                cy="14"
                fill="currentColor"
                fill-opacity="0"
              >
                <animate
                  dur="0.4s"
                  fill="freeze"
                  begin="1s"
                  values="0;1"
                  attributeName="fill-opacity"
                ></animate>
                <animate
                  dur="3s"
                  begin="2s"
                  values="1;2;2;1;1"
                  keyTimes="0;0.1;0.2;0.3;1"
                  repeatCount="indefinite"
                  attributeName="r"
                ></animate>
              </circle>
            </svg>
            <span className="tabs2-text4">
              {props.text3 ?? (
                <Fragment>
                  <span className="tabs2-text8">0</span>
                </Fragment>
              )}
            </span>
          </button>
          <Search rootClassName="searchroot-class-name"></Search>
        </div>
      </div>
      <style jsx>
        {`
          .tabs2-tabs {
            width: 100%;
            height: 40px;
            display: flex;
            position: relative;
            align-items: center;
            padding-left: var(--dl-space-space-halfunit);
            padding-right: var(--dl-space-space-halfunit);
            justify-content: space-between;
          }
          .tabs2-container {
            gap: var(--dl-space-space-unit);
            flex: 0 0 auto;
            width: auto;
            cursor: pointer;
            height: auto;
            display: flex;
            position: relative;
            align-items: center;
            justify-content: flex-start;
          }
          .tabs2-text1 {
            padding: var(--dl-space-space-halfunit);
            
            border-color: #b3b3b3;
            border-width: 1px;
            border-top-width: 0px;
            border-left-width: 0px;
            border-right-width: 0px;
            border-bottom-width: 4px;
          }
          .tabs2-text2 {
            color: #545454;
            padding: var(--dl-space-space-halfunit);
            
            border-color: #b3b3b3;
            border-width: 1px;
            border-top-width: 0px;
            border-left-width: 0px;
            border-right-width: 0px;
            border-bottom-width: 0px;
          }
          .tabs2-text3 {
            color: rgb(84, 84, 84);
            padding: var(--dl-space-space-halfunit);
            
            border-color: #b3b3b3;
            border-width: 1px;
            border-top-width: 0px;
            border-left-width: 0px;
            border-right-width: 0px;
            border-bottom-width: 0px;
          }
          .tabs2-alerts {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            padding-left: var(--dl-space-space-unit);
            padding-right: var(--dl-space-space-unit);
          }
          .tabs2-button {
            gap: var(--dl-space-space-halfunit);
            height: 36px;
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: center;
          }
          .tabs2-text4 {
            font-size: 18px;
            
          }
          .tabs2-text5 {
            display: inline-block;
          }
          .tabs2-text6 {
            display: inline-block;
          }
          .tabs2-text7 {
            display: inline-block;
          }
          .tabs2-text8 {
            display: inline-block;
          }
          @media (max-width: 479px) {
            .tabs2-alerts {
              display: none;
            }
          }
        `}
      </style>
    </>
  )
}

Tabs2.defaultProps = {
  text: undefined,
  text1: undefined,
  text2: undefined,
  text3: undefined,
}

Tabs2.propTypes = {
  text: PropTypes.element,
  text1: PropTypes.element,
  text2: PropTypes.element,
  text3: PropTypes.element,
}

export default Tabs2
