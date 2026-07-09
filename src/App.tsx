import { useMinerDashboard } from '@/hooks/useMinerDashboard';
import { useConfig } from '@/hooks/useConfig';
import StatusCard from '@/components/StatusCard/StatusCard';
import RewardPanel from '@/components/RewardPanel/RewardPanel';
import EventLog from '@/components/EventLog/EventLog';
import ConfigPanel from '@/components/ConfigPanel/ConfigPanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pickaxe, Play, Square, Wifi, WifiOff, Loader2, AlertCircle } from 'lucide-react';

const App = () => {
  const { config, setConfig } = useConfig();
  const { status, isLoading, isConnected, isActing, error, startMining, stopMining } =
    useMinerDashboard(config);

  const canStart = isConnected && !!config.apiCode && !status?.running && !isActing;
  const canStop = isConnected && !!status?.running && !isActing;

  return (
    <div className="min-h-dvh flex flex-col">
      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 border border-emerald-500/30">
              <Pickaxe className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-none tracking-tight">
                ClawQuest Miner
              </h1>
              <p className="text-xs text-muted-foreground leading-none mt-0.5">Dashboard</p>
            </div>
          </div>

          {/* Connection badge + controls */}
          <div className="flex items-center gap-3">
            <Badge variant={isConnected ? 'success' : 'destructive'} className="gap-1.5">
              {isConnected ? (
                <Wifi className="h-3 w-3" />
              ) : (
                <WifiOff className="h-3 w-3" />
              )}
              {isConnected ? 'Đã kết nối' : 'Mất kết nối'}
            </Badge>

            <Button
              id="stop-btn"
              size="sm"
              variant="destructive"
              disabled={!canStop}
              onClick={() => void stopMining()}
            >
              {isActing && !canStart ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Square className="h-3.5 w-3.5" />
              )}
              Dừng
            </Button>

            <Button
              id="start-btn"
              size="sm"
              variant="success"
              disabled={!canStart}
              onClick={() => void startMining()}
            >
              {isActing && !canStop ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Play className="h-3.5 w-3.5" />
              )}
              Bắt đầu
            </Button>
          </div>
        </div>
      </header>

      {/* ── Main content ────────────────────────────────────────── */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">

        {/* Global error banner */}
        {error && (
          <div className="mb-4 flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400 animate-slide-in">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Loading skeleton */}
        {isLoading && !status && (
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 rounded-xl border border-white/10 bg-white/5 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Dashboard grid */}
        {status && (
          <div className="grid gap-4 md:grid-cols-3">
            {/* Left: Status */}
            <div className="md:col-span-2 space-y-4">
              <StatusCard status={status} />
              <EventLog events={status.events} />
            </div>

            {/* Right: Sidebar */}
            <div className="space-y-4">
              <RewardPanel
                rewards={status.lastRewardDetails}
                playerStatus={status.lastPlayerStatus}
              />
              <ConfigPanel config={config} onSave={setConfig} />
            </div>
          </div>
        )}

        {/* No config state */}
        {!isLoading && !status && !error && (
          <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <Pickaxe className="h-8 w-8 text-emerald-400" />
            </div>
            <h2 className="text-xl font-semibold">Chào mừng đến ClawQuest Miner Dashboard</h2>
            <p className="text-sm text-muted-foreground max-w-sm">
              Nhập <strong>Backend URL</strong> và <strong>API Code</strong> trong bảng cấu hình bên dưới để bắt đầu.
            </p>
            <ConfigPanel config={config} onSave={setConfig} />
          </div>
        )}
      </main>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-4 text-center text-xs text-muted-foreground/50">
        ClawQuest Miner Dashboard — Tự động cập nhật mỗi 3 giây
      </footer>
    </div>
  );
};

export default App;
