import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useCopyContext } from '../../context/CopyContext';
import './CopyButton.scss';

const CopyButton = ({ getText, id, index }) => {
    const [copied, setCopied] = useState(false);
    const { lastCopiedId, setLastCopiedId } = useCopyContext();
    const buttonRef = useRef(null);

    useEffect(() => {
        if (lastCopiedId !== id) {
            setCopied(false);
        }
    }, [lastCopiedId, id]);

    const handleCopy = useCallback(async () => {
        if (copied) {
            setCopied(false);
            setLastCopiedId(null);
            return;
        }

        if (typeof getText !== 'function') {
            console.error('getText prop must be a function');
            return;
        }

        try {
            const text = getText();
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setLastCopiedId(id);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }, [copied, getText, id, setLastCopiedId]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (buttonRef.current && !buttonRef.current.contains(event.target)) {
                setCopied(false);
                setLastCopiedId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setLastCopiedId]);

    return (
        <button 
            id={index}
            ref={buttonRef}
            className={`copy-button ${copied ? 'copied' : ''}`} 
            onClick={handleCopy}
        >
            {copied ? 'Copied!' : 'Copy'}
        </button>
    );
};

export default CopyButton;