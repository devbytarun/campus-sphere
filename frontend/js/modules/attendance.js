import { state } from '../core/state.js';

export function initAttendanceModule() {
  const button = document.getElementById('submitAttendance');
  if (!button) return;

  button.addEventListener('click', () => {
    console.log("Attendance Saved:", state.attendanceRecords);
    alert("Attendance Submitted!");
  });
}
