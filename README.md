# Muster
Social-oriented inventory managing application

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

## Getting Started
in terminal
```
npm install
firebase serve -p 5000 -o 127.0.0.1
```
now go to http://localhost:5000/

## Tech Stacks
* Javascript
* React
* Firebase
* Algolia
* React Router
* Dragula
* Stripe
