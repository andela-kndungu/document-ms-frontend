import { toggleLogOutDialog } from '../../../../app/redux/actions';
import constants from '../../../../app/redux/constants';

describe('Actions :: toggleLogOutDialog', () => {
  it('Returns expected object when called', () => {
    toggleLogOutDialog((action) => {
      (action.type).should.eql(constants.TOGGLE_LOG_OUT);
    });
  });
});

