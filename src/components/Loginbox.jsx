import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginBox = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ fallback สำหรับ mock บัญชีทดสอบ
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

    // ✅ เรียก backend login จริง
    try {
      const response = await fetch('https://bgai-repo.onrender.com/login', {
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
    <form
      onSubmit={handleSubmit}
      className="bg-black/10 mt10 glass p-2 pb-4 rounded-2xl shadow-2xl w-full max-w-sm backdrop-blur-sm border border-white/10"
    >
      <h2 className="font-vt text-5xl font-bold pt-4 mb-4 text-center text-white">Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="font-vt text-3xl w-full mb-4 p-3 border border-gray-300 rounded placeholder-white/70"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="font-vt text-2xl w-full mb-6 p-3 border border-gray-300 rounded placeholder-white/70"
        required
      />

      <div className="flex justify-center">
        <button
          type="submit"
          className="text-3xl btn bg-white text-black border-[#e5e5e5] px-6 py-6 
                     shadow-md 
                     hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] 
                     active:shadow-[0_0_15px_rgba(255,255,255,0.8)] 
                     active:scale-95 
                     transition ease-in-out duration-200 
                     flex items-center gap-3 
                     font-vt"
        >
          <svg
            aria-label="Email icon"
            width="28"
            height="28"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="black"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </g>
          </svg>
          Login with Email
        </button>
      </div>
    </form>
  );
};

