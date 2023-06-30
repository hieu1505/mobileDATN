import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome'

import Wallet from '../page/Home/Wallet';

import CustomDrawer from '../component/CustomDrawer';
import Profile from '../page/Home/Profile';
import ListCenter from '../page/Center/ListCenter';
import ListChildren from '../page/Home/ListChildren';
import ListActivity from '../page/Activity/ListActivity';
import Adropt_detail from '../page/Home/Adropt_detail';
// import Profile from '../page/Home/Profile';
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator  
    drawerContent={props => <CustomDrawer {...props} />}
    screenOptions={{
      headerShown: false,
      drawerActiveBackgroundColor: '#FFFF66',
      drawerActiveTintColor: '#110000',
      drawerInactiveTintColor: '#333',
      drawerLabelStyle: {
        marginLeft: -25,
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
      },
    }}
       >
      <Drawer.Screen name={'BottomTabNavigator'} component={BottomTabNavigator}  options={{
          title: 'Trang Chủ',
          drawerIcon: ({ color}) => (
            <Icon name="home-outline" size={18} color={color} />
          ),
        }} />
     
       <Drawer.Screen
        name="Danh sách trẻ"
        component={ListChildren}
        options={{
          drawerIcon: ({color}) => (
            <Icon  name="person-outline" size={22} color={color} />
          ),
        }}
      />
       <Drawer.Screen
        name="Các trung tâm"
        component={ListCenter}
        options={{
          drawerIcon: ({color}) => (
            <Icon2  name="university" size={22} color={color} />
          ),
        }}
      />
       <Drawer.Screen
        name="Các hoạt động"
        component={ListActivity}
        options={{
          drawerIcon: ({color}) => (
            <Icon2  name="newspaper-o" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Hồ sơ nhận nuôi"
        component={Adropt_detail}
        options={{
          drawerIcon: ({color}) => (
            <Icon2  name="credit-card" size={22} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen name={'Profile'} component={Profile}  options={{
          title: 'Notifications',
          drawerIcon: ({focused, color, size}) => (
            <Icon name="notifications" size={18} color={color} />
          ),
        }} /> */}
    </Drawer.Navigator>
  )
}
export default DrawerNavigator