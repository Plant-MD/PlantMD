"use client";

import React, { useEffect, useState, useRef } from "react";
import { Upload, Hash, X, ImageIcon } from "lucide-react";

type CreatePostModalProps = {
  onClose: () => void;
};

export default function CreatePostModal({ onClose }: CreatePostModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  /** Close modal with ESC key */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  /** Extract hashtags whenever description changes */
  useEffect(() => {
    const hashtags = description.match(/#\w+/g) || [];
    setTags([...new Set(hashtags.map((tag) => tag.slice(1)))]);
  }, [description]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) =>
      setUploadedImage(event.target?.result as string);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePost = () => {
    console.log({
      title,
      description,
      image: uploadedImage,
      tags,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ backdropFilter: "blur(4px)" }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Modal content */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 flex flex-col w-full max-w-2xl h-[70vh] mx-auto bg-white rounded-xl shadow-2xl transform transition-all duration-200 ease-out"
      >
        <ModalHeader onClose={onClose} />
        <ModalContent
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          uploadedImage={uploadedImage}
          handleImageUpload={handleImageUpload}
          removeImage={removeImage}
          fileInputRef={fileInputRef}
          tags={tags}
        />
        <ModalFooter
          onCancel={onClose}
          onPost={handlePost}
          disabled={!title.trim()}
        />
      </div>
    </div>
  );
}

function ModalHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900">Create a post</h2>
      <button
        onClick={onClose}
        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

type ModalContentProps = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  uploadedImage: string | null;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  tags: string[];
};

function ModalContent({
  title,
  setTitle,
  description,
  setDescription,
  uploadedImage,
  handleImageUpload,
  removeImage,
  fileInputRef,
  tags,
}: ModalContentProps) {
  return (
    <div className="flex-1 p-6 space-y-4 overflow-y-auto">
      {/* Title */}
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={300}
          className="w-full text-lg font-medium border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
        />
        <div className="text-right text-xs text-gray-500 mt-1">
          {title.length}/300
        </div>
      </div>

      {/* Description with hashtags */}
      <HashtagTextarea
        value={description}
        onChange={setDescription}
      />

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Hash className="w-4 h-4 text-gray-500 mt-1" />
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Image Upload */}
      <div>
        {!uploadedImage ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all group"
          >
            <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-green-500" />
            <p className="text-gray-600 font-medium mb-1 text-sm">
              Upload an image
            </p>
            <p className="text-xs text-gray-500">
              Drag and drop or click to select
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        ) : (
          <div className="relative">
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="w-full max-h-32 object-cover rounded-lg"
            />
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function HashtagTextarea({
  value,
  onChange,
}: {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Text (optional)"
        rows={4}
        className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 resize-none transition-all"
        style={{
          background: "transparent",
          color: "transparent",
          caretColor: "black",
        }}
      />
      <div
        className="absolute top-0 left-0 px-3 py-2 pointer-events-none whitespace-pre-wrap break-words"
        style={{ font: "inherit", lineHeight: "inherit" }}
      >
        {value.split(/(#\w+)/g).map((part, idx) =>
          part.startsWith("#") ? (
            <span
              key={idx}
              className="text-blue-500 font-medium bg-blue-50 px-1 rounded"
            >
              {part}
            </span>
          ) : (
            <span key={idx} className="text-gray-900">
              {part}
            </span>
          )
        )}
      </div>
    </div>
  );
}

function ModalFooter({
  onCancel,
  onPost,
  disabled,
}: {
  onCancel: () => void;
  onPost: () => void;
  disabled: boolean;
}) {
  return (
    <div className="flex justify-between items-center p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
      <div className="text-xs text-gray-500">Remember the human</div>
      <div className="flex space-x-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onPost}
          disabled={disabled}
          className="px-4 py-2 rounded-full text-sm font-medium bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Post
        </button>
      </div>
    </div>
  );
}
