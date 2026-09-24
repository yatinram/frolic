/**
 * WaveDivider — Reusable wave divider component
 *
 * Usage:
 *   <WaveDivider topColor="#ffffff" bottomColor="#FFF8EF" />
 *   <WaveDivider variant="wave2" topColor="#F8FBF8" bottomColor="#071918" flip />
 *   <WaveDivider variant="tilt" topColor="#FFF8EF" bottomColor="#EEF4FF" height={70} />
 *
 * Props:
 *   variant      — 'wave1' | 'wave2' | 'wave3' | 'tilt' | 'curve' | 'zigzag'  (default: 'wave1')
 *   topColor     — color of the section ABOVE  (default: '#ffffff')
 *   bottomColor  — color of the section BELOW  (default: '#FFF8EF')
 *   flip         — boolean, flips horizontally  (default: false)
 *   height       — SVG height in px             (default: 54)
 *   style        — extra inline styles on wrapper
 */

import React from 'react';

const WAVES = {
  /* Classic smooth wave */
  wave1: (fill) => (
    <svg viewBox="0 0 1200 54" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0,28 C200,56 400,0 600,28 C800,56 1000,4 1200,28 L1200,54 L0,54 Z"
        fill={fill}
      />
    </svg>
  ),

  /* Double-hump wave — more dramatic */
  wave2: (fill) => (
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0,40 C120,60 240,20 360,36 C480,52 600,10 720,30 C840,50 960,8 1080,28 C1200,48 1320,16 1440,36 L1440,60 L0,60 Z"
        fill={fill}
      />
    </svg>
  ),

  /* Gentle rolling wave */
  wave3: (fill) => (
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0,50 Q180,10 360,50 Q540,90 720,50 Q900,10 1080,50 Q1260,90 1440,50 L1440,80 L0,80 Z"
        fill={fill}
      />
    </svg>
  ),

  /* Diagonal tilt — sharp modern */
  tilt: (fill) => (
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="0,60 1440,0 1440,60" fill={fill} />
    </svg>
  ),

  /* Single smooth arc curve */
  curve: (fill) => (
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,0 Q720,80 1440,0 L1440,80 L0,80 Z" fill={fill} />
    </svg>
  ),

  /* Zigzag / chevron */
  zigzag: (fill) => (
    <svg viewBox="0 0 1200 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <polyline
        points="0,0 100,40 200,0 300,40 400,0 500,40 600,0 700,40 800,0 900,40 1000,0 1100,40 1200,0 1200,40 0,40"
        fill={fill}
      />
    </svg>
  ),
};

export default function WaveDivider({
  variant = 'wave1',
  topColor = '#ffffff',
  bottomColor = '#FFF8EF',
  flip = false,
  height = 54,
  style = {},
}) {
  const waveFn = WAVES[variant] || WAVES.wave1;

  return (
    <div
      aria-hidden="true"
      style={{
        display: 'block',
        lineHeight: 0,
        backgroundColor: topColor,
        ...style,
      }}
    >
      <div
        style={{
          transform: flip ? 'scaleX(-1)' : undefined,
          height: height,
          overflow: 'hidden',
        }}
      >
        {/* Clone the SVG but make it fill to height */}
        <div style={{ width: '100%', height: '100%', display: 'flex' }}>
          {React.cloneElement(waveFn(bottomColor), {
            style: { width: '100%', height: '100%', display: 'block' },
            preserveAspectRatio: 'none',
          })}
        </div>
      </div>
    </div>
  );
}
