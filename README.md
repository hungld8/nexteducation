# Next Education – Website

Website song ngữ **Anh – Việt** giới thiệu Next Education: trại hè & trại đông quốc tế tại Hội An – Đà Nẵng.

- Node.js + Express + EJS (render phía server, tốt cho SEO)
- 2 ngôn ngữ: `/en/...` và `/vi/...` (trang chủ `/` tự chuyển theo ngôn ngữ trình duyệt)
- Trang: Trang chủ, Giới thiệu, Chương trình, Chi tiết 2 chương trình trại, Hình ảnh, Liên hệ
- Form liên hệ gửi email qua SMTP (nodemailer), có chống spam (honeypot)
- `sitemap.xml`, `robots.txt`, thẻ `hreflang`, Open Graph

## Chạy trên máy

```bash
npm install
npm run dev        # http://localhost:3000
```

## Sửa nội dung

| Muốn sửa | File |
|---|---|
| Hotline, email, địa chỉ, số liệu, "Why us", cảm nhận | `src/data/site.js` |
| Chương trình trại (lịch trình, điểm nổi bật, ảnh) | `src/data/programs.js` |
| Thư viện ảnh | `src/data/gallery.js` |
| Chữ trên giao diện (menu, tiêu đề, nút…) | `src/locales/en.json`, `src/locales/vi.json` |
| Màu sắc, font, bố cục | `public/css/styles.css` (biến màu ở đầu file) |
| Ảnh | `public/images/*.webp` |

Thêm chương trình mới: copy một phần tử trong `src/data/programs.js`, đổi `slug` và nội dung — trang chi tiết, menu footer, sitemap và form liên hệ tự cập nhật.

## Đưa lên GitHub

```bash
git remote add origin https://github.com/<tai-khoan>/next-education-website.git
git push -u origin main
```

## Deploy lên Hostinger (Node.js Web App)

Cần gói Hostinger có hỗ trợ **Node.js** (Business Web Hosting, Cloud Hosting hoặc VPS).

1. hPanel → **Websites** → **Add website** → **Node.js Apps** → chọn **Import Git repository** và kết nối GitHub, chọn repo này (nhánh `main`).
2. Cấu hình build:
   - Node version: **20** (hoặc mới hơn)
   - Install: `npm install`
   - Start command: `npm start` · Entry file: `server.js`
3. **Environment variables** (xem `.env.example`):
   - `NODE_ENV=production`
   - `SITE_URL=https://www.next.edu.vn`
   - `SMTP_HOST=smtp.hostinger.com`, `SMTP_PORT=465`, `SMTP_USER`, `SMTP_PASS`, `MAIL_TO=dos@next.edu.vn`
4. Deploy, sau đó gắn tên miền (`next.edu.vn`) và bật SSL trong hPanel.
5. Mỗi lần `git push` lên `main`, Hostinger sẽ tự deploy lại (nếu bật auto-deploy).

### Nếu dùng VPS Hostinger

```bash
git clone https://github.com/<tai-khoan>/next-education-website.git && cd next-education-website
npm ci --omit=dev
cp .env.example .env   # rồi sửa giá trị
npm i -g pm2 && pm2 start server.js --name next-education && pm2 save
```
Sau đó cấu hình Nginx reverse proxy tới cổng `3000`.

> Nếu chưa cấu hình SMTP, form liên hệ vẫn hoạt động nhưng nội dung chỉ được ghi vào log server.
