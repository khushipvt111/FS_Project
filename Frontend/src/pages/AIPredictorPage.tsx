import { TrendingUp, Brain } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';

const predictionData = [
  { month: 'Jan', actual: 72, predicted: 70 },
  { month: 'Feb', actual: 78, predicted: 76 },
  { month: 'Mar', actual: 75, predicted: 79 },
  { month: 'Apr', actual: 82, predicted: 83 },
  { month: 'May', actual: 88, predicted: 86 },
  { month: 'Jun', actual: null, predicted: 91 },
  { month: 'Jul', actual: null, predicted: 93 },
];

const predictions = [
  { label: 'Predicted Final GPA', value: '3.85', trend: '+0.15', confidence: 92 },
  { label: 'Expected Rank', value: 'Top 10%', trend: '↑3 places', confidence: 87 },
  { label: 'Course Completion', value: '96%', trend: '+4%', confidence: 95 },
];

const AIPredictorPage = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <TrendingUp className="w-6 h-6 text-primary" />
      <h1 className="text-2xl font-display font-bold">AI Performance Predictor</h1>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {predictions.map((p, i) => (
        <motion.div key={p.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-5">
          <div className="text-xs text-muted-foreground mb-2">{p.label}</div>
          <div className="text-2xl font-display font-bold gradient-text">{p.value}</div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-accent">{p.trend}</span>
            <span className="text-xs text-muted-foreground">Confidence: {p.confidence}%</span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${p.confidence}%`, background: 'var(--gradient-primary)' }} />
          </div>
        </motion.div>
      ))}
    </div>

    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-4 h-4 text-secondary" />
        <h3 className="font-display font-semibold">Predicted vs Actual Performance</h3>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={predictionData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 18%)" />
          <XAxis dataKey="month" stroke="hsl(215, 20%, 55%)" fontSize={12} />
          <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
          <Tooltip contentStyle={{ background: 'hsl(222, 47%, 9%)', border: '1px solid hsl(217, 33%, 18%)', borderRadius: '8px', color: 'hsl(210, 40%, 96%)' }} />
          <Legend />
          <Line type="monotone" dataKey="actual" stroke="hsl(160, 84%, 39%)" strokeWidth={2} dot={{ r: 4 }} name="Actual" />
          <Line type="monotone" dataKey="predicted" stroke="hsl(262, 83%, 58%)" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} name="Predicted" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default AIPredictorPage;
