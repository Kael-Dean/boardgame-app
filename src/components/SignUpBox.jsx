import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpBox = () =>  {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  // 👇 mock function (ตอนหลังค่อยเชื่อม API จริง)
  const fakeRegisterAPI = async (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && name) {
          resolve({ success: true });
        } else {
          reject('Missing fields');
        }
      }, 1000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fakeRegisterAPI(name, email, password);
      alert('✅ สมัครสมาชิกสำเร็จ!');
      navigate('/'); // กลับไปหน้า Login
    } catch (err) {
      alert('❌ สมัครไม่สำเร็จ: ' + err);
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


