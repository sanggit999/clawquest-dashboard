# Skill: React Senior Developer

## Mô tả
Bộ kỹ năng cấp độ Senior cho phát triển ứng dụng React. AI Agent áp dụng skill này khi cần thiết kế, xây dựng và tối ưu hóa các thành phần React phức tạp.

---

## Kiến thức Cốt lõi

### Component Patterns
- **Compound Components**: Xây dựng các component có API linh hoạt bằng cách chia nhỏ thành các sub-components liên kết qua Context.
- **Render Props / Custom Hooks**: Tách biệt logic khỏi UI để tái sử dụng linh hoạt.
- **HOC (Higher-Order Components)**: Chỉ sử dụng khi Custom Hooks không đủ (ví dụ: khi cần bao bọc component bên thứ ba).

### Performance Optimization
- `React.memo`: Ngăn re-render khi props không thay đổi. Chỉ dùng khi profiling xác nhận cần thiết.
- `useMemo`: Cache giá trị tính toán nặng.
- `useCallback`: Cache function tham chiếu khi truyền xuống component con để tránh re-render không cần thiết.
- **Lazy Loading**: Dùng `React.lazy()` + `Suspense` để code-split và tải component theo yêu cầu.

### State Architecture
- **Local State** → `useState`: cho trạng thái UI nội bộ.
- **Shared State** → `useContext` + `useReducer`: cho state chia sẻ giữa nhiều component trong một feature.
- Cân nhắc thư viện quản lý state (Zustand, Jotai) khi ứng dụng scale lên lớn.

### Error Handling
- Sử dụng **Error Boundary** để bắt lỗi render của các component con và hiển thị UI fallback thay vì crash toàn bộ app.

## Ví dụ Cấu trúc Component

```tsx
// src/components/MinerCard/MinerCard.tsx

interface MinerCardProps {
  title: string;
  status: 'running' | 'stopped' | 'error';
  roundsCompleted: number;
}

const MinerCard = ({ title, status, roundsCompleted }: MinerCardProps) => {
  return (
    <div className="rounded-xl border p-4">
      <h3 className="font-semibold text-lg">{title}</h3>
      <StatusBadge status={status} />
      <p className="text-sm text-muted-foreground">Rounds: {roundsCompleted}</p>
    </div>
  );
};

export default MinerCard;
```
