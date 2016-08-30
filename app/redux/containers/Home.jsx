import { connect } from 'react-redux';

import Home from '../../components/home/index.jsx';

const mapStateToProps = (state) => {
  return ({
    isAuthenticated: state.auth.get('isAuthenticated'),
    userDetails: state.auth.get('userDetails'),
  });
};

export default connect(mapStateToProps)(Home);

