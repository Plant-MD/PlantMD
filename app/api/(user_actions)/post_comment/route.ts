import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import CommentModel from '@/models/Comment';

export async function GET(request: NextRequest, { params }: { params: { threadId: string } }) {
  const { threadId } = params;

  if (!threadId) {
    return NextResponse.json({ message: 'Invalid threadId' }, { status: 400 });
  }

  try {
    await dbConnect();
    const comments = await CommentModel.find({ threadId }).sort({ createdAt: 1 }).lean();
    return NextResponse.json(comments);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { threadId: string } }) {
  const { threadId } = params;

  if (!threadId) {
    return NextResponse.json({ message: 'Invalid threadId' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { author, text } = body;

    if (!author || !text || typeof text !== 'string') {
      return NextResponse.json({ message: 'Missing or invalid fields' }, { status: 400 });
    }

    await dbConnect();
    const newComment = await CommentModel.create({
      threadId,
      author,
      text,
      createdAt: new Date(),
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
