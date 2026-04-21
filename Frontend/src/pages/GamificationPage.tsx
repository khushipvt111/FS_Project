import { Trophy, Star, Zap, Award, Medal, Target, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

const badges = [
  { name: 'Quick Learner', icon: Zap, earned: true, desc: 'Complete 5 courses', color: 'text-primary' },
  { name: 'Perfect Score', icon: Star, earned: true, desc: 'Score 100% on any exam', color: 'text-warning' },
  { name: 'Consistent', icon: Target, earned: true, desc: '30-day attendance streak', color: 'text-accent' },
  { name: 'Scholar', icon: Award, earned: false, desc: 'Maintain 3.9+ GPA', color: 'text-secondary' },
  { name: 'Champion', icon: Medal, earned: false, desc: 'Win a hackathon', color: 'text-warning' },
  { name: 'Fire Streak', icon: Flame, earned: false, desc: '7-day study streak', color: 'text-destructive' },
];

const achievements = [
  { title: 'ML Mastery', desc: 'Completed all Machine Learning modules', xp: 500, date: 'Mar 2026' },
  { title: 'Code Warrior', desc: 'Solved 100 coding problems', xp: 350, date: 'Feb 2026' },
  { title: 'Team Player', desc: 'Contributed to 5 group projects', xp: 250, date: 'Jan 2026' },
];

const GamificationPage = () => {
  const totalXP = 2450;
  const level = Math.floor(totalXP / 500) + 1;
  const xpInLevel = totalXP % 500;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Trophy className="w-6 h-6 text-warning" />
        <h1 className="text-2xl font-display font-bold">Gamification</h1>
      </div>

      {/* XP & Level */}
      <div className="glass-card p-6 gradient-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-muted-foreground">Current Level</div>
            <div className="text-4xl font-display font-bold gradient-text">Level {level}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Total XP</div>
            <div className="text-2xl font-display font-bold text-warning">{totalXP} XP</div>
          </div>
        </div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground">Progress to Level {level + 1}</span>
          <span className="text-xs text-primary">{xpInLevel}/500 XP</span>
        </div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${(xpInLevel / 500) * 100}%` }} transition={{ duration: 1 }}
            className="h-full rounded-full" style={{ background: 'var(--gradient-primary)' }} />
        </div>
      </div>

      {/* Badges */}
      <div>
        <h3 className="font-display font-semibold mb-4">Badges</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {badges.map((b, i) => (
            <motion.div key={b.name} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
              className={`glass-card p-4 text-center ${!b.earned ? 'opacity-40 grayscale' : ''}`}>
              <b.icon className={`w-8 h-8 mx-auto mb-2 ${b.color} ${b.earned ? 'animate-float' : ''}`} />
              <div className="text-xs font-medium">{b.name}</div>
              <div className="text-[10px] text-muted-foreground mt-1">{b.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievement Cards */}
      <div>
        <h3 className="font-display font-semibold mb-4">Recent Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((a, i) => (
            <motion.div key={a.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
              className="glass-card p-5 hover:neon-glow transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <Award className="w-5 h-5 text-warning" />
                <span className="text-xs text-accent font-bold">+{a.xp} XP</span>
              </div>
              <h4 className="font-display font-semibold">{a.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{a.desc}</p>
              <div className="text-[10px] text-muted-foreground mt-3">{a.date}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamificationPage;
