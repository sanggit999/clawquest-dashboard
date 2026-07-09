# Architecture Overview

## Tổng quan
Dự án này là một **Single Page Application (SPA) tĩnh** được xây dựng với React 19, Vite, và TypeScript. Ứng dụng giao tiếp trực tiếp với API backend của ClawQuest Miner (chạy tại `localhost:4021` hoặc VPS) thông qua HTTP calls từ phía client.

---

## Sơ đồ Kiến trúc

```
┌─────────────────────────────────────────────┐
│              React SPA (Frontend)           │
│                                             │
│  ┌─────────┐  ┌──────────┐  ┌───────────┐  │
│  │  Pages  │  │Components│  │  UI (shadcn│  │
│  └────┬────┘  └────┬─────┘  └─────┬─────┘  │
│       │            │              │         │
│       └────────────┴──────────────┘         │
│                    │                        │
│  ┌─────────────────▼──────────────────────┐ │
│  │           Custom Hooks (Logic Layer)   │ │
│  │  useMinerStatus, useFetch, useConfig   │ │
│  └─────────────────┬──────────────────────┘ │
│                    │                        │
│  ┌─────────────────▼──────────────────────┐ │
│  │            Services (API Layer)        │ │
│  │  minerService.ts, configService.ts     │ │
│  └─────────────────┬──────────────────────┘ │
└────────────────────┼────────────────────────┘
                     │ HTTP (fetch)
                     ▼
┌─────────────────────────────────────────────┐
│    ClawQuest Miner Backend (Node/Express)   │
│            localhost:4021 / VPS             │
└─────────────────────────────────────────────┘
```

---

## Các Tầng Kiến trúc (Layers)

| Tầng | Thư mục | Trách nhiệm |
|------|---------|-------------|
| **UI Layer** | `src/components/ui/` | Shadcn UI primitives. Không chứa business logic. |
| **Feature Components** | `src/components/` | Components tổ hợp cho từng tính năng cụ thể. |
| **Logic Layer** | `src/hooks/` | Custom hooks quản lý state và side effects. |
| **Data Layer** | `src/services/` | Hàm gọi API, xử lý request/response. |
| **Type Layer** | `src/types/` | Toàn bộ TypeScript types/interfaces dùng chung. |
| **Config Layer** | `src/config/` | Hằng số cấu hình (API URL, default values). |
| **Utils Layer** | `src/utils/` | Hàm tiện ích thuần túy (pure functions), không có side effects. |

---

## Luồng Dữ liệu (Data Flow)
```
User Interaction
      │
      ▼
  Component (renders UI, calls hook)
      │
      ▼
  Custom Hook (manages state, calls service)
      │
      ▼
  Service (HTTP request to API)
      │
      ▼
  ClawQuest Miner Backend API
      │
      ▼
  Service (parses response, throws typed errors)
      │
      ▼
  Custom Hook (updates state: data/loading/error)
      │
      ▼
  Component (re-renders with new data)
```

---

## Quyết định Kiến trúc Quan trọng
- **No Global State Manager**: Dự án dùng React Context (`useContext`) kết hợp `useReducer` cho state chia sẻ. Chưa cần Zustand/Redux ở giai đoạn này.
- **Static Deployment**: Không có server-side rendering. App được build thành file HTML/CSS/JS tĩnh và host trên GitHub Pages.
- **API Communication**: Dùng native `fetch` API với các wrapper trong `services/`. Cân nhắc `react-query` khi cần caching và background refresh phức tạp hơn.

---

## Rendering & SEO (CSR, SSR, SSG)

Dự án **ClawQuest Miner Dashboard & Landing Page** áp dụng các mô hình kết xuất (rendering) và tối ưu hóa SEO phù hợp với môi trường triển khai tĩnh (Static Web App):

### 1. CSR (Client-Side Rendering)
*   **Áp dụng cho**: Bảng điều khiển (Dashboard) và tính năng giả lập (Simulator).
*   **Cách hoạt động**: Khi người dùng mở Dashboard, trình duyệt tải JS Bundle về và React tiến hành render dữ liệu động. Hệ thống thực hiện gọi API tuần kỳ (polling 3s/lần) tới local backend hoặc VPS để cập nhật trạng thái đào, log sự kiện và bảng phần thưởng.
*   **Lý do lựa chọn**: Tránh lãng phí tài nguyên server, đảm bảo dữ liệu cập nhật theo thời gian thực trực tiếp từ trình duyệt của người dùng mà không cần trung gian.

### 2. SSG (Static Site Generation)
*   **Áp dụng cho**: Toàn bộ cấu trúc trang Landing Page tĩnh.
*   **Cách hoạt động**: Mã nguồn HTML, CSS và JavaScript được build trước (pre-compiled) ở build-time thành các tài sản tĩnh (static assets) trong thư mục `dist` thông qua Vite. GitHub Pages đóng vai trò là một CDN phân phối tĩnh các tệp này với tốc độ phản hồi cực nhanh.
*   **Lý do lựa chọn**: Đảm bảo tốc độ tải trang (Fast Page Load) tối đa và giảm thiểu chi phí vận hành server.

### 3. SSR (Server-Side Rendering)
*   **Áp dụng cho**: Không áp dụng.
*   **Lý do**: Dự án hướng tới mục tiêu triển khai miễn phí, bền vững trên GitHub Pages. SSR yêu cầu phải có một máy chủ Node.js hoặc Edge Functions (như Vercel/Next.js) hoạt động liên tục để render HTML theo từng request, điều này không cần thiết đối với một ứng dụng client-side control panel.

### 4. Chiến lược Tối ưu hóa SEO
Vì dự án chạy dưới dạng SPA tĩnh, chúng tôi triển khai chiến lược SEO lai (Hybrid SEO) để tối ưu chỉ mục tìm kiếm (Googlebot Indexing):
*   **Static Meta Injecting**: Nhúng trực tiếp toàn bộ thẻ Meta SEO, Open Graph (cho Facebook/Zalo chia sẻ), Twitter Card và Canonical Links vào file gốc `index.html` thay vì render động bằng JavaScript. Giúp các Bot tìm kiếm dễ dàng cào dữ liệu ngay cả khi không thực thi JS.
*   **Semantic HTML**: Sử dụng cấu trúc HTML5 chuẩn tắc (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`) và thiết lập phân cấp tiêu đề `<h1>`, `<h2>` hợp lý.
*   **Performance (Web Vitals)**: Tối ưu hóa dung lượng build (Vite CSS/JS splitting), tận dụng font chữ CDN để đạt điểm số cao trên Google Lighthouse (tăng thứ hạng tìm kiếm tự nhiên).
