


import React, { Component } from 'react';
import {
  Text,
  Platform,
  StyleSheet,
  View,Image
} from 'react-native';
import * as firebase from 'firebase';

import '../config/fbconfig';

import {Content,Button} from 'native-base';
import {Actions} from 'react-native-router-flux'
export default class Sidebar extends Component {
  constructor(){
    super()
    this.state = {
      userdata:{},
    }
  }
  componentDidMount(){
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).on('value',(snapshot)=>{
      let data = snapshot.val();
      this.setState({
        userdata:data
      })

    })
  }
  render() {
  
    return (
          <Content style={{backgroundColor:'#FFFFFF',flex:1}}>
                          <Image source = {require("../images/you.png")} style  ={{alignSelf:"center",marginTop:"4%"}}  />

          <Text style = {{fontSize:20,padding:"3%"}}> {this.state.userdata.name} </Text>
          <Text>{"\n"}</Text>
          
          <Button block danger rounded onPress= {()=>{Actions.form() }} style ={{width:"90%",alignSelf:"center"}}  ><Text style={{color:"white",fontSize:19}}>Donate Blood </Text></Button>
          <Text>{"\n"}</Text>
          
            <Button block danger rounded onPress= {()=>{firebase.auth().signOut().then(Actions.signin() ,this.setState({userdata:{}}))} } style ={{width:"90%",alignSelf:"center"}} ><Text style={{color:"white",fontSize:19}}>Sign Out </Text></Button>
            
          </Content>
    );
  }
}
const styles = StyleSheet.create({
    
    text:{
    color:"white"
    },
  
  
    
  });

module.exports = Sidebar;