import create from './create.js';
import find from './find.js';
import update from './update.js';
import logIn from './login.js';
import destroy from './destroy.js';

const UserController = {};

UserController.create = create;
UserController.find = find;
UserController.update = update;
UserController.logIn = logIn;
UserController.destroy = destroy;

export default UserController;

