import { useState } from 'react';
import './App.scss';
import 'animate.css';
import BrowserServe from './components/BrowserServe/BrowserServe.jsx';
import AccessibilityScanner from './components/AccessibilityScanner/AccessibilityScanner.jsx';

function App() {
    const [url, setUrl] = useState('https://www.orionpalmer.com');

    const handleUrlChange = (newUrl) => {
        setUrl(newUrl);
    };

    return (
        <main id="AxeSentinel">
            <div className="side-by-side">
                <div id="AccessibilityScanner">
                    <AccessibilityScanner url={url} />
                </div>
                <div id="BrowserServe">
                    <BrowserServe url={url} onUrlChange={handleUrlChange} />
                </div>
            </div>
        </main>
    );
}

export default App;