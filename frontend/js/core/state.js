export const state = {
  students: [],

  classes: [
    { id: 1, name: "BCA", year: 1 },
    { id: 2, name: "BCA", year: 2 },
    { id: 3, name: "BCA", year: 3 }
  ],

  subjects: [
    { id: 1, name: "JavaScript", class_id: 1 },
    { id: 2, name: "DBMS", class_id: 1 },
    { id: 3, name: "Python", class_id: 2 }
  ],

  attendanceRecords: {},
  attendanceLocked: false,

  marksRecords: [],
  marksLocked: false
};

export function findClassById(id) {
  return state.classes.find(c => c.id == id);
}
