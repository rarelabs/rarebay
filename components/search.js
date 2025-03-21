import React from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const Search = (props) => {
  return (
    <>
      <div className={`search-search ${props.rootClassName} `}>
        <input
          type="text"
          placeholder="Search"
          className="search-textinput input"
        />
        <svg
          width="24"
          height="24"
          viewBox="0 0 32 32"
          className="search-icon1"
        >
          <path
            d="m29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29ZM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      <style jsx>
        {`
          .search-search {
            width: 100%;
            height: 91px;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            position: relative;
            align-items: center;
            justify-content: flex-start;
          }
          .search-textinput {
            width: 100%;
            padding: var(--dl-space-space-halfunit);
            border-width: 0px;
          }
          .search-icon1 {
            top: 0px;
            fill: var(--dl-color-theme-neutral-dark);
            color: #737373;
            right: var(--dl-space-space-unit);
            bottom: 0px;
            margin: auto;
            position: absolute;
          }

          .searchroot-class-name1 {
            height: auto;
            padding: 0px;
          }
          @media (max-width: 1600px) {
            .search-textinput {
              border-width: 0px;
            }
          }
        `}
      </style>
    </>
  )
}

Search.defaultProps = {
  rootClassName: '',
}

Search.propTypes = {
  rootClassName: PropTypes.string,
}

export default Search
