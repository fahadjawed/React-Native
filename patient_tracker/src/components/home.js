import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableHighlight,
    ScrollView,
    AsyncStorage
  } from 'react-native';
  import DatePicker from 'react-native-datepicker'
  import {connect}from "react-redux"
  import Middleware from "../store/middleware/middleware"
  import * as nb from 'native-base';
  import {Actions} from 'react-native-router-flux'
  import Sidebar from './sidebar'
function mapStateToProps(state){
return{
  data:state.get,
  // id:state.auth.user._id,
  user:state.auth.user
}
}
function mapDispatchToProps(dispatch){
  return{
    get : (id)=>{
      dispatch(Middleware.get(id))
    }
  }
}

  class Home extends Component{
      constructor(){
          super()
          this.state={
            active: false,
            search:false,
            data:[],
            all:[],
            name:"",
            loader:true,
            scroll:true,
            user:null
          }
      }
      componentDidMount(){

        if(this.props.user){
          this.props.get(this.props.user._id)

        }



        
       console.log(this.props.data)
       var month = new Date().getMonth()+1
       var day = new Date().getDate();
       var year = new Date().getFullYear()
       this.setState({date:year+"-"+month+"-"+day})

      }
      componentWillReceiveProps(nextProps){
        if(nextProps.user){
          
if(nextProps.data.get){
  console.log(this.state.data)
          this.setState({
            data:nextProps.data.get,
            all:nextProps.data.get,
            loader:false,
            user : nextProps.user
         
            
          
          
          })
        }
        }
        else{
          Actions.signin()
        }
      
        // try {
        //   AsyncStorage.setItem('@user', nextProps.user);
        //   console.log("done")
        // } catch (error) {
        //   // Error saving data
        // }

      }
      searchbydate(date){
        var arr =  []
        this.state.all.map((val,ind)=>{
          console.log(val)
          if(val.date===(date.toString())){
            arr.push(val)
            console.log(arr)
          }
        })
        console.log(date)
        this.setState({data:arr,search:false})
      
      }
      searchbyname(){
        if(this.state.name!== ''){
        var arr = []
        this.state.all.map((val,ind)=>{
          if(val.name===this.state.name){
            arr.push(val)
          }
        })
        this.setState({search:false,data:arr,name:""})
      }
      else{
        this.setState({data:this.state.all,search:false,name:""})
      
      }
      }
      closeDrawer = () => {
        this.drawer._root.close()
      };
      openDrawer = () => {
        this.drawer._root.open()
      };
      start(){
        this.setState({scroll:false}),console.log("hi")
      }
      end(){
        this.setState({scroll:true}),console.log("heyyyyy")

      }
      render(){
        var user = this.state.user;
        StatusBar.setBarStyle('light-content', true)
        StatusBar.setBackgroundColor("rgb(15, 146, 138)")
      
          return(
            <nb.Container  >
      
                <nb.Drawer 
                style = {{backgroundColor:"white"}}
        ref={(ref) => { this.drawer = ref; }}
        content={<Sidebar navigator={this.navigator} />}
        onClose={() => this.closeDrawer()} >
  
        <nb.Header style = {{backgroundColor:'rgb(15, 146, 138)"',width:"100%"}} >
            
<nb.Left>
  <TouchableHighlight onPress = {()=>{this.openDrawer()}} underlayColor = "rgb(15, 146, 138)" >
  
     <nb.Icon name='menu' style = {{color:"white"}}  />
</TouchableHighlight>
</nb.Left> 

         {this.state.search?
          
          <nb.Body   >
          <nb.Item  style = {{width:"150%"}} >
  
  
     <nb.Input placeholder="Enter Patient's Name" onSubmitEditing={this.searchbyname.bind(this)} style = {{color:"white"}} placeholderTextColor="white" onChangeText={(val)=>{this.setState({name:val}),console.log(val)}}   />
    
    
  </nb.Item>
           </nb.Body>
          
          :null}
      
       <nb.Right  >
  {this.state.search ? 
    <nb.Icon name="md-close" style = {{color:"white"}}  onPress = {()=>{this.setState({search:false})}}  />
        : <nb.Icon name="ios-search" style = {{color:"white"}} onPress ={()=>{this.setState({search:true})}} />}
       
       </nb.Right>

                 
       </nb.Header>
     
   {this.state.search? 
    <nb.Content style =  {{backgroundColor:"white",minHeight:"10%"}}  >
    <TouchableHighlight onPress = {()=>{this.setState({data:this.state.all,search:false})}} underlayColor = "rgb(15, 146, 138)">
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

    <nb.Card>
        <DatePicker
          style={{width: "100%"}}
          mode="date"
          
          format="YYYY-MM-D"
         maxDate={this.state.date}
        //hideText = {true}
       placeholder = "Search By Date"
       
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon = {false}
          customStyles = {{
            placeholderText:{
              color:"black"
            }
          }}
          
          onDateChange={this.searchbydate.bind(this)}
        >
      <nb.CardItem>
        <nb.Body>
          <nb.Text>
           Search By Date
          </nb.Text>
        </nb.Body>
      </nb.CardItem>
      </DatePicker>
    </nb.Card>

    
    </nb.Content>
    
    
    :
    this.state.loader? <nb.Spinner color='green' /> :
<nb.Content style = {{minHeight:"90%",margin:"1%"}}>
{  
  
  this.state.data.map?  this.state.data.map((val,ind)=>{
    
    return(
    <ScrollView  scrollEventThrottle={30} onScroll = {this.start.bind(this)} key = {ind}>
<nb.Card key = {ind}
 style = {{minHeight:"10%",padding :"2%"}} 
 >
      <nb.CardItem >
      <nb.Body>
      <nb.Text style = {{width:"90%",justifyContent:"center"}}>
       Patient Name: {val.name} 
      </nb.Text>
     
    </nb.Body>
<nb.Button style = {{backgroundColor:"rgb(15, 146, 138)"}} onPress = {()=>{Actions.patient({val,user})}}>
<nb.Text>Details</nb.Text>
</nb.Button>
    </nb.CardItem>

  </nb.Card>
  </ScrollView> 
      )
    }):null
    
  }
    </nb.Content>
    }

    {this.state.loader  
    
    
    
    ?
null
    
    :    <nb.Fab
    active={this.state.active}
    direction="up"
    containerStyle={{ }}
    style={{ backgroundColor: 'rgb(15, 146, 138)' }}
    position="bottomRight"
    onPress={() => Actions.form()}>
    <nb.Icon name="md-add" />
  </nb.Fab> }
   
  
      </nb.Drawer>

                </nb.Container>
          )
      }
  }

  export default connect(mapStateToProps,mapDispatchToProps)( Home)