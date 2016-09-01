import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardText
} from 'material-ui/Card';
import moment from 'moment';
import {
  convertFromRaw
} from 'draft-js';

const cardStyle = {
  width: '350px',
  margin: '20px',
  float: 'left'
};

const cardHeaderStyle = {
  fontSize: '15px',
  cursor: 'pointer'
};

const cardTitleStyle = {
  paddingTop: '0px',
  paddingBottom: '0px',
  overflow: 'auto',
  overflowWrap: 'break-word',
  height: '80px'
};

class DocumentCard extends React.Component {
  constructor(props) {
    super(props);

    // Convert JSON strings into objects before passing to EditorState
    const titleState = convertFromRaw(JSON.parse(props.title));
    const contentState = convertFromRaw(JSON.parse(props.content));

    // Pass the objects to EditorState to display the text and any formatting
    this.state = {
      titleState,
      contentState
    };
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
        />
        <CardTitle
          style={cardTitleStyle}
          title={this.state.titleState.getPlainText()}
          actAsExpander
        />
        <CardText expandable>
          <div>
            <div style={{ fontWeight: '300', overflowWrap: 'break-word' }}>
              {this.state.contentState.getPlainText()}
            </div>
          </div>
        </CardText>
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
  owner: React.PropTypes.object,
  tag: React.PropTypes.string,
  title: React.PropTypes.string,
};

export default DocumentCard;

