"use client";

import { useState } from "react";

type Comment = {
  _id: string;
  author: string;
  text: string;
  createdAt: string;
};

type CommentsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
  threadId: string;
  author: string;
  refreshComments: () => void;
  loading?: boolean;
};

export default function CommentsModal({
  isOpen,
  onClose,
  comments,
  threadId,
  author,
  refreshComments,
  loading,
}: CommentsModalProps) {
  const [newComment, setNewComment] = useState("");
  const [sending, setSending] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!newComment.trim()) return;
    setSending(true);
    try {
      const res = await fetch(`/api/post_comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author,
          text: newComment.trim(),
          threadId,
        }),
      });
      if (!res.ok) throw new Error("Failed to post comment");

      setNewComment("");
      await refreshComments();
    } catch (err) {
      console.error(err);
      alert("Could not post comment");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Comments</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
          {loading ? (
            <p>Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="border-b border-gray-200 pb-2">
                <p className="text-sm font-semibold">{comment.author}</p>
                <p className="text-gray-700">{comment.text}</p>
                <p className="text-xs text-gray-400">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <button
            onClick={handleSend}
            disabled={sending}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {sending ? "Posting..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
