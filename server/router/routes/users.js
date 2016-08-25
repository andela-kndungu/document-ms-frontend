import { Router } from 'express';
import UsersController from '../../controllers/users';

const router = Router();

// Create a user (POST /users)
router.post('/', UsersController.create);

// Fetch user by ID (GET /users/id)
router.get('/:id', UsersController.find.id);

// Fetch all users (GET /users)
router.get('/', UsersController.find.all);

// Update user by ID (PUT /users/id)
router.put('/:id', UsersController.update);

// Delete user by id (DELETE /users/id)
router.delete('/:id', UsersController.destroy);

// Fetch a user's documents (GET /users/id/documents)
router.get('/:id/documents', UsersController.find.documents);

module.exports = router;
