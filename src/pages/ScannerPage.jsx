import React, { useState } from "react";
import AccessibilityScanner from "../components/AccessibilityScanner/AccessibilityScanner";
import BrowserServe from "../components/BrowserServe/BrowserServe";

const ScannerPage = () => {
    const [url, setUrl] = useState('https://www.taxslayer.com');

    const handleUrlChange = (newUrl) => {
        setUrl(newUrl);
    };

    return (
        <div className="side-by-side">
            <div id="AccessibilityScanner">
                <AccessibilityScanner url={url} />
            </div>
            <div id="BrowserServe">
                <BrowserServe url={url} onUrlChange={handleUrlChange} />
            </div>
        </div>
    );
};

export default ScannerPage;