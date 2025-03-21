import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const Lft = (props) => {
  return (
    <>
      <div className={`lft-lft ${props.rootClassName} `}>
        <h1 className="lft-text10">
          {props.heading ?? (
            <Fragment>
              <span className="lft-text19">RareBay V2 AMM</span>
            </Fragment>
          )}
        </h1>
       <div className='center-c'>
       <div className="lft-container10">
          <div className="lft-container11">
            <div className="lft-container12">
              <h1 className="lft-text11">
              Price Oracle
              </h1>
              <svg height="24" width="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="m3.005 7l8.445-5.63a1 1 0 0 1 1.11 0L21.005 7v14a1 1 0 0 1-1 1h-16a1 1 0 0 1-1-1zm9 4a2 2 0 1 0 0-4a2 2 0 0 0 0 4m-4 5v2h8v-2zm0-3v2h8v-2z"
                ></path>
              </svg>
            </div>
            <hr />
            <span>
              {props.text1 ?? (
                <Fragment>
                  <span className="lft-text20">
                    Price Oracle ensures accurate, tamper-resistant pricing,
                    reducing slippage and protecting against price manipulation.
                  </span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="lft-container13">
            <div className="lft-container14">
              <h1 className="lft-text13">
                {props.heading2 ?? (
                  <Fragment>
                    <span style={{color: 'white'}} className="lft-text25">
                      Dynamic Fees
                    </span>
                  </Fragment>
                )}
              </h1>
              <svg
                height="15"
                width="15"
                viewBox="0 0 15 15"
                className="lft-icon3"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  d="M7.5 12.5V15m5-15v2.5M2.5 0v6.5m0 2V15m5-4.5V0m5 4.5V15m-2-10.5h4v-2h-4zm-5 8h4v-2h-4zm-5-4h4v-2h-4z"
                ></path>
              </svg>
            </div>
            <hr />
            <span>
              {props.text2 ?? (
                <Fragment>
                  <span className="lft-text21">
                    Allows the owner to dynamically set fees between 0.1% and
                    0.5%, enabling flexible fee structures based on market
                    conditions.
                  </span>
                </Fragment>
              )}
            </span>
          </div>
        </div>
        <div className="lft-container15">
          <div className="lft-container16">
            <div className="lft-container17">
              <h1 className="lft-text15">
                {props.heading3 ?? (
                  <Fragment>
                    <span style={{color: 'white'}} className="lft-text26">
                      Dividends
                    </span>
                  </Fragment>
                )}
              </h1>
              <svg height="24" width="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M6 8c0-2.21 1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4s-4-1.79-4-4m6 10.2c0-.96.5-1.86 1.2-2.46V14.5c0-.05.02-.11.02-.16c-.99-.22-2.07-.34-3.22-.34c-4.42 0-8 1.79-8 4v2h10zm10 .1v3.5c0 .6-.6 1.2-1.3 1.2h-5.5c-.6 0-1.2-.6-1.2-1.3v-3.5c0-.6.6-1.2 1.2-1.2v-2.5c0-1.4 1.4-2.5 2.8-2.5s2.8 1.1 2.8 2.5v.5h-1.3v-.5c0-.8-.7-1.3-1.5-1.3s-1.5.5-1.5 1.3V17h4.3c.6 0 1.2.6 1.2 1.3"
                ></path>
              </svg>
            </div>
            <hr />
            <span>
              {props.text3 ?? (
                <Fragment>
                  <span className="lft-text22">
                    Liquidity providers earn dividends from swap fees, but
                    withdrawals are locked for 2 weeks to incentivize long-term
                    participation.
                  </span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="lft-container18">
            <div className="lft-container19">
              <h1 className="lft-text17">
                {props.heading4 ?? (
                  <Fragment>
                    <span style={{color: 'white'}} className="lft-text27">
                      Locked Rewards
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                  </Fragment>
                )}
              </h1>
              <svg height="24" width="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M14.8 7V5.5C14.8 4.1 13.4 3 12 3S9.2 4.1 9.2 5.5V7C8.6 7 8 7.6 8 8.2v3.5c0 .7.6 1.3 1.2 1.3h5.5c.7 0 1.3-.6 1.3-1.2V8.3c0-.7-.6-1.3-1.2-1.3m-1.3 0h-3V5.5c0-.8.7-1.3 1.5-1.3s1.5.5 1.5 1.3zM6 17v3l-4-4l4-4v3h12v-3l4 4l-4 4v-3z"
                ></path>
              </svg>
            </div>
            <hr />
            <span>
              {props.text4 ?? (
                <Fragment>
                  <span className="lft-text23">
                    Ensures that the AMM owner’s rewards are locked for 2 weeks
                    before withdrawal, aligning incentives for sustainable
                    liquidity management.
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
    .lft-lft {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: start;
      gap: 20px;
      padding: 20px;
      justify-content: center;
    }

    .lft-text10 {
      color: rgb(152, 152, 152);
      text-align: start;
      font-size: 2em;
    }

    .lft-container10,
    .lft-container15 {
      width: 60%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5%;
    }

    .lft-container11,
    .lft-container13,
    .lft-container16,
    .lft-container18 {
      width: 100%;
      padding: 15px;
      display: flex;
      gap: 5%;
      flex-direction: column;
      align-items: flex-start;;
      border-radius: 10px;
    }

    .lft-container12,
    .lft-container14,
    .lft-container17,
    .lft-container19 {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5%;
  
    }

    .lft-text11,
    .lft-text13,
    .lft-text15,
    .lft-text17 {
      font-size: 1.5em;
      font-weight: bold;
      color: white;
    }

    span {
      font-size: 1em;
      color: gray;
    }

    svg {
      min-width: 24px;
      min-height: 24px;
      color: white;
    }
    @media (max-width: 768px) {
      .lft-container10,
      .lft-container15 {
        width: 100%;
      }
    }
    @media (min-width: 768px) {
      .lft-container10,
      .lft-container15 {
        flex-direction: row;
      }

      .lft-container11,
      .lft-container13,
      .lft-container16,
      .lft-container18 {
        width: 48%;
      }
    }
  `}
</style>

    </>
  )
}

Lft.defaultProps = {
  heading: undefined,
  text1: undefined,
  text2: undefined,
  text3: undefined,
  text4: undefined,
  heading1: undefined,
  heading2: undefined,
  heading3: undefined,
  heading4: undefined,
  rootClassName: '',
}

Lft.propTypes = {
  heading: PropTypes.element,
  text1: PropTypes.element,
  text2: PropTypes.element,
  text3: PropTypes.element,
  text4: PropTypes.element,
  heading1: PropTypes.element,
  heading2: PropTypes.element,
  heading3: PropTypes.element,
  heading4: PropTypes.element,
  rootClassName: PropTypes.string,
}

export default Lft
