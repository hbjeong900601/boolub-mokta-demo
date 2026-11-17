<?php
/**
 * 부럽 본 사이트 (https://www.boolub.com/?pn=pages.view&type=pages&data=mj) 공식전용관 뷰
 * 서버 배포 위치: /customized/mokta/pages.mokta.php (및 /skin/page.view/mj.php 연동)
 */
if (!defined("_OD_DIRECT_")) {
    include_once($_SERVER["DOCUMENT_ROOT"] . "/program/inc.php");
}
include_once($_SERVER["DOCUMENT_ROOT"] . "/program/mokta.inc.php");

$moktaAuth = mokta_resolve_auth();
?>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/variable/woff2/SUIT-Variable.css" />
<link rel="stylesheet" href="/customized/mokta/mokta.css?v=bl_mokta_6" />
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

<?php include($_SERVER["DOCUMENT_ROOT"] . "/customized/mokta/mokta_body.inc.html"); ?>

<script>
  window.BOOLUB_MOKTA_ASSET_BASE = "/customized/mokta";
  window.BOOLUB_MOKTA_API_BASE   = "/program";
  window.BOOLUB_MOKTA_AUTH       = <?php echo json_encode($moktaAuth, JSON_UNESCAPED_UNICODE); ?>;
</script>
<script src="/customized/mokta/mokta.js?v=bl_mokta_6"></script>
