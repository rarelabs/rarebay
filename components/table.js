import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const Table = (props) => {
  return (
    <>
      <div className={`table-table ${props.rootClassName} `}>
        <div className="table-container1">
          <button type="button" className="button">
            30m
          </button>
          <button type="button" className="table-button2 button">
            1h
          </button>
          <button type="button" className="table-button3 button">
            24h
          </button>
          <div className="table-container2">
            <div className="table-container3"></div>
          </div>
          <button type="button" className="table-button4 button">
            <span className="table-text1">
              <span>
                <span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
                <span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
              </span>
              <span>Trending</span>
            </span>
          </button>
        </div>
        <div className="table-container4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="table-icon1"
          >
            <g fill="none">
              <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
              <path
                d="M16.382 4a2 2 0 0 1 1.71.964l.079.142l3.512 7.025a3 3 0 0 1 .308 1.109l.009.232V19a2 2 0 0 1-1.85 1.995L20 21H4a2 2 0 0 1-1.995-1.85L2 19v-5.528a3 3 0 0 1 .22-1.13l.097-.212l3.512-7.024a2 2 0 0 1 1.628-1.1L7.618 4zM8 14H4v5h16v-5h-4v.5a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 8 14.5zm8.382-8H7.618l-3 6H8.5a1.5 1.5 0 0 1 1.493 1.356L10 13.5v.5h4v-.5a1.5 1.5 0 0 1 1.356-1.493L15.5 12h3.882z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
          <span className="table-text6">
            {props.text ?? (
              <Fragment>
                <span className="table-text7">No data found</span>
              </Fragment>
            )}
          </span>
        </div>
      </div>
      <style jsx>
        {`
          .table-table {
            flex: 0 0 auto;
            width: 100%;
            height: 700px;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            position: relative;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
          }
          .table-container1 {
            gap: 7px;
            width: 100%;
            height: auto;
            display: grid;
            padding: var(--dl-space-space-halfunit);
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
          }
          .table-button2 {
            fill: transparent;
            color: #bbbbbb;
            background-color: transparent;
          }
          .table-button3 {
            fill: #bbbbbb;
            color: #bbbbbb;
            background-color: transparent;
          }
          .table-container2 {
            flex: 0 0 auto;
            width: auto;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .table-container3 {
            flex: 0 0 auto;
            width: 1%;
            height: 100%;
            display: flex;
            align-items: flex-start;
            background-color: #d9d9d9;
          }
          .table-button4 {
            display: flex;
            flex-direction: row;
            background-color: transparent;
          }
          .table-text1 {
            color: #4e4e4e;
            width: 100%;
          }
          .table-container4 {
            flex: 0 0 auto;
            display: flex;
            margin-top: 216px;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .table-icon1 {
            fill: var(--dl-color-theme-neutral-dark);
            color: #808080;
            width: 60px;
            height: auto;
          }
          .table-text6 {
            color: #878787;
          }
          .table-text7 {
            display: inline-block;
          }
          .tableroot-class-name {
            display: none;
          }
          .tableroot-class-name1 {
            width: 100%;
          }
        `}
      </style>
    </>
  )
}

Table.defaultProps = {
  rootClassName: '',
  text: undefined,
}

Table.propTypes = {
  rootClassName: PropTypes.string,
  text: PropTypes.element,
}

export default Table
