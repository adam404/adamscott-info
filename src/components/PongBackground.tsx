import { useEffect, useRef, useState, useCallback } from "react";

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
      speed: 5,
    },
    right: {
      y: dimensionsRef.current.height / 2,
      height: 100,
      width: 10,
      speed: 5,
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
    const speed = 12; // Classic Pong speed - faster and more direct
    ballRef.current = {
      x: width / 2,
      y: height / 2,
      speedX: (Math.random() > 0.5 ? 1 : -1) * speed,
      speedY: (Math.random() > 0.5 ? 1 : -1) * speed * 0.5, // Less vertical movement
      size: 8,
    };
  }, []);

  const updateAI = useCallback((deltaTime: number) => {
    const ball = ballRef.current;
    const paddle = paddleRef.current.left;

    // Only move towards ball when it's moving towards AI side
    if (ball.speedX < 0) {
      const targetY = ball.y - paddle.height / 2;
      const diff = targetY - paddle.y;

      // Add some prediction and smoothing
      const moveSpeed = paddle.speed * deltaTime * 0.7; // Reduced speed for medium difficulty
      const maxMove = Math.min(Math.abs(diff), moveSpeed);

      if (Math.abs(diff) > paddle.height / 8) {
        // Reduced reaction threshold
        paddle.y += Math.sign(diff) * maxMove;
      }
    } else {
      // When ball is moving away, slowly return to center
      const centerY = dimensionsRef.current.height / 2 - paddle.height / 2;
      const diffToCenter = centerY - paddle.y;
      if (Math.abs(diffToCenter) > paddle.height / 4) {
        paddle.y += Math.sign(diffToCenter) * paddle.speed * deltaTime * 0.3;
      }
    }

    // Keep paddle within bounds
    paddle.y = Math.max(
      0,
      Math.min(dimensionsRef.current.height - paddle.height, paddle.y)
    );
  }, []);

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
          const speed = 12;

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

      updateAI(deltaTime);
      updateBall(deltaTime);
      draw();

      frameRef.current = requestAnimationFrame(animate);
    },
    [updateAI, updateBall, draw]
  );

  const handleMouseMove = useCallback((e: MouseEvent) => {
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
  }, []);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (e.target === canvasRef.current) {
        e.stopPropagation();
        setIsFullScreen((prev) => !prev);
        onFire?.((prev) => !prev);
      }
    },
    [onFire]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "f") {
        setIsFullScreen((prev) => !prev);
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

    window.addEventListener("resize", updateDimensions);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);
    canvas.addEventListener("click", handleClick);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      canvas.removeEventListener("click", handleClick);
      cancelAnimationFrame(frameRef.current);
    };
  }, [animate, handleMouseMove, resetBall, handleClick, handleKeyDown]);

  return (
    <div className={`fixed inset-0 ${isFullScreen ? "z-50" : ""}`}>
      <canvas
        ref={canvasRef}
        className={`w-full h-full ${
          forceWhiteBackground
            ? "bg-white"
            : isFullScreen
              ? "bg-background"
              : "bg-transparent"
        }`}
        style={{ touchAction: "none" }}
      />
      {isFullScreen && (
        <div className="absolute top-4 left-4 text-sm text-white/60">
          Press F or click to exit full screen
        </div>
      )}
    </div>
  );
}
