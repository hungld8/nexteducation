# NEXT – Website

Website đa ngữ **Anh · Việt · Hàn · Nhật · Trung** của NEXT – Specialized DMC & Experience Development (du lịch giáo dục, văn hóa và trải nghiệm tại Việt Nam).

- Node.js + Express + EJS (render phía server, tốt cho SEO)
- 5 ngôn ngữ: `/en`, `/vi`, `/kr`, `/jp`, `/cn` (trang chủ `/` tự chuyển theo ngôn ngữ trình duyệt)
- Trang: Trang chủ, Giới thiệu, Chương trình (4 nhóm Learn · Explore · Connect · Contribute), Why NEXT, Chi tiết 2 trại, Hình ảnh, Liên hệ
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
| Hotline, người liên hệ, email, địa chỉ, cảm nhận | `src/data/site.js` |
| Nội dung các trang (giới thiệu, tầm nhìn, giá trị, 4 nhóm chương trình, Why NEXT…) | `src/locales/{en,vi,kr,jp,cn}.json` |
| Chương trình trại (lịch trình, điểm nổi bật, ảnh) | `src/data/programs.js` |
| Thư viện ảnh | `src/data/gallery.js` |
| Chữ trên giao diện (menu, tiêu đề, nút…) | `src/locales/{en,vi,kr,jp,cn}.json` |
| Bản dịch Hàn/Nhật/Trung của nội dung (chương trình, giới thiệu, chú thích ảnh) | `src/locales/data.{kr,jp,cn}.json` — dạng `"câu tiếng Anh": "bản dịch"` |
| Danh sách ngôn ngữ | `src/languages.js` |
| Màu sắc, font, bố cục | `public/css/styles.css` (biến màu ở đầu file) |
| Ảnh | `public/images/*.webp`; ảnh nét cao ở `public/images/hd/` (mỗi ảnh có bản 2400px và bản `-sm` 1200px) |

**Lưu ý đa ngữ:** nội dung trong `src/data` có bản EN/VI; bản Hàn/Nhật/Trung lấy từ `data.<lang>.json` theo đúng câu tiếng Anh. Khi sửa câu tiếng Anh, chạy `node scripts/i18n-strings.js kr` (hoặc `jp`, `cn`) để xem câu nào chưa có bản dịch — câu chưa dịch sẽ tạm hiển thị tiếng Anh.

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
   - `SITE_URL=https://next.edu.vn`
   - `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`, `SMTP_USER=dos@next.edu.vn`, `SMTP_PASS` (Google App Password 16 ký tự, không phải mật khẩu đăng nhập), `MAIL_TO=dos@next.edu.vn`
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
