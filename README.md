# Modern Dynamic Personal Portfolio Website — Sanjai K

A modern, responsive, and interactive personal portfolio website for **Sanjai K** (Aspiring Full Stack Web Developer). Built using HTML5, CSS3, JavaScript (ES6+), and Bootstrap 5 with a custom glassmorphism dark/light design system.

---

## 🚀 Key Features

* **Glassmorphic Design System**: Futuristic translucent card interfaces with glow effects, custom gradients, and smooth typography (Outfit & Fira Code Google Fonts).
* **Dark / Light Theme Toggle**: Dynamic theme switcher with preference persisted in `localStorage`.
* **Hero Section & Typing Effect**: Interactive typing animation displaying roles (`Full Stack Developer`, `Web Developer`, `Software Developer`, `Technology Enthusiast`).
* **Categorized Technical Skills**: Frontend, Backend, Programming Languages, Databases, and Developer Tools (including **Swagger / OpenAPI** and **Postman**).
* **Filterable Projects Gallery**: Dynamic category filtering (All, Frontend, Full Stack, Backend) with interactive project details modal popups.
* **Education Timeline**: Highlighting B.Tech / B.E. in Information Technology at **Dhanalakshmi College of Engineering, Manimangalam**.
* **Certifications Section**: AWS, HTML, CSS, and Technical Workshop completion badges.
* **Resume Download & Viewer**: One-click resume PDF viewer and download trigger linked to `assets/documents/resume.pdf`.
* **Contact Form & Validation**: Client-side validation, loader states, EmailJS integration wrapper, and built-in demo feedback fallback.
* **Fully Responsive & Accessible**: Mobile-first grid scaling, keyboard focus styles, and `@media (prefers-reduced-motion)` support.

---

## 🛠️ Technology Stack

* **Structure**: HTML5 Semantic Tags
* **Styling**: Custom CSS3, CSS Custom Properties, Bootstrap 5.3.2 CDN
* **Icons**: Bootstrap Icons (v1.11.3)
* **Scripts**: Vanilla JavaScript (ES6+)
* **Email Service**: EmailJS Browser Client Library

---

## 📁 File & Directory Structure

```text
portfolio/
├── index.html                  # Main Portfolio Web Page
├── assets/
│   ├── images/
│   │   └── avatar.svg          # Developer SVG Avatar Graphic
│   ├── icons/                  # Custom Icons
│   └── documents/
│       └── resume.pdf          # Resume PDF Document
├── css/
│   └── style.css               # Glassmorphism Design Tokens & Styles
├── js/
│   ├── main.js                 # Theme Toggle, ScrollSpy, Typing & Stats Counter
│   ├── projects.js             # Projects Data & Dynamic Modal Handler
│   └── contact.js              # Contact Form Validation & EmailJS Wrapper
└── README.md                   # Setup & Customization Documentation
```

---

## 💻 Running the Website Locally

### Option 1: Live Server / VS Code Extension
1. Open the project folder `d:\Projects\Profile\Port` in Visual Studio Code.
2. Install the **Live Server** extension.
3. Click **"Go Live"** in the bottom status bar or right-click `index.html` and select **Open with Live Server**.

### Option 2: Python Local HTTP Server
Run the following command in terminal inside `d:\Projects\Profile\Port`:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

### Option 3: Node.js Serve CLI
```bash
npx serve .
```

---

## ⚙️ Customization Instructions

### 1. Updating Projects
Edit `PROJECTS_DATA` array inside `js/projects.js`:
```javascript
{
  id: "your-project-id",
  title: "Your Project Name",
  category: "frontend", // frontend | fullstack | backend
  categoryLabel: "Frontend",
  shortDescription: "Short description...",
  fullDescription: "Full description...",
  problemStatement: "Problem solved...",
  features: ["Feature 1", "Feature 2"],
  technologies: ["HTML", "CSS", "JavaScript"],
  githubUrl: "https://github.com/YourUsername/repo",
  demoUrl: "https://your-demo-link.com"
}
```

### 2. Configuring EmailJS (Optional)
To connect the contact form to receive real emails:
1. Create a free account at [EmailJS](https://www.emailjs.com/).
2. Add your Service ID, Template ID, and Public Key in `js/contact.js` or add them globally in `<script>`:
```javascript
window.EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
window.EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
window.EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
```

---

## 📜 License
Created for **Sanjai K** — Free to use for personal portfolio showcase and career development.
