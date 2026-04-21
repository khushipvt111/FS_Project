import { createSlice } from '@reduxjs/toolkit';

export interface Course {
  id: string; name: string; code: string; instructor: string; students: number; credits: number; category: string;
}

const courses: Course[] = [
  { id: '1', name: 'Machine Learning', code: 'CS401', instructor: 'Prof. Smith', students: 45, credits: 4, category: 'AI & ML' },
  { id: '2', name: 'Data Structures', code: 'CS201', instructor: 'Prof. Lee', students: 60, credits: 3, category: 'Core' },
  { id: '3', name: 'Neural Networks', code: 'CS402', instructor: 'Prof. Chen', students: 35, credits: 4, category: 'AI & ML' },
  { id: '4', name: 'Web Development', code: 'CS301', instructor: 'Prof. Davis', students: 55, credits: 3, category: 'Applied' },
  { id: '5', name: 'Cryptography', code: 'CS501', instructor: 'Prof. Brown', students: 28, credits: 3, category: 'Security' },
  { id: '6', name: 'Cloud Computing', code: 'CS403', instructor: 'Prof. Wilson', students: 40, credits: 4, category: 'Infrastructure' },
];

const coursesSlice = createSlice({
  name: 'courses',
  initialState: { list: courses },
  reducers: {},
});

export default coursesSlice.reducer;
