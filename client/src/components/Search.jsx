import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pkmn: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.search = this.search.bind(this);
  }

  onChange (e) {
    this.setState({
      pkmn: e.target.value
    });
  }

  onEnter (e) {
    let code = e.keyCode || e.which;
    if (code === 13) {
      this.search();
    }
  }

  search () {
    this.props.search(this.state.pkmn);
    this.setState({pkmn: ''});
  }

  render() {
    return (<div>
      Enter a pokemon: <input value={this.state.pkmn} onChange={this.onChange} onKeyPress={this.onEnter}/>       
      <button disabled={!this.state.pkmn} onClick={this.search}>Search</button>
    </div>) 
  }
}

export default Search;