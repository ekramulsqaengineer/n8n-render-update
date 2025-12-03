import fetch from "node-fetch";
import fs from "fs";

const N8N_URL = process.env.N8N_URL;
const API_KEY = process.env.N8N_API_KEY;
const BACKUP_DIR = "./backups";

if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR);

async function backupWorkflows() {
  console.log("Starting workflow backup...");

  const res = await fetch(`${N8N_URL}/api/v1/workflows`, {
    headers: { "X-N8N-API-KEY": API_KEY },
  });

  const workflows = await res.json();

  const filename = `${BACKUP_DIR}/workflows-${Date.now()}.json`;
  fs.writeFileSync(filename, JSON.stringify(workflows, null, 2));

  console.log("Backup completed:", filename);
}

backupWorkflows();
