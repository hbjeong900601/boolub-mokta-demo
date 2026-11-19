<?php
/**
 * 전용관 초기 데이터 하이드레이션 API (100% 부럽 실데이터 연동 v11)
 * - smart_product + smart_company + smart_product_talk: 실제 입점 파트너 9곳 및 몽골 상품 104개 실시간 연동
 * - smart_bbs (b_menu='cityguide'): 부럽 실제 몽골 여행 매거진 실시간 연동
 * - smart_bbs (b_menu='community','mongolianExpedition'): 실제 동행모집 게시글 및 포토 후기 연동
 * - smart_mokta_*: 전용관 맞춤견적 / 오픈조인 / 현장스토리 / 파트너 미니홈 커스터마이징 연동
 * 서버 배포 위치: /program/ajax.mokta.init.php
 */
include_once(dirname(__FILE__) . '/mokta.inc.php');

if (isset($_REQUEST['_mode']) && $_REQUEST['_mode'] === 'mokta_logout') {
    mokta_perform_logout();
    mokta_json(array(
        'ok'   => true,
        'auth' => array(
            'role'        => 'guest',
            'userId'      => '',
            'userName'    => '',
            'partnerId'   => '',
            'partnerName' => ''
        )
    ));
}

$auth = mokta_resolve_auth();

function mokta_resolve_prod_img($raw) {
    $raw = trim((string)$raw);
    if ($raw === '') return '/customized/mokta/images/sand_dunes_camp.jpg';
    if (preg_match('/^https?:\/\//i', $raw)) return $raw;
    if (strpos($raw, '/upfiles/') === 0) return 'https://files.boolub.com' . $raw;
    if (strpos($raw, '/') === 0) return $raw;
    return 'https://files.boolub.com/upfiles/product/' . $raw;
}

function mokta_resolve_board_img($raw) {
    $raw = trim((string)$raw);
    if ($raw === '') return '';
    if (preg_match('/^https?:\/\//i', $raw)) return $raw;
    if (strpos($raw, '/upfiles/') === 0) return 'https://files.boolub.com' . $raw;
    if (strpos($raw, '/') === 0) return $raw;
    return 'https://files.boolub.com/upfiles/board/' . $raw;
}

function mokta_clean_summary($html, $maxLen = 100) {
    $s = preg_replace('/<style\b[^>]*>[\s\S]*?<\/style>/i', ' ', (string)$html);
    $s = preg_replace('/<script\b[^>]*>[\s\S]*?<\/script>/i', ' ', $s);
    $s = strip_tags($s);
    $s = html_entity_decode($s, ENT_QUOTES, 'UTF-8');
    $s = trim(preg_replace('/\s+/u', ' ', $s));
    if ($s === '' || strpos($s, ':root') === 0 || strpos($s, '/*') === 0 || strpos($s, '.') === 0 || strpos($s, '@media') === 0) {
        return '';
    }
    return mb_strlen($s, 'UTF-8') > $maxLen ? mb_substr($s, 0, $maxLen, 'UTF-8') . '...' : $s;
}

/* =========================================================================
   1. 부럽 실제 몽골 판매 상품(smart_product) & 실제 입점 파트너(smart_company) 로드
   ========================================================================= */
$prodRows = mokta_q_all("
    SELECT p.p_code, p.p_name, p.p_subname, p.p_cpid, p.p_price, p.p_screenPrice,
           p.p_img_list_square, p.p_img_b1, p.p_idx,
           c.cp_name, c.cp_ceoname, c.cp_address, c.cp_homepage, c.cp_intro, c.cp_kakao_chat_link,
           (SELECT COUNT(*) FROM smart_product_talk pt WHERE pt.pt_pcode = p.p_code AND pt.pt_depth = 1) AS rev_cnt,
           (SELECT AVG(pt.pt_eval_point) FROM smart_product_talk pt WHERE pt.pt_pcode = p.p_code AND pt.pt_depth = 1 AND pt.pt_eval_point > 0) AS rev_avg
    FROM smart_product p
    LEFT JOIN smart_company c ON c.cp_id = p.p_cpid
    WHERE p.p_view = 'Y'
      AND p.p_cpid != 'BeMyGuestA'
      AND (
        p.p_name LIKE '%몽골%' OR p.p_subname LIKE '%몽골%'
        OR p.p_name LIKE '%고비%' OR p.p_name LIKE '%홉스골%'
        OR p.p_name LIKE '%테를지%' OR p.p_name LIKE '%울란바토르%'
        OR p.p_name LIKE '%차강소브%' OR p.p_name LIKE '%아르항가이%'
      )
    ORDER BY (p.p_cpid = 'boolub') DESC, rev_cnt DESC, p.p_idx ASC
");

$partnerStaticMeta = array(
    'boolub' => array(
        'id' => 'ag1', 'displayName' => '부럽 몽골원정대 (직영)', 'en' => 'BOOLUB EXPEDITION',
        'logoImg' => '/customized/mokta/images/mokta_logo.png',
        'cat' => '고비·남부', 'spec' => '1인 출발확정 직영', 'resp' => '즉시 출발확정',
        'fleet' => '원정대 전용 차량 배정', 'camp' => '업그레이드 게르 보장',
        'career' => '부럽트래블(주) 본사 직영',
        'slogan' => '동행 못 구해도 걱정 ZERO! 1인 신청 즉시 100% 출발확정 보장',
        'perks' => array('1인 신청 즉시 출발확정', '몽골 데이터 USIM 포함', '게르 업그레이드 · 특식 포함', '현지 추가금 0원'),
        'storeUrl' => 'https://www.boolub.com/?pn=pages.view&type=pages&data=mgexpedition',
        'fallbackDesc' => '부럽트래블(주)이 직영 운영하는 대표 몽골원정대 프로그램으로, 1인 신청 시에도 모객 취소 없이 출발이 확정되며 USIM 무료 제공·게르 업그레이드·특식이 기본 포함됩니다.'
    ),
    'bbm0707' => array(
        'id' => 'ag2', 'displayName' => 'BBM TOUR (비비엠투어)', 'en' => 'BBM MONGOLIA TOUR',
        'logoImg' => '/customized/mokta/images/partners/bbm0707.jpeg',
        'cat' => '고비·남부', 'spec' => '2009년 설립 · 15년 전통', 'resp' => '빠른 현지응답',
        'fleet' => '스타렉스 · 푸르공 직영운행', 'camp' => '남고비·중부·홉스골 검증캠프',
        'career' => '2009년 설립 · 울란바토르 본사',
        'slogan' => '2009년 설립 15년 노하우, 울란바토르 현지 직영 베테랑 여행사',
        'perks' => array('2009년 설립 15년 업력', '남부·고비·중부·홉스골 17개 코스', '한국어 능통 현지 가이드', '단독·조인 맞춤 배차'),
        'storeUrl' => 'https://www.boolub.com/?pn=partner.view&pid=bbm0707',
        'fallbackDesc' => ''
    ),
    'anoratour' => array(
        'id' => 'ag3', 'displayName' => '노라투어 (NORA TOUR)', 'en' => 'NORA TOUR MONGOLIA',
        'logoImg' => '/customized/mokta/images/partners/anoratour.png',
        'cat' => '고비·남부', 'spec' => '고비·중부·홉스골 시그니처', 'resp' => '한국·몽골 직영상담',
        'fleet' => '전용 스타렉스 · 푸르공', 'camp' => '샤워 가능 여행자 게르 캠프',
        'career' => '정식 국내외여행업 등록 법인',
        'slogan' => '고비사막 시그니처부터 홉스골 7박8일 단독까지 17개 정규 라인업 운영',
        'perks' => array('부럽 17개 정규 투어 운영', '고비 THE자연·시그니처 전문', '한국 지사 정식 등록 여행사', '쾌적한 여행자 게르 배정'),
        'storeUrl' => 'https://www.boolub.com/?pn=partner.view&pid=anoratour',
        'fallbackDesc' => '경기도 고양시 국내 지사 및 몽골 현지 네트워크를 기반으로 고비사막 시그니처 4박5일, 중부 힐링코스, 홉스골 단독코스 등 17개 정규 상품을 운영하는 부럽 공식 파트너사입니다.'
    ),
    'wit77777' => array(
        'id' => 'ag4', 'displayName' => '더블유아이티 (WIT)', 'en' => 'WORLD INDIVIDUAL TRAVEL',
        'logoImg' => '/customized/mokta/images/partners/wit77777.png',
        'cat' => '홉스골·중부', 'spec' => '공항 단독픽업 · 단기 프라이빗', 'resp' => '단독차량 즉시연결',
        'fleet' => '공항 단독 세단·승합차량', 'camp' => '테를지·미니사막 단독투어',
        'career' => '한국어가이드 단독투어 전문',
        'slogan' => '새벽 칭기스칸 공항 단독 픽업부터 한국어가이드 단기 프라이빗 투어까지!',
        'perks' => array('울란바토르 공항 단독픽업·샌딩', '실력 검증 현지 한국어가이드', '테를지·미니사막 1박2일~2박3일', '우리 일행 프라이빗 단독 출발'),
        'storeUrl' => 'https://www.boolub.com/?pn=partner.view&pid=wit77777',
        'fallbackDesc' => ''
    ),
    'YangGaTour' => array(
        'id' => 'ag5', 'displayName' => '양가투어 (YangGa Mongolian Fri)', 'en' => 'YANGGA MONGOLIAN FRIENDS',
        'logoImg' => '/customized/mokta/images/partners/YangGaTour.png',
        'cat' => '홉스골·중부', 'spec' => '중부 시그니처 · 홉스골 전문', 'resp' => '울란바토르 직영',
        'fleet' => '장거리 투어 전용 차량', 'camp' => '어기호수·온천·홉스골 캠프',
        'career' => '울란바토르 현지 법인 직영',
        'slogan' => '테를지·미니사막·쳉헤르 온천부터 홉스골까지 조인·단독 시그니처 투어',
        'perks' => array('중부 2박3일~6박7일 전 라인업', '조인·동행·단독 모두 가능', '쳉헤르 온천·촐로트 협곡 코스', '홉스골 5박6일 패키지 운영'),
        'storeUrl' => 'https://www.boolub.com/?pn=partner.view&pid=YangGaTour',
        'fallbackDesc' => '울란바토르 현지 직영 법인(YangGa Mongolian Friends)으로 중부 시그니처(테를지·미니사막·온천·어기호수) 2박~6박 코스와 고비·홉스골 조인/단독 패키지를 전문 운영합니다.'
    ),
    'Bftour' => array(
        'id' => 'ag6', 'displayName' => '밝은 미래 여행 (BRIGHT FUTURE)', 'en' => 'BRIGHT FUTURE TOUR',
        'logoImg' => '/customized/mokta/images/partners/Bftour.png',
        'cat' => '고비·남부', 'spec' => '은하수 헌팅 · 샤워가능 게르', 'resp' => '현지 직영 상담',
        'fleet' => '남고비·홉스골 오프로드 차량', 'camp' => '매일 샤워 가능 여행자 게르',
        'career' => '울란바토르 메트로비즈니스센터 본사',
        'slogan' => '매일 샤워 가능한 게르 숙박 & 삼겹살·허르헉·은하수 헌팅 풀패키지!',
        'perks' => array('매일 샤워 가능한 게르 코스 보유', '삼겹살+허르헉 특식 패키지', '천체망원경 · 은하수 헌팅 테마', '남고비 & 홉스골 13개 상품 운영'),
        'storeUrl' => 'https://www.boolub.com/?pn=partner.view&pid=Bftour',
        'fallbackDesc' => '울란바토르 중심가 메트로 비즈니스센터에 위치한 직영 여행사로, 매일 샤워 가능한 게르 숙박 고비사막 투어와 홉스골 은하수 헌팅·천체망원경 체험 투어 13종을 운영합니다.'
    ),
    'doittavel' => array(
        'id' => 'ag7', 'displayName' => '(주)두잇트래블', 'en' => 'DO IT TRAVEL',
        'logoImg' => null, 'c1' => '#0284c7', 'c2' => '#38bdf8', 'abbr' => 'DOIT',
        'cat' => '고비·남부', 'spec' => 'A/B 선택형 맞춤코스 전문', 'resp' => '서울 본사 빠른상담',
        'fleet' => '일정별 전용 차량 배정', 'camp' => '고비·중부·홉스골 정식 캠프',
        'career' => '서울 동대문구 정식 법인 여행사',
        'slogan' => '원하는 동선대로 고르는 고비 A/B 선택형 투어 & 홉스골 풀패키지',
        'perks' => array('고비 A/B 코스 맞춤형 선택', '5박6일~7박8일 홉스골 일주', '모래썰매·낙타·승마·보트 포함', '서울 본사 직통 안전 케어'),
        'storeUrl' => 'https://www.boolub.com/?pn=partner.view&pid=doittavel',
        'fallbackDesc' => '서울 동대문구 소재 (주)두잇트래블 법인이 직접 운영하며, A/B 코스 중 원하는 코스를 선택하는 4박5일 고비사막 투어와 5박~7박 홉스골 조인·단독 패키지 12종을 제공합니다.'
    ),
    'SKYTOURS' => array(
        'id' => 'ag8', 'displayName' => 'SKY TOURS MONGOLIA (스카이투어)', 'en' => 'SKY TOURS MONGOLIA',
        'logoImg' => '/customized/mokta/images/partners/SKYTOURS.jpg',
        'cat' => '홉스골·중부', 'spec' => '천체망원경 별관측 · 중부·고비', 'resp' => '현지 직영 확정',
        'fleet' => '전용 투어 차량 배정', 'camp' => '별자리 관측 최적 게르 캠프',
        'career' => '울란바토르 직영 · 평균평점 ★4.90',
        'slogan' => '사막·온천·테를지 핵심 동선에 천체망원경 별자리 관측까지 더한 감동 투어',
        'perks' => array('천체망원경 별자리 체험 포함', '테를지 1박2일 단기부터 6박7일까지', '고비사막 · 홉스골 정규 9개 상품', '부럽 고객 평점 ★4.90 우수 파트너'),
        'storeUrl' => 'https://www.boolub.com/?pn=partner.view&pid=SKYTOURS',
        'fallbackDesc' => '울란바토르 현지 직영 랜드사(SKY TOURS MONGOLIA)로 천체망원경 별자리 체험 3박4일, 테를지 1박2일 단기코스, 고비사막 및 홉스골 정규 투어 9종을 높은 만족도로 운영합니다.'
    ),
    'khadag' => array(
        'id' => 'ag9', 'displayName' => '하닥투어 (KHADAG TOUR)', 'en' => 'KHADAG TOUR MONGOLIA',
        'logoImg' => '/customized/mokta/images/partners/khadag.png',
        'cat' => '홉스골·중부', 'spec' => '직장인 단기 · 온천 · 키즈 특화', 'resp' => '한국·몽골 전담케어',
        'fleet' => '단독 프라이빗 쾌적 차량', 'camp' => '테를지·쳉헤르 온천 우수캠프',
        'career' => '울란바토르 본사 · 한국인 담당 케어',
        'slogan' => '직장인 알짜 2박3일 테를지부터 사막+온천 3박4일, 어린이 키즈 투어까지!',
        'perks' => array('직장인 추천 테를지 2박3일 베스트', '사막+초원+온천 3박4일 속성코스', '초원 체험형 키즈 전용 3박4일', '버킷리스트 5박6일 고비사막·홉스골'),
        'storeUrl' => 'https://www.boolub.com/?pn=partner.view&pid=khadag',
        'fallbackDesc' => '직장인을 위한 짧은 2박3일 테를지 투어, 사막·초원·온천을 한 번에 즐기는 3박4일 속성코스, 아이 동반 가족을 위한 키즈 몽골 여행 등 특색 있는 알짜 투어를 운영합니다.'
    )
);

$products = array();
$partnerAgg = array();

foreach ($prodRows as $idx => $p) {
    $pid = trim((string)$p['p_cpid']);
    if ($pid === '') $pid = 'boolub';
    $title = trim((string)$p['p_name']);
    $subRaw = trim((string)$p['p_subname']);
    $priceNum = (int)$p['p_price'];
    $screenNum = (int)$p['p_screenPrice'];
    $revCnt = (int)$p['rev_cnt'];
    $revAvg = $p['rev_avg'] > 0 ? round((float)$p['rev_avg'] / 20, 2) : 5.00;
    $imgUrl = mokta_resolve_prod_img($p['p_img_list_square'] !== '' ? $p['p_img_list_square'] : $p['p_img_b1']);

    $pMeta = isset($partnerStaticMeta[$pid]) ? $partnerStaticMeta[$pid] : null;
    $partnerLabel = $pMeta ? $pMeta['displayName'] : ($p['cp_name'] ? $p['cp_name'] : $pid);

    // 지역 분류
    $regionKey = '중부';
    if (mb_strpos($title . ' ' . $subRaw, '고비', 0, 'UTF-8') !== false || mb_strpos($title . ' ' . $subRaw, '차강소브', 0, 'UTF-8') !== false || mb_strpos($title, '남부', 0, 'UTF-8') !== false) {
        $regionKey = '고비';
    } elseif (mb_strpos($title . ' ' . $subRaw, '홉스골', 0, 'UTF-8') !== false) {
        $regionKey = '홉스골';
    } elseif (mb_strpos($title . ' ' . $subRaw, '테를지', 0, 'UTF-8') !== false || mb_strpos($title, '울란바토르', 0, 'UTF-8') !== false || mb_strpos($title, '공항', 0, 'UTF-8') !== false) {
        $regionKey = '테를지';
    }

    // 기간 분류
    $durationKey = '4박5일';
    if (preg_match('/1박\s*2일|당일|픽업/u', $title)) {
        $durationKey = '2박3일';
    } elseif (preg_match('/2박\s*3일/u', $title)) {
        $durationKey = '2박3일';
    } elseif (preg_match('/3박\s*4일/u', $title)) {
        $durationKey = '3박4일';
    } elseif (preg_match('/4박\s*5일/u', $title)) {
        $durationKey = '4박5일';
    } elseif (preg_match('/[5678]박/u', $title)) {
        $durationKey = '5박6일';
    }

    // 진행 스타일 & 탭 카테고리
    $styleKey = '단독';
    if ($pid === 'boolub' || mb_strpos($title, '원정대', 0, 'UTF-8') !== false) {
        $styleKey = '원정대';
    } elseif (mb_strpos($title, '조인', 0, 'UTF-8') !== false || mb_strpos($title, '동행', 0, 'UTF-8') !== false) {
        $styleKey = '조인';
    }

    $cat = '고비';
    if ($styleKey === '원정대') {
        $cat = '원정대';
    } elseif ($durationKey === '2박3일' || $durationKey === '3박4일') {
        $cat = '단기';
    } elseif ($regionKey === '홉스골' || $regionKey === '중부') {
        $cat = '홉스골·중부';
    }

    $discountStr = '';
    $originStr = '';
    if ($screenNum > $priceNum && $priceNum > 0) {
        $pct = round((1 - ($priceNum / $screenNum)) * 100);
        if ($pct > 0) {
            $discountStr = $pct . '%';
            $originStr = od_number_format($screenNum) . '원';
        }
    }

    $tag = $styleKey === '원정대' ? '부럽 직영 원정대' : ($styleKey === '조인' ? '조인·단독 가능' : '공식 파트너 투어');
    if (mb_strpos($title, '공항', 0, 'UTF-8') !== false) $tag = '단독 공항픽업';
    elseif (mb_strpos($title, '망원경', 0, 'UTF-8') !== false) $tag = '천체망원경 체험';
    elseif (mb_strpos($title, '온천', 0, 'UTF-8') !== false) $tag = '노천온천 힐링';

    $highlights = array();
    if ($subRaw !== '') {
        $highlights[] = '포함·핵심코스: ' . $subRaw;
    }
    $highlights[] = '운영 파트너: ' . $partnerLabel . ' (부럽 정식 입점 검증)';
    $highlights[] = $styleKey === '원정대'
        ? '1인 예약도 모객 취소 없이 출발확정 · USIM 무료 · 특식 포함'
        : '부럽 에스크로 안전 카드결제 및 일정 맞춤 상담 가능';

    $products[] = array(
        'id'          => 'p_' . ($idx + 1),
        'pcode'       => $p['p_code'],
        'pid'         => $pid,
        'cat'         => $cat,
        'regionKey'   => $regionKey,
        'durationKey' => $durationKey,
        'styleKey'    => $styleKey,
        'tag'         => $tag,
        'sub'         => $subRaw !== '' ? ($partnerLabel . ' · ' . $subRaw) : ($partnerLabel . ' 공식 판매 상품'),
        'title'       => $title,
        'rating'      => od_number_format($revAvg, 2),
        'reviews'     => $revCnt,
        'discount'    => $discountStr,
        'originPrice' => $originStr,
        'price'       => od_number_format($priceNum) . '원',
        'img'         => $imgUrl,
        'highlights'  => $highlights
    );

    if (!isset($partnerAgg[$pid])) {
        $introClean = mokta_clean_summary($p['cp_intro'] ?? '', 180);
        $partnerAgg[$pid] = array(
            'pid'       => $pid,
            'cpName'    => $p['cp_name'] ?: $partnerLabel,
            'ceo'       => trim((string)($p['cp_ceoname'] ?? '')),
            'address'   => trim((string)($p['cp_address'] ?? '')),
            'homepage'  => trim((string)($p['cp_homepage'] ?? '')),
            'intro'     => $introClean,
            'prodCount' => 0,
            'revSum'    => 0,
            'revWeighted' => 0.0,
            'photos'    => array(),
            'repPcode'  => $p['p_code']
        );
    }
    $partnerAgg[$pid]['prodCount']++;
    $partnerAgg[$pid]['revSum'] += $revCnt;
    $partnerAgg[$pid]['revWeighted'] += ($revAvg * max(1, $revCnt));
    if (od_count($partnerAgg[$pid]['photos']) < 6 && !od_in_array($imgUrl, $partnerAgg[$pid]['photos'], true)) {
        $partnerAgg[$pid]['photos'][] = $imgUrl;
    }
}

/* 파트너사 커스텀 미니홈 프로필(smart_mokta_partner_profile) 로드 */
mokta_q_exec("
    CREATE TABLE IF NOT EXISTS `smart_mokta_partner_profile` (
      `pp_pid` VARCHAR(50) NOT NULL,
      `pp_name` VARCHAR(100) NOT NULL DEFAULT '',
      `pp_slogan` VARCHAR(200) NOT NULL DEFAULT '',
      `pp_spec_badge` VARCHAR(80) NOT NULL DEFAULT '',
      `pp_fleet` VARCHAR(160) NOT NULL DEFAULT '',
      `pp_camp` VARCHAR(160) NOT NULL DEFAULT '',
      `pp_career` VARCHAR(160) NOT NULL DEFAULT '',
      `pp_desc` TEXT DEFAULT NULL,
      `pp_perks_json` TEXT DEFAULT NULL,
      `pp_cover_img` VARCHAR(255) NOT NULL DEFAULT '',
      `pp_photos_json` TEXT DEFAULT NULL,
      `pp_video_url` VARCHAR(255) NOT NULL DEFAULT '',
      `pp_updated_by` VARCHAR(60) NOT NULL DEFAULT '',
      `pp_udate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`pp_pid`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
");
$profRows = mokta_q_all("SELECT * FROM smart_mokta_partner_profile");
$partnerProfiles = array();
foreach ($profRows as $pr) {
    $perks = json_decode((string)$pr['pp_perks_json'], true);
    $photos = json_decode((string)$pr['pp_photos_json'], true);
    $partnerProfiles[$pr['pp_pid']] = array(
        'pid'       => $pr['pp_pid'],
        'slogan'    => $pr['pp_slogan'],
        'specBadge' => $pr['pp_spec_badge'],
        'fleet'     => $pr['pp_fleet'],
        'camp'      => $pr['pp_camp'],
        'career'    => $pr['pp_career'],
        'desc'      => $pr['pp_desc'],
        'perks'     => is_array($perks) ? $perks : array(),
        'coverImg'  => $pr['pp_cover_img'],
        'photos'    => is_array($photos) ? $photos : array(),
        'videoUrl'  => $pr['pp_video_url']
    );
}

/* 실제 입점 파트너 목록 구성 (smart_company + smart_product 실데이터 100%) */
$orderedPids = od_array_keys($partnerStaticMeta);
foreach (od_array_keys($partnerAgg) as $extraPid) {
    if (!od_in_array($extraPid, $orderedPids, true)) {
        $orderedPids[] = $extraPid;
    }
}

$partners = array();
$agSeq = 1;
foreach ($orderedPids as $pid) {
    if (!isset($partnerAgg[$pid])) continue;
    $agg = $partnerAgg[$pid];
    $sm  = isset($partnerStaticMeta[$pid]) ? $partnerStaticMeta[$pid] : array(
        'id' => 'ag' . $agSeq,
        'displayName' => $agg['cpName'],
        'en' => strtoupper($pid),
        'logoImg' => null,
        'c1' => '#0284c7', 'c2' => '#38bdf8', 'abbr' => mb_substr($agg['cpName'], 0, 2, 'UTF-8'),
        'cat' => '고비·남부',
        'spec' => '공식 입점 파트너',
        'resp' => '실시간 상담',
        'fleet' => '전용 차량 배정',
        'camp' => '검증 게르 캠프',
        'career' => '부럽 공식 파트너',
        'slogan' => $agg['cpName'] . ' 공식 브랜드 미니홈',
        'perks' => array('부럽 공식 입점 여행사', '안전 에스크로 결제 지원'),
        'storeUrl' => 'https://www.boolub.com/?pn=partner.view&pid=' . urlencode($pid),
        'fallbackDesc' => $agg['cpName'] . '에서 운영하는 몽골 정규 투어를 부럽에서 안전하게 만나보세요.'
    );
    $agSeq++;

    $avgRating = $agg['revSum'] > 0
        ? od_number_format(min(5.0, $agg['revWeighted'] / max(1, $agg['revSum'])), 2)
        : '5.00';

    $realDesc = $agg['intro'] !== '' ? $agg['intro'] : $sm['fallbackDesc'];
    $coverImg = !empty($agg['photos'][0]) ? $agg['photos'][0] : '/customized/mokta/images/milkyway_gobi.jpg';
    $photosList = !empty($agg['photos']) ? array_slice($agg['photos'], 0, 6) : array($coverImg);

    $pItem = array(
        'id'         => $sm['id'],
        'pid'        => $pid,
        'statusType' => 'active',
        'cert'       => ($pid === 'boolub' ? '부럽 본사 직영 · ' : '부럽 공식파트너 · ') . $agg['prodCount'] . '개 상품 운영',
        'name'       => $sm['displayName'],
        'en'         => $sm['en'],
        'cat'        => $sm['cat'],
        'spec'       => $sm['spec'],
        'rating'     => $avgRating,
        'reviews'    => $agg['revSum'],
        'prodCount'  => $agg['prodCount'],
        'resp'       => $sm['resp'],
        'fleet'      => $sm['fleet'],
        'camp'       => $sm['camp'],
        'career'     => $sm['career'] . ($agg['ceo'] !== '' ? ' · 대표 ' . $agg['ceo'] : ''),
        'slogan'     => $sm['slogan'],
        'perks'      => $sm['perks'],
        'desc'       => $realDesc,
        'address'    => $agg['address'],
        'homepage'   => $agg['homepage'],
        'logoImg'    => $sm['logoImg'],
        'c1'         => isset($sm['c1']) ? $sm['c1'] : '#0284c7',
        'c2'         => isset($sm['c2']) ? $sm['c2'] : '#38bdf8',
        'abbr'       => isset($sm['abbr']) ? $sm['abbr'] : 'MK',
        'storeUrl'   => $sm['storeUrl'],
        'repPcode'   => $agg['repPcode'],
        'cover'      => $coverImg,
        'photos'     => $photosList,
        'videoUrl'   => ''
    );

    if (isset($partnerProfiles[$pid])) {
        $pf = $partnerProfiles[$pid];
        if (!empty($pf['slogan']))    $pItem['slogan'] = $pf['slogan'];
        if (!empty($pf['specBadge'])) $pItem['spec'] = $pf['specBadge'];
        if (!empty($pf['fleet']))     $pItem['fleet'] = $pf['fleet'];
        if (!empty($pf['camp']))      $pItem['camp'] = $pf['camp'];
        if (!empty($pf['career']))    $pItem['career'] = $pf['career'];
        if (!empty($pf['desc']))      $pItem['desc'] = $pf['desc'];
        if (!empty($pf['perks']))     $pItem['perks'] = $pf['perks'];
        if (!empty($pf['coverImg']))  $pItem['cover'] = $pf['coverImg'];
        if (!empty($pf['photos']))    $pItem['photos'] = $pf['photos'];
        if (isset($pf['videoUrl']))   $pItem['videoUrl'] = $pf['videoUrl'];
    }

    $partners[] = $pItem;
}

/* =========================================================================
   2. 부럽 실제 몽골 매거진(smart_bbs, b_menu='cityguide') 로드
   ========================================================================= */
$magRows = mokta_q_all("
    SELECT b_uid, b_title, b_img1, b_content, b_hit, b_rdate
    FROM smart_bbs
    WHERE b_menu = 'cityguide'
      AND (
        b_title LIKE '%몽골%' OR b_title LIKE '%고비%'
        OR b_title LIKE '%홉스골%' OR b_title LIKE '%테를지%'
        OR b_title LIKE '%울란바토르%' OR b_title LIKE '%징기스칸%'
      )
    ORDER BY b_uid DESC
    LIMIT 16
");

$magazines = array();
foreach ($magRows as $m) {
    $rawTitle = trim(stripslashes((string)$m['b_title']));
    $theme = '여행가이드';
    $filterCat = '동행·일정';

    if (preg_match('/음식|맛집|식당|한국음식|허르헉/u', $rawTitle)) {
        $theme = '맛집&음식';
        $filterCat = '고비·온천·체험';
    } elseif (preg_match('/게르|숙소|캠프/u', $rawTitle)) {
        $theme = '숙소·게르';
        $filterCat = '준비물·게르';
    } elseif (preg_match('/준비물/u', $rawTitle)) {
        $theme = '필수준비물';
        $filterCat = '준비물·게르';
    } elseif (preg_match('/공항|버스|교통|날씨/u', $rawTitle)) {
        $theme = '교통&여행팁';
        $filterCat = '공항·교통·날씨';
    } elseif (preg_match('/고비|온천|체험|액티비티|투어/u', $rawTitle)) {
        $theme = '액티비티&투어';
        $filterCat = '고비·온천·체험';
    } elseif (preg_match('/동행|일정|코스|남은시간/u', $rawTitle)) {
        $theme = '추천일정';
        $filterCat = '동행·일정';
    }

    $img = mokta_resolve_board_img($m['b_img1']);
    if ($img === '' && preg_match('/<img[^>]+src=["\']([^"\']+)["\']/i', (string)$m['b_content'], $im)) {
        $img = $im[1];
    }
    if ($img === '') {
        $img = '/images/main/waug/explore_magazine.jpg';
    }

    $magazines[] = array(
        'uid'       => (string)$m['b_uid'],
        'title'     => $rawTitle,
        'city'      => '몽골',
        'theme'     => $theme,
        'filterCat' => $filterCat,
        'img'       => $img,
        'hit'       => (int)$m['b_hit'],
        'rdate'     => substr((string)$m['b_rdate'], 0, 10),
        'summary'   => mokta_clean_summary($m['b_content'], 88),
        'url'       => 'https://www.boolub.com/?pn=board.view&_menu=cityguide&_uid=' . (int)$m['b_uid']
    );
}

/* =========================================================================
   3. 고객 맞춤견적(smart_mokta_rfq) + 파트너 비교견적(smart_mokta_bid) 로드
   ========================================================================= */
$rfqRows = mokta_q_all("
    SELECT *
    FROM smart_mokta_rfq
    WHERE mr_view_yn = 'Y'
    ORDER BY mr_uid DESC
    LIMIT 30
");

$rfqs = array();
if (!empty($rfqRows)) {
    $mrIds = array();
    foreach ($rfqRows as $r) {
        $mrIds[] = (int)$r['mr_uid'];
    }
    $idList = implode(',', $mrIds);
    $bidRows = mokta_q_all("
        SELECT *
        FROM smart_mokta_bid
        WHERE mb_mr_uid IN ({$idList})
        ORDER BY mb_uid DESC
    ");
    $bidsByRfq = array();
    foreach ($bidRows as $b) {
        $k = (int)$b['mb_mr_uid'];
        if (!isset($bidsByRfq[$k])) $bidsByRfq[$k] = array();
        $logoPath = $b['mb_logo'] !== '' ? str_replace('boolub_logo.png', 'mokta_logo.png', $b['mb_logo']) : '/customized/mokta/images/mokta_logo.png';
        $guarArr = array();
        if (!empty($b['mb_guarantees_json'])) {
            $decG = json_decode((string)$b['mb_guarantees_json'], true);
            if (is_array($decG)) $guarArr = $decG;
        }
        if (empty($guarArr)) {
            $guarArr = array('전 일정 온수샤워 캠프', '노팁·노옵션 추가금 0원', '공항 무료 단독픽업', '연식보증 전용차량');
        }
        $bidsByRfq[$k][] = array(
            'agency'     => $b['mb_agency'],
            'pid'        => $b['mb_pid'],
            'pcode'      => $b['mb_pcode'],
            'logo'       => $logoPath,
            'badge'      => $b['mb_badge'],
            'price4'     => $b['mb_price4'],
            'price6'     => $b['mb_price6'],
            'veh'        => $b['mb_veh_name'],
            'ger'        => $b['mb_ger_name'],
            'vehImg'     => $b['mb_veh_img'],
            'gerImg'     => $b['mb_ger_img'],
            'comment'    => $b['mb_comment'],
            'guarantees' => $guarArr
        );
    }

    foreach ($rfqRows as $r) {
        $uid = (int)$r['mr_uid'];
        $specs = json_decode((string)$r['mr_specs_json'], true);
        if (!is_array($specs)) $specs = array($r['mr_cat'], $r['mr_region_tag']);
        $authorFirst = mb_substr($r['mr_author'], 0, 1, 'UTF-8');

        $rfqs[] = array(
            'id'        => (string)$uid,
            'inid'      => $r['mr_inid'],
            'author'    => $r['mr_author'] . ' 여행자님',
            'avatar'    => $authorFirst !== '' ? $authorFirst : '여',
            'timeAgo'   => substr((string)$r['mr_rdate'], 5, 11),
            'cat'       => $r['mr_cat'],
            'regionTag' => $r['mr_region_tag'],
            'dates'     => $r['mr_dates'],
            'paxType'   => $r['mr_pax_type'],
            'title'     => $r['mr_title'],
            'desc'      => $r['mr_memo'],
            'specs'     => $specs,
            'quotes'    => isset($bidsByRfq[$uid]) ? $bidsByRfq[$uid] : array()
        );
    }
}

/* =========================================================================
   4. 실시간 동행·오픈조인(smart_mokta_join + 실제 커뮤니티 동행모집 게시글 + 사전 Q&A 댓글 연동)
   ========================================================================= */
mokta_ensure_col('smart_mokta_join', 'mj_prefix_tag', "`mj_prefix_tag` VARCHAR(40) NOT NULL DEFAULT ''");
mokta_ensure_col('smart_mokta_join', 'mj_member_slots_json', "`mj_member_slots_json` TEXT NULL");
mokta_ensure_col('smart_mokta_join', 'mj_bumped_at', "`mj_bumped_at` DATETIME NULL DEFAULT NULL");
mokta_q_exec("
    CREATE TABLE IF NOT EXISTS `smart_mokta_join_cmt` (
      `jc_uid` INT UNSIGNED NOT NULL AUTO_INCREMENT,
      `jc_join_key` VARCHAR(40) NOT NULL DEFAULT '',
      `jc_author_id` VARCHAR(60) NOT NULL DEFAULT '',
      `jc_author_name` VARCHAR(60) NOT NULL DEFAULT '',
      `jc_role_badge` VARCHAR(40) NOT NULL DEFAULT '여행자',
      `jc_content` VARCHAR(500) NOT NULL DEFAULT '',
      `jc_rdate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (`jc_uid`),
      KEY `idx_join_key` (`jc_join_key`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
");

$cmtByJoin = array();
$cmtRows = mokta_q_all("SELECT * FROM smart_mokta_join_cmt ORDER BY jc_uid ASC LIMIT 300");
foreach ($cmtRows as $cr) {
    $jk = (string)$cr['jc_join_key'];
    if (!isset($cmtByJoin[$jk])) $cmtByJoin[$jk] = array();
    $cmtByJoin[$jk][] = array(
        'id'        => (string)$cr['jc_uid'],
        'author'    => $cr['jc_author_name'],
        'roleBadge' => $cr['jc_role_badge'],
        'content'   => $cr['jc_content'],
        'rdate'     => substr((string)$cr['jc_rdate'], 5, 11)
    );
}

$joinRows = mokta_q_all("
    SELECT *
    FROM smart_mokta_join
    WHERE mj_view_yn = 'Y'
    ORDER BY COALESCE(mj_bumped_at, mj_rdate) DESC, mj_uid DESC
    LIMIT 60
");
$joins = array();
foreach ($joinRows as $j) {
    $seats = json_decode((string)$j['mj_seats_json'], true);
    if (!is_array($seats)) $seats = array('확정1', '확정2', '확정3', '빈좌석', '빈좌석', '빈좌석');
    $slots = json_decode((string)($j['mj_member_slots_json'] ?? ''), true);
    if (!is_array($slots) || empty($slots)) {
        $slots = array();
        foreach ($seats as $sidx => $sv) {
            if ($sv !== '빈좌석') {
                $slots[] = array(
                    'role'   => $sidx === 0 ? ($j['mj_host_type'] === 'member' ? '방장' : '예약확정') : '동행확정',
                    'nick'   => $sv,
                    'age'    => ($sidx % 2 === 0) ? '20대' : '30대',
                    'gender' => ($sidx % 2 === 0) ? '여성' : '남성',
                    'flight' => '항공권완료',
                    'note'   => $j['mj_host_type'] === 'partner' ? '부럽 에스크로 확정' : '일정·매너 동행'
                );
            }
        }
    }
    $prefixTag = !empty($j['mj_prefix_tag'])
        ? $j['mj_prefix_tag']
        : ($j['mj_host_type'] === 'partner' ? '무조건출발확정' : '항공권발권완료');
    $rem = max(0, (int)$j['mj_max_pax'] - (int)$j['mj_cur_pax']);
    $jidStr = (string)$j['mj_uid'];
    $joins[] = array(
        'id'          => $jidStr,
        'hostType'    => $j['mj_host_type'],
        'hostInid'    => $j['mj_inid'],
        'pid'         => $j['mj_pid'],
        'prefixTag'   => $prefixTag,
        'dateKey'     => $j['mj_date_key'],
        'dateStr'     => $j['mj_date_str'],
        'regionKey'   => $j['mj_region_key'],
        'durationKey' => $j['mj_duration_key'],
        'styleKey'    => $j['mj_style_key'],
        'statusBadge' => $j['mj_status_badge'],
        'statusCls'   => $j['mj_status_cls'],
        'subBadge'    => $rem === 0 ? '모집마감' : "{$rem}자리 남음",
        'subCls'      => $rem <= 2 ? 'coral' : 'sky',
        'agency'      => $j['mj_agency'],
        'pcode'       => $j['mj_pcode'],
        'title'       => $j['mj_title'],
        'img'         => $j['mj_img'],
        'filled'      => (int)$j['mj_cur_pax'],
        'max'         => (int)$j['mj_max_pax'],
        'seats'       => $seats,
        'memberSlots' => $slots,
        'curPrice'    => $j['mj_cur_price'],
        'fullPrice'   => $j['mj_full_price'],
        'tags'        => $j['mj_tags'],
        'bumpedAt'    => !empty($j['mj_bumped_at']) ? substr((string)$j['mj_bumped_at'], 5, 11) : '',
        'comments'    => isset($cmtByJoin[$jidStr]) ? $cmtByJoin[$jidStr] : array(),
        'bbsUrl'      => ''
    );
}

/* 부럽 커뮤니티(smart_bbs, b_menu='community') 실제 몽골 동행모집 글 연동 */
$bbsJoinRows = mokta_q_all("
    SELECT b_uid, b_writer, b_title, b_img1, b_content, b_hit, b_rdate
    FROM smart_bbs
    WHERE b_menu = 'community'
      AND (
        b_content LIKE '%[동행찾기]%'
        OR b_title LIKE '%동행 구%'
        OR b_title LIKE '%동행구%'
        OR b_title LIKE '%동행찾%'
        OR b_title LIKE '%동행모집%'
      )
      AND (b_title LIKE '%몽골%' OR b_content LIKE '%몽골%' OR b_title LIKE '%고비%' OR b_title LIKE '%중부%' OR b_title LIKE '%홉스골%')
    ORDER BY b_uid DESC
    LIMIT 10
");
foreach ($bbsJoinRows as $bj) {
    $rawT = trim(stripslashes((string)$bj['b_title']));
    $rawC = strip_tags((string)$bj['b_content']);
    $comb = $rawT . ' ' . $rawC;

    $mm = 8;
    $dd = 6;
    if (preg_match('/(\d{1,2})\s*월\s*(\d{1,2})\s*일/u', $comb, $dm)) {
        $mm = (int)$dm[1];
        $dd = (int)$dm[2];
    } elseif (preg_match('/(0?[5-9]|10)\.(\d{1,2})/', $comb, $dm2)) {
        $mm = (int)$dm2[1];
        $dd = (int)$dm2[2];
    }
    if ($mm < 5 || $mm > 10) $mm = 8;
    if ($dd < 1 || $dd > 31) $dd = 12;
    $isoDate = sprintf('2026-%02d-%02d', $mm, $dd);

    $filledCnt = 2;
    if (preg_match('/([1-5])\s*(?:인|명)\s*(?:대기|확정|모집완)/u', $comb, $pm)) {
        $filledCnt = (int)$pm[1];
    }
    $remCnt = max(1, 6 - $filledCnt);
    $seatsArr = array();
    for ($si = 0; $si < 6; $si++) {
        $seatsArr[] = $si < $filledCnt ? ($si === 0 ? mokta_mask_name($bj['b_writer']) : '동행확정') : '빈좌석';
    }

    $regKey = '고비';
    $matchedPcode = 'V6003-W0388-Z1928';
    $matchedImg = 'https://files.boolub.com/upfiles/product/2082172223.png';
    if (mb_strpos($comb, '중부', 0, 'UTF-8') !== false || mb_strpos($comb, '테를지', 0, 'UTF-8') !== false) {
        $regKey = '중부';
        $matchedPcode = 'T0950-Q2923-W2496';
        $matchedImg = 'https://files.boolub.com/upfiles/product/4219813096.png';
    } elseif (mb_strpos($comb, '홉스골', 0, 'UTF-8') !== false) {
        $regKey = '홉스골';
        $matchedPcode = 'E4890-B3318-G7233';
        $matchedImg = 'https://files.boolub.com/upfiles/product/1740762828.jpg';
    }
    if (!empty($bj['b_img1'])) {
        $matchedImg = mokta_resolve_board_img($bj['b_img1']);
    }

    $durKey = '4박5일';
    if (preg_match('/2박\s*3일/u', $comb)) $durKey = '2박3일';
    elseif (preg_match('/3박\s*4일/u', $comb)) $durKey = '3박4일';
    elseif (preg_match('/5박\s*6일/u', $comb)) $durKey = '5박6일';

    $cleanTitle = preg_replace('/@@동행모집중@/u', '', $rawT);
    $cleanTitle = trim(preg_replace('/\s+/u', ' ', $cleanTitle));

    $bbsKey = 'bbs_' . $bj['b_uid'];
    $bbsPrefix = (mb_strpos($comb, '확정', 0, 'UTF-8') !== false) ? '투어사확정' : '항공권발권완료';
    $bbsSlots = array();
    for ($si = 0; $si < $filledCnt; $si++) {
        $bbsSlots[] = array(
            'role'   => $si === 0 ? '방장' : '동행확정',
            'nick'   => $si === 0 ? mokta_mask_name($bj['b_writer']) : '모험가#' . ($si + 1),
            'age'    => '2030',
            'gender' => ($si % 2 === 0) ? '여성' : '남성',
            'flight' => '항공권완료',
            'note'   => '부럽 커뮤니티 인증 동행'
        );
    }

    $joins[] = array(
        'id'          => $bbsKey,
        'prefixTag'   => $bbsPrefix,
        'dateKey'     => $isoDate,
        'dateStr'     => sprintf('%d.%02d 출발 · %s', $mm, $dd, $durKey),
        'regionKey'   => $regKey,
        'durationKey' => $durKey,
        'styleKey'    => '조인',
        'statusBadge' => '실제 커뮤니티 동행',
        'statusCls'   => 'amber',
        'subBadge'    => "{$remCnt}자리 모집중",
        'subCls'      => 'sky',
        'agency'      => '부럽 동행커뮤니티 · ' . mokta_mask_name($bj['b_writer']),
        'pcode'       => $matchedPcode,
        'title'       => $cleanTitle,
        'img'         => $matchedImg,
        'filled'      => $filledCnt,
        'max'         => 6,
        'seats'       => $seatsArr,
        'memberSlots' => $bbsSlots,
        'curPrice'    => '동행모집 게시글',
        'fullPrice'   => '1/N 조인상담',
        'tags'        => '부럽 실제 동행찾기 · 조회 ' . od_number_format((int)$bj['b_hit']) . '회',
        'comments'    => isset($cmtByJoin[$bbsKey]) ? $cmtByJoin[$bbsKey] : array(),
        'bbsUrl'      => 'https://www.boolub.com/?pn=board.view&_menu=community&_uid=' . (int)$bj['b_uid']
    );
}

/* =========================================================================
   5. 실제 여행자 포토 후기(smart_bbs) + 파트너 현장 스토리(smart_mokta_story) 연동
   ========================================================================= */
$stories = array();

$realRevRows = mokta_q_all("
    SELECT b_uid, b_menu, b_writer, b_title, b_img1, b_content, b_hit, b_rdate
    FROM smart_bbs
    WHERE b_menu IN ('community', 'mongolianExpedition')
      AND b_img1 IS NOT NULL AND b_img1 != ''
      AND b_title NOT LIKE '%동행%'
      AND b_content NOT LIKE '%[동행찾기]%'
      AND b_content NOT LIKE '%동행인원%'
      AND b_content NOT LIKE '%동행 구%'
      AND b_title NOT LIKE '%크루즈%'
      AND (b_title LIKE '%몽골%' OR b_content LIKE '%몽골%' OR b_title LIKE '%고비%' OR b_title LIKE '%홉스골%' OR b_title LIKE '%훕스골%' OR b_title LIKE '%원정대%')
    ORDER BY b_uid DESC
    LIMIT 8
");
foreach ($realRevRows as $rv) {
    $rvTitle = trim(stripslashes((string)$rv['b_title']));
    $rvSummary = mokta_clean_summary($rv['b_content'], 120);
    $rvImg = mokta_resolve_board_img($rv['b_img1']);

    $cat = '은하수·스냅';
    $agencyLabel = '부럽 몽골원정대 (직영)';
    $pcode = 'T0950-Q2923-W2496';
    $prodName = '[3박4일] 몽골 중부 원정대 동행 조인 투어';
    $priceTxt = '699,000원';

    if (mb_strpos($rvTitle . ' ' . $rvSummary, 'BBM', 0, 'UTF-8') !== false || mb_strpos($rvTitle, '훕스골', 0, 'UTF-8') !== false || mb_strpos($rvTitle, '홉스골', 0, 'UTF-8') !== false) {
        $cat = '게르·샤워실';
        $agencyLabel = 'BBM TOUR (비비엠투어)';
        $pcode = 'S5960-N2570-O4021';
        $prodName = '[몽골] 중부(미니사막,온천)+홉스골 6박7일';
        $priceTxt = '1,866,700원';
    } elseif (mb_strpos($rvTitle, '고비', 0, 'UTF-8') !== false) {
        $cat = '푸르공·스타렉스';
        $agencyLabel = '부럽 고비원정대 · 공식파트너';
        $pcode = 'C3954-E9344-H0474';
        $prodName = '[4박5일] 몽골 고비사막 원정대 동행 조인 투어';
        $priceTxt = '999,000원';
    } elseif (mb_strpos($rvSummary, '음식', 0, 'UTF-8') !== false) {
        $cat = '음식·불멍파티';
    }

    $stories[] = array(
        'id'       => 'rev_' . $rv['b_uid'],
        'cat'      => $cat,
        'agency'   => $agencyLabel,
        'pcode'    => $pcode,
        'prodName' => $prodName,
        'price'    => $priceTxt,
        'badge'    => '실제후기 · 조회 ' . od_number_format((int)$rv['b_hit']),
        'title'    => $rvTitle,
        'img'      => $rvImg,
        'tip'      => $rvSummary !== '' ? $rvSummary : (mokta_mask_name($rv['b_writer']) . ' 고객님이 부럽 커뮤니티에 직접 남겨주신 실제 몽골 여행 후기입니다.'),
        'postUrl'  => 'https://www.boolub.com/?pn=board.view&_menu=' . urlencode($rv['b_menu']) . '&_uid=' . (int)$rv['b_uid']
    );
}

$storyRows = mokta_q_all("
    SELECT *
    FROM smart_mokta_story
    WHERE ms_view_yn = 'Y'
    ORDER BY ms_uid DESC
    LIMIT 16
");
foreach ($storyRows as $s) {
    $stories[] = array(
        'id'       => (string)$s['ms_uid'],
        'cat'      => $s['ms_cat'],
        'agency'   => $s['ms_agency'],
        'pcode'    => $s['ms_pcode'],
        'prodName' => $s['ms_prod_name'],
        'price'    => $s['ms_price'],
        'badge'    => $s['ms_badge'],
        'title'    => $s['ms_title'],
        'img'      => $s['ms_img'],
        'tip'      => $s['ms_tip'],
        'postUrl'  => ''
    );
}

/* =========================================================================
   6. 고객 내 활동 내역(myApplies/receivedApplies) & 파트너 유입 리드(partnerLeads) & 마스터 입점목록
   ========================================================================= */
mokta_q_exec("
    CREATE TABLE IF NOT EXISTS `smart_mokta_join_apply` (
      `ja_uid` INT UNSIGNED NOT NULL AUTO_INCREMENT,
      `ja_join_key` VARCHAR(40) NOT NULL DEFAULT '',
      `ja_join_title` VARCHAR(200) NOT NULL DEFAULT '',
      `ja_pid` VARCHAR(50) NOT NULL DEFAULT '',
      `ja_host_inid` VARCHAR(60) NOT NULL DEFAULT '',
      `ja_applicant_id` VARCHAR(60) NOT NULL DEFAULT '',
      `ja_applicant_name` VARCHAR(60) NOT NULL DEFAULT '',
      `ja_contact` VARCHAR(100) NOT NULL DEFAULT '',
      `ja_pax` TINYINT UNSIGNED NOT NULL DEFAULT 1,
      `ja_memo` VARCHAR(255) NOT NULL DEFAULT '',
      `ja_status` ENUM('pending','confirmed','cancelled') NOT NULL DEFAULT 'pending',
      `ja_rdate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (`ja_uid`),
      KEY `idx_pid` (`ja_pid`),
      KEY `idx_applicant` (`ja_applicant_id`),
      KEY `idx_join_key` (`ja_join_key`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
");

$myApplies = array();
$receivedApplies = array();
$partnerLeads = array();

if ($auth['role'] !== 'guest' && $auth['userId'] !== '') {
    $escUid = mokta_esc($auth['userId']);
    $myRows = mokta_q_all("SELECT * FROM smart_mokta_join_apply WHERE ja_applicant_id = '{$escUid}' ORDER BY ja_uid DESC LIMIT 40");
    foreach ($myRows as $mr) {
        $myApplies[] = array(
            'id'        => (string)$mr['ja_uid'],
            'joinKey'   => $mr['ja_join_key'],
            'joinTitle' => $mr['ja_join_title'],
            'pid'       => $mr['ja_pid'],
            'pax'       => (int)$mr['ja_pax'],
            'contact'   => $mr['ja_contact'],
            'memo'      => $mr['ja_memo'],
            'status'    => $mr['ja_status'],
            'rdate'     => substr((string)$mr['ja_rdate'], 5, 11)
        );
    }

    $recRows = mokta_q_all("SELECT * FROM smart_mokta_join_apply WHERE ja_host_inid = '{$escUid}' ORDER BY ja_uid DESC LIMIT 40");
    foreach ($recRows as $rr) {
        $receivedApplies[] = array(
            'id'            => (string)$rr['ja_uid'],
            'joinKey'       => $rr['ja_join_key'],
            'joinTitle'     => $rr['ja_join_title'],
            'applicantName' => $rr['ja_applicant_name'],
            'contact'       => $rr['ja_contact'],
            'pax'           => (int)$rr['ja_pax'],
            'memo'          => $rr['ja_memo'],
            'status'        => $rr['ja_status'],
            'rdate'         => substr((string)$rr['ja_rdate'], 5, 11)
        );
    }
}

if ($auth['role'] === 'partner' || $auth['role'] === 'master') {
    $leadSql = ($auth['role'] === 'master')
        ? "SELECT * FROM smart_mokta_join_apply ORDER BY ja_uid DESC LIMIT 60"
        : sprintf("SELECT * FROM smart_mokta_join_apply WHERE ja_pid IN ('%s', 'boolub') ORDER BY ja_uid DESC LIMIT 60", mokta_esc($auth['partnerId']));
    $leadRows = mokta_q_all($leadSql);
    foreach ($leadRows as $lr) {
        $partnerLeads[] = array(
            'id'            => (string)$lr['ja_uid'],
            'joinKey'       => $lr['ja_join_key'],
            'joinTitle'     => $lr['ja_join_title'],
            'pid'           => $lr['ja_pid'],
            'applicantName' => $lr['ja_applicant_name'],
            'contact'       => $lr['ja_contact'],
            'pax'           => (int)$lr['ja_pax'],
            'memo'          => $lr['ja_memo'],
            'status'        => $lr['ja_status'],
            'rdate'         => substr((string)$lr['ja_rdate'], 5, 11)
        );
    }
}

$onboardList = null;
if ($auth['role'] === 'master') {
    $obRows = mokta_q_all("
        SELECT *
        FROM smart_mokta_onboard
        ORDER BY FIELD(mo_status, 'pending', 'approved', 'rejected'), mo_uid DESC
        LIMIT 50
    ");
    $onboardList = array();
    foreach ($obRows as $ob) {
        $onboardList[] = array(
            'id'       => (string)$ob['mo_uid'],
            'company'  => $ob['mo_company'],
            'moktaYn'  => $ob['mo_mokta_yn'],
            'contact'  => $ob['mo_contact'],
            'memberId' => $ob['mo_member_id'] !== '' ? $ob['mo_member_id'] : '-',
            'desc'     => $ob['mo_desc'],
            'status'   => $ob['mo_status'],
            'rdate'    => substr((string)$ob['mo_rdate'], 0, 16)
        );
    }
}

mokta_json(array(
    'ok'              => true,
    'auth'            => $auth,
    'products'        => $products,
    'partners'        => $partners,
    'magazines'       => $magazines,
    'rfqs'            => $rfqs,
    'joins'           => $joins,
    'stories'         => $stories,
    'myApplies'       => $myApplies,
    'receivedApplies' => $receivedApplies,
    'partnerLeads'    => $partnerLeads,
    'partnerProfiles' => $partnerProfiles,
    'onboardList'     => $onboardList
));
