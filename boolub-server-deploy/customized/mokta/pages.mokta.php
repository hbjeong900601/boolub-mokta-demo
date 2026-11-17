<?php
/**
 * 부럽 본 사이트 (https://www.boolub.com/?pn=pages.view&type=pages&data=mokta) 전용관 마운트 뷰
 * 서버 배포 위치: /customized/mokta/pages.mokta.php
 *
 * 연동 방법 (/skin/site_m/responsive-play/pages.view.php 상단 1줄 추가):
 *   if (isset($data) && $data === 'mokta') { include_once($_SERVER['DOCUMENT_ROOT'].'/customized/mokta/pages.mokta.php'); return; }
 */
if (!defined('_OD_DIRECT_')) {
    include_once($_SERVER['DOCUMENT_ROOT'] . '/program/inc.php');
}
include_once($_SERVER['DOCUMENT_ROOT'] . '/program/mokta.inc.php');

$moktaAuth = mokta_resolve_auth();

/**
 * [오픈 게이트 제어 플래그]
 * - true  : 백엔드 테이블 세팅 완료 후 전체 고객에게 여행자 홈 정식 오픈 (파트너사 센터는 파트너/마스터만 오픈)
 * - false : 정식 오픈 전 마스터 및 로그인 입점 파트너만 사전 검수 가능
 */
$MOKTA_PUBLIC_OPEN = true;

if (!$MOKTA_PUBLIC_OPEN && $moktaAuth['role'] !== 'partner' && $moktaAuth['role'] !== 'master') {
    echo '<div style="max-width:640px;margin:80px auto;padding:40px 24px;text-align:center;border:1px solid #dfe3e5;border-radius:16px;background:#fff;">';
    echo '<h3 style="font-size:20px;font-weight:800;color:#121619;">부럽 × MOKTA 몽골 공식전용관 오픈 준비 중</h3>';
    echo '<p style="margin-top:8px;font-size:14px;color:#6b747a;">현재 입점 파트너사 및 관리자 사전 연동 점검 중입니다.</p>';
    echo '</div>';
    return;
}
?>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/variable/woff2/SUIT-Variable.css" />
<link rel="stylesheet" href="/customized/mokta/mokta.css?v=bl_mokta_5" />
<style>
  #bl-mokta-cms-wrap .bl-cms-hub-bar {
    background: #ffffff;
    border-bottom: 1px solid #f2f4f5;
    padding: 12px 0;
  }
  #bl-mokta-cms-wrap .bl-cms-hub-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }
</style>

<?php include($_SERVER['DOCUMENT_ROOT'] . '/customized/mokta/mokta_body.inc.html'); ?>

<script>
  window.BOOLUB_MOKTA_ASSET_BASE = '/customized/mokta';
  window.BOOLUB_MOKTA_API_BASE   = '/program';
  window.BOOLUB_MOKTA_AUTH       = <?php echo json_encode($moktaAuth, JSON_UNESCAPED_UNICODE); ?>;
</script>
<script src="/customized/mokta/mokta.js?v=bl_mokta_5"></script>
