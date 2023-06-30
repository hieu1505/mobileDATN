
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker,Callout} from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import Geocode from "react-geocode";
// import getlatlong from '../../Api/getlatlongApi';
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons';
import getCoordinatesFromAddress from '../../Api/getCoordinatesFromAddress';
import AsyncStorage from '@react-native-async-storage/async-storage';


import centerApi from '../../Api/centerApi';
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 280;
const CARD_WIDTH = width * 0.95;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
const ExploreScreen = ({ navigation }) => {
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);
  const [lat, setlat] = useState(0)
  const [long, setlong] = useState(0)
  const [locationstatus, setlocationstatus] = useState('')
  const [dataListcenter, setdataListcenter] = useState([])
  console.log(lat,long)
  // useEffect(async() => {
  //   const listener= mapAnimation.addListener(({ value }) => {

  //     let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
  //     if (index >= dataListcenter.length) {
  //       index = dataListcenter.length - 1;
  //     }
  //     if (index <= 0) {
  //       index = 0;
  //     }
  //     clearTimeout(regionTimeout);
  //     const regionTimeout = setTimeout(() => {
  //       if( mapIndex !== index ) {
  //         mapIndex = index;
  //         const { coordinate } = dataListcenter[index];
  //         _map.current.animateToRegion(
  //           {
  //             ...coordinate,
  //             latitudeDelta: 0.018,
  //             longitudeDelta: 0.018,
  //           },
  //           350
  //         );
  //       }
  //     }, 100)
  //   })
  //   return () => {
  //     mapAnimation.removeListener(listener);
  //   };
  // }, [mapAnimation, dataListcenter])
  const [searchtext, setsearchtext] = useState('')
  const [latsearch,setlatsearch]=useState(0)
  const [longsearch,setlongsearch]=useState(0)
  const interpolations = dataListcenter.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];
    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp"
    });
    return { scale };
  })
  
  const _map = React.useRef(null);
  
  useEffect(() => {

    const apiKey = 'aGkFs5hRrxVymJ7ulmDS';

    const fetchCoordinates = async () => {
      try {
        const authenticated = await AsyncStorage.getItem('access_token')
        const data = await centerApi.getallcenter({
          params: {key:searchtext},
          headers: {
            Authorization: authenticated
          }
        })
        let center = data.center
        const promises = center.map(async (course) => {
          console.log(course.adress);
          if(course.adress!=undefined){
            const coordinates = await getCoordinatesFromAddress(course.adress, apiKey);
          console.log('Latitude:', coordinates.latitude);
          console.log('Longitude:', coordinates.longitude);
          course.coordinate=coordinates
          course.latitude = coordinates.latitude;
          course.longitude = coordinates.longitude;
          }
          
          return course;
        });

        const updatedCenter = await Promise.all(promises);
        console.log(updatedCenter.length)
        if(updatedCenter.length!=0){
          setlatsearch(updatedCenter[0].latitude)
        setlongsearch(updatedCenter[0].longitude)
        }
        
        setdataListcenter(updatedCenter)


      } catch (error) {
        console.error(error);
      }
    };

    fetchCoordinates();
  }, [searchtext]);
  Geolocation.getCurrentPosition(
    (position) => {

      setlat(position?.coords?.latitude)
      setlong(position?.coords?.longitude)
    },
    (error) => {
      // See error code charts below.
      console.log(error.code, error.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );




  // var MapView = require('react-native-maps');
  return (<View style={{ flex: 1, }}>

    <MapView
    ref={_map}
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={{ flex: 1 }}
      region={{
        latitude: searchtext==''? lat:latsearch,
        longitude:searchtext==''? long:longsearch,
        latitudeDelta: 0.018,
        longitudeDelta: 0.018,
      }}
    >
      <Marker coordinate={{ latitude: lat, longitude: long }}
        // image={require('../../assets/map_marker.png')}
        title='cho hien tai cua toi'
      >
        {/* <Callout  >
        <View>
        <View style={{
          flexDirection:'row',
          alignItems:'flex-start',
          backgroundColor:'#ccc',
          borderWidth:0.5,
          padding:15
        }} >
          
          <View style={{
            flex: 2,
            padding: 10,
          }}>
            <View style={{ marginTop: 5, flexDirection: 'row' }}>
              <Icon name="university" color='#306060' size={18} />
              <Text numberOfLines={1} style={{
                marginLeft: 5,
                fontSize: 12,
                marginTop: 5,
                fontWeight: "bold",
              }}>shhsahd</Text>
            </View>
            <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="mobile-phone" color='#306060' size={18} />
            <Text style={{ fontSize: 12, color: '#a8a8a8', marginLeft: 5 }}>
              samsaml
            </Text>
          </View>

            <View style={{ marginTop: 5, flexDirection: 'row' }}>
              <Icon name="map-marker" color='#306060' size={18} />
              <Text numberOfLines={1} style={{ fontSize: 11, color: '#a8a8a8', marginLeft: 5 }}>
               ssafnkas;lk
              </Text>
            </View>
            <View style={{
              alignItems: 'center',
              marginTop: 5
            }}>
              <TouchableOpacity
                onPress={() => { }}
                style={{
                  borderColor: '#FF6347',
                  borderWidth: 1,
                  idth: '100%',
                  padding: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 3,
                  width:150
                }}
              >
                <Text style={{
                  color: '#FF6347',
                  fontSize: 14,
                  fontWeight: 'bold'
                }}>Chi tiết</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </View>
         </Callout> */}

      </Marker>
      {dataListcenter.map((item, index) =>{ 
        //  const scaleStyle = {
        //   transform: [
        //     {
        //       scale: interpolations[index].scale,
        //     },
        //   ],
        // };
        return(
        <Marker
          key={index}
          coordinate={{
            latitude: item.latitude,
            longitude: item.longitude,
          }}
          image={require('../../assets/map_marker.png')}
          // style={{scaleStyle}}
          // onPress={(e)=>onMarkerPress(e)}
        >
         <Callout onPress={() => { navigation.navigate('CenterById', { id: item.id }) }} >
         <View style={{
          // eflexDirection:'row',
          // alignItems:'flex-start',
          // backgroundColor:'#ccc',
          // borderWidth:0.5,
          // padding:15
        }} key={index}>
          {/* <Image
            source={{ uri: item?.picture || 'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/321609005_3225221311122977_2920611145513696996_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=rlC0iUT8wEIAX_vqZS8&_nc_ht=scontent.fdad3-5.fna&oh=00_AfAnS4n2gmHz-vvub5FonTp-vvx_25EjNweIZ6DCw5KvhA&oe=646EECF4' }}

            style={{
              flex:3,
              width: '100%',
              height: '100%',
              alignSelf: "center",
            }}
            resizeMode="cover"
          /> */}
          <View style={{
            // flex: 2,
           
          }}>
            <View style={{ marginTop: 5, flexDirection: 'row' }}>
              <Icon name="university" color='#306060' size={18} />
              <Text numberOfLines={1} style={{
                marginLeft: 5,
                fontSize: 12,
                marginTop: 5,
                fontWeight: "bold",
              }}>{item?.name}</Text>
            </View>
            <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="mobile-phone" color='#306060' size={18} />
            <Text style={{ fontSize: 12, color: '#a8a8a8', marginLeft: 5 }}>
              {item.phoneNumber}
            </Text>
          </View>

            <View style={{ marginTop: 5, flexDirection: 'row' }}>
              <Icon name="map-marker" color='#306060' size={18} />
              <Text numberOfLines={1} style={{ fontSize: 11, color: '#a8a8a8', marginLeft: 5 }}>
                {item.adress}
              </Text>
            </View>
            <View style={{
              alignItems: 'center',
              marginTop: 5
            }}>
              <TouchableOpacity
                onPress={() => { }}
                style={{
                  borderColor: '#FF6347',
                  borderWidth: 1,
                  idth: '100%',
                  padding: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 3,
                  width:150
                }}
              >
                <Text style={{
                  color: '#FF6347',
                  fontSize: 14,
                  fontWeight: 'bold'
                }}>Chi tiết</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
         </Callout>

        </Marker>
      )})}
    </MapView>

    <View
      style={{
        position: 'absolute',
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        flexDirection: "row",
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        marginEnd: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        // marginStart:5,
        elevation: 10,
      }}>


      <TextInput
      onChangeText={(text) => {
        setsearchtext(text)
    }}
        placeholder="Search here"
        placeholderTextColor="#000"
        autoCapitalize="none"
        style={{ flex: 1, padding: 0 }}
      />
      <Ionicons name="ios-search" size={20} />


    </View> 

     {/* <Animated.ScrollView
      // ref={_scrollView}
      horizontal
      // pagingEnabled
      scrollEventThrottle={1}
      showsHorizontalScrollIndicator={false}
      snapToInterval={CARD_WIDTH + 20}
      snapToAlignment="center"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
      }}
    contentInset={{
      top: 0,
      left: SPACING_FOR_CARD_INSET,
      bottom: 0,
      right: SPACING_FOR_CARD_INSET
    }}
    contentContainerStyle={{
      paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
    }}
    onScroll={Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: mapAnimation,
            }
          },
        },
      ],
      { useNativeDriver: true }
    )}
    >
      {dataListcenter.map((item, index) => (
        <View style={{
          elevation: 2,
          backgroundColor: "#FFF",
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          marginHorizontal: 10,
          shadowColor: "#000",
          shadowRadius: 5,
          shadowOpacity: 0.3,
          shadowOffset: { x: 2, y: -2 },
          height: CARD_HEIGHT,
          width: CARD_WIDTH,
          overflow: "hidden",
        }} key={index}>
          <Image
            source={{ uri: item?.picture || 'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/321609005_3225221311122977_2920611145513696996_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=rlC0iUT8wEIAX_vqZS8&_nc_ht=scontent.fdad3-5.fna&oh=00_AfAnS4n2gmHz-vvub5FonTp-vvx_25EjNweIZ6DCw5KvhA&oe=646EECF4' }}

            style={{
              flex: 3,
              width: "100%",
              height: "100%",
              alignSelf: "center",
            }}
            resizeMode="cover"
          />
          <View style={{
            flex: 2,
            padding: 10,
          }}>
            <View style={{ marginTop: 5, flexDirection: 'row' }}>
              <Icon name="university" color='#306060' size={18} />
              <Text numberOfLines={1} style={{
                marginLeft: 5,
                fontSize: 12,
                marginTop: 5,
                fontWeight: "bold",
              }}>{item?.name}</Text>
            </View>
            <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="mobile-phone" color='#306060' size={18} />
            <Text style={{ fontSize: 12, color: '#a8a8a8', marginLeft: 5 }}>
              {item.phoneNumber}
            </Text>
          </View>

            <View style={{ marginTop: 5, flexDirection: 'row' }}>
              <Icon name="map-marker" color='#306060' size={18} />
              <Text numberOfLines={1} style={{ fontSize: 11, color: '#a8a8a8', marginLeft: 5 }}>
                {item.adress}
              </Text>
            </View>
            <View style={{
              alignItems: 'center',
              marginTop: 5
            }}>
              <TouchableOpacity
                onPress={() => { }}
                style={{
                  borderColor: '#FF6347',
                  borderWidth: 1,
                  idth: '100%',
                  padding: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 3,
                  width:150
                }}
              >
                <Text style={{
                  color: '#FF6347',
                  fontSize: 14,
                  fontWeight: 'bold'
                }}>Chi tiết</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </Animated.ScrollView>  */}


  </View>);
}
export default ExploreScreen