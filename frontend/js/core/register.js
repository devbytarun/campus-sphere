import { API_BASE } from './config.js';

// Register form handling: POST to backend register API
const form = document.getElementById('registerForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role_id = parseInt(document.getElementById('role_id').value, 10);
    if (![1,2,3].includes(role_id)) { alert('Invalid role selected!'); return; }

    try {
      const url = `${API_BASE}/api/auth/register`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role_id })
      });

      let data = null;
      const ct = res.headers.get('content-type') || '';
      if (ct.includes('application/json')) data = await res.json();
      else data = { message: await res.text() };

      if (!res.ok) {
        alert(data?.message || `Register failed (${res.status})`);
        return;
      }

      alert('Registration successful — please login');
      form.reset();
      window.location.href = 'login.html';
    } catch (err) {
      console.error('Register error:', err);
      alert('Network error while registering: ' + (err.message || err));
    }
  });
}
