const menu=document.getElementById('menuToggle');
const nav=document.getElementById('navLinks');
menu?.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('#navLinks a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

let lang=localStorage.getItem('darbLang')||'ar';
const langToggle=document.getElementById('langToggle');
const langLabel=document.getElementById('langLabel');

function applyLanguage(){
  document.documentElement.lang=lang;
  document.documentElement.dir=lang==='ar'?'rtl':'ltr';
  document.body.dir=document.documentElement.dir;
  document.querySelectorAll('[data-ar][data-en]').forEach(el=>{el.textContent=el.dataset[lang];});
  document.querySelectorAll('[data-placeholder-ar][data-placeholder-en]').forEach(el=>{el.placeholder=lang==='ar'?el.dataset.placeholderAr:el.dataset.placeholderEn;});
  document.querySelectorAll('option[data-ar][data-en]').forEach(el=>{el.textContent=el.dataset[lang];});
  langLabel.textContent=lang==='ar'?'EN':'AR';
  filterOffers();
}
langToggle?.addEventListener('click',()=>{lang=lang==='ar'?'en':'ar';localStorage.setItem('darbLang',lang);applyLanguage();});

const searchInput=document.getElementById('searchInput');
const locationFilter=document.getElementById('locationFilter');
const categoryFilter=document.getElementById('categoryFilter');
const discountFilter=document.getElementById('discountFilter');
const resetFilters=document.getElementById('resetFilters');
const cards=[...document.querySelectorAll('.offer')];
const resultsCount=document.getElementById('resultsCount');
const noResults=document.getElementById('noResults');

function filterOffers(){
  const q=(searchInput?.value||'').trim().toLowerCase();
  const loc=locationFilter?.value||'all';
  const cat=categoryFilter?.value||'all';
  const min=Number(discountFilter?.value||0);
  let visible=0;
  cards.forEach(card=>{
    const text=(lang==='ar'?card.dataset.searchAr:card.dataset.searchEn||'').toLowerCase();
    const ok=(!q||text.includes(q))&&(loc==='all'||card.dataset.location===loc)&&(cat==='all'||card.dataset.category===cat)&&Number(card.dataset.discount)>=min;
    card.classList.toggle('hidden',!ok);
    if(ok) visible++;
  });
  resultsCount.textContent=lang==='ar'?visible+' عروض':visible+' offers';
  noResults?.classList.toggle('hidden',visible!==0);
}
[searchInput,locationFilter,categoryFilter,discountFilter].forEach(el=>el?.addEventListener('input',filterOffers));
document.querySelectorAll('.quick-chip').forEach(btn=>btn.addEventListener('click',()=>{
  categoryFilter.value=btn.dataset.quickCategory;
  filterOffers();
  document.getElementById('offers')?.scrollIntoView({behavior:'smooth',block:'start'});
}));
resetFilters?.addEventListener('click',()=>{searchInput.value='';locationFilter.value='all';categoryFilter.value='all';discountFilter.value='0';filterOffers();});

const form=document.getElementById('companyForm');
const status=document.getElementById('formStatus');
form?.addEventListener('submit',e=>{e.preventDefault();status.textContent=lang==='ar'?'تم استلام النموذج تجريبيًا. سيتم ربطه بالبريد قبل الإطلاق التجاري.':'Demo form received. It will be connected to email before commercial launch.';});
document.getElementById('year').textContent=new Date().getFullYear();
applyLanguage();