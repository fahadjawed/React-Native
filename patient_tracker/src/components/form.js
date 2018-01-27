import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableHighlight,
    ToastAndroid,
    TouchableOpacity
  } from 'react-native';
  import {connect}from "react-redux"
  import Middleware from "../store/middleware/middleware"
  import * as nb from 'native-base';
  import {Actions} from 'react-native-router-flux'

function mapStateToProps(state){
    return{
    id:state.auth.user,
    user:state.get,
    signin:state.auth.signin
    }
}
function mapDispatchToProps(dispatch){
    return{
        postdata:(state)=>{
        dispatch(Middleware.post(state))
      }
    }
}
  class Form extends Component{
      constructor(){
          super()
          this.state={
              name:"",
              contact:"",
              disease:"",
              treatment:"",
              gender:'',
              id:"",
              date:null,
              selected1: "Male"
          }
      }
      componentWillReceiveProps(nextProp){
          if(nextProp.user.error){
       
              alert("Try Again")
            }
            else{
                if(nextProp.signin){
                ToastAndroid.show('Added', ToastAndroid.SHORT)
                Actions.home()
                
                }
                else{

                }
            
          }
       
      }
      onValueChange(value) {
        this.setState({
          selected1: value
        });
      }
    
      componentWillMount(){
        if(this.props.id){
            
              this.setState({
                id:this.props.id._id,
              })
              console.log(this.state.id)
          }
        var month = new Date().getMonth()+1
        var day = new Date().getDate();
        var year = new Date().getFullYear()
          this.setState({
             
              date:year+"-"+month+"-"+day
          })
      }
      
      click(){
       
          this.props.postdata(this.state)
      
          
      }
      render(){
          return(
              <nb.Container style = {{flex:1}}>

        <View style  ={{backgroundColor:"rgb(15,148,136)",minHeight:"10%",justifyContent:"center",padding:"2%",flexDirection:"row"}} >
        <View style = {{flex:1,justifyContent:"center"}}>
        <nb.Icon name = "md-arrow-back" onPress = {this.openDrawer} style = {{color:"white"}} onPress = {()=>{Actions.pop()}} />
        </View>
        <View style = {{flex:1,justifyContent:"center"}}>
        <nb.Text style = {{fontSize:20,color:"white",}}>Add Patient</nb.Text>
        </View>
       <View style = {{flex:1}} />
        </View>
                    
                  <nb.Content>
                      <nb.Form>
                      <nb.Item floatingLabel>
              <nb.Label>Patient Name</nb.Label>
              <nb.Input onChangeText = {(val)=>{this.setState({name:val})}} />
            </nb.Item>
            <nb.Item floatingLabel last>
              <nb.Label>Patient Contact</nb.Label>
              <nb.Input keyboardType="phone-pad" onChangeText = {(val)=>{this.setState({contact:val})}} />
            </nb.Item>
            <nb.Item floatingLabel last>
              <nb.Label>Disease</nb.Label>
              <nb.Input onChangeText = {(val)=>{this.setState({disease:val})}} />
            </nb.Item>
            <nb.Item floatingLabel last>
              <nb.Label>Treatment</nb.Label>
              <nb.Input onChangeText = {(val)=>{this.setState({treatment:val})}} />
            </nb.Item>
            <nb.Picker
            iosHeader="Select one"
            
             style = {{marginLeft:"3%"}} 
            itemStyle= {{marginLeft:"30%"}}
            selectedValue={this.state.selected1}
            onValueChange={this.onValueChange.bind(this)}
          >
            <nb.Item label="Male" value="Male" />
            <nb.Item label="Female" value="Female" />
          
          </nb.Picker>
            <nb.Button  block rounded onPress={this.click.bind(this)} style = {{width:"80%",alignSelf:"center",backgroundColor:"rgb(15,148,136)"}}>
               <Text style = {{color:"white",fontSize:21}} > Add</Text>
                </nb.Button>
                          </nb.Form>
                      </nb.Content>
                  </nb.Container>
          )
      }

  }
  export default connect(mapStateToProps,mapDispatchToProps) (Form) 