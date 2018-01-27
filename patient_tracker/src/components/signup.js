import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
AsyncStorage
  } from 'react-native';
  import {connect}from "react-redux"
  import Middleware from "../store/middleware/middleware"
  import * as nb from 'native-base';
  import {Actions} from 'react-native-router-flux'
function mapStateToProps(state){
    return{
    user:state.auth
    }
}
function mapDispatchToProps(dispatch){
 return{
     signup:(state)=>{
         dispatch(Middleware.signup(state))
     }
 }
}

  class Signup extends Component{
    constructor(){
        super()
        this.state = {
            email:'',
            name:'',
            password:'',
            error:''
        }
    }
    componentWillReceiveProps(nextProps){
if(nextProps.user.error){
    this.setState({error:nextProps.user.error})
    console.log("eeeee")
}
else{
  if(nextProps.user.user){
  try {
    AsyncStorage.setItem('@user:key',JSON.stringify( nextProps.user.user));
    console.log("done")
  } catch (error) {
    // Error saving data
  }
    Actions.home()
}

}
    }
    
    click(){
        if((this.state.email&&this.state.password)!== '' ){
            if(this.state.password.length >= 6){
    
            var email = this.state.email;
            var sp = email.search("@")
            if(sp !== -1){
              var split  = email.split("@");
              var sr = split[1].search(".com")
              if(sr !== -1&& split[0].length !== 0){
                  var join = split.join("@");
                  this.setState({
                    error:"",
                    email:join
                  })
    
          this.props.signup(this.state)
                  
              }
              else{
             this.setState({error:"Your email is wrong"})
              }
            }
            else{
              this.setState({error:"Your email is wrong"})
              
            }
          }
          else{
            this.setState({error:"Password must contail at least 6 characters"})
          }
          }
          else{
            alert("Please Fill All Fields")
          }
    
    }
    
    render(){
        
      
        return(
            <nb.Container style = {{backgroundColor:"rgb(15, 146, 138)"}}>
        
        <nb.Content contentContainerStyle={{flex:1,justifyContent:"center",alignItems:"center",width:"90%",marginHorizontal:"5%"}}> 
        <Image source={require("../images/logo.png")} style = {{alignSelf:"center",width:"90%"}} />
          <nb.Form style = {{backgroundColor:"rgba(255,255,255,0.4)",width:"100%", borderRadius:10,   }} >
      
            <nb.Item floatingLabel last style = {{alignSelf:"center",width:"94%" }}>
              <nb.Label style = {{color:"white"}} >Email</nb.Label>
              <nb.Input style={{color:"white", }}  onChangeText = {(val)=>{this.setState({email:val})}} autoCapitalize ='none'  keyboardType="email-address" />
            </nb.Item>
            <nb.Item floatingLabel last style = {{alignSelf:"center",width:"94%" }}>
              <nb.Label style = {{color:"white"}} >Name</nb.Label>
              <nb.Input style={{color:"white", }}  onChangeText = {(val)=>{this.setState({name:val})}} autoCapitalize ='none'  />
            </nb.Item>
            <nb.Item floatingLabel last style = {{alignSelf:"center",width:"94%" }}>
              <nb.Label style = {{color:"white"}} >Password</nb.Label>
              <nb.Input style={{color:"white", }}  onChangeText = {(val)=>{this.setState({password:val})}} autoCapitalize ='none' secureTextEntry = {true} ref="password" />
            </nb.Item>
            <nb.Text >{"\n"}</nb.Text>
            <nb.Text  style={{ fontSize: 20, alignSelf:"center", color:"rgb(221, 8, 36)" }}>{this.state.error}</nb.Text>

            <nb.Button block rounded  onPress = {this.click.bind(this)} style = {{backgroundColor:"rgb(15, 146, 138)",width:"80%",alignSelf:"center"}}  >

            <nb.Text style = {{color:"white",fontSize:21}}>Sign Up</nb.Text>
          </nb.Button>

          <nb.Text >{"\n"}</nb.Text>
        
                    
          <nb.Text  style={{ fontSize: 20 ,alignSelf:"center",color:"white" }}   >Already Have an Account? <nb.Text onPress = {()=>{Actions.signin()}}  style ={{color:"white",fontSize:19,textDecorationLine:"underline"}} >Log In </nb.Text></nb.Text> 
          <nb.Text >{"\n"}</nb.Text>
          
          </nb.Form>
        </nb.Content>
      </nb.Container>
                
                
        )
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Signup)