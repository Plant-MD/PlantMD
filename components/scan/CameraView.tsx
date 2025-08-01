'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Camera, VideoOff, Target } from 'lucide-react';

interface CameraViewProps {
  stream: MediaStream | null;
  cameraReady: boolean;
  onCapturePhoto: (videoElement?: HTMLVideoElement) => void;
  onStopCamera: () => void;
}

const CameraView: React.FC<CameraViewProps> = ({
  stream,
  cameraReady,
  onCapturePhoto,
  onStopCamera
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    if (stream && videoRef.current) {
      const video = videoRef.current;
      
      setVideoLoaded(false);
      
      const handleVideoLoad = () => {
        console.log('Video loaded successfully');
        setTimeout(() => {
          setVideoLoaded(true);
        }, 500);
      };

      const handleVideoError = (e: any) => {
        console.error('Video error:', e);
        setVideoLoaded(false);
      };

      video.addEventListener('loadeddata', handleVideoLoad);
      video.addEventListener('canplay', handleVideoLoad);
      video.addEventListener('playing', handleVideoLoad);
      video.addEventListener('error', handleVideoError);

      video.srcObject = stream;
      
      video.play().catch(error => {
        console.error('Video play failed:', error);
      });

      return () => {
        video.removeEventListener('loadeddata', handleVideoLoad);
        video.removeEventListener('canplay', handleVideoLoad);
        video.removeEventListener('playing', handleVideoLoad);
        video.removeEventListener('error', handleVideoError);
      };
    }
  }, [stream]);

  const isFullyReady = cameraReady && videoLoaded && stream;

  const handleCapture = () => {
    if (videoRef.current && isFullyReady) {
      onCapturePhoto(videoRef.current);
    } else {
      console.error('Video not ready for capture');
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
            Camera Active
          </h3>
        </div>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600">
          {isFullyReady 
            ? 'Position your plant in the frame and capture' 
            : 'Starting camera...'}
        </p>
      </div>

      <div className="relative w-full max-w-2xl mx-auto">
        
        <div className="relative aspect-video w-full rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />

          {!isFullyReady && (
            <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center">
              <div className="text-white text-center space-y-3">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 border-b-2 border-white mx-auto"></div>
                <p className="text-sm sm:text-base font-medium">Starting camera...</p>
                <div className="text-xs sm:text-sm opacity-75 space-y-1">
                  <div className="flex items-center justify-center space-x-4">
                    <span className={`flex items-center ${stream ? 'text-green-400' : 'text-gray-400'}`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${stream ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                      Stream
                    </span>
                    <span className={`flex items-center ${cameraReady ? 'text-green-400' : 'text-gray-400'}`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${cameraReady ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                      Camera
                    </span>
                    <span className={`flex items-center ${videoLoaded ? 'text-green-400' : 'text-gray-400'}`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${videoLoaded ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                      Video
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isFullyReady && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 left-4 w-6 h-6 sm:w-8 sm:h-8 border-l-2 border-t-2 border-white/70 rounded-tl-lg"></div>
              <div className="absolute top-4 right-4 w-6 h-6 sm:w-8 sm:h-8 border-r-2 border-t-2 border-white/70 rounded-tr-lg"></div>
              <div className="absolute bottom-20 left-4 w-6 h-6 sm:w-8 sm:h-8 border-l-2 border-b-2 border-white/70 rounded-bl-lg"></div>
              <div className="absolute bottom-20 right-4 w-6 h-6 sm:w-8 sm:h-8 border-r-2 border-b-2 border-white/70 rounded-br-lg"></div>
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Target className="w-8 h-8 sm:w-10 sm:h-10 text-white/50" />
              </div>
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 border-2 border-white/30 rounded-full animate-pulse"></div>
            </div>
          )}

          {isCapturing && (
            <div className="absolute inset-0 bg-white animate-ping"></div>
          )}
        </div>

        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 sm:space-x-6">
          
          <button
            onClick={onStopCamera}
            className="p-3 sm:p-4 lg:p-5 bg-red-500/90 backdrop-blur-md text-white rounded-full hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-red-200 focus:outline-none"
          >
            <VideoOff className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
          </button>

          <button
            onClick={handleCapture}
            disabled={!isFullyReady || isCapturing}
            className="relative p-4 sm:p-5 lg:p-6 bg-white/95 backdrop-blur-md text-gray-900 rounded-full hover:bg-white transition-all duration-200 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed focus:ring-4 focus:ring-white/50 focus:outline-none group"
          >
            <Camera className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 group-hover:scale-110 transition-transform duration-200" />
            
            {isFullyReady && !isCapturing && (
              <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-pulse"></div>
            )}
          </button>
        </div>
      </div>

      <div className="text-center space-y-2">
        <p className="text-sm sm:text-base text-gray-600">
          📱 <span className="font-medium">Pro Tip:</span> Hold your device steady and ensure good lighting
        </p>
        <div className="flex flex-wrap justify-center gap-2 text-xs sm:text-sm text-gray-500">
          <span className="px-2 py-1 bg-gray-100 rounded-full">Clear focus</span>
          <span className="px-2 py-1 bg-gray-100 rounded-full">Good lighting</span>
          <span className="px-2 py-1 bg-gray-100 rounded-full">Include affected areas</span>
        </div>
      </div>
    </div>
  );
};

export default CameraView;