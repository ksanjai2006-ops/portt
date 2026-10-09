/* ==========================================================================
   Projects Data & Dynamic Modal Filtering Module
   Sanjai K - Portfolio
   ========================================================================== */

const PROJECTS_DATA = [
  {
    id: "project-portfolio",
    title: "Personal Portfolio Website",
    category: "frontend",
    categoryLabel: "Frontend",
    shortDescription: "A modern, dynamic, and responsive personal portfolio website showcasing skills, projects, education, and achievements.",
    fullDescription: "This personal portfolio website serves as a central hub to demonstrate web development capabilities, interactive UI design, and responsive layout engineering. Built with a clean aesthetic, custom glassmorphic theme system, smooth scroll reveals, and modular JavaScript.",
    problemStatement: "Need for a unique, highly professional online identity that highlights projects, technical skills, and educational qualifications without relying on heavy frameworks.",
    features: [
      "Custom Glassmorphic Dark & Light Theme system",
      "Dynamic project gallery with category filtering",
      "Interactive project details modal with deep feature breakdown",
      "Form validation with EmailJS contact integration fallback",
      "Responsive layout optimized for mobile, tablet, and desktop"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "Font Awesome"],
    image: "assets/images/project-portfolio.svg",
    githubUrl: "https://github.com/Sanjai-K/portfolio-website",
    demoUrl: "#",
    isCompleted: true
  },
  {
    id: "project-finance",
    title: "Finance Dashboard",
    category: "fullstack",
    categoryLabel: "Full Stack",
    shortDescription: "A modern financial tracking dashboard concept for organizing expenses, budgets, and visualizing spending patterns.",
    fullDescription: "An intuitive web application designed to help users track monthly income and expenditure, categorize recurring expenses, analyze spending trends through charts, and set financial savings goals.",
    problemStatement: "Individuals often struggle with managing personal budgets across multiple channels without a clean visual summary of their cash flow.",
    features: [
      "Real-time expense categorizer and monthly budget planner",
      "Visual chart widgets for cash flow distribution",
      "Interactive data tables with search and export features",
      "Clean dark mode analytical user interface"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "Chart.js Concept"],
    image: "assets/images/project-finance.svg",
    githubUrl: "https://github.com/Sanjai-K/finance-dashboard",
    demoUrl: "#",
    isCompleted: false,
    statusNote: "Concept / Work in Progress"
  },
  {
    id: "project-student-mgmt",
    title: "Student Management System",
    category: "backend",
    categoryLabel: "Backend / Full Stack",
    shortDescription: "A comprehensive web application concept for organizing student information, academic records, and attendance tracking.",
    fullDescription: "Designed for educational institutions to streamline administrative workflows. Provides role-based access for faculty and students to view schedules, submit assignments, and update student profiles.",
    problemStatement: "Manual record-keeping in academic environments leads to data redundancy, lost paperwork, and inefficient record retrieval.",
    features: [
      "Student record CRUD operations (Create, Read, Update, Delete)",
      "RESTful API architecture design for backend integration",
      "Course registration and grade tracking workflows",
      "Swagger API specification & documentation ready"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Node.js", "Express.js", "MongoDB Concept"],
    image: "assets/images/project-student.svg",
    githubUrl: "https://github.com/Sanjai-K/student-management-system",
    demoUrl: "#",
    isCompleted: false,
    statusNote: "Concept / Work in Progress"
  }
];

// SVG Fallback Image Generator for preview graphics
function getProjectSvgImage(title, category) {
  const bgColors = {
    frontend: "%239333ea",
    fullstack: "%2306b6d4",
    backend: "%23ec4899",
    other: "%233b82f6"
  };
  const color = bgColors[category] || "%239333ea";
  
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%23121824"/><circle cx="300" cy="180" r="100" fill="${color}" opacity="0.25"/><path d="M220,150 L380,150 L380,250 L220,250 Z" fill="none" stroke="${color}" stroke-width="4" rx="10"/><text x="300" y="210" font-family="Outfit, sans-serif" font-size="22" font-weight="bold" fill="%23ffffff" text-anchor="middle">${encodeURIComponent(title)}</text><text x="300" y="240" font-family="Fira Code, monospace" font-size="14" fill="%2306b6d4" text-anchor="middle">&lt;${category.toUpperCase()}&gt;</text></svg>`;
}

// Render Project Cards Grid
function renderProjects(filter = "all") {
  const container = document.getElementById("projects-grid-container");
  if (!container) return;

  const filteredProjects = filter === "all"
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === filter);

  if (filteredProjects.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="glass-card p-4 d-inline-block">
          <i class="bi bi-folder-x fs-1 text-muted mb-3 d-block"></i>
          <p class="text-muted mb-0">No projects found in this category yet.</p>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredProjects.map(project => {
    const imgSrc = getProjectSvgImage(project.title, project.category);
    
    return `
      <div class="col-lg-4 col-md-6 mb-4 project-item-card" data-category="${project.category}">
        <div class="glass-card project-card">
          <div class="project-img-wrapper">
            <img src="${imgSrc}" alt="${project.title}" class="project-img" loading="lazy">
            <span class="project-badge-category">${project.categoryLabel}</span>
          </div>
          <div class="project-body">
            <h3 class="project-title">${project.title}</h3>
            ${project.statusNote ? `<div class="badge bg-warning text-dark mb-2 align-self-start font-monospace">${project.statusNote}</div>` : ''}
            <p class="project-desc">${project.shortDescription}</p>
            <div class="project-tech-stack">
              ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-links-row">
              <button class="btn btn-custom-primary btn-card-action" onclick="openProjectModal('${project.id}')">
                <i class="bi bi-info-circle me-1"></i> View Details
              </button>
              <a href="${project.githubUrl}" target="_blank" rel="noopener" class="btn btn-custom-outline btn-card-action" title="View Source Code">
                <i class="bi bi-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Setup Project Filtering Listeners
function setupProjectFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      renderProjects(filter);
    });
  });
}

// Open and Populate Project Details Modal
function openProjectModal(projectId) {
  const project = PROJECTS_DATA.find(p => p.id === projectId);
  if (!project) return;

  const modalTitle = document.getElementById("projectModalTitle");
  const modalBody = document.getElementById("projectModalBody");

  if (modalTitle) modalTitle.textContent = project.title;

  if (modalBody) {
    modalBody.innerHTML = `
      <div class="row g-4">
        <div class="col-12">
          <img src="${getProjectSvgImage(project.title, project.category)}" alt="${project.title}" class="img-fluid rounded-4 w-100 border border-secondary mb-3">
        </div>
        <div class="col-12">
          <div class="modal-section-title">// OVERVIEW</div>
          <p class="text-light">${project.fullDescription}</p>
        </div>
        <div class="col-12">
          <div class="modal-section-title">// PROBLEM STATEMENT</div>
          <p class="text-muted">${project.problemStatement}</p>
        </div>
        <div class="col-12">
          <div class="modal-section-title">// KEY FEATURES</div>
          <ul class="list-unstyled mb-0">
            ${project.features.map(f => `<li class="mb-2 text-light"><i class="bi bi-check2-circle text-info me-2"></i>${f}</li>`).join('')}
          </ul>
        </div>
        <div class="col-12">
          <div class="modal-section-title">// TECHNOLOGIES USED</div>
          <div class="d-flex flex-wrap gap-2">
            ${project.technologies.map(t => `<span class="badge bg-secondary px-3 py-2 fs-7">${t}</span>`).join('')}
          </div>
        </div>
        <div class="col-12 pt-3 border-top border-secondary d-flex flex-wrap gap-3">
          <a href="${project.githubUrl}" target="_blank" rel="noopener" class="btn btn-custom-primary">
            <i class="bi bi-github me-1"></i> GitHub Repository
          </a>
          <button class="btn btn-custom-outline" onclick="alert('Demo link available upon deployment!')">
            <i class="bi bi-box-arrow-up-right me-1"></i> Live Demo Preview
          </button>
        </div>
      </div>
    `;
  }

  const modalElement = document.getElementById("projectDetailModal");
  if (modalElement && typeof bootstrap !== "undefined") {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects("all");
  setupProjectFilters();
});
