import { useState, useEffect } from 'react';
import { ScanFace, Camera, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FaceAttendancePage = () => {
  const [scanning, setScanning] = useState(false);
  const [detected, setDetected] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (scanning) {
      setDetected(false);
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) { clearInterval(interval); setDetected(true); setScanning(false); return 100; }
          return p + 2;
        });
      }, 60);
      return () => clearInterval(interval);
    }
  }, [scanning]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ScanFace className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-display font-bold">Face Recognition Attendance</h1>
      </div>

      <div className="max-w-lg mx-auto">
        <div className="glass-card p-6">
          {/* Camera view mock */}
          <div className="relative aspect-video bg-muted/30 rounded-xl overflow-hidden border border-border/50 mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              {!scanning && !detected && (
                <div className="text-center">
                  <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Camera preview</p>
                </div>
              )}

              {scanning && (
                <div className="relative">
                  {/* Face outline */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-32 h-40 rounded-[50%] border-2 border-primary"
                  />
                  {/* Scan line */}
                  <motion.div
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute left-0 right-0 h-0.5 bg-primary/70"
                    style={{ boxShadow: '0 0 10px hsl(199 89% 48% / 0.5)' }}
                  />
                  {/* Corner markers */}
                  {['-top-1 -left-1', '-top-1 -right-1', '-bottom-1 -left-1', '-bottom-1 -right-1'].map((pos, i) => (
                    <div key={i} className={`absolute ${pos} w-4 h-4 border-primary ${i < 2 ? 'border-t-2' : 'border-b-2'} ${i % 2 === 0 ? 'border-l-2' : 'border-r-2'}`} />
                  ))}
                </div>
              )}

              <AnimatePresence>
                {detected && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
                    <CheckCircle className="w-16 h-16 text-accent mx-auto mb-2" />
                    <p className="text-accent font-semibold">Face Detected!</p>
                    <p className="text-sm text-muted-foreground">Attendance marked successfully</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Progress */}
          {scanning && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin" />Scanning...</span>
                <span className="text-xs text-primary">{progress}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ width: `${progress}%`, background: 'var(--gradient-primary)' }} />
              </div>
            </div>
          )}

          <button
            onClick={() => { setScanning(true); setDetected(false); }}
            disabled={scanning}
            className="w-full py-3 rounded-lg font-semibold text-primary-foreground transition-all disabled:opacity-50 neon-glow"
            style={{ background: 'var(--gradient-primary)' }}
          >
            {scanning ? 'Scanning...' : detected ? 'Scan Again' : 'Start Face Scan'}
          </button>

          {/* Recent scans */}
          <div className="mt-6 space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Recent Scans</h4>
            {['Alex Johnson - 9:00 AM', 'Sarah Williams - 9:02 AM', 'Mike Chen - 9:05 AM'].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-sm p-2 rounded-lg bg-muted/20">
                <CheckCircle className="w-3.5 h-3.5 text-accent" />
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceAttendancePage;
