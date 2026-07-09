# Skill: Code Review

## Mô tả
Hướng dẫn AI Agent thực hiện code review chuyên nghiệp, mang tính xây dựng và nhất quán với tiêu chuẩn của dự án.

---

## Mindset khi Review
- **Mục tiêu là cải thiện code, không phán xét developer.**
- Luôn đưa ra lý do và giải pháp thay thế, không chỉ phê bình.
- Phân biệt rõ: *"Phải sửa"* (blocking) vs *"Nên sửa"* (suggestion) vs *"Tôi thắc mắc"* (question).

---

## Phân loại Nhận xét

| Loại | Ý nghĩa | Hành động |
|------|---------|-----------|
| 🔴 **[BLOCKING]** | Lỗi logic, bug tiềm ẩn, vi phạm bảo mật | Phải sửa trước khi merge |
| 🟡 **[SUGGESTION]** | Cải thiện về readability, performance, DRY | Nên sửa nếu có thời gian |
| 🔵 **[QUESTION]** | Cần giải thích về design decision | Giải thích hoặc thêm comment |
| 💚 **[PRAISE]** | Code viết tốt, pattern hay | Ghi nhận để khuyến khích |

---

## Checklist Kỹ thuật đầy đủ

### TypeScript & Safety
- [ ] Không có `any`. Dùng `unknown` + type guard nếu cần.
- [ ] Không có non-null assertion (`!`) không cần thiết.
- [ ] Type/Interface đủ mô tả, không quá generic.

### React
- [ ] Component props có TypeScript type/interface.
- [ ] Custom hook có tên bắt đầu bằng `use`.
- [ ] Không có data fetching trực tiếp trong JSX render.
- [ ] `key` prop trong list là unique & stable (không dùng `index` nếu list có thể thay đổi thứ tự).
- [ ] `useEffect` cleanup đúng cách (cancel fetch, clear timer...).

### Performance
- [ ] Không tạo object/array literal trong JSX (gây re-render): `style={{ color: 'red' }}` → extract ra ngoài.
- [ ] `React.memo` / `useMemo` / `useCallback` được dùng có chủ ý, không dùng bừa bãi.

### Security
- [ ] Không có API key hoặc secret trong code.
- [ ] Không dùng `dangerouslySetInnerHTML` trừ khi đã sanitize input.

---

## Template Nhận xét Mẫu
```
🔴 [BLOCKING] `useMinerStatus.ts` dòng 45:
Hàm `fetchStatus` được gọi trực tiếp trong component body sẽ tạo ra infinite re-render.

Giải pháp: Bọc trong `useEffect` với dependency array phù hợp hoặc dùng thư viện như `react-query`.
```
