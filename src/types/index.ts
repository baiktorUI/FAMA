export interface BingoState {
  currentNumber: number | null;
  previousNumbers: number[];
  markedNumbers: number[];
  showLiniaCantada: boolean;
  showLiniaCantadaPersist: boolean;
  animate: boolean;
  showVideo: boolean;
  videoUrl: string;
  showQuinaMessage: boolean;
  enterEnabled: boolean;
}

export interface ConfettiRefs {
  fireworksIntervalRef: React.RefObject<number | null>;
  schoolPrideAnimationRef: React.RefObject<number | null>;
  liniaCantadaFireworksRef: React.RefObject<number | null>;
}