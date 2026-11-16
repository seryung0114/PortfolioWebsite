// =========================================================
// 포트폴리오 전체를 PDF 한 개로 만드는 스크립트
// 순서: 메인 페이지 → 프로젝트 1 상세 → 프로젝트 2 상세 → 마지막 연락처
// 결과: assets/resume.pdf  (메인 페이지의 [이력서 PDF 다운로드] 버튼이 이 파일을 내려받음)
//
// 실행 방법 (사이트 내용을 고친 뒤 다시 실행하면 PDF도 최신으로 바뀜)
//   1) Node.js 설치
//   2) npm install playwright  →  npx playwright install chromium
//   3) node tools/make-pdf.js
// =========================================================
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..');
// PDF 안의 링크를 누르면 실제 사이트가 열리도록 기준 주소를 지정
const SITE = 'https://seryung0114.github.io/PortfolioWebsite/';
const DETAIL_PAGES = ['projects/project-1.html', 'projects/project-2.html'];
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
};

// 1) 이 폴더를 그대로 보여주는 작은 웹 서버 (브라우저가 페이지를 읽을 수 있도록)
const server = http.createServer((req, res) => {
  const file = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404);
    res.end();
    return;
  }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

(async () => {
  await new Promise((resolve) => server.listen(0, resolve));
  const base = `http://localhost:${server.address().port}/`;

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(base + 'index.html', { waitUntil: 'networkidle' });

  // 2) 메인 페이지 뒤에 프로젝트 상세 본문을 차례로 붙이고, 연락처 섹션은 맨 끝으로 옮김
  await page.evaluate(async ({ base, site, details }) => {
    const main = document.querySelector('main');
    const contact = document.getElementById('contact');

    // 메인 페이지의 상대 링크(projects/... 등)를 실제 사이트 주소로
    document.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute('href');
      if (!/^(https?:|mailto:)/.test(href)) a.setAttribute('href', new URL(href, site).href);
    });

    for (const name of details) {
      const html = await (await fetch(base + name)).text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const body = doc.querySelector('main');
      // 상세 페이지의 상대 링크도 실제 사이트 주소로
      body.querySelectorAll('a[href]').forEach((a) => {
        a.setAttribute('href', new URL(a.getAttribute('href'), site + name).href);
      });
      const wrap = document.createElement('div');
      wrap.className = 'pdf-page'; // 새 페이지에서 시작 (css/style.css 의 @media print)
      wrap.append(...body.childNodes);
      main.append(wrap);
    }

    contact.classList.add('pdf-page');
    main.append(contact);
    document.title = '천세령 포트폴리오';
  }, { base, site: SITE, details: DETAIL_PAGES });

  // 3) 글꼴을 다 불러온 뒤 A4로 저장
  //    scale 0.7: 화면 너비 약 1130px 기준(데스크톱 배치)으로 그린 뒤 A4에 맞게 줄임
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: path.join(ROOT, 'assets', 'resume.pdf'),
    format: 'A4',
    printBackground: true,
    scale: 0.7,
    margin: { top: '10mm', bottom: '10mm', left: '0', right: '0' },
  });

  await browser.close();
  server.close();
  console.log('assets/resume.pdf 생성 완료');
})();
