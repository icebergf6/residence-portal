/**
 * Azure Bay Residences - Executive Admin CMS & Full Portfolio Engine
 * Connects directly to AzureDB in data.js, managing Residences, Leads CRM, Yields, and Brand Settings
 */

(function () {
  'use strict';

  // =========================================================================
  // DOM ELEMENT SELECTION
  // =========================================================================

  // Sidebar & Navigation
  const sidebar = document.getElementById('admin-sidebar');
  const sidebarBackdrop = document.getElementById('admin-sidebar-backdrop');
  const sidebarOpenBtn = document.getElementById('sidebar-open-btn');
  const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
  const tabButtons = document.querySelectorAll('.admin-tab-btn');
  const panels = document.querySelectorAll('.admin-panel');
  const pageHeaderTitle = document.getElementById('admin-page-header-title');
  const pageHeaderSubtitle = document.getElementById('admin-page-header-subtitle');
  const sidebarPropsCount = document.getElementById('sidebar-props-count');
  const sidebarLeadsCount = document.getElementById('sidebar-leads-count');

  // Properties Catalog Elements
  const tbody = document.getElementById('admin-properties-tbody');
  const tableCount = document.getElementById('admin-table-count');
  const tableEmpty = document.getElementById('admin-table-empty');
  const searchInput = document.getElementById('admin-search-input');
  const filterStatus = document.getElementById('admin-filter-status');
  const filterType = document.getElementById('admin-filter-type');
  const quickPills = document.querySelectorAll('.admin-quick-pill');
  const quickCountAll = document.getElementById('quick-count-all');
  const quickCountAvail = document.getElementById('quick-count-available');
  const quickCountRes = document.getElementById('quick-count-reserved');
  const quickCountSold = document.getElementById('quick-count-sold');

  // KPI Elements (Dashboard Tab)
  const statTotal = document.getElementById('stat-total-props');
  const statValuation = document.getElementById('stat-total-value');
  const statAvailable = document.getElementById('stat-active-available');
  const statReserved = document.getElementById('stat-reserved-sold');

  // Property Modals & Forms
  const propModal = document.getElementById('property-modal');
  const propModalTitle = document.getElementById('property-modal-title');
  const propModalClose = document.getElementById('property-modal-close');
  const propModalCancel = document.getElementById('property-modal-cancel');
  const propForm = document.getElementById('property-form');
  const addPropBtn = document.getElementById('admin-add-prop-btn');

  const deleteModal = document.getElementById('delete-modal');
  const deleteModalClose = document.getElementById('delete-modal-cancel');
  const deleteModalConfirm = document.getElementById('delete-modal-confirm');
  const deletePropNameEl = document.getElementById('delete-prop-name');

  // Property Form Fields
  const formId = document.getElementById('form-prop-id');
  const formName = document.getElementById('form-prop-name');
  const formLocation = document.getElementById('form-prop-location');
  const formType = document.getElementById('form-prop-type');
  const formStatus = document.getElementById('form-prop-status');
  const formPrice = document.getElementById('form-prop-price');
  const formBedrooms = document.getElementById('form-prop-bedrooms');
  const formBathrooms = document.getElementById('form-prop-bathrooms');
  const formBuilding = document.getElementById('form-prop-building');
  const formLand = document.getElementById('form-prop-land');
  const formTagline = document.getElementById('form-prop-tagline');
  const formFeatured = document.getElementById('form-prop-featured');
  const formImage = document.getElementById('form-prop-image');
  const formImage2 = document.getElementById('form-prop-image2');
  const formImage3 = document.getElementById('form-prop-image3');
  const formDescription = document.getElementById('form-prop-description');
  const formAmenities = document.getElementById('form-prop-amenities');
  const previewBox = document.getElementById('form-image-preview-box');
  const previewImg = document.getElementById('form-image-preview-img');
  const preview2Box = document.getElementById('form-image-preview-2-box');
  const preview2Img = document.getElementById('form-image-preview-2-img');
  const preview3Box = document.getElementById('form-image-preview-3-box');
  const preview3Img = document.getElementById('form-image-preview-3-img');
  const quickPhotoBtn = document.getElementById('btn-quick-photo-preset');

  // Leads CRM Elements
  const leadsTbody = document.getElementById('admin-leads-tbody');
  const leadsFilterStatus = document.getElementById('admin-leads-filter-status');
  const leadsSearchInput = document.getElementById('admin-leads-search-input');
  const recentLeadsList = document.getElementById('dashboard-recent-leads-list');
  const addLeadBtnTop = document.getElementById('admin-add-lead-btn');
  const addLeadBtnTab = document.getElementById('admin-add-lead-btn-tab');

  // Lead Manual Intake Modal
  const leadModal = document.getElementById('lead-modal');
  const leadModalClose = document.getElementById('lead-modal-close');
  const leadModalCancel = document.getElementById('lead-modal-cancel');
  const leadForm = document.getElementById('lead-form');
  const leadFormName = document.getElementById('lead-form-name');
  const leadFormEmail = document.getElementById('lead-form-email');
  const leadFormPhone = document.getElementById('lead-form-phone');
  const leadFormProperty = document.getElementById('lead-form-property');
  const leadFormBudget = document.getElementById('lead-form-budget');
  const leadFormStatus = document.getElementById('lead-form-status');
  const leadFormNotes = document.getElementById('lead-form-notes');

  // Yield Analytics & Simulator Elements
  const yieldStatAssets = document.getElementById('yield-stat-assets');
  const yieldStatOccupancy = document.getElementById('yield-stat-occupancy');
  const yieldStatNet = document.getElementById('yield-stat-net');
  const yieldStatGross = document.getElementById('yield-stat-gross');
  const yieldScheduleTbody = document.getElementById('yield-rental-schedule-tbody');
  const simOccupancySlider = document.getElementById('sim-occupancy-slider');
  const simOccupancyVal = document.getElementById('sim-occupancy-val');
  const simFeeSlider = document.getElementById('sim-fee-slider');
  const simFeeVal = document.getElementById('sim-fee-val');
  const simProjectedNet = document.getElementById('sim-projected-net');
  const simProjectedAnnual = document.getElementById('sim-projected-annual');
  const simProjectedQuarterly = document.getElementById('sim-projected-quarterly');
  const simResetBtn = document.getElementById('sim-reset-btn');

  // Brand Settings Form Elements
  const brandSettingsForm = document.getElementById('brand-settings-form');
  const settingBrandName = document.getElementById('setting-brand-name');
  const settingBrandShort = document.getElementById('setting-brand-short');
  const settingBrandPhone = document.getElementById('setting-brand-phone');
  const settingBrandWhatsapp = document.getElementById('setting-brand-whatsapp');
  const settingBrandEmail = document.getElementById('setting-brand-email');
  const settingBrandAddress = document.getElementById('setting-brand-address');
  const settingBrandLicense = document.getElementById('setting-brand-license');

  // Extra Database Buttons & Currency
  const resetBtn = document.getElementById('admin-reset-btn');
  const exportBtn = document.getElementById('admin-export-btn');
  const importFile = document.getElementById('admin-import-file');
  const adminCurrencySelector = document.getElementById('admin-currency-selector');
  const exportPropsCsvBtn = document.getElementById('admin-export-props-csv-btn');
  const exportLeadsCsvBtn = document.getElementById('admin-export-leads-csv-btn');

  // Lead Notes Modal Elements
  const leadNotesModal = document.getElementById('lead-notes-modal');
  const leadNotesClose = document.getElementById('lead-notes-modal-close');
  const leadNotesCancel = document.getElementById('lead-notes-modal-cancel');
  const leadNotesClientName = document.getElementById('lead-notes-client-name');
  const leadNotesClientSub = document.getElementById('lead-notes-client-sub');
  const leadNotesHistory = document.getElementById('lead-notes-history');
  const leadNewNoteInput = document.getElementById('lead-new-note-input');
  const leadNotesDirectActions = document.getElementById('lead-notes-direct-actions');
  const leadNotesSaveBtn = document.getElementById('lead-notes-save-btn');
  let currentActiveLeadId = null;

  // Diagnostics & Maintenance
  const diagResCount = document.getElementById('diag-residences-count');
  const diagLeadsCount = document.getElementById('diag-leads-count');
  const diagStorageSize = document.getElementById('diag-storage-size');
  const diagStoragePct = document.getElementById('diag-storage-pct');
  const diagSeedLeadsBtn = document.getElementById('diag-seed-leads-btn');
  const diagClearLeadsBtn = document.getElementById('diag-clear-leads-btn');

  // Toast
  const toast = document.getElementById('admin-toast');
  const toastMsg = document.getElementById('toast-message');
  let toastTimer = null;

  let currentPendingDeleteId = null;

  const LUXURY_PHOTO_PRESETS = [
    [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
    ],
    [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80"
    ]
  ];
  let photoPresetIdx = 0;

  // =========================================================================
  // TOAST NOTIFICATION
  // =========================================================================
  function showToast(message, isSuccess = true) {
    if (!toast || !toastMsg) return;
    if (toastTimer) clearTimeout(toastTimer);
    toastMsg.textContent = message;
    toast.className = `fixed bottom-6 right-6 z-50 transform transition-all duration-300 pointer-events-none translate-y-0 opacity-100`;
    toastTimer = setTimeout(() => {
      toast.className = `fixed bottom-6 right-6 z-50 transform transition-all duration-300 pointer-events-none translate-y-24 opacity-0`;
    }, 3500);
  }

  // =========================================================================
  // TAB NAVIGATION & SIDEBAR CONTROLS
  // =========================================================================
  const TAB_METADATA = {
    'tab-dashboard': {
      title: "Executive Management Portal",
      subtitle: "Real-time luxury residence inventory, investor leads, and yield metrics"
    },
    'tab-properties': {
      title: "Residences Catalog CMS",
      subtitle: "Manage architectural listings, pricing, specs, and status"
    },
    'tab-leads': {
      title: "Investor Leads & CRM",
      subtitle: "High-net-worth owner leads, private viewing reservations, and consulting inquiries"
    },
    'tab-yields': {
      title: "Asset & Yield Analytics",
      subtitle: "Track rental income, holiday occupancy rates, and international wire dividends"
    },
    'tab-settings': {
      title: "Brand & Portal Settings",
      subtitle: "Configure global contact information, agency registration, and messaging"
    }
  };

  function switchTab(targetTabId) {
    if (!targetTabId) return;

    // Switch panels
    panels.forEach(panel => {
      if (panel.id === targetTabId) {
        panel.classList.remove('hidden');
      } else {
        panel.classList.add('hidden');
      }
    });

    // Update Tab Buttons in Sidebar
    tabButtons.forEach(btn => {
      const target = btn.getAttribute('data-tab-target');
      if (target === targetTabId) {
        btn.classList.add('bg-white/15', 'text-white', 'shadow-sm', 'border', 'border-white/20');
        btn.classList.remove('text-white/80', 'hover:bg-white/5', 'border-transparent');
      } else {
        btn.classList.remove('bg-white/15', 'text-white', 'shadow-sm', 'border', 'border-white/20');
        btn.classList.add('text-white/80', 'hover:bg-white/5', 'border-transparent');
      }
    });

    // Update Header
    if (TAB_METADATA[targetTabId]) {
      if (pageHeaderTitle) pageHeaderTitle.textContent = TAB_METADATA[targetTabId].title;
      if (pageHeaderSubtitle) pageHeaderSubtitle.textContent = TAB_METADATA[targetTabId].subtitle;
    }

    // Close mobile sidebar if open
    closeMobileSidebar();

    // Trigger tab-specific refresh
    if (targetTabId === 'tab-leads') {
      renderLeadsTable();
    } else if (targetTabId === 'tab-properties') {
      renderTable();
    } else if (targetTabId === 'tab-yields') {
      renderYieldsTab();
    } else if (targetTabId === 'tab-settings') {
      initBrandSettings();
    }
  }

  function openMobileSidebar() {
    if (sidebar) {
      sidebar.classList.add('drawer-open');
      sidebar.classList.remove('-translate-x-full');
    }
    if (sidebarBackdrop) sidebarBackdrop.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileSidebar() {
    if (sidebar) {
      sidebar.classList.remove('drawer-open');
      sidebar.classList.add('-translate-x-full');
    }
    if (sidebarBackdrop) sidebarBackdrop.classList.add('hidden');
    document.body.style.overflow = '';
  }

  // Bind Sidebar Events
  if (sidebarOpenBtn) sidebarOpenBtn.addEventListener('click', openMobileSidebar);
  if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeMobileSidebar);
  if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeMobileSidebar);

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      if (sidebar) {
        sidebar.classList.remove('drawer-open');
        sidebar.classList.remove('-translate-x-full');
      }
      if (sidebarBackdrop) sidebarBackdrop.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab-target');
      switchTab(target);
    });
  });

  // Cross-panel tab links (e.g. data-switch-tab="tab-leads")
  document.querySelectorAll('[data-switch-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-switch-tab');
      const filter = btn.getAttribute('data-filter-status');
      if (filter !== null && typeof filter !== 'undefined' && filterStatus) {
        filterStatus.value = filter;
        updateQuickPillsActive(filter);
      }
      switchTab(target);
    });
  });

  // =========================================================================
  // PROPERTIES CRUD & TABLE
  // =========================================================================
  function getProperties() {
    if (window.AzureDB && typeof window.AzureDB.getProperties === 'function') {
      return window.AzureDB.getProperties();
    }
    return typeof PROPERTIES !== 'undefined' ? PROPERTIES : [];
  }

  function formatShortValuation(amountUSD) {
    const code = window.currentCurrency || (typeof localStorage !== 'undefined' && localStorage.getItem('azure_currency')) || 'USD';
    const curr = (window.CURRENCIES && window.CURRENCIES[code]) || { rate: 1, symbol: '$' };
    const converted = amountUSD * curr.rate;
    if (code === 'IDR') {
      if (converted >= 1e12) return `Rp ${(converted / 1e12).toFixed(1)}T`;
      if (converted >= 1e9) return `Rp ${(converted / 1e9).toFixed(1)}M`;
      return `Rp ${Math.round(converted / 1e6)} Jt`;
    }
    const sym = curr.symbol || '$';
    if (converted >= 1e9) return `${sym}${(converted / 1e9).toFixed(2)}B`;
    if (converted >= 1e6) return `${sym}${(converted / 1e6).toFixed(1)}M`;
    if (converted >= 1e3) return `${sym}${(converted / 1e3).toFixed(0)}K`;
    return `${sym}${Math.round(converted)}`;
  }

  function updateKPIs(list) {
    if (!list) return;
    const total = list.length;
    const available = list.filter(p => p.status === 'Available').length;
    const reserved = list.filter(p => p.status === 'Reserved').length;
    const sold = list.filter(p => p.status === 'Sold').length;
    const totalVal = list.reduce((acc, cur) => acc + (cur.price || 0), 0);

    if (statTotal) statTotal.textContent = total;
    if (statAvailable) statAvailable.textContent = available;
    if (statReserved) statReserved.textContent = reserved + sold;
    if (sidebarPropsCount) sidebarPropsCount.textContent = total;

    // Quick Status Pill Counts
    if (quickCountAll) quickCountAll.textContent = total;
    if (quickCountAvail) quickCountAvail.textContent = available;
    if (quickCountRes) quickCountRes.textContent = reserved;
    if (quickCountSold) quickCountSold.textContent = sold;

    if (statValuation) {
      statValuation.textContent = formatShortValuation(totalVal);
    }
  }

  function formatCurrency(price) {
    if (window.formatUSD && typeof window.formatUSD === 'function') {
      return window.formatUSD(price);
    }
    return `$${Number(price || 0).toLocaleString()}`;
  }

  function escapeCSV(field) {
    if (field === null || field === undefined) return '""';
    const stringVal = String(field).replace(/"/g, '""');
    return `"${stringVal}"`;
  }

  function downloadCSV(filename, csvContent) {
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function exportResidencesCSV() {
    const list = getProperties();
    if (!list || list.length === 0) {
      showToast("No residences to export.", false);
      return;
    }

    const headers = [
      "ID", "Name", "Enclave", "Property Type", "Asking Price (USD)",
      "Bedrooms", "Bathrooms", "Built Area (sqm)", "Land Area (sqm)",
      "Status", "Featured", "Architectural Tagline", "Direct URL"
    ];

    const origin = window.location.origin || '';
    const path = window.location.pathname.replace('admin.html', '').replace(/\/+$/, '');

    const rows = list.map(item => [
      escapeCSV(item.id),
      escapeCSV(item.name),
      escapeCSV(item.location),
      escapeCSV(item.type),
      item.price || 0,
      item.bedrooms || 0,
      item.bathrooms || 0,
      item.buildingArea || 0,
      item.landArea || 0,
      escapeCSV(item.status),
      item.featured ? "Yes" : "No",
      escapeCSV(item.tagline || ""),
      escapeCSV(`${origin}${path}/property.html?id=${item.id}`)
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    downloadCSV(`azure_bay_residences_catalog_${new Date().toISOString().slice(0, 10)}.csv`, csvContent);
    showToast("Residences catalog exported to CSV!");
  }

  function exportLeadsCSV() {
    const leads = getLeads();
    if (!leads || leads.length === 0) {
      showToast("No investor leads to export.", false);
      return;
    }

    const headers = [
      "ID", "Investor Name", "Email", "Phone", "Target Residence",
      "Budget Allocation", "CRM Status", "Acquisition Source", "Inquiry Date", "Notes"
    ];

    const rows = leads.map(l => [
      escapeCSV(l.id || ""),
      escapeCSV(l.name || ""),
      escapeCSV(l.email || ""),
      escapeCSV(l.phone || ""),
      escapeCSV(l.property || ""),
      escapeCSV(l.budget || ""),
      escapeCSV(l.status || ""),
      escapeCSV(l.source || ""),
      escapeCSV(l.date || ""),
      escapeCSV(l.notes || l.goal || "")
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    downloadCSV(`azure_bay_investor_leads_${new Date().toISOString().slice(0, 10)}.csv`, csvContent);
    showToast("Investor leads exported to CSV!");
  }

  function cloneProperty(id) {
    const list = getProperties();
    const item = list.find(p => p.id === id);
    if (!item) return;

    openCreateModal();
    formName.value = `Copy of ${item.name}`;
    formLocation.value = item.location || 'Azure Bay Coast';
    formType.value = item.type || 'Villa';
    formStatus.value = 'Available';
    formPrice.value = item.price || '';
    formBedrooms.value = item.bedrooms || 0;
    formBathrooms.value = item.bathrooms || 0;
    formBuilding.value = item.buildingArea || '';
    formLand.value = item.landArea || '';
    formTagline.value = item.tagline || '';
    formFeatured.checked = false;
    formImage.value = (item.images && item.images[0]) || '';
    if (formImage2) formImage2.value = (item.images && item.images[1]) || '';
    if (formImage3) formImage3.value = (item.images && item.images[2]) || '';
    formDescription.value = item.description || '';
    formAmenities.value = (item.amenities || []).join(', ');
    updateImagePreviews();
    propModalTitle.textContent = `Clone Residence: ${item.name}`;
    showToast(`Cloned specs for "${item.name}" loaded into editor! Adjust details and save.`);
  }

  function copyShareableLink(id, name) {
    const origin = window.location.origin || '';
    const path = window.location.pathname.replace('admin.html', '').replace(/\/+$/, '');
    const url = `${origin}${path}/property.html?id=${id}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        showToast(`Client link for "${name}" copied to clipboard!`);
      }).catch(() => {
        prompt("Copy client link:", url);
      });
    } else {
      prompt("Copy client link:", url);
    }
  }

  function updateQuickPillsActive(activeStatus) {
    quickPills.forEach(pill => {
      const st = pill.getAttribute('data-admin-quick-status');
      if (st === activeStatus) {
        pill.className = 'admin-quick-pill active px-3 py-1 rounded-lg font-semibold bg-[#C8A96A] text-[#0F2A43] transition-all shrink-0';
      } else {
        pill.className = 'admin-quick-pill px-3 py-1 rounded-lg font-semibold bg-white/5 hover:bg-white/10 text-white/70 border border-white/15 transition-all shrink-0';
      }
    });
  }

  function renderTable() {
    const list = getProperties();
    updateKPIs(list);

    const query = (searchInput ? searchInput.value.trim().toLowerCase() : '');
    const statusVal = filterStatus ? filterStatus.value : '';
    const typeVal = filterType ? filterType.value : '';

    const filtered = list.filter(p => {
      if (statusVal && p.status !== statusVal) return false;
      if (typeVal && p.type !== typeVal) return false;
      if (query) {
        const matchesName = p.name ? p.name.toLowerCase().includes(query) : false;
        const matchesLoc = p.location ? p.location.toLowerCase().includes(query) : false;
        const matchesTag = p.tagline ? p.tagline.toLowerCase().includes(query) : false;
        if (!matchesName && !matchesLoc && !matchesTag) return false;
      }
      return true;
    });

    if (tableCount) {
      tableCount.textContent = `Showing ${filtered.length} of ${list.length} luxury residences`;
    }

    if (filtered.length === 0) {
      if (tbody) tbody.innerHTML = '';
      if (tableEmpty) tableEmpty.classList.remove('hidden');
      return;
    }

    if (tableEmpty) tableEmpty.classList.add('hidden');

    if (!tbody) return;
    tbody.innerHTML = filtered.map(item => {
      const cover = (item.images && item.images[0]) || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=200&q=80';

      return `
        <tr class="hover:bg-white/[0.04] transition-colors">
          <!-- Property Info -->
          <td class="py-3.5 px-4">
            <div class="flex items-center gap-3">
              <img src="${cover}" alt="${item.name}" class="w-14 h-11 rounded-lg object-cover border border-white/10 shrink-0" loading="lazy" />
              <div class="min-w-0">
                <div class="flex items-center gap-1.5">
                  <a href="property.html?id=${item.id}" target="_blank" class="font-serif font-bold text-white hover:text-[#C8A96A] transition-colors truncate max-w-xs block">
                    ${item.name}
                  </a>
                  ${item.featured ? '<span class="text-amber-400 font-bold text-xs" title="Featured Listing">★</span>' : ''}
                </div>
                <p class="text-[11px] text-white/50 truncate max-w-xs">${item.tagline || item.type}</p>
              </div>
            </div>
          </td>

          <!-- Location & Type -->
          <td class="py-3.5 px-4 whitespace-nowrap">
            <span class="block font-semibold text-white/90 text-xs">${item.location}</span>
            <span class="text-[11px] text-[#C8A96A] font-medium">${item.type}</span>
          </td>

          <!-- Asking Price -->
          <td class="py-3.5 px-4 whitespace-nowrap font-serif font-bold text-white">
            ${formatCurrency(item.price)}
          </td>

          <!-- Beds & Baths -->
          <td class="py-3.5 px-4 text-center whitespace-nowrap text-white/80 text-xs">
            <span class="font-semibold text-white">${item.bedrooms || 0}</span> Bed &bull; <span class="font-semibold text-white">${item.bathrooms || 0}</span> Bath
          </td>

          <!-- Built Area -->
          <td class="py-3.5 px-4 text-center whitespace-nowrap text-white/80 text-xs">
            <span class="font-semibold text-white">${item.buildingArea || item.landArea || '-'} m²</span>
          </td>

          <!-- Quick Status Changer -->
          <td class="py-3.5 px-4 text-center whitespace-nowrap">
            <select class="admin-inline-status-select text-[11px] font-bold rounded-lg px-2.5 py-1 bg-[#091928] border cursor-pointer transition-colors ${
              item.status === 'Available' ? 'border-emerald-500/50 text-emerald-400' :
              item.status === 'Reserved' ? 'border-amber-500/50 text-amber-400' :
              'border-white/20 text-slate-300'
            }" data-id="${item.id}" title="Click to instantly switch status">
              <option value="Available" class="bg-[#091928] text-emerald-400" ${item.status === 'Available' ? 'selected' : ''}>● Available</option>
              <option value="Reserved" class="bg-[#091928] text-amber-400" ${item.status === 'Reserved' ? 'selected' : ''}>● Reserved</option>
              <option value="Sold" class="bg-[#091928] text-slate-300" ${item.status === 'Sold' ? 'selected' : ''}>● Sold</option>
            </select>
          </td>

          <!-- Actions -->
          <td class="py-3.5 px-4 text-right whitespace-nowrap space-x-1">
            <button type="button" class="admin-copy-link-btn p-1.5 text-white/60 hover:text-[#C8A96A] inline-block rounded-lg hover:bg-white/10 transition-colors" data-id="${item.id}" data-name="${item.name.replace(/"/g, '&quot;')}" title="Copy Shareable Client Link">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
            </button>
            <a href="property.html?id=${item.id}" target="_blank" class="p-1.5 text-white/60 hover:text-white inline-block rounded-lg hover:bg-white/10 transition-colors" title="View Live Page">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            </a>
            <button type="button" class="admin-clone-btn p-1.5 text-white/60 hover:text-emerald-400 inline-block rounded-lg hover:bg-white/10 transition-colors" data-id="${item.id}" title="Clone / Duplicate Residence">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            </button>
            <button type="button" class="admin-edit-btn p-1.5 text-white/80 hover:text-[#C8A96A] inline-block rounded-lg hover:bg-white/10 transition-colors" data-id="${item.id}" title="Edit Listing">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            </button>
            <button type="button" class="admin-del-btn p-1.5 text-red-400 hover:text-red-300 inline-block rounded-lg hover:bg-red-500/20 transition-colors" data-id="${item.id}" data-name="${item.name.replace(/"/g, '&quot;')}" title="Delete Listing">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Attach row events
    tbody.querySelectorAll('.admin-inline-status-select').forEach(sel => {
      sel.addEventListener('change', () => {
        const id = sel.getAttribute('data-id');
        const newStatus = sel.value;
        if (window.AzureDB && window.AzureDB.updateProperty) {
          window.AzureDB.updateProperty(id, { status: newStatus });
          showToast(`Residence status updated to "${newStatus}"!`);
          renderTable();
          renderYieldsTab();
          renderDiagnostics();
        }
      });
    });

    tbody.querySelectorAll('.admin-copy-link-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const name = btn.getAttribute('data-name');
        copyShareableLink(id, name);
      });
    });

    tbody.querySelectorAll('.admin-clone-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        cloneProperty(id);
      });
    });

    tbody.querySelectorAll('.admin-edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openEditModal(id);
      });
    });

    tbody.querySelectorAll('.admin-del-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const name = btn.getAttribute('data-name');
        openDeleteModal(id, name);
      });
    });
  }

  // Quick Status Filter Pills Click
  quickPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const targetStatus = pill.getAttribute('data-admin-quick-status');
      if (filterStatus) filterStatus.value = targetStatus;
      updateQuickPillsActive(targetStatus);
      renderTable();
    });
  });

  // Keep pills in sync if user changes the <select> dropdown
  if (filterStatus) {
    filterStatus.addEventListener('change', () => {
      updateQuickPillsActive(filterStatus.value);
      renderTable();
    });
  }

  // =========================================================================
  // PROPERTY MODAL & MULTI-IMAGE PREVIEW
  // =========================================================================
  function updateImagePreviews() {
    const val1 = formImage ? formImage.value.trim() : '';
    const val2 = formImage2 ? formImage2.value.trim() : '';
    const val3 = formImage3 ? formImage3.value.trim() : '';

    let hasAny = false;

    if (val1 && previewImg) {
      previewImg.src = val1;
      hasAny = true;
    }

    if (val2 && preview2Img && preview2Box) {
      preview2Img.src = val2;
      preview2Box.classList.remove('hidden');
      hasAny = true;
    } else if (preview2Box) {
      preview2Box.classList.add('hidden');
    }

    if (val3 && preview3Img && preview3Box) {
      preview3Img.src = val3;
      preview3Box.classList.remove('hidden');
      hasAny = true;
    } else if (preview3Box) {
      preview3Box.classList.add('hidden');
    }

    if (previewBox) {
      if (hasAny) {
        previewBox.classList.remove('hidden');
      } else {
        previewBox.classList.add('hidden');
      }
    }
  }

  function openCreateModal() {
    if (!propModal || !propForm) return;
    formId.value = '';
    propForm.reset();
    propModalTitle.textContent = "Add New Residence";
    formStatus.value = 'Available';
    formLocation.value = 'Azure Bay Coast';
    formType.value = 'Villa';
    if (formImage2) formImage2.value = '';
    if (formImage3) formImage3.value = '';
    updateImagePreviews();
    propModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function openEditModal(id) {
    if (!propModal) return;
    const list = getProperties();
    const item = list.find(p => p.id === id);
    if (!item) return;

    formId.value = item.id;
    formName.value = item.name || '';
    formLocation.value = item.location || 'Azure Bay Coast';
    formType.value = item.type || 'Villa';
    formStatus.value = item.status || 'Available';
    formPrice.value = item.price || '';
    formBedrooms.value = item.bedrooms || 0;
    formBathrooms.value = item.bathrooms || 0;
    formBuilding.value = item.buildingArea || '';
    formLand.value = item.landArea || '';
    formTagline.value = item.tagline || '';
    formFeatured.checked = !!item.featured;
    formImage.value = (item.images && item.images[0]) || '';
    if (formImage2) formImage2.value = (item.images && item.images[1]) || '';
    if (formImage3) formImage3.value = (item.images && item.images[2]) || '';
    formDescription.value = item.description || '';
    formAmenities.value = (item.amenities || []).join(', ');

    updateImagePreviews();

    propModalTitle.textContent = `Edit Residence: ${item.name}`;
    propModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePropModal() {
    if (propModal) propModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openDeleteModal(id, name) {
    currentPendingDeleteId = id;
    if (deletePropNameEl) deletePropNameEl.textContent = `"${name}"`;
    if (deleteModal) deleteModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDeleteModal() {
    currentPendingDeleteId = null;
    if (deleteModal) deleteModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Handle Form Submit (Create or Update)
  if (propForm) {
    propForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const id = formId.value.trim();
      const name = formName.value.trim();
      const location = formLocation.value;
      const type = formType.value;
      const status = formStatus.value;
      const price = parseFloat(formPrice.value) || 0;
      const bedrooms = parseInt(formBedrooms.value, 10) || 0;
      const bathrooms = parseInt(formBathrooms.value, 10) || 0;
      const buildingArea = parseInt(formBuilding.value, 10) || 0;
      const landArea = parseInt(formLand.value, 10) || 0;
      const tagline = formTagline.value.trim();
      const featured = formFeatured.checked;
      const coverImage = formImage.value.trim();
      const photo2 = formImage2 ? formImage2.value.trim() : '';
      const photo3 = formImage3 ? formImage3.value.trim() : '';
      const description = formDescription.value.trim();
      const amenities = formAmenities.value
        .split(',')
        .map(a => a.trim())
        .filter(Boolean);

      const propData = {
        name,
        location,
        type,
        status,
        price,
        bedrooms,
        bathrooms,
        buildingArea,
        landArea,
        tagline,
        featured,
        description,
        amenities: amenities.length > 0 ? amenities : ["Panoramic Ocean Views", "Private Infinity Pool", "Smart Automation"]
      };

      const collectedImages = [coverImage, photo2, photo3].filter(Boolean);

      if (id) {
        // Update existing
        const list = getProperties();
        const existing = list.find(p => p.id === id);
        let images = existing && existing.images ? [...existing.images] : [];
        if (collectedImages.length > 0) {
          images = collectedImages;
        }
        propData.images = images;

        if (window.AzureDB) {
          window.AzureDB.updateProperty(id, propData);
        }
        showToast(`Residence "${name}" updated successfully!`);
      } else {
        // Create new
        propData.id = 'residence-' + Date.now();
        propData.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        propData.yearBuilt = new Date().getFullYear();
        propData.images = collectedImages.length > 0 ? collectedImages : [
          coverImage || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
        ];
        propData.coordinates = { lat: 25.7617, lng: -80.1918 };

        if (window.AzureDB) {
          window.AzureDB.addProperty(propData);
        }
        showToast(`New residence "${name}" published to live catalog!`);
      }

      closePropModal();
      renderTable();
      renderYieldsTab();
    });
  }

  // Handle Delete Confirmation
  if (deleteModalConfirm) {
    deleteModalConfirm.addEventListener('click', () => {
      if (currentPendingDeleteId) {
        if (window.AzureDB) {
          window.AzureDB.deleteProperty(currentPendingDeleteId);
        }
        showToast(`Residence deleted from catalog.`, true);
        closeDeleteModal();
        renderTable();
        renderYieldsTab();
      }
    });
  }

  // Quick Photo Preset Button
  if (quickPhotoBtn) {
    quickPhotoBtn.addEventListener('click', () => {
      photoPresetIdx = (photoPresetIdx + 1) % LUXURY_PHOTO_PRESETS.length;
      const set = LUXURY_PHOTO_PRESETS[photoPresetIdx];
      if (formImage) formImage.value = set[0];
      if (formImage2) formImage2.value = set[1];
      if (formImage3) formImage3.value = set[2];
      updateImagePreviews();
      showToast("Loaded luxury photography preset pack!");
    });
  }

  [formImage, formImage2, formImage3].forEach(input => {
    if (input) {
      input.addEventListener('input', updateImagePreviews);
    }
  });

  // Reset to default
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm("Reset the entire real estate portfolio and leads to master defaults? Custom changes will be restored.")) {
        if (window.AzureDB) {
          window.AzureDB.resetToDefault();
        }
        showToast("Master database and leads restored successfully!");
        renderTable();
        renderLeadsTable();
        renderYieldsTab();
        initBrandSettings();
      }
    });
  }

  // Export JSON
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const backupData = {
        exportedAt: new Date().toISOString(),
        properties: getProperties(),
        leads: (window.AzureDB && window.AzureDB.getLeads()) || [],
        settings: (window.AzureDB && window.AzureDB.getSettings()) || {}
      };
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `azure_bay_full_cms_backup_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast("Full CMS backup exported successfully!");
    });
  }

  // Import JSON
  if (importFile) {
    importFile.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Direct array of properties
            if (window.AzureDB) {
              window.AzureDB.saveProperties(parsed);
            }
            showToast(`Imported ${parsed.length} residences successfully!`);
          } else if (parsed && typeof parsed === 'object') {
            // Full backup format
            if (Array.isArray(parsed.properties) && window.AzureDB) {
              window.AzureDB.saveProperties(parsed.properties);
            }
            if (Array.isArray(parsed.leads) && window.AzureDB) {
              window.AzureDB.saveLeads(parsed.leads);
            }
            if (parsed.settings && window.AzureDB) {
              window.AzureDB.saveSettings(parsed.settings);
            }
            showToast("Imported complete CMS database successfully!");
          } else {
            alert("Invalid JSON format.");
          }
          renderTable();
          renderLeadsTable();
          renderYieldsTab();
          initBrandSettings();
        } catch (err) {
          alert("Error parsing JSON file: " + err.message);
        }
      };
      reader.readAsText(file);
      e.target.value = '';
    });
  }

  // Modal event controls
  if (addPropBtn) addPropBtn.addEventListener('click', openCreateModal);
  if (propModalClose) propModalClose.addEventListener('click', closePropModal);
  if (propModalCancel) propModalCancel.addEventListener('click', closePropModal);
  if (deleteModalClose) deleteModalClose.addEventListener('click', closeDeleteModal);

  // Search & Filter event listeners
  if (searchInput) searchInput.addEventListener('input', renderTable);
  if (filterType) filterType.addEventListener('change', renderTable);

  // =========================================================================
  // LEADS CRM ENGINE & MANUAL INTAKE MODAL
  // =========================================================================
  function getLeads() {
    if (window.AzureDB && typeof window.AzureDB.getLeads === 'function') {
      return window.AzureDB.getLeads();
    }
    return [];
  }

  function openLeadModal() {
    if (!leadModal || !leadForm) return;
    leadForm.reset();
    if (leadFormStatus) leadFormStatus.value = 'New Lead';
    leadModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLeadModal() {
    if (leadModal) leadModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (addLeadBtnTop) addLeadBtnTop.addEventListener('click', openLeadModal);
  if (addLeadBtnTab) addLeadBtnTab.addEventListener('click', openLeadModal);
  if (leadModalClose) leadModalClose.addEventListener('click', closeLeadModal);
  if (leadModalCancel) leadModalCancel.addEventListener('click', closeLeadModal);

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = leadFormName ? leadFormName.value.trim() : '';
      const email = leadFormEmail ? leadFormEmail.value.trim() : '';
      const phone = leadFormPhone ? leadFormPhone.value.trim() : '';
      const property = leadFormProperty ? leadFormProperty.value.trim() : 'Portfolio Consultation';
      const budget = leadFormBudget ? leadFormBudget.value.trim() : 'Custom Allocation';
      const status = leadFormStatus ? leadFormStatus.value : 'New Lead';
      const notes = leadFormNotes ? leadFormNotes.value.trim() : '';

      if (!name || !email) {
        alert("Please provide the investor's name and email.");
        return;
      }

      const newLead = {
        name,
        email,
        phone,
        property,
        budget,
        status,
        notes,
        goal: notes || 'Private Asset Acquisition',
        source: 'Executive Portal Entry',
        date: new Date().toISOString().split('T')[0]
      };

      if (window.AzureDB && typeof window.AzureDB.addLead === 'function') {
        window.AzureDB.addLead(newLead);
      }

      showToast(`Investor lead "${name}" registered successfully!`);
      closeLeadModal();
      renderLeadsTable();
    });
  }

  function renderLeadsTable() {
    const allLeads = getLeads();
    const newLeadsCount = allLeads.filter(l => l.status === 'New Lead').length;
    if (sidebarLeadsCount) {
      sidebarLeadsCount.textContent = `${newLeadsCount} New`;
      sidebarLeadsCount.className = newLeadsCount > 0 
        ? "text-[10px] bg-emerald-500 text-white font-bold px-2 py-0.5 rounded animate-pulse" 
        : "text-[10px] bg-white/10 text-white/70 px-2 py-0.5 rounded";
    }

    // Render Recent Leads on Dashboard tab
    if (recentLeadsList) {
      const topRecent = allLeads.slice(0, 4);
      if (topRecent.length === 0) {
        recentLeadsList.innerHTML = `<p class="text-xs text-white/40 py-3 text-center">No leads registered yet.</p>`;
      } else {
        recentLeadsList.innerHTML = topRecent.map(lead => {
          const statusBadge = getStatusBadge(lead.status);
          const rawPhone = lead.phone ? lead.phone.replace(/[^0-9]/g, '') : '';
          return `
            <div class="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-3">
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <h4 class="font-serif font-bold text-sm text-white truncate">${lead.name}</h4>
                  ${statusBadge}
                </div>
                <p class="text-[11px] text-white/50 truncate mt-0.5">${lead.property || 'General Portfolio'} &bull; ${lead.budget || 'Custom Allocation'}</p>
              </div>
              <div class="flex items-center gap-2 shrink-0">
                <span class="text-[10px] text-white/40 hidden sm:inline">${lead.date || ''}</span>
                ${rawPhone ? `
                  <a href="https://wa.me/${rawPhone}?text=${encodeURIComponent(`Hello ${lead.name}, regarding your inquiry with Azure Bay Residences...`)}" target="_blank" class="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors" title="Message via WhatsApp">
                    <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                  </a>
                ` : ''}
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // Render Full Leads Table on Leads tab
    if (!leadsTbody) return;

    const filterVal = leadsFilterStatus ? leadsFilterStatus.value : '';
    const query = leadsSearchInput ? leadsSearchInput.value.trim().toLowerCase() : '';

    const filteredLeads = allLeads.filter(l => {
      if (filterVal && l.status !== filterVal) return false;
      if (query) {
        const matchesName = l.name ? l.name.toLowerCase().includes(query) : false;
        const matchesEmail = l.email ? l.email.toLowerCase().includes(query) : false;
        const matchesPhone = l.phone ? l.phone.toLowerCase().includes(query) : false;
        const matchesProp = l.property ? l.property.toLowerCase().includes(query) : false;
        const matchesNotes = (l.notes || l.goal) ? (l.notes || l.goal).toLowerCase().includes(query) : false;
        if (!matchesName && !matchesEmail && !matchesPhone && !matchesProp && !matchesNotes) return false;
      }
      return true;
    });

    if (filteredLeads.length === 0) {
      leadsTbody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center py-12 text-white/50">
            <p class="font-serif text-sm font-bold text-white">No leads matching selected criteria</p>
            <p class="text-xs mt-1">Register new investor leads or adjust your filters above.</p>
          </td>
        </tr>
      `;
      return;
    }

    leadsTbody.innerHTML = filteredLeads.map(lead => {
      const rawPhone = lead.phone ? lead.phone.replace(/[^0-9]/g, '') : '';
      return `
        <tr class="hover:bg-white/[0.04] transition-colors">
          <!-- Client Info -->
          <td class="py-3.5 px-4">
            <strong class="font-serif font-bold text-sm text-white block">${lead.name}</strong>
            <div class="text-[11px] text-white/50 space-y-0.5 mt-0.5">
              ${lead.email ? `<a href="mailto:${lead.email}" class="hover:text-[#C8A96A] block truncate max-w-[200px]">${lead.email}</a>` : ''}
              ${lead.phone ? `<a href="tel:${lead.phone}" class="hover:text-[#C8A96A] block">${lead.phone}</a>` : ''}
            </div>
          </td>

          <!-- Target Residence -->
          <td class="py-3.5 px-4 whitespace-nowrap">
            <span class="block font-semibold text-white/90 truncate max-w-[220px] text-xs">${lead.property || 'Portfolio Consultation'}</span>
            <span class="inline-block text-[10px] px-2 py-0.5 rounded bg-[#C8A96A]/20 text-[#C8A96A] font-semibold mt-0.5">${lead.type || 'Residence'}</span>
          </td>

          <!-- Budget & Goal -->
          <td class="py-3.5 px-4">
            <span class="font-bold text-white text-xs block">${lead.budget || 'Custom Allocation'}</span>
            <p class="text-[11px] text-white/50 max-w-xs truncate" title="${(lead.notes || lead.goal || '').replace(/"/g, '&quot;')}">
              ${lead.goal || lead.notes || 'Asset acquisition consultation'}
            </p>
          </td>

          <!-- Source & Date -->
          <td class="py-3.5 px-4 whitespace-nowrap">
            <span class="text-xs text-white/80 block font-medium">${lead.source || 'Website Form'}</span>
            <span class="text-[11px] text-white/40">${lead.date || 'Recent'}</span>
          </td>

          <!-- Status Dropdown -->
          <td class="py-3.5 px-4 text-center whitespace-nowrap">
            <select class="lead-status-select admin-input-dark !py-1 !px-2 text-xs font-semibold cursor-pointer" data-id="${lead.id}">
              <option value="New Lead" ${lead.status === 'New Lead' ? 'selected' : ''}>🔵 New Lead</option>
              <option value="VIP Qualified" ${lead.status === 'VIP Qualified' ? 'selected' : ''}>⭐ VIP Qualified</option>
              <option value="Viewing Scheduled" ${lead.status === 'Viewing Scheduled' ? 'selected' : ''}>📅 Viewing</option>
              <option value="Escrow Negotiation" ${lead.status === 'Escrow Negotiation' ? 'selected' : ''}>💼 In Escrow</option>
              <option value="Closed / In Escrow" ${lead.status === 'Closed / In Escrow' ? 'selected' : ''}>✅ Closed / Escrow</option>
            </select>
          </td>

          <!-- Quick Contact & CRM Actions -->
          <td class="py-3.5 px-4 text-right whitespace-nowrap space-x-1.5">
            <button type="button" class="lead-notes-btn p-1.5 rounded-lg bg-[#C8A96A]/20 text-[#C8A96A] hover:bg-[#C8A96A] hover:text-[#0F2A43] inline-block transition-colors" data-id="${lead.id}" title="Investor Notes & Activity Log">
              <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            </button>
            ${rawPhone ? `
              <a href="https://wa.me/${rawPhone}?text=${encodeURIComponent(`Hello ${lead.name}, thank you for contacting Azure Bay Residences regarding ${lead.property || 'our luxury residences'}. How may our private office assist you?`)}" target="_blank" class="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white inline-block transition-colors" title="Message via WhatsApp">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              </a>
            ` : ''}
            ${lead.email ? `
              <a href="mailto:${lead.email}?subject=${encodeURIComponent(`Azure Bay Residences — Consultation Follow-up`)}" class="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white inline-block transition-colors" title="Send Email">
                <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </a>
            ` : ''}
            <button type="button" class="lead-del-btn p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white inline-block transition-colors" data-id="${lead.id}" title="Remove Lead">
              <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Attach notes modal trigger handlers
    leadsTbody.querySelectorAll('.lead-notes-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openLeadNotesModal(id);
      });
    });

    // Attach status update event handlers
    leadsTbody.querySelectorAll('.lead-status-select').forEach(select => {
      select.addEventListener('change', () => {
        const id = select.getAttribute('data-id');
        const newStatus = select.value;
        if (window.AzureDB && window.AzureDB.updateLeadStatus) {
          window.AzureDB.updateLeadStatus(id, newStatus);
          showToast(`Lead status updated to "${newStatus}"!`);
          renderLeadsTable();
          renderDiagnostics();
        }
      });
    });

    // Attach delete event handlers
    leadsTbody.querySelectorAll('.lead-del-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (confirm("Remove this investor lead record from the CRM?")) {
          if (window.AzureDB && window.AzureDB.deleteLead) {
            window.AzureDB.deleteLead(id);
            showToast("Lead record removed.");
            renderLeadsTable();
            renderDiagnostics();
          }
        }
      });
    });
  }

  function getStatusBadge(status) {
    if (status === 'VIP Qualified') {
      return '<span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">⭐ VIP Qualified</span>';
    }
    if (status === 'Viewing Scheduled') {
      return '<span class="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">📅 Viewing</span>';
    }
    if (status === 'Escrow Negotiation') {
      return '<span class="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">💼 In Escrow</span>';
    }
    if (status === 'Closed / In Escrow') {
      return '<span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">✅ Closed / Escrow</span>';
    }
    return '<span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">🔵 New Lead</span>';
  }

  // =========================================================================
  // LEAD NOTES & ACTIVITY LOG MODAL LOGIC
  // =========================================================================
  function openLeadNotesModal(id) {
    if (!leadNotesModal) return;
    const leads = getLeads();
    const lead = leads.find(l => String(l.id) === String(id));
    if (!lead) return;

    currentActiveLeadId = id;
    if (leadNotesClientName) leadNotesClientName.textContent = lead.name;
    if (leadNotesClientSub) leadNotesClientSub.textContent = `${lead.property || 'Portfolio Consultation'} • ${lead.email || ''} • Status: ${lead.status || 'New Lead'}`;

    if (leadNewNoteInput) leadNewNoteInput.value = '';

    // Direct Quick Contacts
    if (leadNotesDirectActions) {
      const rawPhone = lead.phone ? lead.phone.replace(/[^0-9]/g, '') : '';
      leadNotesDirectActions.innerHTML = `
        ${rawPhone ? `
          <a href="https://wa.me/${rawPhone}?text=${encodeURIComponent(`Hello ${lead.name}, regarding your inquiry with Azure Bay Residences for ${lead.property || 'our luxury residences'}...`)}" target="_blank" class="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold" title="WhatsApp Concierge">
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            <span>WhatsApp</span>
          </a>
        ` : ''}
        ${lead.email ? `
          <a href="mailto:${lead.email}?subject=${encodeURIComponent(`Azure Bay Residences Executive Concierge — Follow-up`)}" class="px-2.5 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold" title="Send Email">
            <svg class="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <span>Email</span>
          </a>
        ` : ''}
      `;
    }

    renderLeadNotesList(lead);
    leadNotesModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function renderLeadNotesList(lead) {
    if (!leadNotesHistory) return;
    const history = lead.notesHistory || [];
    const initialNote = lead.notes || lead.goal;

    if (history.length === 0 && !initialNote) {
      leadNotesHistory.innerHTML = `<p class="text-white/40 italic py-3 text-center">No notes recorded yet. Append your first note below.</p>`;
      return;
    }

    let html = '';
    if (initialNote) {
      html += `
        <div class="p-2.5 rounded-lg bg-white/[0.04] border border-white/10">
          <div class="flex items-center justify-between text-[10px] text-white/50 mb-1">
            <span class="font-bold text-[#C8A96A]">Initial Intake Note</span>
            <span>${lead.date || 'Received'}</span>
          </div>
          <p class="text-white/80 text-xs">${initialNote}</p>
        </div>
      `;
    }

    history.forEach(item => {
      html += `
        <div class="p-2.5 rounded-lg bg-white/[0.04] border border-white/10">
          <div class="flex items-center justify-between text-[10px] text-white/50 mb-1">
            <span class="font-bold text-emerald-400">Advisor Note (${item.author || 'Executive Desk'})</span>
            <span>${item.timestamp || ''}</span>
          </div>
          <p class="text-white/80 text-xs">${item.text}</p>
        </div>
      `;
    });

    leadNotesHistory.innerHTML = html;
  }

  function closeLeadNotesModal() {
    if (leadNotesModal) leadNotesModal.classList.remove('active');
    currentActiveLeadId = null;
    document.body.style.overflow = '';
  }

  function saveLeadNote() {
    if (!currentActiveLeadId || !leadNewNoteInput) return;
    const text = leadNewNoteInput.value.trim();
    if (!text) {
      alert("Please enter a note before saving.");
      return;
    }

    const leads = getLeads();
    const lead = leads.find(l => String(l.id) === String(currentActiveLeadId));
    if (!lead) return;

    if (!lead.notesHistory) lead.notesHistory = [];
    const now = new Date();
    const timeStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    lead.notesHistory.push({
      text,
      timestamp: timeStr,
      author: 'Julian De La Torre'
    });

    if (window.AzureDB && window.AzureDB.saveLeads) {
      window.AzureDB.saveLeads(leads);
    }

    leadNewNoteInput.value = '';
    renderLeadNotesList(lead);
    showToast(`Note logged to ${lead.name}'s file!`);
    renderLeadsTable();
    renderDiagnostics();
  }

  if (leadNotesClose) leadNotesClose.addEventListener('click', closeLeadNotesModal);
  if (leadNotesCancel) leadNotesCancel.addEventListener('click', closeLeadNotesModal);
  if (leadNotesSaveBtn) leadNotesSaveBtn.addEventListener('click', saveLeadNote);

  // Leads filter and search listeners
  if (leadsFilterStatus) {
    leadsFilterStatus.addEventListener('change', renderLeadsTable);
  }
  if (leadsSearchInput) {
    leadsSearchInput.addEventListener('input', renderLeadsTable);
  }

  // CSV Export Buttons
  if (exportPropsCsvBtn) exportPropsCsvBtn.addEventListener('click', exportResidencesCSV);
  if (exportLeadsCsvBtn) exportLeadsCsvBtn.addEventListener('click', exportLeadsCSV);

  // =========================================================================
  // DYNAMIC ASSET & YIELD ANALYTICS ENGINE (TAB 4)
  // =========================================================================
  function renderYieldsTab() {
    const list = getProperties();
    const activeList = list.filter(p => p.status === 'Available' || p.status === 'Reserved');
    const totalActiveValuation = activeList.reduce((acc, cur) => acc + (cur.price || 0), 0);

    // Read interactive simulator inputs (with fallback defaults: 85% occupancy, 18% fee)
    const occRate = simOccupancySlider ? parseInt(simOccupancySlider.value, 10) : 85;
    const feeRate = simFeeSlider ? parseInt(simFeeSlider.value, 10) : 18;

    if (simOccupancyVal) simOccupancyVal.textContent = `${occRate}%`;
    if (simFeeVal) simFeeVal.textContent = `${feeRate}%`;

    // Mathematical modeling for luxury coastal real estate:
    const grossRate = 0.125;
    const baseGrossRevenue = totalActiveValuation * grossRate;
    const effectiveGrossRevenue = baseGrossRevenue * (occRate / 100);
    const netAnnualRevenue = effectiveGrossRevenue * (1 - (feeRate / 100));
    const netCapRate = totalActiveValuation > 0 ? (netAnnualRevenue / totalActiveValuation) * 100 : 0;
    const quarterlyDividend = netAnnualRevenue / 4;

    // Update KPI cards on Tab 4
    if (yieldStatAssets) yieldStatAssets.textContent = `${activeList.length} Estates`;
    if (yieldStatOccupancy) yieldStatOccupancy.textContent = `${occRate}% Target Occupancy`;
    if (yieldStatGross) {
      yieldStatGross.textContent = formatShortValuation(effectiveGrossRevenue);
    }
    if (yieldStatNet) yieldStatNet.textContent = `${netCapRate.toFixed(1)}% Net`;

    // Update Simulator Outputs
    if (simProjectedNet) simProjectedNet.textContent = `${netCapRate.toFixed(1)}% Net`;
    if (simProjectedAnnual) {
      simProjectedAnnual.textContent = formatShortValuation(netAnnualRevenue);
    }
    if (simProjectedQuarterly) {
      simProjectedQuarterly.textContent = formatShortValuation(quarterlyDividend);
    }

    // Render Rental Schedule Table with top dynamic estates
    if (yieldScheduleTbody) {
      if (activeList.length === 0) {
        yieldScheduleTbody.innerHTML = `
          <tr>
            <td colspan="5" class="py-8 text-center text-white/50 text-xs">No active rental properties available.</td>
          </tr>
        `;
        return;
      }

      const displayItems = activeList.slice(0, 6);
      yieldScheduleTbody.innerHTML = displayItems.map(item => {
        const estPrice = item.price || 1500000;
        const estNightly = Math.round(estPrice * 0.00065);
        const estAnnualNet = estPrice * (netCapRate / 100);
        const estMonthlyNet = Math.round(estAnnualNet / 12);
        const capRatePill = (netCapRate + (item.featured ? 0.4 : -0.2)).toFixed(1);

        return `
          <tr class="hover:bg-white/[0.04] transition-colors">
            <td class="py-3 px-4">
              <span class="font-serif font-bold text-white text-xs block">${item.name}</span>
              <span class="text-[11px] text-white/50">${item.type} &bull; ${item.bedrooms || 3} Bed</span>
            </td>
            <td class="py-3 px-4 font-serif font-bold text-white/90 text-xs">
              ${formatCurrency(item.price)}
            </td>
            <td class="py-3 px-4 font-semibold text-[#C8A96A] text-xs">
              ${formatCurrency(estNightly)} / night
            </td>
            <td class="py-3 px-4 text-emerald-400 font-bold text-xs">
              ${formatCurrency(estMonthlyNet)} / mo
            </td>
            <td class="py-3 px-4 text-right">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ${capRatePill}% Cap Rate
              </span>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // Simulator Sliders Event Listeners
  if (simOccupancySlider) simOccupancySlider.addEventListener('input', renderYieldsTab);
  if (simFeeSlider) simFeeSlider.addEventListener('input', renderYieldsTab);

  if (simResetBtn) {
    simResetBtn.addEventListener('click', () => {
      if (simOccupancySlider) simOccupancySlider.value = 85;
      if (simFeeSlider) simFeeSlider.value = 18;
      renderYieldsTab();
      showToast("Yield simulator parameters reset to baseline (85% occupancy, 18% fee).");
    });
  }

  // =========================================================================
  // BRAND SETTINGS & DIAGNOSTICS ENGINE
  // =========================================================================
  function renderDiagnostics() {
    const props = getProperties();
    const leads = getLeads();

    if (diagResCount) diagResCount.textContent = props.length;
    if (diagLeadsCount) diagLeadsCount.textContent = leads.length;

    try {
      let totalBytes = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key) && key.startsWith('azure_')) {
          totalBytes += (localStorage[key].length + key.length) * 2;
        }
      }
      const kb = (totalBytes / 1024).toFixed(1);
      if (diagStorageSize) diagStorageSize.textContent = `${kb} KB`;
      const pct = Math.min(100, (totalBytes / (5 * 1024 * 1024)) * 100).toFixed(1);
      if (diagStoragePct) diagStoragePct.textContent = `${pct}%`;
    } catch (e) {
      if (diagStorageSize) diagStorageSize.textContent = '38.4 KB';
    }
  }

  function seedDemoLeads() {
    const demoLeads = [
      {
        name: "Countess Sophia von Bern",
        email: "sophia.vonbern@bern-patrimoine.ch",
        phone: "+41 22 819 4400",
        property: "Mirador Clifftop Estate",
        budget: "$4.5M - $6.0M",
        status: "VIP Qualified",
        source: "Geneva Private Banking Referral",
        date: new Date().toISOString().split('T')[0],
        notes: "Family trust acquiring coastal sanctuary for private European summer retreats. Requires private helipad clearance and 24/7 security."
      },
      {
        name: "Sheikh Tariq Al-Qasimi",
        email: "tariq.qasimi@gulf-investments.ae",
        phone: "+971 4 398 2210",
        property: "The Horizon Marina Penthouse",
        budget: "$3.0M - $4.0M",
        status: "Viewing Scheduled",
        source: "Dubai Yacht Show 2026",
        date: new Date().toISOString().split('T')[0],
        notes: "Interested in marina slip for 42m yacht. Requested private offshore yacht tour and turnkey asset management for foreign dividend wires."
      },
      {
        name: "Henrik & Astrid Lindqvist",
        email: "henrik@nordictech-capital.se",
        phone: "+46 8 555 1200",
        property: "Villa Solis Clifftop",
        budget: "$2.5M - $3.2M",
        status: "Escrow Negotiation",
        source: "Architectural Digest Feature",
        date: new Date().toISOString().split('T')[0],
        notes: "Completed digital contract review. Finalizing offshore escrow deposit with Singapore bank branch."
      }
    ];

    demoLeads.forEach(dl => {
      if (window.AzureDB && window.AzureDB.addLead) {
        window.AzureDB.addLead(dl);
      }
    });

    showToast("3 VIP investor inquiry leads injected successfully!");
    renderLeadsTable();
    renderDiagnostics();
  }

  function clearLeads() {
    if (confirm("Are you sure you want to clear all leads in the CRM? This will remove all inquiry records.")) {
      if (window.AzureDB && window.AzureDB.saveLeads) {
        window.AzureDB.saveLeads([]);
        showToast("All leads cleared from CRM.");
        renderLeadsTable();
        renderDiagnostics();
      }
    }
  }

  if (diagSeedLeadsBtn) diagSeedLeadsBtn.addEventListener('click', seedDemoLeads);
  if (diagClearLeadsBtn) diagClearLeadsBtn.addEventListener('click', clearLeads);

  function initBrandSettings() {
    let settings = {};
    if (window.AzureDB && typeof window.AzureDB.getSettings === 'function') {
      settings = window.AzureDB.getSettings();
    } else if (typeof BRAND_CONFIG !== 'undefined') {
      settings = BRAND_CONFIG;
    }

    if (settingBrandName) settingBrandName.value = settings.name || '';
    if (settingBrandShort) settingBrandShort.value = settings.shortName || '';
    if (settingBrandPhone) settingBrandPhone.value = settings.phone || '';
    if (settingBrandWhatsapp) settingBrandWhatsapp.value = settings.whatsappRaw || '';
    if (settingBrandEmail) settingBrandEmail.value = settings.email || '';
    if (settingBrandAddress) settingBrandAddress.value = settings.address || '';
    if (settingBrandLicense) settingBrandLicense.value = settings.license || '';
  }

  if (brandSettingsForm) {
    brandSettingsForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const updated = {
        name: settingBrandName ? settingBrandName.value.trim() : '',
        shortName: settingBrandShort ? settingBrandShort.value.trim() : '',
        phone: settingBrandPhone ? settingBrandPhone.value.trim() : '',
        phoneRaw: settingBrandPhone ? settingBrandPhone.value.replace(/[^0-9+]/g, '') : '',
        whatsapp: settingBrandWhatsapp ? settingBrandWhatsapp.value.trim() : '',
        whatsappRaw: settingBrandWhatsapp ? settingBrandWhatsapp.value.replace(/[^0-9]/g, '') : '',
        email: settingBrandEmail ? settingBrandEmail.value.trim() : '',
        conciergeEmail: settingBrandEmail ? settingBrandEmail.value.trim() : '',
        address: settingBrandAddress ? settingBrandAddress.value.trim() : '',
        license: settingBrandLicense ? settingBrandLicense.value.trim() : ''
      };

      if (window.AzureDB && window.AzureDB.saveSettings) {
        window.AzureDB.saveSettings(updated);
        showToast("Global brand & portal configuration saved successfully!");
        renderDiagnostics();
      }
    });
  }

  // Currency Switcher in Header
  if (adminCurrencySelector) {
    const currentCode = window.currentCurrency || (typeof localStorage !== 'undefined' && localStorage.getItem('azure_currency')) || 'USD';
    adminCurrencySelector.value = currentCode;

    adminCurrencySelector.addEventListener('change', () => {
      const selected = adminCurrencySelector.value;
      if (window.setAppCurrency) {
        window.setAppCurrency(selected);
      }
      renderTable();
      renderYieldsTab();
      showToast(`Admin display currency set to ${selected}!`);
    });
  }

  // Keyboard Shortcuts: '/' for search, 'Escape' to close any modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePropModal();
      closeLeadModal();
      closeDeleteModal();
      closeLeadNotesModal();
      closeMobileSidebar();
    } else if (e.key === '/' && document.activeElement && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      if (searchInput) searchInput.focus();
    }
  });

  // =========================================================================
  // INITIALIZATION ON PAGE LOAD
  // =========================================================================
  function initAdmin() {
    renderTable();
    renderLeadsTable();
    renderYieldsTab();
    initBrandSettings();
    renderDiagnostics();

    // Default to Dashboard tab
    switchTab('tab-dashboard');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdmin);
  } else {
    initAdmin();
  }

})();
