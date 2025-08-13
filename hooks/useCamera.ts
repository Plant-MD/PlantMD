'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

export const useCamera = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = useCallback(async () => {
    setCameraError(null);
    setCameraReady(false);
    setIsStarting(true);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Camera not supported on this device');
      return;
    }

    try {
      // Stop any existing stream first
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      let mediaStream: MediaStream | null = null;

      try {
        // Try back camera first
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });
      } catch (envError) {
        // Fallback to any camera
        try {
          mediaStream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 1280 },
              height: { ideal: 720 }
            }
          });
        } catch (anyError) {
          // Final fallback - basic video
          mediaStream = await navigator.mediaDevices.getUserMedia({
            video: true
          });
        }
      }

      if (mediaStream) {
        setStream(mediaStream);
        console.log('Camera stream started successfully');
      }

    } catch (error: any) {
      console.error('Camera error:', error);
      let errorMessage = 'Unable to access camera. ';

      if (error.name === 'NotAllowedError') {
        errorMessage += 'Please allow camera permissions and try again.';
      } else if (error.name === 'NotFoundError') {
        errorMessage += 'No camera found on this device.';
      } else if (error.name === 'NotSupportedError') {
        errorMessage += 'Camera not supported on this browser.';
      } else if (error.name === 'OverconstrainedError') {
        errorMessage += 'Camera constraints not supported.';
      } else if (error.name === 'NotReadableError') {
        errorMessage += 'Camera is already in use by another application.';
      } else {
        errorMessage += 'Please check your camera settings and try again.';
      }

      setCameraError(errorMessage);
    } finally {
      setIsStarting(false);
    }
  }, [stream]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
      });
      setStream(null);
    }
    setCameraReady(false);
    setCameraError(null);
    setIsStarting(false);
  }, [stream]);

  // Updated capture function that takes video element as parameter
  const capturePhoto = useCallback((videoElement?: HTMLVideoElement) => {
    console.log('Attempting to capture photo...');

    // Use passed video element or fallback to ref
    const video = videoElement || videoRef.current;
    
    if (!video) {
      console.error('Video element not available');
      setCameraError('Camera components not ready. Please try again.');
      return null;
    }

    if (!stream) {
      console.error('No camera stream available');
      setCameraError('No camera stream. Please restart camera.');
      return null;
    }    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
if (!context) {
      console.error('Canvas context not available');
      setCameraError('Failed to get canvas context. Please try again.');
      return null;
    }

    try {
      if (video.readyState < 2) {
        console.error('Video not ready yet, readyState:', video.readyState);
        setCameraError('Camera is still loading. Please wait a moment and try again.');
        return null;
      }

      if (video.paused || video.ended) {
        console.error('Video is not playing');
        setCameraError('Camera video is not active. Please restart the camera.');
        return null;
      }

      const videoWidth = video.videoWidth || video.clientWidth || 640;
      const videoHeight = video.videoHeight || video.clientHeight || 480;
      
      console.log('Video dimensions:', videoWidth, 'x', videoHeight);
      console.log('Video ready state:', video.readyState);
      console.log('Video paused:', video.paused);

      if (videoWidth === 0 || videoHeight === 0) {
        throw new Error('Video has no dimensions - not ready yet');
      }

      // Set canvas size
      canvas.width = videoWidth;
      canvas.height = videoHeight;
      
      // Draw the current video frame to canvas
      context.drawImage(video, 0, 0, videoWidth, videoHeight);
      
      // Convert to data URL
      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      
      if (imageDataUrl === 'data:,' || imageDataUrl.length < 100) {
        throw new Error('Canvas is empty - video may not be ready');
      }

      console.log('Photo captured successfully');
      return imageDataUrl;

    } catch (captureError) {
      console.error('Capture error:', captureError);
      setCameraError('Failed to capture image. Please ensure camera is working and try again.');
      return null;
    }
  }, [stream]);

  // Mark camera as ready when stream is available
  useEffect(() => {
    if (stream) {
      // Give the video element time to initialize
      const timer = setTimeout(() => {
        setCameraReady(true);
        console.log('Camera marked as ready');
      }, 1500); // Increased to 1.5 seconds

      return () => clearTimeout(timer);
    } else {
      setCameraReady(false);
    }
  }, [stream]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return {
    stream,
    cameraError,
    cameraReady,
    isStarting,
    setCameraError,
    startCamera,
    stopCamera,
    capturePhoto,
    videoRef,
    canvasRef
  };
};