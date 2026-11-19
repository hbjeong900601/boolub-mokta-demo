<?php
/**
 * 실시간 동행·오픈조인 모집(5대 말머리 + 투어카드 연동 + 참여모험가 프로필 명단),
 * 사전 Q&A 댓글, 방장 끌올, 고객 합류신청(CRM) 통합 API (v17)
 * 서버 배포 위치: /program/ajax.mokta.join.pro.php
 */
include_once(dirname(__FILE__) . '/mokta.inc.php');

$auth = mokta_resolve_auth();
$mode = isset($_POST['_mode']) ? trim((string)$_POST['_mode']) : '';

/* 0. 확장 테이블 & 컬럼 자동 보장 */
mokta_ensure_col('smart_mokta_join', 'mj_prefix_tag', "`mj_prefix_tag` VARCHAR(40) NOT NULL DEFAULT ''");
mokta_ensure_col('smart_mokta_join', 'mj_member_slots_json', "`mj_member_slots_json` TEXT NULL");
mokta_ensure_col('smart_mokta_join', 'mj_bumped_at', "`mj_bumped_at` DATETIME NULL DEFAULT NULL");

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
      `ja_age_group` VARCHAR(20) NOT NULL DEFAULT '',
      `ja_gender` VARCHAR(20) NOT NULL DEFAULT '',
      `ja_flight_yn` VARCHAR(30) NOT NULL DEFAULT '',
      `ja_memo` VARCHAR(255) NOT NULL DEFAULT '',
      `ja_status` ENUM('pending','confirmed','cancelled') NOT NULL DEFAULT 'pending',
      `ja_rdate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (`ja_uid`),
      KEY `idx_pid` (`ja_pid`),
      KEY `idx_applicant` (`ja_applicant_id`),
      KEY `idx_join_key` (`ja_join_key`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
");
mokta_ensure_col('smart_mokta_join_apply', 'ja_age_group', "`ja_age_group` VARCHAR(20) NOT NULL DEFAULT ''");
mokta_ensure_col('smart_mokta_join_apply', 'ja_gender', "`ja_gender` VARCHAR(20) NOT NULL DEFAULT ''");
mokta_ensure_col('smart_mokta_join_apply', 'ja_flight_yn', "`ja_flight_yn` VARCHAR(30) NOT NULL DEFAULT ''");

mokta_q_exec("
    CREATE TABLE IF NOT EXISTS `smart_mokta_join_cmt` (
      `jc_uid` INT UNSIGNED NOT NULL AUTO_INCREMENT,
      `jc_join_key` VARCHAR(40) NOT NULL DEFAULT '',
      `jc_author_id` VARCHAR(60) NOT NULL DEFAULT '',
      `jc_author_name` VARCHAR(60) NOT NULL DEFAULT '',
      `jc_role_badge` VARCHAR(40) NOT NULL DEFAULT '여행자',
      `jc_content` VARCHAR(500) NOT NULL DEFAULT '',
      `jc_rdate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (`jc_uid`),
      KEY `idx_join_key` (`jc_join_key`)
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
    $slots = array();
    $sampleAges = array('20대', '30대', '20대', '30대', '40대', '20대');
    $sampleGenders = array('여성', '여성', '남성', '남성', '여성', '남성');
    for ($i = 0; $i < $maxPax; $i++) {
        if ($i < $curPax) {
            $ag = $sampleAges[$i % 6];
            $gd = $sampleGenders[$i % 6];
            $seats[] = $ag . mb_substr($gd, 0, 1, 'UTF-8');
            $slots[] = array(
                'role'   => '예약확정',
                'nick'   => '모험가#' . (101 + $i),
                'age'    => $ag,
                'gender' => $gd,
                'flight' => '항공권완료',
                'note'   => '부럽 에스크로 예약확정'
            );
        } else {
            $seats[] = '빈좌석';
        }
    }
    $seatsJson = json_encode($seats, JSON_UNESCAPED_UNICODE);
    $slotsJson = json_encode($slots, JSON_UNESCAPED_UNICODE);

    $sql = sprintf(
        "INSERT INTO smart_mokta_join
            (mj_host_type, mj_inid, mj_pid, mj_agency, mj_pcode, mj_prefix_tag, mj_date_key, mj_date_str, mj_region_key, mj_duration_key, mj_style_key, mj_status_badge, mj_status_cls, mj_title, mj_img, mj_cur_pax, mj_max_pax, mj_seats_json, mj_member_slots_json, mj_cur_price, mj_full_price, mj_tags, mj_view_yn, mj_bumped_at, mj_rdate)
         VALUES
            ('partner', '%s', '%s', '%s', '%s', '무조건출발확정', '%s', '%s', '%s', '%s', '조인', '파트너 출발확정', 'sky', '%s', '%s', %d, %d, '%s', '%s', '%s', '%s', '출발 100% 확정 차량 · 1/N 각자 카드결제 · 차액 자동환급', 'Y', NOW(), NOW())",
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
        mokta_esc($slotsJson),
        mokta_esc($curPrice),
        mokta_esc($fullPrice)
    );

    if (!mokta_q_exec($sql)) {
        mokta_json(array('ok' => false, 'message' => '오픈조인 DB 등록 중 오류가 발생했습니다.'), 500);
    }
    mokta_json(array('ok' => true, 'id' => (string)mokta_last_id()));
}

/* 2. 로그인 고객: 여행자 동행 모집글 등록 (5대 말머리 + 연동 투어상품 + 방장/일행 프로필 슬롯) */
if ($mode === 'add_member_join') {
    if ($auth['role'] === 'guest') {
        mokta_json(array('ok' => false, 'requireLogin' => true, 'message' => '3초 회원가입 또는 로그인 후 동행 모집글을 등록하실 수 있습니다.'), 401);
    }
    $sdate       = mokta_valid_sdate($_POST['sdate'] ?? '2026-08-15');
    $prefixTag   = !empty($_POST['prefix_tag']) ? trim((string)$_POST['prefix_tag']) : '항공권발권완료';
    $regionKey   = !empty($_POST['region_key']) ? trim((string)$_POST['region_key']) : '고비';
    $durationKey = !empty($_POST['duration_key']) ? trim((string)$_POST['duration_key']) : '4박5일';
    $dateStr     = !empty($_POST['date_str']) ? trim((string)$_POST['date_str']) : '8.15(토) ~ 8.19(수) · 4박5일';
    $curPax      = max(1, min(5, (int)($_POST['cur_pax'] ?? 2)));
    $maxPax      = max($curPax + 1, min(6, (int)($_POST['max_pax'] ?? 6)));
    $title       = !empty($_POST['title']) ? trim((string)$_POST['title']) : '같이 가실 몽골 동행 구합니다!';
    $agePref     = !empty($_POST['age_pref']) ? trim((string)$_POST['age_pref']) : '2030 또래';
    $genderPref  = !empty($_POST['gender_pref']) ? trim((string)$_POST['gender_pref']) : '성별 무관';
    $flightPref  = !empty($_POST['flight_pref']) ? trim((string)$_POST['flight_pref']) : '항공권 발권완료';
    $hostAge     = !empty($_POST['host_age']) ? trim((string)$_POST['host_age']) : '20대';
    $hostGender  = !empty($_POST['host_gender']) ? trim((string)$_POST['host_gender']) : '여성';
    $rawMemoTag  = !empty($_POST['tags']) ? trim((string)$_POST['tags']) : '비흡연 · 사진 촬영 좋아하는 분 환영';
    $wantMatch   = (isset($_POST['want_partner_match']) && $_POST['want_partner_match'] === 'N') ? '자유동행 모집' : '파트너 차량매칭 환영';

    $combinedTags = implode(' · ', od_array_filter(array($agePref, $genderPref, $flightPref, $rawMemoTag)));
    $maskedHost   = mokta_mask_name($auth['userName'] ?: '여행자');
    $hostAgency   = $wantMatch . ' · ' . $maskedHost;

    $linkedPcode = !empty($_POST['linked_pcode']) ? trim((string)$_POST['linked_pcode']) : '';
    if ($linkedPcode === '') {
        if ($prefixTag === '공항픽업쉐어') {
            $linkedPcode = 'I3885-I4036-S5377';
        } elseif ($regionKey === '중부' || $regionKey === '테를지') {
            $linkedPcode = 'T0950-Q2923-W2496';
        } else {
            $linkedPcode = 'C3954-E9344-H0474';
        }
    }

    $regionImgMap = array(
        '고비'   => 'https://files.boolub.com/upfiles/product/736206236.png',
        '중부'   => 'https://files.boolub.com/upfiles/product/4219813096.png',
        '홉스골' => 'https://files.boolub.com/upfiles/product/1740762828.jpg',
        '테를지' => 'https://files.boolub.com/upfiles/product/2135197319.jpg'
    );
    $imgUrl = isset($regionImgMap[$regionKey]) ? $regionImgMap[$regionKey] : '/customized/mokta/images/companion_team_hands.jpg';

    $prodRow = mokta_q_one("SELECT p_name, p_price, p_img_list_square FROM smart_product WHERE p_code = '" . mokta_esc($linkedPcode) . "' LIMIT 1");
    $curPriceTxt = !empty($prodRow['p_price']) ? od_number_format((int)$prodRow['p_price']) . '원' : '1/N 동행매칭';
    if (!empty($prodRow['p_img_list_square'])) {
        $rawImg = trim((string)$prodRow['p_img_list_square']);
        $imgUrl = (strpos($rawImg, 'http') === 0) ? $rawImg : 'https://files.boolub.com/upfiles/product/' . ltrim($rawImg, '/');
    }

    $seats = array();
    $slots = array();
    $shortGd = mb_substr($hostGender, 0, 1, 'UTF-8');
    for ($i = 0; $i < $maxPax; $i++) {
        if ($i === 0) {
            $seats[] = $maskedHost . '(방장)';
            $slots[] = array(
                'role'   => '방장',
                'nick'   => $maskedHost,
                'age'    => $hostAge,
                'gender' => $hostGender,
                'flight' => $flightPref,
                'note'   => $rawMemoTag
            );
        } elseif ($i < $curPax) {
            $seats[] = $hostAge . $shortGd . '(동행)';
            $slots[] = array(
                'role'   => '확정일행',
                'nick'   => '방장일행#' . $i,
                'age'    => $hostAge,
                'gender' => $hostGender,
                'flight' => $flightPref,
                'note'   => '방장과 함께 출발 확정'
            );
        } else {
            $seats[] = '빈좌석';
        }
    }
    $seatsJson = json_encode($seats, JSON_UNESCAPED_UNICODE);
    $slotsJson = json_encode($slots, JSON_UNESCAPED_UNICODE);
    $statusCls = ($prefixTag === '무조건출발확정' || $prefixTag === '투어사확정') ? 'sky' : 'amber';

    $sql = sprintf(
        "INSERT INTO smart_mokta_join
            (mj_host_type, mj_inid, mj_pid, mj_agency, mj_pcode, mj_prefix_tag, mj_date_key, mj_date_str, mj_region_key, mj_duration_key, mj_style_key, mj_status_badge, mj_status_cls, mj_title, mj_img, mj_cur_pax, mj_max_pax, mj_seats_json, mj_member_slots_json, mj_cur_price, mj_full_price, mj_tags, mj_view_yn, mj_bumped_at, mj_rdate)
         VALUES
            ('member', '%s', 'boolub', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '조인', '%s', '%s', '%s', '%s', %d, %d, '%s', '%s', '%s', '699,000원~', '%s', 'Y', NOW(), NOW())",
        mokta_esc($auth['userId']),
        mokta_esc($hostAgency),
        mokta_esc($linkedPcode),
        mokta_esc($prefixTag),
        mokta_esc($sdate),
        mokta_esc($dateStr),
        mokta_esc($regionKey),
        mokta_esc($durationKey),
        mokta_esc($prefixTag),
        mokta_esc($statusCls),
        mokta_esc($title),
        mokta_esc($imgUrl),
        $curPax,
        $maxPax,
        mokta_esc($seatsJson),
        mokta_esc($slotsJson),
        mokta_esc($curPriceTxt),
        mokta_esc($combinedTags)
    );
    mokta_q_exec($sql);
    mokta_json(array('ok' => true, 'id' => (string)mokta_last_id(), 'imgUrl' => $imgUrl, 'slots' => $slots));
}

/* 3. 빈 좌석 합류 & 동행 참여 신청 (연령대·성별·항공권 프로필 포함 저장) */
if ($mode === 'apply_seat') {
    if ($auth['role'] === 'guest') {
        mokta_json(array('ok' => false, 'requireLogin' => true, 'message' => '3초 회원가입 또는 로그인 후 합류 신청이 가능합니다.'), 401);
    }
    $rawJoinKey = trim((string)($_POST['join_id'] ?? ''));
    $pax        = max(1, min(4, (int)($_POST['pax'] ?? 1)));
    $ageGroup   = !empty($_POST['age_group']) ? trim((string)$_POST['age_group']) : '20대';
    $gender     = !empty($_POST['gender']) ? trim((string)$_POST['gender']) : '여성';
    $flightYn   = !empty($_POST['flight_yn']) ? trim((string)$_POST['flight_yn']) : '항공권완료';
    $contact    = trim((string)($_POST['contact'] ?? ''));
    $memo       = trim((string)($_POST['memo'] ?? '함께 합류 희망합니다!'));
    $joinTitle  = trim((string)($_POST['join_title'] ?? '몽골 동행·오픈조인'));
    $targetPid  = trim((string)($_POST['target_pid'] ?? 'boolub'));
    $hostInid   = '';

    if ($rawJoinKey === '') {
        mokta_json(array('ok' => false, 'message' => '모집 방 정보를 확인할 수 없습니다.'), 400);
    }

    $maskedApplicant = mokta_mask_name($auth['userName'] ?: $auth['userId']);

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
            $slots = json_decode((string)($row['mj_member_slots_json'] ?? ''), true);
            if (!is_array($slots)) $slots = array();

            $added = 0;
            foreach ($seats as $si => $sv) {
                if ($sv === '빈좌석' && $added < $pax) {
                    $seats[$si] = $ageGroup . mb_substr($gender, 0, 1, 'UTF-8') . '(' . $maskedApplicant . ')';
                    $slots[] = array(
                        'role'   => '합류신청',
                        'nick'   => $maskedApplicant,
                        'age'    => $ageGroup,
                        'gender' => $gender,
                        'flight' => $flightYn,
                        'note'   => $memo
                    );
                    $added++;
                }
            }
            $seatsJson = mokta_esc(json_encode($seats, JSON_UNESCAPED_UNICODE));
            $slotsJson = mokta_esc(json_encode($slots, JSON_UNESCAPED_UNICODE));
            mokta_q_exec("UPDATE smart_mokta_join SET mj_cur_pax = {$newCur}, mj_seats_json = '{$seatsJson}', mj_member_slots_json = '{$slotsJson}' WHERE mj_uid = {$joinUid}");
        }
    }

    $insSql = sprintf(
        "INSERT INTO smart_mokta_join_apply
            (ja_join_key, ja_join_title, ja_pid, ja_host_inid, ja_applicant_id, ja_applicant_name, ja_contact, ja_pax, ja_age_group, ja_gender, ja_flight_yn, ja_memo, ja_status, ja_rdate)
         VALUES
            ('%s', '%s', '%s', '%s', '%s', '%s', '%s', %d, '%s', '%s', '%s', '%s', 'pending', NOW())",
        mokta_esc($rawJoinKey),
        mokta_esc($joinTitle),
        mokta_esc($targetPid),
        mokta_esc($hostInid),
        mokta_esc($auth['userId']),
        mokta_esc($auth['userName'] ?: $auth['userId']),
        mokta_esc($contact),
        $pax,
        mokta_esc($ageGroup),
        mokta_esc($gender),
        mokta_esc($flightYn),
        mokta_esc($memo)
    );
    mokta_q_exec($insSql);
    mokta_json(array('ok' => true, 'applyId' => (string)mokta_last_id()));
}

/* 4. 동행·조인 상세 모달 실시간 사전 Q&A 댓글 등록 */
if ($mode === 'add_comment') {
    if ($auth['role'] === 'guest') {
        mokta_json(array('ok' => false, 'requireLogin' => true, 'message' => '3초 로그인 후 댓글을 남기실 수 있습니다.'), 401);
    }
    $joinKey = trim((string)($_POST['join_id'] ?? ''));
    $content = trim((string)($_POST['content'] ?? ''));
    if ($joinKey === '' || $content === '') {
        mokta_json(array('ok' => false, 'message' => '질문 또는 답변 내용을 입력해 주세요.'), 400);
    }

    $roleBadge = '여행자';
    if ($auth['role'] === 'partner') {
        $roleBadge = '공식파트너 · ' . $auth['partnerName'];
    } elseif ($auth['role'] === 'master') {
        $roleBadge = 'MOKTA 공식매니저';
    } elseif (ctype_digit($joinKey)) {
        $jRow = mokta_q_one("SELECT mj_inid FROM smart_mokta_join WHERE mj_uid = " . (int)$joinKey . " LIMIT 1");
        if (!empty($jRow['mj_inid']) && $jRow['mj_inid'] === $auth['userId']) {
            $roleBadge = '모집방장';
        }
    }

    $authorDisp = ($auth['role'] === 'partner')
        ? $auth['partnerName']
        : mokta_mask_name($auth['userName'] ?: $auth['userId']);

    $sql = sprintf(
        "INSERT INTO smart_mokta_join_cmt (jc_join_key, jc_author_id, jc_author_name, jc_role_badge, jc_content, jc_rdate)
         VALUES ('%s', '%s', '%s', '%s', '%s', NOW())",
        mokta_esc($joinKey),
        mokta_esc($auth['userId']),
        mokta_esc($authorDisp),
        mokta_esc($roleBadge),
        mokta_esc($content)
    );
    mokta_q_exec($sql);
    mokta_json(array(
        'ok' => true,
        'comment' => array(
            'id'        => (string)mokta_last_id(),
            'author'    => $authorDisp,
            'roleBadge' => $roleBadge,
            'content'   => $content,
            'rdate'     => date('m.d H:i')
        )
    ));
}

/* 5. 방장·파트너 모집글 상단 끌올 (Bump) */
if ($mode === 'bump_join') {
    if ($auth['role'] === 'guest') {
        mokta_json(array('ok' => false, 'requireLogin' => true, 'message' => '로그인이 필요합니다.'), 401);
    }
    $rawJoinKey = trim((string)($_POST['join_id'] ?? ''));
    if (ctype_digit($rawJoinKey)) {
        $joinUid = (int)$rawJoinKey;
        $row = mokta_q_one("SELECT mj_uid, mj_inid, mj_pid FROM smart_mokta_join WHERE mj_uid = {$joinUid} LIMIT 1");
        if (!empty($row['mj_uid'])) {
            $canBump = ($auth['role'] === 'master')
                || ($auth['userId'] !== '' && $row['mj_inid'] === $auth['userId'])
                || ($auth['role'] === 'partner' && $row['mj_pid'] === $auth['partnerId']);
            if (!$canBump) {
                mokta_json(array('ok' => false, 'message' => '본인이 등록한 모집글만 끌올할 수 있습니다.'), 403);
            }
            mokta_q_exec("UPDATE smart_mokta_join SET mj_bumped_at = NOW() WHERE mj_uid = {$joinUid}");
        }
    }
    mokta_json(array('ok' => true, 'bumpedAt' => '방금 끌올'));
}

/* 6. 방장(고객) 또는 파트너·마스터: 모집 인원 조정 / 마감 전환 / 삭제 관리 */
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

/* 7. 파트너·마스터·방장: 합류 신청 고객 상태 업데이트 (확정 / 취소) */
if ($mode === 'update_apply_status') {
    if ($auth['role'] === 'guest') {
        mokta_json(array('ok' => false, 'requireLogin' => true, 'message' => '로그인이 필요합니다.'), 401);
    }
    $jaUid  = (int)($_POST['apply_id'] ?? 0);
    $status = trim((string)($_POST['status'] ?? 'confirmed'));
    if (!od_in_array($status, array('pending', 'confirmed', 'cancelled'), true)) {
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

/* 8. 파트너·마스터 전용: 여행자 동행모집 방에 공식 파트너 차량·투어 매칭 제안 */
if ($mode === 'propose_to_companion') {
    $auth = mokta_require_partner_or_master();
    $joinUid = (int)($_POST['join_id'] ?? 0);
    $pid     = ($auth['role'] === 'master' && !empty($_POST['target_pid'])) ? trim((string)$_POST['target_pid']) : $auth['partnerId'];
    $agency  = ($auth['role'] === 'master' && !empty($_POST['target_agency'])) ? trim((string)$_POST['target_agency']) : $auth['partnerName'];
    $pcode   = !empty($_POST['pcode']) ? trim((string)$_POST['pcode']) : 'V6003-W0388-Z1928';
    $offerPrice = !empty($_POST['cur_price']) ? trim((string)$_POST['cur_price']) : (!empty($_POST['offer_price']) ? trim((string)$_POST['offer_price']) : '890,000원');

    if ($joinUid > 0) {
        $escPid = mokta_esc($pid);
        $escAg  = mokta_esc($agency . ' 차량매칭 제안');
        $escPc  = mokta_esc($pcode);
        $escPr  = mokta_esc($offerPrice);
        mokta_q_exec("UPDATE smart_mokta_join SET mj_pid = '{$escPid}', mj_agency = '{$escAg}', mj_pcode = '{$escPc}', mj_cur_price = '{$escPr}', mj_prefix_tag = '투어사확정' WHERE mj_uid = {$joinUid}");
    }
    mokta_json(array('ok' => true));
}

mokta_json(array('ok' => false, 'message' => '지원하지 않는 요청 모드입니다.'), 400);
