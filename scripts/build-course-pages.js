// Genera páginas estáticas SEO + GEO en dist/cursos/<slug>/index.html (y el índice /cursos/).
// Se ejecuta tras vite build + prerender. Datos en src/data/courseLandings.js.
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { courseLandings, SITE_URL } = await import(pathToFileURL(path.join(root, 'src/data/courseLandings.js')).href);
const dist = path.join(root, 'dist');
if (!fs.existsSync(dist)) { console.error('dist/ no existe. Ejecuta vite build primero.'); process.exit(1); }

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c');
const bySlug = Object.fromEntries(courseLandings.map((c) => [c.slug, c]));
const today = new Date().toISOString().slice(0, 10);

const CSS = `
:root{--bg:#f8fafc;--card:#fff;--tx:#0f172a;--tx2:#334155;--mut:#475569;--ac:#15798a;--ac2:#4f46e5;--bd:#cbd5e1;--soft:#e6f7f9}
@media(prefers-color-scheme:dark){:root{--bg:#020617;--card:#0b1329;--tx:#f8fafc;--tx2:#cbd5e1;--mut:#94a3b8;--ac:#38bdf8;--ac2:#818cf8;--bd:#1e293b;--soft:#0c4a6e}}
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}
body{font-family:Inter,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;background:var(--bg);color:var(--tx);line-height:1.65}
a{color:var(--ac)}.w{max-width:960px;margin:0 auto;padding:0 20px}
header.top{border-bottom:1px solid var(--bd);background:var(--card)}header.top .w{display:flex;align-items:center;justify-content:space-between;height:64px;gap:12px}
header.top img{height:40px;width:auto}@media(max-width:560px){header.top nav a:not(:last-child){display:none}}
header.top nav a{margin-left:16px;white-space:nowrap;font-weight:600;text-decoration:none;font-size:.95rem}
.crumbs{font-size:.85rem;color:var(--mut);padding:16px 0 0}.crumbs a{color:var(--mut)}
h1,h2,h3{font-family:Outfit,Inter,sans-serif;line-height:1.2}
.hero{padding:24px 0 32px}.hero h1{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:12px 0}
.badge{display:inline-block;background:var(--soft);color:var(--ac);font-weight:700;font-size:.8rem;padding:4px 12px;border-radius:99px}
.answer{background:var(--card);border:1px solid var(--bd);border-left:4px solid var(--ac);border-radius:12px;padding:18px 20px;color:var(--tx2);font-size:1.05rem}
.facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px;margin:20px 0}
.fact{background:var(--card);border:1px solid var(--bd);border-radius:12px;padding:14px}.fact b{display:block;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;color:var(--mut)}
.btn{display:inline-block;background:linear-gradient(90deg,var(--ac),var(--ac2));color:#fff!important;font-weight:700;text-decoration:none;padding:13px 26px;border-radius:99px;margin:6px 10px 6px 0}
.btn.alt{background:none;color:var(--ac)!important;border:2px solid var(--ac)}
section{padding:28px 0}section h2{font-size:1.6rem;font-weight:800;margin-bottom:14px}
ul.ck{list-style:none}ul.ck li{padding:6px 0 6px 28px;position:relative;color:var(--tx2)}ul.ck li:before{content:"✓";position:absolute;left:0;color:var(--ac);font-weight:800}
.mods{display:grid;gap:14px}.mod{background:var(--card);border:1px solid var(--bd);border-radius:12px;padding:16px 18px}.mod h3{font-size:1.05rem;margin-bottom:6px}.mod ul{padding-left:20px;color:var(--tx2)}
details{background:var(--card);border:1px solid var(--bd);border-radius:12px;padding:14px 18px;margin-bottom:10px}summary{cursor:pointer;font-weight:700}details p{margin-top:8px;color:var(--tx2)}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px}
.card{background:var(--card);border:1px solid var(--bd);border-radius:12px;padding:18px;text-decoration:none;color:var(--tx);display:block}.card:hover{border-color:var(--ac)}.card b{display:block;margin-bottom:6px}.card span{color:var(--mut);font-size:.92rem}
.cta{background:var(--card);border:1px solid var(--bd);border-radius:20px;padding:28px;text-align:center;margin:20px 0}
footer{border-top:1px solid var(--bd);padding:28px 0;color:var(--mut);font-size:.88rem;margin-top:32px}footer a{color:var(--mut);margin-right:14px}

.hero2{color:#fff;background:radial-gradient(900px 400px at 85% 20%,var(--c2) -40%,transparent 60%),radial-gradient(700px 400px at 0% 0%,var(--c1) -60%,transparent 55%),var(--dk);padding:20px 0 44px;border-bottom:1px solid rgba(255,255,255,.08)}
.hero2 .crumbs,.hero2 .crumbs a{color:rgba(255,255,255,.7)}
.hgrid{display:grid;grid-template-columns:1.25fr .75fr;gap:32px;align-items:center;margin-top:20px}
.hero2 .eyebrow{display:inline-block;font-weight:700;font-size:.8rem;letter-spacing:.08em;text-transform:uppercase;background:rgba(255,255,255,.12);padding:5px 14px;border-radius:99px}
.hero2 h1{font-size:clamp(2rem,4.6vw,3.2rem);font-weight:800;margin:16px 0 12px;line-height:1.1}
.hero2 .lead{font-size:1.25rem;color:rgba(255,255,255,.88);max-width:34em}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin:20px 0}.chips span{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);padding:6px 14px;border-radius:99px;font-size:.9rem;font-weight:600}
.btn.big{font-size:1.1rem;padding:16px 34px;background:#fff;color:var(--dk)!important;box-shadow:0 8px 28px rgba(0,0,0,.35)}
.btn.big:hover{transform:translateY(-1px)}.btn.ghost{background:none;border:2px solid rgba(255,255,255,.55);color:#fff!important;padding:14px 26px}
.hlogo{display:flex;flex-direction:column;align-items:center;gap:14px}
.tile{width:min(240px,60vw);aspect-ratio:1;border-radius:36px;display:grid;place-items:center;background:linear-gradient(135deg,var(--c1),var(--c2));box-shadow:0 24px 60px rgba(0,0,0,.45),inset 0 0 0 1px rgba(255,255,255,.25)}
.tile.img{background:#fff}.tile img{width:62%;height:62%;object-fit:contain}
.hlogo small{color:rgba(255,255,255,.7);font-size:.85rem}
nav.anchors{position:sticky;top:0;z-index:20;background:var(--card);border-bottom:1px solid var(--bd)}
nav.anchors .w{display:flex;gap:4px;overflow-x:auto;align-items:center;scrollbar-width:none}
nav.anchors a{white-space:nowrap;padding:14px 12px;text-decoration:none;color:var(--tx2);font-weight:600;font-size:.92rem;border-bottom:3px solid transparent}
nav.anchors a:hover{color:var(--c1);border-color:var(--c1)}nav.anchors a.go{margin-left:auto;color:#fff;background:var(--c1);border-radius:99px;padding:8px 18px;border:0}
.sticky-cta{display:none}
section[id]{scroll-margin-top:60px}
.cta{background:linear-gradient(135deg,var(--c1),var(--c2));color:#fff;border:0}.cta p{color:rgba(255,255,255,.9)!important}.cta .btn{background:#fff;color:var(--dk)!important}
@media(max-width:760px){.hgrid{grid-template-columns:1fr}.hlogo{order:-1;flex-direction:row;justify-content:flex-start}.tile{width:84px;border-radius:22px}.tile svg{width:44px;height:44px}.hlogo small{display:none}
.sticky-cta{display:block;position:fixed;left:0;right:0;bottom:0;z-index:30;padding:10px 16px;background:var(--card);border-top:1px solid var(--bd)}.sticky-cta a{display:block;text-align:center;margin:0;background:linear-gradient(90deg,var(--c1),var(--c2))}body{padding-bottom:70px}}
`;

const head = ({ title, desc, url, keywords, ld, vars }) => `<!DOCTYPE html>
<html lang="es"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${keywords ? `<meta name="keywords" content="${esc(keywords)}">` : ''}
<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#56A9F8">
<link rel="icon" type="image/png" href="/logos/formAI/favicon-48.png">
<meta property="og:type" content="website"><meta property="og:locale" content="es_ES"><meta property="og:site_name" content="FormAI">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE_URL}/images/formai_linkedin_ai_prod.jpg">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(desc)}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Outfit:wght@600;800&display=swap" media="print" onload="this.media='all'">
<style>${CSS}</style>
<script type="application/ld+json">${json(ld)}</script>
</head><body${vars ? ` style="${vars}"` : ''}>
<header class="top"><div class="w"><a href="/"><img src="/logos/formAI/1-removebg-preview-trimmed.webp" alt="FormAI" width="120" height="40"></a>
<nav><a href="/cursos/">Cursos de IA</a><a href="/#calculadora">Calculadora FUNDAE</a><a href="/#contacto">Contacto</a></nav></div></header>`;

const foot = `<footer><div class="w"><p>FormAI · Formación bonificada para empresas. Gestión FUNDAE a través de Full Equipe S.L., entidad organizadora homologada.</p>
<p style="margin-top:8px"><a href="/">Inicio</a><a href="/cursos/">Cursos</a><a href="/aviso-legal.html">Aviso legal</a><a href="/politica-privacidad.html">Privacidad</a><a href="/politica-cookies.html">Cookies</a></p></div></footer></body></html>`;


// Identidad visual por temática: colores propios, logo existente en /public/logos/herramientas o glifo genérico.
const GLYPHS = {
  bot: '<rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 8V4M9 13h.01M15 13h.01M9 16h6"/><circle cx="12" cy="3.5" r="1"/>',
  spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
  code: '<path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/>',
  rocket: '<path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M14 4c3-1 6-1 6-1s0 3-1 6l-6 6-5-5z"/><circle cx="15" cy="9" r="1.5"/>',
};
const THEME = {
  'curso-copilot-365': { c1: '#0f6cbd', c2: '#7b3ff2', dark: '#06172e', logo: '/logos/herramientas/Copilot.webp' },
  'curso-gemini-google-workspace': { c1: '#1a73e8', c2: '#a142f4', dark: '#0a1530', logo: '/logos/herramientas/Gemini.webp' },
  'curso-google-apps-script': { c1: '#1e8e3e', c2: '#1a73e8', dark: '#07201a', logo: '/logos/herramientas/GW.webp' },
  'curso-ia-agentica': { c1: '#6366f1', c2: '#06b6d4', dark: '#0d1030', glyph: 'bot' },
  'curso-claude-empresas': { c1: '#d97757', c2: '#b4532f', dark: '#241109', glyph: 'spark' },
  'curso-antigravity-ia': { c1: '#4285f4', c2: '#ea4335', dark: '#0a1124', glyph: 'rocket' },
};
const svgGlyph = (k) => `<svg viewBox="0 0 24 24" width="88" height="88" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${GLYPHS[k]}</svg>`;

const TAGLINE = {
  'curso-copilot-365': 'Ahorra horas en correo, reuniones, documentos y Excel con Copilot, sin perder el control de tus datos.',
  'curso-gemini-google-workspace': 'Lleva Gemini a Gmail, Docs, Sheets y Meet y trabaja más rápido con el equipo.',
  'curso-google-apps-script': 'Automatiza Sheets, Gmail y Drive sin depender de un desarrollador.',
  'curso-ia-agentica': 'Diseña agentes de IA que ejecutan tareas por ti, con supervisión humana.',
  'curso-claude-empresas': 'Analiza documentos, redacta y organiza proyectos con Claude, con método y privacidad.',
  'curso-antigravity-ia': 'Crea scripts, webs y automatizaciones trabajando con agentes de IA.',
};
const org = { '@type': 'EducationalOrganization', '@id': `${SITE_URL}/#organization`, name: 'FormAI', url: `${SITE_URL}/` };

function coursePage(c) {
  const url = `${SITE_URL}/cursos/${c.slug}/`;
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      org,
      {
        '@type': 'Course', '@id': `${url}#course`, name: c.name, description: c.directAnswer, url,
        inLanguage: 'es', provider: { '@id': `${SITE_URL}/#organization` }, teaches: c.outcomes,
        educationalLevel: c.level, timeRequired: `PT${c.hours}H`,
        hasCourseInstance: { '@type': 'CourseInstance', courseMode: ['online', 'onsite'], courseWorkload: `PT${c.hours}H` },
      },
      {
        '@type': 'FAQPage', mainEntity: c.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Cursos', item: `${SITE_URL}/cursos/` },
          { '@type': 'ListItem', position: 3, name: c.name, item: url },
        ],
      },
    ],
  };
  const t = THEME[c.slug];
  const vars = `--c1:${t.c1};--c2:${t.c2};--dk:${t.dark}`;
  const rel = c.related.map((s) => bySlug[s]).filter(Boolean);
  return head({ title: c.metaTitle, desc: c.metaDescription, url, keywords: c.keywords, ld, vars }) + `
<div class="hero2"><div class="w">
<p class="crumbs"><a href="/">Inicio</a> › <a href="/cursos/">Cursos</a> › ${esc(c.tool)}</p>
<div class="hgrid"><div><span class="eyebrow">Formación bonificable FUNDAE</span><h1>${esc(c.h1)}</h1>
<p class="lead">${esc(TAGLINE[c.slug])}</p>
<div class="chips"><span>⏱ ${c.hours} horas</span><span>🎯 ${esc(c.level)}</span><span>💻 Aula virtual o presencial</span><span>👤 Formador en activo</span></div>
<a class="btn big" href="/#contacto">Solicitar propuesta</a><a class="btn ghost" href="/#calculadora">Calcular mi crédito FUNDAE</a></div>
<div class="hlogo"><div class="tile${t.logo ? ' img' : ''}">${t.logo ? `<img src="${t.logo}" alt="Logo de ${esc(c.tool)}" width="150" height="150">` : svgGlyph(t.glyph)}</div><small>${esc(c.tool)}</small></div></div></div></div>
<nav class="anchors" aria-label="Secciones"><div class="w"><a href="#para-quien">Para quién</a><a href="#aprenderas">Qué aprenderás</a><a href="#temario">Temario</a><a href="#fundae">FUNDAE</a><a href="#faqs">FAQs</a><a class="go" href="/#contacto">Solicitar propuesta</a></div></nav>
<main class="w">
<section><p class="answer">${esc(c.directAnswer)}</p></section>
<section id="para-quien"><h2>¿Para quién es este curso?</h2><p style="color:var(--tx2)">${esc(c.audience)}</p><p style="color:var(--tx2);margin-top:10px"><b>Requisitos:</b> ${esc(c.prerequisites)}</p></section>
<section id="aprenderas"><h2>Qué aprenderá tu equipo</h2><ul class="ck">${c.outcomes.map((o) => `<li>${esc(o)}</li>`).join('')}</ul></section>
<section id="temario"><h2>Temario</h2><div class="mods">${c.modules.map((m) => `<div class="mod"><h3>${esc(m.title)}</h3><ul>${m.topics.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div>`).join('')}</div>
<p style="color:var(--mut);margin-top:12px;font-size:.92rem">El temario se adapta a las herramientas, el sector y el nivel de tu equipo tras una llamada previa de alineación con el formador.</p></section>
<section><h2>Casos prácticos de ejemplo</h2><ul class="ck">${c.useCases.map((o) => `<li>${esc(o)}</li>`).join('')}</ul></section>
<section id="fundae"><h2>Cómo se bonifica con FUNDAE</h2><p style="color:var(--tx2)">Las empresas disponen de un crédito anual para formación que pueden aplicar mediante bonificaciones en las cotizaciones a la Seguridad Social. FormAI trabaja con <b>Full Equipe S.L.</b>, entidad organizadora homologada, que gestiona el proceso. Te ayudamos con la documentación (encomienda de gestión, ficha técnica y listado de participantes). Consulta las condiciones vigentes en <a href="https://www.fundae.es" target="_blank" rel="noopener noreferrer">fundae.es</a>.</p></section>
<section id="faqs"><h2>Preguntas frecuentes</h2>${c.faqs.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</section>
<div class="cta"><h2 style="margin-bottom:8px">¿Hablamos de tu formación en ${esc(c.tool)}?</h2><p style="color:var(--tx2);margin-bottom:12px">Llamada breve de 10-15 minutos, sin compromiso.</p><a class="btn" href="/#contacto">Contactar con FormAI</a></div>
<section><h2>Otras formaciones relacionadas</h2><div class="cards">${rel.map((r) => `<a class="card" href="/cursos/${r.slug}/"><b>${esc(r.name)}</b><span>${r.hours} horas · ${esc(r.level)}</span></a>`).join('')}</div></section>
</main><div class="sticky-cta"><a class="btn" href="/#contacto">Solicitar propuesta</a></div>` + foot;
}

function indexPage() {
  const url = `${SITE_URL}/cursos/`;
  const title = 'Cursos de IA para empresas: Copilot, Gemini, Claude, Apps Script y más | FormAI';
  const desc = 'Formaciones prácticas en Inteligencia Artificial para empresas: Copilot 365, Gemini, Claude, Google Apps Script, IA agéntica y Antigravity. Bonificables con FUNDAE.';
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      org,
      { '@type': 'CollectionPage', '@id': `${url}#page`, name: 'Cursos de IA para empresas', url, description: desc, isPartOf: { '@id': `${SITE_URL}/#organization` } },
      { '@type': 'ItemList', itemListElement: courseLandings.map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE_URL}/cursos/${c.slug}/`, name: c.name })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` }, { '@type': 'ListItem', position: 2, name: 'Cursos', item: url }] },
    ],
  };
  return head({ title, desc, url, ld }) + `
<main class="w"><p class="crumbs"><a href="/">Inicio</a> › Cursos</p>
<div class="hero"><span class="badge">Formación bonificable FUNDAE</span><h1>Cursos de IA y automatización para empresas</h1>
<p class="answer">${esc(desc)} Todos los cursos son prácticos, los imparten formadores en activo y se adaptan al sector y al nivel de cada equipo.</p></div>
<section><div class="cards">${courseLandings.map((c) => `<a class="card" href="/cursos/${c.slug}/"><b>${esc(c.name)}</b><span>${c.hours} horas · ${esc(c.level)}</span></a>`).join('')}</div>
<p style="margin-top:16px;color:var(--tx2)">¿Buscas Excel, Power BI, Power Automate, Looker Studio o Tableau? Consulta el <a href="/#cursos">catálogo completo</a>.</p></section>
<div class="cta"><a class="btn" href="/#contacto">Solicitar propuesta</a><a class="btn alt" href="/#calculadora">Calcular mi crédito FUNDAE</a></div></main>` + foot;
}

const write = (rel, html) => { const f = path.join(dist, rel, 'index.html'); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); };
write('cursos', indexPage());
courseLandings.forEach((c) => write(`cursos/${c.slug}`, coursePage(c)));
console.log(`Generadas ${courseLandings.length + 1} páginas en dist/cursos/ (${today}).`);

// Añade las landings al sitemap y a llms.txt de dist/ (sin tocar public/, para no chocar con otros cambios).
const urls = [`${SITE_URL}/cursos/`, ...courseLandings.map((c) => `${SITE_URL}/cursos/${c.slug}/`)];
const smPath = path.join(dist, 'sitemap.xml');
if (fs.existsSync(smPath)) {
  let sm = fs.readFileSync(smPath, 'utf-8');
  const entries = urls.filter((u) => !sm.includes(`<loc>${u}</loc>`)).map((u) => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${u.endsWith('/cursos/') ? '0.9' : '0.8'}</priority>\n  </url>\n`).join('');
  sm = sm.replace('</urlset>', `${entries}</urlset>`);
  fs.writeFileSync(smPath, sm);
}
const llmsPath = path.join(dist, 'llms.txt');
const block = `\n## Cursos de IA y automatización (páginas dedicadas)\n${courseLandings.map((c) => `- [${c.name}](${SITE_URL}/cursos/${c.slug}/): ${c.hours} h. ${c.metaDescription}`).join('\n')}\n- [Índice de cursos de IA](${SITE_URL}/cursos/)\n`;
if (fs.existsSync(llmsPath) && !fs.readFileSync(llmsPath, 'utf-8').includes('/cursos/')) fs.appendFileSync(llmsPath, block);
