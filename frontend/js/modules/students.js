import { state, generateId } from '../core/state.js';

export function initStudentModule() {
  const form = document.getElementById('studentForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('studentName').value;
    const email = document.getElementById('studentEmail').value;

    state.students.push({
      id: generateId(),
      name,
      email
    });

    form.reset();
    renderStudents();
  });

  renderStudents();
}

function renderStudents() {
  const tbody = document.querySelector('#studentTable tbody');
  if (!tbody) return;

  tbody.innerHTML = '';

  state.students.forEach((student, index) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${student.name}</td>
      <td>${student.email}</td>
      <td>
        <button class="delete-btn">Delete</button>
      </td>
    `;

    tr.querySelector('.delete-btn')
      .addEventListener('click', () => {
        state.students.splice(index, 1);
        renderStudents();
      });

    tbody.appendChild(tr);
  });
}
