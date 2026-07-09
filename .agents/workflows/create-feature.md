# Workflow: Create Feature

## Mô tả
Hướng dẫn từng bước để AI Agent tạo một tính năng mới theo chuẩn của dự án này.

---

## Bước 1: Hiểu Yêu cầu
- Đọc kỹ mô tả tính năng từ user hoặc task description.
- Xác định các component, hook, service, type nào cần tạo mới hoặc chỉnh sửa.
- Nếu chưa rõ, hãy hỏi lại trước khi viết code.

## Bước 2: Tạo Branch mới (theo `git-rule.md`)
```bash
git checkout -b feature/<ten-tinh-nang>
```

## Bước 3: Tạo Cấu trúc File
Tuân thủ `folder-structure.md`. Tạo file đúng vị trí:
- Component mới → `src/components/<ComponentName>/<ComponentName>.tsx`
- Hook mới → `src/hooks/use<HookName>.ts`
- Service mới → `src/services/<serviceName>.ts`
- Type mới → `src/types/<domain>.types.ts`

## Bước 4: Viết Code
Tuân thủ toàn bộ quy tắc trong:
- `.agents/rules/coding-rule.md`
- `.agents/rules/react-rule.md`
- `.agents/skills/clean-code.md`

**Checklist trước khi commit:**
- [ ] Không có `any` type trong TypeScript
- [ ] Không lặp code (DRY)
- [ ] Component props có TypeScript interface
- [ ] Không có `console.log` debug còn sót
- [ ] Các hàm xử lý lỗi đều có try/catch hoặc error boundary

## Bước 5: Commit (theo `git-rule.md`)
```bash
git add .
git commit -m "feat(<scope>): <mô tả ngắn>"
```

## Bước 6: Tạo Pull Request
- Base branch: `develop`
- Điền đầy đủ mô tả PR: what changed, why, how to test.
- Tag các reviewer liên quan.
