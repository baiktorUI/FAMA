export const VIDEOS_PATH = '/videos';

export const getVideoPath = (number: number): string => {
  return `${VIDEOS_PATH}/video${number}.mp4`;
};

// Video format requirements
export const VIDEO_REQUIREMENTS = {
  format: 'MP4',
  naming: 'video{number}.mp4', // Example: video1.mp4, video2.mp4, etc.
  location: '/public/videos/',
  maxNumber: 90,
};