/**
 * Admin Authentication & CMS Management
 * Portfolio Sanjai K — Frontend (API-connected + Local Fallback)
 */

(function () {
  'use strict';

  const API_BASE = 'http://localhost:5000/api';
  const SESSION_KEY = 'sanjai_admin_session';

  // Fallback Credentials for Offline / Standalone mode
  const FALLBACK_USER = 'admin';
  const FALLBACK_PASS = 'admin123';

  // Elements
  const adminLoginModalEl = document.getElementById('adminLoginModal');
  const adminLoginForm = document.getElementById('adminLoginForm');
  const adminLoginError = document.getElementById('adminLoginError');
  const adminNavBtn = document.getElementById('adminNavBtn');
  const adminStatusBadge = document.getElementById('adminStatusBadge');
  const adminLogoutBtn = document.getElementById('adminLogoutBtn');

  document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
    bindAdminEvents();
  });

  // Check session status (try backend, fallback to localStorage)
  async function checkAuthStatus() {
    const isLoggedLocal = localStorage.getItem(SESSION_KEY) === 'true';

    try {
      const res = await fetch(`${API_BASE}/auth/status`, { credentials: 'include' });
      const data = await res.json();
      if (data.loggedIn || isLoggedLocal) {
        localStorage.setItem(SESSION_KEY, 'true');
        enableAdminMode();
      } else {
        localStorage.removeItem(SESSION_KEY);
        disableAdminMode();
      }
    } catch (err) {
      // Backend offline — rely on localStorage state
      if (isLoggedLocal) enableAdminMode();
      else disableAdminMode();
    }
  }

  function bindAdminEvents() {
    if (adminLoginForm) {
      adminLoginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('adminUsername').value.trim();
        const password = document.getElementById('adminPassword').value.trim();

        if (!username || !password) {
          showError("Please enter both username and password.");
          return;
        }

        let loginSuccess = false;
        let noticeMessage = "Welcome back, Admin!";

        // 1. Try Backend API
        try {
          const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ username, password })
          });

          const data = await res.json();
          if (data.success) {
            loginSuccess = true;
          } else {
            showError(data.message || "Invalid username or password!");
            return;
          }
        } catch (err) {
          // 2. Backend unreachable — Fallback to local authentication
          console.warn("Backend API unreachable. Falling back to client-side auth.");
          if (username === FALLBACK_USER && password === FALLBACK_PASS) {
            loginSuccess = true;
            noticeMessage = "Welcome back, Admin! (Offline Mode)";
          } else {
            showError("Invalid username or password!");
            return;
          }
        }

        if (loginSuccess) {
          localStorage.setItem(SESSION_KEY, 'true');
          if (adminLoginError) adminLoginError.classList.add('d-none');

          const modalInstance = bootstrap.Modal.getInstance(adminLoginModalEl);
          if (modalInstance) modalInstance.hide();
          adminLoginForm.reset();

          enableAdminMode();
          showNotification(noticeMessage, 'success');
        }
      });
    }

    if (adminLogoutBtn) {
      adminLogoutBtn.addEventListener('click', async () => {
        try {
          await fetch(`${API_BASE}/auth/logout`, {
            method: 'POST',
            credentials: 'include'
          });
        } catch (err) {
          // Ignore backend failure on logout
        }
        localStorage.removeItem(SESSION_KEY);
        disableAdminMode();
        showNotification('Logged out of Admin Session', 'info');
      });
    }
  }

  function showError(msg) {
    if (adminLoginError) {
      adminLoginError.textContent = msg;
      adminLoginError.classList.remove('d-none');
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

  function showNotification(msg, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} position-fixed bottom-0 end-0 m-3 z-3 shadow-lg glass-card text-light`;
    toast.style.minWidth = '250px';
    toast.innerHTML = `<i class="bi bi-shield-check me-2"></i> ${msg}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
})();
