// ---- WhatsApp number (international format, no + or spaces) ----
const WA_ORDER = '27656998695'; // 065 699 8695
const WA_BOOK  = WA_ORDER;      // bookings use the same number

const treatments = [
  {n:'Acne Facial', p:450, m:60, img:'acne-facial', d:'Targeted care for breakouts, with a calming acne serum and LED light.'},
  {n:'Signature Facial', p:500, m:75, img:'signature-facial', d:'Our full ritual with jade tools, facial balm and oil.'},
  {n:"Men's Facial", p:450, m:60, img:'mens-facial', d:'A deep charcoal cleanse and hydration designed for men.'},
  {n:'Dermaplaning', p:550, m:45, img:'dermaplaning', d:'Gentle exfoliation for instantly smooth skin, finished with hyaluronic serum.'},
  {n:'Hydrafacial', p:750, m:60, img:'hydrafacial', d:'Deep cleanse, exfoliation and intense hydration.'}
];

const products = [
  {n:'Rose Toner', p:210, c:'face', img:'rose-toner', t:'Calming, hydrating and alcohol-free. 100ml with natural rose water.'},
  {n:'Clay Detox Mask', p:250, c:'face', img:'clay-detox-mask', t:'Kaolin and bentonite clay to detoxify and purify. 100ml. Vegan.'},
  {n:'Niacinamide Serum', p:280, c:'face', img:'niacinamide-serum', t:'10% niacinamide to brighten and balance. 30ml.'},
  {n:'Hyaluronic Serum', p:350, c:'face', img:'hyaluronic-serum', t:'2% hyaluronic acid and vitamin B5 for intense hydration. 30ml.'},
  {n:'Facial Oil', p:320, c:'face', img:'facial-oil', t:'Cold-pressed argan and jojoba. Nourishes and restores radiance. 30ml.'},
  {n:'Salicylic Cleanser', p:220, c:'face', img:'salicylic-cleanser', t:'2% salicylic acid for oily, blemish-prone skin. 150ml.'},
  {n:'Soothing Aloe Gel', p:190, c:'face', img:'aloe-gel', t:'99% aloe vera with panthenol and allantoin. For sensitive skin. 100ml.'},
  {n:'SPF50 Sunscreen', p:280, c:'face', img:'spf50-sunscreen', t:'Broad spectrum UVA/UVB, weightless and non-comedogenic. 50ml.'},
  {n:"Men's Charcoal Cleanser", p:230, c:'men', img:'mens-charcoal-cleanser', t:'Activated charcoal, kaolin clay and peppermint. Oil control. 100ml.'},
  {n:'Beard Oil', p:200, c:'men', img:'beard-oil', t:'Jojoba, argan and cedarwood. Softens, reduces itch. 30ml.'},
  {n:'Jade Roller', p:180, c:'tools', img:'jade-roller', t:'100% natural jade. Cooling, reduces puffiness, promotes circulation.'}
];

const wa = (num, msg) => `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;

// Treatments (Hydrafacial has no photo yet: falls back to the logo)
document.getElementById('treatment-list').innerHTML = treatments.map(t => `
  <div class="t-row">
    <img src="images/${t.img === 'hydrafacial' ? 'logo' : t.img}.jpg" alt="${t.n}" loading="lazy">
    <div><h3>${t.n}</h3><p>${t.d}</p></div>
    <div class="t-price"><b>R${t.p}</b><span>${t.m} min</span>
      <a href="${wa(WA_BOOK, `Hi Lesedi, I'd like to book a ${t.n} (R${t.p}).`)}" target="_blank" rel="noopener">Book on WhatsApp</a></div>
  </div>`).join('');

// Products
const grid = document.getElementById('product-grid');
function render(f) {
  grid.innerHTML = products.filter(p => f === 'all' || p.c === f).map(p => `
    <article class="card">
      <img src="images/${p.img}.jpg" alt="${p.n}" loading="lazy">
      <div class="b"><h3>${p.n}</h3><p class="tag">${p.t}</p>
        <div class="row"><span class="price">R${p.p}</span>
        <a class="order" target="_blank" rel="noopener" href="${wa(WA_ORDER, `Hi Lesedi, I'd like to order: ${p.n} (R${p.p}).`)}">Order</a></div>
      </div>
    </article>`).join('');
}
render('all');
document.querySelectorAll('.filters button').forEach(b => b.onclick = () => {
  document.querySelectorAll('.filters button').forEach(x => x.classList.remove('on'));
  b.classList.add('on'); render(b.dataset.f);
});

// WhatsApp links in header/hero/contact
document.querySelectorAll('[data-wa]').forEach(a => {
  const book = a.dataset.wa === 'book';
  a.href = wa(book ? WA_BOOK : WA_ORDER, book ? "Hi Lesedi, I'd like to book a treatment." : "Hi Lesedi, I'd like to order products.");
  a.target = '_blank'; a.rel = 'noopener';
});

// Mobile menu
const nav = document.getElementById('nav'), mb = document.querySelector('.menu-btn');
mb.onclick = () => mb.setAttribute('aria-expanded', nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); mb.setAttribute('aria-expanded', false); }));

// Image lightbox
const lb = document.getElementById('lb'), lbi = lb.querySelector('img');
document.addEventListener('click', e => {
  if (e.target.matches('.card img, .t-row img, .collection img')) { lbi.src = e.target.src; lbi.alt = e.target.alt; lb.hidden = false; }
  else if (e.target === lb || e.target.matches('.lightbox button')) lb.hidden = true;
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.hidden = true; });
document.getElementById('yr').textContent = new Date().getFullYear();
