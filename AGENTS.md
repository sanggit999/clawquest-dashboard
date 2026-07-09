# AGENTS.md — Hướng dẫn cho AI Agents

> Tài liệu này dành riêng cho **AI Agents** (ví dụ: Antigravity, OpenClaw, GitHub Copilot, Cursor AI...) làm việc trên repository này. Đọc kỹ trước khi thực hiện bất kỳ thay đổi nào.

---

## 🚀 Bắt đầu Nhanh

Trước khi thực hiện bất kỳ task nào, bạn phải đọc theo thứ tự sau:

1. **`PROJECT.md`** — Hiểu mục tiêu dự án và tech stack.
2. **`docs/architecture.md`** — Hiểu cấu trúc kiến trúc và các tầng.
3. **`docs/folder-structure.md`** — Biết file nào ở đâu.
4. **`docs/coding-convention.md`** — Nắm quy ước đặt tên.
5. **`docs/best-practices.md`** — Tránh các anti-patterns.

---

## 📚 Thư mục `.agents/`

### `rules/` — Quy tắc Bắt buộc
Đây là các quy tắc **không thể vi phạm**:

| File | Nội dung |
|------|----------|
| `coding-rule.md` | Quy tắc coding chung, naming, TypeScript |
| `react-rule.md` | Quy tắc riêng cho React components, hooks |
| `git-rule.md` | Branch naming, commit message convention |

### `workflows/` — Quy trình Làm việc
Hướng dẫn từng bước cho các tác vụ phổ biến:

| File | Khi nào dùng |
|------|-------------|
| `create-feature.md` | Khi tạo một tính năng mới từ đầu |
| `review-code.md` | Khi review một PR hoặc đoạn code |
| `release.md` | Khi phát hành phiên bản mới |

### `skills/` — Kiến thức Chuyên sâu
Tài liệu tham khảo kỹ thuật theo từng chủ đề:

| File | Chủ đề |
|------|--------|
| `react-senior.md` | Patterns và optimization nâng cao |
| `shadcn-ui.md` | Cách dùng Shadcn UI đúng chuẩn |
| `vite.md` | Cấu hình và path aliases |
| `clean-code.md` | Nguyên tắc Clean Code kèm ví dụ |
| `code-review.md` | Checklist và template review |
| `testing.md` | Cách viết test và tổ chức test file |
| `deployment.md` | CI/CD pipeline và deploy strategy |
| `api.md` | HTTP status codes, service layer pattern, error handling |

---

## ⚠️ Điều Cấm Tuyệt đối

- ❌ **Không dùng `any`** trong TypeScript.
- ❌ **Không để lại `console.log`** trong code commit.
- ❌ **Không commit secrets, API keys** lên repository.
- ❌ **Không lặp code** — hãy extract ra helper hoặc hook trước.
- ❌ **Không chỉnh sửa file trong `src/components/ui/`** trừ khi thực sự cần tùy biến component Shadcn.
- ❌ **Không tự ý thay đổi kiến trúc** mà không có approval. Tạo issue/PR và mô tả lý do trước.

---

## ✅ Checklist Trước Khi Tạo PR

- [ ] Code tuân thủ `docs/coding-convention.md`
- [ ] Không có `any`, không có `console.log`
- [ ] Đã chạy `npm run lint` — không có lỗi
- [ ] Đã chạy `npm run build` — build thành công
- [ ] Commit message theo format Conventional Commits
- [ ] PR description mô tả rõ: *What*, *Why*, *How to test*
