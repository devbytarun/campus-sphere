import { state, generateId } from '../core/state.js';

export function initClassesModule() {
  const form = document.getElementById('classForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('className').value.trim();
    const year = parseInt(document.getElementById('classYear').value);

    if (!name || !year) return;

    state.classes.push({
      id: generateId(),
      name,
      year
    });

    form.reset();
    renderClasses();
  });

  renderClasses();
}

function renderClasses() {
  const tbody = document.querySelector('#classTable tbody');
  if (!tbody) return;

  tbody.innerHTML = '';

  state.classes.forEach((cls, index) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${cls.name}</td>
      <td>${cls.year}</td>
      <td>
        <button data-index="${index}" class="delete-btn">Delete</button>
      </td>
    `;

    tr.querySelector('.delete-btn')
      .addEventListener('click', () => {
        state.classes.splice(index, 1);
        renderClasses();
      });

    tbody.appendChild(tr);
  });
}
