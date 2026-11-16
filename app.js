// =========================================================================
// BOOLUB × MOKTA 몽골 공식 플랫폼 — 실제 사이트 구현 데모 데이터 & 인터랙션 엔진
// =========================================================================

const SHOWCASE_DATA = [
  {
    id: 'sc1',
    agencyId: 'ag1',
    agency: '어드벤처 몽골 투어',
    moktaNo: 'MOKTA-014',
    avatar: './images/gobi_camp_vans.jpg',
    cover: './images/milkyway_gobi.jpg',
    cat: '은하수·스냅',
    duration: '0:24',
    views: '2.1만',
    likes: 518,
    caption: '어제 밤 홍고르엘스 모래언덕 바로 앞 캠프에서 찍은 은하수 원본! 무료 별밤 스냅 포함',
    productTitle: '[노팁/드론스냅] 남고비+중부 핵심 5박6일',
    productPrice: '790,000원~',
    productImg: './images/sand_dunes_camp.jpg'
  },
  {
    id: 'sc2',
    agencyId: 'ag2',
    agency: '고비 스타 글램핑',
    moktaNo: 'MOKTA-007',
    avatar: './images/terelj_resort_camp.jpg',
    cover: './images/ger_interior.jpg',
    cat: '게르·샤워실',
    duration: '0:19',
    views: '3.4만',
    likes: 892,
    caption: '몽골 게르 화장실 걱정 끝! 호텔급 트윈베드와 타일 시공 개별 온수 샤워실 내부 공개',
    productTitle: '[전일정 개인샤워실] 럭셔리 글램핑 고비 4박5일',
    productPrice: '940,000원~',
    productImg: './images/ger_interior.jpg'
  },
  {
    id: 'sc3',
    agencyId: 'ag3',
    agency: '홉스골 블루펄 트래블',
    moktaNo: 'MOKTA-021',
    avatar: './images/khuvsgul_island.jpg',
    cover: './images/vehicle_fleet.jpg',
    cat: '푸르공·스타렉스',
    duration: '0:27',
    views: '1.7만',
    likes: 364,
    caption: '감성 러시안 푸르공 vs 2025 신형 스타렉스 4WD! 취향에 맞게 우리 직영 차량 고르세요',
    productTitle: '[차종선택가능] 홉스골+쳉헤르 온천 힐링 5박6일',
    productPrice: '860,000원~',
    productImg: './images/khuvsgul_island.jpg'
  },
  {
    id: 'sc4',
    agencyId: 'ag4',
    agency: '노마드 스냅 익스페디션',
    moktaNo: 'MOKTA-029',
    avatar: './images/tsagaan_suvarga_snap.jpg',
    cover: './images/tsagaan_suvarga_snap.jpg',
    cat: '은하수·스냅',
    duration: '0:21',
    views: '2.9만',
    likes: 731,
    caption: '차강소브라가 화이트 스투파 절벽 위 인생샷 포인트! 전 가이드 소니 A7M4 스냅 무료 촬영',
    productTitle: '[2030 스냅특화] 차강소브라가+바얀작 4박5일',
    productPrice: '720,000원~',
    productImg: './images/baga_gazriin_sunset.jpg'
  },
  {
    id: 'sc5',
    agencyId: 'ag2',
    agency: '고비 스타 글램핑',
    moktaNo: 'MOKTA-007',
    avatar: './images/terelj_resort_camp.jpg',
    cover: './images/glamping_dome_friends.jpg',
    cat: '게르·샤워실',
    duration: '0:18',
    views: '1.9만',
    likes: 475,
    caption: '2030 여자 동행 4인 팀 실제 투숙기! 파노라마 투명 돔 글램핑에서 맞이하는 초원 아침',
    productTitle: '[여성동행 인기] 테를지+미니사막 돔글램핑 3박4일',
    productPrice: '680,000원~',
    productImg: './images/glamping_dome_friends.jpg'
  },
  {
    id: 'sc6',
    agencyId: 'ag1',
    agency: '어드벤처 몽골 투어',
    moktaNo: 'MOKTA-014',
    avatar: './images/gobi_camp_vans.jpg',
    cover: './images/khorkhog_feast.jpg',
    cat: '음식·불멍파티',
    duration: '0:23',
    views: '2.5만',
    likes: 612,
    caption: '달궈진 강돌로 구워낸 정통 양갈비 허르헉 한상차림! 노을 보며 즐기는 초원 만찬',
    productTitle: '[특식3회포함] 중부 어르헝폭포+온천 4박5일',
    productPrice: '750,000원~',
    productImg: './images/orkhon_waterfall_rainbow.jpg'
  },
  {
    id: 'sc7',
    agencyId: 'ag4',
    agency: '노마드 스냅 익스페디션',
    moktaNo: 'MOKTA-029',
    avatar: './images/tsagaan_suvarga_snap.jpg',
    cover: './images/campfire_cheers.jpg',
    cat: '음식·불멍파티',
    duration: '0:16',
    views: '3.2만',
    likes: 845,
    caption: '처음 만난 동행 6명도 하루 만에 절친 되는 캠프파이어 불멍 & 칭기스 맥주 파티 현장!',
    productTitle: '[2030 오픈조인] 별밤불멍 중부+사막 5박6일',
    productPrice: '740,000원~',
    productImg: './images/starlight_ger_snap.jpg'
  },
  {
    id: 'sc8',
    agencyId: 'ag5',
    agency: '몽골 헤리티지 VIP',
    moktaNo: 'MOKTA-002',
    avatar: './images/baga_gazriin_sunset.jpg',
    cover: './images/khuvsgul_boat_sunset.jpg',
    cat: '은하수·스냅',
    duration: '0:29',
    views: '1.5만',
    likes: 339,
    caption: '노을빛으로 물드는 홉스골 호수 프라이빗 보트 투어! 부모님 효도 여행 만족도 1위 코스',
    productTitle: '[국내선포함 VIP] 홉스골 레이크뷰 4박5일',
    productPrice: '1,120,000원~',
    productImg: './images/khuvsgul_boat_sunset.jpg'
  }
];

const RFQ_LIST = [
  {
    id: 'rfq-1',
    author: '박*연님 외 3명',
    createdAt: '11분 전',
    dates: '8월 14일 ~ 8월 19일 (5박 6일)',
    typeTag: '단독투어 · 4명 확정',
    course: '남고비 3대 사막 + 중부 온천',
    infra: '신형 스타렉스 · 전일정 온수샤워 게르',
    memo: '여자 친구들 4명 모임입니다! 바얀작·홍고르엘스·쳉헤르 노천온천 루트 희망하고, 배정될 실제 차량과 숙소 컨디션 사진을 미리 보고 결정하고 싶어요.',
    maxBids: 6,
    quotes: [
      {
        agency: '고비 스타 글램핑 (MOKTA-007)',
        rating: '4.97 (리뷰 128)',
        usd4: 740,
        usd6: 580,
        vehTitle: '2025 스타렉스 4WD 리무진',
        gerTitle: '전 일정 개인 온수샤워 글램핑 게르',
        vehPhoto: './images/vehicle_fleet.jpg',
        gerPhoto: './images/ger_interior.jpg',
        perks: '드론 스냅 원본+보정본 10장 무료 · 공항 단독 픽업 · 유심 4매 증정 · 노팁/노옵션 보장'
      },
      {
        agency: '어드벤처 몽골 투어 (MOKTA-014)',
        rating: '4.95 (리뷰 183)',
        usd4: 705,
        usd6: 550,
        vehTitle: '직영 그랜드 스타렉스 어반',
        gerTitle: '홍고르엘스 사막 앞 신축 온수캠프',
        vehPhoto: './images/gobi_camp_vans.jpg',
        gerPhoto: './images/sand_dunes_camp.jpg',
        perks: '은하수 야간 랜턴 스냅 무료 · 전통 허르헉 바베큐 특식 · 침낭/돗자리 완비 · 노팁/노옵션'
      },
      {
        agency: '노마드 스냅 익스페디션 (MOKTA-029)',
        rating: '4.93 (리뷰 94)',
        usd4: 685,
        usd6: 535,
        vehTitle: '4륜구동 투어 전용 스타렉스',
        gerTitle: '5박 중 4박 투어리스트 온수캠프',
        vehPhoto: './images/steppe_ger_suvs.jpg',
        gerPhoto: './images/glamping_dome_friends.jpg',
        perks: '소니 A7M4 전문 스냅작가 겸임 한국어 가이드 배정 · 불멍 맥주 파티 1회 포함'
      }
    ]
  },
  {
    id: 'rfq-2',
    author: '이*훈님 외 1명',
    createdAt: '34분 전',
    dates: '8월 22일 ~ 8월 26일 (4박 5일)',
    typeTag: '동행조인 · 2명 확정 (4명 추가모집 희망)',
    course: '홉스골 호수 + 테르힝차강노르',
    infra: '감성 푸르공 · 투어리스트 캠프',
    memo: '30대 초반 커플입니다! 성격 밝은 2030 동행분들 4명 더 모아서 6인 풀방으로 푸르공 루프랙 사진도 찍고 즐겁게 다녀오고 싶습니다.',
    maxBids: 6,
    quotes: [
      {
        agency: '홉스골 블루펄 트래블 (MOKTA-021)',
        rating: '4.95 (리뷰 156)',
        usd4: 680,
        usd6: 520,
        vehTitle: '에어컨 개조 신형 감성 푸르공',
        gerTitle: '홉스골 호수 1열 레이크뷰 캠프',
        vehPhoto: './images/vehicle_fleet.jpg',
        gerPhoto: './images/khuvsgul_island.jpg',
        perks: '자사 오픈조인 캘린더에 동시 노출해 잔여 4석 100% 책임 모객 보장! 소원섬 보트투어 포함'
      },
      {
        agency: '몽골 헤리티지 VIP (MOKTA-002)',
        rating: '4.98 (리뷰 89)',
        usd4: 720,
        usd6: 560,
        vehTitle: '정비 완료 클래식 푸르공 + 보조 SUV',
        gerTitle: '침엽수림 리조트형 투어리스트 캠프',
        vehPhoto: './images/steppe_ger_suvs.jpg',
        gerPhoto: './images/terelj_resort_camp.jpg',
        perks: '모객 인원 미달 시에도 추가 요금 없이 출발 보장 · 승마 트레킹 1시간 무료'
      }
    ]
  },
  {
    id: 'rfq-3',
    author: '정*석님 가족 (6명)',
    createdAt: '1시간 전',
    dates: '9월 3일 ~ 9월 7일 (4박 5일)',
    typeTag: '단독투어 · 6명 가족 프리미엄',
    course: '테를지 + 바가가즈링촐로 실속코스',
    infra: '프리미엄 SUV · 럭셔리 글램핑 게르',
    memo: '칠순 부모님 모시고 가는 가족 단독투어입니다. 비포장 이동이 너무 길지 않고 침대·화장실이 깨끗한 리조트급 캠프와 한식 식단 케어 부탁드립니다.',
    maxBids: 6,
    quotes: [
      {
        agency: '몽골 헤리티지 VIP (MOKTA-002)',
        rating: '4.98 (리뷰 89)',
        usd4: 860,
        usd6: 710,
        vehTitle: '랜드크루저 2대 또는 벤츠 스프린터',
        gerTitle: '테를지 고급 리조트 게르 (바닥난방+욕실)',
        vehPhoto: './images/baga_gazriin_sunset.jpg',
        gerPhoto: './images/ger_interior.jpg',
        perks: '전담 한식 조리사 동행 · 공항 VIP 의전 픽업 · 부모님 맞춤형 여유 일정보장'
      }
    ]
  },
  {
    id: 'rfq-4',
    author: '최*아님 (1인 솔로)',
    createdAt: '2시간 전',
    dates: '9월 5일 ~ 9월 10일 (5박 6일)',
    typeTag: '동행조인 · 1명 솔로 합류 희망',
    course: '남고비 3대 사막 + 중부 온천',
    infra: '신형 스타렉스 · 전일정 온수샤워 게르',
    memo: '혼자 여행하는 20대 후반 직장인(비흡연)입니다. 이미 출발 확정된 또래 조인방이 있는 MOKTA 업체가 있다면 합류 제안 부탁드려요!',
    maxBids: 6,
    quotes: [
      {
        agency: '노마드 스냅 익스페디션 (MOKTA-029)',
        rating: '4.93 (리뷰 94)',
        usd4: 690,
        usd6: 540,
        vehTitle: '2025 스타렉스 4WD',
        gerTitle: '전 일정 투어리스트 온수캠프',
        vehPhoto: './images/gobi_camp_vans.jpg',
        gerPhoto: './images/starlight_ger_snap.jpg',
        perks: '마침 9/5 출발 저희 확정방에 2030 여성 3분·남성 1분(4/6석) 계셔서 바로 합류 시 출발 100% 확정입니다!'
      }
    ]
  }
];

const JOIN_TOURS = [
  {
    id: 'j1',
    dateKey: '08-15',
    dateLabel: '8월 15일 ~ 8월 20일 (5박 6일)',
    status: '출발확정',
    statusClass: 'badge-blue',
    title: '[출발확정 · 잔여2석] 남고비 3대 사막 + 쳉헤르 노천온천 별밤 투어',
    agency: '어드벤처 몽골 투어 (MOKTA-014 전담)',
    sponsored: true,
    thumb: './images/sand_dunes_camp.jpg',
    gallery: ['./images/sand_dunes_camp.jpg', './images/milkyway_gobi.jpg', './images/ger_interior.jpg', './images/vehicle_fleet.jpg'],
    seats: ['여·20대', '여·20대', '여·30대', '남·30대'],
    maxSeats: 6,
    curPrice: '820,000원',
    fullPrice: '740,000원',
    tags: ['#비흡연방', '#신형스타렉스', '#온수게르100%', '#드론무료']
  },
  {
    id: 'j2',
    dateKey: '08-22',
    dateLabel: '8월 22일 ~ 8월 26일 (4박 5일)',
    status: '마감임박(1석)',
    statusClass: 'badge-rose',
    title: '[출발확정 · 마지막 1자리!] 에메랄드 홉스골 호수 & 소원섬 보트 힐링',
    agency: '홉스골 블루펄 트래블 (MOKTA-021 전담)',
    sponsored: true,
    thumb: './images/khuvsgul_island.jpg',
    gallery: ['./images/khuvsgul_island.jpg', './images/khuvsgul_boat_sunset.jpg', './images/terelj_resort_camp.jpg', './images/khorkhog_feast.jpg'],
    seats: ['여·30대', '여·30대', '남·20대', '남·30대', '여·20대'],
    maxSeats: 6,
    curPrice: '790,000원',
    fullPrice: '720,000원',
    tags: ['#2030또래방', '#홉스골1열캠프', '#보트투어포함']
  },
  {
    id: 'j3',
    dateKey: '08-29',
    dateLabel: '8월 29일 ~ 9월 2일 (4박 5일)',
    status: '출발확정',
    statusClass: 'badge-blue',
    title: '[출발확정] 어르헝 폭포 무지개 트레킹 + 미니사막 돔 글램핑 조인',
    agency: '고비 스타 글램핑 (MOKTA-007 전담)',
    sponsored: true,
    thumb: './images/orkhon_waterfall_rainbow.jpg',
    gallery: ['./images/orkhon_waterfall_rainbow.jpg', './images/glamping_dome_friends.jpg', './images/ger_interior.jpg', './images/campfire_cheers.jpg'],
    seats: ['여·20대', '여·20대', '남·20대', '남·20대'],
    maxSeats: 6,
    curPrice: '850,000원',
    fullPrice: '760,000원',
    tags: ['#투명돔글램핑', '#인생샷집중', '#불멍바베큐']
  },
  {
    id: 'j4',
    dateKey: '09-05',
    dateLabel: '9월 5일 ~ 9월 9일 (4박 5일)',
    status: '투어사입찰중',
    statusClass: 'badge-gold',
    title: '[여행자 동행모집] 9월 초 은하수 보러 차강소브라가+테를지 가실 분!',
    agency: '⚡ 현재 MOKTA 3개 회원사가 전담 스폰서 입찰 제안 중',
    sponsored: false,
    thumb: './images/starlight_ger_snap.jpg',
    gallery: ['./images/starlight_ger_snap.jpg', './images/tsagaan_suvarga_snap.jpg', './images/companion_team_hands.jpg', './images/vehicle_fleet.jpg'],
    seats: ['여·20대(방장)', '여·20대', '남·20대'],
    maxSeats: 6,
    curPrice: '스폰서 입찰 최저 69만원~',
    fullPrice: '610,000원 예상',
    tags: ['#방장개설', '#스폰서입찰3건', '#감성푸르공희망']
  },
  {
    id: 'j5',
    dateKey: '09-12',
    dateLabel: '9월 12일 ~ 9월 17일 (5박 6일)',
    status: '출발확정',
    statusClass: 'badge-blue',
    title: '[출발확정] 하르호린 고대수도 + 테르힝차강 화산호수 중부 완전정복',
    agency: '노마드 스냅 익스페디션 (MOKTA-029 전담)',
    sponsored: true,
    thumb: './images/erdene_zuu_monastery.jpg',
    gallery: ['./images/erdene_zuu_monastery.jpg', './images/terkhiin_lake_forest.jpg', './images/orkhon_canyon_top.jpg', './images/khorkhog_feast.jpg'],
    seats: ['여·30대', '남·30대', '여·20대', '남·20대'],
    maxSeats: 6,
    curPrice: '780,000원',
    fullPrice: '690,000원',
    tags: ['#전연령환영', '#소니카메라스냅', '#노팁노옵션']
  },
  {
    id: 'j6',
    dateKey: '09-19',
    dateLabel: '9월 19일 ~ 9월 23일 (4박 5일)',
    status: '출발확정',
    statusClass: 'badge-blue',
    title: '[추석연휴 출발확정] 바가가즈링촐로 일몰 지프 & 테를지 리조트 캠프',
    agency: '몽골 헤리티지 VIP (MOKTA-002 전담)',
    sponsored: true,
    thumb: './images/baga_gazriin_sunset.jpg',
    gallery: ['./images/baga_gazriin_sunset.jpg', './images/terelj_resort_camp.jpg', './images/ger_interior.jpg', './images/green_steppe_flock.jpg'],
    seats: ['여·30대', '여·30대', '여·40대', '남·30대', '남·40대'],
    maxSeats: 6,
    curPrice: '910,000원',
    fullPrice: '840,000원',
    tags: ['#연휴황금슬롯', '#리조트급게르', '#잔여1석']
  }
];

const MOKTA_AGENCIES = [
  {
    id: 'ag1',
    name: '어드벤처 몽골 투어',
    certNo: 'MOKTA-2026-014',
    cat: '남고비특화',
    rating: '4.96',
    reviews: 183,
    response: '평균 14분 내 응답',
    cover: './images/gobi_camp_vans.jpg',
    thumbs: ['./images/milkyway_gobi.jpg', './images/sand_dunes_camp.jpg', './images/khorkhog_feast.jpg'],
    fleet: '2025 스타렉스 9대 · 에어컨 푸르공 14대 직영',
    desc: '남고비 사막 종단 및 드론·은하수 타임랩스 무료 촬영 만족도 1위 공식 회원사',
    products: [
      { name: '[시그니처] 남고비 3대사막+중부 온수캠프 5박6일', price: '790,000원~' },
      { name: '[단기핵심] 차강소브라가+바가가즈링촐로 3박4일', price: '580,000원~' }
    ]
  },
  {
    id: 'ag2',
    name: '고비 스타 글램핑 투어',
    certNo: 'MOKTA-2026-007',
    cat: '럭셔리캠프',
    rating: '4.98',
    reviews: 128,
    response: '평균 18분 내 응답',
    cover: './images/ger_interior.jpg',
    thumbs: ['./images/glamping_dome_friends.jpg', './images/terelj_resort_camp.jpg', './images/vehicle_fleet.jpg'],
    fleet: '스타렉스 리무진 7대 · 직영 럭셔리 글램핑 캠프 2곳 보유',
    desc: '전 일정 호텔식 침구와 개별 타일 온수 샤워실이 완비된 하이엔드 캠프 직영 투어사',
    products: [
      { name: '[전일정 개인욕실] 고비 럭셔리 글램핑 4박5일', price: '940,000원~' },
      { name: '[파노라마 돔] 테를지+미니사막 감성 글램핑 3박4일', price: '680,000원~' }
    ]
  },
  {
    id: 'ag3',
    name: '홉스골 블루펄 트래블',
    certNo: 'MOKTA-2026-021',
    cat: '가족·VIP',
    rating: '4.95',
    reviews: 156,
    response: '평균 20분 내 응답',
    cover: './images/khuvsgul_island.jpg',
    thumbs: ['./images/khuvsgul_boat_sunset.jpg', './images/terkhiin_lake_forest.jpg', './images/vehicle_fleet.jpg'],
    fleet: '벤츠 스프린터 4대 · 4WD 스타렉스 10대 보유',
    desc: '홉스골 호수 1열 레이크뷰 캠프 독점 블럭 보유! 가족·효도 및 북부 힐링 투어 전문',
    products: [
      { name: '[국내선항공포함] 무박이동 없는 홉스골 VIP 4박5일', price: '1,120,000원~' },
      { name: '[온천힐링] 홉스골+쳉헤르 노천온천 5박6일', price: '860,000원~' }
    ]
  },
  {
    id: 'ag4',
    name: '노마드 스냅 익스페디션',
    certNo: 'MOKTA-2026-029',
    cat: '스냅·2030',
    rating: '4.94',
    reviews: 94,
    response: '평균 11분 내 응답',
    cover: './images/tsagaan_suvarga_snap.jpg',
    thumbs: ['./images/starlight_ger_snap.jpg', './images/campfire_cheers.jpg', './images/companion_team_hands.jpg'],
    fleet: '루프랙 스냅용 푸르공 16대 · 스타렉스 6대',
    desc: '전 가이드 소니 미러리스 카메라 보유! 2030 또래 동행 조인 재방문·추천율 최상위',
    products: [
      { name: '[2030 오픈조인] 차강소브라가+별밤불멍 4박5일', price: '720,000원~' },
      { name: '[인생샷올인원] 남고비 풀코스 스냅 원정대 6박7일', price: '850,000원~' }
    ]
  },
  {
    id: 'ag5',
    name: '몽골 헤리티지 VIP 투어',
    certNo: 'MOKTA-2026-002',
    cat: '가족·VIP',
    rating: '4.99',
    reviews: 89,
    response: '평균 15분 내 응답',
    cover: './images/baga_gazriin_sunset.jpg',
    thumbs: ['./images/terelj_resort_camp.jpg', './images/ger_interior.jpg', './images/green_steppe_flock.jpg'],
    fleet: '도요타 랜드크루저 12대 · 렉서스 LX · 스프린터 VIP',
    desc: '부모님 칠순 효도 단독투어, 기업 임원 의전, 승마 트레킹·몽골 골프 전문 하이엔드 랜드사',
    products: [
      { name: '[품격효도] 한식셰프 동행 테를지+중부 리조트 4박5일', price: '1,080,000원~' },
      { name: '[오프로드 VIP] 랜드크루저 바가가즈링촐로 단독투어', price: '990,000원~' }
    ]
  },
  {
    id: 'ag6',
    name: '스텝 오아시스 & MOKTA 공식 회원사단 (외 27개사)',
    certNo: 'MOKTA-OFFICIAL-32',
    cat: '남고비특화',
    rating: '4.95',
    reviews: 640,
    response: '실시간 알림 연동',
    cover: './images/steppe_ger_suvs.jpg',
    thumbs: ['./images/orkhon_canyon_top.jpg', './images/erdene_zuu_monastery.jpg', './images/green_steppe_flock.jpg'],
    fleet: '몽골 전역 300대+ 검증 차량 및 인증 투어리스트 캠프 공동망',
    desc: '몽골한국관광협회 소속 32개 모든 정회원사가 동일한 표준 품질 보증과 미니홈으로 함께합니다.',
    products: [
      { name: '[협회표준] 중부 어르헝폭포+하르호린 정복 4박5일', price: '730,000원~' },
      { name: '[실속출발] 테를지 승마+미니사막 핵심 2박3일', price: '490,000원~' }
    ]
  }
];

const DIRECT_PRODUCTS = [
  { id: 'dp1', badge: '부럽×MOKTA 인증', agency: '어드벤처 몽골 투어', title: '[노팁/드론무료] 남고비 3대사막 + 쳉헤르 온천 시그니처 5박6일', price: '790,000원', rating: '4.96 (183)', img: './images/sand_dunes_camp.jpg' },
  { id: 'dp2', badge: '개인샤워실 100%', agency: '고비 스타 글램핑', title: '[전일정 온수글램핑] 호텔식 침구 & 별밤 고비 하이엔드 4박5일', price: '940,000원', rating: '4.98 (128)', img: './images/ger_interior.jpg' },
  { id: 'dp3', badge: '국내선 포함 인기', agency: '홉스골 블루펄 트래블', title: '[레이크뷰 1열캠프] 에메랄드 홉스골 호수 보트 & 승마 힐링 4박5일', price: '880,000원', rating: '4.95 (156)', img: './images/khuvsgul_island.jpg' },
  { id: 'dp4', badge: '2030 조인 1위', agency: '노마드 스냅 익스페디션', title: '[소니카메라 스냅] 차강소브라가 절벽 인생샷 & 불멍파티 4박5일', price: '720,000원', rating: '4.94 (94)', img: './images/tsagaan_suvarga_snap.jpg' },
  { id: 'dp5', badge: '중부 베스트셀러', agency: '어드벤처 몽골 투어', title: '[특식 허르헉포함] 어르헝 폭포 무지개 트레킹 + 미니사막 4박5일', price: '750,000원', rating: '4.95 (112)', img: './images/orkhon_waterfall_rainbow.jpg' },
  { id: 'dp6', badge: '효도·가족 추천', agency: '몽골 헤리티지 VIP', title: '[랜드크루저 단독] 부모님 맞춤형 테를지 리조트 & 바가가즈링 3박4일', price: '990,000원', rating: '4.99 (89)', img: './images/terelj_resort_camp.jpg' },
  { id: 'dp7', badge: '차종 자유선택', agency: '홉스골 블루펄 트래블', title: '[푸르공 vs 스타렉스] 테르힝차강 화산호수 & 대초원 일주 5박6일', price: '810,000원', rating: '4.93 (77)', img: './images/vehicle_fleet.jpg' },
  { id: 'dp8', badge: '은하수 집중코스', agency: '고비 스타 글램핑', title: '[야간랜턴스냅] 홍고르엘스 별밤 은하수 & 투명 돔 글램핑 4박5일', price: '890,000원', rating: '4.97 (141)', img: './images/milkyway_gobi.jpg' }
];

// 상태 변수
let curShowcaseCat = 'all';
let curRfqFilter = 'all';
let curJoinDate = 'all';
let curAgencyCat = 'all';
let searchKeyword = '';

let selectedBidVehPhoto = './images/vehicle_fleet.jpg';
let selectedBidGerPhoto = './images/ger_interior.jpg';
let selectedShowcaseImg = './images/khorkhog_feast.jpg';

// ==================== 상단 역할 전환 & 히어로 인터랙션 ====================
function switchSiteRole(role) {
  const isPartner = role === 'partner';
  document.body.classList.toggle('partner-mode', isPartner);
  document.getElementById('roleCustomerBtn').classList.toggle('active', !isPartner);
  document.getElementById('rolePartnerBtn').classList.toggle('active', isPartner);
  if (isPartner) populatePartnerRfqDropdown();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function changeHeroScene(imgSrc, thumbEl) {
  const heroImg = document.getElementById('heroMainImg');
  heroImg.style.opacity = '0.35';
  setTimeout(() => {
    heroImg.src = imgSrc;
    heroImg.style.opacity = '1';
  }, 180);
  document.querySelectorAll('.scene-thumb').forEach(el => el.classList.remove('active'));
  thumbEl.classList.add('active');
}

function scrollToSection(secId) {
  switchSiteRole('customer');
  document.querySelectorAll('.page-sec').forEach(s => s.style.display = 'block');
  setTimeout(() => {
    const target = document.getElementById(secId);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 60);
}

function filterPageView(targetId, btnEl) {
  document.querySelectorAll('.nav-pill').forEach(b => b.classList.remove('active'));
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
  renderShowcase();
  renderRfqBoard();
  renderJoinSection();
  renderAgenciesAndStore();
}

// ==================== 1. 쇼케이스 피드 렌더링 & 모달 ====================
function renderShowcase() {
  const list = SHOWCASE_DATA.filter(item => {
    const matchCat = curShowcaseCat === 'all' || item.cat === curShowcaseCat;
    const matchKw = !searchKeyword || item.caption.toLowerCase().includes(searchKeyword) || item.agency.toLowerCase().includes(searchKeyword) || item.productTitle.toLowerCase().includes(searchKeyword);
    return matchCat && matchKw;
  });

  document.getElementById('showcaseGrid').innerHTML = list.map(item => `
    <article class="reel-photo-card" onclick="openReelPlayer('${item.id}')">
      <img src="${item.cover}" alt="${item.caption}" class="cover" loading="lazy" />
      <div class="reel-gradient"></div>

      <div class="reel-top-row">
        <span class="badge badge-glass">▶ LIVE ${item.duration}</span>
        <span class="badge badge-glass">👁 ${item.views} · ♥ ${item.likes}</span>
      </div>

      <div class="reel-play-icon">▶</div>

      <div class="reel-bottom-info">
        <div class="reel-partner-row">
          <img src="${item.avatar}" alt="${item.agency}" class="reel-partner-avatar" />
          <span class="reel-partner-name">🏅 ${item.agency}</span>
        </div>
        <div class="reel-caption">${item.caption}</div>
        <div class="reel-shop-box">
          <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">🎒 ${item.productTitle}</span>
          <strong style="color:#fcd34d; flex-shrink:0;">${item.productPrice}</strong>
        </div>
      </div>
    </article>
  `).join('');
}

function filterShowcase(cat, btn) {
  curShowcaseCat = cat;
  btn.parentElement.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderShowcase();
}

function openReelPlayer(id) {
  const item = SHOWCASE_DATA.find(x => x.id === id) || SHOWCASE_DATA[0];
  document.getElementById('reelModalBody').innerHTML = `
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(290px, 1fr)); gap:22px; align-items:stretch;">
      <div style="position:relative; border-radius:18px; overflow:hidden; min-height:430px; background:#000;">
        <img src="${item.cover}" alt="${item.caption}" style="width:100%; height:100%; object-fit:cover;" />
        <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 45%, rgba(0,0,0,0.88) 100%); padding:16px; display:flex; flex-direction:column; justify-content:space-between; color:#fff;">
          <div style="display:flex; justify-content:space-between;">
            <span class="badge badge-gold">● MOKTA 현장 인증 미디어</span>
            <span class="badge badge-glass">♥ ${item.likes}</span>
          </div>
          <div>
            <div style="font-size:12.5px; color:#fde68a; font-weight:800; margin-bottom:5px;">🏅 ${item.agency} (${item.moktaNo})</div>
            <div style="font-size:15.5px; font-weight:800; line-height:1.4;">${item.caption}</div>
          </div>
        </div>
      </div>

      <div style="display:flex; flex-direction:column; justify-content:space-between; gap:16px;">
        <div>
          <span class="badge badge-emerald">쇼퍼블 미디어 커머스 연동</span>
          <h4 style="font-size:20px; font-weight:900; margin:10px 0 6px;">이 사진·영상 속 실제 투입 상품</h4>
          <p style="font-size:13.5px; color:var(--text-500); margin-bottom:16px;">
            MOKTA 회원사가 직접 촬영해 올린 실제 배정 인프라입니다. 아래 연결 상품을 바로 예약하거나 내 일정에 맞춰 이 업체에 지정 견적을 요청할 수 있습니다.
          </p>

          <div style="border:1px solid var(--border); border-radius:16px; overflow:hidden; display:flex; gap:14px; align-items:center; padding:12px; background:#f8fafc; margin-bottom:14px;">
            <img src="${item.productImg}" alt="${item.productTitle}" style="width:92px; height:76px; border-radius:10px; object-fit:cover; flex-shrink:0;" />
            <div>
              <div style="font-size:12px; color:var(--brand-blue); font-weight:800;">연결 기획투어</div>
              <div style="font-size:15px; font-weight:900; margin:2px 0;">${item.productTitle}</div>
              <strong style="font-size:15px; color:var(--navy-950);">${item.productPrice} <span style="font-size:12px; color:var(--text-500); font-weight:600;">(6인 조인 기준)</span></strong>
            </div>
          </div>

          <div style="background:var(--emerald-soft); border:1px solid #99f6e4; border-radius:12px; padding:12px 14px; font-size:12.5px; color:var(--emerald-dark); font-weight:700;">
            ✔ 허위 사진 방지 서약 완료 · 사진과 다른 등급 차량/숙소 배정 시 부럽×MOKTA 차액 200% 보상제 적용
          </div>
        </div>

        <div style="display:grid; gap:8px;">
          <button class="btn btn-blue" style="width:100%; padding:13px;" onclick="closeModal('reelModal'); openModal('rfqWizardModal');">
            💬 [${item.agency}] 포함하여 내 일정 비교견적 받기
          </button>
          <button class="btn btn-line" style="width:100%;" onclick="closeModal('reelModal'); openAgencyMiniHome('${item.agencyId || 'ag1'}');">
            🏅 이 회원사 브랜드 미니홈 &amp; 보유 차량 더보기
          </button>
        </div>
      </div>
    </div>
  `;
  openModal('reelModal');
}

// ==================== 2. 고객 일정 & 역경매 견적 비교 ====================
function renderRfqBoard() {
  const filtered = RFQ_LIST.filter(r => {
    const matchF = curRfqFilter === 'all' || r.typeTag.includes(curRfqFilter) || r.course.includes(curRfqFilter);
    const matchKw = !searchKeyword || r.course.toLowerCase().includes(searchKeyword) || r.memo.toLowerCase().includes(searchKeyword);
    return matchF && matchKw;
  });

  document.getElementById('rfqBoardGrid').innerHTML = filtered.map(r => {
    const avatars = r.quotes.map(q => `<img src="${q.vehPhoto}" alt="${q.agency}" title="${q.agency}" />`).join('');
    return `
      <div class="rfq-item-card">
        <div>
          <div class="rfq-card-top">
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
              <span class="badge badge-emerald">🟢 업체 컨택 진행중</span>
              <span class="badge badge-blue">${r.typeTag}</span>
            </div>
            <span style="font-size:12px; color:var(--text-400); font-weight:700;">${r.createdAt}</span>
          </div>

          <div class="rfq-title">${r.course} · ${r.dates}</div>

          <div class="rfq-specs">
            <span class="spec-pill">👤 ${r.author}</span>
            <span class="spec-pill">🚐 ${r.infra}</span>
          </div>

          <div class="rfq-quote-box">"${r.memo}"</div>
        </div>

        <div>
          <div class="rfq-bidders-strip" style="margin-bottom:12px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div class="avatar-stack">${avatars}</div>
              <div>
                <div style="font-size:13px; font-weight:900; color:var(--navy-950);">
                  MOKTA 회원사 <span style="color:var(--brand-blue);">${r.quotes.length}곳</span> 실사 견적 도착
                </div>
                <div style="font-size:11.5px; color:var(--text-500);">스팸 방지 슬롯 제한 (${r.quotes.length} / ${r.maxBids}개사)</div>
              </div>
            </div>
          </div>

          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button class="btn btn-blue" style="flex:1;" onclick="openQuoteCompareModal('${r.id}')">
              🔍 도착한 ${r.quotes.length}개 업체 차량·숙소 실사 견적 비교하기
            </button>
            <button class="btn btn-line btn-sm" onclick="jumpToPartnerBid('${r.id}')">
              🏢 업체로 입찰 체험
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('tabRfqCount').textContent = RFQ_LIST.length;
  document.getElementById('headerBidBadge').textContent = RFQ_LIST.length;
}

function filterRfq(val, btn) {
  curRfqFilter = val;
  btn.parentElement.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderRfqBoard();
}

function openQuoteCompareModal(rfqId) {
  const item = RFQ_LIST.find(x => x.id === rfqId);
  if (!item) return;
  const toKrw = (usd) => (Math.round((usd * 1380) / 1000) * 1000).toLocaleString() + '원';

  document.getElementById('qCompTitle').textContent = `📊 [${item.course}] 도착한 MOKTA 실사 비교견적 (${item.quotes.length}개사)`;
  document.getElementById('qCompBody').innerHTML = `
    <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:14px; padding:13px 16px; margin-bottom:18px; font-size:13.5px; color:#0369a1; font-weight:700;">
      💡 각 MOKTA 회원사가 제안한 <strong>실제 배정 차량 사진·게르 내부 사진·인원별 단가·무료 특전</strong>을 엑셀 정리 없이 한 화면에서 비교하고 바로 1/N 안심결제로 확정하세요!
    </div>

    <div class="quote-cards-compare">
      ${item.quotes.map(q => `
        <div class="q-comp-card">
          <div>
            <div class="q-comp-photos">
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
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span class="badge badge-gold">🏅 MOKTA 정회원</span>
                <span style="font-size:12px; font-weight:800; color:var(--text-700);">⭐ ${q.rating}</span>
              </div>
              <h4 style="font-size:16.5px; font-weight:900; color:var(--navy-950); margin-bottom:10px;">${q.agency}</h4>

              <div style="background:#f8fafc; border:1px solid var(--border); border-radius:12px; padding:10px 12px; margin-bottom:10px; display:flex; justify-content:space-between;">
                <div>
                  <div style="font-size:11.5px; color:var(--text-500);">4인 기준 (1인)</div>
                  <strong style="font-size:14.5px;">USD ${q.usd4}</strong>
                  <div style="font-size:11px; color:var(--text-500);">약 ${toKrw(q.usd4)}</div>
                </div>
                <div style="text-align:right;">
                  <div style="font-size:11.5px; color:var(--emerald-dark); font-weight:800;">6인 풀방 시 (1인)</div>
                  <strong style="font-size:16px; color:var(--emerald-dark);">USD ${q.usd6}</strong>
                  <div style="font-size:11px; color:var(--emerald-dark); font-weight:700;">약 ${toKrw(q.usd6)}</div>
                </div>
              </div>

              <div style="font-size:12.5px; color:var(--text-700); display:grid; gap:5px; margin-bottom:10px;">
                <div>🚐 <strong>차량:</strong> ${q.vehTitle}</div>
                <div>🏕️ <strong>숙소:</strong> ${q.gerTitle}</div>
              </div>

              <div style="font-size:12.5px; background:var(--emerald-soft); color:var(--emerald-dark); padding:9px 11px; border-radius:10px; line-height:1.45; font-weight:700;">
                🎁 ${q.perks}
              </div>
            </div>
          </div>

          <div style="padding:0 16px 16px; display:grid; gap:7px;">
            <button class="btn btn-blue" style="width:100%;" onclick="closeModal('quoteCompareModal'); openJoinDetailModal('j1', '${q.agency}', '${toKrw(q.usd6)}');">
              ✅ 이 제안으로 확정 &amp; 1/N 결제하기
            </button>
            <button class="btn btn-line btn-sm" style="width:100%;" onclick="showToast('💬 [${q.agency}] 전담 매니저와 부럽 인앱 안심채팅이 시작되었습니다.')">
              💬 1:1 세부 코스 조율 채팅
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
    author: '신규 등록 고객님 (방금)',
    createdAt: '방금 전 · NEW',
    dates,
    typeTag,
    course,
    infra,
    memo,
    maxBids: 6,
    quotes: [
      {
        agency: '고비 스타 글램핑 (MOKTA-007 · 자동매칭)',
        rating: '4.98 (리뷰 128)',
        usd4: 730,
        usd6: 570,
        vehTitle: '2025 신형 스타렉스 4WD',
        gerTitle: '전 일정 개인 온수샤워 글램핑',
        vehPhoto: './images/vehicle_fleet.jpg',
        gerPhoto: './images/ger_interior.jpg',
        perks: '등록 즉시 1호 빠른 제안! 드론 스냅 무료 + 노팁·노옵션 보장'
      }
    ]
  });

  closeModal('rfqWizardModal');
  renderRfqBoard();
  scrollToSection('sec-rfq');
  document.getElementById('heroTickerMsg').innerHTML = `<strong>신규 일정 등록 완료!</strong> · 방금 등록하신 <strong>[${dates} ${course}]</strong> 일정이 MOKTA 32개 회원사 파트너센터에 실시간 전송되었습니다!`;
  showToast('✅ 일정이 등록되었습니다! 우측 상단 [🏢 MOKTA 입점업체 전환] 버튼을 눌러 직접 사진 첨부 견적을 보내보세요.');
}

// ==================== 3. 동행·조인 캘린더 & N분의 1 더치페이 ====================
function renderJoinSection() {
  const calDays = [
    { d: '8/14 (금)', key: '08-14', tag: '모집2건', cls: 'st-recruit' },
    { d: '8/15 (토)', key: '08-15', tag: '출발확정', cls: 'st-confirm' },
    { d: '8/22 (토)', key: '08-22', tag: '마감임박', cls: 'st-confirm' },
    { d: '8/29 (토)', key: '08-29', tag: '출발확정', cls: 'st-confirm' },
    { d: '9/05 (토)', key: '09-05', tag: '입찰3건', cls: 'st-sponsor' },
    { d: '9/12 (토)', key: '09-12', tag: '출발확정', cls: 'st-confirm' },
    { d: '9/19 (추석)', key: '09-19', tag: '잔여1석', cls: 'st-confirm' }
  ];

  document.getElementById('joinCalGrid').innerHTML = calDays.map(c => `
    <div class="cal-day-box ${curJoinDate === c.key ? 'active' : ''}" onclick="filterJoinByDate('${c.key}')">
      <strong style="font-size:13px;">${c.d}</strong>
      <span class="cal-status-tag ${c.cls}">${c.tag}</span>
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
        ? `<div class="seat-box on">💺${s}</div>`
        : `<div class="seat-box off">➕빈석</div>`;
    }).join('');

    return `
      <article class="join-tour-card">
        <div>
          <div class="join-thumb-wrap" onclick="openJoinDetailModal('${j.id}')" style="cursor:pointer;">
            <img src="${j.thumb}" alt="${j.title}" loading="lazy" />
            <div class="join-thumb-badges">
              <span class="badge ${j.statusClass}">${j.status} (${j.seats.length}/${j.maxSeats}석)</span>
              <span class="badge badge-glass">📅 ${j.dateLabel}</span>
            </div>
            <div class="join-agency-ribbon">🏅 ${j.agency}</div>
          </div>

          <div class="join-card-content">
            <h3 style="font-size:16.5px; font-weight:900; line-height:1.35; cursor:pointer;" onclick="openJoinDetailModal('${j.id}')">${j.title}</h3>

            <div>
              <div style="font-size:11.5px; font-weight:800; color:var(--text-500); margin-bottom:5px;">실시간 동행 탑승자 구성</div>
              <div class="seat-bar-grid">${seatsHtml}</div>
            </div>

            <div style="display:flex; flex-wrap:wrap; gap:5px;">
              ${j.tags.map(t => `<span class="spec-pill">${t}</span>`).join('')}
            </div>
          </div>
        </div>

        <div style="padding:0 18px 18px;">
          <div style="background:#f8fafc; border:1px solid var(--border); border-radius:12px; padding:11px 13px; display:flex; align-items:center; justify-content:space-between; gap:8px;">
            <div>
              <div style="font-size:11.5px; color:var(--text-500);">현재 합류가 ➔ 6인 풀방 시</div>
              <strong style="font-size:14.5px; color:var(--navy-950);">${j.curPrice} <span style="color:var(--emerald-dark);">➔ ${j.fullPrice}</span></strong>
            </div>
            <button class="btn btn-emerald btn-sm" onclick="openJoinDetailModal('${j.id}')">상세·1/N합류</button>
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
  btn.parentElement.querySelectorAll('.pax-pill-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const data = {
    3: { d: '3/6석 모객 시 (1명만 더 오면 출발확정!)', k: '1인 1,110,000원', u: '기준 USD 805 · 추가 합류 시 차액 100% 자동 환급' },
    4: { d: '🔵 4/6석 최소 출발인원 달성! (100% 출발 보장)', k: '1인 920,000원', u: '기준 USD 665 · 3인 대비 1인당 19만 원 인하' },
    5: { d: '🔥 5/6석 합류 시 전원 적용가 (차액 자동환급)', k: '1인 820,000원', u: '기준 USD 595 · 3인 대비 1인당 29만 원 절약' },
    6: { d: '🎉 6/6석 풀방 완성! 전원 최저 공동구매가 확정', k: '1인 740,000원', u: '기준 USD 535 · 차량 1대 최적 분담 완료!' }
  };
  document.getElementById('simDescLabel').textContent = data[pax].d;
  document.getElementById('simKrwText').textContent = data[pax].k;
  document.getElementById('simUsdText').textContent = data[pax].u;
}

function openJoinDetailModal(joinId, overrideAgency, overridePrice) {
  const j = JOIN_TOURS.find(x => x.id === joinId) || JOIN_TOURS[0];
  const agencyLabel = overrideAgency || j.agency;
  const unitPrice = overridePrice || j.fullPrice;

  document.getElementById('joinModalTitle').textContent = `📅 ${j.title}`;
  document.getElementById('joinModalBody').innerHTML = `
    <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; margin-bottom:18px;">
      ${j.gallery.map(img => `<img src="${img}" alt="투어 실사" style="height:120px; width:100%; object-fit:cover; border-radius:12px;" />`).join('')}
    </div>

    <div style="background:var(--navy-900); color:#fff; border-radius:16px; padding:18px 20px; margin-bottom:18px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
      <div>
        <div style="font-size:12.5px; color:#fcd34d; font-weight:800;">🏅 ${agencyLabel}</div>
        <div style="font-size:17px; font-weight:900; margin-top:3px;">총무 계좌이체 NO! 부럽 1/N 개별 카드 안심결제 지원</div>
        <div style="font-size:12.5px; color:rgba(255,255,255,0.8); margin-top:2px;">모르는 동행에게 큰돈을 송금할 필요 없이, 팀원 각자에게 발송된 알림톡 링크로 본인 몫만 결제합니다.</div>
      </div>
    </div>

    <div style="border:1px solid var(--border); border-radius:16px; padding:16px; margin-bottom:18px;">
      <div style="display:flex; justify-content:space-between; font-size:13.5px; font-weight:900; margin-bottom:10px;">
        <span>실시간 동행 팀원 1/N 수납 현황</span>
        <span style="color:var(--brand-blue);">${j.seats.length} / ${j.maxSeats}명 완료</span>
      </div>
      <div style="display:grid; gap:7px; font-size:13px;">
        ${j.seats.map((s, idx) => `
          <div style="display:flex; justify-content:space-between; padding:8px 12px; background:#f0fdf4; border-radius:9px;">
            <span>💺 탑승자 ${idx + 1} (${s})</span>
            <strong style="color:#15803d;">✔ 본인 카드 결제완료 (${unitPrice})</strong>
          </div>
        `).join('')}
        <div style="display:flex; justify-content:space-between; padding:9px 12px; background:#eff6ff; border:1.5px solid var(--brand-blue); border-radius:9px;">
          <span>👉 <strong>내 합류 좌석 (${j.seats.length + 1}번째 탑승자)</strong></span>
          <strong style="color:var(--brand-blue);">무이자 할부 결제 가능 (${unitPrice})</strong>
        </div>
      </div>
    </div>

    <button class="btn btn-blue" style="width:100%; padding:14px; font-size:15px;" onclick="closeModal('joinDetailModal'); showToast('🎉 내 몫 1/N 안심결제가 완료되었습니다! 확정 바우처와 전담 투어 단톡방 링크가 발송됩니다.');">
      💳 내 몫(${unitPrice})만 신용카드·간편결제로 안전하게 합류하기
    </button>
  `;
  openModal('joinDetailModal');
}

// ==================== 4. MOKTA 32개 회원사 브랜드관 & 직판 상품 스토어 ====================
function renderAgenciesAndStore() {
  const agList = MOKTA_AGENCIES.filter(a => {
    const matchC = curAgencyCat === 'all' || a.cat === curAgencyCat;
    const matchKw = !searchKeyword || a.name.toLowerCase().includes(searchKeyword) || a.desc.toLowerCase().includes(searchKeyword);
    return matchC && matchKw;
  });

  document.getElementById('agencyCardsGrid').innerHTML = agList.map(a => `
    <article class="agency-lounge-card">
      <div>
        <div class="agency-cover" onclick="openAgencyMiniHome('${a.id}')" style="cursor:pointer;">
          <img src="${a.cover}" alt="${a.name}" loading="lazy" />
          <div class="agency-cover-overlay">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="cert-pill">${a.certNo}</span>
              <span class="badge badge-glass">⭐ ${a.rating} (${a.reviews})</span>
            </div>
            <div>
              <h3 style="font-size:19px; font-weight:900;">${a.name}</h3>
              <span style="font-size:12px; color:#fde68a; font-weight:700;">⚡ ${a.response}</span>
            </div>
          </div>
        </div>

        <div class="agency-body">
          <p style="font-size:13.5px; font-weight:700; color:var(--text-950); margin-bottom:6px;">"${a.desc}"</p>
          <div style="font-size:12.5px; color:var(--text-500);">🚐 ${a.fleet}</div>

          <div class="agency-mini-thumbs">
            ${a.thumbs.map(t => `<img src="${t}" alt="업체 보유 인프라 실사" loading="lazy" />`).join('')}
          </div>

          <div style="border-top:1px solid var(--border); padding-top:10px; display:grid; gap:5px;">
            ${a.products.map(p => `
              <div style="display:flex; justify-content:space-between; font-size:12.5px; gap:8px;">
                <span style="color:var(--text-700); font-weight:700; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">• ${p.name}</span>
                <strong style="color:var(--brand-blue); flex-shrink:0;">${p.price}</strong>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div style="padding:0 18px 18px; display:flex; gap:8px;">
        <button class="btn btn-line btn-sm" style="flex:1;" onclick="openAgencyMiniHome('${a.id}')">브랜드 미니홈·실사 보기</button>
        <button class="btn btn-blue btn-sm" onclick="openModal('rfqWizardModal')">1:1 지정견적</button>
      </div>
    </article>
  `).join('');

  const prodList = DIRECT_PRODUCTS.filter(p => !searchKeyword || p.title.toLowerCase().includes(searchKeyword) || p.agency.toLowerCase().includes(searchKeyword));
  document.getElementById('productStoreGrid').innerHTML = prodList.map(p => `
    <article class="tour-prod-card" onclick="openJoinDetailModal('j1', '${p.agency}', '${p.price}')">
      <div>
        <div class="tour-prod-thumb">
          <img src="${p.img}" alt="${p.title}" loading="lazy" />
          <div style="position:absolute; top:10px; left:10px;">
            <span class="badge badge-glass">${p.badge}</span>
          </div>
        </div>
        <div class="tour-prod-info">
          <div style="font-size:12px; color:var(--emerald-dark); font-weight:800; margin-bottom:4px;">🏅 ${p.agency}</div>
          <h4 style="font-size:14.5px; font-weight:800; line-height:1.4; margin-bottom:10px;">${p.title}</h4>
        </div>
      </div>
      <div style="padding:0 15px 15px; display:flex; justify-content:space-between; align-items:flex-end;">
        <div>
          <div style="font-size:11.5px; color:var(--text-500);">⭐ ${p.rating}</div>
          <strong style="font-size:17px; color:var(--navy-950);">${p.price}~</strong>
        </div>
        <span class="badge badge-blue">단독·조인 가능</span>
      </div>
    </article>
  `).join('');
}

function filterAgencies(cat, btn) {
  curAgencyCat = cat;
  btn.parentElement.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderAgenciesAndStore();
}

function openAgencyMiniHome(agId) {
  const a = MOKTA_AGENCIES.find(x => x.id === agId) || MOKTA_AGENCIES[0];
  document.getElementById('agencyModalTitle').textContent = `🏅 ${a.name} (${a.certNo}) 공식 브랜드 미니홈`;
  document.getElementById('agencyModalBody').innerHTML = `
    <div style="position:relative; height:220px; border-radius:18px; overflow:hidden; margin-bottom:18px;">
      <img src="${a.cover}" alt="${a.name}" style="width:100%; height:100%; object-fit:cover;" />
      <div style="position:absolute; inset:0; background:linear-gradient(90deg, rgba(6,13,29,0.88) 0%, rgba(6,13,29,0.4) 100%); padding:24px; color:#fff; display:flex; flex-direction:column; justify-content:flex-end;">
        <span class="cert-pill" style="width:fit-content; margin-bottom:8px;">몽골한국관광협회 공식 보증 정회원 (${a.certNo})</span>
        <h3 style="font-size:26px; font-weight:900;">${a.name}</h3>
        <p style="font-size:14px; opacity:0.9; margin-top:4px;">${a.desc} · ⭐ ${a.rating} (${a.reviews}개 인증 리뷰)</p>
      </div>
    </div>

    <h4 style="font-size:16px; font-weight:900; margin-bottom:10px;">📷 보유 차량·직영 게르 캠프·현장 스냅 실사</h4>
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:10px; margin-bottom:20px;">
      ${a.thumbs.map(t => `<img src="${t}" alt="실사" style="height:145px; width:100%; object-fit:cover; border-radius:12px;" />`).join('')}
    </div>

    <h4 style="font-size:16px; font-weight:900; margin-bottom:10px;">🎒 이 회원사의 대표 투어 상품</h4>
    <div style="display:grid; gap:10px;">
      ${a.products.map(p => `
        <div style="border:1px solid var(--border); border-radius:14px; padding:14px 16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <strong style="font-size:15px;">${p.name}</strong>
            <div style="font-size:12.5px; color:var(--text-500);">${a.fleet} · 노팁/노옵션 표준약관 적용</div>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <strong style="font-size:16.5px; color:var(--brand-blue);">${p.price}</strong>
            <button class="btn btn-emerald btn-sm" onclick="closeModal('agencyHomeModal'); openJoinDetailModal('j1', '${a.name}', '${p.price}');">예약·조인 신청</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  openModal('agencyHomeModal');
}

// ==================== 5. MOKTA 파트너 센터 (입점 업체 어드민 기능) ====================
function populatePartnerRfqDropdown(preselectId) {
  const sel = document.getElementById('pTargetRfq');
  if (!sel) return;
  sel.innerHTML = RFQ_LIST.map(r =>
    `<option value="${r.id}" ${preselectId === r.id ? 'selected' : ''}>[${r.createdAt}] ${r.author} · ${r.course} (${r.dates}) — 현재 ${r.quotes.length}/${r.maxBids}개사 입찰</option>`
  ).join('');
}

function jumpToPartnerBid(rfqId) {
  switchSiteRole('partner');
  populatePartnerRfqDropdown(rfqId);
  showToast('🏢 MOKTA 입점사 파트너 센터로 전환되었습니다! 실사 조합을 골라 견적을 발송해보세요.');
}

function selectBidPhotoPair(el) {
  document.querySelectorAll('#bidPhotoPicker .pick-thumb').forEach(x => x.classList.remove('selected'));
  el.classList.add('selected');
  selectedBidVehPhoto = el.getAttribute('data-veh');
  selectedBidGerPhoto = el.getAttribute('data-ger');
}

function loadPartnerPreset(key) {
  const map = {
    gobi: { u4: 710, u6: 550, v: '2025 신형 스타렉스 4WD 리무진', g: '전 일정 개인 온수샤워 투어리스트 게르', c: '노팁·노옵션 100% 서약! 홍고르엘스 드론 영상 + 은하수 스냅 원본 무료 촬영 및 에이스 한국어 가이드를 배정합니다.' },
    khuvsgul: { u4: 760, u6: 590, v: '벤츠 스프린터 또는 스타렉스 어반', g: '홉스골 호수 1열 레이크뷰 글램핑 게르', c: '홉스골 소원섬 보트투어 + 쳉헤르 노천온천 입장권 전원 무료 포함해 편안하게 모십니다!' },
    terelj: { u4: 530, u6: 420, v: '에어컨 장착 감성 루프랙 푸르공', g: '테를지 신축 리조트형 온수 게르', c: '승마 트레킹 1시간 + 정통 양갈비 허르헉 바베큐 특식을 무료 서비스로 제공해 드립니다!' }
  };
  const p = map[key];
  document.getElementById('pUsd4').value = p.u4;
  document.getElementById('pUsd6').value = p.u6;
  document.getElementById('pVehName').value = p.v;
  document.getElementById('pGerName').value = p.g;
  document.getElementById('pComment').value = p.c;
  showToast('📂 저장된 코스 템플릿이 자동으로 입력되었습니다.');
}

function sendPartnerQuoteLive() {
  const rfqId = document.getElementById('pTargetRfq').value;
  const item = RFQ_LIST.find(x => x.id === rfqId);
  if (!item) return;
  if (item.quotes.length >= item.maxBids) {
    showToast('⚠️ 해당 일정은 최대 입찰 슬롯(6개사)이 마감되었습니다.');
    return;
  }

  item.quotes.unshift({
    agency: '어드벤처 몽골 투어 (MOKTA-014 · 방금 발송!)',
    rating: '4.96 (리뷰 183)',
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
  showToast('🚀 실사 첨부 견적서 발송 완료! 고객 비교견적 창 최상단에 우리 업체 사진과 단가가 즉시 반영되었습니다!');
}

function selectShowcasePreset(el) {
  document.querySelectorAll('#showcasePresetPicker .pick-thumb').forEach(x => x.classList.remove('selected'));
  el.classList.add('selected');
  selectedShowcaseImg = el.getAttribute('data-img');
}

function handleLocalPhotoUpload(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  selectedShowcaseImg = URL.createObjectURL(file);
  showToast('📷 내 기기 사진이 선택되었습니다! 아래 노출 버튼을 누르면 메인 쇼케이스에 즉시 반영됩니다.');
}

function publishPartnerShowcase() {
  const caption = document.getElementById('pShowTitle').value.trim();
  const cat = document.getElementById('pShowCat').value;
  const prod = document.getElementById('pShowProd').value.trim();
  if (!caption) return;

  SHOWCASE_DATA.unshift({
    id: 'sc-new-' + Date.now(),
    agencyId: 'ag1',
    agency: '어드벤처 몽골 투어 (방금 업로드)',
    moktaNo: 'MOKTA-014',
    avatar: './images/gobi_camp_vans.jpg',
    cover: selectedShowcaseImg,
    cat,
    duration: 'NEW',
    views: '방금 등록',
    likes: 1,
    caption,
    productTitle: prod,
    productPrice: '790,000원~',
    productImg: selectedShowcaseImg
  });

  curShowcaseCat = 'all';
  renderShowcase();
  switchSiteRole('customer');
  setTimeout(() => scrollToSection('sec-showcase'), 100);
  showToast('✨ 신규 현장 실사가 고객 메인 [몽골 LIVE 쇼케이스] 첫 번째 자리에 등록되었습니다!');
}

function toggleMongolianMode() {
  document.body.classList.toggle('show-mn');
  const on = document.body.classList.contains('show-mn');
  document.getElementById('mnToggleBtn').textContent = on
    ? '🇰🇷 한국어 단독 표기로 전환'
    : '🇲🇳 한·몽 병기 모드 켜기 (현지 직원용)';
}

function togglePartnerMobile() {
  const wrap = document.getElementById('partnerWorkspace');
  wrap.classList.toggle('mobile-sim');
  const isMob = wrap.classList.contains('mobile-sim');
  document.getElementById('mobSimBtn').textContent = isMob
    ? '💻 PC 와이드 화면으로 복귀'
    : '📱 현지 매니저 스마트폰 뷰 전환';
}

// ==================== 모달 & 토스트 유틸 ====================
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
function bgClose(e, id) { if (e.target.id === id) closeModal(id); }

let toastTimer = null;
function showToast(msg) {
  const el = document.getElementById('toastEl');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 4500);
}

// 초기 실행
renderShowcase();
renderRfqBoard();
renderJoinSection();
renderAgenciesAndStore();
populatePartnerRfqDropdown();
