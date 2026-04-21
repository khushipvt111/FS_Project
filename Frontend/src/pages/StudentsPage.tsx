import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { addStudent, deleteStudent, setSearchQuery } from '@/store/slice/studentsSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Trash2, Edit, X } from 'lucide-react';

const StudentsPage = () => {
  const { list, searchQuery } = useAppSelector(s => s.students);
  const dispatch = useAppDispatch();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', course: '', year: 1, gpa: 3.0 });

  const filtered = list.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addStudent({ ...form, avatar: '', status: 'active' }));
    setForm({ name: '', email: '', course: '', year: 1, gpa: 3.0 });
    setShowAdd(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-display font-bold">Students</h1>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={e => dispatch(setSearchQuery(e.target.value))}
              placeholder="Search students..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-muted/50 border border-border text-sm focus:outline-none focus:border-primary transition-all"
            />
          </div>
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-foreground neon-glow shrink-0" style={{ background: 'var(--gradient-primary)' }}>
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>

      {/* Add modal */}
      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowAdd(false)} />
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="glass-card p-6 w-full max-w-md relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-semibold text-lg">Add Student</h2>
                <button onClick={() => setShowAdd(false)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
              </div>
              <form onSubmit={handleAdd} className="space-y-3">
                {(['name', 'email', 'course'] as const).map(field => (
                  <input key={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} value={form[field]}
                    onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm focus:outline-none focus:border-primary" required />
                ))}
                <div className="grid grid-cols-2 gap-3">
                  <input type="number" placeholder="Year" value={form.year} onChange={e => setForm(p => ({ ...p, year: +e.target.value }))}
                    className="px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm focus:outline-none focus:border-primary" />
                  <input type="number" step="0.1" placeholder="GPA" value={form.gpa} onChange={e => setForm(p => ({ ...p, gpa: +e.target.value }))}
                    className="px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm focus:outline-none focus:border-primary" />
                </div>
                <button type="submit" className="w-full py-2 rounded-lg text-sm font-medium text-primary-foreground" style={{ background: 'var(--gradient-primary)' }}>Add Student</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 text-muted-foreground">
                <th className="text-left p-4 font-medium">Name</th>
                <th className="text-left p-4 font-medium hidden md:table-cell">Email</th>
                <th className="text-left p-4 font-medium">Course</th>
                <th className="text-left p-4 font-medium hidden sm:table-cell">Year</th>
                <th className="text-left p-4 font-medium">GPA</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-right p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">{s.name.charAt(0)}</div>
                    <span className="font-medium">{s.name}</span>
                  </td>
                  <td className="p-4 text-muted-foreground hidden md:table-cell">{s.email}</td>
                  <td className="p-4">{s.course}</td>
                  <td className="p-4 hidden sm:table-cell">{s.year}</td>
                  <td className="p-4">
                    <span className={`font-medium ${s.gpa >= 3.5 ? 'text-accent' : s.gpa >= 3.0 ? 'text-primary' : 'text-warning'}`}>{s.gpa}</span>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${s.status === 'active' ? 'bg-accent/10 text-accent' : 'bg-destructive/10 text-destructive'}`}>{s.status}</span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-muted-foreground hover:text-primary mr-2"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => dispatch(deleteStudent(s.id))} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;
