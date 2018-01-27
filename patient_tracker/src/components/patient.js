import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableHighlight,
    ScrollView,
    ToastAndroid,
    ListView
    
  } from 'react-native';
  import { Col, Row, Grid } from "react-native-easy-grid";
  import {connect}from "react-redux"
  import Middleware from "../store/middleware/middleware"
  import * as nb from 'native-base';
  import {Actions} from 'react-native-router-flux'
  import {Toast} from "native-base"


  export default class Patient extends Component{
    constructor(props) {
        super(props);
     
        this.state = {
          showToast: false,
        
        }
      }
      render(){
   var data = Object.values(this.props.val)
console.log(this.props.user)
          return(
              <nb.Container style = {{backgroundColor:"#F4F4F4"}}>
                     <View style  ={{backgroundColor:"rgb(15,148,136)",minHeight:"10%",justifyContent:"center",padding:"2%",flexDirection:"row"}} >
        <View style = {{flex:1,justifyContent:"center"}}>
        <nb.Icon name = "md-arrow-back"  style = {{color:"white"}} onPress = {()=>{Actions.pop()}} />
        </View>
        <View style = {{flex:2,justifyContent:"center"}}>
        <nb.Text style = {{fontSize:20,color:"white"}}>Patient Details</nb.Text>
        </View>
       <View style = {{flex:1}} />
        </View>
                {/* <nb.Card style = {{flex:1,alignItems:"center",justifyContent:"center",padding:"10%",margin:"10%"}}>
        
                  <nb.Text style = {{fontSize:22}} > <nb.H2 >Name  </nb.H2>{this.props.val.name}</nb.Text>
                  <nb.Text style = {{fontSize:22 }} ><nb.H2>Contact </nb.H2> {this.props.val.contact}</nb.Text>
                  <nb.Text style = {{fontSize:22}} > <nb.H2>Date </nb.H2> {this.props.val.date}</nb.Text>
                  <nb.Text style = {{fontSize:22}} > <nb.H2>Disease </nb.H2> {this.props.val.disease}</nb.Text>
                  <nb.Text style = {{fontSize:22}} > <nb.H2>Treatment </nb.H2> {this.props.val.treatment}</nb.Text>
                  
               </nb.Card> */}
<ScrollView>
               <nb.List>
            <nb.ListItem itemDivider>
              <nb.Text>Name</nb.Text>
            </nb.ListItem>                    
            <nb.ListItem  >
              <nb.Text style = {{paddingLeft:"4%",fontSize:19}} >{this.props.val.name}</nb.Text>
            </nb.ListItem>
            <nb.ListItem itemDivider>
              <nb.Text>Contact</nb.Text>
            </nb.ListItem>  
            <nb.ListItem>
              <nb.Text style = {{paddingLeft:"4%",fontSize:19}} >{this.props.val.contact}</nb.Text>
            </nb.ListItem>
            <nb.ListItem itemDivider>
              <nb.Text>Date</nb.Text>
            </nb.ListItem>  
            <nb.ListItem>
              <nb.Text style = {{paddingLeft:"4%",fontSize:19}} >{this.props.val.date}</nb.Text>
            </nb.ListItem>
            <nb.ListItem itemDivider>
              <nb.Text>Disease</nb.Text>
            </nb.ListItem>  
            <nb.ListItem>
              <nb.Text style = {{paddingLeft:"4%",fontSize:19}} >{this.props.val.disease}</nb.Text>
            </nb.ListItem>
            <nb.ListItem itemDivider>
              <nb.Text>Treatment</nb.Text>
            </nb.ListItem>  
            <nb.ListItem>
              <nb.Text style = {{paddingLeft:"4%",fontSize:19}}>{this.props.val.treatment}</nb.Text>
            </nb.ListItem>
            <nb.ListItem itemDivider>
              <nb.Text>Appointed By</nb.Text>
            </nb.ListItem>  
            <nb.ListItem>
              <nb.Text style = {{paddingLeft:"4%",fontSize:19}}>Dr.{this.props.user.name}</nb.Text>
            </nb.ListItem>
          
          </nb.List>
          <nb.Text>{"\n"}</nb.Text>
</ScrollView>
    
     
        
                  </nb.Container>
          )
      }
  }
