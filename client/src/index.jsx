import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import PkmnViewer from './components/PkmnViewer.jsx';
import bulbasaur from '../../database/test/bulbasaur.json';
let interval;

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
  }

  toggleShiny() {
    this.setState({
      shinyToggle: !this.state.shinyToggle,
    });
    this.state.shinyToggle ? this.setState({shiny:'/shiny/'}) : this.setState({shiny:''});
  }

  search (pkmn) {
    $.ajax({
      url: '/pokemon',
      method: 'GET',
      data: pkmn,
      success: (newPkmn) => {
        if (newPkmn) {
          this.setState({currentPkmn: newPkmn});
        } else {
          console.log('pokemon not found');
        }
      },
      error: (err) => {
        console.log('GET error: ', err);
      }
    })
  }

  autoChange () {
    let pkmn = this.state.currentPkmn.id;
    interval = setInterval(() => {
      pkmn++
      $.ajax({
        url: '/pokemon',
        method: 'GET',
        data: JSON.stringify(pkmn),
        success: (newPkmn) => {
          if (newPkmn) {
            this.setState({currentPkmn: newPkmn});
          }
        },
        error: (err) => {
          console.log('GET error: ', err);
        }
      })
      if (pkmn > 802) {
        pkmn = 0;
      }
    }, 2000)
  }

  // Used to download all pokemons from the api and store them in my database
  // multiAdd () {
  //   console.log('Starting Multi-Add');
  //   let i = 0;
  //     setInterval(() => {
  //       i++
  //       $.ajax({
  //         url: '/pokemon',
  //         method: 'POST',
  //         data: {pkmn: JSON.stringify(i)},
  //         success: (res) => {
  //           console.log(`Added #${i}`);
  //         },
  //         error: (err) => {
  //           console.log('POST error: ', err);
  //         }
  //       });
  //     }, 1000)
  // }

  render () {
    return (<div>
      <PkmnViewer pokemon={this.state.currentPkmn} shiny={this.state.shiny} toggleShiny={this.toggleShiny.bind(this)}/>
      <br></br>
      <Search search={this.search}/>
      <button disabled={this.state.currentPkmn.id === 1} onClick={() => this.search(JSON.stringify(this.state.currentPkmn.id - 1))}>Prev</button>
      <button disabled={this.state.currentPkmn.id === 802} onClick={() => this.search(JSON.stringify(this.state.currentPkmn.id + 1))}>Next</button>
      <button onClick={this.autoChange.bind(this)}>Auto Next</button>
      <button onClick={()=> clearInterval(interval)}>Stop</button>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));