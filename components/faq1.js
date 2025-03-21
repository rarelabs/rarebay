import React from 'react'

import PropTypes from 'prop-types'

const FAQ1 = (props) => {
  return (
    <>
      <div className={`faq1-faq7 thq-section-padding ${props.rootClassName} `}>
        <div className="faq1-max-width thq-section-max-width">
          <div className="faq1-section-title">
            <h2 className="faq1-text thq-heading-2">{props.heading1}</h2>
            <p className="faq1-text1 thq-body-large">
              Frequently asked questions about RareBay.
            </p>
          </div>
          <div className="faq1-list">
            <div className="faq1-list-item1">
              <p className="faq1-faq1-question thq-body-large">
                {props.faq1Question}
              </p>
              <span className="thq-body-small">{props.faq1Answer}</span>
            </div>
            <div className="faq1-list-item2">
              <p className="faq1-faq2-question thq-body-large">
                {props.faq2Question}
              </p>
              <span className="thq-body-small">{props.faq2Answer}</span>
            </div>
            <div className="faq1-list-item3">
              <p className="faq1-faq3-question thq-body-large">
                {props.faq3Question}
              </p>
              <span className="thq-body-small">{props.faq3Answer}</span>
            </div>
            <div className="faq1-list-item4">
              <p className="faq1-faq4-question thq-body-large">
                {props.faq4Question}
              </p>
              <span className="thq-body-small">{props.faq4Answer}</span>
            </div>
            <div className="faq1-list-item5">
              <p className="faq1-faq5-question thq-body-large">
                {props.faq5Question}
              </p>
              <span className="thq-body-small">{props.faq5Answer}</span>
            </div>
          </div>
        </div>
        <div className="faq1-content thq-flex-column">
          <div className="faq1-content1">
            <h2 className="faq1-text2 thq-heading-2">{props.heading2}</h2>
            <p className="faq1-text3 thq-body-large">
              <span>Contact us incase you have other questions!</span>
              <br></br>
            </p>
          </div>
          <div className='jefferson'>
          <div className="button">
            <a className="faq1-text6" href="mailto:mail@rarebay.xyz?subject=">Contact</a>
          </div>
          </div>
         
        </div>
      </div>
      <style jsx>
        {`.jefferson{
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
        }
          .faq1-faq7 {
            gap: var(--dl-space-space-halfunit);
            color: rgba(100, 100, 100);
            display: flex;
            padding: 0px;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .faq1-max-width {
            gap: var(--dl-space-space-unit);
            width: 803px;
            height: auto;
            display: flex;
            padding: var(--dl-space-space-twounits);
            max-width: 100%;
            min-width: auto;
            align-items: center;
            flex-direction: column;
        
          }
          .faq1-section-title {
            width: 637px;
            height: auto;
          }
          .faq1-text {
            text-align: center;
          
          }
          .faq1-text1 {
            text-align: center;
          }
          .faq1-list {
            height: auto;
          }
          .faq1-list-item1 {
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            margin-bottom: var(--dl-space-space-unit);
            flex-direction: column;
          }
          .faq1-faq1-question {
            color: #818181;
            font-style: normal;
            font-weight: 600;
          }
          .faq1-list-item2 {
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            margin-bottom: var(--dl-space-space-unit);
            flex-direction: column;
          }
          .faq1-faq2-question {
            color: #909090;
            font-style: normal;
            font-weight: 600;
          }
          .faq1-list-item3 {
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            margin-bottom: var(--dl-space-space-unit);
            flex-direction: column;
          }
          .faq1-faq3-question {
            color: #949494;
            font-style: normal;
            font-weight: 600;
          }
          .faq1-list-item4 {
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            margin-bottom: var(--dl-space-space-unit);
            flex-direction: column;
          }
          .faq1-faq4-question {
            color: #969696;
            font-style: normal;
            font-weight: 600;
          }
          .faq1-list-item5 {
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .faq1-faq5-question {
            color: #878787;
            font-style: normal;
            font-weight: 600;
          }
          .faq1-content {
            width: 803px;
            padding: var(--dl-space-space-unit);
          }
          .faq1-content1 {
            gap: 16px;
            height: auto;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
     
          .faq1-text3 {
            text-align: center;
          }
          .faq1-container {
            gap: var(--dl-space-space-twounits);
            width: 200px;
            cursor: pointer;
            height: auto;
            display: flex;
            z-index: 200;
            position: relative;
            align-self: center;
            margin-top: var(--dl-space-space-halfunit);
            align-items: center;
            padding-top: var(--dl-space-space-halfunit);
            padding-left: var(--dl-space-space-unit);
            border-radius: var(--dl-radius-radius-radius8);
            margin-bottom: var(--dl-space-space-halfunit);
            padding-right: var(--dl-space-space-unit);
            padding-bottom: var(--dl-space-space-halfunit);
            justify-content: center;
            background-image: linear-gradient(
              to right,
              #fc00ff 0%,
              #00dbde 100%
            );
          }
          .faq1-text6 {
            fill: rgba(0, 37, 50, 0.5);
            font-size: 24px;
            text-align: center;
           
            font-weight: 800;
          }
          .faq1-root-class-name {
            width: 100%;
            height: auto;
          }
          @media (max-width: 991px) {
            .faq1-max-width {
              gap: var(--dl-space-space-oneandhalfunits);
            }
          }
          @media (max-width: 767px) {
            .faq1-text1 {
              text-align: left;
            }
            .faq1-list {
              gap: var(--dl-space-space-twounits);
            }
          }
          @media (max-width: 479px) {
            .faq1-faq7 {
              padding: var(--dl-space-space-halfunit);
            }
            .faq1-section-title {
              width: 100%;
            }
          
            .faq1-content {
              width: 100%;
            }
       
            .faq1-container {
              width: 100%;
            }
            .faq1-text6 {
              width: 100%;
              font-size: 25px;
              text-align: center;
            }
          }
        `}
      </style>
    </>
  )
}

FAQ1.defaultProps = {
  faq3Answer:
    'RareBay is all about DeFi, and when we say DeFi, we mean BTCFi as we are a layer 2 on a bitcoin aligned chain',
  faq1Answer:
    'RareBay is multipurpose Decentralized Application(Dapp) where users can engage in various activities such as Decentralized Finance(DeFi), NFT Trading, Learning new stuff about crypto, Playing games anywhere anytime.',
  faq1Question: 'What is RareBay?',
  faq4Answer:
    "Users can delegate coins on the DAO contract and propose suggestion and other users can delegate their coins too and vote on this suggestion",
  faq2Answer:
    "Currently in Beta, users can trade in testnet, play rarebay tap race game, view your wallet balance and CORE price and invite new frens to the ecosystem",
  faq3Question: 'What is the emphasis of RareBay platform?',
  rootClassName1: '',
  faq2Question: 'What can users do on RareBay?',
  faq5Answer:
    'RareCoin is the utility protocol for the ecosystem of RareBay used as in-app game coin, stakeable, delegate in DAO to make decisions and other usecases eg. Gift your frens',
  faq4Question: "How can users participate in the ecosystem's governance?",
  heading1: 'FAQs',
  heading2: 'Still have a question?',
  faq5Question: 'What is RareCoin?',
  rootClassName: '',
}

FAQ1.propTypes = {
  faq3Answer: PropTypes.string,
  faq1Answer: PropTypes.string,
  faq1Question: PropTypes.string,
  faq4Answer: PropTypes.string,
  faq2Answer: PropTypes.string,
  faq3Question: PropTypes.string,
  rootClassName1: PropTypes.string,
  faq2Question: PropTypes.string,
  faq5Answer: PropTypes.string,
  faq4Question: PropTypes.string,
  heading1: PropTypes.string,
  heading2: PropTypes.string,
  faq5Question: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default FAQ1
