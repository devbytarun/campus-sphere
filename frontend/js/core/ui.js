import { state, findClassById } from './state.js';

export function decodeToken(token) {
  try {
    if (!token) return {};
    if (token.split && token.split('.').length === 3) {
      const payloadPart = token.split('.')[1];
      const decoded = atob(payloadPart.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded);
    }
    return JSON.parse(atob(token));
  } catch (e) {
    console.error('Failed to decode token', e);
    return {};
  }
}

export function addMenuItem(name, sectionId) {
  const menu = document.getElementById('menu');
  if (!menu) return;
  const li = document.createElement('li');
  li.innerText = name;
  li.onclick = () => showSection(sectionId);
  menu.appendChild(li);
}

export function showSection(id) {
  if (id === 'logout') {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
    return;
  }

  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
  const section = document.getElementById(id);
  if (section) section.style.display = 'block';
}

export function loadClassesDropdown(selectId) {
  const classSelect = document.getElementById(selectId);
  if (!classSelect) return;
  classSelect.innerHTML = '<option value="">Select Class</option>';
  state.classes.forEach(cls => {
    const option = document.createElement('option');
    option.value = cls.id;
    option.textContent = cls.name + ' - Year ' + cls.year;
    classSelect.appendChild(option);
  });
}

export function populateSubjectsForClass(classSelectId, subjectSelectId) {
  const classSelect = document.getElementById(classSelectId);
  const subjectSelect = document.getElementById(subjectSelectId);
  if (!classSelect || !subjectSelect) return;
  classSelect.addEventListener('change', () => {
    subjectSelect.innerHTML = '';
    state.subjects
      .filter(sub => sub.class_id == classSelect.value)
      .forEach(sub => {
        const option = document.createElement('option');
        option.value = sub.id;
        option.textContent = sub.name;
        subjectSelect.appendChild(option);
      });
  });
}
