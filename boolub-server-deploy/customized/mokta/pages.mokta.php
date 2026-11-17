<?php
/**
 * 부럽 본 사이트 (data=mj 및 data=mokta 공통) 몽골 전용관 마운트 뷰 (v9)
 * 서버 배포 위치: /customized/mokta/pages.mokta.php
 * - 본 페이지에서는 부럽 상단 헤더(.sc_Header)를 비노출 처리하고 MOKTA 전용 스티키 헤더를 노출합니다.
 */
if (!defined('_OD_DIRECT_')) {
    include_once($_SERVER['DOCUMENT_ROOT'] . '/program/inc.php');
}
include_once($_SERVER['DOCUMENT_ROOT'] . '/program/mokta.inc.php');

$moktaAuth = mokta_resolve_auth();
$MOKTA_PUBLIC_OPEN = true;

if (!$MOKTA_PUBLIC_OPEN && $moktaAuth['role'] !== 'partner' && $moktaAuth['role'] !== 'master') {
    echo '<div style="max-width:640px;margin:80px auto;padding:40px 24px;text-align:center;border:1px solid #dfe3e5;border-radius:16px;background:#fff;">';
    echo '<h3 style="font-size:20px;font-weight:800;color:#121619;">MOKTA 몽골 공식전용관 오픈 준비 중</h3>';
    echo '<p style="margin-top:8px;font-size:14px;color:#6b747a;">현재 입점 파트너사 및 관리자 사전 연동 점검 중입니다.</p>';
    echo '</div>';
    return;
}
?>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/variable/woff2/SUIT-Variable.css" />
<link rel="stylesheet" href="/customized/mokta/mokta.css?v=bl_mokta_11" />

<?php include($_SERVER['DOCUMENT_ROOT'] . '/customized/mokta/mokta_body.inc.html'); ?>

<script>
  window.BOOLUB_MOKTA_ASSET_BASE = '/customized/mokta';
  window.BOOLUB_MOKTA_API_BASE   = '/program';
  window.BOOLUB_MOKTA_AUTH       = <?php echo json_encode($moktaAuth, JSON_UNESCAPED_UNICODE); ?>;
</script>
<script src="/customized/mokta/mokta.js?v=bl_mokta_11"></script>
