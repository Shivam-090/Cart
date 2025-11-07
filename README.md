# VibeCart – Full Stack Mock E-Commerce Cart

VibeCart is a full-stack e-commerce cart application built as a coding assignment for Vibe Commerce screening.  
It demonstrates a clean implementation of core shopping cart flows: product listing, cart management, totals calculation, and mock checkout — all backed by a real database.

This project uses React (Vite) + Tailwind + Redux Toolkit on the frontend, Node.js + Express on the backend, and MongoDB for data persistence.

---

## Tech Stack

**Frontend**
- React + Vite
- TailwindCSS
- Redux Toolkit
- Axios
- React Router

**Backend**
- Node.js
- Express
- Mongoose (MongoDB)

---

## Folder Structure

```
vibecart/
 ├── client/        # React Frontend (Vite + Tailwind + Redux Toolkit)
 └── server/        # Node / Express Backend
```

---

## How to Run Locally

### 1) Clone Repo
```bash
git clone <repo-url>
cd vibecart
```

### 2) Install Frontend
```bash
cd client
npm install
```

### 3) Install Backend
```bash
cd ../server
npm install
```

### 4) Setup .env
Create `/server/.env`:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/vibecart
PORT=3000
```

### 5) Seed Products (run once)
```bash
node src/db/productsSeeder.js
```

### 6) Start Backend
```bash
npm run start
```

### 7) Start Frontend
```bash
cd ../client
npm run dev
```

Frontend default:  
`http://localhost:5173`

---

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET    | `/api/products` | get all products |
| GET    | `/api/cart` | fetch cart + total |
| POST   | `/api/cart` | add product to cart {productId, qty} |
| DELETE | `/api/cart/:id` | remove item |
| POST   | `/api/cart/checkout` | mock checkout receipt |

---
