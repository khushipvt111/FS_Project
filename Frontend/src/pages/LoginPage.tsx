import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { login, UserRole } from '@/store/slice/authSlice';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email: email || `${role}@uni.edu`, role }));
    navigate('/dashboard');
  };

  const roles: { value: UserRole; label: string; desc: string }[] = [
    { value: 'admin', label: 'Admin', desc: 'Full system access' },
    { value: 'teacher', label: 'Teacher', desc: 'Manage courses & grades' },
    { value: 'student', label: 'Student', desc: 'View & learn' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/20 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <h1 className="text-2xl font-display font-bold gradient-text">EduAI</h1>
          </div>
          <p className="text-muted-foreground text-sm">AI-Enhanced Student Management</p>
        </div>

        <div className="flex gap-2 mb-6">
          {roles.map(r => (
            <button
              key={r.value}
              onClick={() => setRole(r.value)}
              className={`flex-1 p-3 rounded-lg border text-center transition-all duration-200 ${
                role === r.value
                  ? 'border-primary bg-primary/10 text-primary neon-glow'
                  : 'border-border bg-muted/30 text-muted-foreground hover:border-muted-foreground/50'
              }`}
            >
              <div className="text-xs font-medium">{r.label}</div>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-primary-foreground transition-all duration-300 hover:opacity-90 neon-glow"
            style={{ background: 'var(--gradient-primary)' }}
          >
            {isSignup ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={() => setIsSignup(!isSignup)} className="text-primary hover:underline">
            {isSignup ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
