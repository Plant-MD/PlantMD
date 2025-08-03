import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { ThreadDB } from "@/models/Thread";
import Image from "next/image";
import { Share2, MessageCircle } from "lucide-react";


// Helper function to format time ago
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
  return (
    <div className="bg-white text-green-700 rounded-xl shadow-md p-4 flex gap-4 w-full max-w-3xl border border-gray-200 cursor-pointer hover:bg-gray-50">
      {/* Upvote Section */}
      <div className="flex flex-col items-center gap-2">
        <button className="hover:text-green-900">
          <ArrowUp className="w-5 h-5" />
        </button>
        <span className="font-semibold">{thread.vote}</span>
        <button className="hover:text-green-900">
          <ArrowDown className="w-5 h-5" />
        </button>
      </div>

      {/* Main Thread Content */}
      <div className="flex flex-col w-full">
        {/* Title */}
        <div className="flex flex-col justify-start">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-full overflow-hidden">
              <Image
                src="/default_avatar.jpg"
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
        {thread.media && thread.media.length > 0 && (
          <div className="rounded overflow-hidden border border-green-100 shadow-sm max-w-full max-h-72">
            <img
              src={"https://i.redd.it/tapey6z6o5gf1.jpeg"}
              alt="Thread media"
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="buttons mt-2 flex gap-2">
          <button className="flex items-center gap-2 text-green-600 hover:text-green-800 border px-4 py-1 rounded-full font-roboto">
            <Share2 size={16} />
            Share
          </button>
          <button className="flex items-center gap-2 text-green-600 hover:text-green-800 border px-4 py-1 rounded-full font-roboto">
            <MessageCircle size={16} />
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}
