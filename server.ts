import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

// API health check endpoint for Cloud Run
app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'fermor-applet', timestamp: new Date().toISOString() });
});

// Serve static files from production build directory
app.use(express.static(path.join(__dirname, 'dist')));

// SPA routing fallback
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Fermor production server listening on http://0.0.0.0:${port}`);
});
