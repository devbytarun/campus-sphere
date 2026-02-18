import { state } from '../core/state.js';

export function initMarksModule() {
  loadMarksDropdowns();
}

export function loadMarksDropdowns() {
  const classSelect = document.getElementById('marksClass');
  const subjectSelect = document.getElementById('marksSubject');
  if (!classSelect || !subjectSelect) return;
  classSelect.innerHTML = '';
  state.classes.forEach(cls => {
    const option = document.createElement('option');
    option.value = cls.id;
    option.textContent = cls.name + ' Year ' + cls.year;
    classSelect.appendChild(option);
  });
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

export function loadMarksStudents() {
  const classId = document.getElementById('marksClass').value;
  const listDiv = document.getElementById('marksList');
  if (!listDiv) return;
  listDiv.innerHTML = '';
  const filteredStudents = state.students.filter(s => s.student.class_id == classId);
  filteredStudents.forEach(student => {
    const row = document.createElement('div');
    const existing = state.marksRecords.find(r => r.student_id === student.student.roll_number && r.subject_id == (document.getElementById('marksSubject')?.value || 0));
    const val1 = existing ? (existing.internal_1 || 0) : '';
    const val2 = existing ? (existing.internal_2 || 0) : '';
    const total = existing ? (existing.total || 0) : '';
    const grade = existing ? (existing.grade || '') : '';
    const disabled = state.marksLocked || (existing && existing.locked) ? 'disabled' : '';
    row.setAttribute('data-roll', student.student.roll_number);
    row.innerHTML = `
      <strong>${student.user.name}</strong>
      Internal 1: <input type="number" min="0" max="50" value="${val1}" onchange="window.__app_updateMarks('${student.student.roll_number}', 'internal_1', this.value)" ${disabled} />
      Internal 2: <input type="number" min="0" max="50" value="${val2}" onchange="window.__app_updateMarks('${student.student.roll_number}', 'internal_2', this.value)" ${disabled} />
      Total: <span class="total">${total}</span>
      Grade: <span class="grade">${grade}</span>
    `;
    listDiv.appendChild(row);
  });
}

export function updateMarks(roll, field, value) {
  let record = state.marksRecords.find(r => r.student_id === roll);
  if (!record) {
    record = {
      student_id: roll,
      subject_id: parseInt(document.getElementById('marksSubject').value) || 0,
      internal_1: 0,
      internal_2: 0,
      total: 0,
      grade: '',
      locked: false
    };
    state.marksRecords.push(record);
  }
  if (state.marksLocked || record.locked) return;
  record[field] = parseInt(value) || 0;
  record.total = (record.internal_1 || 0) + (record.internal_2 || 0);
  if (record.total >= 80) record.grade = 'A';
  else if (record.total >= 60) record.grade = 'B';
  else if (record.total >= 40) record.grade = 'C';
  else record.grade = 'F';
  const listDiv = document.getElementById('marksList');
  if (!listDiv) return;
  const studentRow = listDiv.querySelector(`[data-roll="${roll}"]`);
  if (studentRow) {
    const totalSpan = studentRow.querySelector('.total');
    const gradeSpan = studentRow.querySelector('.grade');
    if (totalSpan) totalSpan.innerText = record.total;
    if (gradeSpan) gradeSpan.innerText = record.grade;
  }
}

export function submitMarks() {
  if (state.marksLocked) { alert('Marks already locked!'); return; }
  state.marksRecords.forEach(record => { record.locked = true; console.log('Marks Record:', record); });
  const listDiv = document.getElementById('marksList');
  if (listDiv) listDiv.querySelectorAll('input, select, button').forEach(el => el.disabled = true);
  state.marksLocked = true;
  alert('Marks Submitted & Locked!');
}
