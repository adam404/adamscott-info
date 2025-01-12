"use client";

import { useEffect, useRef } from "react";

interface CloudDevOpsAnimationProps {
  className?: string;
}

export default function CloudDevOpsAnimation({
  className = "",
}: CloudDevOpsAnimationProps) {
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
    const containers: {
      x: number;
      y: number;
      width: number;
      height: number;
      color: string;
      speed: number;
      phase: number;
    }[] = [];

    // Create containers
    const colors = ["#4299E1", "#48BB78", "#ED8936"];
    for (let i = 0; i < 6; i++) {
      containers.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        width: 40,
        height: 30,
        color: colors[i % colors.length],
        speed: 0.5 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const drawContainer = (
      x: number,
      y: number,
      width: number,
      height: number,
      color: string
    ) => {
      const depth = 10;

      // Draw top face
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + width, y);
      ctx.lineTo(x + width - depth, y + depth);
      ctx.lineTo(x - depth, y + depth);
      ctx.closePath();
      ctx.fill();

      // Draw front face
      ctx.fillStyle = shadeColor(color, -20);
      ctx.beginPath();
      ctx.moveTo(x - depth, y + depth);
      ctx.lineTo(x + width - depth, y + depth);
      ctx.lineTo(x + width - depth, y + height + depth);
      ctx.lineTo(x - depth, y + height + depth);
      ctx.closePath();
      ctx.fill();

      // Draw right face
      ctx.fillStyle = shadeColor(color, -40);
      ctx.beginPath();
      ctx.moveTo(x + width - depth, y + depth);
      ctx.lineTo(x + width, y);
      ctx.lineTo(x + width, y + height);
      ctx.lineTo(x + width - depth, y + height + depth);
      ctx.closePath();
      ctx.fill();

      // Draw container lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x + width / 3, y);
      ctx.lineTo(x + width / 3 - depth, y + depth);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x + (width * 2) / 3, y);
      ctx.lineTo(x + (width * 2) / 3 - depth, y + depth);
      ctx.stroke();
    };

    const shadeColor = (color: string, percent: number) => {
      const num = parseInt(color.replace("#", ""), 16);
      const amt = Math.round(2.55 * percent);
      const R = (num >> 16) + amt;
      const G = ((num >> 8) & 0x00ff) + amt;
      const B = (num & 0x0000ff) + amt;
      return (
        "#" +
        (
          0x1000000 +
          (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
          (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
          (B < 255 ? (B < 1 ? 0 : B) : 255)
        )
          .toString(16)
          .slice(1)
      );
    };

    const drawConnections = () => {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;

      containers.forEach((container, i) => {
        containers.forEach((otherContainer, j) => {
          if (i !== j && Math.random() > 0.7) {
            ctx.beginPath();
            ctx.moveTo(
              container.x + container.width / 2,
              container.y + container.height / 2
            );
            ctx.lineTo(
              otherContainer.x + otherContainer.width / 2,
              otherContainer.y + otherContainer.height / 2
            );
            ctx.stroke();

            // Draw moving data point
            const progress = ((frame * container.speed) % 100) / 100;
            const x = container.x + (otherContainer.x - container.x) * progress;
            const y = container.y + (otherContainer.y - container.y) * progress;

            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);

      drawConnections();

      containers.forEach((container, i) => {
        const x = container.x + Math.sin(frame * 0.02 + container.phase) * 10;
        const y = container.y + Math.cos(frame * 0.02 + container.phase) * 10;
        drawContainer(x, y, container.width, container.height, container.color);
      });

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
