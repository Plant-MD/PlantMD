'use client';

import React, { useState, useRef } from 'react';
import { X, Upload, Camera, Sparkles, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface UploadPopupProps {
	isOpen: boolean;
	onClose: () => void;
	onAnalyze: (imageData: string, plantType: 'tomato' | 'corn') => void;
	isProcessing?: boolean;
	initialImageData?: string | null;
	selectedPlantType: 'tomato' | 'corn';
}

const UploadPopup: React.FC<UploadPopupProps> = ({
	isOpen,
	onClose,
	onAnalyze,
	isProcessing = false,
	initialImageData = null,
	selectedPlantType
}) => {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isRendering, setIsRendering] = useState(false);
	const [showProgress, setShowProgress] = useState(false);
	const [step, setStep] = useState<'upload' | 'analysis'>('upload');

	// Update selectedImage when initialImageData changes
	React.useEffect(() => {
		if (initialImageData && isOpen) {
			setSelectedImage(initialImageData);
			// Start rendering animation immediately
			setIsRendering(true);
			setShowProgress(false);
			setUploadProgress(0);

			// Simulate rendering time (2 seconds)
			setTimeout(() => {
				setIsRendering(false);
				setShowProgress(true);

				// Start smooth progress animation
				const duration = 2000; // 2 seconds
				const steps = 100;
				const stepTime = duration / steps;

				let currentStep = 0;
				const progressInterval = setInterval(() => {
					currentStep++;
					const progress = Math.min((currentStep / steps) * 100, 100);
					setUploadProgress(progress);

					if (currentStep >= steps) {
						clearInterval(progressInterval);
					}
				}, stepTime);
			}, 2000);
		}
	}, [initialImageData, isOpen]);

	const handleFileSelect = (file: File) => {
		if (file && file.type.startsWith('image/')) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setSelectedImage(e.target?.result as string);
				setStep('analysis');

				// Start rendering animation immediately
				setIsRendering(true);
				setShowProgress(false);
				setUploadProgress(0);

				// Simulate rendering time (2 seconds)
				setTimeout(() => {
					setIsRendering(false);
					setShowProgress(true);

					// Start smooth progress animation
					const duration = 2000; // 2 seconds
					const steps = 100;
					const stepTime = duration / steps;

					let currentStep = 0;
					const progressInterval = setInterval(() => {
						currentStep++;
						const progress = Math.min((currentStep / steps) * 100, 100);
						setUploadProgress(progress);

						if (currentStep >= steps) {
							clearInterval(progressInterval);
						}
					}, stepTime);
				}, 2000);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleAnalyzeClick = () => {
		if (selectedImage) {
			console.log('Analyze button clicked with image and plant type:', selectedPlantType);
			onAnalyze(selectedImage, selectedPlantType);
		} else {
			console.error('No image selected for analysis');
		}
	};

	const handleClose = () => {
		setSelectedImage(null);
		setUploadProgress(0);
		setIsRendering(false);
		setShowProgress(false);
		setStep('upload');
		onClose();
	};

	const handleBrowseFiles = () => {
		const fileInput = document.createElement('input');
		fileInput.type = 'file';
		fileInput.accept = 'image/*';
		fileInput.style.display = 'none';
		document.body.appendChild(fileInput);

		fileInput.onchange = (e) => {
			const target = e.target as HTMLInputElement;
			if (target.files && target.files[0]) {
				handleFileSelect(target.files[0]);
			}
			document.body.removeChild(fileInput);
		};

		fileInput.click();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-300">
			<div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
				<Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-3xl overflow-hidden">
					{/* Mobile Layout - Vertical Stack */}
					<div className="flex flex-col lg:flex-row">
						{/* Image Preview Section */}
						<div className="w-full lg:w-1/2 bg-gray-50 p-4 sm:p-6 flex items-center justify-center min-h-[300px] lg:min-h-[400px]">
							{selectedImage ? (
								<div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg animate-in zoom-in-95 duration-500">
									{/* Plant Type Badge */}
									<div className="absolute top-3 left-3 z-10 animate-in slide-in-from-top-2 duration-500 delay-200">
										<Badge className="bg-green-100 text-green-800 border-green-200 px-3 py-1">
											<Leaf className="w-3 h-3 mr-1" />
											{selectedPlantType === 'tomato' ? 'Tomato' : 'Corn'}
										</Badge>
									</div>

									{isRendering ? (
										// Wavy rendering animation overlay
										<div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300">
											<div className="relative w-full h-full">
												{/* Wavy animation bars */}
												<div className="absolute bottom-0 left-0 w-full h-full mx-auto">
													<div className="wavy-render-bar bar-1"></div>
													<div className="wavy-render-bar bar-2"></div>
													<div className="wavy-render-bar bar-3"></div>
													<div className="wavy-render-bar bar-4"></div>
													<div className="wavy-render-bar bar-5"></div>
												</div>

												{/* Centered text */}
												<div className="absolute inset-0 flex items-center justify-center">
													<div className="text-center space-y-4 z-10 animate-in slide-in-from-bottom-4 duration-500">
														<div className="relative">
															<div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
															<div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 border-4 border-transparent border-t-green-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
														</div>
														<div className="text-white space-y-2">
															<p className="text-base sm:text-lg font-semibold animate-render-pulse">Processing Image...</p>
															<p className="text-xs sm:text-sm opacity-80">Preparing for analysis</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									) : null}
									<img
										src={selectedImage}
										alt={`Selected ${selectedPlantType} plant`}
										className={`w-full h-full object-cover object-center transition-opacity duration-500 ${isRendering ? 'opacity-30' : 'opacity-100'}`}
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
									<button
										onClick={() => {
											setSelectedImage(null);
											setStep('upload');
										}}
										className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2 bg-white/90 rounded-full hover:bg-white transition-colors animate-in slide-in-from-top-2 duration-500 delay-300"
									>
										<X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
									</button>
								</div>
							) : (
								<div className="w-full h-64 sm:h-80 lg:h-96 flex flex-col items-center justify-center animate-in fade-in duration-500">
									<div className="text-center space-y-6 max-w-sm">
										<div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-100 to-emerald-200 rounded-3xl flex items-center justify-center mx-auto animate-in zoom-in-95 duration-500 delay-200 shadow-lg">
											<Upload className="h-10 w-10 sm:h-12 sm:w-12 text-green-600" />
										</div>
										<div className="animate-in slide-in-from-bottom-2 duration-500 delay-300 space-y-3">
											<h3 className="text-xl sm:text-2xl font-bold text-gray-900">
												Upload Your Plant Image
											</h3>
											<p className="text-gray-600 text-sm sm:text-base leading-relaxed">
												Take a clear photo of your plant's leaves, stems, or any affected areas. Our AI will analyze it for diseases and provide treatment recommendations.
											</p>
											<div className="flex items-center justify-center space-x-4 text-xs text-gray-500 pt-2">
												<div className="flex items-center space-x-1">
													<div className="w-2 h-2 bg-green-400 rounded-full"></div>
													<span>Clear photo</span>
												</div>
												<div className="flex items-center space-x-1">
													<div className="w-2 h-2 bg-green-400 rounded-full"></div>
													<span>Good lighting</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>

						{/* Controls Section */}
						<div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 relative">
							{/* Close Button */}
							<button
								onClick={handleClose}
								className="absolute top-2 right-2 sm:top-4 sm:right-4 lg:top-6 lg:right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10 animate-in slide-in-from-top-2 duration-500"
							>
								<X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
							</button>

							{/* Content */}
							<div className="space-y-6 sm:space-y-8 pt-8 sm:pt-0">
								{step === 'upload' && (
									<div className="animate-in slide-in-from-right-4 duration-500">
										<div className="text-center space-y-4">
											<div className="space-y-3">
												<h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Ready to Diagnose?</h2>
												<p className="text-gray-600 text-base sm:text-lg leading-relaxed">
													Upload a photo of your plant and get instant AI-powered disease diagnosis with personalized treatment recommendations.
												</p>
											</div>

											<div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 sm:p-6 border border-green-100">
												<div className="space-y-3">
													<h3 className="text-lg font-semibold text-gray-900 text-center">What we can detect:</h3>
													<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
														<div className="flex items-center justify-start space-x-2">
															<div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
															<span className="text-left">Plant diseases</span>
														</div>
														<div className="flex items-center justify-start space-x-2">
															<div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
															<span className="text-left">Nutrient deficiencies</span>
														</div>
														<div className="flex items-center justify-start space-x-2">
															<div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
															<span className="text-left">Pest damage</span>
														</div>
														<div className="flex items-center justify-start space-x-2">
															<div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
															<span className="text-left">Growth issues</span>
														</div>
													</div>
												</div>
											</div>

											<Button
												onClick={handleBrowseFiles}
												className="w-full max-w-md mx-auto py-4 sm:py-5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold text-lg sm:text-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-in slide-in-from-bottom-2 duration-500 delay-200 transform hover:scale-105"
											>
												<Upload className="mr-3 h-5 w-5 sm:h-6 sm:w-6" />
												Choose Your Plant Photo
											</Button>

											<p className="text-xs text-gray-500">
												Supports JPG, PNG, and WebP formats up to 10MB
											</p>
										</div>
									</div>
								)}

								{step === 'analysis' && selectedImage && (
									<div className="animate-in slide-in-from-right-4 duration-500">
										<div className="text-center space-y-4">
											<div>
												<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Analysis Ready!</h2>
												<p className="text-gray-600 text-base sm:text-lg leading-relaxed">
													Your plant image has been processed. Click analyze to get detailed disease diagnosis and treatment recommendations.
												</p>
											</div>

											{/* Status Indicator */}
											{!isRendering && (!showProgress || uploadProgress >= 100) && (
												<div className="flex items-center justify-center space-x-2 text-green-600 animate-in slide-in-from-left-2 duration-500 delay-200">
													<div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
													<span className="text-base font-medium">
														Image Ready for Analysis
													</span>
												</div>
											)}

											{/* Upload Progress */}
											{showProgress && (
												<div className="space-y-3 animate-in slide-in-from-bottom-2 duration-500 delay-400">
													<div className="flex justify-between text-sm">
														<span className="text-gray-600 font-medium">Processing Image</span>
														<span className="text-green-600 font-semibold">{Math.round(uploadProgress)}%</span>
													</div>
													<div className="relative">
														<div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
															<div
																className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-300 ease-out relative"
																style={{ width: `${uploadProgress}%` }}
															>
																<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-progress-shimmer"></div>
															</div>
														</div>
													</div>
													{uploadProgress >= 100 && (
														<div className="text-center">
															<div className="inline-flex items-center text-green-600 text-sm font-medium">
																<div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
																Processing Complete
															</div>
														</div>
													)}
												</div>
											)}

											{/* Analyze Button */}
											<Button
												onClick={handleAnalyzeClick}
												disabled={isProcessing || isRendering || (showProgress && uploadProgress < 100)}
												className="w-full max-w-md mx-auto py-4 sm:py-5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold text-lg sm:text-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed animate-in slide-in-from-bottom-2 duration-500 delay-500 transform hover:scale-105"
											>
												{isProcessing ? (
													<>
														<div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white mr-3" />
														Analyzing Plant...
													</>
												) : isRendering || (showProgress && uploadProgress < 100) ? (
													<>
														<div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white mr-3" />
														Processing Image...
													</>
												) : (
													<>
														<Sparkles className="mr-3 h-5 w-5 sm:h-6 sm:w-6" />
														Start Analysis
													</>
												)}
											</Button>

											{/* Choose Different Image Button */}
											<Button
												onClick={() => {
													setSelectedImage(null);
													setUploadProgress(0);
													setIsRendering(false);
													setShowProgress(false);
													setStep('upload');
												}}
												variant="outline"
												className="w-full max-w-md mx-auto py-3 sm:py-4 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors animate-in slide-in-from-bottom-2 duration-500 delay-600"
											>
												<Upload className="mr-2 h-4 w-4" />
												Choose Different Image
											</Button>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default UploadPopup; 