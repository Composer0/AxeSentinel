import React, {useCallback} from 'react';
import './TileCard.scss';
import CopyButton from '../CopyButton/CopyButton';

const TileCard = ({ violation, index }) => {
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

    const getCardContent = useCallback(() => {
        let content = `Impact: ${violation.impact}\n`;
        content += `Description: ${violation.description}\n`;
        content += `Help: ${violation.help}\n`;
        content += `Help URL: ${violation.helpUrl}`;
        content += "";
        content += 'Affected Elements:\n';
        violation.nodes.forEach((node, index) => {
            content += `  ${index + 1}. ${node.html}\n`;
        });
        return content;
    }, [violation]);

    return (
        <div className={`accessibility-tile ${getImpactStyle(violation.impact)}`}>
            <CopyButton getText={getCardContent} id={`copy-button-${index}`} />
            <h3 className="impact">{violation.impact}</h3>
            <p className="description">{violation.description}</p>
            <p className="help">Help: {violation.help}</p>
            <a href={violation.helpUrl} target='_blank' className="helpUrl">{violation.helpUrl}</a>
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

export default TileCard;