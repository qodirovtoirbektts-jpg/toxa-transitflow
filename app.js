// TransitFlow Interactive App Logic

document.addEventListener('DOMContentLoaded', () => {
  // Quick tracker interaction
  const quickTrackBtn = document.getElementById('quickTrackBtn');
  const quickTrackInput = document.getElementById('quickTrackInput');
  const quickStatusDisplay = document.getElementById('quickStatusDisplay');

  if (quickTrackBtn && quickTrackInput) {
    quickTrackBtn.addEventListener('click', () => {
      const code = quickTrackInput.value.trim().toUpperCase() || 'TF-8842-PACIFIC';
      quickStatusDisplay.innerHTML = `
        <div class="status-chip">IN TRANSIT • VESSEL DISPATCH CONFIRMED</div>
        <p>Tracking Code: <strong>${code}</strong></p>
        <p>Vessel: <strong>TF Ocean Leader (Voyage 120W)</strong></p>
        <div class="port-route">
          <span>Singapore (SGSIN)</span> → <span>Rotterdam (NLRTM)</span>
        </div>
        <small class="eta-text">Live GPS Sensor: 19.8 Knots • Temperature: -18.2°C (Cold-Chain Verified)</small>
      `;
    });
  }

  // Freight Rate Calculator
  let currentRate = 2.4; // Ocean rate per kg
  let currentDuration = "~22 Days Port-to-Port";
  let currentModeName = "Ocean FCL 40ft";

  const modePills = document.querySelectorAll('#freightModes .mode-pill');
  const weightSlider = document.getElementById('payloadWeightSlider');
  const weightDisplay = document.getElementById('weightValDisplay');
  const quotePriceDisplay = document.getElementById('quotePriceDisplay');
  const summaryMode = document.getElementById('summaryMode');
  const summaryDuration = document.getElementById('summaryDuration');

  function calculateFreightQuote() {
    const weight = parseInt(weightSlider.value) || 1200;
    weightDisplay.textContent = `${weight.toLocaleString()} KG`;

    const total = Math.round(weight * currentRate);
    if (quotePriceDisplay) {
      quotePriceDisplay.textContent = `$${total.toLocaleString()}`;
    }
    if (summaryMode) summaryMode.textContent = currentModeName;
    if (summaryDuration) summaryDuration.textContent = currentDuration;
  }

  modePills.forEach(pill => {
    pill.addEventListener('click', () => {
      modePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentRate = parseFloat(pill.getAttribute('data-rate')) || 2.4;
      const days = pill.getAttribute('data-days');
      const mode = pill.getAttribute('data-mode');

      if (mode === 'sea') {
        currentModeName = "Ocean FCL 40ft";
        currentDuration = `~${days} Days Port-to-Port`;
      } else if (mode === 'air') {
        currentModeName = "Air Cargo Priority";
        currentDuration = `~${days} Days Airport-to-Airport`;
      } else {
        currentModeName = "Silk Road Rail Intermodal";
        currentDuration = `~${days} Days Terminal-to-Terminal`;
      }
      calculateFreightQuote();
    });
  });

  if (weightSlider) {
    weightSlider.addEventListener('input', calculateFreightQuote);
  }

  // Book shipment button
  const bookShipmentBtn = document.getElementById('bookShipmentBtn');
  if (bookShipmentBtn) {
    bookShipmentBtn.addEventListener('click', () => {
      alert(`Booking initiated! Mode: ${currentModeName}, Rate: ${quotePriceDisplay.textContent}. Forwarded to our central marine booking desk.`);
    });
  }

  // Contact form
  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactSuccess');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cntName').value;
      contactSuccess.textContent = `Thank you, ${name}. Your commercial freight request has been assigned to a Senior Route Manager. Response SLA: < 15 minutes.`;
      contactForm.reset();
    });
  }
});
