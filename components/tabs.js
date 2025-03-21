import React, { Fragment, useState } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'


const Tabs = (props) => {
  return (
    <>
      <div className={`tabs-container ${props.rootClassName} `}>
        <span  onClick={()=>props.setActiveTab('swap')} className={`tabs-text1 ${props.activeTab === 'swap' ? 'active' : ''}`} >
          {props.text2 ?? (
            <Fragment>
              <span>Swap</span>
            </Fragment>
          )}
        </span>
        <span  className={`tabs-text2  ${props.activeTab === 'limit' ? 'active' : ''}`} onClick={()=>props.setActiveTab('limit')}>
          {props.text21 ?? (
            <Fragment>
              <span className="tabs-text4">Limit</span>
            </Fragment>
          )}
        </span>
        <span  className={`tabs-text2  ${props.activeTab === 'liquidity' ? 'active' : ''}`} onClick={()=>props.setActiveTab('liquidity')}>
          {props.text21 ?? (
            <Fragment>
              <span className="tabs-text4">Pools</span>
            </Fragment>
          )}
        </span>
        <span className="tabs-text3" onClick={props.togglePro}
         style={{
          color: props.proMode ? 'green' : '', 
          textShadow: '0px 0px 15px'
          // Change button text color for Pro mode
        }}
        >
          {props.text212 ?? (
            <Fragment>
              <span classNae="tabs-text6" style={{filter: 'hue-rotate(10deg) saturate(300%)'}}>{props.proMode ? 'Pro 🟢' : <p style={{filter: 'invert(50%) brightness(100%)', textShadow: '0px 0px 15px black'}}>Pro 🟢</p>}</span>
            </Fragment>
          )}
        </span>
      
      </div>
      <style jsx>
        {`
      
        `}
      </style>
    </>
  )
}

Tabs.defaultProps = {
  text21: undefined,
  rootClassName: '',
  text2: undefined,
  text212: undefined,
  openModal3: undefined,
  togglePro: undefined,
  proMode: undefined,
  activeTab: undefined,
  setActiveTab: ('swap')
}

Tabs.propTypes = {
  text21: PropTypes.element,
  rootClassName: PropTypes.string,
  text2: PropTypes.element,
  text212: PropTypes.element,
  openModal3: PropTypes.any,
  togglePro: PropTypes.any,
  proMode: PropTypes.any,
  activeTab: PropTypes.any,
  setActiveTab: PropTypes.any
}

export default Tabs
