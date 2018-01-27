/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  BackHandler
} from 'react-native';
import {Provider} from'react-redux'
import store from './src/store/store'
import {connect}from 'react-redux'
import { Container, Header, Button, Icon, Fab , Input,Drawer,Left } from 'native-base';
import {Scene, Router,Actions} from 'react-native-router-flux';
import axios from "axios";
import Signin from './src/components/signin'
import Signup from './src/components/signup'
import Home from './src/components/home'
import Search from './src/components/search'
import Form from './src/components/form'
import Patient from './src/components/patient'








export default class App extends Component {
  constructor(){
    super()
    this.state={
      email:'',
      password:'',
      name:'',
    
      
    }
  }
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress () {
    if (Actions.state.index === 0) {
      return false;
    }

    Actions.pop();
    return true;
  }

  render() {
    closeDrawer = () => {
      this.drawer._root.close()
    };
    openDrawer = () => {
      this.drawer._root.open()
    };

    return (
      <Provider store = {store}>
 
<Container>  
{StatusBar.setBarStyle('light-content', true)}
{StatusBar.setBackgroundColor("rgb(15, 146, 138)")}

   <Router navigationBarStyle = {{backgroundColor:"rgb(15,148,136)"}}    >
<Scene key ="root"   >
     <Scene key = "signin" component={Signin}  hideNavBar={true} />
     <Scene key = "home" component={Home} hideNavBar={true}   />
     <Scene key = "form" component={Form}   hideNavBar = {true}   />
     <Scene key = "patient" component={Patient}   hideNavBar = {true} />
     
<Scene key = "search" component={Search}  hideNavBar={true} />

     <Scene key = "signup" component={Signup} hideNavBar={true} />
  
     
     
     </Scene>
     </Router>
  
</Container>
</Provider>
    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
