import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const Join = (props) => {
  return (
    <>
      <div className={`join-join ${props.rootClassName} `}>
        <div className="join-container1">
          <div className="join-container2">
            <div className="join-container3">
              <h1 className="join-text10">
                {props.heading ?? (
                  <Fragment>
                    <span className="join-text16">Join Community</span>
                  </Fragment>
                )}
              </h1>
            </div>
          </div>
        </div>
        <button type="button" className="join-button button">
        <a href='https://discord.com/invite/scdXvAnxMK'>
            {props.button ?? (
              <Fragment>
                <span className="join-text15">Join Discord</span>
              </Fragment>
            )}
          </a>
        </button>
        <hr />
        <svg height="32" width="32" viewBox="0 0 32 32" className="join-icon1">
          <path
            fill="currentColor"
            d="M25.7 7.1Q23 5.9 20 5.3h-.1c-.2.4-.5 1-.7 1.5c-2.2-.3-4.3-.3-6.4 0c-.2-.5-.5-1-.7-1.5H12q-3 .45-5.7 1.8C2.7 12.5 1.7 17.8 2.2 23v.1c2.4 1.8 4.7 2.8 7 3.5h.1c.5-.7 1-1.5 1.4-2.3v-.1c-.8-.3-1.5-.6-2.2-1c-.1 0-.1-.1 0-.1c.1-.1.3-.2.4-.3H9c4.6 2.1 9.5 2.1 14.1 0h.1c.1.1.3.2.4.3c.1 0 0 .1 0 .1c-.7.4-1.4.8-2.2 1c0 0-.1.1 0 .1c.4.8.9 1.6 1.4 2.3h.1c2.3-.7 4.6-1.8 7-3.5V23c.6-6-1-11.2-4.2-15.9M11.4 19.9c-1.4 0-2.5-1.3-2.5-2.8s1.1-2.8 2.5-2.8s2.5 1.3 2.5 2.8s-1.1 2.8-2.5 2.8m9.3 0c-1.4 0-2.5-1.3-2.5-2.8s1.1-2.8 2.5-2.8s2.5 1.3 2.5 2.8s-1.1 2.8-2.5 2.8"
          ></path>
        </svg>
        <div className="join-container4">
          <div className="join-container5">
            <div className="join-container6">
              <svg height="24" width="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M11 14H9a9 9 0 0 1 9-9v2c-3.87 0-7 3.13-7 7m7-3V9c-2.76 0-5 2.24-5 5h2c0-1.66 1.34-3 3-3M7 4c0-1.11-.89-2-2-2s-2 .89-2 2s.89 2 2 2s2-.89 2-2m4.45.5h-2A2.98 2.98 0 0 1 6.5 7h-3C2.67 7 2 7.67 2 8.5V11h6V8.74a4.98 4.98 0 0 0 3.45-4.24M19 17c1.11 0 2-.89 2-2s-.89-2-2-2s-2 .89-2 2s.89 2 2 2m1.5 1h-3c-1.5 0-2.71-1.08-2.95-2.5h-2c.2 2 1.59 3.65 3.45 4.24V22h6v-2.5c0-.83-.67-1.5-1.5-1.5"
                ></path>
              </svg>
              <span>
                {props.text ?? (
                  <Fragment>
                    <span className="join-text17">
                      Say Hi to fellow RAR310NES
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="join-container7">
              <svg height="20" width="20" viewBox="0 0 56 56">
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M7.627 16.697L23.812 5.364a4 4 0 0 1 5.57.982l2.553 3.645q.056.08.107.163zM2.147 29.84L1.04 25.708a4 4 0 0 1 2.83-4.898L44.438 9.94a4 4 0 0 1 4.899 2.828l1.151 4.298a3.2 3.2 0 0 1-1.121 3.35a5.001 5.001 0 0 0 2.433 8.903a3.08 3.08 0 0 1 2.576 2.255l1.172 4.377a4 4 0 0 1-2.828 4.899L12.15 51.72a4 4 0 0 1-4.898-2.828l-1.103-4.118a3.48 3.48 0 0 1 1.16-3.6a5.001 5.001 0 0 0-2.37-8.812a3.46 3.46 0 0 1-2.791-2.52m35.478-6.689a3 3 0 1 0-1.553-5.795a3 3 0 0 0 1.553 5.795m2.07 7.728a3 3 0 1 0-1.552-5.796a3 3 0 0 0 1.553 5.796m2.071 7.727a3 3 0 1 0-1.552-5.795a3 3 0 0 0 1.552 5.795"
                ></path>
              </svg>
              <span>
                {props.text1 ?? (
                  <Fragment>
                    <span className="join-text18">
                      Open tickets and get support
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="join-container8">
              <svg height="20" width="20" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2M6 9h12v2H6zm8 5H6v-2h8zm4-6H6V6h12z"
                ></path>
              </svg>
              <span>
                {props.text2 ?? (
                  <Fragment>
                    <span className="join-text19">
                      Share Feedback with the team
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .join-join {
            width: 100%;
            height: 296px;
            display: flex;
            z-index: 0;
            position: relative;
            align-items: center;
            overflow: hidden;
            flex-direction: column;
            text-align: start;
            justify-content: space-between;
          }
          .join-container1 {
            gap: var(--dl-space-space-unit);
            flex: 0 0 auto;
            width: 535px;
            height: auto;
            display: flex;
            z-index: 1;
            align-items: center;
            justify-content: center;
          }
          .join-container2 {
            gap: var(--dl-space-space-unit);
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .join-container3 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: flex-start;
            justify-content: center;
          }
          .join-text10 {
            color: #adadad;
            font-size: 50px;
            margin-top: var(--dl-space-space-twounits);
            margin-bottom: var(--dl-space-space-twounits);
          }
          .join-button {
            z-index: 1;
          }
          .join-icon1 {
            top: -179px;
            width: 80%;
            height: 80%;
            margin: auto;
            z-index: -1;
            position: fixed;
            color: rgba(60, 50, 100, 0.1);
            top: 10%;
          }
          .join-container4 {
            flex: 0 0 auto;
            display: flex;
            z-index: 1;
            align-items: flex-start;
            flex-direction: column;
            text-align: start;
          }
          .join-container5 {
            gap: var(--dl-space-space-halfunit);
            flex: 0 0 auto;
            color: gray;
            width: 171px;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .join-container6 {
            gap: var(--dl-space-space-unit);
            flex: 0 0 auto;
            width: 350px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .join-container7 {
            gap: var(--dl-space-space-unit);
            flex: 0 0 auto;
            width: 350px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .join-container8 {
            gap: var(--dl-space-space-unit);
            flex: 0 0 auto;
            width: 350px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .join-text15 {
            display: inline-block;
          }
          .join-text16 {
            display: inline-block;
          }
          .join-text17 {
            display: inline-block;
          }
          .join-text18 {
            display: inline-block;
          }
          .join-text19 {
            display: inline-block;
          }
          .joinroot-class-name {
            display: none;
          }
          @media (max-width: 479px) {
            .join-text10 {
              font-size: 30px;
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

Join.defaultProps = {
  button: undefined,
  heading: undefined,
  text: undefined,
  text1: undefined,
  text2: undefined,
  rootClassName: '',
}

Join.propTypes = {
  button: PropTypes.element,
  heading: PropTypes.element,
  text: PropTypes.element,
  text1: PropTypes.element,
  text2: PropTypes.element,
  rootClassName: PropTypes.string,
}

export default Join
