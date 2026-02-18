export const state = {
  user: null,

  students: [],
  teachers: [],

  classes: [
    { id: 1, name: "BCA", year: 1 },
    { id: 2, name: "BCA", year: 2 }
  ],

  subjects: [],

  attendanceRecords: [],
  marksRecords: []
};

export function generateId() {
  return Date.now();
}
