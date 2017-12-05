import React from 'react';
import LinkButton from '../helperElements/LinkButton.js'


export default class NewCollectionsInput extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      collectionName:'collection',
      category:'category'
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(e){
    if (this.state.collectionName === 'collection' && this.state.category === 'category' ||
        this.state.collectionName === 'add collection' && this.state.category === 'add category') {
          this.setState({
            collectionName: 'add collection',
            category: 'add category'
          })
    } else {
      this.props.addNewCollection(this.state.collectionName, this.state.category)
      this.props.handleClick()
      console.log('pass?', this.state)
    }
    
  }

  handleClick() {
    this.props.toggleInputForm()
    this.setState({collectionName: 'collection', category: 'category'})
  }

  shouldComponentUpdate(nextState) {
    if(nextState !== this.state) {
      return true;
    }
    return false;
  }

  render() {
    console.log(this.state)
    return(
      <form onSubmit={(e)=>{
        e.preventDefault();
        this.handleSubmit(e);
      }}>
        <div className="category-input">
        <input
          type="text"
          placeholder={this.state.collectionName}
          onChange={(e)=>{this.setState({collectionName:e.target.value})}}
        />
        <input
          type="text"
          placeholder={this.state.category}
          onChange={(e)=>{this.setState({category:e.target.value})}}
        />
        </div>
        <button type="submit"> + </button>
      </form>
    )
  }
}
