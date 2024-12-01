import React from 'react';

interface PreviousNumbersProps {
  numbers: number[];
  currentNumber: number | null;
  showQuinaMessage: boolean;
}

export const PreviousNumbers: React.FC<PreviousNumbersProps> = ({
  numbers,
  currentNumber,
  showQuinaMessage,
}) => {
  if (showQuinaMessage) {
    return <span className="han-cantat-quina">HAN CANTAT QUINA! 🎉🎉🎉</span>;
  }

  return (
    <div className="side-content">
      {numbers
        .filter((num) => num !== currentNumber)
        .slice(0, 5)
        .map((num, index) => (
          <span key={index} className={`previous-number opacity-${index}`}>
            {num.toString().padStart(2, '0')}
          </span>
        ))}
    </div>
  );
};