import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import studentsReducer from './slice/studentsSlice';
import coursesReducer from './slice/coursesSlice';
import attendanceReducer from './slice/attendanceSlice';
import marksReducer from './slice/marksSlice';
import notificationsReducer from './slice/notificationsSlice';
import chatbotReducer from './slice/chatbotSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentsReducer,
    courses: coursesReducer,
    attendance: attendanceReducer,
    marks: marksReducer,
    notifications: notificationsReducer,
    chatbot: chatbotReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
