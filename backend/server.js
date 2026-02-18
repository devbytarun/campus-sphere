const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory users
const users = [];

function makeToken(user) {
  // simple base64 JSON token (NOT secure) for frontend testing
  return Buffer.from(JSON.stringify({ role: user.role || 'student', email: user.email })).toString('base64');
}

app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role_id } = req.body || {};
  if (!name || !email || !password || !role_id) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  const role = role_id === 1 ? 'admin' : role_id === 2 ? 'teacher' : 'student';
  const user = { name, email, password, role };
  users.push(user);
  return res.status(201).json({ message: 'Registered' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const token = makeToken(user);
  return res.json({ token });
});

app.get('/', (req, res) => res.send('Mock CampusSphere API running'));

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => console.log(`Mock API listening on port ${port}`));
