import { API_BASE } from './config.js';

// Core auth module (browser module). Handles login form submission to backend.
const form = document.getElementById('loginForm');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      const url = `${API_BASE}/api/auth/login`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      let data = null;
      const ct = res.headers.get('content-type') || '';
      if (ct.includes('application/json')) data = await res.json();
      else data = { message: await res.text() };

      if (!res.ok) { alert(data?.message || `Login failed (${res.status})`); return; }
      if (!data || !data.token) { alert('No token received from server'); return; }
      localStorage.setItem('token', data.token);
      window.location.href = 'dashboard.html';
    } catch (err) {
      console.error('Login error:', err);
      alert('Network error while logging in: ' + (err.message || err));
    }
  });
}
