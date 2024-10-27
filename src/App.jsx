import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.scss';
import 'animate.css';
import LoadingOverlay from './components/LoadingOverlay/LoadingOverlay.jsx';
import { CopyProvider } from './context/CopyContext';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import LoginRegister from './pages/LoginRegister.jsx';
import ScannerPage from './pages/ScannerPage.jsx';
import SavedReports from './pages/SavedReports.jsx';

function App() {
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
        <Router>
            <CopyProvider>
                <main id="AxeSentinel">
                    {isLoading && <LoadingOverlay email={userEmail} />}
                    {userAuth ? (
                        <div className="app-layout">
                            <Sidebar onLogout={handleLogout} />
                            <div className='content-area'>
                            <Routes>
                                <Route path="/scanner" element={<ScannerPage />} />
                                <Route path="/saved-reports" element={<SavedReports />} />
                                <Route path="*" element={<Navigate to="/scanner" replace />} />
                            </Routes>
                            </div>
                        </div>
                    ) : (
                        <div id="LoginRegister">
                            <LoginRegister onLogin={handleLogin} />
                        </div>
                    )}
                </main>
            </CopyProvider>
        </Router>
    );
}

export default App;