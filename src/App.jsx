import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { LogIn } from './pages/Login';
import { Home } from './pages/Home';
import { Lobby } from './pages/Lobby';

export const App = () => {
  const navigate = useNavigate();
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && window.location.pathname === '/') {
      navigate('/home');
    } else if (!token && window.location.pathname !== '/') {
      navigate('/');
    }
    setInitialCheckDone(true);
  }, []);

  if (!initialCheckDone) return null;

  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/home" element={<Home />} />
      
      <Route path="/lobby/:id" element={<Lobby />} />
    </Routes>
  );
};

export default App;
