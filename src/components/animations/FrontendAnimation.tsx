"use client";

import { useEffect, useRef } from "react";

interface FrontendAnimationProps {
  className?: string;
}

export default function FrontendAnimation({
  className = "",
}: FrontendAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Animation variables
    let frame = 0;
    const elements: {
      x: number;
      y: number;
      size: number;
      color: string;
      speed: number;
    }[] = [];

    // Create floating UI elements
    for (let i = 0; i < 5; i++) {
      elements.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        size: 20 + Math.random() * 20,
        color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
        speed: 0.5 + Math.random() * 1,
      });
    }

    const drawIsometricGrid = () => {
      const gridSize = 20;
      const gridOffset = frame * 0.5;

      ctx.strokeStyle = "rgba(100, 100, 255, 0.1)";
      ctx.lineWidth = 1;

      // Draw horizontal lines
      for (let i = -rect.height; i < rect.height * 2; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, i + (gridOffset % gridSize));
        ctx.lineTo(rect.width, i + (gridOffset % gridSize));
        ctx.stroke();
      }

      // Draw diagonal lines
      for (let i = -rect.width; i < rect.width * 2; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(i + (gridOffset % gridSize), 0);
        ctx.lineTo(i + (gridOffset % gridSize) + rect.height, rect.height);
        ctx.stroke();
      }
    };

    const drawElements = () => {
      elements.forEach((el, i) => {
        ctx.fillStyle = el.color;
        ctx.beginPath();

        // Draw rounded rectangle
        const x = el.x + Math.sin(frame * 0.02 + i) * 10;
        const y = el.y + Math.cos(frame * 0.02 + i) * 10;

        ctx.roundRect(x, y, el.size, el.size / 2, 5);
        ctx.fill();

        // Move element
        el.y += el.speed;
        if (el.y > rect.height) {
          el.y = -el.size;
          el.x = Math.random() * rect.width;
        }
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);

      drawIsometricGrid();
      drawElements();

      frame++;
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      // No cleanup needed as the component unmount will stop the animation
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
