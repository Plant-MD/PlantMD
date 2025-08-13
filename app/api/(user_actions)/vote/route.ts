import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import dbConnect from "@/lib/dbConnect";
import ThreadModel from "@/models/Thread";
import VoteModel from "@/models/Vote";

// Force this route to be dynamic (not prerendered)
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    await dbConnect(); // Ensure DB connection

    try {
        // Validate request body
        const bodySchema = z.object({
            user_id: z.string().min(1, "User ID is required"),
            thread_id: z.string().min(1, "Thread ID is required"),
            vote: z.number().int().min(-1).max(1)
        });

        const parseResult = bodySchema.safeParse(await request.json());

        if (!parseResult.success) {
            const errorMessages = Object.values(parseResult.error.format())
                .filter((e) => Array.isArray(e))
                .flat()
                .join(", ");
            return NextResponse.json(
                { success: false, message: errorMessages || "Invalid input" },
                { status: 400 }
            );
        }

        const { user_id, thread_id, vote } = parseResult.data;

        // Check if thread exists
        const thread = await ThreadModel.findById(thread_id);
        if (!thread) {
            return NextResponse.json(
                { success: false, message: "Thread not found" },
                { status: 404 }
            );
        }

        // Check existing vote
        const existingVote = await VoteModel.findOne({ user_id, thread_id });
        const oldVote = existingVote?.vote || 0;

        // Upsert vote
        const updatedVote = await VoteModel.findOneAndUpdate(
            { user_id, thread_id },
            { $set: { vote } },
            { upsert: true, new: true }
        );

        const voteDiff = vote - oldVote;

        // Update thread vote count only if it changed
        if (voteDiff !== 0) {
            const newTotalVote = (thread.vote ?? 0) + voteDiff;
            await ThreadModel.updateOne(
                { _id: thread_id },
                { $set: { vote: newTotalVote } }
            );
        }

        return NextResponse.json(
            { success: true, message: "Vote updated successfully" },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("Error voting:", error);
        return NextResponse.json(
            { success: false, message: "Failed to cast vote" },
            { status: 500 }
        );
    }
}