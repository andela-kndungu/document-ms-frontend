import { connect } from 'react-redux';

import Home from '../../components/home/index.jsx';

const mapStateToProps = (state) => {
  return ({
    isAuthenticated: state.app.get('auth').get('isAuthenticated'),
    userDetails: state.app.get('auth').get('userDetails'),
  });
};

export default connect(mapStateToProps)(Home);

