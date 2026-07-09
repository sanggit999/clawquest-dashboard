# Skill: Testing

## Mô tả
Hướng dẫn AI Agent viết test cho dự án React + TypeScript theo chuẩn của dự án.

---

## Triết lý Testing
> *"Viết test để kiểm tra hành vi (behavior), không phải implementation chi tiết."*

- Test nên từ góc nhìn của người dùng, không phải developer.
- Tránh test internal state hoặc private methods.
- Test phải **nhanh**, **độc lập** và **có thể lặp lại**.

---

## Công nghệ (sẽ được cài đặt khi cần)
- **Unit/Integration Tests**: [Vitest](https://vitest.dev/) — tích hợp tốt với Vite.
- **Component Tests**: [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).
- **E2E Tests**: [Playwright](https://playwright.dev/) (cho các flow quan trọng).

---

## Cấu trúc File Test
- Unit/Integration tests: đặt cùng thư mục với file nguồn, thêm `.test.ts` hoặc `.test.tsx`.
  ```
  src/
  ├── utils/
  │   ├── formatNumber.ts
  │   └── formatNumber.test.ts   ← test file
  ├── hooks/
  │   ├── useMinerStatus.ts
  │   └── useMinerStatus.test.ts ← test file
  ```

---

## Quy tắc Viết Test

### Naming
```typescript
// Pattern: describe("Đối tượng test") → it("nên làm gì khi điều kiện gì")
describe('formatNumber', () => {
  it('should return "1,000" when given 1000', () => {
    expect(formatNumber(1000)).toBe('1,000');
  });

  it('should return "0" when given 0', () => {
    expect(formatNumber(0)).toBe('0');
  });
});
```

### Arrange-Act-Assert (AAA Pattern)
```typescript
it('should display error message when API fails', async () => {
  // Arrange: chuẩn bị điều kiện
  server.use(http.get('/api/status', () => HttpResponse.error()));

  // Act: thực hiện hành động
  render(<MinerDashboard />);

  // Assert: kiểm tra kết quả
  expect(await screen.findByText(/lỗi kết nối/i)).toBeInTheDocument();
});
```

### Component Test Checklist
- [ ] Test render thành công với props mặc định.
- [ ] Test render với các trạng thái khác nhau (loading, error, success).
- [ ] Test tương tác người dùng (click, input, submit).
- [ ] Không test implementation detail (class names, internal state).
