import { state, generateId } from '../core/state.js';

export function initSubjectsModule() {
  const form = document.getElementById('subjectForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('subjectName').value;
    const classId = parseInt(document.getElementById('subjectClass').value);

    state.subjects.push({
      id: generateId(),
      name,
      class_id: classId
    });

    form.reset();
    renderSubjects();
  });

  renderSubjects();
}

function renderSubjects() {
  const tbody = document.querySelector('#subjectTable tbody');
  if (!tbody) return;

  tbody.innerHTML = '';

  state.subjects.forEach((sub, index) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${sub.name}</td>
      <td>${sub.class_id}</td>
      <td>
        <button class="delete-btn">Delete</button>
      </td>
    `;

    tr.querySelector('.delete-btn')
      .addEventListener('click', () => {
        state.subjects.splice(index, 1);
        renderSubjects();
      });

    tbody.appendChild(tr);
  });
}
