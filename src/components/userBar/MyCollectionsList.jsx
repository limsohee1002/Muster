import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, users} from '../../../config/firebaseCredentials';
import DummyData from './DummyData.js'
import MyCollectionsEntry from './MyCollectionsEntry.jsx';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';


export default class MyCollectionsList extends React.Component {
  constructor(props) {
    super(props);    
  }

  componentDidMount(){
    
  }

  render() {
    return (
      <div>
        {this.props.collectionList.length < 1 ? <h4>no collection</h4> : (this.props.collectionList.map((collection) => {
          return <Link to={`/items/:${collection[0]}`} key={collection[0]}>
            <MyCollectionsEntry
            id={collection[0]}
            categoryId={collection[1].categoryId}
            name={collection[1].name}
            publicCat={collection[1].publicCat}
            deleteCollection={this.props.deleteCollection}
            />
          </Link>
        }))}
      </div>
    )
  }
}
