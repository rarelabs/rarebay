import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const Votes = (props) => {
  return (
    <>
      <div className="votes-container10">
        <div className="votes-container11">
          <div className="votes-container12">
            <span className="votes-text1">
              {props.text2 ?? (
                <Fragment>
                  <span className="votes-text5">Votes</span>
                </Fragment>
              )}
            </span>
            <div className="votes-container13">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M12 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8M6 8a6 6 0 1 1 12 0A6 6 0 0 1 6 8m2 10a3 3 0 0 0-3 3a1 1 0 1 1-2 0a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5a1 1 0 1 1-2 0a3 3 0 0 0-3-3z"
                  fill="currentColor"
                ></path>
              </svg>
              <span className="votes-text2">
                {props.text3 ?? (
                  <Fragment>
                    <span className="votes-text6">0</span>
                  </Fragment>
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="votes-container14">
          <div className="votes-container15">
            <div className="votes-container16"></div>
            <span>
              {props.text ?? (
                <Fragment>
                  <span className="votes-text7">Yes: 0</span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="votes-container17">
            <div className="votes-container18"></div>
            <span>
              {props.text1 ?? (
                <Fragment>
                  <span className="votes-text8">No: 0</span>
                </Fragment>
              )}
            </span>
          </div>
        </div>
        <div className="votes-container19">
          <button type="button" className="votes-button1 button">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path
                d="M1.36 9.495v7.157h3.03l.153.018c2.813.656 4.677 1.129 5.606 1.422c1.234.389 1.694.484 2.531.54c.626.043 1.337-.198 1.661-.528c.179-.182.313-.556.366-1.136a.68.68 0 0 1 .406-.563c.249-.108.456-.284.629-.54c.16-.234.264-.67.283-1.301a.68.68 0 0 1 .339-.57c.582-.337.87-.717.93-1.163c.066-.493-.094-1.048-.513-1.68a.683.683 0 0 1 .176-.936c.401-.282.621-.674.676-1.23c.088-.886-.477-1.541-1.756-1.672a9.4 9.4 0 0 0-3.394.283a.68.68 0 0 1-.786-.95c.5-1.058.778-1.931.843-2.607c.085-.897-.122-1.547-.606-2.083c-.367-.406-.954-.638-1.174-.59c-.29.062-.479.23-.725.818c-.145.348-.215.644-.335 1.335c-.115.656-.178.952-.309 1.34c-.395 1.176-1.364 2.395-2.665 3.236a12 12 0 0 1-2.937 1.37a.7.7 0 0 1-.2.03zm-.042 8.52c-.323.009-.613-.063-.856-.233c-.31-.217-.456-.559-.459-.953l.003-7.323c-.034-.39.081-.748.353-1.014c.255-.25.588-.368.94-.36h2.185A10.5 10.5 0 0 0 5.99 6.95c1.048-.678 1.82-1.65 2.115-2.526c.101-.302.155-.552.257-1.14c.138-.789.224-1.156.422-1.628c.41-.982.948-1.462 1.69-1.623c.73-.158 1.793.263 2.465 1.007c.745.824 1.074 1.855.952 3.129q-.079.82-.454 1.844a10.5 10.5 0 0 1 2.578-.056c2.007.205 3.134 1.512 2.97 3.164c-.072.712-.33 1.317-.769 1.792c.369.711.516 1.414.424 2.1c-.106.79-.546 1.448-1.278 1.959c-.057.693-.216 1.246-.498 1.66a2.9 2.9 0 0 1-.851.834c-.108.684-.335 1.219-.706 1.595c-.615.626-1.714.999-2.718.931c-.953-.064-1.517-.18-2.847-.6c-.877-.277-2.693-.737-5.43-1.377zm1.701-8.831a.68.68 0 0 1 .68-.682a.68.68 0 0 1 .678.682v7.678a.68.68 0 0 1-.679.681a.68.68 0 0 1-.679-.681z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
          <button type="button" className="votes-button2 button">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              className="votes-icon5"
            >
              <path
                d="M15.807.939c.396.367.655 1.133.706 1.595c.59.366 1.288 1.104 1.349 2.494c1.053.731 1.853 2.083.854 4.06c.58.54 1.227 2.188.395 3.516c-.969 1.552-3.075 1.66-5.174 1.383c.56 1.565.77 3.009-.116 4.488C12.94 19.787 11.724 20 11.308 20c-1.138 0-1.918-.979-2.234-2.283c-.115-.364-.246-1.224-.297-1.45q-.398-2.16-2.67-3.453a11.4 11.4 0 0 0-2.123-.946h-2.34c-.521 0-1.144-.527-1.144-1.165V3.067q.111-1.083 1.202-1.082h3.11Q6.857 1.52 8.89.99C10.2.637 10.487.52 11.403.268c2.053-.532 3.478-.24 4.404.67m-2.382.424c-.819 0-1.856.252-2.316.399c-.162.051-.446.135-.745.221l-.3.087l-.288.082l-.56.158s-1.41.378-4.173 1.02q-.154.018-.166.022v7.38q2.267.873 3.53 2.118c1.264 1.244 1.615 2.368 1.822 3.807c.118.723.309 1.306.597 1.705a.65.65 0 0 0 .342.251c.147.047.35.05.783-.184c.433-.236.99-.853 1.095-1.772c.07-.893-.17-1.667-.492-2.481a16 16 0 0 0-.357-.822c-.218-.413.11-1.099.786-.95c.906.255 3.154.6 4.422 0q1.106-.64.547-2.066a1.7 1.7 0 0 0-.495-.553c-.17-.102-.502-.544-.103-1.045c.396-.635.975-1.928-.49-2.734a.66.66 0 0 1-.34-.57c-.02-.274.024-1.29-.73-1.744c-.18-.097-.397-.177-.52-.41c-.078-.154-.103-.528-.103-.528c-.103-.632-.245-1.222-1.746-1.391M3.519 3.348H1.861v7.157h1.658z"
                fill="currentColor"
                fill-rule="evenodd"
                fill-opacity=".89"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <style jsx>
        {`
          .votes-container10 {
            gap: cardradius;
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-direction: column;
            justify-content: flex-start;
          }
          .votes-container11 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: flex-start;
            border-color: rgba(120, 120, 120, 0.4);
            border-width: 1px;
            flex-direction: column;
            justify-content: center;
            border-left-width: 0px;
            border-right-width: 0px;
          }
          .votes-container12 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
          }
          .votes-text1 {
         
          }
          .votes-container13 {
            gap: var(--dl-space-space-halfunit);
            flex: 0 0 auto;
            display: flex;
            align-items: center;
          }
          .votes-text2 {
         
          }
          .votes-container14 {
            gap: 2px;
            flex: 0 0 auto;
            width: 100%;
            height: auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            flex-direction: row;
          }
          .votes-container15 {
            gap: 4px;
            flex: 0 0 auto;
            width: 50%;
            height: auto;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
          }
          .votes-container16 {
            flex: 0 0 auto;
            width: 100%;
            height: 8px;
            display: flex;
            align-items: flex-start;
            border-radius: 100px;
            background-color: rgba(30, 148, 0, 0.63);
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          .votes-container17 {
            gap: 4px;
            flex: 0 0 auto;
            width: 50%;
            height: auto;
            display: flex;
            align-items: flex-end;
            flex-direction: column;
            justify-content: center;
          }
          .votes-container18 {
            flex: 0 0 auto;
            width: 100%;
            height: 8px;
            display: flex;
            align-items: flex-start;
            border-radius: 100px;
            background-color: rgba(198, 0, 3, 0.63);
            border-top-left-radius: 0;
            border-top-right-radius: 100px;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 100px;
          }
          .votes-container19 {
            gap: var(--dl-space-space-halfunit);
            width: 100%;
            cursor: pointer;
            height: auto;
            display: grid;
            padding: var(--dl-space-space-halfunit);
            place-items: center;
            grid-template-columns: 1fr 1fr;
          }
          .votes-button1 {
            width: 100%;
            cursor: pointer;
            border-color: rgba(80, 75, 75, 0.43);
            border-width: 4px;
            background-color: rgba(0, 0, 0, 0.91);
          }
          .votes-button2 {
            width: 100%;
            cursor: pointer;
            border-color: rgba(25, 25, 25, 0.43);
            border-width: 4px;
            background-color: #dadada;
          }
          .votes-icon5 {
            fill: var(--dl-color-theme-neutral-dark);
            color: var(--dl-color-theme-neutral-dark);
          }
          .votes-text5 {
            display: inline-block;
          }
          .votes-text6 {
            display: inline-block;
          }
          .votes-text7 {
            display: inline-block;
          }
          .votes-text8 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

Votes.defaultProps = {
  text2: undefined,
  text3: undefined,
  text: undefined,
  text1: undefined,
}

Votes.propTypes = {
  text2: PropTypes.element,
  text3: PropTypes.element,
  text: PropTypes.element,
  text1: PropTypes.element,
}

export default Votes
