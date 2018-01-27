import * as firebase from 'firebase'
import Action  from'../actions/actions'
import '../../config/fbconfig'
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import { Actions, ActionConst } from 'react-native-router-flux';

import {
    BackHandler,
  } from 'react-native';

export default class Middleware {
static signin (state){
    return (dispatch)=>{
   
        firebase.auth().signInWithEmailAndPassword(state.email, state.password).then((user)=>{
      
            dispatch(Action.Signin(user))
            Actions.home();

            
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
            // ...
          });
    }
}
static signout(){
    return(dispatch) =>{
        firebase.auth().signOut().then(()=>{
            dispatch(Action.Signout())
        })
    }
}

static signup(state){
 
    return(dispatch)=>{
        firebase.auth().createUserWithEmailAndPassword(state.email, state.password).then((user)=>{
            user.updateProfile({
                displayName:state.name
            }).then(()=>{
                dispatch(Action.Signup((user)))
           
            })

        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
            // ...
          });
    }
}
static region(){
    return(dispatch)=>{

        LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
            ok: "YES",
            cancel: "NO",
            enableHighAccuracy: false, // true => GPS AND NETWORK PROVIDER, false => ONLY GPS PROVIDER
            showDialog: true, // false => Opens the Location access page directly
            openLocationServices: true, // false => Directly catch method is called if location services are turned off
            preventOutSideTouch: false, //true => To prevent the location services window from closing when it is clicked outside
            preventBackClick: false //true => To prevent the location services popup from closing when it is clicked back button
        }).then((success)=> {
          navigator.geolocation.watchPosition(
            (position) => {
         
              
              let region= {
                latitude : position.coords.latitude,
                longitude :position.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              
              }
              dispatch(Action.Region(region))
            
            },
            (error) => alert(error),
            { enableHighAccuracy: false, timeout: 2000, maximumAge: 1000, distanceFilter: 10 },
          );
           ; // success => {alreadyEnabled: false, enabled: true, status: "enabled"}
        }).catch((error) => {
            // error.message => "disabled"
        });
         
        BackHandler.addEventListener('hardwareBackPress', () => { //(optional) you can use it if you need it
           LocationServicesDialogBox.forceCloseDialog();
        });
    }
}



}