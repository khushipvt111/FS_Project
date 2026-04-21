import { useAppSelector } from '@/store/hooks';
import { BookOpen, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const CoursesPage = () => {
  const courses = useAppSelector(s => s.courses.list);

  const categoryColors: Record<string, string> = {
    'AI & ML': 'bg-primary/10 text-primary border-primary/30',
    'Core': 'bg-secondary/10 text-secondary border-secondary/30',
    'Applied': 'bg-accent/10 text-accent border-accent/30',
    'Security': 'bg-warning/10 text-warning border-warning/30',
    'Infrastructure': 'bg-info/10 text-info border-info/30',
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">Courses & Subjects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-5 hover:neon-glow transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs px-2 py-1 rounded-full border ${categoryColors[c.category] || 'bg-muted text-muted-foreground'}`}>{c.category}</span>
              <span className="text-xs text-muted-foreground">{c.code}</span>
            </div>
            <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{c.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{c.instructor}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{c.students}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{c.credits} credits</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
