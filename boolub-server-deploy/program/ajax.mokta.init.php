<?php
/**
 * 전용관 초기 데이터 하이드레이션 API (실시간 DB 조회)
 * 서버 배포 위치: /program/ajax.mokta.init.php
 */
include_once(dirname(__FILE__) . '/mokta.inc.php');

$auth = mokta_resolve_auth();

/* 1. 고객 맞춤견적(smart_mokta_rfq) + 파트너 비교견적(smart_mokta_bid) 로드 */
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
        $bidsByRfq[$k][] = array(
            'agency'  => $b['mb_agency'],
            'pid'     => $b['mb_pid'],
            'pcode'   => $b['mb_pcode'],
            'logo'    => $b['mb_logo'] !== '' ? $b['mb_logo'] : '/customized/mokta/images/boolub_logo.png',
            'badge'   => $b['mb_badge'],
            'price4'  => $b['mb_price4'],
            'price6'  => $b['mb_price6'],
            'veh'     => $b['mb_veh_name'],
            'ger'     => $b['mb_ger_name'],
            'vehImg'  => $b['mb_veh_img'],
            'gerImg'  => $b['mb_ger_img'],
            'comment' => $b['mb_comment']
        );
    }

    foreach ($rfqRows as $r) {
        $uid = (int)$r['mr_uid'];
        $specs = json_decode((string)$r['mr_specs_json'], true);
        if (!is_array($specs)) $specs = array($r['mr_cat'], $r['mr_region_tag']);
        $authorFirst = mb_substr($r['mr_author'], 0, 1, 'UTF-8');

        $rfqs[] = array(
            'id'        => (string)$uid,
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

/* 2. 실시간 동행·오픈조인(smart_mokta_join) 로드 */
$joinRows = mokta_q_all("
    SELECT *
    FROM smart_mokta_join
    WHERE mj_view_yn = 'Y'
    ORDER BY mj_uid DESC
    LIMIT 30
");
$joins = array();
foreach ($joinRows as $j) {
    $seats = json_decode((string)$j['mj_seats_json'], true);
    if (!is_array($seats)) $seats = array('확정1', '확정2', '확정3', '빈좌석', '빈좌석', '빈좌석');
    $rem = max(0, (int)$j['mj_max_pax'] - (int)$j['mj_cur_pax']);
    $joins[] = array(
        'id'          => (string)$j['mj_uid'],
        'dateKey'     => $j['mj_date_key'],
        'dateStr'     => $j['mj_date_str'],
        'regionKey'   => $j['mj_region_key'],
        'durationKey' => $j['mj_duration_key'],
        'styleKey'    => $j['mj_style_key'],
        'statusBadge' => $j['mj_status_badge'],
        'statusCls'   => $j['mj_status_cls'],
        'subBadge'    => $rem === 0 ? '모집마감' : "{$rem}자리 남음",
        'subCls'      => $rem <= 2 ? 'coral' : 'amber',
        'agency'      => $j['mj_agency'],
        'pcode'       => $j['mj_pcode'],
        'title'       => $j['mj_title'],
        'img'         => $j['mj_img'],
        'filled'      => (int)$j['mj_cur_pax'],
        'max'         => (int)$j['mj_max_pax'],
        'seats'       => $seats,
        'curPrice'    => $j['mj_cur_price'],
        'fullPrice'   => $j['mj_full_price'],
        'tags'        => $j['mj_tags']
    );
}

/* 3. 현장 LIVE 스토리(smart_mokta_story) 로드 */
$storyRows = mokta_q_all("
    SELECT *
    FROM smart_mokta_story
    WHERE ms_view_yn = 'Y'
    ORDER BY ms_uid DESC
    LIMIT 24
");
$stories = array();
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
        'tip'      => $s['ms_tip']
    );
}

/* 4. 마스터 계정일 때만 신규 입점신청 목록(smart_mokta_onboard) 반환 */
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
    'ok'          => true,
    'auth'        => $auth,
    'rfqs'        => $rfqs,
    'joins'       => $joins,
    'stories'     => $stories,
    'onboardList' => $onboardList
));
