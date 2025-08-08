"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";

interface DragOverComponentProps {
  onDrop: (files: FileList) => void;
  title?: string;
  subtitle?: string;
  className?: string;
}

function DragOverComponent({
  onDrop,
  title = "Upload Plant Photo",
  subtitle = "Get instant diagnosis & treatment",
  className = "",
}: DragOverComponentProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  // Handle drag-and-drop events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onDrop(files);
    }
  };

  // Handle file input for "Select Image" button
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onDrop(files);
    }
  };

  return (
    <div
      className={`group mx-auto max-w-md transition-all duration-300 ${isDragOver ? "scale-105" : "hover:scale-102"
        } ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div
        className={`relative rounded-2xl border-[2px] border-mint bg-white/95 p-8 md:px-[100px] shadow-lg backdrop-blur-sm transition-all duration-300
    ${isDragOver
            ? "border-mint bg-green-50/50 shadow-xl"
            : "border-forest-green hover:border-mint hover:shadow-xl"}
       `}
      >

        {/* Upload Icon and Text */}
        <div className="mb-6 text-center">
          <h3 className="mb-2 text-xl font-extrabold text-gray-900 ">{isDragOver ? "Drop Your Image" : title}</h3>
          <p className="text-md text-gray-600 font-roboto">{subtitle}</p>
        </div>

        {/* Upload Buttons */}
        <div className="flex flex-col gap-4">
          <Button
            variant="outline"
            size="lg"
            className="rounded-xl border-2  py-3 font-semibold text-forest border-leaf-green hover:border-mint  transition-all duration-300"
            onClick={() => alert("Camera functionality requires native app support.")}
          >

            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Take Photo
          </Button>
          <label htmlFor="file-upload">
            <Button
              size="lg"
              className="rounded-xl w-full cursor-pointer bg-gradient-to-r from-green-600 to-emerald-600 py-3 font-semibold text-white shadow-md hover:from-green-700 hover:to-emerald-700 hover:shadow-lg transition-all duration-300"
              asChild
            >
              <span>
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Select Image
              </span>
            </Button>
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>

        {/* Drag and Drop Prompt */}
        <p className="mt-4 text-center text-sm text-gray-500">or drag and drop here</p>
      </div>
    </div>
  );
}

export default DragOverComponent;