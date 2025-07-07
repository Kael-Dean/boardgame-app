import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginBox = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mock fallback
    if (email === 'test@example.com' && password === '123456') {
      const mockRes = {
        token: 'mock-token',
        user: { name: 'Test User', email },
      };
      localStorage.setItem('token', mockRes.token);
      localStorage.setItem('user', JSON.stringify(mockRes.user));
      alert('✅ เข้าระบบด้วยบัญชี mock!');
      navigate('/home');
      return;
    }

    try {
      const response = await fetch('https://bgai-repo.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText);
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      alert('✅ เข้าระบบสำเร็จ!');
      navigate('/home');
    } catch (err) {
      alert('❌ Login failed: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass p-6 rounded-xl shadow-xl w-full max-w-sm">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 p-3 rounded text-black"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-6 p-3 rounded text-black"
        required
      />
      <button
        type="submit"
        className="w-full bg-white text-black font-semibold py-3 rounded hover:bg-gray-200"
      >
        Login
      </button>
    </form>
  );
};
