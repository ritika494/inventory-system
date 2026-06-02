# Inventory Management System

A full-stack Inventory Management System built using **FastAPI**, **PostgreSQL**, **React (Vite)**, and **Material UI**.

The application allows users to manage products, customers, and orders while automatically tracking inventory levels.

---

## Live Demo

### Frontend (Netlify)

https://inventorymanagement-app.netlify.app

### Backend API (Render)

https://inventory-system-07pk.onrender.com

### API Documentation

https://inventory-system-07pk.onrender.com/docs

### Docker Hub Image

https://hub.docker.com/r/ritika1307/inventory-backend

### GitHub Repository

https://github.com/ritika494/inventory-system

Pull image:

```bash
docker pull ritika1307/inventory-backend:latest
```

---

# Features

## Product Management

* Create Product
* View Products
* Update Product
* Delete Product
* SKU Validation
* Inventory Tracking
* Low Stock Indicators

## Customer Management

* Create Customer
* View Customers
* Delete Customer

## Order Management

* Create Orders
* View Orders
* Delete Orders
* Automatic Inventory Deduction
* Inventory Restoration on Order Deletion

## Dashboard

* Total Products
* Total Customers
* Total Orders
* Low Stock Products

---

# Tech Stack

## Backend

* Python 3.13
* FastAPI
* SQLAlchemy
* PostgreSQL
* Pydantic
* Uvicorn

## Frontend

* React
* Vite
* Material UI (MUI)
* Axios
* React Router

## Database

* PostgreSQL

## DevOps

* Docker
* Docker Compose
* Docker Hub
* Render
* Netlify

---

# Project Structure

```text
inventory-system/
│
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routers/
│   │   ├── database.py
│   │   └── main.py
│   │
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── components/
│   │   └── App.jsx
│   │
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

# Backend Setup (FastAPI)

## Create Virtual Environment

```bash
python -m venv venv
```

Activate:

Windows:

```bash
venv\Scripts\activate
```

Mac/Linux:

```bash
source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## PostgreSQL Setup

Create database:

```sql
CREATE DATABASE inventory_db;
```

---

## Configure Environment Variables

Create `.env`

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/inventory_db
```

---

## Run Backend

```bash
uvicorn app.main:app --reload
```

Swagger UI:

```text
http://localhost:8000/docs
```

---

# Frontend Setup (React + Vite)

## Install Dependencies

```bash
npm install
```

---

## API Configuration

Update:

```javascript
// src/services/api.js

const api = axios.create({
  baseURL: "http://localhost:8000"
});
```

For production:

```javascript
const api = axios.create({
  baseURL: "https://inventory-system-07pk.onrender.com"
});
```

## Run Frontend

```bash
npm run dev
```

Application:

```text
http://localhost:5173
```

---

# Docker Setup

## Build Backend Image

```bash
docker build -t inventory-backend ./backend
```

---

## Run Backend Container

```bash
docker run -p 8000:8000 inventory-backend
```

---

## Docker Compose

Start all services:

```bash
docker compose up --build
```

Stop:

```bash
docker compose down
```

---

# Docker Hub

Backend image published on Docker Hub.

Repository:

```text
ritika1307/inventory-backend
```

Pull image:

```bash
docker pull ritika1307/inventory-backend:latest
```

Run:

```bash
docker run -p 8000:8000 ritika1307/inventory-backend:latest
```

---

# Deployment

## Note

The backend is deployed on Render Free Tier.

If the service has been inactive, the first request may take up to a minute while Render wakes the service.

## Backend Deployment (Render)

1. Push code to GitHub
2. Create PostgreSQL Database on Render
3. Create Web Service
4. Connect GitHub Repository
5. Configure Environment Variables

Example:

```env
DATABASE_URL=<render-postgres-url>
```

6. Deploy

Backend URL:

```text
https://YOUR-RENDER-URL.onrender.com
```

---

## Frontend Deployment (Netlify)

1. Push frontend code to GitHub
2. Create New Site from Git
3. Connect Repository
4. Configure Environment Variables

```env
VITE_API_URL=https://YOUR-RENDER-URL.onrender.com
```

Build command:

```bash
npm run build
```

Publish directory:

```text
dist
```

Deploy

Frontend URL:

```text
https://YOUR-NETLIFY-URL.netlify.app
```

---

# API Endpoints

## Products

```http
GET    /products
GET    /products/{id}
POST   /products
PUT    /products/{id}
DELETE /products/{id}
```

## Customers

```http
GET    /customers
GET    /customers/{id}
POST   /customers
PUT    /customers/{id}
DELETE /customers/{id}
```

## Orders

```http
GET    /orders
GET    /orders/{id}
POST   /orders
DELETE /orders/{id}
```

## Dashboard

```http
GET /dashboard
```

# Screenshots

## Dashboard

![Dashboard]
<img width="1674" height="848" alt="image" src="https://github.com/user-attachments/assets/5c7054a7-f854-4a67-a25f-c352efa76489" />


## Products

![Products](screenshots/products.png)

## Orders

![Orders](screenshots/orders.png)

---

# Author

Ritika

Built using FastAPI, PostgreSQL, React, Material UI, Docker, Render, and Netlify.
