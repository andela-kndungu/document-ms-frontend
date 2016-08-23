import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

const outerDivStyle = {
  margin: 'auto',
  width: '75%',
};

const innnerDivStyle = {
  margin: 'auto',
  width: '50%',
};

const iconStyle = {
  margin: 12,
  height: '60px',
};

const Icons = () => {
  return (
    <div style={outerDivStyle}>
      <div style={innnerDivStyle}>
        <div style={{ display: 'inline' }} title="Log in with Google">
          <a href="/api/users/login/auth/google">
            <FlatButton
              icon={<FontIcon className="icon-google-plus2" />}
              style={iconStyle}
            />
          </a>
        </div>
        <div style={{ display: 'inline' }} title="Log in with GitHub">
          <a href="/api/users/login/auth/github">
            <FlatButton
              icon={<FontIcon className="icon-github" />}
              style={iconStyle}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Icons;

