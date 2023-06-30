import { Image, ImageBackground, Text, View, StatusBar, TouchableOpacity, LogBox, Alert } from 'react-native';
import childrenApi from '../../Api/childrenApi';
import { RadioButton } from 'react-native-paper';
import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import strftime from 'strftime';
import Icon from 'react-native-vector-icons/MaterialIcons';
import adropt_detailAPi from '../../Api/adropt_detailapi';
import jwt_decode from "jwt-decode";
import adropt_requestApi from '../../Api/adropt_requestApi';
import { create } from 'react-test-renderer';

function ChildrentByid({ route, navigation }) {
    const { id } = route.params
    const [check, setchek] = useState(false)
    const [checkrequst,setcheckrequst]=useState(false)
    const [adropt_detail_id,setadropt_detail_id]=useState('')
    useEffect(() => {
        (async () => {
            try {
                const authenticated = await AsyncStorage.getItem('access_token')
                const accountid = jwt_decode(authenticated).id
                const data = await childrenApi.getchildrenbyid(id, {
                    headers: {
                        Authorization: authenticated
                    }

                })
                setchildren(data.message)
                const adropt_reques=await adropt_requestApi.checkadropt_requesbychildrentid(id,{
                    headers: {
                        Authorization: authenticated
                    }

                })
                console.log(adropt_reques)
                if(adropt_reques?.Adropt_request==false){
                    const adropt_detail = await adropt_detailAPi.getadropt_detailbyacountid(accountid, {
                        headers: {
                            Authorization: authenticated
                        }
                    })
                    console.log(adropt_detail)
                    if (adropt_detail?.Adropt_detail == false) {
                        setchek(true)
                    }
                    else {
                        setadropt_detail_id(adropt_detail?.Adropt_detail?.id)
                    }
                }
                else {
                    setcheckrequst(true)
                }
                
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    console.log(adropt_detail_id)
    const [children, setchildren] = useState([])
    gender = children?.gender == false ? '0' : '1'
    const [checked, setChecked] = useState(gender)
    console.log(gender)
    const Create= async ()=>{
        try { 
            const authenticated = await AsyncStorage.getItem('access_token')            
                data1 = {
                    children_id: id,
                    request: 'NEW',
                    adropt_detail_id:adropt_detail_id,
                    
                }
                console.log(data1)
                let mess=await adropt_requestApi.creatadropt_request(data1,{
                    headers: {
                        Authorization: authenticated
                    }
                })
                alert('Tạo hồ sơ thành công')
                setcheckrequst(true)
            }
           
           
         catch (error) {
            console.log(error)
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle={'light-content'} backgroundColor="#212121" />
            <ImageBackground
                source={{
                    uri: 'https://images.unsplash.com/photo-1507281736509-c6289f1ea0f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                }}
                style={{ flex: 0.4 }}
                resizeMode={'cover'}>
                <View style={{
                    marginTop: 10,
                    marginStart: 10,
                    height: 40,
                    width: 40,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Icon
                        name="arrow-back-ios"
                        size={20}
                        onPress={navigation.goBack}
                    />
                </View>
            </ImageBackground>
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={{
                            uri: children?.personalPicture || 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                        }}
                        style={{
                            width: 150,
                            height: 150,
                            borderRadius: 150 / 2,
                            borderWidth: 3,
                            borderColor: '#FFFFFF',
                            position: 'absolute',
                            zIndex: 2,
                        }}
                    />
                </View>
                <View style={{ marginTop: 70 }}>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 18,
                            textAlign: 'center',
                            color: '#212121',
                        }}>
                        {children?.name}
                    </Text>
                    <Text style={{ textAlign: 'center' }}>
                        {children?.center?.name}
                    </Text>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        <View style={{
                            paddingTop: 20,
                            marginHorizontal: 10,
                            flexDirection: 'row',
                            alignItems: 'center', paddingEnd: 25
                        }}>
                            <Text style={{
                                color: "black",
                                fontSize: 18
                            }}>Xuất thân:</Text>
                            <Text style={{
                                color: "black",
                                fontSize: 18,
                                marginStart: 10
                            }}>{children?.status}</Text>
                        </View>
                        <View style={{
                            paddingTop: 20,
                            marginHorizontal: 10,
                            flexDirection: 'row',
                            alignItems: 'center', paddingEnd: 25
                        }}>
                            <Text style={{
                                color: "black",
                                fontSize: 18
                            }}>Giới tính:</Text>
                            <RadioButton
                                value={"1"}
                                status={gender === "1" ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked("1");


                                }}
                            /><Text>Nam</Text>
                            <RadioButton
                                value={"2"}
                                status={gender === "0" ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked("0");

                                }}
                            /><Text>Nữ</Text>
                            <View style={{

                            }}></View>
                        </View>
                        <View style={{
                            paddingTop: 20,
                            marginHorizontal: 10,
                            flexDirection: 'row',
                            alignItems: 'center', paddingEnd: 25
                        }}>
                            <Text style={{
                                color: "black",
                                fontSize: 18
                            }}>Tuổi:</Text>
                            <Text style={{
                                color: "black",
                                fontSize: 18,
                                marginStart: 10
                            }}>{children?.age} tuổi</Text>
                        </View>
                        <View style={{
                            paddingTop: 20,
                            marginHorizontal: 10,
                            flexDirection: 'row',
                            alignItems: 'center', paddingEnd: 25
                        }}>
                            <Text style={{
                                color: "black",
                                fontSize: 18
                            }}>ngày nhận:</Text>
                            <Text style={{
                                color: "black",
                                fontSize: 18,
                                marginStart: 10
                            }}> {strftime('%d-%m-%Y', new Date(children?.JoinDate))}</Text>
                        </View>

                    </View>
                    <View style={{
                        marginTop:30,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly'
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Payment', { id: children?.center?.id })
                            }}
                            style={{
                                backgroundColor: '#99FFFF',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',

                                width: '30%',
                                borderRadius: 14,

                            }}><Text style={{
                                padding: 10,
                                fontSize: 12
                            }}> Hỗ trợ</Text></TouchableOpacity>
                       {!checkrequst&& <TouchableOpacity
                            onPress={() => { 
                                if(check==true){
                                    alert('Bạn cần tạo hồ sơ nhận nuôi')
                                }
                                Create()
                             }}
                            style={{
                                backgroundColor: '#FF9966',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                                color: 'blue',
                                width: '40%',
                                borderRadius: 14,

                            }}><Text style={{
                                padding: 10,
                                fontSize: 12
                            }}>Đăng ký nhận nuôi</Text></TouchableOpacity>}

                    </View>


                </View>
            </View>
        </View>
    );

}
export default ChildrentByid