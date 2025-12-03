# 🔐 User Registration System - WAD - IA06

> Hệ thống đăng ký và đăng nhập người dùng với NestJS + React + MongoDB

[![NestJS](https://img.shields.io/badge/NestJS-11.x-red?logo=nestjs)](https://nestjs.com/)
[![React](https://img.shields.io/badge/React-19.x-blue?logo=react)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.x-green?logo=mongodb)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)

---

## 💻 Yêu cầu hệ thống

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt:

- **Node.js** phiên bản 18.x trở lên
  - Kiểm tra: `node --version`
  - Tải về: [https://nodejs.org](https://nodejs.org)

- **npm** hoặc **yarn** (npm đi kèm với Node.js)
  - Kiểm tra: `npm --version`

- **MongoDB** (chọn 1 trong 2 cách)
  - **Cách 1:** Cài đặt MongoDB Community Server local
    - Tải về: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
  - **Cách 2:** Sử dụng MongoDB Atlas (Cloud - Miễn phí)
    - Đăng ký: [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

- **Git** (tùy chọn, để clone repo)
  - Kiểm tra: `git --version`

---

## 📥 Hướng dẫn cài đặt

### Bước 1: Clone dự án

```bash
git clone https://github.com/henry-banana/wad-ia06-user-registration-hcmus-2025.git
cd wad-ia06-user-registration-hcmus-2025
```

### Bước 2: Cài đặt Backend

```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt các dependencies
npm install
```

### Bước 3: Cài đặt Frontend

```bash
# Mở terminal mới, di chuyển vào thư mục frontend
cd frontend

# Cài đặt các dependencies
npm install
```

---

## ⚙️ Cấu hình

### Cấu hình Backend

Tạo file `.env` trong thư mục `backend/`:

```env
# MongoDB Connection String
# Nếu dùng MongoDB local:
MONGODB_URI=mongodb://localhost:27017/user_registration

# Nếu dùng MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.xxxxx.mongodb.net/user_registration

# Port cho server
PORT=3000

# URL Frontend (cho CORS)
FRONTEND_URL=http://localhost:5173
```

### Cấu hình Frontend

Tạo file `.env` trong thư mục `frontend/`:

```env
# URL Backend API
VITE_API_URL=http://localhost:3000
```

---

## 🚀 Chạy dự án

### Chạy MongoDB (nếu cài local)

**Windows:**
- MongoDB thường tự chạy như service sau khi cài đặt
- Hoặc mở MongoDB Compass để kiểm tra kết nối

**macOS/Linux:**
```bash
# Khởi động MongoDB
mongod
```

### Chạy Backend

```bash
# Di chuyển vào thư mục backend
cd backend

# Chạy ở chế độ development (có hot-reload)
npm run start:dev
```

**Kết quả mong đợi:**
```
[Nest] LOG [NestFactory] Starting Nest application...
[Nest] LOG [RouterExplorer] Mapped {/user/register, POST}
[Nest] LOG [RouterExplorer] Mapped {/user/login, POST}
[Nest] LOG [NestApplication] Nest application successfully started
```

### Chạy Frontend

```bash
# Mở terminal mới, di chuyển vào thư mục frontend
cd frontend

# Chạy ở chế độ development
npm run dev
```

**Kết quả mong đợi:**
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://xxx.xxx.xxx.xxx:5173/
```

### Truy cập ứng dụng

- **Frontend:** Mở trình duyệt và truy cập [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:3000](http://localhost:3000)

---

## 📡 API Endpoints

| Method | Endpoint | Mô tả | Body |
|--------|----------|-------|------|
| POST | `/user/register` | Đăng ký tài khoản mới | `{ email, password }` |
| POST | `/user/login` | Đăng nhập | `{ email, password }` |

### Ví dụ Request/Response

**Đăng ký thành công:**
```bash
POST http://localhost:3000/user/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "pass123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Đăng ký thành công",
  "data": {
    "_id": "...",
    "email": "user@example.com",
    "createdAt": "2024-12-03T10:00:00.000Z"
  }
}
```

---

## 📁 Cấu trúc thư mục

```
wad-ia06-user-registration-hcmus-2025/
├── backend/                    # Server NestJS
│   ├── src/
│   │   ├── main.ts             # Entry point
│   │   ├── app.module.ts       # Module chính
│   │   └── user/               # Module User
│   │       ├── user.controller.ts
│   │       ├── user.service.ts
│   │       ├── user.module.ts
│   │       ├── dto/            # Data Transfer Objects
│   │       └── entities/       # MongoDB Schemas
│   ├── package.json
│   └── .env                    # Cấu hình môi trường
│
├── frontend/                   # React App
│   ├── src/
│   │   ├── main.tsx            # Entry point
│   │   ├── App.tsx             # Router
│   │   ├── api/                # API calls
│   │   ├── pages/              # Các trang
│   │   ├── components/         # Components UI
│   │   └── types/              # TypeScript types
│   ├── package.json
│   └── .env                    # Cấu hình môi trường
│
└── README.md                   # File này
```

---

## 🐛 Xử lý lỗi thường gặp

### Lỗi: "MongoDB connection failed"
- Kiểm tra MongoDB đã chạy chưa
- Kiểm tra `MONGODB_URI` trong file `.env` đã đúng chưa
- Nếu dùng Atlas, kiểm tra IP đã được whitelist chưa

### Lỗi: "CORS error" trên Frontend
- Kiểm tra `FRONTEND_URL` trong `.env` của backend
- Đảm bảo backend đang chạy trên port 3000

### Lỗi: "Cannot find module..."
- Chạy lại `npm install` trong thư mục tương ứng

### Lỗi: Port đã được sử dụng
```bash
# Windows - tìm process đang dùng port 3000
netstat -ano | findstr :3000

# Tắt process theo PID
taskkill /PID <PID> /F
```

---

## 📝 Scripts có sẵn

### Backend
```bash
npm run start:dev    # Chạy development mode (hot-reload)
npm run start        # Chạy production mode
npm run build        # Build project
npm run lint         # Kiểm tra code style
npm run test         # Chạy unit tests
```

### Frontend
```bash
npm run dev          # Chạy development mode
npm run build        # Build production
npm run preview      # Preview bản build
npm run lint         # Kiểm tra code style
```