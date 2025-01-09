"use client";

import { useState } from "react";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
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
    <div className="relative group">
      <button
        onClick={copyToClipboard}
        className={`copy-button ${isCopied ? "copied" : ""}`}
        aria-label="Copy code"
      >
        {isCopied ? "Copied!" : "Copy"}
      </button>
      <pre className={className}>
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
}
