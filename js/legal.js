(function () {
  function initLegalLang() {
    const langToggleBtn = document.getElementById('langToggleBtn');
    const homeLink = document.getElementById('homeLink');
    const blocks = document.querySelectorAll('.lang-block');

    const pageTitles = {
      terms: {
        en: 'Prothia | Terms of Service',
        es: 'Prothia | Términos y Condiciones'
      },
      privacy: {
        en: 'Prothia | Privacy Policy',
        es: 'Prothia | Política de Privacidad'
      },
      accessibility: {
        en: 'Prothia | Accessibility',
        es: 'Prothia | Declaración de Accesibilidad'
      },
      consent: {
        en: 'Prothia | Informed Consent',
        es: 'Prothia | Consentimiento Informado'
      },
      security: {
        en: 'Prothia | Medical Data Security',
        es: 'Prothia | Seguridad de Datos Médicos'
      }
    };

    const pageKey = document.body.getAttribute('data-page') || '';

    function getSavedLang() {
      try {
        const saved = localStorage.getItem('prothia_lang');
        if (saved === 'es' || saved === 'en') {
          return saved;
        }
      } catch (e) {}
      return 'en';
    }

    let currentLang = getSavedLang();

    function applyLanguage(lang, persist = true) {
      currentLang = lang;
      document.documentElement.lang = lang;

      if (persist) {
        try {
          localStorage.setItem('prothia_lang', lang);
        } catch (e) {}
      }

      blocks.forEach(block => {
        const blockLang = block.getAttribute('data-lang');
        if (blockLang === lang) {
          block.classList.add('active');
        } else {
          block.classList.remove('active');
        }
      });

      if (langToggleBtn) {
        const badgeEn = langToggleBtn.querySelector('.lang-en');
        const badgeEs = langToggleBtn.querySelector('.lang-es');
        if (badgeEn) badgeEn.classList.toggle('active', lang === 'en');
        if (badgeEs) badgeEs.classList.toggle('active', lang === 'es');
        langToggleBtn.setAttribute(
          'aria-label',
          lang === 'en' ? 'Switch language to Spanish' : 'Cambiar idioma a Inglés'
        );
      }

      if (homeLink) {
        homeLink.textContent = lang === 'en' ? '← Back to Home' : '← Volver al Inicio';
      }

      if (pageKey && pageTitles[pageKey] && pageTitles[pageKey][lang]) {
        document.title = pageTitles[pageKey][lang];
      }
    }

    if (langToggleBtn) {
      langToggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const nextLang = currentLang === 'en' ? 'es' : 'en';
        applyLanguage(nextLang, true);
      });
    }

    applyLanguage(currentLang, false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLegalLang);
  } else {
    initLegalLang();
  }
})();

