import React from 'react';

const Navigation = ({ currentStep, onStepChange }) => {
  return (
    <>
      <div className="navigation-navigation">
        <div className="navigation-container1">
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const isClickable = i < currentStep;
            return (
              <div
                key={i}
                className={`navigation-dot ${currentStep === i ? 'active' : ''} ${
                  isClickable ? 'clickable' : ''
                }`}
                onClick={isClickable ? () => onStepChange(i) : null}
              />
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .navigation-navigation {
          flex: 0 0 auto;
          width: 100%;
          display: flex;
          position: relative;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }
        .navigation-container1 {
          gap: var(--dl-space-space-halfunit);
          flex: 0 0 auto;
          width: 774px;
          height: 59px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .navigation-dot {
          width: 32px;
          height: var(--dl-size-size-xsmall);
          border-radius: var(--dl-radius-radius-cardradius);
          background-color: rgba(255, 255, 255);
          opacity: 0.5;
          transition: background-color 0.5s ease, width 0.3s ease;
        }
        .navigation-dot.clickable {
          cursor: pointer;
        }
        .navigation-dot.active {
          width: var(--dl-size-size-large);
          background-color: rgb(0, 136, 255);
          opacity: 1;
        }
        @media (max-width: 479px) {
          .navigation-container1 {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default Navigation;
