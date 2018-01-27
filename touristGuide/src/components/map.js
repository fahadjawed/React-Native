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
  Image,
  Keyboard

} from 'react-native';
import ActionButton from 'react-native-action-button';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import RNGooglePlaces from 'react-native-google-places';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { connect } from 'react-redux';
import * as nb from 'native-base'
import Middleware from '../store/middleware/middleware'
function mapStateToProps(state) {
  return {
    region: state.region.region,
    details: state.region.nearby
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getregion: () => { dispatch(Middleware.region()) }
  }
}
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 243,
        longitude: 343434,
        error: null,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      map: false,
      marker: {
        latitude: 0,
        longitude: 0
      },
      arr: [],
      dir: false,
      load: false,
      direction: false,
      active: false,
      polyline: false,
      cord: null,
      origin: {},
      destination: {},
      image: ''
    };
  }

 
  componentWillReceiveProps(nextProps) {
    if (nextProps.region) {

      this.setState({
        region: nextProps.region,
        map: true,
        load: true
      })
    }

    if (nextProps.details) {

      this.setState({
        region: {
          latitude: nextProps.details[0].geometry.location.lat,
          longitude: nextProps.details[0].geometry.location.lng,
          latitudeDelta: nextProps.region.latitudeDelta,
          longitudeDelta: nextProps.region.longitudeDelta
        }
      })



    }

  }
  componentDidMount() {

    this.props.getregion()

    if (this.props.region) {
      if (this.props.details) {
        if (this.props.polyline) {

          this.direction(0)
        }
        this.setState({
          region: {
            latitude: this.props.details[0].geometry.location.lat,
            longitude: this.props.details[0].geometry.location.lng,
            latitudeDelta: this.props.region.latitudeDelta,
            longitudeDelta: this.props.region.longitudeDelta

          },
          map: true,
          load: true,
        })
      }
      else {
        this.setState({
          region: this.props.region,
          map: true,
          load: true
        })

      }

    }


  }


  direction(ind) {
    
    this.setState({
      direction: true
    })
    let start = { latitude: this.props.region.latitude, longitude: this.props.region.longitude };
    let end = { latitude: this.props.details[ind].geometry.location.lat, longitude: this.props.details[ind].geometry.location.lng }
  this.setState({
      origin: start,
      destination: end,
      polyline: true,
      direction: false
    })
   
  }

  location() {
    this.setState({
      region:{
        latitude:this.props.region.latitude,
        longitude:this.props.region.longitude,
        latitudeDelta:this.state.region.latitudeDelta,
        longitudeDelta:this.state.region.longitudeDelta

      }
    })
  }
  render() {
    return (
      <View style={{ height: "83%" }}  >

        {this.state.map ? null : this.state.load ? null : <nb.Spinner color="orange" />}
        {this.state.map ? null : this.state.load ? null : <nb.Text style={{ alignSelf: "center" }} >Getting Your Current Location Please Wait</nb.Text>}
        {this.props.map &&
          <View style={{ minHeight: "100%" }} >

            {this.state.map ?
              <MapView
                provider={PROVIDER_GOOGLE}
                style={
                  styles.map
                }
                region={this.state.region}
                showsUserLocation={true}
                onRegionChange={(region) => {
                  this.setState({
                    region: {
                      latitude: region.latitude,
                      longitude: region.longitude,
                      latitudeDelta: region.latitudeDelta,
                      longitudeDelta: region.longitudeDelta,
                    }
                  })
                }}

         
              >
                {this.props.details &&

                  this.props.details.map((val, ind) => {
                    var marker = {
                      latitude: val.geometry.location.lat,
                      longitude: val.geometry.location.lng

                    }

                    return (
                      <MapView.Marker coordinate={marker} key={ind} title={val.name}>
                        <MapView.Callout onPress={this.direction.bind(this,ind)} >
                          <Text>{val.name}</Text>
                          <Text style={{ color: "lightblue" }} > <nb.Icon name="md-navigate" style={{ fontSize: 17 }} />  Get Direction</Text>


                        </MapView.Callout>
                      </MapView.Marker>
                    )
                  })}

                {this.state.polyline &&
                  <MapViewDirections
                    origin={this.state.origin}
                    destination={this.state.destination}
                    apikey={"AIzaSyBNUAw7oJoBvf3PkzuU8WJXZmo5p5fYamw"}
                    strokeWidth={5}
                    strokeColor="#428EF7"
                    onReady={(result) => {
                  
                    }}
                  />
                }


              </MapView>
              : null
            }
            {this.state.map?
            <nb.Fab
              active={this.state.active}
              direction="up"
              containerStyle={{marginLeft:"-7%",marginBottom:"-3%"}}
              style={{ backgroundColor: "gray" }}
              position="topRight"
              onPress={this.location.bind(this)}>
              <nb.Icon name="ios-navigate-outline" />


            </nb.Fab>
:null}



          </View>
        }
      </View>
    );
  }


}
Map.propTypes = {
  provider: MapView.ProviderPropType,
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,

    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",


  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Map)
