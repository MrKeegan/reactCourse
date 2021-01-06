import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from "./CampsiteInfoComponent";
import Header from "./HeaderComponent";
import Home from './HomeComponent';
import Contact from './ContactComponent';
import {Switch, Route, Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import Footer from './FooterComponent';


const mapStateToProps = state => {
  return{
    campsites: state.campsites,
    comments: state.comments,
    partners: state.partners,
    promotions: state.promotions
  }
}
class Main extends Component {
  


 


  render() {

    const HomePage = () => {
      return (
        <Home
          campsite ={this.props.campsites.filters(campsite => campsite.featured)[0]}
          promotion={this.props.promotions.filters(campsite => campsite.promotion)[0]}
          partner={this.props.promotions.filters(campsite => campsite.partner)[0]}
        />
      );
    }

    const CampsiteWithId = ({match}) =>{
      return (
        <CampsiteInfo
          campsite = {this.props.campsites.filter(campsite => campsite.id === +match.params.CampsiteWithId)[0]}
          comments = {this.props.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}/>
      );
    }

    return (
      <div>
        <Header/>
        <Switch>
          <Route path='/home' component={HomePage}/>
          <Route exact path='/directory' render ={() => <Directory campsites={this.props.campsites} />}/>
          <Route path ='/directory/:campsiteId' component={CampsiteWithId}/>
          <Route exact path = '/contactus' component = {Contact}/>
          <Redirect to ='/home'/>
      </Switch>
      <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStatetoProps)(Main));
