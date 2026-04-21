import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
  id: string; title: string; message: string; type: 'info' | 'warning' | 'success' | 'error'; read: boolean; time: string;
}

const notifications: Notification[] = [
  { id: '1', title: 'New Assignment', message: 'ML Assignment 3 has been posted. Due: April 12', type: 'info', read: false, time: '5 min ago' },
  { id: '2', title: 'Grade Updated', message: 'Your Neural Networks midterm grade is now available', type: 'success', read: false, time: '1 hour ago' },
  { id: '3', title: 'Attendance Alert', message: 'Your attendance in Data Structures is below 75%', type: 'warning', read: false, time: '3 hours ago' },
  { id: '4', title: 'System Maintenance', message: 'Platform will be down for maintenance on April 8', type: 'error', read: true, time: '1 day ago' },
  { id: '5', title: 'New Course Available', message: 'Advanced NLP course registrations are now open', type: 'info', read: true, time: '2 days ago' },
];

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: { list: notifications },
  reducers: {
    markAsRead(state, action: PayloadAction<string>) {
      const n = state.list.find(n => n.id === action.payload);
      if (n) n.read = true;
    },
    markAllRead(state) {
      state.list.forEach(n => n.read = true);
    },
  },
});

export const { markAsRead, markAllRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
