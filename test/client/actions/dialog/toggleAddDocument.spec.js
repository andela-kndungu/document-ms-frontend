import { toggleAddDocument } from '../../../../app/redux/actions';
import constants from '../../../../app/redux/constants';

describe('Actions :: toggleAddDocument', () => {
  it('Returns expected object when called', () => {
    toggleAddDocument((action) => {
      (action.type).should.eql(constants.TOGGLE_ADD_DOCUMENT);
    });
  });
});

