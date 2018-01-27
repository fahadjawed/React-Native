

import React, { Component } from 'react';
import {
  Text,
  Platform,
  StyleSheet,
  View,Image,
  AsyncStorage
} from 'react-native';

import {connect} from "react-redux"
import Middleware from '../store/middleware/middleware'
import Action from '../store/actions/actions'

import {Content,Button,Thumbnail,List,ListItem,Left} from 'native-base';
import {Actions} from 'react-native-router-flux'

function mapStateToProps(state){
  return{
    user:state.auth.user
  }
}
function mapDispatchToprops(dispatch){
  return{
    signout:()=>{
        dispatch(Action.Signout())
    }
  }
}

 class Sidebar extends Component {
  constructor(){
    super()
    this.state = {
      userdata:{},
      name:'',
      email:""
      
    }
  }


componentWillMount(){
  if(this.props.user){
    this.setState({
      name:this.props.user.name,
      email:this.props.user.email
    })
  }
}
 signout(){
  AsyncStorage.removeItem('@user:key')
this.props.signout()
 }
  render() {
 
    return(
 
         <View style = {{height:"100%",backgroundColor:"white"}}>
      
       {/* <Thumbnail source={{ uri: '../images/logo.png' }} /> */}
       <View style = {{backgroundColor:"rgb(15, 146, 138)",
       height:"45%"
       }}>
                <Image source={require("../images/doc.png") }  style = {{alignSelf:"center"}}  />
                <Text style= {{color:"white",fontSize:20,padding:"2%"}}>Dr.{this.state.name}</Text>
                <Text style= {{color:"white",fontSize:18,padding:"2%"}}>{this.state.email}</Text>
                
    
         <Button   rounded  style={styles.btn} onPress = {this.signout.bind(this)}  ><Text style ={{marginLeft:"20%",fontSize:20}}  >Sign Out </Text></Button>
         </View>


     </View>

    
    
   
    )
   
  }
}
const styles = StyleSheet.create({
    
    text:{
    color:"white"
    },
  btn:{
    backgroundColor:"white",
    alignSelf:"center",
    width:"50%",
   marginTop:"2%"
    
  }
  
    
  });

export default connect(mapStateToProps,mapDispatchToprops)(Sidebar);