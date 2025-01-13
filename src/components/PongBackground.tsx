import {
  useEffect,
  useRef,
  useState,
  useCallback,
  MouseEvent as ReactMouseEvent,
} from "react";

interface Ball {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
}

interface Paddle {
  y: number;
  height: number;
  width: number;
  speed: number;
}

interface Props {
  forceWhiteBackground?: boolean;
  onFire?: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export default function PongBackground({
  forceWhiteBackground = false,
  onFire,
}: Props) {
  const [score, setScore] = useState({ player: 0, ai: 0 });
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const dimensionsRef = useRef({ width: 1024, height: 768 });
  const frameRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);

  const ballRef = useRef<Ball>({
    x: dimensionsRef.current.width / 2,
    y: dimensionsRef.current.height / 2,
    speedX: 5,
    speedY: 5,
    size: 8,
  });

  const paddleRef = useRef<{ left: Paddle; right: Paddle }>({
    left: {
      y: dimensionsRef.current.height / 2,
      height: 100,
      width: 10,
      speed: 8,
    },
    right: {
      y: dimensionsRef.current.height / 2,
      height: 100,
      width: 10,
      speed: 8,
    },
  });

  useEffect(() => {
    dimensionsRef.current = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }, []);

  const resetBall = useCallback(() => {
    const { width, height } = dimensionsRef.current;
    const speed = 8; // Reduced from 12 for more manageable gameplay
    ballRef.current = {
      x: width / 2,
      y: height / 2,
      speedX: (Math.random() > 0.5 ? 1 : -1) * speed,
      speedY: (Math.random() > 0.5 ? 1 : -1) * speed * 0.4, // Less vertical movement
      size: 8,
    };
  }, []);

  const updateAI = useCallback(
    (deltaTime: number, paddle: Paddle, isLeftPaddle: boolean) => {
      const ball = ballRef.current;
      const width = dimensionsRef.current.width;

      // Predict where the ball will intersect with paddle's plane
      const paddleX = isLeftPaddle ? paddle.width : width - paddle.width;
      const distanceToTravel = isLeftPaddle
        ? ball.x - paddleX
        : paddleX - ball.x;

      if (
        (isLeftPaddle && ball.speedX < 0) ||
        (!isLeftPaddle && ball.speedX > 0)
      ) {
        const timeToIntercept = distanceToTravel / Math.abs(ball.speedX);
        const predictedY = ball.y + ball.speedY * timeToIntercept;

        // Account for multiple bounces
        let targetY = predictedY;
        const height = dimensionsRef.current.height;
        const bounceCount = Math.floor(Math.abs(predictedY) / height);

        if (bounceCount > 0) {
          const remainder = Math.abs(predictedY) % height;
          targetY = bounceCount % 2 === 0 ? remainder : height - remainder;
        } else if (predictedY < 0) {
          targetY = -predictedY;
        } else if (predictedY > height) {
          targetY = height - (predictedY - height);
        }

        // Add prediction error (more for left paddle)
        const predictionError = (Math.random() - 0.5) * (isLeftPaddle ? 15 : 5);
        targetY += predictionError;

        // Add slight delay for left paddle by offsetting target
        if (isLeftPaddle) {
          targetY += (Math.random() - 0.5) * 30;
        }

        targetY = Math.min(
          Math.max(targetY - paddle.height / 2, 0),
          height - paddle.height
        );

        // Smooth movement with acceleration
        const diff = targetY - paddle.y;
        const moveSpeed =
          paddle.speed * deltaTime * (isLeftPaddle ? 0.75 : 0.85);
        const maxMove = Math.min(Math.abs(diff), moveSpeed);

        // Add movement threshold to prevent micro-adjustments
        if (Math.abs(diff) > 2) {
          // Apply smooth acceleration (slower for left paddle)
          const acceleration = Math.min(
            1,
            Math.abs(diff) / (isLeftPaddle ? 90 : 60)
          );
          paddle.y += Math.sign(diff) * maxMove * acceleration;
        }
      } else {
        // Smoother return to center when ball is moving away
        const centerY = dimensionsRef.current.height / 2 - paddle.height / 2;
        const diffToCenter = centerY - paddle.y;
        if (Math.abs(diffToCenter) > paddle.height / 4) {
          const centerSpeed =
            paddle.speed * deltaTime * (isLeftPaddle ? 0.4 : 0.5);
          const acceleration = Math.min(1, Math.abs(diffToCenter) / 120);
          paddle.y += Math.sign(diffToCenter) * centerSpeed * acceleration;
        }
      }

      // Keep paddle within bounds
      paddle.y = Math.max(
        0,
        Math.min(dimensionsRef.current.height - paddle.height, paddle.y)
      );
    },
    []
  );

  const updateBall = useCallback(
    (deltaTime: number) => {
      const ball = ballRef.current;
      const { left: leftPaddle, right: rightPaddle } = paddleRef.current;
      const { width, height } = dimensionsRef.current;

      // Update position with classic linear movement
      ball.x += ball.speedX * deltaTime;
      ball.y += ball.speedY * deltaTime;

      // Simple wall bounces
      if (ball.y <= ball.size || ball.y >= height - ball.size) {
        ball.speedY = -ball.speedY;
        ball.y = ball.y <= ball.size ? ball.size : height - ball.size;
      }

      // Simple paddle collision check
      const checkPaddleCollision = (paddle: Paddle, isLeft: boolean) => {
        const paddleX = isLeft ? paddle.width : width - paddle.width;

        if (
          ball.y >= paddle.y &&
          ball.y <= paddle.y + paddle.height &&
          ((isLeft && ball.x <= paddleX + ball.size && ball.x >= 0) ||
            (!isLeft && ball.x >= paddleX - ball.size && ball.x <= width))
        ) {
          // Classic Pong uses 8 segments on the paddle for different angles
          const segment = Math.floor(((ball.y - paddle.y) / paddle.height) * 8);
          const speed = 8; // Reduced from 12

          // Angles: -45, -35, -25, -15, 15, 25, 35, 45 degrees
          const angles = [
            -0.785, -0.611, -0.436, -0.262, 0.262, 0.436, 0.611, 0.785,
          ];
          const bounceAngle = angles[segment] || 0;

          ball.speedX = (isLeft ? 1 : -1) * speed * Math.cos(bounceAngle);
          ball.speedY = speed * Math.sin(bounceAngle);

          // Position ball at paddle edge
          ball.x = isLeft ? paddleX + ball.size : paddleX - ball.size;
          return true;
        }
        return false;
      };

      // Check paddle collisions and scoring
      if (
        !checkPaddleCollision(leftPaddle, true) &&
        !checkPaddleCollision(rightPaddle, false)
      ) {
        if (ball.x < 0) {
          setScore((prev) => ({ ...prev, player: prev.player + 1 }));
          resetBall();
        } else if (ball.x > width) {
          setScore((prev) => ({ ...prev, ai: prev.ai + 1 }));
          resetBall();
        }
      }
    },
    [resetBall]
  );

  const draw = useCallback(() => {
    const ctx = contextRef.current;
    if (!ctx) return;

    ctx.clearRect(
      0,
      0,
      dimensionsRef.current.width,
      dimensionsRef.current.height
    );

    ctx.strokeStyle = forceWhiteBackground ? "#000000" : "#4a9eff";
    ctx.fillStyle = forceWhiteBackground ? "#000000" : "#4a9eff";
    ctx.lineWidth = 2;

    // Draw score
    if (isFullScreen) {
      ctx.font = "48px monospace";
      ctx.textAlign = "center";
      const scoreY = 60;
      ctx.fillText(
        `${score.ai} - ${score.player}`,
        dimensionsRef.current.width / 2,
        scoreY
      );
    } else {
      ctx.font = "24px monospace";
      ctx.textAlign = "left";
      ctx.fillText(`${score.ai} - ${score.player}`, 20, 40); // Moved up to be under navigation
    }

    // Draw ball
    const ball = ballRef.current;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fill();

    // Draw paddles
    const { left, right } = paddleRef.current;
    ctx.fillRect(0, left.y, left.width, left.height);
    ctx.fillRect(
      dimensionsRef.current.width - right.width,
      right.y,
      right.width,
      right.height
    );
  }, [forceWhiteBackground, score, isFullScreen]);

  const animate = useCallback(
    (timestamp: number) => {
      const deltaTime = lastFrameTimeRef.current
        ? Math.min((timestamp - lastFrameTimeRef.current) / 16.667, 3)
        : 1;
      lastFrameTimeRef.current = timestamp;

      updateAI(deltaTime, paddleRef.current.left, true);

      // Auto-play right paddle when not in active play
      if (isAutoPlay) {
        updateAI(deltaTime, paddleRef.current.right, false);
      }

      updateBall(deltaTime);
      draw();

      frameRef.current = requestAnimationFrame(animate);
    },
    [updateAI, updateBall, draw, isAutoPlay]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isFullScreen) return; // Ignore mouse movement when not in fullscreen

      if (isAutoPlay) {
        setIsAutoPlay(false);
      }

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const mouseY = e.clientY - rect.top;
      const paddle = paddleRef.current.right;

      paddle.y = Math.max(
        0,
        Math.min(
          dimensionsRef.current.height - paddle.height,
          mouseY - paddle.height / 2
        )
      );
    },
    [isAutoPlay, isFullScreen]
  );

  const handleClick = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest(
        'button, a, input, textarea, select, [role="button"], [tabindex="0"]'
      );
      if (!isInteractive) {
        e.preventDefault();
        e.stopPropagation();
        setIsFullScreen((prev) => {
          const newFullScreen = !prev;
          // Always auto-play when not in fullscreen
          if (!newFullScreen) {
            setIsAutoPlay(true);
          }
          return newFullScreen;
        });
        onFire?.((prev) => !prev);
      }
    },
    [onFire]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "f") {
        setIsFullScreen((prev) => {
          const newFullScreen = !prev;
          // Always auto-play when not in fullscreen
          if (!newFullScreen) {
            setIsAutoPlay(true);
          }
          return newFullScreen;
        });
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
      resetBall();
    };

    contextRef.current = canvas.getContext("2d");
    updateDimensions();

    // Set initial auto-play state
    if (!isFullScreen) {
      setIsAutoPlay(true);
    }

    window.addEventListener("resize", updateDimensions);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(frameRef.current);
    };
  }, [animate, handleMouseMove, resetBall, handleKeyDown, isFullScreen]);

  return (
    <div
      className={`fixed inset-0 ${isFullScreen ? "z-[100]" : "z-0"}`}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full ${
          forceWhiteBackground
            ? "bg-white"
            : isFullScreen
              ? "bg-background"
              : "bg-transparent"
        }`}
        style={{ touchAction: "none", cursor: "pointer" }}
      />
      {isFullScreen && (
        <div className="absolute top-4 left-4 text-sm text-white/60">
          Press F or click to exit full screen
        </div>
      )}
    </div>
  );
}
