# Workflow: Release

## Mô tả
Hướng dẫn quy trình phát hành phiên bản mới (Release) của dự án.

---

## Bước 1: Chuẩn bị Release
- Đảm bảo tất cả tính năng của milestone đã được merge vào nhánh `develop`.
- Chạy toàn bộ bộ kiểm thử: `npm run test` (nếu có).
- Chạy build production để xác nhận không có lỗi: `npm run build`.

## Bước 2: Tạo Release Branch
```bash
git checkout develop
git pull origin develop
git checkout -b release/vX.Y.Z
```
- Sử dụng [Semantic Versioning](https://semver.org/):
  - `MAJOR.MINOR.PATCH` (e.g. `v1.2.0`, `v1.2.1`)
  - **MAJOR**: Breaking changes.
  - **MINOR**: New features, backwards compatible.
  - **PATCH**: Bug fixes.

## Bước 3: Cập nhật Version
- Cập nhật `version` trong `package.json`.
- Cập nhật `CHANGELOG.md` (nếu có) với danh sách thay đổi của phiên bản này.

## Bước 4: Merge vào `main`
```bash
git checkout main
git merge --no-ff release/vX.Y.Z
git tag -a vX.Y.Z -m "Release version X.Y.Z"
git push origin main --tags
```

## Bước 5: Back-merge vào `develop`
```bash
git checkout develop
git merge --no-ff main
git push origin develop
```

## Bước 6: Xác nhận Deployment
- Xác nhận GitHub Actions workflow `deploy.yml` đã chạy thành công.
- Kiểm tra URL production để đảm bảo phiên bản mới hoạt động đúng.
- Xóa release branch sau khi hoàn tất: `git branch -d release/vX.Y.Z`.
