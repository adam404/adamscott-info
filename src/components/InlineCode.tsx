"use client";

import { useState } from "react";

interface InlineCodeProps {
  children: React.ReactNode;
}

export default function InlineCode({ children }: InlineCodeProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    if (typeof children === "string") {
      try {
        await navigator.clipboard.writeText(children);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  return (
    <code
      onClick={copyToClipboard}
      className="relative rounded bg-[#1e1e1e] px-[0.4rem] py-[0.2rem] font-mono text-sm cursor-pointer hover:bg-[#2d2d2d] group"
      title="Click to copy"
    >
      {children}
      <span
        className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 transition-opacity ${
          isCopied ? "opacity-100" : "group-hover:opacity-100"
        }`}
      >
        {isCopied ? "Copied!" : "Copy"}
      </span>
    </code>
  );
}
