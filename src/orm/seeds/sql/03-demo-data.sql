-- From the database course project: migrations/000004_lab3_demo_data.sql (users -> accounts)

INSERT INTO accounts (login, email, status, created_at, balance) VALUES
    ('anna_fullstack', 'anna.fullstack@example.com', 'ACTIVE', '2026-03-15 09:00:00', 1850.00),
    ('petra_design', 'petra.design@example.com', 'ACTIVE', '2026-03-16 10:00:00', 420.00),
    ('roman_junior', 'roman.junior@example.com', 'ACTIVE', '2026-03-17 11:00:00', 0.00),
    ('orbit_soft', 'office@orbitsoft.example', 'ACTIVE', '2026-03-18 12:00:00', 6200.00);

INSERT INTO profiles (user_login, name, type, description, country, status, created_at, updated_at) VALUES
    ('anna_fullstack', 'Anna Weber', 'INDIVIDUAL', 'Full-stack developer working with Go, PostgreSQL and TypeScript.', 'Germany', 'VERIFIED', '2026-03-15 09:10:00', '2026-04-30 12:00:00'),
    ('petra_design', 'Petra Nowak', 'INDIVIDUAL', 'Product designer creating reusable UI components in Figma.', 'Poland', 'VERIFIED', '2026-03-16 10:10:00', '2026-04-30 12:00:00'),
    ('roman_junior', 'Roman Melnyk', 'INDIVIDUAL', 'Junior JavaScript developer and QA trainee seeking a first project.', 'Ukraine', 'UNVERIFIED', '2026-03-17 11:10:00', '2026-04-30 12:00:00'),
    ('orbit_soft', 'Orbit Software GmbH', 'COMPANY', 'Software company commissioning backend, frontend and design projects.', 'Germany', 'VERIFIED', '2026-03-18 12:10:00', '2026-04-30 12:00:00');

INSERT INTO skills (name, description) VALUES
    ('Rust', 'Systems programming and performance-sensitive services.'),
    ('Python', 'Scripting, data processing and backend development.');

INSERT INTO profiles_skills (profile_login, skill_name) VALUES
    ('anna_fullstack', 'PostgreSQL'),
    ('anna_fullstack', 'Go'),
    ('anna_fullstack', 'TypeScript'),
    ('anna_fullstack', 'JavaScript'),
    ('anna_fullstack', 'Docker'),
    ('anna_fullstack', 'API Design'),
    ('anna_fullstack', 'Python'),   
    ('petra_design', 'Figma'),
    ('petra_design', 'UI/UX'),
    ('roman_junior', 'JavaScript'),
    ('roman_junior', 'QA');

-- Two diplomas at the same university must not count Anna twice.
-- Roman has a completed degree and an unfinished degree at another university.
INSERT INTO educations (id, profile_login, institution_name, specialization, start_date, finish_date) VALUES
    ('14000000-0000-0000-0000-000000000001', 'anna_fullstack', 'Technical University of Berlin', 'Computer Science, Bachelor', '2019-09-01', '2023-06-30'),
    ('14000000-0000-0000-0000-000000000002', 'anna_fullstack', 'Technical University of Berlin', 'Software Engineering, Master', '2023-09-01', '2025-06-30'),
    ('14000000-0000-0000-0000-000000000003', 'petra_design', 'Warsaw School of Design', 'Interaction Design', '2020-09-01', '2024-06-30'),
    ('14000000-0000-0000-0000-000000000004', 'roman_junior', 'Technical University of Berlin', 'Computer Science', '2021-09-01', '2025-06-30'),
    ('14000000-0000-0000-0000-000000000005', 'roman_junior', 'Lviv Polytechnic', 'Software Engineering, Master', '2025-09-01', NULL);

INSERT INTO tasks (id, customer_profile_login, title, description, budget, deadline, status, created_at, completed_at) VALUES
    ('74000000-0000-0000-0000-000000000001', 'studio_nova', 'Payment reporting API', 'Build a Go API for payment reports stored in PostgreSQL.', 1200.00, '2026-04-10', 'COMPLETED', '2026-03-20 09:00:00', '2026-04-09 18:00:00'),
    ('74000000-0000-0000-0000-000000000002', 'orbit_soft', 'Marketplace backend', 'Build and containerize a Go backend with a PostgreSQL database and REST API.', 1800.00, '2026-04-15', 'COMPLETED', '2026-03-21 09:00:00', '2026-04-14 18:00:00'),
    ('74000000-0000-0000-0000-000000000003', 'orbit_soft', 'Release dashboard', 'Build a TypeScript and JavaScript dashboard with release checks and QA scenarios.', 1400.00, '2026-04-18', 'COMPLETED', '2026-03-22 09:00:00', '2026-04-17 18:00:00'),
    ('74000000-0000-0000-0000-000000000004', 'orbit_soft', 'Mobile sync gateway', 'Implement a TypeScript REST gateway and deliver a Docker deployment.', 1100.00, '2026-04-22', 'COMPLETED', '2026-03-23 09:00:00', '2026-04-21 18:00:00'),
    ('74000000-0000-0000-0000-000000000005', 'orbit_soft', 'Landing visual refresh', 'Redesign a landing page in Figma with a clear UI and accessible navigation.', 800.00, '2026-04-25', 'COMPLETED', '2026-03-24 09:00:00', '2026-04-24 18:00:00'),
    ('74000000-0000-0000-0000-000000000006', 'orbit_soft', 'Design component library', 'Create a reusable Figma component library for the product interface.', 950.00, '2026-05-10', 'IN_PROGRESS', '2026-04-20 09:00:00', NULL),
    ('74000000-0000-0000-0000-000000000007', 'webcraft_agency', 'Android testing build', 'Prepare an Android build and a QA smoke-test checklist.', 700.00, '2026-05-12', 'IN_PROGRESS', '2026-04-21 09:00:00', NULL),
    ('74000000-0000-0000-0000-000000000008', 'content_team', 'Rust service documentation', 'Write examples and user documentation for a Rust service; Rust and copywriting skills required.', 600.00, '2026-05-15', 'OPEN', '2026-04-22 09:00:00', NULL);

-- Accepted, rejected, pending and withdrawn bids demonstrate different outcomes.
INSERT INTO task_bids (task_id, executor_profile_login, proposal_text, proposed_amount, submitted_at, status, decided_at) VALUES
    ('74000000-0000-0000-0000-000000000001', 'alex_dev', 'I will build the reporting API and database queries.', 1150.00, '2026-03-20 10:00:00', 'ACCEPTED', '2026-03-20 15:00:00'),
    ('74000000-0000-0000-0000-000000000001', 'anna_fullstack', 'I can implement the API and reporting endpoints.', 1250.00, '2026-03-20 11:00:00', 'REJECTED', '2026-03-20 15:00:00'),
    ('74000000-0000-0000-0000-000000000002', 'alex_dev', 'I will deliver the backend and Docker configuration.', 1750.00, '2026-03-21 10:00:00', 'ACCEPTED', '2026-03-21 15:00:00'),
    ('74000000-0000-0000-0000-000000000002', 'roman_junior', 'I can assist with endpoint testing.', 300.00, '2026-03-21 11:00:00', 'REJECTED', '2026-03-21 15:00:00'),
    ('74000000-0000-0000-0000-000000000003', 'anna_fullstack', 'I will implement the dashboard and test scenarios.', 1350.00, '2026-03-22 10:00:00', 'ACCEPTED', '2026-03-22 15:00:00'),
    ('74000000-0000-0000-0000-000000000003', 'roman_junior', 'I can implement JavaScript widgets.', 500.00, '2026-03-22 11:00:00', 'WITHDRAWN', '2026-03-22 12:00:00'),
    ('74000000-0000-0000-0000-000000000004', 'anna_fullstack', 'I will implement the gateway and its deployment.', 1050.00, '2026-03-23 10:00:00', 'ACCEPTED', '2026-03-23 15:00:00'),
    ('74000000-0000-0000-0000-000000000005', 'kate_design', 'I will redesign the landing page and navigation.', 780.00, '2026-03-24 10:00:00', 'ACCEPTED', '2026-03-24 15:00:00'),
    ('74000000-0000-0000-0000-000000000006', 'petra_design', 'I will prepare the component library and variants.', 920.00, '2026-04-20 10:00:00', 'ACCEPTED', '2026-04-20 15:00:00'),
    ('74000000-0000-0000-0000-000000000007', 'max_mobile', 'I will prepare a testable Android build.', 680.00, '2026-04-21 10:00:00', 'ACCEPTED', '2026-04-21 15:00:00'),
    ('74000000-0000-0000-0000-000000000008', 'roman_junior', 'I can help check the examples while learning Rust.', 350.00, '2026-04-22 10:00:00', 'PENDING', NULL);

-- Matching pairs: numeric, ISO, US, compact and named-month dates.
-- Negative cases: the keyword before the date, or no keyword on one side.
INSERT INTO reviews (id, recipient_profile_login, author_profile_login, task_id, rating, review_text, created_at) VALUES
    ('a4000000-0000-0000-0000-000000000001', 'alex_dev', 'studio_nova', '74000000-0000-0000-0000-000000000001', 3, '10.04.2026 перевірили звіт: попередні вимоги — безглуздя, реалізація працює.', '2026-04-10 10:00:00'),
    ('a4000000-0000-0000-0000-000000000002', 'studio_nova', 'alex_dev', '74000000-0000-0000-0000-000000000001', 3, '10 квітня 2026 погодили зміни: початкові обмеження були безглуздими.', '2026-04-10 11:00:00'),
    ('a4000000-0000-0000-0000-000000000003', 'alex_dev', 'orbit_soft', '74000000-0000-0000-0000-000000000002', 2, '2026-04-15T10:00:00Z обговорили реліз: безглуздий строк завадив тестуванню.', '2026-04-15 10:00:00'),
    ('a4000000-0000-0000-0000-000000000004', 'orbit_soft', 'alex_dev', '74000000-0000-0000-0000-000000000002', 2, '04/15/2026 завершили роботу: безглузда кількість термінових змін.', '2026-04-15 11:00:00'),
    ('a4000000-0000-0000-0000-000000000005', 'anna_fullstack', 'orbit_soft', '74000000-0000-0000-0000-000000000003', 3, E'20260418 перевірили панель.\nСтарі ручні перевірки — БЕЗГЛУЗДЯ.', '2026-04-18 10:00:00'),
    ('a4000000-0000-0000-0000-000000000006', 'orbit_soft', 'anna_fullstack', '74000000-0000-0000-0000-000000000003', 3, '18 April 2026 провели зустріч: безглузді обмеження прибрали.', '2026-04-18 11:00:00'),
    ('a4000000-0000-0000-0000-000000000007', 'anna_fullstack', 'orbit_soft', '74000000-0000-0000-0000-000000000004', 3, '22.04.2026 узгодили виправлення: безглуздя усунули.', '2026-04-22 10:00:00'),
    ('a4000000-0000-0000-0000-000000000008', 'orbit_soft', 'anna_fullstack', '74000000-0000-0000-0000-000000000004', 3, 'Безглуздя з вимогами остаточно усунули 22.04.2026.', '2026-04-22 11:00:00'),
    ('a4000000-0000-0000-0000-000000000009', 'kate_design', 'orbit_soft', '74000000-0000-0000-0000-000000000005', 5, '25.04.2026 отримали макети: дизайн зрозумілий і зручний.', '2026-04-25 10:00:00'),
    ('a4000000-0000-0000-0000-000000000010', 'orbit_soft', 'kate_design', '74000000-0000-0000-0000-000000000005', 3, '25-04-26 закінчили роботу: початкова палітра — безглуздя.', '2026-04-25 11:00:00');

INSERT INTO task_skills (task_id, skill_name) VALUES
    ('74000000-0000-0000-0000-000000000001', 'PostgreSQL'),
    ('74000000-0000-0000-0000-000000000001', 'Go'),
    ('74000000-0000-0000-0000-000000000001', 'API Design'),
    ('74000000-0000-0000-0000-000000000002', 'PostgreSQL'),
    ('74000000-0000-0000-0000-000000000002', 'Go'),
    ('74000000-0000-0000-0000-000000000002', 'API Design'),
    ('74000000-0000-0000-0000-000000000002', 'Docker'),
    ('74000000-0000-0000-0000-000000000003', 'TypeScript'),
    ('74000000-0000-0000-0000-000000000003', 'JavaScript'),
    ('74000000-0000-0000-0000-000000000003', 'QA'),
    ('74000000-0000-0000-0000-000000000004', 'API Design'),
    ('74000000-0000-0000-0000-000000000004', 'TypeScript'),
    ('74000000-0000-0000-0000-000000000004', 'Docker'),
    ('74000000-0000-0000-0000-000000000005', 'Figma'),
    ('74000000-0000-0000-0000-000000000005', 'UI/UX'),
    ('74000000-0000-0000-0000-000000000006', 'Figma'),
    ('74000000-0000-0000-0000-000000000006', 'UI/UX'),
    ('74000000-0000-0000-0000-000000000007', 'Android'),
    ('74000000-0000-0000-0000-000000000007', 'QA'),
    ('74000000-0000-0000-0000-000000000008', 'Rust'),
    ('74000000-0000-0000-0000-000000000008', 'Copywriting');

-- Repeated requests must not duplicate users in the INTERSECT result.
-- Pending or rejected requests still count as submitted requests.
INSERT INTO balance_top_up_requests (id, user_login, amount, payment_method, operation_date, status, submitted_at, confirmed_at) VALUES
    ('54000000-0000-0000-0000-000000000001', 'kate_design', 100.00, 'CARD', '2026-04-01 10:00:00', 'APPROVED', '2026-04-01 09:55:00', '2026-04-01 10:05:00'),
    ('54000000-0000-0000-0000-000000000002', 'ira_qa', 80.00, 'CARD', '2026-04-02 10:00:00', 'PENDING', '2026-04-02 09:55:00', NULL),
    ('54000000-0000-0000-0000-000000000003', 'anna_fullstack', 200.00, 'CARD', '2026-04-03 10:00:00', 'APPROVED', '2026-04-03 09:55:00', '2026-04-03 10:05:00'),
    ('54000000-0000-0000-0000-000000000004', 'anna_fullstack', 50.00, 'CRYPTO', '2026-04-04 10:00:00', 'PENDING', '2026-04-04 09:55:00', NULL),
    ('54000000-0000-0000-0000-000000000005', 'orbit_soft', 3000.00, 'CARD', '2026-04-05 10:00:00', 'APPROVED', '2026-04-05 09:55:00', '2026-04-05 10:05:00');

INSERT INTO withdrawal_requests (id, user_login, amount, payment_method, payment_details, status, submitted_at, confirmed_at) VALUES
    ('64000000-0000-0000-0000-000000000001', 'anna_fullstack', 150.00, 'CARD', 'Demo card ending 4455', 'APPROVED', '2026-04-20 10:00:00', '2026-04-20 12:00:00'),
    ('64000000-0000-0000-0000-000000000002', 'anna_fullstack', 75.00, 'CARD', 'Demo card ending 4455', 'PENDING', '2026-04-21 10:00:00', NULL),
    ('64000000-0000-0000-0000-000000000003', 'roman_junior', 10.00, 'CARD', 'Demo card ending 6677', 'REJECTED', '2026-04-22 10:00:00', NULL);

-- Additional cooperation records for the cascade-deletion example in task 3.
INSERT INTO chats (id, first_profile_login, second_profile_login, created_at) VALUES
    ('84000000-0000-0000-0000-000000000001', 'studio_nova', 'alex_dev', '2026-03-20 15:10:00');

INSERT INTO messages (id, chat_id, sender_profile_login, message_text, sent_at) VALUES
    ('94000000-0000-0000-0000-000000000001', '84000000-0000-0000-0000-000000000001', 'studio_nova', 'Please use the agreed API contract for payment reports.', '2026-03-20 15:15:00'),
    ('94000000-0000-0000-0000-000000000002', '84000000-0000-0000-0000-000000000001', 'alex_dev', 'I will implement the report endpoints and tests.', '2026-03-20 15:20:00');

