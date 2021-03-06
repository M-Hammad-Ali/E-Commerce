import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom'

import './App.css';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import HomePage from './pages/homepage/homepage.component';
import ShopePage from './pages/shop/shop.component';
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends Component {
  unsubscirbeFromAuth = null;

  state = {
    currentUser: null
  }

  componentDidMount(){
    this.unsubscirbeFromAuth = auth.onAuthStateChanged(async userAuth=>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
          console.log(this.state);
        });
      }
      else{
        this.setState({currentUser:null})
      }
    })
  }

  componentWillUnmount(){
    this.unsubscirbeFromAuth();
  }

  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path='/shop' component={ShopePage}/>
          <Route path="/signin" component={SignInAndSignUpPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
