# SuperLabs Shop | Backend Developer Task

A robust Product Management System built with **Node.js**, **Express**, and **PostgreSQL**. This project features a full-stack implementation including a RESTful API, dynamic frontend, and automated database management.

## 🚀 Live Demo & Documentation
- **Live Application:** [https://superlabs-backend-z0k1.onrender.com](https://superlabs-backend-z0k1.onrender.com)
- **API Documentation (Swagger):** [https://superlabs-backend-z0k1.onrender.com/api/docs](https://superlabs-backend-z0k1.onrender.com/api/docs)

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL with Prisma ORM
- **API Docs:** Swagger (OpenAPI 3.0)
- **Frontend:** HTML5, Vanilla JavaScript, CSS3 (Responsive Design)
- **File Handling:** Multer (for image uploads)
- **Deployment:** Render (Web Service + Managed PostgreSQL)

---

## ✨ Features

### 📦 Product Management
- **Full CRUD:** Create, Read, Update, and Delete products.
- **Inventory Tracking:** Manage stock levels and categories.
- **Unique SKU:** Enforced uniqueness for product identifiers.
- **Image Support:** Support for both local file uploads and external image URLs.

### 💰 Dynamic Pricing
- **Smart Discounting:** Support for both regular and discounted prices.
- **UI Integration:** Automatic strike-through styling for old prices when a discount is active.

### 🔍 Discovery & UX
- **Advanced Search:** Search products by Name, SKU, or Description.
- **Pagination:** Optimized server-side pagination for large catalogs.
- **Responsive Dashboard:** Fully functional Admin Dashboard and Shop Catalog views.

### 📑 Developer Experience
- **Auto-Documentation:** Interactive Swagger UI at `/api/docs`.
- **Database Rescue:** Automated scripts to handle migration locks and deployment issues.

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL instance

### Local Setup
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd superlabs-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
   PORT=5000
   ```

4. **Run Migrations & Seed:**
   ```bash
   npx prisma migrate dev --name init
   npm run seed
   ```

5. **Start Development Server:**
   ```bash
   npm run dev
   ```

---

## 🏗️ Project Structure
```text
├── src/
│   ├── config/         # App configuration (Swagger, etc.)
│   ├── controllers/    # Request handlers & logic
│   ├── routes/         # API endpoint definitions
│   ├── utils/          # Database client & utilities
│   └── index.js        # Entry point
├── prisma/             # Schema & migrations
├── public/             # Frontend assets (HTML, CSS, JS)
├── uploads/            # Local product images
├── scripts/            # Deployment & utility scripts
└── render.yaml         # Render deployment configuration
```

---

## 🚢 Deployment (Render)
This project is configured for one-click deployment to Render using the `render.yaml` file.

**Build Command:**
```bash
npm install && npx prisma generate && npx prisma migrate deploy
```

**Start Command:**
```bash
npm start
```

---

## 🤝 Conclusion
This project demonstrates a complete backend architecture focusing on data integrity, API documentation, and a smooth developer-to-production workflow.