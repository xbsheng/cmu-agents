#!/usr/bin/env node
/**
 * 站内链接、图片引用与 sitemap 检查。
 *
 * 用法：先 npm run docs:build，再 npm run docs:check
 * 也用于 CI：构建后执行，避免缺图、死链和 sitemap 漂移进入部署。
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const DIST = path.join(ROOT, 'docs/.vitepress/dist')
const PUBLIC = path.join(ROOT, 'docs/public')
const NOTES = path.join(ROOT, 'docs/notes')
const ESSENCE = path.join(ROOT, 'docs/essence')

const rawBase = process.env.DOCS_BASE || '/cmu-agents/'
const base = `/${rawBase.replace(/^\/|\/$/g, '')}/`.replace('//', '/')

const errors = []
const warnings = []

function walk(dir, suffix) {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full, suffix))
    else if (full.endsWith(suffix)) out.push(full)
  }
  return out
}

function rel(file) {
  return path.relative(ROOT, file)
}

function decodePath(value) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function resolveTarget(href) {
  const clean = href.split('#')[0].split('?')[0]
  if (!clean) return null

  let relPath
  if (clean.startsWith(base)) relPath = clean.slice(base.length)
  else if (clean.startsWith('/')) {
    // 站内绝对路径但不在 base 下，通常是外部站点或错误链接
    return null
  } else {
    return null
  }

  relPath = decodePath(relPath)
  if (relPath === '' || relPath.endsWith('/')) relPath += 'index.html'
  else if (!/\.[a-z0-9]+$/i.test(relPath)) relPath += '.html'
  return relPath
}

// 1. 构建产物必须存在
if (!fs.existsSync(DIST)) {
  console.error('✖ 找不到 docs/.vitepress/dist，请先运行 npm run docs:build')
  process.exit(1)
}

const htmlFiles = walk(DIST, '.html')

// 2. 检查所有 HTML 的站内 href/src
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8')
  if (html.includes('katex-error')) {
    errors.push(`KaTeX 渲染错误：${rel(file)}`)
  }
  const attrs = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)]
  for (const [, raw] of attrs) {
    if (!raw || raw.startsWith('#') || raw.startsWith('data:')) continue
    if (/^(https?:)?\/\//i.test(raw) || /^(mailto|tel|javascript):/i.test(raw)) continue
    if (!raw.startsWith('/')) continue

    const targetRel = resolveTarget(raw)
    if (!targetRel) continue
    const target = path.join(DIST, targetRel)
    if (!fs.existsSync(target)) {
      errors.push(`死链：${rel(file)} -> ${raw}`)
    }
  }
}

// 3. 检查 SlideFigure 引用的图片
const noteFiles = fs.existsSync(NOTES) ? walk(NOTES, '.md') : []
const usedImages = new Set()
for (const file of noteFiles) {
  const text = fs.readFileSync(file, 'utf8')
  for (const match of text.matchAll(/<SlideFigure[^>]*lecture="(\d+)"[^>]*page="(\d+)"/g)) {
    const lecture = match[1].padStart(2, '0')
    const page = match[2].padStart(2, '0')
    const image = `images/lecture-${lecture}/p${page}.webp`
    usedImages.add(image)
    if (!fs.existsSync(path.join(PUBLIC, image))) {
      errors.push(`缺图：${rel(file)} -> docs/public/${image}`)
    }
  }
}

const imageDir = path.join(PUBLIC, 'images')
if (fs.existsSync(imageDir)) {
  for (const file of walk(imageDir, '.png')) {
    errors.push(`图片迁移未完成，仍存在 PNG：docs/public/${path.relative(PUBLIC, file)}`)
  }
  for (const file of walk(imageDir, '.webp')) {
    const image = path.relative(PUBLIC, file).split(path.sep).join('/')
    if (!usedImages.has(image)) warnings.push(`未引用图片：docs/public/${image}`)
  }
}

// 4. 检查 sitemap
const sitemapPath = path.join(DIST, 'sitemap.xml')
if (!fs.existsSync(sitemapPath)) {
  errors.push('缺少 sitemap.xml')
} else {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8')
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  if (urls.some((url) => /\/404(?:$|[/?#])/.test(url))) {
    errors.push('sitemap 包含 404 页面')
  }
  for (const dir of [NOTES, ESSENCE]) {
    for (const file of walk(dir, '.md')) {
      const slug = path.basename(file, '.md')
      if (slug === 'index') continue
      const expected = `/${slug}`
      if (!urls.some((url) => url.endsWith(expected))) {
        errors.push(`sitemap 缺少：${rel(file)}`)
      }
    }
  }
  console.log(`sitemap：${urls.length} 个 URL`)
}

// 5. 检查公开静态资源
for (const asset of ['og-image.png', 'logo.webp', 'logo-nav.png', 'favicon.png']) {
  if (!fs.existsSync(path.join(PUBLIC, asset))) {
    errors.push(`缺少公开资源：docs/public/${asset}`)
  }
}

const ogImage = path.join(PUBLIC, 'og-image.png')
if (fs.existsSync(ogImage)) {
  const buffer = fs.readFileSync(ogImage)
  const width = buffer.readUInt32BE(16)
  const height = buffer.readUInt32BE(20)
  if (width !== 1200 || height !== 630) {
    errors.push(`OG 图片尺寸应为 1200×630，当前为 ${width}×${height}`)
  }
}

// 6. 输出结果
const imageCount = [...usedImages].filter((image) =>
  fs.existsSync(path.join(PUBLIC, image))
).length
console.log(`页面：${htmlFiles.length} 个 HTML；幻灯片引用：${imageCount} 张`)

for (const warning of warnings.slice(0, 10)) console.warn(`⚠ ${warning}`)
if (warnings.length > 10) console.warn(`⚠ 另有 ${warnings.length - 10} 条警告`)

if (errors.length) {
  for (const error of errors.slice(0, 40)) console.error(`✖ ${error}`)
  if (errors.length > 40) console.error(`✖ 另有 ${errors.length - 40} 条错误`)
  console.error(`\n检查失败：${errors.length} 个错误，${warnings.length} 个警告`)
  process.exit(1)
}

console.log(`✓ 检查通过：0 个错误，${warnings.length} 个警告`)
