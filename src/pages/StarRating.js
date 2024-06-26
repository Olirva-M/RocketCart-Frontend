import React, { useState } from 'react';

const StarRating = ({ rating, setRating }) => {
    const [hoverRating, setHoverRating] = useState(0);
    const handleStarClick = (starRating) => {
            setRating(starRating); 
    };

    const handleStarHover = (starRating) => {
        setHoverRating(starRating); 
    };

    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= (hoverRating || rating)) {
            stars.push(
                <span
                    key={i}
                    style={styles.star}
                    onClick={() => handleStarClick(i)}
                    onMouseEnter={() => handleStarHover(i)}
                    onMouseLeave={() => handleStarHover(0)}
                >
                    ★
                </span>
            );
        } else 
        {
            stars.push(
                <span
                    key={i}
                    style={{ ...styles.star, ...styles.emptyStar }}
                    onClick={() => handleStarClick(i)}
                    onMouseEnter={() => handleStarHover(i)}
                    onMouseLeave={() => handleStarHover(0)}
                >
                    ★
                </span>
            );
        }
    }

    return <div>{stars}</div>;
};

const styles = {
    star: {
        color: '#FFD700', 
        fontSize: '24px',
        cursor: 'pointer', 
    },
    emptyStar: {
        color: '#E0E0E0',
    }
};

export default StarRating;
