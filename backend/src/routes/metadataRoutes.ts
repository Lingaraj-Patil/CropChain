import { Router } from 'express';
import { getMetadataByCropId } from '../controllers/metadataController';

const router = Router();

router.get('/:id', getMetadataByCropId);

export default router;
