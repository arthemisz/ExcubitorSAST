export interface FindingCounts {
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
  status: 'Pass' | 'Fail';
  findingsCount: FindingCounts;
  linesAnalyzed: number;
  topFindingId: string;
}

export interface DiffLine {
  type: 'context' | 'remove' | 'add';
  oldLineNumber?: number;
  newLineNumber?: number;
  content: string;
}

export interface FindingDetail {
  id: string;
  repoId: string;
  repoName: string;
  filePath: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  cwe: string;
  introducedCommit: string;
  vulnerableRange: [number, number]; // [startLine, endLine]
  codeSnippet: {
    lineNumber: number;
    code: string;
    isVulnerable: boolean;
  }[];
  diffPatch: DiffLine[];
  aiTriage: {
    is_false_positive: boolean;
    reasoning: string;
    severity: string;
  };
}

export const MOCK_REPOSITORIES: Repository[] = [
  {
    id: "auth-service-api",
    name: "backend/auth-service-api",
    defaultBranch: "main",
    lastScanTime: "12 mins ago",
    status: "Fail",
    findingsCount: { critical: 2, high: 3, medium: 5, low: 1 },
    linesAnalyzed: 48200,
    topFindingId: "vuln-sql-001"
  },
  {
    id: "payment-gateway",
    name: "services/payment-gateway",
    defaultBranch: "master",
    lastScanTime: "1 hour ago",
    status: "Fail",
    findingsCount: { critical: 1, high: 1, medium: 2, low: 4 },
    linesAnalyzed: 124500,
    topFindingId: "vuln-ssrf-002"
  },
  {
    id: "customer-portal-web",
    name: "frontend/customer-portal-web",
    defaultBranch: "develop",
    lastScanTime: "3 hours ago",
    status: "Pass",
    findingsCount: { critical: 0, high: 0, medium: 1, low: 4 },
    linesAnalyzed: 87100,
    topFindingId: "vuln-xss-003"
  },
  {
    id: "infra-terraform-modules",
    name: "cloud/infra-terraform-modules",
    defaultBranch: "main",
    lastScanTime: "Yesterday",
    status: "Pass",
    findingsCount: { critical: 0, high: 0, medium: 0, low: 2 },
    linesAnalyzed: 16400,
    topFindingId: "vuln-iam-004"
  }
];

export const MOCK_HERO_STATS = {
  totalRepos: MOCK_REPOSITORIES.length,
  criticalOpen: MOCK_REPOSITORIES.reduce((acc, r) => acc + r.findingsCount.critical, 0),
  linesAnalyzed: MOCK_REPOSITORIES.reduce((acc, r) => acc + r.linesAnalyzed, 0).toLocaleString()
};

export const MOCK_FINDING: FindingDetail = {
  id: "vuln-sql-001",
  repoId: "auth-service-api",
  repoName: "backend/auth-service-api",
  filePath: "src/api/auth.js",
  title: "Direct SQL Query String Interpolation",
  severity: "Critical",
  cwe: "CWE-89: Improper Neutralization of Special Elements used in an SQL Command ('SQL Injection')",
  introducedCommit: "7b4c9e8 (feat: add password verification endpoint)",
  vulnerableRange: [11, 15],
  codeSnippet: [
    { lineNumber: 1, code: "const express = require('express');", isVulnerable: false },
    { lineNumber: 2, code: "const router = express.Router();", isVulnerable: false },
    { lineNumber: 3, code: "const db = require('../db/pool');", isVulnerable: false },
    { lineNumber: 4, code: "const crypto = require('crypto');", isVulnerable: false },
    { lineNumber: 5, code: "", isVulnerable: false },
    { lineNumber: 6, code: "/**", isVulnerable: false },
    { lineNumber: 7, code: " * Authenticate user credentials and return session token", isVulnerable: false },
    { lineNumber: 8, code: " */", isVulnerable: false },
    { lineNumber: 9, code: "router.post('/login', async (req, res) => {", isVulnerable: false },
    { lineNumber: 10, code: "  const { username, password } = req.body;", isVulnerable: false },
    { lineNumber: 11, code: "  // Vulnerable raw SQL string concatenation", isVulnerable: true },
    { lineNumber: 12, code: "  const query = `", isVulnerable: true },
    { lineNumber: 13, code: "    SELECT id, username, password_hash, role", isVulnerable: true },
    { lineNumber: 14, code: "    FROM users", isVulnerable: true },
    { lineNumber: 15, code: "    WHERE username = '${username}' AND password_hash = '${password}'`;", isVulnerable: true },
    { lineNumber: 16, code: "  try {", isVulnerable: false },
    { lineNumber: 17, code: "    const result = await db.query(query);", isVulnerable: false },
    { lineNumber: 18, code: "    if (result.rows.length === 0) {", isVulnerable: false },
    { lineNumber: 19, code: "      return res.status(401).json({ error: 'Invalid username or password' });", isVulnerable: false },
    { lineNumber: 20, code: "    }", isVulnerable: false }
  ],
  diffPatch: [
    { type: 'context', oldLineNumber: 9, newLineNumber: 9, content: "router.post('/login', async (req, res) => {" },
    { type: 'context', oldLineNumber: 10, newLineNumber: 10, content: "  const { username, password } = req.body;" },
    { type: 'remove', oldLineNumber: 11, content: "  // Vulnerable raw SQL string concatenation" },
    { type: 'remove', oldLineNumber: 12, content: "  const query = `" },
    { type: 'remove', oldLineNumber: 13, content: "    SELECT id, username, password_hash, role" },
    { type: 'remove', oldLineNumber: 14, content: "    FROM users" },
    { type: 'remove', oldLineNumber: 15, content: "    WHERE username = '${username}' AND password_hash = '${password}'`;" },
    { type: 'add', newLineNumber: 11, content: "  // Safe parameterized query prepared statement" },
    { type: 'add', newLineNumber: 12, content: "  const query = 'SELECT id, username, password_hash, role FROM users WHERE username = $1 AND password_hash = $2';" },
    { type: 'context', oldLineNumber: 16, newLineNumber: 13, content: "  try {" },
    { type: 'remove', oldLineNumber: 17, content: "    const result = await db.query(query);" },
    { type: 'add', newLineNumber: 14, content: "    const result = await db.query(query, [username, password]);" },
    { type: 'context', oldLineNumber: 18, newLineNumber: 15, content: "    if (result.rows.length === 0) {" },
    { type: 'context', oldLineNumber: 19, newLineNumber: 16, content: "      return res.status(401).json({ error: 'Invalid username or password' });" }
  ],
  aiTriage: {
    is_false_positive: false,
    reasoning: "The input is not sanitized before database execution, leading to SQL injection.",
    severity: "Critical"
  }
};
