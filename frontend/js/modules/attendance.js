import { state } from '../core/state.js';

export function initAttendanceModule() {
  loadAttendanceDropdowns();
}

export function loadAttendanceDropdowns() {
  const classSelect = document.getElementById('attendanceClass');
  const subjectSelect = document.getElementById('attendanceSubject');
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

export function loadAttendanceStudents() {
  const classId = document.getElementById('attendanceClass').value;
  const listDiv = document.getElementById('attendanceList');
  if (!listDiv) return;
  listDiv.innerHTML = '';
  const filteredStudents = state.students.filter(s => s.student.class_id == classId);
  filteredStudents.forEach((student) => {
    const row = document.createElement('div');
    row.innerHTML = `
      ${student.user.name}
      <select onchange="window.__app_markAttendance('${student.student.roll_number}', this.value)">
        <option value="present">Present</option>
        <option value="absent">Absent</option>
      </select>`;
    listDiv.appendChild(row);
  });
}

export function markAttendance(roll, status) {
  state.attendanceRecords[roll] = status;
}

export function submitAttendance() {
  if (state.attendanceLocked) { alert('Attendance already locked!'); return; }
  const subjectId = document.getElementById('attendanceSubject').value;
  const classId = document.getElementById('attendanceClass').value;
  const filteredStudents = state.students.filter(s => s.student.class_id == classId);
  filteredStudents.forEach((student) => {
    const record = {
      student_id: student.student.roll_number,
      subject_id: parseInt(subjectId),
      date: new Date().toISOString().split('T')[0],
      status: state.attendanceRecords[student.student.roll_number] || 'present',
      locked: true
    };
    console.log('Attendance Record:', record);
  });
  state.attendanceLocked = true;
  alert('Attendance Submitted & Locked!');
}
