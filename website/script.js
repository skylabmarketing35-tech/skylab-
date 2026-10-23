/**
 * SKY-LAB Analytical Laboratory
 * JavaScript — Targeted Updates
 */
(function () {
    'use strict';

    // ================================
    // PRELOADER
    // ================================
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', function () {
        setTimeout(function () {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
            initObservers();
            initAutoScrollers();
            initGalleryReveal();   // ← ADDED
        }, 2200);
    });

    // ================================
    // NAVBAR
    // ================================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mmBackdrop = document.getElementById('mmBackdrop');
    const mmClose = document.getElementById('mmClose');
    const mmLinks = document.querySelectorAll('.mm-link');
    const mmCTA = document.querySelector('.mm-cta');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNav();
    }, { passive: true });

    function openMobile() {
        hamburger.classList.add('active');
        mobileMenu.classList.add('active');
        mobileMenu.setAttribute('aria-hidden', 'false');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.classList.add('menu-open');
        document.body.style.overflow = 'hidden';
    }

    function closeMobile() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenu.setAttribute('aria-hidden', 'true');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function () {
        if (mobileMenu.classList.contains('active')) {
            closeMobile();
        } else {
            openMobile();
        }
    });

    if (mmClose) mmClose.addEventListener('click', closeMobile);
    if (mmBackdrop) mmBackdrop.addEventListener('click', closeMobile);
    mmLinks.forEach(function (l) { l.addEventListener('click', closeMobile); });
    if (mmCTA) mmCTA.addEventListener('click', closeMobile);

    // Close on Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobile();
        }
    });

    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scroll = window.scrollY + 160;
        sections.forEach(function (sec) {
            const top = sec.offsetTop;
            const h = sec.offsetHeight;
            const id = sec.getAttribute('id');
            if (scroll >= top && scroll < top + h) {
                navLinks.forEach(function (nl) {
                    nl.classList.remove('active');
                    if (nl.getAttribute('data-section') === id) nl.classList.add('active');
                });
            }
        });
    }

    // ================================
    // SCROLL ANIMATIONS
    // ================================
    function initObservers() {
        const items = document.querySelectorAll('.anim-in');
        if (!('IntersectionObserver' in window)) {
            items.forEach(function (el) { el.classList.add('visible'); });
            return;
        }
        const obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    const d = e.target.getAttribute('data-delay');
                    if (d) {
                        setTimeout(function () { e.target.classList.add('visible'); }, parseInt(d) * 120);
                    } else {
                        e.target.classList.add('visible');
                    }
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        items.forEach(function (el) { obs.observe(el); });

        initCounters();
    }

    // ================================
    // COUNTERS — FIXED: never stuck at 0, works with auto-scroll clones
    // ================================
    function initCounters() {
        // Select ALL counter elements (including those inside cloned auto-scroll content)
        const nums = document.querySelectorAll('.stat-num, .num-val');
        if (!nums.length) return;

        // Ensure the final value is always rendered as a safe fallback
        nums.forEach(function (el) {
            const target = parseInt(el.getAttribute('data-target'), 10);
            if (!isNaN(target)) {
                // If text content is "0" or empty, show the target immediately
                const current = el.textContent.trim();
                if (current === '' || current === '0') {
                    el.textContent = target;
                }
            }
        });

        if (!('IntersectionObserver' in window)) {
            // Fallback: just show target values
            return;
        }

        const cObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    const el = e.target;
                    if (el.dataset.counted === 'true') {
                        cObs.unobserve(el);
                        return;
                    }
                    const target = parseInt(el.getAttribute('data-target'), 10);
                    if (isNaN(target)) {
                        cObs.unobserve(el);
                        return;
                    }
                    if (el.getAttribute('data-type') === 'year') {
                        // Year: animate from 0 → 1991
                        countUp(el, 0, target, 2200);
                    } else {
                        countUp(el, 0, target, 2000);
                    }
                    el.dataset.counted = 'true';
                    cObs.unobserve(el);
                }
            });
        }, { threshold: 0.3, rootMargin: '0px 0px -40px 0px' });

        nums.forEach(function (n) { cObs.observe(n); });
    }

    function countUp(el, start, end, dur) {
        const t0 = performance.now();
        function tick(now) {
            const p = Math.min((now - t0) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.floor(start + (end - start) * eased);
            if (p < 1) {
                requestAnimationFrame(tick);
            } else {
                el.textContent = end;
            }
        }
        requestAnimationFrame(tick);
    }

    // Re-initialize counters AFTER auto-scrollers duplicate content
    // so clones also show the correct target value instead of "0".
    function refreshClonedCounters() {
        document.querySelectorAll('.stat-num, .num-val').forEach(function (el) {
            const target = parseInt(el.getAttribute('data-target'), 10);
            if (isNaN(target)) return;
            const current = el.textContent.trim();
            // If this is a clone that hasn't been animated, ensure it shows target
            if (current === '' || current === '0') {
                el.textContent = target;
            }
        });
    }

    // ================================
    // SERVICE CATEGORY FILTER
    // ================================
    const srvFilter = document.getElementById('srvFilter');
    const srvCards = document.querySelectorAll('.srv-card');
    const srvTrack = document.getElementById('srvTrack');

    if (srvFilter && srvCards.length) {
        srvFilter.addEventListener('click', function (e) {
            const btn = e.target.closest('.srv-filter-btn');
            if (!btn) return;

            // Toggle active state
            srvFilter.querySelectorAll('.srv-filter-btn').forEach(function (b) {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const filter = btn.getAttribute('data-filter');

            // Smooth transition: fade out, filter, fade in
            srvCards.forEach(function (card) {
                const cat = card.getAttribute('data-cat');
                if (filter === 'all' || cat === filter) {
                    card.classList.remove('filter-hide');
                } else {
                    card.classList.add('filter-hide');
                }
            });

            // Reset scroll position of track smoothly
            if (srvTrack) {
                srvTrack.scrollTo({ left: 0, behavior: 'smooth' });
            }
        });
    }

    // ================================
    // DRAG SCROLL for manual-only tracks
    // ================================
    function initDrag() {
        const tracks = document.querySelectorAll('.srv-track, .proj-track');
        tracks.forEach(function (t) {
            let down = false, sx, sl;
            t.addEventListener('mousedown', function (e) {
                down = true; t.style.cursor = 'grabbing';
                sx = e.pageX - t.offsetLeft; sl = t.scrollLeft;
                e.preventDefault();
            });
            t.addEventListener('mouseleave', function () { down = false; t.style.cursor = 'grab'; });
            t.addEventListener('mouseup', function () { down = false; t.style.cursor = 'grab'; });
            t.addEventListener('mousemove', function (e) {
                if (!down) return; e.preventDefault();
                t.scrollLeft = sl - ((e.pageX - t.offsetLeft) - sx) * 1.5;
            });
        });
    }
    initDrag();

    // ================================
    // STORY SCROLL — duplicate for seamless loop
    // ================================
    const ssTrack = document.getElementById('ssTrack');
    if (ssTrack) {
        ssTrack.innerHTML += ssTrack.innerHTML;
        ssTrack.addEventListener('touchstart', function () {
            this.style.animationPlayState = 'paused';
        }, { passive: true });
        ssTrack.addEventListener('touchend', function () {
            this.style.animationPlayState = 'running';
        }, { passive: true });
    }

    // ================================
    // AUTO-SCROLL ENGINE (RAF-based)
    // Infinite seamless loop with pause on hover/touch
    // ================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function initAutoScroller(trackEl, options) {
        if (!trackEl) return;
        options = options || {};

        const speed = options.speed || 0.5; // pixels per frame
        const originalHTML = trackEl.innerHTML;

        // Duplicate content for seamless loop
        trackEl.innerHTML = originalHTML + originalHTML;

        // After cloning, ensure any counter clones show their target value
        trackEl.querySelectorAll('.stat-num, .num-val').forEach(function (el) {
            const target = parseInt(el.getAttribute('data-target'), 10);
            if (!isNaN(target)) {
                el.textContent = target;
                el.dataset.counted = 'true'; // prevent re-animation on clones
            }
        });

        let position = 0;
        let paused = false;
        let userInteracting = false;
        let rafId = null;
        let halfWidth = 0;
        let touchStartX = 0;
        let touchActive = false;

        function measure() {
            // Half width because content is duplicated
            halfWidth = trackEl.scrollWidth / 2;
        }

        function tick() {
            if (!paused && !userInteracting && halfWidth > 0) {
                position -= speed;
                // Seamless loop: when we've scrolled past first copy, reset
                if (-position >= halfWidth) {
                    position += halfWidth;
                }
                trackEl.style.transform = 'translateX(' + position + 'px)';
            }
            rafId = requestAnimationFrame(tick);
        }

        // Pause/resume handlers
        function pause() { paused = true; }
        function resume() {
            if (!userInteracting) paused = false;
        }

        trackEl.addEventListener('mouseenter', pause);
        trackEl.addEventListener('mouseleave', resume);

        // Touch: pause and allow manual swipe
        trackEl.addEventListener('touchstart', function (e) {
            userInteracting = true;
            paused = true;
            touchActive = true;
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        trackEl.addEventListener('touchmove', function (e) {
            if (!touchActive) return;
            const currentX = e.touches[0].clientX;
            const diff = currentX - touchStartX;
            touchStartX = currentX;
            position += diff;
            // Keep within one loop
            if (position > 0) position -= halfWidth;
            if (-position >= halfWidth) position += halfWidth;
            trackEl.style.transform = 'translateX(' + position + 'px)';
        }, { passive: true });

        trackEl.addEventListener('touchend', function () {
            touchActive = false;
            // Resume after short delay so user feels control
            setTimeout(function () {
                userInteracting = false;
                paused = false;
            }, 1500);
        }, { passive: true });

        // Measure on load and resize
        setTimeout(measure, 100);
        window.addEventListener('resize', function () {
            setTimeout(measure, 100);
        });

        // Pause when offscreen (performance)
        if ('IntersectionObserver' in window) {
            const vObs = new IntersectionObserver(function (entries) {
                entries.forEach(function (e) {
                    if (e.isIntersecting) {
                        if (!userInteracting) paused = false;
                    } else {
                        paused = true;
                    }
                });
            }, { threshold: 0 });
            vObs.observe(trackEl);
        }

        // Start
        rafId = requestAnimationFrame(tick);
    }

    function initAutoScrollers() {
        if (prefersReducedMotion) return;

        // Different speeds for different content densities
        initAutoScroller(document.getElementById('procTrack'), { speed: 0.5 });
        initAutoScroller(document.getElementById('expTrack'), { speed: 0.5 });
        initAutoScroller(document.getElementById('techTrack'), { speed: 0.5 });
        initAutoScroller(document.getElementById('certTrack'), { speed: 0.4 });
        initAutoScroller(document.getElementById('numTrack'), { speed: 0.4 });
        initAutoScroller(document.getElementById('indTrack'), { speed: 0.5 });
        initAutoScroller(document.getElementById('revTrack'), { speed: 0.4 });
        initAutoScroller(document.getElementById('galTrack'), { speed: 0.5 });
    }

    // ================================
    // GALLERY — DESKTOP COLLAGE REVEAL
    // ================================
    function initGalleryReveal() {
        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll('.gal-heading, .gal-sub, .gc-item').forEach(function (el) {
                el.classList.add('visible');
            });
            return;
        }

        // Heading + subtitle smooth reveal
        const headEls = document.querySelectorAll('.gal-heading, .gal-sub');
        const headObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    headObs.unobserve(e.target);
                }
            });
        }, { threshold: 0.2 });
        headEls.forEach(function (el) { headObs.observe(el); });

        // Collage items staggered reveal (desktop only — items are hidden by CSS on mobile)
        const items = document.querySelectorAll('.gc-item');
        const itemObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    itemObs.unobserve(e.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
        items.forEach(function (el) { itemObs.observe(el); });
    }

    // ================================
    // GALLERY LIGHTBOX
    // ================================
    const lightbox = document.getElementById('lightbox');
    const lbImage = document.getElementById('lbImage');
    const lbTitle = document.getElementById('lbTitle');
    const lbDesc = document.getElementById('lbDesc');
    const lbClose = document.querySelector('.lb-close');
    const lbPrev = document.querySelector('.lb-prev');
    const lbNext = document.querySelector('.lb-next');
    let galCards = []; // populated after track duplication
    let lbIndex = 0;

    function refreshGalCards() {
        // Prefer whichever source is currently visible to the user.
        // Desktop (>= 1024px) uses the collage; smaller screens use the track.
        const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
        if (isDesktop) {
            // Collage items are static (not duplicated by autoscroller)
            galCards = Array.from(document.querySelectorAll('.gc-item'));
        } else {
            // Mobile track — use only the original set (first half of cloned content)
            const all = Array.from(document.querySelectorAll('.gal-card'));
            galCards = all.slice(0, all.length / 2);
        }
    }

    function openLB(card) {
        refreshGalCards();
        lbIndex = galCards.indexOf(card);
        if (lbIndex < 0) lbIndex = 0;

        const img = card.querySelector('.gal-img, .gc-img');
        lbImage.innerHTML = '';
        const clone = img.cloneNode(true);
        clone.style.width = '100%'; clone.style.height = '100%';
        lbImage.appendChild(clone);
        lbTitle.textContent = card.getAttribute('data-title') || '';
        lbDesc.textContent = card.getAttribute('data-desc') || '';
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLB() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function navLB(dir) {
        refreshGalCards();
        if (!galCards.length) return;
        lbIndex += dir;
        if (lbIndex < 0) lbIndex = galCards.length - 1;
        if (lbIndex >= galCards.length) lbIndex = 0;
        openLB(galCards[lbIndex]);
    }

    // Delegated click (works for both mobile track cards and desktop collage items)
    document.addEventListener('click', function (e) {
        const card = e.target.closest('.gal-card, .gc-item');
        if (card) openLB(card);
    });
    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const card = document.activeElement && document.activeElement.closest('.gal-card, .gc-item');
        if (card) { e.preventDefault(); openLB(card); }
    });

    if (lbClose) lbClose.addEventListener('click', closeLB);
    if (lbPrev) lbPrev.addEventListener('click', function () { navLB(-1); });
    if (lbNext) lbNext.addEventListener('click', function () { navLB(1); });
    if (lightbox) lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLB(); });

    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLB();
        if (e.key === 'ArrowLeft') navLB(-1);
        if (e.key === 'ArrowRight') navLB(1);
    });

    // ================================
    // CONTACT FORM — KEEP EXISTING VALIDATION
    // ================================
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            clearErrors();
            let valid = true;

            const name = document.getElementById('name');
            const phone = document.getElementById('phone');
            const email = document.getElementById('email');

            // Name
            if (!name.value.trim()) {
                showErr('name', 'Please enter your name.');
                valid = false;
            } else if (name.value.trim().length < 2) {
                showErr('name', 'Name must be at least 2 characters.');
                valid = false;
            }

            // Phone — COMPULSORY, exactly 10 digits, Indian mobile
            const phoneVal = phone.value.trim();
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneVal) {
                showErr('phone', 'Phone number is required.');
                valid = false;
            } else if (!phoneRegex.test(phoneVal)) {
                showErr('phone', 'Please enter a valid 10-digit mobile number.');
                valid = false;
            }

            // Email — optional but validate if provided
            if (email.value.trim()) {
                const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRe.test(email.value.trim())) {
                    showErr('email', 'Please enter a valid email address.');
                    valid = false;
                }
            }

            if (!valid) return;

            submitBtn.classList.add('loading');
            setTimeout(function () {
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('success');
                setTimeout(function () {
                    submitBtn.classList.remove('success');
                    form.reset();
                }, 3500);
            }, 1600);
        });

        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function () {
                this.value = this.value.replace(/\D/g, '').slice(0, 10);
            });
        }
    }

    function showErr(id, msg) {
        const f = document.getElementById(id);
        const e = document.getElementById(id + 'Error');
        if (f) f.classList.add('error');
        if (e) e.textContent = msg;
    }

    function clearErrors() {
        document.querySelectorAll('.cf-err').forEach(function (e) { e.textContent = ''; });
        document.querySelectorAll('.cf input, .cf select, .cf textarea').forEach(function (el) { el.classList.remove('error'); });
    }

    document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea').forEach(function (el) {
        el.addEventListener('input', function () {
            this.classList.remove('error');
            const err = document.getElementById(this.id + 'Error');
            if (err) err.textContent = '';
        });
    });

    // ================================
    // SMOOTH SCROLL
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // ================================
    // PREVENT HORIZONTAL OVERFLOW
    // ================================
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';

})();