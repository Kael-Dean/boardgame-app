import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ เพิ่มบรรทัดนี้
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>          {/* ✅ ครอบ <App /> ด้วย */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
