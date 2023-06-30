import React from 'react';
import { View, StatusBar, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useTheme, Avatar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListCenter from '../page/Center/ListCenter';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../page/Home/Home';
import Profile from '../page/Home/Profile';
import EditProfile from '../page/Home/EditProfile';
import ListChildren from '../page/Home/ListChildren';
import ListActivity from '../page/Activity/ListActivity';
import ChangePassword from '../page/Home/ChangePassword';
import CenterById from '../page/Center/CenterById';
import ChildrentByid from '../page/Center/ChildrentByid';
import ListChildrenbycenter from '../page/Center/ListChildrenbycenter';
import ActivityByid from '../page/Activity/ActivityByid';
import Payment from '../page/Home/Payment';
import Adropt_detail from '../page/Home/Adropt_detail';
import ListProof from '../page/Home/ListProof';
import ListChildrentrequest from '../page/Home/ListChildrentrequest';
const Stack = createNativeStackNavigator();
const HomeStackScreen = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator     >
      <Stack.Screen
        name="home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile"
        component={Profile}
        options={{
          title: '',
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Icon
                name="menufold"
                size={30}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <MaterialCommunityIcons.Button
                name="account-edit"
                size={25}
                backgroundColor={colors.background}
                color="#191970"
                onPress={() => navigation.navigate('EditProfile')}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
      />
       <Stack.Screen
        name="ListChildren"
        component={ListChildren}
        options={{title: 'Danh sách các trẻ',headerShown: false }}
      />
       <Stack.Screen
        name="ListActivity"
        component={ListActivity}
        options={{title: 'Danh sách các hoạt động',headerShown: false }}
      />
      <Stack.Screen
        name="ListCenter"
        component={ListCenter}
        options={{title: 'Danh sách các hoạt động',headerShown: false }}
      />
      <Stack.Screen
        name="CenterById"
        component={CenterById}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="ChildrentByid"
        component={ChildrentByid}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="ListChildrenbycenter"
        component={ListChildrenbycenter}
        options={{title: '', headerShown: false }}
      />
       <Stack.Screen
        name="ActivityByid"
        component={ActivityByid}
        options={{title: '', headerShown: false }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{ headerShown: false }}
      />
      
    </Stack.Navigator>
  );
};

const ProfileStackScreen = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={
          {
            title: '',
            headerLeft: () => (
              <View style={{ marginLeft: 10 }}>
                <Icon
                  name="menufold"
                  size={30}
                  backgroundColor={colors.background}
                  color={colors.text}
                  onPress={() => navigation.openDrawer()}
                />
              </View>
            ),
            headerRight: () => (
              <View style={{ marginRight: 10 }}>
                <MaterialCommunityIcons.Button
                  name="account-edit"
                  size={25}
                  backgroundColor={colors.background}
                  color="#191970"
                  onPress={() => navigation.navigate('EditProfile')}
                />
              </View>
            ),
          }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        
      />
       <Stack.Screen
        name="Adropt_detail"
        component={Adropt_detail}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="ListChildrentrequest"
        component={ListChildrentrequest}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="ListProof"
        component={ListProof}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
      />
     
    </Stack.Navigator>
  );
}
export { HomeStackScreen, ProfileStackScreen }  