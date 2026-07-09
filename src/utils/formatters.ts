import type { MiningPhase, MiningSessionEvent, RewardItem } from '@/types';

export const formatTimestamp = (ts: number): string => {
  return new Date(ts).toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export const formatDuration = (startTs: number): string => {
  const seconds = Math.floor((Date.now() - startTs) / 1000);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}g ${m}p ${s}s`;
  if (m > 0) return `${m}p ${s}s`;
  return `${s}s`;
};

export const getMiningPhaseLabel = (phase: MiningPhase): string => {
  const labels: Record<MiningPhase, string> = {
    idle: 'Chờ',
    starting_round: 'Bắt đầu vòng',
    waiting_estimated_end_at: 'Đang đào',
    polling_reward: 'Thu phần thưởng',
    reward_collected: 'Đã nhận thưởng',
    sleeping_between_rounds: 'Nghỉ giữa vòng',
    waiting_stamina_recovery: 'Hồi phục stamina',
    stopping: 'Đang dừng',
    skipping_delay: 'Bỏ qua độ trễ',
  };
  return labels[phase] ?? phase;
};

export const getEventLabel = (type: MiningSessionEvent['type']): string => {
  const labels: Record<MiningSessionEvent['type'], string> = {
    session_started: '🚀 Phiên bắt đầu',
    round_completed: '✅ Vòng hoàn thành',
    error: '⚠️ Lỗi',
    stopped: '🛑 Đã dừng',
  };
  return labels[type] ?? type;
};

export const summarizeRewards = (rewards: RewardItem[]): string => {
  if (!rewards.length) return 'Chưa có phần thưởng';
  const map = new Map<string, number>();
  for (const r of rewards) {
    const name = r.oreTypeName ?? r.name ?? 'Không xác định';
    const count = r.count ?? r.amount ?? 0;
    if (count > 0) map.set(name, (map.get(name) ?? 0) + count);
  }
  return Array.from(map.entries())
    .map(([name, count]) => `${name} ×${count}`)
    .join(', ') || 'Không có quặng';
};
