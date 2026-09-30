/**
 * Azure Bay Residences - Executive Admin CMS & Full Portfolio Engine
 * Connects directly to AzureDB in data.js, managing Residences, Leads CRM, and Brand Settings with localStorage
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

  // KPI Elements
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
  const formDescription = document.getElementById('form-prop-description');
  const formAmenities = document.getElementById('form-prop-amenities');
  const previewBox = document.getElementById('form-image-preview-box');
  const previewImg = document.getElementById('form-image-preview-img');
  const quickPhotoBtn = document.getElementById('btn-quick-photo-preset');

  // Leads CRM Elements
  const leadsTbody = document.getElementById('admin-leads-tbody');
  const leadsFilterStatus = document.getElementById('admin-leads-filter-status');
  const recentLeadsList = document.getElementById('dashboard-recent-leads-list');

  // Brand Settings Form Elements
  const brandSettingsForm = document.getElementById('brand-settings-form');
  const settingBrandName = document.getElementById('setting-brand-name');
  const settingBrandShort = document.getElementById('setting-brand-short');
  const settingBrandPhone = document.getElementById('setting-brand-phone');
  const settingBrandWhatsapp = document.getElementById('setting-brand-whatsapp');
  const settingBrandEmail = document.getElementById('setting-brand-email');
  const settingBrandAddress = document.getElementById('setting-brand-address');
  const settingBrandLicense = document.getElementById('setting-brand-license');

  // Extra Database Buttons
  const resetBtn = document.getElementById('admin-reset-btn');
  const exportBtn = document.getElementById('admin-export-btn');
  const importFile = document.getElementById('admin-import-file');

  // Toast
  const toast = document.getElementById('admin-toast');
  const toastMsg = document.getElementById('toast-message');
  let toastTimer = null;

  let currentPendingDeleteId = null;

  const LUXURY_PHOTO_PRESETS = [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
  ];
  let photoPresetIdx = 0;

  // =========================================================================
  // TOAST NOTIFICATION
  // =========================================================================
  function showToast(message, isSuccess = true) {
    if (!toast) return;
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

    // Update Tab Buttons
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
    } else if (targetTabId === 'tab-settings') {
      initBrandSettings();
    }
  }

  function openMobileSidebar() {
    if (sidebar) sidebar.classList.remove('-translate-x-full');
    if (sidebarBackdrop) sidebarBackdrop.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileSidebar() {
    if (sidebar) sidebar.classList.add('-translate-x-full');
    if (sidebarBackdrop) sidebarBackdrop.classList.add('hidden');
    document.body.style.overflow = '';
  }

  // Bind Sidebar Events
  if (sidebarOpenBtn) sidebarOpenBtn.addEventListener('click', openMobileSidebar);
  if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeMobileSidebar);
  if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeMobileSidebar);

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

  function updateKPIs(list) {
    if (!list) return;
    const total = list.length;
    const available = list.filter(p => p.status === 'Available').length;
    const reservedSold = list.filter(p => p.status === 'Reserved' || p.status === 'Sold').length;
    const totalVal = list.reduce((acc, cur) => acc + (cur.price || 0), 0);

    if (statTotal) statTotal.textContent = total;
    if (statAvailable) statAvailable.textContent = available;
    if (statReserved) statReserved.textContent = reservedSold;
    if (sidebarPropsCount) sidebarPropsCount.textContent = total;

    if (statValuation) {
      if (totalVal >= 1000000) {
        statValuation.textContent = `$${(totalVal / 1000000).toFixed(1)}M`;
      } else {
        statValuation.textContent = `$${(totalVal / 1000).toFixed(0)}K`;
      }
    }
  }

  function formatCurrency(price) {
    if (window.formatUSD && typeof window.formatUSD === 'function') {
      return window.formatUSD(price);
    }
    return `$${Number(price || 0).toLocaleString()}`;
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
      const statusBadgeClass = item.status === 'Available' 
        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
        : (item.status === 'Reserved' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-100 text-slate-700 border-slate-200');

      return `
        <tr class="hover:bg-[#F7F5F0]/80 transition-colors">
          <!-- Property Info -->
          <td class="py-3.5 px-4">
            <div class="flex items-center gap-3">
              <img src="${cover}" alt="${item.name}" class="w-14 h-11 rounded-lg object-cover border border-[#E6E2DA] shrink-0" loading="lazy" />
              <div class="min-w-0">
                <div class="flex items-center gap-1.5">
                  <a href="property.html?id=${item.id}" target="_blank" class="font-serif font-bold text-[#0F2A43] hover:text-[#C8A96A] transition-colors truncate max-w-xs block">
                    ${item.name}
                  </a>
                  ${item.featured ? '<span class="text-amber-500 font-bold text-xs" title="Featured Listing">★</span>' : ''}
                </div>
                <p class="text-[11px] text-[#64748B] truncate max-w-xs">${item.tagline || item.type}</p>
              </div>
            </div>
          </td>

          <!-- Location & Type -->
          <td class="py-3.5 px-4 whitespace-nowrap">
            <span class="block font-semibold text-[#0F2A43]">${item.location}</span>
            <span class="text-[11px] text-[#64748B]">${item.type}</span>
          </td>

          <!-- Asking Price -->
          <td class="py-3.5 px-4 whitespace-nowrap font-serif font-bold text-[#0F2A43]">
            ${formatCurrency(item.price)}
          </td>

          <!-- Beds & Baths -->
          <td class="py-3.5 px-4 text-center whitespace-nowrap text-[#1F2933]">
            <span class="font-semibold">${item.bedrooms || 0}</span> Bed &bull; <span class="font-semibold">${item.bathrooms || 0}</span> Bath
          </td>

          <!-- Built Area -->
          <td class="py-3.5 px-4 text-center whitespace-nowrap text-[#1F2933]">
            <span class="font-semibold">${item.buildingArea || item.landArea || '-'} m²</span>
          </td>

          <!-- Status -->
          <td class="py-3.5 px-4 text-center whitespace-nowrap">
            <span class="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded border ${statusBadgeClass}">
              ${item.status}
            </span>
          </td>

          <!-- Actions -->
          <td class="py-3.5 px-4 text-right whitespace-nowrap space-x-1">
            <a href="property.html?id=${item.id}" target="_blank" class="p-1.5 text-[#64748B] hover:text-[#0F2A43] inline-block rounded hover:bg-[#E6E2DA]/50" title="View Live Page">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            </a>
            <button type="button" class="admin-edit-btn p-1.5 text-[#0F2A43] hover:text-[#C8A96A] inline-block rounded hover:bg-[#E6E2DA]/50" data-id="${item.id}" title="Edit Listing">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            </button>
            <button type="button" class="admin-del-btn p-1.5 text-red-600 hover:text-red-700 inline-block rounded hover:bg-red-50" data-id="${item.id}" data-name="${item.name.replace(/"/g, '&quot;')}" title="Delete Listing">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Attach row events
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

  function openCreateModal() {
    formId.value = '';
    propForm.reset();
    propModalTitle.textContent = "Add New Residence";
    formStatus.value = 'Available';
    formLocation.value = 'Azure Bay Coast';
    formType.value = 'Villa';
    if (previewBox) previewBox.classList.add('hidden');
    propModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function openEditModal(id) {
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
    formDescription.value = item.description || '';
    formAmenities.value = (item.amenities || []).join(', ');

    if (formImage.value && previewBox && previewImg) {
      previewImg.src = formImage.value;
      previewBox.classList.remove('hidden');
    }

    propModalTitle.textContent = `Edit Residence: ${item.name}`;
    propModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePropModal() {
    propModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openDeleteModal(id, name) {
    currentPendingDeleteId = id;
    if (deletePropNameEl) deletePropNameEl.textContent = `"${name}"`;
    deleteModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDeleteModal() {
    currentPendingDeleteId = null;
    deleteModal.classList.remove('active');
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

      if (id) {
        // Update existing
        const list = getProperties();
        const existing = list.find(p => p.id === id);
        let images = existing && existing.images ? [...existing.images] : [coverImage];
        if (coverImage) images[0] = coverImage;
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
        propData.images = [
          coverImage,
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
      }
    });
  }

  // Quick Photo Preset Button
  if (quickPhotoBtn && formImage) {
    quickPhotoBtn.addEventListener('click', () => {
      photoPresetIdx = (photoPresetIdx + 1) % LUXURY_PHOTO_PRESETS.length;
      formImage.value = LUXURY_PHOTO_PRESETS[photoPresetIdx];
      if (previewBox && previewImg) {
        previewImg.src = formImage.value;
        previewBox.classList.remove('hidden');
      }
    });
  }

  if (formImage) {
    formImage.addEventListener('input', () => {
      if (formImage.value.trim() && previewBox && previewImg) {
        previewImg.src = formImage.value.trim();
        previewBox.classList.remove('hidden');
      } else if (previewBox) {
        previewBox.classList.add('hidden');
      }
    });
  }

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
  if (filterStatus) filterStatus.addEventListener('change', renderTable);
  if (filterType) filterType.addEventListener('change', renderTable);

  // =========================================================================
  // LEADS CRM ENGINE
  // =========================================================================
  function getLeads() {
    if (window.AzureDB && typeof window.AzureDB.getLeads === 'function') {
      return window.AzureDB.getLeads();
    }
    return [];
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
        recentLeadsList.innerHTML = `<p class="text-xs text-[#64748B] py-3 text-center">No leads registered yet.</p>`;
      } else {
        recentLeadsList.innerHTML = topRecent.map(lead => {
          const statusBadge = getStatusBadge(lead.status);
          const rawPhone = lead.phone ? lead.phone.replace(/[^0-9]/g, '') : '';
          return `
            <div class="p-3 rounded-xl bg-[#F7F5F0] border border-[#E6E2DA] flex items-center justify-between gap-3">
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <h4 class="font-serif font-bold text-sm text-[#0F2A43] truncate">${lead.name}</h4>
                  ${statusBadge}
                </div>
                <p class="text-[11px] text-[#64748B] truncate mt-0.5">${lead.property || 'General Portfolio'} &bull; ${lead.budget || 'Custom Allocation'}</p>
              </div>
              <div class="flex items-center gap-2 shrink-0">
                <span class="text-[10px] text-[#64748B] hidden sm:inline">${lead.date || ''}</span>
                ${rawPhone ? `
                  <a href="https://wa.me/${rawPhone}?text=${encodeURIComponent(`Hello ${lead.name}, regarding your inquiry with Azure Bay Residences...`)}" target="_blank" class="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors" title="Message via WhatsApp">
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
    const filteredLeads = allLeads.filter(l => {
      if (filterVal && l.status !== filterVal) return false;
      return true;
    });

    if (filteredLeads.length === 0) {
      leadsTbody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center py-12 text-[#64748B]">
            <p class="font-serif text-sm font-bold text-[#0F2A43]">No leads matching selected criteria</p>
            <p class="text-xs mt-1">New leads submitted from landing pages will appear here immediately.</p>
          </td>
        </tr>
      `;
      return;
    }

    leadsTbody.innerHTML = filteredLeads.map(lead => {
      const rawPhone = lead.phone ? lead.phone.replace(/[^0-9]/g, '') : '';
      return `
        <tr class="hover:bg-[#F7F5F0]/80 transition-colors">
          <!-- Client Info -->
          <td class="py-3.5 px-4">
            <strong class="font-serif font-bold text-sm text-[#0F2A43] block">${lead.name}</strong>
            <div class="text-[11px] text-[#64748B] space-y-0.5 mt-0.5">
              ${lead.email ? `<a href="mailto:${lead.email}" class="hover:text-[#C8A96A] block truncate max-w-[200px]">${lead.email}</a>` : ''}
              ${lead.phone ? `<a href="tel:${lead.phone}" class="hover:text-[#C8A96A] block">${lead.phone}</a>` : ''}
            </div>
          </td>

          <!-- Target Residence -->
          <td class="py-3.5 px-4 whitespace-nowrap">
            <span class="block font-semibold text-[#0F2A43] truncate max-w-[220px]">${lead.property || 'Portfolio Consultation'}</span>
            <span class="inline-block text-[10px] px-2 py-0.5 rounded bg-[#F5EEDB] text-[#C8A96A] font-semibold mt-0.5">${lead.type || 'Residence'}</span>
          </td>

          <!-- Budget & Goal -->
          <td class="py-3.5 px-4">
            <span class="font-bold text-[#0F2A43] block">${lead.budget || 'Custom Allocation'}</span>
            <p class="text-[11px] text-[#64748B] max-w-xs truncate" title="${(lead.notes || lead.goal || '').replace(/"/g, '&quot;')}">
              ${lead.goal || lead.notes || 'Asset acquisition consultation'}
            </p>
          </td>

          <!-- Source & Date -->
          <td class="py-3.5 px-4 whitespace-nowrap">
            <span class="text-xs text-[#0F2A43] block font-medium">${lead.source || 'Website Form'}</span>
            <span class="text-[11px] text-[#64748B]">${lead.date || 'Recent'}</span>
          </td>

          <!-- Status Dropdown -->
          <td class="py-3.5 px-4 text-center whitespace-nowrap">
            <select class="lead-status-select bg-white border border-[#E6E2DA] rounded-lg px-2.5 py-1 text-xs font-semibold text-[#0F2A43] focus:border-[#C8A96A] cursor-pointer" data-id="${lead.id}">
              <option value="New Lead" ${lead.status === 'New Lead' ? 'selected' : ''}>🔵 New Lead</option>
              <option value="VIP Qualified" ${lead.status === 'VIP Qualified' ? 'selected' : ''}>⭐ VIP Qualified</option>
              <option value="Viewing Scheduled" ${lead.status === 'Viewing Scheduled' ? 'selected' : ''}>📅 Viewing Scheduled</option>
              <option value="Escrow Negotiation" ${lead.status === 'Escrow Negotiation' ? 'selected' : ''}>💼 Escrow Negotiation</option>
              <option value="Closed / In Escrow" ${lead.status === 'Closed / In Escrow' ? 'selected' : ''}>✅ Closed / Escrow</option>
            </select>
          </td>

          <!-- Quick Contact -->
          <td class="py-3.5 px-4 text-right whitespace-nowrap space-x-1.5">
            ${rawPhone ? `
              <a href="https://wa.me/${rawPhone}?text=${encodeURIComponent(`Hello ${lead.name}, thank you for contacting Azure Bay Residences regarding ${lead.property || 'our luxury residences'}. How may our private office assist you?`)}" target="_blank" class="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 inline-block transition-colors" title="Message via WhatsApp">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              </a>
            ` : ''}
            ${lead.email ? `
              <a href="mailto:${lead.email}?subject=${encodeURIComponent(`Azure Bay Residences — Consultation Follow-up`)}" class="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 inline-block transition-colors" title="Send Email">
                <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </a>
            ` : ''}
            <button type="button" class="lead-del-btn p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 inline-block transition-colors" data-id="${lead.id}" title="Remove Lead">
              <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Attach status update event handlers
    leadsTbody.querySelectorAll('.lead-status-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const id = select.getAttribute('data-id');
        const newStatus = select.value;
        if (window.AzureDB && window.AzureDB.updateLeadStatus) {
          window.AzureDB.updateLeadStatus(id, newStatus);
          showToast(`Lead status updated to "${newStatus}"!`);
          renderLeadsTable();
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
          }
        }
      });
    });
  }

  function getStatusBadge(status) {
    if (status === 'VIP Qualified') {
      return '<span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">⭐ VIP Qualified</span>';
    }
    if (status === 'Viewing Scheduled') {
      return '<span class="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">📅 Viewing</span>';
    }
    if (status === 'Escrow Negotiation') {
      return '<span class="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">💼 In Escrow</span>';
    }
    return '<span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">🔵 New Lead</span>';
  }

  if (leadsFilterStatus) {
    leadsFilterStatus.addEventListener('change', renderLeadsTable);
  }

  // =========================================================================
  // BRAND SETTINGS ENGINE
  // =========================================================================
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
      }
    });
  }

  // =========================================================================
  // INITIALIZATION ON PAGE LOAD
  // =========================================================================
  function initAdmin() {
    renderTable();
    renderLeadsTable();
    initBrandSettings();

    // Default to Dashboard tab
    switchTab('tab-dashboard');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdmin);
  } else {
    initAdmin();
  }

})();
