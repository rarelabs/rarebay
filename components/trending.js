import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

import Search from './search'

const Trending = (props) => {
  return (
    <>
      <div className={`trending-trending ${props.rootClassName} `}>
        <div className="trending-lists">
          <Search></Search>
          <div className="trending-container1">
            <span>
              {props.text ?? (
                <Fragment>
                  <span className="trending-text19">Coin/MarketCap</span>
                </Fragment>
              )}
            </span>
            <span>
              {props.text1 ?? (
                <Fragment>
                  <span className="trending-text16">Price/Change</span>
                </Fragment>
              )}
            </span>
          </div>
          <ul className="trending-ul list">
            <li className="trending-li list-item">
              <div className="trending-container2">
                <div className="trending-container3">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 32 32"
                    className="trending-icon1"
                  >
                    <path
                      d="m16 2l-4.55 9.22l-10.17 1.47l7.36 7.18L6.9 30l9.1-4.78L25.1 30l-1.74-10.13l7.36-7.17l-10.17-1.48Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <img
                    alt={props.imageAlt}
                    src={props.imageSrc}
                    className="trending-image"
                  />
                  <div className="trending-container4">
                    <h1 className="trending-text12">
                      {props.heading4 ?? (
                        <Fragment>
                          <span className="trending-text20">CORE</span>
                        </Fragment>
                      )}
                    </h1>
                    <span>
                      {props.text5 ?? (
                        <Fragment>
                          <span className="trending-text17">$0.0</span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                </div>
                <div className="trending-container5">
                  <h1 className="trending-text14">
                    {props.heading3 ?? (
                      <Fragment>
                        <span className="trending-text21">$0.0</span>
                      </Fragment>
                    )}
                  </h1>
                  <span>
                    {props.text4 ?? (
                      <Fragment>
                        <span className="trending-text18">$0.0</span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <style jsx>
        {`
          .trending-trending {
            flex: 0 0 auto;
            width: 100%;
            height: auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            position: relative;
            min-height: 350px;
            align-items: flex-start;
            justify-content: flex-start;
          }
          .trending-lists {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .trending-container1 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: center;
            justify-content: space-between;
          }
          .trending-ul {
            margin: 0px;
            padding-top: 0px;
            padding-left: var(--dl-space-space-halfunit);
            padding-right: var(--dl-space-space-halfunit);
            padding-bottom: 0px;
          }
          .trending-li {
            width: 100%;
            margin-top: var(--dl-space-space-halfunit);
            margin-bottom: var(--dl-space-space-halfunit);
          }
          .trending-container2 {
            flex: 0 0 auto;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
          }
          .trending-container3 {
            gap: var(--dl-space-space-halfunit);
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: center;
          }
          .trending-icon1 {
            fill: #3f3f3f;
            color: #d0d0d0;
            width: var(--dl-size-size-xsmall);
            cursor: pointer;
            height: var(--dl-size-size-small);
          }
          .trending-image {
            width: 30px;
            object-fit: cover;
          }
          .trending-container4 {
            gap: var(--dl-space-space-halfunit);
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .trending-text12 {
            font-size: 16px;
          }
          .trending-container5 {
            gap: var(--dl-space-space-halfunit);
            flex: 0 0 auto;
            height: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .trending-text14 {
            color: #6d6d6d;
            font-size: 16px;
          }
          .trending-text16 {
            display: inline-block;
          }
          .trending-text17 {
            display: inline-block;
          }
          .trending-text18 {
            color: #00ce00;
            display: inline-block;
          }
          .trending-text19 {
            display: inline-block;
          }
          .trending-text20 {
            display: inline-block;
          }
          .trending-text21 {
            display: inline-block;
          }
          .trendingroot-class-name {
            display: none;
            min-height: 450px;
          }
          .trendingroot-class-name1 {
            min-height: 660px;
          }
          .trendingroot-class-name2 {
            display: none;
            min-height: 450px;
          }
          @media (max-width: 1200px) {
            .trending-icon1 {
              fill: var(--dl-color-theme-neutral-dark);
              color: #a7a7a7;
            }
          }
        `}
      </style>
    </>
  )
}

Trending.defaultProps = {
  imageAlt: 'image',
  rootClassName: '',
  text1: undefined,
  text5: undefined,
  text4: undefined,
  text: undefined,
  heading4: undefined,
  imageSrc: '/core-200w.png',
  heading3: undefined,
}

Trending.propTypes = {
  imageAlt: PropTypes.string,
  rootClassName: PropTypes.string,
  text1: PropTypes.element,
  text5: PropTypes.element,
  text4: PropTypes.element,
  text: PropTypes.element,
  heading4: PropTypes.element,
  imageSrc: PropTypes.string,
  heading3: PropTypes.element,
}

export default Trending
