const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  menuToggle.textContent = isOpen ? '×' : '☰';
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) {
      menuToggle.textContent = '☰';
      menuToggle.setAttribute('aria-label', 'Open navigation');
    }
  });
});

// Service cards preselect the relevant service in the enquiry form.
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    const serviceSelect = document.querySelector('#service');
    if (serviceSelect) {
      const requested = link.dataset.service;
      const option = [...serviceSelect.options].find(item => item.text === requested);
      if (option) serviceSelect.value = option.value;
    }
  });
});

// Accessible FAQ accordion.
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    item.classList.toggle('open', !expanded);
  });
});

// No backend is needed for this mockup: the form creates a WhatsApp message.
document.querySelector('#enquiryForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const message = [
    'Hi Rose Nanny Agency, I would like to enquire about a placement.',
    '',
    `Name: ${data.get('fullName')}`,
    `Area: ${data.get('area')}`,
    `Service needed: ${data.get('service')}`,
    `Preferred arrangement: ${data.get('workType')}`,
    `Additional details: ${data.get('details') || 'Not provided yet'}`
  ].join('\n');
  const whatsappUrl = `https://wa.me/27781935695?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
});

document.querySelector('#year').textContent = new Date().getFullYear();
