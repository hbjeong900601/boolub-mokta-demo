<?php
/**
 * 실시간 동행·조인 월간 캘린더 모집 및 좌석 합류 API (v7)
 * 서버 배포 위치: /program/ajax.mokta.join.pro.php
 */
include_once(dirname(__FILE__) . '/mokta.inc.php');

$auth = mokta_resolve_auth();
$mode = isset($_POST['_mode']) ? trim($_POST['_mode']) : '';

function mokta_valid_sdate($raw) {
    $s = trim((string)$raw);
    if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $s)) {
        return $s;
    }
    return '2026-08-15';
}

/* 1. 파트너·마스터 전용: 출발확정 차량 오픈조인 잔여석 등록 (월간 캘린더 직결) */
if ($mode === 'add_partner_join') {
    $auth = mokta_require_partner_or_master();

    if ($auth['role'] === 'master') {
        $pid    = !empty($_POST['target_pid']) ? trim($_POST['target_pid']) : 'boolub';
        $agency = !empty($_POST['target_agency']) ? trim($_POST['target_agency']) : '부럽 몽골원정대 (직영)';
    } else {
        $pid    = $auth['partnerId'];
        $agency = $auth['partnerName'];
    }

    $sdate       = mokta_valid_sdate($_POST['sdate'] ?? '2026-08-15');
    $regionKey   = !empty($_POST['region_key']) ? trim($_POST['region_key']) : '고비';
    $durationKey = !empty($_POST['duration_key']) ? trim($_POST['duration_key']) : '4박5일';
    $dateStr     = !empty($_POST['date_str']) ? trim($_POST['date_str']) : '8.15(토) ~ 8.19(수) · 4박5일';
    $curPax      = max(1, min(5, (int)($_POST['cur_pax'] ?? 4)));
    $maxPax      = max($curPax + 1, min(8, (int)($_POST['max_pax'] ?? 6)));
    $title       = !empty($_POST['title']) ? trim($_POST['title']) : '[출발확정] 오픈조인 잔여석 모집';
    $curPrice    = !empty($_POST['cur_price']) ? trim($_POST['cur_price']) : '890,000원';
    $fullPrice   = !empty($_POST['full_price']) ? trim($_POST['full_price']) : '780,000원';
    $pcode       = !empty($_POST['pcode']) ? trim($_POST['pcode']) : 'V6003-W0388-Z1928';

    $seats = array();
    for ($i = 0; $i < $maxPax; $i++) {
        $seats[] = ($i < $curPax) ? '확정고객' . ($i + 1) : '빈좌석';
    }
    $seatsJson = json_encode($seats, JSON_UNESCAPED_UNICODE);

    $sql = sprintf(
        "INSERT INTO od_mokta_join
            (mj_host_type, mj_inid, mj_pid, mj_agency, mj_pcode, mj_date_key, mj_date_str, mj_region_key, mj_duration_key, mj_style_key, mj_status_badge, mj_status_cls, mj_title, mj_img, mj_cur_pax, mj_max_pax, mj_seats_json, mj_cur_price, mj_full_price, mj_tags, mj_view_yn, mj_rdate)
         VALUES
            ('partner', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '조인', '파트너 출발확정', 'sky', '%s', '/customized/mokta/images/gobi_camp_vans.jpg', %d, %d, '%s', '%s', '%s', '출발 100% 확정 차량 · 1/N 각자 카드결제 · 차액 자동환급', 'Y', NOW())",
        mokta_esc($auth['userId']),
        mokta_esc($pid),
        mokta_esc($agency),
        mokta_esc($pcode),
        mokta_esc($sdate),
        mokta_esc($dateStr),
        mokta_esc($regionKey),
        mokta_esc($durationKey),
        mokta_esc($title),
        $curPax,
        $maxPax,
        mokta_esc($seatsJson),
        mokta_esc($curPrice),
        mokta_esc($fullPrice)
    );

    if (!mokta_q_exec($sql)) {
        mokta_json(array('ok' => false, 'message' => '오픈조인 DB 등록 중 오류가 발생했습니다.'), 500);
    }
    mokta_json(array('ok' => true, 'id' => (string)mokta_last_id()));
}

/* 2. 로그인 고객: 여행자 동행 모집글 등록 (월간 캘린더 직결) */
if ($mode === 'add_member_join') {
    if ($auth['role'] === 'guest') {
        mokta_json(array('ok' => false, 'requireLogin' => true, 'message' => '로그인 후 동행 모집글을 등록하실 수 있습니다.'), 401);
    }
    $sdate       = mokta_valid_sdate($_POST['sdate'] ?? '2026-08-15');
    $regionKey   = !empty($_POST['region_key']) ? trim($_POST['region_key']) : '고비';
    $durationKey = !empty($_POST['duration_key']) ? trim($_POST['duration_key']) : '4박5일';
    $dateStr     = !empty($_POST['date_str']) ? trim($_POST['date_str']) : '8.15(토) ~ 8.19(수) · 4박5일';
    $curPax      = max(1, min(5, (int)($_POST['cur_pax'] ?? 2)));
    $maxPax      = 6;
    $title       = !empty($_POST['title']) ? trim($_POST['title']) : '같이 가실 몽골 동행 구합니다!';
    $tags        = !empty($_POST['tags']) ? trim($_POST['tags']) : '2030 또래 · 비흡연 환영';

    $seats = array();
    for ($i = 0; $i < $maxPax; $i++) {
        $seats[] = ($i === 0) ? '방장(' . $auth['userName'] . ')' : (($i < $curPax) ? '동행확정' : '빈좌석');
    }
    $seatsJson = json_encode($seats, JSON_UNESCAPED_UNICODE);

    $sql = sprintf(
        "INSERT INTO od_mokta_join
            (mj_host_type, mj_inid, mj_pid, mj_agency, mj_pcode, mj_date_key, mj_date_str, mj_region_key, mj_duration_key, mj_style_key, mj_status_badge, mj_status_cls, mj_title, mj_img, mj_cur_pax, mj_max_pax, mj_seats_json, mj_cur_price, mj_full_price, mj_tags, mj_view_yn, mj_rdate)
         VALUES
            ('member', '%s', 'boolub', '파트너 전담매칭 대기중', 'C3954-E9344-H0474', '%s', '%s', '%s', '%s', '조인', '여행자 동행모집', 'amber', '%s', '/customized/mokta/images/companion_team_hands.jpg', %d, %d, '%s', '견적 매칭중', '790,000원~', '%s', 'Y', NOW())",
        mokta_esc($auth['userId']),
        mokta_esc($sdate),
        mokta_esc($dateStr),
        mokta_esc($regionKey),
        mokta_esc($durationKey),
        mokta_esc($title),
        $curPax,
        $maxPax,
        mokta_esc($seatsJson),
        mokta_esc($tags)
    );
    mokta_q_exec($sql);
    mokta_json(array('ok' => true, 'id' => (string)mokta_last_id()));
}

/* 3. 빈 좌석 합류 신청 */
if ($mode === 'apply_seat') {
    if ($auth['role'] === 'guest') {
        mokta_json(array('ok' => false, 'requireLogin' => true, 'message' => '로그인 후 합류 신청이 가능합니다.'), 401);
    }
    $joinId = (int)($_POST['join_id'] ?? 0);
    $row = mokta_q_one("SELECT * FROM od_mokta_join WHERE mj_uid = {$joinId} AND mj_view_yn = 'Y' LIMIT 1");
    if (empty($row['mj_uid'])) {
        mokta_json(array('ok' => false, 'message' => '모집 방 정보를 찾을 수 없습니다.'), 404);
    }
    if ((int)$row['mj_cur_pax'] >= (int)$row['mj_max_pax']) {
        mokta_json(array('ok' => false, 'message' => '이미 정원이 마감된 팀입니다.'), 409);
    }
    $seats = json_decode((string)$row['mj_seats_json'], true);
    if (!is_array($seats)) $seats = array();
    $idx = array_search('빈좌석', $seats, true);
    if ($idx !== false) {
        $seats[$idx] = $auth['userName'] !== '' ? $auth['userName'] : '신규합류';
    }
    $seatsJson = mokta_esc(json_encode($seats, JSON_UNESCAPED_UNICODE));
    mokta_q_exec("UPDATE od_mokta_join SET mj_cur_pax = mj_cur_pax + 1, mj_seats_json = '{$seatsJson}' WHERE mj_uid = {$joinId}");
    mokta_json(array('ok' => true));
}

mokta_json(array('ok' => false, 'message' => '지원하지 않는 요청 모드입니다.'), 400);
