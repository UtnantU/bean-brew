

const toggle    = document.querySelector('.nav-toggle');
const mobileNav = document.getElementById('nav-mobile');

toggle.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  });
});

const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10
    ? '0 2px 16px rgba(74,44,42,0.12)'
    : 'none';
}, { passive: true });

// Back to top
const backBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
  const linkPage = link.getAttribute('href').split('#')[0];
  link.classList.toggle('active', linkPage === currentPage);
});

//  Booking form validation & submit 
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // Validate required fields
    bookingForm.querySelectorAll('[required]').forEach(field => {
      const group = field.closest('.form-group');
      const empty = field.value.trim() === '';
      const badEmail = field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
      const badNum = field.type === 'number' && (field.value < 1 || field.value > 10);

      if (empty || badEmail || badNum) {
        group.classList.add('has-error');
        field.classList.add('invalid');
        valid = false;
      } else {
        group.classList.remove('has-error');
        field.classList.remove('invalid');
      }
    });

    if (!valid) return;

    // Show success
    bookingForm.hidden = true;
    document.getElementById('bookingSuccess').hidden = false;
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Clear error on input
  bookingForm.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.classList.remove('invalid');
      field.closest('.form-group')?.classList.remove('has-error');
    });
  });
}

//  Contact form validation & submit
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    contactForm.querySelectorAll('[required]').forEach(field => {
      const group = field.closest('.form-group');
      const empty = field.value.trim() === '';
      const badEmail = field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);

      if (empty || badEmail) {
        group.classList.add('has-error');
        field.classList.add('invalid');
        valid = false;
      } else {
        group.classList.remove('has-error');
        field.classList.remove('invalid');
      }
    });

    if (!valid) return;

    contactForm.hidden = true;
    document.getElementById('contactSuccess').hidden = false;
  });

  contactForm.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.classList.remove('invalid');
      field.closest('.form-group')?.classList.remove('has-error');
    });
  });
}