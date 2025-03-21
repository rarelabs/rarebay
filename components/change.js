import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const Change = (props) => {
  return (
    <>
      <div className={`change-container1 ${props.rootClassName} `}>
        <div className="change-container2">
          <h1 className="change-text10">
            {props.heading ?? (
              <Fragment>
                <span className="change-text24">30m</span>
              </Fragment>
            )}
          </h1>
          <span className="change-text11">
            {props.text2 ?? (
              <Fragment>
                <span className="change-text23">0.0%</span>
              </Fragment>
            )}
          </span>
        </div>
        <div className="change-container3">
          <h1 className="change-text12">
            {props.heading1 ?? (
              <Fragment>
                <span className="change-text21">1h</span>
              </Fragment>
            )}
          </h1>
          <span className="change-text13">
            {props.text3 ?? (
              <Fragment>
                <span className="change-text20">0.0%</span>
              </Fragment>
            )}
          </span>
        </div>
        <div className="change-container4">
          <h1 className="change-text14">
            {props.heading2 ?? (
              <Fragment>
                <span className="change-text19">5h</span>
              </Fragment>
            )}
          </h1>
          <span className="change-text15">
            {props.text4 ?? (
              <Fragment>
                <span className="change-text18">0.0%</span>
              </Fragment>
            )}
          </span>
        </div>
        <div className="change-container5">
          <h1 className="change-text16">
            {props.heading3 ?? (
              <Fragment>
                <span className="change-text25">24h</span>
              </Fragment>
            )}
          </h1>
          <span className="change-text17">
            {props.text5 ?? (
              <Fragment>
                <span className="change-text22">0.0%</span>
              </Fragment>
            )}
          </span>
        </div>
      </div>
      <style jsx>
        {`
          .change-container1 {
            gap: var(--dl-space-space-halfunit);
            flex: 0 0 auto;
            width: 100%;
            display: grid;
            padding: var(--dl-space-space-halfunit);
            position: relative;
            grid-template-columns: 1fr 1fr 1fr 1fr;
          }
          .change-container2 {
            flex: 0 0 auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: center;
            border-radius: var(--dl-radius-radius-imageradius);
            flex-direction: column;
            backdrop-filter: blur(20px);
            justify-content: center;
            background-color: rgba(63, 63, 63, 0.38);
          }
          .change-text10 {
            fill: #c5c5c5;
            font-size: 18px;
          }
          .change-text11 {
            color: rgb(96, 96, 96);
          }
          .change-container3 {
            flex: 0 0 auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: center;
            border-radius: var(--dl-radius-radius-imageradius);
            flex-direction: column;
            backdrop-filter: blur(20px);
            justify-content: center;
            background-color: rgba(63, 63, 63, 0.38);
          }
          .change-text12 {
            fill: #c5c5c5;
            font-size: 18px;
          }
          .change-text13 {
            color: rgb(96, 96, 96);
          }
          .change-container4 {
            flex: 0 0 auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: center;
            border-radius: var(--dl-radius-radius-imageradius);
            flex-direction: column;
            backdrop-filter: blur(20px);
            justify-content: center;
            background-color: rgba(63, 63, 63, 0.38);
          }
          .change-text14 {
            fill: #c5c5c5;
            font-size: 18px;
          }
          .change-text15 {
            color: rgb(96, 96, 96);
          }
          .change-container5 {
            flex: 0 0 auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: center;
            border-radius: var(--dl-radius-radius-imageradius);
            flex-direction: column;
            backdrop-filter: blur(20px);
            justify-content: center;
            background-color: rgba(63, 63, 63, 0.38);
          }
          .change-text16 {
            fill: #c5c5c5;
            font-size: 18px;
          }
          .change-text17 {
            color: rgb(96, 96, 96);
          }
          .change-text18 {
            display: inline-block;
          }
          .change-text19 {
            display: inline-block;
          }
          .change-text20 {
            display: inline-block;
          }
          .change-text21 {
            display: inline-block;
          }
          .change-text22 {
            display: inline-block;
          }
          .change-text23 {
            display: inline-block;
          }
          .change-text24 {
            display: inline-block;
          }
          .change-text25 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

Change.defaultProps = {
  text4: undefined,
  heading2: undefined,
  text3: undefined,
  heading1: undefined,
  text5: undefined,
  text2: undefined,
  heading: undefined,
  heading3: undefined,
  rootClassName: '',
}

Change.propTypes = {
  text4: PropTypes.element,
  heading2: PropTypes.element,
  text3: PropTypes.element,
  heading1: PropTypes.element,
  text5: PropTypes.element,
  text2: PropTypes.element,
  heading: PropTypes.element,
  heading3: PropTypes.element,
  rootClassName: PropTypes.string,
}

export default Change
