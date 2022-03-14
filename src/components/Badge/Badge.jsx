import React from 'react';

import './Badge.scss'

const Badge = ({ onClick, color }) => {
    const classNames = `badge--${color}`

    return (
        <i
            className={`badge ${classNames}`}
            onClick={onClick}
        >
        </i>
    );
};

export default Badge;