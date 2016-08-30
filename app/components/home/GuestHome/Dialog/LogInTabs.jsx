import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';

import Icons from './logIn/Icons.jsx';
import Divider from './logIn/Divider.jsx';

import LoginForm from './logIn/LoginForm.jsx';
import SignUpForm from './signUp/SignUpForm.jsx';

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

