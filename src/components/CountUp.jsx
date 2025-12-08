import { useEffect, useState } from 'react';

const CountUp = ({ end, duration = 2000, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    // Clean the input number (remove $ or ,) so we can do math
    const endVal = parseInt(String(end).replace(/[^0-9.-]+/g,""), 10);
    
    if (isNaN(endVal)) return;

    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function (easeOutQuart) for smooth slowdown at the end
      const easeProgress = 1 - Math.pow(1 - progress, 4); 
      
      setCount(Math.floor(easeProgress * endVal));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return (
    <span>{prefix}{count.toLocaleString()}{suffix}</span>
  );
};

export default CountUp;