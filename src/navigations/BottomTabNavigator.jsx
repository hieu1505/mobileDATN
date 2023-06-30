import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {ProfileStackScreen,HomeStackScreen} from './StackNavigation';

import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Search from '../page/Home/Search';
import ExploreScreen from '../page/Home/Expolore';
import Listmessenger from '../page/messenger/Listmessenger';
import ListCenter from '../page/Center/ListCenter';
import Notification from '../page/Home/Notification';
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  
  return (
    <Tab.Navigator screenOptions={ 
    { headerShown: false,
      tabBarShowLabel: false,}}>
       <Tab.Screen
      name="home1"
      component={HomeStackScreen}
      options={{
        
        tabBarColor: '#FF6347',
        tabBarIcon: ({color}) => (
          <Icon name="home" color={color} size={26} />
        ),
      }}
    />
     <Tab.Screen
      name="Notification"
      component={Notification}
      options={{
       
        tabBarColor: '#d02860',
        tabBarIcon: ({color}) => (
          <Icon name="bells" color={color} size={25} />
        ),
      }}
    />
     <Tab.Screen
      name="Search"
      component={Search}
      options={{
       
        tabBarColor: '#d02860',
        tabBarIcon: ({color}) => (
          <Icon2 name="search" color={color} size={26} />
        ),
      }}
    />
   
   <Tab.Screen
      name="Explore"
      component={ExploreScreen}
      options={{
       
        tabBarColor: '#d02860',
        tabBarIcon: ({color}) => (
          <Icon2 name="aperture" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="profile1"
      component={ProfileStackScreen}
      options={{
        title: 'profile',
        tabBarColor: '#694fad',
        tabBarIcon: ({color}) => (
          <Icon name="user" color={color} size={26} />
        ),
      }}
    />
    
  </Tab.Navigator>
    
  )
}
export default BottomTabNavigator



