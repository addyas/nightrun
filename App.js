import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';

export default class App extends Component {
  state = {
    //mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    errorMessage: null,
    location: {coords: {latitude: 0, longitude:0}},
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.025,
      longitudeDelta: 0.0125,
    },
    markers: [{
      title: 'Night Run',
      description: "Get here, before it's too late.",
      coordinate: {
        latitude: 0,
        longitude: 0,
       },
      },
      {
        title: 'Clue',
        description: "Find the Night Watcher.",
        coordinate: {
          latitude: 0,
          longitude: 0,
        },

      },
      {
        title: 'Escape',
        description: "The dark rajin have been unleashed. Flee the red.",
        coordinate: {
          latitude: 0,
          longitude: 0,
        },
      },
      {
        title: 'Supplies',
        description: "Survive the night.",
        coordinate: {
          latitude: 0,
          longitude: 0,
        },
      },
      {
        title: 'Fight Crime',
        description: "Do the job your father can't.",
        coordinate: {
          latitude: 0,
          longitude: 0,
        },
      }],
  };

  componentWillMount(){
    this._watchLocationAsync();
  }

  _watchLocationAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
    if(status !== 'granted'){
      this.setState({errorMessage: 'Permission to access location denied',
      });
    }

    let location = await Location.watchPositionAsync(GEO_OPTIONS, this.locationChanged);

  };

  locationChanged = (location) => {
    let markers = this.state.markers.map((marker) => {
      let tempMarker = marker;
      tempMarker.coordinate = this.randomGeo(location.coords, 2000);//2000m
      return tempMarker;
   });
    region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.025,
    },
    this.setState({location, region, markers});
  }

  randomGeo = (center, radius) => {
    var y0 = center.latitude;
    var x0 = center.longitude;
    var rd = radius / 111300;

    var u = Math.random();
    var v = Math.random();

    var w = rd * Math.sqrt(u);
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);

    return {
        'latitude': y + y0,
        'longitude': x + x0
    };
}

  distance = (lat1, lon1, lat2, lon2) => {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

  /*renderMarkers(){
    return(


    );
  }*/

  render() {
    return (


        <MapView
          style={styles.container}
          region={this.state.region}
          showsUserLocation={true}
          customMapStyle={mapStyle}>

            {this.state.markers.map( (marker) => (
              <MapView.Marker
                title={marker.title}
                description={marker.description}
                coordinate={marker.coordinate}
              />
            ))}
        </MapView>


    );
  }
}

const GEO_OPTIONS = {enableHighAccuracy: true, timeInterval: 2000};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});

const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#c2292c"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#050505"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#1d241a"
      }
    ]
  },
  {
    "featureType": "landscape.natural.terrain",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#53472b"
      },
      {
        "weight": 2
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#c2292c"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#c1282d"
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#34212c"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#5a1d16"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#10010a"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "poi.school",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2d260b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#131211"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#413225"
      },
      {
        "visibility": "on"
      },
      {
        "weight": 1
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#723f1d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#11110f"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#41322f"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#c2292c"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#242424"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#5a1d16"
      },
      {
        "weight": 0.5
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#0d0c0e"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
];
