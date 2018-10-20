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
      shinyToggle: false
    }
  }

  componentDidMount() {
    console.log('did mount says hi');
    // $.ajax({
    //   url: '/pokemon', 
    //   success: (newPkmn) => {
    //     this.setState({
    //       currentPkmn: newPkmn
    //     })
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // });
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
        console.log(`response from server after GET request: ${res}`);
      },
      error: (err) => {
        console.log('GET error: ', err);
      }
    })
  }

  render () {
    return (<div>
      {/* <button onClick={()=>this.toggleShiny()}>hi</button> */}
      <PkmnViewer pokemon={this.state.currentPkmn} shiny={this.state.shiny} toggleShiny={this.toggleShiny.bind(this)}/>
      <br></br>
      <Search search={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));