import React, { Component } from 'react';
import * as nb from 'native-base';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux'
import Middleware from "../store/middleware/middleware"
function mapStateToProps(state) {
    return {
        user: state.auth
    }
}
function mapDispatchToProps(dispatch) {
    return {
        signup: (state) => {
            dispatch(Middleware.signup(state))

        }
    }
}
class Signup extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            name: "",
            password: ""
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.user.signin) {
            Actions.replace("home");
        }
    }
    click() {
        this.props.signup(this.state)
    }
    render() {
        return (
            <nb.Container style={{ flex: 1, justifyContent: "center", alignContent: "center", backgroundColor: "orange" }}>
                <View style={{ justifyContent: "center" }}>
                    <nb.H1 style={{ fontSize: 30, alignSelf: "center" }} > Tourist Guide </nb.H1>
                    <Image source={require("../images/vandrare4.png")} style={{ alignSelf: "center" }} />

                    <View >
                        <View style={{ backgroundColor: "white", width: "90%", alignSelf: "center", borderRadius: 10, padding: "3%", margin: "6%" }}>
                            <nb.Item>
                                <nb.Icon active name='md-mail' />
                                <nb.Input placeholder="Email" keyboardType="email-address" autoCapitalize="none" onChangeText={(val) => {
                                    this.setState({
                                        email: val
                                    })

                                }} />
                            </nb.Item>
                            <nb.Text>{"\n"}</nb.Text>
                            <nb.Item>
                                <nb.Icon active name='md-contact' />
                                <nb.Input placeholder="Name" onChangeText={(val) => {
                                    this.setState({
                                        name: val
                                    })

                                }} />
                            </nb.Item>
                            <nb.Text>{"\n"}</nb.Text>

                            <nb.Item>
                                <nb.Icon active name='md-key' />
                                <nb.Input placeholder="Password" autoCapitalize="none" secureTextEntry={true}
                                    onChangeText={(val) => {
                                        this.setState({
                                            password: val
                                        })

                                    }}
                                />
                            </nb.Item>
                            <nb.Text>{"\n"}</nb.Text>
                            <nb.Button onPress={this.click.bind(this)} block rounded style={{ width: "80%", alignSelf: "center", backgroundColor: "black" }}>
                                <nb.Text>Signup</nb.Text>
                                <nb.Icon active name='md-log-in' />

                            </nb.Button>
                            <nb.Text style={{ fontSize: 20, alignSelf: "center" }} onPress={() => { Actions.replace("signin") }}> Go To Login</nb.Text>

                        </View>
                    </View>
                </View>
            </nb.Container>
        )
    }





}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)