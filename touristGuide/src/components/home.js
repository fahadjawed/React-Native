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
  Image

} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { connect } from 'react-redux'
import * as nb from 'native-base'
import { Actions, ActionConst } from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';

import SideBar from './sidebar'
import Action from '../store/actions/actions'
import Map from './map';
function mapStateToProps(state) {
  return {
    user: state.auth
  }
}
function mapDispatchToProps(dispatch) {
  return {
    nearby: (result) => { dispatch(Action.Nearby(result)) }

  }
}

// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {

      map: true,

      arr: [],
      dir: false,
      details: [],
      polyline: false
    };
  }
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };

  componentWillMount() {
    if (this.props.polyline) {
      this.setState({ polyline: true })

    }
  }

  render() {


    return (
      <nb.Drawer
        ref={(ref) => { this.drawer = ref; }}

        content={<SideBar func={this.closeDrawer} />}

        onClose={() => this.closeDrawer()}
        panOpenMask={10}
      >

        <View style={{ flex: 1 }} >

          <View style={{ backgroundColor: "orange", minHeight: "10%", justifyContent: "center", padding: "2%", flexDirection: "row" }} >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <nb.Button transparent
                onPress={() => this.openDrawer()}
              >
                <nb.Icon style={{ color: "black" }} name='md-menu' />
              </nb.Button>
            </View>
            <View style={{ flex: 2, justifyContent: "center" }}>
              <nb.Text style={{ fontSize: 20, fontWeight: "bold" }}>TOURIST GUIDE</nb.Text>
            </View>
            <View style={{ flex: 1 }} />
          </View>
          <GooglePlacesAutocomplete
            placeholder='Search'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed='auto'    // true/false/undefined
            fetchDetails={true}
            

            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
              var arr = []
              console.log(data, details);
              arr.push(details)
              this.setState({
                details: arr,
                map: true,
                polyline: false
              })
              this.props.nearby(arr)


            }}


            textInputProps={{
              onFocus: () => this.setState({ map: false, loader: true }),

            }}
            query={{
              //AIzaSyCIFuXJpLcbyVQhb2ezvj4cIsOGrRjDzt0
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyBB2JI0X2x_o3eZokx4TLUgA0MsSCzERgk',
              language: 'en', // language of the results
              types: 'establishment' // default: 'geocode'

            }}

            styles={{
              textInputContainer: {
                width: '100%',

              },
              description: {
                fontWeight: 'bold'
              },

            }}



          />

          {this.state.map &&

            <Map map={this.state.map} details={this.state.details} polyline={this.state.polyline} />
          }




        </View>
      </nb.Drawer>
    );
  }


}

//AIzaSyA0oJFyrv8fBJ_ctobSwxqnTEHxnUq8wzk 

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,

    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: "absolute",
    width: "100%",
    height: "80%"
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)