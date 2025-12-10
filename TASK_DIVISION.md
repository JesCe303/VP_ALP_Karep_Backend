# Pembagian Tugas Project Backend Job Portal

## 👤 **ORANG 1: Authentication & User Profile Management**

### Fitur yang Dikerjakan:
1. ✅ **Register User & Company** (No. 1)
2. ✅ **Login User & Company** (No. 2)
3. ✅ **Update Profile User** (No. 8)
4. ✅ **CRUD Experience** (User menambah/edit/hapus pengalaman)
5. ✅ **CRUD Achievement** (User menambah/edit/hapus pencapaian)

### Endpoints yang Dibuat:
```
POST   /api/auth/register/user
POST   /api/auth/register/company
POST   /api/auth/login/user
POST   /api/auth/login/company
GET    /api/users/profile
PUT    /api/users/profile
GET    /api/users/experiences
POST   /api/users/experiences
PUT    /api/users/experiences/:id
DELETE /api/users/experiences/:id
GET    /api/users/achievements
POST   /api/users/achievements
PUT    /api/users/achievements/:id
DELETE /api/users/achievements/:id
```

### Prompting untuk Orang 1:
```
Buatkan backend Express.js + TypeScript + Prisma untuk fitur authentication dan user profile management sesuai ERD:

Schema Prisma yang digunakan:
- User: id, email, password, name, address, phone_number
- Company: id, email, password, name, address, phone_number, website, vision_mission, description, founding_date, logo_path, image_path
- Experience: id, title, description, user_id
- Achievement: id, title, description

1. Setup project structure dengan folder:
   - src/controllers/auth.controller.ts
   - src/controllers/user.controller.ts
   - src/routes/auth.routes.ts
   - src/routes/user.routes.ts
   - src/middlewares/auth.middleware.ts
   - src/utils/jwt.util.ts
   - src/utils/bcrypt.util.ts

2. Authentication:
   - Register untuk User (email, password, name, address?, phone_number?)
   - Register untuk Company (email, password, name, address?, phone_number?, website?, vision_mission?, description?, founding_date?, logo_path?, image_path?)
   - Password harus di-hash menggunakan bcrypt
   - Login untuk User dan Company (generate JWT token)
   - Middleware untuk validasi JWT token

3. User Profile Management:
   - Get profile user (dengan include experiences dan achievements)
   - Update profile user (name, address, phone_number saja - tidak bisa ubah email dan password)

4. CRUD Experience:
   - Create experience (title, description) untuk user yang sedang login
   - Get all experiences milik user yang login
   - Update experience by id (title, description) - validasi ownership
   - Delete experience by id - validasi ownership

5. CRUD Achievement:
   - Achievement BUKAN milik user (tidak ada user_id di Achievement sesuai ERD)
   - Achievement adalah data master/global yang bisa dipilih saat apply job
   - Untuk saat ini, skip CRUD Achievement atau buat endpoint admin saja untuk manage achievement global

6. Implementasi:
   - Error handling yang proper
   - Validasi input menggunakan express-validator
   - Response format: { success: boolean, message: string, data: any }
   - JWT secret dari environment variable
```

---

## 👤 **ORANG 2: Job Management & Search Features**

### Fitur yang Dikerjakan:
1. ✅ **Melamar Pekerjaan** (No. 3)
2. ✅ **Filter Pekerjaan** (No. 4)
3. ✅ **Mencari Pekerjaan** (No. 5)
4. ✅ **Mencari Pekerjaan Berdasarkan Tags** (No. 6)
5. ✅ **Melihat Pekerjaan yang Dilamar** (No. 7)
6. ✅ **Menambah Tags pada Job** (No. 13 - Company side)

### Endpoints yang Dibuat:
```
GET    /api/jobs (dengan query params: search, company_id, tags)
GET    /api/jobs/:id
GET    /api/jobs/tags/:tagName
POST   /api/applications (user apply job)
GET    /api/applications/my-applications (user melihat lamaran sendiri)
POST   /api/jobs/:id/tags (company menambah tags ke job)
DELETE /api/jobs/:id/tags/:tagId (company hapus tag dari job)
```

### Prompting untuk Orang 2:
```
Buatkan backend Express.js + TypeScript + Prisma untuk fitur job management dan search sesuai ERD:

Schema Prisma yang digunakan:
- Job: id, name, description, company_id
- JobTag: id, name, job_id
- Application: id, status, user_id, job_id, achievement_id
- Company: id, email, name, address, phone_number, website, vision_mission, description, founding_date, logo_path, image_path

1. Setup project structure dengan folder:
   - src/controllers/job.controller.ts
   - src/controllers/application.controller.ts
   - src/routes/job.routes.ts
   - src/routes/application.routes.ts

2. Job Search & Filter:
   - GET /api/jobs dengan query params:
     * search (cari di nama dan description job)
     * company_id (filter berdasarkan company)
     * tags (filter berdasarkan job tags, comma separated)
   - Include company info dan job_tags dalam response
   - Implementasi pagination (limit & offset)
   - NOTE: Tidak ada field location, job_type, is_active di ERD - jangan gunakan

3. Job Detail:
   - GET /api/jobs/:id
   - Include: company info, company_tags, job_tags, jumlah aplikasi

4. Search by Tags:
   - GET /api/jobs/tags/:tagName
   - Cari semua job yang memiliki tag tertentu

5. Apply Job (User):
   - POST /api/applications
   - Body: { job_id, achievement_id }
   - achievement_id REQUIRED (sesuai ERD, tidak nullable)
   - Status default: "pending"
   - Validasi: user tidak boleh apply job yang sama lebih dari 1x
   - Memerlukan authentication (JWT)

6. My Applications (User):
   - GET /api/applications/my-applications
   - Include: job info, company info, achievement info, status aplikasi
   - Filter berdasarkan status (query param)

7. Manage Job Tags (Company):
   - POST /api/jobs/:id/tags - menambah tags ke job (body: { name })
   - DELETE /api/jobs/:id/tags/:tagId - hapus tag dari job
   - Validasi: hanya company owner yang bisa modify

8. Implementasi:
   - Error handling yang proper
   - Authentication middleware
   - Response format konsisten
   - Input validation
```

---

## 👤 **ORANG 3: Company Management & Application Processing**

### Fitur yang Dikerjakan:
1. ✅ **Update Profile Company** (No. 8)
2. ✅ **Membuat Job Posting** (No. 9)
3. ✅ **Menerima Lamaran User** (No. 10)
4. ✅ **Menolak Lamaran User** (No. 11)
5. ✅ **Menambah Tags pada Company** (No. 12)
6. ✅ **Notification System** (kirim notif ke user saat lamaran diterima/ditolak)

### Endpoints yang Dibuat:
```
GET    /api/companies/profile
PUT    /api/companies/profile
POST   /api/companies/profile/tags
DELETE /api/companies/profile/tags/:tagId
POST   /api/companies/jobs
PUT    /api/companies/jobs/:id
DELETE /api/companies/jobs/:id
GET    /api/companies/jobs (jobs milik company yang login)
GET    /api/companies/applications (semua aplikasi ke job milik company)
GET    /api/companies/jobs/:jobId/applications (aplikasi untuk job tertentu)
PUT    /api/companies/applications/:id/accept
PUT    /api/companies/applications/:id/reject
GET    /api/users/notifications
DELETE /api/users/notifications/:id
```

### Prompting untuk Orang 3:
```
Buatkan backend Express.js + TypeScript + Prisma untuk fitur company management dan application processing sesuai ERD:

Schema Prisma yang digunakan:
- Company: id, email, password, name, address, phone_number, website, vision_mission, description, founding_date, logo_path, image_path
- CompanyTag: id, name, company_id
- Job: id, name, description, company_id
- Application: id, status, user_id, job_id, achievement_id
- Notification: id, title, subtitle, user_id
- User: id, email, name, address, phone_number
- Experience: id, title, description, user_id
- Achievement: id, title, description

1. Setup project structure dengan folder:
   - src/controllers/company.controller.ts
   - src/routes/company.routes.ts
   - src/services/notification.service.ts

2. Company Profile Management:
   - GET /api/companies/profile
   - PUT /api/companies/profile (update name, address, phone_number, website, vision_mission, description, founding_date, logo_path, image_path)
   - Include company_tags dan total jobs dalam response
   - Memerlukan authentication (JWT untuk company)
   - NOTE: Tidak bisa ubah email dan password

3. Company Tags Management:
   - POST /api/companies/profile/tags - menambah tag ke company (body: { name })
   - DELETE /api/companies/profile/tags/:tagId - hapus tag company
   - Validasi: hanya company owner yang bisa modify

4. Job Posting Management (Company):
   - POST /api/companies/jobs - create job baru (name, description)
   - PUT /api/companies/jobs/:id - update job (name, description) - validasi ownership
   - DELETE /api/companies/jobs/:id - hard delete dari database
   - GET /api/companies/jobs - list semua jobs milik company yang login
   - NOTE: Tidak ada field is_active di ERD - jangan gunakan soft delete

5. Application Management (Company):
   - GET /api/companies/applications - semua aplikasi ke semua job milik company
   - GET /api/companies/jobs/:jobId/applications - aplikasi untuk job tertentu
   - Include: user info (name, email, phone_number, address), achievement info, experiences dalam response
   - Filter berdasarkan status (query param: pending/accepted/rejected)

6. Accept/Reject Application:
   - PUT /api/companies/applications/:id/accept
     * Update status jadi "accepted"
     * Kirim notification ke user (title, subtitle)
   - PUT /api/companies/applications/:id/reject
     * Update status jadi "rejected"
     * Kirim notification ke user (title, subtitle)

7. Notification System:
   - Service untuk create notification (title, subtitle, user_id)
   - GET /api/users/notifications - user melihat semua notifikasi miliknya
   - DELETE /api/users/notifications/:id - hapus notifikasi
   - Notifikasi dikirim saat:
     * Lamaran diterima: title: "Lamaran Diterima", subtitle: "Selamat! Lamaran Anda untuk posisi {job_name} di {company_name} telah diterima"
     * Lamaran ditolak: title: "Lamaran Ditolak", subtitle: "Maaf, lamaran Anda untuk posisi {job_name} di {company_name} belum dapat kami terima saat ini"

8. Implementasi:
   - Error handling yang proper
   - Authentication middleware untuk company
   - Response format konsisten
   - Input validation
   - Transaction untuk operasi yang kompleks
```

---

## 📋 **Setup Project (Dikerjakan Bersama)**

### Prerequisites:
```bash
npm install express typescript ts-node-dev
npm install @types/express @types/node
npm install prisma @prisma/client
npm install jsonwebtoken bcryptjs
npm install @types/jsonwebtoken @types/bcryptjs
npm install express-validator
npm install dotenv
npm install cors
npm install @types/cors
```

### File Structure:
```
src/
├── controllers/
│   ├── auth.controller.ts
│   ├── user.controller.ts
│   ├── job.controller.ts
│   ├── application.controller.ts
│   └── company.controller.ts
├── routes/
│   ├── auth.routes.ts
│   ├── user.routes.ts
│   ├── job.routes.ts
│   ├── application.routes.ts
│   └── company.routes.ts
├── middlewares/
│   ├── auth.middleware.ts
│   └── error.middleware.ts
├── utils/
│   ├── jwt.util.ts
│   ├── bcrypt.util.ts
│   └── response.util.ts
├── services/
│   └── notification.service.ts
├── types/
│   └── express.d.ts
└── index.ts
```

### .env File:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/job_portal"
JWT_SECRET="your-secret-key-here"
PORT=3000
```

---

## 🎯 **Kompleksitas & Estimasi Waktu**

### Orang 1 (Authentication & User Profile):
- **Kompleksitas**: Medium
- **Estimasi**: 2-3 hari
- **Alasan**: Setup authentication adalah foundation, butuh security yang baik

### Orang 2 (Job Management & Search):
- **Kompleksitas**: Medium-High
- **Estimasi**: 2-3 hari
- **Alasan**: Search & filter dengan multiple params, pagination

### Orang 3 (Company Management & Application):
- **Kompleksitas**: Medium-High
- **Estimasi**: 2-3 hari
- **Alasan**: Business logic kompleks, notification system, transaction handling

---

## 📝 **Testing Checklist**

### Setiap orang harus test:
- ✅ Semua endpoint bekerja dengan benar
- ✅ Error handling untuk edge cases
- ✅ Authentication & authorization
- ✅ Input validation
- ✅ Database operations (CRUD)
- ✅ Response format konsisten

### Tools untuk testing:
- Postman / Thunder Client
- Create collection untuk semua endpoints
- Test dengan data dummy
