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

const deleteDocument = (documentId) => {
  request
    .delete(`api/documents/${documentId}`)
    .set('x-access-token', localStorage.getItem('token'))
    .end((error) => {
      if (error) {
        return null;
      }

      return null;
    });
};

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
    const titleState = convertFromRaw(JSON.parse(props.title));
    const contentState = convertFromRaw(JSON.parse(props.content));

    this.state = {
      titleState: EditorState.createWithContent(titleState),
      contentState: EditorState.createWithContent(contentState),
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
  }

  onTitleChange(titleState) {
    if (this.props.canDelete) {
      this.setState({ titleState });
    } else {
      return null;
    }
  }

  onContentChange(contentState) {
    if (this.props.canDelete) {
      this.setState({ contentState });
    } else {
      return null;
    }
  }

  render() {
    return (
      <Card style={{ width: '350px', margin: '20px', float: 'left' }}>
        <CardHeader
          style={{ fontSize: '15px', cursor: 'pointer' }}
          title={this.props.owner.username}
          subtitle={
            <div style={{ fontSize: '11px'  }}>
              <div>{moment(this.props.date).format('Do MMMM YYYY')}</div>
              <div>{moment(this.props.date).format('h:mm:ss a')}</div>
            </div>
            }
            avatar={this.props.owner.photo}
            onTouchTap={() => {
              fetchDocuments({ username: this.props.owner.username }, (action) => {
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
                    const title = convertToRaw(this.state.titleState.getCurrentContent());
                    const titleString = JSON.stringify(title);
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
                        const content = convertToRaw(this.state.contentState.getCurrentContent());
                        const contentString = JSON.stringify(content);
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
                  fetchDocuments({ category: this.props.category }, (action) => {
                    store.dispatch(action);
                  });
                }}
              >
                {this.props.category}
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
  date: React.PropTypes.string,
  title: React.PropTypes.string,
  content: React.PropTypes.string,
  canDelete: React.PropTypes.bool,
  isPublic: React.PropTypes.bool,
  category: React.PropTypes.string,
  documentId: React.PropTypes.string,
};

export default DocumentCard;

