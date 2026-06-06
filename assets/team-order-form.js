(() => {
  const PRESET_COLORS = [
    { name: 'White', value: '#FFFFFF' },
    { name: 'Black', value: '#111111' },
    { name: 'Royal Blue', value: '#003DA5' },
    { name: 'Navy', value: '#001F5B' },
    { name: 'Forest Green', value: '#1E6B3A' },
    { name: 'Red', value: '#C8102E' },
    { name: 'Maroon', value: '#6F263D' }
  ];

  const VECTOR_EXTENSIONS = ['svg', 'ai', 'eps', 'pdf'];

  const sizeOptionsMarkup = `
    <option value="">Select size</option>
    <optgroup label="Youth">
      <option value="Youth YXS">YXS</option>
      <option value="Youth YS">YS</option>
      <option value="Youth YM">YM</option>
      <option value="Youth YL">YL</option>
      <option value="Youth YXL">YXL</option>
    </optgroup>
    <optgroup label="Women's">
      <option value="Women's WXS">WXS</option>
      <option value="Women's WS">WS</option>
      <option value="Women's WM">WM</option>
      <option value="Women's WL">WL</option>
      <option value="Women's WXL">WXL</option>
      <option value="Women's W2XL">W2XL</option>
    </optgroup>
    <optgroup label="Men's">
      <option value="Men's XS">XS</option>
      <option value="Men's S">S</option>
      <option value="Men's M">M</option>
      <option value="Men's L">L</option>
      <option value="Men's XL">XL</option>
      <option value="Men's 2XL">2XL</option>
      <option value="Men's 3XL">3XL</option>
    </optgroup>
  `;

  const normalizeHex = (value) => {
    const stripped = value.toUpperCase().replace(/[^0-9A-F]/g, '').slice(0, 6);
    if (!stripped) {
      return '#';
    }
    return `#${stripped}`;
  };

  const isValidHex = (value) => /^#[0-9A-F]{6}$/.test(value);

  const formatColorLabel = (hex, name) => `${hex} (${name})`;

  const getColorName = (hex) => PRESET_COLORS.find((color) => color.value === hex)?.name || 'Custom';

  const createRosterRow = (index, sectionId) => {
    const row = document.createElement('tr');
    row.className = 'team-order-section__roster-row';
    row.setAttribute('data-player-row', '');

    row.innerHTML = `
      <td class="team-order-section__roster-index" data-player-index>${index}</td>
      <td>
        <label class="visually-hidden" for="PlayerLastName-${sectionId}-${index}">Player ${index} last name</label>
        <input
          id="PlayerLastName-${sectionId}-${index}"
          class="team-order-section__text-input"
          type="text"
          maxlength="12"
          autocomplete="off"
          placeholder="Last Name"
          data-player-last-name
        >
      </td>
      <td>
        <label class="visually-hidden" for="PlayerNumber-${sectionId}-${index}">Player ${index} number</label>
        <input
          id="PlayerNumber-${sectionId}-${index}"
          class="team-order-section__text-input"
          type="number"
          min="0"
          max="99"
          inputmode="numeric"
          placeholder="00"
          data-player-number
        >
      </td>
      <td>
        <label class="visually-hidden" for="PlayerSize-${sectionId}-${index}">Player ${index} size</label>
        <select id="PlayerSize-${sectionId}-${index}" class="team-order-section__select-input" data-player-size>
          ${sizeOptionsMarkup}
        </select>
      </td>
      <td class="team-order-section__roster-remove-cell">
        <button type="button" class="team-order-section__remove-row" data-remove-player aria-label="Remove player ${index}">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M9 3h6l1 2h4v2H4V5h4l1-2Zm1 7h2v8h-2v-8Zm4 0h2v8h-2v-8ZM7 10h2v8H7v-8Zm-1 11h12l1-13H5l1 13Z" fill="currentColor"></path>
          </svg>
        </button>
      </td>
    `;

    return row;
  };

  const getFileExtension = (fileName) => {
    const lastSegment = fileName.split('.').pop();
    return lastSegment ? lastSegment.toLowerCase() : '';
  };

  const initializeSection = (section) => {
    const sectionId = section.dataset.sectionId || 'section';
    const minPlayers = Math.max(parseInt(section.dataset.minPlayers || '6', 10) || 6, 6);
    const cartAddUrl = section.dataset.cartAddUrl || '/cart/add.js';

    const mainImage = section.querySelector('[data-main-image]');
    const thumbnails = Array.from(section.querySelectorAll('[data-gallery-thumb]'));
    const form = section.querySelector('[data-team-order-form]');
    const teamNameInput = section.querySelector('[data-team-name]');
    const teamNameCount = section.querySelector('[data-team-name-count]');
    const styleInput = section.querySelector('[data-style-value]');
    const styleButtons = Array.from(section.querySelectorAll('[data-style-button]'));
    const rosterBody = section.querySelector('[data-roster-body]');
    const addPlayerButton = section.querySelector('[data-add-player]');
    const addToCartButton = section.querySelector('[data-add-to-cart]');
    const rosterPropertyInput = section.querySelector('[data-roster-property]');
    const playerCountPropertyInput = section.querySelector('[data-player-count-property]');
    const uploadInputs = Array.from(section.querySelectorAll('[data-vector-upload]'));
    const errorMessage = section.querySelector('[data-form-message="error"]');
    const successMessage = section.querySelector('[data-form-message="success"]');
    const colorStudio = section.querySelector('[data-color-studio]');
    const colorPicker = section.querySelector('[data-color-picker]');
    const colorHexInput = section.querySelector('[data-color-hex]');
    const colorPreview = section.querySelector('[data-color-preview]');
    const activeColorDisplay = section.querySelector('[data-active-color-display]');
    const colorApplyCopy = section.querySelector('[data-color-apply-copy]');
    const colorTargetButtons = Array.from(section.querySelectorAll('[data-color-target-button]'));
    const colorSwatches = Array.from(section.querySelectorAll('[data-color-swatch]'));
    const colorPropertyInputs = {
      Main: section.querySelector('[data-color-property="Main"]'),
      Number: section.querySelector('[data-color-property="Number"]'),
      Alt: section.querySelector('[data-color-property="Alt"]')
    };
    const colorSummaryValues = {
      Main: section.querySelector('[data-color-summary="Main"] .team-order-section__color-summary-value'),
      Number: section.querySelector('[data-color-summary="Number"] .team-order-section__color-summary-value'),
      Alt: section.querySelector('[data-color-summary="Alt"] .team-order-section__color-summary-value')
    };
    const colorState = {
      Main: { hex: '#FFFFFF', name: 'White', apply: 'Applies to jersey body and shorts body.' },
      Number: { hex: '#111111', name: 'Black', apply: 'Applies to front number, back number, and player number detailing.' },
      Alt: { hex: '#003DA5', name: 'Royal Blue', apply: 'Applies to trim, piping, side panels, and secondary accents.' }
    };
    let activeColorTarget = 'Main';

    const setMessage = (type, message) => {
      if (type === 'error') {
        errorMessage.textContent = message;
        errorMessage.hidden = false;
        successMessage.hidden = true;
        return;
      }

      if (type === 'success') {
        successMessage.textContent = message;
        successMessage.hidden = false;
        errorMessage.hidden = true;
        return;
      }

      errorMessage.hidden = true;
      successMessage.hidden = true;
    };

    const clearFieldErrors = () => {
      section.querySelectorAll('.team-order-section__field-error').forEach((field) => {
        field.classList.remove('team-order-section__field-error');
      });
    };

    const updateTeamNameCount = () => {
      if (!teamNameInput || !teamNameCount) {
        return;
      }

      teamNameCount.textContent = `${teamNameInput.value.length}/15`;
    };

    const refreshSwatches = () => {
      const current = colorState[activeColorTarget];
      colorSwatches.forEach((swatch) => {
        const isMatch = swatch.dataset.colorValue === current.hex && swatch.dataset.colorName === current.name;
        swatch.classList.toggle('is-active', isMatch);
        swatch.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
      });
    };

    const refreshColorEditor = () => {
      const current = colorState[activeColorTarget];
      const valid = isValidHex(current.hex);

      colorTargetButtons.forEach((button) => {
        const isActive = button.dataset.colorTarget === activeColorTarget;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });

      colorHexInput.value = current.hex;
      colorPicker.value = valid ? current.hex : '#000000';
      colorPreview.style.backgroundColor = valid ? current.hex : '#FFFFFF';
      activeColorDisplay.textContent = valid ? formatColorLabel(current.hex, current.name) : 'Enter a valid HEX value';
      colorApplyCopy.textContent = current.apply;
      refreshSwatches();
    };

    const commitColorState = (target, rawHex, forcedName) => {
      const hex = normalizeHex(rawHex);
      const valid = isValidHex(hex);
      const name = forcedName || (valid ? getColorName(hex) : 'Custom');

      colorState[target].hex = hex;
      colorState[target].name = name;

      colorPropertyInputs[target].value = valid ? formatColorLabel(hex, name) : '';
      colorSummaryValues[target].textContent = valid ? formatColorLabel(hex, name) : 'Invalid HEX';

      refreshColorEditor();
    };

    const getRows = () => Array.from(rosterBody.querySelectorAll('[data-player-row]'));

    const updateRowIndexes = () => {
      getRows().forEach((row, index) => {
        const displayIndex = index + 1;
        const indexCell = row.querySelector('[data-player-index]');
        const lastNameInput = row.querySelector('[data-player-last-name]');
        const numberInput = row.querySelector('[data-player-number]');
        const sizeSelect = row.querySelector('[data-player-size]');
        const removeButton = row.querySelector('[data-remove-player]');
        const labels = row.querySelectorAll('label');

        if (indexCell) {
          indexCell.textContent = String(displayIndex);
        }

        if (lastNameInput) {
          lastNameInput.id = `PlayerLastName-${sectionId}-${displayIndex}`;
          if (labels[0]) {
            labels[0].htmlFor = lastNameInput.id;
            labels[0].textContent = `Player ${displayIndex} last name`;
          }
        }

        if (numberInput) {
          numberInput.id = `PlayerNumber-${sectionId}-${displayIndex}`;
          if (labels[1]) {
            labels[1].htmlFor = numberInput.id;
            labels[1].textContent = `Player ${displayIndex} number`;
          }
        }

        if (sizeSelect) {
          sizeSelect.id = `PlayerSize-${sectionId}-${displayIndex}`;
          if (labels[2]) {
            labels[2].htmlFor = sizeSelect.id;
            labels[2].textContent = `Player ${displayIndex} size`;
          }
        }

        if (removeButton) {
          removeButton.setAttribute('aria-label', `Remove player ${displayIndex}`);
        }
      });

      const disableRemovals = getRows().length <= minPlayers;
      section.querySelectorAll('[data-remove-player]').forEach((button) => {
        button.disabled = disableRemovals;
      });
    };

    const handleLastNameInput = (input) => {
      input.value = input.value.toUpperCase().replace(/[^A-Z\s'-]/g, '').slice(0, 12);
    };

    const handleNumberInput = (input) => {
      input.value = input.value.replace(/\D/g, '').slice(0, 2);
    };

    const clampNumberInput = (input) => {
      if (input.value === '') {
        return;
      }

      const number = Math.min(Math.max(parseInt(input.value, 10), 0), 99);
      input.value = String(number);
    };

    const attachRowInputHandlers = (row) => {
      const lastNameInput = row.querySelector('[data-player-last-name]');
      const numberInput = row.querySelector('[data-player-number]');
      const removeButton = row.querySelector('[data-remove-player]');

      if (lastNameInput) {
        lastNameInput.addEventListener('input', () => handleLastNameInput(lastNameInput));
      }

      if (numberInput) {
        numberInput.addEventListener('input', () => handleNumberInput(numberInput));
        numberInput.addEventListener('blur', () => clampNumberInput(numberInput));
      }

      if (removeButton) {
        removeButton.addEventListener('click', () => {
          if (getRows().length <= minPlayers) {
            setMessage('error', `At least ${minPlayers} players are required for each order.`);
            return;
          }

          row.remove();
          updateRowIndexes();
          setMessage(null);
        });
      }
    };

    const addPlayerRow = () => {
      const nextIndex = getRows().length + 1;
      const row = createRosterRow(nextIndex, sectionId);
      rosterBody.appendChild(row);
      attachRowInputHandlers(row);
      updateRowIndexes();
    };

    const buildRosterEntries = () => getRows().map((row, index) => {
      const lastName = row.querySelector('[data-player-last-name]').value.trim().toUpperCase();
      const number = row.querySelector('[data-player-number]').value.trim();
      const size = row.querySelector('[data-player-size]').value.trim();
      return `${index + 1}. ${lastName} #${number} ${size}`;
    });

    const validateVectorUpload = (input) => {
      const filenameNode = input.closest('.team-order-section__upload-card')?.querySelector('[data-upload-name]');
      if (!input.files || !input.files.length) {
        if (filenameNode) {
          filenameNode.textContent = 'No file selected';
        }
        return false;
      }

      const file = input.files[0];
      const extension = getFileExtension(file.name);
      if (!VECTOR_EXTENSIONS.includes(extension)) {
        return false;
      }

      if (filenameNode) {
        filenameNode.textContent = file.name;
      }
      return true;
    };

    const validateForm = () => {
      clearFieldErrors();
      setMessage(null);
      commitColorState(activeColorTarget, colorHexInput.value);

      let isValid = true;

      if (!teamNameInput.value.trim()) {
        teamNameInput.classList.add('team-order-section__field-error');
        isValid = false;
      }

      Object.keys(colorState).forEach((target) => {
        if (!isValidHex(colorState[target].hex) || !colorPropertyInputs[target].value) {
          colorHexInput.classList.add('team-order-section__field-error');
          isValid = false;
        }
      });

      const rows = getRows();
      if (rows.length < minPlayers) {
        isValid = false;
      }

      rows.forEach((row) => {
        const lastNameInput = row.querySelector('[data-player-last-name]');
        const numberInput = row.querySelector('[data-player-number]');
        const sizeSelect = row.querySelector('[data-player-size]');
        const numberValue = numberInput.value.trim();
        const parsedNumber = Number(numberValue);

        if (!lastNameInput.value.trim()) {
          lastNameInput.classList.add('team-order-section__field-error');
          isValid = false;
        }

        if (numberValue === '' || Number.isNaN(parsedNumber) || parsedNumber < 0 || parsedNumber > 99) {
          numberInput.classList.add('team-order-section__field-error');
          isValid = false;
        }

        if (!sizeSelect.value.trim()) {
          sizeSelect.classList.add('team-order-section__field-error');
          isValid = false;
        }
      });

      uploadInputs.forEach((input) => {
        const extensionValid = validateVectorUpload(input);
        if (!extensionValid) {
          input.classList.add('team-order-section__field-error');
          isValid = false;
        }
      });

      if (!isValid) {
        setMessage('error', 'Please complete all player information, choose valid colors, and upload vector logo files before adding to cart.');
      }

      return isValid;
    };

    const submitOrder = async () => {
      if (!validateForm()) {
        return;
      }

      const rosterEntries = buildRosterEntries();
      rosterPropertyInput.value = rosterEntries.join(' | ');
      playerCountPropertyInput.value = String(rosterEntries.length);

      addToCartButton.disabled = true;
      addToCartButton.textContent = 'Adding Team Order...';

      const formData = new FormData(form);

      try {
        const response = await fetch(cartAddUrl, {
          method: 'POST',
          headers: {
            Accept: 'application/json'
          },
          body: formData
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.description || 'Unable to add the team order to cart.');
        }

        setMessage('success', 'Team order added to cart with roster details, color selections, and vector logo uploads.');
      } catch (error) {
        setMessage('error', error.message || 'Unable to add the team order to cart.');
      } finally {
        addToCartButton.disabled = false;
        addToCartButton.textContent = '🛒 Add Team Order to Cart';
      }
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

    if (teamNameInput) {
      teamNameInput.addEventListener('input', updateTeamNameCount);
      updateTeamNameCount();
    }

    if (colorStudio) {
      refreshColorEditor();

      colorTargetButtons.forEach((button) => {
        button.addEventListener('click', () => {
          activeColorTarget = button.dataset.colorTarget || 'Main';
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
            activeColorTarget,
            swatch.dataset.colorValue || '#FFFFFF',
            swatch.dataset.colorName || 'Custom'
          );
        });
      });
    }

    styleButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const value = button.dataset.styleOption || 'Home';
        styleInput.value = value;

        styleButtons.forEach((item) => {
          const isActive = item === button;
          item.classList.toggle('is-active', isActive);
          item.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
      });
    });

    getRows().forEach((row) => {
      attachRowInputHandlers(row);
    });
    updateRowIndexes();

    if (addPlayerButton) {
      addPlayerButton.addEventListener('click', addPlayerRow);
    }

    uploadInputs.forEach((input) => {
      input.addEventListener('change', () => {
        input.classList.remove('team-order-section__field-error');
        validateVectorUpload(input);
      });
    });

    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        submitOrder();
      });
    }
  };

  document.querySelectorAll('.team-order-section').forEach(initializeSection);
})();
