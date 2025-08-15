"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, ArrowDown, Share2, MessageCircle, X } from "lucide-react";
import { ThreadDB } from "@/models/Thread";
import Image from "next/image";
import CommentsModal from "./CommentsModal";
import { useSession } from "next-auth/react";

function timeAgo(date: string | Date) {
  const now = new Date();
  const posted = new Date(date);
  const seconds = Math.floor((now.getTime() - posted.getTime()) / 1000);

  if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? "s" : ""} ago`;
}

export default function ThreadCard({ thread }: { thread: ThreadDB }) {
  const { data: session } = useSession();
  const userId = session?.user?._id;

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [comments, setComments] = useState<
    { _id: string; author: string; text: string; createdAt: string }[]
  >([]);
  const [loadingComments, setLoadingComments] = useState(false);

  const [voteStatus, setVoteStatus] = useState<"upvoted" | "downvoted" | null>(
    null
  );
  const [voteCount, setVoteCount] = useState(thread.vote);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const hasMedia = thread.media?.length > 0 && thread.media[0].contentType;

  async function fetchComments() {
    setLoadingComments(true);
    try {
      const res = await fetch(`/api/comments/${thread._id}`);
      if (!res.ok) throw new Error("Failed to fetch comments");
      const data = await res.json();
      setComments(data);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setLoadingComments(false);
    }
  }

  async function sendVote(vote: number) {
    if (!userId) {
      console.error("User not logged in");
      return;
    }
    try {
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          thread_id: thread._id,
          vote,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to vote");
      }
    } catch (error) {
      console.error("Vote error:", error);
      // Optionally revert UI or show error message here
    }
  }

  async function handleUpvote() {
    if (!userId) return;

    if (voteStatus === "upvoted") {
      setVoteStatus(null);
      setVoteCount(voteCount - 1);
      await sendVote(0);
    } else if (voteStatus === "downvoted") {
      setVoteStatus("upvoted");
      setVoteCount(voteCount + 2);
      await sendVote(1);
    } else {
      setVoteStatus("upvoted");
      setVoteCount(voteCount + 1);
      await sendVote(1);
    }
  }

  async function handleDownvote() {
    if (!userId) return;

    if (voteStatus === "downvoted") {
      setVoteStatus(null);
      setVoteCount(voteCount + 1);
      await sendVote(0);
    } else if (voteStatus === "upvoted") {
      setVoteStatus("downvoted");
      setVoteCount(voteCount - 2);
      await sendVote(-1);
    } else {
      setVoteStatus("downvoted");
      setVoteCount(voteCount - 1);
      await sendVote(-1);
    }
  }

  // Fetch comments when modal opens
  useEffect(() => {
    if (isCommentsOpen) {
      fetchComments();
    }
  }, [isCommentsOpen]);

  return (
    <>
      <div className="bg-white text-green-700 rounded-xl shadow-md p-2 sm:p-4 flex flex-col sm:flex-row gap-2 sm:gap-4 w-full max-w-full sm:max-w-3xl border border-gray-200 cursor-pointer hover:bg-gray-50">
        {/* Upvote Section */}
        <div className="flex flex-row sm:flex-col items-center gap-2 sm:gap-2 mb-2 sm:mb-0">
          <button
            onClick={handleUpvote}
            className={`hover:text-green-900 ${voteStatus === "upvoted" ? "text-green-900" : ""
              }`}
            aria-label="Upvote"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
          <span className="font-semibold">{voteCount}</span>
          <button
            onClick={handleDownvote}
            className={`hover:text-green-900 ${voteStatus === "downvoted" ? "text-green-900" : ""
              }`}
            aria-label="Downvote"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>

        {/* Main Thread Content */}
        <div className="flex flex-col w-full">
          {/* Title + Author */}
          <div className="flex flex-col justify-start">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-full overflow-hidden">
                <Image
                  src="/placeholder-user.jpg"
                  alt="avatar"
                  width={28}
                  height={28}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-xs text-gray-500">
                Threaded by {thread.author} · {timeAgo(thread.createdAt)}
              </p>
            </div>

            <div className="flex items-center justify-start gap-2 mb-2">
              <h2 className="text-xl font-extrabold font-roboto">{thread.title}</h2>
              <span className="text-xs bg-green-100 text-green-800 px-2 rounded font-medium">
                {thread.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <p className="mb-3 font-roboto text-left">{thread.content}</p>

          {/* Media Section */}
          {hasMedia && (
            <div
              className="rounded overflow-hidden border border-green-100 shadow-sm max-w-full max-h-72 cursor-pointer"
              onClick={() => setIsImageOpen(true)}
            >
              <img
                src={`data:${thread.media[0].contentType};base64,${thread.media[0].data}`}
                alt="Thread media"
                className="object-cover w-full h-full"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="buttons mt-2 flex gap-2">
            <button className="flex items-center gap-2 text-green-600 hover:text-green-800 border px-4 py-1 rounded-full font-roboto">
              <Share2 size={16} />
              Share
            </button>
            <button
              className="flex items-center gap-2 text-green-600 hover:text-green-800 border px-4 py-1 rounded-full font-roboto"
              onClick={() => setIsCommentsOpen(true)}
            >
              <MessageCircle size={16} />
              Reply
            </button>
          </div>

          {/* Comments Modal */}
          <CommentsModal
            isOpen={isCommentsOpen}
            onClose={() => setIsCommentsOpen(false)}
            comments={comments}
            loading={loadingComments}
            threadId={thread._id} // Pass the thread ID
            author={thread.author} // Pass the author
            refreshComments={fetchComments}
          />
        </div>
      </div>

      {/* Image Popup Modal */}
      {isImageOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={() => setIsImageOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-full p-4"
            onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
          >
            <button
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-75"
              onClick={() => setIsImageOpen(false)}
              aria-label="Close image popup"
            >
              <X size={24} />
            </button>
            <img
              src={`data:${thread.media[0].contentType};base64,${thread.media[0].data}`}
              alt="Thread media large"
              className="max-w-full max-h-[80vh] rounded"
            />
          </div>
        </div>
      )}
    </>
  );
}
