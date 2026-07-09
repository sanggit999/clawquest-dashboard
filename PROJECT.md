# PROJECT.md — Mô tả Dự án

## Tên Dự án
**ClawQuest Miner Dashboard**

## Mục tiêu
Xây dựng một bảng điều khiển web tĩnh (Static Web App) để giám sát và quản lý **ClawQuest Automated Miner** — một bot đào tự động cho game ClawQuest, chạy như một dịch vụ Node.js/Express backend.

Dashboard cho phép người dùng:
- 📊 **Theo dõi trạng thái** vòng lặp đào theo thời gian thực (rounds, phase, errors).
- 💎 **Xem phần thưởng** đã thu thập (quặng, vàng) qua từng vòng.
- ⚙️ **Cấu hình** tham số đào (API Code, polling interval, auto-buy stamina).
- 📜 **Xem lịch sử sự kiện** của phiên đào.

---

## Tech Stack

| Công nghệ | Phiên bản | Vai trò |
|-----------|-----------|---------|
| **React** | 19 | UI Framework |
| **Vite** | 8 | Build Tool & Dev Server |
| **TypeScript** | 6 | Type Safety |
| **Shadcn UI** | Latest | UI Component Library |
| **Tailwind CSS** | v3/v4 | Utility-first CSS |
| **Oxlint** | Latest | Linting |

---

## Phạm vi Tính năng (MVP)

### Dashboard Chính
- [x] **Status Card**: Hiển thị trạng thái running/stopped, phase hiện tại, số vòng hoàn thành.
- [x] **Reward Panel**: Danh sách quặng và vàng thu được trong vòng gần nhất.
- [x] **Event Log**: Timeline sự kiện của phiên đào (started, round_completed, error, stopped).
- [x] **Config Panel**: Form nhập API Code và URL backend.

### Tính năng Tương lai
- [ ] **Biểu đồ**: Line chart hiển thị xu hướng thu thập quặng theo thời gian.
- [ ] **Notification**: Thông báo khi vòng lặp dừng do lỗi hoặc hết stamina.
- [ ] **Dark Mode**: Toggle giữa giao diện sáng và tối.

---

## Liên kết Quan trọng
- **Backend Project**: `d:\Claw` — ClawQuest Automated Miner (Node.js + Express)
- **API Endpoint**: `http://localhost:4021` (local) hoặc địa chỉ VPS của bạn
- **OpenClaw Skill**: Xem `SKILL.md` để biết cách tích hợp với hệ thống AI Agent OpenClaw.
- **CI/CD**: Xem `.github/workflows/` để biết pipeline tự động.

---

## Team / Contributors
- Dự án cá nhân — Phát triển và bảo trì bởi Owner.
- AI Agent hỗ trợ phát triển: Antigravity (Google DeepMind).
