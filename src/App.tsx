import React, { useEffect, useRef } from 'react';
import { CurrentNumber } from './components/CurrentNumber';
import { PreviousNumbers } from './components/PreviousNumbers';
import { VideoPanel } from './components/VideoPanel';
import { BingoBoard } from './components/BingoBoard';
import { useBingoGame } from './hooks/useBingoGame';
import { launchFireworks, launchSchoolPride, stopConfetti } from './utils/confetti';
import { IMAGES } from './constants/images';
import './App.css';

const App = () => {
  const { state, setState, generateRandomNumber } = useBingoGame();
  const fireworksIntervalRef = useRef(null);
  const schoolPrideAnimationRef = useRef(null);
  const liniaCantadaFireworksRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && state.enterEnabled) {
        generateRandomNumber();
      }
      if (event.key === 'l' || event.key === 'L') {
        setState(prev => ({
          ...prev,
          showLiniaCantada: !prev.showLiniaCantada,
          showLiniaCantadaPersist: !prev.showLiniaCantadaPersist,
        }));
      }
      if (event.key === 'q' || event.key === 'Q') {
        setState(prev => ({
          ...prev,
          showQuinaMessage: !prev.showQuinaMessage,
          enterEnabled: !prev.enterEnabled,
          showLiniaCantada: !prev.showQuinaMessage && prev.showLiniaCantadaPersist,
        }));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [state.enterEnabled, state.showLiniaCantadaPersist, generateRandomNumber]);

  useEffect(() => {
    if (state.showLiniaCantada) {
      launchFireworks(liniaCantadaFireworksRef);
    } else {
      stopConfetti(liniaCantadaFireworksRef, { current: null });
    }
  }, [state.showLiniaCantada]);

  useEffect(() => {
    if (state.showQuinaMessage) {
      launchFireworks(fireworksIntervalRef);
      launchSchoolPride(schoolPrideAnimationRef);
    } else {
      stopConfetti(fireworksIntervalRef, schoolPrideAnimationRef);
    }
  }, [state.showQuinaMessage]);

  return (
    <div className="app-container">
      <div className="current-number-box">
        <CurrentNumber
          number={state.currentNumber}
          animate={state.animate}
          showQuinaMessage={state.showQuinaMessage}
        />
      </div>

      <div className="side-box">
        <PreviousNumbers
          numbers={state.previousNumbers}
          currentNumber={state.currentNumber}
          showQuinaMessage={state.showQuinaMessage}
        />
      </div>

      <VideoPanel
        showVideo={state.showVideo}
        videoUrl={state.videoUrl}
        showQuinaMessage={state.showQuinaMessage}
      />

      <div className={`large-box ${state.showQuinaMessage ? 'highlight' : ''}`}>
        <BingoBoard
          markedNumbers={state.markedNumbers}
          showQuinaMessage={state.showQuinaMessage}
        />
      </div>

      <div className="small-box">
        {state.showQuinaMessage ? (
          <span className="han-cantat-quina">HAN CANTAT QUINA! 🎉🎉🎉</span>
        ) : (
          state.showLiniaCantada && (
            <span className={`linia-cantada ${state.showLiniaCantada ? 'show' : ''}`}>
              LÍNIA CANTADA!! 🎉🎉
            </span>
          )
        )}
      </div>

      <div className="additional-box">
        <img src={IMAGES.logo} alt="Logo UuhQE" className="logo-image" />
      </div>
    </div>
  );
};

export default App;