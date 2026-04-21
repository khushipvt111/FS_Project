import { createSlice } from '@reduxjs/toolkit';

export interface MarkRecord {
  id: string; studentName: string; course: string; assignment: number; midterm: number; final: number; total: number; grade: string;
}

const records: MarkRecord[] = [
  { id: '1', studentName: 'Alex Johnson', course: 'Machine Learning', assignment: 88, midterm: 92, final: 90, total: 90, grade: 'A' },
  { id: '2', studentName: 'Sarah Williams', course: 'Machine Learning', assignment: 75, midterm: 80, final: 78, total: 78, grade: 'B+' },
  { id: '3', studentName: 'Mike Chen', course: 'Neural Networks', assignment: 95, midterm: 98, final: 96, total: 96, grade: 'A+' },
  { id: '4', studentName: 'Emily Davis', course: 'Cryptography', assignment: 70, midterm: 65, final: 72, total: 69, grade: 'C+' },
  { id: '5', studentName: 'James Wilson', course: 'Data Structures', assignment: 60, midterm: 55, final: 58, total: 58, grade: 'D' },
  { id: '6', studentName: 'Lisa Park', course: 'Web Development', assignment: 85, midterm: 88, final: 90, total: 88, grade: 'A-' },
];

const marksSlice = createSlice({
  name: 'marks',
  initialState: { records },
  reducers: {},
});

export default marksSlice.reducer;
