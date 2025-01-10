"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  rotation: number;
  points: number[];
  rotationSpeed: number;
  type: "asteroid" | "geometric";
}

interface Ship {
  x: number;
  y: number;
  angle: number;
  speed: number;
  engineGlow: number;
  lastShot: number;
}

interface Projectile {
  x: number;
  y: number;
  angle: number;
  speed: number;
  lifespan: number;
}

interface Props {
  forceWhiteBackground?: boolean;
}

export default function AsteroidsBackground({
  forceWhiteBackground = false,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const frameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const projectilesRef = useRef<Projectile[]>([]);
  const shipRef = useRef<Ship>({
    x: window ? window.innerWidth / 2 : 960,
    y: window ? window.innerHeight / 2 : 540,
    angle: 0,
    speed: 2,
    engineGlow: 0,
    lastShot: 0,
  });

  const createGeometric = (x?: number, y?: number): Particle => {
    const size = Math.random() * 60 + 40; // Larger geometric shapes
    const points: number[] = [];
    const numPoints = Math.floor(Math.random() * 3) + 3; // 3-5 points for geometric shapes

    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;
      const variance = 1; // No variance for geometric shapes
      points.push(Math.cos(angle) * size * variance);
      points.push(Math.sin(angle) * size * variance);
    }

    return {
      x: x ?? Math.random() * (window?.innerWidth ?? 1920),
      y: y ?? Math.random() * (window?.innerHeight ?? 1080),
      size,
      speed: Math.random() * 0.3 + 0.1, // Slower for larger objects
      angle: Math.random() * Math.PI * 2,
      rotation: Math.random() * Math.PI * 2,
      points,
      rotationSpeed: (Math.random() - 0.5) * 0.01,
      type: "geometric",
    };
  };

  const createAsteroid = (x?: number, y?: number): Particle => {
    const size = Math.random() * 30 + 15;
    const points: number[] = [];
    const numPoints = Math.floor(Math.random() * 4) + 8; // More jagged points

    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;
      const variance = Math.random() * 0.6 + 0.7; // More variance for jagged look
      points.push(Math.cos(angle) * size * variance);
      points.push(Math.sin(angle) * size * variance);
    }

    return {
      x: x ?? Math.random() * (window?.innerWidth ?? 1920),
      y: y ?? Math.random() * (window?.innerHeight ?? 1080),
      size,
      speed: Math.random() * 1 + 0.5, // Faster asteroids
      angle: Math.random() * Math.PI * 2,
      rotation: Math.random() * Math.PI * 2,
      points,
      rotationSpeed: (Math.random() - 0.5) * 0.03, // Faster rotation
      type: "asteroid",
    };
  };

  const createProjectile = (ship: Ship): Projectile => {
    return {
      x: ship.x + Math.cos(ship.angle) * 15, // Start at ship's nose
      y: ship.y + Math.sin(ship.angle) * 15,
      angle: ship.angle,
      speed: 8,
      lifespan: Date.now() + 2000, // 2 seconds lifespan
    };
  };

  const updateProjectiles = () => {
    const now = Date.now();
    projectilesRef.current = projectilesRef.current
      .filter((p) => p.lifespan > now)
      .map((p) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        return p;
      });

    // Auto-shoot every 500ms
    if (now - shipRef.current.lastShot > 500) {
      projectilesRef.current.push(createProjectile(shipRef.current));
      shipRef.current.lastShot = now;
    }
  };

  const initParticles = () => {
    const particles: Particle[] = [];
    // Add geometric shapes
    for (let i = 0; i < 4; i++) {
      particles.push(createGeometric());
    }
    // Add regular asteroids
    for (let i = 0; i < 12; i++) {
      particles.push(createAsteroid());
    }
    particlesRef.current = particles;
  };

  const updateParticles = () => {
    const width = window?.innerWidth ?? 1920;
    const height = window?.innerHeight ?? 1080;

    particlesRef.current = particlesRef.current.map((p) => {
      // Update position
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.rotation += p.rotationSpeed;

      // Wrap around screen
      if (p.x < -p.size) p.x = width + p.size;
      if (p.x > width + p.size) p.x = -p.size;
      if (p.y < -p.size) p.y = height + p.size;
      if (p.y > height + p.size) p.y = -p.size;

      return p;
    });
  };

  const updateShip = () => {
    const ship = shipRef.current;
    const width = window?.innerWidth ?? 1920;
    const height = window?.innerHeight ?? 1080;

    // Update ship position with smooth movement
    ship.angle += 0.01;
    ship.x += Math.cos(ship.angle) * ship.speed;
    ship.y += Math.sin(ship.angle) * ship.speed;
    ship.engineGlow = Math.sin(Date.now() / 100) * 0.3 + 0.7; // Pulsing engine effect

    // Wrap around screen
    if (ship.x < 0) ship.x = width;
    if (ship.x > width) ship.x = 0;
    if (ship.y < 0) ship.y = height;
    if (ship.y > height) ship.y = 0;
  };

  const animate = () => {
    updateParticles();
    updateShip();
    updateProjectiles();
    frameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    initParticles();
    frameRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      if (svgRef.current) {
        svgRef.current.setAttribute("width", window.innerWidth.toString());
        svgRef.current.setAttribute("height", window.innerHeight.toString());
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{
          background: forceWhiteBackground
            ? "white"
            : "radial-gradient(circle, #000033 0%, #000000 100%)",
        }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="engineGlow" cx="0.5" cy="0.5" r="0.5">
            <stop
              offset="0%"
              stopColor={forceWhiteBackground ? "#000000" : "#4a9eff"}
              stopOpacity="1"
            />
            <stop
              offset="100%"
              stopColor={forceWhiteBackground ? "#000000" : "#4a9eff"}
              stopOpacity="0"
            />
          </radialGradient>
        </defs>

        {/* Stars with parallax effect */}
        {Array.from({ length: 100 }).map((_, i) => (
          <circle
            key={`star-${i}`}
            cx={Math.random() * 100 + "%"}
            cy={Math.random() * 100 + "%"}
            r={Math.random() * 1.5 + 0.5}
            fill={forceWhiteBackground ? "#000000" : "#ffffff"}
            opacity={Math.random() * 0.5 + 0.25}
          >
            <animate
              attributeName="opacity"
              values={`${Math.random() * 0.5 + 0.25};${Math.random() * 0.1 + 0.1};${Math.random() * 0.5 + 0.25}`}
              dur={`${Math.random() * 3 + 2}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Projectiles */}
        {projectilesRef.current.map((p, i) => (
          <circle
            key={`projectile-${i}`}
            cx={p.x}
            cy={p.y}
            r={3}
            fill={forceWhiteBackground ? "#000000" : "#4a9eff"}
            filter="url(#glow)"
            opacity={0.8}
          >
            <animate
              attributeName="r"
              values="3;2;3"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Ship with engine glow */}
        <g
          filter="url(#glow)"
          transform={`rotate(${shipRef.current.angle * (180 / Math.PI)}, ${shipRef.current.x}, ${shipRef.current.y})`}
        >
          {/* Engine glow */}
          <circle
            cx={shipRef.current.x - 12}
            cy={shipRef.current.y}
            r="8"
            fill="url(#engineGlow)"
            opacity={shipRef.current.engineGlow}
          />
          {/* Ship body */}
          <path
            d={`M ${shipRef.current.x + 15},${shipRef.current.y} 
                L ${shipRef.current.x - 10},${shipRef.current.y - 10} 
                L ${shipRef.current.x - 8},${shipRef.current.y} 
                L ${shipRef.current.x - 10},${shipRef.current.y + 10} Z`}
            fill="none"
            stroke={forceWhiteBackground ? "#000000" : "#4a9eff"}
            strokeWidth="2"
          />
        </g>

        {/* Particles */}
        {particlesRef.current.map((p, i) => (
          <g key={i} filter="url(#glow)">
            <path
              d={`M ${p.points.reduce((path, point, i) => {
                const command = i === 0 ? "M" : "L";
                const x = p.x + point;
                const y = p.y + p.points[i + 1];
                return i % 2 === 0 ? `${path} ${command}${x},${y}` : path;
              }, "")} Z`}
              fill="none"
              stroke={
                p.type === "geometric"
                  ? forceWhiteBackground
                    ? "#000000"
                    : "#ff00ff"
                  : forceWhiteBackground
                    ? "#000000"
                    : "#4a9eff"
              }
              strokeWidth={p.type === "geometric" ? "2" : "1.5"}
              opacity={p.type === "geometric" ? "0.4" : "0.6"}
              transform={`rotate(${p.rotation * (180 / Math.PI)}, ${p.x}, ${p.y})`}
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;30;0"
                dur={`${p.type === "geometric" ? 8 : 4}s`}
                repeatCount="indefinite"
              />
            </path>
          </g>
        ))}
      </svg>
    </div>
  );
}
