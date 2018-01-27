import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body,Button,Icon } from 'native-base';
import * as firebase from 'firebase';
import{Actions}from 'react-native-router-flux';
import {
  Platform,
  StyleSheet,
  View,
  Image
} from 'react-native';
import '../config/fbconfig';
export default class Userdata extends Component {
  
get(){
  firebase.database().ref('donors/').on('value',(snapshot)=>{
    let data = snapshot.val()
    for (let i in data){
      if(data[i].uid=== this.props.uid){
        firebase.database().ref(`donors/${i}`).update({
          donated:true
        })      }
    }
    alert("Thank You")
    Actions.main()
  })

}
 
  render() {
    console.log(this.props.donated)
    
    console.log(this.props.navigation.state.params.name)
    console.log(this.props.navigation.state.params.no)
    return (
      <Container style = {{flex:1}}> 
       <View style  ={{backgroundColor:"#EF5350",minHeight:"10%",justifyContent:"center",padding:"2%",flexDirection:"row"}} >
        <View style = {{flex:1,justifyContent:"center"}}>
        <Icon name = "md-arrow-back"  style = {{color:"white"}} onPress = {()=>{Actions.pop()}} />
        </View>
        <View style = {{flex:2,justifyContent:"center"}}>
        <Text style = {{fontSize:20,color:"white",}}>Donor Details</Text>
        </View>
       <View style = {{flex:1}} />
        </View>
        <Content>
          <Card>
            <CardItem style = {{alignSelf:"center"}}>
              <Text style = {{fontWeight:"bold"}}>Donor Details</Text>
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
                Blood Group: {this.props.navigation.state.params.bg}
                  
                </Text>
                <Text>
                Address: {this.props.navigation.state.params.addr}
                
                </Text>
                <Text>
                City: {this.props.navigation.state.params.city}
                
                </Text>
              {this.props.donated? <Text> Donation Already Done </Text>  :    <Button block primary rounded onPress = {this.get.bind(this)} style = {{width:"80%",alignSelf:"center"}}><Text> Get  </Text></Button> }
              </Body>
            </CardItem>
         
         </Card>
        </Content>
      </Container>
    );
  }
}