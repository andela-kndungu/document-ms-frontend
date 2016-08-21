import { Router } from 'express';
import path from 'path';

import UsersController from '../../controllers/users';

const router = Router();

// Return the home page (GET /)
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../public/index.html'));
});

// Create a user (POST /users)
router.post('/users', UsersController.create);

// Log in a user (POST /users/login)
router.post('/users/login', UsersController.login);

export default router;

