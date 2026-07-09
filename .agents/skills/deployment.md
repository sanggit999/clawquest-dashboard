# Skill: Deployment

## Mô tả
Hướng dẫn AI Agent hiểu và quản lý quy trình triển khai (deployment) ứng dụng React tĩnh lên các môi trường khác nhau.

---

## Tổng quan Deployment Pipeline

```
push to main
     │
     ▼
┌──────────────────┐
│  code-quality.yml │  ← Lint check
└────────┬─────────┘
         │ pass
         ▼
┌──────────────────┐
│     ci.yml        │  ← Build & verify
└────────┬─────────┘
         │ pass
         ▼
┌──────────────────┐
│   deploy.yml      │  ← Upload to GitHub Pages
└──────────────────┘
```

---

## Môi trường Deployment

### 1. GitHub Pages (Mặc định)
- **Trigger**: Push lên nhánh `main`.
- **Output**: Thư mục `dist/` sau khi `npm run build`.
- **Cấu hình**: Vào **Repository Settings → Pages → Source: GitHub Actions**.
- **URL**: `https://<username>.github.io/<repo-name>/`

> ⚠️ **Lưu ý**: Nếu deploy lên subdirectory (không phải root), cần cấu hình `base` trong `vite.config.ts`:
> ```typescript
> export default defineConfig({
>   base: '/<repo-name>/',
> });
> ```

### 2. Netlify / Vercel (Tùy chọn)
- Connect repository, cấu hình:
  - **Build command**: `npm run build`
  - **Publish directory**: `dist`
- Environment variables được cấu hình trực tiếp trên dashboard của từng nền tảng.

---

## Checklist Trước Khi Deploy
- [ ] Chạy `npm run build` local thành công, không có lỗi TypeScript hay Vite.
- [ ] Kiểm tra `VITE_*` environment variables đã được cấu hình trên môi trường production.
- [ ] Đảm bảo không có API keys hay secrets trong source code.
- [ ] `base` URL trong `vite.config.ts` khớp với deployment path.

## Kiểm tra sau Deploy
1. Truy cập URL production và xác nhận app load được.
2. Mở DevTools → Network tab, kiểm tra không có lỗi 404 với assets.
3. Kiểm tra console, đảm bảo không có lỗi JavaScript runtime.
