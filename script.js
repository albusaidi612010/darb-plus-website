const menu = document.getElementById('menuToggle');
const nav = document.getElementById('navLinks');

menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('#navLinks a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menu?.setAttribute('aria-expanded', 'false');
}));

const filters = document.querySelectorAll('.filter');
const offers = document.querySelectorAll('.offer');
filters.forEach(btn => btn.addEventListener('click', () => {
  filters.forEach(x => x.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.filter;
  offers.forEach(card => card.classList.toggle('hidden', f !== 'all' && card.dataset.category !== f));
}));

const form = document.getElementById('companyForm');
const status = document.getElementById('formStatus');
form?.addEventListener('submit', e => {
  e.preventDefault();
  status.textContent = 'تم التحقق من النموذج محليًا. اربطه بالبريد أو CRM عند النشر لاستلام الطلبات فعليًا.';
  status.style.color = '#123c33';
});

document.getElementById('year').textContent = new Date().getFullYear();