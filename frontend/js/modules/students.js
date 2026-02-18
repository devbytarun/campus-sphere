import { state, findClassById } from '../core/state.js';
import { loadClassesDropdown } from '../core/ui.js';

export function initStudentModule() {
  loadClassesDropdown('classId');
  const studentForm = document.getElementById('studentForm');
  if (studentForm) {
    studentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('studentName').value;
      const email = document.getElementById('studentEmail').value;
      const roll = document.getElementById('rollNumber').value;
      const classId = parseInt(document.getElementById('classId').value);

      const duplicate = state.students.find(s => s.student.roll_number === roll);
      if (duplicate) { alert('Roll number already exists!'); return; }

      const newStudent = {
        user: { name, email, role: 'student' },
        student: { roll_number: roll, class_id: classId }
      };

      state.students.push(newStudent);
      renderStudents();
      studentForm.reset();
    });
  }
  renderStudents();
}

export function renderStudents() {
  const tbody = document.querySelector('#studentTable tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  state.students.forEach((student, index) => {
    const classObj = findClassById(student.student.class_id);
    const row = `
      <tr>
        <td>${student.user.name}</td>
        <td>${student.user.email}</td>
        <td>${student.student.roll_number}</td>
        <td>${classObj ? classObj.name + ' Year ' + classObj.year : ''}</td>
        <td>
          <button onclick="window.__app_editStudent(${index})">Edit</button>
          <button onclick="window.__app_deleteStudent(${index})">Delete</button>
        </td>
      </tr>`;
    tbody.innerHTML += row;
  });
}

export function deleteStudent(index) {
  state.students.splice(index, 1);
  renderStudents();
}

export function editStudent(index) {
  const student = state.students[index];
  if (!student) return;
  document.getElementById('studentName').value = student.user.name;
  document.getElementById('studentEmail').value = student.user.email;
  document.getElementById('rollNumber').value = student.student.roll_number;
  document.getElementById('classId').value = student.student.class_id;
  state.students.splice(index, 1);
  renderStudents();
}
