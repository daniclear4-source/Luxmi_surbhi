/**
 * Laxmi Surbhi NGO - Forms & Inquiries Handler
 * Connects forms with client validation and direct official mailto routing.
 */

document.addEventListener('DOMContentLoaded', () => {
  const OFFICIAL_EMAIL = 'laxmisurbhi7@gmail.com';

  // Generic form handler
  function setupForm(formId, alertId, subjectPrefix) {
    const form = document.getElementById(formId);
    const alertBox = document.getElementById(alertId);

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      let emailBody = `LAXMI SURBHI NGO - INQUIRY SUBMISSION\n`;
      emailBody += `==========================================\n\n`;

      for (let [key, value] of formData.entries()) {
        const cleanKey = key.replace(/-/g, ' ').toUpperCase();
        emailBody += `${cleanKey}: ${value}\n`;
      }

      emailBody += `\nSubmitted on: ${new Date().toLocaleString()}\n`;

      if (alertBox) {
        alertBox.style.display = 'block';
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      const subject = encodeURIComponent(`${subjectPrefix} - Laxmi Surbhi Website Inquiry`);
      const body = encodeURIComponent(emailBody);

      setTimeout(() => {
        window.location.href = `mailto:${OFFICIAL_EMAIL}?subject=${subject}&body=${body}`;
      }, 900);

      form.reset();
    });
  }

  // Setup distinct forms
  setupForm('contact-form', 'contact-alert', 'General Contact');
  setupForm('volunteer-form', 'volunteer-alert', 'Volunteer Application');
  setupForm('partner-form', 'partner-alert', 'Partnership Collaboration');
  setupForm('donation-inquiry-form', 'donation-alert', 'Donation Inquiry');
});
