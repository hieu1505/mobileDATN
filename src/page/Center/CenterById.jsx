import { Image, ImageBackground, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, FlatList, SafeAreaView, Animated, LogBox } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import centerApi from '../../Api/centerApi';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon3 from 'react-native-vector-icons/FontAwesome'
import activityApi from '../../Api/activityApi';



function CenterById({route,navigation}) {
    const[center,setcemter]=useState([])
    const[ListActivity,setListActivity]=useState([])
    const[countchildent,setcountchildent]=useState('')
    useEffect(() => {
        (async () => {
            try {
                const authenticated = await AsyncStorage.getItem('access_token')
                const data = await centerApi.getcenterByid(id, {
                    headers: {
                        Authorization: authenticated
                    }

                })
                const activitys=await activityApi.getAllactivity(id,{
                    headers: {
                        Authorization: authenticated
                    }
                })
                console.log('ac',activitys)
                setcountchildent(data.countchildent)
                setListActivity(activitys.activity)
                setcemter(data.message)

            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    const { id } = route.params
    console.log(id)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    elevation: 20,
                    marginHorizontal: 20,
                    marginTop: 20,
                    alignItems: 'center',
                    height: 300,
                }}>
                    <ImageBackground
                        style=
                        {{
                            height: '100%',
                            width: '100%',
                            borderRadius: 20,
                            overflow: 'hidden',
                        }}
                        source={{ uri: center?.picture||'https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/279104695_109836318380496_8294553641928407670_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=TJow52w0ePoAX-JBuQM&_nc_ht=scontent.fdad3-6.fna&oh=00_AfDwSLANW-55x46ePclaeTHt-UStW9yJp41wi08AVKgxKw&oe=64725C7B' }}>
                        <View style={{
                            paddingVertical: 20,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                        }}>
                            <TouchableOpacity onPress={navigation.goBack} style={{
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
                                
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                height: 45,
                                backgroundColor: '#99CC33',
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onPress={()=>{ navigation.navigate('Payment',{id:id})}}
                            >
                                <Text style={{ color: '#003366', fontSize: 18,padding:4 }}>Hỗ Trợ</Text>
               
              </TouchableOpacity>
                        </View>
                    </ImageBackground>
                    <View style={{
                        top: -20,
                        backgroundColor: '#FFCC33',
                        borderRadius: 10,
                        
                        paddingHorizontal: 20,

                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{ color: '#333399', fontSize: 18,textAlign:'center' }}>{center?.name}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, paddingHorizontal: 20, marginTop: 40 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon
                            name="email"
                            size={20}
                        // onPress={navigation.goBack}
                        />
                        <Text style={{ fontSize: 14, marginStart: 8 ,textAlign:'auto'}}>
                            {center?.email}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon2
                            name="map-marker-radius"
                            size={20}
                       
                        />
                        <Text style={{ fontSize: 15, marginStart: 8 }}>
                            {center?.adress}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                name="local-phone"
                                size={20}
                            // onPress={navigation.goBack}
                            />
                            <Text style={{ fontSize: 14, marginStart: 8 }}>
                               {center?.phoneNumber}
                            </Text>
                        </View>
                       
                    </View>

                </View>
                <Text style={{ fontSize: 18, marginStart: 10,fontWeight: 'bold' }}>
                    Cac Hoạt Động Tại Trung Tâm
                </Text>
                <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ height: 280, }}
        pagingEnabled
      >

        
        {ListActivity.map((e, index) => (<TouchableOpacity
            onPress={()=>{navigation.navigate('ActivityByid',{id:e.id})}}
          key={index}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 240,
            elevation: 2,
            backgroundColor: "#FFFF33",
            margin: 20,
            borderRadius: 15,
            marginBottom: 10,
            width: 340
          }}
        >
          <ImageBackground style={{
                width: 250,
                height: 200,
                marginRight: 10,
                borderRadius: 10,
                overflow: 'hidden',
                padding: 20,
            }} 
            source={{ uri: e.img }}
            // source={e.img}
            >
                
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon3 name="comment-o" size={20} color='blue' />
                        <Text style={{ marginLeft: 5, color: 'white' }}>
                            {e.totalComment}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon3 name="heart" size={20} color='red' />
                        <Text style={{ marginLeft: 5, color: 'white' }}>{e.totalLike}</Text>
                    </View>
                </View>
            </ImageBackground>
          <Text>{e.title}</Text>
        </TouchableOpacity>))}
      </ScrollView>
      {ListActivity.length>5&&<TouchableOpacity onPress={()=>{ navigation.navigate('ListCenter')}} style={{justifyContent:'center',alignItems:'center',paddingBottom:10}}>
      <Text>Xem thêm</Text>
    </TouchableOpacity>}
                <View style={{
                    height: 70,
                    backgroundColor: '#f6f6f6',
                    borderRadius: 10,
                    paddingHorizontal: 20,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                }}>
                    <View>
                        <Text
                            style={{ color: '#0099FF', fontWeight: 'bold', fontSize: 18 }}>
                            Các trẻ : {countchildent}
                        </Text>
                        <Text
                            style={{ fontSize: 12, color: '#A9A9A9', fontWeight: 'bold' }}>
                            Tại trung tâm
                        </Text>
                    </View>
                    <TouchableOpacity onPress={()=>{ navigation.navigate('ListChildrenbycenter',{id:id,center:center?.name})}} style={{
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#669966',
                        borderRadius: 10,
                        paddingHorizontal: 20,
                    }}>
                        <Text style={{ color: 'white' }}>Xem</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
}
export default CenterById

