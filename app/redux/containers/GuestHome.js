import { connect } from 'react-redux';

import GuestHome from '../../components/home/GuestHome.jsx';

const mapStateToProps = (state) => {
  return ({
    documents: state.app.get('documents')
  });
};

export default connect(mapStateToProps)(GuestHome);

