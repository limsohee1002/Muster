//user collection list should
//show up on the left side and persist whenever user is logged in
import React from 'react';
import { firebaseAuth, rootRef, collection, category, item, users } from '../../../config/firebaseCredentials';
import SearchBar from '../helperElements/SearchBar';
import MyCollectionsList from './MyCollectionsList.jsx';
import NewCollectionsInput from './NewCollectionsInput.jsx';
import UserInfo from './UserInfo.jsx';
import { getUserCollection } from './writeNewCollectionHelpers';

import { withRR4 } from 'react-sidenav';
import { Link } from 'react-router-dom'

const SideNav = withRR4();

export default class MyCollections extends React.Component {
  constructor(props){
    super(props);
    this.state={
      showInputForm : false,
      collectionList:[],
    };
    this.toggleInputForm = this.toggleInputForm.bind(this);
    this.getUserCollection = getUserCollection.bind(this);
    this.deleteCollection = this.deleteCollection.bind(this);
  }

  componentDidMount() {
    this.getUserCollection();
  }

  toggleInputForm() {
    this.setState({showInputForm: !this.state.showInputForm})
  }

  deleteCollection(collectionId) {
    new Promise((resolve, reject) => {
      collection.child(collectionId).child('categoryId').on('value', (snap) => {
        resolve(snap.val())
      })
    })
    .then((categoryId )=> {
      category.child(categoryId).child('collectionId').child(collectionId).remove()
    })
    .then(() =>
      collection.child(collectionId).remove()
    )
    .then(() =>
      this.getUserCollection()
    )
  }

  render() {
    return(
      <div style={{width: 220, float: 'left', margin: '1.5%'}} className="container-fluid">
      <SideNav>
        This is the left-side userbar
      </SideNav>
      <SideNav>
        <SearchBar search={(input) => {this.props.searchMyCollections(input)}}/>
      </SideNav>
      <SideNav>
        <Link to={`/profile/${this.props.user.uid}`}>
          <UserInfo user={this.props.user} clickFunction={() => {}}/>
        </Link>
      </SideNav>
      <SideNav>
        <MyCollectionsList collectionList={this.state.collectionList} deleteCollection={this.deleteCollection} />
      </SideNav>
      <SideNav>
        <button type="button" className="btn btn-outline-secondary bg-primary" onClick={()=>this.toggleInputForm()}>
          New Collection
        </button>
          {this.state.showInputForm?(<NewCollectionsInput addNewCollection={this.props.addNewCollection} toggleInputForm={this.toggleInputForm} />):(<div/>)}
      </SideNav>
      </div>
    )
  }
}
