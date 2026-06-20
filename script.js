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
let activeLanguages = ['English', 'Hindi'];
let selectedLanguage = 'English'; // The current language in use

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
  // Theme
  const savedTheme = localStorage.getItem('naagrik-theme') || 'dark';
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    document.getElementById('theme-btn').textContent = '☀️';
  }

  // 1. Load basic values
  document.getElementById('ai-api-key').value = sessionStorage.getItem('ai-key') || '';
  document.getElementById('ai-provider').value = localStorage.getItem('ai-provider') || 'openrouter';
  
  // 2. Populate models based on the provider
  updateModelOptions(); 
  
  // 3. NOW set the saved model (it will exist because we called updateModelOptions above)
  document.getElementById('ai-model').value = localStorage.getItem('ai-model') || '';

  // 4. Status Check
  if(localStorage.getItem('ai-key')) {
    document.getElementById('api-status').textContent = 'Stored Securely';
  }

  renderAgeChapters();
  renderToolkit();
  renderLangTiles();
  renderDownloadLangs();
}

// 2. Populate models based on the provider
function updateModelOptions() {
  const provider = document.getElementById('ai-provider').value;
  const modelSelect = document.getElementById('ai-model');
  modelSelect.innerHTML = ''; // Clear current
  
  const models = provider === 'groq' 
    ? ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'mixtral-8x7b-32768']
    : ['openai/gpt-4o-mini', 'anthropic/claude-3.5-haiku', 'google/gemini-2.0-flash-lite-preview'];

  models.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m;
    opt.textContent = m;
    modelSelect.appendChild(opt);
  });
}

function renderAgeChapters() {
  const spine = document.getElementById('age-spine');
  const template = document.getElementById('tmpl-age-pill');

  ageChapters.forEach((ch, i) => {
    // 1. Clone the template structure from HTML
    const pill = template.cloneNode(true);
    pill.id = `ap-${i}`;
    pill.style.display = 'block'; // Make sure it's visible

    // 2. Populate the data (JS only touches text, not HTML tags)
    pill.querySelector('.pill-badge').textContent = ch.range;
    pill.querySelector('.pill-label').textContent = ch.label;
    pill.querySelector('.age-pill-text').textContent = ch.text;

    // 3. Set the click event
    pill.querySelector('.age-pill-btn').onclick = () => toggleAgePill(i);

    // 4. Append to the DOM
    spine.appendChild(pill);
  });
}

function renderToolkit() {
  const grid = document.getElementById('toolkit-grid');
  const template = document.getElementById('tmpl-toolkit-card');

  toolkit.forEach(t => {
    // 1. Clone the structure
    const card = template.cloneNode(true);
    card.style.display = 'block'; // Ensure it shows up

    // 2. Only inject the DATA
    card.querySelector('.tc-icon').textContent = t.icon;
    card.querySelector('.tc-name').textContent = t.name;
    card.querySelector('.tc-desc').textContent = t.desc;

    // 3. Add behavior
    card.onclick = () => showToast(`📖 Opening ${t.name} guide…`);
    
    grid.appendChild(card);
  });
}

function renderLangTiles() {
  const grid = document.getElementById('lang-tile-grid');
  grid.innerHTML = '';
  languages.forEach((l) => {
    const isInstalled = activeLanguages.includes(l.name);
    const isActive = selectedLanguage === l.name;

    const tile = document.createElement('div');
    tile.className = `lang-tile ${isInstalled ? 'selected' : ''}`;
    tile.innerHTML = `
      <div class="lang-tile-name">${l.name}</div>
      <div class="lang-tile-native">${l.native}</div>
      ${isActive ? '<div><span class="built-in-badge" style="background:#5fffb0;color:#000">In Use</span></div>' 
      : isInstalled ? '<div><span class="built-in-badge">Downloaded</span></div>' : ''}`;

    tile.onclick = () => {
      if (isInstalled) {
        selectedLanguage = l.name;
        renderLangTiles(); // Update UI to show new 'In Use'
        showToast(`✅ ${l.name} is now the active language`);
      } else {
        showToast(`ℹ️ Download ${l.name} first in "Downloads & Features".`);
      }
    };
    grid.appendChild(tile);
  });
}

function renderDownloadLangs() {
  const list = document.getElementById('lang-list');
  list.innerHTML = '';
  languages.filter(l => !l.builtin).forEach(l => {
    const isInstalled = activeLanguages.includes(l.name);
    const item = document.createElement('div');
    item.className = 'lang-item';
    item.innerHTML = `<div class="lang-name">${l.name}</div>
      <div class="lang-badge">${isInstalled ? 'Downloaded' : '~4 MB'}</div>
      ${isInstalled ? '' : `<button class="btn-dl" onclick="handleLanguageDownload('${l.name}')">Download</button>`}`;
    list.appendChild(item);
  });
}

function handleLanguageDownload(langName) {
  // Check if we are at the limit (3 languages)
  if (activeLanguages.length >= 3) {
    // Get the name of the language that would be removed (the 3rd one)
    const languageToRemove = activeLanguages[2];
    
    // Ask for confirmation
    const userConfirmed = confirm(
      `Storage full! You already have 3 languages active. ` +
      `To download "${langName}", we must remove "${languageToRemove}". ` +
      `Do you want to continue?`
    );

    // If user clicks "Cancel", stop the function
    if (!userConfirmed) {
      showToast('❌ Download cancelled');
      return;
    }

    // If user clicked "OK", remove the 3rd language
    activeLanguages.splice(2, 1);
    showToast(`🗑️ ${languageToRemove} removed`);
  }

  // Add the new language
  activeLanguages.push(langName);
  
  // Refresh UI
  renderLangTiles();
  renderDownloadLangs();
  showToast(`✅ ${langName} activated`);
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

// --- Configuration Save ---
function saveConfig() {
  const key = document.getElementById('ai-api-key').value;
  const provider = document.getElementById('ai-provider').value;
  const model = document.getElementById('ai-model').value;
  
  sessionStorage.setItem('ai-key', key);
  localStorage.setItem('ai-provider', provider);
  localStorage.setItem('ai-model', model);
  
  document.getElementById('api-status').textContent = key ? 'Stored Securely' : 'Not Set';
  showToast('✅ Configuration Saved');
}

// Wipe API Key (Session Cleanup)
function clearApiKey() {
  sessionStorage.removeItem('ai-key');
  localStorage.removeItem('ai-provider');
  localStorage.removeItem('ai-model');
  
  document.getElementById('ai-api-key').value = '';
  document.getElementById('api-status').textContent = 'Not Set';
  showToast('🗑️ API Key and local session wiped');
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

async function sendMessage() {
  const apiKey = sessionStorage.getItem('ai-key');
  const provider = localStorage.getItem('ai-provider') || 'openrouter';
  const model = localStorage.getItem('ai-model');
  const input = document.getElementById('chat-input');
  
  if (!apiKey || !model) {
    showToast('⚠️ Set API Key and Model first');
    return;
  }

  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  addMsg('user', text);
  showTyping();

  try {
    const url = provider === 'groq' 
      ? "https://api.groq.com/openai/v1/chat/completions" 
      : "https://openrouter.ai/api/v1/chat/completions";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://naagrik.app",
        "X-Title": "NAAGRIK"
      },
      body: JSON.stringify({
        model: model,
        messages: [
          // PASTE THE SYSTEM PROMPT HERE (This controls the "Harsh Truth" personality)
          { "role": "system", "content": "You are a direct, blunt Indian legal assistant. No formalities. No pleasantries. State facts only. If an action is illegal under Indian law, explicitly state it is illegal and list the specific consequences (punishments/sections). Be concise to save tokens."},
          // This is the user's actual question
          {"role": "user", "content": text}]
      })
    });

    const data = await response.json();
    hideTyping();
    if (!response.ok) throw new Error(data.error?.message || 'API Request failed');
    addMsg('ai', data.choices[0].message.content);
  } catch (err) {
    hideTyping();
    addMsg('ai', '🚫 Error: ' + err.message);
  }
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
  }
}

function closeSubPanel(name) {
  const sp = document.getElementById(`sp-${name}`);
  sp.classList.remove('active');
  // Reset height just in case
  document.getElementById('more-container').style.height = 'auto';
}

function closeAllSubPanels() {
  document.querySelectorAll('.sub-panel').forEach(sp => sp.classList.remove('active'));
  document.getElementById('more-container').style.height = 'auto';
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
  localStorage.setItem('naagrik-theme', currentTheme);
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
