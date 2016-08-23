import constants from '../constants';


const toggleLogInDialog = (callback) => {
  return callback({
    type: constants.TOGGLE_LOG_IN
  });
};

export { toggleLogInDialog };

