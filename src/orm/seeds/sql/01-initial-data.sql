-- From the database course project: migrations/000002_initial_data.sql (users -> accounts)

-- Moderators
INSERT INTO moderators (login, created_at, name) VALUES
    ('mod_anna', '2026-01-05 09:00:00', 'Anna Petrova'),
    ('mod_ivan', '2026-01-07 10:30:00', 'Ivan Sokolov'),
    ('mod_maria', '2026-01-10 14:20:00', 'Maria Volkova');

-- Users
INSERT INTO accounts (login, email, status, password_changed_at, created_at, balance) VALUES
    ('alex_dev', 'alex.dev@example.com', 'ACTIVE', '2026-02-01 12:00:00', '2026-01-15 09:10:00', 1250.50),
    ('studio_nova', 'contact@studionova.example', 'ACTIVE', '2026-02-03 16:30:00', '2026-01-16 11:25:00', 8500.00),
    ('kate_design', 'kate.design@example.com', 'ACTIVE', '2026-02-10 08:45:00', '2026-01-20 13:40:00', 640.75),
    ('denis_copy', 'denis.copy@example.com', 'KYC_NOT_VERIFIED', NULL, '2026-01-22 18:05:00', 120.00),
    ('webcraft_agency', 'hello@webcraft.example', 'ACTIVE', '2026-02-12 19:00:00', '2026-01-25 10:00:00', 15300.25),
    ('olga_pm', 'olga.pm@example.com', 'EMAIL_NOT_VERIFIED', NULL, '2026-01-28 15:30:00', 0.00),
    ('max_mobile', 'max.mobile@example.com', 'ACTIVE', '2026-02-18 21:15:00', '2026-02-01 12:45:00', 2400.00),
    ('fintech_lab', 'office@fintechlab.example', 'SUSPENDED', '2026-02-20 09:30:00', '2026-02-04 08:30:00', 450.00),
    ('ira_qa', 'ira.qa@example.com', 'ACTIVE', '2026-03-01 10:10:00', '2026-02-08 17:50:00', 980.00),
    ('content_team', 'team@content.example', 'LOGIN_LOCKED', '2026-03-03 11:11:00', '2026-02-12 09:15:00', 3000.00);

-- Profiles
INSERT INTO profiles (user_login, alt_name, name, type, description, country, status, created_at, updated_at) VALUES
    ('alex_dev', 'Alex Backend', 'Alex Developer', 'INDIVIDUAL', 'Backend developer specializing in PostgreSQL, Go and API integrations.', 'Germany', 'VERIFIED', '2026-01-15 09:20:00', '2026-03-05 12:00:00'),
    ('studio_nova', 'Nova Studio', 'Studio Nova GmbH', 'COMPANY', 'Small digital studio creating websites, dashboards and brand systems.', 'Germany', 'VERIFIED', '2026-01-16 11:40:00', '2026-03-01 10:00:00'),
    ('kate_design', 'Kate UI', 'Kate Morozova', 'INDIVIDUAL', 'UI/UX designer focused on clean web and mobile interfaces.', 'Poland', 'VERIFIED', '2026-01-20 14:00:00', '2026-02-26 15:15:00'),
    ('denis_copy', 'Den Copy', 'Denis Orlov', 'INDIVIDUAL', 'Copywriter for landing pages, product descriptions and support texts.', 'Ukraine', 'UNVERIFIED', '2026-01-22 18:20:00', '2026-01-22 18:20:00'),
    ('webcraft_agency', 'WebCraft', 'WebCraft Agency LLC', 'COMPANY', 'Agency building commercial websites, CRM systems and automation tools.', 'Netherlands', 'VERIFIED', '2026-01-25 10:10:00', '2026-03-09 09:45:00'),
    ('olga_pm', 'Olga PM', 'Olga Nikolaeva', 'INDIVIDUAL', 'Project manager helping teams plan releases and organize communication.', 'Latvia', 'UNVERIFIED', '2026-01-28 15:45:00', '2026-01-28 15:45:00'),
    ('max_mobile', 'Max Android', 'Maxim Kovalenko', 'INDIVIDUAL', 'Mobile developer working with Android, Kotlin and cross-platform integrations.', 'Czech Republic', 'VERIFIED', '2026-02-01 13:00:00', '2026-03-10 13:00:00'),
    ('fintech_lab', 'FinTech Lab', 'FinTech Lab OÜ', 'COMPANY', 'Prototype team for payment dashboards and financial automation.', 'Estonia', 'UNVERIFIED', '2026-02-04 08:45:00', '2026-02-25 16:00:00'),
    ('ira_qa', 'Ira QA', 'Irina Smirnova', 'INDIVIDUAL', 'Manual and automation QA engineer for web applications.', 'Lithuania', 'VERIFIED', '2026-02-08 18:05:00', '2026-03-11 11:30:00'),
    ('content_team', 'Content Team', 'Content Team s.r.o.', 'COMPANY', 'Team producing technical articles, documentation and product content.', 'Slovakia', 'UNVERIFIED', '2026-02-12 09:30:00', '2026-02-12 09:30:00');

-- Skills
INSERT INTO skills (name, description) VALUES
    ('PostgreSQL', 'Database schema design, query optimization and migrations.'),
    ('Go', 'Backend development and service tooling.'),
    ('JavaScript', 'Frontend and backend development with modern JavaScript.'),
    ('TypeScript', 'Typed application development for web systems.'),
    ('UI/UX', 'Interface design, usability and product flows.'),
    ('Copywriting', 'Commercial texts, landing pages and documentation.'),
    ('Project Management', 'Planning, communication and delivery control.'),
    ('Android', 'Native Android application development.'),
    ('QA', 'Manual testing, test cases and automation basics.'),
    ('Figma', 'Interface mockups, prototypes and design systems.'),
    ('Docker', 'Containerization and deployment workflows.'),
    ('API Design', 'REST API planning, documentation and integration.');

-- Profile skills
INSERT INTO profiles_skills (profile_login, skill_name) VALUES
    ('alex_dev', 'PostgreSQL'),
    ('alex_dev', 'Go'),
    ('alex_dev', 'Docker'),
    ('alex_dev', 'API Design'),
    ('studio_nova', 'JavaScript'),
    ('studio_nova', 'TypeScript'),
    ('studio_nova', 'UI/UX'),
    ('studio_nova', 'Figma'),
    ('kate_design', 'UI/UX'),
    ('kate_design', 'Figma'),
    ('denis_copy', 'Copywriting'),
    ('webcraft_agency', 'JavaScript'),
    ('webcraft_agency', 'TypeScript'),
    ('webcraft_agency', 'Docker'),
    ('olga_pm', 'Project Management'),
    ('max_mobile', 'Android'),
    ('max_mobile', 'API Design'),
    ('fintech_lab', 'PostgreSQL'),
    ('fintech_lab', 'API Design'),
    ('ira_qa', 'QA'),
    ('ira_qa', 'JavaScript'),
    ('content_team', 'Copywriting'),
    ('content_team', 'Project Management');

-- Educations
INSERT INTO educations (id, profile_login, institution_name, specialization, start_date, finish_date, description) VALUES
    ('10000000-0000-0000-0000-000000000001', 'alex_dev', 'Technical University of Berlin', 'Software Engineering', '2018-09-01', '2022-06-30', 'Focused on backend systems and databases.'),
    ('10000000-0000-0000-0000-000000000002', 'kate_design', 'Warsaw School of Design', 'Digital Product Design', '2019-09-01', '2023-06-15', 'Studied UX research, visual systems and prototyping.'),
    ('10000000-0000-0000-0000-000000000003', 'denis_copy', 'Kyiv National University', 'Journalism', '2017-09-01', '2021-06-30', 'Focused on media writing and editing.'),
    ('10000000-0000-0000-0000-000000000004', 'olga_pm', 'Riga Business School', 'Project Management', '2016-09-01', '2020-06-20', 'Studied business processes and team management.'),
    ('10000000-0000-0000-0000-000000000005', 'max_mobile', 'Czech Technical University', 'Computer Science', '2017-09-01', '2021-06-30', 'Focused on mobile systems and distributed applications.'),
    ('10000000-0000-0000-0000-000000000006', 'ira_qa', 'Vilnius Tech', 'Information Systems', '2018-09-01', '2022-06-30', 'Studied software testing and information systems.');

-- Portfolio projects
INSERT INTO portfolio_projects (id, name, description, project_url, profile_login, created_at) VALUES
    ('20000000-0000-0000-0000-000000000001', 'Payment API Gateway', 'Backend gateway for payment request processing and transaction logs.', 'https://example.com/projects/payment-api', 'alex_dev', '2026-02-01 12:30:00'),
    ('20000000-0000-0000-0000-000000000002', 'SaaS Landing Page', 'Landing page and onboarding flow for a subscription product.', 'https://example.com/projects/saas-landing', 'studio_nova', '2026-02-03 15:00:00'),
    ('20000000-0000-0000-0000-000000000003', 'Mobile Banking Concept', 'UI concept for a banking application with card management screens.', 'https://example.com/projects/banking-ui', 'kate_design', '2026-02-05 09:40:00'),
    ('20000000-0000-0000-0000-000000000004', 'Product Documentation Rewrite', 'Rewritten help center articles and onboarding emails.', 'https://example.com/projects/docs-rewrite', 'denis_copy', '2026-02-07 11:15:00'),
    ('20000000-0000-0000-0000-000000000005', 'CRM Automation', 'Internal CRM automation for lead tracking and manager notifications.', 'https://example.com/projects/crm-automation', 'webcraft_agency', '2026-02-09 14:30:00'),
    ('20000000-0000-0000-0000-000000000006', 'Android Courier App', 'Android app prototype for courier task management.', 'https://example.com/projects/courier-android', 'max_mobile', '2026-02-11 10:20:00'),
    ('20000000-0000-0000-0000-000000000007', 'Regression Checklist', 'QA checklist and smoke test plan for a marketplace release.', 'https://example.com/projects/qa-checklist', 'ira_qa', '2026-02-13 16:00:00');

-- Verification requests
INSERT INTO verification_requests (
    id,
    reviewed_by_login,
    profile_login,
    profile_type,
    verification_kind,
    submitted_date,
    reviewed_date,
    comment,
    status,
    birth_or_registration_date,
    name,
    document_or_registration_number,
    country
) VALUES
    ('30000000-0000-0000-0000-000000000001', 'mod_anna', 'alex_dev', 'INDIVIDUAL', 'IDENTITY_DOCUMENT', '2026-01-16 10:00:00', '2026-01-17 12:00:00', 'Documents match the profile data.', 'APPROVED', '1998-04-12', 'Alex Developer', 'ID-DE-100001', 'Germany'),
    ('30000000-0000-0000-0000-000000000002', 'mod_ivan', 'studio_nova', 'COMPANY', 'COMPANY_REGISTRY', '2026-01-17 09:30:00', '2026-01-18 16:20:00', 'Company registry record confirmed.', 'APPROVED', '2020-03-10', 'Studio Nova GmbH', 'HRB-2020-4455', 'Germany'),
    ('30000000-0000-0000-0000-000000000003', NULL, 'denis_copy', 'INDIVIDUAL', 'IDENTITY_DOCUMENT', '2026-01-23 11:10:00', NULL, 'Awaiting manual review.', 'PENDING', '1997-08-21', 'Denis Orlov', 'ID-UA-883102', 'Ukraine'),
    ('30000000-0000-0000-0000-000000000004', 'mod_maria', 'fintech_lab', 'COMPANY', 'COMPANY_REGISTRY', '2026-02-05 13:15:00', '2026-02-06 09:40:00', 'Provided registry number does not match submitted company name.', 'REJECTED', '2022-11-01', 'FinTech Lab OÜ', 'EE-REG-550012', 'Estonia'),
    ('30000000-0000-0000-0000-000000000005', 'mod_anna', 'max_mobile', 'INDIVIDUAL', 'IDENTITY_DOCUMENT', '2026-02-02 10:00:00', '2026-02-03 10:30:00', 'Identity confirmed.', 'APPROVED', '1996-02-14', 'Maxim Kovalenko', 'ID-CZ-770014', 'Czech Republic');

-- Account deletion requests
INSERT INTO account_deletion_requests (
    id,
    user_login,
    reason,
    status,
    submitted_at,
    reviewed_at,
    reviewed_by_login,
    review_comment
) VALUES
    ('40000000-0000-0000-0000-000000000001', 'olga_pm', 'I no longer need the account for project work.', 'PENDING', '2026-03-01 09:00:00', NULL, NULL, NULL),
    ('40000000-0000-0000-0000-000000000002', 'content_team', 'Company account was created for testing and should be removed.', 'REJECTED', '2026-03-02 12:45:00', '2026-03-03 10:10:00', 'mod_ivan', 'Account has active financial operations and cannot be deleted yet.'),
    ('40000000-0000-0000-0000-000000000003', 'denis_copy', 'I want to close the profile and export my data.', 'CANCELLED', '2026-03-04 17:20:00', '2026-03-05 09:25:00', 'mod_anna', 'User cancelled the request after support clarification.');

-- Balance top-up requests
INSERT INTO balance_top_up_requests (
    id,
    user_login,
    amount,
    payment_method,
    operation_date,
    external_transaction_number,
    status,
    submitted_at,
    confirmed_at
) VALUES
    ('50000000-0000-0000-0000-000000000001', 'studio_nova', 5000.00, 'CARD', '2026-02-01 10:30:00', 'CARD-TX-100001', 'APPROVED', '2026-02-01 10:25:00', '2026-02-01 10:31:00'),
    ('50000000-0000-0000-0000-000000000002', 'webcraft_agency', 12000.00, 'CRYPTO', '2026-02-02 15:00:00', 'CRYPTO-TX-778812', 'APPROVED', '2026-02-02 14:55:00', '2026-02-02 15:30:00'),
    ('50000000-0000-0000-0000-000000000003', 'alex_dev', 350.50, 'CARD', '2026-02-05 18:10:00', 'CARD-TX-100045', 'APPROVED', '2026-02-05 18:08:00', '2026-02-05 18:11:00'),
    ('50000000-0000-0000-0000-000000000004', 'fintech_lab', 900.00, 'CRYPTO', '2026-02-07 11:40:00', 'CRYPTO-TX-778899', 'REJECTED', '2026-02-07 11:35:00', NULL),
    ('50000000-0000-0000-0000-000000000005', 'content_team', 3000.00, 'CARD', '2026-02-10 09:00:00', 'CARD-TX-100091', 'PENDING', '2026-02-10 08:58:00', NULL);

-- Withdrawal requests
INSERT INTO withdrawal_requests (
    id,
    user_login,
    amount,
    payment_method,
    payment_details,
    external_transaction_number,
    status,
    submitted_at,
    confirmed_at
) VALUES
    ('60000000-0000-0000-0000-000000000001', 'alex_dev', 200.00, 'CARD', 'Card ending 1122', 'WD-CARD-200001', 'APPROVED', '2026-02-20 12:00:00', '2026-02-20 14:00:00'),
    ('60000000-0000-0000-0000-000000000002', 'kate_design', 150.00, 'CARD', 'Card ending 3344', 'WD-CARD-200002', 'APPROVED', '2026-02-21 13:15:00', '2026-02-21 14:20:00'),
    ('60000000-0000-0000-0000-000000000003', 'denis_copy', 50.00, 'CRYPTO', 'USDT wallet ending A91F', NULL, 'PENDING', '2026-02-22 10:05:00', NULL),
    ('60000000-0000-0000-0000-000000000004', 'ira_qa', 300.00, 'CARD', 'Card ending 9988', 'WD-CARD-200004', 'REJECTED', '2026-02-24 16:40:00', NULL);

-- Tasks
INSERT INTO tasks (
    id,
    customer_profile_login,
    title,
    description,
    budget,
    deadline,
    status,
    created_at,
    completed_at
) VALUES
    ('70000000-0000-0000-0000-000000000001', 'studio_nova', 'Build PostgreSQL schema review report', 'Review the existing database schema and prepare a short report with risky relations and suggested indexes.', 450.00, '2026-03-15', 'COMPLETED', '2026-02-15 10:00:00', '2026-02-25 18:00:00'),
    ('70000000-0000-0000-0000-000000000002', 'webcraft_agency', 'Create landing page design', 'Design a responsive landing page for a B2B SaaS product with pricing and contact blocks.', 900.00, '2026-03-20', 'IN_PROGRESS', '2026-02-18 11:30:00', NULL),
    ('70000000-0000-0000-0000-000000000003', 'fintech_lab', 'Prototype Android payment dashboard', 'Create an Android prototype for transaction overview and payment status tracking.', 1300.00, '2026-03-28', 'OPEN', '2026-02-20 13:00:00', NULL),
    ('70000000-0000-0000-0000-000000000004', 'content_team', 'Write documentation for API endpoints', 'Prepare concise documentation for authentication, payments and task management endpoints.', 600.00, '2026-03-18', 'OPEN', '2026-02-22 15:45:00', NULL),
    ('70000000-0000-0000-0000-000000000005', 'studio_nova', 'QA checklist for release', 'Prepare smoke and regression checklist for a web release.', 350.00, '2026-03-12', 'COMPLETED', '2026-02-24 09:25:00', '2026-03-05 12:30:00'),
    ('70000000-0000-0000-0000-000000000006', 'webcraft_agency', 'Docker deployment cleanup', 'Audit Docker Compose setup and propose cleanup for volumes, networks and service naming.', 500.00, '2026-03-25', 'CANCELLED', '2026-02-27 17:00:00', NULL);

-- Task bids
INSERT INTO task_bids (
    task_id,
    executor_profile_login,
    proposal_text,
    proposed_amount,
    submitted_at,
    status,
    decided_at
) VALUES
    ('70000000-0000-0000-0000-000000000001', 'alex_dev', 'I can review the schema, FK behavior and produce a clean report.', 420.00, '2026-02-15 11:00:00', 'ACCEPTED', '2026-02-15 15:00:00'),
    ('70000000-0000-0000-0000-000000000001', 'ira_qa', 'I can check the schema from a testing and data consistency perspective.', 390.00, '2026-02-15 12:10:00', 'REJECTED', '2026-02-15 15:05:00'),
    ('70000000-0000-0000-0000-000000000002', 'kate_design', 'I will create desktop and mobile layouts in Figma.', 870.00, '2026-02-18 12:00:00', 'ACCEPTED', '2026-02-18 16:30:00'),
    ('70000000-0000-0000-0000-000000000002', 'studio_nova', 'We can support design system preparation if needed.', 950.00, '2026-02-18 14:40:00', 'WITHDRAWN', '2026-02-19 09:10:00'),
    ('70000000-0000-0000-0000-000000000003', 'max_mobile', 'I can make the Android prototype with mock screens and navigation.', 1250.00, '2026-02-20 14:00:00', 'PENDING', NULL),
    ('70000000-0000-0000-0000-000000000003', 'alex_dev', 'I can help with backend mock API for the prototype.', 500.00, '2026-02-20 15:20:00', 'PENDING', NULL),
    ('70000000-0000-0000-0000-000000000004', 'denis_copy', 'I will write clear endpoint documentation and examples.', 580.00, '2026-02-22 16:20:00', 'PENDING', NULL),
    ('70000000-0000-0000-0000-000000000004', 'content_team', 'Our team can prepare documentation and review terminology.', 620.00, '2026-02-22 17:30:00', 'PENDING', NULL),
    ('70000000-0000-0000-0000-000000000005', 'ira_qa', 'I will prepare the release checklist and smoke tests.', 330.00, '2026-02-24 10:00:00', 'ACCEPTED', '2026-02-24 13:15:00'),
    ('70000000-0000-0000-0000-000000000006', 'alex_dev', 'I can audit the Compose setup and document cleanup steps.', 480.00, '2026-02-27 18:00:00', 'REJECTED', '2026-02-28 10:00:00');

-- Chats
INSERT INTO chats (id, first_profile_login, second_profile_login, created_at) VALUES
    ('80000000-0000-0000-0000-000000000001', 'studio_nova', 'alex_dev', '2026-02-15 15:10:00'),
    ('80000000-0000-0000-0000-000000000002', 'webcraft_agency', 'kate_design', '2026-02-18 16:40:00'),
    ('80000000-0000-0000-0000-000000000003', 'fintech_lab', 'max_mobile', '2026-02-20 14:20:00'),
    ('80000000-0000-0000-0000-000000000004', 'content_team', 'denis_copy', '2026-02-22 18:00:00'),
    ('80000000-0000-0000-0000-000000000005', 'studio_nova', 'ira_qa', '2026-02-24 13:30:00');

-- Messages
INSERT INTO messages (chat_id, sender_profile_login, message_text, sent_at) VALUES
    ('80000000-0000-0000-0000-000000000001', 'studio_nova', 'Hello, we accepted your bid for the schema review task.', '2026-02-15 15:12:00'),
    ('80000000-0000-0000-0000-000000000001', 'alex_dev', 'Thanks. I will start with tables, keys and deletion behavior.', '2026-02-15 15:20:00'),
    ('80000000-0000-0000-0000-000000000001', 'alex_dev', 'I found a few places where indexes and FK actions should be reviewed.', '2026-02-20 11:45:00'),
    ('80000000-0000-0000-0000-000000000002', 'webcraft_agency', 'Please use a clean layout with pricing and contact sections.', '2026-02-18 16:42:00'),
    ('80000000-0000-0000-0000-000000000002', 'kate_design', 'I will prepare the first Figma draft tomorrow.', '2026-02-18 17:05:00'),
    ('80000000-0000-0000-0000-000000000003', 'fintech_lab', 'We need the prototype to show transaction list and payment details.', '2026-02-20 14:25:00'),
    ('80000000-0000-0000-0000-000000000003', 'max_mobile', 'I can build the navigation and mock screens first.', '2026-02-20 14:35:00'),
    ('80000000-0000-0000-0000-000000000004', 'content_team', 'Can you write API docs in a concise style?', '2026-02-22 18:05:00'),
    ('80000000-0000-0000-0000-000000000004', 'denis_copy', 'Yes, I can include examples for each endpoint.', '2026-02-22 18:12:00'),
    ('80000000-0000-0000-0000-000000000005', 'studio_nova', 'We accepted your QA checklist bid.', '2026-02-24 13:35:00'),
    ('80000000-0000-0000-0000-000000000005', 'ira_qa', 'Great, I will send the checklist by March 4.', '2026-02-24 13:50:00');

-- Reviews
INSERT INTO reviews (
    id,
    recipient_profile_login,
    author_profile_login,
    task_id,
    rating,
    review_text,
    created_at
) VALUES
    ('a0000000-0000-0000-0000-000000000001', 'alex_dev', 'studio_nova', '70000000-0000-0000-0000-000000000001', 5, 'Good schema review with clear notes about constraints and risks.', '2026-02-26 10:00:00'),
    ('a0000000-0000-0000-0000-000000000002', 'studio_nova', 'alex_dev', '70000000-0000-0000-0000-000000000001', 5, 'Clear task requirements and fast communication.', '2026-02-26 10:30:00'),
    ('a0000000-0000-0000-0000-000000000003', 'ira_qa', 'studio_nova', '70000000-0000-0000-0000-000000000005', 4, 'Checklist was useful and delivered on time.', '2026-03-05 13:00:00'),
    ('a0000000-0000-0000-0000-000000000004', 'studio_nova', 'ira_qa', '70000000-0000-0000-0000-000000000005', 5, 'Good client, clear requirements and quick replies.', '2026-03-05 13:30:00');

-- Account suspensions
INSERT INTO account_suspensions (
    id,
    user_login,
    moderator_login,
    reason,
    start_at,
    end_at,
    created_at
) VALUES
    ('b0000000-0000-0000-0000-000000000001', 'fintech_lab', 'mod_maria', 'Verification documents were rejected and suspicious activity was detected.', '2026-02-25 16:00:00', NULL, '2026-02-25 16:00:00'),
    ('b0000000-0000-0000-0000-000000000002', 'content_team', 'mod_ivan', 'Multiple failed login attempts caused temporary account lock review.', '2026-03-03 11:00:00', '2026-03-10 11:00:00', '2026-03-03 11:00:00');

