// =========================================================
// 포트폴리오 공통 스크립트 (프레임워크 없음, 페이지 기능에 필수는 아님)
// =========================================================

// 개발용: 아직 채우지 않은 [작성 필요] 개수를 브라우저 콘솔(F12)에 표시
const todos = document.querySelectorAll('.todo');
if (todos.length > 0) {
  console.info(`[작성 필요] 항목이 ${todos.length}개 남아 있습니다.`);
}

// 스크롤 위치에 맞춰 메뉴·목차의 현재 항목에 aria-current를 붙임
// (data-scrollspy 속성이 있는 nav에만 적용)
function initScrollSpy(nav) {
  const linkBySection = new Map();

  nav.querySelectorAll('a[href^="#"]').forEach((link) => {
    const section = document.getElementById(link.hash.slice(1));
    if (section) linkBySection.set(section, link);
  });

  // 오래된 브라우저에서는 그냥 건너뜀 (메뉴는 정상 동작)
  if (linkBySection.size === 0 || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      linkBySection.forEach((link) => link.removeAttribute('aria-current'));
      linkBySection.get(entry.target).setAttribute('aria-current', 'location');
    });
  }, {
    // 화면 위쪽 40% 지점을 지나는 섹션을 "현재 섹션"으로 봄
    rootMargin: '-40% 0px -55% 0px',
  });

  linkBySection.forEach((_, section) => observer.observe(section));
}

document.querySelectorAll('[data-scrollspy]').forEach(initScrollSpy);
