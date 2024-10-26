import React from 'react';
import './BrowserServe.scss';

const BrowserServe = ({ url, onUrlChange }) => {
    const handleUrlChange = (e) => {
        onUrlChange(e.target.value);
    };

    return (
        <div className="browser-serve">
            <input
                type="text"
                value={url}
                onChange={handleUrlChange}
                placeholder="Enter URL"
            />
            <iframe id="dynamic-iframe" src={url} title="Browser Preview" style={{ width: '100%', height: '500px', border: '1px solid #ccc' }} />
        </div>
    );
};

export default BrowserServe;