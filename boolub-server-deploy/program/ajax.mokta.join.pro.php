<?php
/**
 * 실시간 동행·오픈조인 모집, 고객 합류신청(CRM), 파트너·방장 일정 관리 API (v14)
 * 서버 배포 위치: /program/ajax.mokta.join.pro.php
 */
include_once(dirname(__FILE__) . '/mokta.inc.php');

$auth = mokta_resolve_auth();
$mode = isset($_POST['_mode']) ? trim((string)$_POST['_mode']) : '';

/* 합류·동행 신청 내역 테이블 자동 보장 */
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

function mokta_valid_sdate($raw) {
    $s = trim((string)$raw);
    if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $s)) {
        return $s;
    }
    return '2026-08-15';
}

/* 1. 파트너·마스터 전용: 출발확정 차량 오픈조인 잔여석 등록 */
if ($mode === 'add_partner_join') {
    $auth = mokta_require_partner_or_master();

    if ($auth['role'] === 'master') {
        $pid    = !empty($_POST['target_pid']) ? trim((string)$_POST['target_pid']) : 'boolub';
        $agency = !empty($_POST['target_agency']) ? trim((string)$_POST['target_agency']) : '부럽 몽골원정대 (직영)';
    } else {
        $pid    = $auth['partnerId'];
        $agency = $auth['partnerName'];
    }

    $sdate       = mokta_valid_sdate($_POST['sdate'] ?? '2026-08-15');
    $regionKey   = !empty($_POST['region_key']) ? trim((string)$_POST['region_key']) : '고비';
    $durationKey = !empty($_POST['duration_key']) ? trim((string)$_POST['duration_key']) : '4박5일';
    $dateStr     = !empty($_POST['date_str']) ? trim((string)$_POST['date_str']) : '8.15(토) ~ 8.19(수) · 4박5일';
    $curPax      = max(1, min(7, (int)($_POST['cur_pax'] ?? 4)));
    $maxPax      = max($curPax + 1, min(8, (int)($_POST['max_pax'] ?? 6)));
    $title       = !empty($_POST['title']) ? trim((string)$_POST['title']) : '[출발확정] 오픈조인 잔여석 모집';
    $curPrice    = !empty($_POST['cur_price']) ? trim((string)$_POST['cur_price']) : '999,000원';
    $fullPrice   = !empty($_POST['full_price']) ? trim((string)$_POST['full_price']) : '890,000원';
    $pcode       = !empty($_POST['pcode']) ? trim((string)$_POST['pcode']) : 'V6003-W0388-Z1928';
    $imgUrl      = !empty($_POST['img_url']) ? trim((string)$_POST['img_url']) : '/customized/mokta/images/gobi_camp_vans.jpg';

    $seats = array();
    for ($i = 0; $i < $maxPax; $i++) {
        $seats[] = ($i < $curPax) ? '확정고객' . ($i + 1) : '빈좌석';
    }
    $seatsJson = json_encode($seats, JSON_UNESCAPED_UNICODE);

    $sql = sprintf(
        "INSERT INTO smart_mokta_join
            (mj_host_type, mj_inid, mj_pid, mj_agency, mj_pcode, mj_date_key, mj_date_str, mj_region_key, mj_duration_key, mj_style_key, mj_status_badge, mj_status_cls, mj_title, mj_img, mj_cur_pax, mj_max_pax, mj_seats_json, mj_cur_price, mj_full_price, mj_tags, mj_view_yn, mj_rdate)
         VALUES
            ('partner', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '조인', '파트너 출발확정', 'sky', '%s', '%s', %d, %d, '%s', '%s', '%s', '출발 100% 확정 차량 · 1/N 각자 카드결제 · 차액 자동환급', 'Y', NOW())",
        mokta_esc($auth['userId']),
        mokta_esc($pid),
        mokta_esc($agency),
        mokta_esc($pcode),
        mokta_esc($sdate),
        mokta_esc($dateStr),
        mokta_esc($regionKey),
        mokta_esc($durationKey),
        mokta_esc($title),
        mokta_esc($imgUrl),
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

/* 2. 로그인 고객: 여행자 동행 모집글 등록 (구조화된 동행 조건 + 파트너 매칭 연동) */
if ($mode === 'add_member_join') {
    if ($auth['role'] === 'guest') {
        mokta_json(array('ok' => false, 'requireLogin' => true, 'message' => '3초 회원가입 또는 로그인 후 동행 모집글을 등록하실 수 있습니다.'), 401);
    }
    $sdate       = mokta_valid_sdate($_POST['sdate'] ?? '2026-08-15');
    $regionKey   = !empty($_POST['region_key']) ? trim((string)$_POST['region_key']) : '고비';
    $durationKey = !empty($_POST['duration_key']) ? trim((string)$_POST['duration_key']) : '4박5일';
    $dateStr     = !empty($_POST['date_str']) ? trim((string)$_POST['date_str']) : '8.15(토) ~ 8.19(수) · 4박5일';
    $curPax      = max(1, min(5, (int)($_POST['cur_pax'] ?? 2)));
    $maxPax      = max($curPax + 1, min(6, (int)($_POST['max_pax'] ?? 6)));
    $title       = !empty($_POST['title']) ? trim((string)$_POST['title']) : '같이 가실 몽골 동행 구합니다!';
    $tags        = !empty($_POST['tags']) ? trim((string)$_POST['tags']) : '2030 또래 · 성별무관 · 항공권 발권예정';
    $wantMatch   = (isset($_POST['want_match']) && $_POST['want_match'] === 'N') ? '자유동행 모집' : '파트너 차량·견적 제안 환영';
    $hostAgency  = $wantMatch . ' · ' . ($auth['userName'] ?: '여행자');

    $regionImgMap = array(
        '고비'   => 'https://files.boolub.com/upfiles/product/736206236.png',
        '중부'   => 'https://files.boolub.com/upfiles/product/4219813096.png',
        '홉스골' => 'https://files.boolub.com/upfiles/product/1740762828.jpg',
        '테를지' => 'https://files.boolub.com/upfiles/product/2135197319.jpg'
    );
    $imgUrl = isset($regionImgMap[$regionKey]) ? $regionImgMap[$regionKey] : '/customized/mokta/images/companion_team_hands.jpg';
    $repPcode = ($regionKey === '중부' || $regionKey === '테를지') ? 'T0950-Q2923-W2496' : 'C3954-E9344-H0474';

    $seats = array();
    for ($i = 0; $i < $maxPax; $i++) {
        $seats[] = ($i === 0) ? '방장(' . $auth['userName'] . ')' : (($i < $curPax) ? '동행확정' : '빈좌석');
    }
    $seatsJson = json_encode($seats, JSON_UNESCAPED_UNICODE);

    $sql = sprintf(
        "INSERT INTO smart_mokta_join
            (mj_host_type, mj_inid, mj_pid, mj_agency, mj_pcode, mj_date_key, mj_date_str, mj_region_key, mj_duration_key, mj_style_key, mj_status_badge, mj_status_cls, mj_title, mj_img, mj_cur_pax, mj_max_pax, mj_seats_json, mj_cur_price, mj_full_price, mj_tags, mj_view_yn, mj_rdate)
         VALUES
            ('member', '%s', 'boolub', '%s', '%s', '%s', '%s', '%s', '%s', '조인', '여행자 동행모집', 'amber', '%s', '%s', %d, %d, '%s', '1/N 동행조율', '699,000원~', '%s', 'Y', NOW())",
        mokta_esc($auth['userId']),
        mokta_esc($hostAgency),
        mokta_esc($repPcode),
        mokta_esc($sdate),
        mokta_esc($dateStr),
        mokta_esc($regionKey),
        mokta_esc($durationKey),
        mokta_esc($title),
        mokta_esc($imgUrl),
        $curPax,
        $maxPax,
        mokta_esc($seatsJson),
        mokta_esc($tags)
    );
    mokta_q_exec($sql);
    mokta_json(array('ok' => true, 'id' => (string)mokta_last_id(), 'imgUrl' => $imgUrl));
}

/* 3. 빈 좌석 합류 & 동행 참여 신청 (고객 연락처·인원·메모 DB 저장) */
if ($mode === 'apply_seat') {
    if ($auth['role'] === 'guest') {
        mokta_json(array('ok' => false, 'requireLogin' => true, 'message' => '3초 회원가입 또는 로그인 후 합류 신청이 가능합니다.'), 401);
    }
    $rawJoinKey = trim((string)($_POST['join_id'] ?? ''));
    $pax        = max(1, min(4, (int)($_POST['pax'] ?? 1)));
    $contact    = trim((string)($_POST['contact'] ?? ''));
    $memo       = trim((string)($_POST['memo'] ?? '함께 합류 희망합니다!'));
    $joinTitle  = trim((string)($_POST['join_title'] ?? '몽골 동행·오픈조인'));
    $targetPid  = trim((string)($_POST['target_pid'] ?? 'boolub'));
    $hostInid   = '';

    if ($rawJoinKey === '') {
        mokta_json(array('ok' => false, 'message' => '모집 방 정보를 확인할 수 없습니다.'), 400);
    }

    if (ctype_digit($rawJoinKey)) {
        $joinUid = (int)$rawJoinKey;
        $row = mokta_q_one("SELECT * FROM smart_mokta_join WHERE mj_uid = {$joinUid} AND mj_view_yn = 'Y' LIMIT 1");
        if (!empty($row['mj_uid'])) {
            if ((int)$row['mj_cur_pax'] >= (int)$row['mj_max_pax']) {
                mokta_json(array('ok' => false, 'message' => '이미 정원이 마감된 팀입니다.'), 409);
            }
            $joinTitle = $row['mj_title'];
            $targetPid = $row['mj_pid'] ?: 'boolub';
            $hostInid  = $row['mj_inid'] ?: '';

            $newCur = min((int)$row['mj_max_pax'], (int)$row['mj_cur_pax'] + $pax);
            $seats = json_decode((string)$row['mj_seats_json'], true);
            if (!is_array($seats)) $seats = array();
            $added = 0;
            foreach ($seats as $si => $sv) {
                if ($sv === '빈좌석' && $added < $pax) {
                    $seats[$si] = ($auth['userName'] !== '' ? $auth['userName'] : '합류신청');
                    $added++;
                }
            }
            $seatsJson = mokta_esc(json_encode($seats, JSON_UNESCAPED_UNICODE));
            mokta_q_exec("UPDATE smart_mokta_join SET mj_cur_pax = {$newCur}, mj_seats_json = '{$seatsJson}' WHERE mj_uid = {$joinUid}");
        }
    }

    $insSql = sprintf(
        "INSERT INTO smart_mokta_join_apply
            (ja_join_key, ja_join_title, ja_pid, ja_host_inid, ja_applicant_id, ja_applicant_name, ja_contact, ja_pax, ja_memo, ja_status, ja_rdate)
         VALUES
            ('%s', '%s', '%s', '%s', '%s', '%s', '%s', %d, '%s', 'pending', NOW())",
        mokta_esc($rawJoinKey),
        mokta_esc($joinTitle),
        mokta_esc($targetPid),
        mokta_esc($hostInid),
        mokta_esc($auth['userId']),
        mokta_esc($auth['userName'] ?: $auth['userId']),
        mokta_esc($contact),
        $pax,
        mokta_esc($memo)
    );
    mokta_q_exec($insSql);
    mokta_json(array('ok' => true, 'applyId' => (string)mokta_last_id()));
}

/* 4. 방장(고객) 또는 파트너·마스터: 모집 인원 조정 / 마감 전환 / 삭제 관리 */
if ($mode === 'manage_join') {
    if ($auth['role'] === 'guest') {
        mokta_json(array('ok' => false, 'requireLogin' => true, 'message' => '로그인이 필요합니다.'), 401);
    }
    $joinUid = (int)($_POST['join_id'] ?? 0);
    $act     = trim((string)($_POST['sub_action'] ?? ''));
    $row     = mokta_q_one("SELECT * FROM smart_mokta_join WHERE mj_uid = {$joinUid} LIMIT 1");
    if (empty($row['mj_uid'])) {
        mokta_json(array('ok' => false, 'message' => '해당 일정을 찾을 수 없습니다.'), 404);
    }

    $isOwnerMember  = ($auth['userId'] !== '' && $row['mj_inid'] === $auth['userId']);
    $isOwnerPartner = ($auth['role'] === 'partner' && $auth['partnerId'] !== '' && $row['mj_pid'] === $auth['partnerId']);
    $isMaster       = ($auth['role'] === 'master');

    if (!$isOwnerMember && !$isOwnerPartner && !$isMaster) {
        mokta_json(array('ok' => false, 'message' => '본인이 등록한 일정만 관리할 수 있습니다.'), 403);
    }

    $curPax = (int)$row['mj_cur_pax'];
    $maxPax = max(2, (int)$row['mj_max_pax']);

    if ($act === 'delete') {
        mokta_q_exec("UPDATE smart_mokta_join SET mj_view_yn = 'N' WHERE mj_uid = {$joinUid}");
        mokta_json(array('ok' => true, 'deleted' => true));
    } elseif ($act === 'inc_pax') {
        $curPax = min($maxPax, $curPax + 1);
    } elseif ($act === 'dec_pax') {
        $curPax = max(1, $curPax - 1);
    } elseif ($act === 'close_full') {
        $curPax = $maxPax;
    } elseif ($act === 'reopen') {
        $curPax = max(1, $maxPax - 2);
    }

    $seats = array();
    for ($i = 0; $i < $maxPax; $i++) {
        $seats[] = ($i < $curPax) ? ($row['mj_host_type'] === 'member' && $i === 0 ? '방장' : '확정' . ($i + 1)) : '빈좌석';
    }
    $seatsJson = mokta_esc(json_encode($seats, JSON_UNESCAPED_UNICODE));
    mokta_q_exec("UPDATE smart_mokta_join SET mj_cur_pax = {$curPax}, mj_seats_json = '{$seatsJson}' WHERE mj_uid = {$joinUid}");
    mokta_json(array('ok' => true, 'curPax' => $curPax, 'maxPax' => $maxPax, 'seats' => $seats));
}

/* 5. 파트너·마스터·방장: 합류 신청 고객 상태 업데이트 (확정 / 취소) */
if ($mode === 'update_apply_status') {
    if ($auth['role'] === 'guest') {
        mokta_json(array('ok' => false, 'requireLogin' => true, 'message' => '로그인이 필요합니다.'), 401);
    }
    $jaUid  = (int)($_POST['apply_id'] ?? 0);
    $status = trim((string)($_POST['status'] ?? 'confirmed'));
    if (!in_array($status, array('pending', 'confirmed', 'cancelled'), true)) {
        $status = 'confirmed';
    }
    $apRow = mokta_q_one("SELECT * FROM smart_mokta_join_apply WHERE ja_uid = {$jaUid} LIMIT 1");
    if (empty($apRow['ja_uid'])) {
        mokta_json(array('ok' => false, 'message' => '신청 내역을 찾을 수 없습니다.'), 404);
    }

    $canManage = ($auth['role'] === 'master')
        || ($auth['role'] === 'partner' && ($apRow['ja_pid'] === $auth['partnerId'] || $apRow['ja_pid'] === 'boolub'))
        || ($auth['userId'] !== '' && ($apRow['ja_host_inid'] === $auth['userId'] || $apRow['ja_applicant_id'] === $auth['userId']));

    if (!$canManage) {
        mokta_json(array('ok' => false, 'message' => '처리 권한이 없습니다.'), 403);
    }

    $escSt = mokta_esc($status);
    mokta_q_exec("UPDATE smart_mokta_join_apply SET ja_status = '{$escSt}' WHERE ja_uid = {$jaUid}");
    mokta_json(array('ok' => true, 'status' => $status));
}

/* 6. 파트너·마스터 전용: 여행자 동행모집 방에 공식 파트너 차량·투어 매칭 제안 */
if ($mode === 'propose_to_companion') {
    $auth = mokta_require_partner_or_master();
    $joinUid = (int)($_POST['join_id'] ?? 0);
    $pid     = ($auth['role'] === 'master' && !empty($_POST['target_pid'])) ? trim((string)$_POST['target_pid']) : $auth['partnerId'];
    $agency  = ($auth['role'] === 'master' && !empty($_POST['target_agency'])) ? trim((string)$_POST['target_agency']) : $auth['partnerName'];
    $pcode   = !empty($_POST['pcode']) ? trim((string)$_POST['pcode']) : 'V6003-W0388-Z1928';
    $offerPrice = !empty($_POST['offer_price']) ? trim((string)$_POST['offer_price']) : '890,000원';

    if ($joinUid > 0) {
        $escPid = mokta_esc($pid);
        $escAg  = mokta_esc($agency . ' 전담매칭 제안');
        $escPc  = mokta_esc($pcode);
        $escPr  = mokta_esc($offerPrice);
        mokta_q_exec("UPDATE smart_mokta_join SET mj_pid = '{$escPid}', mj_agency = '{$escAg}', mj_pcode = '{$escPc}', mj_cur_price = '{$escPr}' WHERE mj_uid = {$joinUid}");
    }
    mokta_json(array('ok' => true));
}

mokta_json(array('ok' => false, 'message' => '지원하지 않는 요청 모드입니다.'), 400);
