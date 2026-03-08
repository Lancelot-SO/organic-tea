import React from 'react';
import { Star, StarHalf } from 'lucide-react';

const StarRating = ({ rating = 0, maxStars = 5, size = 16, className = "" }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className={`flex items-center gap-0.5 ${className}`}>
            {[...Array(fullStars)].map((_, i) => (
                <Star
                    key={`full-${i}`}
                    size={size}
                    className="text-gold fill-gold"
                />
            ))}
            {hasHalfStar && (
                <div className="relative">
                    <Star size={size} className="text-stone-200" />
                    <div className="absolute inset-0 overflow-hidden w-1/2">
                        <Star size={size} className="text-gold fill-gold" />
                    </div>
                </div>
            )}
            {[...Array(emptyStars > 0 ? emptyStars : 0)].map((_, i) => (
                <Star
                    key={`empty-${i}`}
                    size={size}
                    className="text-stone-200"
                />
            ))}
        </div>
    );
};

export default StarRating;
