import React from 'react';

const infoDiv = {
  display: 'inline-block',
  marginLeft: '10px'
};

const name = {
  fontSize: '18px',
  fontWeight: '500',
  marginBottom: '0px'
};

const email = {
  fontSize: '14px',
  fontWeight: '300',
  marginTop: '1px'
};

const Info = (props) => {
  return (
    <div style={infoDiv}>
      <p style={name}>{`${props.name.first} ${props.name.last}` || 'Jane Doe'}</p>
      <p style={email}>{props.email || 'janedoe@email.com'}</p>
    </div>
  );
};

Info.propTypes = {
  name: React.PropTypes.object,
  email: React.PropTypes.string
};

export default Info;

