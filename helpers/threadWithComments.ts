//helpers/threadWithComments.ts
import ThreadModel from "@/models/Thread";
import CommentModel from "@/models/Comment";

export async function getThreadWithComments(threadId: string) {
  const thread = await ThreadModel.findById(threadId).lean();
  if (!thread) throw new Error("Thread not found");

  const comments = await CommentModel.find({ threadId }).sort({ createdAt: 1 }).lean();

  return {
    ...thread,
    comments, // array of comment objects here
  };
}
