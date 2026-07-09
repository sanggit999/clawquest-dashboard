import { useState, useEffect, useCallback, useRef } from 'react';
import type { MinerStatus, MinerConfig } from '@/types';
import { isApiError, getErrorMessage, mapStatusCodeToMessage, isClientError } from '@/types';
import { minerService } from '@/services/minerService';
import { POLL_INTERVAL_MS } from '@/config/constants';

interface UseMinerDashboardReturn {
  status: MinerStatus | null;
  isLoading: boolean;
  isConnected: boolean;
  isActing: boolean;
  error: string | null;
  startMining: () => Promise<void>;
  stopMining: () => Promise<void>;
}

export const useMinerDashboard = (config: MinerConfig): UseMinerDashboardReturn => {
  const [status, setStatus] = useState<MinerStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isActing, setIsActing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchStatus = useCallback(async () => {
    if (!config.backendUrl || !config.apiCode) {
      setIsLoading(false);
      return;
    }
    try {
      const res = await minerService.getStatus(config);
      setStatus(res.data ?? null);
      setIsConnected(true);
      setError(null);
    } catch (err) {
      setIsConnected(false);
      if (isApiError(err)) {
        setError(isClientError(err) ? mapStatusCodeToMessage(err.statusCode) : 'Lỗi server.');
      } else {
        setError('Không thể kết nối đến backend.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [config]);

  useEffect(() => {
    void fetchStatus();
    intervalRef.current = setInterval(() => void fetchStatus(), POLL_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchStatus]);

  const startMining = useCallback(async () => {
    setIsActing(true);
    setError(null);
    try {
      const res = await minerService.startMining(config);
      setStatus(res.data ?? null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsActing(false);
    }
  }, [config]);

  const stopMining = useCallback(async () => {
    setIsActing(true);
    setError(null);
    try {
      const res = await minerService.stopMining(config);
      setStatus(res.data ?? null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsActing(false);
    }
  }, [config]);

  return { status, isLoading, isConnected, isActing, error, startMining, stopMining };
};
