# Modern Dynamic Personal Portfolio — Sanjai K

A modern, responsive, and interactive personal portfolio website with a **separated Frontend & Backend** architecture.

---

## 🏗️ Project Structure

```text
Port/
├── frontend/               # Static Frontend (HTML/CSS/JS)
│   ├── index.html
│   ├── css/style.css
│   ├── js/
│   │   ├── main.js          # Theme, ScrollSpy, Typing & Counters
│   │   ├── projects.js      # Projects Data & Modal Handler
│   │   ├── contact.js       # Contact Form → Backend API
│   │   └── admin.js         # Admin Auth → Backend API
│   └── assets/
│       ├── images/
│       └── documents/
├── backend/                 # Node.js Express API Server
│   ├── server.js            # Express App Entry Point
│   ├── package.json
│   ├── .env                 # Environment Config (not tracked)
│   ├── routes/
│   │   ├── auth.js          # Login / Logout / Status
│   │   └── contact.js       # Contact Form Submissions
│   └── middleware/
│       └── auth.js          # Admin Route Guard
├── .gitignore
└── README.md
```

---

## 🚀 Running the Application

### 1. Start the Backend

```bash
cd backend
npm install
npm start
```

The API server starts at `http://localhost:5000`.

### 2. Start the Frontend

Open `frontend/index.html` using any of these methods:

**VS Code Live Server:**
1. Open the `frontend/` folder in VS Code.
2. Right-click `index.html` → **Open with Live Server** (runs on port 5500).

**Python HTTP Server:**
```bash
cd frontend
python -m http.server 5500
```

**Node.js Serve:**
```bash
cd frontend
npx serve -l 5500
```

> **Note:** The frontend expects the backend at `http://localhost:5000`. If your frontend runs on a different port, update `FRONTEND_URL` in `backend/.env`.

---

## 🔐 Admin Login

- **Username:** `admin`
- **Password:** `admin123`

Click the **Admin** button in the navbar to login.

> Credentials are configured in `backend/.env`. Change them before deploying to production.

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/login` | Admin login | Public |
| POST | `/api/auth/logout` | Admin logout | Public |
| GET | `/api/auth/status` | Check session status | Public |
| POST | `/api/contact` | Submit contact message | Public |
| GET | `/api/contact/messages` | List all messages | Admin |
| DELETE | `/api/contact/messages/:id` | Delete a message | Admin |
| GET | `/api/health` | Server health check | Public |

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript (ES6+), Bootstrap 5.3.2 |
| **Backend** | Node.js, Express.js, express-session, CORS |
| **Fonts** | Google Fonts (Outfit, Fira Code) |
| **Icons** | Bootstrap Icons |

---

## 📜 License
Created for **Sanjai K** — Free to use for personal portfolio showcase.
