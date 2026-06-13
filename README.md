NAAGRIK (Demo Prototype)

This repository contains a user-interface demonstration only.

All AI responses, legal examples, court timelines, recordings,
storage data, news items, and sample content are fictional and
generated solely for demonstration purposes.

This project does not provide legal advice and should not be relied
upon for legal, professional, or governmental purposes.

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
