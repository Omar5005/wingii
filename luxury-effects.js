/**
 * luxury-effects.js — WINGII Premium Frontend Effects
 * Handles: Custom Cursor, Preloader, 3D Tilt, Parallax, Navbar Scroll
 */

/* ─────────────── 1. PRELOADER ─────────────── */
(function () {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            // After hidden, remove from DOM so it doesn't block interactions
            setTimeout(() => preloader.remove(), 700);
        }, 1900);
    });
})();


/* ─────────────── 2. NAVBAR SCROLL GLOW ─────────────── */
(function () {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });
})();


/* ─────────────── 4. 3D TILT EFFECT on Product Cards ─────────────── */
function applyTiltToCards() {
    document.querySelectorAll('.product-card').forEach(card => {
        if (card.dataset.tiltBound) return; // prevent duplicate listeners
        card.dataset.tiltBound = '1';

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width  / 2;
            const cy = rect.height / 2;
            const rotateY = ((x - cx) / cx) * 6; // max 6deg
            const rotateX = ((cy - y) / cy) * 6;
            card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)';
            card.style.transition = 'transform 0.5s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease';
        });
    });
}

// Run on load and after dynamic renders
applyTiltToCards();

// Re-apply whenever new cards are injected via JS rendering
const tiltObserver = new MutationObserver(() => applyTiltToCards());
const grids = document.querySelectorAll('#featuredProducts, #categoryProducts');
grids.forEach(grid => {
    if (grid) tiltObserver.observe(grid, { childList: true });
});


/* ─────────────── 5. HERO PARALLAX ─────────────── */
(function () {
    const heroImg = document.querySelector('.hero-image img');
    if (!heroImg) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        heroImg.style.transform = `translateY(${scrolled * 0.18}px)`;
    }, { passive: true });
})();


/* ─────────────── 6. GOLD DIVIDERS under section titles ─────────────── */
(function () {
    document.querySelectorAll('.section-title').forEach(title => {
        if (!title.nextElementSibling || !title.nextElementSibling.classList.contains('luxury-divider')) {
            const div = document.createElement('div');
            div.className = 'luxury-divider';
            title.insertAdjacentElement('afterend', div);
        }
    });
})();


/* ─────────────── 7. FADE-IN STAGGER for product grid items ─────────────── */
function staggerFadeIn(container) {
    if (!container) return;
    const items = container.querySelectorAll('.product-card, .category-card');
    items.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'none';
        setTimeout(() => {
            el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 50);
    });
}

// Hook into MutationObserver to stagger on dynamic load
const staggerObserver = new MutationObserver((mutations) => {
    mutations.forEach(m => {
        if (m.addedNodes.length > 0) {
            staggerFadeIn(m.target);
            applyTiltToCards();
        }
    });
});

document.querySelectorAll('#featuredProducts, #categoryProducts').forEach(grid => {
    if (grid) staggerObserver.observe(grid, { childList: true });
});
