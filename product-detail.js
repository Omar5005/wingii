/**
 * product-detail.js — WINGII Product Detail Modal
 * Handles: Gallery, Size/Color selectors, Cart integration
 */

// ─── Enrich products with extra data if missing ───
function enrichProducts(products) {
    const extras = {
        1:  { images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&auto=format&fit=crop"], sizes:[{s:"S",ok:true},{s:"M",ok:true},{s:"L",ok:false},{s:"XL",ok:true},{s:"XXL",ok:true}], colors:[{n:"أسود",en:"Black",hex:"#1a1a1a",ok:true},{n:"أبيض",en:"White",hex:"#f0f0f0",ok:true},{n:"رمادي",en:"Gray",hex:"#9e9e9e",ok:false}], desc:"تيشيرت كلاسيكي فاخر من قطن ممشط عالي الجودة.", descEn:"Premium combed cotton classic fit t-shirt." },
        2:  { images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1475178626620-a4d074967452?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop"], sizes:[{s:"28",ok:true},{s:"30",ok:true},{s:"32",ok:true},{s:"34",ok:false},{s:"36",ok:true}], colors:[{n:"أزرق داكن",en:"Dark Blue",hex:"#1565c0",ok:true},{n:"أسود",en:"Black",hex:"#1a1a1a",ok:true},{n:"رمادي",en:"Gray",hex:"#cfd8dc",ok:true}], desc:"بنطال جينز عصري بقصة slim fit مريح.", descEn:"Modern slim fit jeans with premium denim fabric." },
        3:  { images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop"], sizes:[{s:"XS",ok:true},{s:"S",ok:true},{s:"M",ok:true},{s:"L",ok:false}], colors:[{n:"أحمر",en:"Red",hex:"#e53935",ok:true},{n:"أسود",en:"Black",hex:"#1a1a1a",ok:true},{n:"ذهبي",en:"Gold",hex:"#d4a853",ok:false}], desc:"فستان سهرة أنيق يناسب المناسبات الخاصة.", descEn:"Elegant evening dress perfect for special occasions." },
        4:  { images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=600&auto=format&fit=crop"], sizes:[{s:"S",ok:true},{s:"M",ok:true},{s:"L",ok:true},{s:"XL",ok:true},{s:"XXL",ok:false}], colors:[{n:"بيج",en:"Beige",hex:"#d7c4a8",ok:true},{n:"أسود",en:"Black",hex:"#1a1a1a",ok:true},{n:"أخضر",en:"Olive",hex:"#558b2f",ok:true}], desc:"هودي أوفر سايز دافئ وعصري للاستخدام اليومي.", descEn:"Warm and stylish oversized hoodie for everyday wear." },
        5:  { images: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1622434641406-a158123450f9?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600&auto=format&fit=crop"], sizes:[{s:"One Size",ok:true}], colors:[{n:"ذهبي",en:"Gold",hex:"#d4a853",ok:true},{n:"فضي",en:"Silver",hex:"#9e9e9e",ok:true},{n:"أسود",en:"Black",hex:"#1a1a1a",ok:false}], desc:"ساعة يد فاخرة بتصميم كلاسيكي راقٍ.", descEn:"Luxury timepiece with a classic elegant design." },
        6:  { images: ["https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&auto=format&fit=crop"], sizes:[{s:"One Size",ok:true}], colors:[{n:"بني",en:"Brown",hex:"#6d4c41",ok:true},{n:"أسود",en:"Black",hex:"#1a1a1a",ok:true},{n:"كريمي",en:"Cream",hex:"#f5f0e8",ok:false}], desc:"حقيبة جلد طبيعي إيطالي متعددة الاستخدامات.", descEn:"Multi-use genuine Italian leather bag." },
        7:  { images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop"], sizes:[{s:"40",ok:true},{s:"41",ok:true},{s:"42",ok:true},{s:"43",ok:false},{s:"44",ok:true},{s:"45",ok:false}], colors:[{n:"أبيض",en:"White",hex:"#f5f5f5",ok:true},{n:"رمادي",en:"Gray",hex:"#9e9e9e",ok:true},{n:"أسود",en:"Black",hex:"#1a1a1a",ok:false}], desc:"حذاء رياضي أنيق مناسب للارتداء اليومي.", descEn:"Stylish everyday sneakers for casual wear." },
        8:  { images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1473496169904-658ba7574b0d?w=600&auto=format&fit=crop"], sizes:[{s:"One Size",ok:true}], colors:[{n:"أسود",en:"Black",hex:"#1a1a1a",ok:true},{n:"ذهبي",en:"Gold",hex:"#d4a853",ok:true},{n:"بني",en:"Tortoise",hex:"#a0522d",ok:false}], desc:"نظارة شمسية كلاسيكية بحماية UV400.", descEn:"Classic sunglasses with UV400 protection." },
        9:  { images: ["https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1614252234498-0a9e1e29e5b7?w=600&auto=format&fit=crop"], sizes:[{s:"40",ok:true},{s:"41",ok:true},{s:"42",ok:false},{s:"43",ok:true},{s:"44",ok:true},{s:"45",ok:false}], colors:[{n:"بني",en:"Brown",hex:"#6d4c41",ok:true},{n:"أسود",en:"Black",hex:"#1a1a1a",ok:true}], desc:"حذاء جلد إيطالي أصيل مصنوع يدوياً للمناسبات الراقية.", descEn:"Authentic handcrafted Italian leather shoes for formal occasions." },
        10: { images: ["https://images.unsplash.com/photo-1531310197839-ccf54634509e?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop"], sizes:[{s:"41",ok:true},{s:"42",ok:true},{s:"43",ok:true},{s:"44",ok:false},{s:"45",ok:true}], colors:[{n:"بني داكن",en:"Dark Brown",hex:"#4e342e",ok:true},{n:"بني فاتح",en:"Light Brown",hex:"#a1887f",ok:false}], desc:"حذاء أكسفورد كلاسيكي بني اللون لأناقة دائمة.", descEn:"Classic brown Oxford shoes for timeless elegance." },
        11: { images: ["https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1604006852748-903fccbc4019?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&auto=format&fit=crop"], sizes:[{s:"S",ok:true},{s:"M",ok:true},{s:"L",ok:true},{s:"XL",ok:false}], colors:[{n:"أبيض",en:"White",hex:"#f5f5f5",ok:true},{n:"بيج",en:"Beige",hex:"#d7c4a8",ok:true},{n:"أزرق",en:"Blue",hex:"#1976d2",ok:true}], desc:"قميص كتان إيطالي خفيف وعصري مثالي للصيف.", descEn:"Light and stylish Italian linen shirt, perfect for summer." },
        12: { images: ["https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1614188819090-f25b7b50ffdb?w=600&auto=format&fit=crop"], sizes:[{s:"One Size",ok:true}], colors:[{n:"وردي",en:"Pink",hex:"#f48fb1",ok:true},{n:"بيج",en:"Beige",hex:"#d7c4a8",ok:true},{n:"أحمر",en:"Red",hex:"#e53935",ok:false}], desc:"حقيبة يد نسائية عصرية ومتميزة لكل الإطلالات.", descEn:"Trendy women's handbag for all outfit styles." }
    };

    products.forEach(p => {
        const ex = extras[p.id];
        if (ex) {
            if (!p.images)  p.images  = ex.images;
            if (!p.sizes)   p.sizes   = ex.sizes;
            if (!p.colors)  p.colors  = ex.colors;
            if (!p.desc)    p.desc    = ex.desc;
            if (!p.descEn)  p.descEn  = ex.descEn;
        }
        // Fallback defaults
        if (!p.images)  p.images  = [p.image];
        if (!p.sizes)   p.sizes   = [{s:"One Size", ok:true}];
        if (!p.colors)  p.colors  = [];
    });
    return products;
}

// ─── State ───
let pdCurrentProduct = null;
let pdCurrentImgIdx  = 0;
let pdSelectedSize   = null;
let pdSelectedColor  = null;

// ─── DOM refs ───
const pdOverlay        = document.getElementById('productDetailOverlay');
const pdCloseBtn       = document.getElementById('pdClose');
const pdMainImg        = document.getElementById('pdMainImg');
const pdThumbnails     = document.getElementById('pdThumbnails');
const pdPrev           = document.getElementById('pdPrev');
const pdNext           = document.getElementById('pdNext');
const pdBadge          = document.getElementById('pdBadge');
const pdName           = document.getElementById('pdName');
const pdPrice          = document.getElementById('pdPrice');
const pdDesc           = document.getElementById('pdDesc');
const pdColors         = document.getElementById('pdColors');
const pdSizes          = document.getElementById('pdSizes');
const pdSelectedColorEl= document.getElementById('pdSelectedColor');
const pdSelectedSizeEl = document.getElementById('pdSelectedSize');
const pdAddBtn         = document.getElementById('pdAddBtn');
const pdUnavailMsg     = document.getElementById('pdUnavailableMsg');
const pdColorsSection  = document.getElementById('pdColorsSection');
const pdSizesSection   = document.getElementById('pdSizesSection');

// ─── Open Modal ───
function openProductDetail(productId) {
    // Make sure products array is enriched
    enrichProducts(products);

    const p = products.find(x => x.id === productId);
    if (!p) return;

    pdCurrentProduct = p;
    pdCurrentImgIdx  = 0;
    pdSelectedSize   = null;
    pdSelectedColor  = null;

    const lang = (typeof currentLang !== 'undefined') ? currentLang : 'ar';

    // Name & Price
    pdName.textContent  = lang === 'ar' ? p.name : (p.nameEn || p.name);
    pdPrice.textContent = `$${p.price.toFixed(2)}`;
    pdDesc.textContent  = lang === 'ar' ? (p.desc || '') : (p.descEn || p.desc || '');
    pdBadge.textContent = lang === 'ar' ? 'جديد' : 'NEW';

    // Gallery
    renderGallery(p.images);

    // Colors
    if (p.colors && p.colors.length > 0) {
        pdColorsSection.style.display = '';
        renderColors(p.colors, lang);
    } else {
        pdColorsSection.style.display = 'none';
    }

    // Sizes
    renderSizes(p.sizes);

    pdUnavailMsg.classList.add('hidden');
    pdAddBtn.disabled = false;

    pdOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ─── Gallery ───
function renderGallery(images) {
    pdMainImg.src = images[0];
    pdMainImg.classList.remove('fade');

    pdThumbnails.innerHTML = '';
    images.forEach((src, i) => {
        const img = document.createElement('img');
        img.src       = src;
        img.alt       = `img ${i+1}`;
        img.className = 'pd-thumb' + (i === 0 ? ' active' : '');
        img.addEventListener('click', () => switchImage(i));
        pdThumbnails.appendChild(img);
    });
}

function switchImage(idx) {
    const images = pdCurrentProduct.images || [pdCurrentProduct.image];
    if (idx < 0) idx = images.length - 1;
    if (idx >= images.length) idx = 0;
    pdCurrentImgIdx = idx;

    pdMainImg.classList.add('fade');
    setTimeout(() => {
        pdMainImg.src = images[idx];
        pdMainImg.classList.remove('fade');
    }, 250);

    document.querySelectorAll('.pd-thumb').forEach((t, i) => {
        t.classList.toggle('active', i === idx);
    });
}

pdPrev.addEventListener('click', () => switchImage(pdCurrentImgIdx - 1));
pdNext.addEventListener('click', () => switchImage(pdCurrentImgIdx + 1));

// ─── Colors ───
function renderColors(colors, lang) {
    pdColors.innerHTML = '';
    pdSelectedColorEl.textContent = '';
    colors.forEach((c, i) => {
        const swatch = document.createElement('div');
        swatch.className  = 'pd-color-swatch' + (!c.ok ? ' unavailable' : '');
        swatch.style.backgroundColor = c.hex;
        swatch.title      = lang === 'ar' ? c.n : c.en;

        swatch.addEventListener('click', () => {
            if (!c.ok) {
                swatch.classList.add('shake');
                setTimeout(() => swatch.classList.remove('shake'), 450);
                showUnavailMsg();
                return;
            }
            pdColors.querySelectorAll('.pd-color-swatch').forEach(s => s.classList.remove('selected'));
            swatch.classList.add('selected');
            pdSelectedColor = c;
            pdSelectedColorEl.textContent = lang === 'ar' ? c.n : c.en;
            pdUnavailMsg.classList.add('hidden');
            checkCanAddToCart();
        });

        pdColors.appendChild(swatch);
    });
}

// ─── Sizes ───
function renderSizes(sizes) {
    pdSizes.innerHTML = '';
    pdSelectedSizeEl.textContent = '';
    sizes.forEach(sz => {
        const btn = document.createElement('button');
        btn.textContent = sz.s;
        btn.className   = 'pd-size-btn' + (!sz.ok ? ' unavailable' : '');

        btn.addEventListener('click', () => {
            if (!sz.ok) {
                btn.classList.add('shake');
                setTimeout(() => btn.classList.remove('shake'), 450);
                showUnavailMsg();
                return;
            }
            pdSizes.querySelectorAll('.pd-size-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            pdSelectedSize = sz.s;
            pdSelectedSizeEl.textContent = sz.s;
            pdUnavailMsg.classList.add('hidden');
            checkCanAddToCart();
        });

        pdSizes.appendChild(btn);
    });
}

function showUnavailMsg() {
    pdUnavailMsg.classList.remove('hidden');
    setTimeout(() => pdUnavailMsg.classList.add('hidden'), 3000);
}

function checkCanAddToCart() {
    // Require size if more than one option
    const sizes  = pdCurrentProduct.sizes || [];
    const colors = pdCurrentProduct.colors || [];
    const needsSize  = !(sizes.length === 1 && sizes[0].s === 'One Size');
    const needsColor = colors.length > 0;

    const sizeOk  = !needsSize  || pdSelectedSize  !== null;
    const colorOk = !needsColor || pdSelectedColor !== null;

    pdAddBtn.disabled = !(sizeOk && colorOk);
}

// ─── Add to Cart ───
pdAddBtn.addEventListener('click', () => {
    if (!pdCurrentProduct) return;

    const p = pdCurrentProduct;
    const lang = (typeof currentLang !== 'undefined') ? currentLang : 'ar';
    const sizes  = p.sizes  || [];
    const colors = p.colors || [];
    const needsSize  = !(sizes.length === 1 && sizes[0].s === 'One Size');
    const needsColor = colors.filter(c => c.ok).length > 0;

    if (needsSize && !pdSelectedSize) {
        pdSizes.querySelectorAll('.pd-size-btn:not(.unavailable)')[0]?.classList.add('shake');
        setTimeout(() => pdSizes.querySelectorAll('.pd-size-btn').forEach(b => b.classList.remove('shake')), 450);
        return;
    }
    if (needsColor && !pdSelectedColor) {
        showUnavailMsg();
        return;
    }

    // Build cart item
    const cartItem = {
        id:    p.id,
        name:  lang === 'ar' ? p.name : (p.nameEn || p.name),
        price: p.price,
        image: p.image,
        size:  pdSelectedSize  || 'One Size',
        color: pdSelectedColor ? (lang === 'ar' ? pdSelectedColor.n : pdSelectedColor.en) : '',
        qty:   1
    };

    // Use existing addToCart if available, otherwise push manually
    if (typeof addToCart === 'function') {
        addToCart(p.id, cartItem.size, cartItem.color);
    } else {
        let cartData = JSON.parse(localStorage.getItem('wingii_cart') || '[]');
        const existing = cartData.find(i => i.id === cartItem.id && i.size === cartItem.size && i.color === cartItem.color);
        if (existing) { existing.qty++; } else { cartData.push(cartItem); }
        localStorage.setItem('wingii_cart', JSON.stringify(cartData));
        if (typeof updateCartUI === 'function') updateCartUI();
    }

    // Visual feedback
    pdAddBtn.innerHTML = '<i class="fas fa-check"></i> ' + (lang === 'ar' ? 'تمت الإضافة!' : 'Added!');
    pdAddBtn.style.background = '#5B8B6C';
    setTimeout(() => {
        pdAddBtn.innerHTML = '<i class="fas fa-shopping-bag"></i> <span>' + (lang === 'ar' ? 'أضف إلى السلة' : 'Add to Cart') + '</span>';
        pdAddBtn.style.background = '';
        closeProductDetail();
    }, 1200);
});

// ─── Close Modal ───
function closeProductDetail() {
    pdOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

pdCloseBtn.addEventListener('click', closeProductDetail);
pdOverlay.addEventListener('click', e => { if (e.target === pdOverlay) closeProductDetail(); });

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeProductDetail();
    if (!pdOverlay.classList.contains('active')) return;
    if (e.key === 'ArrowLeft')  switchImage(pdCurrentImgIdx - 1);
    if (e.key === 'ArrowRight') switchImage(pdCurrentImgIdx + 1);
});

// ─── Hook product cards to open modal ───
function hookProductCards() {
    document.querySelectorAll('.product-card').forEach(card => {
        if (card.dataset.pdBound) return;
        card.dataset.pdBound = '1';

        // Override the default add-to-cart click on image/name area
        const img  = card.querySelector('.product-image, img');
        const name = card.querySelector('.product-name, h3');
        [img, name].forEach(el => {
            if (!el) return;
            el.style.cursor = 'pointer';
            el.addEventListener('click', e => {
                const id = parseInt(card.getAttribute('data-id') || card.dataset.id);
                if (id) { e.stopPropagation(); openProductDetail(id); }
            });
        });
    });
}

// Run + observe for dynamic renders
hookProductCards();
const pdMutObs = new MutationObserver(() => hookProductCards());
document.querySelectorAll('#featuredProducts, #categoryProducts').forEach(g => {
    if (g) pdMutObs.observe(g, { childList: true });
});
