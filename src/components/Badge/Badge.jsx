import React from 'react';

import './Badge.scss'

const Badge = ({ onClick, color, className }) => {
    const classNames = `badge--${color}`

    return (
        <i
            className={`badge ${classNames} ${className}`}
            onClick={onClick}
        >
        </i>
    );
};

export default Badge;