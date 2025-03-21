import React, { useState, useEffect } from 'react';

const generateRandomBirds = (frames, count = 30) => {
  return Array.from({ length: count }, () => ({
    id: Math.random().toString(36).substr(2, 9),
    left: Math.random() * 100, // Random left position (0% to 100%)
    top: Math.random() * 100, // Random top position (0% to 100%)
    size: Math.random() * 10 + 20, // Random size (50px to 100px)
    animationDuration: Math.random() * 50 + 50, // Random speed (30s to 60s)
    frameInterval: Math.random() * 250 + 100, // Random frame interval (50ms to 200ms)
  }));
};

const FlyingBird = ({ frames }) => {
  const [birds, setBirds] = useState(() => generateRandomBirds(frames, 18));

  return (
    <div className="bird-container">
      {birds.map((bird) => (
        <AnimatedBird
          key={bird.id}
          frames={frames}
          left={bird.left}
          top={bird.top}
          size={bird.size}
          animationDuration={bird.animationDuration}
          interval={bird.frameInterval}
        />
      ))}
    </div>
  );
};

const AnimatedBird = ({ frames, left, top, size, animationDuration, interval }) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const frameInterval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length);
    }, interval);

    return () => clearInterval(frameInterval);
  }, [frames, interval]);

  return (
    <img
      src={frames[currentFrame]}
      alt=""
      className="bird"
      style={{
        position: "absolute",
        left: `${left}%`,
        top: `${top}%`,
        width: `${size}px`,
        animation: `flyAnimation ${animationDuration}s linear infinite`,
        zIndex: '2'
      }}
    />
  );
};

export default FlyingBird;
