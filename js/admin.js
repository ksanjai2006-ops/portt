/**
 * Admin Authentication & CMS Management
 * Portfolio Sanjai K
 */

(function () {
  'use strict';

  // Credentials (In production with a separate backend, this connects to API endpoint)
  const ADMIN_USER = "admin";
  const ADMIN_PASS = "admin123";
  const SESSION_KEY = "sanjai_admin_session";

  // Elements
  const adminLoginModalEl = document.getElementById('adminLoginModal');
  const adminLoginForm = document.getElementById('adminLoginForm');
  const adminLoginError = document.getElementById('adminLoginError');
  const adminNavBtn = document.getElementById('adminNavBtn');
  const adminStatusBadge = document.getElementById('adminStatusBadge');
  const adminLogoutBtn = document.getElementById('adminLogoutBtn');

  // Check login state on page load
  document.addEventListener('DOMContentLoaded', () => {
    initAdminSession();
    bindAdminEvents();
  });

  function initAdminSession() {
    const isLogged = localStorage.getItem(SESSION_KEY) === "true";
    if (isLogged) {
      enableAdminMode();
    } else {
      disableAdminMode();
    }
  }

  function bindAdminEvents() {
    if (adminLoginForm) {
      adminLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const usernameInput = document.getElementById('adminUsername').value.trim();
        const passwordInput = document.getElementById('adminPassword').value.trim();

        if (usernameInput === ADMIN_USER && passwordInput === ADMIN_PASS) {
          localStorage.setItem(SESSION_KEY, "true");
          if (adminLoginError) adminLoginError.classList.add('d-none');
          
          // Hide modal
          const modalInstance = bootstrap.Modal.getInstance(adminLoginModalEl);
          if (modalInstance) modalInstance.hide();
          adminLoginForm.reset();

          enableAdminMode();
          showNotification("Welcome back, Admin!", "success");
        } else {
          if (adminLoginError) {
            adminLoginError.textContent = "Invalid username or password!";
            adminLoginError.classList.remove('d-none');
          }
        }
      });
    }

    if (adminLogoutBtn) {
      adminLogoutBtn.addEventListener('click', () => {
        localStorage.removeItem(SESSION_KEY);
        disableAdminMode();
        showNotification("Logged out of Admin Session", "info");
      });
    }
  }

  function enableAdminMode() {
    document.body.classList.add('admin-logged-in');
    if (adminNavBtn) adminNavBtn.classList.add('d-none');
    if (adminStatusBadge) adminStatusBadge.classList.remove('d-none');
    if (adminLogoutBtn) adminLogoutBtn.classList.remove('d-none');
  }

  function disableAdminMode() {
    document.body.classList.remove('admin-logged-in');
    if (adminNavBtn) adminNavBtn.classList.remove('d-none');
    if (adminStatusBadge) adminStatusBadge.classList.add('d-none');
    if (adminLogoutBtn) adminLogoutBtn.classList.add('d-none');
  }

  function showNotification(msg, type = "info") {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} position-fixed bottom-0 end-0 m-3 z-3 shadow-lg glass-card text-light`;
    toast.style.minWidth = "250px";
    toast.innerHTML = `<i class="bi bi-shield-check me-2"></i> ${msg}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
})();
