// ─── Mining Phase ────────────────────────────────────────────────────────────
export type MiningPhase =
  | 'idle'
  | 'starting_round'
  | 'waiting_estimated_end_at'
  | 'polling_reward'
  | 'reward_collected'
  | 'sleeping_between_rounds'
  | 'waiting_stamina_recovery'
  | 'stopping'
  | 'skipping_delay';

// ─── Mining Stop Reason ───────────────────────────────────────────────────────
export type MiningStopReason =
  | 'stopped_by_user'
  | 'error_limit_reached'
  | 'critical_error'
  | 'auto_buy_stamina_exhausted';

// ─── Reward Item ──────────────────────────────────────────────────────────────
export interface RewardItem {
  oreType?: number;
  oreTypeName?: string;
  name?: string;
  count?: number;
  amount?: number;
}

// ─── Mining Session Event ─────────────────────────────────────────────────────
export interface MiningSessionEvent {
  id: number;
  ts: number;
  type:
    | 'session_started'
    | 'round_completed'
    | 'error'
    | 'stopped';
  payload: Record<string, unknown>;
}

// ─── Player Status ────────────────────────────────────────────────────────────
export interface PlayerStatus {
  Gold?: number;
  stamina?: number;
  maxStamina?: number;
  diamonds?: number;
}

// ─── Full Mining Status ───────────────────────────────────────────────────────
export interface MinerStatus {
  running: boolean;
  phase: MiningPhase;
  message: string;
  openclawSessionKey?: string;
  startedAt?: number;
  updatedAt: number;
  cacheKey?: string;
  roundsCompleted: number;
  consecutiveErrorCount: number;
  maxConsecutiveErrorCount: number;
  lastError?: string;
  lastRewardDetails: RewardItem[];
  lastPlayerStatus?: PlayerStatus;
  lastEventId: number;
  events: MiningSessionEvent[];
  stopReason?: MiningStopReason;
  criticalErrorCode?: number;
  estimatedEndAt?: number;
  friendlyMessage?: string;
}

// ─── Config Form ─────────────────────────────────────────────────────────────
export interface MinerConfig {
  apiCode: string;
  backendUrl: string;
}
