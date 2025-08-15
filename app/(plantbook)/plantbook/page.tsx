"use client";

import React, { useEffect, useState } from "react";
import Search from "@/components/plantbook/Search";
import { AppSidebar } from "@/components/plantbook/Sidebar/Sidebar";
import ThreadCard from "@/components/plantbook/Thread";
import { useSession, signIn } from "next-auth/react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import { useRouter } from "next/navigation"

interface MediaItem {
  data: Buffer;          // Binary image data
  contentType: string;   // MIME type, e.g. "image/png"
}

interface Thread {
  _id: string;
  title: string;
  vote: number;
  content: string;
  media: MediaItem[]; 
    category: string;
  comments: string[];
  author: string;
  updatedAt: Date;
  createdAt: Date;
}

function PlantBook() {
  const { status } = useSession()
  const isAuthenticated = status === "authenticated"
  const router = useRouter()
  const [showAuthPopup, setShowAuthPopup] = useState(true)
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false)
      return
    }

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
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-green-800">
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex flex-row">
      <div className="flex-1">
        {isAuthenticated ? (
          <div className="min-h-screen flex flex-col px-2 pt-3 bg-white sm:px-4 sm:pt-5">
            <div className="flex flex-1 w-full px-0 sm:px-4 md:px-10">
              <div className="w-full max-w-full md:w-[850px] mx-auto bg-white rounded shadow-lg p-2 sm:p-4 md:p-6">
                <div className="p-2 sm:p-4 rounded shadow text-center text-green-800 flex flex-col gap-3">
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
        ) : (
          <div className="relative flex items-center justify-center min-h-[70vh]">
            {/* Glass blur overlay popup */}
            <Dialog
              open={showAuthPopup}
              onOpenChange={(open) => {
                setShowAuthPopup(open)
                if (!open) router.push('/')
              }}
            >
              <DialogContent
                className="bg-white rounded-xl shadow-2xl"
                style={{ backdropFilter: "blur(4px)" }}
              >
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl font-semibold text-forest-green">
                    Sign in required
                  </DialogTitle>
                </DialogHeader>
                <div className="text-center text-neutral-gray">
                  <p className="mb-6">Sign in to access and participate in the PlantBook community.</p>
                  <Button onClick={() => signIn('google')} className="bg-green-600 hover:bg-leaf-green text-white border-0">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign in with Google
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlantBook;
