import React from 'react';

const Background = () => {
  // Create 50 bubbles
  const bubbles = Array.from({ length: 50 }).map((_, i) => {
    const size = Math.random() * 4 + 1; // 1-5rem
    const left = Math.random() * 100;   // 0-100%
    const duration = Math.random() * 20 + 10; // 10-30s
    const delay = Math.random() * 20;   // 0-20s delay
    const sway = Math.random() > 0.5 ? 'sway-left-to-right' : 'sway-right-to-left';

    return (
      <div
        key={i}
        className={`bubble ${sway}`}
        style={{
          left: `${left}%`,
          width: `${size}rem`,
          height: `${size}rem`,
          animationDuration: `${duration}s`,
          animationDelay: `-${delay}s`,
        }}
      />
    );
  });

  return (
    <div className="bubbles-container">
      {bubbles}
    </div>
  );
};

export default Background;