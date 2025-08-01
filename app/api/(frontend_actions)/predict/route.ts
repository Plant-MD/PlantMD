export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import CureModel from "@/models/Cure";
import DiseaseModel from "@/models/Disease";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

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

    // Check if database is connected before querying
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      console.log("Database not connected, returning fallback data");
      // Return fallback data structure
      const perc = confidence ? Number(confidence) * 100 : 0;
      return NextResponse.json({
        success: true,
        disease: {
          _id: 'fallback-id',
          disease_code: 'N/A',
          disease_name: diseaseName.replace(/_/g, ' '),
          scientific_name: 'Unknown',
          common_plants: ['Unknown'],
          category: 'Unknown',
          risk_factor: 'Unknown'
        },
        cure: {
          _id: 'fallback-cure-id',
          disease_id: 'fallback-id',
          disease: diseaseName.replace(/_/g, ' '),
          cure: ['Treatment information not available'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        confidence: perc
      }, { status: 200 });
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