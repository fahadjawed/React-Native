
import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  BackHandler,
  BackAndroid
  
} from 'react-native';
import {Router,Scene,Actions} from "react-native-router-flux"
import Signin from "./src/components/signin"
import {Provider} from'react-redux'
import Signup from "./src/components/signup"
import Home from "./src/components/home"
import Places from "./src/components/places"





import * as nb from 'native-base'
import store from './src/store/store'



export default class App extends Component {
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress () {
    if (Actions.state.index === 0) {
      BackHandler.exitApp()
      return false;
    }

    Actions.pop();
    return true;
  }
 
  render() {
  
    return (
    <Provider store = {store}>
    <nb.Container>
     <StatusBar
     backgroundColor="orange"
     barStyle="light-content"
   />

    <Router  >
    <Scene key ="root" >
         <Scene key = "signin" component={Signin}  hideNavBar={true} />
         <Scene key = "home" component={Home} hideNavBar={true} />
         
    
         <Scene key = "signup" component={Signup} hideNavBar={true} />
         <Scene key = "places" component={Places} hideNavBar={true} />

         
         
         
      
         
         
         </Scene>
         </Router>
      </nb.Container>
      </Provider>
    );
  }
}