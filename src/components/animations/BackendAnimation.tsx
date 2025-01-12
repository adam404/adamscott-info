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

    // Define animation functions within the non-null ctx scope
    const drawIsometricCube = (x: number, y: number, size: number) => {
      // Using a smaller height factor for more compact cubes
      const h = size * 0.3; // reduced from 0.577 for shorter height

      ctx.strokeStyle = "rgba(50, 205, 50, 0.5)";
      ctx.lineWidth = 2;

      // Top face
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + size / 2, y - h);
      ctx.lineTo(x + size, y);
      ctx.lineTo(x + size / 2, y + h);
      ctx.closePath();
      ctx.stroke();

      // Right face
      ctx.beginPath();
      ctx.moveTo(x + size, y);
      ctx.lineTo(x + size, y + h);
      ctx.lineTo(x + size / 2, y + h * 2);
      ctx.lineTo(x + size / 2, y + h);
      ctx.closePath();
      ctx.stroke();

      // Left face
      ctx.beginPath();
      ctx.moveTo(x + size / 2, y + h);
      ctx.lineTo(x + size / 2, y + h * 2);
      ctx.lineTo(x, y + h);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.stroke();
    };

    const drawDataFlow = () => {
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

        // Draw data point with pulsing effect
        ctx.fillStyle = "rgba(50, 205, 50, 0.8)";
        ctx.beginPath();
        const pulseScale = (Math.sin(frame * 0.05 + i) + 1) / 2;
        const radius = point.size * (0.5 + pulseScale * 0.5);
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Move point
        point.y += point.speed;
        if (point.y > rect.height) {
          point.y = -point.size;
          point.x = Math.random() * rect.width;
        }
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Draw multiple stacks of cubes
      const stackConfigs = [
        { x: rect.width * 0.2, baseY: rect.height * 0.4, count: 3 },
        { x: rect.width * 0.5, baseY: rect.height * 0.6, count: 2 },
        { x: rect.width * 0.8, baseY: rect.height * 0.5, count: 4 },
      ];

      stackConfigs.forEach((stack, stackIndex) => {
        // Draw each cube in the stack
        for (let i = 0; i < stack.count; i++) {
          const size = 30; // Slightly smaller cubes
          const x = stack.x + Math.sin(frame * 0.02 + stackIndex) * 5;
          const y =
            stack.baseY - i * size * 0.4 + Math.sin(frame * 0.02 + i) * 3;
          drawIsometricCube(x, y, size);
        }
      });

      drawDataFlow();

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
