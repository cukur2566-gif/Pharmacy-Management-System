// js/app.js - MediCore Pharmacy ERP with Premium Unsplash Images

// ========== PREMIUM REAL PHARMACY IMAGES (UNSPLASH) ==========
const medicineImages = {
    'Paracetamol': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80',
    'Amoxicillin': 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500&q=80',
    'Ibuprofen': 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=500&q=80',
    'Vitamin': 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=500&q=80',
    'Cetirizine': 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500&q=80',
    'Omeprazole': 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=500&q=80',
    'Cough': 'https://images.unsplash.com/photo-1584308666221-484074d90049?auto=format&fit=crop&w=500&q=80',
    'Aspirin': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80',
    'Insulin': 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500&q=80',
    'Antibiotic': 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500&q=80',
    'Ambroxol': 'https://images.unsplash.com/photo-1584308666221-484074d90049?auto=format&fit=crop&w=500&q=80',
    'Loratadine': 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500&q=80',
    'Metformin': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80',
    'Atorvastatin': 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=500&q=80',
    'Losartan': 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=500&q=80',
    'Salbutamol': 'https://images.unsplash.com/photo-1584308666221-484074d90049?auto=format&fit=crop&w=500&q=80',
    'default': 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500&q=80'
};

// Fallback images that ALWAYS work (Flaticon CDN)
const FALLBACK_IMAGES = {
    'Paracetamol': 'https://cdn-icons-png.flaticon.com/512/3096/3096991.png',
    'Amoxicillin': 'https://cdn-icons-png.flaticon.com/512/3003/3003001.png',
    'Ibuprofen': 'https://cdn-icons-png.flaticon.com/512/3050/3050931.png',
    'Vitamin': 'https://cdn-icons-png.flaticon.com/512/3235/3235705.png',
    'Cetirizine': 'https://cdn-icons-png.flaticon.com/512/2922/2922568.png',
    'Omeprazole': 'https://cdn-icons-png.flaticon.com/512/2818/2818615.png',
    'Cough': 'https://cdn-icons-png.flaticon.com/512/196/196287.png',
    'default': 'https://cdn-icons-png.flaticon.com/512/3096/3096991.png'
};

function getMedicineImage(name) {
    // Try to find matching Unsplash image first
    for (let key in medicineImages) {
        if (name.toLowerCase().includes(key.toLowerCase())) {
            return medicineImages[key];
        }
    }
    return medicineImages.default;
}

function getFallbackImage(name) {
    for (let key in FALLBACK_IMAGES) {
        if (name.toLowerCase().includes(key.toLowerCase())) {
            return FALLBACK_IMAGES[key];
        }
    }
    return FALLBACK_IMAGES.default;
}

// Handle image errors - automatically use fallback
function handleImageError(img, medicineName) {
    img.onerror = null; // Prevent infinite loop
    img.src = getFallbackImage(medicineName);
}

// ========== DATA MODEL ==========
let appData = {
    medicines: [],
    suppliers: [],
    sales: [],
    nextId: 21
};

let currentPage = 'dashboard';
let charts = {};
let currentCart = [];

// ========== INITIALIZE WITH 20+ MEDICINES ==========
function loadInitialData() {
    const saved = localStorage.getItem('medicore_erp');
    if (saved) {
        appData = JSON.parse(saved);
    } else {
        // 20 Medicines with premium Unsplash images
        appData.medicines = [
            { id: 1, name: 'Paracetamol 500mg', brand: 'Tylenol', category: 'Analgesic', stock: 342, price: 4.99, cost: 2.50, expiry: '2026-12-15', supplier: 'MediSource', sales: 245, image: getMedicineImage('Paracetamol') },
            { id: 2, name: 'Amoxicillin 500mg', brand: 'Amoxil', category: 'Antibiotic', stock: 89, price: 12.99, cost: 6.50, expiry: '2025-11-20', supplier: 'PharmaCorp', sales: 132, image: getMedicineImage('Amoxicillin') },
            { id: 3, name: 'Ibuprofen 400mg', brand: 'Advil', category: 'NSAID', stock: 215, price: 7.49, cost: 3.20, expiry: '2026-08-10', supplier: 'HealthPlus', sales: 187, image: getMedicineImage('Ibuprofen') },
            { id: 4, name: 'Vitamin D3 1000IU', brand: 'NatureWise', category: 'Supplements', stock: 128, price: 15.99, cost: 8.00, expiry: '2027-01-05', supplier: 'VitaHealth', sales: 98, image: getMedicineImage('Vitamin') },
            { id: 5, name: 'Cetirizine 10mg', brand: 'Zyrtec', category: 'Antihistamine', stock: 56, price: 9.99, cost: 4.50, expiry: '2026-03-18', supplier: 'AllergyCare', sales: 76, image: getMedicineImage('Cetirizine') },
            { id: 6, name: 'Omeprazole 20mg', brand: 'Prilosec', category: 'Gastro', stock: 34, price: 11.49, cost: 5.20, expiry: '2025-12-01', supplier: 'GastroHealth', sales: 112, image: getMedicineImage('Omeprazole') },
            { id: 7, name: 'Cough Syrup', brand: 'Robitussin', category: 'Respiratory', stock: 67, price: 8.99, cost: 3.80, expiry: '2026-02-28', supplier: 'RespCare', sales: 145, image: getMedicineImage('Cough') },
            { id: 8, name: 'Aspirin 100mg', brand: 'Bayer', category: 'Analgesic', stock: 12, price: 3.99, cost: 1.50, expiry: '2025-10-10', supplier: 'MediSource', sales: 203, image: getMedicineImage('Aspirin') },
            { id: 9, name: 'Insulin R 100IU', brand: 'Humulin', category: 'Diabetes', stock: 45, price: 45.99, cost: 28.00, expiry: '2026-01-15', supplier: 'DiabeticCare', sales: 67, image: getMedicineImage('Insulin') },
            { id: 10, name: 'Azithromycin 250mg', brand: 'Zithromax', category: 'Antibiotic', stock: 78, price: 18.99, cost: 9.50, expiry: '2026-04-20', supplier: 'PharmaCorp', sales: 94, image: getMedicineImage('Antibiotic') },
            { id: 11, name: 'Ambroxol 30mg', brand: 'Mucosolvan', category: 'Respiratory', stock: 142, price: 6.49, cost: 3.00, expiry: '2026-07-15', supplier: 'RespCare', sales: 156, image: getMedicineImage('Ambroxol') },
            { id: 12, name: 'Loratadine 10mg', brand: 'Claritin', category: 'Antihistamine', stock: 93, price: 8.99, cost: 4.00, expiry: '2026-09-20', supplier: 'AllergyCare', sales: 88, image: getMedicineImage('Loratadine') },
            { id: 13, name: 'Metformin 500mg', brand: 'Glucophage', category: 'Diabetes', stock: 167, price: 14.99, cost: 7.50, expiry: '2026-11-10', supplier: 'DiabeticCare', sales: 123, image: getMedicineImage('Metformin') },
            { id: 14, name: 'Atorvastatin 20mg', brand: 'Lipitor', category: 'Cardio', stock: 203, price: 22.99, cost: 11.50, expiry: '2026-10-05', supplier: 'CardioHealth', sales: 178, image: getMedicineImage('Atorvastatin') },
            { id: 15, name: 'Losartan 50mg', brand: 'Cozaar', category: 'Cardio', stock: 156, price: 19.99, cost: 10.00, expiry: '2026-12-30', supplier: 'CardioHealth', sales: 145, image: getMedicineImage('Losartan') },
            { id: 16, name: 'Salbutamol Inhaler', brand: 'Ventolin', category: 'Respiratory', stock: 78, price: 32.99, cost: 16.50, expiry: '2026-05-18', supplier: 'RespCare', sales: 92, image: getMedicineImage('Salbutamol') },
            { id: 17, name: 'Prednisolone 5mg', brand: 'Orapred', category: 'Steroid', stock: 45, price: 15.49, cost: 7.75, expiry: '2026-03-22', supplier: 'PharmaCorp', sales: 67, image: getMedicineImage('default') },
            { id: 18, name: 'Diclofenac Gel', brand: 'Voltaren', category: 'Topical', stock: 134, price: 12.49, cost: 6.25, expiry: '2026-09-14', supplier: 'HealthPlus', sales: 89, image: getMedicineImage('default') },
            { id: 19, name: 'Magnesium 400mg', brand: 'Nature\'s Bounty', category: 'Supplements', stock: 189, price: 11.99, cost: 6.00, expiry: '2027-02-28', supplier: 'VitaHealth', sales: 112, image: getMedicineImage('Vitamin') },
            { id: 20, name: 'Zinc 50mg', brand: 'Now Foods', category: 'Supplements', stock: 234, price: 8.99, cost: 4.50, expiry: '2027-03-15', supplier: 'VitaHealth', sales: 134, image: getMedicineImage('Vitamin') }
        ];
        
        appData.suppliers = [
            { id: 1, name: 'MediSource', contact: 'John Anderson', email: 'john@medisource.com', phone: '(800) 111-2222', orders: 45, rating: 4.8 },
            { id: 2, name: 'PharmaCorp', contact: 'Sarah Lee', email: 'orders@pharmacorp.com', phone: '(800) 333-4444', orders: 38, rating: 4.6 },
            { id: 3, name: 'VitaHealth', contact: 'Robert Chen', email: 'supply@vitahealth.com', phone: '(800) 555-6666', orders: 29, rating: 4.9 }
        ];
        
        appData.sales = [
            { id: 'INV-001', date: '2025-04-01', total: 124.50, items: [{medId:1,qty:2},{medId:3,qty:1}], customer: 'Walk-in' },
            { id: 'INV-002', date: '2025-04-02', total: 67.98, items: [{medId:2,qty:1},{medId:6,qty:2}], customer: 'Sarah Johnson' },
            { id: 'INV-003', date: '2025-04-03', total: 45.50, items: [{medId:5,qty:2}], customer: 'Walk-in' },
            { id: 'INV-004', date: '2025-04-04', total: 89.99, items: [{medId:4,qty:1},{medId:7,qty:1}], customer: 'Michael Chen' },
            { id: 'INV-005', date: '2025-04-05', total: 156.75, items: [{medId:9,qty:1},{medId:14,qty:2}], customer: 'Emily Wilson' }
        ];
    }
    
    const savedTheme = localStorage.getItem('medicore_theme');
    applyTheme(savedTheme || 'light');
    updateNotifications();
}

function saveData() {
    localStorage.setItem('medicore_erp', JSON.stringify(appData));
}

// ========== THEME ==========
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
    const toggleIcon = document.querySelector('#themeToggle i');
    if (toggleIcon) {
        toggleIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    localStorage.setItem('medicore_theme', theme);
}

function toggleTheme() {
    const isDark = document.body.classList.contains('dark');
    applyTheme(isDark ? 'light' : 'dark');
    showToast(isDark ? '☀️ Light Mode activated' : '🌙 Dark Mode activated', 'success');
}

// ========== NOTIFICATIONS ==========
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
    toast.innerHTML = `<i class="fas ${icon}" style="color: var(--primary);"></i> ${message}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function updateNotifications() {
    const lowStock = appData.medicines.filter(m => m.stock < 30).length;
    const criticalStock = appData.medicines.filter(m => m.stock < 15).length;
    const badge = document.getElementById('notifBadge');
    if (badge) badge.textContent = lowStock;
    
    const notifList = document.getElementById('notifList');
    if (notifList) {
        let html = '';
        appData.medicines.filter(m => m.stock < 20).slice(0, 4).forEach(m => {
            html += `<div style="padding:12px 16px; border-bottom:1px solid var(--border);"><i class="fas fa-exclamation-triangle" style="color:var(--warning);"></i> Low stock: ${m.name} (${m.stock} left)</div>`;
        });
        if (criticalStock > 0) {
            html = `<div style="padding:12px 16px; background:var(--danger-soft);"><i class="fas fa-bell" style="color:var(--danger);"></i> ${criticalStock} medicine(s) critically low!</div>` + html;
        }
        if (html === '') html = '<div style="padding:16px;"><i class="fas fa-check-circle" style="color:var(--success);"></i> All stocks healthy</div>';
        notifList.innerHTML = html;
    }
    
    const aiMsg = document.getElementById('aiMessage');
    if (aiMsg) {
        const critical = appData.medicines.find(m => m.stock < 15);
        if (critical) {
            aiMsg.innerHTML = `<i class="fas fa-chart-line"></i><div><strong>🚨 Reorder Alert</strong><p>${critical.name} critically low (${critical.stock} left). Reorder now.</p></div>`;
        } else if (lowStock > 0) {
            aiMsg.innerHTML = `<i class="fas fa-chart-line"></i><div><strong>📊 Inventory Insight</strong><p>${lowStock} medicines need restock soon. Review inventory.</p></div>`;
        } else {
            aiMsg.innerHTML = `<i class="fas fa-check-circle"></i><div><strong>✅ All Good</strong><p>Stock levels optimal. Sales up 12% this month.</p></div>`;
        }
    }
}

// ========== RENDER ENGINE ==========
function renderPage() {
    const container = document.getElementById('content');
    if (!container) return;
    
    switch(currentPage) {
        case 'dashboard': container.innerHTML = renderDashboard(); break;
        case 'medicines': container.innerHTML = renderMedicines(); break;
        case 'inventory': container.innerHTML = renderInventory(); break;
        case 'pos': container.innerHTML = renderPOS(); break;
        case 'suppliers': container.innerHTML = renderSuppliers(); break;
        case 'reports': container.innerHTML = renderReports(); break;
        case 'settings': container.innerHTML = renderSettings(); break;
        default: container.innerHTML = '<div class="data-card"><h3>Dashboard</h3></div>';
    }
    attachEvents();
    initCharts();
}

// ========== DASHBOARD ==========
function renderDashboard() {
    const totalMeds = appData.medicines.length;
    const lowStock = appData.medicines.filter(m => m.stock < 30).length;
    const criticalStock = appData.medicines.filter(m => m.stock < 15).length;
    const expiringSoon = appData.medicines.filter(m => {
        const exp = new Date(m.expiry);
        const today = new Date();
        const diff = (exp - today) / (1000 * 60 * 60 * 24);
        return diff <= 30 && diff > 0;
    }).length;
    const todayRevenue = appData.sales.filter(s => s.date === new Date().toISOString().slice(0,10)).reduce((a,b) => a + b.total, 0);
    const monthlyRevenue = appData.sales.reduce((a,b) => a + b.total, 0);
    const monthlyOrders = appData.sales.length;
    const totalStock = appData.medicines.reduce((s,m) => s + m.stock, 0);
    const topMedicines = [...appData.medicines].sort((a,b)=>b.sales - a.sales).slice(0,5);
    
    return `
    <div class="stats-grid">
        <div class="stat-card"><div class="stat-header"><h4>Total Medicines</h4><div class="stat-icon"><i class="fas fa-capsules"></i></div></div><div class="stat-value">${totalMeds}</div><div class="stat-trend">Total SKUs</div></div>
        <div class="stat-card"><div class="stat-header"><h4>Low Stock</h4><div class="stat-icon"><i class="fas fa-exclamation-triangle"></i></div></div><div class="stat-value" style="color:var(--warning);">${lowStock}</div><div class="stat-trend">Critical: ${criticalStock}</div></div>
        <div class="stat-card"><div class="stat-header"><h4>Expiring Soon</h4><div class="stat-icon"><i class="fas fa-hourglass-half"></i></div></div><div class="stat-value" style="color:var(--danger);">${expiringSoon}</div><div class="stat-trend">Within 30 days</div></div>
        <div class="stat-card"><div class="stat-header"><h4>Today's Revenue</h4><div class="stat-icon"><i class="fas fa-dollar-sign"></i></div></div><div class="stat-value">$${todayRevenue.toFixed(2)}</div><div class="stat-trend">Monthly: $${monthlyRevenue.toFixed(2)}</div></div>
        <div class="stat-card"><div class="stat-header"><h4>Orders</h4><div class="stat-icon"><i class="fas fa-shopping-cart"></i></div></div><div class="stat-value">${monthlyOrders}</div><div class="stat-trend">This month</div></div>
        <div class="stat-card"><div class="stat-header"><h4>Total Stock</h4><div class="stat-icon"><i class="fas fa-boxes"></i></div></div><div class="stat-value">${totalStock}</div><div class="stat-trend">Units available</div></div>
    </div>
    <div class="chart-card"><canvas id="revenueChart" height="100"></canvas></div>
    <div class="chart-card"><canvas id="categoryChart" height="100"></canvas></div>
    <div class="data-card"><div class="card-header"><h3><i class="fas fa-trophy"></i> Top Selling Medicines</h3></div><div class="table-wrapper"><table class="data-table"><thead><tr><th>Image</th><th>Medicine</th><th>Units Sold</th><th>Revenue</th></table></thead><tbody>${topMedicines.map(m => `<tr><td style="text-align:center;"><img src="${m.image}" class="medicine-img" style="width:45px; height:45px;" onerror="handleImageError(this, '${m.name}')"></td><td><strong>${m.name}</strong><br><small>${m.brand}</small></td><td>${m.sales}</td><td>$${(m.sales * m.price).toFixed(2)}</td></tr>`).join('')}</tbody></table></div></div>
    <div class="data-card"><h3><i class="fas fa-receipt"></i> Recent Transactions</h3><div class="table-wrapper"><table class="data-table"><thead><tr><th>Invoice</th><th>Date</th><th>Customer</th><th>Total</th></tr></thead><tbody>${appData.sales.slice(-5).reverse().map(s => `<tr><td>${s.id}</td><td>${s.date}</td><td>${s.customer}</td><td><strong>$${s.total.toFixed(2)}</strong></td></tr>`).join('')}</tbody></table></div></div>`;
}

// ========== MEDICINES MANAGEMENT ==========
function renderMedicines() {
    return `
    <div class="data-card">
        <div class="card-header">
            <h3><i class="fas fa-database"></i> Medicine Database</h3>
            <button class="btn-primary" id="addMedicineBtn"><i class="fas fa-plus"></i> Add Medicine</button>
        </div>
        <input type="text" id="searchMedicine" placeholder="🔍 Search by name, brand, or category..." style="width:100%; padding:14px; border-radius:60px; border:1px solid var(--border); background:var(--bg-primary); margin-bottom:24px;">
        <div class="table-wrapper">
            <table class="data-table">
                <thead><tr><th>Image</th><th>Name / Brand</th><th>Category</th><th>Stock</th><th>Price</th><th>Expiry</th><th>Supplier</th><th>Actions</th></tr></thead>
                <tbody id="medicinesTable">
                    ${appData.medicines.map(m => `
                        <tr>
                            <td style="text-align:center;"><img src="${m.image}" class="medicine-img" style="width:45px; height:45px; border-radius:12px;" onerror="handleImageError(this, '${m.name}')"></td>
                            <td><strong>${m.name}</strong><br><small style="color:var(--text-tertiary);">${m.brand}</small></td>
                            <td><span class="badge-info" style="background:var(--primary-light); padding:4px 10px; border-radius:20px;">${m.category}</span></td>
                            <td class="${m.stock < 20 ? 'text-danger' : ''}"><strong>${m.stock}</strong> units</td>
                            <td><strong>$${m.price}</strong></td>
                            <td>${m.expiry}</td>
                            <td>${m.supplier}</td>
                            <td><button class="btn-primary editMed" data-id="${m.id}" style="padding:6px 14px; margin-right:8px;"><i class="fas fa-edit"></i> Edit</button><button class="btn-primary deleteMed" data-id="${m.id}" style="background:var(--danger);"><i class="fas fa-trash"></i> Del</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    </div>`;
}

function showMedicineModal(medicine = null) {
    const modal = document.getElementById('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <h2 style="margin-bottom:20px;">${medicine ? '✏️ Edit Medicine' : '➕ Add New Medicine'}</h2>
            <input type="text" id="medName" placeholder="Medicine Name *" value="${medicine?.name || ''}" required>
            <input type="text" id="medBrand" placeholder="Brand Name" value="${medicine?.brand || ''}">
            <input type="text" id="medCategory" placeholder="Category" value="${medicine?.category || ''}">
            <input type="number" id="medStock" placeholder="Stock Quantity" value="${medicine?.stock || 0}">
            <input type="number" id="medPrice" step="0.01" placeholder="Selling Price" value="${medicine?.price || ''}">
            <input type="number" id="medCost" step="0.01" placeholder="Cost Price" value="${medicine?.cost || ''}">
            <input type="date" id="medExpiry" value="${medicine?.expiry || ''}">
            <input type="text" id="medSupplier" placeholder="Supplier" value="${medicine?.supplier || ''}">
            <div style="margin-top:16px;"><label style="font-size:0.85rem; color:var(--text-tertiary);">Medicine Image URL (optional):</label><input type="text" id="medImage" placeholder="Image URL" value="${medicine?.image || ''}"></div>
            <div style="display:flex; gap:12px; margin-top:20px;">
                <button id="saveMedBtn" class="btn-primary" style="flex:1;"><i class="fas fa-save"></i> Save Medicine</button>
                <button id="closeModalBtn" class="btn-primary" style="flex:1; background:var(--danger);"><i class="fas fa-times"></i> Cancel</button>
            </div>
        </div>
    `;
    modal.classList.add('active');
    
    document.getElementById('saveMedBtn').onclick = () => {
        const name = document.getElementById('medName').value;
        if (!name) { showToast('Medicine name is required', 'error'); return; }
        
        const newMed = {
            id: medicine?.id || appData.nextId++,
            name: name,
            brand: document.getElementById('medBrand').value || 'Generic',
            category: document.getElementById('medCategory').value || 'General',
            stock: parseInt(document.getElementById('medStock').value) || 0,
            price: parseFloat(document.getElementById('medPrice').value) || 0,
            cost: parseFloat(document.getElementById('medCost').value) || 0,
            expiry: document.getElementById('medExpiry').value || '2026-12-31',
            supplier: document.getElementById('medSupplier').value || 'Unknown',
            sales: medicine?.sales || 0,
            image: document.getElementById('medImage').value || getMedicineImage(name)
        };
        
        if (medicine) {
            const idx = appData.medicines.findIndex(m => m.id === medicine.id);
            if (idx !== -1) appData.medicines[idx] = newMed;
            showToast(`✅ ${newMed.name} updated successfully`, 'success');
        } else {
            appData.medicines.push(newMed);
            showToast(`✅ ${newMed.name} added successfully`, 'success');
        }
        saveData();
        renderPage();
        modal.classList.remove('active');
    };
    document.getElementById('closeModalBtn').onclick = () => modal.classList.remove('active');
}

// ========== INVENTORY INTELLIGENCE ==========
function renderInventory() {
    const critical = appData.medicines.filter(m => m.stock < 15);
    const low = appData.medicines.filter(m => m.stock >= 15 && m.stock < 30);
    const optimal = appData.medicines.filter(m => m.stock >= 30);
    const expiring = appData.medicines.filter(m => {
        const exp = new Date(m.expiry);
        const today = new Date();
        const diff = (exp - today) / (1000 * 60 * 60 * 24);
        return diff <= 30 && diff > 0;
    });
    
    return `
    <div class="stats-grid">
        <div class="stat-card"><div class="stat-header"><h4>Critical Stock</h4><div class="stat-icon"><i class="fas fa-bell"></i></div></div><div class="stat-value" style="color:var(--danger);">${critical.length}</div><div class="stat-trend">Need immediate reorder</div></div>
        <div class="stat-card"><div class="stat-header"><h4>Low Stock</h4><div class="stat-icon"><i class="fas fa-exclamation-triangle"></i></div></div><div class="stat-value" style="color:var(--warning);">${low.length}</div><div class="stat-trend">Plan restock soon</div></div>
        <div class="stat-card"><div class="stat-header"><h4>Optimal Stock</h4><div class="stat-icon"><i class="fas fa-check-circle"></i></div></div><div class="stat-value" style="color:var(--success);">${optimal.length}</div><div class="stat-trend">Healthy inventory</div></div>
    </div>
    <div class="data-card"><h3><i class="fas fa-chart-line"></i> Stock Health Monitor</h3>${[...critical, ...low].slice(0,10).map(m => `
        <div style="margin-bottom:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <div><img src="${m.image}" class="medicine-img" style="width:35px; height:35px; border-radius:10px;" onerror="handleImageError(this, '${m.name}')"> <strong>${m.name}</strong></div>
                <span class="${m.stock<15?'text-danger':'text-warning'}">${m.stock} units left</span>
            </div>
            <div style="height:8px; background:var(--border); border-radius:40px; overflow:hidden;"><div style="width:${Math.min(100, (m.stock/100)*100)}%; height:8px; background:${m.stock<15?'var(--danger)':'var(--warning)'}; border-radius:40px;"></div></div>
        </div>
    `).join('')}</div>
    <div class="data-card"><h3><i class="fas fa-calendar"></i> Expiry Alerts</h3>${expiring.length > 0 ? expiring.map(m => `<div style="display:flex; align-items:center; gap:12px; padding:12px; background:var(--danger-soft); border-radius:16px; margin-bottom:8px;"><img src="${m.image}" class="medicine-img" style="width:40px; height:40px; border-radius:10px;" onerror="handleImageError(this, '${m.name}')"><div><strong>${m.name}</strong><br>Expires: ${m.expiry} | Stock: ${m.stock} units</div></div>`).join('') : '<p style="text-align:center; padding:20px;"><i class="fas fa-check-circle" style="color:var(--success);"></i> No medicines expiring soon</p>'}</div>`;
}

// ========== POS SYSTEM ==========
function renderPOS() {
    return `
    <div class="pos-grid">
        <div class="products-panel">
            <h3><i class="fas fa-search"></i> Search Products</h3>
            <input type="text" id="posSearch" placeholder="Search by medicine name..." style="width:100%; padding:14px; border-radius:60px; margin:16px 0; border:1px solid var(--border); background:var(--bg-primary);">
            <div id="posResults" style="max-height:500px; overflow-y:auto;"></div>
        </div>
        <div class="cart-panel">
            <h3><i class="fas fa-shopping-cart"></i> Shopping Cart</h3>
            <div id="cartItems" style="min-height:150px; margin:16px 0;"></div>
            <hr>
            <p><strong>Subtotal: $<span id="subtotal">0</span></strong></p>
            <div style="display:flex; gap:12px; margin:12px 0;">
                <div><label>Discount %: </label><input type="number" id="discount" value="0" style="width:80px; padding:8px; border-radius:12px;"></div>
                <div><label>Tax %: </label><input type="number" id="tax" value="10" style="width:80px; padding:8px; border-radius:12px;"></div>
            </div>
            <p><strong>Total: $<span id="total">0</span></strong></p>
            <button id="completeSale" class="btn-primary" style="width:100%; margin-top:16px;"><i class="fas fa-receipt"></i> Complete Sale</button>
            <button id="printReceipt" class="btn-secondary" style="width:100%; margin-top:8px;"><i class="fas fa-print"></i> Print Receipt</button>
        </div>
    </div>`;
}

function updateCartUI() {
    const container = document.getElementById('cartItems');
    if (!container) return;
    if (currentCart.length === 0) { 
        container.innerHTML = '<div style="text-align:center; padding:40px; color:var(--text-tertiary);"><i class="fas fa-shopping-cart" style="font-size:48px; margin-bottom:12px; display:block;"></i>Cart is empty</div>'; 
        document.getElementById('subtotal').innerText = '0'; 
        document.getElementById('total').innerText = '0'; 
        return; 
    }
    container.innerHTML = currentCart.map(i => `<div style="display:flex; justify-content:space-between; align-items:center; padding:12px 0; border-bottom:1px solid var(--border);"><div><img src="${i.img}" class="medicine-img" style="width:35px; height:35px; border-radius:10px;" onerror="handleImageError(this, '${i.name}')"> <strong>${i.name}</strong> x${i.qty}</div><div><strong>$${(i.price*i.qty).toFixed(2)}</strong> <button class="removeItem" data-id="${i.id}" style="background:none; border:none; color:var(--danger); cursor:pointer; margin-left:12px;"><i class="fas fa-trash"></i></button></div></div>`).join('');
    const subtotal = currentCart.reduce((s,i) => s + i.price * i.qty, 0);
    const discount = parseFloat(document.getElementById('discount')?.value || 0);
    const tax = parseFloat(document.getElementById('tax')?.value || 0);
    const afterDiscount = subtotal - (subtotal * discount / 100);
    const total = afterDiscount + (afterDiscount * tax / 100);
    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
    document.getElementById('total').innerText = total.toFixed(2);
    document.querySelectorAll('.removeItem').forEach(btn => { btn.onclick = () => { currentCart = currentCart.filter(c => c.id !== btn.dataset.id); updateCartUI(); showToast('Item removed from cart', 'info'); }; });
}

// ========== OTHER PAGES ==========
function renderSuppliers() { 
    return `<div class="data-card"><h3><i class="fas fa-truck"></i> Supplier Management</h3><div class="table-wrapper"><table class="data-table"><thead><tr><th>Company</th><th>Contact Person</th><th>Email</th><th>Phone</th><th>Total Orders</th><th>Rating</th></tr></thead><tbody>${appData.suppliers.map(s => `<tr><td><strong>${s.name}</strong></td><td>${s.contact}</td><td>${s.email}</td><td>${s.phone}</td><td>${s.orders}</td><td><span class="badge-success">⭐ ${s.rating}</span></td></tr>`).join('')}</tbody></table></div></div>`; 
}

function renderReports() { 
    return `<div class="chart-card"><canvas id="salesReport" height="120"></canvas></div><div class="chart-card"><canvas id="inventoryChart" height="120"></canvas></div>`; 
}

function renderSettings() { 
    return `<div class="data-card"><h3><i class="fas fa-cog"></i> System Preferences</h3><div style="margin:20px 0; padding:16px; background:var(--bg-primary); border-radius:16px;"><label><strong>🌓 Theme Preference:</strong></label><select id="themeSelect" style="margin-left:12px; padding:8px 16px; border-radius:12px; background:var(--bg-surface);"><option value="light">☀️ Light Mode</option><option value="dark">🌙 Dark Mode</option></select></div><button id="saveSettings" class="btn-primary"><i class="fas fa-save"></i> Save Settings</button><div style="margin-top:30px; padding-top:20px; border-top:1px solid var(--border);"><button id="resetData" class="btn-primary" style="background:var(--danger);"><i class="fas fa-refresh"></i> Reset to Demo Data</button><p style="margin-top:12px; font-size:0.75rem; color:var(--text-tertiary);"><i class="fas fa-exclamation-triangle"></i> Warning: This will erase all custom data and restore default medicines.</p></div></div>`; 
}

// ========== CHARTS ==========
function initCharts() {
    if (currentPage === 'dashboard' && document.getElementById('revenueChart')) {
        if (charts.revenue) charts.revenue.destroy();
        charts.revenue = new Chart(document.getElementById('revenueChart'), { 
            type: 'line', 
            data: { 
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], 
                datasets: [{ 
                    label: 'Revenue ($)', 
                    data: [1250, 1890, 2100, 2450], 
                    borderColor: '#0EA5E9', 
                    backgroundColor: 'rgba(14,165,233,0.1)', 
                    tension: 0.3, 
                    fill: true 
                }] 
            }, 
            options: { responsive: true, maintainAspectRatio: true } 
        });
        if (charts.category) charts.category.destroy();
        const categoryCount = {};
        appData.medicines.forEach(m => { categoryCount[m.category] = (categoryCount[m.category] || 0) + 1; });
        charts.category = new Chart(document.getElementById('categoryChart'), { 
            type: 'doughnut', 
            data: { 
                labels: Object.keys(categoryCount), 
                datasets: [{ 
                    data: Object.values(categoryCount), 
                    backgroundColor: ['#0EA5E9', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#EC4899', '#06B6D4'] 
                }] 
            } 
        });
    }
    if (currentPage === 'reports') {
        new Chart(document.getElementById('salesReport'), { 
            type: 'bar', 
            data: { 
                labels: appData.medicines.slice(0,8).map(m=>m.name), 
                datasets: [{ 
                    label: 'Units Sold', 
                    data: appData.medicines.slice(0,8).map(m=>m.sales), 
                    backgroundColor: '#0EA5E9', 
                    borderRadius: 8 
                }] 
            }, 
            options: { responsive: true } 
        });
        new Chart(document.getElementById('inventoryChart'), { 
            type: 'bar', 
            data: { 
                labels: ['Critical (<15)', 'Low (15-30)', 'Optimal (30+)'], 
                datasets: [{ 
                    label: 'Number of Products', 
                    data: [
                        appData.medicines.filter(m=>m.stock<15).length, 
                        appData.medicines.filter(m=>m.stock>=15 && m.stock<30).length, 
                        appData.medicines.filter(m=>m.stock>=30).length
                    ], 
                    backgroundColor: ['#EF4444', '#F59E0B', '#10B981'] 
                }] 
            }, 
            options: { responsive: true } 
        });
    }
}

// ========== EVENT HANDLERS ==========
function attachEvents() {
    document.getElementById('addMedicineBtn')?.addEventListener('click', () => showMedicineModal(null));
    document.querySelectorAll('.editMed').forEach(btn => { btn.onclick = () => { const med = appData.medicines.find(m => m.id === parseInt(btn.dataset.id)); showMedicineModal(med); }; });
    document.querySelectorAll('.deleteMed').forEach(btn => { btn.onclick = () => { if(confirm('Are you sure you want to delete this medicine?')) { appData.medicines = appData.medicines.filter(m => m.id !== parseInt(btn.dataset.id)); saveData(); renderPage(); showToast('Medicine deleted successfully', 'success'); } }; });
    
    const search = document.getElementById('searchMedicine');
    if (search) { search.oninput = (e) => { const term = e.target.value.toLowerCase(); document.querySelectorAll('#medicinesTable tr').forEach(row => { row.style.display = row.innerText.toLowerCase().includes(term) ? '' : 'none'; }); }; }
    
    if (currentPage === 'pos') {
        const posSearch = document.getElementById('posSearch');
        if (posSearch) {
            posSearch.oninput = (e) => {
                const term = e.target.value.toLowerCase();
                const filtered = appData.medicines.filter(m => m.name.toLowerCase().includes(term));
                document.getElementById('posResults').innerHTML = filtered.map(m => `<div class="product-item" data-id="${m.id}" data-name="${m.name}" data-price="${m.price}" data-img="${m.image}" data-stock="${m.stock}"><div><img src="${m.image}" class="product-img" style="width:50px; height:50px; border-radius:12px; margin-right:12px;" onerror="handleImageError(this, '${m.name}')"> <strong>${m.name}</strong><br><small>$${m.price} | Stock: ${m.stock}</small></div><button class="btn-primary addToCart" style="padding:6px 16px;"><i class="fas fa-cart-plus"></i> Add</button></div>`).join('');
                document.querySelectorAll('.addToCart').forEach(btn => { btn.onclick = (e) => { e.stopPropagation(); const parent = btn.closest('.product-item'); const stock = parseInt(parent.dataset.stock); if(stock <= 0) { showToast('Out of stock', 'error'); return; } const existing = currentCart.find(c => c.id === parent.dataset.id); if(existing) existing.qty++; else currentCart.push({ id: parent.dataset.id, name: parent.dataset.name, price: parseFloat(parent.dataset.price), qty: 1, img: parent.dataset.img }); updateCartUI(); showToast(`${parent.dataset.name} added to cart`, 'success'); }; });
            };
            posSearch.dispatchEvent(new Event('input'));
        }
        document.getElementById('completeSale')?.addEventListener('click', () => {
            if (currentCart.length === 0) { showToast('Cart is empty', 'error'); return; }
            const subtotal = currentCart.reduce((s,i) => s + i.price * i.qty, 0);
            const discount = parseFloat(document.getElementById('discount')?.value || 0);
            const tax = parseFloat(document.getElementById('tax')?.value || 0);
            const total = (subtotal - (subtotal * discount / 100)) * (1 + tax / 100);
            const sale = { id: 'INV-' + Date.now(), date: new Date().toISOString().slice(0,10), total: total, items: currentCart.map(c => ({ medId: parseInt(c.id), qty: c.qty })), customer: 'Walk-in Customer' };
            appData.sales.push(sale);
            currentCart.forEach(c => { const med = appData.medicines.find(m => m.id === parseInt(c.id)); if(med) { med.stock -= c.qty; med.sales += c.qty; } });
            saveData();
            currentCart = [];
            updateCartUI();
            renderPage();
            showToast(`✅ Sale completed: $${total.toFixed(2)}`, 'success');
        });
        document.getElementById('printReceipt')?.addEventListener('click', () => window.print());
    }
    
    if (currentPage === 'settings') {
        const themeSelect = document.getElementById('themeSelect');
        if (themeSelect) themeSelect.value = document.body.classList.contains('dark') ? 'dark' : 'light';
        document.getElementById('saveSettings')?.addEventListener('click', () => { const theme = document.getElementById('themeSelect').value; applyTheme(theme); showToast('Settings saved successfully', 'success'); });
        document.getElementById('resetData')?.addEventListener('click', () => { if(confirm('⚠️ WARNING: This will erase all your data and restore default demo data. Are you sure?')) { localStorage.clear(); location.reload(); } });
    }
}

// Make handleImageError available globally for inline onerror
window.handleImageError = handleImageError;

// ========== ROUTING ==========
function initRouting() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            currentPage = link.dataset.page;
            renderPage();
            if (window.innerWidth < 768) document.getElementById('sidebar')?.classList.remove('open');
        });
    });
    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
    document.getElementById('menuToggle')?.addEventListener('click', () => document.getElementById('sidebar')?.classList.toggle('open'));
    
    const globalSearch = document.getElementById('globalSearch');
    if (globalSearch) {
        globalSearch.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const found = appData.medicines.find(m => m.name.toLowerCase().includes(term));
            if (found) showToast(`🔍 Found: ${found.name} - $${found.price} (${found.stock} in stock)`, 'info');
        });
    }
    renderPage();
}

// Auto refresh notifications every 10 seconds
setInterval(() => updateNotifications(), 10000);

// Start the application
loadInitialData();
initRouting();
