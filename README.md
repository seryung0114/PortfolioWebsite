# 데이터 운영·분석 포트폴리오

HTML·CSS·JavaScript만으로 만든 정적 포트폴리오 사이트입니다. 빌드 과정 없이 파일을 그대로 GitHub Pages에 올리면 됩니다.

**사이트 주소: https://seryung0114.github.io/PortfolioWebsite/**
(주소는 대소문자를 구분합니다. `P`, `W`는 대문자)

## 폴더 구조

```
.
├── index.html          # 메인: 첫 화면, 기술, 프로젝트 카드, 자격증·어학, 연락처
├── projects/           # 프로젝트 상세 페이지 (면접관용)
├── css/style.css       # 모든 페이지가 함께 쓰는 스타일
├── js/main.js          # 작은 보조 기능 (없어도 페이지는 동작)
└── assets/             # 이력서 PDF, 이미지
```

## 내용 채우는 법

1. 에디터에서 `작성 필요`를 전체 검색합니다. (VS Code: `Ctrl+Shift+F`)
2. `<span class="todo">[작성 필요]</span>`를 **span째로** 실제 내용으로 바꿉니다.
   - 바로 위 HTML 주석(`<!-- 예: ... -->`)에 무엇을 쓰면 되는지 적어 두었습니다.
3. 브라우저 콘솔(F12)에 남은 `[작성 필요]` 개수가 표시됩니다. 0개가 되면 완성입니다.

## 내 컴퓨터에서 미리보기

`index.html`을 더블클릭해도 열리지만, 실제 배포 환경과 같게 보려면 간단한 서버를 띄우는 편이 정확합니다.

```bash
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000` 을 엽니다.

## GitHub Pages 배포

1. 저장소 페이지에서 **Settings → Pages** 로 이동합니다.
2. **Build and deployment → Source** 를 `Deploy from a branch` 로 둡니다.
3. **Branch** 에서 배포할 브랜치(보통 `main`)와 폴더 `/ (root)` 를 고르고 **Save** 를 누릅니다.
4. 1~3분 뒤 같은 화면 위쪽에 주소가 나타납니다. 형식: `https://<GitHub 아이디>.github.io/<저장소 이름>/` (이 저장소는 위의 사이트 주소)
5. 이후에는 파일을 고쳐서 commit·push 하면 자동으로 다시 배포됩니다. 진행 상황은 **Actions** 탭에서 볼 수 있습니다.

참고
- 무료 플랜에서는 저장소가 **Public** 이어야 Pages를 쓸 수 있습니다.
- GitHub Pages는 파일 이름의 대소문자를 구분합니다. (`Resume.pdf` ≠ `resume.pdf`)
- `.nojekyll` 파일은 GitHub의 Jekyll 변환을 끄고 파일을 그대로 올리게 합니다. 지우지 마세요.

## 배포 전 확인 목록

- [ ] 모든 페이지에서 `작성 필요` 검색 결과 0개 (콘솔 메시지가 사라짐)
- [ ] `assets/resume.pdf` 추가
- [ ] 각 HTML의 `<title>`에 이름·프로젝트 제목 반영
- [ ] 푸터의 "최종 수정" 날짜 갱신
- [ ] 휴대폰에서 직접 열어 보고, 키보드 Tab 키만으로 모든 링크에 이동되는지 확인
