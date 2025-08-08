import dbConnect from "@/lib/dbConnect";
import CommentModel from "@/models/Comment";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const comments = await CommentModel.find({ threadId: params.threadId })
      .sort({ createdAt: -1 }); // newest first
    return NextResponse.json(comments, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  try {
    const { author, text } = await req.json();
    if (!author || !text.trim()) {
      return NextResponse.json({ error: "Missing author or text" }, { status: 400 });
    }

    await dbConnect();
    const newComment = await CommentModel.create({
      threadId: params.threadId,
      author,
      text,
      createdAt: new Date(),
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}
