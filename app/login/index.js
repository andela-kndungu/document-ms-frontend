import store from '../redux/store';

export const localLogin = () => {
  const token = localStorage.getItem('token');
  if (token) {
    store.dispatch({
      type: 'LOG_IN_USER_SUCCESS',
      payload: {
        token
      }
    });
  }

  return null;
};

export const oauthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
    store.dispatch({
      type: 'LOG_IN_USER_SUCCESS',
      payload: {
        token
      }
    });

    return true;
  }

  return false;
};

