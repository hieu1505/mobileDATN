import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import accountApi from "../../Api/acountApi";
import { fontSizes, images } from "../constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
function ChangePassword({navigation },props) {
    const [pass , setpass]=useState('')
    const [newpass,setnewpass]=useState('')
    const [newpass22,setnewpass2]=useState('')
    const apichangepass=async (data)=>{
        try {
            const authenticated = await AsyncStorage.getItem('access_token')
        const accountid = jwt_decode(authenticated).id
            const mess=await accountApi.changepassword(accountid,data,{
                headers: {
                    'Authorization': authenticated,
                }
            })
              alert(mess.message)
        } catch (error) {
            alert(error.message)
        }
    }
    const [keyboardIsShow, setkeyboardIsShow] = useState(false)
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            setkeyboardIsShow(true)
        })
        Keyboard.addListener('keyboardDidHide', () => {
            setkeyboardIsShow(false)
        })
    })
    return <View style={{
        flex: 100,
        backgroundColor: 'white',
    }}>
        <View style={{
            height: 100,
            flexDirection: 'column',
            justifyContent: "space-around",
            alignItems: 'center',
            flex: 10
        }}><Text style={{
            color: '#FFCC33',
            fontSize: 20,
            fontWeight: 'bold',
            width: "100%"
        }}>  Thay Đổi Mật Khẩu</Text>
        </View>
        <View style={{
            flex: 20
        }}>
            <View style={{
                marginHorizontal: 15
            }}>
                <Text style={{
                    color: "#CCCC66",
                    fontSize: 18
                }}>Mật khẩu cũ:</Text>
                <TextInput
                    onChangeText={(text) => {
                        setpass(text)
                    }}
                    style={{ fontSize:18 }}
                   
                    secureTextEntry={true}
                    placeholderTextColor={'rgba(0,0,0,0.6'}
                ></TextInput>
                <View style={{
                    height: 1, backgroundColor: 'black',
                    width: '100%', marginHorizontal: 10,
                    alignSelf: "center",
                    marginBottom: 10
                }} />

            </View>
            <View style={{
                marginHorizontal: 15
            }}>
                <Text style={{
                    color: "#CCCC66",
                    fontSize: 18
                }}>Mật khẩu mới:</Text>
                <TextInput
                    onChangeText={(text) => {
                        setnewpass(text)

                    }}
                    style={{ fontSize:18 }}
                    placeholder=""
                    secureTextEntry={true}
                    placeholderTextColor={'rgba(0,0,0,0.6'}
                ></TextInput>
                <View style={{
                    height: 1, backgroundColor: 'black',
                    width: '100%', marginHorizontal: 10,
                    alignSelf: "center",
                    marginBottom: 10
                }} />
            </View>
            <View style={{
                marginHorizontal: 15
            }}>
                <Text style={{
                    color: "#CCCC66",
                    fontSize:18
                }}>Nhập lại mật khẩu  mới:</Text>
                <TextInput
                    onChangeText={(text) => {
                        setnewpass2(text)

                    }}
                    style={{ fontSize: 18 }}
                    placeholder=""
                    secureTextEntry={true}
                    placeholderTextColor={'rgba(0,0,0,0.6'}
                ></TextInput>
                <View style={{
                    height: 1, backgroundColor: 'black',
                    width: '100%', marginHorizontal: 10,
                    alignSelf: "center",
                    marginBottom: 10
                }} />
            </View>
        </View>
        {keyboardIsShow == false && <View style={{
            flex: 40,
            flexDirection:'row',
            justifyContent:'space-around'
        }}>
            <TouchableOpacity
            onPress={()=>{
                data={
                    password:pass,
                    newPassword:newpass
                }
                apichangepass(data)
                
            }}
            style={{
                backgroundColor: '#99FFFF',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                
                width: '30%',
                borderRadius: 14,
               
            }}><Text style={{padding: 10,
                fontSize: 12}}>Lưu thay đổi</Text></TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{
                navigation.goBack()
            }}
            style={{
                backgroundColor: '#FF9966',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                color: 'blue',
                width: '30%',
                borderRadius: 14,
                
            }}><Text style={{padding: 10,
                fontSize: 12}}>Hủy bỏ</Text></TouchableOpacity>
        </View>}
    </View>
}
export default ChangePassword