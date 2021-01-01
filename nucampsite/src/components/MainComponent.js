import React, {Component} from 'react';
import {Navbar,NavbarBrand} from 'reactstrap';
import Directory from './DirectoryComponent';
import { CampsiteInfo } from "CampsiteInfoComponent";
import { CAMPSITES} from '../shared/campsites';

class Main extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      campsites: CAMPSITES,
      selectedCampsite: null
    };

  }

  onCampsiteSelect(campsiteId){
    this.setState({selectedCampsite:campsiteId});
}


  render() {
      return (
          <div key ={campsite.id} className="App">
              <Navbar dark color="primary">
              <div className="container">
                  <NavbarBrand href="/">NuCamp</NavbarBrand>
              </div>
              </Navbar>
              <Directory campsites = {this.state.campsites} onClick={campsiteId => this.onCampsiteSelect(campsiteId)}/>
              <CampsiteInfo campsite={this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]}/>
          </div>
      );
  }
}



function App() {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Main;
