export const PATHS = {
  videos: {
    root: '/videos',
    getVideoPath: (number: number) => `/videos/video${number}.mp4`,
  },
  images: {
    root: '/images',
    logo: '/images/logo.png',
  },
  favicon: '/favicon.ico',
} as const;