import React ,{useEffect,useState}from 'react';
import { View, StatusBar, SafeAreaView } from 'react-native';
import { Avatar, Title, Caption, Text, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import jwt_decode from "jwt-decode";
import accountApi from '../../Api/acountApi';

import AsyncStorage from '@react-native-async-storage/async-storage';

function Profile({navigation},props) {
  const [account,setaccount]=useState([])
  const [token,settoken]=useState('')
  useEffect(() => {
    (async () => {
      try {
        const authenticated = await AsyncStorage.getItem('access_token')
        const accountid = jwt_decode(authenticated).id
        console.log(authenticated)
        settoken(authenticated)
        const data=await accountApi.getaccountById(accountid,{
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
  },[])
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 30, marginBottom: 25 }}>
        <View style={{ flexDirection: 'row', marginTop: 15 ,alignItems:'center'}}>
          <Avatar.Image
            source={{uri:account?.profile?.avatar||'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegCgK5aWTTuv_K5TPd10DcJxphcBTBct6R170EamgcCOcYs7LGKVy7ybRc-MCwOcHljg&usqp=CAU'}}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title style={{ marginTop: 15, marginBottom: 5, fontSize: 24, fontWeight: 'bold' }}>
            {account?.profile?.name}
            </Title>
           
          </View>
        </View>
      </View>

      <View style={{ paddingHorizontal: 30, marginBottom: 25 }}>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Icon name="map-marker-radius" color="#777777" size={20} />
          <Text style={{ color: '#777777', marginLeft: 20 }}>{account?.profile?.address}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Icon name="phone" color="#777777" size={20} />
          <Text style={{ color: '#777777', marginLeft: 20 }}>{account?.profile?.phoneNumber}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Icon name="email" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>{account?.email}</Text>
        </View>
      </View >

      <View style={{ marginTop: 10 }}>
        
        <TouchableRipple onPress={() => {navigation.navigate('Adropt_detail') }}>
          <View style={{ flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,}}>
            <Icon name="credit-card" color="#FF6347" size={25} />
            <Text style={{ color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,}}>Hồ sơ nhận nuôi </Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {navigation.navigate('ListChildrentrequest') }}>
          <View style={{ flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,}}>
            <Icon name="human-male-child" color="#FF6347" size={25} />
            <Text style={{ color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,}}>Các trẻ muốn nhận nuôi </Text>
          </View>
        </TouchableRipple>
      
        <TouchableRipple onPress={() => {navigation.navigate('ChangePassword') }}>
          <View style={{  flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,}}>
            <Icon name="account-check-outline" color="#FF6347" size={25} />
            <Text style={{color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,}}>Đổi mật khẩu</Text>
          </View>
        </TouchableRipple>
        
        <TouchableRipple onPress={() => { 
            AsyncStorage.removeItem('access_token')
            navigation.navigate('Login')
         }}>
          <View style={  {flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,}}>
            <Icon name="share-outline" color="#FF6347" size={25} />
            <Text style={{color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,}}>Đăng xuất</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  )
}

export default Profile;