"use client";

import React, { useState } from "react";
import CreatePostModal from "./CreatePostModal";
import { PenIcon } from "lucide-react";

export default function CreatePostButton() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="bg-white text-deep-mint px-4 font-sans border-2 border-deep-mint py-2 flex justify-center gap-2 items-center  transition mb-8"
      >
        Create
      </button>
      {isOpen && <CreatePostModal onClose={closeModal} />}
    </>
  );
}