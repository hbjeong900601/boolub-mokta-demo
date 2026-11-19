<?php
/**
 * 파트너사 브랜드 미니홈 커스터마이징 저장 API (입점 파트너 & 마스터 전용)
 * 서버 배포 위치: /program/ajax.mokta.profile.pro.php
 */
include_once(dirname(__FILE__) . '/mokta.inc.php');

$auth = mokta_require_partner_or_master();

// 테이블 자동 보장 (무중단 스키마 생성)
mokta_q_exec("
    CREATE TABLE IF NOT EXISTS `smart_mokta_partner_profile` (
      `pp_pid` VARCHAR(50) NOT NULL COMMENT '파트너 ID (cp_id / ag_id)',
      `pp_name` VARCHAR(100) NOT NULL DEFAULT '',
      `pp_slogan` VARCHAR(200) NOT NULL DEFAULT '',
      `pp_spec_badge` VARCHAR(80) NOT NULL DEFAULT '',
      `pp_fleet` VARCHAR(160) NOT NULL DEFAULT '',
      `pp_camp` VARCHAR(160) NOT NULL DEFAULT '',
      `pp_career` VARCHAR(160) NOT NULL DEFAULT '',
      `pp_desc` TEXT DEFAULT NULL,
      `pp_perks_json` TEXT DEFAULT NULL COMMENT '핵심 강점 배지 배열 JSON',
      `pp_cover_img` VARCHAR(255) NOT NULL DEFAULT '',
      `pp_photos_json` TEXT DEFAULT NULL COMMENT '갤러리 이미지 배열 JSON',
      `pp_video_url` VARCHAR(255) NOT NULL DEFAULT '',
      `pp_updated_by` VARCHAR(60) NOT NULL DEFAULT '',
      `pp_udate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`pp_pid`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
");

// 파트너 계정이면 본인 partnerId 고정, 마스터면 선택한 target_pid 허용
if ($auth['role'] === 'master') {
    $pid  = !empty($_POST['target_pid']) ? trim($_POST['target_pid']) : 'anoratour';
    $name = !empty($_POST['target_name']) ? trim($_POST['target_name']) : '노라투어';
} else {
    $pid  = $auth['partnerId'];
    $name = $auth['partnerName'];
}

if ($pid === '') {
    mokta_json(array('ok' => false, 'message' => '파트너 식별코드(pid)를 확인할 수 없습니다.'), 400);
}

$slogan    = isset($_POST['slogan']) ? trim($_POST['slogan']) : '';
$specBadge = isset($_POST['spec_badge']) ? trim($_POST['spec_badge']) : '';
$fleet     = isset($_POST['fleet']) ? trim($_POST['fleet']) : '';
$camp      = isset($_POST['camp']) ? trim($_POST['camp']) : '';
$career    = isset($_POST['career']) ? trim($_POST['career']) : '';
$desc      = isset($_POST['desc']) ? trim($_POST['desc']) : '';
$videoUrl  = isset($_POST['video_url']) ? trim($_POST['video_url']) : '';
$perksRaw  = isset($_POST['perks_json']) ? trim($_POST['perks_json']) : '[]';
$photosRaw = isset($_POST['photos_json']) ? trim($_POST['photos_json']) : '[]';

$perksArr = json_decode($perksRaw, true);
if (!is_array($perksArr)) $perksArr = array();
$photosArr = json_decode($photosRaw, true);
if (!is_array($photosArr)) $photosArr = array();

// 커버 이미지 직접 업로드 지원
$upCover = mokta_upload_image('cover_file');
$coverImg = $upCover !== ''
    ? $upCover
    : (isset($_POST['cover_img']) ? trim($_POST['cover_img']) : '');

// 추가 갤러리 실사 업로드 지원 (최대 3장)
for ($i = 1; $i <= 3; $i++) {
    $upGal = mokta_upload_image('gallery_file_' . $i);
    if ($upGal !== '') {
        array_unshift($photosArr, $upGal);
    }
}
$photosArr = array_slice(od_array_values(od_array_filter($photosArr)), 0, 6);

$perksJson  = json_encode($perksArr, JSON_UNESCAPED_UNICODE);
$photosJson = json_encode($photosArr, JSON_UNESCAPED_UNICODE);

$sql = sprintf(
    "INSERT INTO smart_mokta_partner_profile
        (pp_pid, pp_name, pp_slogan, pp_spec_badge, pp_fleet, pp_camp, pp_career, pp_desc, pp_perks_json, pp_cover_img, pp_photos_json, pp_video_url, pp_updated_by, pp_udate)
     VALUES
        ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', NOW())
     ON DUPLICATE KEY UPDATE
        pp_name       = VALUES(pp_name),
        pp_slogan     = VALUES(pp_slogan),
        pp_spec_badge = VALUES(pp_spec_badge),
        pp_fleet      = VALUES(pp_fleet),
        pp_camp       = VALUES(pp_camp),
        pp_career     = VALUES(pp_career),
        pp_desc       = VALUES(pp_desc),
        pp_perks_json = VALUES(pp_perks_json),
        pp_cover_img  = IF(VALUES(pp_cover_img) != '', VALUES(pp_cover_img), pp_cover_img),
        pp_photos_json= IF(VALUES(pp_photos_json) != '[]', VALUES(pp_photos_json), pp_photos_json),
        pp_video_url  = VALUES(pp_video_url),
        pp_updated_by = VALUES(pp_updated_by),
        pp_udate      = NOW()",
    mokta_esc($pid),
    mokta_esc($name),
    mokta_esc($slogan),
    mokta_esc($specBadge),
    mokta_esc($fleet),
    mokta_esc($camp),
    mokta_esc($career),
    mokta_esc($desc),
    mokta_esc($perksJson),
    mokta_esc($coverImg),
    mokta_esc($photosJson),
    mokta_esc($videoUrl),
    mokta_esc($auth['userId'])
);

if (!mokta_q_exec($sql)) {
    mokta_json(array('ok' => false, 'message' => '브랜드 미니홈 저장 중 DB 오류가 발생했습니다.'), 500);
}

mokta_json(array(
    'ok'       => true,
    'pid'      => $pid,
    'coverImg' => $coverImg,
    'photos'   => $photosArr,
    'message'  => '파트너 브랜드 미니홈 설정이 저장되었습니다.'
));
