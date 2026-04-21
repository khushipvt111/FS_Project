import { useAppSelector } from '@/store/hooks';
import { User, Mail, BookOpen, Award, Calendar, MapPin } from 'lucide-react';

const ProfilePage = () => {
  const user = useAppSelector(s => s.auth.user);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-display font-bold">Profile</h1>

      <div className="glass-card p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-display font-bold text-primary-foreground" style={{ background: 'var(--gradient-primary)' }}>
            {user?.name?.charAt(0)}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-display font-bold">{user?.name}</h2>
            <p className="text-muted-foreground capitalize">{user?.role}</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="w-3.5 h-3.5" /> University Campus, Building A
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: Mail, label: 'Email', value: user?.email || 'student@uni.edu' },
          { icon: BookOpen, label: 'Department', value: 'Computer Science' },
          { icon: Calendar, label: 'Enrolled Since', value: 'September 2023' },
          { icon: Award, label: 'Current GPA', value: '3.8 / 4.0' },
        ].map(item => (
          <div key={item.label} className="glass-card p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">{item.label}</div>
              <div className="text-sm font-medium">{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card p-6">
        <h3 className="font-display font-semibold mb-4">About</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Passionate about artificial intelligence and machine learning. Currently pursuing advanced studies in deep learning and neural network architectures. Active participant in hackathons and coding competitions.
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
