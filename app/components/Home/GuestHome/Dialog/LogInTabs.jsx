import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';

import Icons from './LogInForm/Icons.jsx';
import Divider from './LogInForm/Divider.jsx';

import LoginForm from './LogInForm/Index.jsx';
import SignUpForm from './SignUpForm/Index.jsx';

const MyTabs = () => (
  <Tabs>
    <Tab label="LOG IN" >
      <div>
        <Icons />
        <Divider />
        <LoginForm />
      </div>
    </Tab>
    <Tab label="SIGN UP" >
      <div>
        <SignUpForm />
      </div>
    </Tab>
  </Tabs>
);

export default MyTabs;

