import React, { Component } from 'react';
import { PermissionsAndroid } from 'react-native'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  BackHandler,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {connect} from 'react-redux';
import * as nb from 'native-base';
import {Actions,ActionConst} from 'react-native-router-flux';
import Action from '../store/actions/actions'


function mapStateToProps(state){
  return{
    user:state
  }
}
function mapDispatchToProps(dispatch){
return{
  nearby:(result)=>{dispatch(Action.Nearby(result))}
  
}
}
class Places  extends Component {
    constructor(){
        super()
        this.state={
            image:''
        }
    }
  
    direction(val){
      let arr = [];
      arr.push(val);
      this.props.nearby(arr);
      Actions.home({polyline:true})
    }
    show(){
      this.props.nearby(this.props.result)
      Actions.home({polyline:false})
      // Actions.pop()
    }
    render(){
        return(
            <nb.Container style = {{flex:1,height:"100%"}} >
        
                
        <View style  ={{backgroundColor:"orange",minHeight:"10%",justifyContent:"center",padding:"2%",flexDirection:"row"}} >
        <View style = {{flex:1,justifyContent:"center"}}>
      
        </View>
        <View style = {{flex:3,justifyContent:"center"}}>
     
        </View>
       <View style = {{flex:4,justifyContent:"center"}} >
       <nb.Button transparent onPress={this.show.bind(this)}>
         <nb.Text> <nb.Icon  style={{color:"black"}} name = "md-map"  /> Show On Map </nb.Text>
         </nb.Button>

       </View>

        </View>
        <ScrollView>
        {this.props.result.map((val,ind)=>{
            return(
<nb.Card key={ind} style =  {{flex:1}} >
                            <nb.CardItem>
                              <nb.Left>
                                {/* {<nb.Thumbnail source={{ uri: this.state.image }} style={{ width: 50, height: 50 }} />} */}



                                <nb.Body>
                                  <nb.Text>{val.name}</nb.Text>
                                  <nb.Text note>{val.types[0]}</nb.Text>
                                </nb.Body>
                              </nb.Left>
                            </nb.CardItem>
                            <nb.CardItem cardBody>
                            <Text >{val.vicinity}</Text>

                            </nb.CardItem>
                            <nb.CardItem>
                              <nb.Left>
                                <nb.Button style= {{backgroundColor:"black"}} onPress = {this.direction.bind(this,val)}>
                                  <nb.Icon active name="md-navigate" />
                                  <nb.Text >Get Direction</nb.Text>
                                </nb.Button>
                              </nb.Left>
                              <nb.Body>
                                <nb.Button   transparent>
                                  <nb.Icon active name="md-star-half" />
                                  <nb.Text  > Rating:{val.rating}</nb.Text>
                                </nb.Button>
                              </nb.Body>
                            </nb.CardItem>
                          </nb.Card>
            )
        })}
        </ScrollView>
                </nb.Container>




        )
    }




}





export default connect(mapStateToProps,mapDispatchToProps) (Places)