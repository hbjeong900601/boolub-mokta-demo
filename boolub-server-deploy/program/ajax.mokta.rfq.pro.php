<?php
/**
 * 고객 맞춤견적 등록 API (smart_mokta_rfq + 부럽 즉시확정 추천상품 자동 첫 매칭)
 * 서버 배포 위치: /program/ajax.mokta.rfq.pro.php
 */
include_once(dirname(__FILE__) . '/mokta.inc.php');

$auth = mokta_resolve_auth();
$mode = isset($_POST['_mode']) ? trim($_POST['_mode']) : 'add';

if ($mode !== 'add') {
    mokta_json(array('ok' => false, 'message' => '잘못된 요청 모드입니다.'), 400);
}

$dates     = isset($_POST['dates']) ? trim($_POST['dates']) : '';
$paxType   = isset($_POST['pax_type']) ? trim($_POST['pax_type']) : '단독투어 · 4명 확정';
$course    = isset($_POST['course']) ? trim($_POST['course']) : '고비사막 핵심';
$infra     = isset($_POST['infra']) ? trim($_POST['infra']) : '신형 스타렉스 · 샤워 가능 캠프';
$regionTag = isset($_POST['region_tag']) ? trim($_POST['region_tag']) : '고비';
$memo      = isset($_POST['memo']) ? trim($_POST['memo']) : '';

if ($dates === '' || $memo === '') {
    mokta_json(array('ok' => false, 'message' => '희망 일정과 요청사항을 입력해 주세요.'), 400);
}

$cat       = (strpos($paxType, '동행조인') !== false) ? '동행조인' : '단독투어';
$author    = ($auth['userName'] !== '') ? $auth['userName'] : '방문고객';
$title     = "[{$dates}] {$course} 맞춤견적 요청합니다";
$specsArr  = array(explode('·', $paxType)[0], $infra, '공식파트너 실사비교');
$specsJson = json_encode($specsArr, JSON_UNESCAPED_UNICODE);

$sql = sprintf(
    "INSERT INTO smart_mokta_rfq
        (mr_inid, mr_author, mr_cat, mr_region_tag, mr_dates, mr_pax_type, mr_title, mr_memo, mr_specs_json, mr_bid_cnt, mr_view_yn, mr_rdate)
     VALUES
        ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', 1, 'Y', NOW())",
    mokta_esc($auth['userId']),
    mokta_esc($author),
    mokta_esc($cat),
    mokta_esc($regionTag),
    mokta_esc($dates),
    mokta_esc($paxType),
    mokta_esc($title),
    mokta_esc($memo),
    mokta_esc($specsJson)
);

if (!mokta_q_exec($sql)) {
    mokta_json(array('ok' => false, 'message' => '맞춤견적 DB 저장 중 오류가 발생했습니다.'), 500);
}

$rfqId = mokta_last_id();

// 부럽 직영 추천상품 자동 첫 비교견적 삽입 (고객 대기시간 이탈 방지 크로스셀링)
$recPcode  = ($regionTag === '홉스골') ? 'A9725-O5305-E2887' : 'C3954-E9344-H0474';
$recPrice4 = ($regionTag === '홉스골') ? '1,400,000원' : '1,150,000원';
$recPrice6 = ($regionTag === '홉스골') ? '1,184,000원' : '990,000원';

$bidSql = sprintf(
    "INSERT INTO smart_mokta_bid
        (mb_mr_uid, mb_pid, mb_agency, mb_logo, mb_badge, mb_pcode, mb_price4, mb_price6, mb_veh_name, mb_ger_name, mb_veh_img, mb_ger_img, mb_comment, mb_rdate)
     VALUES
        (%d, 'boolub', '부럽 몽골원정대 · AI 빠른추천', '/customized/mokta/images/mokta_logo.png', '견적 대기 없이 즉시 예약 가능', '%s', '%s', '%s', '%s', '부럽 검증 정식 캠프 + USIM 혜택', '/customized/mokta/images/vehicle_fleet.jpg', '/customized/mokta/images/ger_interior.jpg', '파트너사 맞춤 견적이 도착하는 동안 조건이 가장 유사한 부럽 즉시확정 베스트 상품을 먼저 확인해보세요!', NOW())",
    $rfqId,
    mokta_esc($recPcode),
    mokta_esc($recPrice4),
    mokta_esc($recPrice6),
    mokta_esc($infra)
);
mokta_q_exec($bidSql);

mokta_json(array(
    'ok'      => true,
    'id'      => (string)$rfqId,
    'message' => '맞춤견적 요청이 등록되었습니다.'
));
