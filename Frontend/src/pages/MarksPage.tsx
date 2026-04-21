import { useAppSelector } from '@/store/hooks';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MarksPage = () => {
  const records = useAppSelector(s => s.marks.records);

  const chartData = records.map(r => ({ name: r.studentName.split(' ')[0], assignment: r.assignment, midterm: r.midterm, final: r.final }));

  const gradeColor = (g: string) => {
    if (g.startsWith('A')) return 'text-accent';
    if (g.startsWith('B')) return 'text-primary';
    if (g.startsWith('C')) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">Marks & Results</h1>

      <div className="glass-card p-5">
        <h3 className="font-display font-semibold mb-4">Score Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 18%)" />
            <XAxis dataKey="name" stroke="hsl(215, 20%, 55%)" fontSize={12} />
            <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
            <Tooltip contentStyle={{ background: 'hsl(222, 47%, 9%)', border: '1px solid hsl(217, 33%, 18%)', borderRadius: '8px', color: 'hsl(210, 40%, 96%)' }} />
            <Bar dataKey="assignment" fill="hsl(199, 89%, 48%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="midterm" fill="hsl(262, 83%, 58%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="final" fill="hsl(160, 84%, 39%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 text-muted-foreground">
              <th className="text-left p-4 font-medium">Student</th>
              <th className="text-left p-4 font-medium hidden sm:table-cell">Course</th>
              <th className="text-center p-4 font-medium">Assignment</th>
              <th className="text-center p-4 font-medium hidden md:table-cell">Midterm</th>
              <th className="text-center p-4 font-medium hidden md:table-cell">Final</th>
              <th className="text-center p-4 font-medium">Total</th>
              <th className="text-center p-4 font-medium">Grade</th>
            </tr>
          </thead>
          <tbody>
            {records.map(r => (
              <tr key={r.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                <td className="p-4 font-medium">{r.studentName}</td>
                <td className="p-4 text-muted-foreground hidden sm:table-cell">{r.course}</td>
                <td className="p-4 text-center">{r.assignment}</td>
                <td className="p-4 text-center hidden md:table-cell">{r.midterm}</td>
                <td className="p-4 text-center hidden md:table-cell">{r.final}</td>
                <td className="p-4 text-center font-semibold">{r.total}</td>
                <td className="p-4 text-center"><span className={`font-bold ${gradeColor(r.grade)}`}>{r.grade}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarksPage;
