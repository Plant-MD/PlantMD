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
}

export default Hero;