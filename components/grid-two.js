import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

import Candlesticks from './candlesticks'
import Holders from './holders'
import Txtables from './txtables'

const GridTwo = (props) => {
  if (!props.visible) return null; 
  const style = {
    order: props.order, // Use order from props
    // Add other styles if needed
  };
  return (
    <>
      <div style={style} className={`grid-two-charts ${props.rootClassName} `}>
        <div className="grid-two-container"></div>
        <Candlesticks reserve1={props.reserve1} reserve2={props.reserve2} rootClassName="candlesticksroot-class-name"></Candlesticks>
        <div className="grid-two-transactions">
          <div className="grid-two-tabs">
            <h1 className="grid-two-text1">
              {props.heading ?? (
                <Fragment>
                  <span className="grid-two-text7">Transactions</span>
                </Fragment>
              )}
            </h1>
            <h1 className="grid-two-text2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="grid-two-text8">Holders</span>
                </Fragment>
              )}
            </h1>
            <h1 className="grid-two-text3">
              {props.heading2 ?? (
                <Fragment>
                  <span className="grid-two-text6">Liquidity</span>
                </Fragment>
              )}
            </h1>
          </div>
         <div className='center-c'>
     
          <Txtables
            text={
              <Fragment>
                <span className="grid-two-text5">No data found</span>
              </Fragment>
            }
            rootClassName="txtablesroot-class-name"
          ></Txtables>
         </div>
        </div>
      </div>
      <style jsx>
        {`
          .grid-two-charts {
            flex: 0 0 auto;
            width: 50%;
            height: 100%;
            display: flex;
            position: relative;
            align-items: center;
            border-color: rgba(120, 120, 120, 0.5);
            border-style: solid;
            border-width: 1px;
            flex-direction: column;
            justify-content: flex-start;
            border-top-width: 0px;
            border-bottom-width: 0px;
          }
          .grid-two-container {
            width: 100%;
            height: var(--dl-size-size-medium);
            display: flex;
            align-items: flex-start;
          }
          .grid-two-transactions {
            gap: var(--dl-space-space-unit);
            flex: 0 0 auto;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            border-color: rgba(120, 120, 120, 0.5);
            border-width: 1px;
            flex-direction: column;
            justify-content: flex-start;
            border-left-width: 0px;
            border-right-width: 0px;
            border-bottom-width: 0px;
          }
          .grid-two-tabs {
            gap: var(--dl-space-space-twounits);
            flex: 0 0 auto;
            width: 100%;
            cursor: pointer;
            height: auto;
            display: flex;
            align-items: flex-start;
            padding-top: var(--dl-space-space-halfunit);
            border-color: rgba(120, 120, 120, 0.4);
            border-width: 0px;
            padding-left: var(--dl-space-space-halfunit);
            padding-right: var(--dl-space-space-halfunit);
            flex-direction: row;
            padding-bottom: 0px;
            border-top-width: 0px;
            border-left-width: 0px;
            border-right-width: 0px;
            border-bottom-width: 1px;
          }
          .grid-two-text1 {
            font-size: 14px;
            border-color: #a2a2a2;
            border-width: 1px;
            padding-bottom: var(--dl-space-space-halfunit);
            border-top-width: 0px;
            border-left-width: 0px;
            border-right-width: 0px;
            border-bottom-width: 4px;
          }
          .grid-two-text2 {
            color: rgb(119, 119, 119);
            font-size: 14px;
            border-color: transparent;
            border-width: 1px;
            padding-bottom: var(--dl-space-space-halfunit);
            border-top-width: 0px;
            border-left-width: 0px;
            border-right-width: 0px;
            border-bottom-width: 2px;
          }
          .grid-two-text3 {
            fill: #777777;
            color: rgb(119, 119, 119);
            font-size: 14px;
            border-color: transparent;
            border-width: 1px;
            padding-bottom: var(--dl-space-space-halfunit);
            border-top-width: 0px;
            border-left-width: 0px;
            border-right-width: 0px;
            border-bottom-width: 2px;
          }
          .grid-two-text4 {
            display: inline-block;
          }
          .grid-two-text5 {
            display: inline-block;
          }
          .grid-two-text6 {
            display: inline-block;
          }
          .grid-two-text7 {
            display: inline-block;
          }
          .grid-two-text8 {
            display: inline-block;
          }
          .grid-tworoot-class-name {
            top: 0px;
            left: 0px;
            right: 0px;
            width: 57%;
            height: auto;
            position: static;
          }
          @media (max-width: 1600px) {
            .grid-tworoot-class-name {
              width: 57%;
            }
          }
          @media (max-width: 1200px) {
            .grid-tworoot-class-name {
              width: 45%;
            }
          }
          @media (max-width: 991px) {
            .grid-tworoot-class-name {
              display: none;
            }
          }
          @media (max-width: 767px) {
            .grid-tworoot-class-name {
              display: none;
              position: relative;
            }
          }
          @media (max-width: 479px) {
            .grid-two-charts {
              width: 100%;
              border-left-width: 0px;
              border-right-width: 0px;
            }
            .grid-tworoot-class-name {
              height: auto;
              display: flex;
            }
          }
        `}
      </style>
    </>
  )
}

GridTwo.defaultProps = {
  heading2: undefined,
  heading: undefined,
  heading1: undefined,
  rootClassName: '',
  order: undefined,
  visible: undefined
}

GridTwo.propTypes = {
  heading2: PropTypes.element,
  heading: PropTypes.element,
  heading1: PropTypes.element,
  rootClassName: PropTypes.string,
  order: PropTypes.any,
  visible: PropTypes.any
}

export default GridTwo
