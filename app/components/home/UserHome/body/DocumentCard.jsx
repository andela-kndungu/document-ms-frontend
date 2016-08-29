import React from 'react';
import {
  Card,
  CardActions,
  CardHeader,
  CardTitle,
  CardText
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import moment from 'moment';
import request from 'superagent';
import {
  Editor,
  EditorState,
  convertFromRaw,
  convertToRaw
} from 'draft-js';

import { fetchDocuments } from '../../../../redux/actions';
import store from '../../../../redux/store';
import socket from '../../../../socket';

const cardStyle = {
  width: '350px',
  margin: '20px',
  float: 'left'
};

const cardHeaderStyle = {
  fontSize: '15px',
  cursor: 'pointer'
};

// Called when delete button of document card is clicked
const deleteDocument = (documentId) => {
  request
    .delete(`api/documents/${documentId}`)
    .set('x-access-token', localStorage.getItem('token'))
    .end((error) => {
      if (error) {
        return null;
      }

      socket.emit('fetchDocuments');
    });
};

// Called when user updates their document then removes focus from the card
const updateDocument = (data, documentId) => {
  request
    .put(`api/documents/${documentId}`)
    .send(data)
    .set('x-access-token', localStorage.getItem('token'))
    .end((error) => {
      if (error) {
        return null;
      }

      return null;
    });
};

class DocumentCard extends React.Component {
  constructor(props) {
    super(props);

    // Convert JSON strings into objects before passing to EditorState
    const titleState = convertFromRaw(JSON.parse(props.title));
    const contentState = convertFromRaw(JSON.parse(props.content));

    console.log(titleState.getPlainText());
    // Pass the objects to EditorState to display the text and any formatting
    this.state = {
      titleState: EditorState.createWithContent(titleState),
      contentState: EditorState.createWithContent(contentState),
    };

    // So that `this` works as expected inside the functions
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
  }

  onTitleChange(titleState) {
    // Only allow the user to type if they can edit the document
    if (this.props.canDelete) {
      this.setState({ titleState });
    } else {
      return null;
    }
  }

  onContentChange(contentState) {
    // Only allow the user to type if they can edit the document
    if (this.props.canDelete) {
      this.setState({ contentState });
    } else {
      return null;
    }
  }

  render() {
    return (
      <Card style={cardStyle}>
        <CardHeader
          style={cardHeaderStyle}
          title={this.props.owner.username}
          subtitle={
            <div style={{ fontSize: '11px' }}>
              <div>{moment(this.props.date).format('Do MMMM YYYY')}</div>
              <div>{moment(this.props.date).format('h:mm:ss a')}</div>
            </div>
          }
          avatar={this.props.owner.photo}
          onTouchTap={() => {
            // Show all the documents belonging to the username in header
            const token = localStorage.getItem('token');
            const username = this.props.owner.username;
            fetchDocuments(token, username, (action) => {
              store.dispatch(action);
            });
          }}
        />
        <CardTitle
          title={
            <Editor
              editorState={this.state.titleState}
              onChange={this.onTitleChange}
              onBlur={() => {
                if (this.props.canDelete) {
                  // Convert editor state from object to string for storage
                  const title = convertToRaw(this.state.titleState.getCurrentContent());
                  const titleString = JSON.stringify(title);

                  // Send update to db
                  updateDocument({ title: titleString }, this.props.documentId);
                } else {
                  return null;
                }
              }}
            />
          }
          actAsExpander
          style={{ paddingTop: '0px', paddingBottom: '0px' }}
        />
        <CardText expandable>
          <div>
            <div style={{ fontWeight: '300' }}>
              <Editor
                editorState={this.state.contentState}
                onChange={this.onContentChange}
                onBlur={() => {
                  if (this.props.canDelete) {
                    // Convert editor state from object to string for storage
                    const content = convertToRaw(this.state.contentState.getCurrentContent());
                    const contentString = JSON.stringify(content);

                    // Send update to db
                    updateDocument({ content: contentString }, this.props.documentId);
                  } else {
                    return null;
                  }
                }}
              />
            </div>
          </div>
        </CardText>
        <CardActions style={{ textAlign: 'right' }}>
          <Chip
            style={{
              float: 'left',
              marginBottom: '12px',
              marginLeft: '7px',
              backgroundColor: this.props.isPublic ? 'lightgreen' : 'lightblue'
            }}
            onTouchTap={() => {
              // Only show documents with this cards tag
              const token = localStorage.getItem('token');
              const tag = this.props.tag;
              fetchDocuments(token, { tag }, (action) => {
                store.dispatch(action);
              });
            }}
          >
            {this.props.tag}
          </Chip>
          <FlatButton
            label="Delete"
            secondary
            disabled={!this.props.canDelete}
            onTouchTap={(event) => {
              event.preventDefault();
              deleteDocument(this.props.documentId);
            }}
          />
        </CardActions>
      </Card>
    );
  }
}

DocumentCard.propTypes = {
  canDelete: React.PropTypes.bool,
  content: React.PropTypes.string,
  date: React.PropTypes.string,
  documentId: React.PropTypes.string,
  isPublic: React.PropTypes.bool,
  owner: React.PropTypes.obj,
  tag: React.PropTypes.string,
  title: React.PropTypes.string,
};

export default DocumentCard;

