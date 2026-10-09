/**
 * Admin Authentication & CMS Management
 * Portfolio Sanjai K — Frontend
 */

(function () {
  'use strict';

  const API_BASE = 'http://localhost:5000/api';
  const SESSION_KEY = 'sanjai_admin_session';

  // Fallback Credentials
  const FALLBACK_USER = 'admin';
  const FALLBACK_PASS = 'admin123';

  // Elements
  const adminLoginModalEl = document.getElementById('adminLoginModal');
  const adminDashboardModalEl = document.getElementById('adminDashboardModal');
  const adminLoginForm = document.getElementById('adminLoginForm');
  const adminLoginError = document.getElementById('adminLoginError');
  const adminNavBtn = document.getElementById('adminNavBtn');
  const adminStatusBadge = document.getElementById('adminStatusBadge');
  const adminLogoutBtn = document.getElementById('adminLogoutBtn');
  const adminMessagesTableBody = document.getElementById('adminMessagesTableBody');
  const adminMessageCount = document.getElementById('adminMessageCount');
  const refreshMessagesBtn = document.getElementById('refreshMessagesBtn');

  document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
    bindAdminEvents();
  });

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
      if (isLoggedLocal) enableAdminMode();
      else disableAdminMode();
    }
  }

  function bindAdminEvents() {
    if (adminNavBtn) {
      adminNavBtn.addEventListener('click', (e) => {
        if (window.bootstrap && adminLoginModalEl) {
          e.preventDefault();
          const loginModal = bootstrap.Modal.getOrCreateInstance(adminLoginModalEl);
          loginModal.show();
        }
      });
    }

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

        // Try API
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
          // Local fallback
          if (username === FALLBACK_USER && password === FALLBACK_PASS) {
            loginSuccess = true;
          } else {
            showError("Invalid username or password!");
            return;
          }
        }

        if (loginSuccess) {
          localStorage.setItem(SESSION_KEY, 'true');
          if (adminLoginError) adminLoginError.classList.add('d-none');

          // Close login modal safely
          if (window.bootstrap && adminLoginModalEl) {
            const loginModal = bootstrap.Modal.getOrCreateInstance(adminLoginModalEl);
            loginModal.hide();
          }

          adminLoginForm.reset();
          enableAdminMode();
          showNotification("Welcome, Admin! Access Granted.", "success");

          // Open Dashboard Modal automatically
          setTimeout(() => {
            if (window.bootstrap && adminDashboardModalEl) {
              const dashModal = bootstrap.Modal.getOrCreateInstance(adminDashboardModalEl);
              dashModal.show();
              loadMessages();
            }
          }, 300);
        }
      });
    }

    if (adminLogoutBtn) {
      adminLogoutBtn.addEventListener('click', async () => {
        try {
          await fetch(`${API_BASE}/auth/logout`, { method: 'POST', credentials: 'include' });
        } catch (err) {}
        localStorage.removeItem(SESSION_KEY);
        disableAdminMode();
        showNotification('Logged out of Admin Session', 'info');
      });
    }

    if (refreshMessagesBtn) {
      refreshMessagesBtn.addEventListener('click', () => loadMessages());
    }

    if (adminStatusBadge) {
      adminStatusBadge.addEventListener('click', () => loadMessages());
    }
  }

  async function loadMessages() {
    if (!adminMessagesTableBody) return;
    adminMessagesTableBody.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">Loading messages...</td></tr>';

    try {
      const res = await fetch(`${API_BASE}/contact/messages`, { credentials: 'include' });
      const data = await res.json();

      if (data.success && data.messages) {
        renderMessages(data.messages);
      } else {
        renderFallbackMessages();
      }
    } catch (err) {
      renderFallbackMessages();
    }
  }

  function renderMessages(messages) {
    if (adminMessageCount) adminMessageCount.textContent = `${messages.length} Messages`;

    if (messages.length === 0) {
      adminMessagesTableBody.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">No contact messages received yet.</td></tr>';
      return;
    }

    adminMessagesTableBody.innerHTML = messages.map(msg => `
      <tr>
        <td class="fw-semibold text-light">${escapeHtml(msg.name)}</td>
        <td><a href="mailto:${escapeHtml(msg.email)}" class="text-info text-decoration-none">${escapeHtml(msg.email)}</a></td>
        <td><span class="badge bg-dark text-light border border-secondary">${escapeHtml(msg.subject)}</span></td>
        <td class="small text-muted" style="max-width: 250px;">${escapeHtml(msg.message)}</td>
        <td class="small font-monospace">${new Date(msg.timestamp).toLocaleDateString()}</td>
        <td>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteAdminMessage('${msg.id}')" title="Delete Message">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `).join('');
  }

  function renderFallbackMessages() {
    const demoMessages = [
      { id: '1', name: 'John Doe', email: 'john@example.com', subject: 'Project Inquiry', message: 'Hello Sanjai, loved your portfolio design!', timestamp: new Date().toISOString() }
    ];
    renderMessages(demoMessages);
  }

  window.deleteAdminMessage = async function (id) {
    try {
      await fetch(`${API_BASE}/contact/messages/${id}`, { method: 'DELETE', credentials: 'include' });
      showNotification("Message deleted", "info");
      loadMessages();
    } catch (err) {
      showNotification("Local message cleared", "info");
      loadMessages();
    }
  };

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
