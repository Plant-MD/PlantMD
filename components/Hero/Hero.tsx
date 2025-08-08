"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useHeroAnalysis } from "@/hooks/useHeroAnalysis";
import UploadPopup from "./components/UploadPopup";
import AnalysisLoadingPopup from "./components/AnalysisLoadingPopup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DragOverComponent from "../shared/DragOver";

function Hero() {
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [showAnalysisLoading, setShowAnalysisLoading] = useState(false);
  const router = useRouter();

  const {
    session,
    isProcessing,
    showCamera,
    selectedPlant,
    cameraHook,
    uploadHook,
    handleStartCamera,
    handleStopCamera,
    handleCapturePhoto,
    handleBrowseFiles,
    handleAnalyze,
    handleClearImage,
    handlePlantChange,
    handleDismissError,
  } = useHeroAnalysis();

  const [localIsProcessing, setLocalIsProcessing] = useState(false);
  const [initialImageData, setInitialImageData] = useState<string | null>(null);

  const handlePopupAnalyze = (imageData: string, plantType: "tomato" | "corn") => {
    console.log("handlePopupAnalyze called with:", { hasImage: !!imageData, plantType });
    setShowUploadPopup(false);
    setShowAnalysisLoading(true);
    handleAnalyzeWithImage(imageData, plantType);
  };

  const handleAnalyzeWithImage = async (imageData: string, plantType: "tomato" | "corn") => {
    if (!imageData) {
      console.error("No image available for analysis");
      setShowAnalysisLoading(false);
      return;
    }

    setLocalIsProcessing(true);

    const formData = new FormData();

    try {
      const blob = dataURLtoBlob(imageData);
      formData.append("file", blob, "plant.jpg");
      formData.append("plant", plantType);

      // Minimum loading delay promise
      const minLoadingTime = new Promise((res) => setTimeout(res, 8000));

      // API request
      const apiRequest = fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const [response] = await Promise.all([apiRequest, minLoadingTime]);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.predictions) {
        setShowAnalysisLoading(false);
        router.push(
          `/diagnosis?predictions=${encodeURIComponent(JSON.stringify(data.predictions))}&plant=${plantType}`
        );
      } else {
        console.error("Invalid response structure:", data);
        throw new Error("Invalid response from analysis service");
      }
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Analysis failed. Please try again.");
      setShowAnalysisLoading(false);
    } finally {
      setLocalIsProcessing(false);
    }
  };

  const dataURLtoBlob = (dataURL: string) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleFileDrop = (files: FileList) => {
    const file = files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setInitialImageData(reader.result as string);
      setShowUploadPopup(true);
    };
    reader.readAsDataURL(file);
  };

  const handleBrowseFilesClick = () => {
    setShowUploadPopup(true);
  };

  return (
    <section className="relative top-0 flex min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0">
        <div className="absolute right-10 top-40 h-64 w-64 animate-pulse rounded-full bg-emerald-100 opacity-30 mix-blend-multiply blur-xl delay-1000" />
      </div>

      {/* Pattern Decorations */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute left-12 top-24" width="100" height="100" viewBox="0 0 100 100">
          <defs>
            <pattern id="leaves1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M10 4 Q14 8 10 12 Q6 8 10 4" fill="#16a34a" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leaves1)" />
        </svg>
        <svg className="absolute bottom-24 right-12" width="80" height="80" viewBox="0 0 80 80">
          <defs>
            <pattern id="leaves2" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
              <circle cx="7.5" cy="7.5" r="1.5" fill="#15803d" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leaves2)" />
        </svg>
      </div>

      {/* Left - Full image cover */}
	  <div className="w-1/2 relative left-2 top-28 hidden md:block">
		{/* Outer Layer */}
		<div className="relative rounded-full p-2 border-[6px] border-green-900 overflow-hidden 	">
			
			{/* Middle Layer (Double border effect) */}
			<div className="rounded-full p-2 border-[4px] border-green-800  transition-all duration-300 hover:scale-105">
			
			{/* Inner Image Layer */}
			<div className="relative rounded-full overflow-hidden w-full h-full aspect-square">
				<Image 
				src="/hero_bg.png" 
				alt="temp_background" 
				fill 
				className="object-cover" 
				priority 
				/>
			</div>

			</div>

		</div>
		</div>


      {/* Right - Upload Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 relative z-10">
        {/* Header Badge */}
        <div className="mb-8">
          <div className="inline-flex items-center rounded-full border border-green-200/50 bg-white/90 px-4 py-2 shadow-md backdrop-blur-sm">
            <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span className="text-xs font-semibold text-green-800">AI-Powered Plant Disease Detection</span>
          </div>
        </div>

        <DragOverComponent onDrop={handleFileDrop} title="Upload Plant Photo" subtitle="Get instant diagnosis & treatment" />

        {/* Terms and Conditions */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By uploading, you agree to our{" "}
            <Link href="/terms" className="text-green-600 underline hover:text-green-700">
              Terms
            </Link>{" "}
            &{" "}
            <Link href="/privacy" className="text-green-600 underline hover:text-green-700">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>

      {/* Upload Popup */}
      <UploadPopup
        isOpen={showUploadPopup}
        onClose={() => setShowUploadPopup(false)}
        onAnalyze={handlePopupAnalyze}
        isProcessing={localIsProcessing}
        initialImageData={initialImageData}
        selectedPlantType={selectedPlant}
        onBrowseFiles={handleBrowseFilesClick} // Optional: If your popup has a button to browse files again
      />

      {/* Analysis Loading Popup */}
      <AnalysisLoadingPopup isOpen={showAnalysisLoading} plantType={selectedPlant} onClose={() => setShowAnalysisLoading(false)} />
    </section>
  );
}

export default Hero;