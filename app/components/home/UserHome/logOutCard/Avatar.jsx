import React from 'react';
import Avatar from 'material-ui/Avatar';

const imageDiv = {
  display: 'inline-block',
  margin: '5px',
  float: 'left'
};

const ProfileAvatar = (props) => {
  return (
    <div style={imageDiv}>
      <Avatar
        size={70}
        src={
          // Display photo stored in database, but have a backup as a precaution
          props.photo ||
          'https://upload.wikimedia.org/wikipedia/commons/0/07/Avatar_girl_face.png'
        }
        alt="Profile"
      />
    </div>
  );
};

ProfileAvatar.propTypes = {
  photo: React.PropTypes.string
};

export default ProfileAvatar;

