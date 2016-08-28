import React from 'react';
import TextField from 'material-ui/TextField';

import store from '../../../redux/store';

const containerStyle = {
  width: '80%',
  maxWidth: '500px',
  margin: 'auto'

};
const hintStyle = {
  width: '100%',
  textAlign: 'center',
  color: 'rgba(255, 255, 255, 0.5)'

};

const fieldStyle = {
  width: '100%'

};

const inputStyle = {
  color: 'white',
  textAlign: 'center'

};

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.textChange = this.textChange.bind(this);
  }

  textChange(event) {
    store.dispatch({ type: 'SEARCH_DOCUMENTS', payload: event.target.value });
  }

  render() {
    return (
      <div style={containerStyle}>
        <TextField
          onChange={this.textChange}
          style={fieldStyle}
          hintText="search"
          hintStyle={hintStyle}
          inputStyle={inputStyle}
        />
      </div>
    );
  }
}

export default SearchBar;

