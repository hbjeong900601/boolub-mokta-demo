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

/* 1. 상단 3단 세로형 히어로 배너 (2페이지 × 3장 = 총 6장) */
const HERO_PAGES = [
  [
    {
      eyebrow: '부럽 직영 시그니처',
      title: '1인 신청도 무조건 출발!\n2026 부럽 몽골원정대',
      sub: '유심 무료 · 특식 3회 · 게르 업그레이드 · 추가금 0원',
      img: './images/sand_dunes_camp.jpg',
      action: () => openProductPreviewModal('T0950-Q2923-W2496')
    },
    {
      eyebrow: '내 일정 맞춤 비교견적',
      title: '항공권만 끊으셨나요?\n원하는 코스 1:1 맞춤견적',
      sub: '부럽 공식 파트너 & MOKTA 인증 여행사가 차량·숙소 실사로 제안',
      img: './images/hero_steppe_sunset.jpg',
      action: () => openModal('rfqWizardModal')
    },
    {
      eyebrow: '총무 없는 1/N 동행·조인',
      title: '모일수록 내려가는 투어비\n출발확정 오픈조인 합류',
      sub: '계좌이체 정산 없이 부럽에서 각자 카드로 안전 분할결제',
      img: './images/companion_team_hands.jpg',
      action: () => scrollToSection('sec-join')
    }
  ],
  [
    {
      eyebrow: '부럽 단독 20% 쿠폰특가',
      title: '노라·BBM·하닥·스카이투어\n검증된 몽골 인기투어 한눈에',
      sub: '견적 대기 없이 지금 바로 쿠폰 할인가로 즉시 확정',
      img: './images/milkyway_gobi.jpg',
      action: () => scrollToSection('sec-store')
    },
    {
      eyebrow: 'BOOLUB × MOKTA 공식관',
      title: '부럽 공식 입점 파트너 &\n몽골한국관광협회 협력사',
      sub: '실제 운행 차량·캠프 실사와 후기가 검증된 안심 파트너 네트워크',
      img: './images/khuvsgul_island.jpg',
      action: () => scrollToSection('sec-partners')
    },
    {
      eyebrow: '출국 전 원스톱 준비',
      title: '새벽 공항 단독픽업부터\n여행자보험·이심까지 특가',
      sub: '몽골 투어 불포함 필수 준비물도 부럽 회원가로 한 번에 해결',
      img: './images/ger_interior.jpg',
      action: () => scrollToSection('sec-essentials')
    }
  ]
];

/* 2. 부럽 실제 판매 몽골 투어 상품 12선 (실제 pcode · 실제 입점 파트너 · 쿠폰적용가) */
const DIRECT_PRODUCTS = [
  {
    id: 'p1',
    pcode: 'T0950-Q2923-W2496',
    pid: 'boolub',
    cat: '원정대',
    regionKey: '중부',
    durationKey: '3박4일',
    styleKey: '원정대',
    tag: '1인예약 출발확정',
    sub: '부럽 몽골원정대 (직영) · 추가금 0원 · USIM 포함',
    title: '[3박4일] 몽골 중부 원정대 동행 조인 투어 (테를지·미니사막·우기호수·울란바토르)',
    rating: '4.98',
    reviews: 142,
    discount: '30%',
    originPrice: '999,000원',
    price: '699,000원~',
    img: './images/orkhon_waterfall_rainbow.jpg',
    highlights: ['1인 신청도 100% 출발확정 보장', '몽골 데이터 USIM 전 인원 무료 제공', '전통 허르헉 등 현지 특식 3회 + 게르 업그레이드', '노쇼핑·노옵션 현지 추가비용 0원']
  },
  {
    id: 'p2',
    pcode: 'C3954-E9344-H0474',
    pid: 'boolub',
    cat: '원정대',
    regionKey: '고비',
    durationKey: '4박5일',
    styleKey: '원정대',
    tag: '부럽 직영 베스트',
    sub: '부럽 몽골원정대 (직영) · 1인 출발확정 · USIM 포함',
    title: '[4박5일] 몽골 고비사막 원정대 동행 조인 투어 (차강소브라가·욜링암·홍고린엘스·바양작)',
    rating: '4.99',
    reviews: 118,
    discount: '15%',
    originPrice: '1,350,000원',
    price: '1,150,000원',
    img: './images/sand_dunes_camp.jpg',
    highlights: ['동행 구할 필요 없이 1인 예약도 출발확정', '차강소브라가·욜링암·홍고린엘스·바양작 핵심 정복', '모래썰매·낙타트레킹·은하수 별밤 캠프 포함', '몽골 현지 USIM 무료 증정 및 전용 차량 배정']
  },
  {
    id: 'p3',
    pcode: 'V6003-W0388-Z1928',
    pid: 'anoratour',
    cat: '고비',
    regionKey: '고비',
    durationKey: '4박5일',
    styleKey: '단독',
    tag: '20% 쿠폰특가',
    sub: '노라투어 (NORA TOUR) · 샤워 가능 캠프 · 단독/조인',
    title: '[몽골] 고비사막 시그니처 코스 4박5일 (차강소브락·욜링암·홍고린엘스·바양작)',
    rating: '4.95',
    reviews: 64,
    discount: '20%',
    originPrice: '1,441,100원',
    price: '1,152,880원',
    img: './images/milkyway_gobi.jpg',
    highlights: ['부럽 20% 즉시할인 쿠폰 적용 베스트셀러', '남고비 4대 핵심 포인트 여유로운 동선 설계', '전 일정 검증된 여행자 게르 캠프 및 한국어 가이드', '출발 인원별 투명한 요금제 및 공항 픽업 포함']
  },
  {
    id: 'p4',
    pcode: 'A7468-J1235-Q7992',
    pid: 'bbm0707',
    cat: '고비',
    regionKey: '고비',
    durationKey: '4박5일',
    styleKey: '조인',
    tag: '15년 전통 랜드사',
    sub: 'BBM TOUR (비비엠투어) · 직영 캠프·차량 보유',
    title: '[몽골] 고비사막 정통 4박5일 (차강소브락·욜링암·홍고린엘스·바양작)',
    rating: '4.92',
    reviews: 93,
    discount: '20%',
    originPrice: '1,333,400원',
    price: '1,066,720원',
    img: './images/tsagaan_suvarga_snap.jpg',
    highlights: ['2009년 설립 BBM투어 베테랑 기사·가이드 전담', '홍고린엘스 모래언덕 일몰 및 바양작 불타는 절벽 투어', '쾌적한 전용 차량(스타렉스/푸르공) 선택 가능', '부럽 단독 쿠폰 적용 시 106만 원대 실속 특가']
  },
  {
    id: 'p5',
    pcode: 'L0277-Y0435-H3099',
    pid: 'khadag',
    cat: '단기',
    regionKey: '테를지',
    durationKey: '2박3일',
    styleKey: '단독',
    tag: '연차 1개 주말추천',
    sub: '하닥투어 (KHADAG TOUR) · 직장인 단기 베스트',
    title: '[몽골] 짧은일정 추천! 직장인들을 위한 알짜 테를지·초원 2박3일',
    rating: '4.94',
    reviews: 51,
    discount: '20%',
    originPrice: '675,000원',
    price: '540,000원',
    img: './images/terelj_resort_camp.jpg',
    highlights: ['금~일 또는 연차 1일로 다녀오는 부담 없는 2박3일', '테를지 국립공원·승마체험·거북바위·아리야발 사원', '장거리 비포장 이동 부담을 줄인 힐링 초원 코스', '쿠폰 적용가 540,000원 가성비 최강 입문 투어']
  },
  {
    id: 'p6',
    pcode: 'W0569-C8410-H2737',
    pid: 'bbm0707',
    cat: '단기',
    regionKey: '고비',
    durationKey: '2박3일',
    styleKey: '조인',
    tag: '실제후기 88건 ★4.8',
    sub: 'BBM TOUR (비비엠투어) · 남부 핵심 단기투어',
    title: '[몽골] 남부투어 (차강소브락·바가가쯔링촐로 화강암 협곡) 2박3일',
    rating: '4.88',
    reviews: 88,
    discount: '20%',
    originPrice: '800,000원',
    price: '640,000원',
    img: './images/baga_gazriin_sunset.jpg',
    highlights: ['부럽 누적 리뷰 88건으로 검증된 단기 남부 스테디셀러', '짧은 2박3일 동안 대협곡 차강소브락과 별밤 완벽 체험', '바가가쯔링촐로 기암괴석 일몰 스냅 포인트 방문', '단독 및 소규모 동행 조인 모두 가능']
  },
  {
    id: 'p7',
    pcode: 'H7863-P9594-D9241',
    pid: 'khadag',
    cat: '단기',
    regionKey: '중부',
    durationKey: '3박4일',
    styleKey: '단독',
    tag: '사막+초원+온천',
    sub: '하닥투어 (KHADAG TOUR) · 노천온천 힐링 포함',
    title: '[몽골] 사막과 초원 그리고 쳉헤르 온천까지! 3박4일 속성코스',
    rating: '4.96',
    reviews: 47,
    discount: '20%',
    originPrice: '900,000원',
    price: '720,000원',
    img: './images/green_steppe_flock.jpg',
    highlights: ['엘승타사르해 미니사막 낙타체험 + 모래썰매', '별을 보며 피로를 푸는 쳉헤르 천연 노천온천 숙박', '3박4일 안에 사막·초원·온천을 모두 담는 알짜 동선', '부럽 쿠폰 적용 시 720,000원 즉시 할인']
  },
  {
    id: 'p8',
    pcode: 'J8833-W9230-L2860',
    pid: 'SKYTOURS',
    cat: '단기',
    regionKey: '테를지',
    durationKey: '3박4일',
    styleKey: '단독',
    tag: '천체망원경 별관측',
    sub: '스카이 투어 몽골 (SKY TOURS) · 별밤 특화',
    title: '[몽골] 미니사막·온천·테를지·천체망원경 별자리 체험 3박4일',
    rating: '4.93',
    reviews: 39,
    discount: '20%',
    originPrice: '1,051,830원',
    price: '841,464원',
    img: './images/starlight_ger_snap.jpg',
    highlights: ['전문 천체망원경으로 달 크레이터와 은하수 직접 관측', '미니사막 + 온천욕 + 테를지 국립공원 핵심 코스', '아이 동반 가족 및 커플 여행객 만족도 최상위', '단독 차량 배정 및 전 일정 한국어 가이드 동행']
  },
  {
    id: 'p9',
    pcode: 'E0711-V0341-Z7774',
    pid: 'Bftour',
    cat: '고비',
    regionKey: '고비',
    durationKey: '5박6일',
    styleKey: '조인',
    tag: '조인/단독 겸용',
    sub: '밝은 미래 여행 (BRIGHT FUTURE) · 관광부 정식허가',
    title: '[몽골] 일출부터 별빛까지! 남고비·테를지 완전정복 5박6일 (조인/단독)',
    rating: '4.95',
    reviews: 34,
    discount: '20%',
    originPrice: '1,253,000원',
    price: '1,002,400원',
    img: './images/gobi_camp_vans.jpg',
    highlights: ['남고비 대사막 주요 명소와 테를지 국립공원 한 번에 정복', '5박6일 일주 코스를 100만 원 초반대에 누리는 실속 구성', '동행 조인 신청 및 우리 일행 단독 출발 모두 선택 가능', '몽골 문화관광부 정식 인가 현지 직영 랜드사 진행']
  },
  {
    id: 'p10',
    pcode: 'A9725-O5305-E2887',
    pid: 'anoratour',
    cat: '홉스골·중부',
    regionKey: '홉스골',
    durationKey: '5박6일',
    styleKey: '단독',
    tag: '홉스골 시그니처',
    sub: '노라투어 (NORA TOUR) · 국내선/호수 1열 캠프',
    title: '[몽골] 푸른 진주 홉스골 호수 노라 단독 힐링코스 6박7일',
    rating: '4.97',
    reviews: 41,
    discount: '20%',
    originPrice: '1,750,000원',
    price: '1,400,000원',
    img: './images/khuvsgul_island.jpg',
    highlights: ['몽골의 스위스라 불리는 투명한 홉스골 호수 집중 힐링', '호숫가 인접 쾌적한 레이크뷰 게르 캠프 배정', '보트 유람·승마 트레킹·순록 유목민 차탄족 문화 체험', '부모님 효도여행 및 여름 휴양형 여행객 강력 추천']
  },
  {
    id: 'p11',
    pcode: 'E4890-B3318-G7233',
    pid: 'YangGaTour',
    cat: '홉스골·중부',
    regionKey: '홉스골',
    durationKey: '5박6일',
    styleKey: '조인',
    tag: '60일전 100% 환불',
    sub: '양가투어 (YangGa Friends) · 후기 22건 ★4.8',
    title: '[몽골] 홉스골 5박6일 투어 패키지 (조인/동행/단독 · 무료취소 보장)',
    rating: '4.86',
    reviews: 22,
    discount: '20%',
    originPrice: '1,480,000원',
    price: '1,184,000원',
    img: './images/khuvsgul_boat_sunset.jpg',
    highlights: ['출발 60일 전 취소 시 100% 전액 환불 안심 약관', '어르헝 폭포·차강노르·홉스골 호수 북부 핵심 완주', '2030 또래 동행 조인 및 지인 단독팀 맞춤 운영', '현지 한국어 소통 완벽 가이드 및 스냅 촬영 지원']
  },
  {
    id: 'p12',
    pcode: 'G8231-V9289-H9933',
    pid: 'doittavel',
    cat: '고비',
    regionKey: '고비',
    durationKey: '4박5일',
    styleKey: '단독',
    tag: 'A/B코스 맞춤선택',
    sub: '(주)두잇트래블 (DO IT TRAVEL) · 맞춤형 투어',
    title: '[몽골] 4박5일 고비사막 맞춤형 A/B코스 선택 단독·조인 투어',
    rating: '4.91',
    reviews: 29,
    discount: '20%',
    originPrice: '1,320,000원',
    price: '1,056,000원',
    img: './images/steppe_ger_suvs.jpg',
    highlights: ['체력과 취향에 따라 A코스(정통 사막) / B코스(사막+테를지) 선택', '우리 일행 일정에 맞춘 유연한 출발 시간 및 식단 케어', '검증된 전용 차량 및 위생적인 침구류 제공', '부럽 안전결제 및 즉시할인 쿠폰 적용 가능']
  }
];

/* 3. 부럽 실제 입점 파트너(9곳) + MOKTA 협회 순차 입점 회원사(11곳) = 총 20개사 */
const MOKTA_AGENCIES = [
  {
    id: 'ag1',
    statusType: 'active',
    cert: '부럽 직영 공식운영',
    name: '부럽 몽골원정대',
    en: 'BOOLUB EXPEDITION',
    cat: '고비·남부',
    spec: '1인 출발확정 직영',
    rating: '4.99',
    reviews: 260,
    resp: '즉시 확정',
    fleet: '전용 스타렉스·푸르공',
    camp: '업그레이드 게르 보장',
    desc: '동행을 따로 구하지 않아도 1인 신청 즉시 출발이 확정되며, 유심·특식 3회·숙소 업그레이드가 모두 포함된 부럽 대표 시그니처 프로그램입니다.',
    logoImg: './images/boolub_logo.png',
    storeUrl: 'https://www.boolub.com/?pn=pages.view&type=pages&data=mgexpedition',
    repPcode: 'T0950-Q2923-W2496',
    cover: './images/sand_dunes_camp.jpg',
    photos: ['./images/sand_dunes_camp.jpg', './images/orkhon_waterfall_rainbow.jpg', './images/campfire_cheers.jpg']
  },
  {
    id: 'ag2',
    statusType: 'active',
    cert: '부럽 공식파트너 · 17개 상품',
    name: '노라투어',
    en: 'NORA TOUR MONGOLIA',
    cat: '고비·남부',
    spec: '고비·홉스골 시그니처',
    rating: '4.96',
    reviews: 184,
    resp: '평균 12분',
    fleet: '신형 스타렉스·푸르공',
    camp: '샤워가능 정식캠프',
    desc: '고비사막 시그니처부터 홉스골 단독 힐링코스까지 17개 정규 라인업을 운영하며 깔끔한 캠프 배정으로 재방문율이 높은 공식 파트너사입니다.',
    logoImg: './images/partners/anoratour.png',
    storeUrl: 'https://www.boolub.com/?pn=partner.view&pid=anoratour',
    repPcode: 'V6003-W0388-Z1928',
    cover: './images/milkyway_gobi.jpg',
    photos: ['./images/milkyway_gobi.jpg', './images/khuvsgul_island.jpg', './images/ger_interior.jpg']
  },
  {
    id: 'ag3',
    statusType: 'active',
    cert: '부럽 공식파트너 · 15년 업력',
    name: 'BBM TOUR (비비엠투어)',
    en: 'BBM MONGOLIA TOUR',
    cat: '고비·남부',
    spec: '남부·고비·중부 베스트',
    rating: '4.92',
    reviews: 215,
    resp: '평균 15분',
    fleet: '직영 차량 다수 보유',
    camp: '전 일정 검증 캠프',
    desc: '2009년 설립 이래 15년 노하우를 보유한 몽골 전문 여행사로 남부 2박3일(후기 88건)과 정통 고비 4박5일 등 17개 인기 상품을 운영 중입니다.',
    logoImg: './images/partners/bbm0707.jpeg',
    storeUrl: 'https://www.boolub.com/?pn=partner.view&pid=bbm0707',
    repPcode: 'A7468-J1235-Q7992',
    cover: './images/baga_gazriin_sunset.jpg',
    photos: ['./images/baga_gazriin_sunset.jpg', './images/tsagaan_suvarga_snap.jpg', './images/vehicle_fleet.jpg']
  },
  {
    id: 'ag4',
    statusType: 'active',
    cert: '부럽 공식파트너 · 단기·키즈',
    name: '하닥투어',
    en: 'KHADAG TOUR',
    cat: '홉스골·중부',
    spec: '직장인 단기·온천·키즈',
    rating: '4.95',
    reviews: 112,
    resp: '평균 14분',
    fleet: '쾌적 단독차량 배정',
    camp: '온천·테를지 우수캠프',
    desc: '직장인 주말 2박3일 테를지 코스부터 사막+초원+온천 3박4일 속성코스, 어린이 체험형 키즈 투어까지 세심한 케어를 제공합니다.',
    logoImg: './images/partners/khadag.png',
    storeUrl: 'https://www.boolub.com/?pn=partner.view&pid=khadag',
    repPcode: 'L0277-Y0435-H3099',
    cover: './images/terelj_resort_camp.jpg',
    photos: ['./images/terelj_resort_camp.jpg', './images/green_steppe_flock.jpg', './images/glamping_dome_friends.jpg']
  },
  {
    id: 'ag5',
    statusType: 'active',
    cert: '부럽 공식파트너 · 별밤특화',
    name: '스카이 투어 몽골',
    en: 'SKY TOURS MONGOLIA',
    cat: '홉스골·중부',
    spec: '천체망원경·홉스골',
    rating: '4.94',
    reviews: 96,
    resp: '평균 16분',
    fleet: '4WD 스타렉스·벤',
    camp: '별관측 최적 캠프',
    desc: '천체망원경을 활용한 밤하늘 별자리 관측 체험과 미니사막·쳉헤르 온천·홉스골 호수 정규 투어를 전문 운영하는 현지 파트너입니다.',
    logoImg: './images/partners/SKYTOURS.jpg',
    storeUrl: 'https://www.boolub.com/?pn=partner.view&pid=SKYTOURS',
    repPcode: 'J8833-W9230-L2860',
    cover: './images/starlight_ger_snap.jpg',
    photos: ['./images/starlight_ger_snap.jpg', './images/khuvsgul_boat_sunset.jpg', './images/orkhon_canyon_top.jpg']
  },
  {
    id: 'ag6',
    statusType: 'active',
    cert: '부럽 공식파트너 · 관광부인가',
    name: '밝은 미래 여행',
    en: 'BRIGHT FUTURE TOUR',
    cat: '고비·남부',
    spec: '남고비 일주·조인',
    rating: '4.95',
    reviews: 78,
    resp: '평균 15분',
    fleet: '푸르공·스타렉스 완비',
    camp: '남고비 직영 제휴캠프',
    desc: '몽골 문화관광부 정식 허가 법인으로 일출부터 별빛까지 즐기는 남고비·테를지 4박5일 및 5박6일 조인·단독 투어를 운영합니다.',
    logoImg: './images/partners/Bftour.png',
    storeUrl: 'https://www.boolub.com/?pn=partner.view&pid=Bftour',
    repPcode: 'E0711-V0341-Z7774',
    cover: './images/gobi_camp_vans.jpg',
    photos: ['./images/gobi_camp_vans.jpg', './images/sand_dunes_camp.jpg', './images/khorkhog_feast.jpg']
  },
  {
    id: 'ag7',
    statusType: 'active',
    cert: '부럽 공식파트너 · 맞춤코스',
    name: '(주)두잇트래블',
    en: 'DO IT TRAVEL',
    cat: '고비·남부',
    spec: 'A/B 선택형 맞춤투어',
    rating: '4.91',
    reviews: 67,
    resp: '평균 18분',
    fleet: '맞춤형 전용차량',
    camp: '일정별 최적 숙소',
    desc: '고비사막 4박5일·5박6일 A/B 선택형 코스를 통해 여행자 체력과 선호도에 딱 맞는 동행·단독 맞춤 일정을 설계해 드립니다.',
    logoImg: null,
    c1: '#0284c7',
    c2: '#38bdf8',
    abbr: 'DOIT',
    storeUrl: 'https://www.boolub.com/?pn=partner.view&pid=doittavel',
    repPcode: 'G8231-V9289-H9933',
    cover: './images/steppe_ger_suvs.jpg',
    photos: ['./images/steppe_ger_suvs.jpg', './images/erdene_zuu_monastery.jpg', './images/campfire_cheers.jpg']
  },
  {
    id: 'ag8',
    statusType: 'active',
    cert: '부럽 공식파트너 · 무료취소보장',
    name: '양가투어',
    en: 'YANGGA MONGOLIAN FRIENDS',
    cat: '홉스골·중부',
    spec: '홉스골 5박6일 전문',
    rating: '4.88',
    reviews: 64,
    resp: '평균 15분',
    fleet: '북부 장거리 특화차량',
    camp: '홉스골 레이크 캠프',
    desc: '출발 60일 전 100% 환불 보장과 탄탄한 북부 코스로 호평받는 홉스골·어르헝폭포 조인 및 단독 투어 전문 파트너사입니다.',
    logoImg: './images/partners/YangGaTour.png',
    storeUrl: 'https://www.boolub.com/?pn=partner.view&pid=YangGaTour',
    repPcode: 'E4890-B3318-G7233',
    cover: './images/khuvsgul_boat_sunset.jpg',
    photos: ['./images/khuvsgul_boat_sunset.jpg', './images/terkhiin_lake_forest.jpg', './images/companion_team_hands.jpg']
  },
  {
    id: 'ag9',
    statusType: 'active',
    cert: '부럽 공식파트너 · 평점 5.0',
    name: '더블유아이티 (WIT)',
    en: 'WORLD INDIVIDUAL TRAVEL',
    cat: '홉스골·중부',
    spec: '울란바토르 공항픽업',
    rating: '5.00',
    reviews: 52,
    resp: '즉시 확정',
    fleet: '공항 단독 세단·벤',
    camp: '시내 호텔 안전연결',
    desc: '새벽·심야 도착 항공편도 걱정 없는 울란바토르 칭기스칸 국제공항 ↔ 시내 호텔 단독 차량 픽업·샌딩 서비스를 제공합니다.',
    logoImg: './images/partners/wit77777.png',
    storeUrl: 'https://www.boolub.com/?pn=partner.view&pid=wit77777',
    repPcode: 'I3885-I4036-S5377',
    cover: './images/vehicle_fleet.jpg',
    photos: ['./images/vehicle_fleet.jpg', './images/hero_steppe_sunset.jpg', './images/terelj_resort_camp.jpg']
  },
  /* --- MOKTA(몽골한국관광협회) 순차 입점 진행 회원사 슬롯 (10 ~ 20번) --- */
  {
    id: 'ag10',
    statusType: 'mokta_soon',
    cert: 'MOKTA 정회원 · 순차입점',
    name: '어드벤처 몽골 투어',
    en: 'ADVENTURE MONGOLIA',
    cat: '고비·남부',
    spec: 'MOKTA 협회 회원사',
    rating: '4.95',
    reviews: 82,
    resp: '협회 연동중',
    fleet: '스타렉스 9대·푸르공 14대',
    camp: '홍고린 온수캠프 제휴',
    desc: '몽골한국관광협회(MOKTA) 소속 정회원사로 드론 영상 촬영 및 남고비 사막 종단 코스를 부럽 전용관에 순차 오픈합니다.',
    logoImg: null, c1: '#0ea5e9', c2: '#2563eb', abbr: 'AM',
    cover: './images/tsagaan_suvarga_snap.jpg',
    photos: ['./images/tsagaan_suvarga_snap.jpg', './images/milkyway_gobi.jpg', './images/khorkhog_feast.jpg']
  },
  {
    id: 'ag11',
    statusType: 'mokta_soon',
    cert: 'MOKTA 정회원 · 순차입점',
    name: '고비 스타 글램핑',
    en: 'GOBI STAR GLAMPING',
    cat: '고비·남부',
    spec: 'MOKTA 협회 회원사',
    rating: '4.97',
    reviews: 74,
    resp: '협회 연동중',
    fleet: '리무진 벤 7대',
    camp: '개별욕실 글램핑 직영',
    desc: '전 일정 호텔식 침구와 개별 온수 샤워실이 완비된 럭셔리 글램핑 캠프를 운영하는 MOKTA 인증 회원사입니다.',
    logoImg: null, c1: '#f59e0b', c2: '#ea580c', abbr: 'GS',
    cover: './images/ger_interior.jpg',
    photos: ['./images/ger_interior.jpg', './images/glamping_dome_friends.jpg', './images/terelj_resort_camp.jpg']
  },
  {
    id: 'ag12',
    statusType: 'mokta_soon',
    cert: 'MOKTA 정회원 · 순차입점',
    name: '홉스골 블루펄 트래블',
    en: 'KHUVSGUL BLUE PEARL',
    cat: '홉스골·중부',
    spec: 'MOKTA 협회 회원사',
    rating: '4.94',
    reviews: 68,
    resp: '협회 연동중',
    fleet: '스프린터 4대·스타렉스',
    camp: '홉스골 호수 1열 캠프',
    desc: '북부 홉스골 호수 레이크뷰 캠프 블럭과 국내선 연계 효도·가족 단독투어를 전문으로 하는 MOKTA 정회원사입니다.',
    logoImg: null, c1: '#06b6d4', c2: '#0d9488', abbr: 'BP',
    cover: './images/khuvsgul_island.jpg',
    photos: ['./images/khuvsgul_island.jpg', './images/khuvsgul_boat_sunset.jpg', './images/terkhiin_lake_forest.jpg']
  },
  {
    id: 'ag13',
    statusType: 'mokta_soon',
    cert: 'MOKTA 정회원 · 순차입점',
    name: '노마드 스냅 익스페디션',
    en: 'NOMAD SNAP EXPEDITION',
    cat: '고비·남부',
    spec: 'MOKTA 협회 회원사',
    rating: '4.96',
    reviews: 91,
    resp: '협회 연동중',
    fleet: '루프랙 감성 푸르공 16대',
    camp: '별밤 포토존 전용캠프',
    desc: '전 가이드 미러리스 스냅 촬영 장비를 보유하여 2030 동행 조인 만족도가 높은 MOKTA 협회 소속 여행사입니다.',
    logoImg: null, c1: '#6366f1', c2: '#8b5cf6', abbr: 'NS',
    cover: './images/companion_team_hands.jpg',
    photos: ['./images/companion_team_hands.jpg', './images/starlight_ger_snap.jpg', './images/campfire_cheers.jpg']
  },
  {
    id: 'ag14',
    statusType: 'mokta_soon',
    cert: 'MOKTA 정회원 · 순차입점',
    name: '몽골 헤리티지 VIP',
    en: 'MONGOL HERITAGE VIP',
    cat: '홉스골·중부',
    spec: 'MOKTA 협회 회원사',
    rating: '4.98',
    reviews: 59,
    resp: '협회 연동중',
    fleet: '랜드크루저 12대·렉서스',
    camp: '5성 호텔 + 특급 리조트',
    desc: '부모님 칠순 가족여행, 기업 워크샵 의전, 몽골 골프·승마 프라이빗 투어를 전담하는 MOKTA 프리미엄 회원사입니다.',
    logoImg: null, c1: '#0f172a', c2: '#334155', abbr: 'MH',
    cover: './images/orkhon_canyon_top.jpg',
    photos: ['./images/orkhon_canyon_top.jpg', './images/erdene_zuu_monastery.jpg', './images/ger_interior.jpg']
  },
  {
    id: 'ag15',
    statusType: 'mokta_soon',
    cert: 'MOKTA 정회원 · 순차입점',
    name: '스텝 오아시스 캠프',
    en: 'STEPPE OASIS CAMP',
    cat: '홉스골·중부',
    spec: 'MOKTA 협회 회원사',
    rating: '4.93',
    reviews: 63,
    resp: '협회 연동중',
    fleet: '4WD 스타렉스 11대',
    camp: '쳉헤르 노천온천 직영',
    desc: '쳉헤르 천연 노천온천과 어르헝 폭포 인근 직영 게르 캠프를 운영하는 중부 힐링 전문 MOKTA 회원사입니다.',
    logoImg: null, c1: '#10b981', c2: '#059669', abbr: 'SO',
    cover: './images/orkhon_waterfall_rainbow.jpg',
    photos: ['./images/orkhon_waterfall_rainbow.jpg', './images/green_steppe_flock.jpg', './images/steppe_ger_suvs.jpg']
  },
  {
    id: 'ag16',
    statusType: 'mokta_soon',
    cert: 'MOKTA 정회원 · 순차입점',
    name: '울란 럭셔리 벤 투어',
    en: 'ULAAN LUXURY VAN',
    cat: '고비·남부',
    spec: 'MOKTA 협회 회원사',
    rating: '4.95',
    reviews: 48,
    resp: '협회 연동중',
    fleet: '벤츠 스프린터·하이에이스',
    camp: '전 일정 고급 캠프',
    desc: '장거리 비포장 도로에서도 피로감이 적은 최신형 리무진 벤과 베테랑 운전기사를 배정하는 MOKTA 회원사입니다.',
    logoImg: null, c1: '#1d4ed8', c2: '#3b82f6', abbr: 'UL',
    cover: './images/vehicle_fleet.jpg',
    photos: ['./images/vehicle_fleet.jpg', './images/baga_gazriin_sunset.jpg', './images/ger_interior.jpg']
  },
  {
    id: 'ag17',
    statusType: 'mokta_soon',
    cert: 'MOKTA 정회원 · 순차입점',
    name: '알타이 이글 익스페디션',
    en: 'ALTAI EAGLE EXPEDITION',
    cat: '고비·남부',
    spec: 'MOKTA 협회 회원사',
    rating: '4.96',
    reviews: 44,
    resp: '협회 연동중',
    fleet: '오프로드 랜드크루저 10대',
    camp: '서부 바얀울기 베이스캠프',
    desc: '서부 알타이 만년설 트레킹과 카자흐족 검독수리 사냥꾼 축제를 전문 진행하는 MOKTA 특수지역 회원사입니다.',
    logoImg: null, c1: '#b45309', c2: '#d97706', abbr: 'AE',
    cover: './images/hero_steppe_sunset.jpg',
    photos: ['./images/hero_steppe_sunset.jpg', './images/gobi_camp_vans.jpg', './images/orkhon_canyon_top.jpg']
  },
  {
    id: 'ag18',
    statusType: 'mokta_soon',
    cert: 'MOKTA 정회원 · 순차입점',
    name: '칭기즈칸 호스 트레킹',
    en: 'CHINGGIS HORSE TREK',
    cat: '홉스골·중부',
    spec: 'MOKTA 협회 회원사',
    rating: '4.92',
    reviews: 55,
    resp: '협회 연동중',
    fleet: '스타렉스 8대 + 승마교관',
    camp: '테를지 초원 승마캠프',
    desc: '초보자 안전 강습부터 대초원 외승 종주까지 한국어 가능 전문 승마 교관이 동행하는 MOKTA 회원사입니다.',
    logoImg: null, c1: '#15803d', c2: '#22c55e', abbr: 'CH',
    cover: './images/green_steppe_flock.jpg',
    photos: ['./images/green_steppe_flock.jpg', './images/terelj_resort_camp.jpg', './images/campfire_cheers.jpg']
  },
  {
    id: 'ag19',
    statusType: 'mokta_soon',
    cert: 'MOKTA 정회원 · 순차입점',
    name: '테를지 리버사이드 투어',
    en: 'TERELJ RIVERSIDE',
    cat: '홉스골·중부',
    spec: 'MOKTA 협회 회원사',
    rating: '4.94',
    reviews: 71,
    resp: '협회 연동중',
    fleet: '최신형 스타렉스·대형버스',
    camp: '톨강 리버뷰 리조트 게르',
    desc: '울란바토르 근교 테를지 국립공원 단기 힐링투어 및 기업·단체 연수 행사를 전문 운영하는 MOKTA 회원사입니다.',
    logoImg: null, c1: '#0369a1', c2: '#0ea5e9', abbr: 'TR',
    cover: './images/terelj_resort_camp.jpg',
    photos: ['./images/terelj_resort_camp.jpg', './images/glamping_dome_friends.jpg', './images/khorkhog_feast.jpg']
  },
  {
    id: 'ag20',
    statusType: 'mokta_soon',
    cert: 'MOKTA 정회원 · 순차입점',
    name: '고비 사파리 랜드',
    en: 'GOBI SAFARI LAND',
    cat: '고비·남부',
    spec: 'MOKTA 협회 회원사',
    rating: '4.93',
    reviews: 62,
    resp: '협회 연동중',
    fleet: '개조 푸르공 15대·스타렉스',
    camp: '바양작·욜링암 제휴캠프',
    desc: '합리적인 비용의 오픈조인 차량 쉐어와 정통 사막 캠핑 프로그램을 운영하는 MOKTA 협회 정회원사입니다.',
    logoImg: null, c1: '#be123c', c2: '#f43f5e', abbr: 'GS',
    cover: './images/sand_dunes_camp.jpg',
    photos: ['./images/sand_dunes_camp.jpg', './images/baga_gazriin_sunset.jpg', './images/starlight_ger_snap.jpg']
  }
];

/* 4. 실시간 출발확정 동행·조인 데이터 (파트너 오픈조인 + 여행자 모집 + 원정대 통합) */
const JOIN_CAL_DAYS = [
  { key: '07-18', label: '7/18(토)', badge: '확정 2팀', cls: 'confirm' },
  { key: '07-25', label: '7/25(토)', badge: '1자리 남음', cls: 'imminent' },
  { key: '08-01', label: '8/01(토)', badge: '확정 3팀', cls: 'confirm' },
  { key: '08-08', label: '8/08(토)', badge: '마감임박', cls: 'imminent' },
  { key: '08-15', label: '8/15(광복절)', badge: '인기·확정', cls: 'confirm' },
  { key: '08-22', label: '8/22(토)', badge: '모집중', cls: 'bidding' },
  { key: '09-05', label: '9/05(토)', badge: '동행모집', cls: 'bidding' }
];

const JOIN_ITEMS = [
  {
    id: 'j1',
    dateKey: '08-15',
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
    title: '[광복절 연휴] 고비사막 원정대 4박5일 (홍고린엘스·바양작·유심 무료포함)',
    img: './images/sand_dunes_camp.jpg',
    filled: 4,
    max: 6,
    seats: ['20대여', '20대여', '30대남', '30대남', '빈좌석', '빈좌석'],
    curPrice: '1,150,000원',
    fullPrice: '990,000원',
    tags: '추가금 0원 · USIM 무료 · 특식 3회 · 각자 카드결제'
  },
  {
    id: 'j2',
    dateKey: '07-25',
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
    img: './images/milkyway_gobi.jpg',
    filled: 5,
    max: 6,
    seats: ['20대여', '20대여', '30대여', '20대남', '30대남', '빈좌석'],
    curPrice: '920,000원',
    fullPrice: '840,000원',
    tags: '신형 스타렉스 · 온수 샤워 캠프 · 6인 마감 시 전원 할인'
  },
  {
    id: 'j3',
    dateKey: '08-01',
    dateStr: '8.01(토) ~ 8.04(화) · 3박4일',
    regionKey: '중부',
    durationKey: '3박4일',
    styleKey: '원정대',
    statusBadge: '1인 신청도 확정',
    statusCls: 'sky',
    subBadge: '3자리 남음',
    subCls: 'amber',
    agency: '부럽 몽골원정대 (직영)',
    pcode: 'T0950-Q2923-W2496',
    title: '[여름휴가] 중부 미니사막·테를지·우기호수 3박4일 원정대 조인 모집',
    img: './images/orkhon_waterfall_rainbow.jpg',
    filled: 3,
    max: 6,
    seats: ['20대여', '30대여', '30대남', '빈좌석', '빈좌석', '빈좌석'],
    curPrice: '799,000원',
    fullPrice: '699,000원',
    tags: '게르 업그레이드 · 유심 제공 · 허르헉 특식 포함'
  },
  {
    id: 'j4',
    dateKey: '08-08',
    dateStr: '8.08(토) ~ 8.13(목) · 5박6일',
    regionKey: '홉스골',
    durationKey: '5박6일',
    styleKey: '조인',
    statusBadge: '출발확정 오픈조인',
    statusCls: 'sky',
    subBadge: '2자리 남음',
    subCls: 'coral',
    agency: '양가투어 (YangGa Friends)',
    pcode: 'E4890-B3318-G7233',
    title: '한여름 시원한 홉스골 호수 + 어르헝폭포 5박6일 동행 2분 합류하세요',
    img: './images/khuvsgul_boat_sunset.jpg',
    filled: 4,
    max: 6,
    seats: ['30대여', '30대여', '30대남', '40대여', '빈좌석', '빈좌석'],
    curPrice: '1,184,000원',
    fullPrice: '1,050,000원',
    tags: '60일전 100% 환불 · 보트체험 · 호숫가 게르 숙박'
  },
  {
    id: 'j5',
    dateKey: '07-18',
    dateStr: '7.18(토) ~ 7.20(월) · 2박3일',
    regionKey: '고비',
    durationKey: '2박3일',
    styleKey: '조인',
    statusBadge: '출발확정',
    statusCls: 'sky',
    subBadge: '2자리 남음',
    subCls: 'amber',
    agency: 'BBM TOUR (비비엠투어)',
    pcode: 'W0569-C8410-H2737',
    title: '[연차 1일] 차강소브락 대협곡·바가가쯔링촐로 남부 핵심 2박3일 조인팀',
    img: './images/baga_gazriin_sunset.jpg',
    filled: 4,
    max: 6,
    seats: ['20대남', '20대여', '30대여', '30대남', '빈좌석', '빈좌석'],
    curPrice: '640,000원',
    fullPrice: '580,000원',
    tags: '후기 88건 검증 코스 · 감성 푸르공 · 별밤 스냅'
  },
  {
    id: 'j6',
    dateKey: '08-22',
    dateStr: '8.22(토) ~ 8.25(화) · 3박4일',
    regionKey: '테를지',
    durationKey: '3박4일',
    styleKey: '조인',
    statusBadge: '여행자 동행모집',
    statusCls: 'amber',
    subBadge: '파트너 매칭완료',
    subCls: 'sky',
    agency: '스카이 투어 몽골 전담',
    pcode: 'J8833-W9230-L2860',
    title: '8월 말 사막+쳉헤르 온천+천체망원경 별 관측 3박4일 같이 가실 분!',
    img: './images/starlight_ger_snap.jpg',
    filled: 3,
    max: 6,
    seats: ['20대여(방장)', '20대여', '30대여', '빈좌석', '빈좌석', '빈좌석'],
    curPrice: '841,464원',
    fullPrice: '750,000원',
    tags: '천체망원경 은하수 관측 · 노천온천 힐링 · 비흡연 환영'
  }
];

/* 5. 고객 맞춤 일정 요청 & 파트너사 비교견적 (순수 고객 친화 UX) */
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
    desc: '대한항공 오후 도착 항공권 발권 완료했습니다. 차강소브락·홍고린엘스·바양작 코스로 희망하며, 전 일정 샤워 가능한 깔끔한 게르와 신형 스타렉스 조건으로 비교해보고 싶습니다.',
    specs: ['4명 단독차량', '신형 스타렉스 희망', '샤워 가능 캠프 필수', '현지 추가금 0원 조건'],
    quotes: [
      {
        agency: '노라투어 (NORA TOUR)',
        pid: 'anoratour',
        pcode: 'V6003-W0388-Z1928',
        logo: './images/partners/anoratour.png',
        badge: '부럽 공식파트너 · 쿠폰적용 가능',
        price4: '1,152,880원',
        price6: '960,000원',
        veh: '2024년형 현대 스타렉스 4WD 단독 배정',
        ger: '전 일정 온수 샤워 가능 투어리스트 캠프 (2인 1실 가능)',
        vehImg: './images/vehicle_fleet.jpg',
        gerImg: './images/ger_interior.jpg',
        comment: '대한항공 도착 시간에 맞춰 칭기스칸 공항 단독 픽업 무료 포함해 드립니다. 부럽 고비 시그니처 상품과 동일 스펙으로 쿠폰 즉시할인 결제 가능합니다!'
      },
      {
        agency: 'BBM TOUR (비비엠투어)',
        pid: 'bbm0707',
        pcode: 'A7468-J1235-Q7992',
        logo: './images/partners/bbm0707.jpeg',
        badge: '15년 업력 · 직영 캠프 보유',
        price4: '1,066,720원',
        price6: '890,000원',
        veh: '직영 정비 스타렉스 또는 감성 푸르공 선택',
        ger: '남고비 검증 여행자 캠프 + 마지막 날 특식 허르헉 포함',
        vehImg: './images/gobi_camp_vans.jpg',
        gerImg: './images/sand_dunes_camp.jpg',
        comment: '15년 경력 한국어 능통 가이드 배정 확정 가능합니다. 모래썰매·낙타체험·별밤 스냅 촬영 모두 추가금 없이 포함해 모시겠습니다.'
      },
      {
        agency: '밝은 미래 여행 (BRIGHT FUTURE)',
        pid: 'Bftour',
        pcode: 'E0711-V0341-Z7774',
        logo: './images/partners/Bftour.png',
        badge: '몽골 관광부 정식인가',
        price4: '1,040,000원',
        price6: '870,000원',
        veh: '단독 4WD 승합차량 (차량 내 생수·간식 상시 비치)',
        ger: '홍고린엘스 사막 인접 정식 캠프 배정',
        vehImg: './images/steppe_ger_suvs.jpg',
        gerImg: './images/terelj_resort_camp.jpg',
        comment: '친구 4분 프라이빗 일정에 맞춰 여유로운 출발 시간과 캠프파이어 불멍 세팅을 서비스로 준비해 드립니다.'
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
    desc: '60대 부모님 두 분 포함 성인 5명 가족여행입니다. 비포장 이동이 너무 힘들지 않게 국내선 왕복 또는 리무진 벤 차량과 깨끗한 호숫가 숙소 위주로 제안 부탁드립니다.',
    specs: ['부모님 동반 5인', '홉스골+온천 힐링', '개별 욕실 리조트 선호', '한식·특식 케어'],
    quotes: [
      {
        agency: '노라투어 (NORA TOUR)',
        pid: 'anoratour',
        pcode: 'A9725-O5305-E2887',
        logo: './images/partners/anoratour.png',
        badge: '홉스골 단독코스 베스트',
        price4: '1,400,000원',
        price6: '1,280,000원',
        veh: '여유로운 전용 벤 단독 배정 (장거리 구간 휴식 케어)',
        ger: '홉스골 호수 1열 레이크뷰 업그레이드 게르 리조트',
        vehImg: './images/vehicle_fleet.jpg',
        gerImg: './images/khuvsgul_island.jpg',
        comment: '부모님 동반 가족팀 전담 베테랑 가이드가 배정되며, 보트 유람과 따뜻한 한식 스타일 식단을 세심하게 챙겨드립니다.'
      },
      {
        agency: '양가투어 (YangGa Friends)',
        pid: 'YangGaTour',
        pcode: 'E4890-B3318-G7233',
        logo: './images/partners/YangGaTour.png',
        badge: '60일전 100% 환불 보장',
        price4: '1,240,000원',
        price6: '1,120,000원',
        veh: '북부 노선 특화 대형 승합차 단독 운행',
        ger: '어르헝·홉스골 온수 샤워 완비 정식 캠프',
        vehImg: './images/steppe_ger_suvs.jpg',
        gerImg: './images/khuvsgul_boat_sunset.jpg',
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
    title: '9월 초 사막+쳉헤르 노천온천+별밤 스냅 3박4일 조인 가능한 투어 찾아요',
    desc: '연차 2개 쓰고 가는 커플 2명입니다! 단독으로 가기엔 비용이 부담되어 총 4~6명 조인 가능한 팀이나 사막·온천 알짜 코스 제안 기다립니다.',
    specs: ['2명 확정 (조인희망)', '미니사막+쳉헤르온천', '별밤 사진촬영 선호', '1/N 각자결제 희망'],
    quotes: [
      {
        agency: '하닥투어 (KHADAG TOUR)',
        pid: 'khadag',
        pcode: 'H7863-P9594-D9241',
        logo: './images/partners/khadag.png',
        badge: '3박4일 사막+온천 베스트',
        price4: '720,000원',
        price6: '650,000원',
        veh: '스타렉스 4WD 쾌적 운행',
        ger: '쳉헤르 노천온천 리조트 캠프 숙박 포함',
        vehImg: './images/vehicle_fleet.jpg',
        gerImg: './images/glamping_dome_friends.jpg',
        comment: '해당 날짜 이미 2분 문의가 있어 합류 시 바로 4인 출발확정 요금(72만 원)으로 진행 가능합니다!'
      },
      {
        agency: '스카이 투어 몽골 (SKY TOURS)',
        pid: 'SKYTOURS',
        pcode: 'J8833-W9230-L2860',
        logo: './images/partners/SKYTOURS.jpg',
        badge: '천체망원경 별관측 포함',
        price4: '841,464원',
        price6: '740,000원',
        veh: '전용 투어 차량 + 천체망원경 장비 탑재',
        ger: '온천 캠프 + 테를지 정식 게르 캠프',
        vehImg: './images/baga_gazriin_sunset.jpg',
        gerImg: './images/starlight_ger_snap.jpg',
        comment: '밤하늘 천체망원경 관측과 커플 은하수 인생샷 촬영까지 포함된 인기 3박4일 코스입니다.'
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
        logo: './images/boolub_logo.png',
        badge: '1인 신청 즉시 100% 출발확정',
        price4: '799,000원',
        price6: '699,000원',
        veh: '원정대 전용 차량 배정',
        ger: '업그레이드 게르 캠프 (남/여 성별 분리 배정)',
        vehImg: './images/gobi_camp_vans.jpg',
        gerImg: './images/orkhon_waterfall_rainbow.jpg',
        comment: '부럽 직영 몽골원정대는 1인 신청 시에도 모객 취소 없이 무조건 출발 확정됩니다! USIM 무료 증정 및 특식 3회 포함 조건으로 바로 예약 가능합니다.'
      }
    ]
  }
];

/* 6. 파트너사 현장 LIVE 스토리 (부럽 실제 상품 pcode 직결) */
const SHOWCASE_ITEMS = [
  {
    id: 's1',
    cat: '은하수·스냅',
    agency: '노라투어 (NORA TOUR)',
    pcode: 'V6003-W0388-Z1928',
    prodName: '[몽골] 고비사막 시그니처 코스 4박5일',
    price: '1,152,880원',
    badge: '실제 캠프 야경',
    title: '어젯밤 홍고린엘스 캠프 앞마당에서 육안으로 쏟아진 은하수 현장입니다',
    img: './images/milkyway_gobi.jpg',
    tip: '달빛이 약한 음력 그믐 전후로 오시면 휴대폰 야간모드로도 선명한 은하수를 남기실 수 있어요.'
  },
  {
    id: 's2',
    cat: '게르·샤워실',
    agency: '하닥투어 (KHADAG TOUR)',
    pcode: 'L0277-Y0435-H3099',
    prodName: '[몽골] 직장인 추천 테를지 핵심 2박3일',
    price: '540,000원',
    badge: '숙소 내부 실사',
    title: '호텔식 화이트 침구와 따뜻한 온수 샤워가 보장되는 업그레이드 게르 내부',
    img: './images/ger_interior.jpg',
    tip: '몽골 게르가 불편할까 걱정하시는 분들을 위해 매트리스와 청결도를 직접 점검한 캠프만 배정합니다.'
  },
  {
    id: 's3',
    cat: '푸르공·스타렉스',
    agency: 'BBM TOUR (비비엠투어)',
    pcode: 'A7468-J1235-Q7992',
    prodName: '[몽골] 고비사막 정통 4박5일',
    price: '1,066,720원',
    badge: '출발 전 차량점검',
    title: '비포장 사막길도 든든하게! 출고 점검 마친 스타렉스 & 감성 푸르공 라인업',
    img: './images/vehicle_fleet.jpg',
    tip: '승차감이 중요하시면 신형 스타렉스를, 인생샷 감성을 원하시면 루프랙 푸르공을 추천해 드립니다.'
  },
  {
    id: 's4',
    cat: '음식·불멍파티',
    agency: '부럽 몽골원정대 (직영)',
    pcode: 'T0950-Q2923-W2496',
    prodName: '[3박4일] 부럽 몽골 중부 원정대',
    price: '699,000원~',
    badge: '특식 3회 포함',
    title: '달군 강돌과 함께 푹 익힌 잡내 제로 정통 양갈비 허르헉 만찬과 불멍 파티!',
    img: './images/khorkhog_feast.jpg',
    tip: '부럽 원정대는 현지 추가금 없이 허르헉·샤슬릭 등 엄선된 특식 3회가 기본 포함되어 있습니다.'
  },
  {
    id: 's5',
    cat: '은하수·스냅',
    agency: '스카이 투어 몽골',
    pcode: 'J8833-W9230-L2860',
    prodName: '[몽골] 사막·온천·천체망원경 3박4일',
    price: '841,464원',
    badge: '천체망원경 관측',
    title: '가이드가 직접 세팅해드리는 천체망원경 별자리 관측과 게르 라이트페인팅 스냅',
    img: './images/starlight_ger_snap.jpg',
    tip: '밤하늘 토성 고리와 달 분화구까지 직접 눈으로 확인하는 특별한 밤을 선물해 드려요.'
  },
  {
    id: 's6',
    cat: '푸르공·스타렉스',
    agency: '밝은 미래 여행',
    pcode: 'E0711-V0341-Z7774',
    prodName: '[몽골] 남고비·테를지 5박6일',
    price: '1,002,400원',
    badge: '남고비 현장',
    title: '끝없는 초원과 사막 경계를 달리는 남고비 오프로드 투어 현장 스케치',
    img: './images/gobi_camp_vans.jpg',
    tip: '차량 내 멀티 충전기와 넉넉한 생수를 매일 기본 비치해 쾌적하게 이동합니다.'
  },
  {
    id: 's7',
    cat: '게르·샤워실',
    agency: '양가투어 (YangGa Friends)',
    pcode: 'E4890-B3318-G7233',
    prodName: '[몽골] 홉스골 5박6일 투어 패키지',
    price: '1,184,000원',
    badge: '홉스골 호수 실사',
    title: '문을 열면 바다 같은 푸른 호수가 펼쳐지는 한여름 홉스골 보트 선셋',
    img: './images/khuvsgul_boat_sunset.jpg',
    tip: '7~8월에도 선선한 가을 날씨라 얇은 경량패딩이나 바람막이를 챙기시면 딱 좋습니다.'
  },
  {
    id: 's8',
    cat: '음식·불멍파티',
    agency: '부럽 몽골원정대 (직영)',
    pcode: 'C3954-E9344-H0474',
    prodName: '[4박5일] 부럽 고비사막 원정대',
    price: '1,150,000원',
    badge: '2030 동행파티',
    title: '처음 만난 동행들과 캠프파이어 둘러앉아 별 보며 건배하는 몽골의 밤',
    img: './images/campfire_cheers.jpg',
    tip: '혼자 오시는 분이 절반 이상! 첫날 저녁 허르헉 파티면 모두 단짝 친구가 됩니다.'
  }
];

/* 7. 적재적소 부럽 자사 연관상품 크로스셀링 (출국 전 필수 준비물 4선) */
const ESSENTIALS_DATA = [
  {
    badge: '평점 ★5.0 · 새벽도착 필수',
    title: '울란바토르 공항 ↔ 시내 호텔 단독 픽업·샌딩',
    desc: '새벽 1~3시 칭기스칸 공항 도착편도 기사님 피켓 미팅으로 안전하고 편하게 숙소까지 이동하세요.',
    priceLabel: '단독차량 1대 특가',
    cta: '공항픽업 예약하기',
    img: './images/vehicle_fleet.jpg',
    url: 'https://www.boolub.com/?pn=product.view&pcode=I3885-I4036-S5377'
  },
  {
    badge: '전 투어 불포함 · 필수가입',
    title: '트래블메딕 해외여행자보험 1분 간편가입',
    desc: '몽골 현지 투어는 여행자보험이 개별 가입 조건입니다. 승마·사막 액티비티 대비 출국 전 꼭 챙기세요.',
    priceLabel: '부럽 제휴 실속보험료',
    cta: '보험료 조회·가입',
    img: './images/companion_team_hands.jpg',
    url: 'https://www.boolub.com/?pn=product.list&cuid=575'
  },
  {
    badge: 'QR 즉시개통 · 로밍특가',
    title: '몽골 고비·초원 데이터 eSIM & 유심 할인전',
    desc: '공항 수령 줄 설 필요 없이 출국 전 QR 스캔 한 번으로 울란바토르 도착 즉시 데이터 연결!',
    priceLabel: '부럽 회원 즉시할인',
    cta: '몽골 eSIM·유심 보기',
    img: './images/starlight_ger_snap.jpg',
    url: 'https://www.boolub.com/?pn=product.list&cuid=555'
  },
  {
    badge: '유심+특식+숙소 올인원',
    title: '따로 챙기기 귀찮다면? 부럽 직영 몽골원정대',
    desc: 'USIM 무료 증정 + 현지 추가금 0원 + 1인 신청도 100% 출발 확정되는 부럽 올인원 패키지',
    priceLabel: '최저 699,000원~',
    cta: '원정대 전용관 이동',
    img: './images/sand_dunes_camp.jpg',
    url: 'https://www.boolub.com/?pn=pages.view&type=pages&data=mgexpedition'
  }
];

/* ================= 권한(Auth) & 백엔드 API 상태 변수 (v5) ================= */
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

let ONBOARD_ITEMS = [
  {
    id: 'ob1',
    company: '어드벤처 몽골 투어 (ADVENTURE MONGOLIA)',
    moktaYn: 'Y',
    contact: '010-8241-**** / 카톡 adv_mn',
    memberId: 'adventure_mn',
    desc: '남고비·중부 전문 / 신형 스타렉스 9대·푸르공 14대 직영 / 홍고린 온수캠프 제휴',
    status: 'pending',
    rdate: '2026-11-16 18:20'
  },
  {
    id: 'ob2',
    company: '고비 스타 글램핑 (GOBI STAR)',
    moktaYn: 'Y',
    contact: '010-5390-**** / 카톡 gobistar',
    memberId: 'gobistar_kr',
    desc: '전 일정 호텔식 침구 및 개별 샤워실 완비 직영 글램핑 캠프 2곳 운영',
    status: 'pending',
    rdate: '2026-11-17 08:45'
  }
];

let curHeroPage = 0;
let curStoreCat = 'all';
let curJoinDate = 'all';
let curRfqFilter = 'all';
let curShowcaseFilter = 'all';
let curAgencyFilter = 'all';
let globalKeyword = '';
let quickFinder = { region: 'all', duration: 'all', style: 'all' };

let partnerAutoTimer = null;
let isPartnerAutoPlaying = true;
let activePartnerName = '노라투어 (NORA TOUR)';
let selectedBidPhoto = { veh: './images/vehicle_fleet.jpg', ger: './images/ger_interior.jpg' };
let selectedShowcaseImg = './images/khorkhog_feast.jpg';
let uploadedShowcaseFile = null;

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

function applyAuthUi() {
  if (AUTH_STATE.isLiveCms) {
    document.body.classList.add('is-live-cms');
  }

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
    const isGuestGroup = (AUTH_STATE.role === 'guest' || AUTH_STATE.role === 'member') && r === 'guest';
    btn.classList.toggle('active', isGuestGroup || AUTH_STATE.role === r);
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
    // 만약 마스터 전용 탭이 열려 있었다면 1번 탭으로 복귀
    const obPane = document.getElementById('ptab-onboard');
    if (obPane && obPane.classList.contains('active')) {
      switchPartnerTab('ptab-quote', document.querySelector('.bl-ptab-btn'));
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
}

function simulateAuthRole(mode) {
  if (mode === 'partner') {
    AUTH_STATE = Object.assign(AUTH_STATE, {
      role: 'partner',
      userId: 'anoratour',
      partnerId: 'anoratour',
      partnerName: '노라투어 (NORA TOUR)'
    });
    applyAuthUi();
    showToast('[권한 확인] 로그인한 입점 파트너(노라투어) 세션이 적용되었습니다. 상단에 파트너사 센터가 활성화됩니다.');
  } else if (mode === 'master') {
    AUTH_STATE = Object.assign(AUTH_STATE, {
      role: 'master',
      userId: 'admin',
      partnerId: 'boolub',
      partnerName: '부럽 몽골원정대 (직영)'
    });
    applyAuthUi();
    showToast('[권한 확인] 부럽 마스터 관리자 세션이 적용되었습니다. 전체 파트너 대행 및 입점 승인 관리가 활성화됩니다.');
  } else {
    AUTH_STATE = Object.assign(AUTH_STATE, {
      role: 'guest',
      userId: '',
      partnerId: '',
      partnerName: ''
    });
    applyAuthUi();
    showToast('[권한 확인] 미로그인·일반 고객 화면입니다. 파트너사 센터가 숨겨지고 [파트너 입점신청] 버튼이 노출됩니다.');
  }
}

/* ================= 유틸리티 & 로고 렌더러 ================= */
function renderPartnerBadgeMedia(ag, size = 46) {
  if (ag.logoImg) {
    return `<img src="${ag.logoImg}" alt="${ag.name} 로고" loading="lazy" />`;
  }
  const c1 = ag.c1 || '#0284c7';
  const c2 = ag.c2 || '#38bdf8';
  const abbr = ag.abbr || ag.name.slice(0, 2);
  return `
    <svg viewBox="0 0 64 64" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" aria-label="${ag.name}">
      <defs>
        <linearGradient id="g_${ag.id}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${c1}" />
          <stop offset="100%" stop-color="${c2}" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#g_${ag.id})" />
      <path d="M12 46 L26 26 L36 39 L44 30 L54 46 Z" fill="rgba(255,255,255,0.22)" />
      <text x="32" y="37" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="800" font-family="SUIT, Pretendard, sans-serif">${abbr}</text>
    </svg>
  `;
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
  filterPageView('all', document.querySelector('#customerSubNav .bl-gnb-item'));
  setTimeout(() => {
    const target = document.getElementById(secId);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 40);
}

/* ================= 헤더 검색 & GNB 섹션 전환 (파트너·마스터 권한 검증 포함) ================= */
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
    if (AUTH_STATE.role === 'master') renderMasterOnboardList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function filterPageView(targetId, btnEl) {
  switchSiteRole('customer');
  document.querySelectorAll('#customerSubNav .bl-gnb-item').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  const secs = document.querySelectorAll('.page-sec');
  secs.forEach(sec => {
    sec.style.display = (targetId === 'all' || sec.id === targetId) ? '' : 'none';
  });
  if (targetId !== 'all') {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function handleGlobalSearch(val) {
  globalKeyword = (val || '').trim().toLowerCase();
  renderStoreProducts();
  renderJoinCards();
  renderRfqBoard();
  renderShowcase();
  renderPartnerSection();
}

/* ================= 히어로 슬라이더 & 3초 맞춤 투어 찾기 ================= */
function renderHeroBanners() {
  const grid = document.getElementById('heroBannerGrid');
  const counter = document.getElementById('heroCounterText');
  if (!grid) return;
  const cards = HERO_PAGES[curHeroPage] || HERO_PAGES[0];
  if (counter) counter.textContent = `${curHeroPage + 1} / ${HERO_PAGES.length}`;

  grid.innerHTML = cards.map((c, idx) => `
    <article class="bl-hero-card" data-hidx="${idx}">
      <img src="${c.img}" alt="${c.title.replace(/\n/g, ' ')}" />
      <div class="bl-hero-txt">
        <span class="bl-hero-eyebrow">${c.eyebrow}</span>
        <h2 class="bl-hero-title">${c.title.replace(/\n/g, '<br/>')}</h2>
        <p class="bl-hero-sub">${c.sub}</p>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('.bl-hero-card').forEach(el => {
    el.addEventListener('click', () => {
      const idx = Number(el.getAttribute('data-hidx'));
      if (cards[idx] && cards[idx].action) cards[idx].action();
    });
  });
}

function slideHero(dir) {
  curHeroPage = (curHeroPage + dir + HERO_PAGES.length) % HERO_PAGES.length;
  renderHeroBanners();
}

function applyQuickFinder(shouldScroll = false) {
  quickFinder.region = document.getElementById('findRegion')?.value || 'all';
  quickFinder.duration = document.getElementById('findDuration')?.value || 'all';
  quickFinder.style = document.getElementById('findStyle')?.value || 'all';

  renderStoreProducts();
  renderJoinCards();

  if (shouldScroll) {
    const targetId = quickFinder.style === '조인' ? 'sec-join' : 'sec-store';
    const sec = document.getElementById(targetId);
    if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    showToast('선택하신 조건에 맞는 부럽 투어 및 동행·조인 팀을 필터링했습니다.');
  }
}

function resetQuickFinder() {
  const r = document.getElementById('findRegion');
  const d = document.getElementById('findDuration');
  const s = document.getElementById('findStyle');
  if (r) r.value = 'all';
  if (d) d.value = 'all';
  if (s) s.value = 'all';
  quickFinder = { region: 'all', duration: 'all', style: 'all' };
  globalKeyword = '';
  const gInput = document.getElementById('globalSearchInput');
  if (gInput) gInput.value = '';
  renderStoreProducts();
  renderJoinCards();
  renderRfqBoard();
  renderShowcase();
  renderPartnerSection();
  showToast('모든 검색 조건이 초기화되었습니다.');
}

/* ================= 섹션 1: 부럽 실제 판매 투어 스토어 & 미리보기 모달 ================= */
function filterStoreCat(cat, btnEl) {
  curStoreCat = cat;
  document.querySelectorAll('#storeChipRow .bl-chip').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderStoreProducts();
}

function renderStoreProducts() {
  const grid = document.getElementById('productStoreGrid');
  if (!grid) return;

  const list = DIRECT_PRODUCTS.filter(p => {
    if (curStoreCat !== 'all' && p.cat !== curStoreCat) return false;
    if (quickFinder.region !== 'all' && p.regionKey !== quickFinder.region) return false;
    if (quickFinder.duration !== 'all') {
      if (quickFinder.duration === '5박6일') {
        if (!p.title.includes('5박6일') && !p.title.includes('6박7일')) return false;
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
      <div style="grid-column:1/-1; padding:36px 20px; text-align:center; background:var(--bl-gray-50); border-radius:12px; border:1px dashed var(--bl-gray-200);">
        <strong style="font-size:15px; color:var(--bl-gray-900);">선택하신 조건과 정확히 일치하는 즉시확정 상품이 없습니다.</strong>
        <p style="font-size:13px; color:var(--bl-gray-500); margin:6px 0 14px;">원하시는 일정을 남겨주시면 부럽 공식 파트너사들이 1:1 맞춤 견적을 보내드립니다!</p>
        <div style="display:flex; justify-content:center; gap:8px;">
          <button type="button" class="bl-btn bl-btn-outline bl-btn-sm" onclick="resetQuickFinder()">조건 전체보기</button>
          <button type="button" class="bl-btn bl-btn-point bl-btn-sm" onclick="openModal('rfqWizardModal')">내 일정으로 맞춤견적 신청</button>
        </div>
      </div>
    `;
    return;
  }

  grid.innerHTML = list.map(p => `
    <article class="bl-item-box" onclick="openProductPreviewModal('${p.pcode}')">
      <div class="bl-item-thumb">
        <img src="${p.img}" alt="${p.title}" loading="lazy" />
        <span class="bl-item-tag">${p.tag}</span>
      </div>
      <div class="bl-item-info">
        <div class="bl-item-sub">${p.sub}</div>
        <h4 class="bl-item-name">${p.title}</h4>
        <div class="bl-item-meta">
          <i class="xi-star"></i>
          <span>${p.rating}</span>
          <span style="color:var(--bl-gray-400);">(${p.reviews})</span>
        </div>
        <div class="bl-price-origin">정가 ${p.originPrice}</div>
        <div class="bl-item-price" style="margin-top:2px;">
          <span class="bl-item-discount">${p.discount}</span>
          <span class="bl-item-won">${p.price}</span>
        </div>
      </div>
    </article>
  `).join('');
}

function openProductPreviewModal(pcode) {
  const prod = DIRECT_PRODUCTS.find(x => x.pcode === pcode) || DIRECT_PRODUCTS[0];
  const liveUrl = `https://www.boolub.com/?pn=product.view&pcode=${prod.pcode}`;
  const partnerUrl = prod.pid === 'boolub'
    ? 'https://www.boolub.com/?pn=pages.view&type=pages&data=mgexpedition'
    : `https://www.boolub.com/?pn=partner.view&pid=${prod.pid}`;

  const titleEl = document.getElementById('prodModalTitle');
  const bodyEl = document.getElementById('prodModalBody');
  if (titleEl) titleEl.textContent = '부럽 공식 판매 투어 상세 및 쿠폰 혜택';

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
              <div style="font-size:11.5px; color:var(--bl-gray-500); text-decoration:line-through;">정가 ${prod.originPrice}</div>
              <div style="font-size:12px; font-weight:700; color:var(--bl-point-text);">부럽 쿠폰 적용 특가</div>
            </div>
            <div style="text-align:right;">
              <span style="font-size:16px; font-weight:800; color:var(--bl-point-text); margin-right:4px;">${prod.discount}</span>
              <strong style="font-size:21px; font-weight:800; color:var(--bl-gray-900);">${prod.price}</strong>
            </div>
          </div>

          <ul style="margin-top:12px; display:grid; gap:6px; font-size:13px; color:var(--bl-gray-700);">
            ${prod.highlights.map(h => `<li><i class="xi-check-min" style="color:var(--bl-point-dark); font-weight:700;"></i> ${h}</li>`).join('')}
          </ul>
        </div>
      </div>

      <!-- 부럽 연관 필수상품 자연스러운 체크박스 추천 (크로스셀링 핵심 구간) -->
      <div style="margin-top:18px; padding:14px 16px; border-radius:12px; background:var(--bl-gray-50); border:1px solid var(--bl-gray-200);">
        <div style="font-size:13px; font-weight:800; color:var(--bl-gray-900); margin-bottom:8px;">
          <i class="xi-briefcase" style="color:var(--bl-point-dark);"></i> 이 투어 예약 고객님이 부럽에서 함께 챙긴 필수 준비물
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
          <a href="https://www.boolub.com/?pn=product.view&pcode=I3885-I4036-S5377" target="_blank" rel="noopener" style="padding:9px 12px; background:#fff; border-radius:8px; border:1px solid var(--bl-gray-200); display:flex; justify-content:space-between; align-items:center; font-size:12.5px;">
            <span><strong>울란바토르 공항 단독픽업</strong> (평점 ★5.0)</span>
            <span style="color:var(--bl-point-text); font-weight:700;">함께보기 <i class="xi-external-link"></i></span>
          </a>
          <a href="https://www.boolub.com/?pn=product.list&cuid=575" target="_blank" rel="noopener" style="padding:9px 12px; background:#fff; border-radius:8px; border:1px solid var(--bl-gray-200); display:flex; justify-content:space-between; align-items:center; font-size:12.5px;">
            <span><strong>트래블메딕 해외여행자보험</strong> (필수가입)</span>
            <span style="color:var(--bl-point-text); font-weight:700;">1분 가입 <i class="xi-external-link"></i></span>
          </a>
        </div>
      </div>

      <div style="margin-top:18px; display:flex; gap:8px; justify-content:flex-end; flex-wrap:wrap;">
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

/* ================= 섹션 2: 실시간 동행·조인 & 1/N 분할결제 ================= */
function renderJoinCalendar() {
  const cal = document.getElementById('joinCalGrid');
  if (!cal) return;
  cal.innerHTML = JOIN_CAL_DAYS.map(d => `
    <button type="button" class="bl-cal-item ${curJoinDate === d.key ? 'active' : ''}" onclick="filterJoinByDate('${d.key}')">
      <span class="d-num">${d.label}</span>
      <span class="bl-cal-dot ${d.cls}">${d.badge}</span>
    </button>
  `).join('');
}

function filterJoinByDate(dateKey) {
  curJoinDate = dateKey;
  renderJoinCalendar();
  renderJoinCards();
}

function setSimPax(pax, btnEl) {
  document.querySelectorAll('.bl-pax-tab').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  const map = {
    3: { label: '3명 모임 시 1인 예상 투어비', krw: '1,110,000원', diff: '(1인 추가 합류 시 전원 즉시 인하)' },
    4: { label: '4명 출발확정 시 전원 1인 부담금', krw: '940,000원', diff: '(3인 대비 1인당 17만 원 절약)' },
    5: { label: '5명 합류 시 전원 1인 부담금', krw: '820,000원', diff: '(3인 대비 1인당 29만 원 절약)' },
    6: { label: '6명 마감 시 전원 최저 투어비', krw: '740,000원', diff: '(3인 대비 1인당 37만 원 절약!)' }
  };
  const info = map[pax] || map[5];
  const l = document.getElementById('simDescLabel');
  const k = document.getElementById('simKrwText');
  const u = document.getElementById('simUsdText');
  if (l) l.textContent = info.label;
  if (k) k.textContent = info.krw;
  if (u) u.textContent = info.diff;
}

function renderJoinCards() {
  const grid = document.getElementById('joinCardsGrid');
  if (!grid) return;

  const list = JOIN_ITEMS.filter(j => {
    if (curJoinDate !== 'all' && j.dateKey !== curJoinDate) return false;
    if (quickFinder.region !== 'all' && j.regionKey !== quickFinder.region) return false;
    if (quickFinder.duration !== 'all' && j.durationKey !== quickFinder.duration) return false;
    if (quickFinder.style === '원정대' && j.styleKey !== '원정대') return false;
    if (globalKeyword) {
      const hay = `${j.title} ${j.agency} ${j.tags}`.toLowerCase();
      if (!hay.includes(globalKeyword)) return false;
    }
    return true;
  });

  if (!list.length) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; padding:32px; text-align:center; background:var(--bl-gray-50); border-radius:12px; border:1px dashed var(--bl-gray-200);">
        <strong style="font-size:15px; color:var(--bl-gray-900);">선택하신 날짜·조건에 모집 중인 조인 팀이 아직 없습니다.</strong>
        <p style="font-size:13px; color:var(--bl-gray-500); margin:6px 0 14px;">직접 동행 모집글을 올리시거나, 1인 신청도 100% 출발 확정되는 부럽 몽골원정대를 확인해보세요!</p>
        <div style="display:flex; justify-content:center; gap:8px;">
          <button type="button" class="bl-btn bl-btn-outline bl-btn-sm" onclick="filterJoinByDate('all'); resetQuickFinder();">전체 조인팀 보기</button>
          <button type="button" class="bl-btn bl-btn-soft bl-btn-sm" onclick="openModal('companionWriteModal')">동행 모집글 첫 등록하기</button>
          <button type="button" class="bl-btn bl-btn-point bl-btn-sm" onclick="openProductPreviewModal('T0950-Q2923-W2496')">1인 출발확정 원정대 보기</button>
        </div>
      </div>
    `;
    return;
  }

  grid.innerHTML = list.map(j => `
    <article class="bl-join-card">
      <div>
        <div class="bl-join-thumb" onclick="openJoinDetailModal('${j.id}')">
          <img src="${j.img}" alt="${j.title}" loading="lazy" />
          <div class="bl-join-badges">
            <span class="bl-badge-solid ${j.statusCls}">${j.statusBadge}</span>
            <span class="bl-badge-solid ${j.subCls}">${j.subBadge}</span>
          </div>
        </div>
        <div class="bl-join-body">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="bl-join-agency">${j.agency}</span>
            <span style="font-size:12px; font-weight:700; color:var(--bl-gray-700);">${j.dateStr}</span>
          </div>
          <h4 class="bl-join-title" onclick="openJoinDetailModal('${j.id}')">${j.title}</h4>
          <div style="font-size:12px; color:var(--bl-gray-500);">${j.tags}</div>
          <div class="bl-seat-pills">
            ${j.seats.map(s => `<span class="bl-seat ${s === '빈좌석' ? 'open' : 'filled'}">${s}</span>`).join('')}
          </div>
        </div>
      </div>
      <div style="padding:0 16px 16px;">
        <div class="bl-join-price-row">
          <div>
            <div style="font-size:11px; color:var(--bl-gray-500);">현재 ${j.filled}/${j.max}명 · 6인 마감 시 <strong style="color:var(--bl-point-text);">${j.fullPrice}</strong></div>
            <strong style="font-size:17px; font-weight:800; color:var(--bl-gray-900);">${j.curPrice}</strong>
          </div>
          <button type="button" class="bl-btn bl-btn-point bl-btn-sm" onclick="openJoinDetailModal('${j.id}')">
            합류·상세보기
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

function openJoinDetailModal(joinId) {
  const item = JOIN_ITEMS.find(x => x.id === joinId) || JOIN_ITEMS[0];
  const body = document.getElementById('joinModalBody');
  const prodLink = item.pcode
    ? `https://www.boolub.com/?pn=product.view&pcode=${item.pcode}`
    : 'https://www.boolub.com/?pn=pages.view&type=pages&data=mgexpedition';

  if (body) {
    body.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
        <span class="bl-mokta-tag">${item.agency} · ${item.statusBadge}</span>
        <span style="font-size:13px; font-weight:700; color:var(--bl-gray-700);"><i class="xi-calendar"></i> ${item.dateStr}</span>
      </div>
      <h3 style="font-size:18px; font-weight:800; color:var(--bl-gray-900); margin-bottom:14px;">${item.title}</h3>

      <div style="padding:14px; border-radius:12px; background:var(--bl-gray-50); border:1px solid var(--bl-gray-200); margin-bottom:16px;">
        <div style="font-size:13px; font-weight:700; margin-bottom:8px;">실시간 차량 탑승 현황 (${item.filled}명 확정 / ${item.max}인 정원)</div>
        <div class="bl-seat-pills">
          ${item.seats.map(s => `<span class="bl-seat ${s === '빈좌석' ? 'open' : 'filled'}" style="padding:8px 4px; font-size:12px;">${s}</span>`).join('')}
        </div>
        <p style="font-size:12px; color:var(--bl-gray-500); margin-top:10px;">
          · 총무에게 현금을 송금할 필요 없이 부럽 안심결제로 본인 몫만 카드 결제합니다.<br/>
          · 출발 전 추가 인원이 합류하여 6인 마감될 경우, 먼저 결제하신 분들도 전원 <strong>${item.fullPrice}</strong> 기준으로 차액이 자동 환급됩니다.
        </p>
      </div>

      <div style="padding:12px 14px; border-radius:10px; background:var(--bl-point-bg); border:1px solid var(--bl-point-line); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <div>
          <strong style="font-size:13px; color:var(--bl-point-text);">원하는 출발일이 조금 다르신가요?</strong>
          <div style="font-size:12px; color:var(--bl-gray-700);">1인 예약도 취소 없이 무조건 출발하는 부럽 직영 몽골원정대 전 일정을 확인해보세요.</div>
        </div>
        <a href="https://www.boolub.com/?pn=pages.view&type=pages&data=mgexpedition" target="_blank" rel="noopener" class="bl-btn bl-btn-outline bl-btn-sm" style="background:#fff;">
          원정대 일정표 보기
        </a>
      </div>

      <div style="margin-top:18px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <div>
          <span style="font-size:12px; color:var(--bl-gray-500);">현재 합류 시 1인 결제금</span>
          <strong style="display:block; font-size:20px; font-weight:800; color:var(--bl-gray-900);">${item.curPrice}</strong>
        </div>
        <div style="display:flex; gap:8px;">
          <button type="button" class="bl-btn bl-btn-soft" onclick="confirmJoinSeat('${item.id}')">
            빈 좌석 합류 신청하기
          </button>
          <a href="${prodLink}" target="_blank" rel="noopener" class="bl-btn bl-btn-point">
            연결된 부럽 투어 상품 보기 <i class="xi-external-link"></i>
          </a>
        </div>
      </div>
    `;
  }
  openModal('joinDetailModal');
}

async function confirmJoinSeat(joinId) {
  if (API_BASE) {
    const res = await moktaApiCall('ajax.mokta.join.pro.php', { _mode: 'apply_seat', join_id: joinId });
    if (res && !res.ok) {
      if (res.requireLogin) {
        location.href = '/?pn=member.login.form&_rurl=' + encodeURIComponent('/?pn=pages.view&type=pages&data=mokta');
        return;
      }
      showToast(res.message || '좌석 합류 처리 중 오류가 발생했습니다.');
      return;
    }
  }
  const item = JOIN_ITEMS.find(x => String(x.id) === String(joinId));
  if (item && item.filled < item.max) {
    const openIdx = item.seats.indexOf('빈좌석');
    if (openIdx !== -1) item.seats[openIdx] = '신규합류';
    item.filled += 1;
    item.subBadge = item.filled >= item.max ? '모집마감' : `${item.max - item.filled}자리 남음`;
    renderJoinCards();
  }
  closeModal('joinDetailModal');
  showToast('동행·조인 합류 신청이 접수되었습니다! 부럽 알림톡으로 개별 카드결제 링크가 발송됩니다.');
}

async function submitCompanionPost() {
  const dateStr = document.getElementById('cwDate')?.value || '9.05(토) ~ 9.09(수) · 4박5일';
  const curCnt = parseInt(document.getElementById('cwSeats')?.value || '2', 10);
  const title = document.getElementById('cwTitle')?.value || '9월 고비사막 같이 가실 동행 구해요!';
  const tags = document.getElementById('cwTags')?.value || '2030 또래 · 비흡연 환영';

  let newId = 'j_' + Date.now();
  if (API_BASE) {
    const res = await moktaApiCall('ajax.mokta.join.pro.php', {
      _mode: 'add_member_join',
      date_str: dateStr,
      cur_pax: curCnt,
      max_pax: 6,
      title,
      tags
    });
    if (res && !res.ok) {
      if (res.requireLogin) {
        location.href = '/?pn=member.login.form&_rurl=' + encodeURIComponent('/?pn=pages.view&type=pages&data=mokta');
        return;
      }
      showToast(res.message || '동행글 등록에 실패했습니다.');
      return;
    }
    if (res && res.id) newId = res.id;
  }

  const seats = Array.from({ length: 6 }, (_, i) => (i < curCnt ? (i === 0 ? '방장(나)' : `확정${i + 1}`) : '빈좌석'));
  const assetPrefix = (typeof window !== 'undefined' && window.BOOLUB_MOKTA_ASSET_BASE)
    ? window.BOOLUB_MOKTA_ASSET_BASE.replace(/\/$/, '')
    : '.';

  JOIN_ITEMS.unshift({
    id: newId,
    dateKey: '09-05',
    dateStr,
    regionKey: '고비',
    durationKey: '4박5일',
    styleKey: '조인',
    statusBadge: '신규 동행모집',
    statusCls: 'amber',
    subBadge: `${6 - curCnt}자리 모집중`,
    subCls: 'sky',
    agency: '파트너 전담매칭 대기중',
    pcode: 'C3954-E9344-H0474',
    title,
    img: `${assetPrefix}/images/companion_team_hands.jpg`,
    filled: curCnt,
    max: 6,
    seats,
    curPrice: '견적 매칭중',
    fullPrice: '790,000원~',
    tags
  });

  curJoinDate = 'all';
  renderJoinCalendar();
  renderJoinCards();
  closeModal('companionWriteModal');
  scrollToSection('sec-join');
  showToast('동행 모집글이 등록되었습니다! 희망 코스에 맞는 공식 파트너사 제안도 함께 받아보실 수 있습니다.');
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
    const logos = r.quotes.slice(0, 4).map(q => `<img src="${q.logo || './images/boolub_logo.png'}" alt="${q.agency}" />`).join('');
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
        location.href = '/?pn=member.login.form&_rurl=' + encodeURIComponent('/?pn=pages.view&type=pages&data=mokta');
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
        logo: `${assetPrefix}/images/boolub_logo.png`,
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
  renderRfqBoard();
  populatePartnerRfqSelect();
  closeModal('rfqWizardModal');
  scrollToSection('sec-rfq');
  showToast('맞춤견적 요청이 등록되었습니다! 파트너사 견적이 도착하면 카카오 알림톡으로 안내해 드립니다.');
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
                    <img src="${q.logo || './images/boolub_logo.png'}" alt="${q.agency}" style="width:28px; height:28px; border-radius:50%; object-fit:contain; border:1px solid var(--bl-gray-200); background:#fff;" />
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

  grid.innerHTML = list.map(s => `
    <article class="bl-explore-card" onclick="openShowcaseModal('${s.id}')">
      <img src="${s.img}" alt="${s.title}" class="bg-photo" loading="lazy" />
      <div class="bl-explore-top">
        <span class="bl-glass-pill"><i class="xi-check-circle"></i> ${s.agency}</span>
        <span class="bl-glass-pill">${s.badge}</span>
      </div>
      <div class="bl-explore-txt">
        <em>${s.cat}</em>
        <strong>${s.title}</strong>
        <span>연결상품: ${s.prodName} (${s.price})</span>
      </div>
      <div class="bl-explore-arrow"><i class="xi-angle-right-min"></i></div>
    </article>
  `).join('');
}

function openShowcaseModal(id) {
  const s = SHOWCASE_ITEMS.find(x => x.id === id) || SHOWCASE_ITEMS[0];
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
            <strong>현지 매니저 TIP:</strong> ${s.tip}
          </p>

          <div style="margin-top:14px; padding:12px 14px; border-radius:10px; border:1px solid var(--bl-point-line); background:var(--bl-point-bg);">
            <div style="font-size:11.5px; font-weight:700; color:var(--bl-point-text);">이 사진 속 캠프·차량을 이용하는 부럽 실제 투어</div>
            <strong style="display:block; font-size:14px; color:var(--bl-gray-900); margin-top:2px;">${s.prodName}</strong>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
              <strong style="font-size:16px; color:var(--bl-gray-900);">${s.price}</strong>
              <button type="button" class="bl-btn bl-btn-point bl-btn-sm" onclick="closeModal('reelModal'); openProductPreviewModal('${s.pcode}')">
                투어 상세·쿠폰 보기 <i class="xi-angle-right-min"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  openModal('reelModal');
}

/* ================= 섹션 5: 20개 공식 파트너 로고 마키 & 가로 캐러셀 ================= */
function filterAgencies(cat, btnEl) {
  curAgencyFilter = cat;
  const row = btnEl?.parentElement;
  if (row) row.querySelectorAll('.bl-chip').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderPartnerSection();
}

function getFilteredAgencies() {
  return MOKTA_AGENCIES.filter(ag => {
    if (curAgencyFilter === 'active' && ag.statusType !== 'active') return false;
    if (curAgencyFilter === 'mokta_soon' && ag.statusType !== 'mokta_soon') return false;
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
  if (!marqueeTrack || !cardsTrack) return;

  const list = getFilteredAgencies();
  const marqueeSource = list.length >= 6 ? list : MOKTA_AGENCIES;
  const doubled = [...marqueeSource, ...marqueeSource];

  marqueeTrack.innerHTML = doubled.map(ag => `
    <div class="bl-logo-chip" onclick="openAgencyHomeModal('${ag.id}')">
      <div class="bl-logo-chip-svg">${renderPartnerBadgeMedia(ag, 34)}</div>
      <div class="bl-logo-chip-meta">
        <strong>${ag.name}</strong>
        <span>
          ${ag.statusType === 'active'
            ? `<i class="xi-star"></i> ${ag.rating} · 즉시예약 가능`
            : `MOKTA 정회원 · 입점진행`}
        </span>
      </div>
    </div>
  `).join('');

  cardsTrack.innerHTML = list.map(ag => `
    <article class="bl-partner-card">
      <div>
        <div class="bl-pcard-cover" onclick="openAgencyHomeModal('${ag.id}')">
          <img src="${ag.cover}" alt="${ag.name}" class="cover-img" loading="lazy" />
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
            <div class="en-name">${ag.en}</div>
          </div>

          <p class="bl-pcard-desc">${ag.desc}</p>

          <div class="bl-pcard-metrics">
            <div><span>응답·확정</span><strong>${ag.resp}</strong></div>
            <div><span>주력차량</span><strong>${ag.fleet.slice(0, 9)}</strong></div>
            <div><span>숙소품질</span><strong>${ag.camp.slice(0, 9)}</strong></div>
          </div>

          <div class="bl-partner-thumbs">
            ${ag.photos.map(ph => `<img src="${ph}" alt="${ag.name} 현장실사" loading="lazy" />`).join('')}
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

function openAgencyHomeModal(agId) {
  const ag = MOKTA_AGENCIES.find(x => x.id === agId) || MOKTA_AGENCIES[0];
  const partnerProds = DIRECT_PRODUCTS.filter(p => ag.storeUrl && ag.storeUrl.includes(p.pid) || (ag.id === 'ag1' && p.pid === 'boolub'));
  const titleEl = document.getElementById('agencyModalTitle');
  const bodyEl = document.getElementById('agencyModalBody');
  if (titleEl) titleEl.textContent = `${ag.name} · 공식 브랜드 미니홈`;

  if (bodyEl) {
    bodyEl.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; gap:14px; flex-wrap:wrap; padding-bottom:16px; border-bottom:1px solid var(--bl-gray-100);">
        <div style="display:flex; align-items:center; gap:14px;">
          <div style="width:64px; height:64px; border-radius:16px; border:1px solid var(--bl-gray-200); padding:4px; background:#fff; display:flex; align-items:center; justify-content:center; overflow:hidden;">
            ${renderPartnerBadgeMedia(ag, 54)}
          </div>
          <div>
            <span class="bl-mokta-tag">${ag.cert}</span>
            <h3 style="font-size:20px; font-weight:800; color:var(--bl-gray-900); margin-top:4px;">${ag.name} <span style="font-size:12px; font-weight:600; color:var(--bl-gray-400);">${ag.en}</span></h3>
            <div style="font-size:13px; color:var(--bl-gray-700); margin-top:2px;">
              <i class="xi-star" style="color:var(--bl-star);"></i> <strong>${ag.rating}</strong> (누적 후기 ${ag.reviews}건) · 보유차량: ${ag.fleet} · 숙소: ${ag.camp}
            </div>
          </div>
        </div>
        <div style="display:flex; gap:8px;">
          <button type="button" class="bl-btn bl-btn-soft bl-btn-sm" onclick="closeModal('agencyHomeModal'); prefillRfqFromCourse('${ag.name} 1:1 지정 맞춤견적 요청')">
            1:1 지정견적 요청
          </button>
          ${ag.storeUrl ? `
            <a href="${ag.storeUrl}" target="_blank" rel="noopener" class="bl-btn bl-btn-point bl-btn-sm">
              부럽 파트너 스토어 바로가기 <i class="xi-external-link"></i>
            </a>
          ` : ''}
        </div>
      </div>

      <p style="margin:14px 0; font-size:13.5px; color:var(--bl-gray-700); line-height:1.6;">${ag.desc}</p>

      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:10px; margin-bottom:18px;">
        ${ag.photos.map(ph => `<img src="${ph}" alt="${ag.name}" style="width:100%; aspect-ratio:16/10; object-fit:cover; border-radius:10px;" />`).join('')}
      </div>

      ${partnerProds.length ? `
        <div>
          <h4 style="font-size:15px; font-weight:800; margin-bottom:10px;">현재 부럽에서 바로 예약 가능한 ${ag.name} 대표 투어</h4>
          <div style="display:grid; gap:8px;">
            ${partnerProds.map(p => `
              <div style="padding:12px 14px; border-radius:10px; border:1px solid var(--bl-gray-200); display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap;">
                <div>
                  <span class="bl-mokta-tag" style="margin-right:6px;">${p.tag}</span>
                  <strong style="font-size:14px; color:var(--bl-gray-900);">${p.title}</strong>
                </div>
                <div style="display:flex; align-items:center; gap:10px;">
                  <strong style="font-size:15px; color:var(--bl-point-text);">${p.price}</strong>
                  <a href="https://www.boolub.com/?pn=product.view&pcode=${p.pcode}" target="_blank" rel="noopener" class="bl-btn bl-btn-point bl-btn-sm">
                    예약하기 <i class="xi-external-link"></i>
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : `
        <div style="padding:16px; border-radius:10px; background:var(--bl-gray-50); border:1px solid var(--bl-gray-200); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <strong style="font-size:14px; color:var(--bl-gray-900);">몽골한국관광협회(MOKTA) 공식 제휴 입점 진행 중인 회원사입니다.</strong>
            <p style="font-size:12.5px; color:var(--bl-gray-500); margin-top:2px;">사전 맞춤견적 문의를 남겨주시면 입점 완료 즉시 알림 및 동일 등급 파트너 견적을 함께 안내해 드립니다.</p>
          </div>
          <button type="button" class="bl-btn bl-btn-point bl-btn-sm" onclick="closeModal('agencyHomeModal'); openModal('partnerApplyModal');">
            파트너 입점신청 안내
          </button>
        </div>
      `}
    `;
  }
  openModal('agencyHomeModal');
}

/* ================= 섹션 6: 부럽 필수 준비물 크로스셀링 렌더 ================= */
function renderEssentials() {
  const grid = document.getElementById('essentialsGrid');
  if (!grid) return;
  grid.innerHTML = ESSENTIALS_DATA.map(e => `
    <a href="${e.url}" target="_blank" rel="noopener" class="bl-essential-card">
      <div>
        <div class="bl-ess-top">
          <img src="${e.img}" alt="${e.title}" class="bl-ess-img" loading="lazy" />
          <div>
            <span class="bl-mokta-tag" style="margin-bottom:4px;">${e.badge}</span>
            <strong style="display:block; font-size:14.5px; color:var(--bl-gray-900); line-height:1.35;">${e.title}</strong>
          </div>
        </div>
        <p style="font-size:12.5px; color:var(--bl-gray-500); line-height:1.5; margin-top:10px;">${e.desc}</p>
      </div>
      <div style="padding-top:10px; border-top:1px solid var(--bl-gray-100); display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:12.5px; font-weight:800; color:var(--bl-point-text);">${e.priceLabel}</span>
        <span style="font-size:12.5px; font-weight:700; color:var(--bl-gray-900);">${e.cta} <i class="xi-angle-right-min"></i></span>
      </div>
    </a>
  `).join('');
}

/* ================= 파트너사 전용 센터 (파트너·마스터 권한 전용) ================= */
function switchPartnerTab(paneId, btnEl) {
  if (!canAccessPartnerConsole()) return;
  if (paneId === 'ptab-onboard' && AUTH_STATE.role !== 'master') {
    showToast('입점신청 승인 관리는 마스터 계정 전용 메뉴입니다.');
    return;
  }
  document.querySelectorAll('.bl-ptab-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  document.querySelectorAll('.bl-ptab-pane').forEach(p => p.classList.toggle('active', p.id === paneId));
}

function changeActivePartnerAccount(val) {
  if (AUTH_STATE.role !== 'master') {
    showToast('본인 파트너 계정으로만 이용 가능합니다.');
    return;
  }
  activePartnerName = val;
  showToast(`[MASTER] 대행·관리 대상 파트너가 [${val}]로 전환되었습니다.`);
}

function toggleMongolianMode() {
  document.body.classList.toggle('show-mn');
  const on = document.body.classList.contains('show-mn');
  const btn = document.getElementById('mnToggleBtn');
  if (btn) {
    btn.innerHTML = on
      ? '<i class="xi-globus"></i> 한국어 단독 표시로 전환'
      : '<i class="xi-globus"></i> 한·몽 병기 켜기 (현지 직원용)';
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
  const logoMap = {
    '부럽 몽골원정대': { logo: `${assetPrefix}/images/boolub_logo.png`, pid: 'boolub', pcode: 'T0950-Q2923-W2496' },
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
    : { logo: `${assetPrefix}/images/boolub_logo.png`, pid: AUTH_STATE.partnerId || 'doittavel', pcode: 'G8231-V9289-H9933' };
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
      pcode: meta.pcode,
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
    pcode: meta.pcode,
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
  const dateStr = document.getElementById('pjDate')?.value || '8.15(토) ~ 8.19(수) · 4박5일';
  const filled = parseInt(document.getElementById('pjSeats')?.value || '4', 10);
  const title = document.getElementById('pjTitle')?.value || '[출발확정] 고비사막 4박5일 오픈조인 잔여석 모집';
  const curPrice = document.getElementById('pjCurPrice')?.value || '890,000원';
  const fullPrice = document.getElementById('pjFullPrice')?.value || '780,000원';
  const meta = resolvePartnerMetaByName(activePartnerName);

  let newJoinId = 'pj_' + Date.now();
  if (API_BASE) {
    const res = await moktaApiCall('ajax.mokta.join.pro.php', {
      _mode: 'add_partner_join',
      target_pid: meta.pid,
      target_agency: activePartnerName,
      pcode: meta.pcode,
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
    dateKey: '08-15',
    dateStr,
    regionKey: '고비',
    durationKey: '4박5일',
    styleKey: '조인',
    statusBadge: '파트너 출발확정',
    statusCls: 'sky',
    subBadge: `${6 - filled}자리 남음!`,
    subCls: 'coral',
    agency: activePartnerName,
    pcode: meta.pcode,
    title,
    img: `${assetPrefix}/images/gobi_camp_vans.jpg`,
    filled,
    max: 6,
    seats,
    curPrice,
    fullPrice,
    tags: '출발 100% 확정 차량 · 1/N 각자 카드결제 · 차액 자동환급'
  });

  curJoinDate = 'all';
  renderJoinCalendar();
  renderJoinCards();
  switchSiteRole('customer');
  scrollToSection('sec-join');
  showToast(`[${activePartnerName}] 출발확정 오픈조인 잔여석이 실시간 보드 최상단에 등록되었습니다!`);
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
    if (Array.isArray(data.rfqs) && data.rfqs.length) {
      RFQ_ITEMS.splice(0, RFQ_ITEMS.length, ...data.rfqs);
    }
    if (Array.isArray(data.joins) && data.joins.length) {
      JOIN_ITEMS.splice(0, JOIN_ITEMS.length, ...data.joins);
    }
    if (Array.isArray(data.stories) && data.stories.length) {
      SHOWCASE_ITEMS.splice(0, SHOWCASE_ITEMS.length, ...data.stories);
    }
    if (Array.isArray(data.onboardList)) {
      ONBOARD_ITEMS = data.onboardList;
    }

    applyAuthUi();
    renderStoreProducts();
    renderJoinCards();
    renderRfqBoard();
    renderShowcase();
    renderPartnerSection();
    populatePartnerRfqSelect();
  } catch (err) {
    console.warn('[MOKTA Init Fallback]', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof window !== 'undefined' && window.BOOLUB_MOKTA_ASSET_BASE) {
    const base = window.BOOLUB_MOKTA_ASSET_BASE.replace(/\/$/, '');
    [HERO_PAGES, DIRECT_PRODUCTS, MOKTA_AGENCIES, JOIN_ITEMS, RFQ_ITEMS, SHOWCASE_ITEMS, ESSENTIALS_DATA, selectedBidPhoto].forEach(d => applyExternalAssetBase(d, base));
    if (selectedShowcaseImg.startsWith('./images/')) {
      selectedShowcaseImg = base + selectedShowcaseImg.slice(1);
    }
  }
  applyAuthUi();
  renderHeroBanners();
  renderStoreProducts();
  renderJoinCalendar();
  renderJoinCards();
  renderRfqBoard();
  renderShowcase();
  renderPartnerSection();
  renderEssentials();
  populatePartnerRfqSelect();
  bindPartnerSliderEvents();
  startPartnerAutoSlide();
  hydrateFromLiveBackend();
});
