import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import dbConnect from "@/lib/dbConnect";
import ThreadModel, { Thread } from "@/models/Thread";

export async function POST(request: NextRequest) {
    await dbConnect();

    try {
        const threadSchema = z.object({
            title: z.string().min(1, "Title is required"),
            content: z.string().min(1, "Content is required"),
            media: z.array(z.string()).default([]),
            category: z.string().min(1, "Category is required"),
            parent: z.string().min(1, "Parent thread ID is required"),
            author: z.string().min(1, "Author is required")
        });

        const parseResult = threadSchema.safeParse(await request.json());

        if (!parseResult.success) {
            const errorMessages = Object.values(parseResult.error.format())
                .filter((e) => Array.isArray(e))
                .flat()
                .join(", ");
            return NextResponse.json(
                { success: false, message: errorMessages || "Invalid input data" },
                { status: 400 }
            );
        }

        const { title, content, media, category, parent, author } = parseResult.data;

        // Ensure parent thread exists
        const parentThread = await ThreadModel.findById(parent);
        if (!parentThread) {
            return NextResponse.json(
                { success: false, message: "Parent thread not found" },
                { status: 404 }
            );
        }

        // Create reply thread
        const replyThread: Thread = new ThreadModel({
            title,
            vote: 0,
            content,
            media,
            category,
            children: [],
            parent,
            author
        });

        const savedThread = await replyThread.save();

        // Append reply ID to parent
        parentThread.children.push(savedThread._id.toString() );
        
        await parentThread.save();

        return NextResponse.json(
            {
                success: true,
                message: "Reply created successfully",
                reply_id: replyThread._id
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("Error creating reply:", error);
        return NextResponse.json(
            { success: false, message: "Failed to create reply" },
            { status: 500 }
        );
    }
}
