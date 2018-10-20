import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import PkmnViewer from './components/PkmnViewer.jsx';
import bulbasaur from '../../database/test/new-bulbasaur.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentPkmn: bulbasaur,
      shiny: '',
      shinyToggle: true,
    }
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    // console.log(this.state.currentPkmn.id + 1);
    // this.search('bulbasaur');
  }

  toggleShiny() {
    this.setState({
      shinyToggle: !this.state.shinyToggle,
    });
    this.state.shinyToggle? this.setState({shiny:'/shiny/'}) : this.setState({shiny:''});
  }

  search (pkmn) {
    console.log(`${pkmn} was searched`);
    $.ajax({
      url: '/pokemon',
      method: 'GET',
      data: pkmn,
      success: (res) => {
        // console.log(`response from server after GET request:`, res);
        this.setState({currentPkmn: res});
      },
      error: (err) => {
        console.log('GET error: ', err);
      }
    })
  }

  render () {
    return (<div>
      <PkmnViewer pokemon={this.state.currentPkmn} shiny={this.state.shiny} toggleShiny={this.toggleShiny.bind(this)}/>
      <br></br>
      <Search search={this.search}/>
      <button disabled={this.state.currentPkmn.id === 1} onClick={() => this.search(JSON.stringify(this.state.currentPkmn.id - 1))}>Prev</button>
      <button disabled={this.state.currentPkmn.id === 802} onClick={() => this.search(JSON.stringify(this.state.currentPkmn.id + 1))}>Next</button>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));