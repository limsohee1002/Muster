# Muster
Social-oriented inventory managing application.
Users can organize items, assign locations to items, categorize items, and create collections.
This app also allows users to trade their items with each other. Users can loan items, purchase items, and exchange items.
User may search for specific items by location.

## Features
* collection - organize items under your collections
* category - collections can be organized by category and shared among all users (allow other users to search for items by category)
* search - when the user searches for items, it will show the location on a map
* manage items - allows user to change category, collection, and location with drag and drop functionality
* trade - user can trade items with each other. Trading has three options. loan, exchange, and purchase
* like - users can like a certain collection, liked collections will show on a profile page
* follow - users can follow other users, it will show on profile page
* chat - users can chat with other users they are following, multiple users can be in one chat room

## Demo
![mustr-demo](https://user-images.githubusercontent.com/30321742/36117161-a4a49832-1006-11e8-9609-26a8f5fa601f.gif)

## Code Example

#### fetching data

```JS
getItemData() {
    let collectionId = this.props.match.params.collectionId.slice(1);
    new Promise((resolve, reject) => {
      collection.child(collectionId).on('value', (snap) => {
        return resolve(snap.val())
      })
    })
    .then((collectionObj) => {
      this.setState({collectionName: collectionObj.name})
      if (collectionObj.itemId) {
        return Object.keys(collectionObj.itemId);
      } else {
        this.setState({items: []})
      }
    })
    .then((itemIdArr) => {
      var arr = [];
      itemIdArr.forEach(id => {
        var tempPromise = new Promise((resolve, reject) => {
          item.child(id).on('value', function(snap) {
            resolve([id, snap.val()])
          })
        })
        arr.push(tempPromise);
      })
      return Promise.all(arr);
    })
    .catch((error) => {
      console.log('no item in collection')
    })
    .then((itemArr) => {
      let userId = itemArr[0][1]['uid'];
      this.setState({userId: userId})
      users.child(userId).on('value', (snap) => {
        this.setState({userInfo: snap.val()})
      })
      return itemArr
    })
    .then(data => {
      if (data[0] !== null && data[1]!== null){
        this.setState({items: data})
      }
    })
  }
```

#### drag and drop functionality

```JS
dragulaDecorator(componentBackingInstance){
    let option = {
      isContainer: function (el) {
        return false; // only elements in drake.containers will be taken into account 
      },
      copy: false
    };

    if(componentBackingInstance) {
      let drake = Dragula(componentBackingInstance, option)
      .on('drop', (el, target, source) => {
        let clickedEl = el.className.split(' ')[0];
        let targetId = target.className.split(' ')[0];
        let sourceId = source.className.split(' ')[0];
        let collectionName = this.props.collectionList[clickedEl]['name'];
        
        collection.child(clickedEl).child('categoryId').set(targetId)
        
        let updates = {};
        
        updates['/category/' + targetId + '/collectionId/' + clickedEl] = collectionName;
        firebase.database().ref().update(updates);
        category.child(sourceId).child('collectionId').child(clickedEl).remove()
      })
    }
  };
```

## Running Locally
in terminal
```
1. npm install
2. firebase serve -p 5000 -o 127.0.0.1
```
now go to http://localhost:5000/

## Tech Stack
* Javascript
* React
* Firebase
* Algolia
* React Router
* Dragula
* Stripe

## Authors
* Sohee Lim
* Seamus Martin
* Yusaky Kasahara
* Christine Ma

## License
This project is licensed under the MIT License
