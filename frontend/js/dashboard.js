import { state } from './core/state.js';
import { decodeToken, addMenuItem, showSection, loadClassesDropdown, populateSubjectsForClass } from './core/ui.js';
import { initStudentModule } from './modules/students.js';
import { initAttendanceModule } from './modules/attendance.js';
import { initMarksModule } from './modules/marks.js';

// AUTH CHECK
const token = localStorage.getItem('token');
if (!token) window.location.href = 'login.html';
const payload = decodeToken(token);
const role = payload.role || 'student';
const welcomeEl = document.getElementById('welcome');
if (welcomeEl) welcomeEl.innerText = 'Logged in as: ' + role;

// MENU
if (role === 'admin') {
  addMenuItem('Students', 'students');
  addMenuItem('Teachers', 'teachers');
  addMenuItem('Classes', 'classes');
  addMenuItem('Subjects', 'subjects');
  addMenuItem('Notices', 'notices');
}
if (role === 'teacher') {
  addMenuItem('Attendance', 'attendance');
  addMenuItem('Marks', 'marks');
  addMenuItem('Notices', 'notices');
}
if (role === 'student') {
  addMenuItem('My Attendance', 'attendance');
  addMenuItem('My Marks', 'marks');
  addMenuItem('Notices', 'notices');
}
addMenuItem('Logout', 'logout');

// Initialize dropdowns and modules
loadClassesDropdown('classId');
populateSubjectsForClass('attendanceClass', 'attendanceSubject');
populateSubjectsForClass('marksClass', 'marksSubject');

initStudentModule();
initAttendanceModule();
initMarksModule();

// expose small helpers for inline handlers used in modules
window.__app_editStudent = (i) => { import('./modules/students.js').then(m => m.editStudent(i)); };
window.__app_deleteStudent = (i) => { import('./modules/students.js').then(m => m.deleteStudent(i)); };
window.__app_markAttendance = (roll, status) => { import('./modules/attendance.js').then(m => m.markAttendance(roll, status)); };
window.__app_updateMarks = (roll, field, value) => { import('./modules/marks.js').then(m => m.updateMarks(roll, field, value)); };
