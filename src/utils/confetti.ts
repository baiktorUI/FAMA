import confetti from 'canvas-confetti';

export const launchFireworks = (ref: React.RefObject<number | null>) => {
  if (ref.current) return;

  const duration = 15 * 1000;
  const animationEnd = Date.now() + duration;

  ref.current = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(ref.current!);
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti({
      particleCount,
      spread: 360,
      startVelocity: 30,
      decay: 0.9,
      gravity: 1,
    });
  }, 250);
};

export const launchSchoolPride = (ref: React.RefObject<number | null>) => {
  if (ref.current) return;

  const end = Date.now() + 15 * 1000;

  const colors = ['#bb0000', '#ffffff'];

  ref.current = window.setInterval(() => {
    if (Date.now() > end) {
      return clearInterval(ref.current!);
    }

    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });
  }, 100);
};

export const stopConfetti = (
  fireworksRef: React.RefObject<number | null>,
  schoolPrideRef: React.RefObject<number | null>
) => {
  if (fireworksRef.current) {
    clearInterval(fireworksRef.current);
    fireworksRef.current = null;
  }
  if (schoolPrideRef.current) {
    clearInterval(schoolPrideRef.current);
    schoolPrideRef.current = null;
  }
};