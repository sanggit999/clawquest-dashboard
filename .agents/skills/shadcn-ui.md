# Skill: Shadcn UI

## Mô tả
Hướng dẫn AI Agent sử dụng thư viện thành phần **Shadcn UI** đúng cách, nhất quán, và theo chuẩn của dự án.

---

## Shadcn UI là gì?
Shadcn UI không phải là một thư viện truyền thống. Thay vào đó, nó cung cấp các **component có thể sao chép vào dự án** (không phải npm package dependency), cho phép tùy biến hoàn toàn. Mỗi component là code TypeScript + Tailwind CSS thực sự nằm trong `src/components/ui/`.

## Nguyên tắc Sử dụng

### 1. Cài đặt Component Mới
Khi cần một component mới (ví dụ: Button, Dialog), sử dụng lệnh CLI:
```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
```

### 2. Vị trí File
Tất cả các component Shadcn UI được đặt tại: `src/components/ui/`
> **Không bao giờ** chỉnh sửa trực tiếp file trong `src/components/ui/` trừ khi thực sự cần tùy biến. Thay vào đó, tạo component wrapper tại `src/components/<MyComponent>.tsx` và import component Shadcn UI vào đó.

### 3. Tùy biến Style
- Sử dụng prop `className` để bổ sung Tailwind class.
- Sử dụng `variants` của `cva` (class-variance-authority) nếu cần nhiều biến thể.
- **Không viết** CSS thuần vào file `.css` riêng lẻ cho các thành phần UI này.

### 4. Theme
- Màu sắc, font, border radius được cấu hình qua CSS variables trong `src/index.css`.
- Sử dụng các biến màu của Shadcn (ví dụ: `bg-primary`, `text-muted-foreground`) thay vì màu cố định để hỗ trợ dark mode tự động.

## Ví dụ Sử dụng

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StatusPanel = () => (
  <Card>
    <CardHeader>
      <CardTitle>Mining Status</CardTitle>
    </CardHeader>
    <CardContent>
      <Button variant="destructive" size="sm">Stop Loop</Button>
    </CardContent>
  </Card>
);
```
