import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

import Trending from './trending'
import Votes from './votes'


const GridThree = (props) => {
  if (!props.visible) return null; 
  const style = {
    order: props.order, // Use order from props
    // Add other styles if needed
  };
  return (
    <>
      <div style={style} className={`grid-three-tokens ${props.rootClassName} `}>
        <div className="grid-three-tabs">
          <div className="grid-three-container1">
            <h1 className="grid-three-text10">
              {props.heading ?? (
                <Fragment>
                  <span className="grid-three-text36">Trending</span>
                </Fragment>
              )}
            </h1>
          </div>
          <div className="grid-three-container2">
            <h1 className="grid-three-text11">
              {props.heading1 ?? (
                <Fragment>
                  <span className="grid-three-text35">watchlist</span>
                </Fragment>
              )}
            </h1>
          </div>
          <div className="grid-three-container3">
            <h1 className="grid-three-text12">
              {props.heading2 ?? (
                <Fragment>
                  <span className="grid-three-text37">Wallet</span>
                </Fragment>
              )}
            </h1>
          </div>
        </div>
        <Trending
          text={
            <Fragment>
              <span className="grid-three-text13">Coin/MarketCap</span>
            </Fragment>
          }
          text1={
            <Fragment>
              <span className="grid-three-text14">Price/Change</span>
            </Fragment>
          }
          text4={
            <Fragment>
              <span className="grid-three-text15">$0.0</span>
            </Fragment>
          }
          text5={
            <Fragment>
              <span className="grid-three-text16">$0.0</span>
            </Fragment>
          }
          heading3={
            <Fragment>
              <span className="grid-three-text17">$0.0</span>
            </Fragment>
          }
          heading4={
            <Fragment>
              <span className="grid-three-text18">CORE</span>
            </Fragment>
          }
          rootClassName="trendingroot-class-name"
        ></Trending>
        <Trending
          text={
            <Fragment>
              <span className="grid-three-text19">Coin/MarketCap</span>
            </Fragment>
          }
          text1={
            <Fragment>
              <span className="grid-three-text20">Price/Change</span>
            </Fragment>
          }
          text4={
            <Fragment>
              <span className="grid-three-text21">$0.0</span>
            </Fragment>
          }
          text5={
            <Fragment>
              <span className="grid-three-text22">$0.0</span>
            </Fragment>
          }
          heading3={
            <Fragment>
              <span className="grid-three-text23">$0.0</span>
            </Fragment>
          }
          heading4={
            <Fragment>
              <span className="grid-three-text24">CORE</span>
            </Fragment>
          }
          rootClassName="trendingroot-class-name2"
        ></Trending>
        <Trending
          text={
            <Fragment>
              <span className="grid-three-text25">Coin/MarketCap</span>
            </Fragment>
          }
          text1={
            <Fragment>
              <span className="grid-three-text26">Price/Change</span>
            </Fragment>
          }
          text4={
            <Fragment>
              <span className="grid-three-text27">$0.0</span>
            </Fragment>
          }
          text5={
            <Fragment>
              <span className="grid-three-text28">$0.0</span>
            </Fragment>
          }
          heading3={
            <Fragment>
              <span className="grid-three-text29">$0.0</span>
            </Fragment>
          }
          heading4={
            <Fragment>
              <span className="grid-three-text30">CORE</span>
            </Fragment>
          }
          rootClassName="trendingroot-class-name1"
        ></Trending>
        <Votes
          text2={
            <Fragment>
              <span className="grid-three-text31">Votes</span>
            </Fragment>
          }
          text3={
            <Fragment>
              <span className="grid-three-text32">0</span>
            </Fragment>
          }
          text={
            <Fragment>
              <span className="grid-three-text33">Yes: 0</span>
            </Fragment>
          }
          text1={
            <Fragment>
              <span className="grid-three-text34">No: 0</span>
            </Fragment>
          }
        ></Votes>
      </div>
      <style jsx>
        {`
          .grid-three-tokens {
            gap: TwoUnits;
            flex: 0 0 auto;
            width: 100%;
            height: 100%;
            display: flex;
            position: relative;
            align-items: center;
            padding-top: var(--dl-space-space-halfunit);
            flex-direction: column;
            justify-content: flex-start;
            
          }
          .grid-three-tabs {
            gap: var(--dl-space-space-unit);
            flex: 0 0 auto;
            width: 100%;
            cursor: pointer;
            height: auto;
            display: flex;
            min-width: auto;
            min-height: auto;
            align-items: flex-start;
            border-color: rgba(120, 120, 120, 0.4);
            border-width: 1px;
            padding-left: var(--dl-space-space-halfunit);
            border-top-width: 0px;
            border-left-width: 0px;
            border-right-width: 0px;
          }
          .grid-three-container1 {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .grid-three-text10 {
            padding: var(--dl-space-space-halfunit);
            font-size: 14px;
            border-color: #a6a6a6;
            border-width: 4px;
            padding-right: 8px;
            border-top-width: 0px;
            border-left-width: 0px;
            border-right-width: 0px;
          }
          .grid-three-container2 {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .grid-three-text11 {
            padding: var(--dl-space-space-halfunit);
            font-size: 14px;
            border-color: rgba(0, 0, 0, 0);
            border-width: 2px;
            padding-right: 8px;
            border-top-width: 0px;
            border-left-width: 0px;
            border-right-width: 0px;
          }
          .grid-three-container3 {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .grid-three-text12 {
            padding: var(--dl-space-space-halfunit);
            font-size: 14px;
            border-color: rgba(0, 0, 0, 0);
            border-width: 2px;
            padding-right: 8px;
            border-top-width: 0px;
            border-left-width: 0px;
            border-right-width: 0px;
          }
          .grid-three-text13 {
            display: inline-block;
          }
          .grid-three-text14 {
            display: inline-block;
          }
          .grid-three-text15 {
            display: inline-block;
          }
          .grid-three-text16 {
            display: inline-block;
          }
          .grid-three-text17 {
            display: inline-block;
          }
          .grid-three-text18 {
            display: inline-block;
          }
          .grid-three-text19 {
            display: inline-block;
          }
          .grid-three-text20 {
            display: inline-block;
          }
          .grid-three-text21 {
            display: inline-block;
          }
          .grid-three-text22 {
            display: inline-block;
          }
          .grid-three-text23 {
            display: inline-block;
          }
          .grid-three-text24 {
            display: inline-block;
          }
          .grid-three-text25 {
            display: inline-block;
          }
          .grid-three-text26 {
            display: inline-block;
          }
          .grid-three-text27 {
            display: inline-block;
          }
          .grid-three-text28 {
            display: inline-block;
          }
          .grid-three-text29 {
            display: inline-block;
          }
          .grid-three-text30 {
            display: inline-block;
          }
          .grid-three-text31 {
            display: inline-block;
          }
          .grid-three-text32 {
            display: inline-block;
          }
          .grid-three-text33 {
            display: inline-block;
          }
          .grid-three-text34 {
            display: inline-block;
          }
          .grid-three-text35 {
            display: inline-block;
          }
          .grid-three-text36 {
            display: inline-block;
          }
          .grid-three-text37 {
            display: inline-block;
          }
          .grid-threeroot-class-name {
            top: 0px;
            right: 0px;
            width: 20%;
            height: auto;
            position: static;
          }
          @media (max-width: 1600px) {
            .grid-threeroot-class-name {
              width: auto;
              height: 100%;
            }
          }
          @media (max-width: 991px) {
            .grid-threeroot-class-name {
              height: auto;
              display: none;
            }
          }
          @media (max-width: 767px) {
            .grid-threeroot-class-name {
              display: none;
              position: relative;
            }
          }
          @media (max-width: 479px) {
            .grid-threeroot-class-name {
              width: 100%;
              display: flex;
              padding-bottom: var(--dl-space-space-halfunit);
            }
          }
        `}
      </style>
    </>
  )
}

GridThree.defaultProps = {
  rootClassName: '',
  heading1: undefined,
  heading: undefined,
  heading2: undefined,
  order: undefined,
  visible: undefined
}

GridThree.propTypes = {
  rootClassName: PropTypes.string,
  heading1: PropTypes.element,
  heading: PropTypes.element,
  heading2: PropTypes.element,
  order: PropTypes.any,
  visible: PropTypes.any
}

export default GridThree
