/**
 * Laxmi Surbhi NGO - Main JavaScript
 * Handles accessibility controls, responsive mobile drawer with backdrop overlay, tab systems, gallery filtering & lightboxes.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Accessibility: Font Size Switcher
  const fontButtons = document.querySelectorAll('.font-size-btn');
  const savedFontSize = localStorage.getItem('laxmi_font_size') || 'medium';

  function applyFontSize(size) {
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

  applyFontSize(savedFontSize);

  fontButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      applyFontSize(btn.dataset.size);
    });
  });

  // 2. Accessibility: High Contrast Mode
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

  // 3. Responsive Mobile Navigation Drawer with Backdrop
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  // Create or select backdrop overlay
  let navBackdrop = document.querySelector('.nav-backdrop');
  if (!navBackdrop) {
    navBackdrop = document.createElement('div');
    navBackdrop.className = 'nav-backdrop';
    document.body.appendChild(navBackdrop);
  }

  function toggleMenu(open) {
    const shouldOpen = typeof open === 'boolean' ? open : !navMenu.classList.contains('open');
    if (shouldOpen) {
      navMenu.classList.add('open');
      navBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (mobileToggle) {
        mobileToggle.setAttribute('aria-expanded', 'true');
        mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
      }
    } else {
      navMenu.classList.remove('open');
      navBackdrop.classList.remove('open');
      document.body.style.overflow = '';
      if (mobileToggle) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    }
  }

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => toggleMenu());
    navBackdrop.addEventListener('click', () => toggleMenu(false));

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });
  }

  // 4. Tab Navigation System
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.tab;
      
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // 5. Gallery Filter System
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.dataset.filter;

      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.dataset.category === filterValue) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 6. Gallery Lightbox Modal
  const lightboxModal = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxClose = document.getElementById('lightbox-close');

  if (lightboxModal) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const title = item.querySelector('.gallery-caption')?.textContent || '';
        const category = item.querySelector('.gallery-category')?.textContent || '';
        const desc = item.dataset.description || item.querySelector('.gallery-desc')?.textContent || '';
        const imgSrc = item.querySelector('img')?.src || '';

        if (lightboxImg && imgSrc) {
          lightboxImg.src = imgSrc;
          lightboxImg.alt = title;
        }
        if (lightboxTitle) lightboxTitle.textContent = `${category}: ${title}`;
        if (lightboxDesc) lightboxDesc.textContent = desc;

        lightboxModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightboxModal.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('open')) {
        closeLightbox();
      }
    });
  }
});
