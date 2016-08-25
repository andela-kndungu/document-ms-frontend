import { Router } from 'express';
import path from 'path';
import passport from 'passport';

import UsersController from '../../controllers/users';

const router = Router();

// Return the home page (GET /)
router.get('/', (req, res) => {
  // No need testing express' funnctions
  /* istanbul ignore next */
  res.sendFile(path.join(__dirname, '../../../public/index.html'));
});

// Create a user (POST /api/users)
router.post('/api/users', UsersController.create);

router.post('/api/users/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    // Hard to simulate errors
    /* istanbul ignore next */
    if (err) { return next(err); }
    if (!user) {
      return res.status(401).json({
        success: false,
        message: info.message
      });
    }
    req.user = user;
    UsersController.logIn.local(req, res);
  })(req, res, next);
});
// Log in with google
router.get('/api/users/login/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Callback called after google authentication
router.get('/api/users/login/auth/google/callback',
  passport.authenticate('google', {
    session: false
  }), UsersController.logIn.social);

// Log in with github
router.get('/api/users/login/auth/github', passport.authenticate('github', {
  scope: ['user:email']
}));

// Callback called after github authentication
router.get('/api/users/login/auth/github/callback',
  passport.authenticate('github', {
    session: false
  }), UsersController.logIn.social);

export default router;

