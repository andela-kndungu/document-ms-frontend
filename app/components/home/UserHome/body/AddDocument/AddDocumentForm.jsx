import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import request from 'superagent';
import { List, Map } from 'immutable';
import AutoComplete from 'material-ui/AutoComplete';
import Toggle from 'material-ui/Toggle';
import { Editor, EditorState, convertToRaw } from 'draft-js';
import store from '../../../../../redux/store';
import constants from '../../../../../redux/constants';

const divStyle = {
  marginTop: '20px',
};

const fieldStyle = {
  display: 'block',
  margin: 'auto',
  width: '75%',
};

const titleStyle = {
  display: 'block',
  margin: 'auto',
  width: '75%',
  boxSizing: 'border-box',
  border: '1px solid #ddd',
  cursor: 'text',
  borderRadius: '2px',
  marginBottom: '2em',
  boxShadow: 'inset 0px 1px 8px -3px #ABABAB',
  background: '#fefefe',
  maxHeight: '30px',
  overflow: 'auto',
  paddingTop: '5px',
  paddingBottom: '10px',
  paddingLeft: '10px'
};

const contentStyle = {
  display: 'block',
  margin: 'auto',
  width: '75%',
  boxSizing: 'border-box',
  border: '1px solid #ddd',
  cursor: 'text',
  borderRadius: '2px',
  marginBottom: '2em',
  boxShadow: 'inset 0px 1px 8px -3px #ABABAB',
  background: '#fefefe',
  maxHeight: '250px',
  overflow: 'auto',
  paddingTop: '5px',
  paddingBottom: '10px',
  paddingLeft: '10px'
};

const buttonStyle = {
  display: 'block',
  margin: 'auto',
  width: '75%',
  color: '#FFFFFF',
  backgroundColor: '#607D8B',
  marginTop: '20px',
};

class AddDocumentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: '',
      public: true,
      titleState: EditorState.createEmpty(),
      contentState: EditorState.createEmpty()
    };

    this.titleChange = (titleState) => this.setState({ titleState });
    this.contentChange = (contentState) => this.setState({ contentState });

    this.createDocument = this.createDocument.bind(this);
  }

  createDocument() {
    const title = convertToRaw(this.state.titleState.getCurrentContent());
    const content = convertToRaw(this.state.contentState.getCurrentContent());
    request
      .post('api/documents')
      .send({
        title: JSON.stringify(title),
        content: JSON.stringify(content),
        category: this.state.category,
        accessibleBy: this.state.public ? ['user'] : [this.props.userDetails.get('username')]
      })
      .set('x-access-token', localStorage.getItem('token'))
      .end((error, response) => {
        if (error) {
          return null;
        }
        console.log(response.body);

        store.dispatch({ type: constants.TOGGLE_ADD_DOCUMENT });
      });
  }

  render() {
    let categories = this.props.categories.toJS();
    categories = categories.map((categoryObject) => {
      return categoryObject.title;
    });
    return (
      <div style={divStyle}>
        <div style={fieldStyle}>
          <AutoComplete
            style={{ width: '100%' }}
            floatingLabelText="Choose or create category"
            filter={AutoComplete.fuzzyFilter}
            openOnFocus
            dataSource={categories}
            onNewRequest={(chosen) => {
              this.setState({
                category: chosen
              });
            }}
            onBlur={(event) => {
              this.setState({
                category: event.target.value
              });
            }}
          />
        </div>
        <div style={fieldStyle}>
          <p>Title</p>
        </div>
        <div style={titleStyle}>
          <Editor editorState={this.state.titleState} onChange={this.titleChange} />
        </div>
        <div style={fieldStyle}>
          <p>Content</p>
        </div>
        <div style={contentStyle}>
          <Editor editorState={this.state.contentState} onChange={this.contentChange} />
        </div>
        <div style={fieldStyle}>
          <Toggle
            style={{ width: '100px', marginTop: '20px', marginBottom: '10px' }}
            label="Public"
            defaultToggled
            onToggle={() => {
              this.setState({ public: !this.state.public });
            }}
          />
        </div>
        <FlatButton
          style={buttonStyle}
          label="Add"
          onClick={this.createDocument}
        />
      </div>
    );
  }
}

AddDocumentForm.propTypes = {
  categories: React.PropTypes.instanceOf(List),
  userDetails: React.PropTypes.instanceOf(Map)
};

export default AddDocumentForm;

