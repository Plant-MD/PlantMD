export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import CureModel from "@/models/Cure";
import DiseaseModel from "@/models/Disease";
import { MOCK_DISEASE_DATA } from "@/lib/mock/diseaseData";

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

    // Try to connect to database with single attempt (fallback to mock in dev if it fails)
    let connected = false;
    let lastConnectionError: any = null;
    const allowMock = process.env.USE_DB_MOCK === 'true' || process.env.NODE_ENV === 'development';

    try {
      await dbConnect();
      connected = true;
    } catch (error: any) {
      lastConnectionError = error;
      console.error('Database connection failed:', error?.message || error);
    }

    if (!connected) {
      if (allowMock) {
        const mock = MOCK_DISEASE_DATA[diseaseName as keyof typeof MOCK_DISEASE_DATA];
        if (!mock) {
          return NextResponse.json(
            { success: false, message: "Disease not found (mock)" },
            { status: 404 }
          );
        }
        const perc = confidence ? Number(confidence) * 100 : 0;
        return NextResponse.json(
          { success: true, disease: mock.disease, cure: mock.cure, confidence: perc },
          { status: 200 }
        );
      }

      // No mock allowed: return service unavailable with guidance
      const devDetails = process.env.NODE_ENV !== 'production' && lastConnectionError ? {
        error: lastConnectionError?.message || String(lastConnectionError),
        hint: 'Check IP Access List (Atlas), credentials, and URL-encoding of special chars in the URI.'
      } : undefined;
      return NextResponse.json({
        success: false,
        message: 'Database temporarily unavailable',
        details: 'Ensure MONGODB_URI (or DATABASE_URL/MONGODB_ATLAS_URI) is reachable.',
        ...devDetails,
      }, { status: 503 });
    }

    // Normalize disease name and try multiple lookup strategies to handle
    // different naming conventions between model outputs and DB documents
    const normalized = (str: string) => str.replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
    const nameInput = diseaseName;
    const nameSpaced = normalized(diseaseName);
    const codeGuess = nameSpaced
      .split(' ')
      .map(w => w[0])
      .join('')
      .toUpperCase(); // e.g., Tomato Yellow Leaf Curl Virus -> TYLCV

    let disease = await DiseaseModel.findOne({ disease_name: nameInput }).lean();

    if (!disease) {
      // Case-insensitive exact match on original
      disease = await DiseaseModel.findOne({ disease_name: { $regex: `^${nameInput}$`, $options: 'i' } }).lean();
    }

    if (!disease) {
      // Try with spaces instead of underscores
      disease = await DiseaseModel.findOne({ disease_name: nameSpaced }).lean();
    }

    if (!disease) {
      // Case-insensitive match on spaced variant
      disease = await DiseaseModel.findOne({ disease_name: { $regex: `^${nameSpaced}$`, $options: 'i' } }).lean();
    }

    if (!disease) {
      // Try matching by disease_code heuristic (e.g., TYLCV)
      disease = await DiseaseModel.findOne({ disease_code: codeGuess }).lean();
    }

    if (!disease) {
      // As a last resort, try to resolve via Cure collection's disease field
      const cureByName = await CureModel.findOne({ disease: { $in: [nameInput, nameSpaced] } }).lean();
      if (cureByName?.disease_id) {
        disease = await DiseaseModel.findById(cureByName.disease_id).lean();
      }
    }

    if (!disease) {
      console.log("Disease not found");
      return NextResponse.json(
        { success: false, message: "Disease not found" },
        { status: 404 }
      );
    }

    // Get related cure data using disease_id
    const cure = (await CureModel.findOne({ disease_id: disease._id }).lean()) ||
                 (await CureModel.findOne({ disease: { $in: [nameInput, nameSpaced] } }).lean()) ||
                 {};

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
