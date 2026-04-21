import { Brain, TrendingUp, AlertTriangle, Lightbulb, Target } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const radarData = [
  { subject: 'ML', score: 88, fullMark: 100 },
  { subject: 'DS', score: 65, fullMark: 100 },
  { subject: 'Neural Nets', score: 92, fullMark: 100 },
  { subject: 'Stats', score: 70, fullMark: 100 },
  { subject: 'Python', score: 95, fullMark: 100 },
  { subject: 'Math', score: 60, fullMark: 100 },
];

const weakTopics = [
  { topic: 'Linear Algebra', score: 45, suggestion: 'Review matrix operations & eigenvalues' },
  { topic: 'Probability', score: 52, suggestion: 'Practice Bayes theorem problems' },
  { topic: 'Data Structures', score: 58, suggestion: 'Focus on tree traversal algorithms' },
];

const strengths = [
  { topic: 'Python Programming', score: 95 },
  { topic: 'Neural Networks', score: 92 },
  { topic: 'Machine Learning', score: 88 },
];

const AIStudyPlanPage = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <Brain className="w-6 h-6 text-primary" />
      <h1 className="text-2xl font-display font-bold">AI Study Plan</h1>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Radar */}
      <div className="glass-card p-5">
        <h3 className="font-display font-semibold mb-4">Skill Radar</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="hsl(217, 33%, 18%)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }} />
            <Radar dataKey="score" stroke="hsl(199, 89%, 48%)" fill="hsl(199, 89%, 48%)" fillOpacity={0.2} strokeWidth={2} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* AI Suggestions */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-4 h-4 text-warning" />
          <h3 className="font-display font-semibold">AI Suggestions</h3>
        </div>
        <div className="space-y-3">
          {[
            'Focus 2 hours daily on Linear Algebra fundamentals',
            'Take the Probability practice quiz this weekend',
            'Join the Data Structures study group on Tuesday',
            'Review lecture recordings for Statistics Week 5-7',
            'Complete 3 coding challenges on Trees & Graphs',
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/30">
              <Target className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span className="text-sm">{s}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* Weak Topics */}
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-4 h-4 text-warning" />
        <h3 className="font-display font-semibold">Weak Topics</h3>
      </div>
      <div className="space-y-4">
        {weakTopics.map(t => (
          <div key={t.topic}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">{t.topic}</span>
              <span className="text-sm text-warning font-bold">{t.score}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-1">
              <div className="h-full rounded-full bg-warning/70" style={{ width: `${t.score}%` }} />
            </div>
            <p className="text-xs text-muted-foreground">{t.suggestion}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Strengths */}
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-accent" />
        <h3 className="font-display font-semibold">Strengths</h3>
      </div>
      <div className="space-y-3">
        {strengths.map(s => (
          <div key={s.topic}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">{s.topic}</span>
              <span className="text-sm text-accent font-bold">{s.score}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${s.score}%`, background: 'var(--gradient-accent)' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AIStudyPlanPage;
