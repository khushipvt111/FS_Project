import { motion } from 'framer-motion';
import { useAppSelector } from '@/store/hooks';
import { Users, BookOpen, TrendingUp, Award, Brain, BarChart3 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const performanceData = [
  { month: 'Jan', score: 72 }, { month: 'Feb', score: 78 }, { month: 'Mar', score: 75 },
  { month: 'Apr', score: 82 }, { month: 'May', score: 88 }, { month: 'Jun', score: 85 },
];

const courseDistribution = [
  { name: 'AI & ML', value: 35 }, { name: 'Core', value: 25 },
  { name: 'Applied', value: 20 }, { name: 'Security', value: 20 },
];

const COLORS = ['hsl(199, 89%, 48%)', 'hsl(262, 83%, 58%)', 'hsl(160, 84%, 39%)', 'hsl(38, 92%, 50%)'];

const DashboardPage = () => {
  const user = useAppSelector(s => s.auth.user);
  const students = useAppSelector(s => s.students.list);
  const courses = useAppSelector(s => s.courses.list);

  const stats = [
    { label: 'Total Students', value: students.length, icon: Users, color: 'text-primary' },
    { label: 'Active Courses', value: courses.length, icon: BookOpen, color: 'text-secondary' },
    { label: 'Avg. GPA', value: '3.55', icon: TrendingUp, color: 'text-accent' },
    { label: 'Achievements', value: '24', icon: Award, color: 'text-warning' },
  ];

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">Welcome back, {user?.name} 👋</h1>
        <p className="text-muted-foreground text-sm mt-1">Here's your academic overview</p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <motion.div key={s.label} variants={item} className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <s.icon className={`w-5 h-5 ${s.color}`} />
              <span className="text-xs text-accent bg-accent/10 px-2 py-0.5 rounded-full">+12%</span>
            </div>
            <div className="text-2xl font-display font-bold">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-primary" />
            <h3 className="font-display font-semibold">Performance Trend</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 18%)" />
              <XAxis dataKey="month" stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <Tooltip contentStyle={{ background: 'hsl(222, 47%, 9%)', border: '1px solid hsl(217, 33%, 18%)', borderRadius: '8px', color: 'hsl(210, 40%, 96%)' }} />
              <Area type="monotone" dataKey="score" stroke="hsl(199, 89%, 48%)" fill="url(#colorScore)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-4 h-4 text-secondary" />
            <h3 className="font-display font-semibold">Course Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={courseDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4}>
                {courseDistribution.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'hsl(222, 47%, 9%)', border: '1px solid hsl(217, 33%, 18%)', borderRadius: '8px', color: 'hsl(210, 40%, 96%)' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-2">
            {courseDistribution.map((c, i) => (
              <span key={c.name} className="text-xs flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
                {c.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="glass-card p-5">
        <h3 className="font-display font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { text: 'Alex Johnson submitted ML Assignment 3', time: '2 hours ago', color: 'bg-primary' },
            { text: 'New grade posted for Neural Networks', time: '5 hours ago', color: 'bg-accent' },
            { text: 'Attendance marked for Data Structures', time: '1 day ago', color: 'bg-secondary' },
            { text: 'AI Study Plan updated for 3 students', time: '1 day ago', color: 'bg-warning' },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <span className={`w-2 h-2 rounded-full shrink-0 ${a.color}`} />
              <span className="flex-1">{a.text}</span>
              <span className="text-muted-foreground text-xs">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
