/* =====================================================
   LUXURY BIRTHDAY INVITATION — SCRIPT
   ===================================================== */

(function () {
  'use strict';

  /* ── UTILITIES ── */
  const $ = id => document.getElementById(id);
  const pad = n => String(n).padStart(2, '0');

  function getGuestName() {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('to') || params.get('guest') || '';
    return raw.trim()
      ? decodeURIComponent(raw).replace(/\+/g, ' ').trim()
      : null;
  }

  /* ── LOADER ── */
  function hideLoader() {
    const loader = $('loader');
    if (!loader) return;
    loader.classList.add('hidden');
  }

  /* ── POPULATE CONTENT FROM CONFIG ── */
  function populateContent() {
    const c = CONFIG;
    const guest = getGuestName();

    // Greeting
    $('guestGreeting').textContent = guest ? `Dear ${guest},` : 'Dear Guest,';

    // Hero
    $('birthdayName').textContent  = c.name;
    $('birthdayAge').textContent   = c.age;
    $('heroTagline').textContent   = c.tagline;
    $('heroDate').textContent      = c.date.display;
    $('heroTime').textContent      = c.date.time;

    // Details
    $('detailDate').textContent    = c.date.display;
    $('detailTime').textContent    = c.date.time;
    $('detailDoors').textContent   = c.date.doors;
    $('detailVenue').textContent   = c.venue.name;
    $('detailAddress').textContent = c.venue.address;
    $('detailDress').textContent   = c.venue.dresscode;

    // Map
    const mapFrame = $('mapFrame');
    if (mapFrame && c.venue.mapEmbed) {
      // Lazy-set src to avoid layout penalty on load
      mapFrame.src = c.venue.mapEmbed;
    }
    const mapsLink = $('mapsLink');
    if (mapsLink) mapsLink.href = c.venue.mapsLink;

    // RSVP
    $('rsvpDeadline').textContent = c.rsvp.deadline;
    const rsvpBtn = $('rsvpBtn');
    if (rsvpBtn) {
      const msg  = encodeURIComponent(c.rsvp.message + (guest ? `\n\nGuest: ${guest}` : ''));
      rsvpBtn.href = `https://wa.me/${c.rsvp.whatsapp}?text=${msg}`;
    }

    // Footer
    $('footerName').textContent = c.name;

    // Music
    const audio = $('bgMusic');
    if (audio && c.music.url) {
      audio.src = c.music.url;
    }
  }

  /* ── GALLERY ── */
  function buildGallery() {
    const strip = $('galleryStrip');
    if (!strip || !CONFIG.gallery?.length) return;
    CONFIG.gallery.forEach((url, i) => {
      const item = document.createElement('div');
      item.className = 'gallery-item reveal';
      item.style.transitionDelay = `${i * 0.12}s`;
      const img = document.createElement('img');
      img.src   = url;
      img.alt   = `Memory ${i + 1}`;
      img.loading = 'lazy';
      item.appendChild(img);
      strip.appendChild(item);
    });
  }

  /* ── COUNTDOWN ── */
  function startCountdown() {
    const target = new Date(CONFIG.date.iso).getTime();

    function update() {
      const now  = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        $('cdDays').textContent  = '00';
        $('cdHours').textContent = '00';
        $('cdMins').textContent  = '00';
        $('cdSecs').textContent  = '00';
        return;
      }

      const days  = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins  = Math.floor((diff % 3600000) / 60000);
      const secs  = Math.floor((diff % 60000) / 1000);

      $('cdDays').textContent  = pad(days);
      $('cdHours').textContent = pad(hours);
      $('cdMins').textContent  = pad(mins);
      $('cdSecs').textContent  = pad(secs);
    }

    update();
    setInterval(update, 1000);
  }

  /* ── REVEAL ON SCROLL ── */
  function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach(el => observer.observe(el));
  }

  /* ── MUSIC ── */
  function initMusic() {
    const btn   = $('musicBtn');
    const audio = $('bgMusic');
    const icon  = $('musicIcon');
    if (!btn || !audio) return;

    let playing = false;

    btn.addEventListener('click', () => {
      if (playing) {
        audio.pause();
        playing = false;
        btn.classList.remove('playing');
        icon.textContent = '♩';
        btn.setAttribute('aria-label', 'Play music');
      } else {
        audio.play().then(() => {
          playing = true;
          btn.classList.add('playing');
          icon.textContent = '♫';
          btn.setAttribute('aria-label', 'Pause music');
        }).catch(() => {
          // Autoplay blocked — fail silently
        });
      }
    });
  }

  /* ── STAGGER HERO REVEAL ── */
  function heroEntrance() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;
    // Hero already has .reveal; trigger after small delay
    requestAnimationFrame(() => {
      setTimeout(() => heroContent.classList.add('visible'), 200);
    });
  }

  /* ── INIT ── */
  function init() {
    populateContent();
    buildGallery();
    startCountdown();
    heroEntrance();
    // Slight delay before reveal observer so hero has settled
    setTimeout(initReveal, 300);
    initMusic();
  }

  // Hide loader when DOM + styles ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { init(); hideLoader(); });
  } else {
    init();
    hideLoader();
  }

})();
