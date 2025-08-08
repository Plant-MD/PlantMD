import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ThreadModel from "@/models/Thread";

export async function GET(
    request: NextRequest,
    { params }: { params: { threadId: string; mediaIndex: string } }
) {
    const { threadId, mediaIndex } = params;
    console.log(threadId)

    await dbConnect();

    try {
        // Cast the returned object to include the media array type
        const thread = (await ThreadModel.findById(threadId)
            .select("media")
            .lean()) as
            | { media: { data: Buffer; contentType: string }[] }
            | null;

        if (!thread) {
            return NextResponse.json({ message: "Thread not found" }, { status: 404 });
        }

        const index = parseInt(mediaIndex);
        if (isNaN(index) || index < 0 || index >= thread.media.length) {
            return NextResponse.json({ message: "Invalid media index" }, { status: 400 });
        }

        const mediaItem = thread.media[index];

        if (!mediaItem || !mediaItem.data) {
            return NextResponse.json({ message: "Media not found" }, { status: 404 });
        }

        return new Response(mediaItem.data.buffer, {
            status: 200,
            headers: {
                "Content-Type": mediaItem.contentType,
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (error) {
        console.error("Error fetching media:", error);
        return NextResponse.json({ message: "Error fetching media" }, { status: 500 });
    }
}
