import type { MiningSessionEvent } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getEventLabel, formatTimestamp } from '@/utils/formatters';
import { ScrollText } from 'lucide-react';

interface EventLogProps {
  events: MiningSessionEvent[];
}

const getEventStyle = (type: MiningSessionEvent['type']): string => {
  const styles: Record<MiningSessionEvent['type'], string> = {
    session_started: 'border-blue-500/30 bg-blue-500/5',
    round_completed: 'border-emerald-500/30 bg-emerald-500/5',
    error: 'border-red-500/30 bg-red-500/5',
    stopped: 'border-amber-500/30 bg-amber-500/5',
  };
  return styles[type] ?? 'border-white/10 bg-white/5';
};

const getPayloadSummary = (event: MiningSessionEvent): string | null => {
  const p = event.payload;
  if (event.type === 'round_completed' && typeof p.roundsCompleted === 'number') {
    return `Vòng #${p.roundsCompleted}`;
  }
  if (event.type === 'error' && typeof p.message === 'string') {
    return p.message.slice(0, 60) + (p.message.length > 60 ? '…' : '');
  }
  if (event.type === 'stopped' && typeof p.stopReason === 'string') {
    return `Lý do: ${p.stopReason}`;
  }
  return null;
};

const EventLog = ({ events }: EventLogProps) => {
  const reversed = [...events].reverse();

  return (
    <Card className="animate-slide-in">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-base">
          <span className="flex items-center gap-2">
            <ScrollText className="h-4 w-4 text-blue-400" />
            Nhật ký Sự kiện
          </span>
          <span className="text-xs font-normal text-muted-foreground">{events.length} sự kiện</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {reversed.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground/50 text-sm">
            Chưa có sự kiện nào
          </div>
        ) : (
          <div className="relative space-y-2 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
            {reversed.map((event) => {
              const summary = getPayloadSummary(event);
              return (
                <div
                  key={event.id}
                  className={`flex items-start gap-3 rounded-lg border px-3 py-2.5 text-xs animate-slide-in ${getEventStyle(event.type)}`}
                >
                  <span className="shrink-0 font-mono text-muted-foreground/60 pt-0.5">
                    {formatTimestamp(event.ts)}
                  </span>
                  <div className="min-w-0">
                    <p className="font-medium">{getEventLabel(event.type)}</p>
                    {summary && (
                      <p className="text-muted-foreground mt-0.5 break-all">{summary}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventLog;
