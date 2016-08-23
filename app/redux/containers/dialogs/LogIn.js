import { connect } from 'react-redux';

import LogInDialog from '../../../components/GuestHome/Dialog/Index.jsx';

const mapStateToProps = (state) => {
  return ({
    logInOpen: state.getIn(['dialogs', 'logInOpen'])
  });
};

export default connect(mapStateToProps)(LogInDialog);

