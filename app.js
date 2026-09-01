/*
  Laxmi Surbhi NGO - Senior Care & Support Initiative
  JavaScript Application Logic
*/

document.addEventListener('DOMContentLoaded', () => {
  // 1. Accessibility: Font Size Controls
  const fontButtons = document.querySelectorAll('.font-size-btn');
  const savedFontSize = localStorage.getItem('laxmi_font_size') || 'medium';
  
  function setFontSize(size) {
    document.documentElement.setAttribute('data-font-size', size);
    localStorage.setItem('laxmi_font_size', size);
    fontButtons.forEach(btn => {
      if (btn.dataset.size === size) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  setFontSize(savedFontSize);

  fontButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setFontSize(btn.dataset.size);
    });
  });

  // 2. Accessibility: High Contrast Mode Toggle
  const contrastBtn = document.getElementById('contrast-toggle-btn');
  const savedContrast = localStorage.getItem('laxmi_contrast') === 'true';

  if (savedContrast) {
    document.documentElement.classList.add('high-contrast');
    if (contrastBtn) contrastBtn.classList.add('active');
  }

  if (contrastBtn) {
    contrastBtn.addEventListener('click', () => {
      const isHigh = document.documentElement.classList.toggle('high-contrast');
      contrastBtn.classList.toggle('active', isHigh);
      localStorage.setItem('laxmi_contrast', isHigh);
    });
  }

  // 3. Mobile Navigation Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isExpanded = navLinks.classList.contains('open');
      mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
      mobileMenuBtn.innerHTML = isExpanded 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking navigation link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  // 4. Tab Navigation (Trust vs Ethics vs Commitments)
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePanel = document.getElementById(target);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });

  // 5. Active Navigation Scroll Spy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  });

  // 6. Contact & Inquiry Form Handler
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success-alert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById('sender-name')?.value || '',
        category: document.getElementById('sender-category')?.value || '',
        contact: document.getElementById('sender-contact')?.value || '',
        location: document.getElementById('sender-location')?.value || '',
        message: document.getElementById('sender-message')?.value || '',
      };

      // Show user feedback alert
      if (formSuccess) {
        formSuccess.style.display = 'block';
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Generate mailto link with structured message
      const subject = encodeURIComponent(`Laxmi Surbhi NGO Website Inquiry: ${formData.category}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Category: ${formData.category}\n` +
        `Contact Number / Email: ${formData.contact}\n` +
        `Location / City: ${formData.location}\n\n` +
        `Message:\n${formData.message}\n`
      );

      // Offer direct mail trigger
      setTimeout(() => {
        window.location.href = `mailto:laxmisurbhi7@gmail.com?subject=${subject}&body=${body}`;
      }, 1000);

      contactForm.reset();
    });
  }
});
