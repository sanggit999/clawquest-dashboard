# Coding Convention

## Tổng quan
Tài liệu này là quy chuẩn chính thức về phong cách viết code cho toàn bộ dự án. Mọi contributor (người và AI) đều phải tuân thủ.

---

## 1. Ngôn ngữ
- Toàn bộ code, comments trong code, tên biến, tên hàm → **Tiếng Anh**.
- Tài liệu (`.md` files), commit message, PR description → **Tiếng Việt hoặc Tiếng Anh** đều được.

---

## 2. Quy ước Đặt tên

### Files và Thư mục
| Loại | Convention | Ví dụ |
|------|------------|-------|
| React Component file | `PascalCase.tsx` | `MinerStatusCard.tsx` |
| Thư mục Component | `PascalCase/` | `MinerStatusCard/` |
| Hook file | `camelCase.ts` | `useMinerStatus.ts` |
| Service file | `camelCase.ts` | `minerService.ts` |
| Type file | `camelCase.types.ts` | `miner.types.ts` |
| Utility file | `camelCase.ts` | `formatNumber.ts` |
| Config file | `camelCase.ts` | `constants.ts` |
| Test file | `<same-as-source>.test.ts(x)` | `useMinerStatus.test.ts` |

### Biến, Hàm, Component
| Loại | Convention | Ví dụ |
|------|------------|-------|
| Variable | `camelCase` | `isLoading`, `roundsCompleted` |
| Function | `camelCase` | `fetchStatus()`, `formatGold()` |
| React Component | `PascalCase` | `MinerStatusCard`, `StaminaBar` |
| Custom Hook | `camelCase` + prefix `use` | `useMinerStatus()`, `useFetch()` |
| Constant | `UPPER_SNAKE_CASE` | `MAX_RETRY_COUNT`, `API_BASE_URL` |
| Enum | `PascalCase` | `MiningPhase`, `StopReason` |
| Enum Value | `UPPER_SNAKE_CASE` | `MiningPhase.STARTING_ROUND` |
| Type/Interface | `PascalCase` | `MinerConfig`, `RewardItem` |
| Generic Type Param | Chữ hoa mô tả | `<TData>`, `<TError>` |

---

## 3. TypeScript

### Types vs Interfaces
- Dùng `interface` cho object shapes (đặc biệt là props và API response).
- Dùng `type` cho unions, intersections, và aliases.

```typescript
// ✅ Interface cho object shape
interface MinerStatus {
  running: boolean;
  phase: MiningPhase;
  roundsCompleted: number;
}

// ✅ Type cho union
type MiningPhase = 'idle' | 'starting_round' | 'polling_reward' | 'stopping';

// ✅ Type cho props với generic
type ApiResponse<TData> = {
  ok: boolean;
  data?: TData;
  error?: string;
};
```

### Thứ tự Import
Imports phải được nhóm theo thứ tự sau, mỗi nhóm cách nhau một dòng trống:
```typescript
// 1. React và các thư viện core
import { useState, useEffect } from 'react';

// 2. Third-party libraries
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// 3. Internal — absolute paths (dùng alias @)
import { useMinerStatus } from '@/hooks/useMinerStatus';
import type { MinerStatus } from '@/types/miner.types';

// 4. Internal — relative paths (trong cùng component folder)
import { StatusBadge } from './StatusBadge';
```

---

## 4. React

### Props
```typescript
// ✅ Định nghĩa interface riêng biệt cho Props
interface MinerCardProps {
  status: MinerStatus;
  onStop: () => void;
  className?: string; // Optional props có dấu ?
}

const MinerCard = ({ status, onStop, className }: MinerCardProps) => { ... };
```

### Event Handlers
- Đặt tên handler với prefix `handle` trong component, và `on` trong props:
```typescript
// Props nhận handler: prefix "on"
interface ButtonProps {
  onClick: () => void;
}

// Trong component: prefix "handle"
const handleStopMining = () => { ... };
<Button onClick={handleStopMining} />
```
