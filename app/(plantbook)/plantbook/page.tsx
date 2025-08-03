import React from 'react';
import Search from '@/components/plantbook/Search';
import { AppSidebar } from '@/components/plantbook/Sidebar/Sidebar';
import ThreadCard from '@/components/plantbook/Thread';
function Community() {
  const postData = {
    _id: "example-id",
    title: "Example Thread",
    vote: 10,
    content: "Here’s the content of the thread.",
    media: ["https://example.com/image.jpg"],
    category: "general",
    children: [],
    parent: null,
    author: "user123",
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    // Add other required properties with placeholder values as needed
  };


  return (
    <div className="min-h-screen flex flex-col px-4 pt-5 bg-white">

      {/* Main flex layout */}
      <div className="flex flex-1 w-full px-10">

        {/* Center content */}
        <div className="w-[850px] mx-auto bg-white rounded shadow-lg p-6">
          {/* Replace with your main community content */}
          <div className="p-4 rounded shadow text-center text-green-800 flex flex-col gap-3">
            <ThreadCard thread={postData} />
            <ThreadCard thread={postData} />
            <ThreadCard thread={postData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;
