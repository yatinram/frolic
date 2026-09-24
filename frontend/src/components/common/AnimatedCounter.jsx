import React, { useState, useEffect, useRef } from 'react';

export default function AnimatedCounter({
  endValue = 100,
  duration = 2000,
  prefix = '',
  suffix = '+',
  label = '',
  color = '#F5821F',
  icon = null,
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const numericEnd = parseInt(String(endValue).replace(/[^0-9]/g, ''), 10) || 0;
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease-out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * numericEnd));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [isVisible, endValue, duration]);

  return (
    <div
      ref={counterRef}
      style={{
        textAlign: 'center',
        padding: '24px 16px',
        background: '#FFFFFF',
        borderRadius: 24,
        border: `1.5px solid ${color}20`,
        boxShadow: `0 10px 30px ${color}15`,
        transition: 'all 0.3s ease',
      }}
      className="interactive-card"
    >
      {icon && (
        <div style={{ fontSize: '2rem', marginBottom: 8, color }}>
          {icon}
        </div>
      )}
      <div
        style={{
          fontFamily: "'Outfit', 'Fredoka', sans-serif",
          fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
          fontWeight: 800,
          color,
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      {label && (
        <div
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: '0.95rem',
            color: '#666666',
            fontWeight: 700,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}
