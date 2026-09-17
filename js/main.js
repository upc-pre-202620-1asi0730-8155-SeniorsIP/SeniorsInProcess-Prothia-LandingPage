document.addEventListener('DOMContentLoaded', () => {
  const topbar = document.getElementById('topbar');
  if (topbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        topbar.classList.add('scrolled');
      } else {
        topbar.classList.remove('scrolled');
      }
    });
  }

  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  const btnRegisterList = document.querySelectorAll('.btn-register-action');
  btnRegisterList.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
    });
  });

  const btnDemoList = document.querySelectorAll('.btn-trigger-demo');
  const modalDemo = document.getElementById('modalDemo');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const toastSuccess = document.getElementById('toastSuccess');
  const demoForm = document.getElementById('demoForm');

  btnDemoList.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modalDemo) modalDemo.classList.add('active');
    });
  });

  if (btnCloseModal && modalDemo) {
    btnCloseModal.addEventListener('click', () => {
      modalDemo.classList.remove('active');
    });
  }

  if (modalDemo) {
    modalDemo.addEventListener('click', (e) => {
      if (e.target === modalDemo) {
        modalDemo.classList.remove('active');
      }
    });
  }

  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      demoForm.style.display = 'none';
      if (toastSuccess) toastSuccess.style.display = 'block';
      setTimeout(() => {
        if (modalDemo) modalDemo.classList.remove('active');
        setTimeout(() => {
          demoForm.style.display = 'flex';
          if (toastSuccess) toastSuccess.style.display = 'none';
          demoForm.reset();
        }, 400);
      }, 2500);
    });
  }

  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  const statsSection = document.getElementById('statsSection');
  if (statsSection && statNumbers.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          animatedStats = true;
          statNumbers.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'), 10);
            const duration = 1600;
            const startTime = performance.now();

            function updateCount(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);

              const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
              const currentVal = Math.floor(easeProgress * target);
              el.textContent = currentVal;

              if (progress < 1) {
                requestAnimationFrame(updateCount);
              } else {
                el.textContent = target;
              }
            }

            requestAnimationFrame(updateCount);
          });
        }
      });
    }, { threshold: 0.25 });

    observer.observe(statsSection);
  }

  const solutionTabs = document.querySelectorAll('.solutions-tab-btn');
  const solutionPanels = document.querySelectorAll('.solution-tab-panel');

  if (solutionTabs.length > 0 && solutionPanels.length > 0) {
    solutionTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        solutionTabs.forEach(tab => {
          tab.classList.remove('active');
          tab.setAttribute('aria-selected', 'false');
        });

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        solutionPanels.forEach(panel => {
          panel.classList.remove('active');
        });

        const activePanel = document.getElementById(`panel-${targetTab}`);
        if (activePanel) {
          activePanel.classList.add('active');
        }
      });
    });
  }

  const btnPlayVideo = document.getElementById('btnPlayVideo');
  if (btnPlayVideo) {
    btnPlayVideo.addEventListener('click', () => {
      if (modalDemo) {
        modalDemo.classList.add('active');
      }
    });
  }

  const btnPlayTeamVideo = document.getElementById('btnPlayTeamVideo');
  if (btnPlayTeamVideo) {
    btnPlayTeamVideo.addEventListener('click', () => {
      if (modalDemo) {
        modalDemo.classList.add('active');
      }
    });
  }

  let currentLang = 'en';

  const billingSwitch = document.getElementById('billingSwitch');
  const optMonthly = document.getElementById('optMonthly');
  const optAnnual = document.getElementById('optAnnual');
  const priceClinics = document.getElementById('priceClinics');
  const noteClinics = document.getElementById('noteClinics');
  const priceOrtho = document.getElementById('priceOrtho');
  const noteOrtho = document.getElementById('noteOrtho');
  let isAnnual = true;

  function updatePricing() {
    if (billingSwitch) {
      billingSwitch.classList.toggle('active', isAnnual);
      billingSwitch.setAttribute('aria-checked', isAnnual.toString());
    }
    if (optAnnual) optAnnual.classList.toggle('active', isAnnual);
    if (optMonthly) optMonthly.classList.toggle('active', !isAnnual);

    const t = (window.prothiaTranslations && window.prothiaTranslations[currentLang]) ? window.prothiaTranslations[currentLang] : null;

    if (isAnnual) {
      if (priceClinics) priceClinics.textContent = '119';
      if (noteClinics) noteClinics.textContent = t ? t.plan2NoteAnnual : (currentLang === 'en' ? 'Billed annually ($1,428/yr)' : 'Facturado anualmente ($1,428/año)');
      if (priceOrtho) priceOrtho.textContent = '149';
      if (noteOrtho) noteOrtho.textContent = t ? t.plan3NoteAnnual : (currentLang === 'en' ? 'Billed annually ($1,788/yr)' : 'Facturado anualmente ($1,788/año)');
    } else {
      if (priceClinics) priceClinics.textContent = '149';
      if (noteClinics) noteClinics.textContent = t ? t.plan2NoteMonthly : (currentLang === 'en' ? 'Recurring monthly billing' : 'Facturación mensual recurrente');
      if (priceOrtho) priceOrtho.textContent = '189';
      if (noteOrtho) noteOrtho.textContent = t ? t.plan3NoteMonthly : (currentLang === 'en' ? 'Recurring monthly billing' : 'Facturación mensual recurrente');
    }
  }

  function setLanguage(lang, persist = true) {
    if (!window.prothiaTranslations || !window.prothiaTranslations[lang]) return;
    currentLang = lang;
    if (persist) {
      try {
        localStorage.setItem('prothia_lang', lang);
      } catch (e) {
      }
    }
    document.documentElement.lang = lang;

    const t = window.prothiaTranslations[lang];

    if (t.pageTitle) {
      document.title = t.pageTitle;
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', t.pageTitle);
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitle) twitterTitle.setAttribute('content', t.pageTitle);
    }
    if (t.pageDescription) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', t.pageDescription);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', t.pageDescription);
      const twitterDesc = document.querySelector('meta[name="twitter:description"]');
      if (twitterDesc) twitterDesc.setAttribute('content', t.pageDescription);
    }
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && t.pageKeywords) metaKeywords.setAttribute('content', t.pageKeywords);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        el.textContent = t[key];
      }
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (t[key] !== undefined) {
        el.innerHTML = t[key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) {
        el.setAttribute('placeholder', t[key]);
      }
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      if (t[key] !== undefined) {
        el.setAttribute('aria-label', t[key]);
      }
    });

    document.querySelectorAll('.lang-selector-btn').forEach(btn => {
      const badgeEn = btn.querySelector('.lang-en');
      const badgeEs = btn.querySelector('.lang-es');
      if (badgeEn && badgeEs) {
        badgeEn.classList.toggle('active', lang === 'en');
        badgeEs.classList.toggle('active', lang === 'es');
      }
      btn.setAttribute('aria-label', lang === 'en' ? 'Switch language to Spanish' : 'Cambiar idioma a Inglés');
    });

    updatePricing();
  }

  if (billingSwitch) {
    const togglePricing = () => {
      isAnnual = !isAnnual;
      updatePricing();
    };

    billingSwitch.addEventListener('click', togglePricing);
    if (optMonthly) optMonthly.addEventListener('click', () => { if (isAnnual) togglePricing(); });
    if (optAnnual) optAnnual.addEventListener('click', () => { if (!isAnnual) togglePricing(); });
  }

  const langToggleButtons = document.querySelectorAll('.lang-selector-btn');
  langToggleButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const nextLang = currentLang === 'en' ? 'es' : 'en';
      setLanguage(nextLang, true);
    });
  });

  let initialLang = 'en';
  try {
    const saved = localStorage.getItem('prothia_lang');
    if (saved === 'es' || saved === 'en') {
      initialLang = saved;
    }
  } catch (e) {
    initialLang = 'en';
  }
  setLanguage(initialLang, false);

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question-btn');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  const mainContactForm = document.getElementById('mainContactForm');
  const contactSuccessBox = document.getElementById('contactSuccessBox');

  if (mainContactForm) {
    mainContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      mainContactForm.style.display = 'none';
      if (contactSuccessBox) {
        contactSuccessBox.classList.add('active');
      }

      setTimeout(() => {
        mainContactForm.reset();
        mainContactForm.style.display = 'flex';
        if (contactSuccessBox) {
          contactSuccessBox.classList.remove('active');
        }
      }, 5000);
    });
  }

  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const newsletterMsg = document.getElementById('newsletterMsg');
  const subscribedEmails = new Set();

  if (newsletterForm && newsletterEmail && newsletterMsg) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterEmail.value.trim().toLowerCase();

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        newsletterMsg.textContent = currentLang === 'en'
          ? 'Please enter a valid email address.'
          : 'Por favor, ingresa un correo electrónico válido.';
        newsletterMsg.className = 'newsletter-message error';
        return;
      }

      if (subscribedEmails.has(email)) {
        newsletterMsg.textContent = currentLang === 'en'
          ? 'This email is already subscribed to our newsletter.'
          : 'Este correo electrónico ya se encuentra suscrito a nuestro boletín.';
        newsletterMsg.className = 'newsletter-message error';
        return;
      }

      subscribedEmails.add(email);
      newsletterMsg.textContent = currentLang === 'en'
        ? 'You have successfully subscribed to the Prothia newsletter!'
        : '¡Te has suscrito exitosamente al boletín de Prothia!';
      newsletterMsg.className = 'newsletter-message success';
      newsletterEmail.value = '';

      setTimeout(() => {
        newsletterMsg.textContent = '';
        newsletterMsg.className = 'newsletter-message';
      }, 4000);
    });
  }
});
