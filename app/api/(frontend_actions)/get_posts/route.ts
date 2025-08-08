import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ThreadModel from "@/models/Thread";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const threads = await ThreadModel.find({})
      .sort({  createdAt: -1 }) // Highest votes first, then newest
      .limit(10)
      .lean();

    return NextResponse.json(
      { success: true, threads: threads },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching top threads:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch top threads" },
      { status: 500 }
    );
  }
}
