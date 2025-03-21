import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Navigation from '../components/Navigation'
import Intro from '../components/introdunction'
import Conc from '../components/finish'
import Features from '../components/lft'
import Join from '../components/join'
import Welcome from '../components/scroll'
import Mode from '../components/mode'
import Mode1 from '../components/mode1'
import Mode2 from '../components/mode2'

const OnboardingFlow = ({ onFinish, connect, setProMode, pro, address }) => {
  const [step, setStep] = useState(0)
  const [animating, setAnimating] = useState(false)
  const totalSteps = 6;
  const audioRef = useRef(null);

  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Playback error:", error);
      });
    }
  };

  const handleNext = () => {
    handleClick();
    setAnimating(true)
    setTimeout(() => {
      if (step < totalSteps - 1) {
        setStep(prev => prev + 1)
      }
      setAnimating(false)
    }, 500) // transition duration
  }

  // Auto-advance from step 4 to step 5 after a short delay
  useEffect(() => {
    let timer
    if (step === 5) {
      timer = setTimeout(() => {
  if(!address){
    connect()
  } else{
    onFinish();
    handleNext();
  }
      }, 5000)
    } 
    return () => clearTimeout(timer)
    
  }, [step])
  const [selectedMode, setSelectedMode] = useState(); // Will be "mode1" or "mode2"

  const handleStepChange = (newStep) => {
    setStep(newStep);
  };

  useEffect(() => {
    let finishTimer;
    if (address) {
      finishTimer = setTimeout(() => {
        onFinish();
      }, 7000)
    }
    return () => clearTimeout(finishTimer);
  }, [address]);

  return (
    <div className="onboarding-container">
       <audio ref={audioRef} src="/get1.wav" />
      <Navigation currentStep={step} onStepChange={handleStepChange} />
      <div className={`step-content ${animating ? 'fade' : ''}`}>
        {step === 0 && <Intro />}
        {step === 1 && <Welcome />}
        {step === 2 && <Features />}
        {step === 3 && <Join />}
        {step === 4 && (
          !selectedMode ? (
            // Show mode selection UI if no mode is selected yet
            <Mode onSelect={(mode) => 
              setSelectedMode(mode)
            } setProMode={setProMode} pro={pro} />
          ) : selectedMode==='mode1' ? (
            // For mode1, display its light/dark selection component
            <div className={`step-content ${animating ? 'fade' : ''}`}>
            <Mode1 onComplete={() => handleNext()} />
            </div>
          ) : (
            // For mode2, display its light/dark selection component
            <div className={`step-content ${animating ? 'fade' : ''}`}>
            <Mode2 onComplete={() => handleNext()} />
            </div>
          )
        )}
        {step === 5 && <Conc />}
      </div>
      {/* Show the Next button only for steps 0-3 */}
      {step < 5 && (
        <div style={{ position: 'relative', bottom: '10px' }}>
          <button style={{ width: '250px' }} onClick={handleNext} className="button">
            {step === 0 ? 'Get Started' : 'Continue'}
          </button>
        </div>
      )}
      <style jsx>{`
        .onboarding-container {
          position: relative;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          z-index: 1000;
          overflow: scroll;
        }
        .step-content {
          width: 100%;
          height: auto;
          transition: opacity 0.5s ease;
        }
        .fade {
          opacity: 0;
        }
      `}</style>
    </div>
  )
}

export default OnboardingFlow
