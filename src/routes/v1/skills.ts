import { Router } from 'express';

import { list, show, create, edit, destroy } from 'controllers/skills';
import { checkJwt } from 'middleware/checkJwt';

const router = Router();

router.get('/', list);

router.get('/:name', show);

router.post('/', [checkJwt], create);

router.patch('/:name', [checkJwt], edit);

router.delete('/:name', [checkJwt], destroy);

export default router;
