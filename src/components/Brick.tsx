import React, { useEffect, useState } from 'react';

interface BrickProps {
  onAnimationEnd: () => void;
  variant: number;
}

const BRICK_VARIANTS = [
  'bg-[#c65d45]', // red-orange
  'bg-[#b8462c]', // darker red
  'bg-[#d17f6b]', // light terracotta
  'bg-[#a64b38]', // deep brick red
];

export function Brick({ onAnimationEnd, variant }: BrickProps) {
  const [position, setPosition] = useState(() => ({
    left: Math.random() * (window.innerWidth - 120), // 120px is brick width
    initialRotation: Math.random() * 360,
    rotationDirection: Math.random() > 0.5 ? 1 : -1,
  }));

  useEffect(() => {
    const handleResize = () => {
      setPosition({
        left: Math.random() * (window.innerWidth - 120),
        initialRotation: Math.random() * 360,
        rotationDirection: Math.random() > 0.5 ? 1 : -1,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={`brick absolute w-[120px] h-[48px] rounded-lg ${BRICK_VARIANTS[variant]} animate-fall bg-cover bg-center`}
      style={{
        left: position.left + 'px',
        '--rotation-start': `${position.initialRotation}deg`,
        '--rotation-end': `${position.initialRotation + (position.rotationDirection * 720)}deg`,
      } as React.CSSProperties}
      onAnimationEnd={onAnimationEnd}
    />
  );
}
