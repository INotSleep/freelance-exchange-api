import { Router } from 'express';

import { list, show, create, edit, destroy } from 'controllers/balanceTopUpRequests';
import { checkJwt } from 'middleware/checkJwt';

const router = Router();

router.get('/', list);

router.get('/:id', show);

router.post('/', [checkJwt], create);

router.patch('/:id', [checkJwt], edit);

router.delete('/:id', [checkJwt], destroy);

export default router;
