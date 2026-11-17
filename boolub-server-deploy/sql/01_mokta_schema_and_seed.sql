-- ============================================================================
-- 부럽(BOOLUB) × MOKTA 몽골 공식전용관 (data=mokta) 운영 DB 스키마 & 초기 시드
-- Target DBMS: MySQL 5.7+ / 8.0+ / MariaDB 10.3+ (HYSSENCE 표준 utf8mb4)
-- 실행 순서: 본 SQL 실행 완료 후 /program/ajax.mokta.*.php 및 pages.mokta.php 배포
-- ============================================================================

SET NAMES utf8mb4;

-- 1. 입점 파트너 권한 매핑 & MOKTA 회원사 메타 테이블
-- (HYSSENCE 기본 입점사 테이블 od_company의 cp_id와 프론트 회원 아이디 in_id 연동)
CREATE TABLE IF NOT EXISTS `od_mokta_partner_map` (
  `mp_uid` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `mp_pid` VARCHAR(50) NOT NULL COMMENT '부럽 입점 파트너 코드 (od_company.cp_id)',
  `mp_member_id` VARCHAR(60) NOT NULL DEFAULT '' COMMENT '프론트 로그인 연동 회원 ID (od_individual.in_id)',
  `mp_name` VARCHAR(100) NOT NULL COMMENT '파트너사 표시명',
  `mp_mokta_yn` ENUM('Y','N') NOT NULL DEFAULT 'Y' COMMENT 'MOKTA 협회 정회원 여부',
  `mp_rep_pcode` VARCHAR(40) NOT NULL DEFAULT '' COMMENT '대표 연결 상품코드 (od_product.p_code)',
  `mp_logo_url` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '파트너 로고 이미지 경로',
  `mp_status` ENUM('approved','pending','suspended') NOT NULL DEFAULT 'approved' COMMENT '파트너사 센터 접근 승인상태',
  `mp_sort` INT NOT NULL DEFAULT 100,
  `mp_rdate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`mp_uid`),
  UNIQUE KEY `uk_mp_pid_member` (`mp_pid`, `mp_member_id`),
  KEY `idx_mp_member_id` (`mp_member_id`),
  KEY `idx_mp_status` (`mp_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='MOKTA 전용관 파트너 권한 및 메타';

-- 현재 부럽 실제 입점 9개 파트너사 기본 권한 시드 등록
INSERT IGNORE INTO `od_mokta_partner_map`
  (`mp_pid`, `mp_member_id`, `mp_name`, `mp_mokta_yn`, `mp_rep_pcode`, `mp_logo_url`, `mp_status`, `mp_sort`)
VALUES
  ('boolub',     'boolub',     '부럽 몽골원정대 (직영)',           'Y', 'T0950-Q2923-W2496', '/customized/mokta/images/boolub_logo.png',           'approved', 1),
  ('anoratour',  'anoratour',  '노라투어 (NORA TOUR)',            'Y', 'V6003-W0388-Z1928', '/customized/mokta/images/partners/anoratour.png',    'approved', 2),
  ('bbm0707',    'bbm0707',    'BBM TOUR (비비엠투어)',            'Y', 'A7468-J1235-Q7992', '/customized/mokta/images/partners/bbm0707.jpeg',     'approved', 3),
  ('khadag',     'khadag',     '하닥투어 (KHADAG TOUR)',           'Y', 'L0277-Y0435-H3099', '/customized/mokta/images/partners/khadag.png',       'approved', 4),
  ('SKYTOURS',   'SKYTOURS',   '스카이 투어 몽골 (SKY TOURS)',      'Y', 'J8833-W9230-L2860', '/customized/mokta/images/partners/SKYTOURS.jpg',     'approved', 5),
  ('Bftour',     'Bftour',     '밝은 미래 여행 (BRIGHT FUTURE)',    'Y', 'E0711-V0341-Z7774', '/customized/mokta/images/partners/Bftour.png',       'approved', 6),
  ('doittavel',  'doittavel',  '(주)두잇트래블',                    'Y', 'G8231-V9289-H9933', '/customized/mokta/images/boolub_logo.png',           'approved', 7),
  ('YangGaTour', 'YangGaTour', '양가투어 (YangGa Friends)',        'Y', 'E4890-B3318-G7233', '/customized/mokta/images/partners/YangGaTour.png',   'approved', 8),
  ('wit77777',   'wit77777',   '더블유아이티 (WIT)',                'N', 'I3885-I4036-S5377', '/customized/mokta/images/partners/wit77777.png',     'approved', 9);

-- 2. 고객 내 일정 맞춤견적 요청 테이블 (RFQ)
CREATE TABLE IF NOT EXISTS `od_mokta_rfq` (
  `mr_uid` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `mr_inid` VARCHAR(60) NOT NULL DEFAULT '' COMMENT '작성 회원 ID (비회원 가능)',
  `mr_author` VARCHAR(60) NOT NULL COMMENT '마스킹 표시 작성자명',
  `mr_cat` VARCHAR(30) NOT NULL DEFAULT '단독투어' COMMENT '단독투어 / 동행조인',
  `mr_region_tag` VARCHAR(30) NOT NULL DEFAULT '고비' COMMENT '고비 / 홉스골 / 중부 / 테를지',
  `mr_dates` VARCHAR(100) NOT NULL COMMENT '희망 출발일 및 기간',
  `mr_pax_type` VARCHAR(100) NOT NULL COMMENT '인원 및 진행방식',
  `mr_title` VARCHAR(200) NOT NULL COMMENT '요청 제목',
  `mr_memo` TEXT NOT NULL COMMENT '상세 요청사항',
  `mr_specs_json` TEXT DEFAULT NULL COMMENT '핵심 태그 JSON 배열',
  `mr_bid_cnt` TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '현재 도착 견적 수 (최대 6 제한)',
  `mr_view_yn` ENUM('Y','N') NOT NULL DEFAULT 'Y',
  `mr_rdate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`mr_uid`),
  KEY `idx_mr_view_rdate` (`mr_view_yn`, `mr_rdate`),
  KEY `idx_mr_region` (`mr_region_tag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='고객 맞춤 일정 견적요청';

-- 3. 입점 파트너 실사 비교견적 입찰 테이블 (1 RFQ 당 최대 6건)
CREATE TABLE IF NOT EXISTS `od_mokta_bid` (
  `mb_uid` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `mb_mr_uid` INT UNSIGNED NOT NULL COMMENT 'od_mokta_rfq.mr_uid FK',
  `mb_pid` VARCHAR(50) NOT NULL COMMENT '입점 파트너 ID (cp_id)',
  `mb_agency` VARCHAR(100) NOT NULL COMMENT '파트너사 표시명',
  `mb_logo` VARCHAR(255) NOT NULL DEFAULT '',
  `mb_badge` VARCHAR(100) NOT NULL DEFAULT '부럽 공식파트너',
  `mb_pcode` VARCHAR(40) NOT NULL DEFAULT '' COMMENT '연결 부럽 판매 상품코드',
  `mb_price4` VARCHAR(40) NOT NULL COMMENT '4인 기준 1인 요금',
  `mb_price6` VARCHAR(40) NOT NULL COMMENT '6인 마감 시 1인 요금',
  `mb_veh_name` VARCHAR(150) NOT NULL COMMENT '배정 예정 차량명',
  `mb_ger_name` VARCHAR(150) NOT NULL COMMENT '배정 숙소 캠프명',
  `mb_veh_img` VARCHAR(255) NOT NULL COMMENT '차량 실사 경로',
  `mb_ger_img` VARCHAR(255) NOT NULL COMMENT '숙소 실사 경로',
  `mb_comment` TEXT NOT NULL COMMENT '포함사항 및 제안 코멘트',
  `mb_rdate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`mb_uid`),
  KEY `idx_mb_mr_uid` (`mb_mr_uid`),
  KEY `idx_mb_pid` (`mb_pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='파트너사 맞춤 비교견적 제안';

-- 4. 실시간 출발확정 동행·오픈조인 통합 테이블
CREATE TABLE IF NOT EXISTS `od_mokta_join` (
  `mj_uid` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `mj_host_type` ENUM('partner','member') NOT NULL DEFAULT 'partner' COMMENT '파트너 오픈조인 / 여행자 동행모집',
  `mj_inid` VARCHAR(60) NOT NULL DEFAULT '',
  `mj_pid` VARCHAR(50) NOT NULL DEFAULT 'boolub',
  `mj_agency` VARCHAR(100) NOT NULL DEFAULT '부럽 몽골원정대 (직영)',
  `mj_pcode` VARCHAR(40) NOT NULL DEFAULT '',
  `mj_date_key` VARCHAR(10) NOT NULL DEFAULT '08-15' COMMENT '캘린더 필터 키 (MM-DD)',
  `mj_date_str` VARCHAR(80) NOT NULL COMMENT '표시 일정 문자열',
  `mj_region_key` VARCHAR(30) NOT NULL DEFAULT '고비',
  `mj_duration_key` VARCHAR(30) NOT NULL DEFAULT '4박5일',
  `mj_style_key` VARCHAR(30) NOT NULL DEFAULT '조인',
  `mj_status_badge` VARCHAR(40) NOT NULL DEFAULT '출발확정',
  `mj_status_cls` VARCHAR(20) NOT NULL DEFAULT 'sky',
  `mj_title` VARCHAR(200) NOT NULL,
  `mj_img` VARCHAR(255) NOT NULL DEFAULT '/customized/mokta/images/sand_dunes_camp.jpg',
  `mj_cur_pax` TINYINT UNSIGNED NOT NULL DEFAULT 4,
  `mj_max_pax` TINYINT UNSIGNED NOT NULL DEFAULT 6,
  `mj_seats_json` TEXT NOT NULL COMMENT '좌석 배열 JSON',
  `mj_cur_price` VARCHAR(40) NOT NULL DEFAULT '920,000원',
  `mj_full_price` VARCHAR(40) NOT NULL DEFAULT '820,000원',
  `mj_tags` VARCHAR(200) NOT NULL DEFAULT '',
  `mj_view_yn` ENUM('Y','N') NOT NULL DEFAULT 'Y',
  `mj_rdate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`mj_uid`),
  KEY `idx_mj_date` (`mj_view_yn`, `mj_date_key`),
  KEY `idx_mj_rdate` (`mj_rdate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='실시간 동행·오픈조인 모집';

-- 5. 파트너사 현장 LIVE 스토리 테이블
CREATE TABLE IF NOT EXISTS `od_mokta_story` (
  `ms_uid` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `ms_pid` VARCHAR(50) NOT NULL,
  `ms_agency` VARCHAR(100) NOT NULL,
  `ms_pcode` VARCHAR(40) NOT NULL DEFAULT '',
  `ms_prod_name` VARCHAR(160) NOT NULL DEFAULT '',
  `ms_price` VARCHAR(40) NOT NULL DEFAULT '쿠폰특가 적용',
  `ms_cat` VARCHAR(40) NOT NULL DEFAULT '은하수·스냅',
  `ms_badge` VARCHAR(50) NOT NULL DEFAULT '현장 LIVE',
  `ms_title` VARCHAR(200) NOT NULL,
  `ms_img` VARCHAR(255) NOT NULL,
  `ms_tip` VARCHAR(255) NOT NULL DEFAULT '',
  `ms_view_yn` ENUM('Y','N') NOT NULL DEFAULT 'Y',
  `ms_rdate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ms_uid`),
  KEY `idx_ms_cat_rdate` (`ms_view_yn`, `ms_cat`, `ms_rdate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='파트너 현장 LIVE 스토리';

-- 6. 신규 파트너 & MOKTA 회원사 입점신청 접수 테이블 (비로그인/일반고객 화면 버튼 연동)
CREATE TABLE IF NOT EXISTS `od_mokta_onboard` (
  `mo_uid` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `mo_company` VARCHAR(120) NOT NULL COMMENT '신청 여행사명',
  `mo_mokta_yn` ENUM('Y','N') NOT NULL DEFAULT 'Y' COMMENT 'MOKTA 정회원 여부',
  `mo_contact` VARCHAR(120) NOT NULL COMMENT '담당자 연락처 및 카카오톡 ID',
  `mo_member_id` VARCHAR(60) NOT NULL DEFAULT '' COMMENT '권한 부여 희망 부럽 회원 ID',
  `mo_desc` TEXT DEFAULT NULL COMMENT '보유 차량·캠프 및 주력 코스 소개',
  `mo_ip` VARCHAR(45) NOT NULL DEFAULT '',
  `mo_status` ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `mo_approved_by` VARCHAR(60) NOT NULL DEFAULT '',
  `mo_approved_at` DATETIME DEFAULT NULL,
  `mo_rdate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`mo_uid`),
  KEY `idx_mo_status_rdate` (`mo_status`, `mo_rdate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='신규 파트너 입점신청 관리';
