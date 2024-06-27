import React, { useState } from 'react';

const StarRating = ({ hover, rating, setRating }) => {
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
                    onClick={() => {if (hover) handleStarClick(i)}}
                    onMouseEnter={() => {if (hover) handleStarHover(i)}}
                    onMouseLeave={() => {if (hover) handleStarHover(0)}}
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
                    onClick={() => {if (hover) handleStarClick(i)}}
                    onMouseEnter={() =>{if (hover) handleStarHover(i)}}
                    onMouseLeave={() => {if (hover) handleStarHover(0)}}
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
    },
    emptyStar: {
        color: '#E0E0E0',
    }
};

export default StarRating;
