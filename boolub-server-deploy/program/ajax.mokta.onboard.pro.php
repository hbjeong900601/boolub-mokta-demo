<?php
/**
 * 신규 파트너 입점신청 접수(비로그인/일반고객 화면 버튼) & 마스터 승인 API
 * 서버 배포 위치: /program/ajax.mokta.onboard.pro.php
 */
include_once(dirname(__FILE__) . '/mokta.inc.php');

$mode = isset($_POST['_mode']) ? trim($_POST['_mode']) : 'apply';

/* 1. 비로그인 방문자 / 일반 고객 화면 [파트너 입점신청] 접수 */
if ($mode === 'apply') {
    $company  = isset($_POST['company']) ? trim($_POST['company']) : '';
    $moktaYn  = (isset($_POST['mokta_yn']) && $_POST['mokta_yn'] === 'N') ? 'N' : 'Y';
    $contact  = isset($_POST['contact']) ? trim($_POST['contact']) : '';
    $memberId = isset($_POST['member_id']) ? trim($_POST['member_id']) : '';
    $desc     = isset($_POST['desc']) ? trim($_POST['desc']) : '';
    $ip       = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '';

    if ($company === '' || $contact === '') {
        mokta_json(array('ok' => false, 'message' => '여행사명과 담당자 연락처를 입력해 주세요.'), 400);
    }

    $sql = sprintf(
        "INSERT INTO od_mokta_onboard
            (mo_company, mo_mokta_yn, mo_contact, mo_member_id, mo_desc, mo_ip, mo_status, mo_rdate)
         VALUES
            ('%s', '%s', '%s', '%s', '%s', '%s', 'pending', NOW())",
        mokta_esc($company),
        $moktaYn,
        mokta_esc($contact),
        mokta_esc($memberId),
        mokta_esc($desc),
        mokta_esc($ip)
    );

    if (!mokta_q_exec($sql)) {
        mokta_json(array('ok' => false, 'message' => '입점 신청 저장 중 오류가 발생했습니다.'), 500);
    }

    mokta_json(array(
        'ok'      => true,
        'id'      => (string)mokta_last_id(),
        'message' => '파트너 입점 심사 신청이 정상 접수되었습니다.'
    ));
}

/* 2. 마스터 계정 전용: 입점 신청 원클릭 승인 및 파트너사 센터 접근 권한 부여 */
if ($mode === 'approve') {
    $auth = mokta_require_master();
    $obId = (int)($_POST['ob_id'] ?? 0);
    $row  = mokta_q_one("SELECT * FROM od_mokta_onboard WHERE mo_uid = {$obId} LIMIT 1");
    if (empty($row['mo_uid'])) {
        mokta_json(array('ok' => false, 'message' => '신청 내역을 찾을 수 없습니다.'), 404);
    }

    $admId = mokta_esc($auth['userId']);
    mokta_q_exec("UPDATE od_mokta_onboard SET mo_status = 'approved', mo_approved_by = '{$admId}', mo_approved_at = NOW() WHERE mo_uid = {$obId}");

    // 신청서에 부럽 회원 ID(mo_member_id)가 기재된 경우 즉시 od_mokta_partner_map에 승인 등록하여 파트너사 센터 오픈
    if (!empty($row['mo_member_id'])) {
        $memId   = mokta_esc($row['mo_member_id']);
        $comp    = mokta_esc($row['mo_company']);
        $moktaYn = $row['mo_mokta_yn'] === 'N' ? 'N' : 'Y';
        mokta_q_exec("
            INSERT INTO od_mokta_partner_map (mp_pid, mp_member_id, mp_name, mp_mokta_yn, mp_status, mp_rdate)
            VALUES ('{$memId}', '{$memId}', '{$comp}', '{$moktaYn}', 'approved', NOW())
            ON DUPLICATE KEY UPDATE mp_status = 'approved', mp_name = '{$comp}'
        ");
    }

    mokta_json(array('ok' => true, 'message' => '파트너 입점 승인 및 권한 부여가 완료되었습니다.'));
}

mokta_json(array('ok' => false, 'message' => '잘못된 요청 모드입니다.'), 400);
