<?php
/**
 * 파트너 현장 LIVE 스토리 게시 API (입점 파트너 & 마스터 전용)
 * 서버 배포 위치: /program/ajax.mokta.story.pro.php
 */
include_once(dirname(__FILE__) . '/mokta.inc.php');

$auth = mokta_require_partner_or_master();

if ($auth['role'] === 'master') {
    $pid    = !empty($_POST['target_pid']) ? trim($_POST['target_pid']) : 'boolub';
    $agency = !empty($_POST['target_agency']) ? trim($_POST['target_agency']) : '부럽 몽골원정대 (직영)';
} else {
    $pid    = $auth['partnerId'];
    $agency = $auth['partnerName'];
}

$title    = !empty($_POST['title']) ? trim($_POST['title']) : '오늘 캠프 현장 사진 공유합니다!';
$cat      = !empty($_POST['cat']) ? trim($_POST['cat']) : '음식·불멍파티';
$prodName = !empty($_POST['prod_name']) ? trim($_POST['prod_name']) : '[몽골] 고비사막 시그니처 코스 4박5일';
$pcode    = !empty($_POST['pcode']) ? trim($_POST['pcode']) : 'V6003-W0388-Z1928';

$uploadedUrl = mokta_upload_image('photo_file');
$mediaUrl    = $uploadedUrl !== ''
    ? $uploadedUrl
    : (!empty($_POST['preset_img']) ? trim($_POST['preset_img']) : '/customized/mokta/images/khorkhog_feast.jpg');

$tip = "{$agency} 현지 매니저가 직접 촬영해 등록한 최신 현장 컨디션입니다.";

$sql = sprintf(
    "INSERT INTO od_mokta_story
        (ms_pid, ms_agency, ms_pcode, ms_prod_name, ms_price, ms_cat, ms_badge, ms_title, ms_img, ms_tip, ms_view_yn, ms_rdate)
     VALUES
        ('%s', '%s', '%s', '%s', '쿠폰특가 적용', '%s', '현장 LIVE 인증', '%s', '%s', '%s', 'Y', NOW())",
    mokta_esc($pid),
    mokta_esc($agency),
    mokta_esc($pcode),
    mokta_esc($prodName),
    mokta_esc($cat),
    mokta_esc($title),
    mokta_esc($mediaUrl),
    mokta_esc($tip)
);

if (!mokta_q_exec($sql)) {
    mokta_json(array('ok' => false, 'message' => '스토리 등록 중 DB 오류가 발생했습니다.'), 500);
}

mokta_json(array(
    'ok'       => true,
    'id'       => (string)mokta_last_id(),
    'mediaUrl' => $mediaUrl
));
