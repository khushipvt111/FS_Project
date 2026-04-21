import { useAppSelector } from '@/store/hooks';
import { CalendarCheck, CheckCircle, XCircle, Clock } from 'lucide-react';

const AttendancePage = () => {
  const records = useAppSelector(s => s.attendance.records);

  const statusConfig = {
    present: { icon: CheckCircle, color: 'text-accent', bg: 'bg-accent/10' },
    absent: { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10' },
    late: { icon: Clock, color: 'text-warning', bg: 'bg-warning/10' },
  };

  const presentCount = records.filter(r => r.status === 'present').length;
  const percentage = Math.round((presentCount / records.length) * 100);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">Attendance</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Present', count: records.filter(r => r.status === 'present').length, color: 'text-accent' },
          { label: 'Absent', count: records.filter(r => r.status === 'absent').length, color: 'text-destructive' },
          { label: 'Late', count: records.filter(r => r.status === 'late').length, color: 'text-warning' },
        ].map(s => (
          <div key={s.label} className="glass-card p-5 text-center">
            <div className={`text-3xl font-display font-bold ${s.color}`}>{s.count}</div>
            <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Overall Attendance Rate</span>
          <span className="text-sm font-bold text-accent">{percentage}%</span>
        </div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${percentage}%`, background: 'var(--gradient-accent)' }} />
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 text-muted-foreground">
              <th className="text-left p-4 font-medium">Student</th>
              <th className="text-left p-4 font-medium hidden sm:table-cell">Course</th>
              <th className="text-left p-4 font-medium">Date</th>
              <th className="text-left p-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map(r => {
              const cfg = statusConfig[r.status];
              const Icon = cfg.icon;
              return (
                <tr key={r.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                  <td className="p-4 font-medium">{r.studentName}</td>
                  <td className="p-4 text-muted-foreground hidden sm:table-cell">{r.course}</td>
                  <td className="p-4 text-muted-foreground">{r.date}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>
                      <Icon className="w-3 h-3" />{r.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendancePage;
