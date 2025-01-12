"use client";

import { useEffect, useRef } from "react";

interface BackendAnimationProps {
  className?: string;
}

export default function BackendAnimation({
  className = "",
}: BackendAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size with device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Animation variables
    let frame = 0;
    const dataPoints: { x: number; y: number; size: number; speed: number }[] =
      [];

    // Create data points
    for (let i = 0; i < 8; i++) {
      dataPoints.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        size: 8 + Math.random() * 8,
        speed: 1 + Math.random() * 2,
      });
    }

    function drawIsometricCube(x: number, y: number, size: number) {
      const h = size * 0.866; // height of equilateral triangle

      ctx.strokeStyle = "rgba(50, 205, 50, 0.5)";
      ctx.lineWidth = 2;

      // Top face
      ctx.beginPath();
      ctx.moveTo(x, y - h / 2);
      ctx.lineTo(x + size / 2, y - h);
      ctx.lineTo(x + size, y - h / 2);
      ctx.lineTo(x + size / 2, y);
      ctx.closePath();
      ctx.stroke();

      // Right face
      ctx.beginPath();
      ctx.moveTo(x + size, y - h / 2);
      ctx.lineTo(x + size, y + h / 2);
      ctx.lineTo(x + size / 2, y + h);
      ctx.lineTo(x + size / 2, y);
      ctx.closePath();
      ctx.stroke();

      // Left face
      ctx.beginPath();
      ctx.moveTo(x + size / 2, y);
      ctx.lineTo(x + size / 2, y + h);
      ctx.lineTo(x, y + h / 2);
      ctx.lineTo(x, y - h / 2);
      ctx.closePath();
      ctx.stroke();
    }

    function drawDataFlow() {
      dataPoints.forEach((point, i) => {
        // Draw connecting lines
        ctx.strokeStyle = "rgba(50, 205, 50, 0.2)";
        ctx.lineWidth = 1;
        dataPoints.forEach((otherPoint, j) => {
          if (i !== j && Math.random() > 0.7) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            ctx.stroke();
          }
        });

        // Draw data point with pulsing effect (always positive)
        ctx.fillStyle = "rgba(50, 205, 50, 0.8)";
        ctx.beginPath();
        const pulseScale = (Math.sin(frame * 0.05 + i) + 1) / 2; // Normalize to 0-1 range
        const radius = point.size * (0.5 + pulseScale * 0.5); // Ensure minimum size
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Move point
        point.y += point.speed;
        if (point.y > rect.height) {
          point.y = -point.size;
          point.x = Math.random() * rect.width;
        }
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background cubes
      for (let i = 0; i < 3; i++) {
        const size = 40;
        const x = rect.width * 0.25 + i * rect.width * 0.25;
        const y = rect.height * 0.5 + Math.sin(frame * 0.02 + i) * 10;
        drawIsometricCube(x, y, size);
      }

      drawDataFlow();

      frame++;
      requestAnimationFrame(animate);
    }

    animate();

    // Cleanup
    return () => {
      // Cancel animation frame if needed
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
