<?php
/**
 * 부럽(BOOLUB) × MOKTA 공식전용관 (https://www.boolub.com/?pn=pages.view&type=pages&data=mj)
 * HYSSENCE(원데이넷) 실서버 세션·암호화토큰·DB($con) 연동 코어 모듈
 * 서버 배포 위치: /program/mokta.inc.php
 */
if (!defined('_OD_DIRECT_')) {
    include_once(dirname(__FILE__) . '/inc.php');
}

/* ---------- 안전한 DB 헬퍼 (실서버 $con 및 _MQ 계열 완벽 호환) ---------- */
function mokta_esc($str) {
    global $con, $connect, $dbcon;
    $val = trim((string)$str);
    if (isset($con) && ($con instanceof mysqli)) {
        return mysqli_real_escape_string($con, $val);
    }
    if (isset($connect) && ($connect instanceof mysqli)) {
        return mysqli_real_escape_string($connect, $val);
    }
    if (isset($dbcon) && ($dbcon instanceof mysqli)) {
        return mysqli_real_escape_string($dbcon, $val);
    }
    return addslashes($val);
}

function mokta_q_one($sql) {
    if (function_exists('_MQ')) {
        $res = _MQ($sql);
        return is_array($res) ? $res : array();
    }
    global $con;
    $r = mysqli_query($con, $sql);
    return $r ? (mysqli_fetch_assoc($r) ?: array()) : array();
}

function mokta_q_all($sql) {
    if (function_exists('_MQ_assoc')) {
        $res = _MQ_assoc($sql);
        return is_array($res) ? $res : array();
    }
    global $con;
    $rows = array();
    $r = mysqli_query($con, $sql);
    if ($r) {
        while ($row = mysqli_fetch_assoc($r)) {
            $rows[] = $row;
        }
    }
    return $rows;
}

function mokta_q_exec($sql) {
    if (function_exists('_MQ_noreturn')) {
        _MQ_noreturn($sql);
        return true;
    }
    global $con;
    return (bool)mysqli_query($con, $sql);
}

function mokta_last_id() {
    if (function_exists('_MQ_insert_id')) {
        return (int)_MQ_insert_id();
    }
    global $con;
    return isset($con) ? (int)mysqli_insert_id($con) : 0;
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

function mokta_ensure_col($table, $col, $ddl) {
    $escCol = mokta_esc($col);
    $chk = mokta_q_one("SHOW COLUMNS FROM `{$table}` LIKE '{$escCol}'");
    if (empty($chk)) {
        mokta_q_exec("ALTER TABLE `{$table}` ADD COLUMN {$ddl}");
    }
}

function mokta_mask_name($name) {
    $name = trim((string)$name);
    if ($name === '') return '부럽 여행자';
    $len = mb_strlen($name, 'UTF-8');
    if ($len <= 1) return $name . '*';
    if ($len === 2) return mb_substr($name, 0, 1, 'UTF-8') . '*';
    return mb_substr($name, 0, 1, 'UTF-8') . '*' . mb_substr($name, $len - 1, 1, 'UTF-8');
}

/* ---------- HYSSENCE 정품 보안 토큰 검증 포함 4단계 권한 판별 ---------- */
function mokta_verify_master_cookie() {
    if (empty($_COOKIE['AuthAdmin'])) {
        return false;
    }
    if (function_exists('get_site_info') && function_exists('get_secure_token')) {
        if (empty($_COOKIE['AuthAdminSecureToken'])) {
            return false;
        }
        $siteInfo = get_site_info();
        $ua = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
        $checksum = md5($siteInfo['s_license'] . $ua . $_COOKIE['AuthAdmin']);
        $secureToken = get_secure_token('totalAdminLogin', $_COOKIE['AuthAdminSecureToken'], $checksum);
        return !empty($secureToken);
    }
    $admCookie = mokta_esc($_COOKIE['AuthAdmin']);
    $admRow = mokta_q_one("SELECT a_uid FROM smart_admin WHERE a_uid = '{$admCookie}' OR a_id = '{$admCookie}' LIMIT 1");
    return !empty($admRow['a_uid']);
}

function mokta_verify_subadmin_cookie() {
    if (empty($_COOKIE['AuthCompany'])) {
        return '';
    }
    $cpId = trim((string)$_COOKIE['AuthCompany']);
    if (function_exists('get_site_info') && function_exists('get_secure_token')) {
        if (empty($_COOKIE['AuthSubAdminSecureToken'])) {
            return '';
        }
        $siteInfo = get_site_info();
        $ua = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
        $checksum = md5($siteInfo['s_license'] . $ua . $cpId);
        $secureToken = get_secure_token('subAdminLogin', $_COOKIE['AuthSubAdminSecureToken'], $checksum);
        if (empty($secureToken)) {
            return '';
        }
    }
    return $cpId;
}

function mokta_resolve_auth() {
    global $mem_info;

    $isLoggedMember = (function_exists('is_login') && is_login() && !empty($mem_info['in_id']));
    $memberId   = $isLoggedMember ? trim((string)$mem_info['in_id']) : '';
    $memberName = $isLoggedMember ? trim((string)($mem_info['in_name'] ?? $memberId)) : '';

    // 1. 마스터 계정 (totalAdmin 보안토큰 검증 통과 또는 최고관리자 회원 로그인)
    $isMaster = mokta_verify_master_cookie();
    if (!$isMaster && $isLoggedMember) {
        if ($memberId === 'admin' || (isset($mem_info['in_userlevel']) && (int)$mem_info['in_userlevel'] >= 9)) {
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

    // 2. 로그인한 입점 파트너 계정
    // 2-A. 입점사 관리자(/subAdmin/) AuthCompany 보안토큰 세션 확인
    $verifiedCpId = mokta_verify_subadmin_cookie();
    if ($verifiedCpId !== '') {
        $escPid = mokta_esc($verifiedCpId);
        $cpRow  = mokta_q_one("SELECT cp_id, cp_name FROM smart_company WHERE cp_id = '{$escPid}' LIMIT 1");
        $mapRow = mokta_q_one("SELECT mp_pid, mp_name FROM smart_mokta_partner_map WHERE mp_pid = '{$escPid}' AND mp_status = 'approved' LIMIT 1");
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

    // 2-B. 프론트 로그인 회원 ID가 승인된 입점 파트너(smart_mokta_partner_map 또는 smart_company)와 일치하는지 확인
    if ($isLoggedMember) {
        $escMem = mokta_esc($memberId);
        $mapRow = mokta_q_one("
            SELECT mp_pid, mp_name
            FROM smart_mokta_partner_map
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

        $cpRow = mokta_q_one("SELECT cp_id, cp_name FROM smart_company WHERE cp_id = '{$escMem}' LIMIT 1");
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

    // 4. 미로그인 방문자 (파트너사 센터 비오픈, 파트너 입점신청 버튼 노출)
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

/* ---------- 안전한 이미지 업로드 처리 (/customized/mokta/uploads/YYYYMM/) ---------- */
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
    $ext    = $mimeMap[$info['mime']];
    $ym     = date('Ym');
    $baseUp = rtrim($_SERVER['DOCUMENT_ROOT'], '/') . '/customized/mokta/uploads';
    if (!is_dir($baseUp)) {
        @mkdir($baseUp, 0755, true);
        @file_put_contents($baseUp . '/.htaccess', "php_flag engine off\nOptions -Indexes\n<FilesMatch \"\\.(php|php5|php7|phtml|phar|pl|py|cgi|sh)$\">\n  Require all denied\n</FilesMatch>\n");
    }
    $relDir = "/customized/mokta/uploads/{$ym}";
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
