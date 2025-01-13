"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  angle: number;
  rotation: number;
  rotationSpeed: number;
  points: number[];
  type: "asteroid" | "geometric";
  immuneUntil?: number;
  spawnX?: number;
  spawnY?: number;
}

interface Ship {
  x: number;
  y: number;
  angle: number;
  velocityX: number;
  velocityY: number;
  rotationSpeed: number;
  thrusting: boolean;
  lastShot: number;
}

interface Projectile {
  x: number;
  y: number;
  angle: number;
  speed: number;
  life: number;
}

interface Props {
  forceWhiteBackground?: boolean;
  onFire?: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export default function AsteroidsBackground({
  forceWhiteBackground = false,
  onFire,
}: Props) {
  const [score, setScore] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const dimensionsRef = useRef({
    width: 1024,
    height: 768,
  });
  const frameRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const projectilesRef = useRef<Projectile[]>([]);
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const shipRef = useRef<Ship>({
    x: dimensionsRef.current.width / 2,
    y: dimensionsRef.current.height / 2,
    angle: 0,
    velocityX: 0,
    velocityY: 0,
    rotationSpeed: 0.1,
    thrusting: false,
    lastShot: 0,
  });

  useEffect(() => {
    dimensionsRef.current = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }, []);

  const createAsteroid = useCallback(
    (
      x?: number,
      y?: number,
      size?: number,
      immune: boolean = false
    ): Particle => {
      const asteroidX = x ?? Math.random() * dimensionsRef.current.width;
      const asteroidY = y ?? Math.random() * dimensionsRef.current.height;
      const asteroidSize = size ?? Math.random() * 30 + 15;
      const points: number[] = [];
      const numPoints = Math.floor(Math.random() * 4) + 8;

      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const variance = Math.random() * 0.6 + 0.7;
        points.push(Math.cos(angle) * asteroidSize * variance);
        points.push(Math.sin(angle) * asteroidSize * variance);
      }

      return {
        x: asteroidX,
        y: asteroidY,
        spawnX: immune ? asteroidX : undefined,
        spawnY: immune ? asteroidY : undefined,
        size: asteroidSize,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        angle: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        points,
        type: "asteroid",
        immuneUntil: immune ? Date.now() + 500 : undefined,
      };
    },
    []
  );

  const initializeParticles = useCallback(() => {
    const { width, height } = dimensionsRef.current;
    particlesRef.current = [];

    // Add asteroids at edges
    for (let i = 0; i < 8; i++) {
      const size = 30 + (i % 3) * 10;
      let x, y;

      if (i < 4) {
        x = i < 2 ? -size : width + size;
        y = Math.random() * height;
      } else {
        x = Math.random() * width;
        y = i < 6 ? -size : height + size;
      }

      particlesRef.current.push(createAsteroid(x, y, size));
    }
  }, [createAsteroid]);

  const updateParticles = useCallback((deltaTime: number) => {
    particlesRef.current.forEach((particle) => {
      particle.x +=
        particle.speedX * (particle.type === "asteroid" ? 2 : 1) * deltaTime;
      particle.y +=
        particle.speedY * (particle.type === "asteroid" ? 2 : 1) * deltaTime;
      particle.rotation += particle.rotationSpeed * deltaTime;

      const { width, height } = dimensionsRef.current;
      if (particle.x < -particle.size) particle.x = width + particle.size;
      else if (particle.x > width + particle.size) particle.x = -particle.size;
      if (particle.y < -particle.size) particle.y = height + particle.size;
      else if (particle.y > height + particle.size) particle.y = -particle.size;
    });
  }, []);

  const updateShip = useCallback((deltaTime: number) => {
    const ship = shipRef.current;
    const thrust = 0.3 * deltaTime;
    const friction = Math.pow(0.99, deltaTime);

    if (keysRef.current["ArrowLeft"])
      ship.angle -= ship.rotationSpeed * deltaTime;
    if (keysRef.current["ArrowRight"])
      ship.angle += ship.rotationSpeed * deltaTime;

    ship.thrusting = keysRef.current["ArrowUp"];
    if (ship.thrusting) {
      ship.velocityX += Math.cos(ship.angle) * thrust;
      ship.velocityY += Math.sin(ship.angle) * thrust;
    }

    ship.velocityX *= friction;
    ship.velocityY *= friction;

    ship.x += ship.velocityX * deltaTime;
    ship.y += ship.velocityY * deltaTime;

    const { width, height } = dimensionsRef.current;
    if (ship.x < 0) ship.x = width;
    else if (ship.x > width) ship.x = 0;
    if (ship.y < 0) ship.y = height;
    else if (ship.y > height) ship.y = 0;
  }, []);

  const createProjectile = useCallback((ship: Ship): Projectile => {
    const projectile = {
      x: ship.x + Math.cos(ship.angle) * 15,
      y: ship.y + Math.sin(ship.angle) * 15,
      angle: ship.angle,
      speed: 8,
      life: Date.now() + 2000,
    };
    console.log("Creating projectile:", {
      pos: { x: projectile.x, y: projectile.y },
      angle: projectile.angle,
      shipPos: { x: ship.x, y: ship.y },
    });
    return projectile;
  }, []);

  const updateProjectiles = useCallback((deltaTime: number) => {
    const now = Date.now();
    const beforeCount = projectilesRef.current.length;
    projectilesRef.current = projectilesRef.current
      .filter((p) => {
        const alive = p.life > now;
        if (!alive) {
          console.log("Projectile expired:", {
            pos: { x: p.x, y: p.y },
            life: p.life,
            now,
          });
        }
        return alive;
      })
      .map((p) => {
        p.x += Math.cos(p.angle) * p.speed * deltaTime;
        p.y += Math.sin(p.angle) * p.speed * deltaTime;
        return p;
      });

    if (beforeCount !== projectilesRef.current.length) {
      console.log("Projectiles updated:", {
        before: beforeCount,
        after: projectilesRef.current.length,
      });
    }
  }, []);

  const checkCollisions = useCallback(() => {
    const ship = shipRef.current;
    const shipRadius = 10;
    let asteroidsToAdd: Particle[] = [];
    const now = Date.now();

    console.log("Starting collision check:", {
      projectiles: projectilesRef.current.length,
      asteroids: particlesRef.current.length,
      shipPos: { x: ship.x, y: ship.y },
    });

    // First phase: Handle asteroid splitting only
    let collisionOccurred = false;
    for (
      let i = particlesRef.current.length - 1;
      i >= 0 && !collisionOccurred;
      i--
    ) {
      const particle = particlesRef.current[i];

      // Only check non-immune asteroids for bullet collisions
      if (
        particle.type === "asteroid" &&
        (!particle.immuneUntil || now > particle.immuneUntil)
      ) {
        // Check projectile collisions
        for (let j = projectilesRef.current.length - 1; j >= 0; j--) {
          const projectile = projectilesRef.current[j];
          const pdx = projectile.x - particle.x;
          const pdy = projectile.y - particle.y;
          const pDistanceSquared = pdx * pdx + pdy * pdy;
          const pMinDistance = particle.size * 0.8;

          if (pDistanceSquared < pMinDistance * pMinDistance) {
            console.log("Bullet hit asteroid:", {
              asteroidPos: { x: particle.x, y: particle.y },
              bulletPos: { x: projectile.x, y: projectile.y },
              asteroidSize: particle.size,
            });

            // Remove the projectile
            projectilesRef.current.splice(j, 1);
            collisionOccurred = true;

            // Break asteroid into smaller pieces if it's large enough
            if (particle.size > 25) {
              // Create two smaller asteroids with offset positions
              const newSize = particle.size * 0.6;
              const projectileAngle = Math.atan2(
                projectile.y - particle.y,
                projectile.x - particle.x
              );

              // Calculate offset positions perpendicular to the projectile angle
              const offsetDistance = newSize * 2;
              const newAsteroids = [
                createAsteroid(
                  particle.x +
                    Math.cos(projectileAngle + Math.PI / 2) * offsetDistance,
                  particle.y +
                    Math.sin(projectileAngle + Math.PI / 2) * offsetDistance,
                  newSize,
                  true
                ),
                createAsteroid(
                  particle.x +
                    Math.cos(projectileAngle - Math.PI / 2) * offsetDistance,
                  particle.y +
                    Math.sin(projectileAngle - Math.PI / 2) * offsetDistance,
                  newSize,
                  true
                ),
              ];

              console.log("Creating new fragments:", {
                originalSize: particle.size,
                newSize,
                fragmentCount: newAsteroids.length,
                positions: newAsteroids.map((a) => ({ x: a.x, y: a.y })),
              });

              // Adjust velocities for more dynamic movement
              newAsteroids.forEach((asteroid, index) => {
                const spreadAngle = Math.PI * 0.5;
                const baseAngle = projectileAngle;
                const newAngle =
                  baseAngle + (index === 0 ? spreadAngle : -spreadAngle);
                const speed =
                  Math.sqrt(
                    particle.speedX * particle.speedX +
                      particle.speedY * particle.speedY
                  ) * 1.5;

                asteroid.speedX = Math.cos(newAngle) * speed;
                asteroid.speedY = Math.sin(newAngle) * speed;
                asteroid.immuneUntil = now + 500;
              });

              // Add new asteroids to a temporary array
              asteroidsToAdd.push(...newAsteroids);
            }

            // Remove the original asteroid and update score
            particlesRef.current.splice(i, 1);
            const newScore = score + 100;
            console.log("Updating score:", { oldScore: score, newScore });
            setScore(newScore);
            break;
          }
        }
      }
    }

    // Add new asteroids after all collision checks
    if (asteroidsToAdd.length > 0) {
      console.log("Adding new asteroids:", {
        count: asteroidsToAdd.length,
        totalAsteroids: particlesRef.current.length + asteroidsToAdd.length,
      });
      particlesRef.current.push(...asteroidsToAdd);
      return; // Skip remaining checks this frame
    }

    // Check ship collisions only with non-immune asteroids
    let shipCollided = false;
    for (const particle of particlesRef.current) {
      if (
        !shipCollided &&
        particle.type === "asteroid" &&
        (!particle.immuneUntil || now > particle.immuneUntil)
      ) {
        const dx = ship.x - particle.x;
        const dy = ship.y - particle.y;
        const distanceSquared = dx * dx + dy * dy;
        const minDistance = shipRadius + particle.size * 0.7;

        if (distanceSquared < minDistance * minDistance) {
          console.log("Ship collision detected:", {
            shipPos: { x: ship.x, y: ship.y },
            asteroidPos: { x: particle.x, y: particle.y },
            distance: Math.sqrt(distanceSquared),
            minDistance,
            asteroidSize: particle.size,
            asteroidImmune: particle.immuneUntil
              ? particle.immuneUntil > now
              : false,
          });

          shipCollided = true;
          // Reset ship position and velocity
          ship.x = dimensionsRef.current.width / 2;
          ship.y = dimensionsRef.current.height / 2;
          ship.velocityX = 0;
          ship.velocityY = 0;
          ship.angle = 0;
          setScore(0);

          // Clear all projectiles
          projectilesRef.current = [];
        }
      }
    }

    if (shipCollided) {
      return;
    }

    // Only spawn new asteroids if there are too few
    const asteroidCount = particlesRef.current.filter(
      (p) => p.type === "asteroid"
    ).length;
    if (asteroidCount < 3 && Math.random() < 0.1) {
      const { width, height } = dimensionsRef.current;
      const size = 30 + Math.random() * 20;
      const spawnSide = Math.floor(Math.random() * 4);
      let x, y;

      switch (spawnSide) {
        case 0:
          x = -size;
          y = Math.random() * height;
          break;
        case 1:
          x = width + size;
          y = Math.random() * height;
          break;
        case 2:
          x = Math.random() * width;
          y = -size;
          break;
        default:
          x = Math.random() * width;
          y = height + size;
      }

      particlesRef.current.push(createAsteroid(x, y, size));
    }
  }, [createAsteroid]);

  const draw = useCallback(() => {
    const ctx = contextRef.current;
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(
      0,
      0,
      dimensionsRef.current.width,
      dimensionsRef.current.height
    );

    // Draw score
    ctx.fillStyle = forceWhiteBackground ? "#000000" : "#ffffff";
    ctx.font = "24px monospace";
    ctx.fillText(`Score: ${score}`, 20, 40);

    // Draw asteroids
    ctx.strokeStyle = forceWhiteBackground ? "#000000" : "#4a9eff";
    ctx.lineWidth = 1.5;
    for (const asteroid of particlesRef.current) {
      ctx.save();
      ctx.translate(asteroid.x, asteroid.y);
      ctx.rotate(asteroid.rotation);
      ctx.beginPath();
      for (let i = 0; i < asteroid.points.length; i += 2) {
        const x = asteroid.points[i];
        const y = asteroid.points[i + 1];
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }

    // Draw projectiles
    ctx.fillStyle = forceWhiteBackground ? "#000000" : "#4a9eff";
    for (const projectile of projectilesRef.current) {
      ctx.beginPath();
      ctx.arc(projectile.x, projectile.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw ship
    const ship = shipRef.current;
    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.angle);
    ctx.strokeStyle = forceWhiteBackground ? "#000000" : "#4a9eff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(15, 0);
    ctx.lineTo(-10, -10);
    ctx.lineTo(-8, 0);
    ctx.lineTo(-10, 10);
    ctx.closePath();
    ctx.stroke();

    // Draw engine thrust
    if (ship.thrusting) {
      ctx.beginPath();
      ctx.fillStyle = forceWhiteBackground ? "#000000" : "#4a9eff";
      ctx.globalAlpha = 0.5;
      ctx.moveTo(-8, 0);
      ctx.lineTo(-15, -5);
      ctx.lineTo(-20, 0);
      ctx.lineTo(-15, 5);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    ctx.restore();
  }, [forceWhiteBackground, score]);

  const animate = useCallback(
    (timestamp: number) => {
      const deltaTime = lastFrameTimeRef.current
        ? Math.min((timestamp - lastFrameTimeRef.current) / 16.667, 3)
        : 1;
      lastFrameTimeRef.current = timestamp;

      updateParticles(deltaTime);
      updateShip(deltaTime);
      updateProjectiles(deltaTime);
      checkCollisions();
      draw();

      frameRef.current = requestAnimationFrame(animate);
    },
    [updateParticles, updateShip, updateProjectiles, checkCollisions, draw]
  );

  const resetGame = useCallback(() => {
    shipRef.current = {
      x: dimensionsRef.current.width / 2,
      y: dimensionsRef.current.height / 2,
      angle: 0,
      velocityX: 0,
      velocityY: 0,
      rotationSpeed: 0.1,
      thrusting: false,
      lastShot: 0,
    };
    projectilesRef.current = [];
    initializeParticles();
  }, [initializeParticles]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;
      if (e.key === " ") {
        const now = Date.now();
        if (now - shipRef.current.lastShot > 250) {
          console.log("Shooting projectile");
          projectilesRef.current.push(createProjectile(shipRef.current));
          shipRef.current.lastShot = now;
        }
      }
      if (e.key === "f") {
        onFire?.((prev) => !prev);
      }
    },
    [createProjectile, onFire]
  );

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    keysRef.current[e.key] = false;
  }, []);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest(
        'button, a, input, textarea, article, [role="button"]'
      );
      if (!isInteractive) {
        e.stopPropagation();
        onFire?.((prev) => !prev);
      }
    },
    [onFire]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      dimensionsRef.current = { width: canvas.width, height: canvas.height };

      // Reset ship position
      shipRef.current.x = canvas.width / 2;
      shipRef.current.y = canvas.height / 2;

      // Reinitialize particles
      initializeParticles();
    };

    contextRef.current = canvas.getContext("2d");
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("click", handleClick);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("click", handleClick);
      cancelAnimationFrame(frameRef.current);
    };
  }, [
    animate,
    handleKeyDown,
    handleKeyUp,
    initializeParticles,
    onFire,
    handleClick,
  ]);

  return (
    <div className="fixed inset-0" tabIndex={0}>
      <canvas
        ref={canvasRef}
        className={`w-full h-full ${forceWhiteBackground ? "bg-white" : "bg-transparent"}`}
        style={{ touchAction: "auto", cursor: "pointer" }}
      />
    </div>
  );
}
