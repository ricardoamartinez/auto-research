import React, { useEffect, useRef } from 'react';
import './App.css';

function App() {
  const cardRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;

    let currentX = 0;
    let currentY = 0;
    let aimX = 0;
    let aimY = 0;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      aimX = distanceY * 0.01;
      aimY = distanceX * -0.01;
    };

    const handleMouseLeave = () => {
      aimX = 0;
      aimY = 0;
    };

    const animate = () => {
      const deltaX = aimX - currentX;
      const deltaY = aimY - currentY;

      currentX += deltaX * 0.1;
      currentY += deltaY * 0.1;

      card.style.transform = `
        perspective(1000px)
        rotateX(${currentX}deg)
        rotateY(${currentY}deg)
        translateZ(10px)
      `;

      requestAnimationFrame(animate);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    animate();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="container" ref={containerRef}>
      <h1 className="title">Insight Engine</h1>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
      <div className="blob blob-4"></div>
      <div className="glass-card" ref={cardRef}></div>
    </div>
  );
}

export default App;
