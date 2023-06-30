import * as React from 'react';
import { NavigationContainer,useNavigationContainerRef } from '@react-navigation/native';
import  { useEffect,useState } from 'react';
import {
  Button,
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AuthNavigator from './src/navigations/AuthNavigator';
import ChildrentByid from './src/page/Center/ChildrentByid';
import ExploreScreen from './src/page/Home/Expolore';
import ActivityByid from './src/page/Activity/ActivityByid';
import Adropt_detail from './src/page/Home/Adropt_detail';
import ListProof from './src/page/Home/ListProof';

const App = () => {
  useEffect(()=>{
    requestCameraPermission();
    
  },[])
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App location Permission',
          message:
            'Cool Photo App needs access to your location ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
       
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  // const navigationRef = useNavigationContainerRef()
  return (
    <NavigationContainer 
    // ref={navigationRef} 
    >
      {/* <CenterById/> */}
      {/* <ExploreScreen/> */}
      <AuthNavigator />
      {/* <Adropt_detail/> */}
    </NavigationContainer>
    // <EditProfile/>
  );
};

export default App;