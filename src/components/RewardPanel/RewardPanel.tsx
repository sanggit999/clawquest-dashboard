import type { RewardItem, PlayerStatus } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gem, Coins, Package } from 'lucide-react';

interface RewardPanelProps {
  rewards: RewardItem[];
  playerStatus?: PlayerStatus;
}

const getOreEmoji = (name: string): string => {
  const lower = name.toLowerCase();
  if (lower.includes('gold') || lower.includes('vàng')) return '🥇';
  if (lower.includes('iron') || lower.includes('sắt')) return '⚙️';
  if (lower.includes('diamond') || lower.includes('kim')) return '💎';
  if (lower.includes('copper') || lower.includes('đồng')) return '🔶';
  if (lower.includes('silver') || lower.includes('bạc')) return '⬜';
  return '🪨';
};

const RewardPanel = ({ rewards, playerStatus }: RewardPanelProps) => {
  const hasRewards = rewards.length > 0;

  // Aggregate rewards by ore type
  const aggregated = rewards.reduce<Record<string, number>>((acc, r) => {
    const name = r.oreTypeName ?? r.name ?? 'Không xác định';
    const count = r.count ?? r.amount ?? 0;
    if (count > 0) acc[name] = (acc[name] ?? 0) + count;
    return acc;
  }, {});

  return (
    <Card className="animate-slide-in">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <Gem className="h-4 w-4 text-amber-400" />
          Phần thưởng Vòng cuối
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Player gold */}
        {playerStatus?.Gold !== undefined && (
          <div className="flex items-center justify-between rounded-lg bg-amber-500/10 border border-amber-500/20 px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-amber-300">
              <Coins className="h-4 w-4" />
              <span>Tổng Gold Bars</span>
            </div>
            <span className="font-bold font-mono text-amber-400 text-lg">
              {playerStatus.Gold.toLocaleString('vi-VN')}
            </span>
          </div>
        )}

        {/* Ore list */}
        {hasRewards ? (
          <div className="space-y-2">
            {Object.entries(aggregated).map(([name, count]) => (
              <div
                key={name}
                className="flex items-center justify-between rounded-lg bg-white/5 border border-white/5 px-4 py-2.5 transition-colors hover:bg-white/8"
              >
                <div className="flex items-center gap-2.5 text-sm">
                  <span className="text-base">{getOreEmoji(name)}</span>
                  <span className="text-foreground/80">{name}</span>
                </div>
                <span className="font-mono font-semibold text-emerald-400">
                  ×{count.toLocaleString('vi-VN')}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 py-8 text-muted-foreground/50">
            <Package className="h-8 w-8" />
            <p className="text-sm">Chưa có phần thưởng</p>
          </div>
        )}

        {/* Stamina */}
        {playerStatus?.stamina !== undefined && playerStatus.maxStamina !== undefined && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Stamina</span>
              <span className="font-mono">{playerStatus.stamina}/{playerStatus.maxStamina}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500"
                style={{ width: `${(playerStatus.stamina / playerStatus.maxStamina) * 100}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RewardPanel;
