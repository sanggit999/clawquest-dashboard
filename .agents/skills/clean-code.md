# Skill: Clean Code

## Mô tả
Bộ nguyên tắc và kỹ thuật viết **Clean Code** mà AI Agent phải nội tâm hóa và áp dụng vào mọi dòng code được sinh ra.

---

## Nguyên tắc Cốt lõi

### 1. Meaningful Names (Tên có ý nghĩa)
Tên biến, hàm, component phải tự giải thích mục đích của nó. Tránh tên mơ hồ, tên tắt khó hiểu.

```typescript
// ❌ Sai: Tên không rõ ràng
const d = new Date();
const fn = (x: number) => x * 1.1;

// ✅ Đúng: Tên tự giải thích
const currentDate = new Date();
const applyVatTax = (priceWithoutTax: number) => priceWithoutTax * 1.1;
```

### 2. Small Functions (Hàm nhỏ)
Mỗi hàm chỉ làm **một** việc. Nếu tên hàm cần từ "and" hoặc "or", đó là dấu hiệu cần tách ra.

```typescript
// ❌ Sai: Làm 2 việc trong 1 hàm
const fetchAndDisplayUser = async (userId: string) => { ... };

// ✅ Đúng: Tách thành 2 hàm rõ ràng
const fetchUser = async (userId: string): Promise<User> => { ... };
const displayUser = (user: User) => { ... };
```

### 3. DRY (Don't Repeat Yourself)
Trước khi viết một đoạn code, hãy kiểm tra xem logic tương tự đã tồn tại chưa. Nếu có, tái sử dụng hoặc trích xuất thành helper.

### 4. Early Return (Trả về sớm)
Tránh nesting sâu bằng cách xử lý các điều kiện biên sớm nhất có thể.

```typescript
// ❌ Sai: Nesting sâu
const processData = (data: Data | null) => {
  if (data) {
    if (data.isValid) {
      // logic chính ở đây...
    }
  }
};

// ✅ Đúng: Early return
const processData = (data: Data | null) => {
  if (!data) return;
  if (!data.isValid) return;
  // logic chính ở đây...
};
```

### 5. No Magic Numbers/Strings (Không có số/chuỗi ma thuật)
```typescript
// ❌ Sai
if (consecutiveErrors > 10) { ... }

// ✅ Đúng
const MAX_CONSECUTIVE_ERRORS = 10;
if (consecutiveErrors > MAX_CONSECUTIVE_ERRORS) { ... }
```

### 6. Comment Wisely (Chú thích thông minh)
Code tự giải thích là tốt nhất. Chỉ comment **lý do tại sao** (why), không phải **làm gì** (what) vì code đã thể hiện điều đó rồi.

```typescript
// ❌ Sai: Comment mô tả cái code đang làm
// Cộng 10000ms vào estimatedEndAt
const adjustedEndAt = estimatedEndAt + 10000;

// ✅ Đúng: Comment giải thích lý do
// Cộng thêm 10s để bù cho độ trễ mạng và đảm bảo reward đã sẵn sàng
const adjustedEndAt = estimatedEndAt + REWARD_POLLING_BUFFER_MS;
```
