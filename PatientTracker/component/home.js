import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Toast } from 'native-base';
import {
  Platform,
  StyleSheet,
  View, Image,
  StatusBar
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Home extends Component{
    render(){
        return(
            <Container>
                {       StatusBar.setBarStyle('light-content', true)}
      {  StatusBar.setBackgroundColor("rgb(15, 146, 138)")}
            <Content style= {{flex:1}} >
              <Image source={require("../images/logo.png")} style={{ alignSelf:"center",width:"100%" }} />
              <View style={{flexDirection: 'row',padding:20}}>
              <Button rounded style = {styles.btn} onPress={()=>{Actions.signin()}}  ><Text style={styles.text} >Doctor</Text></Button>
              <Button rounded style = {styles.btn} onPress={()=>{Actions.patientpage()}}  ><Text style={styles.text} >Patient</Text></Button>
              </View>
            </Content>
            </Container>
        )
    }

}
const styles = StyleSheet.create({
    
        btn:{
            backgroundColor:"rgb(15, 146, 138)",
            width:130,
            margin:10
        },
        text:{
            marginLeft:23
        }

    
    
    
    
    });