"use client";
import { useInView } from "react-intersection-observer";

const LazyVideo = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      {inView && (
        <video
          className="hidden lg:block w-[424px] max-h-[524px] object-cover rounded-xl shadow-xl"
          autoPlay
          loop
          muted
        >
          {/* النسخة MP4 */}
          <source src="/images/heroY.mp4" type="video/mp4" />
          {/* النسخة WebM */}
          <source src="/images/heroY.webm" type="video/webm" />
          <p>Your browser does not support the video tag.</p>
        </video>
      )}
    </div>
  );
};

export default LazyVideo;
