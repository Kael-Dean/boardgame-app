import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { LogIn } from './pages/Login';
import { Home } from './pages/Home';
import { Lobby } from './pages/Lobby';
import { Basket } from './pages/Basket';
import { Profile } from './pages/Profile';
import { Search } from './pages/Search';  
import { AppLayout } from './layouts/AppLayout';

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

      {/* ✅ ทุกหน้าที่ใช้ Layout เดียวกัน */}
      <Route element={<AppLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/lobby/:tableId" element={<Lobby />} /> {/* ✅ เปลี่ยนตรงนี้ */}
      </Route>
    </Routes>
  );
};

export default App;
