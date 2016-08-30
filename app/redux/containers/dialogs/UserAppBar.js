import { connect } from 'react-redux';

import UserAppBar from '../../../components/home/UserHome/AppBar.jsx';

const mapStateToProps = (state) => {
  return ({
    logOutOpen: state.dialogs.getIn(['dialogs', 'logOutOpen']),
    userDetails: state.auth.get('userDetails')
  });
};

export default connect(mapStateToProps)(UserAppBar);

