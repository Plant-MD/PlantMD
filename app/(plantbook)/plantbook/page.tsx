"use client";

import React, { useEffect, useState } from "react";
import Search from "@/components/plantbook/Search";
import { AppSidebar } from "@/components/plantbook/Sidebar/Sidebar";
import ThreadCard from "@/components/plantbook/Thread";

interface Thread {
  _id: string;
  title: string;
  vote: number;
  content: string;
  media: { base64: string; contentType: string }[];
  category: string;
  comments: string[];
  author: string;
  updatedAt: string;
  createdAt: string;
}

function Community() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const res = await fetch("/api/get_posts");
        const data = await res.json();
        if (data.success) {
          setThreads(data.threads);
        } else {
          console.error("Error fetching threads:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch threads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-green-800">
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col px-4 pt-5 bg-white">
      <div className="flex flex-1 w-full px-10">
        <div className="w-[850px] mx-auto bg-white rounded shadow-lg p-6">
          <div className="p-4 rounded shadow text-center text-green-800 flex flex-col gap-3">
            {threads.length > 0 ? (
              threads.map((thread) => (
                <ThreadCard key={thread._id} thread={thread} />
              ))
            ) : (
              <p>No posts found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;
