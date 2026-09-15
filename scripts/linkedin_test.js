import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env manually
function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env');
  if (!fs.existsSync(envPath)) return {};
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...rest] = trimmed.split('=');
    env[key.trim()] = rest.join('=').trim();
  }
  return env;
}

const env = loadEnv();
const TOKEN = env.LINKEDIN_ACCESS_TOKEN;
const ORG_ID = env.LINKEDIN_ORGANIZATION_ID || '136067374';

async function checkUserInfo() {
  console.log('--- Comprobando Token de LinkedIn ---');
  
  // 1. User Info (OpenID Connect)
  try {
    const userRes = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: { Authorization: `Bearer ${TOKEN}` }
    });
    const userData = await userRes.json();
    console.log('\n[1] Usuario autenticado:', userData);
  } catch (err) {
    console.error('Error al obtener userinfo:', err);
  }

  // 2. Organization Info / Permissions
  try {
    const orgRes = await fetch(`https://api.linkedin.com/v2/organizations/${ORG_ID}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    const orgData = await orgRes.json();
    console.log(`\n[2] Datos Organización (${ORG_ID}):`, orgData);
  } catch (err) {
    console.error('Error al obtener org info:', err);
  }

  // 3. Organization ACLs (roles del usuario en la empresa)
  try {
    const aclRes = await fetch(`https://api.linkedin.com/v2/organizationalEntityAcls?q=roleAssignee`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    const aclData = await aclRes.json();
    console.log('\n[3] Permisos de Administrador en Organizaciones:', JSON.stringify(aclData, null, 2));
  } catch (err) {
    console.error('Error al obtener ACLs:', err);
  }
}

checkUserInfo();
