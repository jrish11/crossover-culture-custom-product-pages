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

  const initializeSection = (section) => {
    const sectionId = section.dataset.sectionId || 'section';
    const minPlayers = Math.max(parseInt(section.dataset.minPlayers || '6', 10) || 6, 6);
    const cartAddUrl = section.dataset.cartAddUrl || '/cart/add.js';
    const productDataNode = section.querySelector('.team-order-section__product-json');
    const productData = productDataNode ? JSON.parse(productDataNode.textContent) : null;
    const variantId = Number(section.dataset.variantId || productData?.selected_or_first_available_variant?.id || productData?.variants?.[0]?.id || 0);

    const mainImage = section.querySelector('[data-main-image]');
    const thumbnails = Array.from(section.querySelectorAll('[data-gallery-thumb]'));
    const teamNameInput = section.querySelector('[data-team-name]');
    const teamNameCount = section.querySelector('[data-team-name-count]');
    const colorHexInput = section.querySelector('[data-color-hex]');
    const colorLabel = section.querySelector('[data-selected-color-label]');
    const colorPreview = section.querySelector('[data-custom-color-preview]');
    const colorValueInput = section.querySelector('[data-uniform-color-value]');
    const swatches = Array.from(section.querySelectorAll('[data-color-swatch]'));
    const styleInput = section.querySelector('[data-style-value]');
    const styleButtons = Array.from(section.querySelectorAll('[data-style-button]'));
    const rosterBody = section.querySelector('[data-roster-body]');
    const addPlayerButton = section.querySelector('[data-add-player]');
    const addToCartButton = section.querySelector('[data-add-to-cart]');
    const sampleSizeSelect = section.querySelector('[data-sample-size]');
    const errorMessage = section.querySelector('[data-form-message="error"]');
    const successMessage = section.querySelector('[data-form-message="success"]');

    let activeColorName = 'White';

    const setMessage = (type, message) => {
      if (type === 'error') {
        errorMessage.textContent = message;
        errorMessage.hidden = false;
        successMessage.hidden = true;
      } else if (type === 'success') {
        successMessage.textContent = message;
        successMessage.hidden = false;
        errorMessage.hidden = true;
      } else {
        errorMessage.hidden = true;
        successMessage.hidden = true;
      }
    };

    const updateTeamNameCount = () => {
      if (!teamNameInput || !teamNameCount) {
        return;
      }

      teamNameCount.textContent = `${teamNameInput.value.length}/15`;
    };

    const syncColorState = (hex, name) => {
      activeColorName = name;
      colorHexInput.value = hex;
      colorLabel.textContent = formatColorLabel(hex, name);
      colorValueInput.value = formatColorLabel(hex, name);
      colorPreview.style.backgroundColor = hex;

      swatches.forEach((swatch) => {
        const isActive = swatch.dataset.colorValue === hex && swatch.dataset.colorName === name;
        swatch.classList.toggle('is-active', isActive);
        swatch.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
    };

    const refreshSwatchMatch = () => {
      const normalized = normalizeHex(colorHexInput.value);
      colorHexInput.value = normalized;

      if (!isValidHex(normalized)) {
        colorPreview.style.backgroundColor = '#FFFFFF';
        colorValueInput.value = normalized;
        colorLabel.textContent = `${normalized} (Custom)`;
        swatches.forEach((swatch) => {
          swatch.classList.remove('is-active');
          swatch.setAttribute('aria-pressed', 'false');
        });
        activeColorName = 'Custom';
        return;
      }

      const matchingPreset = PRESET_COLORS.find((color) => color.value === normalized);
      if (matchingPreset) {
        syncColorState(matchingPreset.value, matchingPreset.name);
        return;
      }

      activeColorName = 'Custom';
      colorPreview.style.backgroundColor = normalized;
      colorLabel.textContent = formatColorLabel(normalized, 'Custom');
      colorValueInput.value = formatColorLabel(normalized, 'Custom');
      swatches.forEach((swatch) => {
        swatch.classList.remove('is-active');
        swatch.setAttribute('aria-pressed', 'false');
      });
    };

    const clearFieldErrors = () => {
      section.querySelectorAll('.team-order-section__field-error').forEach((field) => {
        field.classList.remove('team-order-section__field-error');
      });
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

        if (indexCell) {
          indexCell.textContent = String(displayIndex);
        }
        if (lastNameInput) {
          lastNameInput.id = `PlayerLastName-${sectionId}-${displayIndex}`;
          const label = row.querySelector(`label[for^="PlayerLastName-"]`);
          if (label) {
            label.htmlFor = lastNameInput.id;
            label.textContent = `Player ${displayIndex} last name`;
          }
        }
        if (numberInput) {
          numberInput.id = `PlayerNumber-${sectionId}-${displayIndex}`;
          const labels = row.querySelectorAll('label');
          if (labels[1]) {
            labels[1].htmlFor = numberInput.id;
            labels[1].textContent = `Player ${displayIndex} number`;
          }
        }
        if (sizeSelect) {
          sizeSelect.id = `PlayerSize-${sectionId}-${displayIndex}`;
          const labels = row.querySelectorAll('label');
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
      const digits = input.value.replace(/\D/g, '').slice(0, 2);
      input.value = digits;
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

    const validateRoster = () => {
      clearFieldErrors();
      setMessage(null);
      refreshSwatchMatch();

      let isValid = true;
      const teamName = teamNameInput.value.trim();
      const normalizedHex = normalizeHex(colorHexInput.value);

      if (!teamName) {
        teamNameInput.classList.add('team-order-section__field-error');
        isValid = false;
      }

      if (!isValidHex(normalizedHex)) {
        colorHexInput.classList.add('team-order-section__field-error');
        isValid = false;
      }

      const rows = getRows();
      if (rows.length < minPlayers) {
        isValid = false;
      }

      rows.forEach((row) => {
        const lastNameInput = row.querySelector('[data-player-last-name]');
        const numberInput = row.querySelector('[data-player-number]');
        const sizeSelect = row.querySelector('[data-player-size]');
        const lastName = lastNameInput.value.trim();
        const number = numberInput.value.trim();
        const size = sizeSelect.value.trim();
        const parsedNumber = Number(number);

        if (!lastName) {
          lastNameInput.classList.add('team-order-section__field-error');
          isValid = false;
        }

        if (number === '' || Number.isNaN(parsedNumber) || parsedNumber < 0 || parsedNumber > 99) {
          numberInput.classList.add('team-order-section__field-error');
          isValid = false;
        }

        if (!size) {
          sizeSelect.classList.add('team-order-section__field-error');
          isValid = false;
        }
      });

      if (!isValid) {
        setMessage('error', 'Please complete all player information before adding to cart.');
      }

      return isValid;
    };

    const buildRosterSummary = () => getRows().map((row, index) => {
      const lastName = row.querySelector('[data-player-last-name]').value.trim().toUpperCase();
      const number = row.querySelector('[data-player-number]').value.trim();
      const size = row.querySelector('[data-player-size]').value.trim();
      return `${index + 1}. ${lastName} #${number} ${size}`;
    });

    const addToCart = async () => {
      if (!variantId) {
        setMessage('error', 'This product does not have an available variant to add to cart.');
        return;
      }

      if (!validateRoster()) {
        return;
      }

      addToCartButton.disabled = true;
      addToCartButton.textContent = 'Adding Team Order...';

      const teamName = teamNameInput.value.trim();
      const rosterEntries = buildRosterSummary();
      const properties = {
        'Team Name': teamName,
        'Uniform Color': colorValueInput.value,
        'Style': styleInput.value,
        'Player Count': String(rosterEntries.length),
        'Roster': rosterEntries.join(' | '),
        'Sample Size': sampleSizeSelect.value
      };

      const payload = {
        items: [
          {
            id: variantId,
            quantity: 1,
            properties
          }
        ]
      };

      try {
        const response = await fetch(cartAddUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.description || 'Unable to add the team order to cart.');
        }

        setMessage('success', 'Team order added to cart. Review the cart to confirm the roster and line item properties.');
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
          const nextSrc = thumbnail.dataset.imageSrc;
          const nextAlt = thumbnail.dataset.imageAlt || '';
          mainImage.src = nextSrc;
          mainImage.alt = nextAlt;

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

    if (colorPreview) {
      colorPreview.style.backgroundColor = '#FFFFFF';
    }

    swatches.forEach((swatch) => {
      swatch.addEventListener('click', () => {
        const hex = swatch.dataset.colorValue || '#FFFFFF';
        const name = swatch.dataset.colorName || 'Custom';
        syncColorState(hex, name);
      });
    });

    if (colorHexInput) {
      colorHexInput.addEventListener('input', refreshSwatchMatch);
      colorHexInput.addEventListener('blur', refreshSwatchMatch);
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
    syncColorState('#FFFFFF', 'White');

    if (addPlayerButton) {
      addPlayerButton.addEventListener('click', addPlayerRow);
    }

    if (addToCartButton) {
      addToCartButton.addEventListener('click', addToCart);
    }
  };

  document.querySelectorAll('.team-order-section').forEach(initializeSection);
})();
