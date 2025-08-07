"use client";

import React, { useState } from "react";
import Image from "next/image";

type Comment = {
    id: string;
    author: string;
    text: string;
    createdAt: string; // ISO string
};

type CommentsModalProps = {
    isOpen: boolean;
    onClose: () => void;
    comments: Comment[];
};

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

export default function CommentsModal({
    isOpen,
    onClose,
    comments,
}: CommentsModalProps) {
    const [newComment, setNewComment] = useState("");

    const handleSend = () => {
        if (!newComment.trim()) return;

        // This is where you would handle sending the comment to your server.
        console.log("Sending comment:", newComment);

        // Clear input
        setNewComment("");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-white/30">
            <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 space-y-4 overflow-y-auto max-h-[80vh]">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Comments</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800"
                    >
                        ✕
                    </button>
                </div>

                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="flex items-start gap-4 border-b border-gray-100 pb-4 mb-4 last:border-none last:pb-0 last:mb-0"
                    >
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 items-center justify-center">
                            <Image
                                src="/default_avatar.jpg"
                                alt={comment.author}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Comment Content */}
                        <div className="flex flex-col text-left">
                            <div className="text-sm flex items-center gap-2 font-semibold text-gray-900">
                                {comment.author}
                                <div className="text-xs text-gray-400">
                                    {timeAgo(comment.createdAt)}
                                </div>
                            </div>
                            <div className="text-gray-600 text-sm mb-1">{comment.text}</div>

                            <button className="text-xs text-left text-green-600 mt-1 hover:underline">
                                Reply
                            </button>
                        </div>
                    </div>
                ))}

                {/* Add Comment Field */}
                <div className="pt-4 border-t border-gray-200">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        rows={3}
                    />
                    <button
                        onClick={handleSend}
                        className="mt-2 px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
