import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Helper to get base64 encoded image
function getBase64Image(relativePath) {
  const fullPath = path.join(rootDir, relativePath);
  if (fs.existsSync(fullPath)) {
    const ext = path.extname(fullPath).replace('.', '');
    const mime = ext === 'png' ? 'image/png' : ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : ext === 'webp' ? 'image/webp' : 'image/svg+xml';
    const data = fs.readFileSync(fullPath).toString('base64');
    return `data:${mime};base64,${data}`;
  }
  return '';
}

const logoFormAI = getBase64Image('public/logos/formAI/1.png') || getBase64Image('public/logos/formAI/1-removebg-preview.png');
const logoMecos = getBase64Image('public/logos/colaboradores/mecos.jpg') || getBase64Image('public/logos/colaboradores/mecos.webp');
const logoFundae = getBase64Image('public/logos/colaboradores/fundae-logo.webp');

// SVG Icons
const icons = {
  ai: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>`,
  chart: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15798a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>`,
  laptop: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15798a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/></svg>`,
  rocket: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15798a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>`,
  database: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15798a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>`,
  users: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15798a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  megaphone: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15798a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>`,
  briefcase: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15798a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  receipt: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15798a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 6v12"/></svg>`,
  brain: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15798a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M12 5v13"/></svg>`,
  handshake: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15798a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2a1 1 0 0 0 1.42 0l6.58-6.59a1 1 0 0 0 0-1.41l-2.58-2.59a1 1 0 0 0-1.42 0L13 12"/><path d="m13 12-4-4a1 1 0 0 0-1.42 0L3 12.59a1 1 0 0 0 0 1.41l2.58 2.59a1 1 0 0 0 1.42 0L11 13"/><path d="m7 7 3-3a1 1 0 0 1 1.42 0l3.58 3.59a1 1 0 0 1 0 1.41L13 11"/></svg>`,
  languages: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15798a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>`,
  palette: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15798a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
  shield: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15798a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/></svg>`,
  check: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#15798a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  checkAi: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
};

const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Catálogo Oficial FormAI 2026</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Outfit:wght@500;600;700;800;900&display=swap');

    @page {
      size: A4 portrait;
      margin: 0;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #ffffff;
      color: #1e293b;
      line-height: 1.45;
      font-size: 8.5pt;
    }

    h1, h2, h3, h4, h5 {
      font-family: 'Outfit', sans-serif;
      color: #0f172a;
      font-weight: 700;
      line-height: 1.2;
    }

    .page {
      width: 210mm;
      height: 297mm;
      position: relative;
      background: #ffffff;
      page-break-after: always;
      page-break-inside: avoid;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
    }

    /* Top Decorative Header Bar */
    .top-bar {
      background: linear-gradient(135deg, #07152b 0%, #0d3846 45%, #15798a 75%, #3730a3 100%);
      color: #ffffff;
      padding: 13mm 16mm 9mm 16mm;
      position: relative;
      overflow: hidden;
      flex-shrink: 0;
    }

    .top-bar::before {
      content: '';
      position: absolute;
      top: -60px;
      right: -30px;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, transparent 70%);
      border-radius: 50%;
    }

    .top-bar-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 2;
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo-img {
      height: 38px;
      object-fit: contain;
      background: #ffffff;
      padding: 4px 10px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.18);
    }

    .logo-secondary-img {
      height: 34px;
      object-fit: contain;
      background: #ffffff;
      padding: 4px 8px;
      border-radius: 6px;
    }

    .header-badge {
      background: rgba(255, 255, 255, 0.16);
      border: 1px solid rgba(255, 255, 255, 0.35);
      backdrop-filter: blur(8px);
      color: #ffffff;
      padding: 5px 14px;
      border-radius: 20px;
      font-size: 7.5pt;
      font-weight: 700;
      letter-spacing: 0.6px;
      text-transform: uppercase;
    }

    .header-title-block {
      margin-top: 10px;
      position: relative;
      z-index: 2;
    }

    .header-title-block h1 {
      color: #ffffff;
      font-size: 19pt;
      font-weight: 800;
      letter-spacing: -0.4px;
      line-height: 1.15;
    }

    .header-title-block p {
      color: #cbd5e1;
      font-size: 8.8pt;
      margin-top: 3px;
      font-weight: 500;
    }

    /* Page Content */
    .content {
      flex: 1;
      padding: 8mm 16mm 6mm 16mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* Footer */
    .page-footer {
      padding: 3.5mm 16mm 6.5mm 16mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.2pt;
      color: #64748b;
      border-top: 1px solid #e2e8f0;
      background: #ffffff;
      flex-shrink: 0;
    }

    .page-footer strong {
      color: #15798a;
    }

    /* Card Grids */
    .cards-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }

    .card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 12px 14px;
      position: relative;
      box-shadow: 0 2px 6px rgba(0,0,0,0.02);
    }

    .card-accent {
      border-left: 4px solid #15798a;
      background: #ffffff;
    }

    .card-ai {
      border-left: 4px solid #4f46e5;
      background: #ffffff;
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      padding-bottom: 6px;
      border-bottom: 1px solid #f1f5f9;
    }

    .card-icon {
      width: 26px;
      height: 26px;
      border-radius: 7px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #e6f7f9;
      flex-shrink: 0;
    }

    .card-icon.ai {
      background: #e0e7ff;
    }

    .card-title {
      font-size: 9.5pt;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.2;
    }

    .card-subtitle {
      font-size: 7pt;
      font-weight: 600;
      color: #15798a;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      margin-top: 1px;
    }

    .course-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 5.5px;
    }

    .course-list li {
      font-size: 7.8pt;
      color: #334155;
      display: flex;
      align-items: flex-start;
      line-height: 1.35;
    }

    .bullet-dot {
      margin-right: 6px;
      margin-top: 3px;
      flex-shrink: 0;
      display: inline-flex;
    }

    .course-item-title {
      font-weight: 700;
      color: #0f172a;
    }

    .course-item-desc {
      color: #475569;
    }

    /* Callout Banner */
    .cta-banner {
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
      border: 1px solid #86efac;
      border-radius: 10px;
      padding: 11px 16px;
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .cta-banner-text h4 {
      color: #166534;
      font-size: 9pt;
      margin-bottom: 2px;
    }

    .cta-banner-text p {
      color: #15803d;
      font-size: 7.8pt;
    }

    .cta-btn-box {
      background: #15798a;
      color: #ffffff;
      font-weight: 700;
      font-size: 7.8pt;
      padding: 6px 14px;
      border-radius: 6px;
      white-space: nowrap;
      text-align: center;
    }

    /* Pricing Table */
    .price-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin-top: 6px;
      margin-bottom: 10px;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #cbd5e1;
    }

    .price-table th {
      background: #0f172a;
      color: #ffffff;
      font-size: 7.8pt;
      font-weight: 700;
      text-transform: uppercase;
      padding: 8px 12px;
      text-align: left;
      letter-spacing: 0.4px;
    }

    .price-table td {
      padding: 9px 12px;
      font-size: 7.8pt;
      border-bottom: 1px solid #e2e8f0;
      background: #ffffff;
    }

    .price-table tr:last-child td {
      border-bottom: none;
    }

    .price-table tr:nth-child(even) td {
      background: #f8fafc;
    }

    .price-tag {
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      color: #15798a;
      font-size: 10pt;
    }

    .badge-pill {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 6.8pt;
      font-weight: 700;
      text-transform: uppercase;
    }

    .badge-fundae {
      background: #e0f2fe;
      color: #0369a1;
      border: 1px solid #bae6fd;
    }

    .badge-custom {
      background: #fef3c7;
      color: #b45309;
      border: 1px solid #fde68a;
    }

    .fundae-highlight-box {
      background: linear-gradient(135deg, #e6f7f9 0%, #e0e7ff 100%);
      border: 1px solid #99f6e4;
      border-radius: 10px;
      padding: 11px 15px;
      margin: 8px 0;
    }

    .fundae-highlight-box h3 {
      font-size: 9.5pt;
      color: #0f172a;
      margin-bottom: 3px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .fundae-highlight-box p {
      font-size: 7.8pt;
      color: #334155;
      line-height: 1.4;
    }

    .factors-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
      margin-top: 6px;
    }

    .factor-item {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 8px 10px;
    }

    .factor-item strong {
      font-size: 7.8pt;
      color: #0f172a;
      display: block;
      margin-bottom: 2px;
    }

    .factor-item p {
      font-size: 7pt;
      color: #475569;
      line-height: 1.3;
    }

    .section-divider {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 8px 0 6px 0;
    }

    .section-divider-title {
      font-size: 9.5pt;
      font-weight: 800;
      color: #0f172a;
      white-space: nowrap;
    }

    .section-divider-line {
      height: 1px;
      background: #cbd5e1;
      width: 100%;
    }

    .steps-box {
      background: #09203f;
      color: #ffffff;
      border-radius: 10px;
      padding: 10px 14px;
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .steps-box h4 {
      color: #ffffff;
      font-size: 8.5pt;
      margin-bottom: 2px;
    }

    .steps-box p {
      color: #94a3b8;
      font-size: 7.2pt;
    }

    .step-badge {
      background: #15798a;
      color: #ffffff;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 6.8pt;
      font-weight: bold;
      margin-right: 3px;
    }
  </style>
</head>
<body>

  <!-- ==================== PÁGINA 1: PORTADA & CURSOS ESPECIALIZADOS ==================== -->
  <div class="page">
    <div class="top-bar">
      <div class="top-bar-inner">
        <div class="logo-container">
          <img src="${logoFormAI}" class="logo-img" alt="FormAI">
          <img src="${logoMecos}" class="logo-secondary-img" alt="Mecos">
        </div>
        <div class="header-badge">Catálogo Oficial 2026</div>
      </div>
      <div class="header-title-block">
        <h1>Cursos Especializados & Bonificados</h1>
        <p>Potencia tus habilidades digitales con formación bonificada al 100% por FUNDAE para empresas</p>
      </div>
    </div>

    <div class="content">
      <div style="margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="font-size: 7.2pt; font-weight: 700; color: #15798a; text-transform: uppercase; letter-spacing: 0.5px;">Especialidades Más Demandadas</span>
          <h2 style="font-size: 11.5pt; font-weight: 800; color: #0f172a;">Programas Formativos de Alto Rendimiento</h2>
        </div>
        <span class="badge-pill badge-fundae">100% Bonificable FUNDAE</span>
      </div>

      <div class="cards-grid-2">
        
        <!-- Inteligencia Artificial -->
        <div class="card card-ai">
          <div class="card-header">
            <div class="card-icon ai">${icons.ai}</div>
            <div>
              <div class="card-title">Inteligencia Artificial (IA)</div>
              <div class="card-subtitle" style="color: #4f46e5;">Productividad & Automatización Cognitiva</div>
            </div>
          </div>
          <ul class="course-list">
            <li>
              <span class="bullet-dot">${icons.checkAi}</span>
              <div><span class="course-item-title">ChatGPT & LLMs:</span> <span class="course-item-desc">Aplicado al trabajo diario, análisis y redacción corporativa</span></div>
            </li>
            <li>
              <span class="bullet-dot">${icons.checkAi}</span>
              <div><span class="course-item-title">Google Gemini & NotebookLM:</span> <span class="course-item-desc">Gestión de fuentes y síntesis documental inteligente</span></div>
            </li>
            <li>
              <span class="bullet-dot">${icons.checkAi}</span>
              <div><span class="course-item-title">Microsoft Copilot 365:</span> <span class="course-item-desc">Integración en Teams, Excel, Word, PowerPoint y Outlook</span></div>
            </li>
            <li>
              <span class="bullet-dot">${icons.checkAi}</span>
              <div><span class="course-item-title">Generación de Medios:</span> <span class="course-item-desc">Creación de creatividades, imagen y vídeo con IA</span></div>
            </li>
          </ul>
        </div>

        <!-- Business Intelligence -->
        <div class="card card-accent">
          <div class="card-header">
            <div class="card-icon">${icons.chart}</div>
            <div>
              <div class="card-title">Business Intelligence (BI)</div>
              <div class="card-subtitle">Análisis, Datos y Toma de Decisiones</div>
            </div>
          </div>
          <ul class="course-list">
            <li>
              <span class="bullet-dot">${icons.check}</span>
              <div><span class="course-item-title">Microsoft Power BI:</span> <span class="course-item-desc">Modelado DAX, Power Query y Dashboards ejecutivos</span></div>
            </li>
            <li>
              <span class="bullet-dot">${icons.check}</span>
              <div><span class="course-item-title">Looker Studio:</span> <span class="course-item-desc">Conexión de fuentes Google y reporting automatizado</span></div>
            </li>
            <li>
              <span class="bullet-dot">${icons.check}</span>
              <div><span class="course-item-title">Tableau Software:</span> <span class="course-item-desc">Visualización avanzada y exploración de macrodatos</span></div>
            </li>
            <li>
              <span class="bullet-dot">${icons.check}</span>
              <div><span class="course-item-title">Analítica & Data Storytelling:</span> <span class="course-item-desc">Comunicación visual de métricas de impacto</span></div>
            </li>
          </ul>
        </div>

        <!-- Ofimática Microsoft / Google -->
        <div class="card card-accent">
          <div class="card-header">
            <div class="card-icon">${icons.laptop}</div>
            <div>
              <div class="card-title">Office Microsoft / Google</div>
              <div class="card-subtitle">Entornos Colaborativos y Gestión Documental</div>
            </div>
          </div>
          <ul class="course-list">
            <li>
              <span class="bullet-dot">${icons.check}</span>
              <div><span class="course-item-title">Microsoft 365 Colaborativo:</span> <span class="course-item-desc">OneDrive, Teams, Outlook, Planner, Forms</span></div>
            </li>
            <li>
              <span class="bullet-dot">${icons.check}</span>
              <div><span class="course-item-title">Google Workspace Pro:</span> <span class="course-item-desc">Gmail, Drive corporativo, Calendar y Meet</span></div>
            </li>
            <li>
              <span class="bullet-dot">${icons.check}</span>
              <div><span class="course-item-title">Excel Profesional:</span> <span class="course-item-desc">Tablas dinámicas, fórmulas avanzadas y Power Pivot</span></div>
            </li>
            <li>
              <span class="bullet-dot">${icons.check}</span>
              <div><span class="course-item-title">PowerPoint & Word Avanzado:</span> <span class="course-item-desc">Informes ejecutivos y presentaciones de alto nivel</span></div>
            </li>
          </ul>
        </div>

        <!-- Marketing Digital & Automatización -->
        <div class="card card-accent">
          <div class="card-header">
            <div class="card-icon">${icons.rocket}</div>
            <div>
              <div class="card-title">Productividad, Automatización & Marketing</div>
              <div class="card-subtitle">Optimización de Procesos de Negocio</div>
            </div>
          </div>
          <ul class="course-list">
            <li>
              <span class="bullet-dot">${icons.check}</span>
              <div><span class="course-item-title">Microsoft Power Automate:</span> <span class="course-item-desc">Automatización de flujos y tareas repetitivas</span></div>
            </li>
            <li>
              <span class="bullet-dot">${icons.check}</span>
              <div><span class="course-item-title">Google Analytics 4 (GA4):</span> <span class="course-item-desc">Medición de eventos, conversiones y funnels</span></div>
            </li>
            <li>
              <span class="bullet-dot">${icons.check}</span>
              <div><span class="course-item-title">Creación Web con WordPress:</span> <span class="course-item-desc">Gestión de portales y páginas de captación</span></div>
            </li>
            <li>
              <span class="bullet-dot">${icons.check}</span>
              <div><span class="course-item-title">Software de Gestión & Tiempo:</span> <span class="course-item-desc">Notion, Trello, Asana, Outlook Tasks</span></div>
            </li>
          </ul>
        </div>

      </div>

      <!-- Banner Inferior -->
      <div class="cta-banner">
        <div class="cta-banner-text">
          <h4>¿Necesitas un temario a medida para tu empresa?</h4>
          <p>Adaptamos los módulos y casos prácticos a los archivos reales y herramientas de tu negocio.</p>
        </div>
        <div class="cta-btn-box">formai.es &bull; info@formai.es</div>
      </div>
    </div>

    <div class="page-footer">
      <div><strong>FormAI</strong> &bull; Formación Bonificada para Empresas</div>
      <div>Página 1 de 5</div>
      <div>www.formai.es</div>
    </div>
  </div>


  <!-- ==================== PÁGINA 2: PRECIOS, MODALIDADES & BONIFICACIÓN ==================== -->
  <div class="page">
    <div class="top-bar">
      <div class="top-bar-inner">
        <div class="logo-container">
          <img src="${logoFormAI}" class="logo-img" alt="FormAI">
          <img src="${logoMecos}" class="logo-secondary-img" alt="Mecos">
        </div>
        <div class="header-badge">Modalidades & Tarifas</div>
      </div>
      <div class="header-title-block">
        <h1>Propuesta de Precios y Modalidades</h1>
        <p>Flexibilidad total adaptada a tu equipo: cálculo de coste y bonificación 100% FUNDAE</p>
      </div>
    </div>

    <div class="content">
      <div>
        <p style="font-size: 8.2pt; color: #475569; margin-bottom: 6px;">
          En <strong>FormAI</strong> adaptamos cada plan formativo a la realidad de tu empresa. El coste final se define según la modalidad seleccionada, el número de participantes y el grado de personalización del contenido.
        </p>

        <table class="price-table">
          <thead>
            <tr>
              <th style="width: 25%;">Modalidad</th>
              <th style="width: 50%;">Descripción y Formato</th>
              <th style="width: 25%;">Rango Orientativo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Virtual en Directo</strong>
                <div style="font-size: 6.8pt; color: #15798a; font-weight: 600;">Aula Virtual Interactiva</div>
              </td>
              <td>Sesiones por videoconferencia con instructor en tiempo real. Máxima flexibilidad, resolución de dudas en directo y acceso a grabaciones y material de apoyo.</td>
              <td><span class="price-tag">Desde 55€</span> <span style="font-size: 7.2pt; color: #64748b;">/ hora</span></td>
            </tr>
            <tr>
              <td>
                <strong>Presencial (In-Company)</strong>
                <div style="font-size: 6.8pt; color: #15798a; font-weight: 600;">En tus oficinas o aulas concertadas</div>
              </td>
              <td>Formación presencial en las instalaciones del cliente o centros formativos concertados en toda España. Interacción directa y dinámicas de grupo.</td>
              <td><span class="price-tag">Desde 65€</span> <span style="font-size: 7.2pt; color: #64748b;">/ hora</span></td>
            </tr>
            <tr>
              <td>
                <strong>Bootcamps Intensivos</strong>
                <div style="font-size: 6.8pt; color: #15798a; font-weight: 600;">Proyectos & Sprint Formativo</div>
              </td>
              <td>Formaciones de alto impacto enfocadas a la resolución de retos específicos de la empresa o aceleración en adopción de nuevas tecnologías.</td>
              <td><span class="badge-pill badge-custom">A Consultar</span></td>
            </tr>
          </tbody>
        </table>

        <!-- Highlight Bonificación 0€ -->
        <div class="fundae-highlight-box">
          <h3>💡 ¿Sabías que tu formación puede salirte a coste 0€?</h3>
          <p>
            Generalmente, a partir de <strong>7 a 8 empleados</strong>, las formaciones quedan <strong>100% bonificadas</strong> mediante el crédito formativo anual de la Seguridad Social (FUNDAE). En <strong>FormAI gestionamos gratuitamente todo el trámite</strong> ante la administración para que tu empresa no tenga que dedicar tiempo a la burocracia.
          </p>
        </div>

        <!-- Factores que influyen -->
        <div class="section-divider">
          <span class="section-divider-title">🛠️ Factores que Influyen en el Presupuesto</span>
          <div class="section-divider-line"></div>
        </div>

        <div class="factors-grid">
          <div class="factor-item">
            <strong>1. Número de Alumnos</strong>
            <p>Descuentos progresivos por volumen de asistentes y grupos simultáneos.</p>
          </div>
          <div class="factor-item">
            <strong>2. Especialización</strong>
            <p>Materias técnicas o de IA de vanguardia adaptadas a las competencias del equipo.</p>
          </div>
          <div class="factor-item">
            <strong>3. Personalización</strong>
            <p>Adaptamos los ejercicios a los archivos, bases de datos y flujos de trabajo de tu día a día.</p>
          </div>
        </div>
      </div>

      <!-- Cómo solicitar presupuesto -->
      <div class="steps-box">
        <div>
          <h4>📝 ¿Cómo solicitar un presupuesto cerrado sin compromiso?</h4>
          <p style="margin-top: 3px;">
            <span class="step-badge">1</span> Indica área de interés &nbsp;&bull;&nbsp;
            <span class="step-badge">2</span> N&ordm; de participantes &nbsp;&bull;&nbsp;
            <span class="step-badge">3</span> Modalidad preferida
          </p>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 7.2pt; color: #38bdf8; font-weight: 700;">Respuesta en &lt; 24 horas</div>
          <div style="font-size: 7.2pt; color: #ffffff;">formai.es &bull; info@formai.es</div>
        </div>
      </div>

    </div>

    <div class="page-footer">
      <div><strong>FormAI</strong> &bull; Formación Bonificada para Empresas</div>
      <div>Página 2 de 5</div>
      <div>www.formai.es</div>
    </div>
  </div>


  <!-- ==================== PÁGINA 3: CATÁLOGO COMPLETO - PARTE 1 ==================== -->
  <div class="page">
    <div class="top-bar">
      <div class="top-bar-inner">
        <div class="logo-container">
          <img src="${logoFormAI}" class="logo-img" alt="FormAI">
          <img src="${logoMecos}" class="logo-secondary-img" alt="Mecos">
        </div>
        <div class="header-badge">Catálogo Completo</div>
      </div>
      <div class="header-title-block">
        <h1>Catálogo de Cursos & Especialidades</h1>
        <p>Programas bonificables en modalidad Virtual en Directo y Presencial (In-Company)</p>
      </div>
    </div>

    <div class="content">
      <div class="cards-grid-2">

        <!-- Columna 1 -->
        <div style="display: flex; flex-direction: column; gap: 11px;">
          
          <!-- Ofimática & Diseño -->
          <div class="card card-accent">
            <div class="card-header">
              <div class="card-icon">${icons.laptop}</div>
              <div>
                <div class="card-title">Ofimática & Diseño Editorial</div>
                <div class="card-subtitle">Modalidad: Virtual / Presencial</div>
              </div>
            </div>
            <ul class="course-list">
              <li><span class="bullet-dot">${icons.check}</span><span>Excel (todos los niveles: Básico, Intermedio, Avanzado)</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Excel 365 & Fórmulas Matriciales Dinámicas</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Microsoft Word & Informes Corporativos</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Microsoft Access & Gestión de Tablas Relacionales</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Microsoft PowerPoint para Presentaciones Ejecutivas</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Microsoft Outlook & Productividad en el Correo</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Google Workspace (Gmail, Drive, Meet, Docs)</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Google Sheets (Hojas de cálculo colaborativas)</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Microsoft 365 Colaborativo (Teams, Planner, Forms)</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Adobe Photoshop (Retoque y Creatividad)</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Adobe Illustrator (Diseño Vectorial Corporativo)</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Adobe InDesign (Maquetación y Publicaciones)</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>WordPress (Creación y Gestión Web)</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Sistemas Operativos: Windows 10/11, Linux, macOS</span></li>
            </ul>
          </div>

          <!-- Bases de Datos & Big Data -->
          <div class="card card-accent">
            <div class="card-header">
              <div class="card-icon">${icons.database}</div>
              <div>
                <div class="card-title">Gestión de Bases de Datos & Big Data</div>
                <div class="card-subtitle">Modalidad: Virtual / Presencial</div>
              </div>
            </div>
            <ul class="course-list">
              <li><span class="bullet-dot">${icons.check}</span><span>Introducción a Big Data & Data Analytics</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Big Data aplicado a Excel y Power Pivot</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Arquitectura y Modelado de Bases de Datos</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Fusión, Limpieza y Transformación de Datos</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Microsoft SQL Server & Transact-SQL</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Lenguaje SQL para Consultas y Extracción</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Programación con C# .NET para Datos</span></li>
            </ul>
          </div>

        </div>

        <!-- Columna 2 -->
        <div style="display: flex; flex-direction: column; gap: 11px;">
          
          <!-- Programación & BI -->
          <div class="card card-accent">
            <div class="card-header">
              <div class="card-icon">${icons.chart}</div>
              <div>
                <div class="card-title">Programación & Business Intelligence</div>
                <div class="card-subtitle">Modalidad: Virtual / Presencial</div>
              </div>
            </div>
            <ul class="course-list">
              <li><span class="bullet-dot">${icons.check}</span><span>Microsoft Power BI Profesional (DAX & Power Query)</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Looker Studio (Google Data Studio) & Conectores</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Tableau Desktop & Dashboards Interactivos</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Analítica de Negocio & Data Storytelling</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Microsoft Power Platform (Apps, Automate, Virtual Agents)</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Dynamics 365 Sales, Customer Service & Customización</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>VBA Excel & Grabador de Macros Avanzado</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>VBA Access & Integración entre Apps Office</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Google Cloud Engineer & Fundamentos Cloud</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Visual Basic .NET & Visual C++ .NET</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>SharePoint Corporativo (Gestión y Flujos)</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Click Dimensions para Marketing Automation</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Ecosistema Microsoft 365 & Servicios Cloud</span></li>
            </ul>
          </div>

          <!-- RRHH & Igualdad -->
          <div class="card card-accent">
            <div class="card-header">
              <div class="card-icon">${icons.users}</div>
              <div>
                <div class="card-title">Recursos Humanos, Igualdad & RGPD</div>
                <div class="card-subtitle">Modalidad: Virtual / Presencial</div>
              </div>
            </div>
            <ul class="course-list">
              <li><span class="bullet-dot">${icons.check}</span><span>HR Agile Recruiting & Gestión del Talento</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Conceptos Básicos de Igualdad y Prevención de Acoso</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Desarrollo e Implantación de Protocolo de Acoso Laboral</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Planes de Igualdad y Registro Oficial en REGCON</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Formación en Promoción de Igualdad en la Empresa</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Registro Retributivo y Auditoría Salarial Obligatoria</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Implantación de Protección de Datos según RGPD</span></li>
            </ul>
          </div>

        </div>

      </div>
    </div>

    <div class="page-footer">
      <div><strong>FormAI</strong> &bull; Formación Bonificada para Empresas</div>
      <div>Página 3 de 5</div>
      <div>www.formai.es</div>
    </div>
  </div>


  <!-- ==================== PÁGINA 4: CATÁLOGO COMPLETO - PARTE 2 ==================== -->
  <div class="page">
    <div class="top-bar">
      <div class="top-bar-inner">
        <div class="logo-container">
          <img src="${logoFormAI}" class="logo-img" alt="FormAI">
          <img src="${logoMecos}" class="logo-secondary-img" alt="Mecos">
        </div>
        <div class="header-badge">Catálogo Completo</div>
      </div>
      <div class="header-title-block">
        <h1>Marketing, Ventas, Gestión & Habilidades</h1>
        <p>Desarrollo competencial integral para equipos técnicos, comerciales y directivos</p>
      </div>
    </div>

    <div class="content">
      <div class="cards-grid-2">

        <!-- Columna 1 -->
        <div style="display: flex; flex-direction: column; gap: 11px;">
          
          <!-- Marketing Digital & Publicidad -->
          <div class="card card-accent">
            <div class="card-header">
              <div class="card-icon">${icons.megaphone}</div>
              <div>
                <div class="card-title">Marketing Digital & Publicidad</div>
                <div class="card-subtitle">Modalidad: Virtual / Presencial</div>
              </div>
            </div>
            <ul class="course-list">
              <li><span class="bullet-dot">${icons.check}</span><span>Google Analytics 4 (GA4): Medición y Eventos</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Bootcamp de Publicidad Programática (DSP, SSP)</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Data Driven Marketing (Google Ads, Meta Ads)</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Data Management Platform (DMP en Salesforce)</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Python for Data & Marketing (Sin experiencia previa)</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Modelos de Atribución en Marketing (Eulerian)</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Contenido y Publicidad Estratégica en Redes Sociales</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Visualización de Datos con Looker Studio</span></li>
            </ul>
          </div>

          <!-- Marketing y Ventas -->
          <div class="card card-accent">
            <div class="card-header">
              <div class="card-icon">${icons.briefcase}</div>
              <div>
                <div class="card-title">Marketing, Ventas & Compras</div>
                <div class="card-subtitle">Modalidad: Virtual / Presencial</div>
              </div>
            </div>
            <ul class="course-list">
              <li><span class="bullet-dot">${icons.check}</span><span>Administración y Gestión Comercial Eficaz</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Técnicas de Venta en Corredurías y Aseguradoras</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Atención al Cliente y Excelencia en el Servicio</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Técnicas de Negociación y Cierre de Ventas</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Telemarketing Moderno y Prospección Digital</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Innovación y Tecnología de Compras (Procure Tech)</span></li>
            </ul>
          </div>

          <!-- TIC & Ofimática Esencial -->
          <div class="card card-accent">
            <div class="card-header">
              <div class="card-icon">${icons.laptop}</div>
              <div>
                <div class="card-title">Nuevas Tecnologías TIC</div>
                <div class="card-subtitle">Modalidad: Virtual / Presencial</div>
              </div>
            </div>
            <ul class="course-list">
              <li><span class="bullet-dot">${icons.check}</span><span>Informática Esencial y Seguridad Digital para Oficinas</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Gestiones Comerciales y Procesos Administrativos</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Herramientas de Comunicación y Trabajo en Remoto</span></li>
            </ul>
          </div>

        </div>

        <!-- Columna 2 -->
        <div style="display: flex; flex-direction: column; gap: 11px;">
          
          <!-- Gestión y Administración -->
          <div class="card card-accent">
            <div class="card-header">
              <div class="card-icon">${icons.receipt}</div>
              <div>
                <div class="card-title">Gestión, Contabilidad & Administración</div>
                <div class="card-subtitle">Modalidad: Virtual / Presencial</div>
              </div>
            </div>
            <ul class="course-list">
              <li><span class="bullet-dot">${icons.check}</span><span>Contabilidad General y Financiera (Todos los niveles)</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Actualización Contable y Cierre Fiscal</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Gestión de Acreedores, Deudores y Tesorería</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Facturación, Almacén y Gestión de Stocks</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Nóminas, Contratos y Cotizaciones a Seguridad Social</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Gestión y Archivo Informatizado en la Oficina</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Conocimientos Esenciales para Puestos de Oficina</span></li>
            </ul>
          </div>

          <!-- Habilidades Empresariales & Liderazgo -->
          <div class="card card-accent">
            <div class="card-header">
              <div class="card-icon">${icons.brain}</div>
              <div>
                <div class="card-title">Habilidades Empresariales & Liderazgo</div>
                <div class="card-subtitle">Modalidad: Virtual / Presencial</div>
              </div>
            </div>
            <ul class="course-list">
              <li><span class="bullet-dot">${icons.check}</span><span>Gestión de Proyectos en Entornos Híbridos y Remotos</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Customer Relationship Management (CRM) Avanzado</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Dirección, Motivación y Cohesión de Equipos</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Fundamentos del Liderazgo y Habilidades Directivas</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Gestión Eficaz de Reuniones y Dinámicas de Grupo</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Diseño de Planes de Negocio y Estrategia Corporativa</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Presentaciones Orales Eficaces y Persuasivas</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Técnicas de Negociación Estratégica</span></li>
            </ul>
          </div>

        </div>

      </div>
    </div>

    <div class="page-footer">
      <div><strong>FormAI</strong> &bull; Formación Bonificada para Empresas</div>
      <div>Página 4 de 5</div>
      <div>www.formai.es</div>
    </div>
  </div>


  <!-- ==================== PÁGINA 5: SOFT SKILLS, IDIOMAS & CONTACTO ==================== -->
  <div class="page">
    <div class="top-bar">
      <div class="top-bar-inner">
        <div class="logo-container">
          <img src="${logoFormAI}" class="logo-img" alt="FormAI">
          <img src="${logoMecos}" class="logo-secondary-img" alt="Mecos">
        </div>
        <div class="header-badge">Soft Skills & Contacto</div>
      </div>
      <div class="header-title-block">
        <h1>Habilidades Blandas, Idiomas & Contacto</h1>
        <p>Impulsa la comunicación, el bienestar del equipo y solicita tu plan formativo 2026</p>
      </div>
    </div>

    <div class="content">
      <div class="cards-grid-2">

        <!-- Habilidades Blandas -->
        <div class="card card-accent">
          <div class="card-header">
            <div class="card-icon">${icons.handshake}</div>
            <div>
              <div class="card-title">Habilidades Blandas (Soft Skills)</div>
              <div class="card-subtitle">Modalidad: Virtual / Presencial</div>
            </div>
          </div>
          <ul class="course-list">
            <li><span class="bullet-dot">${icons.check}</span><span>Estrategia Digital Centrada en las Personas</span></li>
            <li><span class="bullet-dot">${icons.check}</span><span>Gestión Eficaz del Tiempo y Productividad Personal</span></li>
            <li><span class="bullet-dot">${icons.check}</span><span>Marca Personal y Reputación Profesional</span></li>
            <li><span class="bullet-dot">${icons.check}</span><span>Facilitación y Gestión del Cambio Organizacional</span></li>
            <li><span class="bullet-dot">${icons.check}</span><span>Feedback en Clave VUCA y Equipos de Alto Rendimiento</span></li>
            <li><span class="bullet-dot">${icons.check}</span><span>Feedback Asertivo para Managers y Mandos Intermedios</span></li>
            <li><span class="bullet-dot">${icons.check}</span><span>Feedback Asertivo para Empleados y Colaboradores</span></li>
            <li><span class="bullet-dot">${icons.check}</span><span>Mediación y Resolución Positiva de Conflictos</span></li>
            <li><span class="bullet-dot">${icons.check}</span><span>Liderazgo Híbrido y Gestión de la Confianza</span></li>
          </ul>
        </div>

        <!-- Idiomas & Diseño Editorial -->
        <div style="display: flex; flex-direction: column; gap: 11px;">
          
          <!-- Idiomas -->
          <div class="card card-accent">
            <div class="card-header">
              <div class="card-icon">${icons.languages}</div>
              <div>
                <div class="card-title">Inglés Profesional para Empresas</div>
                <div class="card-subtitle">Modalidad: Virtual / Presencial</div>
              </div>
            </div>
            <ul class="course-list">
              <li><span class="bullet-dot">${icons.check}</span><span>Inglés Comercial & Business English (Nivel Básico A1-A2)</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Inglés Intermedio para Reuniones y Emails (B1-B2)</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Inglés Avanzado, Negociación y Presentaciones (C1-C2)</span></li>
            </ul>
          </div>

          <!-- Retoque Fotográfico & Diseño -->
          <div class="card card-accent">
            <div class="card-header">
              <div class="card-icon">${icons.palette}</div>
              <div>
                <div class="card-title">Retoque & Diseño Editorial</div>
                <div class="card-subtitle">Modalidad: Virtual</div>
              </div>
            </div>
            <ul class="course-list">
              <li><span class="bullet-dot">${icons.check}</span><span>Adobe Photoshop (Edición fotográfica profesional)</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Adobe Illustrator (Identidad de marca y vectores)</span></li>
              <li><span class="bullet-dot">${icons.check}</span><span>Adobe InDesign (Publicaciones editoriales y folletos)</span></li>
            </ul>
          </div>

        </div>

      </div>

      <!-- Contact Box / Formal CTA -->
      <div style="background: linear-gradient(135deg, #09203f 0%, #15798a 100%); color: #ffffff; border-radius: 12px; padding: 18px 20px; margin-top: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
          <div>
            <span style="font-size: 7.2pt; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.5px;">Comienza Hoy Mismo</span>
            <h3 style="font-size: 12.5pt; color: #ffffff; font-weight: 800; margin-top: 2px;">¿Quieres bonificar la formación de tu equipo?</h3>
            <p style="color: #cbd5e1; font-size: 8pt; margin-top: 3px; max-width: 460px;">
              Contáctanos y calculamos gratuitamente el crédito formativo disponible de tu empresa. Te enviamos una propuesta formal personalizada en menos de 24 horas.
            </p>
          </div>
          <div style="background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.25); border-radius: 8px; padding: 10px 16px; text-align: right;">
            <div style="font-size: 7.5pt; color: #94a3b8;">Sitio Web Oficial:</div>
            <div style="font-size: 10.5pt; font-weight: 800; color: #38bdf8; margin-bottom: 2px;">formai.es</div>
            <div style="font-size: 7.5pt; color: #ffffff;">Email: <strong>info@formai.es</strong></div>
          </div>
        </div>
      </div>

    </div>

    <div class="page-footer">
      <div><strong>FormAI</strong> &bull; Formación Bonificada para Empresas</div>
      <div>Página 5 de 5</div>
      <div>www.formai.es</div>
    </div>
  </div>

</body>
</html>
`;

// Write HTML
const htmlPath = path.join(rootDir, 'scripts', 'temp_catalogo.html');
fs.writeFileSync(htmlPath, htmlContent, 'utf-8');

// Render to PDF using Chrome Headless
const outputPath = path.join(rootDir, 'public', 'catalogo-formai-2026.pdf');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

console.log('Generating PDF using Chrome headless...');
try {
  execSync(`"${chromePath}" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${outputPath}" "file://${htmlPath.replace(/\\\\/g, '/')}"`);
  console.log(`PDF successfully generated at: ${outputPath}`);
  // Also copy to dist if dist exists
  const distDir = path.join(rootDir, 'dist');
  if (fs.existsSync(distDir)) {
    fs.copyFileSync(outputPath, path.join(distDir, 'catalogo-formai-2026.pdf'));
    console.log(`PDF copied to dist/catalogo-formai-2026.pdf`);
  }
} catch (error) {
  console.error('Error generating PDF:', error);
  process.exit(1);
}
