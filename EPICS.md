# Veilus Documentation — Epics & Stories

## Epic 1: Core Documentation (P0)
> Nội dung cốt lõi để người dùng có thể tải, cài đặt, và sử dụng Veilus cơ bản.

### Story 1.1 — Getting Started Content (EN) ✅ Done
**As a** new user, **I want** step-by-step guides to install and start using Veilus,
**so that** I can create my first profile within 5 minutes.

**Acceptance Criteria:**
- [x] Introduction page (what is Veilus, comparison table)
- [x] Installation page (Windows/macOS/Linux)
- [x] Quick Start page (create profile, launch, test fingerprint)

### Story 1.2 — Profile Management Docs (EN) ✅ Done
**As a** user, **I want** documentation on profile creation, fingerprinting, and proxy setup,
**so that** I can configure profiles correctly for my use case.

**Acceptance Criteria:**
- [x] Create a Profile page (basic + advanced options)
- [x] Fingerprinting page (components, modes, verification)
- [x] Proxy Setup page (types, config, timezone auto-match)

### Story 1.3 — Automation Docs (EN) ✅ Done
**As a** user, **I want** to understand VeilusFlow automation,
**so that** I can record and run browser automations.

**Acceptance Criteria:**
- [x] VeilusFlow Overview page (concepts, use cases)
- [x] Recording Actions page (how-to, action types, run options)

### Story 1.4 — Reference Docs (EN) ✅ Done
**Acceptance Criteria:**
- [x] Keyboard Shortcuts page
- [x] FAQ page (general, detection, performance, troubleshooting)

---

## Epic 2: Infrastructure & Branding (P0)

### Story 2.1 — Starlight Project Setup ✅ Done
- [x] Init Astro Starlight in `docs/`
- [x] Custom CSS (Veilus colors, dark theme)
- [x] Logo SVGs (dark + light variants)
- [x] Sidebar navigation (4 sections)
- [x] Pagefind search index

### Story 2.2 — Deployment ✅ Done
- [x] Cloudflare Pages project `veilus-docs`
- [x] Custom domain `docs.veilus.io`
- [x] Footer link from main website

### Story 2.3 — i18n Setup ✅ Done
- [x] EN + VN configured in astro.config
- [x] Sidebar translations (VN labels)

---

## Epic 3: Vietnamese Translation (P1)
> Dịch nội dung chính sang Tiếng Việt — target audience Việt Nam.

### Story 3.1 — Getting Started (VN)
**As a** Vietnamese user, **I want** docs in my language,
**so that** I can follow guides without language barriers.

**Tasks:**
- [ ] Tạo `vi/getting-started/introduction.md`
- [ ] Tạo `vi/getting-started/installation.md`
- [ ] Tạo `vi/getting-started/quickstart.md`

**Effort:** 2h

### Story 3.2 — Profiles & FAQ (VN)
- [ ] Tạo `vi/profiles/create.md`
- [ ] Tạo `vi/reference/faq.md`

**Effort:** 1.5h

---

## Epic 4: Advanced Documentation (P1)
> Nội dung nâng cao cho power users.

### Story 4.1 — Chromium Engine Docs
- [ ] Engine Manager overview
- [ ] Update/rollback engine versions
- [ ] Custom engine settings

**Effort:** 3h

### Story 4.2 — API Reference
- [ ] REST API authentication
- [ ] License endpoints
- [ ] Profile management endpoints
- [ ] Auto-generate from OpenAPI spec

**Effort:** 4h

### Story 4.3 — Advanced Automation
- [ ] Script Editor (code view)
- [ ] Variables and loops
- [ ] Data extraction and export
- [ ] Scheduling and cron

**Effort:** 3h

---

## Epic 5: Recipes & Community (P2)
> Guides thực tế cho use cases phổ biến.

### Story 5.1 — Recipe Guides
- [ ] Multi-account management workflow
- [ ] Web scraping with profiles
- [ ] Social media automation
- [ ] E-commerce monitoring

**Effort:** 4h

### Story 5.2 — Troubleshooting Guide
- [ ] Common errors and fixes
- [ ] Performance optimization
- [ ] Proxy troubleshooting
- [ ] Fingerprint debugging

**Effort:** 2h

### Story 5.3 — Additional Languages
- [ ] Chinese (zh) — Getting Started
- [ ] Russian (ru) — Getting Started
- [ ] Spanish (es) — Getting Started

**Effort:** 4h (per language)

---

## Progress Summary

| Epic | Stories | Done | Status |
|------|---------|------|--------|
| 1. Core Documentation | 4 | 4/4 | ✅ Complete |
| 2. Infrastructure | 3 | 3/3 | ✅ Complete |
| 3. Vietnamese Translation | 2 | 0/2 | 🔲 Next |
| 4. Advanced Documentation | 3 | 0/3 | 🔲 Planned |
| 5. Recipes & Community | 3 | 0/3 | 🔲 Backlog |
