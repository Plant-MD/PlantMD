import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('Analyze API route called');
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const plant = formData.get('plant') as string;

    console.log('Received request with plant type:', plant);
    console.log('File received:', file ? { name: file.name, size: file.size, type: file.type } : 'No file');

    if (!file) {
      console.error('No file provided in request');
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!plant || !['tomato', 'corn'].includes(plant)) {
      console.error('Invalid plant type:', plant);
      return NextResponse.json(
        { error: 'Invalid plant type. Must be either "tomato" or "corn"' },
        { status: 400 }
      );
    }

    if (!file.type.startsWith('image/')) {
      console.error('Invalid file type:', file.type);
      return NextResponse.json(
        { error: 'Invalid file type. Please upload an image.' },
        { status: 400 }
      );
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      console.error('File too large:', file.size);
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    const externalFormData = new FormData();
    externalFormData.append('file', file);

    const apiUrl = new URL('https://mandipsapkota-plantmd-pipeline.hf.space/predict');
    apiUrl.searchParams.append('plant', plant);

    console.log('Sending request to external API URL:', apiUrl.toString());

    const response = await fetch(apiUrl.toString(), {
      method: 'POST',
      body: externalFormData,
      signal: AbortSignal.timeout(30000),
    });

    console.log('External API response status:', response.status);

    if (!response.ok) {
      let errorDetails = '';
      try {
        const errorBody = await response.text();
        console.log('External API error body:', errorBody);
        errorDetails = errorBody;
      } catch (e) {
        console.log('Could not read error body');
      }

      console.error('External API error:', response.status, response.statusText, errorDetails);
      
      if (response.status === 422) {
        return NextResponse.json(
          { 
            error: 'The selected plant type or image format is not supported by the analysis service. Please try a different image or plant type.',
            details: errorDetails,
            status: response.status
          },
          { status: 422 }
        );
      }
      
      return NextResponse.json(
        { 
          error: `Analysis service unavailable. Please try again later. (${response.status})`,
          details: errorDetails
        },
        { status: 502 }
      );
    }

    const data = await response.json();
    console.log('External API response data:', data);

    if (!data.predictions || !Array.isArray(data.predictions)) {
      console.error('Invalid response structure from external API:', data);
      return NextResponse.json(
        { error: 'Invalid response from analysis service' },
        { status: 502 }
      );
    }

    // Validate and clean prediction data
    const validPredictions = data.predictions
      .filter((prediction: any) => {
        // Check if prediction has valid structure
        return prediction && 
               typeof prediction === 'object' &&
               'class' in prediction &&
               'confidence' in prediction &&
               typeof prediction.class === 'string' &&
               typeof prediction.confidence === 'number' &&
               prediction.class.trim().length > 0 &&
               prediction.confidence >= 0 &&
               prediction.confidence <= 1;
      })
      .map((prediction: any) => ({
        class: prediction.class.trim(),
        confidence: Math.min(Math.max(prediction.confidence, 0), 1) // Ensure confidence is between 0 and 1
      }))
      .slice(0, 3); // Limit to top 3 predictions

    if (validPredictions.length === 0) {
      console.error('No valid predictions found in external API response:', data.predictions);
      return NextResponse.json(
        { error: 'No valid disease predictions could be generated for this image. Please try a different image.' },
        { status: 502 }
      );
    }

    console.log('Successfully processed analysis, returning', validPredictions.length, 'valid predictions');
    return NextResponse.json({
      success: true,
      predictions: validPredictions,
      plant: plant,
      message: `${plant.charAt(0).toUpperCase() + plant.slice(1)} analysis completed successfully`
    });

  } catch (error) {
    console.error('API route error:', error);

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Analysis timeout. Please try again with a smaller image.' },
          { status: 408 }
        );
      }
      
      if (error.message.includes('fetch')) {
        return NextResponse.json(
          { error: 'Unable to connect to analysis service. Please try again later.' },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
