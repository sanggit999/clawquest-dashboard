# Workflow: Review Code

## Mô tả
Hướng dẫn AI Agent thực hiện code review theo chuẩn dự án, đảm bảo chất lượng và nhất quán.

---

## Checklist Review

### 1. Correctness (Tính đúng đắn)
- [ ] Code giải quyết đúng yêu cầu trong task/issue không?
- [ ] Có edge case nào chưa được xử lý không?
- [ ] Logic rẽ nhánh (`if/else`, `switch`) có đúng không?

### 2. Code Quality (Chất lượng code)
- [ ] Không có kiểu `any` trong TypeScript.
- [ ] Không có code lặp (DRY). Nếu có, yêu cầu trích xuất ra helper/hook.
- [ ] Function/component không quá dài (>150 LOC thì cần xem xét tách ra).
- [ ] Naming conventions tuân thủ `coding-rule.md`.
- [ ] Import được tổ chức đúng thứ tự: External libs → Internal libs → Relative.

### 3. React Best Practices
- [ ] Props được định nghĩa đầy đủ bằng TypeScript interface.
- [ ] Logic phức tạp được tách vào custom hooks thay vì viết trong component.
- [ ] Không có dependency array sai trong `useEffect`.
- [ ] Keys trong list render là unique và stable (tránh dùng `index`).

### 4. Performance
- [ ] Không có re-render không cần thiết (check với `React.memo`, `useMemo`, `useCallback` khi cần).
- [ ] Không fetch data trực tiếp trong component body mà không dùng effect hoặc hook.

### 5. UI & Accessibility
- [ ] Các thành phần Shadcn UI được dùng đúng cách.
- [ ] Labels và ARIA attributes đầy đủ cho form elements.

## Cách phản hồi
- **Blocking**: Lỗi nghiêm trọng về logic, security, type safety → phải sửa trước khi merge.
- **Suggestion**: Đề xuất cải thiện nhỏ về style, naming → có thể bỏ qua.
