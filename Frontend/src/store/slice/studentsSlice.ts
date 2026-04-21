import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Student {
  id: string; name: string; email: string; course: string; year: number; gpa: number; avatar: string; status: 'active' | 'inactive';
}

const dummyStudents: Student[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex@uni.edu', course: 'Computer Science', year: 3, gpa: 3.8, avatar: '', status: 'active' },
  { id: '2', name: 'Sarah Williams', email: 'sarah@uni.edu', course: 'Data Science', year: 2, gpa: 3.6, avatar: '', status: 'active' },
  { id: '3', name: 'Mike Chen', email: 'mike@uni.edu', course: 'AI & ML', year: 4, gpa: 3.9, avatar: '', status: 'active' },
  { id: '4', name: 'Emily Davis', email: 'emily@uni.edu', course: 'Cybersecurity', year: 1, gpa: 3.4, avatar: '', status: 'active' },
  { id: '5', name: 'James Wilson', email: 'james@uni.edu', course: 'Computer Science', year: 2, gpa: 2.9, avatar: '', status: 'inactive' },
  { id: '6', name: 'Lisa Park', email: 'lisa@uni.edu', course: 'Data Science', year: 3, gpa: 3.7, avatar: '', status: 'active' },
];

const studentsSlice = createSlice({
  name: 'students',
  initialState: { list: dummyStudents, searchQuery: '' },
  reducers: {
    addStudent(state, action: PayloadAction<Omit<Student, 'id'>>) {
      state.list.push({ ...action.payload, id: Date.now().toString() });
    },
    updateStudent(state, action: PayloadAction<Student>) {
      const idx = state.list.findIndex(s => s.id === action.payload.id);
      if (idx !== -1) state.list[idx] = action.payload;
    },
    deleteStudent(state, action: PayloadAction<string>) {
      state.list = state.list.filter(s => s.id !== action.payload);
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const { addStudent, updateStudent, deleteStudent, setSearchQuery } = studentsSlice.actions;
export default studentsSlice.reducer;
