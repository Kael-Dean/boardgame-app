// src/pages/Login.jsx
import { useState } from 'react';
import { LoginBox } from '../components/Loginbox';
import  SignUpBox  from '../components/SignUpBox';

export const LogIn = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: "url('/BG/bg1.png')" }}
    >
      <div className="mt-20 flex flex-col items-center h-full gap-6">
        {isLogin ? <LoginBox /> : <SignUpBox />}

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-white underline hover:text-yellow-300 mt-4 text-xl font-Kanit
           active:text-yellow-300"        
        >
          {isLogin ? 'ยังไม่มีบัญชีใช่ไหม? สมัครสมาชิก' : 'มีบัญชีอยู่แล้ว? กลับไปล็อกอิน'}
        </button>
      </div>
    </div>
  );
};
