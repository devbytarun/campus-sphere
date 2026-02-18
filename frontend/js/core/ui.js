export function decodeToken(token) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return {};
  }
}

export function addMenuItem(name, sectionId) {
  const menu = document.getElementById('menu');
  const li = document.createElement('li');
  li.textContent = name;
  li.onclick = () => showSection(sectionId);
  menu.appendChild(li);
}

export function showSection(id) {
  if (id === 'logout') {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
    return;
  }

  document.querySelectorAll('.section').forEach(sec => {
    sec.style.display = 'none';
  });

  const section = document.getElementById(id);
  if (section) section.style.display = 'block';
}
