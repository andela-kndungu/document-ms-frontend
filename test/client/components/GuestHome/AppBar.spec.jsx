import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import AppBar from '../../../../app/components/home/GuestHome/AppBar.jsx';

describe('GuestHome :: <AppBar />', () => {
  const wrapper = shallow(<AppBar />);

  it('contains the correct title', () => {
    expect(wrapper.find('AppBar')).to.have.prop('title').equal('ennovate');
  });

  it('does not contain a hamburger symbol', () => {
    const IconLeft = wrapper.find('AppBar').prop('iconElementLeft');
    const iconWrapper = shallow(IconLeft);
    expect(iconWrapper).to.contain(<span />);
    expect(wrapper.find('AppBar')).to.have.prop('title').equal('ennovate');
  });

  it('contains a log in button', () => {
    const IconRight = wrapper.find('AppBar').prop('iconElementRight');
    expect(IconRight.props.label).to.eql('LOGIN');
  });
});
