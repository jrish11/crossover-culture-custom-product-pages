(() => {
  const COLOR_OPTIONS = {
    Base: [
      { name: 'White', value: '#FFFFFF' },
      { name: 'Black', value: '#111111' },
      { name: 'Iron Grey', value: '#6E7175' },
      { name: 'Team Navy', value: '#203A72' },
      { name: 'Team Royal', value: '#2454C6' },
      { name: 'Forest Green', value: '#355B3E' },
      { name: 'Team Red', value: '#BF2B2B' },
      { name: 'Maroon', value: '#6F263D' },
      { name: 'Gold Yellow', value: '#B89641' }
    ],
    Artwork: [
      { name: 'Black', value: '#111111' },
      { name: 'White', value: '#FFFFFF' },
      { name: 'Silver Grey', value: '#A7ADB3' },
      { name: 'Team Navy', value: '#203A72' },
      { name: 'Team Royal', value: '#2454C6' },
      { name: 'Forest Green', value: '#355B3E' },
      { name: 'Team Red', value: '#BF2B2B' },
      { name: 'Maroon', value: '#6F263D' },
      { name: 'Gold Yellow', value: '#B89641' },
      { name: 'Orange', value: '#CB6A2D' }
    ]
  };

  const DEFAULT_COLORS = {
    Base: { hex: '#111111', name: 'Black', apply: 'Applies to the short body and waistband.' },
    Artwork: { hex: '#FFFFFF', name: 'White', apply: 'Applies to logos, wording, and decoration placements.' }
  };

  const VECTOR_EXTENSIONS = ['svg', 'ai', 'eps'];

  const normalizeHex = (value) => {
    const stripped = value.toUpperCase().replace(/[^0-9A-F]/g, '').slice(0, 6);
    return stripped ? `#${stripped}` : '#';
  };

  const isValidHex = (value) => /^#[0-9A-F]{6}$/.test(value);

  const getPalette = (target) => COLOR_OPTIONS[target] || [];

  const getColorName = (target, hex) => getPalette(target).find((color) => color.value === hex)?.name || 'Custom';

  const formatColorLabel = (hex, name) => `${hex} (${name})`;

  const getFileExtension = (filename) => {
    const parts = filename.split('.');
    return parts.length > 1 ? parts.pop().toLowerCase() : '';
  };

  const initializeSection = (section) => {
    const minPieces = Math.max(parseInt(section.dataset.minPieces || '6', 10) || 6, 6);

    const mainImage = section.querySelector('[data-main-image]');
    const thumbnails = Array.from(section.querySelectorAll('[data-gallery-thumb]'));
    const form = section.querySelector('[data-practice-shorts-form]');
    const totalPiecesProperty = section.querySelector('[data-total-pieces-property]');
    const sizeBreakdownProperty = section.querySelector('[data-size-breakdown-property]');
    const quantityInputs = Array.from(section.querySelectorAll('[data-size-quantity]'));
    const uploadInput = section.querySelector('[data-vector-upload]');
    const uploadName = section.querySelector('[data-upload-name]');
    const uploadSummary = section.querySelector('[data-summary-upload-status]');
    const sizeBreakdownSummary = section.querySelector('[data-summary-size-breakdown]');
    const errorMessage = section.querySelector('[data-form-message="error"]');
    const colorPicker = section.querySelector('[data-color-picker]');
    const colorHexInput = section.querySelector('[data-color-hex]');
    const colorPreview = section.querySelector('[data-color-preview]');
    const colorApplyCopy = section.querySelector('[data-color-apply-copy]');
    const activeColorDisplay = section.querySelector('[data-active-color-display]');
    const colorTargetButtons = Array.from(section.querySelectorAll('[data-color-target-button]'));
    const colorSwatches = Array.from(section.querySelectorAll('[data-color-swatch]'));
    const swatchGroups = Array.from(section.querySelectorAll('[data-color-group]'));
    const resetColorsButton = section.querySelector('[data-reset-colors]');
    const addToCartButton = section.querySelector('[data-add-to-cart]');
    const submittingLabel = addToCartButton?.dataset.submittingLabel || 'Adding Practice Shorts Order...';
    const totalPiecesSummary = section.querySelector('[data-summary-total-pieces]');
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

    const colorState = {
      Base: { ...DEFAULT_COLORS.Base },
      Artwork: { ...DEFAULT_COLORS.Artwork }
    };

    let activeColorTarget = 'Base';

    const getApplyCopy = (target) => {
      const matchingButton = colorTargetButtons.find((button) => button.dataset.colorTarget === target);
      return matchingButton?.dataset.colorApplyCopy || DEFAULT_COLORS[target].apply;
    };

    colorState.Base.apply = getApplyCopy('Base');
    colorState.Artwork.apply = getApplyCopy('Artwork');

    const setMessage = (type, message) => {
      if (type === 'error') {
        errorMessage.textContent = message;
        errorMessage.hidden = false;
        return;
      }

      errorMessage.hidden = true;
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

    const updateSizeBreakdownSummary = () => {
      const sizeEntries = buildSizeBreakdown();
      const summaryText = sizeEntries.length ? sizeEntries.join(' | ') : 'No sizes entered yet';
      sizeBreakdownProperty.value = sizeEntries.join(' | ');
      sizeBreakdownSummary.textContent = summaryText;
    };

    const updateTotalPieces = () => {
      const total = quantityInputs.reduce((sum, input) => {
        const quantity = Math.max(parseInt(input.value || '0', 10) || 0, 0);
        return sum + quantity;
      }, 0);

      totalPiecesProperty.value = String(total);
      totalPiecesSummary.textContent = `${total} piece${total === 1 ? '' : 's'}`;
      updateSizeBreakdownSummary();
    };

    const refreshSwatches = () => {
      const current = colorState[activeColorTarget];
      colorSwatches.forEach((swatch) => {
        const sameTarget = swatch.dataset.colorTargetScope === activeColorTarget;
        const isMatch = sameTarget && swatch.dataset.colorValue === current.hex && swatch.dataset.colorName === current.name;
        swatch.classList.toggle('is-active', isMatch);
        swatch.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
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
      colorHexInput.value = current.hex;
      colorPicker.value = isValidHex(current.hex) ? current.hex : '#000000';
      colorPreview.style.backgroundColor = isValidHex(current.hex) ? current.hex : '#FFFFFF';
      refreshSwatches();
    };

    const commitColorState = (target, rawHex, forcedName) => {
      const normalizedHex = normalizeHex(rawHex);
      const valid = isValidHex(normalizedHex);
      const name = forcedName || (valid ? getColorName(target, normalizedHex) : 'Custom');
      const label = valid ? formatColorLabel(normalizedHex, name) : 'Invalid HEX';

      colorState[target].hex = normalizedHex;
      colorState[target].name = name;
      colorPropertyInputs[target].value = valid ? formatColorLabel(normalizedHex, name) : '';
      colorSummaryValues[target].textContent = label;
      orderSummaryColors[target].textContent = label;
      refreshColorEditor();
    };

    const resetColors = () => {
      Object.keys(DEFAULT_COLORS).forEach((target) => {
        colorState[target] = { ...DEFAULT_COLORS[target], apply: getApplyCopy(target) };
        colorPropertyInputs[target].value = formatColorLabel(DEFAULT_COLORS[target].hex, DEFAULT_COLORS[target].name);
        colorSummaryValues[target].textContent = formatColorLabel(DEFAULT_COLORS[target].hex, DEFAULT_COLORS[target].name);
        orderSummaryColors[target].textContent = formatColorLabel(DEFAULT_COLORS[target].hex, DEFAULT_COLORS[target].name);
      });

      activeColorTarget = 'Base';
      refreshColorEditor();
    };

    const syncUploadState = () => {
      if (!uploadInput.files || !uploadInput.files.length) {
        uploadName.textContent = 'No file selected';
        uploadSummary.textContent = 'Not uploaded yet';
        return false;
      }

      const file = uploadInput.files[0];
      const extension = getFileExtension(file.name);
      if (!VECTOR_EXTENSIONS.includes(extension)) {
        uploadName.textContent = 'Vector files only: SVG, AI, EPS';
        uploadSummary.textContent = 'Invalid file type';
        return false;
      }

      uploadName.textContent = file.name;
      uploadSummary.textContent = file.name;
      return true;
    };

    const validateForm = () => {
      clearFieldErrors();
      setMessage(null);

      let isValid = true;
      const sizeEntries = buildSizeBreakdown();
      const totalPieces = parseInt(totalPiecesProperty.value || '0', 10) || 0;

      Object.keys(colorState).forEach((target) => {
        if (!isValidHex(colorState[target].hex) || !colorPropertyInputs[target].value) {
          colorHexInput.classList.add('shooting-shirt-section__field-error');
          isValid = false;
        }
      });

      if (!sizeEntries.length || totalPieces < minPieces) {
        quantityInputs.forEach((input) => {
          input.classList.add('shooting-shirt-section__field-error');
        });
        isValid = false;
      }

      if (!syncUploadState()) {
        uploadInput.classList.add('shooting-shirt-section__field-error');
        isValid = false;
      }

      if (!isValid) {
        setMessage('error', `Please confirm at least ${minPieces} total pieces, choose valid colors, and upload one vector artwork file before adding to cart.`);
      }

      return isValid;
    };

    const submitOrder = () => {
      if (!validateForm()) {
        return;
      }

      sizeBreakdownProperty.value = buildSizeBreakdown().join(' | ');
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

    colorPicker.addEventListener('input', () => {
      commitColorState(activeColorTarget, colorPicker.value);
    });

    colorHexInput.addEventListener('input', () => {
      commitColorState(activeColorTarget, colorHexInput.value);
    });

    colorHexInput.addEventListener('blur', () => {
      commitColorState(activeColorTarget, colorHexInput.value);
    });

    colorSwatches.forEach((swatch) => {
      swatch.addEventListener('click', () => {
        commitColorState(
          swatch.dataset.colorTargetScope || activeColorTarget,
          swatch.dataset.colorValue || '#FFFFFF',
          swatch.dataset.colorName || 'Custom'
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
        updateTotalPieces();
      });
    });

    updateTotalPieces();
    refreshColorEditor();
    syncUploadState();

    uploadInput.addEventListener('change', () => {
      uploadInput.classList.remove('shooting-shirt-section__field-error');
      syncUploadState();
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submitOrder();
    });
  };

  document.querySelectorAll('[data-practice-shorts-form]').forEach((form) => {
    const section = form.closest('.shooting-shirt-section');
    if (section) {
      initializeSection(section);
    }
  });
})();
