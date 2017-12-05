import React from 'react';

class ItemEntry extends React.Component {
  constructor(props) {
      super(props)
  }

  render() {
    return(
      <div>
        <img src={this.props.item.imageUrl} /> 
        <h4>{this.props.item.name}</h4>
        {this.props.id === 'id' ? null : <button onClick={() => this.props.checkUser(this.props.id, this.props.item.uId)} type="button">Click Me!</button>}
        
      </div>
    )
  }
}

export default ItemEntry;