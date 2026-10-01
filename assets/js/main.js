/**
 * Azure Bay Residences - Main Application Logic
 * Pure Vanilla JavaScript (No Frameworks, No Build Step)
 */

document.addEventListener('DOMContentLoaded', () => {
  initBrandValues();
  initGlobalImageFallbacks();
  injectGlobalModals();
  initNavbar();
  initCurrencySwitcher();
  initFavoritesSystem();
  initComparisonSystem();
  initViewingCalendarModal();
  initBrochureDownloadModal();
  initFloatingWhatsApp();
  initBackToTop();
  initScrollReveal();
  initStatsCounter();
  initFAQAccordion();
  initPageSpecificLogic();
});

function initGlobalImageFallbacks() {
  const fallbackImg = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";
  window.addEventListener('error', (e) => {
    if (e.target && e.target.tagName === 'IMG' && !e.target.getAttribute('data-fallback-applied')) {
      e.target.setAttribute('data-fallback-applied', 'true');
      e.target.src = fallbackImg;
    }
  }, true);
}

/* ==========================================================================
   1. BRAND DATA POPULATION
   ========================================================================== */
function initBrandValues() {
  if (typeof BRAND_CONFIG === 'undefined') return;

  // Replace text contents
  document.querySelectorAll('[data-brand="name"]').forEach(el => el.textContent = BRAND_CONFIG.name);
  document.querySelectorAll('[data-brand="shortName"]').forEach(el => el.textContent = BRAND_CONFIG.shortName);
  document.querySelectorAll('[data-brand="phone"]').forEach(el => el.textContent = BRAND_CONFIG.phone);
  document.querySelectorAll('[data-brand="email"]').forEach(el => el.textContent = BRAND_CONFIG.email);
  document.querySelectorAll('[data-brand="conciergeEmail"]').forEach(el => el.textContent = BRAND_CONFIG.conciergeEmail);
  document.querySelectorAll('[data-brand="address"]').forEach(el => el.textContent = BRAND_CONFIG.address);
  document.querySelectorAll('[data-brand="officeHours"]').forEach(el => el.textContent = BRAND_CONFIG.officeHours);
  document.querySelectorAll('[data-brand="license"]').forEach(el => el.textContent = BRAND_CONFIG.license);
  document.querySelectorAll('[data-brand="tagline"]').forEach(el => el.textContent = BRAND_CONFIG.tagline);
  document.querySelectorAll('[data-brand="year"]').forEach(el => el.textContent = new Date().getFullYear());

  // Replace links
  document.querySelectorAll('[data-brand="phone-link"]').forEach(el => {
    el.setAttribute('href', `tel:${BRAND_CONFIG.phoneRaw}`);
  });
  document.querySelectorAll('[data-brand="email-link"]').forEach(el => {
    el.setAttribute('href', `mailto:${BRAND_CONFIG.email}`);
  });
  document.querySelectorAll('[data-brand="whatsapp-link"]').forEach(el => {
    el.setAttribute('href', `https://wa.me/${BRAND_CONFIG.whatsappRaw}?text=${encodeURIComponent(BRAND_CONFIG.whatsappDefaultMessage)}`);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });
}

/* ==========================================================================
   2. NAVBAR & HEADER LOGIC
   ========================================================================== */
function initNavbar() {
  const header = document.getElementById('main-header');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  // Sticky navbar background transformation
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('bg-[#0F2A43]', 'shadow-xl', 'py-3.5');
      header.classList.remove('bg-transparent', 'py-5');
    } else {
      // If we are on a page with transparent header (Home)
      if (header.dataset.transparent === "true") {
        header.classList.remove('bg-[#0F2A43]', 'shadow-xl', 'py-3.5');
        header.classList.add('bg-transparent', 'py-5');
      } else {
        header.classList.add('bg-[#0F2A43]', 'py-3.5');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle with smooth animated transitions
  if (mobileMenuBtn && mobileNav) {
    let isTransitioning = false;

    const openMobileNav = () => {
      if (isTransitioning) return;
      isTransitioning = true;
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
      mobileNav.classList.remove('hidden');
      mobileNav.classList.add('mobile-nav-closed');
      // Force reflow for CSS transition
      void mobileNav.offsetHeight;
      mobileNav.classList.remove('mobile-nav-closed');
      mobileNav.classList.add('mobile-nav-open');
      document.body.classList.add('overflow-hidden');
      setTimeout(() => { isTransitioning = false; }, 320);
    };

    const closeMobileNav = () => {
      if (isTransitioning || mobileNav.classList.contains('hidden')) return;
      isTransitioning = true;
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('mobile-nav-open');
      mobileNav.classList.add('mobile-nav-closed');
      document.body.classList.remove('overflow-hidden');
      setTimeout(() => {
        mobileNav.classList.add('hidden');
        mobileNav.classList.remove('mobile-nav-closed');
        isTransitioning = false;
      }, 300);
    };

    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    // Close when clicking any nav link
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    // Close when clicking outside mobile menu
    document.addEventListener('click', (e) => {
      if (!mobileNav.classList.contains('hidden')) {
        if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
          closeMobileNav();
        }
      }
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileNav.classList.contains('hidden')) {
        closeMobileNav();
      }
    });
  }

  // Active Link Highlighter
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('text-[#C8A96A]', 'font-semibold');
      link.classList.remove('text-white/80');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ==========================================================================
   3. FLOATING WHATSAPP BUTTON
   ========================================================================== */
function initFloatingWhatsApp() {
  if (typeof BRAND_CONFIG === 'undefined') return;
  if (document.querySelector('.whatsapp-floating')) return;

  const floatingBtn = document.createElement('a');
  floatingBtn.className = 'whatsapp-floating';
  floatingBtn.href = `https://wa.me/${BRAND_CONFIG.whatsappRaw}?text=${encodeURIComponent(BRAND_CONFIG.whatsappDefaultMessage)}`;
  floatingBtn.target = '_blank';
  floatingBtn.rel = 'noopener noreferrer';
  floatingBtn.setAttribute('aria-label', 'Chat directly with Azure Bay Concierge on WhatsApp');
  floatingBtn.innerHTML = `
    <span class="ping-badge"></span>
    <svg class="w-7 h-7 fill-current" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  `;
  document.body.appendChild(floatingBtn);
}

/* ==========================================================================
   4. SCROLL REVEAL (IntersectionObserver with Smooth Orchestration)
   ========================================================================= */
function initScrollReveal() {
  // Candidate selectors that give texture and smooth entrance to pages
  const candidateSelectors = [
    '.reveal-on-scroll',
    '.reveal-fade',
    '.reveal-scale',
    'main section .section-eyebrow',
    'main section h2',
    'main section .section-subtitle',
    '.property-card',
    'section#features .grid > div',
    '#why-us .grid > div'
  ];

  const elementsToObserve = new Set();

  candidateSelectors.forEach(sel => {
    try {
      document.querySelectorAll(sel).forEach(el => {
        // Skip elements inside carousels, mobile navigation drawers, or modals
        if (el.closest('#about-carousel-viewport') || el.closest('#mobile-nav') || el.closest('.modal-container') || el.closest('#milestone-stage-card')) {
          return;
        }

        if (!el.classList.contains('reveal-on-scroll') && !el.classList.contains('reveal-fade') && !el.classList.contains('reveal-scale')) {
          el.classList.add('reveal-on-scroll');
        }

        // Add stagger delay for grid items
        if (!el.className.includes('delay-')) {
          const parentGrid = el.closest('.grid');
          if (parentGrid) {
            const siblings = Array.from(parentGrid.children);
            const childIdx = siblings.indexOf(el);
            if (childIdx >= 0) {
              const delayVal = (childIdx % 4) * 100;
              if (delayVal > 0) el.classList.add(`delay-${delayVal}`);
            }
          }
        }

        elementsToObserve.add(el);
      });
    } catch (e) {}
  });

  if (!elementsToObserve.size) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  elementsToObserve.forEach(el => {
    // If element is already in the viewport on page load, reveal immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('revealed');
    } else {
      observer.observe(el);
    }
  });
}

/* ==========================================================================
   4.1 LUXURY FLOATING BACK-TO-TOP BUTTON (Smooth Scroll & Circular Progress)
   ========================================================================= */
function initBackToTop() {
  if (document.getElementById('floating-back-to-top')) return;

  const btn = document.createElement('button');
  btn.id = 'floating-back-to-top';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Scroll back to top');
  btn.title = 'Back to Top';
  btn.className = 'fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#0F2A43]/90 hover:bg-[#0F2A43] text-[#C8A96A] border border-[#C8A96A]/40 shadow-xl backdrop-blur-md flex items-center justify-center transition-all duration-300 opacity-0 pointer-events-none translate-y-4 hover:scale-110 active:scale-95 group cursor-pointer';

  btn.innerHTML = `
    <svg class="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="21" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2.5"></circle>
      <circle id="back-to-top-progress" cx="24" cy="24" r="21" fill="none" stroke="#C8A96A" stroke-width="2.5" stroke-dasharray="131.95" stroke-dashoffset="131.95" class="transition-all duration-150"></circle>
    </svg>
    <svg class="w-4 h-4 stroke-current stroke-2 fill-none group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
    </svg>
  `;

  document.body.appendChild(btn);

  const progressCircle = document.getElementById('back-to-top-progress');
  const circumference = 2 * Math.PI * 21; // ~131.95

  const updateProgress = () => {
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY;

    if (currentScroll > 320) {
      btn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      btn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
    } else {
      btn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      btn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
    }

    if (progressCircle && scrollTotal > 0) {
      const scrollPct = Math.min(Math.max(currentScroll / scrollTotal, 0), 1);
      const offset = circumference - (scrollPct * circumference);
      progressCircle.style.strokeDashoffset = offset;
    }
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   5. STATS ANIMATED COUNTERS
   ========================================================================== */
function initStatsCounter() {
  const statElements = document.querySelectorAll('[data-counter-target]');
  if (!statElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-counter-target'));
        const prefix = el.getAttribute('data-counter-prefix') || '';
        const suffix = el.getAttribute('data-counter-suffix') || '';
        const isDecimal = target % 1 !== 0;
        const duration = 1800; // ms
        const startTime = performance.now();

        const updateNumber = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentVal = isDecimal 
            ? (target * easeProgress).toFixed(1)
            : Math.floor(target * easeProgress);

          el.textContent = `${prefix}${currentVal}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateNumber);
          } else {
            el.textContent = `${prefix}${target}${suffix}`;
          }
        };

        requestAnimationFrame(updateNumber);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   6. FAQ ACCORDION
   ========================================================================== */
function initFAQAccordion() {
  const accordionButtons = document.querySelectorAll('.accordion-trigger');
  accordionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.accordion-icon');

      // Close all others if desired, or allow multi-expand
      accordionButtons.forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          if (otherBtn.nextElementSibling) {
            otherBtn.nextElementSibling.style.maxHeight = null;
          }
          const otherIcon = otherBtn.querySelector('.accordion-icon');
          if (otherIcon) otherIcon.classList.remove('rotate-180');
        }
      });

      // BUG FIX: null-guard content sebelum akses .scrollHeight
      if (!content) return;

      if (!isExpanded) {
        btn.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
        if (icon) icon.classList.add('rotate-180');
      } else {
        btn.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
        if (icon) icon.classList.remove('rotate-180');
      }
    });
  });
}

/* ==========================================================================
   7. PAGE-SPECIFIC INITIALIZATION
   ========================================================================== */
function initPageSpecificLogic() {
  const path = window.location.pathname.split('/').pop();

  if (path === '' || path === 'index.html') {
    initHomePage();
  } else if (path === 'properties.html') {
    initPropertiesPage();
  } else if (path === 'property.html') {
    initPropertyDetailPage();
  } else if (path === 'contact.html') {
    initContactPage();
  } else if (path === 'about.html' || path.includes('about')) {
    initAboutPage();
  }

  // Also initialize about page if about-specific containers exist in DOM
  if (document.getElementById('milestone-stage-card') || document.getElementById('about-carousel-viewport')) {
    initAboutPage();
  }
}

/* --------------------------------------------------------------------------
   HOME PAGE (index.html)
   -------------------------------------------------------------------------- */
function initHomePage() {
  // Render Featured Properties (6 cards)
  const container = document.getElementById('featured-properties-grid');
  if (container && typeof PROPERTIES !== 'undefined') {
    const featured = PROPERTIES.filter(p => p.featured).slice(0, 6);
    container.innerHTML = featured.map(p => createPropertyCardHTML(p)).join('');
  }

  // Quick Search Bar Handler
  const quickSearchForm = document.getElementById('quick-search-form');
  if (quickSearchForm) {
    quickSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const location = quickSearchForm.elements['location'] ? quickSearchForm.elements['location'].value : '';
      const type = quickSearchForm.elements['type'] ? quickSearchForm.elements['type'].value : '';
      const priceRange = quickSearchForm.elements['price'] ? quickSearchForm.elements['price'].value : '';
      const bedrooms = quickSearchForm.elements['bedrooms'] ? quickSearchForm.elements['bedrooms'].value : '';

      const params = new URLSearchParams();
      if (location) params.set('location', location);
      if (type) params.set('type', type);
      if (priceRange) params.set('priceRange', priceRange);
      if (bedrooms) params.set('bedrooms', bedrooms);

      window.location.href = `properties.html?${params.toString()}`;
    });
  }

  // Initialize Investor Continuous Marquee Carousel
  initInvestorContinuousMarquee();

  // Initialize Investment & Yield Calculator
  initInvestmentCalculator();

  // Initialize Owner Management Lead Form (Targeted Owner Landing Page Module)
  initOwnerLeadForm();

  // Initialize Interactive Resort Masterplan
  initMasterplanSection();
}

/* --------------------------------------------------------------------------
   OWNER & ASSET MANAGEMENT LEAD CAPTURE FORM
   -------------------------------------------------------------------------- */
function initOwnerLeadForm() {
  const form = document.getElementById('owner-lead-form');
  const container = document.getElementById('owner-lead-form-container');
  if (!form || !container) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('owner-lead-name')?.value.trim();
    const email = document.getElementById('owner-lead-email')?.value.trim();
    const phone = document.getElementById('owner-lead-phone')?.value.trim();
    const assetType = document.getElementById('owner-lead-asset-type')?.value;
    const goal = document.getElementById('owner-lead-goal')?.value;
    const notes = document.getElementById('owner-lead-notes')?.value.trim();

    if (!name || !email || !phone) return;

    const leadData = {
      name,
      email,
      phone,
      property: assetType,
      type: assetType.includes('Villa') ? 'Villa' : (assetType.includes('Penthouse') ? 'Apartment' : 'Estate'),
      budget: 'Asset Appraisal & Yields',
      goal,
      source: 'Owner Lead Landing Page',
      status: 'New Lead',
      notes: notes || `Requested owner prospectus & yield pro-forma. Objective: ${goal}`
    };

    if (window.AzureDB && typeof window.AzureDB.addLead === 'function') {
      window.AzureDB.addLead(leadData);
    }

    // Replace form with luxurious confirmation card
    container.innerHTML = `
      <div class="py-8 px-4 text-center animate-fadeIn">
        <div class="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
        </div>
        <h4 class="font-serif text-2xl font-bold text-[#0F2A43] mb-2">Inquiry Confirmed, ${name}</h4>
        <p class="text-xs text-[#64748B] leading-relaxed max-w-sm mx-auto mb-6">
          Your confidential asset yield prospectus and management dossier has been generated. Our Senior Asset Managing Director will review your specifications and reach out within 15 minutes.
        </p>
        <div class="bg-[#F7F5F0] rounded-xl p-4 border border-[#E6E2DA] text-left text-xs space-y-2 mb-6 max-w-sm mx-auto">
          <div class="flex justify-between"><span class="text-[#64748B]">Target Property:</span><strong class="text-[#0F2A43]">${assetType}</strong></div>
          <div class="flex justify-between"><span class="text-[#64748B]">Primary Strategy:</span><strong class="text-[#0F2A43]">${goal}</strong></div>
          <div class="flex justify-between"><span class="text-[#64748B]">Direct Contact:</span><strong class="text-[#0F2A43]">${phone}</strong></div>
        </div>
        <a href="https://wa.me/${typeof BRAND_CONFIG !== 'undefined' ? BRAND_CONFIG.whatsappRaw : '18004289988'}?text=${encodeURIComponent(`Hello Azure Bay Residences, I just requested an asset management appraisal for my ${assetType}. (Name: ${name})`)}" target="_blank" class="btn-gold !py-3 !px-6 text-xs uppercase tracking-wider font-bold inline-flex items-center gap-2 shadow-md">
          <span>Connect via WhatsApp Concierge</span>
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
        </a>
      </div>
    `;
  });
}

/* --------------------------------------------------------------------------
   INVESTOR TESTIMONIALS CONTINUOUS MARQUEE CAROUSEL
   -------------------------------------------------------------------------- */
function initInvestorContinuousMarquee() {
  const track = document.getElementById('investor-marquee-track');
  if (!track || typeof INVESTOR_TESTIMONIALS === 'undefined') return;

  function generateCardHTML(item, isDuplicate = false) {
    return `
      <div class="investor-card-box" ${isDuplicate ? 'aria-hidden="true"' : ''}>
        <!-- Watermark Quote Mark -->
        <div class="absolute top-3 right-5 text-[#C8A96A]/15 font-serif text-7xl select-none pointer-events-none leading-none">“</div>

        <div class="relative z-10">
          <div class="flex items-center justify-between gap-2 mb-4">
            <div class="flex items-center gap-1.5 text-xs font-semibold text-[#0F2A43] bg-[#F5EEDB] px-3 py-1 rounded-full border border-[#C8A96A]/30">
              <span class="text-sm">${item.flag || '🌐'}</span>
              <span>${item.country}</span>
            </div>
            <span class="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              ${item.metric}
            </span>
          </div>

          <div class="flex items-center gap-2 text-[#C8A96A] text-sm mb-3">
            <span class="tracking-widest text-[#C8A96A]">★★★★★</span>
            <span class="text-[11px] text-[#0F2A43] font-semibold bg-[#F7F5F0] px-2 py-0.5 rounded border border-[#E6E2DA]">${item.tag}</span>
          </div>

          <blockquote class="font-serif italic text-sm sm:text-[15px] text-[#1F2933] leading-relaxed mb-6 font-light">
            "${item.quote}"
          </blockquote>
        </div>

        <div class="pt-4 border-t border-[#E6E2DA] flex items-center justify-between gap-3 relative z-10">
          <div class="flex items-center gap-3 min-w-0">
            <div class="relative shrink-0">
              <img src="${item.avatar}" alt="${item.name}" class="w-12 h-12 rounded-full object-cover border-2 border-[#C8A96A]" loading="lazy" />
              <div class="w-4 h-4 rounded-full bg-[#0F2A43] text-[#C8A96A] border border-white text-[9px] font-bold flex items-center justify-center absolute -bottom-0.5 -right-0.5" title="Verified Homeowner">✓</div>
            </div>
            <div class="min-w-0">
              <h4 class="font-serif font-bold text-sm text-[#0F2A43] truncate">${item.name}</h4>
              <p class="text-[11px] text-[#64748B] truncate">${item.title}</p>
              <span class="inline-block text-[11px] text-[#C8A96A] font-semibold truncate mt-0.5">${item.property}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Duplicate for seamless 100% infinite continuous loop
  const set1 = INVESTOR_TESTIMONIALS.map(item => generateCardHTML(item, false)).join('');
  const set2 = INVESTOR_TESTIMONIALS.map(item => generateCardHTML(item, true)).join('');
  track.innerHTML = set1 + set2;

  // Speed controls
  const speedButtons = document.querySelectorAll('.marquee-speed-btn');
  speedButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      speedButtons.forEach(b => {
        b.className = "marquee-speed-btn px-2.5 py-1 rounded-md font-semibold text-[#64748B] hover:text-[#0F2A43] transition-all text-[11px]";
      });
      btn.className = "marquee-speed-btn px-2.5 py-1 rounded-md font-semibold bg-[#0F2A43] text-white transition-all text-[11px]";

      const speed = btn.getAttribute('data-speed');
      track.classList.remove('is-slow', 'is-fast');
      if (speed === 'slow') {
        track.classList.add('is-slow');
      } else if (speed === 'fast') {
        track.classList.add('is-fast');
      }
    });
  });

  // Pause / Resume Toggle
  const toggleBtn = document.getElementById('marquee-toggle-pause');
  const pauseIcon = document.getElementById('marquee-pause-icon');
  const playIcon = document.getElementById('marquee-play-icon');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isPaused = track.classList.toggle('is-paused');
      if (isPaused) {
        if (pauseIcon) pauseIcon.classList.add('hidden');
        if (playIcon) playIcon.classList.remove('hidden');
      } else {
        if (pauseIcon) pauseIcon.classList.remove('hidden');
        if (playIcon) playIcon.classList.add('hidden');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   INTERACTIVE INVESTMENT & YIELD CALCULATOR
   -------------------------------------------------------------------------- */
function initInvestmentCalculator() {
  const priceInput = document.getElementById('calc-price');
  const adrInput = document.getElementById('calc-adr');
  const occInput = document.getElementById('calc-occ');

  const priceDisplay = document.getElementById('calc-price-display');
  const adrDisplay = document.getElementById('calc-adr-display');
  const occDisplay = document.getElementById('calc-occ-display');

  const grossDisplay = document.getElementById('calc-gross-revenue');
  const yieldDisplay = document.getElementById('calc-net-yield');
  const netProfitDisplay = document.getElementById('calc-net-profit');
  const fiveYearDisplay = document.getElementById('calc-5yr-value');

  if (!priceInput || !adrInput || !occInput) return;

  function calculate() {
    const price = parseFloat(priceInput.value) || 2450000;
    const adr = parseFloat(adrInput.value) || 1200;
    const occ = parseFloat(occInput.value) || 65;

    const nightsRented = Math.round(365 * (occ / 100));
    const grossRevenue = Math.round(nightsRented * adr);
    const netProfit = Math.round(grossRevenue * 0.80); // 20% property management & reserve
    const netYield = ((netProfit / price) * 100).toFixed(1);
    const fiveYearAppreciation = Math.round(price * Math.pow(1.082, 5)); // 8.2% CAGR coastal benchmark

    if (priceDisplay) priceDisplay.textContent = formatUSD(price);
    if (adrDisplay) adrDisplay.textContent = `${formatUSD(adr)} / night`;
    if (occDisplay) occDisplay.textContent = `${occ}% (${nightsRented} nights)`;

    if (grossDisplay) grossDisplay.textContent = formatUSD(grossRevenue);
    if (yieldDisplay) yieldDisplay.textContent = `${netYield}%`;
    if (netProfitDisplay) netProfitDisplay.textContent = formatUSD(netProfit);
    if (fiveYearDisplay) fiveYearDisplay.textContent = formatUSD(fiveYearAppreciation);
  }

  [priceInput, adrInput, occInput].forEach(slider => {
    slider.addEventListener('input', calculate);
  });

  calculate();
}

/* --------------------------------------------------------------------------
   PROPERTIES LISTING PAGE (properties.html) - DYNAMIC FILTERING ENGINE
   -------------------------------------------------------------------------- */
function initPropertiesPage() {
  function getSourceProperties() {
    if (window.AzureDB && typeof window.AzureDB.getProperties === 'function') {
      return window.AzureDB.getProperties();
    }
    return typeof PROPERTIES !== 'undefined' ? PROPERTIES : [];
  }

  if (getSourceProperties().length === 0 && typeof PROPERTIES === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const grid = document.getElementById('properties-grid');
  const countDisplay = document.getElementById('results-count');
  const emptyState = document.getElementById('empty-state');
  const activeChipsContainer = document.getElementById('active-filters-chips');
  const clearAllBtn = document.getElementById('clear-all-filters-btn');
  const sortSelect = document.getElementById('sort-select');
  const loadMoreBtn = document.getElementById('load-more-btn');

  // Filter Inputs
  const keywordInput = document.getElementById('filter-keyword');
  const locationSelect = document.getElementById('filter-location');
  const typeSelect = document.getElementById('filter-type');
  const minPriceInput = document.getElementById('filter-min-price');
  const maxPriceInput = document.getElementById('filter-max-price');
  const bedsSelect = document.getElementById('filter-bedrooms');
  const bathsSelect = document.getElementById('filter-bathrooms');
  const statusSelect = document.getElementById('filter-status');
  const pricePresetBtns = document.querySelectorAll('.price-preset-btn');

  // Mobile Drawer Elements
  const mobileFiltersToggle = document.getElementById('mobile-filters-toggle');
  const mobileFilterBadge = document.getElementById('mobile-filter-badge');
  const filtersSidebar = document.getElementById('filters-sidebar');
  const mobileSidebarClose = document.getElementById('mobile-sidebar-close');
  const mobileSidebarApply = document.getElementById('mobile-sidebar-apply');
  const sidebarOverlay = document.getElementById('sidebar-drawer-overlay');

  // Read and populate from URL query params on load
  if (keywordInput && (urlParams.get('q') || urlParams.get('keyword'))) {
    keywordInput.value = urlParams.get('q') || urlParams.get('keyword');
  }
  if (locationSelect && urlParams.get('location')) {
    locationSelect.value = urlParams.get('location');
  }
  if (typeSelect && urlParams.get('type')) {
    typeSelect.value = urlParams.get('type');
  }
  if (bedsSelect && urlParams.get('bedrooms')) {
    bedsSelect.value = urlParams.get('bedrooms');
  }
  if (bathsSelect && urlParams.get('bathrooms')) {
    bathsSelect.value = urlParams.get('bathrooms');
  }
  if (statusSelect && urlParams.get('status')) {
    statusSelect.value = urlParams.get('status');
  }
  if (minPriceInput && urlParams.get('minPrice')) {
    minPriceInput.value = urlParams.get('minPrice');
  }
  if (maxPriceInput && urlParams.get('maxPrice')) {
    maxPriceInput.value = urlParams.get('maxPrice');
  }

  // Pre-configured price range from quick search
  if (urlParams.get('priceRange')) {
    const range = urlParams.get('priceRange');
    if (range === 'under-500k' || range === 'under-1m') {
      if (maxPriceInput) maxPriceInput.value = '1000000';
    } else if (range === '500k-1m') {
      if (minPriceInput) minPriceInput.value = '500000';
      if (maxPriceInput) maxPriceInput.value = '1000000';
    } else if (range === '1m-2m') {
      if (minPriceInput) minPriceInput.value = '1000000';
      if (maxPriceInput) maxPriceInput.value = '2000000';
    } else if (range === '2m-3m') {
      if (minPriceInput) minPriceInput.value = '2000000';
      if (maxPriceInput) maxPriceInput.value = '3000000';
    } else if (range === 'above-2m' || range === 'above-3m') {
      if (minPriceInput) minPriceInput.value = '3000000';
    }
  }

  let itemsToShow = 9;
  let currentViewMode = 'grid';

  const viewModeGridBtn = document.getElementById('view-mode-grid');
  const viewModeListBtn = document.getElementById('view-mode-list');
  const quickCategoryPills = document.querySelectorAll('.quick-category-pill');

  function getActiveFilters() {
    return {
      keyword: keywordInput ? keywordInput.value.trim().toLowerCase() : '',
      location: locationSelect ? locationSelect.value : '',
      type: typeSelect ? typeSelect.value : '',
      minPrice: minPriceInput && minPriceInput.value ? Number(minPriceInput.value) : null,
      maxPrice: maxPriceInput && maxPriceInput.value ? Number(maxPriceInput.value) : null,
      bedrooms: bedsSelect ? bedsSelect.value : '',
      bathrooms: bathsSelect ? bathsSelect.value : '',
      status: statusSelect ? statusSelect.value : '',
      sort: sortSelect ? sortSelect.value : 'featured'
    };
  }

  // Synchronize state to URL without page reload
  function syncURL(filters) {
    const params = new URLSearchParams();
    if (filters.keyword) params.set('q', filters.keyword);
    if (filters.location) params.set('location', filters.location);
    if (filters.type) params.set('type', filters.type);
    if (filters.minPrice !== null && !isNaN(filters.minPrice)) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice !== null && !isNaN(filters.maxPrice)) params.set('maxPrice', filters.maxPrice);
    if (filters.bedrooms && filters.bedrooms !== 'any') params.set('bedrooms', filters.bedrooms);
    if (filters.bathrooms && filters.bathrooms !== 'any') params.set('bathrooms', filters.bathrooms);
    if (filters.status) params.set('status', filters.status);
    if (filters.sort && filters.sort !== 'featured') params.set('sort', filters.sort);

    const newQuery = params.toString() ? `?${params.toString()}` : window.location.pathname;
    window.history.replaceState({}, '', newQuery);
  }

  function syncPillButtons(selectedType) {
    quickCategoryPills.forEach(pill => {
      const pType = pill.getAttribute('data-quick-type');
      if (pType === selectedType || (!pType && !selectedType)) {
        pill.className = "quick-category-pill active px-3.5 py-1.5 rounded-full font-semibold bg-[#0F2A43] text-white transition-all shrink-0 shadow-xs";
      } else {
        pill.className = "quick-category-pill px-3.5 py-1.5 rounded-full font-semibold bg-white hover:bg-[#F5EEDB] text-[#0F2A43] border border-[#E6E2DA] transition-all shrink-0";
      }
    });
  }

  function render() {
    const allProps = getSourceProperties();
    const filters = getActiveFilters();
    syncURL(filters);
    syncPillButtons(filters.type);

    let filtered = allProps.filter(item => {
      // Keyword search
      if (filters.keyword) {
        const query = filters.keyword;
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesLoc = item.location.toLowerCase().includes(query);
        const matchesType = item.type.toLowerCase().includes(query);
        const matchesTagline = item.tagline ? item.tagline.toLowerCase().includes(query) : false;
        const matchesDesc = item.description ? item.description.toLowerCase().includes(query) : false;
        const matchesFeatures = item.features ? item.features.some(f => f.toLowerCase().includes(query)) : false;
        if (!matchesName && !matchesLoc && !matchesType && !matchesTagline && !matchesDesc && !matchesFeatures) {
          return false;
        }
      }

      // Location match
      if (filters.location && item.location !== filters.location) return false;

      // Type match
      if (filters.type && item.type !== filters.type) return false;

      // Status match
      if (filters.status && item.status !== filters.status) return false;

      // Price range
      if (filters.minPrice !== null && item.price < filters.minPrice) return false;
      if (filters.maxPrice !== null && item.price > filters.maxPrice) return false;

      // Bedrooms
      if (filters.bedrooms && filters.bedrooms !== 'any') {
        const minBeds = parseInt(filters.bedrooms, 10);
        if (item.bedrooms < minBeds) return false;
      }

      // Bathrooms
      if (filters.bathrooms && filters.bathrooms !== 'any') {
        const minBaths = parseInt(filters.bathrooms, 10);
        if (item.bathrooms < minBaths) return false;
      }

      return true;
    });

    // Sorting
    if (filters.sort === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sort === 'newest') {
      filtered.sort((a, b) => b.yearBuilt - a.yearBuilt);
    } else {
      // Featured first
      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    // Results count & header stats
    if (countDisplay) {
      countDisplay.innerHTML = `Showing <strong class="text-[#0F2A43] font-bold">${filtered.length}</strong> of <strong class="text-[#0F2A43] font-bold">${allProps.length}</strong> residences`;
    }

    // Update top header badges dynamically
    const headerCountBadge = document.querySelector('[data-portfolio-count]');
    if (headerCountBadge) {
      headerCountBadge.textContent = `${allProps.length}+ Master Residences`;
    }
    const allPill = document.querySelector('[data-quick-type=""]');
    if (allPill) {
      allPill.textContent = `All Residences (${allProps.length})`;
    }

    // Empty state
    if (filtered.length === 0) {
      if (grid) grid.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
      if (loadMoreBtn) loadMoreBtn.classList.add('hidden');
    } else {
      if (emptyState) emptyState.classList.add('hidden');
      const visibleItems = filtered.slice(0, itemsToShow);
      if (grid) {
        if (currentViewMode === 'list') {
          grid.className = "flex flex-col gap-6 animate-fadeIn";
          grid.innerHTML = visibleItems.map(p => createPropertyListCardHTML(p)).join('');
        } else {
          grid.className = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fadeIn";
          grid.innerHTML = visibleItems.map(p => createPropertyCardHTML(p)).join('');
        }
      }

      if (loadMoreBtn) {
        if (visibleItems.length < filtered.length) {
          loadMoreBtn.classList.remove('hidden');
        } else {
          loadMoreBtn.classList.add('hidden');
        }
      }
    }

    renderActiveChips(filters);
    updateMobileFilterBadge(filters);
  }

  function renderActiveChips(filters) {
    if (!activeChipsContainer) return;
    const chips = [];

    if (filters.keyword) chips.push({ key: 'keyword', label: `Search: "${filters.keyword}"` });
    if (filters.location) chips.push({ key: 'location', label: `Location: ${filters.location}` });
    if (filters.type) chips.push({ key: 'type', label: `Type: ${filters.type}` });
    if (filters.status) chips.push({ key: 'status', label: `Status: ${filters.status}` });
    if (filters.minPrice) chips.push({ key: 'minPrice', label: `Min: ${typeof formatCurrency === 'function' ? formatCurrency(filters.minPrice) : formatUSD(filters.minPrice)}` });
    if (filters.maxPrice) chips.push({ key: 'maxPrice', label: `Max: ${typeof formatCurrency === 'function' ? formatCurrency(filters.maxPrice) : formatUSD(filters.maxPrice)}` });
    if (filters.bedrooms && filters.bedrooms !== 'any') chips.push({ key: 'bedrooms', label: `${filters.bedrooms}+ Beds` });
    if (filters.bathrooms && filters.bathrooms !== 'any') chips.push({ key: 'bathrooms', label: `${filters.bathrooms}+ Baths` });

    if (chips.length > 0) {
      activeChipsContainer.innerHTML = `
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-xs font-semibold text-[#64748B] mr-1">Active filters:</span>
          ${chips.map(chip => `
            <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E6E2DA] rounded-full text-xs font-medium text-[#0F2A43] shadow-sm hover:border-[#C8A96A] transition-colors">
              <span>${chip.label}</span>
              <button type="button" data-chip-key="${chip.key}" class="w-4 h-4 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors ml-1 inline-flex items-center justify-center font-bold text-xs" aria-label="Remove filter ${chip.label}">
                &times;
              </button>
            </span>
          `).join('')}
          <button type="button" id="chips-clear-all-btn" class="text-xs text-[#C8A96A] hover:underline font-semibold ml-2">
            Clear all
          </button>
        </div>
      `;
      activeChipsContainer.classList.remove('hidden');
      if (clearAllBtn) clearAllBtn.classList.remove('hidden');

      // Individual chip delete listeners
      activeChipsContainer.querySelectorAll('[data-chip-key]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const key = e.currentTarget.getAttribute('data-chip-key');
          if (key === 'keyword' && keywordInput) keywordInput.value = '';
          if (key === 'location' && locationSelect) locationSelect.value = '';
          if (key === 'type' && typeSelect) typeSelect.value = '';
          if (key === 'status' && statusSelect) statusSelect.value = '';
          if (key === 'minPrice' && minPriceInput) {
            minPriceInput.value = '';
            pricePresetBtns.forEach(b => b.classList.remove('bg-[#F5EEDB]', 'text-[#0F2A43]', 'border-[#C8A96A]'));
          }
          if (key === 'maxPrice' && maxPriceInput) {
            maxPriceInput.value = '';
            pricePresetBtns.forEach(b => b.classList.remove('bg-[#F5EEDB]', 'text-[#0F2A43]', 'border-[#C8A96A]'));
          }
          if (key === 'bedrooms' && bedsSelect) bedsSelect.value = '';
          if (key === 'bathrooms' && bathsSelect) bathsSelect.value = '';
          itemsToShow = 9;
          render();
        });
      });

      // Clear all inside chips bar
      const chipsClearAll = document.getElementById('chips-clear-all-btn');
      if (chipsClearAll) {
        chipsClearAll.addEventListener('click', clearAll);
      }
    } else {
      activeChipsContainer.innerHTML = '';
      activeChipsContainer.classList.add('hidden');
      if (clearAllBtn) clearAllBtn.classList.add('hidden');
    }
  }

  function updateMobileFilterBadge(filters) {
    if (!mobileFilterBadge) return;
    let count = 0;
    if (filters.keyword) count++;
    if (filters.location) count++;
    if (filters.type) count++;
    if (filters.status) count++;
    if (filters.minPrice) count++;
    if (filters.maxPrice) count++;
    if (filters.bedrooms && filters.bedrooms !== 'any') count++;
    if (filters.bathrooms && filters.bathrooms !== 'any') count++;

    if (count > 0) {
      mobileFilterBadge.textContent = count;
      mobileFilterBadge.classList.remove('hidden');
      if (mobileFiltersToggle) {
        mobileFiltersToggle.classList.add('border-[#C8A96A]', 'text-[#C8A96A]');
      }
    } else {
      mobileFilterBadge.classList.add('hidden');
      if (mobileFiltersToggle) {
        mobileFiltersToggle.classList.remove('border-[#C8A96A]', 'text-[#C8A96A]');
      }
    }
  }

  function clearAll() {
    if (keywordInput) keywordInput.value = '';
    if (locationSelect) locationSelect.value = '';
    if (typeSelect) typeSelect.value = '';
    if (minPriceInput) minPriceInput.value = '';
    if (maxPriceInput) maxPriceInput.value = '';
    if (bedsSelect) bedsSelect.value = '';
    if (bathsSelect) bathsSelect.value = '';
    if (statusSelect) statusSelect.value = '';
    if (sortSelect) sortSelect.value = 'featured';
    pricePresetBtns.forEach(btn => btn.classList.remove('bg-[#F5EEDB]', 'text-[#0F2A43]', 'border-[#C8A96A]'));
    itemsToShow = 9;
    render();
  }

  // Quick Price Preset Buttons
  pricePresetBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const preset = e.currentTarget.getAttribute('data-price-preset');
      pricePresetBtns.forEach(b => b.classList.remove('bg-[#F5EEDB]', 'text-[#0F2A43]', 'border-[#C8A96A]'));
      e.currentTarget.classList.add('bg-[#F5EEDB]', 'text-[#0F2A43]', 'border-[#C8A96A]');

      if (preset === 'under-1m') {
        if (minPriceInput) minPriceInput.value = '';
        if (maxPriceInput) maxPriceInput.value = '1000000';
      } else if (preset === '1m-2m') {
        if (minPriceInput) minPriceInput.value = '1000000';
        if (maxPriceInput) maxPriceInput.value = '2000000';
      } else if (preset === '2m-3m') {
        if (minPriceInput) minPriceInput.value = '2000000';
        if (maxPriceInput) maxPriceInput.value = '3000000';
      } else if (preset === 'above-3m') {
        if (minPriceInput) minPriceInput.value = '3000000';
        if (maxPriceInput) maxPriceInput.value = '';
      }
      itemsToShow = 9;
      render();
    });
  });

  // Manual Price Input clearing active presets
  [minPriceInput, maxPriceInput].forEach(inp => {
    if (inp) {
      inp.addEventListener('input', () => {
        pricePresetBtns.forEach(b => b.classList.remove('bg-[#F5EEDB]', 'text-[#0F2A43]', 'border-[#C8A96A]'));
      });
    }
  });

  // Event Listeners for filter inputs
  const allInputs = [keywordInput, locationSelect, typeSelect, minPriceInput, maxPriceInput, bedsSelect, bathsSelect, statusSelect, sortSelect];
  allInputs.forEach(input => {
    if (input) {
      input.addEventListener('change', () => {
        itemsToShow = 9;
        render();
      });
      if (input.tagName === 'INPUT') {
        input.addEventListener('input', () => {
          itemsToShow = 9;
          render();
        });
      }
    }
  });

  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', clearAll);
  }
  const emptyStateResetBtn = document.getElementById('empty-state-reset-btn');
  if (emptyStateResetBtn) {
    emptyStateResetBtn.addEventListener('click', clearAll);
  }

  // View Mode Switcher Listeners
  if (viewModeGridBtn && viewModeListBtn) {
    viewModeGridBtn.addEventListener('click', () => {
      currentViewMode = 'grid';
      viewModeGridBtn.className = "p-1.5 rounded text-[#0F2A43] bg-white shadow-xs transition-colors";
      viewModeListBtn.className = "p-1.5 rounded text-[#64748B] hover:text-[#0F2A43] transition-colors";
      render();
    });

    viewModeListBtn.addEventListener('click', () => {
      currentViewMode = 'list';
      viewModeListBtn.className = "p-1.5 rounded text-[#0F2A43] bg-white shadow-xs transition-colors";
      viewModeGridBtn.className = "p-1.5 rounded text-[#64748B] hover:text-[#0F2A43] transition-colors";
      render();
    });
  }

  // Quick Category Pills
  quickCategoryPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      const selectedType = e.currentTarget.getAttribute('data-quick-type');
      if (typeSelect) {
        typeSelect.value = selectedType || '';
      }
      itemsToShow = 9;
      render();
    });
  });

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      itemsToShow += 6;
      render();
    });
  }

  // Responsive Mobile Filters Drawer handlers
  function openMobileDrawer() {
    if (filtersSidebar) {
      filtersSidebar.classList.remove('-translate-x-full');
      filtersSidebar.classList.add('drawer-open');
    }
    if (sidebarOverlay) {
      sidebarOverlay.classList.add('active');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    if (filtersSidebar) {
      filtersSidebar.classList.remove('drawer-open', '-translate-x-full', 'translate-x-0');
    }
    if (sidebarOverlay) {
      sidebarOverlay.classList.remove('active');
    }
    document.body.style.overflow = '';
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      closeMobileDrawer();
    }
  });

  if (mobileFiltersToggle) {
    mobileFiltersToggle.addEventListener('click', openMobileDrawer);
  }

  if (mobileSidebarClose) {
    mobileSidebarClose.addEventListener('click', closeMobileDrawer);
  }

  if (mobileSidebarApply) {
    mobileSidebarApply.addEventListener('click', () => {
      render();
      closeMobileDrawer();
      const gridEl = document.getElementById('properties-grid');
      if (gridEl) {
        window.scrollTo({ top: gridEl.offsetTop - 120, behavior: 'smooth' });
      }
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeMobileDrawer);
  }

  // Listen for external updates from Admin CMS (same window or storage event)
  window.addEventListener('azure:properties-updated', () => {
    render();
  });
  window.addEventListener('storage', (e) => {
    if (e.key === 'azure_custom_properties') {
      render();
    }
  });

  // Initial render
  render();
}

/* --------------------------------------------------------------------------
   PROPERTY DETAIL PAGE (property.html?id=...)
   -------------------------------------------------------------------------- */
function initPropertyDetailPage() {
  if (typeof PROPERTIES === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const propertyId = urlParams.get('id') || 'villa-solis';
  const property = PROPERTIES.find(p => p.id === propertyId || p.slug === propertyId);

  const detailContainer = document.getElementById('property-detail-container');
  const notFoundContainer = document.getElementById('property-not-found');

  if (!property) {
    if (detailContainer) detailContainer.classList.add('hidden');
    if (notFoundContainer) notFoundContainer.classList.remove('hidden');
    return;
  }

  if (notFoundContainer) notFoundContainer.classList.add('hidden');
  if (detailContainer) detailContainer.classList.remove('hidden');

  // Update Page Title and Meta
  document.title = `${property.name} | ${BRAND_CONFIG.name}`;

  // Populate Breadcrumb & Headings
  const titleEl = document.getElementById('prop-title');
  const locationEl = document.getElementById('prop-location');
  const priceEl = document.getElementById('prop-price');
  const statusBadge = document.getElementById('prop-status');
  const breadcrumbTitle = document.getElementById('breadcrumb-prop-title');
  const taglineEl = document.getElementById('prop-tagline');

  if (titleEl) titleEl.textContent = property.name;
  if (breadcrumbTitle) breadcrumbTitle.textContent = property.name;
  if (locationEl) locationEl.textContent = property.location;
  if (taglineEl) taglineEl.textContent = property.tagline;
  if (priceEl) {
    priceEl.textContent = formatCurrency(property.price);
    priceEl.setAttribute('data-raw-price', property.price);
  }

  // Detail Page Action Buttons (Wishlist, Compare, Share)
  const detailFavBtn = document.getElementById('prop-detail-fav-btn');
  const detailFavText = document.getElementById('prop-detail-fav-text');
  if (detailFavBtn) {
    detailFavBtn.setAttribute('data-fav-id', property.id);
    if (isFavorited(property.id)) {
      detailFavBtn.classList.add('active');
      if (detailFavText) detailFavText.textContent = 'Saved in Wishlist';
    }
  }

  const detailCompareBtn = document.getElementById('prop-detail-compare-btn');
  if (detailCompareBtn) {
    detailCompareBtn.setAttribute('data-compare-id', property.id);
    detailCompareBtn.classList.add('btn-compare-card');
  }

  const detailShareBtn = document.getElementById('prop-detail-share-btn');
  if (detailShareBtn) {
    detailShareBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const shareUrl = window.location.href;
      const shareText = `Explore ${property.name} (${formatCurrency(property.price)}) at Azure Bay Residences: ${shareUrl}`;
      if (navigator.share) {
        navigator.share({ title: property.name, text: shareText, url: shareUrl }).catch(() => {});
      } else {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
      }
    });
  }

  if (statusBadge) {
    statusBadge.textContent = property.status;
    statusBadge.className = `badge-status ${
      property.status === 'Available' ? 'badge-available' : 
      property.status === 'Reserved' ? 'badge-reserved' : 'badge-sold'
    }`;
  }

  // Specs
  const setSpec = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };
  setSpec('prop-beds', property.bedrooms > 0 ? `${property.bedrooms} Bedrooms` : 'N/A (Land)');
  setSpec('prop-baths', property.bathrooms > 0 ? `${property.bathrooms} Bathrooms` : 'N/A');
  setSpec('prop-land', property.landArea > 0 ? `${property.landArea.toLocaleString()} m² (${Math.round(property.landArea * 10.764).toLocaleString()} sq ft)` : 'Condominium Ground Share');
  setSpec('prop-build', property.buildingArea > 0 ? `${property.buildingArea.toLocaleString()} m² (${Math.round(property.buildingArea * 10.764).toLocaleString()} sq ft)` : 'Zoned Custom Build');
  setSpec('prop-year', property.yearBuilt);
  setSpec('prop-type', property.type);

  // Description — BUG FIX: gunakan textContent (bukan innerHTML) untuk mencegah XSS
  const descEl = document.getElementById('prop-description');
  if (descEl) {
    descEl.innerHTML = '';
    const paragraphs = (property.description || '').split('\n\n');
    paragraphs.forEach(para => {
      const p = document.createElement('p');
      p.className = 'mb-4 text-base text-[#1F2933]/85 leading-relaxed';
      p.textContent = para;
      descEl.appendChild(p);
    });
  }

  // Amenities
  const amenitiesList = document.getElementById('prop-amenities-list');
  if (amenitiesList) {
    amenitiesList.innerHTML = property.amenities.map(amenity => `
      <div class="flex items-center gap-3 p-3.5 bg-white border border-[#E6E2DA] rounded-lg shadow-sm">
        <div class="w-8 h-8 rounded-full bg-[#F5EEDB] text-[#C8A96A] flex items-center justify-center shrink-0">
          <svg class="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span class="text-sm font-medium text-[#0F2A43]">${amenity}</span>
      </div>
    `).join('');
  }

  // Floor Plan
  const floorPlanImg = document.getElementById('prop-floorplan-img');
  if (floorPlanImg && property.floorPlan) {
    floorPlanImg.src = property.floorPlan;
    floorPlanImg.alt = `Floor Plan Blueprint for ${property.name}`;
  }

  // Interactive Gallery Setup
  setupGallery(property.images, property.name);

  // Sticky Inquiry Card
  const formPropInput = document.getElementById('inquiry-property-name');
  if (formPropInput) formPropInput.value = property.name;

  const inquiryMsgInput = document.getElementById('inquiry-message');
  if (inquiryMsgInput) {
    inquiryMsgInput.value = `Hello, I would like to receive the investment prospectus and arrange a private viewing for ${property.name} (Ref: ${property.id.toUpperCase()}).`;
  }

  const propWhatsAppBtn = document.getElementById('prop-whatsapp-btn');
  if (propWhatsAppBtn) {
    const waText = `Hello Azure Bay Residences, I am interested in inquiring about ${property.name} (${formatUSD(property.price)}). Could you please share the full investment brochure and private viewing calendar?`;
    propWhatsAppBtn.href = `https://wa.me/${BRAND_CONFIG.whatsappRaw}?text=${encodeURIComponent(waText)}`;
  }

  // Similar Properties
  const similarContainer = document.getElementById('similar-properties-grid');
  if (similarContainer) {
    const similar = PROPERTIES
      .filter(p => p.id !== property.id && (p.location === property.location || p.type === property.type))
      .slice(0, 3);
    
    // Fallback if not enough matching
    if (similar.length < 3) {
      PROPERTIES.filter(p => p.id !== property.id && !similar.includes(p))
        .slice(0, 3 - similar.length)
        .forEach(p => similar.push(p));
    }

    similarContainer.innerHTML = similar.map(p => createPropertyCardHTML(p)).join('');
  }

  // Inquiry Form Submission Handler
  const inquiryForm = document.getElementById('property-inquiry-form');
  const inquirySuccess = document.getElementById('inquiry-form-success');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = inquiryForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-[#0F2A43]" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sending Inquiry...
      `;

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        inquiryForm.classList.add('hidden');
        if (inquirySuccess) inquirySuccess.classList.remove('hidden');
      }, 700);
    });
  }

  // BUG FIX: init360TourViewer tidak pernah dipanggil — fitur virtual tour tidak aktif
  init360TourViewer(property);

  // Inject Structured Data (JSON-LD)
  injectPropertyStructuredData(property);
}

/* Gallery & Lightbox Controller */
function setupGallery(images, propertyName) {
  const mainImage = document.getElementById('gallery-main-img');
  const thumbsContainer = document.getElementById('gallery-thumbnails');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  if (!images || images.length === 0) return;

  let currentIndex = 0;

  if (mainImage) {
    mainImage.src = images[0];
    mainImage.alt = `${propertyName} - Photo 1`;
    mainImage.addEventListener('click', () => openLightbox(currentIndex));
  }

  if (thumbsContainer) {
    thumbsContainer.innerHTML = images.map((img, idx) => `
      <button type="button" class="gallery-thumb-btn relative rounded-lg overflow-hidden border-2 transition-all aspect-video cursor-pointer ${idx === 0 ? 'border-[#C8A96A] opacity-100 ring-2 ring-[#C8A96A]/40' : 'border-transparent opacity-75 hover:opacity-100'}" data-thumb-index="${idx}" aria-label="View photo ${idx + 1}">
        <img src="${img}" alt="${propertyName} thumbnail ${idx + 1}" class="w-full h-full object-cover" loading="lazy" width="200" height="112">
      </button>
    `).join('');

    thumbsContainer.querySelectorAll('.gallery-thumb-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-thumb-index'), 10);
        setActiveImage(idx);
      });
    });
  }

  function setActiveImage(index) {
    currentIndex = index;
    if (mainImage) {
      mainImage.src = images[index];
      mainImage.alt = `${propertyName} - Photo ${index + 1}`;
    }
    // Update thumbnail highlights
    if (thumbsContainer) {
      thumbsContainer.querySelectorAll('.gallery-thumb-btn').forEach((btn, idx) => {
        if (idx === index) {
          btn.className = "gallery-thumb-btn relative rounded-lg overflow-hidden border-2 transition-all aspect-video cursor-pointer border-[#C8A96A] opacity-100 ring-2 ring-[#C8A96A]/40";
        } else {
          btn.className = "gallery-thumb-btn relative rounded-lg overflow-hidden border-2 transition-all aspect-video cursor-pointer border-transparent opacity-75 hover:opacity-100";
        }
      });
    }
  }

  function openLightbox(index) {
    if (!lightbox || !lightboxImg) return;
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.classList.add('overflow-hidden');
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
  }

  function updateLightbox() {
    if (!lightboxImg) return;
    lightboxImg.src = images[currentIndex];
    lightboxImg.alt = `${propertyName} - Photo ${currentIndex + 1}`;
    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    }
    setActiveImage(currentIndex);
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);
  if (lightboxNext) lightboxNext.addEventListener('click', nextImage);

  // Keyboard navigation — BUG FIX: AbortController mencegah listener leak
  // saat gallery di-init ulang (menghindari duplikasi handler)
  const keyController = new AbortController();
  window.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') { closeLightbox(); keyController.abort(); }
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  }, { signal: keyController.signal });
}

function injectPropertyStructuredData(property) {
  const scriptId = 'property-json-ld';
  let script = document.getElementById(scriptId);
  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    "name": property.name,
    "description": property.description,
    "image": property.images,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.location,
      "addressRegion": "Coastal Reserve",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": property.coordinates.lat,
      "longitude": property.coordinates.lng
    },
    "numberOfRooms": property.bedrooms + property.bathrooms,
    "numberOfBedrooms": property.bedrooms,
    "numberOfBathroomsTotal": property.bathrooms,
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": property.buildingArea,
      "unitCode": "MTK"
    },
    "offers": {
      "@type": "Offer",
      "price": property.price,
      "priceCurrency": "USD",
      "availability": property.status === "Available" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "RealEstateAgent",
        "name": BRAND_CONFIG.name,
        "telephone": BRAND_CONFIG.phone,
        "email": BRAND_CONFIG.email
      }
    }
  };

  script.textContent = JSON.stringify(schema, null, 2);
}

/* --------------------------------------------------------------------------
   CONTACT PAGE (contact.html)
   -------------------------------------------------------------------------- */
function initContactPage() {
  const form = document.getElementById('contact-inquiry-form');
  const successBox = document.getElementById('contact-success-box');
  const propertySelect = document.getElementById('contact-property-interest');

  // Pre-fill property interest if query param present
  const urlParams = new URLSearchParams(window.location.search);
  const selectedProp = urlParams.get('property');
  if (selectedProp && propertySelect) {
    propertySelect.value = selectedProp;
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let hasError = false;

      // Inputs
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const phoneInput = document.getElementById('contact-phone');
      const consentInput = document.getElementById('contact-consent');

      // Clear previous error styles
      form.querySelectorAll('.input-error-msg').forEach(el => el.classList.add('hidden'));
      form.querySelectorAll('input, select, textarea').forEach(el => el.classList.remove('border-red-500'));

      // Validate Name
      if (!nameInput.value.trim()) {
        showError(nameInput, 'Please provide your full legal name.');
        hasError = true;
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid business or personal email address.');
        hasError = true;
      }

      // Validate Phone
      if (!phoneInput.value.trim() || phoneInput.value.trim().length < 7) {
        showError(phoneInput, 'Please provide an active phone or WhatsApp number including country code.');
        hasError = true;
      }

      // Validate Consent
      if (consentInput && !consentInput.checked) {
        const consentError = document.getElementById('consent-error-msg');
        if (consentError) consentError.classList.remove('hidden');
        hasError = true;
      }

      if (hasError) return;

      // Simulate form transmission (Netlify / Formspree ready)
      /* 
       * TO INTEGRATE LIVE FORMSPREE:
       * Replace this demo block with:
       * fetch('https://formspree.io/f/YOUR_FORM_ID', {
       *   method: 'POST',
       *   body: new FormData(form),
       *   headers: { 'Accept': 'application/json' }
       * });
       */
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-[#0F2A43]" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Registering Priority Consultation...
      `;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        form.classList.add('hidden');
        if (successBox) {
          successBox.classList.remove('hidden');
          // BUG FIX: null-guard mencegah crash saat successBox tidak ada di halaman
          window.scrollTo({ top: successBox.offsetTop - 120, behavior: 'smooth' });
        }
      }, 850);
    });
  }

  function showError(inputEl, message) {
    inputEl.classList.add('border-red-500');
    const errorEl = inputEl.parentElement.querySelector('.input-error-msg');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.remove('hidden');
    }
  }
}

/* --------------------------------------------------------------------------
   SHARED PROPERTY CARD BUILDER
   -------------------------------------------------------------------------- */
function createPropertyCardHTML(property) {
  const statusClass = property.status === 'Available' 
    ? 'badge-available' 
    : (property.status === 'Reserved' ? 'badge-reserved' : 'badge-sold');

  const isFav = typeof isFavorited === 'function' && isFavorited(property.id);
  const isCompared = typeof isComparedProperty === 'function' && isComparedProperty(property.id);

  return `
    <article class="property-card group relative">
      <div class="card-media">
        <img 
          src="${property.images[0]}" 
          alt="${property.name} - Luxury ${property.type} in ${property.location}" 
          loading="lazy" 
          width="400" 
          height="250"
        />
        <div class="absolute top-3 left-3 z-10 flex items-center gap-1.5">
          <span class="badge-status ${statusClass}">${property.status}</span>
        </div>
        
        <!-- Top Right Actions: Type Badge & Favorite Heart -->
        <div class="absolute top-3 right-3 z-10 flex items-center gap-1.5">
          <button type="button" class="btn-fav w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#0F2A43] flex items-center justify-center shadow-md transition-all cursor-pointer ${isFav ? 'active' : ''}" data-fav-id="${property.id}" title="${isFav ? 'Remove from Wishlist' : 'Save to Wishlist'}" aria-label="Favorite ${property.name}">
            <svg class="w-4 h-4 fill-none stroke-current stroke-2 ${isFav ? 'text-red-500 fill-red-500' : 'text-[#C8A96A]'}" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <span class="px-2.5 py-1 text-xs font-semibold bg-[#0F2A43]/85 text-[#C8A96A] rounded backdrop-blur-md border border-[#C8A96A]/30">
            ${property.type}
          </span>
        </div>
      </div>

      <div class="p-6 flex flex-col flex-1 justify-between">
        <div>
          <div class="flex items-center justify-between text-xs text-[#64748B] mb-2 font-medium">
            <div class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-[#C8A96A] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span>${property.location}</span>
            </div>
            <!-- Compare Toggle Button -->
            <button type="button" class="btn-compare-card text-[11px] font-semibold text-[#64748B] hover:text-[#0F2A43] flex items-center gap-1 cursor-pointer transition-colors ${isCompared ? 'text-[#C8A96A] font-bold' : ''}" data-compare-id="${property.id}">
              <span class="compare-icon">${isCompared ? '✓' : '+'}</span>
              <span>${isCompared ? 'Comparing' : 'Compare'}</span>
            </button>
          </div>

          <h3 class="font-serif text-lg sm:text-xl font-bold text-[#0F2A43] group-hover:text-[#C8A96A] transition-colors mb-1.5 line-clamp-2 min-h-[3.25rem] leading-snug">
            <a href="property.html?id=${property.id}">${property.name}</a>
          </h3>
          <p class="text-xs text-[#64748B] mb-4 line-clamp-1 leading-relaxed">${property.tagline}</p>
        </div>

        <div>
          <div class="grid grid-cols-3 gap-2 py-3 border-y border-[#E6E2DA] my-3 text-center text-xs text-[#1F2933]">
            <div>
              <span class="block font-semibold text-[#0F2A43]">${property.bedrooms > 0 ? property.bedrooms : '-'}</span>
              <span class="text-[11px] text-[#64748B]">Beds</span>
            </div>
            <div>
              <span class="block font-semibold text-[#0F2A43]">${property.bathrooms > 0 ? property.bathrooms : '-'}</span>
              <span class="text-[11px] text-[#64748B]">Baths</span>
            </div>
            <div>
              <span class="block font-semibold text-[#0F2A43]">${property.buildingArea > 0 ? property.buildingArea : property.landArea} m²</span>
              <span class="text-[11px] text-[#64748B]">${property.buildingArea > 0 ? 'Built' : 'Land'}</span>
            </div>
          </div>

          <div class="flex items-center justify-between pt-2">
            <div>
              <span class="text-[11px] uppercase tracking-wider text-[#64748B] font-semibold block">Asking Price</span>
              <span class="property-price-display font-serif text-lg font-bold text-[#0F2A43]" data-raw-price="${property.price}">
                ${typeof formatCurrency === 'function' ? formatCurrency(property.price) : formatUSD(property.price)}
              </span>
            </div>
            <a href="property.html?id=${property.id}" class="text-xs font-semibold text-[#0F2A43] hover:text-[#C8A96A] flex items-center gap-1 group-hover:translate-x-1 transition-all">
              Details
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  `;
}

function createPropertyListCardHTML(property) {
  const statusClass = property.status === 'Available' 
    ? 'badge-available' 
    : (property.status === 'Reserved' ? 'badge-reserved' : 'badge-sold');

  const isFav = typeof isFavorited === 'function' && isFavorited(property.id);
  const isCompared = typeof isComparedProperty === 'function' && isComparedProperty(property.id);

  return `
    <article class="property-list-card group relative">
      <div class="relative overflow-hidden h-64 md:h-auto min-h-[260px] bg-slate-900">
        <img 
          src="${property.images[0]}" 
          alt="${property.name}" 
          loading="lazy" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div class="absolute top-3 left-3 z-10">
          <span class="badge-status ${statusClass}">${property.status}</span>
        </div>
        <div class="absolute top-3 right-3 z-10 flex items-center gap-1.5">
          <button type="button" class="btn-fav w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#0F2A43] flex items-center justify-center shadow-md transition-all cursor-pointer ${isFav ? 'active' : ''}" data-fav-id="${property.id}" title="${isFav ? 'Remove from Wishlist' : 'Save to Wishlist'}" aria-label="Favorite ${property.name}">
            <svg class="w-4 h-4 fill-none stroke-current stroke-2 ${isFav ? 'text-red-500 fill-red-500' : 'text-[#C8A96A]'}" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="p-6 md:p-8 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between text-xs text-[#64748B] mb-2 font-medium">
            <span class="px-2.5 py-0.5 rounded bg-[#F5EEDB] text-[#0F2A43] font-semibold border border-[#C8A96A]/30">
              ${property.type} &bull; ${property.location}
            </span>
            <button type="button" class="btn-compare-card text-[11px] font-semibold text-[#64748B] hover:text-[#0F2A43] flex items-center gap-1 cursor-pointer transition-colors ${isCompared ? 'text-[#C8A96A] font-bold' : ''}" data-compare-id="${property.id}">
              <span class="compare-icon">${isCompared ? '✓' : '+'}</span>
              <span>${isCompared ? 'Comparing' : 'Compare'}</span>
            </button>
          </div>

          <h3 class="font-serif text-2xl font-bold text-[#0F2A43] group-hover:text-[#C8A96A] transition-colors mb-1.5">
            <a href="property.html?id=${property.id}">${property.name}</a>
          </h3>
          <p class="text-xs font-medium text-[#C8A96A] mb-2.5">${property.tagline}</p>
          <p class="text-xs text-[#64748B] leading-relaxed line-clamp-2 mb-4">${property.description}</p>
        </div>

        <div>
          <div class="grid grid-cols-4 gap-2 py-3 border-y border-[#E6E2DA] my-3 text-center text-xs text-[#1F2933]">
            <div>
              <span class="block font-bold text-sm text-[#0F2A43]">${property.bedrooms > 0 ? property.bedrooms : '-'}</span>
              <span class="text-[10px] uppercase tracking-wider text-[#64748B]">Beds</span>
            </div>
            <div>
              <span class="block font-bold text-sm text-[#0F2A43]">${property.bathrooms > 0 ? property.bathrooms : '-'}</span>
              <span class="text-[10px] uppercase tracking-wider text-[#64748B]">Baths</span>
            </div>
            <div>
              <span class="block font-bold text-sm text-[#0F2A43]">${property.buildingArea > 0 ? property.buildingArea : '-'} m²</span>
              <span class="text-[10px] uppercase tracking-wider text-[#64748B]">Built Area</span>
            </div>
            <div>
              <span class="block font-bold text-sm text-[#0F2A43]">${property.landArea > 0 ? property.landArea : '-'} m²</span>
              <span class="text-[10px] uppercase tracking-wider text-[#64748B]">Land Area</span>
            </div>
          </div>

          <div class="flex items-center justify-between pt-2">
            <div>
              <span class="text-[10px] uppercase tracking-wider text-[#64748B] font-semibold block">Asking Price</span>
              <span class="property-price-display font-serif text-2xl font-bold text-[#0F2A43]" data-raw-price="${property.price}">
                ${typeof formatCurrency === 'function' ? formatCurrency(property.price) : formatUSD(property.price)}
              </span>
            </div>
            <div class="flex items-center gap-2">
              <a href="property.html?id=${property.id}" class="btn-gold !py-2.5 !px-5 text-xs uppercase tracking-wider font-bold">
                View Residence Dossier &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  `;
}

/* ==========================================================================
   8. GLOBAL MODALS INJECTION ENGINE
   ========================================================================== */
function injectGlobalModals() {
  if (document.getElementById('global-modals-injected')) return;

  const modalsContainer = document.createElement('div');
  modalsContainer.id = 'global-modals-injected';
  modalsContainer.innerHTML = `
    <!-- WISHLIST SLIDE-OVER DRAWER -->
    <div id="wishlist-drawer-overlay" class="sidebar-drawer-overlay" aria-hidden="true"></div>
    <aside id="wishlist-drawer" class="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white p-6 shadow-2xl overflow-y-auto transform translate-x-full transition-transform duration-300 ease-in-out flex flex-col justify-between" aria-label="Curated Wishlist">
      <div>
        <div class="flex items-center justify-between pb-4 border-b border-[#E6E2DA] mb-6">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-red-500 fill-red-500" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            <h2 class="font-serif font-bold text-lg text-[#0F2A43]">Curated Wishlist</h2>
            <span id="wishlist-count-badge" class="bg-[#C8A96A] text-[#0F2A43] font-bold text-xs px-2 py-0.5 rounded-full">0</span>
          </div>
          <button id="wishlist-close-btn" type="button" class="p-1.5 text-[#64748B] hover:text-[#0F2A43] rounded-lg" aria-label="Close Wishlist">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div id="wishlist-items-container" class="space-y-4 overflow-y-auto max-h-[calc(100vh-280px)] pr-1">
          <!-- Dynamically populated favorite items -->
        </div>

        <div id="wishlist-empty-state" class="hidden text-center py-12">
          <div class="w-12 h-12 rounded-full bg-[#F7F5F0] text-[#64748B] flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6 stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </div>
          <h4 class="font-serif font-bold text-base text-[#0F2A43] mb-1">Your Wishlist is Empty</h4>
          <p class="text-xs text-[#64748B] max-w-xs mx-auto mb-4">Click the heart icon on any residence to save it to your private portfolio list.</p>
          <a href="properties.html" class="btn-outline-navy !py-2 !px-4 text-xs font-semibold">Browse Residences</a>
        </div>
      </div>

      <!-- Wishlist Actions -->
      <div id="wishlist-actions-bar" class="pt-4 border-t border-[#E6E2DA] space-y-2.5">
        <button id="share-wishlist-whatsapp" type="button" class="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer">
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          <span>Share Wishlist to WhatsApp Concierge</span>
        </button>
        <div class="flex items-center gap-2">
          <button id="compare-saved-btn" type="button" class="btn-outline-navy flex-1 !py-2 text-xs font-semibold">Compare Saved</button>
          <button id="clear-wishlist-btn" type="button" class="text-xs text-[#64748B] hover:text-red-600 px-3 py-2 font-medium">Clear All</button>
        </div>
      </div>
    </aside>

    <!-- FLOATING COMPARE BAR -->
    <div id="compare-bar" class="compare-bar bg-[#0F2A43] text-white px-5 py-3 rounded-2xl border border-[#C8A96A]/40 flex items-center gap-4">
      <div id="compare-thumbs-preview" class="flex items-center -space-x-2 overflow-hidden">
        <!-- Up to 4 micro thumbnails -->
      </div>
      <div>
        <span class="block text-xs font-bold text-white"><span id="compare-count-val">0</span> Selected</span>
        <span class="text-[10px] text-white/70">Compare side-by-side</span>
      </div>
      <button id="open-compare-modal-btn" type="button" class="btn-gold !py-1.5 !px-3.5 !text-xs font-bold uppercase tracking-wider">
        Compare Now
      </button>
      <button id="clear-compare-btn" type="button" class="text-xs text-white/60 hover:text-white ml-1 font-bold" aria-label="Clear comparison">&times;</button>
    </div>

    <!-- SIDE-BY-SIDE PROPERTY COMPARISON MODAL -->
    <div id="compare-modal" class="modal-backdrop" aria-hidden="true">
      <div class="bg-white rounded-2xl p-6 sm:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E6E2DA] relative">
        <div class="flex items-center justify-between pb-4 border-b border-[#E6E2DA] mb-6">
          <div>
            <span class="text-xs font-semibold uppercase tracking-wider text-[#C8A96A] block">Specification Matrix</span>
            <h3 class="font-serif text-2xl font-bold text-[#0F2A43]">Residences Comparison</h3>
          </div>
          <button id="compare-modal-close" type="button" class="p-2 text-[#64748B] hover:text-[#0F2A43] rounded-lg text-lg font-bold" aria-label="Close comparison">&times;</button>
        </div>
        <div id="compare-modal-content" class="overflow-x-auto">
          <!-- Dynamically populated matrix table -->
        </div>
      </div>
    </div>

    <!-- PRIVATE VIEWING 1-ON-1 INTERACTIVE CALENDAR BOOKING MODAL -->
    <div id="viewing-calendar-modal" class="modal-backdrop" aria-hidden="true">
      <div class="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E6E2DA] relative">
        <button id="viewing-modal-close" type="button" class="absolute top-4 right-4 p-2 text-[#64748B] hover:text-[#0F2A43] text-xl font-bold" aria-label="Close calendar">&times;</button>
        
        <!-- Step Indicator -->
        <div class="flex items-center gap-2 mb-6">
          <span class="text-xs uppercase font-bold tracking-wider text-[#C8A96A]">Private Office Concierge</span>
          <span class="text-[#64748B]">&bull;</span>
          <span id="booking-step-title" class="text-xs font-semibold text-[#0F2A43]">Step 1: Select Format</span>
        </div>

        <h3 class="font-serif text-2xl sm:text-3xl font-bold text-[#0F2A43] mb-2">Schedule Private Viewing</h3>
        <p class="text-xs text-[#64748B] mb-6">Experience Azure Bay Residences at your convenience with our senior managing partners.</p>

        <!-- WIZARD STEP 1: Format Selection -->
        <div id="booking-step-1" class="space-y-3">
          <div class="tour-format-option p-4 rounded-xl border-2 border-[#C8A96A] bg-[#F5EEDB]/40 hover:bg-[#F5EEDB] cursor-pointer transition-all flex items-start gap-4" data-tour-format="VIP Discovery Tour">
            <div class="w-10 h-10 rounded-lg bg-[#0F2A43] text-[#C8A96A] flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <h4 class="font-serif font-bold text-sm text-[#0F2A43]">VIP Chauffeur Discovery Tour (In-Person)</h4>
                <span class="text-[11px] font-bold text-[#C8A96A]">Recommended</span>
              </div>
              <p class="text-xs text-[#64748B] mt-0.5">Private airport transfer, private yacht club visit, and tailored villa walkthrough.</p>
            </div>
          </div>

          <div class="tour-format-option p-4 rounded-xl border border-[#E6E2DA] hover:border-[#C8A96A] cursor-pointer transition-all flex items-start gap-4" data-tour-format="Live 4K Virtual Walkthrough">
            <div class="w-10 h-10 rounded-lg bg-[#0F2A43] text-[#C8A96A] flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            </div>
            <div class="flex-1">
              <h4 class="font-serif font-bold text-sm text-[#0F2A43]">Live 4K Virtual Guided Walkthrough</h4>
              <p class="text-xs text-[#64748B] mt-0.5">Interactive live video call via Google Meet / Zoom with our lead architect.</p>
            </div>
          </div>

          <div class="tour-format-option p-4 rounded-xl border border-[#E6E2DA] hover:border-[#C8A96A] cursor-pointer transition-all flex items-start gap-4" data-tour-format="Investor Strategy Consultation">
            <div class="w-10 h-10 rounded-lg bg-[#0F2A43] text-[#C8A96A] flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            </div>
            <div class="flex-1">
              <h4 class="font-serif font-bold text-sm text-[#0F2A43]">Private Investor Strategy Call</h4>
              <p class="text-xs text-[#64748B] mt-0.5">Offshore structuring, tax residency, freehold legalities, and yield pro-forma.</p>
            </div>
          </div>

          <button id="booking-go-step-2" type="button" class="btn-gold w-full mt-4 !py-3 text-xs uppercase tracking-wider font-bold">
            Continue to Date & Time &rarr;
          </button>
        </div>

        <!-- WIZARD STEP 2: Interactive Date & Time Picker -->
        <div id="booking-step-2" class="hidden space-y-5">
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-2">Select Date (Upcoming Availability)</label>
            <div id="booking-calendar-grid" class="grid grid-cols-7 gap-1.5 text-center text-xs">
              <!-- Dynamically populated interactive calendar cells -->
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-2">Select Time Slot (EST)</label>
            <div id="booking-time-slots" class="grid grid-cols-3 sm:grid-cols-5 gap-2 text-xs">
              <button type="button" class="time-slot-btn py-2 rounded-lg border border-[#C8A96A] bg-[#F5EEDB] font-semibold text-[#0F2A43]">10:00 AM</button>
              <button type="button" class="time-slot-btn py-2 rounded-lg border border-[#E6E2DA] hover:border-[#C8A96A] text-[#64748B] hover:text-[#0F2A43]">11:30 AM</button>
              <button type="button" class="time-slot-btn py-2 rounded-lg border border-[#E6E2DA] hover:border-[#C8A96A] text-[#64748B] hover:text-[#0F2A43]">02:00 PM</button>
              <button type="button" class="time-slot-btn py-2 rounded-lg border border-[#E6E2DA] hover:border-[#C8A96A] text-[#64748B] hover:text-[#0F2A43]">04:00 PM</button>
              <button type="button" class="time-slot-btn py-2 rounded-lg border border-[#E6E2DA] hover:border-[#C8A96A] text-[#64748B] hover:text-[#0F2A43]">06:00 PM</button>
            </div>
          </div>

          <div class="flex items-center gap-3 pt-2">
            <button id="booking-back-step-1" type="button" class="btn-outline-navy !py-2.5 !px-4 text-xs font-semibold">&larr; Back</button>
            <button id="booking-go-step-3" type="button" class="btn-gold flex-1 !py-2.5 text-xs uppercase tracking-wider font-bold">Continue to Guest Details &rarr;</button>
          </div>
        </div>

        <!-- WIZARD STEP 3: Guest & Contact Details -->
        <div id="booking-step-3" class="hidden space-y-4">
          <div>
            <label class="block text-xs font-semibold text-[#64748B] mb-1">Principal Investor / Guest Name *</label>
            <input type="text" id="booking-guest-name" required placeholder="e.g. Elizabeth Montgomery" class="w-full bg-[#F7F5F0] border border-[#E6E2DA] rounded-lg px-3 py-2.5 text-xs font-medium text-[#0F2A43] focus:border-[#C8A96A]" />
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#64748B] mb-1">Email Address *</label>
              <input type="email" id="booking-guest-email" required placeholder="name@domain.com" class="w-full bg-[#F7F5F0] border border-[#E6E2DA] rounded-lg px-3 py-2.5 text-xs font-medium text-[#0F2A43] focus:border-[#C8A96A]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#64748B] mb-1">WhatsApp / Phone *</label>
              <input type="tel" id="booking-guest-phone" required placeholder="+1 (555) 000-0000" class="w-full bg-[#F7F5F0] border border-[#E6E2DA] rounded-lg px-3 py-2.5 text-xs font-medium text-[#0F2A43] focus:border-[#C8A96A]" />
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-[#64748B] mb-1">Specific Residences of Interest or Special Notes</label>
            <input type="text" id="booking-guest-notes" placeholder="e.g. Villa Solis or 4+ bed clifftop estates" class="w-full bg-[#F7F5F0] border border-[#E6E2DA] rounded-lg px-3 py-2.5 text-xs font-medium text-[#0F2A43] focus:border-[#C8A96A]" />
          </div>

          <div class="flex items-center gap-3 pt-2">
            <button id="booking-back-step-2" type="button" class="btn-outline-navy !py-2.5 !px-4 text-xs font-semibold">&larr; Back</button>
            <button id="booking-submit-btn" type="button" class="btn-gold flex-1 !py-3 text-xs uppercase tracking-wider font-bold">Confirm & Lock Private Appointment</button>
          </div>
        </div>

        <!-- WIZARD STEP 4: Confirmation Ticket -->
        <div id="booking-step-4" class="hidden text-center py-4">
          <div class="w-14 h-14 rounded-full bg-[#C8A96A] text-[#0F2A43] flex items-center justify-center mx-auto mb-4 text-2xl font-bold">✓</div>
          <span class="text-xs uppercase font-bold tracking-wider text-[#C8A96A]">Invitation Confirmed</span>
          <h3 class="font-serif text-2xl font-bold text-[#0F2A43] mt-1 mb-2">Private Viewing Registered</h3>
          <p class="text-xs text-[#64748B] max-w-md mx-auto mb-6">Your private appointment has been added to our executive calendar. An official calendar invitation with confidential coordinates has been dispatched.</p>

          <div class="bg-[#F7F5F0] border border-[#E6E2DA] rounded-xl p-5 text-left max-w-md mx-auto mb-6 space-y-2 text-xs text-[#0F2A43]">
            <div class="flex justify-between border-b border-[#E6E2DA] pb-2">
              <span class="text-[#64748B]">Booking Reference:</span>
              <span id="ticket-ref" class="font-mono font-bold text-[#C8A96A]">AZ-84920</span>
            </div>
            <div class="flex justify-between border-b border-[#E6E2DA] pb-2">
              <span class="text-[#64748B]">Format:</span>
              <span id="ticket-format" class="font-semibold">VIP Discovery Tour</span>
            </div>
            <div class="flex justify-between border-b border-[#E6E2DA] pb-2">
              <span class="text-[#64748B]">Date & Time:</span>
              <span id="ticket-datetime" class="font-semibold">Tomorrow at 10:00 AM EST</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[#64748B]">Private Host:</span>
              <span class="font-semibold">Julian De La Torre (CEO)</span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a id="ticket-calendar-link" href="#" target="_blank" class="btn-outline-navy !py-2.5 !px-5 text-xs font-semibold w-full sm:w-auto">
              Add to Google Calendar
            </a>
            <a id="ticket-whatsapp-confirm" href="#" target="_blank" class="btn-gold !py-2.5 !px-5 text-xs font-semibold w-full sm:w-auto">
              Confirm via WhatsApp Concierge
            </a>
          </div>
        </div>

      </div>
    </div>

    <!-- GATED FLOOR PLAN & BROCHURE DOWNLOAD MODAL -->
    <div id="brochure-download-modal" class="modal-backdrop" aria-hidden="true">
      <div class="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#E6E2DA] relative">
        <button id="brochure-modal-close" type="button" class="absolute top-4 right-4 p-2 text-[#64748B] hover:text-[#0F2A43] text-xl font-bold" aria-label="Close modal">&times;</button>
        
        <div class="flex items-center gap-2 mb-2">
          <svg class="w-5 h-5 text-[#C8A96A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          <span class="text-xs uppercase font-bold tracking-wider text-[#C8A96A]">Confidential Dossier</span>
        </div>
        <h3 class="font-serif text-2xl font-bold text-[#0F2A43] mb-1">Download Architectural Dossier</h3>
        <p class="text-xs text-[#64748B] mb-5">Access high-resolution CAD schematics, material specs, and rental yield pro-forma in PDF format.</p>

        <form id="brochure-download-form" class="space-y-3.5">
          <div>
            <label class="block text-xs font-semibold text-[#64748B] mb-1">Your Full Name *</label>
            <input type="text" id="brochure-name" required placeholder="e.g. Henri de Montmirail" class="w-full bg-[#F7F5F0] border border-[#E6E2DA] rounded-lg px-3 py-2 text-xs font-medium text-[#0F2A43] focus:border-[#C8A96A]" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-[#64748B] mb-1">Corporate or Personal Email *</label>
            <input type="email" id="brochure-email" required placeholder="name@domain.com" class="w-full bg-[#F7F5F0] border border-[#E6E2DA] rounded-lg px-3 py-2 text-xs font-medium text-[#0F2A43] focus:border-[#C8A96A]" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-[#64748B] mb-1">WhatsApp / Phone with Country Code *</label>
            <input type="tel" id="brochure-phone" required placeholder="+44 7000 000000" class="w-full bg-[#F7F5F0] border border-[#E6E2DA] rounded-lg px-3 py-2 text-xs font-medium text-[#0F2A43] focus:border-[#C8A96A]" />
          </div>
          <button type="submit" class="btn-gold w-full !py-3 text-xs uppercase tracking-wider font-bold mt-2">
            Download PDF Dossier (18.4 MB)
          </button>
        </form>

        <div id="brochure-success-state" class="hidden text-center py-6">
          <div class="w-12 h-12 rounded-full bg-[#C8A96A] text-[#0F2A43] flex items-center justify-center mx-auto mb-3 font-bold text-xl">✓</div>
          <h4 class="font-serif font-bold text-base text-[#0F2A43] mb-1">Dossier Generated</h4>
          <p class="text-xs text-[#64748B] mb-4">Your customized architectural package is downloading now. A permanent copy has also been sent to your email.</p>
          <a id="brochure-download-link" href="https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=85" download="Azure_Bay_Residences_Architectural_Dossier.pdf" class="btn-outline-navy !py-2 !px-4 text-xs font-semibold inline-flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Click here if download doesn't begin
          </a>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modalsContainer);

  // Global Escape key listener to close modals & drawers
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.active').forEach(m => m.classList.remove('active'));
      const drawer = document.getElementById('wishlist-drawer');
      if (drawer) {
        drawer.classList.remove('translate-x-0');
        drawer.classList.add('translate-x-full');
      }
      const overlay = document.getElementById('wishlist-drawer-overlay');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================================================
   9. MULTI-CURRENCY SWITCHER SYSTEM
   ========================================================================== */
function initCurrencySwitcher() {
  const switchers = [
    document.getElementById('currency-switcher'),
    document.getElementById('mobile-currency-switcher'),
    document.getElementById('currency-switcher-mobile')
  ].filter(Boolean);

  switchers.forEach(select => {
    select.value = currentCurrency;
    select.addEventListener('change', (e) => {
      const newCurr = e.target.value;
      if (typeof setAppCurrency === 'function') {
        setAppCurrency(newCurr);
      }
      // Sync all dropdowns across desktop and mobile
      switchers.forEach(s => { s.value = newCurr; });
      updateAllPagePrices();
    });
  });
}

function updateAllPagePrices() {
  // Update all card price nodes
  document.querySelectorAll('.property-price-display').forEach(el => {
    const raw = parseFloat(el.getAttribute('data-raw-price'));
    if (!isNaN(raw)) {
      el.textContent = formatCurrency(raw);
    }
  });

  // Update property detail page price
  const propPriceEl = document.getElementById('prop-price');
  if (propPriceEl && propPriceEl.getAttribute('data-raw-price')) {
    const raw = parseFloat(propPriceEl.getAttribute('data-raw-price'));
    if (!isNaN(raw)) {
      propPriceEl.textContent = formatCurrency(raw);
    }
  }

  // Update calculator
  if (typeof initInvestmentCalculator === 'function') {
    const priceDisplay = document.getElementById('calc-price-display');
    const priceSlider = document.getElementById('calc-price');
    if (priceDisplay && priceSlider) {
      priceDisplay.textContent = formatCurrency(parseFloat(priceSlider.value));
    }
  }
}

/* ==========================================================================
   10. WISHLIST / FAVORITES SYSTEM (localStorage)
   ========================================================================== */
function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem('azure_favorites') || '[]');
  } catch (e) {
    return [];
  }
}

function setFavorites(arr) {
  try {
    localStorage.setItem('azure_favorites', JSON.stringify(arr));
  } catch (e) {}
}

function isFavorited(id) {
  return getFavorites().includes(id);
}

function toggleFavorite(id) {
  let favs = getFavorites();
  if (favs.includes(id)) {
    favs = favs.filter(item => item !== id);
  } else {
    favs.push(id);
  }
  setFavorites(favs);
  updateFavoritesUI();
  return favs.includes(id);
}

function updateFavoritesUI() {
  const favs = getFavorites();
  
  // Update badges
  const badge1 = document.getElementById('favorites-count-badge');
  const badge2 = document.getElementById('mobile-favorites-badge');
  const wishlistCount = document.getElementById('wishlist-count-badge');
  [badge1, badge2, wishlistCount].forEach(b => {
    if (b) b.textContent = favs.length;
  });

  // Update heart buttons
  document.querySelectorAll('.btn-fav[data-fav-id]').forEach(btn => {
    const id = btn.getAttribute('data-fav-id');
    const svg = btn.querySelector('svg');
    if (favs.includes(id)) {
      btn.classList.add('active');
      if (svg) {
        svg.classList.add('text-red-500', 'fill-red-500');
        svg.classList.remove('text-[#C8A96A]');
      }
    } else {
      btn.classList.remove('active');
      if (svg) {
        svg.classList.remove('text-red-500', 'fill-red-500');
        svg.classList.add('text-[#C8A96A]');
      }
    }
  });

  // Update Detail page heart text
  const detailFavText = document.getElementById('prop-detail-fav-text');
  if (detailFavText) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id') || 'villa-solis';
    detailFavText.textContent = favs.includes(id) ? 'Saved in Wishlist' : 'Save to Wishlist';
  }

  // Populate Wishlist Drawer items
  renderWishlistDrawerItems();
}

function renderWishlistDrawerItems() {
  const container = document.getElementById('wishlist-items-container');
  const emptyState = document.getElementById('wishlist-empty-state');
  const actionsBar = document.getElementById('wishlist-actions-bar');
  if (!container) return;

  const favs = getFavorites();
  if (favs.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    if (actionsBar) actionsBar.classList.add('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');
  if (actionsBar) actionsBar.classList.remove('hidden');

  const items = PROPERTIES.filter(p => favs.includes(p.id));
  container.innerHTML = items.map(p => `
    <div class="flex items-center gap-3 p-3 rounded-xl border border-[#E6E2DA] hover:border-[#C8A96A] bg-[#F7F5F0]/50 transition-all">
      <img src="${p.images[0]}" alt="${p.name}" class="w-16 h-16 rounded-lg object-cover shrink-0" />
      <div class="flex-1 min-w-0">
        <h4 class="font-serif font-bold text-xs text-[#0F2A43] truncate">
          <a href="property.html?id=${p.id}" class="hover:text-[#C8A96A]">${p.name}</a>
        </h4>
        <span class="text-[11px] text-[#64748B] block">${p.location}</span>
        <span class="font-serif font-bold text-xs text-[#0F2A43] block mt-0.5">${formatCurrency(p.price)}</span>
      </div>
      <button type="button" class="remove-wishlist-item p-1.5 text-[#64748B] hover:text-red-600 transition-colors" data-remove-id="${p.id}" aria-label="Remove item">
        &times;
      </button>
    </div>
  `).join('');

  // Individual item remove listener
  container.querySelectorAll('[data-remove-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-remove-id');
      toggleFavorite(id);
    });
  });
}

function initFavoritesSystem() {
  // Delegate clicks on .btn-fav
  document.addEventListener('click', (e) => {
    const favBtn = e.target.closest('.btn-fav[data-fav-id]');
    if (favBtn) {
      e.preventDefault();
      e.stopPropagation();
      const id = favBtn.getAttribute('data-fav-id');
      toggleFavorite(id);
    }
  });

  // Open wishlist drawer triggers
  const trigger1 = document.getElementById('header-favorites-btn');
  const trigger2 = document.getElementById('mobile-favorites-btn');
  const drawer = document.getElementById('wishlist-drawer');
  const overlay = document.getElementById('wishlist-drawer-overlay');
  const closeBtn = document.getElementById('wishlist-close-btn');

  function openWishlist() {
    renderWishlistDrawerItems();
    if (drawer) {
      drawer.classList.remove('translate-x-full');
      drawer.classList.add('translate-x-0');
    }
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeWishlist() {
    if (drawer) {
      drawer.classList.remove('translate-x-0');
      drawer.classList.add('translate-x-full');
    }
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (trigger1) trigger1.addEventListener('click', openWishlist);
  if (trigger2) trigger2.addEventListener('click', openWishlist);
  if (closeBtn) closeBtn.addEventListener('click', closeWishlist);
  if (overlay) overlay.addEventListener('click', closeWishlist);

  // Clear Wishlist
  const clearBtn = document.getElementById('clear-wishlist-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      setFavorites([]);
      updateFavoritesUI();
    });
  }

  // Share Wishlist via WhatsApp
  const shareBtn = document.getElementById('share-wishlist-whatsapp');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const favs = getFavorites();
      const items = PROPERTIES.filter(p => favs.includes(p.id));
      if (items.length === 0) return;

      let msg = `Hello Azure Bay Residences Concierge,\n\nI have curated a shortlist of ${items.length} residences from your portfolio:\n`;
      items.forEach((p, idx) => {
        msg += `${idx + 1}. ${p.name} (${formatCurrency(p.price)}) - ${p.location}\n`;
      });
      msg += `\nI would like to arrange private viewing dossiers for these residences.`;

      const url = `https://wa.me/${BRAND_CONFIG.whatsappRaw}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    });
  }

  // Compare Saved Button
  const compareSavedBtn = document.getElementById('compare-saved-btn');
  if (compareSavedBtn) {
    compareSavedBtn.addEventListener('click', () => {
      closeWishlist();
      const favs = getFavorites().slice(0, 4);
      if (favs.length > 0) {
        setComparisonList(favs);
        openCompareModal();
      }
    });
  }

  updateFavoritesUI();
}

/* ==========================================================================
   11. PROPERTY COMPARISON SYSTEM
   ========================================================================== */
let activeComparison = [];

function getComparisonList() {
  return activeComparison;
}

function setComparisonList(list) {
  activeComparison = list.slice(0, 4);
  updateComparisonUI();
}

function isComparedProperty(id) {
  return activeComparison.includes(id);
}

function toggleCompare(id) {
  if (activeComparison.includes(id)) {
    activeComparison = activeComparison.filter(item => item !== id);
  } else {
    if (activeComparison.length >= 4) {
      alert("You can compare up to 4 residences simultaneously.");
      return;
    }
    activeComparison.push(id);
  }
  updateComparisonUI();
}

function updateComparisonUI() {
  const bar = document.getElementById('compare-bar');
  const countVal = document.getElementById('compare-count-val');
  const thumbs = document.getElementById('compare-thumbs-preview');

  if (!bar) return;

  if (activeComparison.length > 0) {
    bar.classList.add('active');
    if (countVal) countVal.textContent = activeComparison.length;

    if (thumbs) {
      const allProps = (window.AzureDB && typeof window.AzureDB.getProperties === 'function') ? window.AzureDB.getProperties() : (typeof PROPERTIES !== 'undefined' ? PROPERTIES : []);
      const selectedProps = allProps.filter(p => activeComparison.includes(p.id));
      thumbs.innerHTML = selectedProps.map(p => `
        <img src="${p.images[0]}" alt="${p.name}" class="w-8 h-8 rounded-full object-cover border-2 border-[#C8A96A]" />
      `).join('');
    }
  } else {
    bar.classList.remove('active');
  }

  // Update card compare buttons
  document.querySelectorAll('.btn-compare-card[data-compare-id]').forEach(btn => {
    const id = btn.getAttribute('data-compare-id');
    const isComp = activeComparison.includes(id);
    const icon = btn.querySelector('.compare-icon');
    const text = btn.querySelector('span:not(.compare-icon)');
    if (isComp) {
      btn.classList.add('text-[#C8A96A]', 'font-bold');
      if (icon) icon.textContent = '✓';
      if (text) text.textContent = 'Comparing';
    } else {
      btn.classList.remove('text-[#C8A96A]', 'font-bold');
      if (icon) icon.textContent = '+';
      if (text) text.textContent = 'Compare';
    }
  });
}

function openCompareModal() {
  const modal = document.getElementById('compare-modal');
  const content = document.getElementById('compare-modal-content');
  if (!modal || !content) return;

  const allProps = (window.AzureDB && typeof window.AzureDB.getProperties === 'function') ? window.AzureDB.getProperties() : (typeof PROPERTIES !== 'undefined' ? PROPERTIES : []);
  const selected = allProps.filter(p => activeComparison.includes(p.id));
  if (selected.length === 0) return;

  content.innerHTML = `
    <table class="w-full text-left text-xs border-collapse">
      <thead>
        <tr class="border-b border-[#E6E2DA]">
          <th class="p-3 font-semibold text-[#64748B] w-36 bg-[#F7F5F0]">Residence</th>
          ${selected.map(p => `
            <th class="p-3 text-center min-w-[200px]">
              <div class="relative rounded-lg overflow-hidden h-28 mb-2">
                <img src="${p.images[0]}" alt="${p.name}" class="w-full h-full object-cover" />
              </div>
              <h4 class="font-serif font-bold text-sm text-[#0F2A43]">${p.name}</h4>
              <span class="text-[11px] text-[#64748B] block">${p.location}</span>
            </th>
          `).join('')}
        </tr>
      </thead>
      <tbody class="divide-y divide-[#E6E2DA]">
        <tr>
          <td class="p-3 font-semibold text-[#64748B] bg-[#F7F5F0]">Asking Price</td>
          ${selected.map(p => `
            <td class="p-3 text-center font-serif text-base font-bold text-[#0F2A43]">
              ${formatCurrency(p.price)}
            </td>
          `).join('')}
        </tr>
        <tr>
          <td class="p-3 font-semibold text-[#64748B] bg-[#F7F5F0]">Property Type</td>
          ${selected.map(p => `<td class="p-3 text-center text-[#0F2A43]">${p.type}</td>`).join('')}
        </tr>
        <tr>
          <td class="p-3 font-semibold text-[#64748B] bg-[#F7F5F0]">Status</td>
          ${selected.map(p => `<td class="p-3 text-center"><span class="badge-status ${p.status === 'Available' ? 'badge-available' : 'badge-reserved'} text-[10px]">${p.status}</span></td>`).join('')}
        </tr>
        <tr>
          <td class="p-3 font-semibold text-[#64748B] bg-[#F7F5F0]">Bedrooms</td>
          ${selected.map(p => `<td class="p-3 text-center font-semibold text-[#0F2A43]">${p.bedrooms > 0 ? p.bedrooms + ' Beds' : '-'}</td>`).join('')}
        </tr>
        <tr>
          <td class="p-3 font-semibold text-[#64748B] bg-[#F7F5F0]">Bathrooms</td>
          ${selected.map(p => `<td class="p-3 text-center font-semibold text-[#0F2A43]">${p.bathrooms > 0 ? p.bathrooms + ' Baths' : '-'}</td>`).join('')}
        </tr>
        <tr>
          <td class="p-3 font-semibold text-[#64748B] bg-[#F7F5F0]">Living Area</td>
          ${selected.map(p => `<td class="p-3 text-center text-[#0F2A43]">${p.buildingArea > 0 ? p.buildingArea + ' m² (' + Math.round(p.buildingArea * 10.764) + ' sq ft)' : '-'}</td>`).join('')}
        </tr>
        <tr>
          <td class="p-3 font-semibold text-[#64748B] bg-[#F7F5F0]">Plot Area</td>
          ${selected.map(p => `<td class="p-3 text-center text-[#0F2A43]">${p.landArea > 0 ? p.landArea + ' m²' : 'Shared Enclave'}</td>`).join('')}
        </tr>
        <tr>
          <td class="p-3 font-semibold text-[#64748B] bg-[#F7F5F0]">Year Delivered</td>
          ${selected.map(p => `<td class="p-3 text-center text-[#0F2A43]">${p.yearBuilt}</td>`).join('')}
        </tr>
        <tr>
          <td class="p-3 font-semibold text-[#64748B] bg-[#F7F5F0]">Projected Yield</td>
          ${selected.map(p => `<td class="p-3 text-center font-bold text-[#C8A96A]">${(8.5 + (p.price % 300000)/150000).toFixed(1)}% Net</td>`).join('')}
        </tr>
        <tr>
          <td class="p-3 font-semibold text-[#64748B] bg-[#F7F5F0]">Actions</td>
          ${selected.map(p => `
            <td class="p-3 text-center space-y-1.5">
              <a href="property.html?id=${p.id}" class="btn-gold !py-1.5 !px-3 !text-[11px] block w-full text-center">View Dossier</a>
              <button type="button" data-open-modal="viewing-calendar" class="btn-outline-navy !py-1.5 !px-3 !text-[11px] block w-full text-center">Book Viewing</button>
            </td>
          `).join('')}
        </tr>
      </tbody>
    </table>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCompareModal() {
  const modal = document.getElementById('compare-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function initComparisonSystem() {
  document.addEventListener('click', (e) => {
    const compBtn = e.target.closest('.btn-compare-card[data-compare-id]');
    if (compBtn) {
      e.preventDefault();
      e.stopPropagation();
      const id = compBtn.getAttribute('data-compare-id');
      toggleCompare(id);
    }
  });

  const openBtn = document.getElementById('open-compare-modal-btn');
  const closeBtn = document.getElementById('compare-modal-close');
  const clearBtn = document.getElementById('clear-compare-btn');
  const modal = document.getElementById('compare-modal');

  if (openBtn) openBtn.addEventListener('click', openCompareModal);
  if (closeBtn) closeBtn.addEventListener('click', closeCompareModal);
  if (clearBtn) clearBtn.addEventListener('click', () => {
    setComparisonList([]);
  });
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCompareModal();
    });
  }
}

/* ==========================================================================
   12. PRIVATE VIEWING 1-ON-1 INTERACTIVE CALENDAR MODAL
   ========================================================================== */
function initViewingCalendarModal() {
  const modal = document.getElementById('viewing-calendar-modal');
  const closeBtn = document.getElementById('viewing-modal-close');

  if (!modal) return;

  function openViewingModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setupBookingCalendar();
  }

  function closeViewingModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-open-modal="viewing-calendar"]');
    if (trigger) {
      e.preventDefault();
      openViewingModal();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeViewingModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeViewingModal();
  });

  // Booking Flow State
  let bookingData = {
    format: "VIP Discovery Tour (In-Person)",
    date: null,
    time: "10:00 AM",
    name: "",
    email: "",
    phone: "",
    notes: ""
  };

  // Step 1 Format Choices
  modal.querySelectorAll('.tour-format-option').forEach(opt => {
    opt.addEventListener('click', () => {
      modal.querySelectorAll('.tour-format-option').forEach(o => {
        o.classList.remove('border-[#C8A96A]', 'bg-[#F5EEDB]/40');
        o.classList.add('border-[#E6E2DA]');
      });
      opt.classList.add('border-[#C8A96A]', 'bg-[#F5EEDB]/40');
      opt.classList.remove('border-[#E6E2DA]');
      bookingData.format = opt.getAttribute('data-tour-format');
    });
  });

  const goStep2 = document.getElementById('booking-go-step-2');
  const step1 = document.getElementById('booking-step-1');
  const step2 = document.getElementById('booking-step-2');
  const step3 = document.getElementById('booking-step-3');
  const step4 = document.getElementById('booking-step-4');
  const stepTitle = document.getElementById('booking-step-title');

  if (goStep2) {
    goStep2.addEventListener('click', () => {
      step1.classList.add('hidden');
      step2.classList.remove('hidden');
      if (stepTitle) stepTitle.textContent = "Step 2: Date & Time";
    });
  }

  const backStep1 = document.getElementById('booking-back-step-1');
  if (backStep1) {
    backStep1.addEventListener('click', () => {
      step2.classList.add('hidden');
      step1.classList.remove('hidden');
      if (stepTitle) stepTitle.textContent = "Step 1: Select Format";
    });
  }

  const goStep3 = document.getElementById('booking-go-step-3');
  if (goStep3) {
    goStep3.addEventListener('click', () => {
      step2.classList.add('hidden');
      step3.classList.remove('hidden');
      if (stepTitle) stepTitle.textContent = "Step 3: Investor Information";
    });
  }

  const backStep2 = document.getElementById('booking-back-step-2');
  if (backStep2) {
    backStep2.addEventListener('click', () => {
      step3.classList.add('hidden');
      step2.classList.remove('hidden');
      if (stepTitle) stepTitle.textContent = "Step 2: Date & Time";
    });
  }

  // Time Slots
  modal.querySelectorAll('.time-slot-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      modal.querySelectorAll('.time-slot-btn').forEach(b => {
        b.className = "time-slot-btn py-2 rounded-lg border border-[#E6E2DA] hover:border-[#C8A96A] text-[#64748B] hover:text-[#0F2A43]";
      });
      btn.className = "time-slot-btn py-2 rounded-lg border border-[#C8A96A] bg-[#F5EEDB] font-semibold text-[#0F2A43]";
      bookingData.time = btn.textContent.trim();
    });
  });

  // Step 3 Submission & Step 4 Confirmation
  const submitBtn = document.getElementById('booking-submit-btn');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const nameInput = document.getElementById('booking-guest-name');
      const emailInput = document.getElementById('booking-guest-email');
      const phoneInput = document.getElementById('booking-guest-phone');
      const notesInput = document.getElementById('booking-guest-notes');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !phoneInput.value.trim()) {
        alert("Please provide your Name, Email, and Phone/WhatsApp number.");
        return;
      }

      bookingData.name = nameInput.value.trim();
      bookingData.email = emailInput.value.trim();
      bookingData.phone = phoneInput.value.trim();
      bookingData.notes = notesInput ? notesInput.value.trim() : "";

      // Store lead
      try {
        const leads = JSON.parse(localStorage.getItem('azure_leads') || '[]');
        leads.push({ ...bookingData, timestamp: new Date().toISOString() });
        localStorage.setItem('azure_leads', JSON.stringify(leads));
      } catch (e) {}

      // Update Ticket View
      const ticketRef = document.getElementById('ticket-ref');
      const ticketFormat = document.getElementById('ticket-format');
      const ticketDateTime = document.getElementById('ticket-datetime');
      const ticketCalLink = document.getElementById('ticket-calendar-link');
      const ticketWaConfirm = document.getElementById('ticket-whatsapp-confirm');

      const refCode = "AZ-" + Math.floor(10000 + Math.random() * 90000);
      if (ticketRef) ticketRef.textContent = refCode;
      if (ticketFormat) ticketFormat.textContent = bookingData.format;
      const dateText = bookingData.date || "Thursday, Upcoming";
      if (ticketDateTime) ticketDateTime.textContent = `${dateText} at ${bookingData.time} EST`;

      if (ticketCalLink) {
        const title = encodeURIComponent(`Azure Bay Private Viewing - ${bookingData.format}`);
        const details = encodeURIComponent(`Confirmed viewing reference ${refCode}. Host: Julian De La Torre.`);
        ticketCalLink.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=Azure+Bay+Residences`;
      }

      if (ticketWaConfirm) {
        const waMsg = `Hello Azure Bay, I have reserved a Private Viewing (Ref: ${refCode}) on ${dateText} at ${bookingData.time}. Name: ${bookingData.name}.`;
        ticketWaConfirm.href = `https://wa.me/${BRAND_CONFIG.whatsappRaw}?text=${encodeURIComponent(waMsg)}`;
      }

      step3.classList.add('hidden');
      step4.classList.remove('hidden');
      if (stepTitle) stepTitle.textContent = "Step 4: Confirmed";
    });
  }

  function setupBookingCalendar() {
    const grid = document.getElementById('booking-calendar-grid');
    if (!grid) return;

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = new Date();
    let html = days.map(d => `<span class="font-bold text-[10px] text-[#64748B] uppercase">${d}</span>`).join('');

    // Generate 14 selectable upcoming days
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayNum = d.getDate();
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      const isSelected = i === 2;

      if (isSelected && !bookingData.date) {
        bookingData.date = dayName;
      }

      html += `
        <button type="button" class="cal-day-cell p-2 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
          isSelected 
            ? 'border-[#C8A96A] bg-[#0F2A43] text-white shadow-sm' 
            : 'border-[#E6E2DA] hover:border-[#C8A96A] text-[#0F2A43]'
        }" data-cal-date="${dayName}">
          ${dayNum}
        </button>
      `;
    }

    grid.innerHTML = html;

    grid.querySelectorAll('.cal-day-cell').forEach(cell => {
      cell.addEventListener('click', (e) => {
        grid.querySelectorAll('.cal-day-cell').forEach(c => {
          c.className = "cal-day-cell p-2 rounded-lg border border-[#E6E2DA] hover:border-[#C8A96A] text-[#0F2A43] text-xs font-semibold cursor-pointer transition-all";
        });
        cell.className = "cal-day-cell p-2 rounded-lg border border-[#C8A96A] bg-[#0F2A43] text-white shadow-sm text-xs font-semibold cursor-pointer transition-all";
        bookingData.date = cell.getAttribute('data-cal-date');
      });
    });
  }
}

/* ==========================================================================
   13. GATED BROCHURE DOWNLOAD MODAL
   ========================================================================== */
function initBrochureDownloadModal() {
  const modal = document.getElementById('brochure-download-modal');
  const closeBtn = document.getElementById('brochure-modal-close');
  const form = document.getElementById('brochure-download-form');
  const successState = document.getElementById('brochure-success-state');

  if (!modal) return;

  function openBrochureModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (form) form.classList.remove('hidden');
    if (successState) successState.classList.add('hidden');
  }

  function closeBrochureModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-open-modal="brochure-download"]');
    if (trigger) {
      e.preventDefault();
      openBrochureModal();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeBrochureModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeBrochureModal();
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('brochure-name').value;
      const email = document.getElementById('brochure-email').value;
      const phone = document.getElementById('brochure-phone').value;

      try {
        const leads = JSON.parse(localStorage.getItem('azure_leads') || '[]');
        leads.push({ type: 'brochure_download', name, email, phone, timestamp: new Date().toISOString() });
        localStorage.setItem('azure_leads', JSON.stringify(leads));
      } catch (err) {}

      form.classList.add('hidden');
      if (successState) successState.classList.remove('hidden');

      // Trigger automatic file download simulation
      const link = document.createElement('a');
      link.href = "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=85";
      link.download = "Azure_Bay_Residences_Architectural_Dossier.pdf";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}

/* ==========================================================================
   14. INTERACTIVE MASTERPLAN SECTION (index.html)
   ========================================================================== */
function initMasterplanSection() {
  const container = document.getElementById('masterplan-pins-container');
  const popup = document.getElementById('masterplan-popup-card');
  const popupContent = document.getElementById('masterplan-popup-content');
  const popupClose = document.getElementById('masterplan-popup-close');
  const zoneButtons = document.querySelectorAll('[data-masterplan-zone]');

  if (!container || typeof MASTERPLAN_UNITS === 'undefined') return;

  function renderPins(activeZone = 'all') {
    container.innerHTML = MASTERPLAN_UNITS.map(unit => {
      const isVisible = activeZone === 'all' || unit.zone === activeZone;
      const opacityClass = isVisible ? 'opacity-100 scale-100' : 'opacity-20 scale-75 pointer-events-none';
      const statusColor = unit.status === 'Available' 
        ? 'bg-[#C8A96A] text-[#0F2A43] ring-[#C8A96A]/40' 
        : (unit.status === 'Reserved' ? 'bg-blue-500 text-white ring-blue-500/40' : 'bg-slate-600 text-white ring-white/20');

      return `
        <div class="masterplan-pin absolute transition-all duration-300 ${opacityClass}" style="left: ${unit.x}%; top: ${unit.y}%;" data-unit-id="${unit.id}" data-unit-zone="${unit.zone}" title="${unit.name} (${unit.type})">
          <div class="relative group cursor-pointer">
            <span class="masterplan-pulse ${unit.status === 'Available' ? 'bg-[#C8A96A]/60' : 'bg-blue-400/60'}"></span>
            <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full ${statusColor} ring-4 flex items-center justify-center font-bold text-[10px] sm:text-xs shadow-2xl border-2 border-white transform group-hover:scale-125 transition-transform duration-200">
              ${unit.status === 'Available' ? '★' : (unit.status === 'Reserved' ? '●' : '✓')}
            </div>
            <div class="hidden sm:block absolute left-1/2 -translate-x-1/2 -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-[#0F2A43]/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-lg border border-[#C8A96A]/40 z-30">
              ${unit.name} &bull; ${formatCurrency(unit.price)}
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach click listeners to pins
    container.querySelectorAll('.masterplan-pin').forEach(pin => {
      pin.addEventListener('click', (e) => {
        const id = pin.getAttribute('data-unit-id');
        const property = PROPERTIES.find(p => p.id === id) || DEFAULT_PROPERTIES.find(p => p.id === id);
        if (!property || !popup || !popupContent) return;

        popupContent.innerHTML = `
          <div class="relative h-28 rounded-xl overflow-hidden mb-3 shadow-sm">
            <img src="${property.images[0]}" alt="${property.name}" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0F2A43]/80 via-transparent to-transparent"></div>
            <span class="absolute top-2 left-2 badge-status ${property.status === 'Available' ? 'badge-available' : 'badge-reserved'} text-[10px] font-bold !py-0.5 !px-2 shadow-sm">
              ${property.status}
            </span>
            <span class="absolute bottom-2 left-2 text-white font-serif font-bold text-sm drop-shadow-md">
              ${formatCurrency(property.price)}
            </span>
          </div>
          <h4 class="font-serif font-bold text-base text-[#0F2A43] leading-snug">${property.name}</h4>
          <span class="text-xs text-[#64748B] block mt-0.5">${property.type} &bull; ${property.location}</span>
          
          <div class="flex items-center gap-3 my-2.5 py-2 border-y border-[#E6E2DA] text-[11px] text-[#1F2933]">
            <span><strong>${property.bedrooms}</strong> Beds</span>
            <span>&bull;</span>
            <span><strong>${property.bathrooms}</strong> Baths</span>
            <span>&bull;</span>
            <span><strong>${property.buildingArea}</strong> m² Built</span>
          </div>

          <div class="flex items-center gap-2 mt-3">
            <a href="property.html?id=${property.id}" class="btn-gold !py-1.5 !px-3 text-[11px] font-bold uppercase tracking-wider flex-1 text-center shadow-xs">
              View Estate &rarr;
            </a>
            <button type="button" data-open-modal="viewing-calendar" class="btn-outline-navy !py-1.5 !px-2.5 text-[11px] font-semibold text-[#0F2A43] hover:text-[#C8A96A]">
              Book Tour
            </button>
          </div>
        `;

        // Position popup safely within container bounds
        const rect = pin.getBoundingClientRect();
        const parentRect = container.getBoundingClientRect();
        let left = rect.left - parentRect.left - 140;
        let top = rect.top - parentRect.top - 230;

        if (left < 10) left = 10;
        if (left + 310 > parentRect.width) left = Math.max(10, parentRect.width - 320);
        if (top < 10) top = rect.top - parentRect.top + 35;

        popup.style.left = `${left}px`;
        popup.style.top = `${top}px`;
        popup.classList.remove('hidden');
      });
    });
  }

  // Zone filter buttons
  zoneButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const zone = e.currentTarget.getAttribute('data-masterplan-zone');
      zoneButtons.forEach(b => {
        b.classList.remove('bg-[#C8A96A]', 'text-[#0F2A43]', 'font-bold');
        b.classList.add('bg-white/10', 'text-white/80', 'hover:bg-white/20');
      });
      e.currentTarget.classList.add('bg-[#C8A96A]', 'text-[#0F2A43]', 'font-bold');
      e.currentTarget.classList.remove('bg-white/10', 'text-white/80', 'hover:bg-white/20');
      
      if (popup) popup.classList.add('hidden');
      renderPins(zone);
    });
  });

  // Initial render
  renderPins('all');

  if (popupClose && popup) {
    popupClose.addEventListener('click', () => {
      popup.classList.add('hidden');
    });
  }
}

/* ==========================================================================
   15. 360° VIRTUAL PANORAMIC TOUR VIEWER (property.html)
   ========================================================================== */
function init360TourViewer(property) {
  const viewport = document.getElementById('tour-viewport');
  const panoramaImg = document.getElementById('tour-panorama-img');
  const zoomInBtn = document.getElementById('tour-zoom-in');
  const zoomOutBtn = document.getElementById('tour-zoom-out');
  const resetBtn = document.getElementById('tour-reset');

  if (!viewport || !panoramaImg) return;

  const ROOM_PANORAMAS = {
    terrace: (property && property.images && property.images[0]) || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2400&q=85",
    living: (property && property.images && property.images[1]) || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=85",
    suite: (property && property.images && property.images[2]) || "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2400&q=85"
  };

  let isDragging = false;
  let startX = 0;
  let currentTranslateX = 0;
  let currentScale = 1.0;

  function updateTransform() {
    panoramaImg.style.transform = `scale(${currentScale}) translateX(${currentTranslateX}px)`;
  }

  // Drag Interactions
  viewport.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - currentTranslateX;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  viewport.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    currentTranslateX = e.pageX - startX;
    updateTransform();
  });

  // Touch Interactions
  viewport.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - currentTranslateX;
  }, { passive: true });

  viewport.addEventListener('touchend', () => {
    isDragging = false;
  });

  viewport.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentTranslateX = e.touches[0].pageX - startX;
    updateTransform();
  }, { passive: true });

  // Room Switcher Pills
  document.querySelectorAll('.tour-room-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const room = e.currentTarget.getAttribute('data-tour-room');
      document.querySelectorAll('.tour-room-btn').forEach(b => {
        b.className = "tour-room-btn px-3 py-1.5 rounded-lg font-semibold text-[#64748B] hover:text-[#0F2A43] transition-all";
      });
      e.currentTarget.className = "tour-room-btn px-3 py-1.5 rounded-lg font-semibold bg-[#0F2A43] text-white shadow-sm transition-all";
      
      if (ROOM_PANORAMAS[room]) {
        panoramaImg.src = ROOM_PANORAMAS[room];
        currentTranslateX = 0;
        currentScale = 1.0;
        updateTransform();
      }
    });
  });

  // Zoom Controls
  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
      if (currentScale < 1.6) {
        currentScale += 0.2;
        updateTransform();
      }
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
      if (currentScale > 0.8) {
        currentScale -= 0.2;
        updateTransform();
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      currentScale = 1.0;
      currentTranslateX = 0;
      updateTransform();
    });
  }
}

/* ==========================================================================
   ABOUT PAGE: INTERACTIVE CHRONOLOGY & SIGNATURE SPACES CAROUSEL
   ========================================================================== */
function initAboutPage() {
  if (window.__aboutPageInitialized) return;
  window.__aboutPageInitialized = true;

  initMilestonesInteractive();
  initAboutCarousel();
}

/**
 * Interactive Milestones Chronology Scrubber
 */
function initMilestonesInteractive() {
  const stageCard = document.getElementById('milestone-stage-card');
  const navTrack = document.getElementById('milestones-nav-track');
  if (!stageCard || !navTrack) return;

  const progressBar = document.getElementById('milestone-progress-bar');
  const navBtns = navTrack.querySelectorAll('.milestone-nav-btn');
  const yearEl = document.getElementById('milestone-card-year');
  const statusEl = document.getElementById('milestone-card-status');
  const titleEl = document.getElementById('milestone-card-title');
  const subtitleEl = document.getElementById('milestone-card-subtitle');
  const descEl = document.getElementById('milestone-card-desc');
  const metricsEl = document.getElementById('milestone-card-metrics');
  const quoteEl = document.getElementById('milestone-card-quote');
  const authorEl = document.getElementById('milestone-card-author');
  const imgEl = document.getElementById('milestone-card-img');
  const badgeEl = document.getElementById('milestone-card-badge');
  const prevBtn = document.getElementById('milestone-prev-btn');
  const nextBtn = document.getElementById('milestone-next-btn');
  const indicatorEl = document.getElementById('milestone-index-indicator');

  const MILESTONES = [
    {
      year: 'ERA 2018',
      yearShort: '2018',
      status: '100% Commissioned & Cleared',
      statusColor: 'emerald',
      title: 'Land Acquisition & Master Plan',
      subtitle: '450-Acre Coastal Bluffs & Topographical Sovereignty',
      desc: 'Azure Bay secured exclusive perpetual development rights across 450 pristine coastal hectares, undertaking 18 months of intensive geological, maritime wave dynamics, and environmental conservation audits to guarantee a zero-erosion footprint.',
      metrics: [
        { label: 'Reserve Footprint', val: '450 Hectares', sub: 'Zero-Erosion Zone', subColor: 'text-emerald-400' },
        { label: 'Survey Period', val: '18 Months', sub: 'Wave & Soil Dynamics', subColor: 'text-[#C8A96A]' },
        { label: 'Bedrock Quality', val: 'Basalt Shelf', sub: 'Centuries Stability', subColor: 'text-blue-400' }
      ],
      quote: '"Our initial geological surveys ensured every clifftop foundation rests directly on virgin granite and basalt shelf, creating structures designed to outlast centuries."',
      author: '— Julian De La Torre, Founder & Managing Partner',
      img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      badge: 'Historical Blueprint Archive'
    },
    {
      year: 'ERA 2020',
      yearShort: '2020',
      status: 'Phase 1 Handover Complete',
      statusColor: 'emerald',
      title: 'Phase 1 Handover: The Ridge Residences',
      subtitle: '35 Clifftop Estates Delivered with Foreign Freehold Title Deeds',
      desc: 'Despite global supply headwinds, Phase 1 was delivered 2 months ahead of schedule. 35 international buyers received turnkey keys and sovereign freehold strata titles, setting an unprecedented benchmark for Mediterranean development fidelity.',
      metrics: [
        { label: 'Residences Handed', val: '35 Estates', sub: '100% Occupancy', subColor: 'text-emerald-400' },
        { label: 'Title Issuance', val: '14 Days', sub: 'Guaranteed Strata Deed', subColor: 'text-[#C8A96A]' },
        { label: 'Capital Growth', val: '+42%', sub: 'Since Groundbreaking', subColor: 'text-blue-400' }
      ],
      quote: '"Delivering ahead of contract during worldwide lockdown proved that our direct procurement supply chain and localized artisan ateliers are bulletproof."',
      author: '— Elena Rostova, VP of Development & Delivery',
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      badge: 'Phase 1 Ribbon Cutting Record'
    },
    {
      year: 'ERA 2022',
      yearShort: '2022',
      status: 'Full Maritime Clearance',
      statusColor: 'blue',
      title: 'Deepwater Marina Basin & Port Customs Hub',
      subtitle: '84 Superyacht Berths with Direct Mediterranean Channel Depth',
      desc: 'Azure Bay dredged a natural 6.8-meter deepwater channel and engineered an outer protective breakwater with interlocking basalt tetrahedrons. Equipped with private port-of-entry customs and high-speed shore power.',
      metrics: [
        { label: 'Superyacht Slips', val: '84 Berths', sub: 'Up to 75m Mega-yachts', subColor: 'text-blue-400' },
        { label: 'Channel Depth', val: '6.8 Meters', sub: 'Low-Tide Navigational Clearance', subColor: 'text-emerald-400' },
        { label: 'Fuel & Shore Grid', val: '400A 3-Phase', sub: 'High-Capacity Bunkering', subColor: 'text-[#C8A96A]' }
      ],
      quote: '"Owners can now sail directly from Monaco or Ibiza and dock at their private villa slipway with sovereign customs clearance done in cabin."',
      author: '— Capt. Matteo Vane, Director of Maritime Infrastructure',
      img: 'https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?auto=format&fit=crop&w=1200&q=80',
      badge: 'Maritime Authority Sovereign License'
    },
    {
      year: 'ERA 2024',
      yearShort: '2024',
      status: 'Net-Positive Operational',
      statusColor: 'emerald',
      title: 'Clean Microgrid & Terminal AZ-01 Helipad Concourse',
      subtitle: '4.2 MW Solar + 12 MWh Battery Array & ICAO Aviation Concourse',
      desc: 'Azure Bay achieved true energy self-sufficiency with a silent 4.2 MW solar microgrid and industrial battery storage, shielding estates from grid outages. Concurrently, Terminal AZ-01 was certified for twin-engine helicopter night ops.',
      metrics: [
        { label: 'Microgrid Solar', val: '4.2 Megawatts', sub: '100% Clean Energy', subColor: 'text-emerald-400' },
        { label: 'Battery Reserve', val: '12 MWh', sub: '72-Hr Continuous Autonomy', subColor: 'text-[#C8A96A]' },
        { label: 'Heli Transit', val: '6 Minutes', sub: 'Direct to Airport Hub', subColor: 'text-blue-400' }
      ],
      quote: '"Sustainability at Azure Bay is not a marketing checkbox—it is institutional energy independence, military-grade redundancy, and zero sound pollution."',
      author: '— Dr. Hiroshi Tanaka, Chief Sustainability Officer',
      img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      badge: 'ICAO & LEED Platinum Operational Stamp'
    },
    {
      year: 'ERA 2026+',
      yearShort: '2026+',
      status: 'Pre-Allocation Open',
      statusColor: 'amber',
      title: 'Master Horizon Expansion: Private Island & Wellness Citadel',
      subtitle: 'Next-Generation Biophilic Architecture & Fractional Yield Protocols',
      desc: 'The final masterplan frontier introduces 18 ultra-exclusive offshore water sanctuaries, a 5,000 sqm subterranean longevity medical spa, and private family office sovereign vaulting suites.',
      metrics: [
        { label: 'Offshore Villas', val: '18 Sanctuaries', sub: 'Over-Water Architecture', subColor: 'text-amber-400' },
        { label: 'Longevity Spa', val: '5,000 sqm', sub: 'Cellular Diagnostics Lab', subColor: 'text-[#C8A96A]' },
        { label: 'Projected Yield', val: '8.8% Net ROI', sub: 'Guaranteed Reserve Pool', subColor: 'text-emerald-400' }
      ],
      quote: '"The Horizon expansion encapsulates everything we have learned over eight years—combining extreme privacy, restorative medicine, and generational capital stewardship."',
      author: '— Julian De La Torre, Founder & Managing Partner',
      img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      badge: '2026 Horizon Master Blueprints'
    }
  ];

  let currentIdx = 0;

  function renderMilestone(idx, animate = true) {
    if (idx < 0) idx = 0;
    if (idx >= MILESTONES.length) idx = MILESTONES.length - 1;
    currentIdx = idx;
    const m = MILESTONES[idx];

    // Update navigation scrubber buttons styling
    navBtns.forEach((btn, i) => {
      const yearSpan = btn.querySelector('.font-serif');
      const dotSpan = btn.querySelector('span:last-child');
      if (i === idx) {
        btn.className = 'milestone-nav-btn active group p-3.5 rounded-2xl bg-[#0F2A43] border border-[#C8A96A] text-left transition-all shadow-lg text-white cursor-pointer ring-1 ring-[#C8A96A]/50 scale-[1.02]';
        if (yearSpan) yearSpan.className = 'font-serif text-lg font-bold text-[#C8A96A]';
        if (dotSpan) dotSpan.className = 'w-2.5 h-2.5 rounded-full bg-[#C8A96A] shadow-[0_0_8px_#C8A96A]';
      } else {
        btn.className = 'milestone-nav-btn group p-3.5 rounded-2xl bg-white/5 border border-white/10 text-left transition-all hover:bg-white/10 hover:border-white/20 text-white/80 cursor-pointer';
        if (yearSpan) yearSpan.className = 'font-serif text-lg font-bold text-white/90 group-hover:text-[#C8A96A]';
        if (dotSpan) {
          const colors = ['bg-[#C8A96A]', 'bg-emerald-400', 'bg-blue-400', 'bg-emerald-400', 'bg-amber-400'];
          dotSpan.className = `w-2.5 h-2.5 rounded-full ${colors[i] || 'bg-white/50'}`;
        }
      }
    });

    // Update horizontal progress bar
    if (progressBar) {
      const pct = (idx / (MILESTONES.length - 1)) * 100;
      progressBar.style.width = `${pct}%`;
    }

    // Content fade transition
    if (animate) {
      stageCard.style.opacity = '0.35';
      stageCard.style.transform = 'translateY(6px)';
    }

    setTimeout(() => {
      if (yearEl) yearEl.textContent = m.year;
      
      if (statusEl) {
        let badgeBg = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
        let dotBg = 'bg-emerald-400';
        if (m.statusColor === 'blue') {
          badgeBg = 'bg-blue-500/20 text-blue-300 border-blue-500/30';
          dotBg = 'bg-blue-400';
        } else if (m.statusColor === 'amber') {
          badgeBg = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
          dotBg = 'bg-amber-400';
        }
        statusEl.className = `text-xs font-bold ${badgeBg} border px-3 py-1 rounded-full flex items-center gap-1.5`;
        statusEl.innerHTML = `<span class="w-1.5 h-1.5 rounded-full ${dotBg} animate-pulse"></span><span>${m.status}</span>`;
      }

      if (titleEl) titleEl.textContent = m.title;
      if (subtitleEl) subtitleEl.textContent = m.subtitle;
      if (descEl) descEl.textContent = m.desc;

      if (metricsEl && m.metrics) {
        metricsEl.innerHTML = m.metrics.map(met => `
          <div class="bg-black/30 rounded-2xl p-3.5 border border-white/10 hover:border-[#C8A96A]/40 transition-colors">
            <span class="text-[10px] text-white/50 uppercase font-semibold block">${met.label}</span>
            <strong class="font-serif text-base sm:text-lg text-white font-bold block mt-0.5">${met.val}</strong>
            <span class="text-[10px] ${met.subColor}">${met.sub}</span>
          </div>
        `).join('');
      }

      if (quoteEl) quoteEl.textContent = m.quote;
      if (authorEl) authorEl.textContent = m.author;
      if (imgEl) {
        imgEl.src = m.img;
        imgEl.alt = m.title;
      }
      if (badgeEl) badgeEl.textContent = m.badge;
      if (indicatorEl) indicatorEl.textContent = `Era ${idx + 1} of ${MILESTONES.length}`;

      if (animate) {
        stageCard.style.opacity = '1';
        stageCard.style.transform = 'translateY(0)';
      }
    }, animate ? 140 : 0);
  }

  // Button clicks on scrubber
  navBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-milestone-idx'), 10);
      if (!isNaN(idx)) renderMilestone(idx);
    });
  });

  // Prev / Next button actions
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const target = currentIdx > 0 ? currentIdx - 1 : MILESTONES.length - 1;
      renderMilestone(target);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const target = currentIdx < MILESTONES.length - 1 ? currentIdx + 1 : 0;
      renderMilestone(target);
    });
  }

  // Keyboard navigation when user is focused on the milestones section
  const sectionKeyHandler = (e) => {
    const rect = stageCard.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;

    if (e.key === 'ArrowLeft') {
      const target = currentIdx > 0 ? currentIdx - 1 : MILESTONES.length - 1;
      renderMilestone(target);
    } else if (e.key === 'ArrowRight') {
      const target = currentIdx < MILESTONES.length - 1 ? currentIdx + 1 : 0;
      renderMilestone(target);
    }
  };
  window.addEventListener('keydown', sectionKeyHandler);

  // Initial render
  renderMilestone(0, false);
}

/**
 * The Living Masterpiece - Signature Spaces Animated Carousel
 */
function initAboutCarousel() {
  const viewport = document.getElementById('about-carousel-viewport');
  const track = document.getElementById('about-carousel-track');
  const prevBtn = document.getElementById('about-carousel-prev');
  const nextBtn = document.getElementById('about-carousel-next');
  const currentEl = document.getElementById('about-carousel-current');
  const totalEl = document.getElementById('about-carousel-total');
  const dotsContainer = document.getElementById('about-carousel-dots');

  if (!viewport || !track) return;

  const slides = track.querySelectorAll('.about-carousel-slide');
  const totalSlides = slides.length;
  if (totalSlides === 0) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  const AUTOPLAY_DELAY = 5000;

  if (totalEl) totalEl.textContent = String(totalSlides).padStart(2, '0');

  // Build dots navigation
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `carousel-dot-btn transition-all duration-300 cursor-pointer ${
        i === 0 ? 'w-8 h-2 rounded-full bg-[#C8A96A]' : 'w-2 h-2 rounded-full bg-white/30 hover:bg-white/60'
      }`;
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(i);
        restartAutoplay();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots(idx) {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.carousel-dot-btn');
    dots.forEach((dot, i) => {
      if (i === idx) {
        dot.className = 'carousel-dot-btn transition-all duration-300 cursor-pointer w-8 h-2 rounded-full bg-[#C8A96A]';
      } else {
        dot.className = 'carousel-dot-btn transition-all duration-300 cursor-pointer w-2 h-2 rounded-full bg-white/30 hover:bg-white/60';
      }
    });
  }

  function goToSlide(idx) {
    if (idx < 0) idx = totalSlides - 1;
    if (idx >= totalSlides) idx = 0;
    currentIndex = idx;

    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    if (currentEl) currentEl.textContent = String(currentIndex + 1).padStart(2, '0');
    updateDots(currentIndex);
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      restartAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      restartAutoplay();
    });
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Hover Pause & Resume
  viewport.addEventListener('mouseenter', stopAutoplay);
  viewport.addEventListener('mouseleave', startAutoplay);

  // Mobile Touch Gestures
  let touchStartX = 0;
  let touchEndX = 0;

  viewport.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoplay();
  }, { passive: true });

  viewport.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    startAutoplay();
  }, { passive: true });

  // Start Autoplay Engine
  startAutoplay();
}

