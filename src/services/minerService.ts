import type { MinerStatus, MinerConfig, ApiResponse } from '@/types';
import { createApiError, mapStatusCodeToMessage } from '@/types';

const request = async <TData>(
  backendUrl: string,
  endpoint: string,
  body: Record<string, unknown> = {},
): Promise<ApiResponse<TData>> => {
  const response = await fetch(`${backendUrl}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8000),
  });

  if (response.status === 204) return { ok: true };

  const json = await response.json();
  if (!response.ok) {
    throw createApiError(
      response.status,
      json?.error ?? mapStatusCodeToMessage(response.status),
      json,
    );
  }
  return { ok: true, data: json as TData };
};

export const minerService = {
  getStatus: (config: MinerConfig) =>
    request<MinerStatus>(config.backendUrl, '/tool/get_managed_mining_status'),

  startMining: (config: MinerConfig) =>
    request<MinerStatus>(config.backendUrl, '/tool/start_managed_mining_loop', {
      apiCode: config.apiCode,
      forceRestart: false,
    }),

  stopMining: (config: MinerConfig) =>
    request<MinerStatus>(config.backendUrl, '/tool/stop_managed_mining_loop'),

  checkHealth: async (backendUrl: string): Promise<boolean> => {
    try {
      const response = await fetch(`${backendUrl}/health`, {
        signal: AbortSignal.timeout(3000),
      });
      return response.ok;
    } catch {
      return false;
    }
  },
};
