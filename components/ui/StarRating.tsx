'use client';

import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function StarRating({ 
  rating, 
  onRatingChange, 
  interactive = false,
  size = 'md',
  className = ''
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: 'w-7 h-7 text-base',     // 28x28px para listagem (maior)
    md: 'w-10 h-10 text-lg',     // 40x40px 
    lg: 'w-11 h-11 text-xl'      // 44x44px para formulários (ideal)
  };

  const handleClick = (newRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(newRating);
    }
  };

  const handleMouseEnter = (starIndex: number) => {
    if (interactive) {
      setHoverRating(starIndex);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  const getStarColor = (starIndex: number) => {
    const currentRating = hoverRating || rating;
    
    if (starIndex <= currentRating) {
      return 'text-yellow-400';
    }
    return 'text-gray-300 dark:text-gray-600';
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <button
        key={i}
        type="button"
        disabled={!interactive}
        onClick={() => handleClick(i)}
        onMouseEnter={() => handleMouseEnter(i)}
        onMouseLeave={handleMouseLeave}
        className={`
          ${sizeClasses[size]} 
          ${getStarColor(i)} 
          ${interactive ? 'cursor-pointer hover:scale-110 transition-all duration-150' : 'cursor-default'}
          ${interactive ? 'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 rounded' : ''}
          disabled:cursor-default
          flex items-center justify-center
        `}
        aria-label={`${i} estrela${i > 1 ? 's' : ''}`}
      >
        ★
      </button>
    );
  }

  return (
    <div className={`flex items-center ${interactive ? 'gap-1' : '-space-x-0.5'} ${className}`}>
      {stars}
    </div>
  );
}

// Componente apenas para visualização (compatibilidade com ListarLivro)
export function StarRatingDisplay({ rating }: { rating: number }) {
  return <StarRating rating={rating} interactive={false} size="sm" />;
}