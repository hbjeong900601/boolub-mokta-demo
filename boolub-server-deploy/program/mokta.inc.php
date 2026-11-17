<?php
/**
 * 부럽(BOOLUB) × MOKTA 공식전용관 공통 코어 & 권한 검증 모듈
 * 서버 배포 위치: /program/mokta.inc.php
 *
 * 권한 정책:
 *  - master  : 부럽 통합관리자(totalAdmin / AuthAdmin 쿠키 / 최고관리자 회원) -> 파트너사 센터 전체 오픈 + 대행/입점승인 가능
 *  - partner : 로그인한 입점 파트너 계정(subAdmin AuthCompany 쿠키 또는 od_mokta_partner_map 승인 회원) -> 파트너사 센터 본인 계정 오픈
 *  - member  : 일반 로그인 고객 -> 파트너사 센터 비노출(차단), [파트너 입점신청] 버튼 노출
 *  - guest   : 미로그인 방문자 -> 파트너사 센터 비노출(차단), [파트너 입점신청] 버튼 노출
 */
if (!defined('_OD_DIRECT_')) {
    include_once(dirname(__FILE__) . '/inc.php');
}

/* ---------- 안전한 DB 헬퍼 (HYSSENCE _MQ 계열 완벽 호환) ---------- */
function mokta_esc($str) {
    global $connect, $dbcon;
    $val = trim((string)$str);
    if (isset($connect) && is_object($connect)) {
        return mysqli_real_escape_string($connect, $val);
    }
    if (isset($dbcon) && is_object($dbcon)) {
        return mysqli_real_escape_string($dbcon, $val);
    }
    return addslashes($val);
}

function mokta_q_one($sql) {
    if (function_exists('_MQ')) {
        return _MQ($sql);
    }
    global $connect;
    $res = mysqli_query($connect, $sql);
    return $res ? mysqli_fetch_assoc($res) : array();
}

function mokta_q_all($sql) {
    if (function_exists('_MQ_assoc')) {
        return _MQ_assoc($sql);
    }
    global $connect;
    $rows = array();
    $res = mysqli_query($connect, $sql);
    if ($res) {
        while ($r = mysqli_fetch_assoc($res)) {
            $rows[] = $r;
        }
    }
    return $rows;
}

function mokta_q_exec($sql) {
    if (function_exists('_MQ_noreturn')) {
        _MQ_noreturn($sql);
        return true;
    }
    global $connect;
    return (bool)mysqli_query($connect, $sql);
}

function mokta_last_id() {
    if (function_exists('_MQ_insert_id')) {
        return (int)_MQ_insert_id();
    }
    global $connect;
    return isset($connect) ? (int)mysqli_insert_id($connect) : 0;
}

function mokta_json($payload, $httpCode = 200) {
    if (!headers_sent()) {
        http_response_code($httpCode);
        header('Content-Type: application/json; charset=utf-8');
        header('Cache-Control: no-store, no-cache, must-revalidate');
    }
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function mokta_mask_name($name) {
    $name = trim((string)$name);
    if ($name === '') return '부럽 여행자';
    $len = mb_strlen($name, 'UTF-8');
    if ($len <= 1) return $name . '*';
    if ($len === 2) return mb_substr($name, 0, 1, 'UTF-8') . '*';
    return mb_substr($name, 0, 1, 'UTF-8') . '*' . mb_substr($name, $len - 1, 1, 'UTF-8');
}

/* ---------- HYSSENCE 세션·쿠키 기반 4단계 권한 판별 ---------- */
function mokta_resolve_auth() {
    global $mem_info, $siteAdmin, $subAdmin;

    $isLoggedMember = (function_exists('is_login') && is_login() && !empty($mem_info['in_id']));
    $memberId   = $isLoggedMember ? trim((string)$mem_info['in_id']) : '';
    $memberName = $isLoggedMember ? trim((string)($mem_info['in_name'] ?? $memberId)) : '';

    // 1. 마스터 관리자 판별 (totalAdmin 로그인 세션/쿠키 또는 최고관리자 계정)
    $isMaster = false;
    if ((function_exists('is_admin') && is_admin()) || (function_exists('is_master') && is_master())) {
        $isMaster = true;
    } elseif (!empty($siteAdmin['a_id']) || !empty($_SESSION['AuthAdmin'])) {
        $isMaster = true;
    } elseif (!empty($_COOKIE['AuthAdmin'])) {
        $admCookie = mokta_esc($_COOKIE['AuthAdmin']);
        $admRow = mokta_q_one("SELECT a_id FROM od_admin WHERE a_uid = '{$admCookie}' OR a_id = '{$admCookie}' LIMIT 1");
        if (!empty($admRow['a_id'])) {
            $isMaster = true;
        }
    }
    if (!$isMaster && $isLoggedMember) {
        if ($memberId === 'admin' || $memberId === 'boolub' || (isset($mem_info['in_userlevel']) && (int)$mem_info['in_userlevel'] >= 9)) {
            $isMaster = true;
        }
    }

    if ($isMaster) {
        return array(
            'role'        => 'master',
            'userId'      => $memberId !== '' ? $memberId : 'admin',
            'userName'    => $memberName !== '' ? $memberName : '부럽 마스터',
            'partnerId'   => 'boolub',
            'partnerName' => '부럽 몽골원정대 (직영)'
        );
    }

    // 2. 로그인한 입점 파트너 계정 판별
    // 2-A. HYSSENCE 입점사 관리자(/subAdmin/) AuthCompany 쿠키 세션 확인
    $subPartnerId = '';
    if (!empty($subAdmin['cp_id'])) {
        $subPartnerId = trim((string)$subAdmin['cp_id']);
    } elseif (!empty($_SESSION['AuthCompany'])) {
        $subPartnerId = trim((string)$_SESSION['AuthCompany']);
    } elseif (!empty($_COOKIE['AuthCompany'])) {
        $subPartnerId = trim((string)$_COOKIE['AuthCompany']);
    }

    if ($subPartnerId !== '') {
        $escPid = mokta_esc($subPartnerId);
        $cpRow = mokta_q_one("SELECT cp_id, cp_name FROM od_company WHERE cp_id = '{$escPid}' LIMIT 1");
        $mapRow = mokta_q_one("SELECT mp_pid, mp_name FROM od_mokta_partner_map WHERE mp_pid = '{$escPid}' AND mp_status = 'approved' LIMIT 1");
        if (!empty($cpRow['cp_id']) || !empty($mapRow['mp_pid'])) {
            $resolvedPid  = !empty($mapRow['mp_pid']) ? $mapRow['mp_pid'] : $cpRow['cp_id'];
            $resolvedName = !empty($mapRow['mp_name']) ? $mapRow['mp_name'] : $cpRow['cp_name'];
            return array(
                'role'        => 'partner',
                'userId'      => $memberId !== '' ? $memberId : $resolvedPid,
                'userName'    => $resolvedName,
                'partnerId'   => $resolvedPid,
                'partnerName' => $resolvedName
            );
        }
    }

    // 2-B. 프론트엔드 로그인 회원 ID가 승인된 입점 파트너(od_mokta_partner_map 또는 od_company)와 매칭되는지 확인
    if ($isLoggedMember) {
        $escMem = mokta_esc($memberId);
        $mapRow = mokta_q_one("
            SELECT mp_pid, mp_name
            FROM od_mokta_partner_map
            WHERE (mp_member_id = '{$escMem}' OR mp_pid = '{$escMem}')
              AND mp_status = 'approved'
            LIMIT 1
        ");
        if (!empty($mapRow['mp_pid'])) {
            return array(
                'role'        => 'partner',
                'userId'      => $memberId,
                'userName'    => $memberName,
                'partnerId'   => $mapRow['mp_pid'],
                'partnerName' => $mapRow['mp_name']
            );
        }

        $cpRow = mokta_q_one("SELECT cp_id, cp_name FROM od_company WHERE cp_id = '{$escMem}' LIMIT 1");
        if (!empty($cpRow['cp_id'])) {
            return array(
                'role'        => 'partner',
                'userId'      => $memberId,
                'userName'    => $memberName,
                'partnerId'   => $cpRow['cp_id'],
                'partnerName' => $cpRow['cp_name']
            );
        }

        // 3. 일반 로그인 고객 (파트너사 센터 비오픈, 파트너 입점신청 버튼 노출)
        return array(
            'role'        => 'member',
            'userId'      => $memberId,
            'userName'    => mokta_mask_name($memberName),
            'partnerId'   => '',
            'partnerName' => ''
        );
    }

    // 4. 비로그인 고객 (파트너사 센터 비오픈, 파트너 입점신청 버튼 노출)
    return array(
        'role'        => 'guest',
        'userId'      => '',
        'userName'    => '',
        'partnerId'   => '',
        'partnerName' => ''
    );
}

function mokta_require_partner_or_master() {
    $auth = mokta_resolve_auth();
    if ($auth['role'] !== 'partner' && $auth['role'] !== 'master') {
        mokta_json(array(
            'ok'      => false,
            'code'    => 'FORBIDDEN',
            'message' => '파트너사 전용 기능은 로그인한 입점 파트너 및 마스터 계정만 이용 가능합니다.'
        ), 403);
    }
    return $auth;
}

function mokta_require_master() {
    $auth = mokta_resolve_auth();
    if ($auth['role'] !== 'master') {
        mokta_json(array(
            'ok'      => false,
            'code'    => 'FORBIDDEN_MASTER',
            'message' => '마스터 관리자 전용 권한입니다.'
        ), 403);
    }
    return $auth;
}

/* ---------- 안전한 이미지 업로드 처리 (/upfiles/mokta/YYYYMM/) ---------- */
function mokta_upload_image($fieldKey) {
    if (empty($_FILES[$fieldKey]) || $_FILES[$fieldKey]['error'] !== UPLOAD_ERR_OK) {
        return '';
    }
    $tmp  = $_FILES[$fieldKey]['tmp_name'];
    $size = (int)$_FILES[$fieldKey]['size'];
    if ($size <= 0 || $size > 10 * 1024 * 1024) {
        return '';
    }
    $info = @getimagesize($tmp);
    if (!$info || empty($info['mime'])) {
        return '';
    }
    $mimeMap = array(
        'image/jpeg' => 'jpg',
        'image/png'  => 'png',
        'image/webp' => 'webp'
    );
    if (!isset($mimeMap[$info['mime']])) {
        return '';
    }
    $ext = $mimeMap[$info['mime']];
    $ym  = date('Ym');
    $relDir = "/upfiles/mokta/{$ym}";
    $absDir = rtrim($_SERVER['DOCUMENT_ROOT'], '/') . $relDir;
    if (!is_dir($absDir)) {
        @mkdir($absDir, 0755, true);
    }
    $fileName = 'mokta_' . date('YmdHis') . '_' . mt_rand(1000, 9999) . '.' . $ext;
    $absPath  = $absDir . '/' . $fileName;
    if (@move_uploaded_file($tmp, $absPath)) {
        return $relDir . '/' . $fileName;
    }
    return '';
}
