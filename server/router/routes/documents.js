import { Router } from 'express';

import DocumentsController from '../../controllers/documents/index.js';

const router = Router();

// Create a document (POST /documents)
router.post('/', DocumentsController.create);

// Fetch document by ID (GET /documents/id)
router.get('/:id', DocumentsController.find.id);

// Fetch all documents (GET /documents)
router.get('/', DocumentsController.find.all);

// Update document by ID (PUT /documents/id)
router.put('/:id', DocumentsController.update);

// Delete document by id (DELETE /documents/id)
router.delete('/:id', DocumentsController.destroy);

export default router;

