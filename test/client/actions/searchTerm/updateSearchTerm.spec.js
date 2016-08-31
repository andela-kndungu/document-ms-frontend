import { updateSearchTerm } from '../../../../app/redux/actions';
import constants from '../../../../app/redux/constants';

describe('Actions :: updateSearchTerm', () => {
  it('Returns expected object when called', () => {
    updateSearchTerm('the search term', (action) => {
      (action.type).should.equal(constants.UPDATE_SEARCH_TERM);
      (action.payload).should.equal('the search term');
    });
  });
});

