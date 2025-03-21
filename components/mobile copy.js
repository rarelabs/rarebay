import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const Mobile = (props) => {
  return (
    <>
      <div className={`mobile-mobile ${props.rootClassName} `}>
        <div className="mobile-container1">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M6 5.914L3.707 8.207L2.293 6.793L7 2.086l4.707 4.707l-1.414 1.414L8 5.914V11H6zM12.5 7a4.5 4.5 0 1 0 9 0a4.5 4.5 0 0 0-9 0m9.207 10.207l-1.414-1.414L18 18.086V13h-2v5.086l-2.293-2.293l-1.414 1.414L17 21.914zM11 14a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1z"
              fill="currentColor"
            ></path>
          </svg>
          <span>
            {props.text ?? (
              <Fragment>
                <span className="mobile-text15">Swap</span>
              </Fragment>
            )}
          </span>
        </div>
        <div className="mobile-container2">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M9 12a2 2 0 1 0 0-4a2 2 0 0 0 0 4m3-11l9.5 5.5v11L12 23l-9.5-5.5v-11zM4.5 7.653v8.694l2.372 1.373l8.073-5.92l4.555 2.734v-6.88L12 3.31z"
              fill="currentColor"
            ></path>
          </svg>
          <span>
            {props.text1 ?? (
              <Fragment>
                <span className="mobile-text19">NFTs</span>
              </Fragment>
            )}
          </span>
        </div>
        <div className="mobile-container3">
          <div className="mobile-container4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="mobile-icon14"
            >
              <path
                d="M13 4v2.67l-1 1l-1-1V4zm7 7v2h-2.67l-1-1l1-1zM6.67 11l1 1l-1 1H4v-2zM12 16.33l1 1V20h-2v-2.67zM15 2H9v5.5l3 3l3-3zm7 7h-5.5l-3 3l3 3H22zM7.5 9H2v6h5.5l3-3zm4.5 4.5l-3 3V22h6v-5.5z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <span className="mobile-text12">
            {props.text2 ?? (
              <Fragment>
                <span className="mobile-text17">GameFi</span>
              </Fragment>
            )}
          </span>
        </div>
        <div className="mobile-container5">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M15.005 2.003a4 4 0 0 1 3.464 6h4.536v2h-2v10a1 1 0 0 1-1 1h-16a1 1 0 0 1-1-1v-10h-2v-2H5.54a4 4 0 0 1 6.465-4.646a3.98 3.98 0 0 1 2.999-1.354m-4 8h-6v9h6zm8 0h-6v9h6zm-10-6a2 2 0 0 0-.15 3.994l.15.006h2v-2a2 2 0 0 0-1.697-1.977l-.154-.018zm6 0a2 2 0 0 0-1.995 1.85l-.005.15v2h2a2 2 0 0 0 1.994-1.85l.006-.15a2 2 0 0 0-2-2"
              fill="currentColor"
            ></path>
          </svg>
          <span>
            {props.text3 ?? (
              <Fragment>
                <span className="mobile-text18">Rewards</span>
              </Fragment>
            )}
          </span>
        </div>
        <div className="mobile-container6">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M2 18c0-1.54 0-2.31.347-2.876c.194-.317.46-.583.777-.777C3.689 14 4.46 14 6 14s2.31 0 2.876.347c.317.194.583.46.777.777C10 15.689 10 16.46 10 18s0 2.31-.347 2.877c-.194.316-.46.582-.777.776C8.311 22 7.54 22 6 22s-2.31 0-2.876-.347a2.35 2.35 0 0 1-.777-.776C2 20.31 2 19.54 2 18m12 0c0-1.54 0-2.31.347-2.876c.194-.317.46-.583.777-.777C15.689 14 16.46 14 18 14s2.31 0 2.877.347c.316.194.582.46.776.777C22 15.689 22 16.46 22 18s0 2.31-.347 2.877a2.36 2.36 0 0 1-.776.776C20.31 22 19.54 22 18 22s-2.31 0-2.876-.347a2.35 2.35 0 0 1-.777-.776C14 20.31 14 19.54 14 18M2 6c0-1.54 0-2.31.347-2.876c.194-.317.46-.583.777-.777C3.689 2 4.46 2 6 2s2.31 0 2.876.347c.317.194.583.46.777.777C10 3.689 10 4.46 10 6s0 2.31-.347 2.876c-.194.317-.46.583-.777.777C8.311 10 7.54 10 6 10s-2.31 0-2.876-.347a2.35 2.35 0 0 1-.777-.777C2 8.311 2 7.54 2 6m12 0c0-1.54 0-2.31.347-2.876c.194-.317.46-.583.777-.777C15.689 2 16.46 2 18 2s2.31 0 2.877.347c.316.194.582.46.776.777C22 3.689 22 4.46 22 6s0 2.31-.347 2.876c-.194.317-.46.583-.776.777C20.31 10 19.54 10 18 10s-2.31 0-2.876-.347a2.35 2.35 0 0 1-.777-.777C14 8.311 14 7.54 14 6"
              fill="none"
              color="currentColor"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          <span>
            {props.text4 ?? (
              <Fragment>
                <span className="mobile-text16">Menu</span>
              </Fragment>
            )}
          </span>
        </div>
      </div>
      <style jsx>
        {`
          .mobile-mobile {
            flex: 0 0 auto;
            color: #bfbfbf;
            cursor: pointer;
            display: none;
            position: relative;
            align-items: center;
            backdrop-filter: blur(100px);
            justify-content: flex-start;
          }
          .mobile-container1 {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .mobile-container2 {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .mobile-container3 {
            flex: 0 0 auto;
            display: flex;
            align-items: flex-start;
          }
          .mobile-container4 {
            flex: 0 0 auto;
            display: flex;
            position: fixed;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .mobile-container5 {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .mobile-container6 {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .mobile-text15 {
            display: inline-block;
          }
          .mobile-text16 {
            display: inline-block;
          }
          .mobile-text17 {
            display: inline-block;
          }
          .mobile-text18 {
            display: inline-block;
          }
          .mobile-text19 {
            display: inline-block;
          }

          @media (max-width: 479px) {
            .mobile-mobile {
              left: 0px;
              width: 100%;
              bottom: 0px;
              height: auto;
              display: grid;
              padding: var(--dl-space-space-halfunit);
              position: fixed;
              border-color: rgba(78, 78, 78, 0.41);
              border-width: 1px;
              background-color: rgba(0, 0, 0, 0.15);
              border-left-width: 0px;
              border-right-width: 0px;
              border-bottom-width: 0px;
              grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            }
            .mobile-container1 {
              gap: var(--dl-space-space-halfunit);
            }
            .mobile-container2 {
              gap: var(--dl-space-space-halfunit);
            }
            .mobile-container3 {
              width: auto;
              height: 100%;
              position: relative;
              align-items: center;
              border-width: 0px;
              justify-content: center;
            }
            .mobile-container4 {
              gap: var(--dl-space-space-halfunit);
              top: -49px;
              left: 0px;
              right: 0px;
              width: 80px;
              height: 80px;
              margin: auto;
              padding: var(--dl-space-space-halfunit);
              position: absolute;
              border-color: rgba(0, 0, 0, 0.37);
              border-width: 5px;
              border-radius: 100px;
              background-color: #6f6f6f;
            }
            .mobile-icon14 {
              width: 32px;
              height: 32px;
            }
            .mobile-text12 {
              margin-top: var(--dl-space-space-twounits);
            }
            .mobile-container5 {
              gap: var(--dl-space-space-halfunit);
            }
            .mobile-container6 {
              gap: var(--dl-space-space-halfunit);
            }
          }
        `}
      </style>
    </>
  )
}

Mobile.defaultProps = {
  text: undefined,
  text4: undefined,
  text2: undefined,
  text3: undefined,
  text1: undefined,
  rootClassName: '',
}

Mobile.propTypes = {
  text: PropTypes.element,
  text4: PropTypes.element,
  text2: PropTypes.element,
  text3: PropTypes.element,
  text1: PropTypes.element,
  rootClassName: PropTypes.string,
}

export default Mobile
