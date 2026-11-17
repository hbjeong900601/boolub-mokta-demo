<?php
/**
 * 파트너사 실사 견적서 발송 API (입점 파트너 & 마스터 계정 전용)
 * 서버 배포 위치: /program/ajax.mokta.bid.pro.php
 */
include_once(dirname(__FILE__) . '/mokta.inc.php');

// [권한 강제] 비로그인 및 일반 회원은 접근 불가 (HTTP 403)
$auth = mokta_require_partner_or_master();

$rfqId = isset($_POST['rfq_id']) ? (int)$_POST['rfq_id'] : 0;
if ($rfqId <= 0) {
    mokta_json(array('ok' => false, 'message' => '대상 고객 요청글 번호가 올바르지 않습니다.'), 400);
}

$rfqRow = mokta_q_one("SELECT mr_uid, mr_bid_cnt FROM smart_mokta_rfq WHERE mr_uid = {$rfqId} AND mr_view_yn = 'Y' LIMIT 1");
if (empty($rfqRow['mr_uid'])) {
    mokta_json(array('ok' => false, 'message' => '존재하지 않는 고객 요청글입니다.'), 404);
}
if ((int)$rfqRow['mr_bid_cnt'] >= 6) {
    mokta_json(array('ok' => false, 'message' => '해당 요청글은 최대 6개 파트너사 견적이 모두 마감되었습니다.'), 409);
}

// 파트너 권한일 경우 반드시 본인 계정(partnerId)으로 고정 (타 파트너 사칭 원천 차단)
if ($auth['role'] === 'master') {
    $pid    = !empty($_POST['target_pid']) ? trim($_POST['target_pid']) : 'boolub';
    $agency = !empty($_POST['target_agency']) ? trim($_POST['target_agency']) : '부럽 몽골원정대 (직영)';
} else {
    $pid    = $auth['partnerId'];
    $agency = $auth['partnerName'];
}

$escPid  = mokta_esc($pid);
$mapMeta = mokta_q_one("SELECT mp_logo_url, mp_rep_pcode FROM smart_mokta_partner_map WHERE mp_pid = '{$escPid}' LIMIT 1");
$logoUrl = !empty($mapMeta['mp_logo_url']) ? $mapMeta['mp_logo_url'] : '/customized/mokta/images/boolub_logo.png';
$pcode   = !empty($_POST['pcode']) ? trim($_POST['pcode']) : (!empty($mapMeta['mp_rep_pcode']) ? $mapMeta['mp_rep_pcode'] : '');

$price4  = !empty($_POST['price4']) ? trim($_POST['price4']) : '1,060,000원';
$price6  = !empty($_POST['price6']) ? trim($_POST['price6']) : '840,000원';
$vehName = !empty($_POST['veh_name']) ? trim($_POST['veh_name']) : '신형 스타렉스 4WD';
$gerName = !empty($_POST['ger_name']) ? trim($_POST['ger_name']) : '온수 샤워 정식 캠프';
$comment = !empty($_POST['comment']) ? trim($_POST['comment']) : '정성껏 모시겠습니다.';

$upVeh  = mokta_upload_image('veh_file');
$upGer  = mokta_upload_image('ger_file');
$vehImg = $upVeh !== '' ? $upVeh : (!empty($_POST['veh_img']) ? trim($_POST['veh_img']) : '/customized/mokta/images/vehicle_fleet.jpg');
$gerImg = $upGer !== '' ? $upGer : (!empty($_POST['ger_img']) ? trim($_POST['ger_img']) : '/customized/mokta/images/ger_interior.jpg');

$insSql = sprintf(
    "INSERT INTO smart_mokta_bid
        (mb_mr_uid, mb_pid, mb_agency, mb_logo, mb_badge, mb_pcode, mb_price4, mb_price6, mb_veh_name, mb_ger_name, mb_veh_img, mb_ger_img, mb_comment, mb_rdate)
     VALUES
        (%d, '%s', '%s', '%s', '공식 입점파트너 실사견적', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', NOW())",
    $rfqId,
    $escPid,
    mokta_esc($agency),
    mokta_esc($logoUrl),
    mokta_esc($pcode),
    mokta_esc($price4),
    mokta_esc($price6),
    mokta_esc($vehName),
    mokta_esc($gerName),
    mokta_esc($vehImg),
    mokta_esc($gerImg),
    mokta_esc($comment)
);

if (!mokta_q_exec($insSql)) {
    mokta_json(array('ok' => false, 'message' => '견적서 저장 중 DB 오류가 발생했습니다.'), 500);
}

$bidId = mokta_last_id();
mokta_q_exec("UPDATE smart_mokta_rfq SET mr_bid_cnt = mr_bid_cnt + 1 WHERE mr_uid = {$rfqId}");

mokta_json(array(
    'ok'      => true,
    'id'      => (string)$bidId,
    'message' => '실사 견적서가 정상 발송되었습니다.'
));
