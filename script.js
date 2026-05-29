/* ═══════════════════════════════════════════════════════════
   LUXURY BIRTHDAY INVITATION — SCRIPT v2 PREMIUM
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── UTILITIES ── */
  const $ = id => document.getElementById(id);
  const pad = n => String(n).padStart(2, '0');

  /** Parse ?to=Guest+Name or ?guest=... from URL */
  function getGuestName() {
    const p = new URLSearchParams(window.location.search);
    const raw = (p.get('to') || p.get('guest') || '').trim();
    if (!raw) return null;
    return decodeURIComponent(raw.replace(/\+/g, ' ')).trim();
  }

  /** Get first letter(s) as monogram — handles multi-word names */
  function getInitial(name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return parts[0][0] + parts[1][0];
    return parts[0][0] || '✦';
  }

  /* ── POPULATE CONTENT ── */
  function populateContent() {
    const c     = CONFIG;
    const guest = getGuestName();
    const guestLabel = guest ? guest : 'Dear Guest';

    // Gate
    $('gateGuest').textContent = guest ? guest : 'Dear Guest';
    $('gateName').textContent  = c.name;
    $('gateAge').textContent   = c.age;

    // Hero
    $('heroInitial').textContent  = getInitial(c.name);
    $('heroName').textContent     = c.name;
    $('heroAge').textContent      = c.age;
    $('heroTagline').textContent  = c.tagline;
    $('heroDate').textContent     = c.date.display;
    $('heroTime').textContent     = c.date.time;

    // Details
    $('detailDate').textContent    = c.date.display;
    $('detailTime').textContent    = c.date.time;
    $('detailDoors').textContent   = c.date.doors;
    $('detailVenue').textContent   = c.venue.name;
    $('detailAddress').textContent = c.venue.address;
    $('detailDress').textContent   = c.venue.dresscode;

    // Map
    const frame = $('mapFrame');
    if (frame && c.venue.mapEmbed) frame.src = c.venue.mapEmbed;
    const ml = $('mapsLink');
    if (ml) ml.href = c.venue.mapsLink;

    // RSVP
    $('rsvpDeadline').textContent = c.rsvp.deadline;
    const rsvpBtn = $('rsvpBtn');
    if (rsvpBtn) {
      const guestNote = guest ? `\n\nNama tamu: ${guest}` : '';
      const msg = encodeURIComponent(c.rsvp.message + guestNote);
      rsvpBtn.href = `https://wa.me/${c.rsvp.whatsapp}?text=${msg}`;
    }

    // Footer
    $('footerName').textContent = c.name;

    // Music src
    const audio = $('bgMusic');
    if (audio && c.music && c.music.url) audio.src = c.music.url;
  }

  /* ── GALLERY ── */
  function buildGallery() {
    const track = $('galleryStrip');
    const dotsEl = $('galleryDots');
    const images = CONFIG.gallery || [];
    if (!track || !images.length) return;

    images.forEach((url, i) => {
      // Item
      const item = document.createElement('div');
      item.className = 'gal-item';
      item.setAttribute('role', 'listitem');
      const img = document.createElement('img');
      img.src     = url;
      img.alt     = `Foto kenangan ${i + 1}`;
      img.loading = 'lazy';
      item.appendChild(img);
      track.appendChild(item);

      // Dot
      if (dotsEl) {
        const dot = document.createElement('span');
        dot.className = i === 0 ? 'gdot active' : 'gdot';
        dotsEl.appendChild(dot);
      }
    });

    // Update active dot on scroll
    if (dotsEl && images.length > 1) {
      const dots = dotsEl.querySelectorAll('.gdot');
      const items = track.querySelectorAll('.gal-item');
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Array.from(items).indexOf(entry.target);
            dots.forEach((d, i) => d.classList.toggle('active', i === idx));
          }
        });
      }, { root: track, threshold: 0.55 });
      items.forEach(item => observer.observe(item));
    }
  }

  /* ── COUNTDOWN ── */
  function startCountdown() {
    const target = new Date(CONFIG.date.iso).getTime();
    const els = {
      days:  $('cdDays'),
      hours: $('cdHours'),
      mins:  $('cdMins'),
      secs:  $('cdSecs'),
    };

    // Micro-tick animation on seconds digit
    function tick(el, val) {
      if (!el || el.textContent === val) return;
      el.classList.add('tick');
      requestAnimationFrame(() => {
        el.textContent = val;
        requestAnimationFrame(() => el.classList.remove('tick'));
      });
    }

    function update() {
      const diff = target - Date.now();
      if (diff <= 0) {
        Object.values(els).forEach(el => { if (el) el.textContent = '00'; });
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000)  / 60000);
      const s = Math.floor((diff % 60000)    / 1000);

      if (els.days)  els.days.textContent  = pad(d);
      if (els.hours) els.hours.textContent = pad(h);
      if (els.mins)  els.mins.textContent  = pad(m);
      tick(els.secs, pad(s));
    }

    update();
    setInterval(update, 1000);
  }

  /* ── SCROLL REVEAL ── */
  function initReveal() {
    const allReveal = document.querySelectorAll('.reveal, .fade-up');
    if (!allReveal.length) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

    allReveal.forEach(el => io.observe(el));
  }

  /* ── MUSIC ── */
  function initMusic() {
    const btn   = $('musicBtn');
    const audio = $('bgMusic');
    if (!btn || !audio) return;

    let playing = false;

    btn.addEventListener('click', () => {
      if (playing) {
        audio.pause();
        playing = false;
        btn.classList.remove('playing');
        btn.setAttribute('aria-label', 'Play ambient music');
      } else {
        audio.play().then(() => {
          playing = true;
          btn.classList.add('playing');
          btn.setAttribute('aria-label', 'Pause ambient music');
        }).catch(() => {
          // Browser blocked — silent fail
        });
      }
    });
  }

  /* ── GATE (OPENING SCREEN) ── */
  function initGate() {
    const gate    = $('gate');
    const gateBtn = $('gateBtn');
    const main    = $('main');
    const musicBtn= $('musicBtn');
    const audio   = $('bgMusic');

    if (!gate || !gateBtn || !main) return;

    // Lock body scroll
    document.body.classList.add('locked');

    gateBtn.addEventListener('click', openInvitation);
    // Also allow tapping anywhere on gate
    gate.addEventListener('click', e => {
      if (e.target === gate || e.target.closest('.gate-content')) openInvitation();
    });

    function openInvitation() {
      // Prevent double-fire
      if (gate.classList.contains('exiting')) return;

      // Start music on interaction (browser permits)
      if (audio && CONFIG.music && CONFIG.music.url) {
        audio.play().then(() => {
          if (musicBtn) {
            musicBtn.classList.add('playing');
            musicBtn.setAttribute('aria-label', 'Pause ambient music');
          }
        }).catch(() => {});
      }

      // Cinematic exit
      gate.classList.add('exiting');
      document.body.classList.remove('locked');

      // Reveal main
      main.removeAttribute('aria-hidden');
      setTimeout(() => {
        main.classList.add('revealed');
        initReveal();        // start observing now content is visible
        startCountdown();
      }, 200);

      // Show music button
      if (musicBtn) {
        musicBtn.removeAttribute('hidden');
        setTimeout(() => musicBtn.classList.add('visible'), 500);
      }

      // Remove gate from DOM after animation
      gate.addEventListener('animationend', () => {
        gate.classList.add('gone');
        gate.setAttribute('aria-hidden', 'true');
      }, { once: true });
    }
  }

  /* ── INIT ── */
  function init() {
    populateContent();
    buildGallery();
    initGate();
    initMusic();
    // Countdown starts after gate opens
    // Reveal starts after gate opens
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
