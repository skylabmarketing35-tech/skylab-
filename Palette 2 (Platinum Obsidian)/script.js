/* ============================================================
   SKY-LAB ANALYTICAL LABORATORY — script.js
   PALETTE: MIDNIGHT SAPPHIRE
   All behavior wrapped in IIFE with 'use strict'
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     UTILITIES
  ---------------------------------------------------------- */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.body.style.overflowX = 'hidden';
  document.documentElement.style.overflowX = 'hidden';

  /* ----------------------------------------------------------
     1. PRELOADER
  ---------------------------------------------------------- */
  function initPreloader() {
    const preloader = $('#preloader');
    if (!preloader) return;

    const finish = () => {
      preloader.classList.add('hidden');
      setTimeout(() => {
        preloader.style.display = 'none';
        initObservers();
        initAutoScrollers();
        initGalleryReveal();
      }, 700);
    };

    if (document.readyState === 'complete') {
      setTimeout(finish, 2200);
    } else {
      window.addEventListener('load', () => setTimeout(finish, 2200));
    }
  }

  /* ----------------------------------------------------------
     2. NAVBAR & MOBILE MENU
  ---------------------------------------------------------- */
  function initNavbar() {
    const navbar    = $('#navbar');
    const hamburger = $('#hamburger');
    const mobileMenu= $('#mobileMenu');
    const mmClose   = $('#mmClose');
    const mmBackdrop= $('.mm-backdrop', mobileMenu);
    const mmLinks   = $$('.mm-link', mobileMenu);
    const mmCta     = $('.mm-cta', mobileMenu);

    if (!navbar) return;

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY || window.pageYOffset;
      if (y > 60) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');

      if (lastScroll !== y) {
        updateActiveNav();
        lastScroll = y;
      }
    }, { passive: true });

    function openMobile() {
      if (!mobileMenu) return;
      mobileMenu.classList.add('active');
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
      document.body.style.overflow = 'hidden';
    }
    function closeMobile() {
      if (!mobileMenu) return;
      mobileMenu.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
    }

    if (hamburger) {
      hamburger.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) closeMobile();
        else openMobile();
      });
    }
    if (mmClose) mmClose.addEventListener('click', closeMobile);
    if (mmBackdrop) mmBackdrop.addEventListener('click', closeMobile);
    mmLinks.forEach(link => link.addEventListener('click', closeMobile));
    if (mmCta) mmCta.addEventListener('click', closeMobile);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
        closeMobile();
      }
    });

    const sections = ['hero', 'about', 'services', 'expertise', 'projects', 'contact']
      .map(id => document.getElementById(id))
      .filter(Boolean);

    function updateActiveNav() {
      const scrollPos = (window.scrollY || window.pageYOffset) + 160;
      let current = sections[0];
      sections.forEach(sec => {
        if (sec.offsetTop <= scrollPos) current = sec;
      });
      if (!current) return;
      $$('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.section === current.id);
      });
    }

    updateActiveNav();
  }

  /* ----------------------------------------------------------
     3. SCROLL ANIMATIONS (IntersectionObserver)
  ---------------------------------------------------------- */
  function initObservers() {
    const items = $$('.animate-in, .anim-in');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('visible'));
      initCounters();
      return;
    }

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    items.forEach(el => io.observe(el));
    initCounters();
  }

  /* ----------------------------------------------------------
     4. COUNTERS (with digit flip animation)
  ---------------------------------------------------------- */
  function initCounters() {
    const counters = $$('.stat-num, .num-val');
    if (!counters.length) return;

    counters.forEach(el => {
      const target = parseInt(el.dataset.target || el.textContent, 10);
      if ((el.textContent.trim() === '0' || el.textContent.trim() === '') && !isNaN(target)) {
        el.textContent = target;
      }
    });

    if (!('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          if (!isNaN(target)) countUp(el, 0, target, 1600);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(el => {
      if (el.dataset.counted === 'true') return;
      io.observe(el);
    });
  }

  function refreshClonedCounters() {
    const cloneCounters = $$('.num-track .num-val, .stat-num');
    cloneCounters.forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      if (!isNaN(target)) el.textContent = target;
      el.dataset.counted = 'true';
    });
  }

  function countUp(el, start, end, duration) {
    if (el.dataset.counted === 'true') {
      el.textContent = end;
      return;
    }
    el.dataset.counted = 'true';

    el.classList.add('flip');
    setTimeout(() => el.classList.remove('flip'), 620);

    const startTime = performance.now();
    const diff = end - start;

    function tick(now) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(start + diff * eased);
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = end;
      }
    }
    requestAnimationFrame(tick);
  }

  /* ----------------------------------------------------------
     5. SERVICE FILTER
  ---------------------------------------------------------- */
  function initServiceFilter() {
    const filterBar = $('#srvFilter');
    const track     = $('#srvTrack');
    if (!filterBar || !track) return;

    const btns  = $$('.srv-filter-btn', filterBar);
    const cards = $$('.srv-card', track);

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filter = btn.dataset.filter;

        cards.forEach(card => {
          if (filter === 'all' || card.dataset.cat === filter) {
            card.classList.remove('filter-hide');
          } else {
            card.classList.add('filter-hide');
          }
        });

        if (track.scrollTo) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollLeft = 0;
        }
      });
    });
  }

  /* ----------------------------------------------------------
     6. DRAG-SCROLL
  ---------------------------------------------------------- */
  function initDragScroll(track) {
    if (!track) return;
    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      moved = false;
      startX = e.pageX;
      startScroll = track.scrollLeft;
      track.classList.add('dragging');
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const delta = (e.pageX - startX) * 1.5;
      if (Math.abs(delta) > 4) moved = true;
      track.scrollLeft = startScroll - delta;
    });

    ['mouseup', 'mouseleave'].forEach(evt => {
      track.addEventListener(evt, () => {
        isDown = false;
        track.classList.remove('dragging');
      });
    });

    track.addEventListener('click', (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    }, true);

    track.addEventListener('touchstart', () => {
      track.classList.add('dragging');
    }, { passive: true });
    track.addEventListener('touchend', () => {
      track.classList.remove('dragging');
    }, { passive: true });
  }

  function initManualTracks() {
    initDragScroll($('#srvTrack'));
    initDragScroll($('#projTrack'));
  }

  /* ----------------------------------------------------------
     7. STORY SCROLL
  ---------------------------------------------------------- */
  function initStoryScroll() {
    const track = $('#ssTrack');
    const section = $('#storyScroll');
    if (!track || !section) return;

    track.innerHTML = track.innerHTML + track.innerHTML;

    section.addEventListener('touchstart', () => {
      track.style.animationPlayState = 'paused';
    }, { passive: true });
    section.addEventListener('touchend', () => {
      track.style.animationPlayState = 'running';
    }, { passive: true });
    section.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });
    section.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  }

  /* ----------------------------------------------------------
     8. AUTO-SCROLL ENGINE
  ---------------------------------------------------------- */
  function initAutoScroller(trackId, speed) {
    const track = document.getElementById(trackId);
    if (!track) return;

    track.innerHTML = track.innerHTML + track.innerHTML;
    refreshClonedCounters();

    let position = 0;
    let halfWidth = 0;
    let paused = false;
    let isOffscreen = false;
    let rafId = null;

    function measure() {
      halfWidth = track.scrollWidth / 2;
    }

    function tick() {
      if (!paused && !isOffscreen && halfWidth > 0) {
        position -= speed;
        if (-position >= halfWidth) {
          position += halfWidth;
        }
        track.style.transform = `translate3d(${position}px, 0, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    }

    track.addEventListener('mouseenter', () => { paused = true; });
    track.addEventListener('mouseleave', () => { paused = false; });

    let touchTimer = null;
    track.addEventListener('touchstart', () => {
      paused = true;
      if (touchTimer) clearTimeout(touchTimer);
    }, { passive: true });
    track.addEventListener('touchend', () => {
      if (touchTimer) clearTimeout(touchTimer);
      touchTimer = setTimeout(() => { paused = false; }, 1500);
    }, { passive: true });

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isOffscreen = !entry.isIntersecting;
        });
      }, { threshold: 0 });
      io.observe(track);
    }

    window.addEventListener('load', measure);
    window.addEventListener('resize', measure);
    measure();
    setTimeout(measure, 600);
    setTimeout(measure, 1800);

    rafId = requestAnimationFrame(tick);
  }

  function initAutoScrollers() {
    if (prefersReducedMotion) return;

    initAutoScroller('procTrack', 0.5);
    initAutoScroller('expTrack',  0.5);
    initAutoScroller('techTrack', 0.5);
    initAutoScroller('certTrack', 0.4);
    initAutoScroller('numTrack',  0.4);
    initAutoScroller('indTrack',  0.5);
    initAutoScroller('revTrack',  0.4);
    initAutoScroller('galTrack',  0.5);
  }

  /* ----------------------------------------------------------
     9. GALLERY REVEAL
  ---------------------------------------------------------- */
  function initGalleryReveal() {
    const heading = $('.gal-heading');
    const sub     = $('.gal-sub');
    const items   = $$('.gc-item');

    if ('IntersectionObserver' in window) {
      const headIo = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      if (heading) { heading.classList.add('anim-in'); headIo.observe(heading); }
      if (sub)     { sub.classList.add('anim-in');     headIo.observe(sub); }

      const itemIo = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

      items.forEach(el => itemIo.observe(el));
    } else {
      items.forEach(el => el.classList.add('visible'));
    }
  }

  /* ----------------------------------------------------------
     10. GALLERY LIGHTBOX
  ---------------------------------------------------------- */
  function initLightbox() {
    const lb       = $('#lightbox');
    const lbImage  = $('#lbImage');
    const lbTitle  = $('#lbTitle');
    const lbDesc   = $('#lbDesc');
    const lbClose  = $('#lbClose');
    const lbPrev   = $('#lbPrev');
    const lbNext   = $('#lbNext');
    if (!lb) return;

    let cards = [];
    let index = 0;

    function refreshGalCards() {
      if (window.innerWidth >= 1024) {
        cards = $$('.gc-item');
      } else {
        const all = $$('.gal-card');
        cards = all.slice(0, Math.ceil(all.length / 2));
      }
    }

    function openLB(card) {
      if (!card) return;
      refreshGalCards();
      index = cards.indexOf(card);
      if (index < 0) index = 0;
      renderLB();
      lb.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function renderLB() {
      const card = cards[index];
      if (!card) return;

      const imgSrc = card.querySelector('.gal-img, .gc-img');
      lbImage.innerHTML = imgSrc ? imgSrc.innerHTML : '';

      const title = card.dataset.title || '';
      const desc  = card.dataset.desc  || '';
      lbTitle.textContent = title;
      lbDesc.textContent  = desc;
      lbDesc.style.display = desc ? 'block' : 'none';
    }

    function closeLB() {
      lb.classList.remove('active');
      document.body.style.overflow = '';
    }

    function navLB(dir) {
      if (!cards.length) return;
      index = (index + dir + cards.length) % cards.length;
      renderLB();
    }

    document.addEventListener('click', (e) => {
      const card = e.target.closest('.gc-item, .gal-card');
      if (card && !e.target.closest('.lightbox')) {
        e.preventDefault();
        openLB(card);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const card = document.activeElement;
        if (card && (card.classList.contains('gc-item') || card.classList.contains('gal-card'))) {
          e.preventDefault();
          openLB(card);
        }
      }
    });

    if (lbClose) lbClose.addEventListener('click', closeLB);
    if (lbPrev)  lbPrev.addEventListener('click', (e) => { e.stopPropagation(); navLB(-1); });
    if (lbNext)  lbNext.addEventListener('click', (e) => { e.stopPropagation(); navLB(1); });

    lb.addEventListener('click', (e) => {
      if (e.target === lb || e.target.classList.contains('lb-body')) closeLB();
    });

    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('active')) return;
      if (e.key === 'Escape')      closeLB();
      if (e.key === 'ArrowLeft')   navLB(-1);
      if (e.key === 'ArrowRight')  navLB(1);
    });

    refreshGalCards();
    window.addEventListener('resize', refreshGalCards);
  }

  /* ----------------------------------------------------------
     11. CONTACT FORM
  ---------------------------------------------------------- */
  function initContactForm() {
    const form = $('#contactForm');
    if (!form) return;

    const nameEl    = $('#cfName');
    const phoneEl   = $('#cfPhone');
    const emailEl   = $('#cfEmail');
    const submitBtn = $('#cfSubmit');

    const errName  = $('#errName');
    const errPhone = $('#errPhone');
    const errEmail = $('#errEmail');

    const phoneRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function showErr(input, errEl, msg) {
      if (input) input.closest('.cf-field').classList.add('error');
      if (errEl) { errEl.textContent = msg; errEl.classList.add('show'); }
    }
    function clearErr(input, errEl) {
      if (input) input.closest('.cf-field').classList.remove('error');
      if (errEl) { errEl.textContent = ''; errEl.classList.remove('show'); }
    }
    function clearErrors() {
      clearErr(nameEl, errName);
      clearErr(phoneEl, errPhone);
      clearErr(emailEl, errEmail);
    }

    if (phoneEl) {
      phoneEl.addEventListener('input', () => {
        phoneEl.value = phoneEl.value.replace(/\D/g, '').slice(0, 10);
        clearErr(phoneEl, errPhone);
      });
    }
    if (nameEl)  nameEl.addEventListener('input',  () => clearErr(nameEl, errName));
    if (emailEl) emailEl.addEventListener('input', () => clearErr(emailEl, errEmail));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      let valid = true;

      const nameVal = nameEl ? nameEl.value.trim() : '';
      if (nameVal.length < 2) {
        showErr(nameEl, errName, 'Please enter your name (min. 2 characters).');
        valid = false;
      }

      const phoneVal = phoneEl ? phoneEl.value.trim() : '';
      if (!phoneRegex.test(phoneVal)) {
        showErr(phoneEl, errPhone, 'Please enter a valid 10-digit Indian mobile number.');
        valid = false;
      }

      const emailVal = emailEl ? emailEl.value.trim() : '';
      if (emailVal && !emailRegex.test(emailVal)) {
        showErr(emailEl, errEmail, 'Please enter a valid email address.');
        valid = false;
      }

      if (!valid) return;

      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.classList.add('success');
        submitBtn.textContent = '✓ Sent Successfully';

        setTimeout(() => {
          submitBtn.classList.remove('success');
          submitBtn.textContent = 'Send Enquiry';
          submitBtn.disabled = false;
          form.reset();
          clearErrors();
        }, 3500);
      }, 1600);
    });
  }

  /* ----------------------------------------------------------
     12. SMOOTH SCROLL
  ---------------------------------------------------------- */
  function initSmoothScroll() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const offset = target.offsetTop - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  }

  /* ----------------------------------------------------------
     13. MAGNETIC BUTTONS (NEW)
  ---------------------------------------------------------- */
  function initMagnetic() {
    if (prefersReducedMotion) return;
    const btns = $$('.magnetic');

    btns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const max = 8;
        const dx = Math.max(-max, Math.min(max, x / 6));
        const dy = Math.max(-max, Math.min(max, y / 6));
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ----------------------------------------------------------
     14. 3D TILT CARDS (NEW)
  ---------------------------------------------------------- */
  function initTilt() {
    if (prefersReducedMotion) return;
    const cards = $$('.tilt');
    const max = 4;

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const rx = -y * max * 2;
        const ry = x * max * 2;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ----------------------------------------------------------
     BOOTSTRAP
  ---------------------------------------------------------- */
  function boot() {
    initPreloader();
    initNavbar();
    initServiceFilter();
    initManualTracks();
    initStoryScroll();
    initLightbox();
    initContactForm();
    initSmoothScroll();
    initMagnetic();
    initTilt();

    setTimeout(() => {
      if (!document.body.classList.contains('observers-started')) {
        document.body.classList.add('observers-started');
        initObservers();
        initAutoScrollers();
        initGalleryReveal();
      }
    }, 3200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();