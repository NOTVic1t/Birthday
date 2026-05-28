// script.js - Luxury Invitation System | Guest Personalization | Cinematic Interactions
(function() {
    'use strict';

    // ============================================================
    // 1. GUEST NAME SYSTEM - URL Parameter Detection (?to=Name)
    // ============================================================
    function getGuestNameFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        let guest = urlParams.get('to');
        
        if (guest) {
            // Decode URI component to support spaces and special characters
            guest = decodeURIComponent(guest);
            // Trim whitespace and capitalize first letter of each word elegantly
            guest = guest.trim();
            if (guest.length > 0) {
                // Preserve original formatting but ensure no double spaces
                guest = guest.replace(/\s+/g, ' ');
                return guest;
            }
        }
        return null;
    }

    function displayGuestName() {
        const guestNameSpan = document.getElementById('guestNameDisplay');
        const modalGuestSpan = document.getElementById('modalGuestName');
        const guestName = getGuestNameFromURL();
        
        const finalName = guestName || 'Guest';
        
        if (guestNameSpan) {
            guestNameSpan.textContent = finalName;
            // Add subtle animation class for cinematic reveal
            guestNameSpan.classList.add('guest-reveal');
            setTimeout(() => {
                if (guestNameSpan) guestNameSpan.classList.remove('guest-reveal');
            }, 600);
        }
        
        if (modalGuestSpan) {
            modalGuestSpan.textContent = finalName;
        }
        
        // Update document title for personal touch
        if (finalName !== 'Guest') {
            document.title = `AURUM · Welcome, ${finalName}`;
        }
    }

    // ============================================================
    // 2. CINEMATIC SCROLL REVEAL (Intersection Observer - lightweight)
    // ============================================================
    function initScrollReveals() {
        const panels = document.querySelectorAll('.scroll-panel');
        
        if (panels.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('panel-visible');
                    // Add subtle parallax effect on inner elements
                    const innerElements = entry.target.querySelectorAll('.hero-inner, .greeting-container, .timeline-steps, .rsvp-card-luxury');
                    innerElements.forEach(el => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    });
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -10px 0px' });
        
        panels.forEach(panel => {
            // Set initial hidden state for cinematic fade-up
            const content = panel.querySelector('.hero-inner, .greeting-container, .timeline-header, .rsvp-card-luxury');
            if (content && !panel.classList.contains('hero-panel')) {
                content.style.opacity = '0';
                content.style.transform = 'translateY(25px)';
                content.style.transition = 'opacity 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.7s ease';
            }
            observer.observe(panel);
        });
        
        // Hero panel appears immediately
        const heroContent = document.querySelector('.hero-inner');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }

    // ============================================================
    // 3. RSVP MODAL SYSTEM (Lightweight, no backend)
    // ============================================================
    function initRSVPModal() {
        const rsvpBtn = document.getElementById('rsvpBtn');
        const modal = document.getElementById('rsvpModal');
        const closeBtn = document.querySelector('.modal-close-luxury');
        const modalCloseAction = document.getElementById('closeModalBtn');
        
        if (!rsvpBtn || !modal) return;
        
        // Open modal with cinematic entrance
        function openModal() {
            modal.style.display = 'flex';
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
            // Add a tiny haptic feedback feel (optional)
            modal.classList.add('modal-active');
            // Update guest name inside modal again (in case of dynamic change)
            const guestForModal = getGuestNameFromURL() || 'Guest';
            const modalGuestSpan = document.getElementById('modalGuestName');
            if (modalGuestSpan) modalGuestSpan.textContent = guestForModal;
        }
        
        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            modal.classList.remove('modal-active');
        }
        
        rsvpBtn.addEventListener('click', openModal);
        
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (modalCloseAction) modalCloseAction.addEventListener('click', closeModal);
        
        // Close modal on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Escape key support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeModal();
            }
        });
    }

    // ============================================================
    // 4. SMOOTH SCROLL FOR INTERNAL LINKS (if any, plus elegant behavior)
    // ============================================================
    function initSmoothScrolling() {
        // All internal hash links (for future use, but we add graceful scroll)
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ============================================================
    // 5. LIGHTWEIGHT PARALLAX / CINEMATIC MOUSE GLOW (optional, GPU friendly)
    // ============================================================
    function initCinematicGlow() {
        const heroSection = document.querySelector('.hero-panel');
        if (!heroSection) return;
        
        document.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 768) return; // only subtle on desktop, but keep performance
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            const glowElement = document.querySelector('.gold-gradient-bg');
            if (glowElement) {
                glowElement.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(212, 175, 55, 0.12), transparent 70%)`;
            }
        });
    }

    // ============================================================
    // 6. DYNAMIC METADATA / FAVICON HANDLING (elegance)
    // ============================================================
    function setDynamicMetadata() {
        const guest = getGuestNameFromURL();
        if (guest && guest !== 'Guest') {
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', `${guest}, you are personally invited to an evening of golden elegance.`);
            }
        }
    }

    // ============================================================
    // 7. ADD CSS ANIMATION CLASS FOR GUEST NAME (cinematic)
    // ============================================================
    function injectGuestAnimationStyle() {
        if (!document.querySelector('#guestAnimationStyle')) {
            const style = document.createElement('style');
            style.id = 'guestAnimationStyle';
            style.textContent = `
                .guest-reveal {
                    animation: goldFlicker 0.6s ease forwards;
                }
                @keyframes goldFlicker {
                    0% { text-shadow: 0 0 0px #d4af37; opacity: 0.8; letter-spacing: 0px; }
                    50% { text-shadow: 0 0 12px #d4af37, 0 0 6px #b8860b; opacity: 1; letter-spacing: 2px; }
                    100% { text-shadow: 0 0 0px #d4af37; letter-spacing: normal; }
                }
                .panel-visible .greeting-container,
                .panel-visible .timeline-header,
                .panel-visible .rsvp-card-luxury {
                    animation: panelFadeUp 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards !important;
                }
                @keyframes panelFadeUp {
                    from { opacity: 0; transform: translateY(28px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ============================================================
    // 8. PERFORMANCE: DEBOUNCE RESIZE & LOW-END ANDROID OPTIMIZATION
    // ============================================================
    function optimizeForMobile() {
        // Detect if device is potentially low-end by checking memory or touch events
        if ('connection' in navigator && navigator.connection.saveData === true) {
            // Reduce motion if save-data enabled
            const styleReduce = document.createElement('style');
            styleReduce.textContent = `* { animation-duration: 0.01s !important; transition-duration: 0.01s !important; }`;
            document.head.appendChild(styleReduce);
        }
        
        // Disable heavy hover effects on touch devices to increase responsiveness
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
        }
    }

    // ============================================================
    // 9. INITIALIZE EVERYTHING WHEN DOM IS READY
    // ============================================================
    function init() {
        displayGuestName();
        initScrollReveals();
        initRSVPModal();
        initSmoothScrolling();
        initCinematicGlow();
        setDynamicMetadata();
        injectGuestAnimationStyle();
        optimizeForMobile();
        
        // Additional touch: preload subtle transition for all interactive cards
        const cards = document.querySelectorAll('.detail-card, .step, .rsvp-luxury-btn');
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                // just small passive interaction for responsiveness
                this.style.transform = 'scale(0.99)';
                setTimeout(() => { this.style.transform = ''; }, 150);
            });
        });
        
        // Log for verification (no console spam in production)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('✨ AURUM Luxury Invitation System Loaded | Guest: ' + (getGuestNameFromURL() || 'Guest'));
        }
    }
    
    // Run after full DOM content loaded for smoothness
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Expose optional global for debugging (not required for production, but harmless)
    window.AurumInvitation = {
        getGuest: getGuestNameFromURL,
        refreshGuest: displayGuestName
    };
})();
