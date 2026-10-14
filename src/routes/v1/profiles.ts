import { Router } from 'express';

import { list, show, create, edit, destroy } from 'controllers/profiles';
import { checkJwt } from 'middleware/checkJwt';

const router = Router();

router.get('/', list);

router.get('/:login', show);

router.post('/', [checkJwt], create);

router.patch('/:login', [checkJwt], edit);

router.delete('/:login', [checkJwt], destroy);

export default router;
