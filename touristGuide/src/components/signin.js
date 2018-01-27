import React, { Component } from 'react';
import * as nb from 'native-base';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    BackHandler,
    BackAndroid,
    Keyboard
    
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux'
import Middleware from "../store/middleware/middleware"
import Action from '../store/actions/actions'
import * as firebase from 'firebase'
import "../config/fbconfig"

function mapStateToProps(state) {
    return {
        user: state.auth
    }

}
function mapDispatchToProps(dispatch) {
    return {
        signin: (state) => {
            dispatch(Middleware.signin(state))
        },
        start : (user)=>{
            dispatch(Action.Signin(user))
        }
    }
}
class Signin extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            form:true
        }
    }
  
 
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.user.signin) {
    //         Actions.home();
    //     }
    // }
    
    // componentDidMount(){
    //     console.log("sadsad")
    
    // }
    click() {
        this.props.signin(this.state)
        Keyboard.dismiss();
    }

    render() {
        return (
            <nb.Container style={{ flex: 1, justifyContent: "center", alignContent: "center", backgroundColor: "orange" }}>
                <View style={{ justifyContent: "center" }} >
                    <nb.H1 style={{ fontSize: 30, alignSelf: "center" }} > Tourist Guide </nb.H1>
                    <Image source={require("../images/vandrare4.png")} style={{ alignSelf: "center" }} />
{this.state.form? 
    <View style={{ margin: "4%" }} >
    <View style={{ backgroundColor: "white", width: "90%", alignSelf: "center", borderRadius: 10, padding: "3%", margin: "6%" }}>
        <nb.Item>
            <nb.Icon active name='md-mail' />
            <nb.Input placeholder="Email" keyboardType="email-address" autoCapitalize="none" onChangeText={(val) => {
                this.setState({ email: val })
            }} />
        </nb.Item>
        <nb.Text>{"\n"}</nb.Text>

        <nb.Item>
            <nb.Icon active name='md-key' />
            <nb.Input placeholder="Password" autoCapitalize="none" secureTextEntry={true} onChangeText={(val) => {
                this.setState({
                    password: val
                })
            }} />
        </nb.Item>
        <nb.Text>{"\n"}</nb.Text>
        <nb.Button block rounded style={{ width: "80%", alignSelf: "center", backgroundColor: "black" }} onPress={this.click.bind(this)}>
            <nb.Text>Log In</nb.Text>
            <nb.Icon active name='md-log-in' />

        </nb.Button>
        <nb.Text style={{ fontSize: 20, alignSelf: "center" }} onPress={() => { Actions.replace("signup") }}> Go To Sign up</nb.Text>

    </View>
</View>


:null}
                   
                </View>
            </nb.Container>
        )
    }





}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
