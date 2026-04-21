import { createSlice } from '@reduxjs/toolkit';

export interface AttendanceRecord {
  id: string; studentName: string; date: string; status: 'present' | 'absent' | 'late'; course: string;
}

const records: AttendanceRecord[] = [
  { id: '1', studentName: 'Alex Johnson', date: '2026-04-06', status: 'present', course: 'Machine Learning' },
  { id: '2', studentName: 'Sarah Williams', date: '2026-04-06', status: 'present', course: 'Machine Learning' },
  { id: '3', studentName: 'Mike Chen', date: '2026-04-06', status: 'late', course: 'Machine Learning' },
  { id: '4', studentName: 'Emily Davis', date: '2026-04-06', status: 'absent', course: 'Machine Learning' },
  { id: '5', studentName: 'James Wilson', date: '2026-04-05', status: 'present', course: 'Data Structures' },
  { id: '6', studentName: 'Lisa Park', date: '2026-04-05', status: 'present', course: 'Data Structures' },
];

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: { records },
  reducers: {},
});

export default attendanceSlice.reducer;
