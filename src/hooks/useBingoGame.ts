import { useState, useCallback, useRef } from 'react';
import { BingoState } from '../types';
import { getVideoPath } from '../constants/videos';

export const useBingoGame = () => {
  const [state, setState] = useState<BingoState>({
    currentNumber: null,
    previousNumbers: [],
    markedNumbers: [],
    showLiniaCantada: false,
    showLiniaCantadaPersist: false,
    animate: false,
    showVideo: false,
    videoUrl: '',
    showQuinaMessage: false,
    enterEnabled: true,
  });

  const videoTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const generateRandomNumber = useCallback(() => {
    if (!state.enterEnabled) return;
    
    if (state.markedNumbers.length === 90) {
      setState(prev => ({
        ...prev,
        markedNumbers: [],
        previousNumbers: [],
        currentNumber: null,
      }));
      return;
    }

    const availableNumbers = [...Array(90).keys()]
      .map((i) => i + 1)
      .filter((num) => !state.markedNumbers.includes(num));

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const randomNumber = availableNumbers[randomIndex];

    setState(prev => ({
      ...prev,
      currentNumber: randomNumber,
      previousNumbers: [randomNumber, ...prev.previousNumbers],
      markedNumbers: [...prev.markedNumbers, randomNumber],
      animate: true,
      showVideo: true,
      videoUrl: getVideoPath(randomNumber),
    }));

    setTimeout(() => {
      setState(prev => ({ ...prev, animate: false }));
    }, 500);

    if (videoTimeoutRef.current) {
      clearTimeout(videoTimeoutRef.current);
    }

    videoTimeoutRef.current = setTimeout(() => {
      setState(prev => ({ ...prev, showVideo: false }));
    }, 120000);
  }, [state.enterEnabled, state.markedNumbers]);

  return {
    state,
    setState,
    generateRandomNumber,
  };
};