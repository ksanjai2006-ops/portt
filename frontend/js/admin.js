/**
 * Admin Authentication & CMS Management
 * Portfolio Sanjai K — Frontend (API-connected)
 */

(function () {
  'use strict';

  const API_BASE = 'http://localhost:5000/api';
  const SESSION_KEY = 'sanjai_admin_session';

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

  // Check session status with backend on load
  async function checkAuthStatus() {
    try {
      const res = await fetch(`${API_BASE}/auth/status`, { credentials: 'include' });
      const data = await res.json();
      if (data.loggedIn) {
        localStorage.setItem(SESSION_KEY, 'true');
        enableAdminMode();
      } else {
        localStorage.removeItem(SESSION_KEY);
        disableAdminMode();
      }
    } catch (err) {
      // Backend not reachable — fallback to localStorage
      const isLogged = localStorage.getItem(SESSION_KEY) === 'true';
      if (isLogged) enableAdminMode();
      else disableAdminMode();
    }
  }

  function bindAdminEvents() {
    if (adminLoginForm) {
      adminLoginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('adminUsername').value.trim();
        const password = document.getElementById('adminPassword').value.trim();

        try {
          const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ username, password })
          });

          const data = await res.json();

          if (data.success) {
            localStorage.setItem(SESSION_KEY, 'true');
            if (adminLoginError) adminLoginError.classList.add('d-none');

            const modalInstance = bootstrap.Modal.getInstance(adminLoginModalEl);
            if (modalInstance) modalInstance.hide();
            adminLoginForm.reset();

            enableAdminMode();
            showNotification('Welcome back, Admin!', 'success');
          } else {
            if (adminLoginError) {
              adminLoginError.textContent = data.message || 'Invalid credentials!';
              adminLoginError.classList.remove('d-none');
            }
          }
        } catch (err) {
          if (adminLoginError) {
            adminLoginError.textContent = 'Server unreachable. Please start the backend.';
            adminLoginError.classList.remove('d-none');
          }
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
          // Logout locally even if backend unreachable
        }
        localStorage.removeItem(SESSION_KEY);
        disableAdminMode();
        showNotification('Logged out of Admin Session', 'info');
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

  function showNotification(msg, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} position-fixed bottom-0 end-0 m-3 z-3 shadow-lg glass-card text-light`;
    toast.style.minWidth = '250px';
    toast.innerHTML = `<i class="bi bi-shield-check me-2"></i> ${msg}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
})();
