"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useHeroAnalysis } from "@/hooks/useHeroAnalysis";
import UploadPopup from "./components/UploadPopup";
import AnalysisLoadingPopup from "./components/AnalysisLoadingPopup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DragOverComponent from "../shared/DragOver";
import { useEnhancedToast } from "@/hooks/useEnhancedToast";
import { useDiagnosisPipeline } from "@/hooks/useDiagnosisPipeline";
import CameraView from "@/components/scan/CameraView";
import { Button } from "@/components/ui/button";

function Hero() {
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const router = useRouter();
  const toast = useEnhancedToast();
  const diagnosisPipeline = useDiagnosisPipeline();

  React.useEffect(() => {
    console.log("showUploadPopup state changed:", showUploadPopup);
    console.log("Rendering UploadPopup with isOpen:", showUploadPopup);
  }, [showUploadPopup]);

  const { 
    selectedPlant, 
    handleStartCamera, 
    handleBrowseFiles,
    showCamera,
    cameraHook,
    handleCapturePhoto,
    handleStopCamera
  } = useHeroAnalysis();

  const handlePopupAnalyze = (
    imageData: string,
    plantType: "tomato" | "corn"
  ) => {
    console.log("handlePopupAnalyze called with:", {
      hasImage: !!imageData,
      plantType,
    });
    // Close the upload popup
    setShowUploadPopup(false);
    // Start the enhanced diagnosis pipeline
    diagnosisPipeline.startAnalysis(imageData, plantType);
  };

  // Handle camera capture - when photo is taken, show upload popup
  const handleCameraCapture = (videoElement?: HTMLVideoElement) => {
    console.log("Camera capture initiated");
    
    // Directly capture from camera hook
    const imageData = cameraHook.capturePhoto(videoElement);
    console.log("Image data received:", !!imageData);
    
    if (imageData) {
      console.log("Setting initial image data and showing popup");
      setInitialImageData(imageData);
      setShowUploadPopup(true);
      handleStopCamera(); // Close camera view
    } else {
      console.error("No image data received from camera capture");
    }
  };

  const [initialImageData, setInitialImageData] = useState<string | null>(null);

  const handleFileDrop = (files: FileList) => {
    console.log("handleFileDrop called with files:", files);
    const file = files[0];
    if (!file) {
      console.log("No file provided");
      return;
    }

    console.log("File details:", {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    // Validate file type
    if (!file.type.startsWith("image/")) {
      console.log("Invalid file type:", file.type);
      toast.error(
        "Invalid File Type",
        "Please upload an image file (JPG, PNG, etc.)",
        4000,
        "upload"
      );
      return;
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      console.log("File too large:", file.size);
      toast.error(
        "File Too Large",
        "Please upload an image smaller than 10MB",
        4000,
        "upload"
      );
      return;
    }

    console.log("File validation passed, reading file...");
    const reader = new FileReader();
    reader.onload = () => {
      console.log(
        "File read successfully, setting initial image data and showing popup"
      );
      setInitialImageData(reader.result as string);
      setShowUploadPopup(true);
    };
    reader.onerror = () => {
      console.error("File read error");
      toast.error(
        "File Read Error",
        "Failed to read the uploaded file. Please try again.",
        4000,
        "upload"
      );
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="relative top-0 flex min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0">
        <div className="absolute right-10 top-40 h-64 w-64 animate-pulse rounded-full bg-emerald-100 opacity-30 mix-blend-multiply blur-xl delay-1000" />
      </div>

      {/* Pattern Decorations */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="absolute left-12 top-24"
          width="100"
          height="100"
          viewBox="0 0 100 100"
        >
          <defs>
            <pattern
              id="leaves1"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M10 4 Q14 8 10 12 Q6 8 10 4"
                fill="#16a34a"
                opacity="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leaves1)" />
        </svg>
        <svg
          className="absolute bottom-24 right-12"
          width="80"
          height="80"
          viewBox="0 0 80 80"
        >
          <defs>
            <pattern
              id="leaves2"
              x="0"
              y="0"
              width="15"
              height="15"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="7.5" cy="7.5" r="1.5" fill="#15803d" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leaves2)" />
        </svg>
      </div>

      {/* Dancing GIF
      <img
        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWJ6MXM5b2syZnduaDA5MjV5c2xkdnF3cjRja2l3cTlja3JoMzNxYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/n6P4pwFUUBJCcAQnTY/giphy.gif"
        alt="Dancing Duck"
        className="w-32 md:w-48 h-auto rounded-lg absolute right-[200px] top-10 z-10"
      /> */}

      {/* Main Content Split */}
      <div className="flex w-full h-screen">
        {/* Left - Full image cover */}
        <div className="w-1/2 relative hidden md:block">
          <Image
            src="/hero_bg.png"
            alt="temp_background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right - Upload Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 relative z-10">
          {/* Header Badge */}
          <div className="mb-8">
            <div className="inline-flex items-center rounded-full border border-green-200/50 bg-white/90 px-4 py-2 shadow-md backdrop-blur-sm">
              <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <span className="text-xs font-semibold text-green-800">
                AI-Powered Plant Disease Detection
              </span>
            </div>
          </div>

          <DragOverComponent
            onDrop={handleFileDrop}
            onTakePhoto={handleStartCamera}
            title="Upload Plant Photo"
            subtitle="Get instant diagnosis & treatment"
          />

          {/* Terms and Conditions */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By uploading, you agree to our{" "}
              <Link
                href="/terms"
                className="text-green-600 underline hover:text-green-700"
              >
                Terms
              </Link>{" "}
              &{" "}
              <Link
                href="/privacy"
                className="text-green-600 underline hover:text-green-700"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>

      <UploadPopup
        isOpen={showUploadPopup}
        onClose={() => {
          console.log("Closing upload popup");
          setShowUploadPopup(false);
          setInitialImageData(null); // Reset initial image data
        }}
        onAnalyze={handlePopupAnalyze}
        onBrowseFiles={handleBrowseFiles}
        isProcessing={diagnosisPipeline.isAnalyzing}
        initialImageData={initialImageData}
        selectedPlantType={selectedPlant}
      />

      <AnalysisLoadingPopup
        isOpen={
          diagnosisPipeline.isAnalyzing || diagnosisPipeline.isProcessingCures
        }
        plantType={selectedPlant}
        progress={diagnosisPipeline.progress}
        currentStep={diagnosisPipeline.currentStep}
        onClose={() => diagnosisPipeline.resetAnalysis()}
      />

      {showCamera && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="w-full h-full max-w-4xl max-h-screen">
            <CameraView
              stream={cameraHook.stream}
              cameraReady={cameraHook.cameraReady}
              onCapturePhoto={handleCameraCapture}
              onStopCamera={handleStopCamera}
            />
          </div>
        </div>
      )}      {cameraHook.cameraError && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-red-600 mb-2">Camera Error</h3>
            <p className="text-gray-700 mb-4">{cameraHook.cameraError}</p>
            <div className="text-sm text-gray-600 mb-4">
              <p className="font-medium mb-2">Troubleshooting tips:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Make sure you've allowed camera permissions</li>
                <li>Close other apps that might be using the camera</li>
                <li>Try refreshing the page</li>
                <li>Check if your camera is working in other apps</li>
              </ul>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  cameraHook.setCameraError(null);
                  handleStopCamera();
                }}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  cameraHook.setCameraError(null);
                  handleStartCamera();
                }}
                className="flex-1"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Hero;
