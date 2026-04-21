import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slice/authSlice';
import {
  LayoutDashboard, Users, BookOpen, CalendarCheck, BarChart3, User, Bell,
  TrendingUp, MessageSquareWarning, ScanFace, Trophy, Bot, Calendar,
  LogOut, Menu, X, ChevronLeft
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/students', label: 'Students', icon: Users },
  { path: '/courses', label: 'Courses', icon: BookOpen },
  { path: '/attendance', label: 'Attendance', icon: CalendarCheck },
  { path: '/marks', label: 'Marks/Results', icon: BarChart3 },
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/notifications', label: 'Notifications', icon: Bell },
  { type: 'divider', label: 'AI Features' },
  { path: '/ai-study-plan', label: 'AI Study Plan', icon: Bot },
  { path: '/ai-predictor', label: 'AI Predictor', icon: TrendingUp },
  { path: '/ai-complaints', label: 'AI Complaints', icon: MessageSquareWarning },
  { path: '/face-attendance', label: 'Face Recognition', icon: ScanFace },
  { path: '/gamification', label: 'Gamification', icon: Trophy },
  { path: '/timetable', label: 'Timetable', icon: Calendar },
] as const;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useAppSelector(s => s.auth.user);
  const unreadCount = useAppSelector(s => s.notifications.list.filter(n => !n.read).length);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => { dispatch(logout()); navigate('/login'); };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center gap-3 border-b border-border/50">
        {!collapsed && <span className="font-display font-bold text-lg gradient-text">EduAI</span>}
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {navItems.map((item, i) => {
          if ('type' in item) {
            return !collapsed ? (
              <div key={i} className="px-3 py-2 mt-4 mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {item.label}
              </div>
            ) : <div key={i} className="my-2 border-t border-border/50" />;
          }
          const Icon = item.icon;
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => { navigate(item.path); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                active
                  ? 'bg-primary/10 text-primary neon-glow'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              }`}
            >
              <Icon className="w-4.5 h-4.5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
              {item.path === '/notifications' && unreadCount > 0 && !collapsed && (
                <span className="ml-auto text-xs bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded-full">{unreadCount}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold shrink-0">
            {user?.name?.charAt(0)}
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">{user?.name}</div>
              <div className="text-xs text-muted-foreground capitalize">{user?.role}</div>
            </div>
          )}
        </div>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-all">
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex">
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col border-r border-border bg-card transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'}`}>
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-4 -right-3 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground z-50 hidden lg:flex"
          style={{ left: collapsed ? '52px' : '228px' }}
        >
          <ChevronLeft className={`w-3 h-3 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-60 bg-card border-r border-border animate-slide-in-left">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border bg-card flex items-center px-4 gap-4 sticky top-0 z-40">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden text-muted-foreground hover:text-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/notifications')} className="relative text-muted-foreground hover:text-foreground">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center">{unreadCount}</span>
              )}
            </button>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
