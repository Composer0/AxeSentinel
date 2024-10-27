import React from 'react';
import './LoadingOverlay.scss';

const LoadingOverlay = ({ email }) => {
    return (
        <div className="loading-overlay">
            <div className="loading-content">
                <h2>Welcome, {email}!</h2>
                <p>Preparing AxeSentinel...</p>
                <div className="loader"></div>
            </div>
        </div>
    );
};

export default LoadingOverlay;