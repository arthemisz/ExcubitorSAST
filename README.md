# Sentinel SAST — Modern Security Dashboard UI

[![Next.js](https://img.shields.io/badge/Next.js-14%2B-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18%2B-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4%2B-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

A high-performance, dark-mode glassmorphic frontend UI MVP for a **Static Application Security Testing (SAST)** platform. Built with **Next.js App Router**, **React**, and **Tailwind CSS**, designed to provide application security teams and developers with real-time visibility into repository code health, critical vulnerabilities, and scan history.

---

## 🌟 Key Features

- **Dark-Mode Glassmorphic Aesthetic**: Implemented with deep dark backgrounds (`bg-gray-950`), frosted glass cards (`backdrop-blur-md`, `bg-white/5` or `bg-gray-800/50`), and subtle borders (`border-white/10`).
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

## 🛠️ Tech Stack

| Technology | Role | Details |
| :--- | :--- | :--- |
| **Next.js** | Framework | App Router architecture (`/app/layout.tsx`, `/app/page.tsx`) |
| **React** | UI Library | Client & Server Components with responsive state management |
| **Tailwind CSS** | Styling | Custom glassmorphic utilities and dark color tokens |
| **Lucide React** | Icons | Security shields, checkmarks, alerts, and navigation icons |
| **TypeScript** | Type Safety | Strict typing for mock data models and component props |

---

## 🎨 Design System & Color Palette

The interface follows a cybersecurity-focused dark-mode glassmorphic theme:

```css
/* Core Styling Rules */
--bg-primary: #030712;      /* bg-gray-950 */
--panel-bg: rgba(255, 255, 255, 0.05); /* bg-white/5 or bg-gray-800/50 */
--panel-border: rgba(255, 255, 255, 0.1); /* border-white/10 */
--panel-blur: blur(12px);   /* backdrop-blur-md */
```

### Severity Badge Color Scale

| Severity | Badge Background | Badge Text / Border |
| :--- | :--- | :--- |
| **Critical** | `bg-red-500/10` | `text-red-400 border-red-500/20` |
| **High** | `bg-orange-500/10` | `text-orange-400 border-orange-500/20` |
| **Medium** | `bg-amber-500/10` | `text-amber-400 border-amber-500/20` |
| **Low** | `bg-blue-500/10` | `text-blue-400 border-blue-500/20` |
| **Passed** | `bg-emerald-500/10` | `text-emerald-400 border-emerald-500/20` |

---

## 📁 Project Structure

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

---

## 📊 Mock Data Schema

The dashboard uses client-side mock state to enable immediate interactivity without requiring an active backend or database:

```typescript
export interface SeverityCount {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export interface Repository {
  id: string;
  name: string;
  defaultBranch: string;
  lastScanTime: string;
  status: 'passed' | 'failed';
  findings: SeverityCount;
  linesOfCode: number;
}

export const MOCK_REPOSITORIES: Repository[] = [
  {
    id: "repo-1",
    name: "auth-service-api",
    defaultBranch: "main",
    lastScanTime: "12 minutes ago",
    status: "failed",
    findings: { critical: 2, high: 4, medium: 5, low: 1 },
    linesOfCode: 48200
  },
  {
    id: "repo-2",
    name: "payment-gateway",
    defaultBranch: "master",
    lastScanTime: "1 hour ago",
    status: "failed",
    findings: { critical: 1, high: 0, medium: 3, low: 8 },
    linesOfCode: 124500
  },
  {
    id: "repo-3",
    name: "customer-portal-web",
    defaultBranch: "develop",
    lastScanTime: "3 hours ago",
    status: "passed",
    findings: { critical: 0, high: 0, medium: 1, low: 4 },
    linesOfCode: 87100
  },
  {
    id: "repo-4",
    name: "infra-terraform-modules",
    defaultBranch: "main",
    lastScanTime: "Yesterday",
    status: "passed",
    findings: { critical: 0, high: 0, medium: 0, low: 2 },
    linesOfCode: 16400
  }
];
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.17+ or v20+
- **npm**, **pnpm**, or **yarn**

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd proj
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🧩 Component Architecture Overview

### 1. Root Layout (`/app/layout.tsx`)
- Hosts the dark backdrop (`bg-gray-950 text-gray-100 min-h-screen flex`).
- Embeds the persistent **Sidebar** navigation component on the left.
- Provides the main content viewport with fluid spacing and custom scrollbars.

### 2. Main Dashboard (`/app/page.tsx`)
- **Page Header**: Title, description, and workspace selector / quick filter.
- **Hero Stats Grid**:
  - `Total Repos`: Dynamic count computed from mock array.
  - `Critical Open Findings`: Aggregated count of unresolved critical severity alerts.
  - `Lines Analyzed`: Total formatted volume of scanned source lines.
- **Repositories Table**:
  - Filter and search bar.
  - Tabular list rendering repository metadata, scan timestamps, pass/fail status pills, and breakdown badges.

---

## 🗺️ Roadmap & Next Iterations

- [ ] **Scan Detail Modal / Drawer**: Deep-dive view showing line-by-line code snippets with vulnerability callouts (CWE / OWASP Top 10).
- [ ] **Interactive "New Scan" Flow**: Client modal to trigger mock scans with progress animations.
- [ ] **SARIF & JSON Export**: Download raw security scan reports directly in browser.
- [ ] **Repository Filter & Search**: Client-side filtering by severity, status, and repository name.
- [ ] **Settings View**: Configure SAST rule sets, severity thresholds, and notification webhooks.

---

## 📄 License

This project is licensed under the MIT License.
