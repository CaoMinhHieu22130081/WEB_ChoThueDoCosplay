# Cho Thuê Đồ Cosplay - Frontend React

## 📦 Chu Vụ Lập Trình

Đây là ứng dụng frontend React cho nền tảng cho thuê đồ Cosplay.

## 🚀 Cài Đặt & Chạy

### 1. Cài Đặt Dependencies
```bash
cd frontend
npm install
```

### 2. Chạy Ứng Dụng Dev
```bash
npm start
```
Ứng dụng sẽ mở tại `http://localhost:3000`

### 3. Build cho Production
```bash
npm run build
```

## 📁 Cấu Trúc Thư Mục

```
frontend/
├── public/
│   └── index.html           # HTML chính
├── src/
│   ├── components/          # Các component tái sử dụng
│   ├── pages/
│   │   └── DoPage.jsx      # Trang danh sách đồ Cosplay
│   ├── styles/
│   │   ├── index.css       # CSS chung
│   │   ├── App.css         # CSS của App
│   │   └── pages/
│   │       └── DoPage.css  # CSS của DoPage
│   ├── App.jsx             # Component chính
│   └── index.jsx           # Entry point
├── package.json            # Cấu hình dự án
└── .gitignore             # Ignore files cho Git
```

## 🎨 Các Trang/Routes Hiện Tại

- `/` - Trang chủ
- `/do` - Danh sách tất cả đồ Cosplay (Page Đồ)

## 🛠️ Công Nghệ Sử Dụng

- **React 18** - UI library
- **React Router DOM 6** - Routing
- **Axios** - API calls
- **CSS3** - Styling

## 📝 Ghi Chú Phát Triển

### Thêm Page Mới
1. Tạo file `.jsx` mới trong `src/pages/`
2. Thêm import trong `App.jsx`
3. Thêm route mới
4. Tạo CSS file tương ứng trong `src/styles/pages/`

### Thêm Component
1. Tạo file `.jsx` mới trong `src/components/`
2. Import và sử dụng trong pages hoặc App

### Kết Nối Backend
Hiện tại sử dụng mock data. Để kết nối thực tế:
1. Cài Axios (đã có trong package.json)
2. Tạo folder `src/api/` và file `api.js`
3. Thay thế mock data bằng API calls

## 🧪 Tính Năng Hiện Tại

✅ Navbar với routing
✅ Hero section trên Trang chủ
✅ Danh sách sản phẩm (Đồ) với lọc theo danh mục
✅ Hiển thị thông tin sản phẩm (giá thuê, tiền cọc, đánh giá)
✅ Responsive design cho mobile

## 🔜 Tính Năng Sắp Tới

- [ ] Authentication/Login
- [ ] Shopping Cart
- [ ] Product Detail Page
- [ ] Checkout
- [ ] User Profile
- [ ] Admin Dashboard
- [ ] Search functionality

## 📞 Liên Hệ & Support

Nếu có vấn đề, liên hệ với team phát triển.
