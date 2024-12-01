import React, { useRef, useEffect } from 'react';

interface VideoPanelProps {
  showVideo: boolean;
  videoUrl: string;
  showQuinaMessage: boolean;
}

export const VideoPanel: React.FC<VideoPanelProps> = ({
  showVideo,
  videoUrl,
  showQuinaMessage,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && showVideo) {
      videoRef.current.load();
      videoRef.current.play().catch(error => {
        console.log('Video autoplay failed:', error);
      });
    }
  }, [showVideo, videoUrl]);

  if (showQuinaMessage) {
    return (
      <div className="video-box">
        <span className="han-cantat-quina">HAN CANTAT QUINA! 🎉🎉🎉</span>
      </div>
    );
  }

  return (
    <div className="video-box">
      {showVideo && (
        <video
          ref={videoRef}
          controls
          autoPlay
          playsInline
          className="video-player"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};