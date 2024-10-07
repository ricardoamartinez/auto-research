import React, { useEffect, useRef } from 'react';
import './App.css';

function App() {
  const cardRef = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const shineEffectRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;
    const title = titleRef.current;
    const shineEffect = shineEffectRef.current;
    const particles = particlesRef.current;

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

      aimX = distanceY * 0.1;
      aimY = distanceX * -0.1;

      const percentX = (e.clientX - rect.left) / rect.width;
      const percentY = (e.clientY - rect.top) / rect.height;
      
      title.style.setProperty('--x', `${percentX * 100}%`);
      title.style.setProperty('--y', `${percentY * 100}%`);

      const angle = Math.atan2(distanceY, distanceX);
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
      const normalizedDistance = Math.min(distance / (rect.width / 2), 1);
      
      const shineX = Math.cos(angle) * normalizedDistance * 100;
      const shineY = Math.sin(angle) * normalizedDistance * 100;
      
      shineEffect.style.transform = `translate(${shineX}%, ${shineY}%) scale(1.5)`;
      shineEffect.style.opacity = normalizedDistance * 0.7;
    };

    const handleMouseLeave = () => {
      aimX = 0;
      aimY = 0;
      shineEffect.style.transform = 'translate(-100%, -100%) scale(1)';
      shineEffect.style.opacity = 0;
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

    const createParticles = () => {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.setProperty('--x', `${Math.random() * 100}%`);
        particle.style.setProperty('--y', `${Math.random() * 100}%`);
        particle.style.setProperty('--duration', `${Math.random() * 20 + 10}s`);
        particle.style.setProperty('--delay', `${Math.random() * 10}s`);
        particles.appendChild(particle);
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    animate();
    createParticles();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="container" ref={containerRef}>
      <div className="particles" ref={particlesRef}></div>
      <div className="glass-card" ref={cardRef}>
        <div className="shine-effect" ref={shineEffectRef}></div>
        <div className="title-wrapper">
          <div className="metallic-title" ref={titleRef}>Insight Engine</div>
        </div>
      </div>
    </div>
  );
}

export default App;
