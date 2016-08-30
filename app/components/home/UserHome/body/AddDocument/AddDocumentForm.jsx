import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import request from 'superagent';
import { List, Map } from 'immutable';
import AutoComplete from 'material-ui/AutoComplete';
import Toggle from 'material-ui/Toggle';
import { Editor, EditorState, convertToRaw } from 'draft-js';
import store from '../../../../../redux/store';
import constants from '../../../../../redux/constants';
import socket from '../../../../../socket';
import styles from './styles';

class AddDocumentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tag: '',
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
        tags: [this.state.tag],
        accessibleBy: this.state.public ? ['user'] : [this.props.userDetails.get('username')]
      })
      .set('x-access-token', localStorage.getItem('token'))
      .end((error) => {
        if (error) {
          return null;
        }

        // Document sent to server, close the dialog
        store.dispatch({ type: constants.TOGGLE_ADD_DOCUMENT });

        // For all clients to instantly view new documents and categories
        socket.emit('fetchDocuments');
        socket.emit('fetchCategories');
      });
  }

  render() {
    let tags = this.props.tags.toJS();
    tags = tags.map((categoryObject) => {
      return categoryObject.title;
    });
    return (
      <div style={styles.divStyle}>
        <div style={styles.fieldStyle}>
          <AutoComplete
            style={{ width: '100%' }}
            floatingLabelText="Choose or create category"
            filter={AutoComplete.fuzzyFilter}
            openOnFocus
            dataSource={tags}
            onNewRequest={(chosen) => {
              this.setState({
                category: chosen
              });
            }}
            onBlur={(event) => {
              this.setState({
                tag: event.target.value
              });
            }}
          />
        </div>
        <div style={styles.fieldStyle}>
          <p>Title</p>
        </div>
        <div style={styles.titleStyle}>
          <Editor editorState={this.state.titleState} onChange={this.titleChange} />
        </div>
        <div style={styles.fieldStyle}>
          <p>Content</p>
        </div>
        <div style={styles.contentStyle}>
          <Editor editorState={this.state.contentState} onChange={this.contentChange} />
        </div>
        <div style={styles.fieldStyle}>
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
          style={styles.buttonStyle}
          label="Add"
          onClick={this.createDocument}
        />
      </div>
    );
  }
}

AddDocumentForm.propTypes = {
  tags: React.PropTypes.instanceOf(List),
  userDetails: React.PropTypes.instanceOf(Map)
};

export default AddDocumentForm;

