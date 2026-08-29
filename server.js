const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Basic Express Middleware
app.use(cors({
  origin: '*', // Allow requests from Next.js frontend (default port 3000)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-GitHub-Event', 'X-Hub-Signature-256']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'Sentinel SAST API Scaffolding',
    timestamp: new Date().toISOString()
  });
});

/**
 * Mock Webhook Ingestion Endpoint
 * POST /api/webhooks/github
 * Simply logs incoming payloads from GitHub VCS
 */
app.post('/api/webhooks/github', (req, res) => {
  const event = req.headers['x-github-event'] || 'push';
  const deliveryId = req.headers['x-github-delivery'] || 'local-mock-delivery';

  console.log('\n========================================');
  console.log(`[GitHub Webhook Ingestion] Event: ${event} (Delivery: ${deliveryId})`);
  console.log('Incoming Payload:');
  console.dir(req.body, { depth: null, colors: true });
  console.log('========================================\n');

  res.status(200).json({
    status: 'received',
    message: 'GitHub webhook successfully ingested',
    event,
    receivedAt: new Date().toISOString()
  });
});

/**
 * Mock LLM Triage Endpoint
 * POST /api/scan/triage
 * Returns the exact hardcoded JSON structure required by the specification
 */
app.post('/api/scan/triage', (req, res) => {
  console.log('\n----------------------------------------');
  console.log('[LLM Triage Endpoint] Triage requested for payload:');
  console.dir(req.body, { depth: null, colors: true });

  const triageResult = {
    "is_false_positive": false,
    "reasoning": "The input is not sanitized before database execution, leading to SQL injection.",
    "severity": "Critical"
  };

  console.log('[LLM Triage Endpoint] Returning hardcoded triage verdict:');
  console.dir(triageResult, { colors: true });
  console.log('----------------------------------------\n');

  res.status(200).json(triageResult);
});

// Server Initialization
app.listen(PORT, () => {
  console.log(`\n🛡️  Sentinel SAST Backend Scaffolding is running on http://localhost:${PORT}`);
  console.log(`📡 GitHub Webhook Endpoint: POST http://localhost:${PORT}/api/webhooks/github`);
  console.log(`🤖 LLM Triage Endpoint:    POST http://localhost:${PORT}/api/scan/triage\n`);
});

module.exports = app;
