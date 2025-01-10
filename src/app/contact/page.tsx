"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="bg-background min-h-screen relative isolate overflow-hidden">
      <Navigation forceWhiteBackground />
      <div className="min-h-screen relative overflow-hidden">
        {/* Background - using SVG directly instead of Image component */}
        <div
          className="absolute inset-0 z-0"
          dangerouslySetInnerHTML={{
            __html: `
              <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice"
                   xmlns="http://www.w3.org/2000/svg"
                   xmlns:xlink="http://www.w3.org/1999/xlink"
                   version="1.1">
                <defs>
                  <linearGradient id="bg-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#4a9eff">
                      <animate
                        attributeName="stop-color"
                        values="#4a9eff;#2d7fff;#4a9eff"
                        dur="8s"
                        repeatCount="indefinite"/>
                    </stop>
                    <stop offset="100%" stop-color="#00ffcc">
                      <animate
                        attributeName="stop-color"
                        values="#00ffcc;#00e6b8;#00ffcc"
                        dur="8s"
                        repeatCount="indefinite"/>
                    </stop>
                  </linearGradient>
                  <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4a9eff" stroke-width="0.5" opacity="0.2">
                      <animate
                        attributeName="stroke-dasharray"
                        values="0,43;43,0"
                        dur="3s"
                        repeatCount="indefinite"/>
                    </path>
                  </pattern>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#bg-gradient)" opacity="0.15"/>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)">
                  <animate
                    attributeName="opacity"
                    values="0.2;0.3;0.2"
                    dur="4s"
                    repeatCount="indefinite"/>
                </rect>
              </svg>
            `,
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto p-4 pt-32 md:pt-40 space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Get in Touch
          </h1>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Contact Information */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Let's Connect</h2>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <Link
                    href="https://github.com/adam404"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    github.com/adam404
                  </Link>
                </div>

                <div className="flex items-center space-x-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <Link
                    href="https://linkedin.com/in/adam404"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    linkedin.com/in/adam404
                  </Link>
                </div>

                <div className="flex items-center space-x-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                  <Link
                    href="https://twitter.com/adam404"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    @adam404
                  </Link>
                </div>

                <div className="flex items-center space-x-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href="mailto:adam404@gmail.com"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    adam404@gmail.com
                  </a>
                </div>

                <div className="flex items-center space-x-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <a
                    href="/adam-scott-cv.pdf"
                    download
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    Download CV
                    <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      PDF
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

              {status === "success" && (
                <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                  Thank you for your message! I'll get back to you soon.
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                  Sorry, there was an error sending your message. Please try
                  again.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-2 border rounded-lg bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-2 border rounded-lg bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
