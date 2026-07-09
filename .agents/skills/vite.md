# Skill: Vite Build Tool

## Mô tả
Hướng dẫn AI Agent hiểu và sử dụng **Vite** đúng cách trong dự án React + TypeScript này.

---

## Vite là gì?
Vite là một build tool thế hệ mới, cực kỳ nhanh nhờ sử dụng **ES Modules (ESM)** trong dev mode và **Rollup** cho production build.

## Cấu hình `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Cho phép dùng '@/...' thay vì '../../..' để import
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Tắt sourcemap cho production để giảm bundle size
  },
});
```

## Các Lệnh Quan trọng

| Lệnh             | Mô tả                                               |
|------------------|-----------------------------------------------------|
| `npm run dev`    | Khởi động dev server tại `http://localhost:5173`    |
| `npm run build`  | Build production bundle vào thư mục `dist/`         |
| `npm run preview`| Preview production build tại local                  |
| `npm run lint`   | Kiểm tra lỗi code bằng Oxlint                       |

## Path Aliases
Luôn sử dụng alias `@` để tránh các đường dẫn tương đối lồng nhau khó đọc:
```typescript
// ✅ Đúng
import { Button } from '@/components/ui/button';
import { useMinerStatus } from '@/hooks/useMinerStatus';

// ❌ Sai
import { Button } from '../../../components/ui/button';
```

## Environment Variables
- Tạo file `.env.local` (không commit lên git) cho các biến môi trường local.
- Tạo `.env.example` làm template mẫu cho team.
- Tiền tố `VITE_` là bắt buộc để biến môi trường được expose ra phía client:
```
VITE_API_BASE_URL=http://localhost:4021
```
Truy cập trong code: `import.meta.env.VITE_API_BASE_URL`
