const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
const navLinks = document.querySelectorAll('.site-nav a');
const revealItems = document.querySelectorAll('.reveal');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  siteNav.classList.toggle('open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.site-nav a').forEach(link => {
  const href = link.getAttribute('href');

  if (!href) return;

  if (href === currentPage) {
    link.classList.add('active');
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealItems.forEach(item => observer.observe(item));

const sections = document.querySelectorAll('main section[id]');

window.addEventListener('scroll', () => {
  const offset = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.site-nav a[href="#${id}"]`);

    if (!link) return;

    link.classList.toggle('active', offset >= top && offset < bottom);
  });
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const message = String(data.get('message') || '').trim();

  if (!name || !email || !message) {
    formMessage.textContent = 'Vinsamlegast fylltu út nafn, netfang og skilaboð.';
    return;
  }

  formMessage.textContent = 'Takk fyrir! Tengdu formið við netþjón eða Formspree til að senda raunveruleg skilaboð.';
  contactForm.reset();
});

