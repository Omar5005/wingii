// --- Default Products Data ---
const defaultProducts = [
    { id: 1, name: "تيشيرت كلاسيك أسود", price: 45.00, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop", category: "men", subCategory: "men-tshirts", featured: true },
    { id: 2, name: "بنطال جينز عصري", price: 80.00, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop", category: "men", subCategory: "men-pants", featured: true },
    { id: 3, name: "فستان سهرة أنيق", price: 150.00, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop", category: "women", subCategory: "", featured: true },
    { id: 4, name: "هودي أوفر سايز", price: 60.00, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&auto=format&fit=crop", category: "hoodies", subCategory: "", featured: false },
    { id: 5, name: "ساعة يد فاخرة", price: 200.00, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&auto=format&fit=crop", category: "watches", subCategory: "", featured: true },
    { id: 6, name: "حقيبة جلدية", price: 120.00, image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&auto=format&fit=crop", category: "bags", subCategory: "", featured: false },
    { id: 7, name: "حذاء رياضي أبيض", price: 95.00, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop", category: "sneakers", subCategory: "", featured: true },
    { id: 8, name: "نظارة شمسية كلاسيك", price: 55.00, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop", category: "men", subCategory: "men-sunglasses", featured: false },
];

// --- Egypt Locations Data ---
const egyptLocations = {
    "القاهرة": ["مدينة نصر", "المعادي", "مصر الجديدة", "التجمع الخامس", "الرحاب", "شبرا", "وسط البلد", "حلوان", "المرج", "عين شمس"],
    "الجيزة": ["الدقي", "المهندسين", "6 أكتوبر", "الشيخ زايد", "الهرم", "فيصل", "إمبابة", "العجوزة", "بมารب"],
    "الإسكندرية": ["سموحة", "ميامي", "سيدي جابر", "المنتزه", "محطة الرمل", "المندرة", "العجمي", "سيدي بشر"],
    "القليوبية": ["بنها", "شبرا الخيمة", "القناطر الخيرية", "العبور", "طوخ", "قليوب"],
    "الدقهلية": ["المنصورة", "ميت غمر", "السنبلاوين", "طلخا", "دكرنس"],
    "الشرقية": ["الزقازيق", "العاشر من رمضان", "بلبيس", "منيا القمح", "أبو كبير"],
    "الغربية": ["طنطا", "المحلة الكبرى", "زفتى", "كفر الزيات"],
    "المنوفية": ["شبين الكوم", "منوف", "السادات", "أشمون", "قويسنا"],
    "أخرى": ["منطقة أخرى"]
};

// --- State Management ---
let products = JSON.parse(localStorage.getItem('wingii_products')) || defaultProducts;
let cart = JSON.parse(localStorage.getItem('wingii_cart')) || [];

// Save to Local Storage
function saveProducts() {
    localStorage.setItem('wingii_products', JSON.stringify(products));
}
function saveCart() {
    localStorage.setItem('wingii_cart', JSON.stringify(cart));
}

// Ensure default products are saved initially if empty
if (!localStorage.getItem('wingii_products')) {
    saveProducts();
}

// --- DOM Elements ---
const featuredContainer = document.getElementById('featuredProducts');
const categoryContainer = document.getElementById('categoryProducts');
const filterBtns = document.querySelectorAll('.filter-btn');
const subFilterBtns = document.querySelectorAll('.sub-filter-btn');
const menSubFilters = document.getElementById('menSubFilters');

const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const cartOverlay = document.getElementById('cartOverlay');
const cartItemsContainer = document.getElementById('cartItems');
const cartCountElements = document.querySelectorAll('.cart-count');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');

const checkoutOverlay = document.getElementById('checkoutOverlay');
const closeCheckout = document.getElementById('closeCheckout');
const checkoutForm = document.getElementById('checkoutForm');

// Auth Elements
const userBtn = document.getElementById('userBtn');
const authOverlay = document.getElementById('authOverlay');
const closeAuth = document.getElementById('closeAuth');
const authTabBtns = document.querySelectorAll('[data-authtab]');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const welcomeMsg = document.getElementById('welcomeMsg');
const logoutBtn = document.getElementById('logoutBtn');

// Checkout Location Elements
const orderGov = document.getElementById('orderGov');
const orderRegion = document.getElementById('orderRegion');

const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const searchInput = document.getElementById('searchInput');

// Forms
const consultationForm = document.getElementById('consultationForm');
const contactForm = document.getElementById('contactForm');
const complaintForm = document.getElementById('complaintForm');

// Admin Elements
const adminPanel = document.getElementById('adminPanel');
const closeAdminBtn = document.getElementById('closeAdminBtn');
const adminProductForm = document.getElementById('adminProductForm');
const adminProductsList = document.getElementById('adminProductsList');
const adminCategorySelect = document.getElementById('adminProductCategory');
const adminSubCategoryGroup = document.getElementById('adminSubCategoryGroup');
const adminCancelBtn = document.getElementById('adminCancelBtn');
const adminSaveBtn = document.getElementById('adminSaveBtn');


// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    renderFeaturedProducts();
    renderCategoryProducts('all');
    updateCartUI();
    checkAdminAccess();
    initScrollAnimations();
    checkUserSession();
    initGovernorates();
});

// --- Scroll Animations ---
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-scroll');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hidden-left, .hidden-right').forEach((el) => {
        observer.observe(el);
    });
}

// --- Auth Logic ---
function checkUserSession() {
    const currentUser = JSON.parse(localStorage.getItem('wingii_currentUser'));
    if (currentUser) {
        welcomeMsg.textContent = `مرحباً، ${currentUser.name.split(' ')[0]}`;
        welcomeMsg.classList.remove('hidden');
        userBtn.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
    } else {
        welcomeMsg.classList.add('hidden');
        userBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
    }
}

userBtn.addEventListener('click', () => authOverlay.classList.add('active'));
closeAuth.addEventListener('click', () => authOverlay.classList.remove('active'));
authOverlay.addEventListener('click', (e) => {
    if (e.target === authOverlay) authOverlay.classList.remove('active');
});

authTabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        authTabBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const tab = e.target.getAttribute('data-authtab');
        if (tab === 'loginTab') {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        } else {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        }
    });
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    
    let users = JSON.parse(localStorage.getItem('wingii_users')) || [];
    if (users.find(u => u.email === email)) {
        showToast('البريد الإلكتروني مسجل مسبقاً', 'error');
        return;
    }
    
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    localStorage.setItem('wingii_users', JSON.stringify(users));
    
    // Auto login
    localStorage.setItem('wingii_currentUser', JSON.stringify(newUser));
    showToast('تم التسجيل بنجاح!');
    authOverlay.classList.remove('active');
    checkUserSession();
    registerForm.reset();
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    let users = JSON.parse(localStorage.getItem('wingii_users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('wingii_currentUser', JSON.stringify(user));
        showToast('تم تسجيل الدخول بنجاح!');
        authOverlay.classList.remove('active');
        checkUserSession();
        loginForm.reset();
    } else {
        showToast('البريد الإلكتروني أو كلمة المرور غير صحيحة', 'error');
    }
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('wingii_currentUser');
    checkUserSession();
    showToast('تم تسجيل الخروج');
});

// --- Location Logic ---
function initGovernorates() {
    orderGov.innerHTML = '<option value="" disabled selected>المحافظة</option>';
    Object.keys(egyptLocations).forEach(gov => {
        orderGov.innerHTML += `<option value="${gov}">${gov}</option>`;
    });
}

orderGov.addEventListener('change', (e) => {
    const gov = e.target.value;
    orderRegion.innerHTML = '<option value="" disabled selected>المنطقة</option>';
    if (gov && egyptLocations[gov]) {
        egyptLocations[gov].forEach(region => {
            orderRegion.innerHTML += `<option value="${region}">${region}</option>`;
        });
        orderRegion.disabled = false;
    } else {
        orderRegion.disabled = true;
    }
});

// --- Render Products ---
function createProductCard(product) {
    return `
        <div class="product-card fade-in">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <span class="product-category">${getCategoryName(product.category)}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="btn btn-primary btn-block mlameh-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> إضافة للسلة
                </button>
            </div>
        </div>
    `;
}

function renderFeaturedProducts() {
    const featured = products.filter(p => p.featured).slice(0, 4); // Show max 4
    featuredContainer.innerHTML = featured.map(p => createProductCard(p)).join('');
}

function renderCategoryProducts(filter, subFilter = 'all') {
    let filtered = products;
    
    if (filter !== 'all') {
        filtered = filtered.filter(p => p.category === filter);
        
        if (filter === 'men' && subFilter !== 'all') {
            filtered = filtered.filter(p => p.subCategory === subFilter);
        }
    }

    if (filtered.length === 0) {
        categoryContainer.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">لا توجد منتجات في هذا القسم حالياً.</p>';
        return;
    }

    categoryContainer.innerHTML = filtered.map(p => createProductCard(p)).join('');
}

function getCategoryName(cat) {
    const categories = {
        'men': 'رجالي',
        'women': 'نسائي',
        'hoodies': 'هودي',
        'watches': 'ساعات',
        'bags': 'حقائب',
        'sneakers': 'أحذية رياضية'
    };
    return categories[cat] || cat;
}

// --- Filtering Logic ---
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Active state
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        const filter = e.target.getAttribute('data-filter');
        
        // Show/hide sub filters for men
        if (filter === 'men') {
            menSubFilters.classList.remove('hidden');
            // Reset sub filter active state
            subFilterBtns.forEach(b => b.classList.remove('active'));
            subFilterBtns[0].classList.add('active');
            renderCategoryProducts('men', 'all');
        } else {
            menSubFilters.classList.add('hidden');
            renderCategoryProducts(filter);
        }
    });
});

subFilterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        subFilterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        const subFilter = e.target.getAttribute('data-subfilter');
        renderCategoryProducts('men', subFilter);
    });
});

// --- Cart Logic ---
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartUI();
    showToast(`تمت إضافة ${product.name} إلى السلة`);
    cartOverlay.classList.add('active'); // Open cart to show user
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

function updateCartUI() {
    // Update Counts
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElements.forEach(el => el.textContent = totalItems);

    // Update Items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; padding: 20px;">السلة فارغة</p>';
        cartTotalPrice.textContent = '$0.00';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.name}</h4>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
        </div>
    `).join('');

    // Update Total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalPrice.textContent = `$${total.toFixed(2)}`;
}

// Cart Overlay toggles
cartBtn.addEventListener('click', () => cartOverlay.classList.add('active'));
closeCart.addEventListener('click', () => cartOverlay.classList.remove('active'));
cartOverlay.addEventListener('click', (e) => {
    if (e.target === cartOverlay) cartOverlay.classList.remove('active');
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showToast('السلة فارغة', 'error');
        return;
    }
    cartOverlay.classList.remove('active');
    
    // Pre-fill user data if logged in
    const currentUser = JSON.parse(localStorage.getItem('wingii_currentUser'));
    if (currentUser) {
        document.getElementById('orderName').value = currentUser.name;
    }
    
    checkoutOverlay.classList.add('active');
});

closeCheckout.addEventListener('click', () => {
    checkoutOverlay.classList.remove('active');
});

checkoutOverlay.addEventListener('click', (e) => {
    if (e.target === checkoutOverlay) checkoutOverlay.classList.remove('active');
});

checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const orderData = {
        name: document.getElementById('orderName').value,
        phone: document.getElementById('orderPhone').value,
        phone2: document.getElementById('orderPhone2').value,
        address: `${document.getElementById('orderGov').value} - ${document.getElementById('orderRegion').value} - ${document.getElementById('orderAddress').value}`,
        landmark: document.getElementById('orderLandmark').value,
        time: document.getElementById('orderTime').value,
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        date: new Date().toISOString()
    };
    
    let orders = JSON.parse(localStorage.getItem('wingii_orders')) || [];
    orders.push(orderData);
    localStorage.setItem('wingii_orders', JSON.stringify(orders));
    
    showToast('تم استلام طلبك بنجاح! سيتم التواصل معك قريباً لتأكيد الطلب.');
    cart = [];
    saveCart();
    updateCartUI();
    checkoutOverlay.classList.remove('active');
    checkoutForm.reset();
});


// --- UI Utilities ---
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.borderLeftColor = type === 'success' ? 'var(--success)' : 'var(--error)';
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
    } else {
        nav.style.boxShadow = 'none';
    }
});

// Mobile Menu
menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Search functionality
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    if(term === '') {
        renderCategoryProducts(document.querySelector('.filter-btn.active').getAttribute('data-filter'));
        return;
    }
    
    const filtered = products.filter(p => p.name.toLowerCase().includes(term));
    if (filtered.length === 0) {
        categoryContainer.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">لا توجد نتائج مطابقة لبحثك.</p>';
    } else {
        categoryContainer.innerHTML = filtered.map(p => createProductCard(p)).join('');
    }
});


// --- Forms Handling ---
consultationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById('consultName').value,
        email: document.getElementById('consultEmail').value,
        phone: document.getElementById('consultPhone').value,
        details: document.getElementById('consultDetails').value,
        date: new Date().toISOString()
    };
    
    // Save to local storage for demo purposes
    let consultations = JSON.parse(localStorage.getItem('wingii_consultations')) || [];
    consultations.push(data);
    localStorage.setItem('wingii_consultations', JSON.stringify(consultations));
    
    showToast('تم إرسال طلب الاستشارة بنجاح. سنتواصل معك قريباً.');
    consultationForm.reset();
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        message: document.getElementById('contactMessage').value,
        date: new Date().toISOString()
    };
    
    let messages = JSON.parse(localStorage.getItem('wingii_messages')) || [];
    messages.push(data);
    localStorage.setItem('wingii_messages', JSON.stringify(messages));
    
    showToast('تم إرسال رسالتك بنجاح.');
    contactForm.reset();
});

complaintForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById('compName').value,
        phone: document.getElementById('compPhone').value,
        type: document.getElementById('compType').value,
        message: document.getElementById('compMessage').value,
        date: new Date().toISOString()
    };
    
    let complaints = JSON.parse(localStorage.getItem('wingii_complaints')) || [];
    complaints.push(data);
    localStorage.setItem('wingii_complaints', JSON.stringify(complaints));
    
    showToast('تم إرسال رسالتك بنجاح. شكراً لتواصلك معنا.');
    complaintForm.reset();
    if(window.location.hash === '#admin') renderAdminComplaints();
});

// --- Admin Panel Logic ---

// Show/Hide Admin based on URL Hash
function checkAdminAccess() {
    if (window.location.hash === '#admin') {
        adminPanel.classList.remove('hidden');
        renderAdminProducts();
        renderAdminComplaints();
    } else {
        adminPanel.classList.add('hidden');
    }
}

window.addEventListener('hashchange', checkAdminAccess);

closeAdminBtn.addEventListener('click', () => {
    window.location.hash = ''; // Remove hash to hide admin
});

// Admin Tabs Logic
const adminTabBtns = document.querySelectorAll('.admin-tab-btn');
const productsTab = document.getElementById('productsTab');
const complaintsTabActual = document.getElementById('complaintsTabActual');
const adminComplaintsList = document.getElementById('adminComplaintsList');

adminTabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        adminTabBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        const tab = e.target.getAttribute('data-tab');
        if(tab === 'productsTab') {
            productsTab.style.display = 'grid'; // because admin-content is a grid usually
            complaintsTabActual.style.display = 'none';
        } else {
            productsTab.style.display = 'none';
            complaintsTabActual.style.display = 'block';
            renderAdminComplaints();
        }
    });
});

function renderAdminComplaints() {
    if(!adminComplaintsList) return;
    const complaints = JSON.parse(localStorage.getItem('wingii_complaints')) || [];
    if(complaints.length === 0) {
        adminComplaintsList.innerHTML = '<p>لا توجد رسائل حالياً.</p>';
        return;
    }
    
    adminComplaintsList.innerHTML = complaints.slice().reverse().map((c, i) => `
        <div class="complaint-card fade-in">
            <h4>${c.name} - <span style="color: var(--text-secondary); font-size: 0.9rem;">${c.type}</span></h4>
            <p><strong>رقم الهاتف:</strong> ${c.phone}</p>
            <p><strong>التاريخ:</strong> ${new Date(c.date).toLocaleDateString('ar-EG')}</p>
            <p style="margin-top: 10px; border-top: 1px solid var(--border-color); padding-top: 10px;">${c.message}</p>
            <button class="btn btn-outline" style="margin-top: 10px; padding: 5px 10px; font-size: 0.8rem;" onclick="deleteComplaint(${complaints.length - 1 - i})">حذف الرسالة</button>
        </div>
    `).join('');
}

window.deleteComplaint = function(index) {
    let complaints = JSON.parse(localStorage.getItem('wingii_complaints')) || [];
    if(confirm('هل أنت متأكد من حذف هذه الرسالة؟')) {
        complaints.splice(index, 1);
        localStorage.setItem('wingii_complaints', JSON.stringify(complaints));
        renderAdminComplaints();
    }
};

// Toggle Subcategory group visibility in admin form
adminCategorySelect.addEventListener('change', (e) => {
    if(e.target.value === 'men') {
        adminSubCategoryGroup.style.display = 'block';
    } else {
        adminSubCategoryGroup.style.display = 'none';
        document.getElementById('adminProductSubCategory').value = '';
    }
});

function renderAdminProducts() {
    if (products.length === 0) {
        adminProductsList.innerHTML = '<p>لا توجد منتجات.</p>';
        return;
    }
    
    adminProductsList.innerHTML = products.map(p => `
        <div class="admin-product-item">
            <img src="${p.image}" alt="${p.name}">
            <div class="admin-product-info">
                <h4>${p.name}</h4>
                <div>$${p.price.toFixed(2)} - ${getCategoryName(p.category)}</div>
            </div>
            <div class="admin-actions">
                <button class="btn btn-edit" onclick="editProduct(${p.id})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-delete" onclick="deleteProduct(${p.id})"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

// Add/Edit Product
adminProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const idInput = document.getElementById('adminProductId').value;
    const isEdit = idInput !== '';
    
    const newProduct = {
        id: isEdit ? parseInt(idInput) : Date.now(),
        name: document.getElementById('adminProductName').value,
        price: parseFloat(document.getElementById('adminProductPrice').value),
        image: document.getElementById('adminProductImage').value,
        category: document.getElementById('adminProductCategory').value,
        subCategory: document.getElementById('adminProductSubCategory').value,
        featured: document.getElementById('adminProductFeatured').checked
    };
    
    if (isEdit) {
        const index = products.findIndex(p => p.id === newProduct.id);
        if (index !== -1) {
            products[index] = newProduct;
            showToast('تم تحديث المنتج بنجاح');
        }
    } else {
        products.push(newProduct);
        showToast('تمت إضافة المنتج بنجاح');
    }
    
    saveProducts();
    resetAdminForm();
    renderAdminProducts();
    
    // Update main UI if changes were made
    renderFeaturedProducts();
    renderCategoryProducts(document.querySelector('.filter-btn.active').getAttribute('data-filter'));
});

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if(!product) return;
    
    document.getElementById('adminProductId').value = product.id;
    document.getElementById('adminProductName').value = product.name;
    document.getElementById('adminProductPrice').value = product.price;
    document.getElementById('adminProductImage').value = product.image;
    document.getElementById('adminProductCategory').value = product.category;
    
    if(product.category === 'men') {
        adminSubCategoryGroup.style.display = 'block';
        document.getElementById('adminProductSubCategory').value = product.subCategory || '';
    } else {
        adminSubCategoryGroup.style.display = 'none';
    }
    
    document.getElementById('adminProductFeatured').checked = product.featured;
    
    adminSaveBtn.textContent = 'تحديث المنتج';
    adminCancelBtn.classList.remove('hidden');
}

function deleteProduct(id) {
    if(confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
        products = products.filter(p => p.id !== id);
        
        // Also remove from cart if it exists there
        cart = cart.filter(item => item.id !== id);
        
        saveProducts();
        saveCart();
        renderAdminProducts();
        renderFeaturedProducts();
        renderCategoryProducts(document.querySelector('.filter-btn.active').getAttribute('data-filter'));
        updateCartUI();
        showToast('تم حذف المنتج', 'success');
    }
}

function resetAdminForm() {
    adminProductForm.reset();
    document.getElementById('adminProductId').value = '';
    adminSaveBtn.textContent = 'حفظ المنتج';
    adminCancelBtn.classList.add('hidden');
    adminSubCategoryGroup.style.display = 'block'; // default because men is first option
}

adminCancelBtn.addEventListener('click', resetAdminForm);
