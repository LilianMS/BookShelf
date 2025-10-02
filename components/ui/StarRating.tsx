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
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl'
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
        `}
        aria-label={`${i} estrela${i > 1 ? 's' : ''}`}
      >
        ★
      </button>
    );
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {stars}
      {interactive && (
        <span className="ml-2 text-sm text-muted-foreground">
          {rating > 0 ? `${rating}/5` : 'Não avaliado'}
        </span>
      )}
    </div>
  );
}

// Componente apenas para visualização (compatibilidade com ListarLivro)
export function StarRatingDisplay({ rating }: { rating: number }) {
  return <StarRating rating={rating} interactive={false} size="sm" />;
}