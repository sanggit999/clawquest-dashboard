# Best Practices & Anti-Patterns

## Mô tả
Tài liệu này liệt kê các **best practices** nên tuân thủ và các **anti-patterns** cần tránh trong dự án này.

---

## React Best Practices

### ✅ Custom Hook để tách Logic
```typescript
// ✅ Logic tách ra hook riêng → Component gọn gàng
const useMinerStatus = () => {
  const [status, setStatus] = useState<MinerStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await minerService.getStatus();
        setStatus(data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };
    fetchStatus();
  }, []);

  return { status, isLoading, error };
};
```

### ✅ Early Return cho Conditional Rendering
```tsx
const MinerDashboard = () => {
  const { status, isLoading, error } = useMinerStatus();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;
  if (!status) return null;

  // Happy path — component chính ở đây, không bị nest trong if
  return <StatusPanel status={status} />;
};
```

### ✅ Stable Keys trong List
```tsx
// ✅ Dùng ID duy nhất
{rewards.map((reward) => (
  <RewardItem key={reward.id} reward={reward} />
))}

// ❌ Dùng index — sẽ gây bug khi list thay đổi thứ tự
{rewards.map((reward, index) => (
  <RewardItem key={index} reward={reward} />
))}
```

---

## TypeScript Best Practices

### ✅ Type Guard thay vì `as`
```typescript
// ❌ Type casting mất an toàn
const body = response.body as MinerStatus;

// ✅ Type guard an toàn
function isMinerStatus(data: unknown): data is MinerStatus {
  return typeof data === 'object' && data !== null && 'running' in data;
}

if (isMinerStatus(response.body)) {
  // TypeScript biết body là MinerStatus trong block này
  console.log(response.body.running);
}
```

### ✅ `unknown` thay vì `any` cho Error handling
```typescript
// ❌ Sai
} catch (error: any) {
  setError(error.message);
}

// ✅ Đúng — dùng utility function
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return String(error);
};

} catch (error) {
  setError(getErrorMessage(error));
}
```

---

## Anti-Patterns Cần Tránh

| Anti-Pattern | Vấn đề | Giải pháp |
|---|---|---|
| Dùng `any` | Mất type safety | Dùng `unknown` + type guard |
| Data fetch trong render body | Infinite re-render | Dùng `useEffect` hoặc custom hook |
| Object literal trong JSX props | Re-render mỗi lần render | Extract ra `const` hoặc `useMemo` |
| Index làm `key` trong list | Bug khi reorder | Dùng unique & stable ID |
| `console.log` trong production code | Lộ thông tin, noise | Xóa trước khi commit, dùng logger |
| State quá nhiều `useState` rời rạc | Khó quản lý, dễ không đồng bộ | Gom vào một `useReducer` hoặc object state |
| Magic number/string trong code | Khó đọc, khó thay đổi | Extract thành `const` có tên rõ ràng |
| `useEffect` thiếu hoặc thừa dependency | Bug logic | Phân tích kỹ dependency array |
| Component quá lớn (>200 LOC) | Khó đọc, khó test | Tách thành sub-components và hooks |
| Import trực tiếp từ `components/ui` trong pages | Coupling cao | Tạo wrapper component có semantics rõ ràng |
