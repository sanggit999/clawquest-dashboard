# Skill: Application Security & DevSecOps

## Mô tả
Tài liệu hướng dẫn chuyên sâu dành cho AI Agent và nhà phát triển Senior về các tiêu chuẩn bảo mật phần mềm (Application Security) từ thiết kế kiến trúc, mã hóa, bảo mật API, bảo mật Web cho tới quy trình tự động hóa bảo mật DevSecOps.

---

## 1. Authentication (Xác thực)
*   **JWT (JSON Web Token)**: Stateless authentication.
    *   *Quy tắc Senior*: Access Token thời hạn ngắn (5-15p) lưu ở memory. Refresh Token thời hạn dài (vài ngày) lưu ở Cookie với các thuộc tính `HttpOnly`, `Secure`, và `SameSite=Strict/Lax`. Áp dụng cơ chế **Token Rotation** để phát hiện token bị đánh cắp.
*   **OAuth 2.0 / OIDC**: Khung ủy quyền cho ứng dụng bên thứ ba và Single Sign-On (SSO).
    *   *Quy tắc Senior*: Đối với SPA (React), bắt buộc sử dụng **Authorization Code Flow với PKCE (Proof Key for Code Exchange)** thay vì Implicit Flow đã bị khai tử. Sử dụng Client Credentials Flow cho giao tiếp Machine-to-Machine.
*   **Session-based Authentication**: Stateful authentication.
    *   *Quy tắc Senior*: Session ID lưu ở cookie phía client, thông tin session lưu ở server cache (Redis). Phải cấu hình cơ chế hủy session ở cả hai đầu khi logout.

## 2. Authorization (Phân quyền)
*   **RBAC (Role-Based Access Control)**: Phân quyền dựa trên vai trò (e.g. `Admin`, `Editor`, `User`). Dễ triển khai nhưng thiếu linh hoạt khi hệ thống phình to.
*   **ABAC (Attribute-Based Access Control)**: Phân quyền động dựa trên thuộc tính (Ai thực hiện? Trên tài nguyên nào? Ở đâu? Khi nào?). Thích hợp cho các luật phân quyền phức tạp.
*   **Permission-Based Control**: Phân quyền chi tiết cấp độ hành động (e.g. `user:create`, `report:view`). Gán permissions vào Roles thay vì kiểm tra trực tiếp Roles trong code.
    *   *Quy tắc Senior*: Luôn kiểm tra quyền ở cả Frontend (ẩn/hiện UI nút bấm) và Backend (chặn API thực thi nghiệp vụ). Backend luôn là chốt chặn cuối cùng.

## 3. API Security (OWASP API Security Top 10)
AI Agent cần thiết kế và kiểm tra API để chống lại 5 lỗ hổng phổ biến nhất:
*   **BOLA (Broken Object Level Authorization - API1)**: Kiểm tra quyền sở hữu đối tượng trước khi xử lý (ví dụ: truy cập `/api/users/123/profile` phải kiểm tra user đang đăng nhập có đúng là `123` hay không).
*   **BPA (Broken Object Property Level Authorization - API3)**: Tránh việc cập nhật hàng loạt các trường nhạy cảm bằng cách lọc whitelist đầu vào (ví dụ: chặn người dùng tự gửi trường `isAdmin: true` qua JSON payload).
*   **Unrestricted Resource Consumption (API4)**: Giới hạn kích thước payload nhận vào, cấu hình timeout và thiết lập Rate Limiting để tránh cạn kiệt tài nguyên hệ thống.
*   **SSRF (Server-Side Request Forgery - API7)**: Khi API cần tải dữ liệu từ một URL do người dùng cung cấp, bắt buộc phải validate định dạng URL và whitelist các domain được phép truy cập, chặn hoàn toàn dải IP nội bộ (`127.0.0.1`, `10.0.0.0/8`).

## 4. Web Security (OWASP Top 10)
*   **XSS (Cross-Site Scripting)**:
    *   *Phòng chống*: Luôn khử trùng dữ liệu (sanitize) đầu ra. Trong React, tránh sử dụng `dangerouslySetInnerHTML` trừ khi dữ liệu đã đi qua thư viện bộ lọc chuyên dụng như `DOMPurify`. Thiết lập Content Security Policy (CSP) chặt chẽ.
*   **SQL Injection**:
    *   *Phòng chống*: Sử dụng ORM/Query Builder và cơ chế Parameterized Queries (Prepared Statements). Tuyệt đối không cộng chuỗi SQL thủ công từ input của người dùng.
*   **Broken Access Control**:
    *   *Phòng chống*: Thiết kế hệ thống phân quyền tập trung tại một tầng kiểm soát (Middleware), tránh viết rải rác các câu lệnh phân quyền thủ công trong controller.

## 5. Database Security (Bảo mật Cơ sở dữ liệu)
*   **Mã hóa dữ liệu**: Mã hóa dữ liệu khi truyền tải (Transit - TLS) và khi lưu trữ (At Rest - mã hóa ổ đĩa/tập tin).
*   **Principle of Least Privilege (Quyền hạn tối thiểu)**: Account kết nối từ ứng dụng lên Database chỉ được cấp các quyền tối thiểu cần thiết để chạy (ví dụ: chỉ cấp `SELECT, INSERT, UPDATE` cho app, không cấp quyền `DROP TABLE` hoặc `ALTER`).
*   **Audit Logging**: Ghi nhận lịch sử mọi thao tác thay đổi dữ liệu nhạy cảm để phục vụ điều tra bảo mật.

## 6. Network Security (HTTPS/TLS/CORS)
*   **HTTPS/TLS**: Bắt buộc sử dụng TLS 1.2 hoặc 1.3 cho toàn bộ kết nối. Cấu hình **HSTS (HTTP Strict Transport Security)** để trình duyệt tự động chuyển hướng mọi request HTTP sang HTTPS.
*   **CORS**: Cấu hình chi tiết header `Access-Control-Allow-Origin` chỉ chấp nhận các domain nằm trong whitelist. Không dùng `Access-Control-Allow-Credentials: true` đi kèm với wildcard `Origin: *`.

## 7. Cryptography (Mã hóa & Băm)
*   **Password Hashing**: Tuyệt đối không dùng MD5, SHA-1, SHA-256 để lưu mật khẩu. Sử dụng **Argon2id** (khuyến nghị hiện tại) hoặc **bcrypt** với salt tự sinh ngẫu nhiên và cấu hình độ khó (work factor) phù hợp để chống tấn công brute-force.
*   **Symmetric Encryption (Mã hóa đối xứng)**: Dùng **AES-256-GCM** để mã hóa dữ liệu nhạy cảm khi lưu trữ (e.g. thông tin thẻ tín dụng).
*   **Asymmetric Encryption (Mã hóa bất đối xứng)**: Dùng **RSA** (tối thiểu 2048-bit) hoặc **ECC (Elliptic Curve Cryptography)** để trao đổi khóa bảo mật và ký số.

## 8. Secrets Management (Quản lý Bí mật)
*   **Ngăn chặn rò rỉ**: Không bao giờ commit API keys, mật khẩu, private keys lên Git. Thêm toàn bộ file cấu hình `.env`, `.pem` vào `.gitignore`.
*   **Môi trường Development**: Dùng biến môi trường cục bộ thông qua file `.env`.
*   **Môi trường Production**: Sử dụng các dịch vụ quản lý bí mật chuyên dụng như **HashiCorp Vault**, **AWS Secrets Manager**, hoặc **GitHub Secrets** (cho CI/CD).

## 9. DevSecOps (Tích hợp Bảo mật vào CI/CD)
*   **SAST (Static Application Security Testing)**: Quét mã nguồn tĩnh để tìm lỗ hổng bảo mật (ví dụ: dùng **SonarQube**, **Snyk**, hoặc **Semgrep** tích hợp vào luồng GitHub Actions).
*   **DAST (Dynamic Application Security Testing)**: Quét bảo mật ứng dụng khi đang chạy bằng cách giả lập các đòn tấn công (ví dụ: sử dụng **OWASP ZAP** định kỳ).
*   **Dependency Scanning**: Quét các thư viện bên thứ ba để phát hiện lỗ hổng đã được công bố. Tích hợp `npm audit` hoặc **Dependabot** để tự động cập nhật các gói thư viện bị lỗi bảo mật.

## 10. Cloud & Infrastructure Security
*   **Container Security**: Quét lỗ hổng của các Docker Images trước khi deploy (ví dụ: dùng **Trivy**). Sử dụng base images tối giản (Alpine, Distroless) để giảm thiểu bề mặt tấn công.
*   **IAM (Identity and Access Management)**: Cấu hình phân quyền tối giản cho các máy ảo/services kết nối tài nguyên đám mây (e.g. AWS IAM Role).
*   **Network Isolation**: Chạy các ứng dụng backend và database bên trong mạng riêng ảo cô lập (VPC Private Subnet), chỉ cho phép truy cập từ Internet thông qua API Gateway hoặc Reverse Proxy (Nginx/Cloudflare).
