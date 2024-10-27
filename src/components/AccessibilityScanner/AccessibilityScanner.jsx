import React, { useState } from 'react';
import './AccessibilityScanner.scss';
import axios from 'axios';
import TileCard from '../TileCard/TileCard';
import axeSentinelLogo from '../../assets/img/AxeSentinel_Logo.webp';
import DownloadButton from '../DownloadButton/DownloadButton';

const AccessibilityScanner = ({ url }) => {
    const [results, setResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const determineConformanceLevel = (violations) => {
        if (violations) {
            const hasViolation = (level) => violations.some(v => v.tags.includes(`wcag${level}`));
            if (hasViolation('a')) return 'Does not meet WCAG Level A';
            if (hasViolation('aa')) return 'Meets WCAG Level A';
            if (hasViolation('aaa')) return 'Meets WCAG Level AA';
        }
        return 'Meets WCAG Level AAA';
    };

    const scanAccessibility = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:3001/scan', { url });
            setResults(response.data);
        } catch (error) {
            console.error('Error scanning accessibility:', error.message);
            setError('Failed to scan the website. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="scanner-section">
            <div className="scanner-header">
                <img src={axeSentinelLogo} alt="AxeSentinel Logo" className="axe-sentinel-logo" />
                <h2>AxeSentinel</h2>
            </div>
            <p>Current URL: {url}</p>
            <button onClick={scanAccessibility} disabled={isLoading}>
                {isLoading ? 'Scanning...' : 'Scan Page'}
            </button>
            {error && <p className="error">{error}</p>}
            {results && (
                <div className="results-container">
                    <div className="conformance-level">
                        <h3>WCAG Conformance Level:</h3>
                        <span className="level">{determineConformanceLevel(results.violations)}</span>
                    </div>
                    <h3 className='accessibilityIssues'>Accessibility Issues: {results.violations.length}</h3>
                    {results.violations.length > 0 && (
                        <DownloadButton 
                            label="Download Violations Report"
                            downloadType="scanner"
                            data={{ url, items: results.violations }}
                        />
                    )}
                    <div className="results-scrollable">
                        {results.violations.map((violation, index) => (
                            <TileCard key={index} violation={violation} index={index + 1} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccessibilityScanner;