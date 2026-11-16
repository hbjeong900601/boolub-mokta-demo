// =========================================================================
// BOOLUB × MOKTA 몽골 공식 플랫폼 — 부럽 메인(waug.css) UI/UX 동기화 엔진
// =========================================================================

const HERO_SLIDES = [
  {
    eyebrow: 'MOKTA 역경매 오픈',
    title: '일정만 올리면 32개 검증 업체가<br>실사 견적을 제안해요',
    sub: '러브몽골식 맞춤 견적 · 최대 6개 정회원사 깔끔 비교',
    img: './images/milkyway_gobi.jpg',
    action: () => openModal('rfqWizardModal')
  },
  {
    eyebrow: '출발확정 오픈조인',
    title: '혼자 가도 걱정 끝!<br>모일수록 할인되는 1/N 조인',
    sub: '몽.자.가식 실시간 좌석 매칭 · 총무 없는 각자 카드결제',
    img: './images/sand_dunes_camp.jpg',
    action: () => scrollToSection('sec-join')
  },
  {
    eyebrow: '숙소·차량 실사 공개',
    title: '호텔식 침구 & 온수 샤워 게르<br>직접 눈으로 보고 고르세요',
    sub: 'MOKTA 회원사가 직접 촬영한 100% 실제 배정 인프라',
    img: './images/ger_interior.jpg',
    action: () => scrollToSection('sec-showcase')
  },
  {
    eyebrow: '북부 시그니처 특가',
    title: '에메랄드빛 홉스골 호수<br>레이크뷰 1열 캠프 기획전',
    sub: '국내선 항공 포함 VIP 코스부터 2030 또래 조인까지',
    img: './images/khuvsgul_island.jpg',
    action: () => scrollToSection('sec-store')
  },
  {
    eyebrow: '차종 자유 선택',
    title: '감성 러시안 푸르공 vs<br>편안한 2025 신형 스타렉스',
    sub: '원하는 차종과 연식을 견적 단계에서 미리 확정하세요',
    img: './images/vehicle_fleet.jpg',
    action: () => scrollToSection('sec-partners')
  },
  {
    eyebrow: '현지 미식 큐레이션',
    title: '노을 아래 정통 허르헉 만찬과<br>별밤 캠프파이어 파티',
    sub: '노팁·노옵션 클린 약관으로 추가 비용 없이 즐기는 투어',
    img: './images/khorkhog_feast.jpg',
    action: () => scrollToSection('sec-showcase')
  }
];

const SHOWCASE_DATA = [
  {
    id: 'sc1',
    agencyId: 'ag1',
    agency: '어드벤처 몽골 투어',
    moktaNo: 'MOKTA-014',
    cover: './images/milkyway_gobi.jpg',
    cat: '은하수·스냅',
    duration: '0:24',
    views: '2.1만',
    likes: 518,
    caption: '어제 밤 홍고르엘스 모래언덕 앞 캠프에서 찍은 은하수 원본과 야간 랜턴 스냅',
    productTitle: '[노팁/드론스냅] 남고비+중부 핵심 5박6일',
    productPrice: '790,000원',
    productImg: './images/sand_dunes_camp.jpg'
  },
  {
    id: 'sc2',
    agencyId: 'ag2',
    agency: '고비 스타 글램핑',
    moktaNo: 'MOKTA-007',
    cover: './images/ger_interior.jpg',
    cat: '게르·샤워실',
    duration: '0:19',
    views: '3.4만',
    likes: 892,
    caption: '몽골 게르 화장실 걱정 끝! 호텔급 트윈베드와 타일 시공 개별 온수 샤워실 공개',
    productTitle: '[전일정 개인샤워실] 럭셔리 글램핑 고비 4박5일',
    productPrice: '940,000원',
    productImg: './images/ger_interior.jpg'
  },
  {
    id: 'sc3',
    agencyId: 'ag3',
    agency: '홉스골 블루펄 트래블',
    moktaNo: 'MOKTA-021',
    cover: './images/vehicle_fleet.jpg',
    cat: '푸르공·스타렉스',
    duration: '0:27',
    views: '1.7만',
    likes: 364,
    caption: '감성 러시안 푸르공 vs 2025 신형 스타렉스 4WD! 우리 회사 직영 차량 비교',
    productTitle: '[차종선택] 홉스골+쳉헤르 온천 힐링 5박6일',
    productPrice: '860,000원',
    productImg: './images/khuvsgul_island.jpg'
  },
  {
    id: 'sc4',
    agencyId: 'ag4',
    agency: '노마드 스냅 익스페디션',
    moktaNo: 'MOKTA-029',
    cover: './images/tsagaan_suvarga_snap.jpg',
    cat: '은하수·스냅',
    duration: '0:21',
    views: '2.9만',
    likes: 731,
    caption: '차강소브라가 절벽 위 인생샷 포인트! 전 가이드 소니 A7M4 스냅 무료 촬영',
    productTitle: '[2030 스냅특화] 차강소브라가+바얀작 4박5일',
    productPrice: '720,000원',
    productImg: './images/baga_gazriin_sunset.jpg'
  },
  {
    id: 'sc5',
    agencyId: 'ag2',
    agency: '고비 스타 글램핑',
    moktaNo: 'MOKTA-007',
    cover: './images/glamping_dome_friends.jpg',
    cat: '게르·샤워실',
    duration: '0:18',
    views: '1.9만',
    likes: 475,
    caption: '2030 여성 동행 4인 팀 실제 투숙기! 파노라마 투명 돔 글램핑 초원 뷰',
    productTitle: '[여성동행 인기] 테를지+미니사막 돔글램핑 3박4일',
    productPrice: '680,000원',
    productImg: './images/glamping_dome_friends.jpg'
  },
  {
    id: 'sc6',
    agencyId: 'ag1',
    agency: '어드벤처 몽골 투어',
    moktaNo: 'MOKTA-014',
    cover: './images/khorkhog_feast.jpg',
    cat: '음식·불멍파티',
    duration: '0:23',
    views: '2.5만',
    likes: 612,
    caption: '달궈진 강돌로 구워낸 정통 양갈비 허르헉 한상차림! 노을 보며 즐기는 초원 만찬',
    productTitle: '[특식3회포함] 중부 어르헝폭포+온천 4박5일',
    productPrice: '750,000원',
    productImg: './images/orkhon_waterfall_rainbow.jpg'
  },
  {
    id: 'sc7',
    agencyId: 'ag4',
    agency: '노마드 스냅 익스페디션',
    moktaNo: 'MOKTA-029',
    cover: './images/campfire_cheers.jpg',
    cat: '음식·불멍파티',
    duration: '0:16',
    views: '3.2만',
    likes: 845,
    caption: '처음 만난 동행 6명도 하루 만에 친해지는 캠프파이어 불멍 & 맥주 파티 현장',
    productTitle: '[2030 오픈조인] 별밤불멍 중부+사막 5박6일',
    productPrice: '740,000원',
    productImg: './images/starlight_ger_snap.jpg'
  },
  {
    id: 'sc8',
    agencyId: 'ag5',
    agency: '몽골 헤리티지 VIP',
    moktaNo: 'MOKTA-002',
    cover: './images/khuvsgul_boat_sunset.jpg',
    cat: '은하수·스냅',
    duration: '0:29',
    views: '1.5만',
    likes: 339,
    caption: '노을빛 에메랄드 홉스골 호수 프라이빗 보트 투어! 부모님 효도 여행 만족도 1위',
    productTitle: '[국내선포함 VIP] 홉스골 레이크뷰 4박5일',
    productPrice: '1,120,000원',
    productImg: './images/khuvsgul_boat_sunset.jpg'
  }
];

const RFQ_LIST = [
  {
    id: 'rfq-1',
    author: '박*연님 외 3명',
    initial: '박',
    createdAt: '11분 전',
    dates: '8월 14일 ~ 8월 19일 (5박 6일)',
    typeTag: '단독투어 · 4명 확정',
    course: '남고비 3대 사막 + 중부 온천',
    infra: '신형 스타렉스 · 전일정 온수샤워 게르',
    memo: '친구 4명 모임입니다. 바얀작·홍고르엘스·쳉헤르 노천온천 코스를 희망하며, 실제 배정될 차량과 게르 내부 사진을 미리 확인하고 결정하고 싶어요.',
    maxBids: 6,
    quotes: [
      {
        agency: '고비 스타 글램핑 (MOKTA-007)',
        rating: '4.97 (128)',
        usd4: 740,
        usd6: 580,
        vehTitle: '2025 스타렉스 4WD 리무진',
        gerTitle: '전 일정 개인 온수샤워 글램핑',
        vehPhoto: './images/vehicle_fleet.jpg',
        gerPhoto: './images/ger_interior.jpg',
        perks: '드론 원본+보정본 10장 무료 · 공항 단독 픽업 · 유심 4매 증정 · 노팁/노옵션 보장'
      },
      {
        agency: '어드벤처 몽골 투어 (MOKTA-014)',
        rating: '4.95 (183)',
        usd4: 705,
        usd6: 550,
        vehTitle: '직영 그랜드 스타렉스 어반',
        gerTitle: '홍고르엘스 사막 앞 신축 온수캠프',
        vehPhoto: './images/gobi_camp_vans.jpg',
        gerPhoto: './images/sand_dunes_camp.jpg',
        perks: '은하수 야간 랜턴 스냅 무료 · 전통 허르헉 특식 포함 · 침낭 완비 · 노팁/노옵션'
      },
      {
        agency: '노마드 스냅 익스페디션 (MOKTA-029)',
        rating: '4.93 (94)',
        usd4: 685,
        usd6: 535,
        vehTitle: '4륜구동 투어 전용 스타렉스',
        gerTitle: '5박 중 4박 투어리스트 온수캠프',
        vehPhoto: './images/steppe_ger_suvs.jpg',
        gerPhoto: './images/glamping_dome_friends.jpg',
        perks: '소니 A7M4 전문 스냅작가 겸임 한국어 가이드 배정 · 불멍 파티 1회 서비스'
      }
    ]
  },
  {
    id: 'rfq-2',
    author: '이*훈님 외 1명',
    initial: '이',
    createdAt: '34분 전',
    dates: '8월 22일 ~ 8월 26일 (4박 5일)',
    typeTag: '동행조인 · 2명 확정 (추가모집 희망)',
    course: '홉스골 호수 + 테르힝차강노르',
    infra: '감성 푸르공 · 투어리스트 캠프',
    memo: '30대 초반 커플입니다. 성격 밝은 2030 동행분들 4명 더 모아서 6인 풀방으로 푸르공 루프랙 사진도 남기고 즐겁게 다녀오고 싶습니다.',
    maxBids: 6,
    quotes: [
      {
        agency: '홉스골 블루펄 트래블 (MOKTA-021)',
        rating: '4.95 (156)',
        usd4: 680,
        usd6: 520,
        vehTitle: '에어컨 개조 신형 감성 푸르공',
        gerTitle: '홉스골 호수 1열 레이크뷰 캠프',
        vehPhoto: './images/vehicle_fleet.jpg',
        gerPhoto: './images/khuvsgul_island.jpg',
        perks: '오픈조인 캘린더 동시 노출로 잔여 4석 책임 모객 보장 · 소원섬 보트투어 포함'
      },
      {
        agency: '몽골 헤리티지 VIP (MOKTA-002)',
        rating: '4.98 (89)',
        usd4: 720,
        usd6: 560,
        vehTitle: '정비 완료 클래식 푸르공 + 보조 SUV',
        gerTitle: '침엽수림 리조트형 투어리스트 캠프',
        vehPhoto: './images/steppe_ger_suvs.jpg',
        gerPhoto: './images/terelj_resort_camp.jpg',
        perks: '모객 미달 시에도 추가 요금 없이 4인 기준 출발 확정 보장 · 승마 트레킹 1시간'
      }
    ]
  },
  {
    id: 'rfq-3',
    author: '정*석님 가족 (6명)',
    initial: '정',
    createdAt: '1시간 전',
    dates: '9월 3일 ~ 9월 7일 (4박 5일)',
    typeTag: '단독투어 · 6명 가족 프리미엄',
    course: '테를지 + 바가가즈링촐로 실속코스',
    infra: '프리미엄 SUV · 럭셔리 글램핑',
    memo: '부모님 칠순 기념 가족 단독투어입니다. 비포장 이동이 짧고 침대·화장실이 쾌적한 리조트급 캠프와 한식 케어가 가능한 업체를 찾습니다.',
    maxBids: 6,
    quotes: [
      {
        agency: '몽골 헤리티지 VIP (MOKTA-002)',
        rating: '4.98 (89)',
        usd4: 860,
        usd6: 710,
        vehTitle: '랜드크루저 2대 또는 벤츠 스프린터',
        gerTitle: '테를지 고급 리조트 게르 (바닥난방+욕실)',
        vehPhoto: './images/baga_gazriin_sunset.jpg',
        gerPhoto: './images/ger_interior.jpg',
        perks: '전담 한식 조리사 동행 · 공항 VIP 의전 픽업 · 부모님 맞춤 여유 동선'
      }
    ]
  },
  {
    id: 'rfq-4',
    author: '최*아님 (솔로 여행자)',
    initial: '최',
    createdAt: '2시간 전',
    dates: '9월 5일 ~ 9월 10일 (5박 6일)',
    typeTag: '동행조인 · 1명 솔로 합류 희망',
    course: '남고비 3대 사막 + 중부 온천',
    infra: '신형 스타렉스 · 전일정 온수샤워 게르',
    memo: '혼자 출발하는 20대 후반 직장인(비흡연)입니다. 이미 출발 확정된 또래 조인방이 있는 MOKTA 회원사라면 합류 제안 부탁드립니다.',
    maxBids: 6,
    quotes: [
      {
        agency: '노마드 스냅 익스페디션 (MOKTA-029)',
        rating: '4.93 (94)',
        usd4: 690,
        usd6: 540,
        vehTitle: '2025 스타렉스 4WD',
        gerTitle: '전 일정 투어리스트 온수캠프',
        vehPhoto: './images/gobi_camp_vans.jpg',
        gerPhoto: './images/starlight_ger_snap.jpg',
        perks: '9/5 출발 저희 확정방에 2030 여성 3분·남성 1분(4/6석) 계셔서 즉시 합류 가능합니다'
      }
    ]
  }
];

const JOIN_TOURS = [
  {
    id: 'j1',
    dateKey: '08-15',
    dateLabel: '8.15(토) ~ 8.20(목) · 5박6일',
    status: '출발확정',
    badgeCls: 'sky',
    title: '남고비 3대 사막 + 쳉헤르 노천온천 별밤 오픈조인',
    agency: '어드벤처 몽골 투어 · MOKTA-014',
    thumb: './images/sand_dunes_camp.jpg',
    gallery: ['./images/sand_dunes_camp.jpg', './images/milkyway_gobi.jpg', './images/ger_interior.jpg', './images/vehicle_fleet.jpg'],
    seats: ['여20대', '여20대', '여30대', '남30대'],
    maxSeats: 6,
    curPrice: '820,000원',
    fullPrice: '740,000원'
  },
  {
    id: 'j2',
    dateKey: '08-22',
    dateLabel: '8.22(토) ~ 8.26(수) · 4박5일',
    status: '마감임박 1석',
    badgeCls: 'coral',
    title: '에메랄드빛 홉스골 호수 레이크뷰 1열 캠프 & 보트 힐링',
    agency: '홉스골 블루펄 트래블 · MOKTA-021',
    thumb: './images/khuvsgul_island.jpg',
    gallery: ['./images/khuvsgul_island.jpg', './images/khuvsgul_boat_sunset.jpg', './images/terelj_resort_camp.jpg', './images/khorkhog_feast.jpg'],
    seats: ['여30대', '여30대', '남20대', '남30대', '여20대'],
    maxSeats: 6,
    curPrice: '790,000원',
    fullPrice: '720,000원'
  },
  {
    id: 'j3',
    dateKey: '08-29',
    dateLabel: '8.29(토) ~ 9.02(수) · 4박5일',
    status: '출발확정',
    badgeCls: 'sky',
    title: '어르헝 폭포 무지개 트레킹 + 미니사막 투명 돔 글램핑',
    agency: '고비 스타 글램핑 · MOKTA-007',
    thumb: './images/orkhon_waterfall_rainbow.jpg',
    gallery: ['./images/orkhon_waterfall_rainbow.jpg', './images/glamping_dome_friends.jpg', './images/ger_interior.jpg', './images/campfire_cheers.jpg'],
    seats: ['여20대', '여20대', '남20대', '남20대'],
    maxSeats: 6,
    curPrice: '850,000원',
    fullPrice: '760,000원'
  },
  {
    id: 'j4',
    dateKey: '09-05',
    dateLabel: '9.05(토) ~ 9.09(수) · 4박5일',
    status: '투어사 입찰중',
    badgeCls: 'amber',
    title: '[여행자 동행방] 9월 초 은하수 보러 차강소브라가 가실 분',
    agency: 'MOKTA 3개 회원사 전담 스폰서 제안 도착',
    thumb: './images/starlight_ger_snap.jpg',
    gallery: ['./images/starlight_ger_snap.jpg', './images/tsagaan_suvarga_snap.jpg', './images/companion_team_hands.jpg', './images/vehicle_fleet.jpg'],
    seats: ['방장·여20', '여20대', '남20대'],
    maxSeats: 6,
    curPrice: '입찰 최저 69만원~',
    fullPrice: '610,000원'
  },
  {
    id: 'j5',
    dateKey: '09-12',
    dateLabel: '9.12(토) ~ 9.17(목) · 5박6일',
    status: '출발확정',
    badgeCls: 'sky',
    title: '하르호린 고대수도 + 테르힝차강 화산호수 중부 일주',
    agency: '노마드 스냅 익스페디션 · MOKTA-029',
    thumb: './images/erdene_zuu_monastery.jpg',
    gallery: ['./images/erdene_zuu_monastery.jpg', './images/terkhiin_lake_forest.jpg', './images/orkhon_canyon_top.jpg', './images/khorkhog_feast.jpg'],
    seats: ['여30대', '남30대', '여20대', '남20대'],
    maxSeats: 6,
    curPrice: '780,000원',
    fullPrice: '690,000원'
  },
  {
    id: 'j6',
    dateKey: '09-19',
    dateLabel: '9.19(토) ~ 9.23(수) · 추석연휴',
    status: '마감임박 1석',
    badgeCls: 'coral',
    title: '[추석황금연휴] 바가가즈링촐로 일몰 지프 & 테를지 리조트',
    agency: '몽골 헤리티지 VIP · MOKTA-002',
    thumb: './images/baga_gazriin_sunset.jpg',
    gallery: ['./images/baga_gazriin_sunset.jpg', './images/terelj_resort_camp.jpg', './images/ger_interior.jpg', './images/green_steppe_flock.jpg'],
    seats: ['여30대', '여30대', '여40대', '남30대', '남40대'],
    maxSeats: 6,
    curPrice: '910,000원',
    fullPrice: '840,000원'
  }
];

const DIRECT_PRODUCTS = [
  { id: 'dp1', tag: '드론스냅 무료', agency: '어드벤처 몽골 투어 · MOKTA-014', title: '[노팁/노옵션] 남고비 3대사막 + 쳉헤르 온천 시그니처 5박6일', discount: '15%', price: '790,000원', rating: '4.96', count: 183, img: './images/sand_dunes_camp.jpg' },
  { id: 'dp2', tag: '개인샤워실 100%', agency: '고비 스타 글램핑 · MOKTA-007', title: '[전일정 온수글램핑] 호텔식 침구 & 별밤 고비 하이엔드 4박5일', discount: '12%', price: '940,000원', rating: '4.98', count: 128, img: './images/ger_interior.jpg' },
  { id: 'dp3', tag: '국내선 포함', agency: '홉스골 블루펄 트래블 · MOKTA-021', title: '[레이크뷰 1열캠프] 에메랄드 홉스골 호수 보트 & 승마 힐링 4박5일', discount: '18%', price: '880,000원', rating: '4.95', count: 156, img: './images/khuvsgul_island.jpg' },
  { id: 'dp4', tag: '2030 조인 1위', agency: '노마드 스냅 익스페디션 · MOKTA-029', title: '[소니카메라 스냅] 차강소브라가 절벽 인생샷 & 불멍파티 4박5일', discount: '16%', price: '720,000원', rating: '4.94', count: 94, img: './images/tsagaan_suvarga_snap.jpg' },
  { id: 'dp5', tag: '허르헉 특식포함', agency: '어드벤처 몽골 투어 · MOKTA-014', title: '[중부 베스트] 어르헝 폭포 무지개 트레킹 + 미니사막 4박5일', discount: '14%', price: '750,000원', rating: '4.95', count: 112, img: './images/orkhon_waterfall_rainbow.jpg' },
  { id: 'dp6', tag: '부모님 효도추천', agency: '몽골 헤리티지 VIP · MOKTA-002', title: '[랜드크루저 단독] 한식케어 테를지 리조트 & 바가가즈링 3박4일', discount: '10%', price: '990,000원', rating: '4.99', count: 89, img: './images/terelj_resort_camp.jpg' },
  { id: 'dp7', tag: '차종 자유선택', agency: '홉스골 블루펄 트래블 · MOKTA-021', title: '[푸르공 vs 스타렉스] 테르힝차강 화산호수 & 대초원 일주 5박6일', discount: '15%', price: '810,000원', rating: '4.93', count: 77, img: './images/vehicle_fleet.jpg' },
  { id: 'dp8', tag: '별밤 랜턴스냅', agency: '고비 스타 글램핑 · MOKTA-007', title: '[은하수 집중코스] 홍고르엘스 별밤 & 투명 돔 글램핑 4박5일', discount: '13%', price: '890,000원', rating: '4.97', count: 141, img: './images/milkyway_gobi.jpg' }
];

const MOKTA_AGENCIES = [
  {
    id: 'ag1', name: '어드벤처 몽골 투어', en: 'ADVENTURE MONGOLIA', certNo: 'MOKTA-001',
    cat: '남고비특화', specLabel: '남고비·드론특화', rating: '4.96', reviews: 183,
    speed: '14분', fleetCount: '직영 23대', confirmRate: '99.4%',
    c1: '#0ea5e9', c2: '#0369a1', motif: 'dune',
    cover: './images/gobi_camp_vans.jpg',
    thumbs: ['./images/milkyway_gobi.jpg', './images/sand_dunes_camp.jpg', './images/khorkhog_feast.jpg'],
    fleet: '2025 스타렉스 9대 · 에어컨 푸르공 14대 직영',
    desc: '남고비 사막 종단 및 드론·은하수 타임랩스 케어 만족도 1위 정회원사',
    products: [
      { name: '[시그니처] 남고비 3대사막+중부 온수캠프 5박6일', price: '790,000원~' },
      { name: '[단기핵심] 차강소브라가+바가가즈링촐로 3박4일', price: '580,000원~' }
    ]
  },
  {
    id: 'ag2', name: '고비 스타 글램핑', en: 'GOBI STAR GLAMPING', certNo: 'MOKTA-002',
    cat: '럭셔리캠프', specLabel: '직영 온수글램핑', rating: '4.98', reviews: 128,
    speed: '18분', fleetCount: '캠프 2곳·15대', confirmRate: '99.8%',
    c1: '#f59e0b', c2: '#b45309', motif: 'ger',
    cover: './images/ger_interior.jpg',
    thumbs: ['./images/ger_interior.jpg', './images/glamping_dome_friends.jpg', './images/terelj_resort_camp.jpg'],
    fleet: '스타렉스 리무진 7대 · 직영 럭셔리 글램핑 캠프 2곳',
    desc: '전 일정 호텔식 침구와 개별 타일 온수 샤워실이 보장되는 직영 캠프 운영사',
    products: [
      { name: '[전일정 개인욕실] 고비 럭셔리 글램핑 4박5일', price: '940,000원~' },
      { name: '[파노라마 돔] 테를지+미니사막 감성 글램핑 3박4일', price: '680,000원~' }
    ]
  },
  {
    id: 'ag3', name: '홉스골 블루펄 트래블', en: 'KHUVSGUL BLUE PEARL', certNo: 'MOKTA-003',
    cat: '가족·VIP', specLabel: '홉스골 1열캠프', rating: '4.95', reviews: 156,
    speed: '20분', fleetCount: '직영 14대', confirmRate: '99.1%',
    c1: '#14b8a6', c2: '#0f766e', motif: 'wave',
    cover: './images/khuvsgul_island.jpg',
    thumbs: ['./images/khuvsgul_island.jpg', './images/khuvsgul_boat_sunset.jpg', './images/vehicle_fleet.jpg'],
    fleet: '벤츠 스프린터 4대 · 4WD 스타렉스 10대 보유',
    desc: '홉스골 호수 1열 레이크뷰 캠프 독점 블럭 및 효도·가족 힐링투어 전문',
    products: [
      { name: '[국내선항공포함] 무박이동 없는 홉스골 VIP 4박5일', price: '1,120,000원~' },
      { name: '[온천힐링] 홉스골+쳉헤르 노천온천 5박6일', price: '860,000원~' }
    ]
  },
  {
    id: 'ag4', name: '노마드 스냅 익스페디션', en: 'NOMAD SNAP EXPEDITION', certNo: 'MOKTA-004',
    cat: '스냅·2030', specLabel: '2030 전문스냅', rating: '4.94', reviews: 94,
    speed: '11분', fleetCount: '직영 22대', confirmRate: '98.9%',
    c1: '#8b5cf6', c2: '#6d28d9', motif: 'lens',
    cover: './images/tsagaan_suvarga_snap.jpg',
    thumbs: ['./images/tsagaan_suvarga_snap.jpg', './images/starlight_ger_snap.jpg', './images/campfire_cheers.jpg'],
    fleet: '루프랙 스냅용 푸르공 16대 · 스타렉스 6대',
    desc: '전 가이드 소니 미러리스 카메라 보유! 2030 또래 동행 조인 추천율 최상위',
    products: [
      { name: '[2030 오픈조인] 차강소브라가+별밤불멍 4박5일', price: '720,000원~' },
      { name: '[인생샷올인원] 남고비 풀코스 스냅 원정대 6박7일', price: '850,000원~' }
    ]
  },
  {
    id: 'ag5', name: '몽골 헤리티지 VIP', en: 'MONGOL HERITAGE VIP', certNo: 'MOKTA-005',
    cat: '가족·VIP', specLabel: '효도·VIP의전', rating: '4.99', reviews: 89,
    speed: '15분', fleetCount: 'VIP 17대', confirmRate: '100%',
    c1: '#1e293b', c2: '#0f172a', motif: 'peak',
    cover: './images/baga_gazriin_sunset.jpg',
    thumbs: ['./images/baga_gazriin_sunset.jpg', './images/terelj_resort_camp.jpg', './images/ger_interior.jpg'],
    fleet: '도요타 랜드크루저 12대 · 렉서스 LX · 스프린터',
    desc: '칠순 효도 단독투어, 기업 워크샵 의전, 승마 트레킹·몽골 골프 전문 랜드사',
    products: [
      { name: '[품격효도] 한식셰프 동행 테를지+중부 리조트 4박5일', price: '1,080,000원~' },
      { name: '[오프로드 VIP] 랜드크루저 바가가즈링촐로 단독투어', price: '990,000원~' }
    ]
  },
  {
    id: 'ag6', name: '어르헝 밸리 투어', en: 'ORKHON VALLEY TOUR', certNo: 'MOKTA-006',
    cat: '남고비특화', specLabel: '중부폭포·온천', rating: '4.95', reviews: 112,
    speed: '16분', fleetCount: '직영 18대', confirmRate: '99.2%',
    c1: '#10b981', c2: '#047857', motif: 'arch',
    cover: './images/orkhon_waterfall_rainbow.jpg',
    thumbs: ['./images/orkhon_waterfall_rainbow.jpg', './images/orkhon_canyon_top.jpg', './images/steppe_ger_suvs.jpg'],
    fleet: '신형 스타렉스 10대 · 오프로드 푸르공 8대',
    desc: '어르헝 폭포 트레킹과 쳉헤르 노천온천 힐링 루트 직영 캠프 네트워크 보유',
    products: [
      { name: '[힐링베스트] 어르헝폭포+쳉헤르 노천온천 4박5일', price: '760,000원~' }
    ]
  },
  {
    id: 'ag7', name: '초원 별밤 원정대', en: 'STEPPE STARLIGHT', certNo: 'MOKTA-007',
    cat: '스냅·2030', specLabel: '은하수·천체스냅', rating: '4.97', reviews: 147,
    speed: '12분', fleetCount: '직영 19대', confirmRate: '99.5%',
    c1: '#3b82f6', c2: '#1d4ed8', motif: 'star',
    cover: './images/milkyway_gobi.jpg',
    thumbs: ['./images/milkyway_gobi.jpg', './images/starlight_ger_snap.jpg', './images/sand_dunes_camp.jpg'],
    fleet: '천체망원경 탑재 투어차량 19대 운영',
    desc: '전문 천체 사진작가 가이드가 동행하는 고비 은하수 출사 및 랜턴 스냅 전문',
    products: [
      { name: '[은하수출사] 홍고르엘스 별밤 타임랩스 5박6일', price: '810,000원~' }
    ]
  },
  {
    id: 'ag8', name: '테를지 포레스트 캠프', en: 'TERELJ FOREST CAMP', certNo: 'MOKTA-008',
    cat: '럭셔리캠프', specLabel: '테를지 리조트직영', rating: '4.94', reviews: 203,
    speed: '19분', fleetCount: '직영캠프 45동', confirmRate: '99.6%',
    c1: '#22c55e', c2: '#15803d', motif: 'pine',
    cover: './images/terelj_resort_camp.jpg',
    thumbs: ['./images/terelj_resort_camp.jpg', './images/ger_interior.jpg', './images/green_steppe_flock.jpg'],
    fleet: '테를지 국립공원 내 온수 리조트 게르 45동 직영',
    desc: '짧은 연차로도 편안하게 다녀오는 테를지 국립공원·승마·엉거츠산 트레킹 명가',
    products: [
      { name: '[연차없이] 테를지 리조트게르+승마 힐링 2박3일', price: '490,000원~' }
    ]
  },
  {
    id: 'ag9', name: '울란바토르 로얄라인', en: 'UB ROYAL LINE', certNo: 'MOKTA-009',
    cat: '가족·VIP', specLabel: '리무진시트 전용', rating: '4.96', reviews: 134,
    speed: '13분', fleetCount: '리무진 16대', confirmRate: '99.3%',
    c1: '#0284c7', c2: '#075985', motif: 'wheel',
    cover: './images/vehicle_fleet.jpg',
    thumbs: ['./images/vehicle_fleet.jpg', './images/steppe_ger_suvs.jpg', './images/ger_interior.jpg'],
    fleet: '전 차량 2024~2025년식 스타렉스 리무진 시트 개조',
    desc: '장거리 초원 이동의 피로를 줄여주는 독립 리무진 시트 & 전 좌석 고속충전 완비',
    products: [
      { name: '[리무진확약] 남고비+중부 편안한 이동 5박6일', price: '850,000원~' }
    ]
  },
  {
    id: 'ag10', name: '카라코룸 익스프레스', en: 'KARAKORUM EXPRESS', certNo: 'MOKTA-010',
    cat: '남고비특화', specLabel: '역사·중부종단', rating: '4.93', reviews: 98,
    speed: '17분', fleetCount: '직영 15대', confirmRate: '98.8%',
    c1: '#d97706', c2: '#92400e', motif: 'stupa',
    cover: './images/erdene_zuu_monastery.jpg',
    thumbs: ['./images/erdene_zuu_monastery.jpg', './images/terkhiin_lake_forest.jpg', './images/orkhon_waterfall_rainbow.jpg'],
    fleet: '스타렉스 8대 · 푸르공 7대 · 역사해설 전문 가이드',
    desc: '고대 수도 하르호린 에르데네조 사원과 중앙몽골 유네스코 문화유산 심층 투어',
    products: [
      { name: '[인문·자연] 하르호린+테르힝차강노르 4박5일', price: '730,000원~' }
    ]
  },
  {
    id: 'ag11', name: '샌드듄 고비 사파리', en: 'SAND DUNE SAFARI', certNo: 'MOKTA-011',
    cat: '남고비특화', specLabel: '홍고르엘스 특화', rating: '4.95', reviews: 165,
    speed: '15분', fleetCount: '4WD 20대', confirmRate: '99.4%',
    c1: '#ea580c', c2: '#9a3412', motif: 'camel',
    cover: './images/sand_dunes_camp.jpg',
    thumbs: ['./images/sand_dunes_camp.jpg', './images/gobi_camp_vans.jpg', './images/milkyway_gobi.jpg'],
    fleet: '사막 주행 특화 4WD 차량 20대 직영',
    desc: '홍고르엘스 모래언덕 바로 앞 캠프 우선 배정 및 쌍봉낙타 선셋 트레킹 포함',
    products: [
      { name: '[사막1열캠프] 남고비 오아시스 사파리 5박6일', price: '800,000원~' }
    ]
  },
  {
    id: 'ag12', name: '알타이 오프로드 클럽', en: 'ALTAI OFFROAD CLUB', certNo: 'MOKTA-012',
    cat: '남고비특화', specLabel: '푸르공 오지탐험', rating: '4.92', reviews: 82,
    speed: '21분', fleetCount: '푸르공 18대', confirmRate: '98.7%',
    c1: '#475569', c2: '#1e293b', motif: 'compass',
    cover: './images/steppe_ger_suvs.jpg',
    thumbs: ['./images/steppe_ger_suvs.jpg', './images/vehicle_fleet.jpg', './images/baga_gazriin_sunset.jpg'],
    fleet: '신형 개조 UAZ 푸르공 18대 · 베테랑 미캐닉 기사단',
    desc: '서부 알타이 산맥부터 남고비 협곡까지 진짜 야생 몽골을 달리는 오프로드 전문사',
    products: [
      { name: '[푸르공로망] 바얀작+욜린암 오프로드 5박6일', price: '710,000원~' }
    ]
  },
  {
    id: 'ag13', name: '몽골리아 돔 스테이', en: 'MONGOLIA DOME STAY', certNo: 'MOKTA-013',
    cat: '럭셔리캠프', specLabel: '파노라마 투명돔', rating: '4.97', reviews: 119,
    speed: '13분', fleetCount: '돔캠프 3곳', confirmRate: '99.6%',
    c1: '#ec4899', c2: '#be185d', motif: 'dome',
    cover: './images/glamping_dome_friends.jpg',
    thumbs: ['./images/glamping_dome_friends.jpg', './images/ger_interior.jpg', './images/starlight_ger_snap.jpg'],
    fleet: '침대에 누워 별을 보는 투명 돔 글램핑 3개 지점 직영',
    desc: '2030 여성 여행자 및 커플 만족도 압도적 1위! 감성 인테리어 돔 글램핑 투어',
    products: [
      { name: '[감성돔숙박] 미니사막+테를지 별밤돔 3박4일', price: '690,000원~' }
    ]
  },
  {
    id: 'ag14', name: '차강노르 에코투어', en: 'TSAGAAN ECO TOUR', certNo: 'MOKTA-014',
    cat: '럭셔리캠프', specLabel: '화산호수·에코캠프', rating: '4.94', reviews: 76,
    speed: '18분', fleetCount: '직영 12대', confirmRate: '99.0%',
    c1: '#06b6d4', c2: '#0e7490', motif: 'crater',
    cover: './images/terkhiin_lake_forest.jpg',
    thumbs: ['./images/terkhiin_lake_forest.jpg', './images/khuvsgul_island.jpg', './images/green_steppe_flock.jpg'],
    fleet: '친환경 태양광 온수 투어리스트 캠프 제휴',
    desc: '호르고 화산 분화구 트레킹과 테르힝차강 화이트 레이크 호반 캠핑 전문',
    products: [
      { name: '[청정자연] 호르고화산+차강노르 호반힐링 4박5일', price: '740,000원~' }
    ]
  },
  {
    id: 'ag15', name: '칭기스 고메 투어', en: 'CHINGGIS GOURMET', certNo: 'MOKTA-015',
    cat: '가족·VIP', specLabel: '현지특식·한식셰프', rating: '4.98', reviews: 108,
    speed: '14분', fleetCount: '조리팀 12팀', confirmRate: '99.7%',
    c1: '#ef4444', c2: '#b91c1c', motif: 'flame',
    cover: './images/khorkhog_feast.jpg',
    thumbs: ['./images/khorkhog_feast.jpg', './images/campfire_cheers.jpg', './images/terelj_resort_camp.jpg'],
    fleet: '전문 캠핑 셰프 동행 · 위생 인증 키친카/다이닝 게르',
    desc: '몽골 음식 걱정 끝! 잡내 없는 프리미엄 허르헉과 정갈한 한식 세끼를 차려드립니다',
    products: [
      { name: '[미식올인원] 셰프동행 중부+고비 미식투어 5박6일', price: '890,000원~' }
    ]
  },
  {
    id: 'ag16', name: '선셋 레이크 요트투어', en: 'SUNSET LAKE VOYAGE', certNo: 'MOKTA-016',
    cat: '가족·VIP', specLabel: '홉스골 선셋보트', rating: '4.96', reviews: 91,
    speed: '16분', fleetCount: '전용보트 5척', confirmRate: '99.2%',
    c1: '#6366f1', c2: '#4338ca', motif: 'sail',
    cover: './images/khuvsgul_boat_sunset.jpg',
    thumbs: ['./images/khuvsgul_boat_sunset.jpg', './images/khuvsgul_island.jpg', './images/terkhiin_lake_forest.jpg'],
    fleet: '홉스골 선착장 프라이빗 보트 5척 및 스타렉스 9대',
    desc: '어머니의 바다 홉스골에서 즐기는 선셋 프라이빗 보트와 호숫가 통나무 별장 투어',
    products: [
      { name: '[선셋보트] 홉스골 통나무집 & 호수휴양 4박5일', price: '920,000원~' }
    ]
  },
  {
    id: 'ag17', name: '노마딕 캠프파이어', en: 'NOMADIC CAMPFIRE', certNo: 'MOKTA-017',
    cat: '스냅·2030', specLabel: '2030 동행조인 1위', rating: '4.95', reviews: 214,
    speed: '9분', fleetCount: '조인전용 25대', confirmRate: '99.5%',
    c1: '#f97316', c2: '#c2410c', motif: 'spark',
    cover: './images/campfire_cheers.jpg',
    thumbs: ['./images/campfire_cheers.jpg', './images/companion_team_hands.jpg', './images/glamping_dome_friends.jpg'],
    fleet: '2030 또래 매칭 전담 코디네이터 및 차량 25대',
    desc: '혼자 와도 어색함 제로! 나이대·성향 맞춤 조인 매칭과 매일 밤 불멍 캠프파이어',
    products: [
      { name: '[솔로환영] 2030 또래매칭 별밤불멍 4박5일', price: '710,000원~' }
    ]
  },
  {
    id: 'ag18', name: '그린스텝 승마트레킹', en: 'GREEN STEPPE RIDING', certNo: 'MOKTA-018',
    cat: '스냅·2030', specLabel: '초원승마·유목체험', rating: '4.94', reviews: 87,
    speed: '19분', fleetCount: '승마장 3곳', confirmRate: '99.1%',
    c1: '#16a34a', c2: '#166534', motif: 'horse',
    cover: './images/green_steppe_flock.jpg',
    thumbs: ['./images/green_steppe_flock.jpg', './images/hero_steppe_sunset.jpg', './images/terelj_resort_camp.jpg'],
    fleet: '초보자 안전 교육 완료 마필 60두 및 안전장비 완비',
    desc: '초원 위를 직접 달리는 종일 승마 트레킹부터 유목민 가정 방문·전통 의상 스냅까지',
    products: [
      { name: '[초원질주] 안전가이드 동행 승마트레킹 3박4일', price: '660,000원~' }
    ]
  },
  {
    id: 'ag19', name: '캐니언 드론 투어스', en: 'CANYON DRONE TOURS', certNo: 'MOKTA-019',
    cat: '스냅·2030', specLabel: '시네마틱 드론촬영', rating: '4.96', reviews: 105,
    speed: '12분', fleetCount: '드론팀 14대', confirmRate: '99.3%',
    c1: '#0891b2', c2: '#155e75', motif: 'drone',
    cover: './images/orkhon_canyon_top.jpg',
    thumbs: ['./images/orkhon_canyon_top.jpg', './images/tsagaan_suvarga_snap.jpg', './images/gobi_camp_vans.jpg'],
    fleet: '전 차량 DJI Mavic 3 Pro 드론 및 편집 매니저 배정',
    desc: '협곡과 사막 위를 달리는 우리 팀 차량 행렬을 영화 같은 4K 드론 릴스로 제작해 드립니다',
    products: [
      { name: '[릴스제작포함] 차강소브라가+어르헝 드론투어 4박5일', price: '780,000원~' }
    ]
  },
  {
    id: 'ag20', name: '골든이글 프라이빗', en: 'GOLDEN EAGLE PRIVATE', certNo: 'MOKTA-020',
    cat: '가족·VIP', specLabel: '단독맞춤·골프투어', rating: '4.99', reviews: 73,
    speed: '10분', fleetCount: 'VIP 15대', confirmRate: '100%',
    c1: '#ca8a04', c2: '#854d0e', motif: 'eagle',
    cover: './images/hero_steppe_sunset.jpg',
    thumbs: ['./images/hero_steppe_sunset.jpg', './images/baga_gazriin_sunset.jpg', './images/ger_interior.jpg'],
    fleet: '징기스칸 CC·마운틴보그드 CC 부킹권 및 VIP 의전차량',
    desc: '2인 커플 프라이빗 단독투어부터 여름 시원한 몽골 명문 골프 라운딩 패키지까지 맞춤 설계',
    products: [
      { name: '[단독프라이빗] 우리끼리 커스텀 초원+골프 3박4일', price: '1,050,000원~' }
    ]
  }
];

let heroPage = 0;
let curShowcaseCat = 'all';
let curRfqFilter = 'all';
let curJoinDate = 'all';
let curAgencyCat = 'all';
let searchKeyword = '';

let selectedBidVehPhoto = './images/vehicle_fleet.jpg';
let selectedBidGerPhoto = './images/ger_interior.jpg';
let selectedShowcaseImg = './images/khorkhog_feast.jpg';

// ==================== 히어로 3단 세로형 배너 슬라이더 ====================
function renderHeroBanners() {
  const start = heroPage * 3;
  const visible = HERO_SLIDES.slice(start, start + 3);
  document.getElementById('heroBannerGrid').innerHTML = visible.map((s, idx) => `
    <div class="bl-hero-card" onclick="HERO_SLIDES[${start + idx}].action()">
      <img src="${s.img}" alt="${s.eyebrow}" />
      <div class="bl-hero-txt">
        <span class="bl-hero-eyebrow">${s.eyebrow}</span>
        <div class="bl-hero-title">${s.title}</div>
        <div class="bl-hero-sub">${s.sub}</div>
      </div>
    </div>
  `).join('');
  document.getElementById('heroCounterText').textContent = `${heroPage + 1} / 2`;
}

function slideHero(dir) {
  heroPage = (heroPage + dir + 2) % 2;
  renderHeroBanners();
}

// ==================== 상단 네비 & 모드 전환 ====================
function switchSiteRole(role) {
  const isPartner = role === 'partner';
  document.body.classList.toggle('partner-mode', isPartner);
  document.getElementById('roleCustomerBtn').classList.toggle('active', !isPartner);
  document.getElementById('rolePartnerBtn').classList.toggle('active', isPartner);
  document.getElementById('customerSubNav').style.display = isPartner ? 'none' : 'block';
  if (isPartner) populatePartnerRfqDropdown();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToSection(secId) {
  switchSiteRole('customer');
  document.querySelectorAll('.page-sec').forEach(s => s.style.display = 'block');
  setTimeout(() => {
    const el = document.getElementById(secId);
    if (el) window.scrollTo({ top: el.offsetTop - 125, behavior: 'smooth' });
  }, 60);
}

function filterPageView(targetId, btnEl) {
  document.querySelectorAll('.bl-gnb-item').forEach(b => b.classList.remove('active'));
  btnEl.classList.add('active');
  document.querySelectorAll('.page-sec').forEach(sec => {
    sec.style.display = (targetId === 'all' || sec.id === targetId) ? 'block' : 'none';
  });
  if (targetId !== 'all') {
    const el = document.getElementById(targetId);
    if (el) window.scrollTo({ top: el.offsetTop - 125, behavior: 'smooth' });
  }
}

function handleGlobalSearch(q) {
  searchKeyword = q.trim().toLowerCase();
  renderRfqBoard();
  renderJoinSection();
  renderShowcase();
  renderStoreAndAgencies();
}

// ==================== 1. 맞춤 일정 & 역경매 보드 ====================
function renderRfqBoard() {
  const filtered = RFQ_LIST.filter(r => {
    const matchF = curRfqFilter === 'all' || r.typeTag.includes(curRfqFilter) || r.course.includes(curRfqFilter);
    const matchKw = !searchKeyword || r.course.toLowerCase().includes(searchKeyword) || r.memo.toLowerCase().includes(searchKeyword);
    return matchF && matchKw;
  });

  document.getElementById('rfqBoardGrid').innerHTML = filtered.map(r => {
    const avatars = r.quotes.map(q => `<img src="${q.vehPhoto}" alt="${q.agency}" />`).join('');
    return `
      <article class="bl-freeboard-card">
        <div>
          <div class="bl-fb-profile">
            <div class="bl-fb-author">
              <div class="bl-fb-avatar">${r.initial}</div>
              <div>
                <div class="bl-fb-name">${r.author}</div>
                <div class="bl-fb-submeta">${r.createdAt} · <b>${r.dates}</b></div>
              </div>
            </div>
            <span class="bl-cat-pill">${r.typeTag}</span>
          </div>

          <h4 class="bl-fb-title">${r.course}</h4>
          <p class="bl-fb-desc">${r.memo}</p>

          <div class="bl-fb-spec-tags">
            <span class="bl-spec-tag"><i class="xi-car"></i> ${r.infra}</span>
            <span class="bl-spec-tag"><i class="xi-check-circle-o"></i> 노팁·노옵션 희망</span>
          </div>
        </div>

        <div class="bl-fb-footer">
          <div class="bl-bid-avatars">
            <div class="bl-avatar-stack">${avatars}</div>
            <div>
              <div style="font-size:13px; font-weight:700; color:var(--bl-gray-900);">
                MOKTA 회원사 <span style="color:var(--bl-point-text);">${r.quotes.length}곳</span> 실사 견적 도착
              </div>
              <div style="font-size:11.5px; color:var(--bl-gray-500);">입찰 슬롯 ${r.quotes.length} / ${r.maxBids}개사</div>
            </div>
          </div>

          <div style="display:flex; gap:6px;">
            <button type="button" class="bl-btn bl-btn-point bl-btn-sm" onclick="openQuoteCompareModal('${r.id}')">
              실사 견적 비교 (${r.quotes.length})
            </button>
            <button type="button" class="bl-btn bl-btn-outline bl-btn-sm" onclick="jumpToPartnerBid('${r.id}')">
              업체 입찰
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  document.getElementById('tabRfqCount').textContent = RFQ_LIST.length;
  document.getElementById('headerBidBadge').textContent = RFQ_LIST.length;
}

function filterRfq(val, btn) {
  curRfqFilter = val;
  btn.parentElement.querySelectorAll('.bl-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderRfqBoard();
}

function openQuoteCompareModal(rfqId) {
  const item = RFQ_LIST.find(x => x.id === rfqId);
  if (!item) return;
  const toKrw = (usd) => (Math.round((usd * 1380) / 1000) * 1000).toLocaleString() + '원';

  document.getElementById('qCompTitle').textContent = `[${item.course}] 도착한 MOKTA 실사 비교견적 (${item.quotes.length}개사)`;
  document.getElementById('qCompBody').innerHTML = `
    <div style="background:var(--bl-point-bg); border:1px solid var(--bl-point-line); border-radius:8px; padding:12px 14px; margin-bottom:16px; font-size:13px; color:var(--bl-point-text); font-weight:600;">
      <i class="xi-info-o"></i> 각 MOKTA 정회원사가 실제 배정할 차량·숙소 실사와 인원별 표준 단가를 한눈에 비교하고 바로 확정할 수 있습니다.
    </div>

    <div class="bl-quote-compare-grid">
      ${item.quotes.map(q => `
        <div class="bl-qcard">
          <div>
            <div class="bl-qcard-photos">
              <div>
                <img src="${q.vehPhoto}" alt="${q.vehTitle}" />
                <span>배정 차량 실사</span>
              </div>
              <div>
                <img src="${q.gerPhoto}" alt="${q.gerTitle}" />
                <span>숙소 캠프 실사</span>
              </div>
            </div>

            <div style="padding:16px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <span class="bl-mokta-tag">MOKTA 정회원</span>
                <span style="font-size:12px; font-weight:600; color:var(--bl-gray-700);"><i class="xi-star" style="color:var(--bl-star);"></i> ${q.rating}</span>
              </div>
              <h5 style="font-size:15.5px; font-weight:700; color:var(--bl-gray-900); margin-bottom:10px;">${q.agency}</h5>

              <div style="background:var(--bl-gray-50); border-radius:8px; padding:10px 12px; margin-bottom:10px; display:flex; justify-content:space-between;">
                <div>
                  <div style="font-size:11.5px; color:var(--bl-gray-500);">4인 출발 (1인)</div>
                  <strong style="font-size:14px;">USD ${q.usd4}</strong>
                  <div style="font-size:11px; color:var(--bl-gray-400);">약 ${toKrw(q.usd4)}</div>
                </div>
                <div style="text-align:right;">
                  <div style="font-size:11.5px; color:var(--bl-point-text); font-weight:700;">6인 풀방 (1인)</div>
                  <strong style="font-size:15.5px; color:var(--bl-point-text);">USD ${q.usd6}</strong>
                  <div style="font-size:11px; color:var(--bl-point-text);">약 ${toKrw(q.usd6)}</div>
                </div>
              </div>

              <div style="font-size:12.5px; color:var(--bl-gray-700); display:grid; gap:4px; margin-bottom:10px;">
                <div><strong>차량:</strong> ${q.vehTitle}</div>
                <div><strong>숙소:</strong> ${q.gerTitle}</div>
              </div>

              <div style="font-size:12px; color:var(--bl-gray-700); background:var(--bl-gray-50); padding:9px 10px; border-radius:8px; line-height:1.5;">
                ${q.perks}
              </div>
            </div>
          </div>

          <div style="padding:0 16px 16px; display:grid; gap:6px;">
            <button type="button" class="bl-btn bl-btn-point bl-btn-sm" style="width:100%;" onclick="closeModal('quoteCompareModal'); openJoinDetailModal('j1', '${q.agency}', '${toKrw(q.usd6)}');">
              이 견적으로 확정 (1/N 결제)
            </button>
            <button type="button" class="bl-btn bl-btn-outline bl-btn-sm" style="width:100%;" onclick="showToast('${q.agency} 전담 매니저와 1:1 안심채팅이 연결되었습니다.')">
              1:1 일정 조율 채팅
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  openModal('quoteCompareModal');
}

function submitCustomerWizard() {
  const dates = document.getElementById('wDates').value.trim();
  const typeTag = document.getElementById('wType').value;
  const course = document.getElementById('wCourse').value;
  const infra = document.getElementById('wInfra').value;
  const memo = document.getElementById('wMemo').value.trim();

  RFQ_LIST.unshift({
    id: 'rfq-' + Date.now(),
    author: '신규 등록 고객님',
    initial: '신',
    createdAt: '방금 전',
    dates,
    typeTag,
    course,
    infra,
    memo,
    maxBids: 6,
    quotes: [
      {
        agency: '고비 스타 글램핑 (MOKTA-007 · 빠른제안)',
        rating: '4.98 (128)',
        usd4: 730,
        usd6: 570,
        vehTitle: '2025 신형 스타렉스 4WD',
        gerTitle: '전 일정 개인 온수샤워 글램핑',
        vehPhoto: './images/vehicle_fleet.jpg',
        gerPhoto: './images/ger_interior.jpg',
        perks: '등록 즉시 1호 제안 도착 · 드론 스냅 무료 · 노팁/노옵션 보장'
      }
    ]
  });

  closeModal('rfqWizardModal');
  renderRfqBoard();
  scrollToSection('sec-rfq');
  document.getElementById('heroTickerMsg').innerHTML = `방금 등록하신 <strong>[${dates} ${course}]</strong> 일정이 MOKTA 32개 회원사 파트너센터에 실시간 전송되었습니다.`;
  showToast('일정이 등록되었습니다! 상단 [입점업체 센터]로 전환해 직접 견적을 발송해보세요.');
}

// ==================== 2. 실시간 동행·조인 캘린더 & 1/N 결제 ====================
function renderJoinSection() {
  const calDays = [
    { d: '8/15 (토)', key: '08-15', tag: '출발확정', cls: 'confirm' },
    { d: '8/22 (토)', key: '08-22', tag: '1석남음', cls: 'imminent' },
    { d: '8/29 (토)', key: '08-29', tag: '출발확정', cls: 'confirm' },
    { d: '9/05 (토)', key: '09-05', tag: '입찰3건', cls: 'bidding' },
    { d: '9/12 (토)', key: '09-12', tag: '출발확정', cls: 'confirm' },
    { d: '9/19 (추석)', key: '09-19', tag: '1석남음', cls: 'imminent' },
    { d: '9/26 (토)', key: 'all', tag: '전체보기', cls: 'confirm' }
  ];

  document.getElementById('joinCalGrid').innerHTML = calDays.map(c => `
    <div class="bl-cal-item ${curJoinDate === c.key ? 'active' : ''}" onclick="filterJoinByDate('${c.key}')">
      <span class="d-num">${c.d}</span>
      <span class="bl-cal-dot ${c.cls}">${c.tag}</span>
    </div>
  `).join('');

  const list = JOIN_TOURS.filter(j => {
    const matchD = curJoinDate === 'all' || j.dateKey === curJoinDate;
    const matchKw = !searchKeyword || j.title.toLowerCase().includes(searchKeyword) || j.agency.toLowerCase().includes(searchKeyword);
    return matchD && matchKw;
  });

  const displayList = list.length ? list : JOIN_TOURS;

  document.getElementById('joinCardsGrid').innerHTML = displayList.map(j => {
    const seatsHtml = Array.from({ length: j.maxSeats }).map((_, idx) => {
      const s = j.seats[idx];
      return s
        ? `<div class="bl-seat filled">${s}</div>`
        : `<div class="bl-seat open">잔여석</div>`;
    }).join('');

    return `
      <article class="bl-join-card">
        <div>
          <div class="bl-join-thumb" onclick="openJoinDetailModal('${j.id}')">
            <img src="${j.thumb}" alt="${j.title}" loading="lazy" />
            <div class="bl-join-badges">
              <span class="bl-badge-solid ${j.badgeCls}">${j.status} · ${j.seats.length}/${j.maxSeats}명</span>
            </div>
          </div>

          <div class="bl-join-body">
            <div>
              <div class="bl-join-agency">${j.agency} · ${j.dateLabel}</div>
              <h4 class="bl-join-title" style="margin-top:3px;" onclick="openJoinDetailModal('${j.id}')">${j.title}</h4>
            </div>

            <div class="bl-seat-pills">${seatsHtml}</div>

            <div class="bl-join-price-row">
              <div>
                <div style="font-size:11.5px; color:var(--bl-gray-400);">현재가 <i class="xi-arrow-right"></i> 6인 풀방 시</div>
                <strong style="font-size:15px; color:var(--bl-gray-900);">${j.curPrice} <span style="color:var(--bl-point-text);">→ ${j.fullPrice}</span></strong>
              </div>
              <button type="button" class="bl-btn bl-btn-soft bl-btn-sm" onclick="openJoinDetailModal('${j.id}')">
                1/N 합류
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function filterJoinByDate(key) {
  curJoinDate = key;
  renderJoinSection();
}

function setSimPax(pax, btn) {
  btn.parentElement.querySelectorAll('.bl-pax-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const map = {
    3: { d: '3/6석 모객 기준 (추가 합류 시 자동 환급)', k: '1인 1,110,000원', u: '(USD 805)' },
    4: { d: '4/6석 최소 출발확정 달성!', k: '1인 920,000원', u: '(USD 665)' },
    5: { d: '5/6석 합류 시 전원 적용 단가', k: '1인 820,000원', u: '(USD 595)' },
    6: { d: '6/6석 풀방 달성 최저 공동구매가!', k: '1인 740,000원', u: '(USD 535)' }
  };
  document.getElementById('simDescLabel').textContent = map[pax].d;
  document.getElementById('simKrwText').textContent = map[pax].k;
  document.getElementById('simUsdText').textContent = map[pax].u;
}

function openJoinDetailModal(joinId, overrideAgency, overridePrice) {
  const j = JOIN_TOURS.find(x => x.id === joinId) || JOIN_TOURS[0];
  const agencyLabel = overrideAgency || j.agency;
  const unitPrice = overridePrice || j.fullPrice;

  document.getElementById('joinModalTitle').textContent = j.title;
  document.getElementById('joinModalBody').innerHTML = `
    <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; margin-bottom:16px;">
      ${j.gallery.map(img => `<img src="${img}" alt="투어 실사" style="aspect-ratio:4/3; width:100%; object-fit:cover; border-radius:8px;" />`).join('')}
    </div>

    <div style="background:var(--bl-point-bg); border:1px solid var(--bl-point-line); border-radius:10px; padding:14px 16px; margin-bottom:16px;">
      <div style="font-size:12px; font-weight:700; color:var(--bl-point-text);">${agencyLabel}</div>
      <strong style="display:block; font-size:15.5px; color:var(--bl-gray-900); margin-top:2px;">총무 계좌 송금 없이 각자 본인 카드로 1/N 분할결제</strong>
      <p style="font-size:12.5px; color:var(--bl-gray-700); margin-top:2px;">모르는 동행에게 큰 금액을 입금할 필요 없이 부럽 에스크로 결제 링크로 내 몫만 안전하게 결제합니다.</p>
    </div>

    <div style="border:1px solid var(--bl-gray-200); border-radius:10px; padding:15px; margin-bottom:16px;">
      <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:700; margin-bottom:10px;">
        <span>실시간 동행 팀원 결제 현황</span>
        <span style="color:var(--bl-point-text);">${j.seats.length} / ${j.maxSeats}명 완료</span>
      </div>
      <div style="display:grid; gap:6px; font-size:13px;">
        ${j.seats.map((s, idx) => `
          <div style="display:flex; justify-content:space-between; padding:8px 12px; background:var(--bl-gray-50); border-radius:6px;">
            <span>탑승자 ${idx + 1} (${s})</span>
            <strong style="color:var(--bl-gray-700);"><i class="xi-check-min" style="color:var(--bl-point-dark);"></i> 개별 결제완료 (${unitPrice})</strong>
          </div>
        `).join('')}
        <div style="display:flex; justify-content:space-between; padding:9px 12px; background:var(--bl-point-bg); border:1px solid var(--bl-point-line); border-radius:6px;">
          <strong>내 합류 좌석 (${j.seats.length + 1}번째 탑승자)</strong>
          <strong style="color:var(--bl-point-text);">무이자 카드결제 가능 (${unitPrice})</strong>
        </div>
      </div>
    </div>

    <button type="button" class="bl-btn bl-btn-point bl-btn-lg" style="width:100%;" onclick="closeModal('joinDetailModal'); showToast('내 몫 1/N 안심결제가 완료되었습니다! 확정 바우처와 전담 소통방 안내가 발송됩니다.');">
      내 몫(${unitPrice})만 안전하게 카드 결제하기
    </button>
  `;
  openModal('joinDetailModal');
}

// ==================== 3. 현장 LIVE 쇼케이스 (.bl-explore 스타일) ====================
function renderShowcase() {
  const list = SHOWCASE_DATA.filter(item => {
    const matchCat = curShowcaseCat === 'all' || item.cat === curShowcaseCat;
    const matchKw = !searchKeyword || item.caption.toLowerCase().includes(searchKeyword) || item.agency.toLowerCase().includes(searchKeyword);
    return matchCat && matchKw;
  });

  document.getElementById('showcaseGrid').innerHTML = list.map(item => `
    <article class="bl-explore-card" onclick="openReelPlayer('${item.id}')">
      <img src="${item.cover}" alt="${item.caption}" class="bg-photo" loading="lazy" />

      <div class="bl-explore-top">
        <span class="bl-glass-pill"><i class="xi-play"></i> ${item.duration}</span>
        <span class="bl-glass-pill"><i class="xi-heart"></i> ${item.likes}</span>
      </div>

      <div class="bl-explore-txt">
        <em>${item.agency}</em>
        <strong>${item.caption}</strong>
        <span>${item.productTitle} · ${item.productPrice}~</span>
      </div>

      <span class="bl-explore-arrow"><i class="xi-arrow-right"></i></span>
    </article>
  `).join('');
}

function filterShowcase(cat, btn) {
  curShowcaseCat = cat;
  btn.parentElement.querySelectorAll('.bl-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderShowcase();
}

function openReelPlayer(id) {
  const item = SHOWCASE_DATA.find(x => x.id === id) || SHOWCASE_DATA[0];
  document.getElementById('reelModalBody').innerHTML = `
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:20px; align-items:stretch;">
      <div style="position:relative; border-radius:12px; overflow:hidden; min-height:400px; background:#000;">
        <img src="${item.cover}" alt="${item.caption}" style="width:100%; height:100%; object-fit:cover;" />
        <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 45%, rgba(0,0,0,0.82) 100%); padding:16px; display:flex; flex-direction:column; justify-content:space-between; color:#fff;">
          <div style="display:flex; justify-content:space-between;">
            <span class="bl-glass-pill">${item.moktaNo} 현장인증</span>
            <span class="bl-glass-pill"><i class="xi-eye-o"></i> ${item.views}</span>
          </div>
          <div>
            <div style="font-size:12px; color:#8ce0ff; font-weight:700; margin-bottom:4px;">${item.agency}</div>
            <div style="font-size:15px; font-weight:700; line-height:1.4;">${item.caption}</div>
          </div>
        </div>
      </div>

      <div style="display:flex; flex-direction:column; justify-content:space-between; gap:16px;">
        <div>
          <span class="bl-mokta-tag">쇼퍼블 미디어 연동</span>
          <h5 style="font-size:18px; font-weight:700; margin:8px 0 6px;">영상·화보 속 실제 투입 투어 상품</h5>
          <p style="font-size:13px; color:var(--bl-gray-500); margin-bottom:14px;">
            MOKTA 회원사가 직접 촬영한 실제 배정 차량 및 캠프입니다. 연결된 대표 상품을 바로 예약하거나 내 날짜로 맞춤 견적을 받아보세요.
          </p>

          <div style="border:1px solid var(--bl-gray-200); border-radius:10px; padding:12px; display:flex; gap:12px; align-items:center; margin-bottom:12px;">
            <img src="${item.productImg}" alt="${item.productTitle}" style="width:84px; height:84px; border-radius:8px; object-fit:cover; flex-shrink:0;" />
            <div>
              <div style="font-size:12px; color:var(--bl-gray-500);">${item.agency}</div>
              <div style="font-size:14px; font-weight:700; margin:2px 0 4px;">${item.productTitle}</div>
              <strong style="font-size:16px; color:var(--bl-gray-900);">${item.productPrice}~</strong>
            </div>
          </div>

          <div style="background:var(--bl-gray-50); border-radius:8px; padding:11px 12px; font-size:12.5px; color:var(--bl-gray-700);">
            <i class="xi-check-circle" style="color:var(--bl-point-dark);"></i> 사진과 다른 등급 차량·숙소 배정 시 부럽×MOKTA 안심 보상제 적용
          </div>
        </div>

        <div style="display:grid; gap:8px;">
          <button type="button" class="bl-btn bl-btn-point bl-btn-lg" style="width:100%;" onclick="closeModal('reelModal'); openModal('rfqWizardModal');">
            이 업체 포함하여 내 일정 견적 요청하기
          </button>
          <button type="button" class="bl-btn bl-btn-outline" style="width:100%;" onclick="closeModal('reelModal'); openAgencyMiniHome('${item.agencyId || 'ag1'}');">
            회원사 미니홈 &amp; 전체 상품 보기
          </button>
        </div>
      </div>
    </div>
  `;
  openModal('reelModal');
}

// ==================== 4. 테두리 없는 1:1 상품 그리드 & 20개 회원사 로고·슬라이더 ====================
// 20개 MOKTA 회원사별 고유 벡터 브랜드 엠블럼 생성기
function buildAgencyEmblemSvg(a) {
  const shapes = {
    dune: '<circle cx="30" cy="14" r="5" fill="#fde047"/><path d="M6 34 Q18 21 30 31 T42 28 L42 42 L6 42 Z" fill="#fff" opacity="0.92"/>',
    ger: '<path d="M9 32 L9 24 L24 13 L39 24 L39 32 Z" fill="#fff"/><path d="M19 32 V24 H29 V32" fill="none" stroke="' + a.c2 + '" stroke-width="2.2"/><circle cx="24" cy="19" r="2.3" fill="' + a.c1 + '"/>',
    wave: '<path d="M8 23 Q16 16 24 23 T40 23" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M8 31 Q16 24 24 31 T40 31" fill="none" stroke="#99f6e4" stroke-width="2.6" stroke-linecap="round"/>',
    lens: '<rect x="10" y="14" width="28" height="20" rx="5" fill="none" stroke="#fff" stroke-width="2.5"/><circle cx="24" cy="24" r="5.5" fill="#fff"/><circle cx="33" cy="18" r="1.8" fill="#fde047"/>',
    peak: '<path d="M7 34 L19 14 L27 26 L33 18 L41 34 Z" fill="#fff"/><path d="M19 14 L23 20 L19 19 L15 20 Z" fill="#fcd34d"/>',
    arch: '<path d="M11 34 V21 A13 13 0 0 1 37 21 V34" fill="none" stroke="#fff" stroke-width="3"/><path d="M18 34 V23 A6 6 0 0 1 30 23 V34" fill="#a7f3d0"/>',
    star: '<path d="M24 10 L27 20 L38 24 L27 28 L24 38 L21 28 L10 24 L21 20 Z" fill="#fff"/><circle cx="34" cy="14" r="2" fill="#fde047"/>',
    pine: '<path d="M24 10 L35 23 H29 L37 34 H11 L19 23 H13 Z" fill="#fff"/>',
    wheel: '<circle cx="24" cy="24" r="11" fill="none" stroke="#fff" stroke-width="2.6"/><circle cx="24" cy="24" r="3.5" fill="#fde047"/><path d="M24 13 V35 M13 24 H35" stroke="#fff" stroke-width="2"/>',
    stupa: '<path d="M24 10 L29 18 H19 Z M16 20 H32 V27 H16 Z M11 29 H37 V35 H11 Z" fill="#fff"/>',
    camel: '<path d="M11 32 L14 22 Q18 14 21 22 Q25 13 29 22 L34 20 L37 25 L34 32 Z" fill="#fff"/>',
    compass: '<circle cx="24" cy="24" r="12" fill="none" stroke="#fff" stroke-width="2.2"/><polygon points="24,13 28,24 24,35 20,24" fill="#fff"/><circle cx="24" cy="24" r="2.2" fill="#f59e0b"/>',
    dome: '<path d="M9 33 A15 15 0 0 1 39 33 Z" fill="#fff"/><path d="M15 33 A9 9 0 0 1 33 33" fill="none" stroke="' + a.c2 + '" stroke-width="2"/>',
    crater: '<path d="M8 33 L16 18 L24 23 L32 18 L40 33 Z" fill="#fff"/><ellipse cx="24" cy="20" rx="6" ry="2.5" fill="#67e8f9"/>',
    flame: '<path d="M24 10 C31 17 35 23 31 31 C29 35 19 35 17 31 C13 24 18 17 24 10 Z" fill="#fff"/><circle cx="24" cy="28" r="4" fill="#fde047"/>',
    sail: '<path d="M23 11 V31 H11 Z" fill="#fff"/><path d="M26 15 L36 31 H26 Z" fill="#c7d2fe"/><path d="M9 34 H39" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>',
    spark: '<path d="M16 34 L24 14 L32 34 M12 31 L36 21 M12 21 L36 31" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>',
    horse: '<path d="M14 34 L17 20 L25 13 L33 17 L30 23 L24 22 L23 34 Z" fill="#fff"/>',
    drone: '<circle cx="14" cy="15" r="4" stroke="#fff" stroke-width="2" fill="none"/><circle cx="34" cy="15" r="4" stroke="#fff" stroke-width="2" fill="none"/><circle cx="14" cy="33" r="4" stroke="#fff" stroke-width="2" fill="none"/><circle cx="34" cy="33" r="4" stroke="#fff" stroke-width="2" fill="none"/><rect x="19" y="20" width="10" height="8" rx="3" fill="#fff"/>',
    eagle: '<path d="M8 18 Q17 14 24 23 Q31 14 40 18 Q32 28 24 33 Q16 28 8 18 Z" fill="#fff"/><circle cx="24" cy="16" r="2.5" fill="#fef08a"/>'
  };
  const inner = shapes[a.motif] || shapes.star;
  const gid = 'lg_' + a.id + '_' + Math.random().toString(36).slice(2, 6);
  return `
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="${gid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${a.c1}" />
          <stop offset="100%" stop-color="${a.c2}" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#${gid})" />
      ${inner}
    </svg>
  `;
}

function renderLogoMarquee() {
  const track = document.getElementById('logoMarqueeTrack');
  if (!track) return;
  const doubled = [...MOKTA_AGENCIES, ...MOKTA_AGENCIES];
  track.innerHTML = doubled.map(a => `
    <div class="bl-logo-chip" onclick="openAgencyMiniHome('${a.id}')">
      <div class="bl-logo-chip-svg">${buildAgencyEmblemSvg(a)}</div>
      <div class="bl-logo-chip-meta">
        <strong>${a.name}</strong>
        <span>${a.specLabel} · <i class="xi-star"></i> ${a.rating}</span>
      </div>
    </div>
  `).join('');
}

let partnerAutoTimer = null;
let partnerAutoPlaying = true;
let partnerHoverPaused = false;

function renderStoreAndAgencies() {
  const prodList = DIRECT_PRODUCTS.filter(p => !searchKeyword || p.title.toLowerCase().includes(searchKeyword) || p.agency.toLowerCase().includes(searchKeyword));

  document.getElementById('productStoreGrid').innerHTML = prodList.map(p => `
    <article class="bl-item-box" onclick="openJoinDetailModal('j1', '${p.agency}', '${p.price}')">
      <div class="bl-item-thumb">
        <img src="${p.img}" alt="${p.title}" loading="lazy" />
        <span class="bl-wish-btn"><i class="xi-heart-o"></i></span>
        <span class="bl-item-tag">${p.tag}</span>
      </div>
      <div class="bl-item-info">
        <div class="bl-item-sub">${p.agency}</div>
        <div class="bl-item-name">${p.title}</div>
        <div class="bl-item-meta">
          <i class="xi-star"></i>
          <span>${p.rating}</span>
          <span style="color:var(--bl-gray-400);">(${p.count})</span>
        </div>
        <div class="bl-item-price">
          <span class="bl-item-discount">${p.discount}</span>
          <span class="bl-item-won">${p.price}~</span>
        </div>
      </div>
    </article>
  `).join('');

  const agList = MOKTA_AGENCIES.filter(a => {
    const matchC = curAgencyCat === 'all' || a.cat === curAgencyCat;
    const matchKw = !searchKeyword || a.name.toLowerCase().includes(searchKeyword) || a.desc.toLowerCase().includes(searchKeyword) || a.specLabel.toLowerCase().includes(searchKeyword);
    return matchC && matchKw;
  });

  const track = document.getElementById('agencyCardsGrid');
  track.innerHTML = agList.map(a => `
    <article class="bl-partner-card">
      <div>
        <div class="bl-pcard-cover" onclick="openAgencyMiniHome('${a.id}')">
          <img src="${a.cover}" alt="${a.name}" class="cover-img" loading="lazy" />
          <div class="bl-pcard-cover-top">
            <span class="bl-pcard-cert">${a.certNo} 공식인증</span>
            <span class="bl-pcard-rating"><i class="xi-star"></i> ${a.rating} (${a.reviews})</span>
          </div>
        </div>

        <div class="bl-pcard-body">
          <div class="bl-pcard-brand-row">
            <div class="bl-pcard-emblem" onclick="openAgencyMiniHome('${a.id}')" style="cursor:pointer;">
              ${buildAgencyEmblemSvg(a)}
            </div>
            <span class="bl-pcard-spec-badge">${a.specLabel}</span>
          </div>

          <div class="bl-pcard-title-box" onclick="openAgencyMiniHome('${a.id}')" style="cursor:pointer;">
            <h4>${a.name}</h4>
            <div class="en-name">${a.en}</div>
          </div>

          <p class="bl-pcard-desc">${a.desc}</p>

          <div class="bl-pcard-metrics">
            <div><span>평균응답</span><strong>${a.speed}</strong></div>
            <div><span>보유인프라</span><strong>${a.fleetCount}</strong></div>
            <div><span>출발확정률</span><strong>${a.confirmRate}</strong></div>
          </div>

          <div class="bl-partner-thumbs" onclick="openAgencyMiniHome('${a.id}')" style="cursor:pointer;">
            ${a.thumbs.map(t => `<img src="${t}" alt="${a.name} 실사" loading="lazy" />`).join('')}
          </div>
        </div>
      </div>

      <div style="padding:0 18px 18px; display:flex; gap:8px;">
        <button type="button" class="bl-btn bl-btn-outline bl-btn-sm" style="flex:1;" onclick="openAgencyMiniHome('${a.id}')">
          브랜드 미니홈
        </button>
        <button type="button" class="bl-btn bl-btn-soft bl-btn-sm" onclick="openModal('rfqWizardModal')">
          1:1 지정견적
        </button>
      </div>
    </article>
  `).join('');

  track.scrollLeft = 0;
  updatePartnerProgress(agList.length);
}

function slidePartnerCards(dir) {
  const track = document.getElementById('agencyCardsGrid');
  if (!track) return;
  const firstCard = track.querySelector('.bl-partner-card');
  const step = firstCard ? firstCard.offsetWidth + 16 : 360;
  const maxScroll = track.scrollWidth - track.clientWidth;

  if (dir > 0 && track.scrollLeft >= maxScroll - 12) {
    track.scrollTo({ left: 0, behavior: 'smooth' });
  } else if (dir < 0 && track.scrollLeft <= 12) {
    track.scrollTo({ left: maxScroll, behavior: 'smooth' });
  } else {
    track.scrollBy({ left: dir * step, behavior: 'smooth' });
  }
}

function updatePartnerProgress(totalOverride) {
  const track = document.getElementById('agencyCardsGrid');
  const fill = document.getElementById('partnerProgressFill');
  const txt = document.getElementById('partnerPageTxt');
  if (!track || !fill || !txt) return;

  const cards = track.querySelectorAll('.bl-partner-card');
  const total = totalOverride || cards.length || 1;
  const maxScroll = Math.max(1, track.scrollWidth - track.clientWidth);
  const ratio = Math.min(1, Math.max(0, track.scrollLeft / maxScroll));
  const curIdx = Math.min(total, Math.max(1, Math.round(ratio * (total - 1)) + 1));

  fill.style.width = `${Math.max(8, ratio * 100)}%`;
  txt.textContent = `${curIdx} / ${total}`;
}

function togglePartnerAutoSlide() {
  partnerAutoPlaying = !partnerAutoPlaying;
  const btn = document.getElementById('partnerAutoBtn');
  const mq = document.getElementById('logoMarqueeWrap');
  if (mq) mq.classList.toggle('paused', !partnerAutoPlaying);
  if (btn) {
    btn.innerHTML = partnerAutoPlaying
      ? '<i class="xi-pause"></i> 자동 슬라이드 중'
      : '<i class="xi-play"></i> 슬라이드 정지됨';
  }
}

function initPartnerCarouselEngine() {
  const track = document.getElementById('agencyCardsGrid');
  const viewport = document.getElementById('partnerSliderViewport');
  if (!track || !viewport) return;

  track.addEventListener('scroll', () => updatePartnerProgress(), { passive: true });

  viewport.addEventListener('mouseenter', () => { partnerHoverPaused = true; });
  viewport.addEventListener('mouseleave', () => { partnerHoverPaused = false; });
  viewport.addEventListener('touchstart', () => { partnerHoverPaused = true; }, { passive: true });
  viewport.addEventListener('touchend', () => {
    setTimeout(() => { partnerHoverPaused = false; }, 2200);
  }, { passive: true });

  // 마우스 드래그 스크롤 지원
  let isDown = false;
  let startX = 0;
  let startScrollLeft = 0;
  track.addEventListener('mousedown', (e) => {
    if (e.target.closest('button')) return;
    isDown = true;
    track.classList.add('dragging');
    startX = e.pageX - track.offsetLeft;
    startScrollLeft = track.scrollLeft;
  });
  window.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    track.classList.remove('dragging');
  });
  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    track.scrollLeft = startScrollLeft - (x - startX) * 1.2;
  });

  clearInterval(partnerAutoTimer);
  partnerAutoTimer = setInterval(() => {
    if (!partnerAutoPlaying || partnerHoverPaused || document.body.classList.contains('partner-mode')) return;
    slidePartnerCards(1);
  }, 3200);
}

function filterAgencies(cat, btn) {
  curAgencyCat = cat;
  btn.parentElement.querySelectorAll('.bl-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderStoreAndAgencies();
}

function openAgencyMiniHome(agId) {
  const a = MOKTA_AGENCIES.find(x => x.id === agId) || MOKTA_AGENCIES[0];
  document.getElementById('agencyModalTitle').textContent = `${a.name} (${a.certNo})`;
  document.getElementById('agencyModalBody').innerHTML = `
    <div style="position:relative; height:180px; border-radius:12px; overflow:hidden; margin-bottom:16px;">
      <img src="${a.cover}" alt="${a.name}" style="width:100%; height:100%; object-fit:cover;" />
      <div style="position:absolute; inset:0; background:linear-gradient(90deg, rgba(18,22,25,0.82) 0%, rgba(18,22,25,0.28) 100%); padding:20px; display:flex; align-items:flex-end; justify-content:space-between; gap:14px; flex-wrap:wrap; color:#fff;">
        <div style="display:flex; align-items:center; gap:14px;">
          <div style="width:60px; height:60px; border-radius:14px; background:#fff; padding:4px; flex-shrink:0;">
            ${buildAgencyEmblemSvg(a)}
          </div>
          <div>
            <span class="bl-mokta-tag" style="margin-bottom:4px;">몽골한국관광협회 공식 정회원 · ${a.certNo}</span>
            <h3 style="font-size:21px; font-weight:800;">${a.name}</h3>
            <div style="font-size:12px; opacity:0.88;">${a.en} · <i class="xi-star" style="color:var(--bl-star);"></i> ${a.rating} (${a.reviews}개 인증 리뷰)</div>
          </div>
        </div>
        <button type="button" class="bl-btn bl-btn-point" onclick="closeModal('agencyHomeModal'); openModal('rfqWizardModal');">이 업체에 지정견적 요청</button>
      </div>
    </div>

    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:10px; margin-bottom:18px; background:var(--bl-gray-50); border-radius:10px; padding:12px; text-align:center;">
      <div><span style="font-size:12px; color:var(--bl-gray-500);">평균 견적 응답</span><strong style="display:block; font-size:15px; margin-top:2px;">${a.speed}</strong></div>
      <div><span style="font-size:12px; color:var(--bl-gray-500);">직영·제휴 인프라</span><strong style="display:block; font-size:15px; margin-top:2px;">${a.fleetCount}</strong></div>
      <div><span style="font-size:12px; color:var(--bl-gray-500);">출발 확정률</span><strong style="display:block; font-size:15px; color:var(--bl-point-text); margin-top:2px;">${a.confirmRate}</strong></div>
    </div>

    <p style="font-size:13.5px; color:var(--bl-gray-700); margin-bottom:16px; line-height:1.55;">${a.desc} (${a.fleet})</p>

    <strong style="display:block; font-size:14.5px; margin-bottom:10px;">보유 차량 · 직영 캠프 · 현장 실사</strong>
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; margin-bottom:20px;">
      ${a.thumbs.map(t => `<img src="${t}" alt="실사" style="aspect-ratio:4/3; width:100%; object-fit:cover; border-radius:8px;" />`).join('')}
    </div>

    <strong style="display:block; font-size:14.5px; margin-bottom:10px;">대표 투어 상품</strong>
    <div style="display:grid; gap:8px;">
      ${a.products.map(p => `
        <div style="border:1px solid var(--bl-gray-200); border-radius:10px; padding:13px 16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <strong style="font-size:14.5px;">${p.name}</strong>
            <div style="font-size:12px; color:var(--bl-gray-500);">노팁·노옵션 표준약관 · 부럽 안심결제</div>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <strong style="font-size:16px; color:var(--bl-point-text);">${p.price}</strong>
            <button type="button" class="bl-btn bl-btn-point bl-btn-sm" onclick="closeModal('agencyHomeModal'); openJoinDetailModal('j1', '${a.name}', '${p.price}');">예약·조인</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  openModal('agencyHomeModal');
}

// ==================== 5. 입점업체 파트너 센터 기능 ====================
function populatePartnerRfqDropdown(preselectId) {
  const sel = document.getElementById('pTargetRfq');
  if (!sel) return;
  sel.innerHTML = RFQ_LIST.map(r =>
    `<option value="${r.id}" ${preselectId === r.id ? 'selected' : ''}>[${r.createdAt}] ${r.author} · ${r.course} (${r.dates}) — 입찰 ${r.quotes.length}/${r.maxBids}</option>`
  ).join('');
}

function jumpToPartnerBid(rfqId) {
  switchSiteRole('partner');
  populatePartnerRfqDropdown(rfqId);
  showToast('입점업체 센터로 전환되었습니다. 차량·숙소 실사를 선택해 견적을 보내보세요.');
}

function selectBidPhotoPair(el) {
  document.querySelectorAll('#bidPhotoPicker .bl-photo-pick').forEach(x => x.classList.remove('selected'));
  el.classList.add('selected');
  selectedBidVehPhoto = el.getAttribute('data-veh');
  selectedBidGerPhoto = el.getAttribute('data-ger');
}

function loadPartnerPreset(key) {
  const map = {
    gobi: { u4: 710, u6: 550, v: '2025 신형 스타렉스 4WD 리무진', g: '전 일정 개인 온수샤워 투어리스트 게르', c: '노팁·노옵션 서약! 홍고르엘스 드론 촬영 + 은하수 스냅 원본 무료 제공 및 에이스 가이드를 배정합니다.' },
    khuvsgul: { u4: 760, u6: 590, v: '벤츠 스프린터 또는 스타렉스 어반', g: '홉스골 호수 1열 레이크뷰 글램핑 게르', c: '홉스골 소원섬 보트투어 + 쳉헤르 노천온천 입장권 전원 무료 포함해 모십니다.' },
    terelj: { u4: 530, u6: 420, v: '에어컨 장착 감성 루프랙 푸르공', g: '테를지 신축 리조트형 온수 게르', c: '승마 트레킹 1시간 + 정통 양갈비 허르헉 특식을 무료 서비스로 제공해 드립니다.' }
  };
  const p = map[key];
  document.getElementById('pUsd4').value = p.u4;
  document.getElementById('pUsd6').value = p.u6;
  document.getElementById('pVehName').value = p.v;
  document.getElementById('pGerName').value = p.g;
  document.getElementById('pComment').value = p.c;
  showToast('코스 템플릿이 자동 입력되었습니다.');
}

function sendPartnerQuoteLive() {
  const rfqId = document.getElementById('pTargetRfq').value;
  const item = RFQ_LIST.find(x => x.id === rfqId);
  if (!item) return;
  if (item.quotes.length >= item.maxBids) {
    showToast('해당 일정은 최대 입찰 슬롯(6개사)이 마감되었습니다.');
    return;
  }

  item.quotes.unshift({
    agency: '어드벤처 몽골 투어 (MOKTA-014 · 방금 도착)',
    rating: '4.96 (183)',
    usd4: Number(document.getElementById('pUsd4').value) || 710,
    usd6: Number(document.getElementById('pUsd6').value) || 550,
    vehTitle: document.getElementById('pVehName').value,
    gerTitle: document.getElementById('pGerName').value,
    vehPhoto: selectedBidVehPhoto,
    gerPhoto: selectedBidGerPhoto,
    perks: document.getElementById('pComment').value
  });

  renderRfqBoard();
  switchSiteRole('customer');
  setTimeout(() => openQuoteCompareModal(rfqId), 120);
  showToast('실사 비교견적 발송 완료! 고객 비교창 첫 번째 카드에 즉시 반영되었습니다.');
}

function selectShowcasePreset(el) {
  document.querySelectorAll('#showcasePresetPicker .bl-photo-pick').forEach(x => x.classList.remove('selected'));
  el.classList.add('selected');
  selectedShowcaseImg = el.getAttribute('data-img');
}

function handleLocalPhotoUpload(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  selectedShowcaseImg = URL.createObjectURL(file);
  showToast('내 기기 사진이 선택되었습니다. 아래 노출 버튼을 눌러 반영해보세요.');
}

function publishPartnerShowcase() {
  const caption = document.getElementById('pShowTitle').value.trim();
  const cat = document.getElementById('pShowCat').value;
  const prod = document.getElementById('pShowProd').value.trim();
  if (!caption) return;

  SHOWCASE_DATA.unshift({
    id: 'sc-new-' + Date.now(),
    agencyId: 'ag1',
    agency: '어드벤처 몽골 투어',
    moktaNo: 'MOKTA-014',
    cover: selectedShowcaseImg,
    cat,
    duration: 'NEW',
    views: '방금',
    likes: 1,
    caption,
    productTitle: prod,
    productPrice: '790,000원',
    productImg: selectedShowcaseImg
  });

  curShowcaseCat = 'all';
  renderShowcase();
  switchSiteRole('customer');
  setTimeout(() => scrollToSection('sec-showcase'), 100);
  showToast('신규 현장 실사가 [현장 LIVE 쇼케이스] 첫 번째 자리에 등록되었습니다.');
}

function toggleMongolianMode() {
  document.body.classList.toggle('show-mn');
  const on = document.body.classList.contains('show-mn');
  document.getElementById('mnToggleBtn').innerHTML = on
    ? '<i class="xi-globus"></i> 한국어 단독 표기'
    : '<i class="xi-globus"></i> 한·몽 병기 켜기 (현지 직원용)';
}

function togglePartnerMobile() {
  const wrap = document.getElementById('partnerWorkspace');
  wrap.classList.toggle('mobile-sim');
  const isMob = wrap.classList.contains('mobile-sim');
  document.getElementById('mobSimBtn').innerHTML = isMob
    ? '<i class="xi-desktop"></i> PC 화면으로 복귀'
    : '<i class="xi-mobile"></i> 스마트폰 뷰 전환';
}

// ==================== 모달 & ESC 닫기 ====================
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
function bgClose(e, id) { if (e.target.id === id) closeModal(id); }

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.bl-modal-dim.open').forEach(m => m.classList.remove('open'));
  }
});

let toastTimer = null;
function showToast(msg) {
  const el = document.getElementById('toastEl');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 4000);
}

// 초기 렌더링
renderHeroBanners();
renderRfqBoard();
renderJoinSection();
renderShowcase();
renderLogoMarquee();
renderStoreAndAgencies();
initPartnerCarouselEngine();
populatePartnerRfqDropdown();
