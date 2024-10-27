import { useState, useEffect } from 'react';
import './App.scss';
import 'animate.css';
import BrowserServe from './components/BrowserServe/BrowserServe.jsx';
import AccessibilityScanner from './components/AccessibilityScanner/AccessibilityScanner.jsx';
import LoginRegister from './components/LoginRegister/LoginRegister.jsx';
import LoadingOverlay from './components/LoadingOverlay/LoadingOverlay.jsx';
import { CopyProvider } from './context/CopyContext';


function App() {
    const [url, setUrl] = useState('https://www.taxslayer.com');
    const [userAuth, setUserAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const checkUserAuth = () => {
            const storedUserAuth = localStorage.getItem('userAuth');
            const storedUserEmail = localStorage.getItem('userEmail');
            setUserAuth(storedUserAuth === 'true');
            setUserEmail(storedUserEmail || '');
        };

        checkUserAuth();

        const handleStorageChange = (e) => {
            if (e.key === 'userAuth' || e.key === 'userEmail') {
                checkUserAuth();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleUrlChange = (newUrl) => {
        setUrl(newUrl);
    };

    const handleLogout = () => {
        localStorage.setItem('userAuth', 'false');
        localStorage.removeItem('userEmail');
        setUserAuth(false);
        setUserEmail('');
    };

    const handleLogin = (email) => {
        setIsLoading(true);
        localStorage.setItem('userAuth', 'true');
        localStorage.setItem('userEmail', email);
        setUserEmail(email);
        setTimeout(() => {
            setIsLoading(false);
            setUserAuth(true);
        }, 3000);
    };

    return (
        <CopyProvider>
            <main id="AxeSentinel">
                {isLoading && <LoadingOverlay email={userEmail} />}
                {userAuth ? (
                    <div className="side-by-side">
                        <div id="AccessibilityScanner">
                            <AccessibilityScanner url={url} />
                        </div>
                        <div id="BrowserServe">
                            <BrowserServe url={url} onUrlChange={handleUrlChange} />
                        </div>
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <div id="LoginRegister">
                        <LoginRegister onLogin={handleLogin} />
                    </div>
                )}
            </main>
        </CopyProvider>
    );
}

export default App;