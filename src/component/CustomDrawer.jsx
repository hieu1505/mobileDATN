import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import jwt_decode from "jwt-decode";
import accountApi from '../Api/acountApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const CustomDrawer = (props) => {
    const [account, setaccount] = useState([])
    const [token, settoken] = useState('')
    useEffect(() => {
        (async () => {
            try {
                const authenticated = await AsyncStorage.getItem('access_token')
                const accountid = jwt_decode(authenticated).id
                console.log(authenticated)
                settoken(authenticated)
                const data = await accountApi.getaccountById(accountid, {
                    headers: {
                        Authorization: authenticated
                    }
                })
                // console.log(data)
                setaccount(data.account)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{}}>
                <ImageBackground
                    source={{ uri: 'https://thuthuatnhanh.com/wp-content/uploads/2021/06/hinh-anh-tre-em-voi-nu-cuoi-toa-sang.jpg' }}
                    style={{ padding: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={{ uri: account?.profile?.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegCgK5aWTTuv_K5TPd10DcJxphcBTBct6R170EamgcCOcYs7LGKVy7ybRc-MCwOcHljg&usqp=CAU' }}
                            style={{ height: 70, width: 70, borderRadius: 40, marginBottom: 10 }}
                        />
                        <View>
                            <Text
                                style={{
                                    color: '#FFFF66',
                                    fontSize: 18,
                                    fontFamily: 'Roboto-Medium',
                                    marginBottom: 5,
                                    fontWeight: 'bold'
                                }}>
                                {account?.profile?.name}
                            </Text>
                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Icon name="map-marker-radius" color="#003399" size={20} />
                                <Text style={{ color: '#FFFF66', marginLeft: 20 }}>{account?.profile?.address}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Icon name="email" color="#003399" size={20} />
                                <Text style={{ color: "#FFFF66", marginLeft: 20 }}>{account?.email}</Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
            <TouchableOpacity onPress={() => {
                 AsyncStorage.removeItem('access_token')
                props.navigation.navigate('Login')}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Đăng Xuất
            </Text>
          </View>
        </TouchableOpacity>
            </View>
        </View>)
}
export default CustomDrawer
{/* <View style={{flexDirection:'row',alignItems:'center'}}>
<Image
source={{uri:account?.profile?.avatar||'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegCgK5aWTTuv_K5TPd10DcJxphcBTBct6R170EamgcCOcYs7LGKVy7ybRc-MCwOcHljg&usqp=CAU'}}
style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
/>
<Text
style={{
  color: '#fff',
  fontSize: 18,
  fontFamily: 'Roboto-Medium',
  marginBottom: 5,
}}>
{account?.profile?.name}
</Text>
</View> */}