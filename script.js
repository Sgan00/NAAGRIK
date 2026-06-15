/* ─── STATE ─────────────────────────────────────────────── */
let isLoggedIn = false;
let currentUser = null;
let isRecording = false;
let recInterval = null;
let chatMessages = [];
let quickChipsHidden = false;
let currentTheme = 'dark';

/* ─── DATA ──────────────────────────────────────────────── */
const ageChapters = [
  { range: '5–6', label: 'Early Childhood', text: 'Children aged 5–6 have the right to free and compulsory education under the Right to Education Act (2009). They are protected from child labour and any form of exploitation. Parents or guardians hold their legal rights on their behalf.' },
  { range: '7–10', label: 'Children', text: 'Children must be enrolled in school. Corporal punishment is prohibited in all schools. POCSO Act 2012 provides special protection against sexual offences. No child can be employed in hazardous work.' },
  { range: '11–13', label: 'Pre-teen', text: 'Pre-teens have the right to privacy and dignity. Cyberbullying is addressable under the IT Act. Schools cannot arbitrarily expel students. Any testimony given to police must be recorded in presence of a guardian.' },
  { range: '14–15', label: 'Early Teen', text: 'Children aged 14–15 cannot be employed in hazardous occupations. Teens cannot be held in adult jails. The Juvenile Justice Act provides special procedures for children. The Right to Education Act generally guarantees free and compulsory education for children aged 6–14.' },
  { range: '16–17', label: 'Teen', text: 'Certain driving licences may be available subject to legal requirements. Under the Juvenile Justice Act, children aged 16–18 accused of certain heinous offences may undergo a preliminary assessment before transfer to a Children\'s Court. Voting rights begin at 18.' },
  { range: '18+', label: 'Adult Rights', text: 'Full Fundamental Rights under Part III of the Constitution: Right to Equality (Art. 14–18), Freedom (Art. 19–22), Against Exploitation (Art. 23–24), Religion (Art. 25–28), Cultural & Educational (Art. 29–30), and Constitutional Remedies (Art. 32).' },
];

const toolkit = [
  { icon:'📋', name:'RTI', desc:'Right to Information Act — file requests with govt offices' },
  { icon:'📱', name:'e-FIR', desc:'File a First Information Report online' },
  { icon:'🛒', name:'Consumer', desc:'Consumer Protection Act rights & complaint process' },
  { icon:'👷', name:'Labour', desc:'Minimum wage, unpaid dues, workplace rights' },
  { icon:'🔒', name:'POCSO', desc:'Protection of Children from Sexual Offences Act' },
  { icon:'🏠', name:'Dom. Violence', desc:'Protection of Women from Domestic Violence Act' },
  { icon:'🏡', name:'Property', desc:'Inheritance, tenant rights, and property disputes' },
  { icon:'💻', name:'Cyber Crime', desc:'Report online fraud, harassment & data breaches' },
  { icon:'📈', name:'Escalation', desc:'How to escalate when authorities don\'t respond' },
  { icon:'⚖️', name:'Writs', desc:'Habeas Corpus, Mandamus, Certiorari & more' },
];

const languages = [
  { name:'English', native:'English', builtin:true },
  { name:'Hindi', native:'हिन्दी', builtin:true },
  { name:'Tamil', native:'தமிழ்', builtin:false },
  { name:'Telugu', native:'తెలుగు', builtin:false },
  { name:'Kannada', native:'ಕನ್ನಡ', builtin:false },
  { name:'Malayalam', native:'മലയാളം', builtin:false },
  { name:'Bengali', native:'বাংলা', builtin:false },
  { name:'Marathi', native:'मराठी', builtin:false },
  { name:'Gujarati', native:'ગુજરાતી', builtin:false },
  { name:'Punjabi', native:'ਪੰਜਾਬੀ', builtin:false },
  { name:'Odia', native:'ଓଡ଼ିଆ', builtin:false },
  { name:'Assamese', native:'অসমীয়া', builtin:false },
  { name:'Urdu', native:'اردو', builtin:false },
];

const downloadLangs = [
  'Hindi','Tamil','Telugu','Kannada','Malayalam',
  'Bengali','Marathi','Gujarati','Punjabi','Odia','Assamese'
];

const aiResponses = {
  'Police stops': `**If police stop you**, remember these rights:\n\n• **Article 22** — You cannot be detained for more than 24 hours without being produced before a magistrate.\n• You have the right to know the reason for arrest.\n• You can refuse to answer questions that may incriminate you (Art. 20).\n• You have the right to inform a family member or lawyer.\n\nRemain calm, do not resist, and ask politely: *"Am I under arrest, or am I free to go?"*`,
  'File RTI': `**How to file an RTI (Right to Information) request:**\n\n1. Identify the Public Information Officer (PIO) of the concerned department.\n2. Write a clear, specific request stating the information you need.\n3. Pay ₹10 (fee waived for BPL card holders).\n4. Submit in person, by post, or via **rtionline.gov.in**.\n\n**Timeline:** The PIO must respond within **30 days** (48 hours if life/liberty is at stake).\n\nIf denied, you can appeal to the First Appellate Authority within 30 days.`,
  'Unpaid wages': `**If your employer hasn't paid your wages:**\n\n• • Wage payment timelines depend on applicable labour laws and employment conditions..\n• File a complaint with the **Labour Commissioner** in your district.\n• You can also approach the **Labour Court** for recovery.\n\nWorkers may seek remedies through labour authorities or appropriate legal forums depending on the nature of the dispute.. Keep all salary slips, bank statements, and appointment letters as evidence.`,
  'Scam calls': `**If you receive a scam call:**\n\n• **Do not share OTPs, PINs, or Aadhaar numbers** — no govt or bank official asks for these.\n• Report on **Sanchar Saathi portal** (sancharsaathi.gov.in) — Chakshu option.\n• File a cybercrime complaint at **cybercrime.gov.in** or call **1930**.\n• For financial fraud, also report to your bank immediately.\n\nThe Telecom Regulatory Authority of India (TRAI) can block persistent spam numbers based on your report.`,
  'Article 21': `**Article 21 — Right to Life and Personal Liberty**\n\n*"No person shall be deprived of his life or personal liberty except according to procedure established by law."*\n\nThe Supreme Court has expanded this to include:\n• Right to **privacy** (K.S. Puttaswamy case, 2017)\n• • Judicially recognized rights related to education, health, livelihood, dignity, and privacy \n• Right to **dignity** and a **clean environment**\n• Right to **speedy trial**\n\nAny violation can be challenged via a writ petition under **Article 32** (Supreme Court) or **Article 226** (High Court).`,
};

/* ─── INIT ──────────────────────────────────────────────── */
function init() {
  renderAgeChapters();
  renderToolkit();
  renderLangTiles();
  renderDownloadLangs();
}

function renderAgeChapters() {
  const spine = document.getElementById('age-spine');
  ageChapters.forEach((ch, i) => {
    const pill = document.createElement('div');
    pill.className = 'age-pill';
    pill.id = `ap-${i}`;
    pill.innerHTML = `
      <button class="age-pill-btn" onclick="toggleAgePill(${i})">
        <span class="pill-badge">${ch.range}</span>
        <span class="pill-label">${ch.label}</span>
        <span class="pill-chevron">▼</span>
      </button>
      <div class="age-pill-content">
        <div class="age-pill-text">${ch.text}</div>
        <div class="pill-actions">
          <button class="btn-ghost teal" onclick="showToast('📚 Related cases loaded')">Related Cases</button>
          <button class="btn-ghost" onclick="showToast('⬇️ PDF downloaded')">⬇ Download</button>
        </div>
      </div>`;
    spine.appendChild(pill);
  });
}

function renderToolkit() {
  const grid = document.getElementById('toolkit-grid');
  toolkit.forEach(t => {
    const card = document.createElement('div');
    card.className = 'toolkit-card';
    card.innerHTML = `<div class="tc-icon">${t.icon}</div><div class="tc-name">${t.name}</div><div class="tc-desc">${t.desc}</div>`;
    card.onclick = () => showToast(`📖 Opening ${t.name} guide…`);
    grid.appendChild(card);
  });
}

function renderLangTiles() {
  const grid = document.getElementById('lang-tile-grid');
  languages.forEach((l, i) => {
    const tile = document.createElement('div');
    tile.className = 'lang-tile' + (i === 0 ? ' selected' : '');
    tile.innerHTML = `<div class="lang-tile-name">${l.name}</div>
      <div class="lang-tile-native">${l.native}</div>
      ${l.builtin ? '<div><span class="built-in-badge">built-in</span></div>' : ''}`;
    tile.onclick = () => {
      document.querySelectorAll('.lang-tile').forEach(t => t.classList.remove('selected'));
      tile.classList.add('selected');
      if (!l.builtin) showToast(`⬇️ Downloading ${l.name} pack…`);
      else showToast(`✅ ${l.name} selected`);
    };
    grid.appendChild(tile);
  });
}

function renderDownloadLangs() {
  const list = document.getElementById('lang-list');
  downloadLangs.forEach(l => {
    const item = document.createElement('div');
    item.className = 'lang-item';
    item.innerHTML = `<div class="lang-name">${l}</div><div class="lang-badge">~4 MB</div><button class="btn-dl" onclick="showToast('⬇️ ${l} pack downloading…')">Download</button>`;
    list.appendChild(item);
  });
}

/* ─── AUTH ──────────────────────────────────────────────── */
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
  document.querySelectorAll('.auth-tab-btn').forEach(b => {
    if ((tab==='login'&&b.textContent==='Log In')||(tab==='signup'&&b.textContent==='Sign Up'))
      b.classList.add('active');
  });
  document.getElementById(`form-${tab}`).classList.add('active');
}

function handleLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-pass').value;
  const err = document.getElementById('login-error');
  if (!email || !pass || !email.includes('@')) {
    err.classList.add('show'); return;
  }
  err.classList.remove('show');
  loginUser(email.split('@')[0]);
}

function handleSignup() {
  const name = document.getElementById('su-name').value.trim();
  const email = document.getElementById('su-email').value.trim();
  const pass = document.getElementById('su-pass').value;
  const confirm = document.getElementById('su-confirm').value;
  const err = document.getElementById('signup-error');
  if (!name || !email || pass.length < 8) {
    err.textContent = 'Please fill all fields (min. 8 char password).';
    err.classList.add('show'); return;
  }
  if (pass !== confirm) {
    err.textContent = 'Passwords do not match.';
    err.classList.add('show'); return;
  }
  err.classList.remove('show');
  loginUser(name.split(' ')[0]);
}

function loginUser(name) {
  isLoggedIn = true;
  currentUser = name;
  document.getElementById('auth-overlay').style.display = 'none';
  document.getElementById('member-chip').classList.add('show');
  document.getElementById('member-name').textContent = name;
  document.getElementById('auth-menu-icon').textContent = '🚪';
  document.getElementById('auth-menu-label').textContent = 'Log Out';
  document.getElementById('alert-guest-banner').style.display = 'none';
  document.getElementById('mydata-email').textContent = name + '@demo.com';
  showToast(`👋 Welcome, ${name}!`);
}

function continueAsGuest(e) {
  e.preventDefault();
  document.getElementById('auth-overlay').style.display = 'none';
  showToast('Browsing as Guest — some features limited');
}

function openAuth() {
  document.getElementById('auth-overlay').style.display = 'flex';
}

function handleAuthMenu() {
  if (isLoggedIn) {
    isLoggedIn = false;
    currentUser = null;
    document.getElementById('member-chip').classList.remove('show');
    document.getElementById('auth-menu-icon').textContent = '👤';
    document.getElementById('auth-menu-label').textContent = 'Log In / Sign Up';
    document.getElementById('alert-guest-banner').style.display = 'flex';
    showToast('👋 Logged out');
  } else {
    openAuth();
  }
}

/* ─── TABS ──────────────────────────────────────────────── */
function switchTab(tab, btn) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));
  document.getElementById(`tab-${tab}`).classList.add('active');
  btn.classList.add('active');
  closeAllSubPanels();
}

/* ─── AGE PILLS ─────────────────────────────────────────── */
function toggleAgePill(i) {
  const pill = document.getElementById(`ap-${i}`);
  const isOpen = pill.classList.contains('open');
  document.querySelectorAll('.age-pill').forEach(p => p.classList.remove('open'));
  if (!isOpen) pill.classList.add('open');
}

/* ─── ALERT ─────────────────────────────────────────────── */
function setAlertMode(mode, btn) {
  document.querySelectorAll('.toggle-group')[0].querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('private-badge').classList.toggle('show', mode === 'private');
}

function setInputType(btn) {
  document.querySelectorAll('.input-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

const transcriptLines = [
  "Officer: Step out of the vehicle.",
  "You: Am I under arrest?",
  "Officer: You have no right to call a lawyer right now.",
  "You: Sir, I believe I have the right to legal counsel.",
  "Officer: Sign this document or I'll have to take you in.",
];

function toggleRecording() {
  isRecording = !isRecording;
  const btn = document.getElementById('rec-btn');
  const status = document.getElementById('rec-status');
  const transcript = document.getElementById('transcript');
  if (isRecording) {
    btn.classList.add('recording');
    btn.textContent = '⏹';
    status.textContent = '● Recording in progress…';
    status.className = 'record-status active-rec';
    transcript.textContent = '';
    let lineIdx = 0;
    recInterval = setInterval(() => {
      if (lineIdx < transcriptLines.length) {
        transcript.textContent += (lineIdx > 0 ? '\n' : '') + transcriptLines[lineIdx];
        lineIdx++;
      }
    }, 1800);
  } else {
    btn.classList.remove('recording');
    btn.textContent = '🎙️';
    status.textContent = 'Recording stopped';
    status.className = 'record-status';
    clearInterval(recInterval);
    showToast('🔴 Recording saved');
  }
}

/* ─── AI CHAT ───────────────────────────────────────────── */
function setChatMode(mode, btn) {
  document.querySelectorAll('#tab-ai .toggle-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('private-chat-badge').classList.toggle('show', mode === 'private');
}

function sendQuick(btn) {
  const text = btn.textContent.replace(/^[^\w]+/, '').trim();
  const key = Object.keys(aiResponses).find(k => text.toLowerCase().includes(k.toLowerCase().split(' ')[0]));
  sendUserMessage(key || text, aiResponses[key] || null);
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  input.style.height = 'auto';
  sendUserMessage(text, null);
}

function sendUserMessage(text, presetReply) {
  // Hide empty state and quick chips
  document.getElementById('chat-empty').style.display = 'none';
  if (!quickChipsHidden) {
    document.getElementById('quick-chips').style.display = 'none';
    quickChipsHidden = true;
  }
  addMsg('user', text);
  showTyping();
  const delay = 1000 + Math.random() * 800;
  setTimeout(() => {
    hideTyping();
    const reply = presetReply || generateReply(text);
    addMsg('ai', reply);
  }, delay);
}

function generateReply(text) {
  const t = text.toLowerCase();
  if (t.includes('right') || t.includes('article')) return 'Under the Indian Constitution, you have several fundamental rights guaranteed under Part III. Could you tell me more specifically which right or situation you\'re asking about? I can give you a precise answer.';
  if (t.includes('police') || t.includes('arrest')) return 'If you\'re facing a situation involving police, remember: you have the right to know the grounds of arrest, to be produced before a magistrate within 24 hours, and to consult a lawyer. Stay calm and do not resist. Ask: "Am I under arrest?"';
  if (t.includes('wage') || t.includes('salary') || t.includes('pay')) return 'Under the Payment of Wages Act 1936, unpaid wages can be recovered through a complaint to the Labour Commissioner. Keep all pay slips and bank records as evidence.';
  if (t.includes('rti')) return 'The Right to Information Act 2005 allows any citizen to request information from any public authority. File online at rtionline.gov.in. There is a ₹10 fee (waived for BPL). Response is due within 30 days.';
  return 'That\'s an important question. Based on Indian constitutional law and relevant statutes, I can help you understand your rights in this situation. Could you share a few more details about the specific circumstances?';
}

function addMsg(role, text) {
  const container = document.getElementById('chat-messages');
  const bubble = document.createElement('div');
  bubble.className = `msg-bubble ${role}`;
  const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>').replace(/•/g, '•');
  bubble.innerHTML = role === 'ai'
    ? `<div class="msg-sender">NAAGRIK AI</div><div class="msg-text">${formattedText}</div>`
    : `<div class="msg-text">${formattedText}</div>`;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
  chatMessages.push({ role, text });
}

function showTyping() {
  const ind = document.getElementById('typing-ind');
  ind.classList.add('show');
  const container = document.getElementById('chat-messages');
  container.appendChild(ind);
  container.scrollTop = container.scrollHeight;
}

function hideTyping() {
  document.getElementById('typing-ind').classList.remove('show');
}

/* ─── MORE / SUB-PANELS ─────────────────────────────────── */
function openSubPanel(name) {
  closeAllSubPanels();
  const sp = document.getElementById(`sp-${name}`);
  if (sp) {
    sp.classList.add('active');
    document.getElementById('more-container').style.height = document.getElementById('tab-content').offsetHeight + 'px';
  }
}

function closeSubPanel(name) {
  document.getElementById(`sp-${name}`).classList.remove('active');
}

function closeAllSubPanels() {
  document.querySelectorAll('.sub-panel').forEach(sp => sp.classList.remove('active'));
}

function trackCase() {
  const caseNum = document.getElementById('ct-case').value.trim();
  const court = document.getElementById('ct-court').value.trim();
  if (!caseNum || !court) { showToast('⚠️ Please enter both fields'); return; }
  document.getElementById('case-timeline').style.display = 'block';
  showToast('🔍 Case timeline loaded');
}

function filterNews(btn) {
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  showToast(`Showing: ${btn.textContent} news`);
}

/* ─── LANGUAGE MODAL ────────────────────────────────────── */
function openLangModal() {
  const modal = document.getElementById('lang-modal');
  modal.classList.add('open');
  setTimeout(() => {}, 10);
}

function closeLangModal() {
  document.getElementById('lang-modal').classList.remove('open');
}

document.getElementById('lang-modal').addEventListener('click', function(e) {
  if (e.target === this) closeLangModal();
});

/* ─── THEME ─────────────────────────────────────────────── */
function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  document.getElementById('theme-btn').textContent = currentTheme === 'dark' ? '🌙' : '☀️';
}

/* ─── TOAST ─────────────────────────────────────────────── */
let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById('toast');
  const parts = msg.match(/^(\S+)\s+(.*)/);
  if (parts) {
    document.getElementById('toast-icon').textContent = parts[1];
    document.getElementById('toast-msg').textContent = parts[2];
  } else {
    document.getElementById('toast-icon').textContent = '✅';
    document.getElementById('toast-msg').textContent = msg;
  }
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ─── GO ─────────────────────────────────────────────────── */
init();