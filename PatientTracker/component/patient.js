import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem,Icon, Text, Body,Button } from 'native-base';
import * as firebase from 'firebase';
import{Actions}from 'react-native-router-flux';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import '../config/fbconfig';
export default class Patient extends Component {
  

 
  render() {

    return (
      <Container style = {{flex:1}}>
         <View style  ={{backgroundColor:"rgb(15, 146, 138)",minHeight:"10%",justifyContent:"center",padding:"2%",flexDirection:"row"}} >
        <View style = {{flex:1,justifyContent:"center"}}>
        <Icon name = "md-arrow-back" onPress = {this.openDrawer} style = {{color:"white"}} onPress = {()=>{Actions.pop()}} />
        </View>
        <View style = {{flex:2,justifyContent:"center"}}>
        <Text style = {{fontSize:20,color:"white",}}>Patient Details</Text>
        </View>
       <View style = {{flex:1}} />
        </View>
        <Content>
          <Card>
            <CardItem style= {{alignSelf:"center"}}>
              <Text style = {{fontWeight:"bold"}} >Patient Details</Text>
            </CardItem>
            <CardItem>
              <Body>

                <Text>
                Name: {this.props.navigation.state.params.name}
                </Text>
                <Text>
                Number: {this.props.navigation.state.params.no}
                
                </Text>
                <Text>
                Disease: {this.props.navigation.state.params.disease}
                  
                </Text>
                
                <Text>
                Treatment: {this.props.navigation.state.params.treatment}
                
                </Text>
                <Text>
                 Patient ID: {this.props.navigation.state.params.id}
                
                </Text>
              </Body>
            </CardItem>
         
         </Card>
        </Content>
      </Container>
    );
  }
}