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
  import { Actions } from 'react-native-router-flux';
  import * as nb from 'native-base';
import {connect} from "react-redux"
import Middleware from '../store/middleware/middleware'
import Action from '../store/actions/actions'

function mapStateToProps(state){
  return{
    user:state.auth
  }
}
function mapDispatchToProps(dispatch){
  return{
    
    signin:(state)=>{
      dispatch(Middleware.signin(state))
    },
    login: (data)=>{
      dispatch(Action.Signin(data))
    }
  
  }
}

  class Signin extends Component{
    constructor(){
      super()
      this.state = {
        email:'',
        password:"",
        error:"",
        form:true
       
      }
      }
    componentWillReceiveProps(nextProps){
      if(nextProps.user.error){
        this.setState({error:nextProps.user.error})
      }
      else{
      
        if(nextProps.user.user){
          console.log(nextProps.user.user)
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
    componentWillMount(){
     
 
      try {
          AsyncStorage.getItem('@user:key').then((val)=>{
            if(val === null){
              this.setState({form:false})
             
        
}
else{
  console.log(val)
  
this.props.login(JSON.parse(val))
              
            }
        }).done()
       
      } catch (error) {
        // Error retrieving data
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

      this.props.signin(this.state)
              
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
        this.setState({error:"Password is incorrect"})
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
        {this.state.form? null :    
        
        <nb.Form style = {{backgroundColor:"rgba(255,255,255,0.4)",width:"100%", borderRadius:10,   }} >
        
              <nb.Item floatingLabel last style = {{alignSelf:"center",width:"94%" }}>
                <nb.Label style = {{color:"white"}} >Email</nb.Label>
                <nb.Input style={{color:"white", }}  onChangeText = {(val)=>{this.setState({email:val})}} autoCapitalize ='none' keyboardType="email-address"  />
              </nb.Item>
              <nb.Item floatingLabel last style = {{alignSelf:"center",width:"94%" }}>
                <nb.Label style = {{color:"white"}} >Password</nb.Label>
                <nb.Input style={{color:"white", }}  onChangeText = {(val)=>{this.setState({password:val})}} autoCapitalize ='none' secureTextEntry = {true} ref="password" />
              </nb.Item>
              <nb.Text  style={{ fontSize: 20, alignSelf:"center", color:"rgb(221, 8, 36)" }}>{this.state.error}</nb.Text>
              <nb.Text >{"\n"}</nb.Text>
              <nb.Button block rounded  onPress = {this.click.bind(this)} style = {{backgroundColor:"rgb(15, 146, 138)",width:"80%",alignSelf:"center"}}  >
  
              <nb.Text style = {{color:"white",fontSize:21}}>Sign In</nb.Text>
            </nb.Button>
  
            <nb.Text >{"\n"}</nb.Text>
          
                      
            <nb.Text  style={{ fontSize: 19, alignSelf:"center",color:"white" }}   > Dont Have an Account? <nb.Text onPress = {()=>{Actions.signup()}} style = {{textDecorationLine:"underline",color:"white",fontSize:19}}>Sign Up</nb.Text> </nb.Text> 
            <nb.Text >{"\n"}</nb.Text>
  
            </nb.Form>
        
         } 
          
        </nb.Content>
      </nb.Container>
                
        )
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Signin)