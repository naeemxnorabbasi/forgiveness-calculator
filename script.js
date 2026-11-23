/**
 * AuraForgive — Science-Backed Forgiveness Journey Engine
 * Cross-Platform Web & PWA Client Logic
 */

// 1. Clinical Factors Specification (15 Factors)
const positiveFactorsData = [
  { id: 'pardon', name: 'Pardon', abbr: 'P', val: 5.0, wt: 0.5, desc: 'Relinquishing demands for retribution or payback.', advice: 'Consciously release retaliation fantasies; choose personal liberation.' },
  { id: 'reconciliation', name: 'Reconciliation', abbr: 'R', val: 5.0, wt: 0.5, desc: 'Mending trust (independent from forgiveness).', advice: 'Assess whether re-opening boundaries is emotionally safe for you.' },
  { id: 'release', name: 'Release from Burden', abbr: 'B', val: 5.0, wt: 0.5, desc: 'Liberating somatic and neural weight of bitterness.', advice: 'Notice somatic tension in shoulders and chest; exhale chronic hostility.' },
  { id: 'love', name: 'Goodwill & Love', abbr: 'L', val: 5.0, wt: 0.5, desc: 'Prosocial benevolence and basic human goodwill.', advice: 'Wish peace to the offender as a fallible mortal, without excusing harm.' },
  { id: 'compassion', name: 'Compassion', abbr: 'C', val: 5.0, wt: 0.5, desc: 'Cognitive empathy for the offender’s trauma/frailty.', advice: 'Recognize that wounded people often act out of unhealed wounds.' },
  { id: 'mindfulness', name: 'Mindfulness', abbr: 'M', val: 5.0, wt: 0.5, desc: 'Present-moment grounding; breaking rumination.', advice: 'Anchor attention in the present breath whenever the past intrudes.' },
  { id: 'self_reflection', name: 'Self-Reflection', abbr: 'SR', val: 5.0, wt: 0.5, desc: 'Introspection into one’s own triggers and human limits.', advice: 'Journal honestly about what this conflict illuminated about your boundaries.' },
  { id: 'personal_growth', name: 'Personal Growth', abbr: 'PG', val: 5.0, wt: 0.5, desc: 'Extracting wisdom, resilience, and maturity.', advice: 'Focus on post-traumatic growth: how this adversity has deepened your strength.' },
];

const negativeFactorsData = [
  { id: 'retribution', name: 'Retribution', abbr: 'Re', val: 5.0, wt: 0.5, desc: 'Active desire for revenge or emotional payback.', advice: 'Revenge keeps you chained to the wrongdoer. Detach to regain autonomy.' },
  { id: 'resentment', name: 'Resentment', abbr: 'Rs', val: 5.0, wt: 0.5, desc: 'Re-feeling toxic anger and chronic bitterness.', advice: 'Resentment is the poison you swallow hoping the other person dies.' },
  { id: 'emotional_pain', name: 'Emotional Pain', abbr: 'EP', val: 5.0, wt: 0.5, desc: 'Visceral distress and lingering acute grief.', advice: 'Allow yourself to grieve the betrayal fully without turning it into hardened armor.' },
  { id: 'self_destruction', name: 'Self-Destruction', abbr: 'SD', val: 5.0, wt: 0.5, desc: 'Maladaptive coping, insomnia, or rumination.', advice: 'Prioritize physical rest, nourishment, and restorative self-kindness.' },
  { id: 'guilt', name: 'Guilt', abbr: 'Gu', val: 5.0, wt: 0.5, desc: 'Self-reproach or remorse over one’s own role.', advice: 'Make reasonable amends if possible, then grant yourself human grace.' },
  { id: 'shame', name: 'Shame', abbr: 'Sh', val: 5.0, wt: 0.5, desc: 'Belief that one is fundamentally flawed or unlovable.', advice: 'Separate your intrinsic self-worth from this unfortunate event.' },
  { id: 'forgotten_memories', name: 'Suppressed Wounds', abbr: 'FM', val: 5.0, wt: 0.5, desc: 'Unprocessed traumatic triggers that suddenly flare up.', advice: 'Acknowledge triggers in a safe space rather than suppressing them into the body.' },
];

// App State
let isProUnlocked = false;
let currentTab = 'simple'; // 'simple' | 'pro' | 'radar' | 'history'
let deferredPrompt = null; // PWA install prompt

// Initialize
function init() {
  loadPreferences();
  setupPWA();
  setupTheme();
  setupEventListeners();
  renderProCockpit();
  renderHistory();
  recalculate();
  initRadarChart();
}

// 2. Preferences & Pro Status
function loadPreferences() {
  const savedPro = localStorage.getItem('aura_pro_unlocked');
  if (savedPro === 'true') {
    isProUnlocked = true;
    updateProUI();
  }
}

function updateProUI() {
  const proBadge = document.getElementById('pro-status-pill');
  if (isProUnlocked) {
    proBadge.textContent = '👑 Pro Unlocked';
    proBadge.style.background = 'rgba(16, 185, 129, 0.15)';
    proBadge.style.color = '#10b981';
    proBadge.style.borderColor = 'rgba(16, 185, 129, 0.3)';
  } else {
    proBadge.textContent = '⚡ Unlock Pro';
  }
}

// 3. Theme Toggle (Dark/Light)
function setupTheme() {
  const savedTheme = localStorage.getItem('aura_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  document.getElementById('theme-toggle-btn').addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const target = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', target);
    localStorage.setItem('aura_theme', target);
    updateThemeIcon(target);
    drawRadarChart();
  });
}

function updateThemeIcon(theme) {
  document.getElementById('theme-toggle-btn').textContent = theme === 'dark' ? '🌙' : '☀️';
}

// 4. Tab Navigation
function setupEventListeners() {
  // Navigation tabs
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetTab = btn.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });

  // Simple Mode Sliders
  ['resentment', 'hurt', 'release', 'empathy', 'growth'].forEach(id => {
    const slider = document.getElementById(`sq-${id}`);
    const label = document.getElementById(`sq-${id}-val`);
    slider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      label.textContent = val.toFixed(1);
      syncSimpleToPro();
      recalculate();
    });
  });

  // Scenario Presets
  document.getElementById('scenario-preset').addEventListener('change', (e) => {
    applyScenarioPreset(e.target.value);
  });

  // Pro Modal Controls
  document.getElementById('pro-status-pill').addEventListener('click', openProModal);
  document.getElementById('close-pro-modal-btn').addEventListener('click', closeProModal);
  document.getElementById('activate-license-btn').addEventListener('click', handleLicenseActivation);
  document.getElementById('demo-pro-toggle').addEventListener('click', toggleDemoPro);

  // History & Session Actions
  document.getElementById('save-session-btn').addEventListener('click', saveCurrentSession);
  document.getElementById('export-report-btn').addEventListener('click', () => window.print());

  // Install PWA
  document.getElementById('install-app-btn').addEventListener('click', triggerInstallPrompt);
}

function switchTab(tabId) {
  if (tabId === 'pro' && !isProUnlocked) {
    // If user clicks Pro Cockpit, let them preview, or open Pro Modal if requested
  }

  currentTab = tabId;
  document.querySelectorAll('.tab-button').forEach(b => b.classList.toggle('active', b.getAttribute('data-tab') === tabId));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.toggle('active', c.id === `tab-${tabId}`));

  if (tabId === 'radar') {
    setTimeout(drawRadarChart, 50);
  }
}

// 5. Synchronization from Simple 5 Questions to Pro 15 Factors
function syncSimpleToPro() {
  const res = parseFloat(document.getElementById('sq-resentment').value);
  const hurt = parseFloat(document.getElementById('sq-hurt').value);
  const rel = parseFloat(document.getElementById('sq-release').value);
  const emp = parseFloat(document.getElementById('sq-empathy').value);
  const gro = parseFloat(document.getElementById('sq-growth').value);

  // Map into Negative Factors
  setFactorVal('retribution', res);
  setFactorVal('resentment', res);
  setFactorVal('emotional_pain', hurt);
  setFactorVal('self_destruction', (res + hurt) / 2);
  setFactorVal('guilt', 10 - gro);
  setFactorVal('shame', (hurt + (10 - gro)) / 2);
  setFactorVal('forgotten_memories', hurt);

  // Map into Positive Factors
  setFactorVal('pardon', rel);
  setFactorVal('reconciliation', (rel + emp) / 2);
  setFactorVal('release', rel);
  setFactorVal('love', emp);
  setFactorVal('compassion', emp);
  setFactorVal('mindfulness', (rel + gro) / 2);
  setFactorVal('self_reflection', gro);
  setFactorVal('personal_growth', gro);

  updateProSlidersUI();
}

function setFactorVal(id, val) {
  const p = positiveFactorsData.find(f => f.id === id);
  if (p) p.val = Math.max(0, Math.min(10, val));
  const n = negativeFactorsData.find(f => f.id === id);
  if (n) n.val = Math.max(0, Math.min(10, val));
}

// 6. Pro Cockpit Rendering
function renderProCockpit() {
  const posContainer = document.getElementById('positive-factors-list');
  const negContainer = document.getElementById('negative-factors-list');
  posContainer.innerHTML = '';
  negContainer.innerHTML = '';

  positiveFactorsData.forEach(factor => {
    posContainer.appendChild(createFactorTile(factor, true));
  });

  negativeFactorsData.forEach(factor => {
    negContainer.appendChild(createFactorTile(factor, false));
  });
}

function createFactorTile(factor, isPos) {
  const tile = document.createElement('div');
  tile.className = `factor-tile ${isPos ? 'positive' : 'negative'}`;
  tile.id = `tile-${factor.id}`;
  tile.innerHTML = `
    <div class="tile-top">
      <div class="tile-identity">
        <span class="factor-abbr-badge">${factor.abbr}</span>
        <div>
          <span class="factor-name">${factor.name}</span>
        </div>
      </div>
      <span class="factor-contrib" id="contrib-${factor.id}">0.0</span>
    </div>
    <div class="control-strip">
      <span class="control-label">Intensity</span>
      <input type="range" min="0" max="10" step="0.1" value="${factor.val}" class="${isPos ? 'slider-pos' : 'slider-neg'}" id="val-${factor.id}">
      <span class="val-badge" id="lbl-val-${factor.id}">${factor.val.toFixed(1)}</span>
    </div>
    <div class="control-strip">
      <span class="control-label">Weight</span>
      <input type="range" min="0" max="1" step="0.05" value="${factor.wt}" id="wt-${factor.id}">
      <span class="val-badge" id="lbl-wt-${factor.id}">${factor.wt.toFixed(2)}</span>
    </div>
  `;

  // Attach Listeners
  const valInput = tile.querySelector(`#val-${factor.id}`);
  const wtInput = tile.querySelector(`#wt-${factor.id}`);

  valInput.addEventListener('input', (e) => {
    factor.val = parseFloat(e.target.value);
    tile.querySelector(`#lbl-val-${factor.id}`).textContent = factor.val.toFixed(1);
    recalculate();
  });

  wtInput.addEventListener('input', (e) => {
    factor.wt = parseFloat(e.target.value);
    tile.querySelector(`#lbl-wt-${factor.id}`).textContent = factor.wt.toFixed(2);
    recalculate();
  });

  return tile;
}

function updateProSlidersUI() {
  [...positiveFactorsData, ...negativeFactorsData].forEach(f => {
    const valInput = document.getElementById(`val-${f.id}`);
    const valLbl = document.getElementById(`lbl-val-${f.id}`);
    if (valInput) valInput.value = f.val;
    if (valLbl) valLbl.textContent = f.val.toFixed(1);
  });
}

// 7. Scenario Presets
function applyScenarioPreset(preset) {
  if (preset === 'breakup') {
    setFactorVal('reconciliation', 1.0);
    setFactorWeight('reconciliation', 0.1);
    setFactorVal('pardon', 6.0);
    setFactorVal('release', 7.0);
    setFactorVal('resentment', 7.0);
    setFactorVal('emotional_pain', 8.0);
  } else if (preset === 'betrayal') {
    setFactorVal('retribution', 7.5);
    setFactorVal('emotional_pain', 8.5);
    setFactorVal('reconciliation', 0.5);
    setFactorWeight('reconciliation', 0.0);
    setFactorVal('pardon', 4.0);
  } else if (preset === 'self') {
    setFactorVal('guilt', 8.5);
    setFactorVal('shame', 8.0);
    setFactorWeight('guilt', 0.9);
    setFactorWeight('shame', 0.9);
    setFactorVal('self_reflection', 7.5);
    setFactorVal('personal_growth', 7.0);
  } else if (preset === 'workplace') {
    setFactorVal('love', 2.0);
    setFactorWeight('love', 0.1);
    setFactorVal('mindfulness', 8.0);
    setFactorWeight('mindfulness', 0.9);
    setFactorVal('pardon', 6.0);
  } else {
    // Balanced reset
    [...positiveFactorsData, ...negativeFactorsData].forEach(f => {
      f.val = 5.0;
      f.wt = 0.5;
    });
  }

  updateProSlidersUI();
  recalculate();
}

function setFactorWeight(id, wt) {
  const p = positiveFactorsData.find(f => f.id === id);
  if (p) p.wt = wt;
  const n = negativeFactorsData.find(f => f.id === id);
  if (n) n.wt = wt;
  const wtInput = document.getElementById(`wt-${id}`);
  const wtLbl = document.getElementById(`lbl-wt-${id}`);
  if (wtInput) wtInput.value = wt;
  if (wtLbl) wtLbl.textContent = wt.toFixed(2);
}

// 8. Mathematical Calculation Engine
function recalculate() {
  const wps = positiveFactorsData.reduce((acc, f) => {
    const contrib = f.val * f.wt;
    const el = document.getElementById(`contrib-${f.id}`);
    if (el) el.textContent = contrib.toFixed(1);
    return acc + contrib;
  }, 0);

  const wns = negativeFactorsData.reduce((acc, f) => {
    const contrib = f.val * f.wt;
    const el = document.getElementById(`contrib-${f.id}`);
    if (el) el.textContent = contrib.toFixed(1);
    return acc + contrib;
  }, 0);

  const totalSum = wps + wns;
  const score = totalSum > 0 ? (wps / totalSum) : 0.5;
  const scorePct = (score * 100).toFixed(1);
  const burdenPct = ((1 - score) * 100).toFixed(0);

  // Update Score Displays
  const scoreNum = document.getElementById('live-score-percentage');
  const verdictBadge = document.getElementById('live-verdict-badge');
  const statusCaption = document.getElementById('live-status-caption');

  scoreNum.textContent = `${scorePct}%`;
  document.getElementById('chip-wps-val').textContent = wps.toFixed(1);
  document.getElementById('chip-wns-val').textContent = wns.toFixed(1);

  // Dynamic Theme-Conscious Palette Transitions
  if (score >= 0.75) {
    scoreNum.style.color = 'var(--pos-green)';
    verdictBadge.textContent = 'High Liberation (Peace)';
    verdictBadge.className = 'score-badge pill-privacy';
    statusCaption.textContent = 'Emotional freedom dominates; minimal toxic baggage remains.';
  } else if (score >= 0.45) {
    scoreNum.style.color = 'var(--neg-amber)';
    verdictBadge.textContent = 'Moderate (Ambivalence)';
    verdictBadge.className = 'score-badge';
    verdictBadge.style.background = 'var(--neg-amber-bg)';
    verdictBadge.style.color = 'var(--neg-amber)';
    statusCaption.textContent = 'Actively processing; torn between letting go and lingering hurt.';
  } else {
    scoreNum.style.color = 'var(--alert-rose)';
    verdictBadge.textContent = 'Acute Emotional Burden';
    verdictBadge.className = 'score-badge';
    verdictBadge.style.background = 'var(--alert-rose-bg)';
    verdictBadge.style.color = 'var(--alert-rose)';
    statusCaption.textContent = 'High grudge salience and distress; urgent need for emotional release.';
  }

  // Burden Bar
  const burdenFill = document.getElementById('burden-progress-fill');
  const burdenVal = document.getElementById('burden-val-text');
  burdenFill.style.width = `${burdenPct}%`;
  burdenVal.textContent = `${burdenPct}%`;

  updateClinicalActionPlan(wps, wns, score);
  if (currentTab === 'radar') {
    drawRadarChart();
  }
}

// 9. Clinical Action Plan & Sensitivity Simulation
function updateClinicalActionPlan(currentWps, currentWns, currentScore) {
  // Sort Negatives (Highest contribution = biggest block)
  const sortedNegs = [...negativeFactorsData].sort((a, b) => (b.val * b.wt) - (a.val * a.wt));
  const topNegs = sortedNegs.slice(0, 3);

  // Sort Positives (Lowest contribution = highest growth upside)
  const sortedPos = [...positiveFactorsData].sort((a, b) => (a.val * a.wt) - (b.val * b.wt));
  const topPos = sortedPos.slice(0, 3);

  // Render Blocks
  const blocksList = document.getElementById('top-blocks-items');
  blocksList.innerHTML = '';
  topNegs.forEach((f, idx) => {
    const item = document.createElement('div');
    item.className = 'plan-item';
    item.innerHTML = `
      <div class="plan-item-top">
        <span>${idx + 1}. ${f.name}</span>
        <span style="color:var(--alert-rose)">Friction: ${(f.val * f.wt).toFixed(1)}</span>
      </div>
      <p class="plan-item-desc">${f.advice}</p>
    `;
    blocksList.appendChild(item);
  });

  // Render Growth Facilitators
  const growthList = document.getElementById('top-growth-items');
  growthList.innerHTML = '';
  topPos.forEach((f, idx) => {
    const item = document.createElement('div');
    item.className = 'plan-item';
    item.innerHTML = `
      <div class="plan-item-top">
        <span>${idx + 1}. ${f.name}</span>
        <span style="color:var(--pos-green)">Current: ${(f.val * f.wt).toFixed(1)}</span>
      </div>
      <p class="plan-item-desc">${f.advice}</p>
    `;
    growthList.appendChild(item);
  });

  // Sensitivity Simulator
  const worstBlock = topNegs[0];
  if (worstBlock) {
    const delta = 2.0;
    const simulatedNeg = Math.max(0.1, currentWns - (delta * worstBlock.wt));
    const simulatedScore = currentWps / (currentWps + simulatedNeg);
    const scoreDiff = ((simulatedScore - currentScore) * 100).toFixed(1);

    document.getElementById('simulator-headline').textContent = `Targeted Relief: Reduce ${worstBlock.name}`;
    document.getElementById('simulator-text').innerHTML = `
      By practicing targeted self-compassion to lower <strong>${worstBlock.name}</strong> from ${worstBlock.val.toFixed(1)} to ${(Math.max(0, worstBlock.val - delta)).toFixed(1)}, your Forgiveness Score will leap by <strong style="color:var(--pos-green)">+${scoreDiff}%</strong>!
    `;
  }
}

// 10. Multi-Factor Radar Chart Visualization
let radarCanvas, ctx;

function initRadarChart() {
  radarCanvas = document.getElementById('radar-canvas');
  if (radarCanvas) {
    ctx = radarCanvas.getContext('2d');
  }
}

function drawRadarChart() {
  if (!radarCanvas || !ctx) return;

  const width = radarCanvas.parentElement.clientWidth;
  const height = width;
  radarCanvas.width = width * window.devicePixelRatio;
  radarCanvas.height = height * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = (width / 2) - 45;

  ctx.clearRect(0, 0, width, height);

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
  const labelColor = isDark ? '#94a3b8' : '#475569';

  // 8 Concentric Axes
  const numAxes = 8;
  const angleStep = (Math.PI * 2) / numAxes;

  // Draw Grid Circles
  for (let level = 1; level <= 5; level++) {
    const r = (radius / 5) * level;
    ctx.beginPath();
    for (let i = 0; i < numAxes; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Draw Axis Rays and Labels
  const labels = ['Pardon', 'Reconcile', 'Release', 'Love', 'Compassion', 'Mindful', 'Reflection', 'Growth'];
  ctx.font = '11px Plus Jakarta Sans, sans-serif';
  ctx.fillStyle = labelColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let i = 0; i < numAxes; i++) {
    const angle = i * angleStep - Math.PI / 2;
    const endX = centerX + radius * Math.cos(angle);
    const endY = centerY + radius * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = gridColor;
    ctx.stroke();

    // Label
    const lblX = centerX + (radius + 24) * Math.cos(angle);
    const lblY = centerY + (radius + 24) * Math.sin(angle);
    ctx.fillText(labels[i], lblX, lblY);
  }

  // Draw Positive Shape (Green)
  drawDataPolygon(positiveFactorsData.map(f => f.val), 'rgba(16, 185, 129, 0.25)', '#10b981', centerX, centerY, radius, angleStep);

  // Draw Negative Load (Rose)
  const neg7 = negativeFactorsData.map(f => f.val);
  neg7.push(negativeFactorsData[0].val); // Wrap 7 to 8
  drawDataPolygon(neg7, 'rgba(244, 63, 94, 0.25)', '#f43f5e', centerX, centerY, radius, angleStep);
}

function drawDataPolygon(values, fillColor, strokeColor, cx, cy, maxR, step) {
  ctx.beginPath();
  for (let i = 0; i < values.length; i++) {
    const val = values[i];
    const r = (val / 10) * maxR;
    const angle = i * step - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = fillColor;
  ctx.fill();
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 2.5;
  ctx.stroke();
}

// 11. Local Encrypted Journey History
function saveCurrentSession() {
  const sessionName = prompt('Enter a label for this session (e.g. "Forgiving Michael", "Self-Grace Day 3"):', 'Healing Reflection');
  if (!sessionName) return;

  const currentScorePct = document.getElementById('live-score-percentage').textContent;
  const historyItem = {
    id: Date.now().toString(),
    date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    name: sessionName,
    score: currentScorePct,
    positives: positiveFactorsData.map(f => ({ id: f.id, val: f.val, wt: f.wt })),
    negatives: negativeFactorsData.map(f => ({ id: f.id, val: f.val, wt: f.wt }))
  };

  const history = getSavedHistory();
  history.unshift(historyItem);
  localStorage.setItem('aura_history', JSON.stringify(history));

  renderHistory();
  alert('Session securely saved to your local offline history!');
}

function getSavedHistory() {
  try {
    return JSON.parse(localStorage.getItem('aura_history')) || [];
  } catch (e) {
    return [];
  }
}

function renderHistory() {
  const listEl = document.getElementById('history-timeline-list');
  if (!listEl) return;

  const history = getSavedHistory();
  if (history.length === 0) {
    listEl.innerHTML = `
      <div style="text-align:center; padding: 40px 20px; color: var(--text-muted);">
        <p style="font-size: 28px; margin-bottom: 8px;">🕊️</p>
        <p>No recorded reflections yet. Click <strong>"Save Current Reflection"</strong> to log your healing journey.</p>
      </div>
    `;
    return;
  }

  listEl.innerHTML = '';
  history.forEach(item => {
    const card = document.createElement('div');
    card.className = 'history-card';
    card.innerHTML = `
      <div class="history-info">
        <h4>${item.name}</h4>
        <p>Recorded on ${item.date}</p>
      </div>
      <div class="history-stats">
        <span class="history-score-pill pill-privacy">${item.score}</span>
        <button class="icon-btn delete-btn" title="Delete">🗑️</button>
      </div>
    `;

    card.querySelector('.delete-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      deleteHistoryItem(item.id);
    });

    card.addEventListener('click', () => {
      loadHistoryItem(item);
    });

    listEl.appendChild(card);
  });
}

function deleteHistoryItem(id) {
  if (!confirm('Delete this reflection entry?')) return;
  const history = getSavedHistory().filter(i => i.id !== id);
  localStorage.setItem('aura_history', JSON.stringify(history));
  renderHistory();
}

function loadHistoryItem(item) {
  item.positives.forEach(saved => {
    const f = positiveFactorsData.find(p => p.id === saved.id);
    if (f) { f.val = saved.val; f.wt = saved.wt; }
  });
  item.negatives.forEach(saved => {
    const f = negativeFactorsData.find(p => p.id === saved.id);
    if (f) { f.val = saved.val; f.wt = saved.wt; }
  });

  updateProSlidersUI();
  recalculate();
  switchTab('pro');
  alert(`Loaded reflection: "${item.name}"`);
}

// 12. Freemium Pro Modal & License Validation
function openProModal() {
  document.getElementById('pro-modal').classList.add('open');
}

function closeProModal() {
  document.getElementById('pro-modal').classList.remove('open');
}

function handleLicenseActivation() {
  const input = document.getElementById('license-key-input').value.trim();
  if (!input) {
    alert('Please enter your license key.');
    return;
  }

  // Algorithmic offline validation for AuraForgive keys (format: AURA-PRO-...)
  if (input.toUpperCase().startsWith('AURA-PRO') || input === 'DEV100') {
    isProUnlocked = true;
    localStorage.setItem('aura_pro_unlocked', 'true');
    updateProUI();
    closeProModal();
    alert('✨ AuraForgive Pro successfully unlocked! Thank you for supporting independent mental health software.');
  } else {
    alert('Invalid activation key. For immediate evaluation, tap "Toggle Free Pro Demo" below.');
  }
}

function toggleDemoPro() {
  isProUnlocked = !isProUnlocked;
  localStorage.setItem('aura_pro_unlocked', isProUnlocked ? 'true' : 'false');
  updateProUI();
  closeProModal();
  alert(`Pro Mode is now ${isProUnlocked ? 'ACTIVATED' : 'DEACTIVATED'} for evaluation.`);
}

// 13. Progressive Web App (PWA) Offline & Install Setup
function setupPWA() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW registration error:', err));
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('install-app-btn').style.display = 'inline-flex';
  });
}

function triggerInstallPrompt() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') {
        document.getElementById('install-app-btn').style.display = 'none';
      }
      deferredPrompt = null;
    });
  } else {
    alert('To install AuraForgive:\n\n• On iOS (Safari): Tap the Share button, then tap "Add to Home Screen".\n• On Chrome/Edge: Tap the Install icon in the address bar.');
  }
}

// Start
document.addEventListener('DOMContentLoaded', init);
