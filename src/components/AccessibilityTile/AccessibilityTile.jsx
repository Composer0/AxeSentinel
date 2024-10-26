import React from 'react';
import './AccessibilityTile.scss';

const AccessibilityTile = ({ violation }) => {
    const getImpactStyle = (impact) => {
        switch (impact) {
            case 'critical':
                return 'impact-critical';
            case 'serious':
                return 'impact-serious';
            case 'moderate':
                return 'impact-moderate';
            case 'minor':
                return 'impact-minor';
            default:
                return 'impact-unknown';
        }
    };

    return (
        <div className={`accessibility-tile ${getImpactStyle(violation.impact)}`}>
            <h3 className="impact">{violation.impact}</h3>
            <p className="description">{violation.description}</p>
            <p className="help">Help: {violation.help}</p>
            <details>
                <summary>Affected Elements</summary>
                <ul>
                    {violation.nodes.map((node, index) => (
                        <li key={index}>{node.html}</li>
                    ))}
                </ul>
            </details>
        </div>
    );
};

export default AccessibilityTile;