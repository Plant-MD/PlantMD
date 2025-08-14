import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCamera } from '@/hooks/useCamera';
import { useImageUpload } from '@/hooks/useImageUpload';

// Updated type to match PlantSelector
type PlantType = "tomato" | "corn" | "rice" | "potato";

export const useHeroAnalysis = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const [isProcessing, setIsProcessing] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const [selectedPlant, setSelectedPlantState] = useState<PlantType | null>(null);

    const cameraHook = useCamera();
    const uploadHook = useImageUpload();

    // Load plant type from localStorage on component mount
    useEffect(() => {
        const storedPlantType = localStorage.getItem('selectedPlantType') as PlantType;
        if (storedPlantType && ['tomato', 'corn', 'rice', 'potato'].includes(storedPlantType)) {
            setSelectedPlantState(storedPlantType);
        }
    }, []);

    // Main setSelectedPlant function that handles both state and localStorage
    const setSelectedPlant = (plant: PlantType) => {
        console.log('Setting selected plant to:', plant);
        setSelectedPlantState(plant);
        localStorage.setItem('selectedPlantType', plant);
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

    const handleStartCamera = async () => {
        await cameraHook.startCamera();
        setShowCamera(true);
    };

    const handleStopCamera = () => {
        cameraHook.stopCamera();
        setShowCamera(false);
    };

    const handleCapturePhoto = (videoElement?: HTMLVideoElement) => {
        const imageDataUrl = cameraHook.capturePhoto(videoElement);
        if (imageDataUrl) {
            uploadHook.setSelectedImage(imageDataUrl);
            setShowCamera(false);
        }
    };

    const handleBrowseFiles = () => {
        uploadHook.browseFiles();
    };

    const handleAnalyze = async (plantType?: PlantType) => {
        const plantToAnalyze = plantType || selectedPlant;
        console.log('handleAnalyze called with plant type:', plantToAnalyze);

        if (!uploadHook.selectedImage) {
            console.error('No image available for analysis');
            return;
        }

        if (!plantToAnalyze) {
            console.error('No plant type selected for analysis');
            return;
        }

        console.log('Starting analysis with image and plant type:', plantToAnalyze);
        setIsProcessing(true);

        const formData = new FormData();

        try {
            const blob = dataURLtoBlob(uploadHook.selectedImage);
            formData.append('file', blob, 'plant.jpg');
            formData.append('plant', plantToAnalyze);

            console.log('Sending request to /api/analyze');
            const response = await fetch('/api/analyze', {
                method: 'POST',
                body: formData,
            });

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
                router.push(`/diagnosis?predictions=${encodeURIComponent(JSON.stringify(data.predictions))}&plant=${plantToAnalyze}`);
            } else {
                console.error('Invalid response structure:', data);
                throw new Error('Invalid response from analysis service');
            }

        } catch (error) {
            console.error('Analysis failed:', error);
            alert('Analysis failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleClearImage = () => {
        uploadHook.clearImage();
        setShowCamera(false);
    };

    const handleDismissError = () => {
        cameraHook.setCameraError(null);
    };

    return {
        session,
        isProcessing,
        showCamera,
        selectedPlant,
        setSelectedPlant, // This is the main function Hero.tsx needs

        cameraHook,
        uploadHook,

        handleStartCamera,
        handleStopCamera,
        handleCapturePhoto,
        handleBrowseFiles,
        handleAnalyze,
        handleClearImage,
        handleDismissError,
    };
};