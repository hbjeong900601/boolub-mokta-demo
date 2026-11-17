/* ============================================================================
   부럽(BOOLUB) × 몽골한국관광협회(MOKTA) 공식 몽골 전용관 v4 (app.js)
   Target Live URL: https://www.boolub.com/?pn=pages.view&type=pages&data=mokta
   - 부럽 실제 입점 파트너사(9곳) 로고·상점(pid)·실제 판매상품(pcode) 완벽 연동
   - MOKTA 협회 순차 입점 회원사(11곳) 슬롯 및 패스트트랙 입점 신청 지원
   - 부럽 직영 몽골원정대·쿠폰특가·공항픽업·여행자보험·eSIM 자연스러운 전환 설계
============================================================================ */

/* 0. 데모 환경에서도 실제 적용 주소(?pn=pages.view&type=pages&data=mokta) 구조 재현 */
(function syncTargetQueryUrl() {
  try {
    if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
      const params = new URLSearchParams(window.location.search);
      if (!params.get('data')) {
        const nextUrl = window.location.pathname + '?pn=pages.view&type=pages&data=mokta' + (window.location.hash || '');
        window.history.replaceState({ page: 'mokta' }, '', nextUrl);
      }
    }
  } catch (_) {}
})();

/* 1. 상단 세로형 메인 비주얼 배너 (부럽 메인 #slickMainBnr 동일 1장씩 부드럽게 흐르는 무한 슬라이더 · 총 9장) */
const HERO_SLIDES = [
  {
    eyebrow: '부럽 직영 시그니처',
    title: '1인 신청도 무조건 출발!\n2026 부럽 몽골원정대',
    sub: '유심 무료 · 특식 3회 · 게르 업그레이드 · 추가금 0원 (699,000원~)',
    img: 'https://files.boolub.com/upfiles/product/4219813096.png',
    action: () => openProductPreviewModal('T0950-Q2923-W2496')
  },
  {
    eyebrow: '총무 없는 1/N 동행·조인',
    title: '모일수록 내려가는 투어비\n월간 캘린더 잔여석 합류',
    sub: '실시간 커뮤니티 동행찾기부터 파트너 확정 차량까지 한눈에',
    img: './images/companion_team_hands.jpg',
    action: () => scrollToSection('sec-join')
  },
  {
    eyebrow: 'MOKTA × 부럽 공식보증',
    title: '몽골한국관광협회 공식 인증\n안심 에스크로 전용관',
    sub: '부럽 검증 파트너사 9곳 · 104개 실제 투어 안전결제 보장',
    img: './images/hero_steppe_sunset.jpg',
    action: () => openModal('trustGuaranteeModal')
  },
  {
    eyebrow: '부럽 고비원정대 베스트',
    title: '차강소브라가·홍고린엘스\n고비사막 4박5일 원정대',
    sub: '정가 115만 원 → 부럽 직영 특가 999,000원 즉시 확정',
    img: 'https://files.boolub.com/upfiles/product/736206236.png',
    action: () => openProductPreviewModal('C3954-E9344-H0474')
  },
  {
    eyebrow: '내 일정 맞춤 비교견적',
    title: '항공권만 끊으셨나요?\n원하는 코스 1:1 실사 비교',
    sub: 'BBM·노라·하닥·스카이·밝은미래 등 공식 파트너가 직접 제안',
    img: './images/gobi_camp_vans.jpg',
    action: () => openModal('rfqWizardModal')
  },
  {
    eyebrow: '공식 파트너 9개사 미니홈',
    title: '각 여행사만의 보유 상품과\n차량·캠프 스펙 직접 비교',
    sub: '15년 업력 BBM투어·노라투어·양가투어·두잇트래블 한자리에',
    img: 'https://files.boolub.com/upfiles/product/1688056962.png',
    action: () => scrollToSection('sec-partners')
  },
  {
    eyebrow: '부럽 몽골 에디터 가이드',
    title: '징기스칸 공항부터 게르 선택까지\n출국 전 필독 몽골 매거진',
    sub: '누적 조회수 8만+ 부럽 인기 몽골 여행 매거진 총정리',
    img: 'https://files.boolub.com/upfiles/board/2422061780_1794708044.jpg',
    action: () => scrollToSection('sec-magazine')
  },
  {
    eyebrow: '실제 탑승객 리얼 후기',
    title: '부럽 여행자들이 직접 남긴\n생생한 몽골 포토 후기',
    sub: '가족 원정대부터 홉스골·남고비 자유여행 실제 리뷰 확인',
    img: 'https://files.boolub.com/upfiles/board/2384413237.jpg',
    action: () => scrollToSection('sec-showcase')
  },
  {
    eyebrow: '새벽 도착도 안심 이동',
    title: '울란바토르 공항 ↔ 호텔\n단독 차량 픽업·샌딩',
    sub: '더블유아이티(WIT) 공식 운영 · 단독차량 편도 19,200원~',
    img: 'https://files.boolub.com/upfiles/product/3283866928.jpg',
    action: () => openProductPreviewModal('I3885-I4036-S5377')
  }
];

/* 2. 부럽 실제 판매 몽골 투어 대표 상품 (smart_product 실데이터 100% 일치 · 초기 로드 후 전체 104개 실시간 하이드레이션) */
const DIRECT_PRODUCTS = [
  {
    id: 'p1',
    pcode: 'T0950-Q2923-W2496',
    pid: 'boolub',
    cat: '원정대',
    regionKey: '중부',
    durationKey: '3박4일',
    styleKey: '원정대',
    tag: '부럽 직영 원정대',
    sub: '부럽 몽골원정대 (직영) · 추가금 없음, USIM 포함, 게르 업그레이드, 특식 3회',
    title: '[3박4일] 몽골 중부 원정대 동행 조인 투어 (테를지 미니사막 우기호수 울란바토르 투어)',
    rating: '5.00',
    reviews: 20,
    discount: '30%',
    originPrice: '999,000원',
    price: '699,000원',
    img: 'https://files.boolub.com/upfiles/product/4219813096.png',
    highlights: ['포함·핵심코스: 추가금 없음, USIM 포함, 게르 업그레이드, 특식 3회', '운영 파트너: 부럽 몽골원정대 (부럽트래블 본사 직영)', '1인 예약도 모객 취소 없이 출발확정 보장']
  },
  {
    id: 'p2',
    pcode: 'C3954-E9344-H0474',
    pid: 'boolub',
    cat: '원정대',
    regionKey: '고비',
    durationKey: '4박5일',
    styleKey: '원정대',
    tag: '부럽 직영 원정대',
    sub: '부럽 몽골원정대 (직영) · 추가금 없음, USIM 포함, 게르 업그레이드, 특식',
    title: '[4박 5일] 몽골 고비사막 원정대 동행 조인 투어 (차강소브라가, 욜링암, 홍고린엘스, 바양작)',
    rating: '5.00',
    reviews: 10,
    discount: '13%',
    originPrice: '1,150,000원',
    price: '999,000원',
    img: 'https://files.boolub.com/upfiles/product/736206236.png',
    highlights: ['포함·핵심코스: 차강소브라가 · 욜링암 · 홍고린엘스 · 바양작 핵심 완주', '추가금 없음 · USIM 무료 포함 · 게르 업그레이드 · 특식 제공', '부럽트래블 본사 직영 1인 예약 출발확정 프로그램']
  },
  {
    id: 'p3',
    pcode: 'A7468-J1235-Q7992',
    pid: 'bbm0707',
    cat: '고비',
    regionKey: '고비',
    durationKey: '4박5일',
    styleKey: '단독',
    tag: '공식 파트너 투어',
    sub: 'BBM TOUR (비비엠투어) · 차강소브락-욜링암-홍고린엘스-바양작-달란잗갇',
    title: '[몽골] 고비사막 4박5일',
    rating: '5.00',
    reviews: 8,
    discount: '',
    originPrice: '',
    price: '1,333,400원',
    img: 'https://files.boolub.com/upfiles/product/3400418975.png',
    highlights: ['포함·핵심코스: 차강소브락 - 욜링암 - 홍고린엘스 - 바양작 - 달란잗갇', '운영 파트너: BBM TOUR (2009년 설립 15년 업력 정통 여행사)', '부럽 에스크로 안전 카드결제 및 일정 맞춤 상담 가능']
  },
  {
    id: 'p4',
    pcode: 'V6003-W0388-Z1928',
    pid: 'anoratour',
    cat: '고비',
    regionKey: '고비',
    durationKey: '4박5일',
    styleKey: '단독',
    tag: '공식 파트너 투어',
    sub: '노라투어 (NORA TOUR) · 바가가즈링촐로 - 욜링암 - 고비사막 - 바양작 - 차강소브라가',
    title: '[몽골] 고비사막 시그니처 코스 4박5일',
    rating: '4.83',
    reviews: 7,
    discount: '',
    originPrice: '',
    price: '1,441,100원',
    img: 'https://files.boolub.com/upfiles/product/2082172223.png',
    highlights: ['포함·핵심코스: 바가가즈링촐로 - 욜링암 - 고비사막 - 바양작 - 차강소브라가', '운영 파트너: 노라투어 (부럽 17개 정규 투어 운영 공식 파트너)', '부럽 안전결제 및 출발 인원별 맞춤 상담 가능']
  },
  {
    id: 'p5',
    pcode: 'I6778-W7230-M7386',
    pid: 'Bftour',
    cat: '고비',
    regionKey: '고비',
    durationKey: '4박5일',
    styleKey: '조인',
    tag: '조인·단독 가능',
    sub: '밝은 미래 여행 (BRIGHT FUTURE) · 낮에는 질주, 밤에는 별빛! 남고비 트립 [여행자 게르]',
    title: '[몽골] 낮에는 질주, 밤에는 별빛 ! 남고비 4박5일 투어 패키지 조인 / 동행 / 단독 가능',
    rating: '4.50',
    reviews: 7,
    discount: '',
    originPrice: '',
    price: '1,060,300원',
    img: 'https://dry7pvlp22cox.cloudfront.net/mrt-images-prod/2025/02/19/uDnn/49IDVb8jV5.jpg',
    highlights: ['포함·핵심코스: 남고비 핵심 트립 · 여행자 게르 숙박', '운영 파트너: 밝은 미래 여행 (울란바토르 직영 · 조인/동행/단독 모두 가능)', '부럽 에스크로 안전결제 지원']
  },
  {
    id: 'p6',
    pcode: 'L0277-Y0435-H3099',
    pid: 'khadag',
    cat: '단기',
    regionKey: '테를지',
    durationKey: '2박3일',
    styleKey: '단독',
    tag: '공식 파트너 투어',
    sub: '하닥투어 (KHADAG TOUR) 공식 판매 상품',
    title: '[몽골] 짧은일정 추천! 직장인들을 위한 2박3일 (몽골/테를지)',
    rating: '5.00',
    reviews: 6,
    discount: '',
    originPrice: '',
    price: '675,000원',
    img: 'https://dry7pvlp22cox.cloudfront.net/mrt-images-prod/2024/11/25/mOrl/uJTKVYoS0I.jpg',
    highlights: ['직장인 연차 최소화로 다녀오는 테를지·초원 2박3일 알짜 코스', '운영 파트너: 하닥투어 (평점 ★5.0 만점 기록 단기 베스트)', '부럽 에스크로 안전결제 지원']
  },
  {
    id: 'p7',
    pcode: 'W0569-C8410-H2737',
    pid: 'bbm0707',
    cat: '단기',
    regionKey: '고비',
    durationKey: '2박3일',
    styleKey: '단독',
    tag: '공식 파트너 투어',
    sub: 'BBM TOUR (비비엠투어) · 차강소브락, 바가가쯔링촐로',
    title: '[몽골] 남부투어(차강소브락-바가가쯔링촐로) 2박3일',
    rating: '4.83',
    reviews: 6,
    discount: '',
    originPrice: '',
    price: '800,000원',
    img: 'https://files.boolub.com/upfiles/product/3459423950.png',
    highlights: ['포함·핵심코스: 차강소브락 대협곡 · 바가가쯔링촐로 기암괴석', '운영 파트너: BBM TOUR (15년 업력 정통 파트너)', '짧은 2박3일 동안 남부 핵심 절경을 만나는 실속 투어']
  },
  {
    id: 'p8',
    pcode: 'H7863-P9594-D9241',
    pid: 'khadag',
    cat: '단기',
    regionKey: '중부',
    durationKey: '3박4일',
    styleKey: '단독',
    tag: '노천온천 힐링',
    sub: '하닥투어 (KHADAG TOUR) 공식 판매 상품',
    title: '[몽골] (인기) 몽골에서 온천을? 사막과 초원 그리고 온천까지! 3박4일 속성코스',
    rating: '4.67',
    reviews: 6,
    discount: '',
    originPrice: '',
    price: '900,000원',
    img: 'https://dry7pvlp22cox.cloudfront.net/mrt-images-prod/2024/11/25/ocAs/Ax10hCip2I.jpg',
    highlights: ['미니사막 + 푸른 초원 + 천연 온천욕을 3박4일에 모두 담는 인기 속성코스', '운영 파트너: 하닥투어 (부럽 공식 입점 검증)', '부럽 에스크로 안전결제 지원']
  },
  {
    id: 'p9',
    pcode: 'J8833-W9230-L2860',
    pid: 'SKYTOURS',
    cat: '단기',
    regionKey: '테를지',
    durationKey: '3박4일',
    styleKey: '단독',
    tag: '천체망원경 체험',
    sub: 'SKY TOURS MONGOLIA · 몽골 중부 코스',
    title: '[몽골] 사막, 온천, 테를지, 망원경체험 3박4일',
    rating: '5.00',
    reviews: 6,
    discount: '',
    originPrice: '',
    price: '876,525원',
    img: 'https://files.boolub.com/upfiles/product/2135197319.jpg',
    highlights: ['전문 천체망원경을 활용한 밤하늘 별자리 관측 체험 포함', '사막 · 온천 · 테를지 국립공원 핵심 동선 완주', '운영 파트너: SKY TOURS MONGOLIA (평점 ★5.0 기록)']
  },
  {
    id: 'p10',
    pcode: 'G8231-V9289-H9933',
    pid: 'doittavel',
    cat: '고비',
    regionKey: '고비',
    durationKey: '4박5일',
    styleKey: '단독',
    tag: '공식 파트너 투어',
    sub: '(주)두잇트래블 · A,B 코스 중 원하는 단 하나의 코스를 선택해 진행하는 맞춤형 투어',
    title: '[몽골] 4박5일 고비사막 투어',
    rating: '4.83',
    reviews: 6,
    discount: '',
    originPrice: '',
    price: '1,029,825원',
    img: 'https://files.boolub.com/upfiles/product/1139873302.jpg',
    highlights: ['포함·핵심코스: A/B 코스 중 취향에 맞는 코스를 직접 선택하는 맞춤형 투어', '운영 파트너: (주)두잇트래블 (서울 본사 정식 법인)', '부럽 에스크로 안전결제 지원']
  },
  {
    id: 'p11',
    pcode: 'Q3909-W7960-V2686',
    pid: 'YangGaTour',
    cat: '홉스골·중부',
    regionKey: '중부',
    durationKey: '4박5일',
    styleKey: '조인',
    tag: '조인·단독 가능',
    sub: '양가투어 (YangGa Mongolian Fri) · 테를지, 미니사막, 온천, 울란바토르, 어기호수, 촐로트 협곡, 폭포',
    title: '[몽골] 시그니처 투어 중부 4박5일 투어 패키지 조인 / 동행 / 단독 가능',
    rating: '5.00',
    reviews: 6,
    discount: '',
    originPrice: '',
    price: '1,367,700원',
    img: 'https://files.boolub.com/upfiles/product/362211901.jpg',
    highlights: ['포함·핵심코스: 테를지 · 미니사막 · 온천 · 어기호수 · 촐로트 협곡 · 폭포', '운영 파트너: YangGa Mongolian Friends (조인/동행/단독 모두 가능)', '부럽 에스크로 안전결제 지원']
  },
  {
    id: 'p12',
    pcode: 'I3885-I4036-S5377',
    pid: 'wit77777',
    cat: '단기',
    regionKey: '테를지',
    durationKey: '2박3일',
    styleKey: '단독',
    tag: '단독 공항픽업',
    sub: '더블유아이티 (WIT) · 울란바토르 공항 또는 호텔 이동을 단독 차량으로 편하게!',
    title: '몽골 공항 픽업 (울란바토르 호텔 공항 샌딩 단독차량)',
    rating: '5.00',
    reviews: 6,
    discount: '',
    originPrice: '',
    price: '19,200원',
    img: 'https://files.boolub.com/upfiles/product/3283866928.jpg',
    highlights: ['새벽·심야 도착 항공편도 걱정 없는 칭기스칸 국제공항 ↔ 호텔 단독 이동', '운영 파트너: 더블유아이티 (WIT · 평점 ★5.00)', '부럽 즉시 확정 인기 상품']
  }
];

/* 3. 부럽 실제 입점 몽골 공식 파트너사 9곳 (smart_company + smart_product 100% 실제 데이터 연동) */
const MOKTA_AGENCIES = [
  {
    id: 'ag1',
    pid: 'boolub',
    statusType: 'active',
    cert: '부럽 본사 직영 · 2개 원정대 운영',
    name: '부럽 몽골원정대 (직영)',
    en: 'BOOLUB EXPEDITION',
    cat: '고비·남부',
    spec: '1인 출발확정 직영',
    rating: '5.00',
    reviews: 30,
    prodCount: 2,
    resp: '즉시 출발확정',
    fleet: '원정대 전용 차량 배정',
    camp: '업그레이드 게르 보장',
    career: '부럽트래블(주) 본사 직영 · 대표 김준현',
    slogan: '동행 못 구해도 걱정 ZERO! 1인 신청 즉시 100% 출발확정 보장',
    perks: ['1인 신청 즉시 출발확정', '몽골 데이터 USIM 포함', '게르 업그레이드 · 특식 포함', '현지 추가금 0원'],
    desc: '부럽트래블(주)이 직영 운영하는 대표 몽골원정대 프로그램으로, 1인 신청 시에도 모객 취소 없이 출발이 확정되며 USIM 무료 제공·게르 업그레이드·특식 3회가 기본 포함됩니다.',
    logoImg: './images/mokta_logo.png',
    storeUrl: 'https://www.boolub.com/?pn=pages.view&type=pages&data=mgexpedition',
    repPcode: 'T0950-Q2923-W2496',
    cover: 'https://files.boolub.com/upfiles/product/4219813096.png',
    photos: [
      'https://files.boolub.com/upfiles/product/4219813096.png',
      'https://files.boolub.com/upfiles/product/736206236.png',
      './images/campfire_cheers.jpg'
    ],
    videoUrl: ''
  },
  {
    id: 'ag2',
    pid: 'bbm0707',
    statusType: 'active',
    cert: '부럽 공식파트너 · 17개 상품 운영',
    name: 'BBM TOUR (비비엠투어)',
    en: 'BBM MONGOLIA TOUR',
    cat: '고비·남부',
    spec: '2009년 설립 · 15년 전통',
    rating: '4.80',
    reviews: 107,
    prodCount: 17,
    resp: '빠른 현지응답',
    fleet: '스타렉스 · 푸르공 직영운행',
    camp: '남고비·중부·홉스골 검증캠프',
    career: '2009년 설립 · 울란바토르 본사 · 대표 Batkhuyag',
    slogan: '2009년 설립 15년 노하우, 울란바토르 현지 직영 베테랑 여행사',
    perks: ['2009년 설립 15년 업력', '남부·고비·중부·홉스골 17개 코스', '한국어 능통 현지 가이드', '단독·조인 맞춤 배차'],
    desc: '안녕하세요, BBM투어입니다. 2009년도에 설립하여 15년의 경험과 노하우를 바탕으로 안전하고 편안한 여행을 위해 최선의 서비스를 제공하고 있는 몽골 전문 여행사입니다.',
    logoImg: './images/partners/bbm0707.jpeg',
    storeUrl: 'https://www.boolub.com/?pn=partner.view&pid=bbm0707',
    repPcode: 'A7468-J1235-Q7992',
    cover: 'https://files.boolub.com/upfiles/product/3400418975.png',
    photos: [
      'https://files.boolub.com/upfiles/product/3400418975.png',
      'https://files.boolub.com/upfiles/product/2444534524.png',
      'https://files.boolub.com/upfiles/product/1912992338.png'
    ],
    videoUrl: ''
  },
  {
    id: 'ag3',
    pid: 'anoratour',
    statusType: 'active',
    cert: '부럽 공식파트너 · 17개 상품 운영',
    name: '노라투어 (NORA TOUR)',
    en: 'NORA TOUR MONGOLIA',
    cat: '고비·남부',
    spec: '고비·중부·홉스골 시그니처',
    rating: '4.81',
    reviews: 102,
    prodCount: 17,
    resp: '한국·몽골 직영상담',
    fleet: '전용 스타렉스 · 푸르공',
    camp: '샤워 가능 여행자 게르 캠프',
    career: '정식 국내외여행업 등록 법인 · 대표 SHINEBAYAR TSELMEG',
    slogan: '고비사막 시그니처부터 홉스골 7박8일 단독까지 17개 정규 라인업 운영',
    perks: ['부럽 17개 정규 투어 운영', '고비 THE자연·시그니처 전문', '한국 지사 정식 등록 여행사', '쾌적한 여행자 게르 배정'],
    desc: '경기도 고양시 국내 지사 및 몽골 현지 네트워크를 기반으로 고비사막 시그니처 4박5일, 중부 힐링코스, 홉스골 단독코스 등 17개 정규 상품을 운영하는 부럽 공식 파트너사입니다.',
    logoImg: './images/partners/anoratour.png',
    storeUrl: 'https://www.boolub.com/?pn=partner.view&pid=anoratour',
    repPcode: 'V6003-W0388-Z1928',
    cover: 'https://files.boolub.com/upfiles/product/2082172223.png',
    photos: [
      'https://files.boolub.com/upfiles/product/2082172223.png',
      'https://files.boolub.com/upfiles/product/1349546843.png',
      'https://files.boolub.com/upfiles/product/1688056962.png'
    ],
    videoUrl: ''
  },
  {
    id: 'ag4',
    pid: 'wit77777',
    statusType: 'active',
    cert: '부럽 공식파트너 · 15개 상품 운영',
    name: '더블유아이티 (WIT)',
    en: 'WORLD INDIVIDUAL TRAVEL',
    cat: '홉스골·중부',
    spec: '공항 단독픽업 · 단기 프라이빗',
    rating: '4.72',
    reviews: 88,
    prodCount: 15,
    resp: '단독차량 즉시연결',
    fleet: '공항 단독 세단·승합차량',
    camp: '테를지·미니사막 단독투어',
    career: '한국어가이드 단독투어 전문 · 대표 김광천',
    slogan: '새벽 칭기스칸 공항 단독 픽업부터 한국어가이드 단기 프라이빗 투어까지!',
    perks: ['울란바토르 공항 단독픽업·샌딩', '실력 검증 현지 한국어가이드', '테를지·미니사막 1박2일~2박3일', '우리 일행 프라이빗 단독 출발'],
    desc: '더블유아이티는 몽골 현지 실력 있는 한국어 가이드 단독 투어 및 울란바토르 국제공항 ↔ 호텔 단독 픽업·샌딩을 전문 운영하는 부럽 공식 입점 여행사입니다.',
    logoImg: './images/partners/wit77777.png',
    storeUrl: 'https://www.boolub.com/?pn=partner.view&pid=wit77777',
    repPcode: 'I3885-I4036-S5377',
    cover: 'https://files.boolub.com/upfiles/product/3283866928.jpg',
    photos: [
      'https://files.boolub.com/upfiles/product/3283866928.jpg',
      'https://files.boolub.com/upfiles/product/2735415753.jpg',
      'https://files.boolub.com/upfiles/product/74394500.jpg'
    ],
    videoUrl: ''
  },
  {
    id: 'ag5',
    pid: 'YangGaTour',
    statusType: 'active',
    cert: '부럽 공식파트너 · 14개 상품 운영',
    name: '양가투어 (YangGa Mongolian Fri)',
    en: 'YANGGA MONGOLIAN FRIENDS',
    cat: '홉스골·중부',
    spec: '중부 시그니처 · 홉스골 전문',
    rating: '4.76',
    reviews: 82,
    prodCount: 14,
    resp: '울란바토르 직영',
    fleet: '장거리 투어 전용 차량',
    camp: '어기호수·온천·홉스골 캠프',
    career: '울란바토르 현지 법인 직영 · 대표 G.Uyanga',
    slogan: '테를지·미니사막·쳉헤르 온천부터 홉스골까지 조인·단독 시그니처 투어',
    perks: ['중부 2박3일~6박7일 전 라인업', '조인·동행·단독 모두 가능', '쳉헤르 온천·촐로트 협곡 코스', '홉스골 5박6일 패키지 운영'],
    desc: '울란바토르 현지 직영 법인(YangGa Mongolian Friends)으로 중부 시그니처(테를지·미니사막·온천·어기호수) 2박~6박 코스와 고비·홉스골 조인/단독 패키지 14종을 전문 운영합니다.',
    logoImg: './images/partners/YangGaTour.png',
    storeUrl: 'https://www.boolub.com/?pn=partner.view&pid=YangGaTour',
    repPcode: 'Q3909-W7960-V2686',
    cover: 'https://files.boolub.com/upfiles/product/362211901.jpg',
    photos: [
      'https://files.boolub.com/upfiles/product/362211901.jpg',
      'https://files.boolub.com/upfiles/product/1654587418.jpg',
      'https://files.boolub.com/upfiles/product/822342166.jpg'
    ],
    videoUrl: ''
  },
  {
    id: 'ag6',
    pid: 'Bftour',
    statusType: 'active',
    cert: '부럽 공식파트너 · 13개 상품 운영',
    name: '밝은 미래 여행 (BRIGHT FUTURE)',
    en: 'BRIGHT FUTURE TOUR',
    cat: '고비·남부',
    spec: '은하수 헌팅 · 샤워가능 게르',
    rating: '4.72',
    reviews: 77,
    prodCount: 13,
    resp: '현지 직영 상담',
    fleet: '남고비·홉스골 오프로드 차량',
    camp: '매일 샤워 가능 여행자 게르',
    career: '울란바토르 메트로비즈니스센터 본사 · 대표 ALTANCHIMEG',
    slogan: '매일 샤워 가능한 게르 숙박 & 삼겹살·허르헉·은하수 헌팅 풀패키지!',
    perks: ['매일 샤워 가능한 게르 코스 보유', '삼겹살+허르헉 특식 패키지', '천체망원경 · 은하수 헌팅 테마', '남고비 & 홉스골 13개 상품 운영'],
    desc: '울란바토르 중심가 메트로 비즈니스센터에 위치한 직영 여행사로, 매일 샤워 가능한 게르 숙박 고비사막 투어와 홉스골 은하수 헌팅·천체망원경 체험 투어 13종을 운영합니다.',
    logoImg: './images/partners/Bftour.png',
    storeUrl: 'https://www.boolub.com/?pn=partner.view&pid=Bftour',
    repPcode: 'I6778-W7230-M7386',
    cover: 'https://dry7pvlp22cox.cloudfront.net/mrt-images-prod/2025/02/19/uDnn/49IDVb8jV5.jpg',
    photos: [
      'https://dry7pvlp22cox.cloudfront.net/mrt-images-prod/2025/02/19/uDnn/49IDVb8jV5.jpg',
      'https://dry7pvlp22cox.cloudfront.net/mrt-images-prod/2025/02/20/Izi6/PwPz5BkKu0.jpeg',
      'https://dry7pvlp22cox.cloudfront.net/mrt-images-prod/2025/02/25/s2oV/Xxd6D7M9g2.jpeg'
    ],
    videoUrl: ''
  },
  {
    id: 'ag7',
    pid: 'doittavel',
    statusType: 'active',
    cert: '부럽 공식파트너 · 12개 상품 운영',
    name: '(주)두잇트래블',
    en: 'DO IT TRAVEL',
    cat: '고비·남부',
    spec: 'A/B 선택형 맞춤코스 전문',
    rating: '4.84',
    reviews: 71,
    prodCount: 12,
    resp: '서울 본사 빠른상담',
    fleet: '일정별 전용 차량 배정',
    camp: '고비·중부·홉스골 정식 캠프',
    career: '서울 동대문구 정식 법인 여행사 · 대표 정상국',
    slogan: '원하는 동선대로 고르는 고비 A/B 선택형 투어 & 홉스골 풀패키지',
    perks: ['고비 A/B 코스 맞춤형 선택', '5박6일~7박8일 홉스골 일주', '모래썰매·낙타·승마·보트 포함', '서울 본사 직통 안전 케어'],
    desc: '서울 동대문구 소재 (주)두잇트래블 법인이 직접 운영하며, A/B 코스 중 원하는 코스를 선택하는 4박5일 고비사막 투어와 5박~7박 홉스골 조인·단독 패키지 12종을 제공합니다.',
    logoImg: null,
    c1: '#0284c7',
    c2: '#38bdf8',
    abbr: 'DOIT',
    storeUrl: 'https://www.boolub.com/?pn=partner.view&pid=doittavel',
    repPcode: 'G8231-V9289-H9933',
    cover: 'https://files.boolub.com/upfiles/product/1139873302.jpg',
    photos: [
      'https://files.boolub.com/upfiles/product/1139873302.jpg',
      'https://files.boolub.com/upfiles/product/4229358534.jpg',
      'https://files.boolub.com/upfiles/product/1778519022.jpg'
    ],
    videoUrl: ''
  },
  {
    id: 'ag8',
    pid: 'SKYTOURS',
    statusType: 'active',
    cert: '부럽 공식파트너 · 9개 상품 운영',
    name: 'SKY TOURS MONGOLIA (스카이투어)',
    en: 'SKY TOURS MONGOLIA',
    cat: '홉스골·중부',
    spec: '천체망원경 별관측 · 중부·고비',
    rating: '4.90',
    reviews: 51,
    prodCount: 9,
    resp: '현지 직영 확정',
    fleet: '전용 투어 차량 배정',
    camp: '별자리 관측 최적 게르 캠프',
    career: '울란바토르 직영 · 평균평점 ★4.90 · 대표 MUNKHTULGA BAATAR',
    slogan: '사막·온천·테를지 핵심 동선에 천체망원경 별자리 관측까지 더한 감동 투어',
    perks: ['천체망원경 별자리 체험 포함', '테를지 1박2일 단기부터 6박7일까지', '고비사막 · 홉스골 정규 9개 상품', '부럽 고객 평점 ★4.90 우수 파트너'],
    desc: '울란바토르 현지 직영 랜드사(SKY TOURS MONGOLIA)로 천체망원경 별자리 체험 3박4일, 테를지 1박2일 단기코스, 고비사막 및 홉스골 정규 투어 9종을 높은 만족도로 운영합니다.',
    logoImg: './images/partners/SKYTOURS.jpg',
    storeUrl: 'https://www.boolub.com/?pn=partner.view&pid=SKYTOURS',
    repPcode: 'J8833-W9230-L2860',
    cover: 'https://files.boolub.com/upfiles/product/2135197319.jpg',
    photos: [
      'https://files.boolub.com/upfiles/product/2135197319.jpg',
      'https://files.boolub.com/upfiles/product/4227422819.jpg',
      'https://files.boolub.com/upfiles/product/1399185027.jpg'
    ],
    videoUrl: ''
  },
  {
    id: 'ag9',
    pid: 'khadag',
    statusType: 'active',
    cert: '부럽 공식파트너 · 5개 상품 운영',
    name: '하닥투어 (KHADAG TOUR)',
    en: 'KHADAG TOUR MONGOLIA',
    cat: '홉스골·중부',
    spec: '직장인 단기 · 온천 · 키즈 특화',
    rating: '4.86',
    reviews: 29,
    prodCount: 5,
    resp: '한국·몽골 전담케어',
    fleet: '단독 프라이빗 쾌적 차량',
    camp: '테를지·쳉헤르 온천 우수캠프',
    career: '울란바토르 본사 · 한국인 전담케어 · 대표 Yadam suren',
    slogan: '직장인 알짜 2박3일 테를지부터 사막+온천 3박4일, 어린이 키즈 투어까지!',
    perks: ['직장인 추천 테를지 2박3일 베스트', '사막+초원+온천 3박4일 속성코스', '초원 체험형 키즈 전용 3박4일', '버킷리스트 5박6일 고비사막·홉스골'],
    desc: '직장인을 위한 짧은 2박3일 테를지 투어, 사막·초원·온천을 한 번에 즐기는 3박4일 속성코스, 아이 동반 가족을 위한 키즈 몽골 여행 등 특색 있는 알짜 투어를 운영합니다.',
    logoImg: './images/partners/khadag.png',
    storeUrl: 'https://www.boolub.com/?pn=partner.view&pid=khadag',
    repPcode: 'L0277-Y0435-H3099',
    cover: 'https://dry7pvlp22cox.cloudfront.net/mrt-images-prod/2024/11/25/mOrl/uJTKVYoS0I.jpg',
    photos: [
      'https://dry7pvlp22cox.cloudfront.net/mrt-images-prod/2024/11/25/mOrl/uJTKVYoS0I.jpg',
      'https://dry7pvlp22cox.cloudfront.net/mrt-images-prod/2024/11/25/ocAs/Ax10hCip2I.jpg',
      'https://dry7pvlp22cox.cloudfront.net/mrt-images-prod/2024/11/25/hWIh/GEBFLDb7FX.jpg'
    ],
    videoUrl: ''
  }
];

/* 4. 실시간 출발확정 동행·조인 데이터 (5월~10월 월간 캘린더 연동 · 파트너 오픈조인 + 여행자 모집 + 원정대 통합) */
const KR_HOLIDAYS_2026 = {
  '2026-05-01': '근로자의날',
  '2026-05-05': '어린이날',
  '2026-05-24': '석가탄신일',
  '2026-05-25': '대체휴일',
  '2026-06-06': '현충일',
  '2026-08-15': '광복절',
  '2026-08-17': '대체휴일',
  '2026-09-24': '추석연휴',
  '2026-09-25': '추석',
  '2026-09-26': '추석연휴',
  '2026-10-03': '개천절',
  '2026-10-05': '대체휴일',
  '2026-10-09': '한글날'
};

const JOIN_ITEMS = [
  {
    id: 'bbs_1602',
    dateKey: '2026-08-06',
    dateStr: '8.06(목) ~ 8.09(일) · 3박4일',
    regionKey: '중부',
    durationKey: '3박4일',
    styleKey: '조인',
    statusBadge: '실제 커뮤니티 동행',
    statusCls: 'amber',
    subBadge: '4자리 모집중',
    subCls: 'sky',
    agency: '부럽 동행커뮤니티 · 윤*지',
    pcode: 'T0950-Q2923-W2496',
    title: '8월6일-8월9일 중부지역 동행 구함 2명 모집완 / 4명 모집 중',
    img: 'https://files.boolub.com/upfiles/product/4219813096.png',
    filled: 2,
    max: 6,
    seats: ['윤*지(방장)', '동행확정', '빈좌석', '빈좌석', '빈좌석', '빈좌석'],
    curPrice: '699,000원',
    fullPrice: '699,000원',
    tags: '부럽 실제 동행찾기 · 조회 3,124회',
    bbsUrl: 'https://www.boolub.com/?pn=board.view&_menu=community&_uid=1602'
  },
  {
    id: 'bbs_1599',
    dateKey: '2026-08-12',
    dateStr: '8.12 출발 · 4박5일',
    regionKey: '고비',
    durationKey: '4박5일',
    styleKey: '조인',
    statusBadge: '실제 커뮤니티 동행',
    statusCls: 'amber',
    subBadge: '4자리 모집중',
    subCls: 'sky',
    agency: '부럽 동행커뮤니티 · 선*슬',
    pcode: 'C3954-E9344-H0474',
    title: '고비사막 4박5일★ 같이 떠나실 동행분 구합니다',
    img: 'https://files.boolub.com/upfiles/product/736206236.png',
    filled: 2,
    max: 6,
    seats: ['선*슬(방장)', '동행확정', '빈좌석', '빈좌석', '빈좌석', '빈좌석'],
    curPrice: '999,000원',
    fullPrice: '999,000원',
    tags: '부럽 실제 동행찾기 · 조회 3,502회',
    bbsUrl: 'https://www.boolub.com/?pn=board.view&_menu=community&_uid=1599'
  },
  {
    id: 'bbs_1515',
    dateKey: '2026-08-04',
    dateStr: '8.04(화) 출발 · 4박5일',
    regionKey: '고비',
    durationKey: '4박5일',
    styleKey: '조인',
    statusBadge: '실제 커뮤니티 동행',
    statusCls: 'amber',
    subBadge: '3자리 모집중',
    subCls: 'sky',
    agency: '부럽 동행커뮤니티 · 부럽트래블',
    pcode: 'V6003-W0388-Z1928',
    title: '8월4일 출발 몽골 동행구해요~ (일정 조인 환영)',
    img: 'https://files.boolub.com/upfiles/product/2082172223.png',
    filled: 3,
    max: 6,
    seats: ['확정1', '확정2', '확정3', '빈좌석', '빈좌석', '빈좌석'],
    curPrice: '1,441,100원',
    fullPrice: '1,250,000원',
    tags: '부럽 실제 동행찾기 · 조회 8,080회',
    bbsUrl: 'https://www.boolub.com/?pn=board.view&_menu=community&_uid=1515'
  },
  {
    id: 'bbs_1392',
    dateKey: '2026-08-09',
    dateStr: '8.09(일) 출발 · 4박5일',
    regionKey: '고비',
    durationKey: '4박5일',
    styleKey: '조인',
    statusBadge: '실제 커뮤니티 동행',
    statusCls: 'amber',
    subBadge: '4자리 모집중',
    subCls: 'sky',
    agency: '부럽 동행커뮤니티 · 부럽트래블',
    pcode: 'C3954-E9344-H0474',
    title: '[동행찾기] 8월9일 2인 대기중 // 4명 추가모집(성별무관)',
    img: 'https://files.boolub.com/upfiles/product/736206236.png',
    filled: 2,
    max: 6,
    seats: ['대기1', '대기2', '빈좌석', '빈좌석', '빈좌석', '빈좌석'],
    curPrice: '999,000원',
    fullPrice: '999,000원',
    tags: '부럽 실제 동행찾기 · 조회 9,636회',
    bbsUrl: 'https://www.boolub.com/?pn=board.view&_menu=community&_uid=1392'
  },
  {
    id: 'bbs_1390',
    dateKey: '2026-06-18',
    dateStr: '6.18(목) 출발 · 3박4일',
    regionKey: '중부',
    durationKey: '3박4일',
    styleKey: '조인',
    statusBadge: '실제 커뮤니티 동행',
    statusCls: 'amber',
    subBadge: '3자리 모집중',
    subCls: 'sky',
    agency: '부럽 동행커뮤니티 · 부럽트래블',
    pcode: 'T0950-Q2923-W2496',
    title: '6월18일 초여름 몽골 동행찾습니다~',
    img: 'https://files.boolub.com/upfiles/product/4219813096.png',
    filled: 3,
    max: 6,
    seats: ['확정1', '확정2', '확정3', '빈좌석', '빈좌석', '빈좌석'],
    curPrice: '699,000원',
    fullPrice: '699,000원',
    tags: '부럽 실제 동행찾기 · 조회 8,987회',
    bbsUrl: 'https://www.boolub.com/?pn=board.view&_menu=community&_uid=1390'
  },
  {
    id: 'j_may1',
    dateKey: '2026-05-02',
    dateStr: '5.02(토) ~ 5.05(화) · 3박4일',
    regionKey: '중부',
    durationKey: '3박4일',
    styleKey: '원정대',
    statusBadge: '어린이날 연휴 확정',
    statusCls: 'sky',
    subBadge: '2자리 남음',
    subCls: 'coral',
    agency: '부럽 몽골원정대 (직영)',
    pcode: 'T0950-Q2923-W2496',
    title: '[5월 황금연휴] 중부 미니사막·테를지·우기호수 3박4일 원정대 조인',
    img: 'https://files.boolub.com/upfiles/product/4219813096.png',
    filled: 4,
    max: 6,
    seats: ['20대여', '20대여', '30대남', '30대여', '빈좌석', '빈좌석'],
    curPrice: '699,000원',
    fullPrice: '699,000원',
    tags: '연차 1일 황금연휴 · USIM 무료 · 특식 3회'
  },
  {
    id: 'j_may2',
    dateKey: '2026-05-23',
    dateStr: '5.23(토) ~ 5.26(화) · 3박4일',
    regionKey: '중부',
    durationKey: '3박4일',
    styleKey: '조인',
    statusBadge: '출발확정 오픈조인',
    statusCls: 'sky',
    subBadge: '1자리 남음!',
    subCls: 'coral',
    agency: '하닥투어 (KHADAG TOUR)',
    pcode: 'H7863-P9594-D9241',
    title: '[대체휴일 연휴] 사막+초원+쳉헤르 노천온천 3박4일 마지막 1분 모십니다',
    img: 'https://dry7pvlp22cox.cloudfront.net/mrt-images-prod/2024/11/25/ocAs/Ax10hCip2I.jpg',
    filled: 5,
    max: 6,
    seats: ['20대여', '30대여', '30대남', '20대남', '30대여', '빈좌석'],
    curPrice: '900,000원',
    fullPrice: '810,000원',
    tags: '석가탄신일 대체휴일 · 노천온천 캠프 포함'
  },
  {
    id: 'j_jun1',
    dateKey: '2026-06-05',
    dateStr: '6.05(금) ~ 6.07(일) · 2박3일',
    regionKey: '테를지',
    durationKey: '2박3일',
    styleKey: '조인',
    statusBadge: '현충일 주말확정',
    statusCls: 'sky',
    subBadge: '2자리 남음',
    subCls: 'coral',
    agency: '하닥투어 (KHADAG TOUR)',
    pcode: 'L0277-Y0435-H3099',
    title: '[현충일 주말] 직장인 연차 1개! 테를지·승마·초원 힐링 2박3일 조인팀',
    img: 'https://dry7pvlp22cox.cloudfront.net/mrt-images-prod/2024/11/25/mOrl/uJTKVYoS0I.jpg',
    filled: 4,
    max: 6,
    seats: ['20대여', '20대여', '30대남', '30대남', '빈좌석', '빈좌석'],
    curPrice: '675,000원',
    fullPrice: '610,000원',
    tags: '직장인 주말추천 · 온수 샤워 게르 · 승마 포함'
  },
  {
    id: 'j5',
    dateKey: '2026-07-18',
    dateStr: '7.18(토) ~ 7.20(월) · 2박3일',
    regionKey: '고비',
    durationKey: '2박3일',
    styleKey: '조인',
    statusBadge: '출발확정',
    statusCls: 'sky',
    subBadge: '2자리 남음',
    subCls: 'coral',
    agency: 'BBM TOUR (비비엠투어)',
    pcode: 'W0569-C8410-H2737',
    title: '[연차 1일] 차강소브락 대협곡·바가가쯔링촐로 남부 핵심 2박3일 조인팀',
    img: 'https://files.boolub.com/upfiles/product/3459423950.png',
    filled: 4,
    max: 6,
    seats: ['20대남', '20대여', '30대여', '30대남', '빈좌석', '빈좌석'],
    curPrice: '800,000원',
    fullPrice: '720,000원',
    tags: 'BBM투어 베스트 단기코스 · 감성 푸르공 · 별밤 스냅'
  },
  {
    id: 'j2',
    dateKey: '2026-07-25',
    dateStr: '7.25(토) ~ 7.29(수) · 4박5일',
    regionKey: '고비',
    durationKey: '4박5일',
    styleKey: '조인',
    statusBadge: '출발확정 오픈조인',
    statusCls: 'sky',
    subBadge: '마지막 1자리!',
    subCls: 'coral',
    agency: '노라투어 (NORA TOUR)',
    pcode: 'V6003-W0388-Z1928',
    title: '[출발확정] 고비사막 시그니처 4박5일 샤워 가능 캠프팀 마지막 1분 모십니다',
    img: 'https://files.boolub.com/upfiles/product/2082172223.png',
    filled: 5,
    max: 6,
    seats: ['20대여', '20대여', '30대여', '20대남', '30대남', '빈좌석'],
    curPrice: '1,441,100원',
    fullPrice: '1,280,000원',
    tags: '노라투어 대표 시그니처 · 6인 마감 시 인원별 할인'
  },
  {
    id: 'j3',
    dateKey: '2026-08-01',
    dateStr: '8.01(토) ~ 8.04(화) · 3박4일',
    regionKey: '중부',
    durationKey: '3박4일',
    styleKey: '원정대',
    statusBadge: '1인 신청도 확정',
    statusCls: 'sky',
    subBadge: '2자리 남음',
    subCls: 'coral',
    agency: '부럽 몽골원정대 (직영)',
    pcode: 'T0950-Q2923-W2496',
    title: '[여름휴가 피크] 중부 미니사막·테를지·우기호수 3박4일 원정대 조인',
    img: 'https://files.boolub.com/upfiles/product/4219813096.png',
    filled: 4,
    max: 6,
    seats: ['20대여', '30대여', '30대남', '20대남', '빈좌석', '빈좌석'],
    curPrice: '699,000원',
    fullPrice: '699,000원',
    tags: '게르 업그레이드 · 유심 제공 · 허르헉 특식 포함'
  },
  {
    id: 'j4',
    dateKey: '2026-08-08',
    dateStr: '8.08(토) ~ 8.13(목) · 5박6일',
    regionKey: '홉스골',
    durationKey: '5박6일',
    styleKey: '조인',
    statusBadge: '출발확정 오픈조인',
    statusCls: 'sky',
    subBadge: '마지막 1자리!',
    subCls: 'coral',
    agency: '양가투어 (YangGa Mongolian Fri)',
    pcode: 'E4890-B3318-G7233',
    title: '한여름 시원한 홉스골 호수 5박6일 패키지 조인 마지막 1자리 합류하세요',
    img: 'https://files.boolub.com/upfiles/product/1740762828.jpg',
    filled: 5,
    max: 6,
    seats: ['30대여', '30대여', '30대남', '40대여', '30대남', '빈좌석'],
    curPrice: '1,588,300원',
    fullPrice: '1,390,000원',
    tags: '양가투어 홉스골 정규코스 · 보트체험 · 호숫가 게르'
  },
  {
    id: 'j1',
    dateKey: '2026-08-15',
    dateStr: '8.15(토) ~ 8.19(수) · 4박5일',
    regionKey: '고비',
    durationKey: '4박5일',
    styleKey: '원정대',
    statusBadge: '100% 출발확정',
    statusCls: 'sky',
    subBadge: '2자리 남음',
    subCls: 'coral',
    agency: '부럽 몽골원정대 (직영)',
    pcode: 'C3954-E9344-H0474',
    title: '[광복절 대체휴일] 고비사막 원정대 4박5일 (홍고린엘스·바양작·유심 무료)',
    img: 'https://files.boolub.com/upfiles/product/736206236.png',
    filled: 4,
    max: 6,
    seats: ['20대여', '20대여', '30대남', '30대남', '빈좌석', '빈좌석'],
    curPrice: '999,000원',
    fullPrice: '999,000원',
    tags: '추가금 0원 · USIM 무료 · 특식 포함 · 각자 카드결제'
  },
  {
    id: 'j_aug_sub',
    dateKey: '2026-08-15',
    dateStr: '8.15(토) ~ 8.20(목) · 5박6일',
    regionKey: '고비',
    durationKey: '5박6일',
    styleKey: '조인',
    statusBadge: '출발확정 오픈조인',
    statusCls: 'sky',
    subBadge: '1자리 남음!',
    subCls: 'coral',
    agency: '밝은 미래 여행 (BRIGHT FUTURE)',
    pcode: 'E0711-V0341-Z7774',
    title: '[광복절 연휴] 몽골 일출부터 별빛까지! 남고비·테를지 5박6일 확정차량 잔여 1석',
    img: 'https://dry7pvlp22cox.cloudfront.net/mrt-images-prod/2025/02/19/GkH4/MQu03BafWf.jpg',
    filled: 5,
    max: 6,
    seats: ['20대남', '20대여', '20대여', '30대남', '30대여', '빈좌석'],
    curPrice: '1,253,000원',
    fullPrice: '1,120,000원',
    tags: '밝은미래여행 정식 패키지 · 남고비+테를지 완주'
  },
  {
    id: 'j_aug15_bbm',
    dateKey: '2026-08-15',
    dateStr: '8.15(토) ~ 8.19(수) · 4박5일',
    regionKey: '고비',
    durationKey: '4박5일',
    styleKey: '조인',
    statusBadge: '출발확정 오픈조인',
    statusCls: 'sky',
    subBadge: '1자리 남음!',
    subCls: 'coral',
    agency: 'BBM TOUR (비비엠투어)',
    pcode: 'A7468-J1235-Q7992',
    title: '[광복절 연휴] BBM투어 고비사막 4박5일 (차강소브락·홍고린엘스) 마지막 1석!',
    img: 'https://files.boolub.com/upfiles/product/3400418975.png',
    filled: 5,
    max: 6,
    seats: ['20대남', '20대여', '30대남', '30대여', '20대여', '빈좌석'],
    curPrice: '1,333,400원',
    fullPrice: '1,180,000원',
    tags: '2009년 설립 15년 전통 · 차강소브락·욜링암·홍고린엘스'
  },
  {
    id: 'j_aug12_doit',
    dateKey: '2026-08-15',
    dateStr: '8.15(토) ~ 8.19(수) · 4박5일',
    regionKey: '고비',
    durationKey: '4박5일',
    styleKey: '조인',
    statusBadge: '여행자 동행모집',
    statusCls: 'amber',
    subBadge: '2자리 모집중',
    subCls: 'sky',
    agency: '(주)두잇트래블',
    pcode: 'G8231-V9289-H9933',
    title: '[광복절 연휴] 두잇트래블 4박5일 고비사막 A코스 맞춤 조인 가실 2분!',
    img: 'https://files.boolub.com/upfiles/product/1139873302.jpg',
    filled: 4,
    max: 6,
    seats: ['20대여(방장)', '20대여', '30대남', '30대여', '빈좌석', '빈좌석'],
    curPrice: '1,029,825원',
    fullPrice: '920,000원',
    tags: 'A/B 코스 선택형 · 서울 본사 법인 케어'
  },
  {
    id: 'j6',
    dateKey: '2026-08-22',
    dateStr: '8.22(토) ~ 8.25(화) · 3박4일',
    regionKey: '테를지',
    durationKey: '3박4일',
    styleKey: '조인',
    statusBadge: '여행자 동행모집',
    statusCls: 'amber',
    subBadge: '3자리 모집중',
    subCls: 'sky',
    agency: 'SKY TOURS MONGOLIA (스카이투어)',
    pcode: 'J8833-W9230-L2860',
    title: '8월 말 사막+온천+테를지+천체망원경 체험 3박4일 같이 가실 분!',
    img: 'https://files.boolub.com/upfiles/product/2135197319.jpg',
    filled: 3,
    max: 6,
    seats: ['20대여(방장)', '20대여', '30대여', '빈좌석', '빈좌석', '빈좌석'],
    curPrice: '876,525원',
    fullPrice: '780,000원',
    tags: '전문 천체망원경 별자리 관측 · 노천온천 힐링'
  },
  {
    id: 'j_sep1',
    dateKey: '2026-09-24',
    dateStr: '9.24(목) ~ 9.28(월) · 4박5일',
    regionKey: '고비',
    durationKey: '4박5일',
    styleKey: '원정대',
    statusBadge: '추석연휴 출발확정',
    statusCls: 'sky',
    subBadge: '2자리 남음',
    subCls: 'coral',
    agency: '부럽 몽골원정대 (직영)',
    pcode: 'C3954-E9344-H0474',
    title: '[추석 황금연휴] 고비사막 은하수 원정대 4박5일 (연차 1일 · 출발확정)',
    img: 'https://files.boolub.com/upfiles/product/736206236.png',
    filled: 4,
    max: 6,
    seats: ['20대여', '30대여', '30대남', '30대남', '빈좌석', '빈좌석'],
    curPrice: '999,000원',
    fullPrice: '999,000원',
    tags: '추석연휴 조기마감 주의 · USIM 포함 · 추가금 0원'
  },
  {
    id: 'j_oct1',
    dateKey: '2026-10-03',
    dateStr: '10.03(토) ~ 10.06(화) · 3박4일',
    regionKey: '중부',
    durationKey: '3박4일',
    styleKey: '조인',
    statusBadge: '개천절 연휴모집',
    statusCls: 'amber',
    subBadge: '3자리 모집중',
    subCls: 'sky',
    agency: 'BBM TOUR (비비엠투어)',
    pcode: 'Z6438-S8935-G7323',
    title: '[10월 개천절 대체휴일] 중부투어(미니사막+온천+호수) 3박4일 동행 모집',
    img: 'https://files.boolub.com/upfiles/product/551185861.png',
    filled: 3,
    max: 6,
    seats: ['30대여(방장)', '30대여', '30대남', '빈좌석', '빈좌석', '빈좌석'],
    curPrice: '1,066,700원',
    fullPrice: '940,000원',
    tags: '연차 1일 알짜코스 · 쳉헤르 온천 숙박'
  }
];

/* 5. 고객 맞춤 일정 요청 & 공식 파트너사 실데이터 비교견적 */
const RFQ_ITEMS = [
  {
    id: 'r1',
    author: '김*서 여행자님',
    avatar: '김',
    timeAgo: '14분 전 등록',
    cat: '단독투어',
    regionTag: '고비',
    dates: '8월 15일 ~ 8월 19일 (4박 5일)',
    paxType: '단독투어 · 직장인 친구 4명 확정',
    title: '광복절 연휴 친구 4명 고비사막 4박5일 단독투어 (온수 샤워 캠프 희망)',
    desc: '대한항공 오후 도착 항공권 발권 완료했습니다. 차강소브락·홍고린엘스·바양작 코스로 희망하며, 전 일정 샤워 가능한 깔끔한 게르와 전용 차량 조건으로 비교해보고 싶습니다.',
    specs: ['4명 단독차량', '전용 스타렉스·푸르공', '샤워 가능 캠프 필수', '현지 추가금 0원 조건'],
    quotes: [
      {
        agency: '노라투어 (NORA TOUR)',
        pid: 'anoratour',
        pcode: 'V6003-W0388-Z1928',
        logo: './images/partners/anoratour.png',
        badge: '부럽 공식파트너 · 고비 시그니처',
        price4: '1,441,100원',
        price6: '1,250,000원',
        veh: '전용 현대 스타렉스 4WD 단독 배정',
        ger: '전 일정 온수 샤워 가능 투어리스트 캠프',
        vehImg: 'https://files.boolub.com/upfiles/product/2082172223.png',
        gerImg: 'https://files.boolub.com/upfiles/product/1688056962.png',
        comment: '대한항공 도착 시간에 맞춰 칭기스칸 공항 단독 픽업 포함해 드립니다. 부럽 등록 [고비사막 시그니처 코스 4박5일]과 동일 스펙으로 안전결제 가능합니다!'
      },
      {
        agency: 'BBM TOUR (비비엠투어)',
        pid: 'bbm0707',
        pcode: 'A7468-J1235-Q7992',
        logo: './images/partners/bbm0707.jpeg',
        badge: '2009년 설립 · 15년 업력 베테랑',
        price4: '1,333,400원',
        price6: '1,150,000원',
        veh: '직영 정비 스타렉스 또는 감성 푸르공 선택',
        ger: '남고비 검증 여행자 캠프 + 특식 허르헉 포함',
        vehImg: 'https://files.boolub.com/upfiles/product/3400418975.png',
        gerImg: 'https://files.boolub.com/upfiles/product/2444534524.png',
        comment: '15년 경력 한국어 능통 가이드 배정 확정 가능합니다. 차강소브락-욜링암-홍고린엘스-바양작 정규 코스로 추가금 없이 모시겠습니다.'
      },
      {
        agency: '밝은 미래 여행 (BRIGHT FUTURE)',
        pid: 'Bftour',
        pcode: 'I6778-W7230-M7386',
        logo: './images/partners/Bftour.png',
        badge: '울란바토르 직영 · 남고비 베스트',
        price4: '1,060,300원',
        price6: '950,000원',
        veh: '단독 4WD 승합차량 (차량 내 생수 상시 비치)',
        ger: '남고비 여행자 게르 캠프 배정',
        vehImg: 'https://dry7pvlp22cox.cloudfront.net/mrt-images-prod/2025/02/19/uDnn/49IDVb8jV5.jpg',
        gerImg: 'https://dry7pvlp22cox.cloudfront.net/mrt-images-prod/2025/02/20/Izi6/PwPz5BkKu0.jpeg',
        comment: '친구 4분 프라이빗 일정에 맞춰 여유로운 출발 시간과 은하수 별빛 스냅 촬영을 정성껏 챙겨드립니다.'
      }
    ]
  },
  {
    id: 'r2',
    author: '박*현 여행자님',
    avatar: '박',
    timeAgo: '42분 전 등록',
    cat: '단독투어',
    regionTag: '홉스골',
    dates: '7월 28일 ~ 8월 02일 (5박 6일)',
    paxType: '가족 단독투어 · 부모님 동반 5명',
    title: '부모님 칠순 기념 여름 홉스골 호수 + 온천 편안한 가족 단독투어 문의',
    desc: '60대 부모님 두 분 포함 성인 5명 가족여행입니다. 비포장 이동이 너무 힘들지 않게 쾌적한 전용 승합차량과 깨끗한 호숫가 숙소 위주로 제안 부탁드립니다.',
    specs: ['부모님 동반 5인', '홉스골+온천 힐링', '레이크뷰 게르 선호', '한식·특식 케어'],
    quotes: [
      {
        agency: '노라투어 (NORA TOUR)',
        pid: 'anoratour',
        pcode: 'A9725-O5305-E2887',
        logo: './images/partners/anoratour.png',
        badge: '홉스골 노라단독 코스',
        price4: '1,750,000원',
        price6: '1,580,000원',
        veh: '여유로운 전용 벤 단독 배정 (장거리 구간 휴식 케어)',
        ger: '홉스골 호수 인접 업그레이드 게르 리조트',
        vehImg: 'https://files.boolub.com/upfiles/product/1610571861.png',
        gerImg: 'https://files.boolub.com/upfiles/product/1349546843.png',
        comment: '부모님 동반 가족팀 전담 베테랑 가이드가 배정되며, 보트 유람과 따뜻한 한식 스타일 식단을 세심하게 챙겨드립니다.'
      },
      {
        agency: '양가투어 (YangGa Mongolian Fri)',
        pid: 'YangGaTour',
        pcode: 'E4890-B3318-G7233',
        logo: './images/partners/YangGaTour.png',
        badge: '홉스골 5박6일 전문',
        price4: '1,588,300원',
        price6: '1,390,000원',
        veh: '북부 노선 특화 전용 승합차 단독 운행',
        ger: '홉스골 온수 샤워 완비 정식 캠프',
        vehImg: 'https://files.boolub.com/upfiles/product/1740762828.jpg',
        gerImg: 'https://files.boolub.com/upfiles/product/362211901.jpg',
        comment: '가족 5분 오붓하게 다녀오실 수 있도록 여유로운 일정표와 칠순 기념 전통 허르헉 만찬 상차림을 준비해 드립니다.'
      }
    ]
  },
  {
    id: 'r3',
    author: '이*진 여행자님',
    avatar: '이',
    timeAgo: '1시간 전 등록',
    cat: '동행조인',
    regionTag: '고비',
    dates: '9월 04일 ~ 9월 07일 (3박 4일)',
    paxType: '동행조인 · 20대 커플 2명 확정 (추가동행 희망)',
    title: '9월 초 사막+쳉헤르 노천온천+별자리 관측 3박4일 조인 가능한 투어 찾아요',
    desc: '연차 2개 쓰고 가는 커플 2명입니다! 단독으로 가기엔 비용이 부담되어 총 4~6명 조인 가능한 팀이나 사막·온천 알짜 코스 제안 기다립니다.',
    specs: ['2명 확정 (조인희망)', '미니사막+쳉헤르온천', '별자리 관측 선호', '1/N 각자결제 희망'],
    quotes: [
      {
        agency: 'SKY TOURS MONGOLIA (스카이투어)',
        pid: 'SKYTOURS',
        pcode: 'J8833-W9230-L2860',
        logo: './images/partners/SKYTOURS.jpg',
        badge: '천체망원경 별관측 포함 ★5.0',
        price4: '876,525원',
        price6: '780,000원',
        veh: '전용 투어 차량 + 천체망원경 장비 탑재',
        ger: '온천 캠프 + 테를지 정식 게르 캠프',
        vehImg: 'https://files.boolub.com/upfiles/product/2135197319.jpg',
        gerImg: 'https://files.boolub.com/upfiles/product/4227422819.jpg',
        comment: '사막·온천·테를지 동선에 밤하늘 천체망원경 별자리 체험까지 포함된 스카이투어 대표 인기 3박4일 코스입니다.'
      },
      {
        agency: '하닥투어 (KHADAG TOUR)',
        pid: 'khadag',
        pcode: 'H7863-P9594-D9241',
        logo: './images/partners/khadag.png',
        badge: '3박4일 사막+초원+온천 인기코스',
        price4: '900,000원',
        price6: '810,000원',
        veh: '스타렉스 4WD 쾌적 운행',
        ger: '쳉헤르 노천온천 리조트 캠프 숙박 포함',
        vehImg: 'https://dry7pvlp22cox.cloudfront.net/mrt-images-prod/2024/11/25/ocAs/Ax10hCip2I.jpg',
        gerImg: 'https://dry7pvlp22cox.cloudfront.net/mrt-images-prod/2024/11/25/mOrl/uJTKVYoS0I.jpg',
        comment: '사막 낙타체험과 초원, 천연 노천온천 힐링을 3박4일 만에 모두 즐기는 하닥투어 인기 속성코스입니다!'
      }
    ]
  },
  {
    id: 'r4',
    author: '최*우 여행자님',
    avatar: '최',
    timeAgo: '2시간 전 등록',
    cat: '동행조인',
    regionTag: '홉스골',
    dates: '8월 07일 ~ 8월 10일 (3박 4일)',
    paxType: '1인 혼자 출발 · 출발확정 조인방 희망',
    title: '혼자 떠나는 첫 몽골! 동행 못 구해도 무조건 출발 확정되는 3박4일 추천해주세요',
    desc: '휴가 날짜가 8/7~8/10으로 고정이라 모객 미달로 취소되지 않는 100% 출발확정 조인 투어를 찾고 있습니다.',
    specs: ['1인 출발확정 필수', '3박4일 중부·테를지', '유심·식사 올인원 선호'],
    quotes: [
      {
        agency: '부럽 몽골원정대 (직영)',
        pid: 'boolub',
        pcode: 'T0950-Q2923-W2496',
        logo: './images/mokta_logo.png',
        badge: '1인 신청 즉시 100% 출발확정',
        price4: '699,000원',
        price6: '699,000원',
        veh: '원정대 전용 차량 배정',
        ger: '업그레이드 게르 캠프 (남/여 성별 분리 배정)',
        vehImg: 'https://files.boolub.com/upfiles/product/4219813096.png',
        gerImg: 'https://files.boolub.com/upfiles/product/736206236.png',
        comment: '부럽 직영 몽골원정대는 1인 신청 시에도 모객 취소 없이 무조건 출발 확정됩니다! USIM 무료 증정 및 특식 3회 포함 699,000원 정찰가로 바로 예약 가능합니다.'
      }
    ]
  }
];

/* 6. 부럽 실제 여행자 포토후기(smart_bbs) & 공식 파트너 현장 LIVE (실제 상품 pcode 직결) */
const SHOWCASE_ITEMS = [
  {
    id: 'rev_1611',
    cat: '게르·샤워실',
    agency: 'BBM TOUR (비비엠투어)',
    pcode: 'S5960-N2570-O4021',
    prodName: '[몽골] 중부(미니사막,온천)+홉스골 6박7일',
    price: '1,866,700원',
    badge: '실제후기 · 조회 829',
    title: '자유여행, 훕스골, BBM투어 호이가 대표님 덕분에 완벽했던 몽골!',
    img: 'https://files.boolub.com/upfiles/board/2819314248.jpg',
    tip: '몽골은 미지의 땅, 신비로운 이미지! 국내선 항공, 기차, 이동수단과 기사님까지 완벽하게 케어해주신 실제 고객 후기입니다.',
    postUrl: 'https://www.boolub.com/?pn=board.view&_menu=community&_uid=1611'
  },
  {
    id: 'rev_1609',
    cat: '게르·샤워실',
    agency: 'BBM TOUR (비비엠투어)',
    pcode: 'S5960-N2570-O4021',
    prodName: '[몽골] 중부(미니사막,온천)+홉스골 6박7일',
    price: '1,866,700원',
    badge: '실제후기 · 조회 2,918',
    title: '슬로우슬로우 편안한 몽골 홉스골 여행 (새벽 공항픽업 감동 후기)',
    img: 'https://files.boolub.com/upfiles/board/2384413237.jpg',
    tip: '기차도 타고 국내선 비행기도 타고 긴 여정을 다채롭게! 새벽 공항 픽업까지 손수 챙겨주신 BBM투어 실제 탑승 후기입니다.',
    postUrl: 'https://www.boolub.com/?pn=board.view&_menu=community&_uid=1609'
  },
  {
    id: 'rev_1566',
    cat: '음식·불멍파티',
    agency: '부럽 몽골원정대 (직영)',
    pcode: 'T0950-Q2923-W2496',
    prodName: '[3박4일] 몽골 중부 원정대 동행 조인 투어',
    price: '699,000원',
    badge: '실제후기 · 조회 5,637',
    title: '모든 풍경이 다 아름다웠던 몽골!! 음식도 숙소 화장실도 대만족',
    img: 'https://files.boolub.com/upfiles/board/139392422.jpeg',
    tip: '다시 가고 싶을 만큼 좋았어요! 매 끼니 음식도 맛있었고 걱정했던 숙소 화장실들도 깔끔하게 관리되어 있었습니다.',
    postUrl: 'https://www.boolub.com/?pn=board.view&_menu=community&_uid=1566'
  },
  {
    id: 'rev_1557',
    cat: '푸르공·스타렉스',
    agency: '부럽 고비원정대 · 공식파트너',
    pcode: 'C3954-E9344-H0474',
    prodName: '[4박5일] 몽골 고비사막 원정대 동행 조인 투어',
    price: '999,000원',
    badge: '실제후기 · 조회 10,476',
    title: '남고비사막으로의 4박 5일 여행 생생 포토 리뷰',
    img: 'https://files.boolub.com/upfiles/board/4214017257.jpeg',
    tip: '끝없이 펼쳐진 남고비 사막과 모래언덕 일몰, 동행들과 함께한 별밤의 감동을 부럽 커뮤니티 원문에서 확인해보세요.',
    postUrl: 'https://www.boolub.com/?pn=board.view&_menu=community&_uid=1557'
  },
  {
    id: 'rev_1551',
    cat: '은하수·스냅',
    agency: '부럽 몽골원정대 (직영)',
    pcode: 'T0950-Q2923-W2496',
    prodName: '[3박4일] 몽골 중부 원정대 동행 조인 투어',
    price: '699,000원',
    badge: '실제후기 · 조회 9,992',
    title: '아들 둘과 함께한 잊지 못할 부럽 몽골원정대 가족 후기',
    img: 'https://files.boolub.com/upfiles/board/676491296.jpg',
    tip: '아이들과 함께 초원을 달리고 별을 보며 잊지 못할 추억을 남긴 부럽 몽골원정대 실제 가족 참가자 리뷰입니다.',
    postUrl: 'https://www.boolub.com/?pn=board.view&_menu=community&_uid=1551'
  },
  {
    id: 'rev_1549',
    cat: '은하수·스냅',
    agency: '노라투어 · 공식파트너',
    pcode: 'V6003-W0388-Z1928',
    prodName: '[몽골] 고비사막 시그니처 코스 4박5일',
    price: '1,441,100원',
    badge: '실제후기 · 조회 10,113',
    title: '엄마와 단둘이 떠나는 설레는 첫 몽골여행 기록',
    img: 'https://files.boolub.com/upfiles/board/3736057564.jpg',
    tip: '부모님과 함께 떠나도 편안하고 안전했던 몽골 초원·사막 투어 실제 여행기입니다.',
    postUrl: 'https://www.boolub.com/?pn=board.view&_menu=community&_uid=1549'
  },
  {
    id: 'rev_1534',
    cat: '은하수·스냅',
    agency: '부럽 몽골원정대 (직영)',
    pcode: 'T0950-Q2923-W2496',
    prodName: '[3박4일] 몽골 중부 원정대 동행 조인 투어',
    price: '699,000원',
    badge: '실제후기 · 조회 10,606',
    title: '한여름 몽골 원정대 3박4일 리얼 후기 (테를지·미니사막·어기호수)',
    img: 'https://files.boolub.com/upfiles/board/1685379338.jpg',
    tip: '혼자 신청해도 또래·동행들과 금방 친해지는 부럽 직영 몽골원정대 여름 시즌 실제 탑승 후기입니다.',
    postUrl: 'https://www.boolub.com/?pn=board.view&_menu=community&_uid=1534'
  },
  {
    id: 'rev_1503',
    cat: '푸르공·스타렉스',
    agency: '밝은 미래 여행 (BRIGHT FUTURE)',
    pcode: 'C2252-F3651-S1415',
    prodName: '[몽골] 고비사막 5박6일 샤워 가능 게르 풀패키지',
    price: '1,250,000원',
    badge: '실제후기 · 조회 46,486',
    title: '드디어 고비사막 홍고린엘스 정상에 오르다!! (누적 조회 4.6만 베스트)',
    img: 'https://files.boolub.com/upfiles/board/1921806417.jpg',
    tip: '출발 전 걱정이 무색할 만큼 압도적인 대자연의 감동을 선사한 부럽 커뮤니티 대표 베스트 후기입니다.',
    postUrl: 'https://www.boolub.com/?pn=board.view&_menu=community&_uid=1503'
  }
];

/* 7. 부럽 실제 몽골 여행 매거진 (smart_bbs b_menu='cityguide' 실데이터 100% 연동) */
const MAGAZINE_ITEMS = [
  {
    uid: '1644',
    title: '몽골 여행 필수 일정과 체험 추천 코스',
    city: '몽골',
    theme: '추천일정',
    filterCat: '동행·일정',
    img: 'https://files.boolub.com/upfiles/board/2422061780_1794708044.jpg',
    hit: 242,
    rdate: '2026-11-15',
    url: 'https://www.boolub.com/?pn=board.view&_menu=cityguide&_uid=1644'
  },
  {
    uid: '1554',
    title: '몽골 동행구하기 A부터 Z까지',
    city: '몽골',
    theme: '추천일정',
    filterCat: '동행·일정',
    img: 'https://files.boolub.com/upfiles/board/1786807039.jpg',
    hit: 68088,
    rdate: '2025-09-18',
    url: 'https://www.boolub.com/?pn=board.view&_menu=cityguide&_uid=1554'
  },
  {
    uid: '1513',
    title: '[몽골] 남은시간 울란바토르에서 뭘하면 좋을까?',
    city: '몽골',
    theme: '추천일정',
    filterCat: '동행·일정',
    img: 'https://files.boolub.com/upfiles/board/3209440322.jpg',
    hit: 69572,
    rdate: '2025-07-14',
    url: 'https://www.boolub.com/?pn=board.view&_menu=cityguide&_uid=1513'
  },
  {
    uid: '1477',
    title: '몽골 여행자라면 꼭 알아야 할 몽골공항 정보',
    city: '몽골',
    theme: '교통&여행팁',
    filterCat: '공항·교통·날씨',
    img: 'https://files.boolub.com/upfiles/board/1083167974.jpg',
    hit: 72560,
    rdate: '2025-07-04',
    url: 'https://www.boolub.com/?pn=board.view&_menu=cityguide&_uid=1477'
  },
  {
    uid: '1467',
    title: '몽골 징기스칸 공항 ↔ 울란바토르 시내 버스 이용 가이드',
    city: '몽골',
    theme: '교통&여행팁',
    filterCat: '공항·교통·날씨',
    img: 'https://files.boolub.com/upfiles/board/3719315085.png',
    hit: 73748,
    rdate: '2025-06-18',
    url: 'https://www.boolub.com/?pn=board.view&_menu=cityguide&_uid=1467'
  },
  {
    uid: '1428',
    title: '[몽골] 더 완벽한 몽골여행을 위한 준비물',
    city: '몽골',
    theme: '필수준비물',
    filterCat: '준비물·게르',
    img: 'https://files.boolub.com/upfiles/board/4228987703.jpg',
    hit: 80026,
    rdate: '2025-05-23',
    url: 'https://www.boolub.com/?pn=board.view&_menu=cityguide&_uid=1428'
  },
  {
    uid: '1373',
    title: '몽골여행에 필요한 계절별 · 지역별 준비물',
    city: '몽골',
    theme: '필수준비물',
    filterCat: '준비물·게르',
    img: 'https://files.boolub.com/upfiles/board/2668804338.jpg',
    hit: 86328,
    rdate: '2025-04-17',
    url: 'https://www.boolub.com/?pn=board.view&_menu=cityguide&_uid=1373'
  },
  {
    uid: '987',
    title: '몽골 게르 똑똑하게 선택하는 방법 💡',
    city: '몽골',
    theme: '숙소·게르',
    filterCat: '준비물·게르',
    img: 'https://files.boolub.com/upfiles/board/4182726144.jpg',
    hit: 33217,
    rdate: '2024-09-23',
    url: 'https://www.boolub.com/?pn=board.view&_menu=cityguide&_uid=987'
  },
  {
    uid: '1247',
    title: '[몽골] 고비사막을 계획한다면!',
    city: '몽골',
    theme: '액티비티&투어',
    filterCat: '고비·온천·체험',
    img: 'https://files.boolub.com/upfiles/board/3439522857.png',
    hit: 56946,
    rdate: '2025-01-22',
    url: 'https://www.boolub.com/?pn=board.view&_menu=cityguide&_uid=1247'
  },
  {
    uid: '1248',
    title: '[몽골] 울란바토르 몽골시내 투어!',
    city: '몽골',
    theme: '액티비티&투어',
    filterCat: '고비·온천·체험',
    img: 'https://files.boolub.com/upfiles/board/1881892143.png',
    hit: 56857,
    rdate: '2025-01-22',
    url: 'https://www.boolub.com/?pn=board.view&_menu=cityguide&_uid=1248'
  },
  {
    uid: '993',
    title: '몽골 대자연 노천 온천 체험 가이드 ♨',
    city: '몽골',
    theme: '액티비티&투어',
    filterCat: '고비·온천·체험',
    img: 'https://files.boolub.com/upfiles/board/977492562.png',
    hit: 29850,
    rdate: '2024-09-25',
    url: 'https://www.boolub.com/?pn=board.view&_menu=cityguide&_uid=993'
  },
  {
    uid: '990',
    title: '몽골 월별 날씨 & 여행 최적기 총정리 🔆',
    city: '몽골',
    theme: '교통&여행팁',
    filterCat: '공항·교통·날씨',
    img: 'https://files.boolub.com/upfiles/board/1696871606.jpg',
    hit: 26596,
    rdate: '2024-09-24',
    url: 'https://www.boolub.com/?pn=board.view&_menu=cityguide&_uid=990'
  }
];

/* ================= 권한(Auth) & 백엔드 API 상태 변수 (v11) ================= */
const API_BASE = (typeof window !== 'undefined' && window.BOOLUB_MOKTA_API_BASE)
  ? window.BOOLUB_MOKTA_API_BASE.replace(/\/$/, '')
  : '';

let AUTH_STATE = {
  role: 'guest',          // 'guest' | 'member' | 'partner' | 'master'
  userId: '',
  userName: '',
  partnerId: '',          // 입점 파트너 로그인 시 cp_id (예: 'anoratour')
  partnerName: '',        // 예: '노라투어 (NORA TOUR)'
  isLiveCms: Boolean(API_BASE)
};

if (typeof window !== 'undefined' && window.BOOLUB_MOKTA_AUTH) {
  AUTH_STATE = Object.assign(AUTH_STATE, window.BOOLUB_MOKTA_AUTH);
}

let ONBOARD_ITEMS = [];
let MY_APPLIES = [];
let RECEIVED_APPLIES = [];
let PARTNER_LEADS = [
  {
    id: 'demo_lead_1',
    joinKey: 'j_aug1',
    joinTitle: '[광복절 연휴 확정] 고비사막+바양작 별밤 4박5일 잔여석 오픈조인',
    pid: 'anoratour',
    applicantId: 'jiyoung_96',
    applicantName: '박*영',
    contact: '010-4821-**39 / 카톡 jiyoung_mn',
    pax: 2,
    memo: '20대 후반 직장인 여성 2명입니다! 대한항공 8/15 오후 도착 항공권 발권 완료했어요.',
    status: 'pending',
    rdate: '2026-08-01 14:20'
  },
  {
    id: 'demo_lead_2',
    joinKey: 'j_may2',
    joinTitle: '[대체휴일 연휴] 사막+초원+쳉헤르 노천온천 3박4일 마지막 1분 모십니다',
    pid: 'khadag',
    applicantId: 'travel_hoon',
    applicantName: '정*훈',
    contact: '010-9103-**82 / 카톡 hoon_gobi',
    pax: 1,
    memo: '30대 비흡연 남성 1인 합류 희망합니다. 드론·카메라 챙겨갑니다!',
    status: 'confirmed',
    rdate: '2026-07-29 19:05'
  },
  {
    id: 'demo_lead_3',
    joinKey: 'j_aug2',
    joinTitle: '[8월 은하수 피크] 남고비 핵심 4박5일 매일 샤워가능 게르 오픈조인',
    pid: 'anoratour',
    applicantId: 'soyeon_trip',
    applicantName: '이*연',
    contact: '010-7734-**15 / 카톡 sy_trip',
    pax: 1,
    memo: '혼자 떠나는 첫 몽골이라 안전하고 샤워 가능한 캠프로 신청드려요!',
    status: 'pending',
    rdate: '2026-08-02 10:12'
  }
];

const HERO_CLONE_COUNT = 3;
let heroTrackIdx = HERO_CLONE_COUNT;
let heroIsTransitioning = false;
let heroFallbackTimer = null;
let heroAutoTimer = null;
let isHeroAutoPlaying = true;
let curCustomerMode = 'home'; // 'home' | 'join' | 'store' | 'partner'
let curCompanionFilter = 'all';
let companionVisibleCount = 5;
let curMyActTab = 'hosted';
let curStoreCat = 'all';
let storeVisibleCount = 16;
let curCalYear = 2026;
let curCalMonth = 8;    // 기본 8월 성수기 월간 캘린더 표시 (0이면 전체 월 보기)
let curJoinDate = 'all'; // 특정 일자 클릭 시 'YYYY-MM-DD', 미선택 시 'all' (선택 월 전체)
let calSubFilters = { partner: 'all', status: 'all' };
let confirmOnlyFilter = false;
let sheetDraft = { month: 8, region: 'all', duration: 'all', style: 'all' };
let curRfqFilter = 'all';
let curShowcaseFilter = 'all';
let curAgencyFilter = 'all';
let curMagFilter = 'all';
let globalKeyword = '';
let quickFinder = { region: 'all', duration: 'all', style: 'all' };

let WISHLIST_KEYS = [];
try {
  const savedWish = localStorage.getItem('mokta_wish_v1');
  if (savedWish) {
    const parsed = JSON.parse(savedWish);
    if (Array.isArray(parsed)) WISHLIST_KEYS = parsed;
  }
} catch (_) {}

function getReturnPathRaw() {
  try {
    const p = window.location.pathname || '/';
    const q = window.location.search || '?pn=pages.view&type=pages&data=mj';
    return p + q;
  } catch (_) {
    return '/?pn=pages.view&type=pages&data=mj';
  }
}

function getReturnUrlEncoded() {
  return encodeURIComponent(getReturnPathRaw());
}

function rememberReturnCookie() {
  try {
    const raw = getReturnPathRaw();
    document.cookie = `_rurl=${encodeURIComponent(raw)}; path=/; max-age=1800; SameSite=Lax`;
  } catch (_) {}
}

let partnerAutoTimer = null;
let isPartnerAutoPlaying = true;
let activePartnerName = '노라투어 (NORA TOUR)';
let selectedBidPcode = '';
let selectedJoinPcode = '';
let selectedBidPhoto = { veh: './images/vehicle_fleet.jpg', ger: './images/ger_interior.jpg' };
let selectedShowcaseImg = './images/khorkhog_feast.jpg';
let uploadedShowcaseFile = null;
let mhSelectedCover = './images/milkyway_gobi.jpg';
let mhUploadedCoverFile = null;
let mhUploadedGalleryFiles = [];

async function moktaApiCall(endpoint, payload = {}, isMultipart = false) {
  if (!API_BASE) return null;
  try {
    let body;
    if (isMultipart && payload instanceof FormData) {
      body = payload;
    } else {
      body = new FormData();
      Object.entries(payload).forEach(([k, v]) => {
        if (v !== undefined && v !== null) body.append(k, v);
      });
    }
    const res = await fetch(`${API_BASE}/${endpoint}`, {
      method: 'POST',
      credentials: 'same-origin',
      body
    });
    return await res.json();
  } catch (err) {
    console.error('[MOKTA API Error]', endpoint, err);
    return { ok: false, message: '서버 통신 중 일시적인 오류가 발생했습니다.' };
  }
}

function canAccessPartnerConsole() {
  return AUTH_STATE.role === 'partner' || AUTH_STATE.role === 'master';
}

function isMemberLoggedIn() {
  return AUTH_STATE.role !== 'guest' && Boolean(AUTH_STATE.userId);
}

function computeMyActivityTotalCount() {
  if (!isMemberLoggedIn()) return 0;
  const uid = String(AUTH_STATE.userId || '');
  const hostedCnt = JOIN_ITEMS.filter(j => String(j.hostInid || '') === uid).length;
  const appliedCnt = MY_APPLIES.length;
  const rfqCnt = RFQ_ITEMS.filter(r => String(r.inid || '') === uid).length;
  return hostedCnt + appliedCnt + rfqCnt;
}

function updateMyActivityHeaderBadge() {
  const guestBtn = document.getElementById('guestLoginHeaderBtn');
  const myBtn = document.getElementById('memberMyHeaderBtn');
  const myNameTxt = document.getElementById('headerMemberNameTxt');
  const myCntEl = document.getElementById('headerMyActCount');
  const rurlInput = document.getElementById('quickLoginRurlInput');
  if (rurlInput) rurlInput.value = getReturnPathRaw();

  if (!isMemberLoggedIn()) {
    if (guestBtn) guestBtn.style.display = 'inline-flex';
    if (myBtn) myBtn.style.display = 'none';
  } else {
    if (guestBtn) guestBtn.style.display = 'none';
    if (myBtn) myBtn.style.display = 'inline-flex';
    const displayNm = AUTH_STATE.userName || AUTH_STATE.partnerName?.split('(')[0].trim() || AUTH_STATE.userId;
    if (myNameTxt) myNameTxt.textContent = `${displayNm}님 · 내 활동`;
    if (myCntEl) myCntEl.textContent = String(computeMyActivityTotalCount());
  }
}

function applyAuthUi() {
  if (AUTH_STATE.isLiveCms) {
    document.body.classList.add('is-live-cms');
  }

  updateMyActivityHeaderBadge();

  const applyBtn = document.getElementById('partnerApplyHeaderBtn');
  const roleSwitchWrap = document.getElementById('partnerRoleSwitchWrap');
  const rolePartnerBtnLabel = document.getElementById('rolePartnerBtnLabel');
  const lockedBadge = document.getElementById('partnerIdentityLockedBadge');
  const lockedTxt = document.getElementById('lockedPartnerNameTxt');
  const masterSelectWrap = document.getElementById('masterPartnerSelectWrap');
  const ptabMasterBtn = document.getElementById('ptabMasterBtn');
  const onboardCnt = document.getElementById('ptabOnboardCnt');

  if (onboardCnt) {
    onboardCnt.textContent = String(ONBOARD_ITEMS.filter(x => x.status === 'pending').length);
  }

  // 데모 상단 권한 프리뷰 버튼 활성화 상태 동기화
  document.querySelectorAll('#demoAuthSimBar .bl-auth-sim-btn').forEach(btn => {
    const r = btn.getAttribute('data-sim-role');
    btn.classList.toggle('active', AUTH_STATE.role === r);
  });

  if (!canAccessPartnerConsole()) {
    // [조건 3] 미로그인 고객 & 일반 로그인 고객: 파트너사 센터 완전 비노출 + 파트너 입점신청 버튼 노출
    if (applyBtn) applyBtn.style.display = 'inline-flex';
    if (roleSwitchWrap) roleSwitchWrap.style.display = 'none';
    if (ptabMasterBtn) ptabMasterBtn.style.display = 'none';
    document.body.classList.remove('partner-mode');
    const subNav = document.getElementById('customerSubNav');
    if (subNav) subNav.style.display = '';
    return;
  }

  // [조건 2] 로그인한 입점 파트너 계정 & 마스터 계정만 파트너사 센터 오픈
  if (applyBtn) applyBtn.style.display = 'none';
  if (roleSwitchWrap) roleSwitchWrap.style.display = 'inline-flex';

  if (AUTH_STATE.role === 'partner') {
    activePartnerName = AUTH_STATE.partnerName || '노라투어 (NORA TOUR)';
    if (rolePartnerBtnLabel) rolePartnerBtnLabel.textContent = '파트너사 센터';
    if (lockedBadge) lockedBadge.style.display = 'inline-flex';
    if (lockedTxt) lockedTxt.textContent = `${activePartnerName} (${AUTH_STATE.partnerId || 'anoratour'}) · 공식 입점 파트너`;
    if (masterSelectWrap) masterSelectWrap.style.display = 'none';
    if (ptabMasterBtn) ptabMasterBtn.style.display = 'none';
    const obPane = document.getElementById('ptab-onboard');
    if (obPane && obPane.classList.contains('active')) {
      switchPartnerTab('ptab-leads', document.querySelector('[data-ptab="ptab-leads"]'));
    }
  } else if (AUTH_STATE.role === 'master') {
    const sel = document.getElementById('activePartnerSelect');
    if (sel) activePartnerName = sel.value;
    if (rolePartnerBtnLabel) rolePartnerBtnLabel.textContent = '파트너사 센터 [MASTER]';
    if (lockedBadge) lockedBadge.style.display = 'none';
    if (masterSelectWrap) masterSelectWrap.style.display = 'inline-flex';
    if (ptabMasterBtn) ptabMasterBtn.style.display = 'inline-flex';
    renderMasterOnboardList();
  }
  loadPartnerMinihomeForm();
  if (typeof refreshPartnerConsoleAll === 'function') refreshPartnerConsoleAll();
}

function simulateAuthRole(mode) {
  if (mode === 'member') {
    AUTH_STATE = Object.assign(AUTH_STATE, {
      role: 'member',
      userId: 'minsu_mg',
      userName: '김민수',
      partnerId: '',
      partnerName: ''
    });
    applyAuthUi();
    restorePendingDraftIfLogged();
    showToast('[권한 확인] 일반회원(김민수님) 로그인 상태입니다. 동행 모집·합류 신청 및 [내 활동] 관리함이 활성화됩니다.');
  } else if (mode === 'partner') {
    AUTH_STATE = Object.assign(AUTH_STATE, {
      role: 'partner',
      userId: 'anoratour',
      userName: '노라투어',
      partnerId: 'anoratour',
      partnerName: '노라투어 (NORA TOUR)'
    });
    applyAuthUi();
    showToast('[권한 확인] 입점 파트너(노라투어) 세션이 적용되었습니다. 상단에 파트너사 센터가 활성화됩니다.');
  } else if (mode === 'master') {
    AUTH_STATE = Object.assign(AUTH_STATE, {
      role: 'master',
      userId: 'admin',
      userName: '마스터관리자',
      partnerId: 'boolub',
      partnerName: '부럽 몽골원정대 (직영)'
    });
    applyAuthUi();
    showToast('[권한 확인] 부럽 마스터 관리자 세션이 적용되었습니다. 전체 파트너 대행 및 입점 심사 관리가 활성화됩니다.');
  } else {
    AUTH_STATE = Object.assign(AUTH_STATE, {
      role: 'guest',
      userId: '',
      userName: '',
      partnerId: '',
      partnerName: ''
    });
    applyAuthUi();
    showToast('[권한 확인] 미로그인 고객 화면입니다. 상단 [로그인 · 3초 가입] 버튼이 노출됩니다.');
  }
}

/* ================= 전용관 이탈 없는 3초 간편 회원가입 · 로그인 & 작성중 내용 자동복원 ================= */
function savePendingDraft(draftObj) {
  if (!draftObj) return;
  try {
    sessionStorage.setItem('mokta_pending_draft_v1', JSON.stringify(draftObj));
  } catch (_) {}
}

function openAuthQuickModal(pendingReason = '', draftObj = null) {
  rememberReturnCookie();
  const rurlInput = document.getElementById('quickLoginRurlInput');
  if (rurlInput) rurlInput.value = getReturnPathRaw();

  const banner = document.getElementById('authPendingNotice');
  if (draftObj) {
    savePendingDraft(draftObj);
  }
  if (banner) {
    if (pendingReason) {
      banner.style.display = 'block';
      banner.innerHTML = `<i class="xi-check-circle"></i> 입력하신 <strong>[${pendingReason}]</strong> 내용을 안전하게 임시 저장했습니다! 3초 가입·로그인 즉시 이 화면으로 돌아와 바로 이어집니다.`;
    } else {
      banner.style.display = 'none';
      banner.innerHTML = '';
    }
  }
  openModal('authQuickModal');
}

function startSnsAuth(provider) {
  rememberReturnCookie();
  if (!AUTH_STATE.isLiveCms) {
    closeModal('authQuickModal');
    simulateAuthRole('member');
    showToast(`[데모 시연] ${provider === 'kakao' ? '카카오' : '네이버'} 3초 간편 가입·로그인이 완료되었습니다!`);
    return;
  }
  const cb = provider === 'naver'
    ? `/addons/sns_login/naver/callback.php?_rurl=${getReturnUrlEncoded()}`
    : `/addons/sns_login/kakao/callback.php?_rurl=${getReturnUrlEncoded()}`;
  window.location.href = cb;
}

function goDirectJoinPage() {
  rememberReturnCookie();
  if (!AUTH_STATE.isLiveCms) {
    closeModal('authQuickModal');
    simulateAuthRole('member');
    showToast('[데모 시연] 부럽 일반 회원가입이 완료되어 전용관으로 복귀했습니다!');
    return;
  }
  window.location.href = `/?pn=member.join.agree&_rurl=${getReturnUrlEncoded()}`;
}

function handleQuickLoginSubmit(ev) {
  const idVal = (document.getElementById('quickLoginId')?.value || '').trim();
  const pwVal = (document.getElementById('quickLoginPw')?.value || '').trim();
  if (!idVal || !pwVal) {
    if (ev) ev.preventDefault();
    showToast('부럽 아이디와 비밀번호를 입력해 주세요.');
    return false;
  }
  rememberReturnCookie();
  const rurlInput = document.getElementById('quickLoginRurlInput');
  if (rurlInput) rurlInput.value = getReturnPathRaw();

  if (!AUTH_STATE.isLiveCms) {
    if (ev) ev.preventDefault();
    closeModal('authQuickModal');
    AUTH_STATE = Object.assign(AUTH_STATE, {
      role: 'member',
      userId: idVal,
      userName: idVal
    });
    applyAuthUi();
    restorePendingDraftIfLogged();
    showToast(`${idVal}님 반갑습니다! 로그인되었습니다.`);
    return false;
  }

  // 본 사이트 HYSSENCE common_frame 존재 보장
  if (!document.querySelector('iframe[name="common_frame"]')) {
    const ifr = document.createElement('iframe');
    ifr.name = 'common_frame';
    ifr.style.display = 'none';
    document.body.appendChild(ifr);
  }
  return true;
}

function logoutMoktaMember() {
  closeModal('myActivityModal');
  if (!AUTH_STATE.isLiveCms) {
    simulateAuthRole('guest');
    return;
  }
  window.location.href = `/program/member.login.pro.php?_mode=logout&_rurl=${getReturnUrlEncoded()}`;
}

function restorePendingDraftIfLogged() {
  if (!isMemberLoggedIn()) return;
  try {
    const raw = sessionStorage.getItem('mokta_pending_draft_v1');
    if (!raw) return;
    sessionStorage.removeItem('mokta_pending_draft_v1');
    const draft = JSON.parse(raw);
    if (!draft || !draft.kind) return;

    if (draft.kind === 'companion') {
      const setV = (id, v) => { const el = document.getElementById(id); if (el && v !== undefined) el.value = v; };
      setV('cwStartDate', draft.sdate);
      setV('cwRegion', draft.regionKey);
      setV('cwDuration', draft.durationKey);
      setV('cwSeats', draft.curCnt);
      setV('cwTitle', draft.title);
      setV('cwTags', draft.tags);
      setV('cwAgePref', draft.agePref);
      setV('cwGenderPref', draft.genderPref);
      setV('cwFlightPref', draft.flightPref);
      openModal('companionWriteModal');
      showToast('로그인 완료! 작성하시던 동행 모집글을 복원했습니다. [등록하기]를 눌러 완료하세요.');
    } else if (draft.kind === 'apply_seat' && draft.joinId) {
      openJoinDetailModal(draft.joinId, draft);
      showToast('로그인 완료! 신청하시던 동행·조인 내용을 불러왔습니다.');
    } else if (draft.kind === 'rfq') {
      const setV = (id, v) => { const el = document.getElementById(id); if (el && v !== undefined) el.value = v; };
      setV('wDates', draft.dates);
      setV('wType', draft.paxType);
      setV('wCourse', draft.course);
      setV('wInfra', draft.infra);
      setV('wMemo', draft.memo);
      openModal('rfqWizardModal');
      showToast('로그인 완료! 작성하시던 맞춤견적 내용을 불러왔습니다.');
    }
  } catch (_) {}
}

/* ================= 유틸리티 & 로고 렌더러 (SVG ID 중복 없는 순수 CSS 모노그램) ================= */
function renderPartnerBadgeMedia(ag) {
  if (ag.logoImg) {
    return `<img src="${ag.logoImg}" alt="${ag.name} 로고" loading="lazy" />`;
  }
  const c1 = ag.c1 || '#0284c7';
  const c2 = ag.c2 || '#38bdf8';
  const abbr = ag.abbr || ag.name.slice(0, 2);
  return `<span class="bl-emblem-monogram" style="background:linear-gradient(135deg, ${c1} 0%, ${c2} 100%);">${abbr}</span>`;
}

function showToast(msg) {
  const el = document.getElementById('toastEl');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.remove('show'), 3200);
}

function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('open');
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('open');
}

function bgClose(e, id) {
  if (e.target && e.target.id === id) closeModal(id);
}

function scrollToSection(secId) {
  switchSiteRole('customer');
  if (secId === 'sec-trust') {
    openModal('trustGuaranteeModal');
    return;
  }
  if (secId === 'sec-rfq') {
    switchCustomerMode('partner');
    setTimeout(() => document.getElementById('sec-rfq')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);
    return;
  }
  if (secId === 'sec-partners') {
    switchCustomerMode('home');
    setTimeout(() => document.getElementById('sec-partners')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);
    return;
  }
  if (secId === 'sec-companion') {
    switchCustomerMode('home');
    setTimeout(() => document.getElementById('sec-companion')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);
    return;
  }
  if (secId === 'sec-join') {
    switchCustomerMode('home');
    setTimeout(() => document.getElementById('sec-join')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);
    return;
  }
  if (secId === 'sec-store') {
    switchCustomerMode('store');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  switchCustomerMode('home');
  setTimeout(() => {
    const target = document.getElementById(secId);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 40);
}

/* ================= 헤더 검색 & 4대 핵심 모드 전환 (추천 홈 1~8번 순서 완벽 유지) ================= */
function switchSiteRole(role) {
  if (role === 'partner' && !canAccessPartnerConsole()) {
    openModal('partnerApplyModal');
    showToast('파트너사 센터는 승인된 입점 파트너 및 마스터 계정만 접근 가능합니다.');
    return;
  }
  const isPartner = role === 'partner';
  document.body.classList.toggle('partner-mode', isPartner);
  document.getElementById('roleCustomerBtn')?.classList.toggle('active', !isPartner);
  document.getElementById('rolePartnerBtn')?.classList.toggle('active', isPartner);
  const subNav = document.getElementById('customerSubNav');
  if (subNav) subNav.style.display = isPartner ? 'none' : '';
  if (isPartner) {
    populatePartnerRfqSelect();
    loadPartnerMinihomeForm();
    if (typeof refreshPartnerConsoleAll === 'function') refreshPartnerConsoleAll();
    if (AUTH_STATE.role === 'master') renderMasterOnboardList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function switchCustomerMode(mode, btnEl) {
  switchSiteRole('customer');
  curCustomerMode = mode || 'home';

  document.querySelectorAll('#customerSubNav .bl-gnb-item').forEach(b => {
    const bMode = b.getAttribute('data-cmode');
    b.classList.toggle('active', bMode === curCustomerMode);
  });
  if (btnEl) btnEl.classList.add('active');

  const showEl = (id, cond) => {
    const el = document.getElementById(id);
    if (el) el.style.display = cond ? '' : 'none';
  };

  // 추천 홈(home)에서는 정확히 1~8번 순서로 전체 섹션 노출:
  // 1.함께 떠날 동행(#sec-companion) -> 2.캘린더(#sec-join) -> 3.오픈조인(#sec-open-group) ->
  // 4.대표 투어(#sec-store) -> 5.공식 파트너사(#sec-partners) -> 6.리얼 후기(#sec-showcase) ->
  // 7.매거진(#sec-magazine) -> 8.망설여지나요(#sec-bottom-helper)
  showEl('sec-hero', curCustomerMode === 'home');
  showEl('storeCollectionHero', curCustomerMode === 'store');
  showEl('unifiedFilterBar', curCustomerMode === 'join' || curCustomerMode === 'store');

  showEl('sec-companion', curCustomerMode === 'home' || curCustomerMode === 'join');
  showEl('sec-join', curCustomerMode === 'home' || curCustomerMode === 'join');
  showEl('sec-open-group', curCustomerMode === 'home' || curCustomerMode === 'join');
  showEl('sec-store', curCustomerMode === 'home' || curCustomerMode === 'store');
  showEl('sec-rfq', curCustomerMode === 'partner');
  showEl('sec-partners', curCustomerMode === 'home' || curCustomerMode === 'partner');
  showEl('sec-showcase', curCustomerMode === 'home');
  showEl('sec-magazine', curCustomerMode === 'home');
  showEl('sec-bottom-helper', curCustomerMode === 'home' || curCustomerMode === 'partner');

  const openMoreBtn = document.getElementById('openGroupMoreBtn');
  if (openMoreBtn) openMoreBtn.style.display = curCustomerMode === 'home' ? '' : 'none';

  const storeViewAllBtn = document.getElementById('storeViewAllBtn');
  if (storeViewAllBtn) storeViewAllBtn.style.display = curCustomerMode === 'home' ? '' : 'none';

  const rightAct = document.getElementById('filterBarActionRight');
  if (rightAct) {
    rightAct.innerHTML = curCustomerMode === 'join'
      ? `<button type="button" class="bl-btn bl-btn-point bl-btn-sm" onclick="openCompanionModalForDate()"><i class="xi-pen-o"></i> 동행 모집글 쓰기</button>`
      : `<button type="button" class="bl-btn bl-btn-soft bl-btn-sm" onclick="openModal('rfqWizardModal')"><i class="xi-paper-o"></i> 맞춤견적 문의</button>`;
  }

  const fabTxt = document.getElementById('floatingPrimaryCtaTxt');
  if (fabTxt) {
    fabTxt.textContent = curCustomerMode === 'join' ? '동행 모집하기' : '동행 · 견적 문의';
  }

  syncFilterPillBar();
  renderCommunityFeed();
  renderJoinCalendar();
  renderOpenGroupCards();
  renderStoreProducts();
  renderPartnerSection();
  renderShowcase();
  renderMagazines();
  renderRfqBoard();

  if (btnEl) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function filterPageView(targetId, btnEl) {
  if (targetId === 'sec-join') return switchCustomerMode('join', btnEl);
  if (targetId === 'sec-store') return switchCustomerMode('store', btnEl);
  if (targetId === 'sec-rfq' || targetId === 'sec-partners') return switchCustomerMode('partner', btnEl);
  return switchCustomerMode('home', btnEl);
}

function handleFloatingPrimaryAction() {
  if (curCustomerMode === 'join') {
    openCompanionModalForDate();
  } else {
    openModal('rfqWizardModal');
  }
}

function handleGlobalSearch(val) {
  globalKeyword = (val || '').trim().toLowerCase();
  storeVisibleCount = 16;
  renderOpenGroupCards();
  renderStoreProducts();
  renderCommunityFeed();
  renderRfqBoard();
  renderShowcase();
  renderPartnerSection();
  renderMagazines();
}

/* ================= 히어로 1칸씩 무한 슬라이더 (부럽 메인 #slickMainBnr 동일 규격) & 찜·비교 ================= */
let heroDragMoved = false;

function getHeroVisibleSlides() {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth <= 640) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

function getHeroRealIndex() {
  const total = HERO_SLIDES.length;
  if (!total) return 0;
  return (((heroTrackIdx - HERO_CLONE_COUNT) % total) + total) % total;
}

function updateHeroCounter() {
  const counter = document.getElementById('heroCounterText');
  if (!counter || !HERO_SLIDES.length) return;
  counter.textContent = `${getHeroRealIndex() + 1} / ${HERO_SLIDES.length}`;
}

function syncHeroTrackPosition(animate = false, extraPx = 0) {
  const track = document.getElementById('heroBannerTrack');
  if (!track) return;
  const visible = getHeroVisibleSlides();
  const stepPct = 100 / visible;
  track.style.transition = animate ? 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none';
  if (extraPx) {
    track.style.transform = `translate3d(calc(-${(heroTrackIdx * stepPct).toFixed(5)}% + ${extraPx}px), 0, 0)`;
  } else {
    track.style.transform = `translate3d(-${(heroTrackIdx * stepPct).toFixed(5)}%, 0, 0)`;
  }
  updateHeroCounter();
}

function snapHeroCloneIfNeeded() {
  const total = HERO_SLIDES.length;
  const track = document.getElementById('heroBannerTrack');
  if (!track || !total) return;
  let snapped = false;
  if (heroTrackIdx >= HERO_CLONE_COUNT + total) {
    heroTrackIdx -= total;
    snapped = true;
  } else if (heroTrackIdx < HERO_CLONE_COUNT) {
    heroTrackIdx += total;
    snapped = true;
  }
  if (snapped) {
    syncHeroTrackPosition(false);
    void track.offsetWidth;
  }
  heroIsTransitioning = false;
}

function initHeroTrack() {
  const track = document.getElementById('heroBannerTrack');
  if (!track || !HERO_SLIDES.length) return;

  const total = HERO_SLIDES.length;
  const headClones = HERO_SLIDES.slice(-HERO_CLONE_COUNT).map((s, i) => ({
    slide: s,
    realIdx: total - HERO_CLONE_COUNT + i
  }));
  const realItems = HERO_SLIDES.map((s, i) => ({ slide: s, realIdx: i }));
  const tailClones = HERO_SLIDES.slice(0, HERO_CLONE_COUNT).map((s, i) => ({
    slide: s,
    realIdx: i
  }));

  const fullTrack = [...headClones, ...realItems, ...tailClones];
  track.innerHTML = fullTrack.map(item => `
    <div class="bl-hero-slide" data-real-idx="${item.realIdx}">
      <article class="bl-hero-card">
        <img src="${item.slide.img}" alt="${item.slide.title.replace(/\n/g, ' ')}" draggable="false" />
        <div class="bl-hero-txt">
          <span class="bl-hero-eyebrow">${item.slide.eyebrow}</span>
          <h2 class="bl-hero-title">${item.slide.title.replace(/\n/g, '<br/>')}</h2>
          <p class="bl-hero-sub">${item.slide.sub}</p>
        </div>
      </article>
    </div>
  `).join('');

  track.querySelectorAll('.bl-hero-slide').forEach(el => {
    el.addEventListener('click', e => {
      if (heroDragMoved) {
        e.preventDefault();
        return;
      }
      const rIdx = Number(el.getAttribute('data-real-idx'));
      const target = HERO_SLIDES[rIdx];
      if (target && target.action) target.action();
    });
  });

  heroTrackIdx = HERO_CLONE_COUNT;
  heroIsTransitioning = false;
  syncHeroTrackPosition(false);
}

function slideHero(dir) {
  const total = HERO_SLIDES.length;
  if (!total) return;
  if (heroIsTransitioning) {
    clearTimeout(heroFallbackTimer);
    snapHeroCloneIfNeeded();
  }
  heroIsTransitioning = true;
  heroTrackIdx += (dir >= 0 ? 1 : -1);
  syncHeroTrackPosition(true);
  clearTimeout(heroFallbackTimer);
  heroFallbackTimer = setTimeout(snapHeroCloneIfNeeded, 530);
}

function startHeroAutoSlide() {
  clearInterval(heroAutoTimer);
  heroAutoTimer = setInterval(() => {
    if (isHeroAutoPlaying && !document.body.classList.contains('partner-mode')) {
      slideHero(1);
    }
  }, 3000);
}

function toggleHeroAutoSlide() {
  isHeroAutoPlaying = !isHeroAutoPlaying;
  const btn = document.getElementById('heroPlayToggleBtn');
  if (btn) {
    btn.innerHTML = isHeroAutoPlaying ? '<i class="xi-pause"></i>' : '<i class="xi-play"></i>';
  }
  if (isHeroAutoPlaying) startHeroAutoSlide();
  else clearInterval(heroAutoTimer);
}

function bindHeroSliderEvents() {
  const wrap = document.getElementById('heroSliderWrap') || document.querySelector('.bl-hero-slider-wrap');
  const viewport = document.getElementById('heroBannerViewport');
  const track = document.getElementById('heroBannerTrack');
  if (!wrap || !viewport || !track) return;

  track.addEventListener('transitionend', e => {
    if (e.target !== track) return;
    clearTimeout(heroFallbackTimer);
    snapHeroCloneIfNeeded();
  });

  wrap.addEventListener('mouseenter', () => clearInterval(heroAutoTimer));
  wrap.addEventListener('mouseleave', () => {
    if (isHeroAutoPlaying) startHeroAutoSlide();
  });

  let dragging = false;
  let startX = 0;
  let deltaX = 0;

  const onDragStart = clientX => {
    if (heroIsTransitioning) {
      clearTimeout(heroFallbackTimer);
      snapHeroCloneIfNeeded();
    }
    dragging = true;
    heroDragMoved = false;
    startX = clientX;
    deltaX = 0;
    track.classList.add('is-dragging');
    clearInterval(heroAutoTimer);
  };

  const onDragMove = clientX => {
    if (!dragging) return;
    deltaX = clientX - startX;
    if (Math.abs(deltaX) > 8) heroDragMoved = true;
    syncHeroTrackPosition(false, deltaX);
  };

  const onDragEnd = () => {
    if (!dragging) return;
    dragging = false;
    track.classList.remove('is-dragging');
    const threshold = Math.max(44, viewport.clientWidth * 0.08);
    if (deltaX <= -threshold) {
      slideHero(1);
    } else if (deltaX >= threshold) {
      slideHero(-1);
    } else {
      syncHeroTrackPosition(true);
    }
    if (isHeroAutoPlaying) startHeroAutoSlide();
    setTimeout(() => { heroDragMoved = false; }, 60);
  };

  track.addEventListener('mousedown', e => onDragStart(e.clientX));
  window.addEventListener('mousemove', e => onDragMove(e.clientX));
  window.addEventListener('mouseup', onDragEnd);

  track.addEventListener('touchstart', e => {
    if (e.touches && e.touches[0]) onDragStart(e.touches[0].clientX);
  }, { passive: true });
  track.addEventListener('touchmove', e => {
    if (e.touches && e.touches[0]) onDragMove(e.touches[0].clientX);
  }, { passive: true });
  track.addEventListener('touchend', onDragEnd);

  window.addEventListener('resize', () => {
    syncHeroTrackPosition(false);
  });
}

/* 고객 편의성: 관심 투어·동행 찜 & 한눈에 비교하기 */
function isWished(key) {
  return WISHLIST_KEYS.includes(key);
}

function updateWishBadge() {
  const cntEl = document.getElementById('headerWishCount');
  if (cntEl) cntEl.textContent = String(WISHLIST_KEYS.length);
}

function toggleWishItem(key, ev) {
  if (ev) ev.stopPropagation();
  const idx = WISHLIST_KEYS.indexOf(key);
  if (idx >= 0) {
    WISHLIST_KEYS.splice(idx, 1);
    showToast('찜·비교 보관함에서 제외되었습니다.');
  } else {
    WISHLIST_KEYS.unshift(key);
    showToast('찜·비교 보관함에 담았습니다! 상단 [♥ 찜·비교]에서 한눈에 비교해보세요.');
  }
  try {
    localStorage.setItem('mokta_wish_v1', JSON.stringify(WISHLIST_KEYS));
  } catch (_) {}
  updateWishBadge();
  renderStoreProducts();
  renderJoinCards();
  const modal = document.getElementById('wishlistModal');
  if (modal && modal.classList.contains('open')) openWishlistModal();
}

function openWishlistModal() {
  const body = document.getElementById('wishlistModalBody');
  if (!body) return;

  const items = WISHLIST_KEYS.map(k => {
    const [type, id] = k.split(':');
    if (type === 'prod') {
      const p = DIRECT_PRODUCTS.find(x => x.pcode === id);
      return p ? { key: k, type: '즉시확정 투어', title: p.title, sub: p.sub, price: p.price, meta: `별점 ★${p.rating} · ${p.durationKey}`, img: p.img, act: () => { closeModal('wishlistModal'); openProductPreviewModal(p.pcode); } } : null;
    }
    if (type === 'join') {
      const j = JOIN_ITEMS.find(x => String(x.id) === String(id));
      return j ? { key: k, type: '동행·오픈조인', title: j.title, sub: `${j.agency} · ${j.dateStr}`, price: j.curPrice, meta: `현재 ${j.filled}/${j.max}명 (6인 마감가 ${j.fullPrice})`, img: j.img, act: () => { closeModal('wishlistModal'); openJoinDetailModal(j.id); } } : null;
    }
    return null;
  }).filter(Boolean);

  if (!items.length) {
    body.innerHTML = `
      <div style="padding:36px 20px; text-align:center; background:var(--bl-gray-50); border-radius:14px; border:1px dashed var(--bl-gray-200);">
        <i class="xi-heart-o" style="font-size:32px; color:var(--bl-gray-400);"></i>
        <strong style="display:block; font-size:16px; color:var(--bl-gray-900); margin-top:8px;">아직 찜한 투어나 동행 일정이 없습니다</strong>
        <p style="font-size:13px; color:var(--bl-gray-500); margin:6px 0 16px;">투어 카드나 동행·오픈조인 카드 우측 상단의 하트(♥) 아이콘을 누르면 여러 일정을 한눈에 비교할 수 있습니다.</p>
        <div style="display:flex; justify-content:center; gap:8px;">
          <button type="button" class="bl-btn bl-btn-outline bl-btn-sm" onclick="closeModal('wishlistModal'); scrollToSection('sec-join')">동행·조인 캘린더 보기</button>
          <button type="button" class="bl-btn bl-btn-point bl-btn-sm" onclick="closeModal('wishlistModal'); scrollToSection('sec-store')">부럽 쿠폰특가 보기</button>
        </div>
      </div>
    `;
  } else {
    body.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:8px;">
        <span style="font-size:13px; color:var(--bl-gray-700);">총 <strong>${items.length}개</strong>의 관심 일정을 비교하고 있습니다.</span>
        <button type="button" class="bl-btn bl-btn-outline bl-btn-sm" onclick="WISHLIST_KEYS=[]; try{localStorage.removeItem('mokta_wish_v1');}catch(_){} updateWishBadge(); renderStoreProducts(); renderJoinCards(); openWishlistModal();">전체 비우기</button>
      </div>
      <div class="bl-wish-compare-grid">
        ${items.map((it, idx) => `
          <div style="border:1px solid var(--bl-gray-200); border-radius:12px; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between; background:#fff;">
            <div>
              <div style="position:relative; aspect-ratio:16/10; background:var(--bl-gray-100);">
                <img src="${it.img}" alt="${it.title}" style="width:100%; height:100%; object-fit:cover;" />
                <span class="bl-badge-solid sky" style="position:absolute; left:10px; top:10px;">${it.type}</span>
                <button type="button" class="bl-card-wish active" onclick="toggleWishItem('${it.key}', event)" title="보관함에서 삭제"><i class="xi-close"></i></button>
              </div>
              <div style="padding:14px;">
                <div style="font-size:11.5px; color:var(--bl-point-text); font-weight:700;">${it.sub}</div>
                <strong style="display:block; font-size:14px; color:var(--bl-gray-900); margin-top:4px; line-height:1.4;">${it.title}</strong>
                <div style="font-size:12px; color:var(--bl-gray-500); margin-top:6px;">${it.meta}</div>
              </div>
            </div>
            <div style="padding:12px 14px; border-top:1px solid var(--bl-gray-100); display:flex; justify-content:space-between; align-items:center;">
              <strong style="font-size:16px; font-weight:800; color:var(--bl-gray-900);">${it.price}</strong>
              <button type="button" class="bl-btn bl-btn-point bl-btn-sm" data-widx="${idx}">상세·예약</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    body.querySelectorAll('[data-widx]').forEach(btn => {
      btn.addEventListener('click', () => {
        const it = items[Number(btn.getAttribute('data-widx'))];
        if (it && it.act) it.act();
      });
    });
  }
  openModal('wishlistModal');
}

function copyMoktaShareLink(label) {
  const shareUrl = window.location.href;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(shareUrl).then(() => {
      showToast(`[${label}] 공유 링크가 복사되었습니다! 카카오톡·동행방에 붙여넣기 하세요.`);
    }).catch(() => {
      showToast('일정 주소가 준비되었습니다: ' + shareUrl);
    });
  } else {
    showToast('일정 주소가 준비되었습니다: ' + shareUrl);
  }
}

/* ================= 트립소다 스타일 통합 알약형 필터 바 & 3탭 필터 모달 ================= */
function syncFilterPillBar() {
  const dateBtn = document.getElementById('fpillDateBtn');
  const dateLbl = document.getElementById('fpillDateLabel');
  const regBtn = document.getElementById('fpillRegionBtn');
  const regLbl = document.getElementById('fpillRegionLabel');
  const styleBtn = document.getElementById('fpillStyleBtn');
  const styleLbl = document.getElementById('fpillStyleLabel');
  const confBtn = document.getElementById('fpillConfirmOnlyBtn');
  const resetBtn = document.getElementById('fpillResetBtn');

  if (dateLbl) {
    if (curJoinDate !== 'all') {
      const [, mm, dd] = curJoinDate.split('-').map(Number);
      dateLbl.textContent = `${mm}월 ${dd}일`;
    } else {
      dateLbl.textContent = curCalMonth === 0 ? '전체 시즌' : `${curCalMonth}월 출발`;
    }
  }
  if (dateBtn) dateBtn.classList.toggle('is-active', curJoinDate !== 'all' || curCalMonth !== 8);

  const regParts = [];
  if (quickFinder.region !== 'all') regParts.push(quickFinder.region);
  if (quickFinder.duration !== 'all') regParts.push(quickFinder.duration);
  if (regLbl) regLbl.textContent = regParts.length ? regParts.join(' · ') : '지역 · 기간';
  if (regBtn) regBtn.classList.toggle('is-active', regParts.length > 0);

  const styleMap = { all: '투어 유형', 원정대: '부럽원정대', 조인: '동행·조인', 단독: '단독투어' };
  if (styleLbl) styleLbl.textContent = styleMap[quickFinder.style] || '투어 유형';
  if (styleBtn) styleBtn.classList.toggle('is-active', quickFinder.style !== 'all');

  if (confBtn) confBtn.classList.toggle('is-active', confirmOnlyFilter);

  const hasAnyFilter = curJoinDate !== 'all' || curCalMonth !== 8 || regParts.length > 0 || quickFinder.style !== 'all' || confirmOnlyFilter || Boolean(globalKeyword);
  if (resetBtn) resetBtn.style.display = hasAnyFilter ? 'inline-flex' : 'none';
}

function openFilterSheet(tabKey = 'date') {
  sheetDraft = {
    month: curCalMonth,
    region: quickFinder.region,
    duration: quickFinder.duration,
    style: quickFinder.style
  };
  document.querySelectorAll('#fsMonthChoices .ts-choice-pill').forEach(b => {
    b.classList.toggle('active', Number(b.getAttribute('data-fmonth')) === sheetDraft.month);
  });
  document.querySelectorAll('#fsRegionChoices .ts-choice-pill').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-freg') === sheetDraft.region);
  });
  document.querySelectorAll('#fsDurationChoices .ts-choice-pill').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-fdur') === sheetDraft.duration);
  });
  document.querySelectorAll('#fsStyleChoices .ts-choice-pill').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-fstyle') === sheetDraft.style);
  });

  const targetTabBtn = document.querySelector(`#filterSheetModal .ts-sheet-tab[data-ftab="${tabKey}"]`);
  switchFilterSheetTab(tabKey, targetTabBtn);
  openModal('filterSheetModal');
}

function switchFilterSheetTab(tabKey, btnEl) {
  document.querySelectorAll('#filterSheetModal .ts-sheet-tab').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  document.getElementById('fsPaneDate')?.classList.toggle('active', tabKey === 'date');
  document.getElementById('fsPaneRegion')?.classList.toggle('active', tabKey === 'region');
  document.getElementById('fsPaneStyle')?.classList.toggle('active', tabKey === 'style');
}

function selectSheetMonth(m) {
  sheetDraft.month = m;
  document.querySelectorAll('#fsMonthChoices .ts-choice-pill').forEach(b => {
    b.classList.toggle('active', Number(b.getAttribute('data-fmonth')) === m);
  });
}

function selectSheetRegion(reg) {
  sheetDraft.region = reg;
  document.querySelectorAll('#fsRegionChoices .ts-choice-pill').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-freg') === reg);
  });
}

function selectSheetDuration(dur) {
  sheetDraft.duration = dur;
  document.querySelectorAll('#fsDurationChoices .ts-choice-pill').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-fdur') === dur);
  });
}

function selectSheetStyle(st) {
  sheetDraft.style = st;
  document.querySelectorAll('#fsStyleChoices .ts-choice-pill').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-fstyle') === st);
  });
}

function applySheetFiltersAndClose() {
  curCalMonth = sheetDraft.month;
  curJoinDate = 'all';
  quickFinder.region = sheetDraft.region;
  quickFinder.duration = sheetDraft.duration;
  quickFinder.style = sheetDraft.style;
  storeVisibleCount = 16;

  syncFilterPillBar();
  renderJoinCalendar();
  renderJoinCards();
  renderStoreProducts();
  closeModal('filterSheetModal');
  showToast('선택하신 조건으로 목록을 업데이트했습니다.');
}

function toggleConfirmOnlyFilter() {
  confirmOnlyFilter = !confirmOnlyFilter;
  calSubFilters.status = confirmOnlyFilter ? 'confirm' : 'all';
  syncFilterPillBar();
  renderJoinCalendar();
  renderJoinCards();
}

function applyQuickFinder(shouldScroll = false) {
  syncFilterPillBar();
  renderJoinCalendar();
  renderJoinCards();
  renderStoreProducts();
  if (shouldScroll) {
    showToast('선택하신 조건에 맞는 일정을 필터링했습니다.');
  }
}

function resetQuickFinder() {
  quickFinder = { region: 'all', duration: 'all', style: 'all' };
  curCalMonth = 8;
  curJoinDate = 'all';
  confirmOnlyFilter = false;
  calSubFilters = { partner: 'all', status: 'all' };
  globalKeyword = '';
  storeVisibleCount = 16;
  const gInput = document.getElementById('globalSearchInput');
  if (gInput) gInput.value = '';
  syncFilterPillBar();
  renderStoreProducts();
  renderJoinCalendar();
  renderJoinCards();
  renderRfqBoard();
  renderShowcase();
  renderPartnerSection();
  renderMagazines();
  showToast('필터 및 검색 조건이 초기화되었습니다.');
}

/* ================= 섹션 B: 믿고 떠나는 몽골 대표 투어 (트립소다 1:1 무테두리 컬렉션 카드) ================= */
function filterStoreCat(cat, btnEl) {
  curStoreCat = cat;
  storeVisibleCount = 16;
  document.querySelectorAll('#storeChipRow .bl-chip').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderStoreProducts();
}

function loadMoreStoreProducts() {
  storeVisibleCount += 16;
  renderStoreProducts();
}

function renderStoreProducts() {
  const grid = document.getElementById('productStoreGrid');
  const moreWrap = document.getElementById('storeMoreBtnWrap');
  const tabStoreCnt = document.getElementById('tabStoreCount');
  const linkTotalLbl = document.getElementById('storeTotalLinkLabel');
  const tickerEl = document.getElementById('liveProofTickerText');

  if (tabStoreCnt) tabStoreCnt.textContent = String(DIRECT_PRODUCTS.length);
  if (linkTotalLbl) linkTotalLbl.textContent = `${DIRECT_PRODUCTS.length}개 투어 전체보기`;
  if (tickerEl) {
    tickerEl.innerHTML = `현재 <strong>${MOKTA_AGENCIES.length}개 공식 파트너사</strong>의 <strong>${DIRECT_PRODUCTS.length}개 몽골 투어</strong>와 <strong>${JOIN_ITEMS.length}개 동행·오픈조인팀</strong>이 열려 있어요!`;
  }
  if (!grid) return;

  const list = DIRECT_PRODUCTS.filter(p => {
    if (curStoreCat !== 'all' && p.cat !== curStoreCat) return false;
    if (quickFinder.region !== 'all' && p.regionKey !== quickFinder.region) return false;
    if (quickFinder.duration !== 'all') {
      if (quickFinder.duration === '5박6일') {
        if (!p.title.includes('5박') && !p.title.includes('6박') && !p.title.includes('7박') && p.durationKey !== '5박6일') return false;
      } else if (p.durationKey !== quickFinder.duration) {
        return false;
      }
    }
    if (quickFinder.style !== 'all') {
      if (quickFinder.style === '원정대' && p.styleKey !== '원정대') return false;
      if (quickFinder.style === '조인' && p.styleKey === '단독' && !p.title.includes('조인')) return false;
      if (quickFinder.style === '단독' && p.styleKey === '원정대') return false;
    }
    if (globalKeyword) {
      const hay = `${p.title} ${p.sub} ${p.tag}`.toLowerCase();
      if (!hay.includes(globalKeyword)) return false;
    }
    return true;
  });

  if (!list.length) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; padding:38px 20px; text-align:center; background:#f7f8fa; border-radius:16px;">
        <strong style="font-size:15px; color:var(--bl-gray-900);">선택하신 조건과 일치하는 투어가 없습니다.</strong>
        <p style="font-size:13px; color:var(--bl-gray-500); margin:6px 0 14px;">필터를 초기화하거나 원하시는 일정으로 1:1 맞춤견적을 요청해보세요.</p>
        <div style="display:flex; justify-content:center; gap:8px;">
          <button type="button" class="bl-btn bl-btn-outline bl-btn-sm" onclick="resetQuickFinder()">필터 초기화</button>
          <button type="button" class="bl-btn bl-btn-point bl-btn-sm" onclick="openModal('rfqWizardModal')">맞춤견적 문의</button>
        </div>
      </div>
    `;
    if (moreWrap) moreWrap.innerHTML = '';
    return;
  }

  const isHomePreview = curCustomerMode === 'home' && curStoreCat === 'all' && !globalKeyword;
  const maxShow = isHomePreview ? 8 : storeVisibleCount;
  const visibleList = list.slice(0, maxShow);

  grid.innerHTML = visibleList.map(p => {
    const wishKey = `prod:${p.pcode}`;
    const wished = isWished(wishKey);
    const hasDiscount = Boolean(p.originPrice && p.discount);
    const partnerShort = String(p.sub || '').split('·')[0].trim() || '부럽 공식 파트너';
    const badgeLabel = p.styleKey === '원정대' ? '원정대' : (p.styleKey === '조인' ? '조인가능' : (p.tag.includes('공항') ? '공항픽업' : '공식투어'));
    const regionMap = { 고비: '고비사막', 중부: '중부·온천', 홉스골: '홉스골', 테를지: '테를지·근교' };
    const regionChip = regionMap[p.regionKey] || '몽골';

    return `
      <article class="ts-store-card" onclick="openProductPreviewModal('${p.pcode}')">
        <div class="ts-store-thumb">
          <img src="${p.img}" alt="${p.title}" loading="lazy" />
          <span class="ts-store-badge ${p.styleKey === '원정대' ? 'is-exp' : ''}">${badgeLabel}</span>
          <button type="button" class="bl-card-wish ${wished ? 'active' : ''}" onclick="toggleWishItem('${wishKey}', event)" title="찜 보관함 담기">
            <i class="${wished ? 'xi-heart' : 'xi-heart-o'}"></i>
          </button>
        </div>
        <div class="ts-store-partner">${partnerShort}</div>
        <h4 class="ts-store-title">${p.title}</h4>
        <div class="ts-store-tags-row">
          <div class="ts-store-pills">
            <span class="ts-pill-gray">${p.durationKey}</span>
            <span class="ts-pill-sky">${regionChip}</span>
          </div>
          ${Number(p.reviews) > 0 ? `<span class="ts-store-star"><i class="xi-star"></i> ${p.rating} <em>(${p.reviews})</em></span>` : ''}
        </div>
        <div class="ts-store-price-row">
          ${hasDiscount ? `<span class="ts-store-disc">${p.discount}</span>` : ''}
          <span class="ts-store-price">${p.price} ~</span>
        </div>
      </article>
    `;
  }).join('');

  if (moreWrap) {
    if (isHomePreview) {
      moreWrap.innerHTML = `
        <button type="button" class="bl-btn bl-btn-outline" style="height:44px; padding:0 26px; border-radius:999px;" onclick="switchCustomerMode('store')">
          몽골 투어 ${list.length}개 전체 구경하기 <i class="xi-angle-right-min"></i>
        </button>
      `;
    } else if (list.length > visibleList.length) {
      moreWrap.innerHTML = `
        <button type="button" class="bl-btn bl-btn-outline" style="height:44px; padding:0 26px; border-radius:999px;" onclick="loadMoreStoreProducts()">
          투어 더보기 (${visibleList.length} / ${list.length}개) <i class="xi-plus-min"></i>
        </button>
      `;
    } else {
      moreWrap.innerHTML = '';
    }
  }
}

function openProductPreviewModal(pcode) {
  const prod = DIRECT_PRODUCTS.find(x => x.pcode === pcode) || DIRECT_PRODUCTS[0];
  const liveUrl = `https://www.boolub.com/?pn=product.view&pcode=${prod.pcode}`;
  const partnerUrl = prod.pid === 'boolub'
    ? 'https://www.boolub.com/?pn=pages.view&type=pages&data=mgexpedition'
    : `https://www.boolub.com/?pn=partner.view&pid=${prod.pid}`;
  const hasDiscount = Boolean(prod.originPrice && prod.discount);

  const titleEl = document.getElementById('prodModalTitle');
  const bodyEl = document.getElementById('prodModalBody');
  if (titleEl) titleEl.textContent = '부럽 공식 판매 투어 상세 및 예약 안내';

  if (bodyEl) {
    bodyEl.innerHTML = `
      <div style="display:grid; grid-template-columns:1fr 1.15fr; gap:18px; align-items:start;">
        <div style="border-radius:12px; overflow:hidden; aspect-ratio:4/3; background:var(--bl-gray-100);">
          <img src="${prod.img}" alt="${prod.title}" style="width:100%; height:100%; object-fit:cover;" />
        </div>
        <div>
          <div style="display:flex; gap:6px; align-items:center; flex-wrap:wrap; margin-bottom:6px;">
            <span class="bl-mokta-tag">${prod.tag}</span>
            <span style="font-size:12px; color:var(--bl-gray-500);">상품코드: ${prod.pcode}</span>
          </div>
          <h3 style="font-size:18px; font-weight:800; color:var(--bl-gray-900); line-height:1.38;">${prod.title}</h3>
          <div style="margin-top:6px; font-size:13px; color:var(--bl-gray-500);">${prod.sub} · <i class="xi-star" style="color:var(--bl-star);"></i> <strong style="color:var(--bl-gray-900);">${prod.rating}</strong> (후기 ${prod.reviews}건)</div>

          <div style="margin-top:14px; padding:12px 14px; border-radius:10px; background:var(--bl-point-bg); border:1px solid var(--bl-point-line); display:flex; justify-content:space-between; align-items:center;">
            <div>
              ${hasDiscount ? `<div style="font-size:11.5px; color:var(--bl-gray-500); text-decoration:line-through;">정가 ${prod.originPrice}</div>` : ''}
              <div style="font-size:12px; font-weight:700; color:var(--bl-point-text);">${hasDiscount ? '부럽 직영 할인 특가' : '부럽 공식 판매가 (에스크로 보호)'}</div>
            </div>
            <div style="text-align:right;">
              ${hasDiscount ? `<span style="font-size:16px; font-weight:800; color:var(--bl-point-text); margin-right:4px;">${prod.discount}</span>` : ''}
              <strong style="font-size:21px; font-weight:800; color:var(--bl-gray-900);">${prod.price}</strong>
            </div>
          </div>

          <ul style="margin-top:12px; display:grid; gap:6px; font-size:13px; color:var(--bl-gray-700);">
            ${(prod.highlights || []).map(h => `<li><i class="xi-check-min" style="color:var(--bl-point-dark); font-weight:700;"></i> ${h}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div style="margin-top:18px; padding:14px 16px; border-radius:12px; background:var(--bl-gray-50); border:1px solid var(--bl-gray-200);">
        <div style="font-size:13px; font-weight:800; color:var(--bl-gray-900); margin-bottom:8px;">
          <i class="xi-compass-o" style="color:var(--bl-point-dark);"></i> 출국 전 부럽에서 함께 확인하면 좋은 공항픽업 &amp; 매거진
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
          <a href="https://www.boolub.com/?pn=product.view&pcode=I3885-I4036-S5377" target="_blank" rel="noopener" style="padding:9px 12px; background:#fff; border-radius:8px; border:1px solid var(--bl-gray-200); display:flex; justify-content:space-between; align-items:center; font-size:12.5px;">
            <span><strong>울란바토르 공항 단독픽업</strong> (19,200원)</span>
            <span style="color:var(--bl-point-text); font-weight:700;">함께보기 <i class="xi-external-link"></i></span>
          </a>
          <a href="https://www.boolub.com/?pn=board.view&_menu=cityguide&_uid=1428" target="_blank" rel="noopener" style="padding:9px 12px; background:#fff; border-radius:8px; border:1px solid var(--bl-gray-200); display:flex; justify-content:space-between; align-items:center; font-size:12.5px;">
            <span><strong>[매거진] 완벽한 몽골여행 준비물</strong></span>
            <span style="color:var(--bl-point-text); font-weight:700;">읽어보기 <i class="xi-external-link"></i></span>
          </a>
        </div>
      </div>

      <div style="margin-top:18px; display:flex; gap:8px; justify-content:flex-end; flex-wrap:wrap;">
        <button type="button" class="bl-btn bl-btn-outline" onclick="copyMoktaShareLink('${prod.title.replace(/'/g, '')}')">
          <i class="xi-share-alt-o"></i> 동행에게 공유
        </button>
        <a href="${partnerUrl}" target="_blank" rel="noopener" class="bl-btn bl-btn-outline">
          파트너사 전체상품 보기
        </a>
        <button type="button" class="bl-btn bl-btn-soft" onclick="closeModal('productPreviewModal'); prefillRfqFromCourse('${prod.title.replace(/'/g, '')}')">
          이 코스로 일행 맞춤견적 문의
        </button>
        <a href="${liveUrl}" target="_blank" rel="noopener" class="bl-btn bl-btn-point">
          부럽 본 사이트에서 일정·예약하기 <i class="xi-external-link"></i>
        </a>
      </div>
    `;
  }
  openModal('productPreviewModal');
}

/* ================= 섹션 A & C: 트립소다 스타일 미니멀 도트 캘린더 + 오픈조인 + 커뮤니티 동행 피드 ================= */
const WEEKDAY_KO = ['일', '월', '화', '수', '목', '금', '토'];

function normalizeJoinDateIso(rawKey, fallbackStr = '') {
  const s = String(rawKey || '').trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  if (/^\d{2}-\d{2}$/.test(s)) return `2026-${s}`;
  const m = String(fallbackStr).match(/(\d{1,2})\.(\d{1,2})/);
  if (m) {
    const mm = String(m[1]).padStart(2, '0');
    const dd = String(m[2]).padStart(2, '0');
    return `2026-${mm}-${dd}`;
  }
  return '2026-08-15';
}

function formatKoreanDateRange(isoStart, durationKey) {
  const [y, m, d] = normalizeJoinDateIso(isoStart).split('-').map(Number);
  const nightsMap = { '2박3일': 2, '3박4일': 3, '4박5일': 4, '5박6일': 5 };
  const nights = nightsMap[durationKey] || 4;
  const startDt = new Date(y, m - 1, d);
  const endDt = new Date(y, m - 1, d + nights);
  const sLabel = `${startDt.getMonth() + 1}.${String(startDt.getDate()).padStart(2, '0')}(${WEEKDAY_KO[startDt.getDay()]})`;
  const eLabel = `${endDt.getMonth() + 1}.${String(endDt.getDate()).padStart(2, '0')}(${WEEKDAY_KO[endDt.getDay()]})`;
  return `${sLabel} ~ ${eLabel} · ${durationKey}`;
}

function formatShortDepartureLabel(isoKey, fallbackStr = '') {
  const iso = normalizeJoinDateIso(isoKey, fallbackStr);
  const [, m, d] = iso.split('-').map(Number);
  return `${m}월 ${d}일 출발`;
}

function renderAvatarStack(filledCount) {
  const cnt = Math.max(1, Number(filledCount) || 2);
  const labels = ['여', '남', '여', '남'];
  const colors = ['c1', 'c2', 'c3', 'c4'];
  const visible = Math.min(cnt, 3);
  let html = '<span class="ts-avatar-stack">';
  for (let i = 0; i < visible; i++) {
    html += `<span class="ts-mini-ava ${colors[i % 4]}">${labels[i % 4]}</span>`;
  }
  if (cnt > 3) {
    html += `<span class="ts-mini-ava more">+${cnt - 3}</span>`;
  }
  html += '</span>';
  return html;
}

function changeCalendarMonth(delta) {
  let nextM = (curCalMonth === 0 ? 8 : curCalMonth) + delta;
  if (nextM < 5) nextM = 10;
  if (nextM > 10) nextM = 5;
  curCalMonth = nextM;
  curJoinDate = 'all';
  syncFilterPillBar();
  renderJoinCalendar();
  renderJoinCards();
}

function setCalendarMonth(monthNum) {
  curCalMonth = monthNum;
  curJoinDate = 'all';
  syncFilterPillBar();
  renderJoinCalendar();
  renderJoinCards();
}

function selectCalendarDate(dateIso) {
  if (dateIso === 'all' || curJoinDate === dateIso) {
    curJoinDate = 'all';
  } else {
    curJoinDate = dateIso;
    const [y, m] = dateIso.split('-').map(Number);
    if (y && m) {
      curCalYear = y;
      curCalMonth = m;
    }
  }
  syncFilterPillBar();
  renderJoinCalendar();
  renderJoinCards();
}

function openCompanionModalForDate(dateIso) {
  const targetDate = (dateIso && /^\d{4}-\d{2}-\d{2}$/.test(dateIso))
    ? dateIso
    : (curJoinDate !== 'all' ? curJoinDate : `${curCalYear}-${String(curCalMonth || 8).padStart(2, '0')}-15`);
  const dateInput = document.getElementById('cwStartDate');
  if (dateInput) dateInput.value = targetDate;
  openModal('companionWriteModal');
}

function filterJoinByDate(dateKey) {
  selectCalendarDate(dateKey);
}

function matchesCalendarSubFilter(j) {
  if (calSubFilters.partner !== 'all') {
    if (!String(j.agency || '').includes(calSubFilters.partner)) return false;
  }
  if (calSubFilters.status !== 'all') {
    const rem = Math.max(0, j.max - j.filled);
    if (calSubFilters.status === 'confirm' && j.statusCls === 'amber') return false;
    if (calSubFilters.status === 'imminent' && (j.statusCls === 'amber' || rem > 2 || rem === 0)) return false;
    if (calSubFilters.status === 'recruit' && j.statusCls !== 'amber') return false;
  }
  if (quickFinder.region !== 'all' && j.regionKey !== quickFinder.region) return false;
  if (quickFinder.duration !== 'all' && j.durationKey !== quickFinder.duration) return false;
  if (quickFinder.style === '원정대' && j.styleKey !== '원정대') return false;
  return true;
}

function renderJoinCalendar() {
  const monthTitleEl = document.getElementById('calCurrentMonthTitle');
  const pillsEl = document.getElementById('calMonthPills');
  const daysGridEl = document.getElementById('mainMonthCalDays');
  const sidePanelEl = document.getElementById('calSelectedPanel');
  const viewMonthBtn = document.getElementById('calViewMonthAllBtn');
  const tabJoinCnt = document.getElementById('tabJoinCount');

  const baseFilteredJoins = JOIN_ITEMS.filter(matchesCalendarSubFilter);
  if (tabJoinCnt) tabJoinCnt.textContent = String(JOIN_ITEMS.length);
  if (!daysGridEl) return;

  const activeMonth = curCalMonth === 0 ? 8 : curCalMonth;
  if (monthTitleEl) monthTitleEl.textContent = `${curCalYear}년 ${activeMonth}월`;
  if (viewMonthBtn) {
    viewMonthBtn.textContent = curJoinDate !== 'all'
      ? `${activeMonth}월 전체 일정으로 보기`
      : `${activeMonth}월 전체보기`;
  }

  const months = [5, 6, 7, 8, 9, 10];
  if (pillsEl) {
    pillsEl.innerHTML = months.map(m => `
      <button type="button" class="ts-mpill ${curCalMonth === m ? 'active' : ''}" onclick="setCalendarMonth(${m})">
        ${m}월
      </button>
    `).join('') + `
      <button type="button" class="ts-mpill ${curCalMonth === 0 ? 'active' : ''}" onclick="setCalendarMonth(0)">
        전체
      </button>
    `;
  }

  const eventsByDate = {};
  baseFilteredJoins.forEach(j => {
    const iso = normalizeJoinDateIso(j.dateKey, j.dateStr);
    j.dateKey = iso;
    if (!eventsByDate[iso]) eventsByDate[iso] = [];
    eventsByDate[iso].push(j);
  });

  const firstDow = new Date(curCalYear, activeMonth - 1, 1).getDay();
  const lastDate = new Date(curCalYear, activeMonth, 0).getDate();
  const cells = [];

  for (let i = 0; i < firstDow; i++) {
    cells.push(`<div class="ts-cday is-empty"></div>`);
  }

  for (let d = 1; d <= lastDate; d++) {
    const iso = `${curCalYear}-${String(activeMonth).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const dow = (firstDow + d - 1) % 7;
    const hol = KR_HOLIDAYS_2026[iso] || '';
    const dayEvents = eventsByDate[iso] || [];
    const isActive = curJoinDate === iso;

    const clsList = ['ts-cday'];
    if (dow === 0) clsList.push('is-sun');
    if (dow === 6) clsList.push('is-sat');
    if (hol) clsList.push('is-hol');
    if (dayEvents.length) {
      clsList.push('has-teams');
      const hasImminent = dayEvents.some(ev => (ev.max - ev.filled) <= 2 && ev.statusCls !== 'amber');
      if (!hasImminent) clsList.push('is-confirm-day');
    }
    if (isActive) clsList.push('active');

    const tip = dayEvents.length
      ? `${activeMonth}월 ${d}일 · ${dayEvents.length}개 출발/모집 일정`
      : `${activeMonth}월 ${d}일`;

    cells.push(`
      <button type="button" class="${clsList.join(' ')}" title="${tip}" onclick="selectCalendarDate('${iso}')">
        <span class="ts-cday-num">${d}</span>
        <i class="ts-cday-dot"></i>
      </button>
    `);
  }

  const trailing = (7 - (cells.length % 7)) % 7;
  for (let i = 0; i < trailing; i++) {
    cells.push(`<div class="ts-cday is-empty"></div>`);
  }
  daysGridEl.innerHTML = cells.join('');

  if (sidePanelEl) {
    let targetItems = [];
    let panelTitle = '';
    let targetIsoForWrite = `${curCalYear}-${String(activeMonth).padStart(2, '0')}-15`;

    if (curJoinDate !== 'all') {
      targetItems = eventsByDate[curJoinDate] || [];
      targetIsoForWrite = curJoinDate;
      const [yy, mm, dd] = curJoinDate.split('-').map(Number);
      const dt = new Date(yy, mm - 1, dd);
      const holTxt = KR_HOLIDAYS_2026[curJoinDate] ? ` · ${KR_HOLIDAYS_2026[curJoinDate]}` : '';
      panelTitle = `${mm}월 ${dd}일(${WEEKDAY_KO[dt.getDay()]}${holTxt}) 일정`;
    } else if (curCalMonth === 0) {
      targetItems = baseFilteredJoins;
      panelTitle = `전체 시즌 출발·동행 (${targetItems.length})`;
    } else {
      const mPrefix = `${curCalYear}-${String(activeMonth).padStart(2, '0')}`;
      targetItems = baseFilteredJoins.filter(j => normalizeJoinDateIso(j.dateKey, j.dateStr).startsWith(mPrefix));
      panelTitle = `${activeMonth}월 출발·동행 (${targetItems.length})`;
    }

    if (!targetItems.length) {
      sidePanelEl.innerHTML = `
        <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; height:100%; padding:24px 12px;">
          <strong style="font-size:15px; color:#191f28;">${panelTitle}에 등록된 팀이 아직 없어요</strong>
          <p style="font-size:13px; color:#8b95a1; margin:6px 0 16px;">직접 동행을 모집하거나 1인 출발확정 원정대로 떠나보세요.</p>
          <div style="display:flex; gap:8px; flex-wrap:wrap; justify-content:center;">
            <button type="button" class="bl-btn bl-btn-point bl-btn-sm" onclick="openCompanionModalForDate('${targetIsoForWrite}')">이 날짜 동행 모집</button>
            <button type="button" class="bl-btn bl-btn-outline bl-btn-sm" onclick="selectCalendarDate('all')">월 전체보기</button>
          </div>
        </div>
      `;
    } else {
      const shown = targetItems.slice(0, 6);
      sidePanelEl.innerHTML = `
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; padding-bottom:10px; border-bottom:1px solid #eef1f4;">
            <strong style="font-size:15.5px; font-weight:800; color:#191f28;">${panelTitle}</strong>
            <button type="button" style="font-size:12.5px; font-weight:700; color:#0284c7;" onclick="openCompanionModalForDate('${targetIsoForWrite}')">
              + 동행 글쓰기
            </button>
          </div>
          <div class="ts-cal-side-list">
            ${shown.map(t => {
              const isRecruit = t.statusCls === 'amber';
              const depShort = formatShortDepartureLabel(t.dateKey, t.dateStr).replace(' 출발', '');
              return `
                <div class="ts-cal-side-row" onclick="openJoinDetailModal('${t.id}')">
                  <div style="min-width:0; flex:1;">
                    <div style="display:flex; align-items:center; gap:6px; margin-bottom:2px;">
                      <span style="font-size:11.5px; font-weight:800; color:#0284c7;">${depShort}</span>
                      <span style="font-size:11.5px; color:#8b95a1;">${t.durationKey} · ${t.regionKey}</span>
                    </div>
                    <strong style="display:block; font-size:13.5px; font-weight:700; color:#191f28; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                      ${t.title}
                    </strong>
                  </div>
                  <div style="display:flex; align-items:center; gap:6px; flex-shrink:0;">
                    <span class="ts-pax-pill"><i class="xi-user-o"></i> ${t.filled}/${t.max}</span>
                    <span class="ts-confirm-pill ${isRecruit ? 'is-recruit' : ''}">${isRecruit ? '모집중' : '확정'}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
        <div style="padding-top:10px; text-align:right;">
          ${curCustomerMode === 'home'
            ? `<button type="button" class="ts-cal-viewall-btn" onclick="switchCustomerMode('join')">전체 일정 자세히 보기 <i class="xi-angle-right-min"></i></button>`
            : (curJoinDate !== 'all' ? `<button type="button" class="ts-cal-viewall-btn" onclick="selectCalendarDate('all')">월 전체 일정으로 복귀 ↺</button>` : '')}
        </div>
      `;
    }
  }
}

/* 트립소다 오픈조인 카드 ('예약한 동행이 있는 모험이에요!') */
function renderOpenGroupCards() {
  const grid = document.getElementById('openGroupGrid');
  if (!grid) return;

  const isHome = curCustomerMode === 'home' && !globalKeyword;

  const list = JOIN_ITEMS.filter(j => {
    if (j.bbsUrl) return false;
    if (!isHome) {
      const iso = normalizeJoinDateIso(j.dateKey, j.dateStr);
      if (curJoinDate !== 'all') {
        if (iso !== curJoinDate) return false;
      } else if (curCalMonth !== 0) {
        const mPrefix = `${curCalYear}-${String(curCalMonth).padStart(2, '0')}`;
        if (!iso.startsWith(mPrefix)) return false;
      }
      if (!matchesCalendarSubFilter(j)) return false;
    }
    if (globalKeyword) {
      const hay = `${j.title} ${j.agency} ${j.tags}`.toLowerCase();
      if (!hay.includes(globalKeyword)) return false;
    }
    return true;
  });

  if (!list.length) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; padding:32px; text-align:center; background:#f7f8fa; border-radius:16px;">
        <strong style="font-size:14.5px; color:#191f28;">선택하신 시기에 해당하는 오픈조인 차량이 없습니다.</strong>
        <div style="margin-top:10px; display:flex; justify-content:center; gap:8px;">
          <button type="button" class="bl-btn bl-btn-outline bl-btn-sm" onclick="setCalendarMonth(0)">전체 시즌 보기</button>
          <button type="button" class="bl-btn bl-btn-point bl-btn-sm" onclick="openCompanionModalForDate()">새 동행 모집하기</button>
        </div>
      </div>
    `;
    return;
  }

  const visible = isHome ? list.slice(0, 4) : list;

  grid.innerHTML = visible.map(j => {
    const wishKey = `join:${j.id}`;
    const wished = isWished(wishKey);
    const isRecruit = j.statusCls === 'amber';
    const depTxt = formatShortDepartureLabel(j.dateKey, j.dateStr);
    const shortAgency = String(j.agency || '').split('(')[0].trim();
    const topBadge = j.styleKey === '원정대' ? '원정대' : '오픈조인';

    return `
      <article class="ts-og-card" onclick="openJoinDetailModal('${j.id}')">
        <div class="ts-og-thumb">
          <img src="${j.img}" alt="${j.title}" loading="lazy" />
          <span class="ts-og-top-pill ${j.styleKey === '원정대' ? '' : 'is-join'}">${topBadge}</span>
          <button type="button" class="bl-card-wish ${wished ? 'active' : ''}" onclick="toggleWishItem('${wishKey}', event)" title="찜 보관함 담기">
            <i class="${wished ? 'xi-heart' : 'xi-heart-o'}"></i>
          </button>
          <div class="ts-og-date-scrim">${depTxt}</div>
        </div>
        <div class="ts-og-meta">${j.durationKey} · ${j.regionKey} · ${shortAgency}</div>
        <h4 class="ts-og-title">${j.title}</h4>
        <div class="ts-og-foot">
          <div class="ts-og-status-left">
            <span class="ts-pax-pill"><i class="xi-user-o"></i> ${j.filled}/${j.max}</span>
            <span class="ts-confirm-pill ${isRecruit ? 'is-recruit' : ''}">${isRecruit ? '모집중' : '확정'}</span>
          </div>
          ${renderAvatarStack(j.filled)}
        </div>
      </article>
    `;
  }).join('');
}

/* 1번 독립 섹션: 함께 떠날 동행을 찾고 있어요 (칩 필터 + 즉시 합류신청 연동) */
function filterCompanionFeed(cat, btnEl) {
  curCompanionFilter = cat || 'all';
  companionVisibleCount = 5;
  document.querySelectorAll('#companionChipRow .bl-chip').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderCommunityFeed();
}

function loadMoreCompanionFeed() {
  companionVisibleCount += 6;
  renderCommunityFeed();
}

function renderCommunityFeed() {
  const listEl = document.getElementById('communityCompanionList');
  const footEl = document.getElementById('companionMoreWrap');
  const totalChipEl = document.getElementById('chipCompanionTotal');

  const allCommunity = JOIN_ITEMS.filter(j => Boolean(j.bbsUrl) || j.statusCls === 'amber' || j.hostType === 'member');
  if (totalChipEl) totalChipEl.textContent = String(allCommunity.length);
  if (!listEl) return;

  const feedItems = allCommunity.filter(j => {
    if (curCompanionFilter !== 'all' && j.regionKey !== curCompanionFilter) return false;
    if (curCustomerMode === 'join') {
      const iso = normalizeJoinDateIso(j.dateKey, j.dateStr);
      if (curJoinDate !== 'all' && iso !== curJoinDate) return false;
      if (curJoinDate === 'all' && curCalMonth !== 0) {
        const mPrefix = `${curCalYear}-${String(curCalMonth).padStart(2, '0')}`;
        if (!iso.startsWith(mPrefix)) return false;
      }
    }
    if (globalKeyword) {
      const hay = `${j.title} ${j.agency} ${j.tags}`.toLowerCase();
      if (!hay.includes(globalKeyword)) return false;
    }
    return true;
  });

  const maxShow = curCustomerMode === 'home' ? companionVisibleCount : Math.max(companionVisibleCount, 12);
  const visible = feedItems.slice(0, maxShow);

  if (!visible.length) {
    listEl.innerHTML = `
      <div style="padding:28px 12px; text-align:center; color:#8b95a1;">
        <strong style="display:block; font-size:14.5px; color:#191f28; margin-bottom:6px;">선택하신 지역의 동행 모집글이 아직 없어요</strong>
        <p style="font-size:12.5px; margin-bottom:12px;">첫 번째 방장이 되어 원하는 일정으로 동행을 모집해 보세요!</p>
        <button type="button" class="bl-btn bl-btn-point bl-btn-sm" onclick="openCompanionModalForDate()">+ 새 동행 모집글 쓰기</button>
      </div>
    `;
    if (footEl) footEl.innerHTML = '';
    return;
  }

  listEl.innerHTML = visible.map(j => {
    const authorName = String(j.agency || '').includes('·')
      ? String(j.agency).split('·').pop().trim()
      : String(j.agency || '여행자').split('(')[0].trim();
    const avaChar = authorName.slice(0, 1) || '동';
    const remSeats = Math.max(0, Number(j.max || 6) - Number(j.filled || 2));
    return `
      <article class="ts-comp-row" onclick="openJoinDetailModal('${j.id}')">
        <div class="ts-comp-left">
          <div class="ts-comp-tags">
            <span class="ts-comp-tag"># ${j.regionKey}</span>
            <span class="ts-comp-tag"># ${j.durationKey}</span>
            <span class="ts-comp-tag"># 현재 ${j.filled}/${j.max}명 (${remSeats > 0 ? `${remSeats}자리 모집` : '모집마감'})</span>
          </div>
          <h5 class="ts-comp-title">${j.title}</h5>
          <div class="ts-comp-meta">
            <span class="ts-comp-author">
              <span class="ts-comp-ava">${avaChar}</span>
              ${authorName} <i class="xi-check-circle" style="color:#0ca678;"></i>
            </span>
            <span>·</span>
            <span><i class="xi-calendar"></i> ${j.dateStr}</span>
            <span>·</span>
            <span>${j.tags}</span>
          </div>
        </div>
        <div class="ts-comp-right">
          <img src="${j.img}" alt="${j.title}" class="ts-comp-thumb" loading="lazy" />
          <span class="ts-comp-apply-pill">${remSeats > 0 ? '합류신청 →' : '마감됨'}</span>
        </div>
      </article>
    `;
  }).join('');

  if (footEl) {
    const moreBtnHtml = feedItems.length > visible.length
      ? `<button type="button" class="ts-cal-viewall-btn" onclick="loadMoreCompanionFeed()">동행 모집글 더보기 (${visible.length}/${feedItems.length}) <i class="xi-angle-down-min"></i></button>`
      : `<span style="font-size:12.5px; color:#8b95a1;">클릭하면 인원 현황 확인 및 간편 동행·합류 신청이 가능합니다</span>`;
    footEl.innerHTML = `
      ${moreBtnHtml}
      <a href="https://www.boolub.com/?pn=board.list&amp;_menu=community&amp;searchMode=Y&amp;searchWord=%EB%8F%99%ED%96%89" target="_blank" rel="noopener" class="bl-more-link">
        부럽 동행 커뮤니티 원문 전체보기 <i class="xi-angle-right-min"></i>
      </a>
    `;
  }
}

function renderJoinCards() {
  renderOpenGroupCards();
  renderCommunityFeed();
}

function copyJoinDeepLink(joinId) {
  const item = JOIN_ITEMS.find(x => String(x.id) === String(joinId));
  const baseUrl = AUTH_STATE.isLiveCms
    ? `${window.location.origin}/?pn=pages.view&type=pages&data=mj&join=${encodeURIComponent(joinId)}`
    : `${window.location.origin}${window.location.pathname}?pn=pages.view&type=pages&data=mj&join=${encodeURIComponent(joinId)}`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(baseUrl).then(() => {
      showToast(`[${item ? item.dateStr : '동행 일정'}] 직결 공유 링크가 복사되었습니다!`);
    }).catch(() => {
      showToast('공유 주소: ' + baseUrl);
    });
  } else {
    showToast('공유 주소: ' + baseUrl);
  }
}

function setSimPax(pax, btnEl) {
  document.querySelectorAll('#joinModalBody .bl-pax-tab').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  const map = {
    3: { label: '3명 출발 시 1인 예상 부담금', krw: '1,110,000원', diff: '(추가 합류 시 전원 즉시 인하)' },
    4: { label: '4명 확정 시 전원 1인 부담금', krw: '940,000원', diff: '(3인 대비 17만 원 절약)' },
    5: { label: '5명 합류 시 전원 1인 부담금', krw: '820,000원', diff: '(3인 대비 29만 원 절약)' },
    6: { label: '6명 마감 시 전원 최저 부담금', krw: '740,000원', diff: '(3인 대비 37만 원 절약!)' }
  };
  const info = map[pax] || map[5];
  const l = document.getElementById('simDescLabel');
  const k = document.getElementById('simKrwText');
  const u = document.getElementById('simUsdText');
  if (l) l.textContent = info.label;
  if (k) k.textContent = info.krw;
  if (u) u.textContent = info.diff;
}

function openJoinDetailModal(joinId, draftRestore = null) {
  const item = JOIN_ITEMS.find(x => String(x.id) === String(joinId)) || JOIN_ITEMS[0];
  const body = document.getElementById('joinModalBody');
  const prodLink = item.pcode
    ? `https://www.boolub.com/?pn=product.view&pcode=${item.pcode}`
    : 'https://www.boolub.com/?pn=pages.view&type=pages&data=mgexpedition';
  const rem = Math.max(0, Number(item.max || 6) - Number(item.filled || 0));
  const paxChoices = [1, 2, 3, 4].filter(n => n <= Math.max(1, rem));
  const defaultContact = draftRestore?.contact || '';
  const defaultMemo = draftRestore?.memo || '일정과 코스가 딱 맞아서 합류 희망합니다! 항공권 및 세부 일정 조율 가능해요.';
  const defaultPax = Number(draftRestore?.pax || 1);

  if (body) {
    body.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
        <span class="bl-mokta-tag">${item.agency} · ${item.statusBadge}</span>
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:13px; font-weight:700; color:var(--bl-gray-700);"><i class="xi-calendar"></i> ${item.dateStr}</span>
          <button type="button" class="bl-btn bl-btn-outline bl-btn-sm" style="height:28px; padding:0 9px; font-size:11.5px;" onclick="copyJoinDeepLink('${item.id}')">
            <i class="xi-share-alt-o"></i> 링크공유
          </button>
        </div>
      </div>
      <h3 style="font-size:18px; font-weight:800; color:var(--bl-gray-900); margin-bottom:6px;">${item.title}</h3>
      <div style="font-size:12.5px; color:#6b7684; margin-bottom:14px;">선호·특징: ${item.tags || '성별·연령 무관 · 매너 동행 환영'}</div>

      <div style="padding:14px; border-radius:12px; background:#f7f8fa; margin-bottom:14px;">
        <div style="font-size:13px; font-weight:700; margin-bottom:8px;">실시간 차량 탑승 현황 (${item.filled}명 확정 / ${item.max}인 정원 · 잔여 ${rem}석)</div>
        <div class="bl-seat-pills">
          ${item.seats.map(s => `<span class="bl-seat ${s === '빈좌석' ? 'open' : 'filled'}" style="padding:8px 4px; font-size:12px;">${s}</span>`).join('')}
        </div>
        <p style="font-size:12px; color:var(--bl-gray-500); margin-top:10px;">
          · 총무에게 현금을 송금할 필요 없이 부럽 안심결제로 본인 몫만 카드 결제합니다.<br/>
          · 추가 인원 합류로 6인 마감 시, 먼저 결제하신 분들도 전원 <strong>${item.fullPrice}</strong> 기준으로 차액이 자동 환급됩니다.
        </p>
      </div>

      ${rem > 0 ? `
        <div class="ts-apply-seat-box">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
            <strong style="font-size:14px; font-weight:800; color:#0f172a;"><i class="xi-check-circle" style="color:#0284c7;"></i> 이 일정에 바로 동행 · 합류 신청하기</strong>
            <span style="font-size:11.5px; color:#0284c7; font-weight:700;">신청 즉시 방장·담당 파트너에게 전달됩니다</span>
          </div>
          <div class="ts-apply-grid">
            <div>
              <label style="display:block; font-size:12px; font-weight:700; color:#334155; margin-bottom:4px;">합류 인원</label>
              <select class="bl-select" id="jaPaxSelect" style="height:38px;">
                ${paxChoices.map(n => `<option value="${n}" ${n === defaultPax ? 'selected' : ''}>${n}명 합류 신청</option>`).join('')}
              </select>
            </div>
            <div>
              <label style="display:block; font-size:12px; font-weight:700; color:#334155; margin-bottom:4px;">연락받을 휴대폰 또는 카카오톡 ID *</label>
              <input type="text" class="bl-input" id="jaContactInput" style="height:38px;" placeholder="예: 010-1234-5678 / 카톡ID" value="${defaultContact}" />
            </div>
          </div>
          <div style="margin-top:8px;">
            <input type="text" class="bl-input" id="jaMemoInput" style="height:38px;" placeholder="간단 자기소개 (연령대·성별·항공권 발권 여부 등)" value="${defaultMemo}" />
          </div>
        </div>
      ` : `
        <div style="padding:14px; border-radius:12px; background:#fef2f2; color:#b91c1c; font-size:13px; font-weight:700; margin-bottom:14px; text-align:center;">
          해당 팀은 전 좌석 모집이 마감되었습니다. 동일 코스로 새 동행글을 올리거나 투어 상품을 확인해보세요!
        </div>
      `}

      <!-- 1/N 자동할인 가이드 -->
      <div style="padding:13px 14px; border-radius:12px; background:#f4fafe; border:1px solid #d9effb; margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <strong style="font-size:13px; color:#191f28;">인원별 1/N 자동할인 시뮬레이션 (고비 4박5일 예시)</strong>
          <span style="font-size:11px; font-weight:700; color:#0284c7;">각자 카드결제 · 차액환급</span>
        </div>
        <div class="bl-pax-tabs" style="margin-bottom:8px;">
          <button type="button" class="bl-pax-tab" onclick="setSimPax(3, this)">3명</button>
          <button type="button" class="bl-pax-tab" onclick="setSimPax(4, this)">4명</button>
          <button type="button" class="bl-pax-tab active" onclick="setSimPax(5, this)">5명</button>
          <button type="button" class="bl-pax-tab" onclick="setSimPax(6, this)">6명 마감</button>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:baseline; flex-wrap:wrap; gap:6px;">
          <span style="font-size:12px; font-weight:700; color:#0284c7;" id="simDescLabel">5명 합류 시 전원 1인 부담금</span>
          <div>
            <strong style="font-size:16px; font-weight:800; color:#191f28;" id="simKrwText">820,000원</strong>
            <span style="font-size:11.5px; color:#6b7684;" id="simUsdText">(3인 대비 29만 원 절약)</span>
          </div>
        </div>
      </div>

      <div style="margin-top:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <div>
          <span style="font-size:12px; color:var(--bl-gray-500);">현재 기준 1인 요금</span>
          <strong style="display:block; font-size:20px; font-weight:800; color:var(--bl-gray-900);">${item.curPrice}</strong>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          ${item.bbsUrl ? `
            <a href="${item.bbsUrl}" target="_blank" rel="noopener" class="bl-btn bl-btn-outline">
              원문 보기 <i class="xi-external-link"></i>
            </a>
          ` : ''}
          <a href="${prodLink}" target="_blank" rel="noopener" class="bl-btn bl-btn-outline">
            투어 상품 보기 <i class="xi-external-link"></i>
          </a>
          ${rem > 0 ? `
            <button type="button" class="bl-btn bl-btn-point" onclick="confirmJoinSeat('${item.id}')">
              합류·동행 신청하기
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }
  openModal('joinDetailModal');
}

async function confirmJoinSeat(joinId) {
  const item = JOIN_ITEMS.find(x => String(x.id) === String(joinId));
  const pax = Math.max(1, parseInt(document.getElementById('jaPaxSelect')?.value || '1', 10));
  const contact = (document.getElementById('jaContactInput')?.value || '').trim();
  const memo = (document.getElementById('jaMemoInput')?.value || '').trim();

  if (!contact) {
    showToast('동행 방장 또는 담당 파트너가 안내드릴 연락처(또는 카카오톡 ID)를 입력해 주세요.');
    document.getElementById('jaContactInput')?.focus();
    return;
  }

  if (AUTH_STATE.isLiveCms && !isMemberLoggedIn()) {
    closeModal('joinDetailModal');
    openAuthQuickModal('동행·오픈조인 합류 신청', {
      kind: 'apply_seat',
      joinId,
      pax,
      contact,
      memo
    });
    return;
  }

  let applyId = 'ap_' + Date.now();
  if (API_BASE) {
    const res = await moktaApiCall('ajax.mokta.join.pro.php', {
      _mode: 'apply_seat',
      join_id: joinId,
      pax,
      contact,
      memo
    });
    if (res && !res.ok) {
      if (res.requireLogin) {
        closeModal('joinDetailModal');
        openAuthQuickModal('동행·오픈조인 합류 신청', { kind: 'apply_seat', joinId, pax, contact, memo });
        return;
      }
      showToast(res.message || '합류 신청 처리 중 오류가 발생했습니다.');
      return;
    }
    if (res && res.applyId) applyId = res.applyId;
  }

  const applicantLabel = AUTH_STATE.userName ? `${AUTH_STATE.userName.slice(0, 1)}*${AUTH_STATE.userName.slice(-1)}` : '신규합류';
  if (item && item.filled < item.max) {
    const addCnt = Math.min(pax, item.max - item.filled);
    for (let k = 0; k < addCnt; k++) {
      const openIdx = item.seats.indexOf('빈좌석');
      if (openIdx !== -1) item.seats[openIdx] = applicantLabel;
    }
    item.filled = Math.min(item.max, item.filled + addCnt);
    item.subBadge = item.filled >= item.max ? '모집마감' : `${item.max - item.filled}자리 남음`;
  }

  const newApplyRecord = {
    id: applyId,
    joinKey: String(joinId),
    joinTitle: item ? item.title : '몽골 동행·조인 투어',
    pid: item?.pid || 'anoratour',
    applicantId: AUTH_STATE.userId || 'guest_demo',
    applicantName: AUTH_STATE.userName || '김*수',
    contact,
    pax,
    memo,
    status: 'pending',
    rdate: '방금 전 신청'
  };
  MY_APPLIES.unshift(newApplyRecord);
  PARTNER_LEADS.unshift(newApplyRecord);

  updateMyActivityHeaderBadge();
  renderJoinCalendar();
  renderJoinCards();
  if (typeof refreshPartnerConsoleAll === 'function') refreshPartnerConsoleAll();
  closeModal('joinDetailModal');
  showToast(`합류 신청(${pax}명)이 완료되었습니다! 상단 [내 활동]에서 진행 상태를 확인하실 수 있습니다.`);
}

async function submitCompanionPost() {
  const sdate = document.getElementById('cwStartDate')?.value || '2026-08-15';
  const regionKey = document.getElementById('cwRegion')?.value || '고비';
  const durationKey = document.getElementById('cwDuration')?.value || '4박5일';
  const curCnt = parseInt(document.getElementById('cwSeats')?.value || '2', 10);
  const title = (document.getElementById('cwTitle')?.value || '').trim() || '같이 가실 몽골 동행 구해요!';
  const rawMemoTag = (document.getElementById('cwTags')?.value || '').trim();
  const agePref = document.getElementById('cwAgePref')?.value || '2030 또래';
  const genderPref = document.getElementById('cwGenderPref')?.value || '성별 무관';
  const flightPref = document.getElementById('cwFlightPref')?.value || '항공권 발권완료';
  const wantPartnerMatch = document.getElementById('cwWantMatch')?.checked ? 'Y' : 'N';

  const combinedTags = [agePref, genderPref, flightPref, rawMemoTag].filter(Boolean).join(' · ');
  const dateStr = formatKoreanDateRange(sdate, durationKey);

  if (AUTH_STATE.isLiveCms && !isMemberLoggedIn()) {
    closeModal('companionWriteModal');
    openAuthQuickModal('동행 모집글 등록', {
      kind: 'companion',
      sdate,
      regionKey,
      durationKey,
      curCnt: String(curCnt),
      title,
      tags: rawMemoTag,
      agePref,
      genderPref,
      flightPref
    });
    return;
  }

  let newId = 'j_' + Date.now();
  if (API_BASE) {
    const res = await moktaApiCall('ajax.mokta.join.pro.php', {
      _mode: 'add_member_join',
      sdate,
      region_key: regionKey,
      duration_key: durationKey,
      date_str: dateStr,
      cur_pax: curCnt,
      max_pax: 6,
      title,
      tags: rawMemoTag,
      age_pref: agePref,
      gender_pref: genderPref,
      flight_pref: flightPref,
      want_partner_match: wantPartnerMatch
    });
    if (res && !res.ok) {
      if (res.requireLogin) {
        closeModal('companionWriteModal');
        openAuthQuickModal('동행 모집글 등록', {
          kind: 'companion', sdate, regionKey, durationKey, curCnt: String(curCnt), title, tags: rawMemoTag, agePref, genderPref, flightPref
        });
        return;
      }
      showToast(res.message || '동행글 등록에 실패했습니다.');
      return;
    }
    if (res && res.id) newId = res.id;
  }

  const hostLabel = AUTH_STATE.userName ? `${AUTH_STATE.userName.slice(0, 1)}*${AUTH_STATE.userName.slice(-1)}` : '방장(나)';
  const seats = Array.from({ length: 6 }, (_, i) => (i < curCnt ? (i === 0 ? `${hostLabel}(방장)` : `동행${i + 1}`) : '빈좌석'));
  const assetPrefix = (typeof window !== 'undefined' && window.BOOLUB_MOKTA_ASSET_BASE)
    ? window.BOOLUB_MOKTA_ASSET_BASE.replace(/\/$/, '')
    : '.';

  JOIN_ITEMS.unshift({
    id: newId,
    hostType: 'member',
    hostInid: AUTH_STATE.userId || 'demo_host',
    pid: '',
    dateKey: sdate,
    dateStr,
    regionKey,
    durationKey,
    styleKey: '조인',
    statusBadge: '신규 동행모집',
    statusCls: 'amber',
    subBadge: `${6 - curCnt}자리 모집중`,
    subCls: 'sky',
    agency: wantPartnerMatch === 'Y' ? `여행자 동행모집 · ${hostLabel} (파트너 매칭희망)` : `여행자 동행모집 · ${hostLabel}`,
    pcode: 'C3954-E9344-H0474',
    title,
    img: `${assetPrefix}/images/companion_team_hands.jpg`,
    filled: curCnt,
    max: 6,
    seats,
    curPrice: '1/N 동행매칭',
    fullPrice: '790,000원~',
    tags: combinedTags
  });

  const [yy, mm] = sdate.split('-').map(Number);
  if (yy && mm) {
    curCalYear = yy;
    curCalMonth = mm;
  }
  curJoinDate = sdate;
  curCompanionFilter = 'all';
  updateMyActivityHeaderBadge();
  renderJoinCalendar();
  renderJoinCards();
  if (typeof refreshPartnerConsoleAll === 'function') refreshPartnerConsoleAll();
  closeModal('companionWriteModal');
  scrollToSection('sec-companion');
  showToast('동행 모집글이 1번 동행 피드와 월간 캘린더에 동시에 등록되었습니다!');
}

/* ================= 로그인 고객 전용: 내 동행 · 조인 · 맞춤견적 관리함 ================= */
function openMyActivityModal(defaultTab = 'hosted') {
  if (!isMemberLoggedIn()) {
    openAuthQuickModal();
    return;
  }
  const greet = document.getElementById('myActUserGreeting');
  const nm = AUTH_STATE.userName || AUTH_STATE.partnerName || AUTH_STATE.userId;
  if (greet) greet.textContent = `${nm}님, 몽골 모험 준비 현황입니다!`;

  curMyActTab = defaultTab;
  const targetBtn = document.querySelector(`#myActivityModal .ts-sheet-tab[data-mytab="${defaultTab}"]`);
  switchMyActivityTab(defaultTab, targetBtn);
  openModal('myActivityModal');
}

function switchMyActivityTab(tabKey, btnEl) {
  curMyActTab = tabKey || 'hosted';
  document.querySelectorAll('#myActivityModal .ts-sheet-tab').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderMyActivityPane();
}

function renderMyActivityPane() {
  const pane = document.getElementById('myActivityPaneBody');
  const uid = String(AUTH_STATE.userId || '');
  const myHosted = JOIN_ITEMS.filter(j => String(j.hostInid || '') === uid || (!AUTH_STATE.isLiveCms && j.hostInid === 'demo_host'));
  const myRfqs = RFQ_ITEMS.filter(r => String(r.inid || '') === uid || r.author?.includes(AUTH_STATE.userName || '__none__'));

  const hCnt = document.getElementById('myTabHostedCnt');
  const aCnt = document.getElementById('myTabAppliedCnt');
  const rCnt = document.getElementById('myTabRfqCnt');
  if (hCnt) hCnt.textContent = String(myHosted.length);
  if (aCnt) aCnt.textContent = String(MY_APPLIES.length);
  if (rCnt) rCnt.textContent = String(myRfqs.length);
  if (!pane) return;

  if (curMyActTab === 'hosted') {
    if (!myHosted.length) {
      pane.innerHTML = `
        <div style="padding:32px 16px; text-align:center; background:#f8fafc; border-radius:14px; border:1px dashed #cbd5e1;">
          <strong style="display:block; font-size:15px; color:#191f28;">아직 직접 등록한 동행 모집글이 없습니다</strong>
          <p style="font-size:13px; color:#64748b; margin:6px 0 14px;">희망 출발일을 올려 마음 맞는 동행과 공식 파트너사의 차량 제안을 함께 받아보세요!</p>
          <button type="button" class="bl-btn bl-btn-point bl-btn-sm" onclick="closeModal('myActivityModal'); openCompanionModalForDate();">+ 동행 모집글 올리기</button>
        </div>
      `;
      return;
    }
    pane.innerHTML = `
      <div style="display:grid; gap:12px;">
        ${myHosted.map(j => {
          const isFull = j.filled >= j.max;
          const relatedApplies = RECEIVED_APPLIES.filter(a => a.joinKey === String(j.id));
          return `
            <div class="ts-myact-card">
              <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
                <span class="bl-mokta-tag">${j.dateStr} · ${j.regionKey}</span>
                <span style="font-size:12.5px; font-weight:800; color:${isFull ? '#dc2626' : '#0284c7'};">현재 ${j.filled}/${j.max}명 (${j.subBadge})</span>
              </div>
              <strong style="font-size:15px; color:#191f28;">${j.title}</strong>
              <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; padding-top:6px; border-top:1px solid #f1f5f9;">
                <div style="display:flex; gap:6px; flex-wrap:wrap;">
                  <button type="button" class="bl-btn bl-btn-outline bl-btn-sm" onclick="manageJoinSchedule('${j.id}', 'dec_pax')">인원 -1</button>
                  <button type="button" class="bl-btn bl-btn-outline bl-btn-sm" onclick="manageJoinSchedule('${j.id}', 'inc_pax')">인원 +1</button>
                  <button type="button" class="bl-btn bl-btn-soft bl-btn-sm" onclick="manageJoinSchedule('${j.id}', '${isFull ? 'reopen' : 'close_full'}')">${isFull ? '재오픈' : '모집마감'}</button>
                  <button type="button" class="bl-btn bl-btn-outline bl-btn-sm" style="color:#dc2626;" onclick="manageJoinSchedule('${j.id}', 'delete')">삭제</button>
                </div>
                <button type="button" class="bl-btn bl-btn-outline bl-btn-sm" onclick="copyJoinDeepLink('${j.id}')"><i class="xi-share-alt-o"></i> 모집링크 복사</button>
              </div>
              ${relatedApplies.length ? `
                <div style="margin-top:6px; padding:10px 12px; border-radius:10px; background:#f8fafc;">
                  <strong style="font-size:12px; color:#0f172a; display:block; margin-bottom:6px;">도착한 동행 신청자 (${relatedApplies.length}명)</strong>
                  ${relatedApplies.map(ap => `
                    <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; font-size:12.5px; padding:4px 0;">
                      <span><strong>${ap.applicantName}</strong> (${ap.pax}명) · 연락처: <b>${ap.contact}</b> · ${ap.memo}</span>
                      ${ap.status === 'confirmed'
                        ? `<span class="ts-confirm-pill">확정됨</span>`
                        : `<button type="button" class="bl-btn bl-btn-point bl-btn-sm" onclick="updateLeadStatus('${ap.id}', 'confirmed')">승인</button>`}
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;
  } else if (curMyActTab === 'applied') {
    if (!MY_APPLIES.length) {
      pane.innerHTML = `
        <div style="padding:32px 16px; text-align:center; background:#f8fafc; border-radius:14px; border:1px dashed #cbd5e1;">
          <strong style="display:block; font-size:15px; color:#191f28;">아직 합류 신청한 동행·오픈조인이 없습니다</strong>
          <p style="font-size:13px; color:#64748b; margin:6px 0 14px;">마음에 드는 동행 모집글이나 출발확정 오픈조인 차량의 빈 좌석에 합류해 보세요!</p>
          <button type="button" class="bl-btn bl-btn-point bl-btn-sm" onclick="closeModal('myActivityModal'); scrollToSection('sec-companion');">동행·조인 둘러보기</button>
        </div>
      `;
      return;
    }
    pane.innerHTML = `
      <div style="display:grid; gap:10px;">
        ${MY_APPLIES.map(ap => `
          <div class="ts-myact-card">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="ts-confirm-pill ${ap.status === 'confirmed' ? '' : 'is-recruit'}">${ap.status === 'confirmed' ? '합류 확정' : '방장·파트너 확인중'}</span>
              <span style="font-size:12px; color:#8b95a1;">${ap.rdate}</span>
            </div>
            <strong style="font-size:14.5px; color:#191f28;">${ap.joinTitle}</strong>
            <div style="font-size:12.5px; color:#4e5968;">신청 인원: <strong>${ap.pax}명</strong> · 등록 연락처: ${ap.contact}</div>
            <div style="display:flex; justify-content:flex-end;">
              <button type="button" class="bl-btn bl-btn-outline bl-btn-sm" onclick="closeModal('myActivityModal'); openJoinDetailModal('${ap.joinKey}')">일정 상세보기</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    if (!myRfqs.length) {
      pane.innerHTML = `
        <div style="padding:32px 16px; text-align:center; background:#f8fafc; border-radius:14px; border:1px dashed #cbd5e1;">
          <strong style="display:block; font-size:15px; color:#191f28;">등록하신 맞춤견적 요청 내역이 없습니다</strong>
          <p style="font-size:13px; color:#64748b; margin:6px 0 14px;">항공권 일정만 남기면 공식 파트너사(최대 6곳)의 차량·숙소 실사 견적을 받아보실 수 있습니다.</p>
          <button type="button" class="bl-btn bl-btn-point bl-btn-sm" onclick="closeModal('myActivityModal'); openModal('rfqWizardModal');">맞춤견적 요청하기</button>
        </div>
      `;
      return;
    }
    pane.innerHTML = `
      <div style="display:grid; gap:10px;">
        ${myRfqs.map(r => `
          <div class="ts-myact-card">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="bl-mokta-tag">${r.dates} · ${r.paxType}</span>
              <span style="font-size:12px; font-weight:700; color:#0284c7;">도착 견적 ${r.quotes.length}건</span>
            </div>
            <strong style="font-size:14.5px; color:#191f28;">${r.title}</strong>
            <div style="display:flex; justify-content:flex-end;">
              <button type="button" class="bl-btn bl-btn-point bl-btn-sm" onclick="closeModal('myActivityModal'); openQuoteCompareModal('${r.id}')">도착 견적 비교하기 (${r.quotes.length})</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
}

async function manageJoinSchedule(joinId, subAction) {
  const idx = JOIN_ITEMS.findIndex(x => String(x.id) === String(joinId));
  if (idx === -1) return;
  const item = JOIN_ITEMS[idx];

  if (API_BASE && !String(joinId).startsWith('bbs_') && !String(joinId).startsWith('j_may') && !String(joinId).startsWith('j_jun')) {
    const res = await moktaApiCall('ajax.mokta.join.pro.php', {
      _mode: 'manage_join',
      join_id: joinId,
      sub_action: subAction
    });
    if (res && !res.ok) {
      showToast(res.message || '일정 상태 변경 중 오류가 발생했습니다.');
      return;
    }
  }

  if (subAction === 'delete') {
    JOIN_ITEMS.splice(idx, 1);
    showToast('선택한 동행·오픈조인 일정이 삭제되었습니다.');
  } else {
    if (subAction === 'inc_pax') item.filled = Math.min(item.max, item.filled + 1);
    if (subAction === 'dec_pax') item.filled = Math.max(1, item.filled - 1);
    if (subAction === 'close_full') item.filled = item.max;
    if (subAction === 'reopen') item.filled = Math.max(1, item.max - 2);

    const rem = Math.max(0, item.max - item.filled);
    item.subBadge = rem === 0 ? '모집마감' : `${rem}자리 남음`;
    item.seats = Array.from({ length: item.max }, (_, i) => (i < item.filled ? (item.seats[i] && item.seats[i] !== '빈좌석' ? item.seats[i] : `확정${i + 1}`) : '빈좌석'));
    showToast(`좌석 현황이 [${item.filled}/${item.max}명 · ${item.subBadge}]으로 즉시 업데이트되었습니다.`);
  }

  updateMyActivityHeaderBadge();
  renderJoinCalendar();
  renderJoinCards();
  renderMyActivityPane();
  if (typeof refreshPartnerConsoleAll === 'function') refreshPartnerConsoleAll();
}

async function updateLeadStatus(applyId, nextStatus) {
  if (API_BASE && !String(applyId).startsWith('demo_') && !String(applyId).startsWith('ap_')) {
    const res = await moktaApiCall('ajax.mokta.join.pro.php', {
      _mode: 'update_apply_status',
      apply_id: applyId,
      status: nextStatus
    });
    if (res && !res.ok) {
      showToast(res.message || '신청 상태 변경에 실패했습니다.');
      return;
    }
  }
  [PARTNER_LEADS, RECEIVED_APPLIES, MY_APPLIES].forEach(arr => {
    const found = arr.find(x => String(x.id) === String(applyId));
    if (found) found.status = nextStatus;
  });
  renderMyActivityPane();
  if (typeof refreshPartnerConsoleAll === 'function') refreshPartnerConsoleAll();
  showToast(nextStatus === 'confirmed' ? '고객 합류 신청이 [확정] 처리되었습니다!' : '신청이 취소 처리되었습니다.');
}

/* ================= 섹션 3: 내 일정 맞춤견적 보드 (고객 전용 깔끔 UI) ================= */
function filterRfq(cat, btnEl) {
  curRfqFilter = cat;
  const row = btnEl?.parentElement;
  if (row) row.querySelectorAll('.bl-chip').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderRfqBoard();
}

function renderRfqBoard() {
  const grid = document.getElementById('rfqBoardGrid');
  if (!grid) return;

  const list = RFQ_ITEMS.filter(r => {
    if (curRfqFilter !== 'all') {
      if (curRfqFilter === '고비' || curRfqFilter === '홉스골') {
        if (r.regionTag !== curRfqFilter) return false;
      } else if (r.cat !== curRfqFilter) {
        return false;
      }
    }
    if (globalKeyword) {
      const hay = `${r.title} ${r.desc} ${r.specs.join(' ')}`.toLowerCase();
      if (!hay.includes(globalKeyword)) return false;
    }
    return true;
  });

  const badge1 = document.getElementById('tabRfqCount');
  const badge2 = document.getElementById('headerBidBadge');
  const badge3 = document.getElementById('ptabQuoteCnt');
  if (badge1) badge1.textContent = String(RFQ_ITEMS.length);
  if (badge2) badge2.textContent = String(RFQ_ITEMS.length);
  if (badge3) badge3.textContent = String(RFQ_ITEMS.length);

  grid.innerHTML = list.map(r => {
    const qCnt = r.quotes.length;
    const logos = r.quotes.slice(0, 4).map(q => `<img src="${q.logo || './images/mokta_logo.png'}" alt="${q.agency}" />`).join('');
    return `
      <article class="bl-freeboard-card">
        <div>
          <div class="bl-fb-profile">
            <div class="bl-fb-author">
              <div class="bl-fb-avatar">${r.avatar}</div>
              <div>
                <div class="bl-fb-name">${r.author} <span style="font-weight:500; color:var(--bl-gray-400); font-size:12px;">· ${r.timeAgo}</span></div>
                <div class="bl-fb-submeta">희망일정: <b>${r.dates}</b> · ${r.paxType}</div>
              </div>
            </div>
            <span class="bl-cat-pill">${qCnt > 0 ? `견적 ${qCnt}건 도착` : '파트너 확인중'}</span>
          </div>

          <h4 class="bl-fb-title" style="margin-top:12px;">${r.title}</h4>
          <p class="bl-fb-desc">${r.desc}</p>
          <div class="bl-fb-spec-tags">
            ${r.specs.map(s => `<span class="bl-spec-tag">#${s}</span>`).join('')}
          </div>
        </div>

        <div class="bl-fb-footer">
          <div class="bl-bid-avatars">
            <div class="bl-avatar-stack">${logos}</div>
            <span style="font-size:12.5px; font-weight:600; color:var(--bl-gray-700);">
              ${qCnt > 0 ? `공식 파트너 <strong>${qCnt}곳</strong> 실사 견적 제안 완료` : '공식 파트너사가 맞춤 일정을 검토 중입니다'}
            </span>
          </div>
          <div style="display:flex; gap:6px;">
            <button type="button" class="bl-btn bl-btn-outline bl-btn-sm" onclick="prefillRfqFromCourse('${r.title.replace(/'/g, '')}', '${r.dates}')">
              나도 이 코스로 문의
            </button>
            <button type="button" class="bl-btn bl-btn-point bl-btn-sm" onclick="openQuoteCompareModal('${r.id}')">
              도착 견적 비교 (${qCnt})
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function prefillRfqFromCourse(courseTitle, datesStr) {
  const wDates = document.getElementById('wDates');
  const wMemo = document.getElementById('wMemo');
  if (datesStr && wDates) wDates.value = datesStr;
  if (wMemo) wMemo.value = `[관심 코스: ${courseTitle}] 비슷한 동선과 숙소 조건으로 우리 일행 맞춤 견적을 받아보고 싶습니다.`;
  openModal('rfqWizardModal');
}

async function submitCustomerWizard() {
  const dates = document.getElementById('wDates')?.value || '8월 15일 ~ 8월 19일 (4박 5일)';
  const paxType = document.getElementById('wType')?.value || '단독투어 · 4명 확정';
  const course = document.getElementById('wCourse')?.value || '고비사막 핵심';
  const infra = document.getElementById('wInfra')?.value || '신형 스타렉스 · 샤워 가능 캠프';
  const memo = document.getElementById('wMemo')?.value || '';

  if (AUTH_STATE.isLiveCms && !isMemberLoggedIn()) {
    closeModal('rfqWizardModal');
    openAuthQuickModal('내 일정 맞춤견적 요청', {
      kind: 'rfq',
      dates,
      paxType,
      course,
      infra,
      memo
    });
    return;
  }

  const isJoin = paxType.includes('동행조인');
  const regionTag = course.includes('홉스골') ? '홉스골' : '고비';

  let newRfqId = 'r_' + Date.now();
  if (API_BASE) {
    const res = await moktaApiCall('ajax.mokta.rfq.pro.php', {
      _mode: 'add',
      dates,
      pax_type: paxType,
      course,
      infra,
      region_tag: regionTag,
      memo
    });
    if (res && !res.ok) {
      if (res.requireLogin) {
        closeModal('rfqWizardModal');
        openAuthQuickModal('내 일정 맞춤견적 요청', { kind: 'rfq', dates, paxType, course, infra, memo });
        return;
      }
      showToast(res.message || '맞춤견적 등록 중 오류가 발생했습니다.');
      return;
    }
    if (res && res.id) newRfqId = res.id;
  }

  const assetPrefix = (typeof window !== 'undefined' && window.BOOLUB_MOKTA_ASSET_BASE)
    ? window.BOOLUB_MOKTA_ASSET_BASE.replace(/\/$/, '')
    : '.';

  const newItem = {
    id: newRfqId,
    inid: AUTH_STATE.userId || 'demo_member',
    author: AUTH_STATE.userName ? `${AUTH_STATE.userName} 여행자님` : '나의 맞춤견적 요청',
    avatar: AUTH_STATE.userName ? AUTH_STATE.userName.slice(0, 1) : '나',
    timeAgo: '방금 전 등록',
    cat: isJoin ? '동행조인' : '단독투어',
    regionTag,
    dates,
    paxType,
    title: `[${dates}] ${course} 맞춤견적 요청합니다`,
    desc: memo,
    specs: [paxType.split('·')[0].trim(), infra, '공식파트너 실사비교'],
    quotes: [
      {
        agency: '부럽 몽골원정대 · AI 빠른추천',
        pid: 'boolub',
        pcode: regionTag === '홉스골' ? 'A9725-O5305-E2887' : 'C3954-E9344-H0474',
        logo: `${assetPrefix}/images/mokta_logo.png`,
        badge: '견적 대기 없이 즉시 예약 가능',
        price4: regionTag === '홉스골' ? '1,400,000원' : '1,150,000원',
        price6: regionTag === '홉스골' ? '1,184,000원' : '990,000원',
        veh: infra,
        ger: '부럽 검증 정식 캠프 + USIM 혜택',
        vehImg: `${assetPrefix}/images/vehicle_fleet.jpg`,
        gerImg: `${assetPrefix}/images/ger_interior.jpg`,
        comment: '파트너사 개별 맞춤 견적이 도착하는 동안, 조건이 가장 유사한 부럽 즉시확정 베스트 상품을 먼저 확인해보세요!'
      }
    ]
  };

  RFQ_ITEMS.unshift(newItem);
  curRfqFilter = 'all';
  updateMyActivityHeaderBadge();
  renderRfqBoard();
  populatePartnerRfqSelect();
  if (typeof refreshPartnerConsoleAll === 'function') refreshPartnerConsoleAll();
  closeModal('rfqWizardModal');
  scrollToSection('sec-rfq');
  showToast('맞춤견적 요청이 등록되었습니다! 파트너사 견적이 도착하면 알림톡 및 [내 활동]에서 확인 가능합니다.');
}

function openQuoteCompareModal(rfqId) {
  const item = RFQ_ITEMS.find(x => x.id === rfqId) || RFQ_ITEMS[0];
  const titleEl = document.getElementById('qCompTitle');
  const bodyEl = document.getElementById('qCompBody');
  if (titleEl) titleEl.textContent = `도착한 공식 파트너 맞춤 비교견적 (${item.quotes.length}건)`;

  if (bodyEl) {
    bodyEl.innerHTML = `
      <div style="margin-bottom:16px; padding:12px 16px; border-radius:10px; background:var(--bl-gray-50); border:1px solid var(--bl-gray-200);">
        <div style="font-size:12px; color:var(--bl-point-text); font-weight:700;">${item.dates} · ${item.paxType}</div>
        <strong style="font-size:15px; color:var(--bl-gray-900);">${item.title}</strong>
      </div>

      <div class="bl-quote-compare-grid">
        ${item.quotes.map(q => {
          const prodUrl = q.pcode
            ? `https://www.boolub.com/?pn=product.view&pcode=${q.pcode}`
            : `https://www.boolub.com/?pn=partner.view&pid=${q.pid || 'anoratour'}`;
          return `
            <div class="bl-qcard">
              <div>
                <div class="bl-qcard-photos">
                  <div><img src="${q.vehImg}" alt="배정차량" /><span>배정 차량 실사</span></div>
                  <div><img src="${q.gerImg}" alt="숙소캠프" /><span>숙소 캠프 실사</span></div>
                </div>
                <div style="padding:14px;">
                  <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                    <img src="${q.logo || './images/mokta_logo.png'}" alt="${q.agency}" style="width:28px; height:28px; border-radius:50%; object-fit:contain; border:1px solid var(--bl-gray-200); background:#fff;" />
                    <div>
                      <strong style="font-size:14.5px; color:var(--bl-gray-900); display:block;">${q.agency}</strong>
                      <span style="font-size:11px; color:var(--bl-point-text); font-weight:700;">${q.badge}</span>
                    </div>
                  </div>
                  <div style="font-size:12.5px; color:var(--bl-gray-700); margin-top:8px; display:grid; gap:3px;">
                    <div><strong>· 차량:</strong> ${q.veh}</div>
                    <div><strong>· 숙소:</strong> ${q.ger}</div>
                  </div>
                  <p style="margin-top:8px; padding:9px 10px; border-radius:8px; background:var(--bl-gray-50); font-size:12.5px; color:var(--bl-gray-700); line-height:1.5;">
                    "${q.comment}"
                  </p>
                </div>
              </div>
              <div style="padding:12px 14px; border-top:1px solid var(--bl-gray-100); background:#fafcfd;">
                <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:10px;">
                  <span style="font-size:12px; color:var(--bl-gray-500);">4인 출발 1인당 <strong style="color:var(--bl-gray-900); font-size:15px;">${q.price4}</strong></span>
                  <span style="font-size:11.5px; color:var(--bl-point-text); font-weight:700;">6인 마감 시 ${q.price6}</span>
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
                  <button type="button" class="bl-btn bl-btn-soft bl-btn-sm" onclick="closeModal('quoteCompareModal'); showToast('${q.agency} 전담 매니저와의 안심 채팅방이 개설되었습니다.')">
                    1:1 일정 조율
                  </button>
                  <a href="${prodUrl}" target="_blank" rel="noopener" class="bl-btn bl-btn-point bl-btn-sm">
                    부럽 상품 예약 <i class="xi-external-link"></i>
                  </a>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }
  openModal('quoteCompareModal');
}

/* ================= 섹션 4: 현지 파트너 LIVE 스토리 ================= */
function filterShowcase(cat, btnEl) {
  curShowcaseFilter = cat;
  const row = btnEl?.parentElement;
  if (row) row.querySelectorAll('.bl-chip').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderShowcase();
}

function renderShowcase() {
  const grid = document.getElementById('showcaseGrid');
  if (!grid) return;

  const list = SHOWCASE_ITEMS.filter(s => {
    if (curShowcaseFilter !== 'all' && s.cat !== curShowcaseFilter) return false;
    if (globalKeyword) {
      const hay = `${s.title} ${s.agency} ${s.prodName}`.toLowerCase();
      if (!hay.includes(globalKeyword)) return false;
    }
    return true;
  });

  const maxShow = (curShowcaseFilter === 'all' && !globalKeyword) ? 4 : 8;
  const visible = list.slice(0, maxShow);

  grid.innerHTML = visible.map((s, idx) => {
    const shortAg = String(s.agency || '').split('(')[0].trim();
    const reviewerLabel = s.postUrl ? '실제 탑승 모험가' : `${shortAg} 현장 LIVE`;
    const avaTxt = s.postUrl ? ['김', '박', '이', '정', '최', '윤'][idx % 6] : shortAg.slice(0, 1);
    const companionCnt = [5, 6, 4, 5][idx % 4];
    return `
      <article class="ts-rev-card" onclick="openShowcaseModal('${s.id}')">
        <div>
          <div class="ts-rev-top">
            <div class="ts-rev-user">
              <div class="ts-rev-user-ava">${avaTxt}</div>
              <div>
                <strong style="font-size:13.5px; color:#191f28; display:block;">${reviewerLabel}</strong>
                <span style="font-size:11.5px; color:#8b95a1;">${s.badge} · <i class="xi-star" style="color:#ffb800;"></i> <b style="color:#333d4b;">5.0</b></span>
              </div>
            </div>
            <span class="ts-pill-gray">${s.cat}</span>
          </div>

          <div class="ts-rev-prod-link" style="margin-top:11px;" onclick="event.stopPropagation(); openProductPreviewModal('${s.pcode}')">
            ${s.prodName} (${s.price})
          </div>

          <div class="ts-rev-cohesion-bar" style="margin-top:9px;">
            <span>함께한 모험가</span>
            <div style="display:inline-flex; align-items:center; gap:6px;">
              ${renderAvatarStack(companionCnt)}
              <strong style="color:#191f28;">${companionCnt}명</strong>
            </div>
          </div>

          <div class="ts-rev-body-row" style="margin-top:12px;">
            <div style="min-width:0; flex:1;">
              <h4 class="ts-rev-title">${s.title}</h4>
              <p class="ts-rev-desc">${s.tip}</p>
            </div>
            <img src="${s.img}" alt="${s.title}" class="ts-rev-photo" loading="lazy" />
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function openShowcaseModal(id) {
  const s = SHOWCASE_ITEMS.find(x => String(x.id) === String(id)) || SHOWCASE_ITEMS[0];
  const body = document.getElementById('reelModalBody');
  if (body) {
    body.innerHTML = `
      <div style="display:grid; grid-template-columns:1.1fr 0.9fr; gap:18px; align-items:center;">
        <div style="border-radius:12px; overflow:hidden; aspect-ratio:4/3; background:#000;">
          <img src="${s.img}" alt="${s.title}" style="width:100%; height:100%; object-fit:cover;" />
        </div>
        <div>
          <span class="bl-mokta-tag">${s.agency} · ${s.badge}</span>
          <h3 style="font-size:18px; font-weight:800; color:var(--bl-gray-900); margin-top:8px; line-height:1.4;">${s.title}</h3>
          <p style="margin-top:10px; padding:12px; border-radius:10px; background:var(--bl-gray-50); font-size:13px; color:var(--bl-gray-700); line-height:1.55;">
            <strong>${s.postUrl ? '실제 여행자 후기 요약:' : '현지 매니저 TIP:'}</strong> ${s.tip}
          </p>

          ${s.postUrl ? `
            <div style="margin-top:10px;">
              <a href="${s.postUrl}" target="_blank" rel="noopener" class="bl-btn bl-btn-outline bl-btn-sm" style="width:100%;">
                부럽 실제 후기 원문 전체보기 <i class="xi-external-link"></i>
              </a>
            </div>
          ` : ''}

          <div style="margin-top:12px; padding:12px 14px; border-radius:10px; border:1px solid var(--bl-point-line); background:var(--bl-point-bg);">
            <div style="font-size:11.5px; font-weight:700; color:var(--bl-point-text);">연결된 부럽 실제 판매 투어</div>
            <strong style="display:block; font-size:14px; color:var(--bl-gray-900); margin-top:2px;">${s.prodName}</strong>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
              <strong style="font-size:16px; color:var(--bl-gray-900);">${s.price}</strong>
              <button type="button" class="bl-btn bl-btn-point bl-btn-sm" onclick="closeModal('reelModal'); openProductPreviewModal('${s.pcode}')">
                투어 상세·예약 보기 <i class="xi-angle-right-min"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  openModal('reelModal');
}

/* ================= 섹션 5: 부럽 실제 입점 공식 파트너사 로고 마키 & 가로 캐러셀 ================= */
function filterAgencies(cat, btnEl) {
  curAgencyFilter = cat;
  const row = btnEl?.parentElement;
  if (row) row.querySelectorAll('.bl-chip').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderPartnerSection();
}

function getFilteredAgencies() {
  return MOKTA_AGENCIES.filter(ag => {
    if ((curAgencyFilter === '고비·남부' || curAgencyFilter === '홉스골·중부') && ag.cat !== curAgencyFilter) return false;
    if (globalKeyword) {
      const hay = `${ag.name} ${ag.en} ${ag.desc} ${ag.spec}`.toLowerCase();
      if (!hay.includes(globalKeyword)) return false;
    }
    return true;
  });
}

function renderPartnerSection() {
  const marqueeTrack = document.getElementById('logoMarqueeTrack');
  const cardsTrack = document.getElementById('agencyCardsGrid');
  const tabPartnerCnt = document.getElementById('tabPartnerCount');
  const chipPartnerCnt = document.getElementById('chipPartnerTotal');
  if (tabPartnerCnt) tabPartnerCnt.textContent = String(MOKTA_AGENCIES.length);
  if (chipPartnerCnt) chipPartnerCnt.textContent = String(MOKTA_AGENCIES.length);
  if (!marqueeTrack || !cardsTrack) return;

  const list = getFilteredAgencies();
  const marqueeSource = list.length >= 6 ? list : MOKTA_AGENCIES;
  const doubled = [...marqueeSource, ...marqueeSource, ...marqueeSource];

  marqueeTrack.innerHTML = doubled.map(ag => `
    <div class="bl-logo-chip" onclick="openAgencyHomeModal('${ag.id}')">
      <div class="bl-logo-chip-svg">${renderPartnerBadgeMedia(ag, 34)}</div>
      <div class="bl-logo-chip-meta">
        <strong>${ag.name}</strong>
        <span><i class="xi-star"></i> ${ag.rating} · ${ag.prodCount || ''}개 투어 운영</span>
      </div>
    </div>
  `).join('');

  cardsTrack.innerHTML = list.map(ag => `
    <article class="bl-partner-card">
      <div>
        <div class="bl-pcard-cover" onclick="openAgencyHomeModal('${ag.id}')">
          <img src="${ag.cover}" alt="${ag.name}" class="cover-img" />
          <div class="bl-pcard-cover-top">
            <span class="bl-pcard-cert">${ag.cert}</span>
            <span class="bl-pcard-rating"><i class="xi-star"></i> ${ag.rating} (${ag.reviews})</span>
          </div>
        </div>

        <div class="bl-pcard-body">
          <div class="bl-pcard-brand-row">
            <div class="bl-pcard-emblem">${renderPartnerBadgeMedia(ag, 46)}</div>
            <span class="bl-pcard-spec-badge ${ag.statusType === 'mokta_soon' ? 'is-upcoming' : ''}">${ag.spec}</span>
          </div>

          <div class="bl-pcard-title-box">
            <h4>${ag.name}</h4>
            ${ag.slogan ? `<div class="bl-pcard-slogan" style="margin-top:4px;">${ag.slogan}</div>` : ''}
          </div>

          ${Array.isArray(ag.perks) && ag.perks.length ? `
            <div class="bl-pcard-perks" style="margin-top:10px;">
              ${ag.perks.slice(0, 2).map(pk => `<span class="bl-pcard-perk-chip">✓ ${pk}</span>`).join('')}
            </div>
          ` : ''}

          <div class="bl-partner-thumbs" style="margin-top:12px;">
            ${(ag.photos || []).slice(0, 3).map(ph => `<img src="${ph}" alt="${ag.name} 현장실사" />`).join('')}
          </div>
        </div>
      </div>

      <div style="padding:0 18px 18px; display:grid; grid-template-columns:1fr 1fr; gap:8px;">
        <button type="button" class="bl-btn bl-btn-outline bl-btn-sm" onclick="openAgencyHomeModal('${ag.id}')">
          브랜드 미니홈
        </button>
        ${ag.statusType === 'active'
          ? `<a href="${ag.storeUrl}" target="_blank" rel="noopener" class="bl-btn bl-btn-point bl-btn-sm">부럽 입점상품 보기</a>`
          : `<button type="button" class="bl-btn bl-btn-soft bl-btn-sm" onclick="prefillRfqFromCourse('${ag.name} 지정 맞춤견적')">사전 맞춤견적 문의</button>`}
      </div>
    </article>
  `).join('');

  updatePartnerProgress();
}

function slidePartnerCards(dir) {
  const track = document.getElementById('agencyCardsGrid');
  if (!track) return;
  const step = 340;
  const maxScroll = track.scrollWidth - track.clientWidth;
  if (dir > 0 && track.scrollLeft >= maxScroll - 10) {
    track.scrollTo({ left: 0, behavior: 'smooth' });
  } else if (dir < 0 && track.scrollLeft <= 10) {
    track.scrollTo({ left: maxScroll, behavior: 'smooth' });
  } else {
    track.scrollBy({ left: dir * step, behavior: 'smooth' });
  }
  setTimeout(updatePartnerProgress, 360);
}

function updatePartnerProgress() {
  const track = document.getElementById('agencyCardsGrid');
  const fill = document.getElementById('partnerProgressFill');
  const txt = document.getElementById('partnerPageTxt');
  if (!track || !fill || !txt) return;

  const list = getFilteredAgencies();
  const total = Math.max(list.length, 1);
  const maxScroll = Math.max(track.scrollWidth - track.clientWidth, 1);
  const ratio = Math.min(Math.max(track.scrollLeft / maxScroll, 0), 1);
  const curIdx = Math.min(total, Math.max(1, Math.round(ratio * (total - 1)) + 1));

  fill.style.width = `${Math.max(8, ratio * 100)}%`;
  txt.textContent = `${curIdx} / ${total}`;
}

function startPartnerAutoSlide() {
  clearInterval(partnerAutoTimer);
  partnerAutoTimer = setInterval(() => {
    if (isPartnerAutoPlaying && !document.body.classList.contains('partner-mode')) {
      slidePartnerCards(1);
    }
  }, 3600);
}

function togglePartnerAutoSlide() {
  isPartnerAutoPlaying = !isPartnerAutoPlaying;
  const btn = document.getElementById('partnerAutoBtn');
  const mq = document.getElementById('logoMarqueeWrap');
  if (btn) {
    btn.innerHTML = isPartnerAutoPlaying
      ? '<i class="xi-pause"></i> 자동 회전 중'
      : '<i class="xi-play"></i> 일시정지됨';
  }
  if (mq) mq.classList.toggle('paused', !isPartnerAutoPlaying);
}

function switchAgencyMinihomeTab(tabKey, btnEl) {
  const modal = document.getElementById('agencyModalBody');
  if (!modal) return;
  modal.querySelectorAll('.bl-mh-tab').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  modal.querySelectorAll('.bl-mh-pane').forEach(p => {
    p.classList.toggle('active', p.getAttribute('data-mh-pane') === tabKey);
  });
}

let curOpenMinihomeAgId = '';

function openAgencyHomeModal(agId, initialTab = 'about') {
  const ag = MOKTA_AGENCIES.find(x => x.id === agId || x.pid === agId) || MOKTA_AGENCIES[0];
  curOpenMinihomeAgId = ag.id;
  const partnerProds = DIRECT_PRODUCTS.filter(p => String(p.pid || '') === String(ag.pid));
  const shortName = ag.name.split('(')[0].trim();
  const partnerJoins = JOIN_ITEMS.filter(j => (j.pid && j.pid === ag.pid) || String(j.agency || '').includes(shortName));

  const titleEl = document.getElementById('agencyModalTitle');
  const bodyEl = document.getElementById('agencyModalBody');
  if (titleEl) titleEl.textContent = `${ag.name} · 공식 브랜드 미니홈`;

  const perksHtml = (Array.isArray(ag.perks) && ag.perks.length)
    ? `<div class="bl-mh-perks">${ag.perks.map(pk => `<span class="bl-mh-perk-pill"><i class="xi-check-min"></i> ${pk}</span>`).join('')}</div>`
    : '';

  if (bodyEl) {
    bodyEl.innerHTML = `
      <!-- 커스텀 커버 & 슬로건 히어로 -->
      <div class="bl-mh-hero">
        <img src="${ag.cover}" alt="${ag.name}" class="mh-bg" />
        <div class="bl-mh-hero-inner">
          <div class="bl-mh-brand-left">
            <div class="bl-mh-logo-box">${renderPartnerBadgeMedia(ag, 56)}</div>
            <div>
              <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                <span class="bl-mokta-tag" style="background:rgba(56,190,239,0.22); color:#93e2ff; border:1px solid rgba(125,211,252,0.4);">${ag.cert}</span>
                <span style="font-size:12px; font-weight:700; color:#fde047;"><i class="xi-star"></i> ${ag.rating} (후기 ${ag.reviews}건)</span>
              </div>
              <h3 style="font-size:21px; font-weight:800; color:#ffffff; margin-top:4px;">${ag.name} <span style="font-size:12px; font-weight:600; color:rgba(255,255,255,0.72);">${ag.en}</span></h3>
              <div class="bl-mh-slogan">${ag.slogan || `${ag.spec} 전문 공식 파트너사`}</div>
            </div>
          </div>

          <div style="display:flex; gap:7px; flex-wrap:wrap;">
            <button type="button" class="bl-btn bl-btn-outline bl-btn-sm" style="background:rgba(255,255,255,0.16); color:#fff; border-color:rgba(255,255,255,0.4);" onclick="copyPartnerMinihomeLink('${ag.pid}')">
              <i class="xi-link"></i> 미니홈 링크복사
            </button>
            ${ag.videoUrl ? `
              <a href="${ag.videoUrl}" target="_blank" rel="noopener" class="bl-btn bl-btn-outline bl-btn-sm" style="background:rgba(255,255,255,0.15); color:#fff; border-color:rgba(255,255,255,0.4);">
                <i class="xi-play-circle-o"></i> 홍보영상 보기
              </a>
            ` : ''}
            <button type="button" class="bl-btn bl-btn-soft bl-btn-sm" onclick="closeModal('agencyHomeModal'); prefillRfqFromCourse('${ag.name} 1:1 지정 맞춤견적 요청')">
              1:1 지정견적 요청
            </button>
            ${ag.storeUrl ? `
              <a href="${ag.storeUrl}" target="_blank" rel="noopener" class="bl-btn bl-btn-point bl-btn-sm">
                부럽 스토어 <i class="xi-external-link"></i>
              </a>
            ` : ''}
          </div>
        </div>
      </div>

      ${perksHtml}

      <!-- 3단 미니홈 전용 탭 -->
      <div class="bl-mh-tabs">
        <button type="button" class="bl-mh-tab ${initialTab === 'about' ? 'active' : ''}" onclick="switchAgencyMinihomeTab('about', this)">
          특장점 · 차량 · 숙소 소개
        </button>
        <button type="button" class="bl-mh-tab ${initialTab === 'prods' ? 'active' : ''}" onclick="switchAgencyMinihomeTab('prods', this)">
          예약 가능 투어 상품 (${partnerProds.length})
        </button>
        <button type="button" class="bl-mh-tab ${initialTab === 'joins' ? 'active' : ''}" onclick="switchAgencyMinihomeTab('joins', this)">
          진행중인 오픈조인 일정 (${partnerJoins.length})
        </button>
      </div>

      <!-- 탭 1: 특장점·차량·숙소 스펙 & 현장 화보 -->
      <div class="bl-mh-pane ${initialTab === 'about' ? 'active' : ''}" data-mh-pane="about">
        <p style="font-size:13.8px; color:var(--bl-gray-700); line-height:1.65;">${ag.desc}</p>

        <div class="bl-mh-spec-grid">
          <div class="bl-mh-spec-box">
            <span>주력 보유 차량</span>
            <strong>${ag.fleet}</strong>
          </div>
          <div class="bl-mh-spec-box">
            <span>직영 · 제휴 캠프</span>
            <strong>${ag.camp}</strong>
          </div>
          <div class="bl-mh-spec-box">
            <span>업력 · 가이드 강점</span>
            <strong>${ag.career || '한국어 베테랑 전담'}</strong>
          </div>
          <div class="bl-mh-spec-box">
            <span>평균 응답 · 예약확정</span>
            <strong>${ag.resp}</strong>
          </div>
        </div>

        <div style="font-size:13px; font-weight:800; color:var(--bl-gray-900); margin-bottom:8px;">
          <i class="xi-camera" style="color:var(--bl-point-dark);"></i> ${ag.name} 배정 차량 · 캠프 · 투어 현장 실사
        </div>
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:10px;">
          ${(ag.photos || []).slice(0, 6).map(ph => `<img src="${ph}" alt="${ag.name}" style="width:100%; aspect-ratio:16/10; object-fit:cover; border-radius:10px; border:1px solid var(--bl-gray-100);" />`).join('')}
        </div>
      </div>

      <!-- 탭 2: 대표 투어 상품 -->
      <div class="bl-mh-pane ${initialTab === 'prods' ? 'active' : ''}" data-mh-pane="prods">
        ${partnerProds.length ? `
          <div style="display:grid; gap:10px;">
            ${partnerProds.map(p => `
              <div style="padding:12px 14px; border-radius:12px; border:1px solid var(--bl-gray-200); display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap;">
                <div style="display:flex; align-items:center; gap:12px; min-width:0; flex:1;">
                  <img src="${p.img}" alt="${p.title}" style="width:60px; height:60px; border-radius:10px; object-fit:cover; flex-shrink:0;" />
                  <div style="min-width:0;">
                    <span class="bl-mokta-tag" style="margin-bottom:3px;">${p.tag}</span>
                    <strong style="display:block; font-size:14px; color:var(--bl-gray-900);">${p.title}</strong>
                    <span style="font-size:12px; color:var(--bl-gray-500);">별점 ★${p.rating} (${p.reviews}) · ${p.durationKey}</span>
                  </div>
                </div>
                <div style="display:flex; align-items:center; gap:10px;">
                  <strong style="font-size:16px; color:var(--bl-point-text);">${p.price}</strong>
                  <a href="https://www.boolub.com/?pn=product.view&pcode=${p.pcode}" target="_blank" rel="noopener" class="bl-btn bl-btn-point bl-btn-sm">
                    일정·예약 <i class="xi-external-link"></i>
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        ` : `
          <div style="padding:24px; border-radius:12px; background:var(--bl-gray-50); border:1px dashed var(--bl-gray-200); text-align:center;">
            <strong style="font-size:14.5px; color:var(--bl-gray-900);">몽골한국관광협회(MOKTA) 정회원 순차 상품 연동 중입니다</strong>
            <p style="font-size:12.5px; color:var(--bl-gray-500); margin:6px 0 14px;">1:1 지정 맞춤견적을 남겨주시면 ${ag.name} 전담 매니저의 코스·차량 실사 견적서를 받아보실 수 있습니다.</p>
            <button type="button" class="bl-btn bl-btn-point bl-btn-sm" onclick="closeModal('agencyHomeModal'); prefillRfqFromCourse('${ag.name} 지정 맞춤견적 요청')">
              1:1 지정 맞춤견적 신청하기
            </button>
          </div>
        `}
      </div>

      <!-- 탭 3: 진행중인 오픈조인 일정 -->
      <div class="bl-mh-pane ${initialTab === 'joins' ? 'active' : ''}" data-mh-pane="joins">
        ${partnerJoins.length ? `
          <div style="display:grid; gap:10px;">
            ${partnerJoins.map(j => {
              const rem = Math.max(0, j.max - j.filled);
              return `
                <div style="padding:12px 14px; border-radius:12px; border:1px solid var(--bl-gray-200); display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap;">
                  <div>
                    <div style="display:flex; align-items:center; gap:6px; margin-bottom:3px;">
                      <span class="bl-badge-solid ${j.statusCls}">${j.statusBadge}</span>
                      <span style="font-size:12px; font-weight:700; color:var(--bl-gray-700);">${j.dateStr}</span>
                    </div>
                    <strong style="font-size:14px; color:var(--bl-gray-900);">${j.title}</strong>
                    <div style="font-size:12px; color:var(--bl-gray-500); margin-top:2px;">현재 ${j.filled}/${j.max}명 확정 (잔여 ${rem}석) · 6인 마감가 ${j.fullPrice}</div>
                  </div>
                  <div style="display:flex; align-items:center; gap:10px;">
                    <strong style="font-size:15px; color:var(--bl-gray-900);">${j.curPrice}</strong>
                    <button type="button" class="bl-btn bl-btn-point bl-btn-sm" onclick="closeModal('agencyHomeModal'); openJoinDetailModal('${j.id}')">
                      합류하기
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        ` : `
          <div style="padding:24px; border-radius:12px; background:var(--bl-gray-50); border:1px dashed var(--bl-gray-200); text-align:center;">
            <strong style="font-size:14.5px; color:var(--bl-gray-900);">원하시는 출발일로 ${ag.name} 오픈조인·단독 문의를 남겨보세요!</strong>
            <p style="font-size:12.5px; color:var(--bl-gray-500); margin:6px 0 14px;">희망 출발일을 알려주시면 출발 예정 팀 합류 또는 신규 오픈조인 개설을 도와드립니다.</p>
            <button type="button" class="bl-btn bl-btn-soft bl-btn-sm" onclick="closeModal('agencyHomeModal'); openCompanionModalForDate()">
              희망 날짜로 동행·조인 개설 요청
            </button>
          </div>
        `}
      </div>
    `;
  }
  openModal('agencyHomeModal');
}

/* ================= 섹션 6: 부럽 실제 몽골 여행 매거진 (smart_bbs cityguide 연동 · waug.css .bl-mag-card 동일 규격) ================= */
function filterMagazine(cat, btnEl) {
  curMagFilter = cat;
  const row = document.getElementById('magazineChipRow') || btnEl?.parentElement;
  if (row) row.querySelectorAll('.bl-chip').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderMagazines();
}

function renderMagazines() {
  const grid = document.getElementById('magazineGrid');
  if (!grid) return;

  const list = MAGAZINE_ITEMS.filter(m => {
    if (curMagFilter !== 'all' && m.filterCat !== curMagFilter) return false;
    if (globalKeyword) {
      const hay = `${m.title} ${m.theme} ${m.filterCat}`.toLowerCase();
      if (!hay.includes(globalKeyword)) return false;
    }
    return true;
  });

  if (!list.length) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; padding:32px; text-align:center; background:var(--bl-gray-50); border-radius:12px; border:1px dashed var(--bl-gray-200);">
        <strong style="font-size:14.5px; color:var(--bl-gray-900);">해당 주제의 몽골 매거진을 불러오는 중입니다.</strong>
        <div style="margin-top:10px;">
          <button type="button" class="bl-btn bl-btn-outline bl-btn-sm" onclick="filterMagazine('all', document.querySelector('#magazineChipRow .bl-chip'))">몽골 매거진 전체보기</button>
        </div>
      </div>
    `;
    return;
  }

  const magLimit = (curMagFilter === 'all' && !globalKeyword) ? 4 : 8;

  grid.innerHTML = list.slice(0, magLimit).map(m => `
    <a href="${m.url}" target="_blank" rel="noopener" class="bl-mokta-mag-card">
      <div class="bl-mokta-mag-thumb">
        <img src="${m.img}" alt="${m.title}" loading="lazy" />
      </div>
      <div class="bl-mokta-mag-body">
        <div class="bl-mokta-mag-badges">
          <span class="bl-mokta-mag-city">${m.city || '몽골'}</span>
          <span class="bl-mokta-mag-theme">${m.theme || '추천일정'}</span>
        </div>
        <h4 class="bl-mokta-mag-title">${m.title}</h4>
        <div class="bl-mokta-mag-meta">
          <span>조회 ${Number(m.hit || 0).toLocaleString()}</span>
          <span>매거진 읽기 <i class="xi-angle-right-min"></i></span>
        </div>
      </div>
    </a>
  `).join('');
}

/* ================= 파트너사 전용 센터 (파트너·마스터 권한 전용 통합 CRM & 상품연동) ================= */
function switchPartnerTab(paneId, btnEl) {
  if (!canAccessPartnerConsole()) return;
  if (paneId === 'ptab-onboard' && AUTH_STATE.role !== 'master') {
    showToast('입점신청 승인 관리는 마스터 계정 전용 메뉴입니다.');
    return;
  }
  document.querySelectorAll('.bl-ptab-btn').forEach(b => {
    const bTab = b.getAttribute('data-ptab');
    b.classList.toggle('active', b === btnEl || bTab === paneId);
  });
  document.querySelectorAll('.bl-ptab-pane').forEach(p => p.classList.toggle('active', p.id === paneId));
}

function changeActivePartnerAccount(val) {
  if (AUTH_STATE.role !== 'master') {
    showToast('본인 파트너 계정으로만 이용 가능합니다.');
    return;
  }
  activePartnerName = val;
  loadPartnerMinihomeForm();
  refreshPartnerConsoleAll();
  showToast(`[MASTER] 대행·관리 대상 파트너가 [${val}]로 전환되었습니다.`);
}

/* ================= 파트너 브랜드 미니홈 커스터마이저 & 전용 홍보 딥링크 ================= */
function resolveTargetAgencyForConsole() {
  if (AUTH_STATE.role === 'partner' && AUTH_STATE.partnerId) {
    const byPid = MOKTA_AGENCIES.find(a => a.pid === AUTH_STATE.partnerId);
    if (byPid) return byPid;
  }
  const cleanLabel = String(activePartnerName || '').split('(')[0].trim();
  return MOKTA_AGENCIES.find(a => a.name.includes(cleanLabel) || cleanLabel.includes(a.name.split('(')[0].trim()))
    || MOKTA_AGENCIES[2]
    || MOKTA_AGENCIES[0];
}

function getPartnerDeepLinkUrl(pid) {
  const targetPid = pid || resolveTargetAgencyForConsole()?.pid || 'anoratour';
  if (AUTH_STATE.isLiveCms) {
    return `${window.location.origin}/?pn=pages.view&type=pages&data=mj&partner=${encodeURIComponent(targetPid)}`;
  }
  return `${window.location.origin}${window.location.pathname}?pn=pages.view&type=pages&data=mj&partner=${encodeURIComponent(targetPid)}`;
}

function copyPartnerMinihomeLink(customPid = '') {
  const ag = customPid
    ? (MOKTA_AGENCIES.find(a => a.pid === customPid || a.id === customPid) || resolveTargetAgencyForConsole())
    : resolveTargetAgencyForConsole();
  const url = getPartnerDeepLinkUrl(ag?.pid || 'anoratour');
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(() => {
      showToast(`[${ag ? ag.name : '파트너'}] 미니홈 직결 홍보 링크가 복사되었습니다! SNS·카톡에 붙여넣어 보세요.`);
    }).catch(() => {
      showToast('미니홈 주소: ' + url);
    });
  } else {
    showToast('미니홈 주소: ' + url);
  }
}

function parsePriceNumber(priceStr) {
  const n = parseInt(String(priceStr || '').replace(/[^0-9]/g, ''), 10);
  return Number.isFinite(n) ? n : 0;
}

function formatKrwString(num) {
  if (!num || num <= 0) return '890,000원';
  return `${Math.round(num).toLocaleString()}원`;
}

function getOwnProductsForAgency(ag) {
  if (!ag) return [];
  return DIRECT_PRODUCTS.filter(p => String(p.pid || '') === String(ag.pid));
}

function getPartnerJoinsForAgency(ag) {
  if (!ag) return [];
  const shortNm = ag.name.split('(')[0].trim();
  return JOIN_ITEMS.filter(j => {
    if (j.bbsUrl) return false;
    if (j.pid && j.pid === ag.pid) return true;
    return String(j.agency || '').includes(shortNm);
  });
}

function refreshPartnerConsoleAll() {
  const ag = resolveTargetAgencyForConsole();
  if (!ag) return;

  const urlCodeEl = document.getElementById('mhDirectUrlText');
  if (urlCodeEl) {
    urlCodeEl.textContent = `https://www.boolub.com/?pn=pages.view&type=pages&data=mj&partner=${ag.pid}`;
  }

  const ownProds = getOwnProductsForAgency(ag);
  const ownJoins = getPartnerJoinsForAgency(ag);
  const leads = AUTH_STATE.role === 'master'
    ? PARTNER_LEADS
    : PARTNER_LEADS.filter(l => !l.pid || l.pid === ag.pid);
  const matchableCompanions = JOIN_ITEMS.filter(j => Boolean(j.bbsUrl) || j.statusCls === 'amber' || j.hostType === 'member');

  const kpiLeads = document.getElementById('pkpiLeadsCnt');
  const kpiMatch = document.getElementById('pkpiMatchableCnt');
  const kpiRfq = document.getElementById('pkpiRfqCnt');
  const kpiProdJoin = document.getElementById('pkpiProdJoinCnt');
  const ptabLeadsCnt = document.getElementById('ptabLeadsCnt');

  if (kpiLeads) kpiLeads.textContent = `${leads.length}건`;
  if (ptabLeadsCnt) ptabLeadsCnt.textContent = String(leads.length);
  if (kpiMatch) kpiMatch.textContent = `${matchableCompanions.length}팀`;
  if (kpiRfq) kpiRfq.textContent = `${RFQ_ITEMS.length}건`;
  if (kpiProdJoin) kpiProdJoin.textContent = `${ownProds.length || ag.prodCount || 0}개 · ${ownJoins.length}팀`;

  populateOwnProductSelects(ag, ownProds);
  renderPartnerLeadAndMatchLists(ag, leads, matchableCompanions);
  renderPartnerSentQuotesList(ag);
  renderPartnerMyJoinsManageList(ag, ownJoins);
}

function populateOwnProductSelects(ag, ownProds) {
  const bidSel = document.getElementById('pOwnProductSelect');
  const joinSel = document.getElementById('pjOwnProductSelect');
  const optionsHtml = ownProds.length
    ? `<option value="">-- ${ag.name} 기등록 부럽 상품 선택 (${ownProds.length}개) --</option>` +
      ownProds.map(p => `<option value="${p.pcode}">[${p.durationKey} · ${p.price}] ${p.title}</option>`).join('')
    : `<option value="">등록된 부럽 판매상품이 없습니다 (직접 입력)</option>`;

  if (bidSel) bidSel.innerHTML = optionsHtml;
  if (joinSel) joinSel.innerHTML = optionsHtml;
}

function onSelectOwnProductForBid(pcode) {
  if (!pcode) return;
  const prod = DIRECT_PRODUCTS.find(p => p.pcode === pcode);
  if (!prod) return;
  selectedBidPcode = prod.pcode;

  const baseNum = parsePriceNumber(prod.price);
  const est6 = baseNum > 100000 ? Math.round((baseNum * 0.86) / 1000) * 1000 : baseNum;

  const setV = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
  setV('pKrw4', prod.price);
  setV('pKrw6', formatKrwString(est6));
  setV('pComment', `[부럽 정식 판매상품: ${prod.title}] 코스와 동일한 검증 숙소·전용 차량 조건으로 추가금 없이 모시겠습니다. 견적서에서 바로 부럽 안전결제가 가능합니다.`);
  if (prod.img) {
    selectedBidPhoto.veh = prod.img;
  }
  showToast(`[${prod.title}] 판매가·상품코드가 견적 양식에 자동 연동되었습니다!`);
}

function onSelectOwnProductForJoin(pcode) {
  if (!pcode) return;
  const prod = DIRECT_PRODUCTS.find(p => p.pcode === pcode);
  if (!prod) return;
  selectedJoinPcode = prod.pcode;

  const baseNum = parsePriceNumber(prod.price);
  const est6 = baseNum > 100000 ? Math.round((baseNum * 0.88) / 1000) * 1000 : baseNum;

  const setV = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
  if (prod.regionKey) setV('pjRegion', prod.regionKey);
  if (prod.durationKey) setV('pjDuration', prod.durationKey);
  setV('pjTitle', `[출발확정 오픈조인] ${prod.title} 잔여석 합류 모집`);
  setV('pjCurPrice', prod.price);
  setV('pjFullPrice', formatKrwString(est6));
  showToast(`[${prod.title}] 정보가 오픈조인 등록 폼에 자동 입력되었습니다!`);
}

function renderPartnerLeadAndMatchLists(ag, leads, matchableCompanions) {
  const leadBox = document.getElementById('partnerLeadList');
  const matchBox = document.getElementById('partnerMatchableCompanionList');

  if (leadBox) {
    if (!leads.length) {
      leadBox.innerHTML = `
        <div style="padding:24px 14px; text-align:center; background:#f8fafc; border-radius:12px; color:#64748b; font-size:13px;">
          현재 대기 중인 합류 신청 내역이 없습니다. 오픈조인 잔여석을 등록하면 신청 고객이 이곳에 실시간 접수됩니다.
        </div>
      `;
    } else {
      leadBox.innerHTML = leads.map(ld => `
        <div class="partner-crm-card">
          <div style="flex:1; min-width:220px;">
            <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-bottom:4px;">
              <span class="ts-confirm-pill ${ld.status === 'confirmed' ? '' : 'is-recruit'}">${ld.status === 'confirmed' ? '합류확정' : '신규접수'}</span>
              <strong style="font-size:14px; color:#0f172a;">${ld.applicantName} 고객님 (${ld.pax}명 신청)</strong>
              <span style="font-size:11.5px; color:#94a3b8;">· ${ld.rdate}</span>
            </div>
            <div style="font-size:12.5px; font-weight:700; color:#0284c7; margin-bottom:2px;">연락처/카톡: ${ld.contact}</div>
            <div style="font-size:12.5px; color:#334155;">희망 팀: ${ld.joinTitle}</div>
            ${ld.memo ? `<div style="font-size:12px; color:#64748b; margin-top:2px;">메모: ${ld.memo}</div>` : ''}
          </div>
          <div style="display:flex; gap:6px; flex-shrink:0;">
            ${ld.status === 'confirmed'
              ? `<button type="button" class="bl-btn bl-btn-outline bl-btn-sm" onclick="updateLeadStatus('${ld.id}', 'cancelled')">확정취소</button>`
              : `<button type="button" class="bl-btn bl-btn-point bl-btn-sm" onclick="updateLeadStatus('${ld.id}', 'confirmed')"><i class="xi-check"></i> 합류 확정</button>`}
          </div>
        </div>
      `).join('');
    }
  }

  if (matchBox) {
    if (!matchableCompanions.length) {
      matchBox.innerHTML = `<div style="padding:20px; text-align:center; color:#64748b;">매칭 대기 중인 동행팀이 없습니다.</div>`;
    } else {
      matchBox.innerHTML = matchableCompanions.slice(0, 6).map(c => {
        const alreadyMatched = String(c.agency || '').includes(ag.name.split('(')[0].trim());
        return `
          <div class="partner-crm-card">
            <div style="flex:1; min-width:210px;">
              <div style="display:flex; align-items:center; gap:6px; margin-bottom:3px;">
                <span class="ts-pill-sky">${c.dateStr}</span>
                <span class="ts-pill-gray">${c.regionKey} · 현재 ${c.filled}/${c.max}명</span>
              </div>
              <strong style="font-size:13.8px; color:#0f172a; display:block;">${c.title}</strong>
              <div style="font-size:12px; color:#64748b; margin-top:2px;">${c.agency} · ${c.tags}</div>
            </div>
            <div>
              ${alreadyMatched
                ? `<span class="ts-confirm-pill">제안완료</span>`
                : `<button type="button" class="bl-btn bl-btn-soft bl-btn-sm" onclick="proposePartnerToCompanion('${c.id}')">우리 투어·차량 제안</button>`}
            </div>
          </div>
        `;
      }).join('');
    }
  }
}

async function proposePartnerToCompanion(joinId) {
  if (!canAccessPartnerConsole()) return;
  const ag = resolveTargetAgencyForConsole();
  const target = JOIN_ITEMS.find(j => String(j.id) === String(joinId));
  if (!ag || !target) return;

  const ownProds = getOwnProductsForAgency(ag);
  const matchedProd = ownProds.find(p => p.regionKey === target.regionKey) || ownProds[0];
  const pcode = matchedProd ? matchedProd.pcode : (ag.repPcode || 'V6003-W0388-Z1928');
  const price = matchedProd ? matchedProd.price : '890,000원';

  if (API_BASE && !String(joinId).startsWith('bbs_')) {
    await moktaApiCall('ajax.mokta.join.pro.php', {
      _mode: 'propose_to_companion',
      join_id: joinId,
      target_pid: ag.pid,
      target_agency: ag.name,
      pcode,
      cur_price: price
    });
  }

  target.pid = ag.pid;
  target.pcode = pcode;
  target.curPrice = price;
  target.agency = `${ag.name.split('(')[0].trim()} 차량매칭 제안`;
  target.statusBadge = '파트너 차량제안 도착';

  renderJoinCalendar();
  renderJoinCards();
  refreshPartnerConsoleAll();
  showToast(`[${ag.name}] 전용 차량 및 부럽 투어(${price})가 해당 동행팀에 매칭 제안되었습니다!`);
}

function renderPartnerSentQuotesList(ag) {
  const box = document.getElementById('partnerMySentQuotesList');
  if (!box) return;
  const shortNm = ag.name.split('(')[0].trim();
  const sent = [];
  RFQ_ITEMS.forEach(r => {
    (r.quotes || []).forEach(q => {
      if (q.pid === ag.pid || String(q.agency || '').includes(shortNm)) {
        sent.push({ rfqId: r.id, rfqTitle: r.title, dates: r.dates, price4: q.price4, price6: q.price6 });
      }
    });
  });

  if (!sent.length) {
    box.innerHTML = `<div style="padding:18px; text-align:center; background:#fff; border-radius:10px; border:1px dashed #cbd5e1; font-size:12.5px; color:#64748b;">아직 발송한 견적이 없습니다. 좌측에서 자사 상품을 선택해 첫 견적을 발송해보세요!</div>`;
    return;
  }
  box.innerHTML = sent.map(s => `
    <div class="partner-crm-card">
      <div style="flex:1; min-width:180px;">
        <span style="font-size:11.5px; color:#0284c7; font-weight:700;">${s.dates}</span>
        <strong style="display:block; font-size:13.5px; color:#0f172a;">${s.rfqTitle}</strong>
        <span style="font-size:12px; color:#64748b;">4인 ${s.price4} / 6인 ${s.price6} 제안됨</span>
      </div>
      <button type="button" class="bl-btn bl-btn-outline bl-btn-sm" onclick="openQuoteCompareModal('${s.rfqId}')">견적 확인</button>
    </div>
  `).join('');
}

function renderPartnerMyJoinsManageList(ag, ownJoins) {
  const box = document.getElementById('partnerMyJoinsManageList');
  if (!box) return;

  if (!ownJoins.length) {
    box.innerHTML = `
      <div style="padding:24px 14px; text-align:center; background:#f8fafc; border-radius:12px; border:1px dashed #cbd5e1; color:#64748b; font-size:13px;">
        현재 ${ag.name} 명의로 등록된 오픈조인이 없습니다.<br/>좌측 폼에서 자사 상품을 선택해 첫 출발확정 오픈조인을 등록해보세요!
      </div>
    `;
    return;
  }

  box.innerHTML = ownJoins.map(j => {
    const isFull = j.filled >= j.max;
    return `
      <div class="partner-crm-card">
        <div style="flex:1; min-width:210px;">
          <div style="display:flex; align-items:center; gap:6px; margin-bottom:3px;">
            <span class="ts-pill-sky">${j.dateStr}</span>
            <span style="font-size:12px; font-weight:800; color:${isFull ? '#dc2626' : '#0284c7'};">${j.filled}/${j.max}명 (${j.subBadge})</span>
          </div>
          <strong style="font-size:13.8px; color:#0f172a; display:block;">${j.title}</strong>
          <div style="font-size:12px; color:#64748b; margin-top:2px;">현재가 ${j.curPrice} · 6인 마감가 ${j.fullPrice}</div>
        </div>
        <div style="display:flex; gap:5px; flex-wrap:wrap;">
          <button type="button" class="bl-btn bl-btn-outline bl-btn-sm" onclick="manageJoinSchedule('${j.id}', 'dec_pax')">-1</button>
          <button type="button" class="bl-btn bl-btn-outline bl-btn-sm" onclick="manageJoinSchedule('${j.id}', 'inc_pax')">+1</button>
          <button type="button" class="bl-btn bl-btn-soft bl-btn-sm" onclick="manageJoinSchedule('${j.id}', '${isFull ? 'reopen' : 'close_full'}')">${isFull ? '재오픈' : '마감'}</button>
          <button type="button" class="bl-btn bl-btn-outline bl-btn-sm" onclick="copyJoinDeepLink('${j.id}')" title="모집 링크 복사"><i class="xi-link"></i></button>
          <button type="button" class="bl-btn bl-btn-outline bl-btn-sm" style="color:#dc2626;" onclick="manageJoinSchedule('${j.id}', 'delete')">삭제</button>
        </div>
      </div>
    `;
  }).join('');
}

function loadPartnerMinihomeForm() {
  const ag = resolveTargetAgencyForConsole();
  if (!ag) return;
  const lbl = document.getElementById('mhTargetPartnerLabel');
  if (lbl) lbl.textContent = `편집 대상: ${ag.name} (${ag.pid})`;

  const urlCodeEl = document.getElementById('mhDirectUrlText');
  if (urlCodeEl) {
    urlCodeEl.textContent = `https://www.boolub.com/?pn=pages.view&type=pages&data=mj&partner=${ag.pid}`;
  }

  const setVal = (id, v) => {
    const el = document.getElementById(id);
    if (el) el.value = v || '';
  };
  setVal('mhSlogan', ag.slogan || '');
  setVal('mhSpecBadge', ag.spec || '');
  setVal('mhFleet', ag.fleet || '');
  setVal('mhCamp', ag.camp || '');
  setVal('mhCareer', ag.career || '');
  setVal('mhDesc', ag.desc || '');
  setVal('mhVideoUrl', ag.videoUrl || '');
  setVal('mhCustomPerk', '');

  mhSelectedCover = ag.cover || './images/milkyway_gobi.jpg';
  mhUploadedCoverFile = null;
  mhUploadedGalleryFiles = [];

  const curPerks = Array.isArray(ag.perks) ? ag.perks : [];
  document.querySelectorAll('#mhPerkPicker .bl-perk-chip-btn').forEach(btn => {
    const pk = btn.getAttribute('data-perk');
    btn.classList.toggle('selected', curPerks.includes(pk));
  });
}

function toggleMinihomePerk(btnEl) {
  if (!btnEl) return;
  const selectedCnt = document.querySelectorAll('#mhPerkPicker .bl-perk-chip-btn.selected').length;
  if (!btnEl.classList.contains('selected') && selectedCnt >= 5) {
    showToast('핵심 특장점 배지는 최대 5개까지 선택할 수 있습니다.');
    return;
  }
  btnEl.classList.toggle('selected');
}

function selectMinihomeCoverPreset(el) {
  document.querySelectorAll('#mhCoverPresetPicker .bl-photo-pick').forEach(x => x.classList.remove('selected'));
  el.classList.add('selected');
  mhUploadedCoverFile = null;
  const raw = el.getAttribute('data-cover') || './images/milkyway_gobi.jpg';
  const assetPrefix = (typeof window !== 'undefined' && window.BOOLUB_MOKTA_ASSET_BASE)
    ? window.BOOLUB_MOKTA_ASSET_BASE.replace(/\/$/, '')
    : '.';
  mhSelectedCover = raw.startsWith('./') ? assetPrefix + raw.slice(1) : raw;
}

function handleMinihomeCoverUpload(e) {
  const file = e.target?.files?.[0];
  if (!file) return;
  mhUploadedCoverFile = file;
  const reader = new FileReader();
  reader.onload = ev => {
    if (ev.target?.result) {
      mhSelectedCover = String(ev.target.result);
      showToast('대표 커버 사진이 준비되었습니다.');
    }
  };
  reader.readAsDataURL(file);
}

function handleMinihomeGalleryUpload(e) {
  const files = Array.from(e.target?.files || []).slice(0, 3);
  if (!files.length) return;
  mhUploadedGalleryFiles = files;
  const ag = resolveTargetAgencyForConsole();
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = ev => {
      if (ev.target?.result && ag) {
        ag.photos = [String(ev.target.result), ...(ag.photos || [])].slice(0, 6);
      }
    };
    reader.readAsDataURL(file);
  });
  showToast(`현장 실사 사진 ${files.length}장이 미니홈 갤러리에 추가되었습니다.`);
}

function collectMinihomeFormPayload() {
  const ag = resolveTargetAgencyForConsole();
  const perks = Array.from(document.querySelectorAll('#mhPerkPicker .bl-perk-chip-btn.selected'))
    .map(b => b.getAttribute('data-perk'))
    .filter(Boolean);
  const customPerk = (document.getElementById('mhCustomPerk')?.value || '').trim();
  if (customPerk) {
    customPerk.split(',').map(s => s.trim()).filter(Boolean).forEach(cp => {
      if (!perks.includes(cp)) perks.unshift(cp);
    });
  }
  return {
    ag,
    slogan: (document.getElementById('mhSlogan')?.value || '').trim() || ag.slogan,
    specBadge: (document.getElementById('mhSpecBadge')?.value || '').trim() || ag.spec,
    fleet: (document.getElementById('mhFleet')?.value || '').trim() || ag.fleet,
    camp: (document.getElementById('mhCamp')?.value || '').trim() || ag.camp,
    career: (document.getElementById('mhCareer')?.value || '').trim() || ag.career,
    desc: (document.getElementById('mhDesc')?.value || '').trim() || ag.desc,
    videoUrl: (document.getElementById('mhVideoUrl')?.value || '').trim(),
    perks: perks.slice(0, 5),
    coverImg: mhSelectedCover || ag.cover
  };
}

function applyProfileToAgencyObj(ag, prof) {
  if (!ag || !prof) return;
  if (prof.slogan) ag.slogan = prof.slogan;
  if (prof.specBadge) ag.spec = prof.specBadge;
  if (prof.fleet) ag.fleet = prof.fleet;
  if (prof.camp) ag.camp = prof.camp;
  if (prof.career) ag.career = prof.career;
  if (prof.desc) ag.desc = prof.desc;
  if (prof.videoUrl !== undefined) ag.videoUrl = prof.videoUrl;
  if (Array.isArray(prof.perks) && prof.perks.length) ag.perks = prof.perks;
  if (prof.coverImg) ag.cover = prof.coverImg;
  if (Array.isArray(prof.photos) && prof.photos.length) ag.photos = prof.photos;
}

function previewMyMinihome() {
  if (!canAccessPartnerConsole()) return;
  const form = collectMinihomeFormPayload();
  applyProfileToAgencyObj(form.ag, form);
  renderPartnerSection();
  openAgencyHomeModal(form.ag.id, 'about');
  showToast(`[${form.ag.name}] 브랜드 미니홈 고객 화면 미리보기입니다.`);
}

async function savePartnerMinihome() {
  if (!canAccessPartnerConsole()) {
    openModal('partnerApplyModal');
    return;
  }
  const form = collectMinihomeFormPayload();
  const ag = form.ag;

  if (API_BASE) {
    const fd = new FormData();
    fd.append('target_pid', ag.pid);
    fd.append('target_name', ag.name);
    fd.append('slogan', form.slogan);
    fd.append('spec_badge', form.specBadge);
    fd.append('fleet', form.fleet);
    fd.append('camp', form.camp);
    fd.append('career', form.career);
    fd.append('desc', form.desc);
    fd.append('video_url', form.videoUrl);
    fd.append('perks_json', JSON.stringify(form.perks));
    fd.append('cover_img', form.coverImg.startsWith('data:') ? '' : form.coverImg);
    fd.append('photos_json', JSON.stringify((ag.photos || []).filter(p => !String(p).startsWith('data:'))));
    if (mhUploadedCoverFile) fd.append('cover_file', mhUploadedCoverFile);
    mhUploadedGalleryFiles.slice(0, 3).forEach((f, idx) => fd.append(`gallery_file_${idx + 1}`, f));

    const res = await moktaApiCall('ajax.mokta.profile.pro.php', fd, true);
    if (res && !res.ok) {
      showToast(res.message || '브랜드 미니홈 저장 중 오류가 발생했습니다.');
      return;
    }
    if (res && res.coverImg) form.coverImg = res.coverImg;
    if (res && Array.isArray(res.photos) && res.photos.length) form.photos = res.photos;
  }

  applyProfileToAgencyObj(ag, form);
  renderPartnerSection();
  switchSiteRole('customer');
  scrollToSection('sec-partners');
  setTimeout(() => openAgencyHomeModal(ag.id, 'about'), 380);
  showToast(`[${ag.name}] 브랜드 미니홈 커스터마이징이 저장되어 즉시 반영되었습니다!`);
}

function toggleMongolianMode() {
  document.body.classList.toggle('show-mn');
  const on = document.body.classList.contains('show-mn');
  const btn = document.getElementById('mnToggleBtn');
  if (btn) {
    btn.innerHTML = on
      ? '<i class="xi-globus"></i> 한국어 단독 표시'
      : '<i class="xi-globus"></i> 한·몽 병기 켜기';
  }
}

function togglePartnerMobile() {
  const wrap = document.getElementById('partnerWorkspace');
  if (!wrap) return;
  wrap.classList.toggle('mobile-sim');
  const on = wrap.classList.contains('mobile-sim');
  const btn = document.getElementById('mobSimBtn');
  if (btn) btn.innerHTML = on ? '<i class="xi-desktop"></i> PC 와이드 화면으로 복귀' : '<i class="xi-mobile"></i> 모바일 화면 미리보기';
}

function populatePartnerRfqSelect() {
  const sel = document.getElementById('pTargetRfq');
  if (!sel) return;
  sel.innerHTML = RFQ_ITEMS.map(r => `<option value="${r.id}">[${r.dates}] ${r.title} (현재 견적 ${r.quotes.length}건)</option>`).join('');
}

function loadPartnerPreset(type) {
  const presets = {
    gobi: {
      krw4: '1,066,720원',
      krw6: '880,000원',
      veh: '신형 스타렉스 4WD (또는 감성 푸르공 선택)',
      ger: '남고비 전 일정 온수 샤워 가능 정식 캠프',
      msg: '부럽 공식 등록 고비사막 4박5일 시그니처 상품 조건 그대로 공항 무료픽업 및 추가금 0원으로 모시겠습니다.'
    },
    khuvsgul: {
      krw4: '1,380,000원',
      krw6: '1,180,000원',
      veh: '북부 장거리 특화 전용 벤 단독 운행',
      ger: '홉스골 호수 1열 레이크뷰 게르 리조트',
      msg: '부모님·가족 동반 고객님께 최적화된 여유로운 홉스골 보트 유람 및 특식 포함 맞춤 견적입니다.'
    },
    terelj: {
      krw4: '720,000원',
      krw6: '620,000원',
      veh: '쾌적 단독 스타렉스 배정',
      ger: '미니사막 + 쳉헤르 노천온천 리조트 숙박',
      msg: '짧은 연차로 사막 낙타체험과 별밤 노천온천을 모두 즐기실 수 있는 베스트 3박4일 견적입니다.'
    }
  };
  const p = presets[type] || presets.gobi;
  document.getElementById('pKrw4').value = p.krw4;
  document.getElementById('pKrw6').value = p.krw6;
  document.getElementById('pVehName').value = p.veh;
  document.getElementById('pGerName').value = p.ger;
  document.getElementById('pComment').value = p.msg;
  showToast('내 부럽 기등록 상품 템플릿이 자동 입력되었습니다.');
}

function selectBidPhotoPair(el) {
  document.querySelectorAll('#bidPhotoPicker .bl-photo-pick').forEach(x => x.classList.remove('selected'));
  el.classList.add('selected');
  selectedBidPhoto = {
    veh: el.getAttribute('data-veh') || './images/vehicle_fleet.jpg',
    ger: el.getAttribute('data-ger') || './images/ger_interior.jpg'
  };
}

function resolvePartnerMetaByName(partnerLabel) {
  const assetPrefix = (typeof window !== 'undefined' && window.BOOLUB_MOKTA_ASSET_BASE)
    ? window.BOOLUB_MOKTA_ASSET_BASE.replace(/\/$/, '')
    : '.';
  const ag = resolveTargetAgencyForConsole();
  if (ag) {
    return {
      logo: ag.logoImg || `${assetPrefix}/images/mokta_logo.png`,
      pid: ag.pid,
      pcode: ag.repPcode || 'V6003-W0388-Z1928'
    };
  }
  const logoMap = {
    '부럽 몽골원정대': { logo: `${assetPrefix}/images/mokta_logo.png`, pid: 'boolub', pcode: 'T0950-Q2923-W2496' },
    '노라투어': { logo: `${assetPrefix}/images/partners/anoratour.png`, pid: 'anoratour', pcode: 'V6003-W0388-Z1928' },
    'BBM': { logo: `${assetPrefix}/images/partners/bbm0707.jpeg`, pid: 'bbm0707', pcode: 'A7468-J1235-Q7992' },
    '하닥투어': { logo: `${assetPrefix}/images/partners/khadag.png`, pid: 'khadag', pcode: 'H7863-P9594-D9241' },
    '스카이': { logo: `${assetPrefix}/images/partners/SKYTOURS.jpg`, pid: 'SKYTOURS', pcode: 'J8833-W9230-L2860' },
    '밝은 미래': { logo: `${assetPrefix}/images/partners/Bftour.png`, pid: 'Bftour', pcode: 'E0711-V0341-Z7774' },
    '양가투어': { logo: `${assetPrefix}/images/partners/YangGaTour.png`, pid: 'YangGaTour', pcode: 'E4890-B3318-G7233' },
    '더블유아이티': { logo: `${assetPrefix}/images/partners/wit77777.png`, pid: 'wit77777', pcode: 'I3885-I4036-S5377' }
  };
  const matchedKey = Object.keys(logoMap).find(k => partnerLabel.includes(k));
  return matchedKey
    ? logoMap[matchedKey]
    : { logo: `${assetPrefix}/images/mokta_logo.png`, pid: AUTH_STATE.partnerId || 'doittavel', pcode: 'G8231-V9289-H9933' };
}

async function sendPartnerQuoteLive() {
  if (!canAccessPartnerConsole()) {
    openModal('partnerApplyModal');
    return;
  }
  const rfqId = document.getElementById('pTargetRfq')?.value;
  const target = RFQ_ITEMS.find(x => String(x.id) === String(rfqId)) || RFQ_ITEMS[0];
  if (!target) return;

  if (target.quotes.length >= 6) {
    showToast('해당 고객 요청글은 최대 6개 파트너사 견적이 마감되었습니다.');
    return;
  }

  const meta = resolvePartnerMetaByName(activePartnerName);
  const chosenPcode = selectedBidPcode || document.getElementById('pOwnProductSelect')?.value || meta.pcode;
  const price4 = document.getElementById('pKrw4')?.value || '1,060,000원';
  const price6 = document.getElementById('pKrw6')?.value || '840,000원';
  const veh = document.getElementById('pVehName')?.value || '신형 스타렉스 4WD';
  const ger = document.getElementById('pGerName')?.value || '온수 샤워 정식 캠프';
  const comment = document.getElementById('pComment')?.value || '정성껏 모시겠습니다.';

  if (API_BASE) {
    const res = await moktaApiCall('ajax.mokta.bid.pro.php', {
      _mode: 'add',
      rfq_id: target.id,
      target_pid: meta.pid,
      target_agency: activePartnerName,
      pcode: chosenPcode,
      price4,
      price6,
      veh_name: veh,
      ger_name: ger,
      veh_img: selectedBidPhoto.veh,
      ger_img: selectedBidPhoto.ger,
      comment
    });
    if (res && !res.ok) {
      showToast(res.message || '견적 발송 중 권한 또는 서버 오류가 발생했습니다.');
      return;
    }
  }

  target.quotes.unshift({
    agency: activePartnerName,
    pid: meta.pid,
    pcode: chosenPcode,
    logo: meta.logo,
    badge: '방금 도착한 파트너 실사견적',
    price4,
    price6,
    veh,
    ger,
    vehImg: selectedBidPhoto.veh,
    gerImg: selectedBidPhoto.ger,
    comment
  });

  renderRfqBoard();
  populatePartnerRfqSelect();
  refreshPartnerConsoleAll();
  switchSiteRole('customer');
  scrollToSection('sec-rfq');
  setTimeout(() => openQuoteCompareModal(target.id), 450);
  showToast(`[${activePartnerName}] 실사 견적서가 DB에 저장되어 고객에게 발송되었습니다!`);
}

async function registerPartnerOpenJoin() {
  if (!canAccessPartnerConsole()) {
    openModal('partnerApplyModal');
    return;
  }
  const sdate = document.getElementById('pjStartDate')?.value || '2026-08-15';
  const regionKey = document.getElementById('pjRegion')?.value || '고비';
  const durationKey = document.getElementById('pjDuration')?.value || '4박5일';
  const dateStr = formatKoreanDateRange(sdate, durationKey);
  const filled = parseInt(document.getElementById('pjSeats')?.value || '4', 10);
  const title = (document.getElementById('pjTitle')?.value || '').trim() || '[출발확정] 고비사막 4박5일 오픈조인 잔여석 모집';
  const curPrice = document.getElementById('pjCurPrice')?.value || '890,000원';
  const fullPrice = document.getElementById('pjFullPrice')?.value || '780,000원';
  const meta = resolvePartnerMetaByName(activePartnerName);
  const chosenPcode = selectedJoinPcode || document.getElementById('pjOwnProductSelect')?.value || meta.pcode;
  const linkedProd = DIRECT_PRODUCTS.find(p => p.pcode === chosenPcode);

  let newJoinId = 'pj_' + Date.now();
  if (API_BASE) {
    const res = await moktaApiCall('ajax.mokta.join.pro.php', {
      _mode: 'add_partner_join',
      target_pid: meta.pid,
      target_agency: activePartnerName,
      pcode: chosenPcode,
      sdate,
      region_key: regionKey,
      duration_key: durationKey,
      date_str: dateStr,
      cur_pax: filled,
      max_pax: 6,
      title,
      cur_price: curPrice,
      full_price: fullPrice
    });
    if (res && !res.ok) {
      showToast(res.message || '오픈조인 등록 실패');
      return;
    }
    if (res && res.id) newJoinId = res.id;
  }

  const seats = Array.from({ length: 6 }, (_, i) => (i < filled ? `확정고객${i + 1}` : '빈좌석'));
  const assetPrefix = (typeof window !== 'undefined' && window.BOOLUB_MOKTA_ASSET_BASE)
    ? window.BOOLUB_MOKTA_ASSET_BASE.replace(/\/$/, '')
    : '.';

  JOIN_ITEMS.unshift({
    id: newJoinId,
    hostType: 'partner',
    pid: meta.pid,
    dateKey: sdate,
    dateStr,
    regionKey,
    durationKey,
    styleKey: '조인',
    statusBadge: '파트너 출발확정',
    statusCls: 'sky',
    subBadge: `${6 - filled}자리 남음!`,
    subCls: 'coral',
    agency: activePartnerName,
    pcode: chosenPcode,
    title,
    img: linkedProd?.img || `${assetPrefix}/images/gobi_camp_vans.jpg`,
    filled,
    max: 6,
    seats,
    curPrice,
    fullPrice,
    tags: '출발 100% 확정 차량 · 1/N 각자 카드결제 · 차액 자동환급'
  });

  const [yy, mm] = sdate.split('-').map(Number);
  if (yy && mm) {
    curCalYear = yy;
    curCalMonth = mm;
  }
  curJoinDate = sdate;
  renderJoinCalendar();
  renderJoinCards();
  refreshPartnerConsoleAll();
  showToast(`[${activePartnerName}] 출발확정 오픈조인 잔여석이 캘린더 및 우측 관리함에 등록되었습니다!`);
}

function selectShowcasePreset(el) {
  document.querySelectorAll('#showcasePresetPicker .bl-photo-pick').forEach(x => x.classList.remove('selected'));
  el.classList.add('selected');
  uploadedShowcaseFile = null;
  selectedShowcaseImg = el.getAttribute('data-img') || './images/khorkhog_feast.jpg';
}

function handleLocalPhotoUpload(e) {
  const file = e.target?.files?.[0];
  if (!file) return;
  uploadedShowcaseFile = file;
  const reader = new FileReader();
  reader.onload = ev => {
    if (ev.target?.result) {
      selectedShowcaseImg = String(ev.target.result);
      showToast('내 기기의 현장 사진이 첨부되었습니다.');
    }
  };
  reader.readAsDataURL(file);
}

async function publishPartnerShowcase() {
  if (!canAccessPartnerConsole()) {
    openModal('partnerApplyModal');
    return;
  }
  const title = document.getElementById('pShowTitle')?.value || '오늘 캠프 현장 사진 공유합니다!';
  const cat = document.getElementById('pShowCat')?.value || '음식·불멍파티';
  const prodName = document.getElementById('pShowProd')?.value || '[몽골] 고비사막 시그니처 코스 4박5일';
  const meta = resolvePartnerMetaByName(activePartnerName);

  let finalImgUrl = selectedShowcaseImg;
  let newStoryId = 's_' + Date.now();

  if (API_BASE) {
    const fd = new FormData();
    fd.append('_mode', 'add');
    fd.append('target_pid', meta.pid);
    fd.append('target_agency', activePartnerName);
    fd.append('pcode', meta.pcode);
    fd.append('prod_name', prodName);
    fd.append('cat', cat);
    fd.append('title', title);
    fd.append('preset_img', selectedShowcaseImg.startsWith('data:') ? '' : selectedShowcaseImg);
    if (uploadedShowcaseFile) fd.append('photo_file', uploadedShowcaseFile);

    const res = await moktaApiCall('ajax.mokta.story.pro.php', fd, true);
    if (res && !res.ok) {
      showToast(res.message || '현장 스토리 등록에 실패했습니다.');
      return;
    }
    if (res && res.mediaUrl) finalImgUrl = res.mediaUrl;
    if (res && res.id) newStoryId = res.id;
  }

  SHOWCASE_ITEMS.unshift({
    id: newStoryId,
    cat,
    agency: activePartnerName,
    pcode: meta.pcode,
    prodName,
    price: '쿠폰특가 적용',
    badge: '방금 올라온 LIVE',
    title,
    img: finalImgUrl,
    tip: `${activePartnerName} 현지 매니저가 방금 직접 촬영해 업로드한 최신 현장 컨디션입니다.`
  });

  curShowcaseFilter = 'all';
  renderShowcase();
  switchSiteRole('customer');
  scrollToSection('sec-showcase');
  showToast('현장 LIVE 스토리가 게시되어 판매 상품과 자동 연결되었습니다!');
}

/* ================= 비로그인/일반고객 화면: 파트너 입점신청 모달 & 마스터 승인 관리 ================= */
async function submitPartnerApplyModal() {
  const company = (document.getElementById('paCompany')?.value || '').trim();
  const moktaYn = document.getElementById('paMoktaYn')?.value || 'Y';
  const contact = (document.getElementById('paContact')?.value || '').trim();
  const memberId = (document.getElementById('paMemberId')?.value || '').trim();
  const desc = (document.getElementById('paDesc')?.value || '').trim();

  if (!company || !contact) {
    showToast('여행사명과 담당자 연락처(또는 카톡ID)를 입력해 주세요.');
    return;
  }

  let newObId = 'ob_' + Date.now();
  if (API_BASE) {
    const res = await moktaApiCall('ajax.mokta.onboard.pro.php', {
      _mode: 'apply',
      company,
      mokta_yn: moktaYn,
      contact,
      member_id: memberId,
      desc
    });
    if (res && !res.ok) {
      showToast(res.message || '입점 신청 접수 중 오류가 발생했습니다.');
      return;
    }
    if (res && res.id) newObId = res.id;
  }

  ONBOARD_ITEMS.unshift({
    id: newObId,
    company,
    moktaYn,
    contact,
    memberId: memberId || '-',
    desc: desc || '상세 소개 추후 제출',
    status: 'pending',
    rdate: '방금 전 접수'
  });

  const onboardCnt = document.getElementById('ptabOnboardCnt');
  if (onboardCnt) onboardCnt.textContent = String(ONBOARD_ITEMS.filter(x => x.status === 'pending').length);
  if (AUTH_STATE.role === 'master') renderMasterOnboardList();

  document.getElementById('paCompany').value = '';
  document.getElementById('paContact').value = '';
  document.getElementById('paMemberId').value = '';
  document.getElementById('paDesc').value = '';

  closeModal('partnerApplyModal');
  showToast(`[${company}] 파트너 입점 심사 신청이 접수되었습니다! 마스터 관리자 확인 후 파트너사 센터 권한이 부여됩니다.`);
}

function renderMasterOnboardList() {
  const box = document.getElementById('masterOnboardList');
  if (!box) return;
  if (!ONBOARD_ITEMS.length) {
    box.innerHTML = `<div style="padding:20px; text-align:center; color:var(--bl-gray-500);">접수된 신규 입점 신청 내역이 없습니다.</div>`;
    return;
  }
  box.innerHTML = ONBOARD_ITEMS.map(ob => `
    <div class="bl-onboard-item">
      <div style="flex:1; min-width:240px;">
        <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-bottom:4px;">
          <span class="bl-mokta-tag">${ob.moktaYn === 'Y' ? 'MOKTA 정회원' : '일반 전문여행사'}</span>
          <strong style="font-size:15px; color:var(--bl-gray-900);">${ob.company}</strong>
          <span style="font-size:12px; color:var(--bl-gray-400);">· ${ob.rdate}</span>
        </div>
        <div style="font-size:12.5px; color:var(--bl-gray-700);">연락처: <strong>${ob.contact}</strong> · 연동 희망 아이디: <strong>${ob.memberId}</strong></div>
        <div style="font-size:12.5px; color:var(--bl-gray-500); margin-top:3px;">${ob.desc}</div>
      </div>
      <div>
        ${ob.status === 'approved'
          ? `<span class="bl-locked-partner-pill"><i class="xi-check"></i> 입점 및 권한 승인완료</span>`
          : `<button type="button" class="bl-btn bl-btn-point bl-btn-sm" onclick="approvePartnerOnboard('${ob.id}')"><i class="xi-check"></i> 파트너 승인·권한부여</button>`}
      </div>
    </div>
  `).join('');
}

async function approvePartnerOnboard(obId) {
  if (AUTH_STATE.role !== 'master') return;
  if (API_BASE) {
    const res = await moktaApiCall('ajax.mokta.onboard.pro.php', { _mode: 'approve', ob_id: obId });
    if (res && !res.ok) {
      showToast(res.message || '승인 처리 중 오류가 발생했습니다.');
      return;
    }
  }
  const target = ONBOARD_ITEMS.find(x => String(x.id) === String(obId));
  if (target) {
    target.status = 'approved';
    showToast(`[${target.company}] 파트너 입점 승인 및 파트너사 센터 접근 권한 부여가 완료되었습니다.`);
  }
  const onboardCnt = document.getElementById('ptabOnboardCnt');
  if (onboardCnt) onboardCnt.textContent = String(ONBOARD_ITEMS.filter(x => x.status === 'pending').length);
  renderMasterOnboardList();
}

/* ================= 가로 슬라이더 마우스 드래그 및 호버 제어 ================= */
function bindPartnerSliderEvents() {
  const track = document.getElementById('agencyCardsGrid');
  const viewport = document.getElementById('partnerSliderViewport');
  if (!track || !viewport) return;

  track.addEventListener('scroll', updatePartnerProgress, { passive: true });

  viewport.addEventListener('mouseenter', () => { clearInterval(partnerAutoTimer); });
  viewport.addEventListener('mouseleave', () => { if (isPartnerAutoPlaying) startPartnerAutoSlide(); });

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  track.addEventListener('mousedown', e => {
    isDown = true;
    track.classList.add('dragging');
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });
  window.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    track.classList.remove('dragging');
  });
  track.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    track.scrollLeft = scrollLeft - (x - startX) * 1.3;
  });
}

/* ================= URL 딥링크 (?partner=... / ?join=... / ?mode=...) 자동 실행 ================= */
let deepLinkHandled = false;
function handleInitialDeepLinks() {
  if (deepLinkHandled) return;
  try {
    const params = new URLSearchParams(window.location.search || '');
    const pMode = params.get('mode');
    const pPartner = params.get('partner');
    const pJoin = params.get('join');

    if (pMode && ['home', 'join', 'store', 'partner'].includes(pMode)) {
      switchCustomerMode(pMode);
    }
    if (pPartner) {
      const foundAg = MOKTA_AGENCIES.find(a => a.pid.toLowerCase() === pPartner.toLowerCase() || a.id === pPartner);
      if (foundAg) {
        deepLinkHandled = true;
        openAgencyHomeModal(foundAg.id, 'about');
      }
    } else if (pJoin) {
      const foundJ = JOIN_ITEMS.find(j => String(j.id) === String(pJoin));
      if (foundJ) {
        deepLinkHandled = true;
        openJoinDetailModal(foundJ.id);
      }
    }
  } catch (_) {}
}

/* ================= 백엔드 DB 초기 데이터 하이드레이션 & 초기 구동 ================= */
function applyExternalAssetBase(obj, base) {
  if (!obj || typeof obj !== 'object') return;
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      if (typeof obj[i] === 'string' && obj[i].startsWith('./images/')) {
        obj[i] = base + obj[i].slice(1);
      } else if (typeof obj[i] === 'object') {
        applyExternalAssetBase(obj[i], base);
      }
    }
    return;
  }
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    if (typeof v === 'string' && v.startsWith('./images/')) {
      obj[k] = base + v.slice(1);
    } else if (typeof v === 'object') {
      applyExternalAssetBase(v, base);
    }
  }
}

async function hydrateFromLiveBackend() {
  if (!API_BASE) return;
  try {
    const res = await fetch(`${API_BASE}/ajax.mokta.init.php`, { credentials: 'same-origin' });
    const data = await res.json();
    if (!data || !data.ok) return;

    if (data.auth) {
      AUTH_STATE = Object.assign(AUTH_STATE, data.auth, { isLiveCms: true });
    }
    if (Array.isArray(data.products) && data.products.length) {
      DIRECT_PRODUCTS.splice(0, DIRECT_PRODUCTS.length, ...data.products);
    }
    if (Array.isArray(data.partners) && data.partners.length) {
      MOKTA_AGENCIES.splice(0, MOKTA_AGENCIES.length, ...data.partners);
    } else if (data.partnerProfiles && typeof data.partnerProfiles === 'object') {
      Object.values(data.partnerProfiles).forEach(prof => {
        if (!prof || !prof.pid) return;
        const targetAg = MOKTA_AGENCIES.find(a => a.pid === prof.pid);
        if (targetAg) applyProfileToAgencyObj(targetAg, prof);
      });
    }
    if (Array.isArray(data.magazines) && data.magazines.length) {
      MAGAZINE_ITEMS.splice(0, MAGAZINE_ITEMS.length, ...data.magazines);
    }
    if (Array.isArray(data.rfqs) && data.rfqs.length) {
      data.rfqs.forEach(r => {
        if (Array.isArray(r.quotes)) {
          r.quotes.forEach(q => {
            if (q.logo && q.logo.includes('boolub_logo.png')) {
              q.logo = q.logo.replace('boolub_logo.png', 'mokta_logo.png');
            }
          });
        }
      });
      const existingTitles = new Set(data.rfqs.map(x => x.title));
      const mergedRfqs = [...data.rfqs, ...RFQ_ITEMS.filter(x => !existingTitles.has(x.title))];
      RFQ_ITEMS.splice(0, RFQ_ITEMS.length, ...mergedRfqs);
    }
    if (Array.isArray(data.joins) && data.joins.length) {
      const existingJoinIds = new Set(data.joins.map(x => String(x.id)));
      const existingJoinTitles = new Set(data.joins.map(x => x.title));
      const mergedJoins = [
        ...data.joins,
        ...JOIN_ITEMS.filter(x => !existingJoinIds.has(String(x.id)) && !existingJoinTitles.has(x.title))
      ];
      JOIN_ITEMS.splice(0, JOIN_ITEMS.length, ...mergedJoins);
    }
    if (Array.isArray(data.stories) && data.stories.length) {
      const existingStoryIds = new Set(data.stories.map(x => String(x.id)));
      const existingStoryTitles = new Set(data.stories.map(x => x.title));
      const mergedStories = [
        ...data.stories,
        ...SHOWCASE_ITEMS.filter(x => !existingStoryIds.has(String(x.id)) && !existingStoryTitles.has(x.title))
      ];
      SHOWCASE_ITEMS.splice(0, SHOWCASE_ITEMS.length, ...mergedStories);
    }
    if (Array.isArray(data.onboardList)) {
      ONBOARD_ITEMS = data.onboardList;
    }
    if (Array.isArray(data.myApplies)) {
      MY_APPLIES = data.myApplies;
    }
    if (Array.isArray(data.receivedApplies)) {
      RECEIVED_APPLIES = data.receivedApplies;
    }
    if (Array.isArray(data.partnerLeads)) {
      PARTNER_LEADS = data.partnerLeads;
    }

    applyAuthUi();
    renderCommunityFeed();
    renderJoinCalendar();
    renderOpenGroupCards();
    renderStoreProducts();
    renderPartnerSection();
    renderShowcase();
    renderMagazines();
    renderRfqBoard();
    populatePartnerRfqSelect();
    refreshPartnerConsoleAll();
    restorePendingDraftIfLogged();
    handleInitialDeepLinks();
    if (curOpenMinihomeAgId && document.getElementById('agencyHomeModal')?.classList.contains('open')) {
      openAgencyHomeModal(curOpenMinihomeAgId, 'about');
    }
  } catch (err) {
    console.warn('[MOKTA Init Fallback]', err);
    handleInitialDeepLinks();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof window !== 'undefined' && window.BOOLUB_MOKTA_ASSET_BASE) {
    const base = window.BOOLUB_MOKTA_ASSET_BASE.replace(/\/$/, '');
    [HERO_SLIDES, DIRECT_PRODUCTS, MOKTA_AGENCIES, JOIN_ITEMS, RFQ_ITEMS, SHOWCASE_ITEMS, MAGAZINE_ITEMS, selectedBidPhoto].forEach(d => applyExternalAssetBase(d, base));
    if (selectedShowcaseImg.startsWith('./images/')) {
      selectedShowcaseImg = base + selectedShowcaseImg.slice(1);
    }
    if (mhSelectedCover.startsWith('./images/')) {
      mhSelectedCover = base + mhSelectedCover.slice(1);
    }
  }
  updateWishBadge();
  applyAuthUi();
  initHeroTrack();
  bindHeroSliderEvents();
  startHeroAutoSlide();
  switchCustomerMode('home');
  populatePartnerRfqSelect();
  refreshPartnerConsoleAll();
  bindPartnerSliderEvents();
  startPartnerAutoSlide();
  if (!API_BASE) {
    restorePendingDraftIfLogged();
    handleInitialDeepLinks();
  } else {
    hydrateFromLiveBackend();
  }

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.bl-modal-dim.open').forEach(m => m.classList.remove('open'));
    }
  });
});
