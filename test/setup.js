import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import chaiImmutable from 'chai-immutable';

import { jsdom } from 'jsdom';

const exposedProperties = ['window', 'navigator', 'document'];
const document = jsdom('');

global.document = document;
global.window = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

chai.use(chaiImmutable);
chai.use(chaiEnzyme());
