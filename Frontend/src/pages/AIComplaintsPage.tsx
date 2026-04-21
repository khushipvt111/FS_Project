import { MessageSquareWarning, Lightbulb, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const complaints = [
  { id: 1, title: 'Grade discrepancy in ML midterm', category: 'Academic', sentiment: 'negative', status: 'open',
    suggestion: 'Schedule a meeting with Prof. Smith to review the grading rubric', sentimentScore: 0.2 },
  { id: 2, title: 'Library resources outdated', category: 'Facilities', sentiment: 'neutral', status: 'in-progress',
    suggestion: 'Submit a formal request to the library committee for updated materials', sentimentScore: 0.5 },
  { id: 3, title: 'Hostel wifi connectivity issues', category: 'Infrastructure', sentiment: 'negative', status: 'open',
    suggestion: 'Contact IT support and document the specific times of connectivity issues', sentimentScore: 0.15 },
  { id: 4, title: 'Great teaching methodology in CS401', category: 'Feedback', sentiment: 'positive', status: 'resolved',
    suggestion: 'Share this feedback with the department for recognition', sentimentScore: 0.9 },
];

const sentimentConfig = {
  positive: { color: 'text-accent', bg: 'bg-accent/10', bar: 'bg-accent' },
  neutral: { color: 'text-warning', bg: 'bg-warning/10', bar: 'bg-warning' },
  negative: { color: 'text-destructive', bg: 'bg-destructive/10', bar: 'bg-destructive' },
};

const categoryColors: Record<string, string> = {
  Academic: 'bg-primary/10 text-primary border-primary/30',
  Facilities: 'bg-secondary/10 text-secondary border-secondary/30',
  Infrastructure: 'bg-warning/10 text-warning border-warning/30',
  Feedback: 'bg-accent/10 text-accent border-accent/30',
};

const AIComplaintsPage = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <MessageSquareWarning className="w-6 h-6 text-primary" />
      <h1 className="text-2xl font-display font-bold">AI Complaint Resolution</h1>
    </div>

    <div className="space-y-4">
      {complaints.map((c, i) => {
        const sCfg = sentimentConfig[c.sentiment as keyof typeof sentimentConfig];
        return (
          <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-5">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`text-xs px-2.5 py-1 rounded-full border ${categoryColors[c.category]}`}>{c.category}</span>
              <span className={`text-xs px-2.5 py-1 rounded-full ${sCfg.bg} ${sCfg.color} capitalize`}>{c.sentiment}</span>
              <span className={`text-xs px-2.5 py-1 rounded-full ${c.status === 'resolved' ? 'bg-accent/10 text-accent' : c.status === 'in-progress' ? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'}`}>
                {c.status}
              </span>
            </div>
            <h3 className="font-medium mb-2">{c.title}</h3>

            {/* Sentiment bar */}
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className={`w-3.5 h-3.5 ${sCfg.color}`} />
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${sCfg.bar}`} style={{ width: `${c.sentimentScore * 100}%` }} />
              </div>
              <span className={`text-xs ${sCfg.color}`}>{Math.round(c.sentimentScore * 100)}%</span>
            </div>

            {/* AI Suggestion */}
            <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
              <Lightbulb className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span className="text-sm text-muted-foreground">{c.suggestion}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
);

export default AIComplaintsPage;
