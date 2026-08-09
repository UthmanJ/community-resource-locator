import express from 'express';
import {
  getResources,
  getResourceById,
  createResource,
  deleteResource,
} from '../controllers/resourceController.js';

const router = express.Router();

router.get('/', getResources);
router.get('/:id', getResourceById);
router.post('/', createResource);
router.delete('/:id', deleteResource);

export default router;