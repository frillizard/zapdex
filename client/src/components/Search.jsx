import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pkmn: ''
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange (e) {
    this.setState({
      pkmn: e.target.value
    });
  }

  render() {
    return (<div>
      Enter a pokemon: <input value={this.state.pkmn} onChange={this.onChange}/>       
      <button onClick={()=>this.props.search(this.state.pkmn)}> Search </button>
    </div>) 
  }
}

export default Search;