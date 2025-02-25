import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ProjectVideoProps {
  video?: string;
  image?: string;
  title: string;
}

export default function ProjectVideo({
  video,
  image,
  title,
}: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlayVideo, setCanPlayVideo] = useState(true);

  useEffect(() => {
    if (!video || !videoRef.current) return;

    const videoElement = videoRef.current;

    const handleCanPlay = () => {
      setCanPlayVideo(true);
      // Ensure video plays after it can play through
      videoElement.play().catch(() => {
        setCanPlayVideo(false);
      });
    };

    const handleError = () => {
      console.error("Video failed to load:", video);
      setCanPlayVideo(false);
    };

    // Check if video can be played
    videoElement.addEventListener("canplaythrough", handleCanPlay);
    videoElement.addEventListener("error", handleError);

    // Start loading the video
    videoElement.load();

    // Cleanup
    return () => {
      videoElement.removeEventListener("canplaythrough", handleCanPlay);
      videoElement.removeEventListener("error", handleError);
    };
  }, [video]);

  if (!video || !canPlayVideo) {
    return image ? (
      <Image
        className="w-full object-cover transition-transform hover:scale-105"
        src={image}
        alt={`Cover image for ${title}`}
        width={500}
        height={300}
        priority
      />
    ) : (
      <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        <span className="text-gray-500 dark:text-gray-400">{title}</span>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      className="w-full object-cover transition-transform hover:scale-105"
      autoPlay
      muted
      loop
      playsInline
      poster={image}
    >
      <source src={video} type="video/mp4" />
      {image && (
        <Image
          className="h-48 w-full object-cover"
          src={image}
          alt={`Cover image for ${title}`}
          width={500}
          height={300}
          priority
        />
      )}
    </video>
  );
}
