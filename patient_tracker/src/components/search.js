import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    
    StatusBar,
    TouchableHighlight
  } from 'react-native';
  import {connect}from "react-redux"
  import Middleware from "../store/middleware/middleware"
  import * as nb from 'native-base';
  import {Actions} from 'react-native-router-flux'


  class Search extends Component {
      constructor(){
          super()
          this.state = {

          }
      }
      click(){
          console.log("sdasdadasd")
      }

      render(){
          return(
              <nb.Container style = {{backgroundColor:"rgb(15, 146, 138)", width:"100%",height:"100%",flex:1}}>
<nb.Header searchBar rounded style = {{backgroundColor:"white"}} >

  <nb.Item >
  
    <nb.Icon name="ios-search" />
    <nb.Input placeholder="Search By Patient's Name" />

    <nb.Button style = {{backgroundColor:"rgb(15, 146, 138)"}} onPress = {()=>{Actions.home({text:"Hellooooo"})}}  >
            <nb.Text>Search</nb.Text>
          </nb.Button>
  </nb.Item>
 

        

</nb.Header>
<nb.Content style =  {{backgroundColor:"white",minHeight:"10%"}}  >
<TouchableHighlight onPress={this.click.bind(this)} underlayColor = "rgb(15, 146, 138)">
<nb.Card  >
  <nb.CardItem  >
      
    <nb.Body >
      <nb.Text >
        All Patients
      </nb.Text>
    </nb.Body>
  </nb.CardItem>
</nb.Card>
</TouchableHighlight>
<TouchableHighlight onPress={this.click.bind(this)} underlayColor = "rgb(15, 146, 138)">
<nb.Card>
  <nb.CardItem>
    <nb.Body>
      <nb.Text>
       Search By Date
      </nb.Text>
    </nb.Body>
  </nb.CardItem>
</nb.Card>
</TouchableHighlight>

</nb.Content>
                  </nb.Container>
          )
      }





  }



  export default Search