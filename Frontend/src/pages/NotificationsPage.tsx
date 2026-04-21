import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { markAsRead, markAllRead } from '@/store/slice/notificationsSlice';
import { Bell, Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const NotificationsPage = () => {
  const notifications = useAppSelector(s => s.notifications.list);
  const dispatch = useAppDispatch();

  const typeConfig = {
    info: { icon: Info, color: 'text-info', bg: 'bg-info/10', border: 'border-info/30' },
    warning: { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' },
    success: { icon: CheckCircle, color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/30' },
    error: { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/30' },
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Notifications</h1>
        <button onClick={() => dispatch(markAllRead())} className="text-sm text-primary hover:underline">Mark all read</button>
      </div>

      <div className="space-y-3">
        {notifications.map(n => {
          const cfg = typeConfig[n.type];
          const Icon = cfg.icon;
          return (
            <div
              key={n.id}
              onClick={() => dispatch(markAsRead(n.id))}
              className={`glass-card p-4 flex items-start gap-4 cursor-pointer transition-all hover:border-primary/30 ${!n.read ? 'border-l-2 border-l-primary' : 'opacity-60'}`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${cfg.bg}`}>
                <Icon className={`w-4.5 h-4.5 ${cfg.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">{n.title}</h3>
                  <span className="text-xs text-muted-foreground shrink-0 ml-2">{n.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
              </div>
              {!n.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationsPage;
