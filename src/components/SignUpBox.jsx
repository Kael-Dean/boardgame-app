import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpBox = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://bgai-repo.onrender.com/api/sign-up', { // ✅ แก้ path ให้ตรง backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          username: name,
          password: password,
          age: 20, // ✅ ยัง hardcoded ได้สำหรับทดสอบ
        }),
      });

      if (res.ok) {
        alert('✅ สมัครสมาชิกสำเร็จ!');
        navigate('/'); // ✅ กลับหน้า login
      } else {
        const errorText = await res.text();
        alert('❌ สมัครไม่สำเร็จ: ' + errorText);
      }
    } catch (err) {
      alert('❌ เกิดข้อผิดพลาด: ' + err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black/10 mt10 glass p-4 rounded-2xl shadow-2xl w-full max-w-sm backdrop-blur-sm border border-white/10"
    >
      <h2 className="text-5xl font-bold mt-1 mb-4 text-center text-white font-vt">Sign Up</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="font-vt text-3xl w-full mb-4 p-3 border border-gray-100 rounded placeholder-white/800"
        required
      />
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
        className="font-vt text-3xl w-full mb-4 p-3 border border-gray-300 rounded placeholder-white/70"
        required
      />
      <div className="flex justify-center">
        <button
          type="submit"
          className="py-3 px-12 
           bg-green-500 
           hover:bg-green-400 
           active:bg-green-400
           rounded 
           font-bold 
           text-black text-xl  
           hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] 
           active:shadow-[0_0_15px_rgba(255,255,255,0.8)] 
           active:scale-95 
           transition ease-in-out duration-200"
        >
          สร้างบัญชี
        </button>
      </div>
    </form>
  );
};

export default SignUpBox;
