/* ==========================================================================
   Contact Form Handler & EmailJS Wrapper
   Sanjai K - Portfolio
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");

  if (!contactForm) return;

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Reset previous error state
    formFeedback.className = "mt-3 d-none";
    formFeedback.innerHTML = "";

    const nameInput = document.getElementById("contactName");
    const emailInput = document.getElementById("contactEmail");
    const subjectInput = document.getElementById("contactSubject");
    const messageInput = document.getElementById("contactMessage");
    const submitBtn = document.getElementById("contactSubmitBtn");

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const subject = subjectInput ? subjectInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    // Field Validation
    if (!name || !email || !subject || !message) {
      showFeedback("Please fill out all required fields.", "danger");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFeedback("Please enter a valid email address.", "danger");
      return;
    }

    // Button loading state
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status"></span> Sending...`;

    try {
      // Check if EmailJS is initialized
      if (window.emailjs && window.EMAILJS_PUBLIC_KEY) {
        await window.emailjs.send(
          window.EMAILJS_SERVICE_ID,
          window.EMAILJS_TEMPLATE_ID,
          {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
          }
        );
        showFeedback("Thank you! Your message has been sent successfully.", "success");
        contactForm.reset();
      } else {
        // Fallback: Demo Mode (Form works visually and gives user feedback)
        await new Promise(resolve => setTimeout(resolve, 1200));
        showFeedback(
          `<strong>Demo Mode Active:</strong> Thank you, <strong>${escapeHtml(name)}</strong>! Your message concept was submitted successfully. (Configure EmailJS keys to receive direct emails).`,
          "success"
        );
        contactForm.reset();
      }
    } catch (err) {
      console.error("Contact Form Error:", err);
      showFeedback("Failed to send message. Please try again or reach out via email directly.", "danger");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
    }
  });

  function showFeedback(msg, type) {
    if (!formFeedback) return;
    formFeedback.className = `alert alert-${type} mt-3 d-block glass-card border-${type}`;
    formFeedback.innerHTML = msg;
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m]));
  }
});
