import { Router } from 'express';

import accountDeletionRequests from './accountDeletionRequests';
import accounts from './accounts';
import accountSuspensions from './accountSuspensions';
import auth from './auth';
import balanceTopUpRequests from './balanceTopUpRequests';
import chats from './chats';
import educations from './educations';
import messages from './messages';
import moderators from './moderators';
import portfolioProjects from './portfolioProjects';
import profiles from './profiles';
import reviews from './reviews';
import skills from './skills';
import taskBids from './taskBids';
import tasks from './tasks';
import users from './users';
import verificationRequests from './verificationRequests';
import withdrawalRequests from './withdrawalRequests';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/account-deletion-requests', accountDeletionRequests);
router.use('/accounts', accounts);
router.use('/account-suspensions', accountSuspensions);
router.use('/balance-top-up-requests', balanceTopUpRequests);
router.use('/chats', chats);
router.use('/educations', educations);
router.use('/messages', messages);
router.use('/moderators', moderators);
router.use('/portfolio-projects', portfolioProjects);
router.use('/profiles', profiles);
router.use('/reviews', reviews);
router.use('/skills', skills);
router.use('/task-bids', taskBids);
router.use('/tasks', tasks);
router.use('/verification-requests', verificationRequests);
router.use('/withdrawal-requests', withdrawalRequests);

export default router;
