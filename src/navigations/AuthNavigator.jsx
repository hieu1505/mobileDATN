import React from 'react';
import Login from '../page/Auth/Login';
import Signup from '../page/Auth/Signup';
import Forgotpassword from '../page/Auth/Forgotpassword';
import HomeStart from '../page/Auth/HomeStart';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
// import BottomTabNavigator from './BottomTabNavigator';
const Stack = createStackNavigator();

function AuthNavigator() {
    return (
        <Stack.Navigator  screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeStart" component={HomeStart} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Forgotpassword" component={Forgotpassword} options={{ headerShown: false }} />
            <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />
        </Stack.Navigator >
    );

}
export default AuthNavigator