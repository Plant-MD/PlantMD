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

function Hero() {
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [showAnalysisLoading, setShowAnalysisLoading] = useState(false);
  const router = useRouter();
  const toast = useEnhancedToast();

  // Debug state changes
  React.useEffect(() => {
    console.log("showUploadPopup state changed:", showUploadPopup);
    console.log("Rendering UploadPopup with isOpen:", showUploadPopup);
  }, [showUploadPopup]);

  const { selectedPlant } = useHeroAnalysis();

  const [localIsProcessing, setLocalIsProcessing] = useState(false);

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
    // Show the analysis loading popup
    setShowAnalysisLoading(true);
    // Trigger analysis with the selected plant type and image data
    handleAnalyzeWithImage(imageData, plantType);
  };

  const handleAnalyzeWithImage = async (
    imageData: string,
    plantType: "tomato" | "corn"
  ) => {
    console.log("handleAnalyzeWithImage called with:", {
      hasImage: !!imageData,
      plantType,
    });

    if (!imageData) {
      console.error("No image available for analysis");
      setShowAnalysisLoading(false);
      return;
    }

    console.log("Starting analysis with image and plant type:", plantType);
    setLocalIsProcessing(true);

    const formData = new FormData();

    try {
      const blob = dataURLtoBlob(imageData);
      formData.append("file", blob, "plant.jpg");
      formData.append("plant", plantType);

      console.log("Sending request to /api/analyze");

      // Start a minimum loading time promise
      const minLoadingTime = new Promise((resolve) =>
        setTimeout(resolve, 8000)
      ); // 8 seconds minimum

      // Start the API request
      const apiRequest = fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      // Wait for both the API response AND minimum loading time
      const [response] = await Promise.all([apiRequest, minLoadingTime]);

      console.log("API response status:", response.status);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          const errorText = await response.text();
          console.error("API error response (text):", errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.error("API error response:", errorData);

        // Use the specific error message from the API
        const apiErrorMessage =
          errorData.error || `HTTP error! status: ${response.status}`;
        throw new Error(apiErrorMessage);
      }

      const data = await response.json();
      console.log("API response data:", data);

      if (data.success && data.predictions) {
        console.log("Redirecting to diagnosis page with predictions");

        // Show success toast
        toast.success(
          "Analysis Complete",
          data.message ||
            `${
              plantType.charAt(0).toUpperCase() + plantType.slice(1)
            } analysis completed successfully`,
          3000
        );

        // Close the loading popup before redirecting
        setShowAnalysisLoading(false);
        router.push(
          `/diagnosis?predictions=${encodeURIComponent(
            JSON.stringify(data.predictions)
          )}&plant=${plantType}`
        );
      } else {
        console.error("Invalid response structure:", data);
        throw new Error("Invalid response from analysis service");
      }
    } catch (error) {
      console.error("Analysis failed:", error);

      // Use the actual error message from the API, or provide fallbacks
      let errorMessage = "Analysis failed. Please try again.";
      let contextualIcon: "camera" | "upload" | "network" | "default" =
        "default";

      if (error instanceof Error) {
        // If the error message is from our API, use it directly
        if (!error.message.includes("HTTP error! status:")) {
          errorMessage = error.message;
        } else {
          // Fallback messages for HTTP status codes
          if (error.message.includes("400")) {
            errorMessage =
              "Invalid file or plant type. Please check your selection and try again.";
            contextualIcon = "upload";
          } else if (error.message.includes("422")) {
            errorMessage =
              "The selected plant type or image format is not supported. Please try a different image or plant type.";
            contextualIcon = "upload";
          } else if (error.message.includes("408")) {
            errorMessage =
              "Analysis timeout. Please try again with a smaller image.";
            contextualIcon = "upload";
          } else if (error.message.includes("502")) {
            errorMessage =
              "Analysis service is temporarily unavailable. Please try again later.";
            contextualIcon = "network";
          } else if (error.message.includes("503")) {
            errorMessage =
              "Unable to connect to analysis service. Please check your internet connection and try again.";
            contextualIcon = "network";
          }
        }
      }

      toast.error("Analysis Failed", errorMessage, 5000, contextualIcon);

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

      {/* Upload Popup */}
      <UploadPopup
        isOpen={showUploadPopup}
        onClose={() => {
          console.log("Closing upload popup");
          setShowUploadPopup(false);
        }}
        onAnalyze={handlePopupAnalyze}
        isProcessing={localIsProcessing}
        initialImageData={initialImageData}
        selectedPlantType={selectedPlant}
      />

      <AnalysisLoadingPopup
        isOpen={showAnalysisLoading}
        plantType={selectedPlant}
        onClose={() => setShowAnalysisLoading(false)}
      />
    </section>
  );
}

export default Hero;
