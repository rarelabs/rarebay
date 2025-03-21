import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const Introdunction = (props) => {
  return (
    <>
      <div className={`introdunction-container1 ${props.rootClassName} `}>
        <div className="introdunction-container2">
          <div className="introdunction-container3">
            <img
              src='/jhjj-200w.webp'
              alt={props.imageAlt}
              className="introdunction-image"
            />
            <div className="introdunction-container4">
              <h1 className="introdunction-text1">
                {props.heading3 ?? (
                  <Fragment>
                    <h1 className="introdunction-text7">
                      <span className="introdunction-text8">Rare</span>
                      <span className="introdunction-text9">Bay</span>
                    </h1>
                  </Fragment>
                )}
              </h1>
            </div>
          </div>
          <h1 className="introdunction-text2">
            {props.heading1 ?? (
              <Fragment>
                <span className="introdunction-text5">Beta</span>
              </Fragment>
            )}
          </h1>
        </div>
        <div className="introdunction-container5">
          
          <h1 className="introdunction-text3">
            {props.heading2 ?? (
              <Fragment>
                <span className="introdunction-text6">
                  &apos;As a thought experiment, imagine there was a base
                  metal as scarce as gold but with the following properties: –
                  boring grey in colour – not a good conductor of electricity –
                  not particularly strong, but not ductile or easily malleable
                  either – not useful for any practical or ornamental purpose…
                  and one special, magical property: can be transported over a
                  communications channel.&apos;
                </span>
              </Fragment>
            )}
          </h1>
        </div>
        <h1 className="introdunction-heading">
          {props.heading ?? (
            <Fragment>
              <span className="introdunction-text4">-Satoshi Nakamoto-</span>
            </Fragment>
          )}
        </h1>
      </div>
      <style jsx>
        {`
          .introdunction-container1 {
            width: 100%;
            height: 100%;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .introdunction-container2 {
            gap: var(--dl-space-space-unit);
            flex: 0 0 auto;
            width: 535px;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .introdunction-container3 {
            gap: 5px;
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .introdunction-image {
            width: 50px;
            object-fit: cover;
            border-radius: 10px;
          }
          .introdunction-container4 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: flex-start;
            justify-content: center;
          }
          .introdunction-text1 {
            font-size: 50px;
          }
          .introdunction-text2 {
            color: rgb(208, 208, 208);
            font-size: 20px;
            font-weight: 300;
            padding-top: 5px;
            border-color: #545454;
            border-width: 1px;
            padding-left: 15px;
            border-radius: 8px;
            padding-right: 15px;
            padding-bottom: 5px;
            background-image: linear-gradient(
              to right,
              rgb(252, 0, 255) 0%,
              rgb(0, 219, 222) 100%
            );
          }
          .introdunction-container5 {
            flex: 0 0 auto;
            width: 867px;
            display: flex;
            margin-top: var(--dl-space-space-unit);
            align-items: flex-start;
            margin-bottom: var(--dl-space-space-unit);
          }
          .introdunction-text3 {
            color: rgb(123, 123, 123);
            font-size: 16px;
            font-style: italic;
            font-weight: 100;
          }
          .introdunction-heading {
            color: rgb(123, 123, 123);
            font-style: normal;
            font-weight: 100;
            font-size: 18px;
            color: white;
          }
          .introdunction-text4 {
            display: inline-block;
          }
          .introdunction-text5 {
            display: inline-block;
          }
          .introdunction-text6 {
            display: inline-block;
          }
          .introdunction-text7 {
            display: inline-block;
            font-size: 50px;
          }
          .introdunction-text8 {
            color: #adadad;
          }
          .introdunction-text9 {
            color: rgba(74, 74, 74, 0.55);
          }

          @media (max-width: 479px) {
            .introdunction-container1 {
              width: 100%;
              height: 100%;
              display: flex;
              position: relative;
              align-items: start;
              flex-direction: column;
              justify-content: center;
              text-align: start;
              padding: 10px;
            }
            .introdunction-container2{
              width: 100%;
            }
            .introdunction-text1 {
              font-size: 30px;
            }
            .introdunction-container5 {
              width: 100%;
            }
            .introdunction-text7 {
              font-size: 30px;
            }
          }
        `}
      </style>
    </>
  )
}

Introdunction.defaultProps = {
  heading: undefined,
  heading1: undefined,
  heading2: undefined,
  imageSrc: '/android-icon-192x192-200h.png',
  imageAlt: 'image',
  heading3: undefined,
  rootClassName: '',
}

Introdunction.propTypes = {
  heading: PropTypes.element,
  heading1: PropTypes.element,
  heading2: PropTypes.element,
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  heading3: PropTypes.element,
  rootClassName: PropTypes.string,
}

export default Introdunction
