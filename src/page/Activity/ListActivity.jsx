import { Image, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, FlatList, SafeAreaView, ImageBackground } from 'react-native';
import React, { useState,useEffect } from "react";
import Icon from 'react-native-vector-icons/FontAwesome'
import UIHeader from '../messenger/UIHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import activityApi from '../../Api/activityApi';
import moment from "moment";
function ListActivity({navigation}) {
    const [listacti,setlistacti]=useState([])
    useEffect(() => {
        (async () => {
            try {
              const param={}
              const authenticated = await AsyncStorage.getItem('access_token')
              console.log(authenticated)
              const data=await activityApi.getactivity({
                params:param,
                headers: {
                Authorization: authenticated
            }})
              console.log(data)
              setlistacti(data.activity)
            } catch (error) {
              console.log(error)
            }
          })()
    },[])
   

    return (
        <View style={{   flex: 1,
            backgroundColor: "#EBECF4" }}>
            <View>

            <UIHeader title={'Các hoạt động'}
        lefIconname={'arrow-left'}
        rightIconname={'search'}
        onpresslefIcon={() => {
            navigation.goBack()
        }}
        onpressrightIcon={() => {
           
        }}
    />
            </View>
            <FlatList
               showsVerticalScrollIndicator={false}
                style={{ marginHorizontal: 16}}
                data={listacti}
                renderItem={({ item, index }) => <Activityitem place={item} opres={()=>{navigation.navigate('ActivityByid',{id:item.id}) }} />}
                
            />
        </View>)
}
export default ListActivity
function Activityitem({ place,opres }) {
    return (
        <TouchableOpacity
        onPress={opres}
            style={{
                backgroundColor: "#FFF",
                borderRadius: 5,
                padding: 8,
                flexDirection: "row",
                marginVertical: 8
            }}
        >
            <Image source={{ uri:place?.center?.picture|| 'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/321609005_3225221311122977_2920611145513696996_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=rlC0iUT8wEIAX_vqZS8&_nc_ht=scontent.fdad3-5.fna&oh=00_AfAnS4n2gmHz-vvub5FonTp-vvx_25EjNweIZ6DCw5KvhA&oe=646EECF4' }} style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                marginRight: 16
            }} />
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: "500",
                            color: "#454D65"
                        }}>{place?.center?.name}</Text>
                        <Text style={{
                            fontSize: 11,
                            color: "#C4C6CE",
                            marginTop: 4
                        }}>
                           {moment(place?.updatedAt).fromNow()}
                        </Text>
                    </View>

                   
                </View>
                <Text style={{
                    marginTop: 16,
                    fontSize: 14,
                    color: "#838899"
                }}>{place.title}</Text>
                <Image source={{ uri:place?.img|| 'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/321609005_3225221311122977_2920611145513696996_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=rlC0iUT8wEIAX_vqZS8&_nc_ht=scontent.fdad3-5.fna&oh=00_AfAnS4n2gmHz-vvub5FonTp-vvx_25EjNweIZ6DCw5KvhA&oe=646EECF4' }} style={{
                    width: undefined,
                    height: 150,
                    borderRadius: 5,
                    marginVertical: 16
                }} resizeMode="cover" />
                <View style={{ justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'flex-end',}}>
                     <View style={{ flexDirection: 'row' }}>
                       
                    <Icon name="heart" size={24} color="red" style={{ marginRight: 16 }} />
                    <Text style={{ marginLeft: 5, }}>
                           {place?.totalLike}
                        </Text>
                    </View>     
                    <View style={{ flexDirection: 'row' }}>
                       
                    <Icon name="comment" size={24} color="blue" style={{ marginRight: 10 }} />
                    <Text style={{ marginLeft: 5,paddingEnd:10 }}>
                           {place?.totalComment}
                        </Text>
                    </View>     
                </View>
            </View>
        </TouchableOpacity>
    )
}
