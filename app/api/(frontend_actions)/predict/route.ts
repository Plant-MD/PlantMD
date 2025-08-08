export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import CureModel from "@/models/Cure";
import DiseaseModel from "@/models/Disease";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const diseaseName = searchParams.get("disease_name");
    const confidence = searchParams.get("confidence");

    if (!diseaseName) {
      return NextResponse.json(
        { success: false, message: "Provide disease_name in query" },
        { status: 400 }
      );
    }

    console.log("Searching for disease:", diseaseName);

    // Connect to database with retry logic
    let connectionAttempts = 0;
    const maxAttempts = 2;
    
    while (connectionAttempts < maxAttempts) {
      try {
        await dbConnect();
        break; // Connection successful, exit retry loop
      } catch (error: any) {
        connectionAttempts++;
        console.error(`Database connection attempt ${connectionAttempts} failed:`, error.message);
        
        if (connectionAttempts >= maxAttempts) {
          // Determine appropriate error message based on error type
          let errorMessage = "Database temporarily unavailable";
          let statusCode = 503;
          
          if (error.message?.includes('timeout')) {
            errorMessage = "Database connection timeout - please try again";
          } else if (error.message?.includes('not found')) {
            errorMessage = "Database configuration error";
            statusCode = 500;
          } else if (error.message?.includes('authentication') || error.message?.includes('authorization')) {
            errorMessage = "Database access error";
            statusCode = 500;
          }
          
          return NextResponse.json(
            { 
              success: false, 
              message: errorMessage,
              details: "The database is currently unavailable. Please try again later."
            },
            { status: statusCode }
          );
        }
        
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * connectionAttempts));
      }
    }

    // Search Disease collection by disease_name
    const disease = await DiseaseModel.findOne({
      disease_name: diseaseName
    }).lean();

    if (!disease) {
      console.log("Disease not found");
      return NextResponse.json(
        { success: false, message: "Disease not found" },
        { status: 404 }
      );
    }

    // Get related cure data using disease_id
    const cure = await CureModel.findOne({ disease_id: disease._id }).lean() || {};

    const perc = confidence ? Number(confidence) * 100 : 0;
    // Return combined disease and cure info
    return NextResponse.json(
      { success: true, disease, cure, confidence: perc},
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching disease and cure:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
