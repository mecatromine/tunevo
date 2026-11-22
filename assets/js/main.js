/* ==========================================================================
   TUNEVO STUDIO & CUBEFIT INTERACTIVE ENGINE
   Handles: EN/FR i18n, Mobile Nav, GDPR Consent Banner, Lightbox, Forms
   ========================================================================== */
(function () {
  'use strict';

  var STORAGE_LANG_KEY = 'tunevo_lang';
  var STORAGE_CONSENT_KEY = 'tunevo_cookie_consent';

  function detectInitialLang() {
    var params = new URLSearchParams(window.location.search);
    var q = params.get('lang');
    if (q === 'fr' || q === 'en') return q;
    try {
      var saved = localStorage.getItem(STORAGE_LANG_KEY);
      if (saved === 'fr' || saved === 'en') return saved;
    } catch (_) {}
    var navLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    return navLang.indexOf('fr') === 0 ? 'fr' : 'en';
  }

  function applyLanguage(lang) {
    var safeLang = lang === 'fr' ? 'fr' : 'en';
    document.documentElement.setAttribute('data-lang', safeLang);
    document.documentElement.setAttribute('lang', safeLang);

    try {
      localStorage.setItem(STORAGE_LANG_KEY, safeLang);
    } catch (_) {}

    document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-set-lang') === safeLang);
      btn.setAttribute('aria-pressed', btn.getAttribute('data-set-lang') === safeLang ? 'true' : 'false');
    });

    document.querySelectorAll('[data-i18n-en]').forEach(function (el) {
      var text = safeLang === 'fr'
        ? el.getAttribute('data-i18n-fr')
        : el.getAttribute('data-i18n-en');
      if (text !== null) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.setAttribute('placeholder', text);
        } else {
          el.textContent = text;
        }
      }
    });
  }

  function initLanguageSwitcher() {
    applyLanguage(detectInitialLang());
    document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLanguage(btn.getAttribute('data-set-lang'));
      });
    });
  }

  function initStickyHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    function update() {
      header.classList.toggle('scrolled', window.scrollY > 18);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  function initMobileMenu() {
    var btn = document.getElementById('mobileMenuBtn');
    var drawer = document.getElementById('mobileDrawer');
    if (!btn || !drawer) return;

    btn.addEventListener('click', function () {
      var open = drawer.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        drawer.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function initLightbox() {
    var lightbox = document.getElementById('imageLightbox');
    if (!lightbox) return;
    var imgEl = lightbox.querySelector('img');
    var closeBtn = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('[data-lightbox-src]').forEach(function (card) {
      card.addEventListener('click', function () {
        imgEl.src = card.getAttribute('data-lightbox-src');
        imgEl.alt = card.getAttribute('data-lightbox-alt') || 'CubeFit preview';
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });

    function close() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
    }

    if (closeBtn) closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) close();
    });
  }

  function getConsentState() {
    try {
      var raw = localStorage.getItem(STORAGE_CONSENT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  function saveConsentState(state) {
    try {
      localStorage.setItem(STORAGE_CONSENT_KEY, JSON.stringify({
        essential: true,
        analytics: Boolean(state.analytics),
        marketing: Boolean(state.marketing),
        updatedAt: new Date().toISOString()
      }));
    } catch (_) {}
  }

  function initCookieBanner() {
    var banner = document.getElementById('cookieBanner');
    var analyticsToggle = document.getElementById('gdprAnalyticsToggle');
    var marketingToggle = document.getElementById('gdprMarketingToggle');
    var gdprSaveBtn = document.getElementById('gdprSaveBtn');
    var gdprStatus = document.getElementById('gdprSaveStatus');

    var current = getConsentState();
    if (banner && !current) {
      banner.classList.add('visible');
    }

    if (current) {
      if (analyticsToggle) analyticsToggle.checked = Boolean(current.analytics);
      if (marketingToggle) marketingToggle.checked = Boolean(current.marketing);
    }

    document.querySelectorAll('[data-cookie-action]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var action = btn.getAttribute('data-cookie-action');
        if (action === 'accept-all') {
          saveConsentState({ analytics: true, marketing: true });
        } else if (action === 'reject-optional') {
          saveConsentState({ analytics: false, marketing: false });
        }
        if (banner) banner.classList.remove('visible');
        var updated = getConsentState();
        if (analyticsToggle && updated) analyticsToggle.checked = updated.analytics;
        if (marketingToggle && updated) marketingToggle.checked = updated.marketing;
      });
    });

    document.querySelectorAll('[data-open-cookie-banner]').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        if (banner) banner.classList.add('visible');
      });
    });

    if (gdprSaveBtn) {
      gdprSaveBtn.addEventListener('click', function () {
        saveConsentState({
          analytics: analyticsToggle ? analyticsToggle.checked : false,
          marketing: marketingToggle ? marketingToggle.checked : false
        });
        if (banner) banner.classList.remove('visible');
        if (gdprStatus) gdprStatus.classList.add('visible');
      });
    }
  }

  function initStaticForms() {
    var supportForm = document.getElementById('supportForm');
    if (supportForm) {
      supportForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = (document.getElementById('supName') || {}).value || '';
        var email = (document.getElementById('supEmail') || {}).value || '';
        var topic = (document.getElementById('supTopic') || {}).value || 'CubeFit Support';
        var device = (document.getElementById('supDevice') || {}).value || 'Not specified';
        var message = (document.getElementById('supMessage') || {}).value || '';

        var subject = encodeURIComponent('[CubeFit Support] ' + topic + ' - ' + name);
        var body = encodeURIComponent(
          'Player Name: ' + name + '\n' +
          'Reply Email: ' + email + '\n' +
          'Topic: ' + topic + '\n' +
          'Device / OS / Version: ' + device + '\n\n' +
          message
        );

        var status = document.getElementById('supportStatus');
        if (status) status.classList.add('visible');
        window.location.href = 'mailto:tunevo.game@gmail.com?subject=' + subject + '&body=' + body;
      });
    }

    var deletionForm = document.getElementById('deletionForm');
    if (deletionForm) {
      deletionForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var email = (document.getElementById('delEmail') || {}).value || '';
        var platform = (document.getElementById('delPlatform') || {}).value || '';
        var adId = (document.getElementById('delAdId') || {}).value || 'Not provided';
        var scope = (document.getElementById('delScope') || {}).value || 'Full Erasure (GDPR Art. 17)';
        var notes = (document.getElementById('delNotes') || {}).value || '';

        var subject = encodeURIComponent('[GDPR / Data Deletion Request] CubeFit - ' + platform);
        var body = encodeURIComponent(
          'Contact Email: ' + email + '\n' +
          'Platform: ' + platform + '\n' +
          'App: CubeFit (com.tunevo.cubefit)\n' +
          'Advertising ID (IDFA / GAID): ' + adId + '\n' +
          'Request Scope: ' + scope + '\n\n' +
          'Additional Details:\n' + notes
        );

        var status = document.getElementById('deletionStatus');
        if (status) status.classList.add('visible');
        window.location.href = 'mailto:privacy@tunevo.si?subject=' + subject + '&body=' + body;
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initLanguageSwitcher();
    initStickyHeader();
    initMobileMenu();
    initLightbox();
    initCookieBanner();
    initStaticForms();
  });
})();
