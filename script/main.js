// ── Menu ──
const burger  = document.getElementById('burgerBtn');
const overlay = document.getElementById('menuOverlay');

function lockScroll() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const scrollY = window.scrollY;
    document.body.dataset.scrollY = scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top      = `-${scrollY}px`;
    document.body.style.left     = '0';
    document.body.style.right    = '0';
    document.body.style.width    = '100%';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.getElementById('mainNav').style.paddingRight = `${scrollbarWidth}px`;
}

function unlockScroll() {
    const scrollY = parseInt(document.body.dataset.scrollY || '0');
    document.body.style.position    = '';
    document.body.style.top         = '';
    document.body.style.left        = '';
    document.body.style.right       = '';
    document.body.style.width       = '';
    document.body.style.paddingRight = '';
    document.getElementById('mainNav').style.paddingRight = '';
    window.scrollTo(0, scrollY);
}

burger.addEventListener('click', () => {
    const open = overlay.classList.toggle('open');
    burger.classList.toggle('open', open);
    if (open) {
        lockScroll();
    } else {
        unlockScroll();
    }
});

document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', () => {
        overlay.classList.remove('open');
        burger.classList.remove('open');
        unlockScroll();
    });
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
        overlay.classList.remove('open');
        burger.classList.remove('open');
        unlockScroll();
    }
});

// ── Scroll reveal ──
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── FAQ ──
document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
        const item   = btn.parentElement;
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    });
});

// ── Nav scroll ──
window.addEventListener('scroll', () => {
    document.getElementById('mainNav').style.background =
        window.scrollY > 60 ? 'rgba(10,10,10,0.94)' : 'rgba(10,10,10,0.6)';
});

// ── Hero parallax ──
window.addEventListener('scroll', () => {
    const s = window.scrollY;
    if (s < window.innerHeight)
        document.getElementById('hero').style.transform = `translateY(${s * 0.22}px)`;
});
