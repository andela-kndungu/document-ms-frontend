// All the various routes
import publicRoutes from './routes/public';
import usersRoutes from './routes/users';
import rolesRoutes from './routes/roles';
import tagsRoutes from './routes/tags';
import documentsRoutes from './routes/documents';

// Authentication Middleware
import authenticate from '../controllers/authenticate';

const router = (app) => {
  // Accessible without being logged in
  app.use('/', publicRoutes);

  // Protect sensitive routes
  app.use(authenticate.token);
  app.use('/users', usersRoutes);
  app.use('/roles', rolesRoutes);
  app.use('/tags', tagsRoutes);
  app.use('/api/documents', documentsRoutes);
};

export default router;

