import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  BackHandler,
  TouchableOpacity,
  Image

} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import Middleware from "../store/middleware/middleware"
import Action from '../store/actions/actions'
import { connect } from 'react-redux'
import { Container, Header, Content, List, ListItem, Icon, Left, Body, Right, Switch, Button } from 'native-base';
function mapStateToProps(state) {
  return {
    region: state.region.region,
    user: state.auth.user
  }

}
function mapDispatchToProps(dispatch) {
  return {
    nearby: (result) => { dispatch(Action.Nearby(result)) },
    signout: () => { dispatch(Middleware.signout()) }
  }
}
class SideBar extends Component {
  constructor() {
    super()
    this.state = {
      name: "",
      email: ""
    }
  }
  componentDidMount() {
    if (this.props.user) {
      this.setState({
        name: this.props.user.displayName,
        email: this.props.user.email
      })
    }
  }

  async location(place) {
    let key = "AIzaSyDmJn1sqH47E0jAXbl05q76PKwiyXEri2s"
    let current = this.props.region.latitude + "," + this.props.region.longitude
    let get = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${current}&radius=2000&type=${place}&key=${key}`)
    let data = await get.json()
    this.props.nearby(data.results)
    this.props.func()
    Actions.places({ result: data.results })


  }
  signout() {
    this.props.signout();
    Actions.signin()
  }

  render() {

    
    return (
      <View style={{ backgroundColor: "white", height: "100%" }}>
        <View style={{ height: "45%", backgroundColor: "orange" }}>
          <Image source={require("../images/side.png")} style={{ alignSelf: "center" }} />
          <Text style={{ fontSize: 20, fontWeight: "bold", padding: "2%" }}>{this.state.name}</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", padding: "2%" }}>{this.state.email}</Text>
          <Button style={{ backgroundColor: "black", width: "50%", alignSelf: "center" }} rounded onPress={this.signout.bind(this)}  >
            <Text style={{ color: "white", marginLeft: "20%" }}>Sign Out </Text>
            <Icon name="md-log-out" />
          </Button>
        </View>

        <List>
          <ListItem icon onPress={this.location.bind(this, "restaurant")} >
            <Left>
              <Icon name="ios-restaurant" />
            </Left>
            <Body>
              <Text>Restaurants</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />

            </Right>
          </ListItem>
          <ListItem icon onPress={this.location.bind(this, "cafe")} >
            <Left>
              <Icon name="ios-cafe" />
            </Left>
            <Body>
              <Text>Cafe</Text>
            </Body>
            <Right>

              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon onPress={this.location.bind(this, "bank")}>
            <Left>
              <Icon name="ios-cash" />
            </Left>
            <Body>
              <Text>Banks</Text>
            </Body>
            <Right>

              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon onPress={this.location.bind(this, "hospital")}>
            <Left>
              <Icon name="md-add" />
            </Left>
            <Body>
              <Text>Hospitals</Text>
            </Body>
            <Right>

              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        </List>

      </View>

    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)