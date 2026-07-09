import { useState, useEffect } from 'react';
import type { MinerConfig } from '@/types';
import { LOCAL_STORAGE_KEY_CONFIG, DEFAULT_BACKEND_URL } from '@/config/constants';

const loadConfig = (): MinerConfig => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_CONFIG);
    if (raw) return JSON.parse(raw) as MinerConfig;
  } catch { /* ignore */ }
  return { apiCode: '', backendUrl: DEFAULT_BACKEND_URL };
};

export const useConfig = () => {
  const [config, setConfig] = useState<MinerConfig>(loadConfig);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_CONFIG, JSON.stringify(config));
  }, [config]);

  return { config, setConfig };
};
