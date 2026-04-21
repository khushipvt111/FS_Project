import { Calendar } from 'lucide-react';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const times = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

interface TimetableEntry { subject: string; room: string; color: string; row: number; col: number; span?: number; }

const entries: TimetableEntry[] = [
  { subject: 'Machine Learning', room: 'A101', color: 'bg-primary/20 border-primary/40 text-primary', row: 0, col: 0, span: 2 },
  { subject: 'Data Structures', room: 'B203', color: 'bg-secondary/20 border-secondary/40 text-secondary', row: 0, col: 2 },
  { subject: 'Neural Networks', room: 'A102', color: 'bg-accent/20 border-accent/40 text-accent', row: 2, col: 0 },
  { subject: 'Web Dev', room: 'C301', color: 'bg-warning/20 border-warning/40 text-warning', row: 2, col: 1, span: 2 },
  { subject: 'Cryptography', room: 'D405', color: 'bg-destructive/20 border-destructive/40 text-destructive', row: 4, col: 3 },
  { subject: 'Cloud Computing', room: 'A103', color: 'bg-info/20 border-info/40 text-info', row: 3, col: 0 },
  { subject: 'Machine Learning', room: 'Lab 1', color: 'bg-primary/20 border-primary/40 text-primary', row: 1, col: 2, span: 2 },
  { subject: 'Data Structures', room: 'B203', color: 'bg-secondary/20 border-secondary/40 text-secondary', row: 3, col: 4 },
  { subject: 'Neural Networks', room: 'Lab 2', color: 'bg-accent/20 border-accent/40 text-accent', row: 5, col: 1 },
  { subject: 'Statistics', room: 'E501', color: 'bg-primary/20 border-primary/40 text-primary', row: 6, col: 3 },
];

const TimetablePage = () => {
  // Build grid
  const grid: (TimetableEntry | null)[][] = times.map(() => days.map(() => null));
  entries.forEach(e => { if (e.row < times.length && e.col < days.length) grid[e.row][e.col] = e; });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Calendar className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-display font-bold">Smart Timetable</h1>
      </div>

      <div className="glass-card p-4 overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>
              <th className="p-3 text-xs text-muted-foreground font-medium w-16">Time</th>
              {days.map(d => (
                <th key={d} className="p-3 text-xs text-muted-foreground font-medium text-center">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time, ri) => (
              <tr key={time} className="border-t border-border/30">
                <td className="p-3 text-xs text-muted-foreground font-mono">{time}</td>
                {days.map((_, ci) => {
                  const entry = grid[ri][ci];
                  return (
                    <td key={ci} className="p-1">
                      {entry ? (
                        <div className={`p-2.5 rounded-lg border ${entry.color} text-center transition-all hover:scale-105 cursor-pointer`}>
                          <div className="text-xs font-semibold truncate">{entry.subject}</div>
                          <div className="text-[10px] opacity-70 mt-0.5">{entry.room}</div>
                        </div>
                      ) : (
                        <div className="h-12" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-medium mb-3">Legend</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { name: 'ML', color: 'bg-primary' }, { name: 'Data Structures', color: 'bg-secondary' },
            { name: 'Neural Networks', color: 'bg-accent' }, { name: 'Web Dev', color: 'bg-warning' },
            { name: 'Cryptography', color: 'bg-destructive' }, { name: 'Cloud', color: 'bg-info' },
          ].map(l => (
            <span key={l.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className={`w-2.5 h-2.5 rounded-sm ${l.color}`} />{l.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimetablePage;
