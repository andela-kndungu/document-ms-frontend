import { connect } from 'react-redux';

import LogInDialog from '../../../components/Home/GuestHome/Dialog/Index.jsx';

const mapStateToProps = (state) => {
  return ({
    logInOpen: state.dialogs.getIn(['dialogs', 'logInOpen'])
  });
};

export default connect(mapStateToProps)(LogInDialog);

