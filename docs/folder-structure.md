# Folder Structure

## Cấu trúc Thư mục Đầy đủ

```text
ReactJS/
│
├── .github/
│   └── workflows/
│       └── production.yml      # CI/CD Production workflow (Lint, Build & Deploy)
│
├── .agents/
│   ├── rules/
│   │   ├── coding-rule.md      # Quy tắc coding chung cho AI agents
│   │   ├── react-rule.md       # Quy tắc React cụ thể
│   │   ├── git-rule.md         # Quy ước Git và commit message
│   │   └── seo-rendering-rule.md # Quy tắc mô hình rendering và SEO
│   │
│   ├── workflows/
│   │   ├── create-feature.md   # Workflow tạo tính năng mới
│   │   ├── review-code.md      # Workflow review code
│   │   └── release.md          # Workflow phát hành phiên bản
│   │
│   └── skills/
│       ├── react-senior.md     # Kỹ năng React nâng cao
│       ├── shadcn-ui.md        # Kỹ năng sử dụng Shadcn UI
│       ├── vite.md             # Kỹ năng Vite build tool
│       ├── clean-code.md       # Nguyên tắc Clean Code
│       ├── code-review.md      # Kỹ năng review code
│       ├── testing.md          # Kỹ năng viết test
│       ├── deployment.md       # Kỹ năng deployment
│       ├── api.md              # Kỹ năng RESTful/GraphQL API
│       └── security.md         # Kỹ năng Application Security & DevSecOps
│
├── docs/
│   ├── architecture.md         # Tổng quan kiến trúc hệ thống
│   ├── folder-structure.md     # File này — mô tả cấu trúc thư mục
│   ├── coding-convention.md    # Quy ước đặt tên và coding style
│   └── best-practices.md       # Best practices và anti-patterns
│
├── public/
│   └── favicon.svg             # Favicon và các asset tĩnh không được xử lý bởi Vite
│
├── src/
│   ├── assets/                 # Hình ảnh, font, icon được import vào code
│   │
│   ├── components/
│   │   ├── ui/                 # Shadcn UI components (auto-generated, ít chỉnh sửa)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   │
│   │   └── <ComponentName>/    # Feature components (PascalCase)
│   │       ├── <ComponentName>.tsx
│   │       └── index.ts        # Re-export để import gọn hơn
│   │
│   ├── config/
│   │   └── constants.ts        # Hằng số toàn cục (API URL, default values)
│   │
│   ├── hooks/
│   │   └── use<HookName>.ts    # Custom hooks (camelCase, tiền tố "use")
│   │
│   ├── services/
│   │   └── <domain>Service.ts  # API service functions (camelCase)
│   │
│   ├── types/
│   │   └── <domain>.types.ts   # TypeScript types & interfaces
│   │
│   ├── utils/
│   │   └── <helper>.ts         # Pure utility functions (camelCase)
│   │
│   ├── App.tsx                 # Root application component
│   ├── index.css               # Global styles & Tailwind CSS directives
│   ├── main.tsx                # React entry point
│   └── vite-env.d.ts           # Vite environment type declarations
│
├── AGENTS.md                   # Hướng dẫn cho AI Agents sử dụng dự án này
├── PROJECT.md                  # Mô tả dự án, mục tiêu và tech stack
├── README.md                   # Hướng dẫn cài đặt và phát triển
├── SKILL.md                    # Định nghĩa OpenClaw Skill
├── index.html                  # HTML entry point
├── package.json                # Dependencies và scripts
├── tsconfig.json               # TypeScript config
├── tsconfig.app.json           # TypeScript config cho app source
├── tsconfig.node.json          # TypeScript config cho Vite config
└── vite.config.ts              # Vite build configuration
```

---

## Quy tắc Tổ chức File

1. **Mỗi component là một thư mục riêng** có file chính `ComponentName.tsx` và `index.ts` để re-export.
2. **Shadcn UI components** (`src/components/ui/`) không được import trực tiếp trong business components. Tạo wrapper component khi cần thêm logic.
3. **Không import ngược chiều**: `services` không được import từ `hooks`, `hooks` không import từ `components`.
4. **Barrel exports** (`index.ts`): Sử dụng ở cấp folder để gom export, giúp import path gọn hơn.
