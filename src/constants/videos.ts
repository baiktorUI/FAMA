export const VIDEOS_PATH = '/videos';

export const getVideoPath = (number: number, extension: 'mp4' | 'mov' = 'mp4'): string => {
  return `${VIDEOS_PATH}/video${number}.${extension}`;
};

// Video format requirements
export const VIDEO_REQUIREMENTS = {
  formats: ['MP4', 'MOV'], // Accept both MP4 and MOV
  naming: 'video{number}.{extension}', // Example: video1.mp4, video2.mov, etc.
  location: '/public/videos/',
  maxNumber: 90,
};

/**
 * Validates video format.
 * @param format The format to validate.
 * @returns {boolean} Whether the format is valid.
 */
export const isValidVideoFormat = (format: string): boolean => {
  return VIDEO_REQUIREMENTS.formats.includes(format.toUpperCase());
};
