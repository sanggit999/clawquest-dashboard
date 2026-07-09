import type { MinerStatus } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getMiningPhaseLabel, formatDuration, formatTimestamp } from '@/utils/formatters';
import { Activity, Clock, AlertTriangle, TrendingUp } from 'lucide-react';

interface StatusCardProps {
  status: MinerStatus;
}

const getPhaseBadgeVariant = (
  running: boolean,
  phase: MinerStatus['phase'],
): 'success' | 'warning' | 'destructive' | 'secondary' => {
  if (!running) return 'secondary';
  if (phase === 'waiting_stamina_recovery') return 'warning';
  if (phase === 'stopping') return 'warning';
  return 'success';
};

const StatusCard = ({ status }: StatusCardProps) => {
  const badgeVariant = getPhaseBadgeVariant(status.running, status.phase);

  return (
    <Card className="animate-slide-in">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Activity className="h-4 w-4 text-emerald-400" />
            Trạng thái Đào
          </CardTitle>
          <div className="flex items-center gap-2">
            {status.running && (
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
            )}
            <Badge variant={badgeVariant}>
              {getMiningPhaseLabel(status.phase)}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3">
          <StatItem
            icon={<TrendingUp className="h-3.5 w-3.5 text-emerald-400" />}
            label="Vòng hoàn thành"
            value={status.roundsCompleted.toString()}
            valueClass="text-emerald-400"
          />
          <StatItem
            icon={<AlertTriangle className="h-3.5 w-3.5 text-amber-400" />}
            label="Lỗi liên tiếp"
            value={`${status.consecutiveErrorCount}/${status.maxConsecutiveErrorCount}`}
            valueClass={status.consecutiveErrorCount > 0 ? 'text-amber-400' : 'text-muted-foreground'}
          />
          <StatItem
            icon={<Clock className="h-3.5 w-3.5 text-blue-400" />}
            label="Thời gian chạy"
            value={status.startedAt ? formatDuration(status.startedAt) : '—'}
            valueClass="text-blue-400"
          />
        </div>

        {/* Message */}
        <div className="rounded-lg bg-white/5 px-3 py-2 text-xs text-muted-foreground leading-relaxed border border-white/5">
          {status.friendlyMessage ?? status.message}
        </div>

        {/* Last error */}
        {status.lastError && (
          <div className="flex items-start gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2">
            <AlertTriangle className="h-3.5 w-3.5 text-red-400 mt-0.5 shrink-0" />
            <p className="text-xs text-red-400 break-all">{status.lastError}</p>
          </div>
        )}

        {/* Timing */}
        {status.updatedAt > 0 && (
          <p className="text-xs text-muted-foreground/60 text-right">
            Cập nhật lúc {formatTimestamp(status.updatedAt)}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClass?: string;
}

const StatItem = ({ icon, label, value, valueClass }: StatItemProps) => (
  <div className="flex flex-col gap-1 rounded-lg bg-white/5 border border-white/5 p-3">
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      {icon}
      <span>{label}</span>
    </div>
    <p className={`text-lg font-bold font-mono tracking-tight ${valueClass ?? ''}`}>{value}</p>
  </div>
);

export default StatusCard;
