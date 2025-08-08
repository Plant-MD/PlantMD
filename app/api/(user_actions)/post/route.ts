import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import dbConnect from "@/lib/dbConnect";
import ThreadModel from "@/models/Thread";

const mediaItemSchema = z.object({
  base64: z.string(),
  contentType: z.string()
});

const threadSchema = z.object({
  title: z.string().min(1, "Title is required"),
  vote: z.number().default(0),
  content: z.string().min(1, "Content is required"),
  media: z.array(mediaItemSchema).default([]),
  category: z.string().min(1, "Category is required"),
  children: z.array(z.string()).default([]),
  parent: z.string().nullable(),
  author: z.string().min(1, "Author is required")
});

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const json = await request.json();

    const result = threadSchema.safeParse(json);

    if (!result.success) {
      const errors = result.error.format();
      const errorMessages = Object.values(errors)
        .filter((e) => Array.isArray(e))
        .flat()
        .join(", ");

      return NextResponse.json(
        { success: false, message: errorMessages || "Invalid input data" },
        { status: 400 }
      );
    }

    // Convert media base64 strings to Buffer
    const media = result.data.media.map(({ base64, contentType }) => {
      // base64 might have prefix "data:image/png;base64,..."
      const base64Data = base64.replace(/^data:.+;base64,/, "");
      return {
        data: Buffer.from(base64Data, "base64"),
        contentType
      };
    });

    const thread = new ThreadModel({
      ...result.data,
      media
    });

    await thread.save();

    return NextResponse.json(
      { success: true, message: "Thread created successfully", threadId: thread._id },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error creating thread:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create thread" },
      { status: 500 }
    );
  }
}
