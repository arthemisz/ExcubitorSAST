# Sentinel SAST 
[![Next.js](https://img.shields.io/badge/Next.js-14%2B-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18%2B-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4%2B-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

A high-performance, dark-mode glassmorphic frontend UI MVP for a **Static Application Security Testing (SAST)** platform. Built with **Next.js App Router**, **React**, and **Tailwind CSS**, designed to provide application security teams and developers with real-time visibility into repository code health, critical vulnerabilities, and scan history.

---

##  Key Features

- **Global Navigation & Sidebar Shell**:
  - Brand identity with modern security logo placeholder.
  - Prominent **"New Scan"** trigger button with hover and active glow states.
  - Seamless navigation links for **Repositories** and **Settings**.
- **Hero Metrics Deck**:
  - **Total Repos**: Track total onboarded and scanned repositories.
  - **Critical Open Findings**: Highlight urgent vulnerabilities requiring immediate remediation.
  - **Lines Analyzed**: Overview of total volume of code analyzed across the organization.
- **Repository Security Table**:
  - Comprehensive view of code repositories.
  - **Last Scan Time** with human-friendly relative formatting.
  - **Status Indicators**: Visual Pass / Fail badges with security shield icons.
  - **Severity Count Badges**: Granular vulnerability breakdown (Critical, High, Medium, Low).
- **Zero-Backend Client Mock Architecture**: Fully interactive UI ready for immediate frontend testing, client demos, and UX iteration with local mock state.

---

## Tech Stack

| Technology | Role | Details |
| :--- | :--- | :--- |
| **Next.js** | Framework | App Router architecture (`/app/layout.tsx`, `/app/page.tsx`) |
| **React** | UI Library | Client & Server Components with responsive state management |
| **Tailwind CSS** | Styling | Custom glassmorphic utilities and dark color tokens |
| **Lucide React** | Icons | Security shields, checkmarks, alerts, and navigation icons |
| **TypeScript** | Type Safety | Strict typing for mock data models and component props |

---


### Severity Badge Color Scale

| Severity | Badge Background | Badge Text / Border |
| :--- | :--- | :--- |
| **Critical** | `bg-red-500/10` | `text-red-400 border-red-500/20` |
| **High** | `bg-orange-500/10` | `text-orange-400 border-orange-500/20` |
| **Medium** | `bg-amber-500/10` | `text-amber-400 border-amber-500/20` |
| **Low** | `bg-blue-500/10` | `text-blue-400 border-blue-500/20` |
| **Passed** | `bg-emerald-500/10` | `text-emerald-400 border-emerald-500/20` |

---

##  Project Structure

```text
├── app/
│   ├── favicon.ico
│   ├── globals.css         # Tailwind directives & glassmorphic custom utilities
│   ├── layout.tsx          # Root layout shell with minimalist left sidebar & header
│   └── page.tsx            # Main dashboard view with Hero Stats & Repo Table
├── components/
│   ├── Sidebar.tsx         # Left navigation bar (Logo, New Scan, Nav items)
│   ├── MetricCard.tsx      # Reusable glassmorphic stat card with trend indicators
│   ├── RepoTable.tsx       # Repository data table with status & severity badges
│   └── SeverityBadge.tsx   # Color-coded severity badge component
├── data/
│   └── mockRepositories.ts # Hardcoded JSON mock data for repositories and scan findings
├── public/                 # Static assets (logos, SVGs)
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json
```

##  Roadmap & Next Iterations

- [ ] **Scan Detail Modal / Drawer**: Deep-dive view showing line-by-line code snippets with vulnerability callouts (CWE / OWASP Top 10).
- [ ] **Interactive "New Scan" Flow**: Client modal to trigger mock scans with progress animations.
- [ ] **SARIF & JSON Export**: Download raw security scan reports directly in browser.
- [ ] **Repository Filter & Search**: Client-side filtering by severity, status, and repository name.
- [ ] **Settings View**: Configure SAST rule sets, severity thresholds, and notification webhooks.

---

## 📄 License

This project is licensed under the MIT License.
