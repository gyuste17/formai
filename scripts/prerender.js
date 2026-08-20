import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';
import React from 'react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

async function prerender() {
  const distHtmlPath = path.resolve(root, 'dist', 'index.html');
  if (!fs.existsSync(distHtmlPath)) {
    console.error('dist/index.html not found! Run vite build first.');
    process.exit(1);
  }

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    root,
  });

  try {
    const { default: App } = await vite.ssrLoadModule('/src/App.jsx');
    const appHtml = renderToString(React.createElement(App));

    let template = fs.readFileSync(distHtmlPath, 'utf-8');

    // Also inline the built CSS directly into <head> to eliminate render-blocking CSS request
    const cssMatch = template.match(/<link rel="stylesheet" crossorigin href="([^"]+\.css)">/);
    if (cssMatch) {
      const cssPath = path.resolve(root, 'dist', cssMatch[1].replace(/^\//, ''));
      if (fs.existsSync(cssPath)) {
        const cssContent = fs.readFileSync(cssPath, 'utf-8');
        template = template.replace(cssMatch[0], `<style>${cssContent}</style>`);
        console.log('Inlined CSS into <head><style> successfully!');
      }
    }

    // Inject prerendered React HTML into <div id="root">
    const finalHtml = template.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );

    fs.writeFileSync(distHtmlPath, finalHtml, 'utf-8');
    console.log('Pre-rendered HTML successfully into dist/index.html!');
  } catch (e) {
    console.error('Error during prerender:', e);
  } finally {
    await vite.close();
  }
}

prerender();
