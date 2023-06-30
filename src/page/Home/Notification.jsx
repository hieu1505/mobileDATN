import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity, FlatList
} from 'react-native';
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import UIHeader from "../messenger/UIHeader";
import notificationApi from "../../Api/notificationApi";
function Notification({ route, navigation }, props) {
    const [noti, setnoti] = useState([])
    const getnoti = async () => {

        try {
            const authenticated = await AsyncStorage.getItem('access_token')
            const accountid = jwt_decode(authenticated).id
            console.log(accountid)
            const respone = await notificationApi.getNotification(accountid,
                {
                    headers: {
                        Authorization: authenticated
                    }
                }
            )
            
            console.log(respone.message)
            setnoti(respone.message)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getnoti()
    }, [])
    const changeStatus=async (id,activity_id) => {

        try {
            console.log('change')
            const authenticated = await AsyncStorage.getItem('access_token')
            console.log(id,authenticated)
            const respone = await notificationApi.changeStatus(id,
                {
                    headers: {
                        Authorization: authenticated
                    }
                }
            )
            console.log(respone)
            navigation.navigate('ActivityByid',{id:activity_id})
        }
        catch (err) {
            console.log(err)
        }
    }
    return <View style={{
        flexDirection: 'column',
        flex: 1
    }}>
        <UIHeader title={"Thông Báo"}
            lefIconname={'arrow-left'}
            rightIconname={'ellipsis-v'}
            onpresslefIcon={() => {
                navigation.goBack()
            }}
        />
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginStart: 10
        }}>

        </View>
        <FlatList
            data={noti}
            renderItem={({ item }) => {
                return <TouchableOpacity
                onPress={()=>{
                    if(item.status==true)
                    {changeStatus(item.id,item.activity_id)}
                    else{
                        navigation.navigate('ActivityByid',{id:item.activity_id})
                    }
                   

                }
                
            }
                    style={{
                        flex: 1,
                        paddingLeft: 10,
                        paddingTop: 10,
                        backgroundColor: '#FFEFD5'
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 14, padding: 8 }}>{item.message}</Text>
                      {item.status==true&&<Text style={{
                            backgroundColor: 'blue',
                            right:4,
                            position: 'absolute',
                            fontSize: 4,
                            paddingHorizontal: 4,
                            borderRadius: 10
                        }}></Text>}  
                    </View>
                    <View style={{
                        height: 1,
                        backgroundColor: '#4B0082'
                    }}></View>
                </TouchableOpacity>
            }}
        ></FlatList>
        </View>
}
export default Notification