import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import dbConnect from "@/lib/dbConnect";
import ThreadModel from "@/models/Thread";

export async function POST(request: NextRequest) {
    await dbConnect(); 
    try {
        const {
            title,
            vote,
            content,
            media,
            category,
            children,
            parent,
            author
        } = await request.json();

        const threadSchema = z.object({
            title: z.string().min(1, "Title is required"),
            vote: z.number().default(0),
            content: z.string().min(1, "Content is required"),
            media: z.array(z.string()).default([]),
            category: z.string().min(1, "Category is required"),
            children: z.array(z.string()).default([]),
            parent: z.string().nullable(),
            author: z.string().min(1, "Author is required")
        });

        const result = threadSchema.safeParse({
            title,
            vote,
            content,
            media,
            category,
            children,
            parent,
            author
        });

        if (!result.success) {
            const errors = result.error.format();
            const errorMessages = Object.values(errors)
                .filter((e) => Array.isArray(e))
                .flat()
                .join(', ');

            return NextResponse.json(
                { success: false, message: errorMessages || "Invalid input data" },
                { status: 400 }
            );
        }

        const thread = new ThreadModel(result.data);
        await thread.save();

        return NextResponse.json(
            { success: true, message: "Thread created successfully" },
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
