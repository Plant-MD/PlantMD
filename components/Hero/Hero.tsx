"use client";
<<<<<<< HEAD
import Link from "next/link";
import React, { useState, useEffect } from "react";
import DragOverComponent from "../shared/DragOver";
import Image from "next/image";
import { useImageUpload } from "@/hooks/useImageUpload";
import ProcessingPopup from "@/components/scan/ProcessingPopup";

function Hero() {
  // Scan section state
  const [isProcessing, setIsProcessing] = useState(false);
  const [showProcessingPopup, setShowProcessingPopup] = useState(false);
  const {
    selectedImage,
    setSelectedImage,
    isDragging,
    fileInputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInputChange,
    clearImage,
    browseFiles
  } = useImageUpload();

  // Helper function to convert base64 to blob
  function dataURLtoBlob(dataurl: string) {
    if (!dataurl) throw new Error('No image data provided');
    const arr = dataurl.split(',');
    const match = arr[0].match(/:(.*?);/);
    if (!match) throw new Error('Invalid data URL format');
    const mime = match[1];
    const bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) u8arr[i] = bstr.charCodeAt(i);
    return new Blob([u8arr], { type: mime });
  }

  // Debug logging for state changes
  useEffect(() => {
    console.log('Hero component - selectedImage changed:', selectedImage ? 'Image selected' : 'No image');
  }, [selectedImage]);

  useEffect(() => {
    console.log('Hero component - isProcessing changed:', isProcessing);
  }, [isProcessing]);

  useEffect(() => {
    console.log('Hero component - showProcessingPopup changed:', showProcessingPopup);
  }, [showProcessingPopup]);

  const handleFileDrop = (files: FileList) => {
    console.log("Files dropped or selected in Hero:", files);
    try {
      if (files.length > 0) {
        const file = files[0];
        console.log('Processing file:', file.name, file.type, file.size);
        
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            console.log('File read successfully, setting selectedImage');
            setSelectedImage(e.target?.result as string);
          };
          reader.onerror = (e) => {
            console.error('File reading error in Hero:', e);
          };
          reader.readAsDataURL(file);
        } else {
          console.error('Invalid file type:', file.type);
          alert('Please select a valid image file (JPG, PNG, WebP, etc.)');
        }
      }
    } catch (error) {
      console.error('Error in handleFileDrop:', error);
    }
  };

  const handleAnalyze = async () => {
    console.log('🔍 [HERO] handleAnalyze called');
    try {
      if (!selectedImage) {
        console.log('❌ [HERO] No image selected for analysis');
        console.error('No image selected for analysis');
        return;
      }
      
      console.log('✅ [HERO] Image found, setting processing state');
      setIsProcessing(true);
      setShowProcessingPopup(true);
      console.log('🎯 [HERO] Processing popup opened');
      
      // Don't automatically close the popup - let user control it
      // Removed the setTimeout that was closing the popup automatically
    } catch (error) {
      console.error('💥 [HERO] Error in handleAnalyze:', error);
      setIsProcessing(false);
      setShowProcessingPopup(false);
    }
  };

  const handleStartAnalysis = async (category: string) => {
    console.log('🚀 [HERO] handleStartAnalysis called with category:', category);
    if (!selectedImage) {
      console.log('❌ [HERO] No image selected for analysis');
      return;
    }
    console.log('✅ [HERO] Starting analysis process');
    setIsProcessing(true);
    try {
      console.log('📸 [HERO] Converting image to blob...');
      
      // Convert base64 image to Blob
      if (!selectedImage) throw new Error('No image selected');
      
      const imageBlob = dataURLtoBlob(selectedImage);
      console.log('✅ [HERO] Image blob created, size:', imageBlob.size, 'bytes');
      
      console.log('📦 [HERO] Creating FormData...');
      const formData = new FormData();
      formData.append('plant', category); // 'tomato' or 'corn'
      formData.append('file', imageBlob, 'plant-image.jpg');
      console.log('✅ [HERO] FormData created with plant:', category);

      console.log('🌐 [HERO] Sending request to /api/analyze...');
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      console.log('📡 [HERO] Response received, status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ [HERO] API Error:', response.status, errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }
      
      console.log('✅ [HERO] API request successful, parsing response...');
      // Parse response and redirect to diagnosis page
      const data = await response.json();
      console.log('📊 [HERO] API Response data:', data);
      
      if (data && data.predictions) {
        console.log('🎯 [HERO] Predictions found, encoding for URL...');
        const encoded = encodeURIComponent(JSON.stringify(data.predictions));
        console.log('🔗 [HERO] Redirecting to diagnosis page with predictions');
        window.location.href = `/diagnosis?predictions=${encoded}`;
        console.log('✅ [HERO] Navigation initiated');
        // Do not close the popup automatically
      } else {
        console.error('❌ [HERO] No predictions in response:', data);
        alert('No predictions returned from API.');
        // Do not close the popup
      }
    } catch (error) {
      console.error('💥 [HERO] Analysis failed:', error);
      alert('Failed to start analysis: ' + (error as Error).message);
      // Do not close the popup
    } finally {
      console.log('🏁 [HERO] Analysis process completed, setting isProcessing to false');
      setIsProcessing(false);
    }
  };

  const handleClearImage = () => {
    console.log('Clearing image in Hero component');
    try {
      clearImage();
    } catch (error) {
      console.error('Error clearing image:', error);
    }
  };
=======
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
>>>>>>> 95b30fb1578ab2214345ca531e6edd7792f94137

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

	const handlePopupAnalyze = (imageData: string, plantType: 'tomato' | 'corn') => {
		console.log('handlePopupAnalyze called with:', { hasImage: !!imageData, plantType });
		// Close the upload popup
		setShowUploadPopup(false);
		// Show the analysis loading popup
		setShowAnalysisLoading(true);
		// Trigger analysis with the selected plant type and image data
		handleAnalyzeWithImage(imageData, plantType);
	};

	const handleAnalyzeWithImage = async (imageData: string, plantType: 'tomato' | 'corn') => {
		console.log('handleAnalyzeWithImage called with:', { hasImage: !!imageData, plantType });

		if (!imageData) {
			console.error('No image available for analysis');
			setShowAnalysisLoading(false);
			return;
		}

		console.log('Starting analysis with image and plant type:', plantType);
		setLocalIsProcessing(true);

		const formData = new FormData();

		try {
			const blob = dataURLtoBlob(imageData);
			formData.append('file', blob, 'plant.jpg');
			formData.append('plant', plantType);

			console.log('Sending request to /api/analyze');

			// Start a minimum loading time promise
			const minLoadingTime = new Promise(resolve => setTimeout(resolve, 8000)); // 8 seconds minimum

			// Start the API request
			const apiRequest = fetch('/api/analyze', {
				method: 'POST',
				body: formData,
			});

			// Wait for both the API response AND minimum loading time
			const [response] = await Promise.all([apiRequest, minLoadingTime]);

			console.log('API response status:', response.status);

			if (!response.ok) {
				const errorText = await response.text();
				console.error('API error response:', errorText);
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			console.log('API response data:', data);

			if (data.success && data.predictions) {
				console.log('Redirecting to diagnosis page with predictions');
				// Close the loading popup before redirecting
				setShowAnalysisLoading(false);
				router.push(`/diagnosis?predictions=${encodeURIComponent(JSON.stringify(data.predictions))}&plant=${plantType}`);
			} else {
				console.error('Invalid response structure:', data);
				throw new Error('Invalid response from analysis service');
			}

		} catch (error) {
			console.error('Analysis failed:', error);
			alert('Analysis failed. Please try again.');
			setShowAnalysisLoading(false);
		} finally {
			setLocalIsProcessing(false);
		}
	};

	const dataURLtoBlob = (dataURL: string) => {
		const arr = dataURL.split(',');
		const mime = arr[0].match(/:(.*?);/)?.[1];
		const bstr = atob(arr[1]);
		let n = bstr.length;
		const u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], { type: mime });
	};

	const handleBrowseFilesClick = () => {
		// Just open the popup directly - no file processing in hero section
		setShowUploadPopup(true);
	};

	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// This function is no longer needed since we're not processing files in hero section
		// The popup will handle all file processing
	};
	const [initialImageData, setInitialImageData] = useState<string | null>(null);

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

<<<<<<< HEAD
          {/* Original Drag and Drop with enhanced functionality */}
          {!selectedImage ? (
            <DragOverComponent
              onDrop={handleFileDrop}
              title="Upload Plant Photo"
              subtitle="Get instant diagnosis & treatment"
              fileInputRef={fileInputRef}
            />
          ) : (
            <div className="w-full max-w-lg bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-sage/20 p-4 sm:p-8 shadow-xl mx-3 sm:mx-0 flex flex-col items-center">
              <img
                src={selectedImage}
                alt="Selected plant"
                className="w-full max-h-64 sm:max-h-96 object-contain rounded-xl sm:rounded-2xl shadow-lg mb-4"
                onError={(e) => console.error('Image load error:', e)}
              />
              <button
                onClick={handleAnalyze}
                disabled={isProcessing}
                className="w-full group relative inline-flex items-center justify-center px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-forest to-mint text-white text-base sm:text-lg font-bold rounded-lg sm:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden touch-manipulation mb-2"
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white mr-2 sm:mr-3"></span>
                    Processing...
                  </>
                ) : (
                  <>Analyze</>
                )}
              </button>
              <button
                onClick={handleClearImage}
                className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-white/60 backdrop-blur-sm text-primary-dark font-semibold rounded-lg sm:rounded-xl border border-sage/20 hover:bg-white/80 transition-all duration-300 touch-manipulation"
              >
                Choose Different Image
              </button>
            </div>
          )}

          {/* Hidden file input for the original DragOverComponent */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
            style={{ display: 'none' }}
          />

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
      </div>
      
      {/* Processing Popup */}
      <ProcessingPopup
        isOpen={showProcessingPopup}
        onClose={() => setShowProcessingPopup(false)}
        selectedImage={selectedImage}
        onStartAnalysis={handleStartAnalysis}
      />
    </section>
  );
=======
					<DragOverComponent
						onDrop={handleFileDrop}
						title="Upload Plant Photo"
						subtitle="Get instant diagnosis & treatment"
					/>

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
			</div>

			{/* Upload Popup */}
			<UploadPopup
				isOpen={showUploadPopup}
				onClose={() => setShowUploadPopup(false)}
				onAnalyze={handlePopupAnalyze}
				isProcessing={localIsProcessing}
				initialImageData={initialImageData}
				selectedPlantType={selectedPlant}
			/>


			{/* Analysis Loading Popup */}
			<AnalysisLoadingPopup
				isOpen={showAnalysisLoading}
				plantType={selectedPlant}
        onClose={() => setShowAnalysisLoading(false)}
			/>
		</section>
	);
>>>>>>> 95b30fb1578ab2214345ca531e6edd7792f94137
}

export default Hero;