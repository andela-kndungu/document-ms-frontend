import { toggleLogInDialog } from '../../../../app/redux/actions';
import constants from '../../../../app/redux/constants';

describe('Actions :: toggleLogInDialog', () => {
  it('Returns expected object when called', () => {
    toggleLogInDialog((action) => {
      (action.type).should.eql(constants.TOGGLE_LOG_IN);
    });
  });
});
