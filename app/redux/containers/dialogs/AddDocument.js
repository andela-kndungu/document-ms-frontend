import { connect } from 'react-redux';

import AddDocument from '../../../components/Home/UserHome/Body/AddDocument/Index.jsx';

const mapStateToProps = (state) => {
  return ({
    addDocumentOpen: state.dialogs.getIn(['dialogs', 'addDocumentOpen'])
  });
};

export default connect(mapStateToProps)(AddDocument);

