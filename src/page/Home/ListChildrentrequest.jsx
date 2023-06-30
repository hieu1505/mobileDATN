import { Image, ImageBackground, Text, View, StatusBar, TouchableOpacity, LogBox, Alert, FlatList } from 'react-native';
import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import UIHeader from '../messenger/UIHeader';
import adropt_detailAPi from '../../Api/adropt_detailapi';
import adropt_requestApi from '../../Api/adropt_requestApi';
import jwt_decode from "jwt-decode";

function ListChildrentrequest({ navigation }) {
    const data = [
        { label: 'Độc thân', value: '1' },
        { label: 'Ly hôn', value: '2' },
        { label: 'Đã kết hôn', value: '3' },
        { label: 'Vợ hoặc chồng đã chết', value: '4' },

    ];
    const [check, setchek] = useState(false)
    const [Listrequset,setListrequset]=useState([])
    const [adropt_detail_id,setadropt_detail_id]=useState('')
    useEffect(() => {
        (async () => {
            try {
                const authenticated = await AsyncStorage.getItem('access_token')
                const accountid = jwt_decode(authenticated).id
                const adropt_detail = await adropt_detailAPi.getadropt_detailbyacountid(accountid, {
                    headers: {
                        Authorization: authenticated
                    }
                })
                
                if (adropt_detail?.Adropt_detail == false) {
                    setchek(true)
                }
                else {
                    setadropt_detail_id(adropt_detail?.Adropt_detail?.id)
                    const lists=await adropt_requestApi.getlistadropt_requesbyaccount(adropt_detail?.Adropt_detail?.id,{
                        headers: {
                            Authorization: authenticated
                        }
                    })
                    console.log(lists)
                    setListrequset(lists?.adropt_request)
                }
                


            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    const Delete= async (idrequest)=>{
        try { 
            const authenticated = await AsyncStorage.getItem('access_token')
            const data=await adropt_requestApi.Deleteadropt_reques(idrequest,{
                headers: {
                    Authorization: authenticated
                }})
               console.log(data) 
               alert('huỷ thành công')
               const lists=await adropt_requestApi.getlistadropt_requesbyaccount(adropt_detail_id,{
                headers: {
                    Authorization: authenticated
                }
            })
            
            setListrequset(lists?.adropt_request)
           
        } catch (error) {
            console.log(error)
        }
    }
    console.log(Listrequset)
    return <View style={{
        flexDirection: 'column',
        flex: 1
    }}>
        <UIHeader title={"Các trẻ muốn nhận nuôi"}
            lefIconname={'arrow-left'}
            rightIconname={'ellipsis-v'}
            onpresslefIcon={() => {
                navigation.goBack()
            }}
        />
        {check ? <View style={{
            marginTop: 70,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{
                fontSize: 20,
                color: 'red'
            }}>Bạn chưa tạo hồ sơ nhận nuôi</Text>
            <Text style={{
                fontSize: 14,
                color: 'red',
                marginTop: 10
            }}>hãy tạo hồ sơ</Text>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Adropt_detail')
                }}
                style={{
                    backgroundColor: '#99FFFF',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: 10,
                    width: '30%',
                    borderRadius: 14,

                }}><Text style={{
                    padding: 10,
                    fontSize: 12
                }}> Tạo Hồ sơ </Text></TouchableOpacity>

        </View>



            : <View style={{
                marginTop: 10,

            }}>
                <FlatList
                    style={{ marginTop: 5 ,marginBottom: 45 }}
                    showsVerticalScrollIndicator={false}
                    data={Listrequset}
                    renderItem={({ item }) => (
                        <View
                            style={{ paddingStart: 10, marginBottom: 15 }}
                            onPress={() => { }}
                        >
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',

                            }}>
                                {/* Render the card image */}
                                <View style={{
                                    height: 100,
                                    width: 100,
                                    backgroundColor: '#d0d8dc',
                                    borderRadius: 20,
                                }}>
                                    <Image
                                        source={{ uri: item?.children?.personalPicture||'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/321609005_3225221311122977_2920611145513696996_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=rlC0iUT8wEIAX_vqZS8&_nc_ht=scontent.fdad3-5.fna&oh=00_AfAnS4n2gmHz-vvub5FonTp-vvx_25EjNweIZ6DCw5KvhA&oe=646EECF4' }}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            resizeMode: 'contain',
                                        }}
                                    />
                                </View>

                               
                                <View style={{
                                    height: 100,
                                    backgroundColor: 'white',
                                    flex: 1,
                                    borderTopRightRadius: 10,
                                    borderBottomRightRadius: 10,
                                    padding: 20,
                                    justifyContent: 'center',
                                }}>
                                    {/* Name and gender icon */}
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text
                                            style={{ fontWeight: 'bold', color: '#616161', fontSize: 18 }}>
                                            {item?.children?.name}
                                        </Text>

                                    </View>

                                    <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>

                                        <Text style={{ fontSize: 12, color: '#a8a8a8', marginLeft: 5 }}>
                                        {item?.children?.center?.name}
                                        </Text>
                                    </View>

                                    <Text style={{ fontSize: 12, marginTop: 5, color: '#a8a8a8' }}>
                                    {item?.children?.age} tuổi
                                    </Text>

                                    {/* Render distance and the icon */}
                                    <View style={{ marginTop: 5, flexDirection: 'row' }}>

                                        <Text style={{ fontSize: 12, color: '#a8a8a8', marginLeft: 5 }}>
                                           Xuất thân: {item?.children?.status}
                                        </Text>
                                    </View>
                                </View>
                                
                            </View>
                            <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            backgroundColor: 'white',
        }}>
          {item?.request=='NEW'&& <Text style={{padding: 10, fontSize: 14,color: 'blue',}}>Chờ xác nhận</Text>}
          {item?.request!='NEW'&&  item?.request!='accept'?<Text style={{padding: 10, fontSize: 14,color: 'blue',}}> Đã chấp thuận</Text>:item?.request!='NEW'&&<Text style={{padding: 10, fontSize: 14,color: 'red',}}> Không chấp thuận</Text>}
           { item?.request=='NEW'&&<TouchableOpacity
           onPress={() => { Delete(item.id)}}
            style={{
                backgroundColor: '#FF9966',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                color: 'blue',
                borderRadius: 14,
                
            }}><Text style={{padding: 5,
                fontSize: 14}}>Huỷ yêu cầu</Text></TouchableOpacity>}
        </View>
                            
                            <TouchableOpacity onPress={() => { navigation.navigate('ChildrentByid', { id: item?.children_id }) }} style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 15, backgroundColor: '#BDB76B' }}>
                                <Text>Chi tiết</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />

            </View>}
    </View>
}
export default ListChildrentrequest