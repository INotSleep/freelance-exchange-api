import { Router } from 'express';

import { list, show, create, edit, destroy } from 'controllers/taskBids';
import { checkJwt } from 'middleware/checkJwt';

const router = Router();

router.get('/', list);

router.get('/:taskId/:executorProfileLogin', show);

router.post('/', [checkJwt], create);

router.patch('/:taskId/:executorProfileLogin', [checkJwt], edit);

router.delete('/:taskId/:executorProfileLogin', [checkJwt], destroy);

export default router;
