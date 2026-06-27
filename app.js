/* ── Mobile menu ── */
const menuToggle = document.getElementById('menuToggle');
const mobileNav  = document.getElementById('mobileNav');
const menuClose  = document.getElementById('menuClose');

menuToggle.addEventListener('click', () => mobileNav.classList.add('open'));
menuClose.addEventListener('click', closeMobileMenu);
function closeMobileMenu() { mobileNav.classList.remove('open'); }

/* ── Navbar shrink on scroll ── */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
}, { passive: true });

/* ── Scroll reveal ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
revealEls.forEach(el => revealObs.observe(el));

/* ── Counter animation ── */
function animateCount(el) {
  const target   = parseFloat(el.dataset.count);
  const decimal  = target % 1 !== 0;
  const duration = 1800;
  const start    = performance.now();

  const tick = (now) => {
    const p   = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    const val  = ease * target;
    el.textContent = decimal
      ? val.toFixed(1) + '%'
      : Math.floor(val) + '+';
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = decimal ? target.toFixed(1) + '%' : target + '+';
  };
  requestAnimationFrame(tick);
}

const countObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.counted) {
      e.target.dataset.counted = '1';
      animateCount(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => {
  el.textContent = '0';
  countObs.observe(el);
});

/* ── Contact form ── */
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const msg = document.getElementById('formMsg');
  msg.style.display = 'block';
  e.target.reset();
  setTimeout(() => { msg.style.display = 'none'; }, 5000);
});

/* ── Active nav link ── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 130) current = s.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--lime)' : '';
    a.style.borderColor = a.getAttribute('href') === '#' + current ? 'var(--lime)' : 'transparent';
  });
}, { passive: true });