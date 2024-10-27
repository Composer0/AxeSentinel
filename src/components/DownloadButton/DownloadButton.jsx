import React from 'react';
import './DownloadButton.scss';

const DownloadButton = ({ onClick, label = 'Download', disabled = false, downloadType = "", data = null }) => {
    const handleClick = () => {
        if (downloadType === 'scanner' && data) {
            downloadScannerResults(data);
        } else {
            onClick();
        }
    };

    const downloadScannerResults = (violations) => {
        const content = generateWordContent(violations);
        const blob = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'accessibility_violations.doc';
        link.click();
        URL.revokeObjectURL(link.href);
    };

    const generateWordContent = (violations) => {
        let content = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">';
        content += '<head><meta charset="utf-8"><title>Accessibility Violations Report</title></head><body>';
        content += '<h1>Accessibility Violations Report</h1>';
        content += `<p>URL scanned: ${violations.url}</p>`;
        content += '<h2>Violations:</h2>';
        
        violations.items.forEach((violation, index) => {
            content += `<h3>${index + 1}. ${violation.id} - ${violation.impact} Impact</h3>`;
            content += `<p><strong>Description:</strong> ${violation.description}</p>`;
            content += `<p><strong>Help:</strong> ${violation.help}</p>`;
            content += `<p href="${violation.helpUrl}"><strong>Help URL:</strong> ${violation.helpUrl}</p>`;
            content += '<h4>Nodes:</h4>';
            content += '<ul style="list-style-type: disc;">'; // Start an unordered list
            violation.nodes.forEach((node, nodeIndex) => {
                content += '<li>'; // Start a list item
                content += `<p><strong>Node ${nodeIndex + 1}:</strong> ${node.html}</p>`;
                content += `<p>Failure Summary: ${node.failureSummary}</p>`;
                content += '</li>'; // End the list item
            });
            content += '</ul>'; // End the unordered list
        });
        
        content += '</body></html>';
        return content;
    };

    return (
        <button 
            className="download-button" 
            onClick={handleClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default DownloadButton;