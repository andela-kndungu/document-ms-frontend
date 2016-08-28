import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Map, List } from 'immutable';
import AddDocumentForm from './AddDocumentForm.jsx';

const AddDocumentTab = (props) => {
  return (
    <Tabs>
      <Tab label="ADD DOCUMENT" >
        <div>
          <AddDocumentForm
            categories={props.categories}
            userDetails={props.userDetails}
          />
        </div>
      </Tab>
    </Tabs>
  );
};

AddDocumentTab.propTypes = {
  categories: React.PropTypes.instanceOf(List),
  userDetails: React.PropTypes.instanceOf(Map)
};

export default AddDocumentTab;

