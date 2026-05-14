import { Router } from 'express';
import { authorize, protect } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import { createCrop, getCropById, getCropMetadata, listCrops, searchCrops, updateBlockchainDetails, updateTimeline, verifyCrop } from '../controllers/cropController';
import { cropSchema, timelineSchema } from '../validators/cropValidators';

const router = Router();

router.get('/', listCrops);
router.get('/:id/metadata', getCropMetadata);
router.get('/search', searchCrops);
router.get('/:id', getCropById);
router.get('/:id/verify', verifyCrop);
router.post('/', protect, authorize('farmer', 'admin'), validateBody(cropSchema), createCrop);
router.patch('/:id/timeline', protect, authorize('farmer', 'admin'), validateBody(timelineSchema), updateTimeline);
router.patch('/:id/blockchain', protect, authorize('farmer', 'admin'), updateBlockchainDetails);

export default router;
