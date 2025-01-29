"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { MdKeyboardBackspace } from "react-icons/md";

const BackButton = () => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="project_button cursor-pointer">
      <MdKeyboardBackspace />
    </button>
  );
};

export default BackButton;
