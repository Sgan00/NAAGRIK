NAAGRIK (Demo Prototype)

This repository contains a user-interface demonstration only.

All AI responses, legal examples, court timelines, recordings,
storage data, news items, and sample content are fictional and
generated solely for demonstration purposes.

This project does not provide legal advice and should not be relied
upon for legal, professional, or governmental purposes.

# NAAGRIK — Know Your Rights

**A free, open-source Progressive Web App (PWA) helping every Indian citizen understand and exercise their legal rights.**

Free forever. No paid tier. No ads. No data selling.

---

## ⚠️ Security Notice — DEMO AUTHENTICATION ONLY

**This repository contains a UI prototype with simulated authentication.**

### Current Implementation (NOT SECURE)
- ❌ Accounts stored in browser `sessionStorage` (plain text, no encryption)
- ❌ Passwords stored without any cryptographic protection
- ❌ No server-side validation or token management
- ❌ Sessions expire after 30 minutes OR when the browser tab closes
- ❌ **DO NOT use with real passwords or personal information**

### Before Production Deployment
Replace the demo auth system with a real authentication provider:

**Recommended Options:**
- [Firebase Authentication](https://firebase.google.com/docs/auth) — Free tier available, supports email/password, Google, phone, etc.
- [Supabase Auth](https://supabase.com/docs/guides/auth) — Open source, PostgreSQL-backed
- [Auth0](https://auth0.com) — Enterprise-grade, generous free tier
- Custom backend with JWT tokens + bcrypt password hashing

**Search for `_auth` module in `script.js` to replace the authentication logic.**

---

## Features

### Core Tabs

**📖 Rights**
- 7 age-based chapters (5–6 years to 18+ adults)
- Legal toolkit with 10 quick-access guides (RTI, e-FIR, Consumer, Labour, POCSO, etc.)
- Downloadable content for offline reference

**🚨 Alert**
- Real-time rights violation detection (simulated with demo data)
- Audio/video/text input modes
- Live transcript with red-flag indicators
- Private mode (zero storage)

**🤖 Ask AI**
- Interactive legal Q&A chatbot (keyword-based demo responses)
- My Chat (history saved for members) vs Private Chat (zero trace)
- Quick-start chips for common questions

**⋯ More**
- Latest SC/HC judgment news
- Court case tracker
- Network & data usage stats
- Language pack downloads (13 Indian languages planned)
- Account management

### Additional Features
- Dark/Light theme toggle
- English + Hindi built-in, 11 other languages downloadable
- Mobile-first responsive design
- Guest mode (no signup required)

---

## Tech Stack

**Three-file architecture:**
- Pure HTML5 + CSS3 (CSS custom properties for theming)
- Vanilla JavaScript (ES6+, no frameworks)
- Google Fonts: Syne (headings), DM Sans (body), Noto Sans Devanagari (Hindi/Indic)

**Security:**
- Content Security Policy (CSP) meta tag
- XSS protection via HTML entity escaping
- Session timeout (30 minutes idle)

---

## Quick Start

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sgan00/NAAGRIK.git
   cd naagrik
   ```

2. **Open in browser**
   ```bash
   # Option 1: Direct file open
   open NAAGRIK-demo-v1.html  # macOS
   start NAAGRIK-demo-v1.html # Windows
   xdg-open NAAGRIK-demo-v1.html # Linux

   # Option 2: Local server (recommended for testing)
   python3 -m http.server 8000
   # Then visit http://localhost:8000/NAAGRIK-demo-v1.html
   ```

3. **Test the demo**
   - Click "Continue as Guest" OR
   - Create a demo account (use fake credentials — they're not stored securely)
   - Explore the 4 tabs: Rights, Alert, Ask AI, More

### Deploy to Production

**Before deploying:**
1. ✅ Replace `_auth` module with real authentication (see Security Notice above)
2. ✅ Set up HTTPS (required for PWA features and secure sessions)
3. ✅ Configure a real backend API for data storage
4. ✅ Add actual AI integration (replace `aiResponses` object with API calls)
5. ✅ Implement server-side validation for all user inputs

**Deployment options:**
- **Netlify/Vercel** — Free tier, automatic HTTPS, CDN
- **GitHub Pages** — Free static hosting
- **Firebase Hosting** — Integrates well with Firebase Auth
- **Any static host** — It's a static HTML / css / js.

---

## Project Structure

```
naagrik/

├── naagrik.html    #App structure
├── style.css        #All style
├── script.js        #All logic
├── LICENSE            # MIT License
└── README.md          # This file
```

---

## Roadmap

### V1 (Current — UI Prototype)
- ✅ 4-tab navigation structure
- ✅ Age-based rights chapters
- ✅ Legal toolkit cards
- ✅ Demo authentication UI
- ✅ Theme toggle (dark/light)
- ✅ Language selector (EN + HI)
- ⚠️ Simulated AI responses (keyword-based)
- ⚠️ Demo-only auth (sessionStorage, plain text)

### V2 (Production-Ready)
- [ ] Real authentication (Firebase/Supabase/Auth0)
- [ ] Live AI integration (Anthropic Claude API or similar)
- [ ] Backend API for data persistence
- [ ] PWA manifest + service worker (offline support)
- [ ] Actual SC/HC judgment scraper (News tab)
- [ ] Real court case tracker API integration

### V3 (Future Features)
- [ ] SOS Mode (GPS + emergency contacts + nearest DLSA)
- [ ] RTI Auto-Generator (template-based letter builder)
- [ ] FIR Wizard (step-by-step with BNS section finder)
- [ ] Offline Full Mode (service worker + IndexedDB)
- [ ] WhatsApp share cards for rights
- [ ] Nearest Legal Aid map (DLSA, HC legal aid, NGOs)
- [ ] Evidence capture (photo + GPS + timestamp watermark)
- [ ] Rights scenario game (gamified learning for ages 13–17)
- [ ] Lawyer directory (filterable by state, specialization, language, fee)
- [ ] Community Q&A (anonymous questions + AI + community answers)
- [ ] Parent mode (simplified interface for teaching children 5–12)
- [ ] Daily rights news digest (push notifications)

---

## Contributing

We welcome contributions! This is a public good project with no commercial intent.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
   - Keep the single-file architecture (don't split into modules)
   - Follow existing code style (2-space indent, descriptive comments)
   - Add JSDoc comments for new functions
   - Test in Chrome, Firefox, Safari (mobile + desktop)
4. **Commit with clear messages**
   ```bash
   git commit -m "Add: [feature description]"
   ```
5. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

### Contribution Guidelines

**High Priority:**
- Real authentication integration (replace `_auth` module)
- AI API integration (replace `aiResponses` object)
- Accessibility improvements (ARIA labels, keyboard navigation)
- Language pack content (translations for 11 Indian languages)
- Legal content accuracy review (by lawyers or legal researchers)

**Medium Priority:**
- PWA manifest + service worker
- Performance optimizations
- Additional rights chapters
- UI/UX refinements

**Low Priority (but appreciated):**
- Code refactoring
- Bug fixes
- Documentation improvements

### Content Contributors

**Legal experts, lawyers, activists:**
- Review and correct rights content
- Suggest additional legal toolkit guides
- Provide case law references

**Translators:**
- Translate UI and content into regional languages
- Review existing Hindi translations

**Designers:**
- Improve visual design
- Create illustrations for rights chapters
- Design share cards for social media

---

## License

MIT License — See [LICENSE](LICENSE) file for details.

Free forever. No restrictions. Use it, fork it, improve it.

---

## Acknowledgments

**Legal Sources:**
- Constitution of India — Government of India
- India Code — indiacode.nic.in
- Supreme Court of India — sci.gov.in

**Fonts:**
- Syne, DM Sans — Google Fonts
- Noto Sans Devanagari — Google Fonts

**Inspiration:**
This project was created to democratize legal knowledge in India. Every citizen deserves to know their rights — regardless of language, education, or economic status.

---

## Contact & Support

- **Issues:** [GitHub Issues](https://github.com/Sgan00/naagrik/issues)
- **Discussions:** [GitHub Discussions](https://github.com/Sgan00/naagrik/discussions)
- **Security:** Report security vulnerabilities via GitHub Security Advisories

---

**Built with ❤️ for the people of India.**

**Free forever. No ads. No data selling. No paid tier.**


# NAAGRIK

AUTH OVERLAY  
├── Demo warning banner  
├── Logo + app name + tagline  
├── Tab switcher — Login | Sign Up    
├── LOGIN FORM  
│   ├── Email input   
│   ├── Password input  
│   ├── Inline error message  
│   ├── Login button  
│   └── Continue as Guest link  
└── SIGN UP FORM  
    ├── Full name input  
    ├── Email input  
    ├── Password input  
    ├── Confirm password input  
    ├── Inline error message  
    ├── Create Account button  
    └── Continue as Guest link  

TOP BAR (fixed)  
├── Logo icon + word mark + tagline  
├── Member chip (hidden → shown after login)  
├── Language toggle button (🌐 EN)  
└── Theme toggle button (🌙 / ☀️)  

TAB 1 — RIGHTS  
├── Hero strip  
│   ├── Heading + subtext  
│   └── 3 tag chips  
├── Age chapter pills (6 pills)  
│   ├── 5–6 Early Childhood   
│   ├── 7–10 Children  
│   ├── 11–13 Pre-teen  
│   ├── 14–15 Early Teen  
│   ├── 16–17 Teen  
│   └── 18+ Adult Rights  
├── Each pill → expandable content panel  
│   ├── Rights text  
│   ├── Related Cases button  
│   └── Download button  
└── Legal Toolkit (2-col grid, 10 cards)  
    ├── RTI  
    ├── e-FIR  
    ├── Consumer  
    ├── Labour  
    ├── POCSO  
    ├── Dom. Violence  
    ├── Property  
    ├── Cyber Crime  
    ├── Escalation  
    └── Writs  

TAB 2 — ALERT  
├── Guest banner + Sign In button  
├── Mode toggle — Standard | Private  
├── Private mode warning badge  
├── Input type chips — Audio | Audio+Video | Type  
├── Record / Stop button (pulses red when active)  
├── Recording status text  
├── Live transcript area  
└── Live Red Flags section  
    └── Red flag cards (stackable)  
        ├── Severity dot (red / yellow)  
        ├── Flagged phrase  
        ├── Violated right  
        └── More button  

TAB 3 — ASK AI  
├── Mode toggle — My Chat | Private Chat  
├── Private chat warning badge  
├── Quick-start chips (5 chips, hidden after first message)  
│   ├── Police stops  
│   ├── File RTI  
│   ├── Unpaid wages  
│   ├── Scam calls  
│   └── Article 21  
└── Chat area  
    ├── Empty state (icon + prompt text)  
    ├── User message bubbles (right-aligned)  
    ├── AI message bubbles (left-aligned)  
    │   ├── NAAGRIK AI sender label  
    │   └── Formatted response text  
    ├── Typing indicator (3 bouncing dots)  
    ├── Text input  
    └── Send button  

TAB 4 — MORE  
├── MAIN MENU (9 rows)  
│   ├── News & Updates →  
│   ├── Court Tracker →  
│   ├── My Storage →  
│   ├── Network & Data →  
│   ├── My Data →  
│   ├── Submit an Idea →  
│   ├── Downloads & Features →  
│   ├── Credits →  
│   └── Login / Sign Up → (or Log Out when member)  
│  
├── NEWS SUB-PANEL  
│   ├── Back button  
│   ├── Filter pills — All | Supreme Court | High Court | Consumer | Labour  
│   └── News cards (5 cards)  
│       ├── Court category tag  
│       ├── Judgment title  
│       └── Date + case number  
│  
├── COURT TRACKER SUB-PANEL  
│   ├── Back button  
│   ├── Case number input  
│   ├── Court name input  
│   ├── Track Case button  
│   └── Timeline (dots + dates + event text)  
│  
├── NETWORK & DATA SUB-PANEL  
│   ├── Back button  
│   ├── Connection type stat  
│   ├── Speed stat  
│   ├── Session data stat  
│   ├── Monthly data stat  
│   └── Refresh button  
│  
├── SUBMIT IDEA SUB-PANEL  
│   ├── Back button  
│   ├── Idea text area  
│   ├── Category drop down  
│   └── Submit Anonymously button  
│  
├── DOWNLOADS SUB-PANEL  
│   ├── Back button  
│   ├── Language packs list (11 packs)  
│   │   └── Download button per language  
│   └── Coming Soon section (3 items)  
│       ├── SOS Mode + Notify me  
│       ├── RTI Auto-Generator + Notify me  
│       └── Offline Full Mode + Notify me  
│  
└── CREDITS SUB-PANEL  
    ├── Back button  
    ├── Logo + version  
    ├── Sources list (5 items)  
    └── View on GitHub button  

BOTTOM NAV (fixed, 4 tabs)  
├── 📖 Rights  
├── 🚨 Alert  
├── 🤖 Ask AI  
└── ⋯ More  

LANGUAGE MODAL (bottom sheet)  
├── Title + close button  
├── Subtitle  
└── 13 language tiles (3-col grid)  
    ├── English (built-in)  
    ├── Hindi (built-in)  
    └── 11 downloadable languages  
