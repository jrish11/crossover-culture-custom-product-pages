(() => {
  const COLOR_OPTIONS = {
    Base: [
      { name: 'Black', value: '#111111' },
      { name: 'Heather Grey', value: '#C8C8C2' },
      { name: 'Charcoal', value: '#676767' },
      { name: 'Team Red', value: '#C63737' },
      { name: 'Team Navy', value: '#203A72' },
      { name: 'Team Royal', value: '#4056B4' }
    ],
    Artwork: [
      { name: 'Black', value: '#111111' },
      { name: 'White', value: '#FFFFFF' },
      { name: 'Grey', value: '#A7ADB3' },
      { name: 'Maroon', value: '#6F263D' },
      { name: 'Team Red', value: '#C63737' },
      { name: 'Red', value: '#D73B32' },
      { name: 'Bright Pink', value: '#B04A8B' },
      { name: 'Light Pink', value: '#B6849A' },
      { name: 'Purple', value: '#52426F' },
      { name: 'Team Navy', value: '#203A72' },
      { name: 'Team Royal', value: '#4056B4' },
      { name: 'Atomic Blue', value: '#4F8FB4' },
      { name: 'Bright Blue', value: '#78AFCF' },
      { name: 'Forest Green', value: '#4F6E54' },
      { name: 'Kelly Green', value: '#3F7B4B' },
      { name: 'Bright Green', value: '#6B8E45' },
      { name: 'Texas Orange', value: '#A35F3E' },
      { name: 'Bright Orange', value: '#B54F35' },
      { name: 'Orange', value: '#B45A3F' },
      { name: 'Gold Yellow', value: '#B08D2F' },
      { name: 'Yellow', value: '#B7A82F' },
      { name: 'Vegas Gold', value: '#78704E' },
      { name: 'Brown', value: '#6A5B52' }
    ]
  };

  const DEFAULT_COLORS = {
    Base: { hex: '#111111', name: 'Black', apply: 'Applies to the main fleece body.' },
    Artwork: { hex: '#FFFFFF', name: 'White', apply: 'Applies to the logo and artwork placements.' }
  };

  const VECTOR_EXTENSIONS = ['svg', 'ai', 'eps'];

  const getFileExtension = (filename) => {
    const parts = filename.split('.');
    return parts.length > 1 ? parts.pop().toLowerCase() : '';
  };

  const formatColorLabel = (hex, name) => `${hex} (${name})`;

  const formatMoney = (cents) => {
    const amount = cents / 100;
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  };

  const initializeSection = (section) => {
    const minPieces = Math.max(parseInt(section.dataset.minPieces || '6', 10) || 6, 6);
    const unitPriceCents = Math.max(parseInt(section.dataset.unitPriceCents || '0', 10) || 0, 0);
    const expectedUnitPriceCents = Math.max(parseInt(section.dataset.expectedUnitPriceCents || '0', 10) || 0, 0);
    const expectedUnitPriceLabel = section.dataset.expectedUnitPriceLabel || formatMoney(expectedUnitPriceCents);

    const mainImage = section.querySelector('[data-main-image]');
    const thumbnails = Array.from(section.querySelectorAll('[data-gallery-thumb]'));
    const form = section.querySelector('[data-origin-fleece-form]');
    const cartQuantityInput = section.querySelector('[data-cart-quantity]');
    const totalPiecesProperty = section.querySelector('[data-total-pieces-property]');
    const sizeBreakdownProperty = section.querySelector('[data-size-breakdown-property]');
    const calculatedTotalProperty = section.querySelector('[data-calculated-total-property]');
    const quantityInputs = Array.from(section.querySelectorAll('[data-size-quantity]'));
    const uploadInput = section.querySelector('[data-vector-upload]');
    const uploadName = section.querySelector('[data-upload-name]');
    const uploadSummary = section.querySelector('[data-summary-upload]');
    const errorMessage = section.querySelector('[data-form-message="error"]');
    const colorApplyCopy = section.querySelector('[data-color-apply-copy]');
    const activeColorDisplay = section.querySelector('[data-active-color-display]');
    const colorTargetButtons = Array.from(section.querySelectorAll('[data-color-target-button]'));
    const colorSwatches = Array.from(section.querySelectorAll('[data-color-swatch]'));
    const swatchGroups = Array.from(section.querySelectorAll('[data-color-group]'));
    const resetColorsButton = section.querySelector('[data-reset-colors]');
    const addToCartButton = section.querySelector('[data-add-to-cart]');
    const submittingLabel = addToCartButton?.dataset.submittingLabel || 'Adding Fleece Order...';
    const totalPiecesSummary = section.querySelector('[data-summary-total-pieces]');
    const sizeBreakdownSummary = section.querySelector('[data-summary-size-breakdown]');
    const orderTotalSummary = section.querySelector('[data-summary-order-total]');
    const colorPropertyInputs = {
      Base: section.querySelector('[data-color-property="Base"]'),
      Artwork: section.querySelector('[data-color-property="Artwork"]')
    };
    const colorSummaryValues = {
      Base: section.querySelector('[data-color-summary="Base"] .shooting-shirt-section__color-summary-value'),
      Artwork: section.querySelector('[data-color-summary="Artwork"] .shooting-shirt-section__color-summary-value')
    };
    const orderSummaryColors = {
      Base: section.querySelector('[data-summary-color="Base"]'),
      Artwork: section.querySelector('[data-summary-color="Artwork"]')
    };

    if (!form) {
      return;
    }

    const colorState = {
      Base: { ...DEFAULT_COLORS.Base },
      Artwork: { ...DEFAULT_COLORS.Artwork }
    };

    let activeColorTarget = 'Base';

    const setMessage = (message) => {
      if (!errorMessage) {
        return;
      }

      if (!message) {
        errorMessage.hidden = true;
        errorMessage.textContent = '';
        return;
      }

      errorMessage.textContent = message;
      errorMessage.hidden = false;
    };

    const clearFieldErrors = () => {
      section.querySelectorAll('.shooting-shirt-section__field-error').forEach((field) => {
        field.classList.remove('shooting-shirt-section__field-error');
      });
    };

    const buildSizeBreakdown = () => quantityInputs.reduce((entries, input) => {
      const quantity = parseInt(input.value || '0', 10) || 0;
      if (quantity > 0) {
        entries.push(`${input.dataset.sizeLabel} x ${quantity}`);
      }
      return entries;
    }, []);

    const syncSizeSummary = () => {
      const entries = buildSizeBreakdown();
      const total = quantityInputs.reduce((sum, input) => {
        const quantity = Math.max(parseInt(input.value || '0', 10) || 0, 0);
        return sum + quantity;
      }, 0);
      const totalLabel = `${total} piece${total === 1 ? '' : 's'}`;
      const totalMoney = formatMoney(total * unitPriceCents);

      totalPiecesProperty.value = String(total);
      calculatedTotalProperty.value = totalMoney;
      totalPiecesSummary.textContent = totalLabel;
      sizeBreakdownSummary.textContent = entries.length ? entries.join(' | ') : 'Not entered yet';
      if (orderTotalSummary) {
        orderTotalSummary.textContent = totalMoney;
      }
    };

    const refreshSwatches = () => {
      const current = colorState[activeColorTarget];
      colorSwatches.forEach((swatch) => {
        const sameTarget = swatch.dataset.colorTargetScope === activeColorTarget;
        const isMatch = sameTarget && swatch.dataset.colorValue === current.hex && swatch.dataset.colorName === current.name;
        swatch.classList.toggle('is-active', isMatch);
        swatch.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
        const fill = swatch.querySelector('.shooting-shirt-section__mini-swatch-fill');
        if (fill) fill.style.backgroundColor = swatch.dataset.colorValue || '';
      });
    };

    const refreshColorEditor = () => {
      const current = colorState[activeColorTarget];
      colorTargetButtons.forEach((button) => {
        const isActive = button.dataset.colorTarget === activeColorTarget;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });

      swatchGroups.forEach((group) => {
        group.hidden = group.dataset.colorGroup !== activeColorTarget;
      });

      activeColorDisplay.textContent = formatColorLabel(current.hex, current.name);
      colorApplyCopy.textContent = current.apply;
      refreshSwatches();
    };

    const commitColorState = (target, hex, name) => {
      const color = COLOR_OPTIONS[target].find((option) => option.value === hex && option.name === name);
      if (!color) {
        return;
      }

      const label = formatColorLabel(color.value, color.name);
      colorState[target].hex = color.value;
      colorState[target].name = color.name;
      colorPropertyInputs[target].value = label;
      colorSummaryValues[target].textContent = label;
      orderSummaryColors[target].textContent = label;
      refreshColorEditor();
    };

    const resetColors = () => {
      Object.keys(DEFAULT_COLORS).forEach((target) => {
        const color = DEFAULT_COLORS[target];
        colorState[target] = { ...color };
        const label = formatColorLabel(color.hex, color.name);
        colorPropertyInputs[target].value = label;
        colorSummaryValues[target].textContent = label;
        orderSummaryColors[target].textContent = label;
      });

      activeColorTarget = 'Base';
      refreshColorEditor();
    };

    const validateVectorUpload = () => {
      if (!uploadInput.files || !uploadInput.files.length) {
        uploadName.textContent = 'No file selected';
        uploadSummary.textContent = 'No file selected';
        return false;
      }

      const file = uploadInput.files[0];
      const extension = getFileExtension(file.name);
      if (!VECTOR_EXTENSIONS.includes(extension)) {
        uploadSummary.textContent = 'Invalid file type';
        return false;
      }

      uploadName.textContent = file.name;
      uploadSummary.textContent = file.name;
      return true;
    };

    const validateForm = () => {
      clearFieldErrors();
      setMessage('');

      let isValid = true;
      const sizeEntries = buildSizeBreakdown();
      const totalPieces = parseInt(totalPiecesProperty.value || '0', 10) || 0;

      Object.keys(colorState).forEach((target) => {
        if (!colorPropertyInputs[target].value) {
          isValid = false;
        }
      });

      if (!sizeEntries.length || totalPieces < minPieces) {
        quantityInputs.forEach((input) => {
          input.classList.add('shooting-shirt-section__field-error');
        });
        isValid = false;
      }

      if (!validateVectorUpload()) {
        uploadInput.classList.add('shooting-shirt-section__field-error');
        isValid = false;
      }

      if (unitPriceCents <= 0 || unitPriceCents !== expectedUnitPriceCents) {
        isValid = false;
      }

      if (!isValid) {
        setMessage(`Please choose valid colors, enter at least ${minPieces} total pieces, upload one SVG, AI, or EPS artwork file, and confirm the Shopify variant price is ${expectedUnitPriceLabel} before adding to cart.`);
      }

      return isValid;
    };

    const submitOrder = () => {
      syncSizeSummary();
      if (!validateForm()) {
        return;
      }

      const totalPieces = parseInt(totalPiecesProperty.value || '0', 10) || 0;
      sizeBreakdownProperty.value = buildSizeBreakdown().join(' | ');
      cartQuantityInput.value = String(totalPieces);
      addToCartButton.disabled = true;
      addToCartButton.textContent = submittingLabel;
      HTMLFormElement.prototype.submit.call(form);
    };

    if (mainImage && thumbnails.length) {
      thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener('click', () => {
          mainImage.src = thumbnail.dataset.imageSrc || mainImage.src;
          mainImage.alt = thumbnail.dataset.imageAlt || mainImage.alt;

          thumbnails.forEach((item) => {
            item.classList.remove('is-active');
            item.setAttribute('aria-selected', 'false');
          });

          thumbnail.classList.add('is-active');
          thumbnail.setAttribute('aria-selected', 'true');
        });
      });
    }

    colorTargetButtons.forEach((button) => {
      button.addEventListener('click', () => {
        activeColorTarget = button.dataset.colorTarget || 'Base';
        refreshColorEditor();
      });
    });

    colorSwatches.forEach((swatch) => {
      swatch.addEventListener('click', () => {
        commitColorState(
          swatch.dataset.colorTargetScope || activeColorTarget,
          swatch.dataset.colorValue || '#FFFFFF',
          swatch.dataset.colorName || 'White'
        );
      });
    });

    if (resetColorsButton) {
      resetColorsButton.addEventListener('click', resetColors);
    }

    quantityInputs.forEach((input) => {
      input.addEventListener('input', () => {
        input.classList.remove('shooting-shirt-section__field-error');
        const nextValue = Math.min(Math.max(parseInt(input.value || '0', 10) || 0, 0), 99);
        input.value = nextValue === 0 ? '' : String(nextValue);
        syncSizeSummary();
      });
    });

    uploadInput.addEventListener('change', () => {
      uploadInput.classList.remove('shooting-shirt-section__field-error');
      if (!validateVectorUpload()) {
        uploadName.textContent = 'Vector files only: SVG, AI, EPS';
      }
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submitOrder();
    });

    syncSizeSummary();
    refreshColorEditor();
  };

  document.querySelectorAll('.custom-origin-fleece-section').forEach(initializeSection);
})();
