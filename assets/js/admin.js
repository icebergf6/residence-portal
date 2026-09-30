/**
 * Azure Bay Residences - Executive Admin CMS & CRUD Management Engine
 * Connects directly to AzureDB in data.js and persists state in localStorage
 */

(function () {
  'use strict';

  // Elements
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

  // Modals
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

  // Form Fields
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

  function showToast(message, isSuccess = true) {
    if (!toast) return;
    if (toastTimer) clearTimeout(toastTimer);
    toastMsg.textContent = message;
    toast.className = `fixed bottom-6 right-6 z-50 transform transition-all duration-300 pointer-events-none translate-y-0 opacity-100`;
    toastTimer = setTimeout(() => {
      toast.className = `fixed bottom-6 right-6 z-50 transform transition-all duration-300 pointer-events-none translate-y-24 opacity-0`;
    }, 3500);
  }

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
    if (statValuation) {
      if (totalVal >= 1000000) {
        statValuation.textContent = `$${(totalVal / 1000000).toFixed(1)}M`;
      } else {
        statValuation.textContent = `$${(totalVal / 1000).toFixed(0)}K`;
      }
    }
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
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesLoc = p.location.toLowerCase().includes(query);
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
      if (confirm("Reset the entire real estate portfolio to the master 21 residences? Custom changes will be restored.")) {
        if (window.AzureDB) {
          window.AzureDB.resetToDefault();
        }
        showToast("Restored 21 master residences successfully!");
        renderTable();
      }
    });
  }

  // Export JSON
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(getProperties(), null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `azure_bay_portfolio_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast("Portfolio database exported!");
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
            if (window.AzureDB) {
              window.AzureDB.saveProperties(parsed);
            }
            showToast(`Imported ${parsed.length} residences successfully!`);
            renderTable();
          } else {
            alert("Invalid JSON format: expected an array of properties.");
          }
        } catch (err) {
          alert("Error parsing JSON file: " + err.message);
        }
      };
      reader.readAsText(file);
      e.target.value = '';
    });
  }

  // Listeners for Modal controls
  if (addPropBtn) addPropBtn.addEventListener('click', openCreateModal);
  if (propModalClose) propModalClose.addEventListener('click', closePropModal);
  if (propModalCancel) propModalCancel.addEventListener('click', closePropModal);
  if (deleteModalClose) deleteModalClose.addEventListener('click', closeDeleteModal);

  // Search & Filter event listeners
  if (searchInput) searchInput.addEventListener('input', renderTable);
  if (filterStatus) filterStatus.addEventListener('change', renderTable);
  if (filterType) filterType.addEventListener('change', renderTable);

  // Initial render on load
  document.addEventListener('DOMContentLoaded', renderTable);
  renderTable();

})();
