import { Image, ImageBackground, Text, View, TextInput, ScrollView, TouchableOpacity, FlatList, SafeAreaView, Animated, LogBox } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import UIHeader from '../messenger/UIHeader';
import activityApi from '../../Api/activityApi'
import commentApi from '../../Api/commentApi';
import likeapi from '../../Api/likeapi';
import moment from 'moment';

function ActivityByid({route, navigation }) {
    const { id } = route.params
    const [activity,setactivity]=useState([])
    const [listcomment,setlistcomment]=useState([])
    const [totalComment,settotalComment]=useState('')
    const  [totallike,settotallike]=useState('')
    const [like,setlike]=useState(true)
    const[token,settoken]=useState('')
    const [newcomment,setnewcomment]=useState('')
  
    useEffect(() => {
        (async () => {
            try {
              const authenticated = await AsyncStorage.getItem('access_token')
              settoken(authenticated)
              const accountid = jwt_decode(authenticated).id
              const data=await activityApi.getActivityByid(id,{
                headers: {
                Authorization: authenticated
            }})
            console.log(data)
            setactivity(data.activity)
            settotallike(data.activity.totalLikes)
            const check=await likeapi.checklike({idaccount:accountid,idactivity:id},{
                headers: {
                    Authorization: authenticated
                }
            })
            console.log(check)
            setlike(check.like)             
            } catch (error) {
              console.log(error)
            }
          })()
    },[])
    useEffect(() => {
        (async () => {
            try {
              const param={}
              const authenticated = await AsyncStorage.getItem('access_token')
            const comments=await commentApi.getallcommentbyactivity(id,{
                params:param,
                headers: {
                Authorization: authenticated
            }})
            console.log(comments)
            setlistcomment(comments.Comment)
           settotalComment(comments.page.totalElements)  
            } catch (error) {
              console.log(error)
            }
          })()
    },[])


    const heandelcheck = async () => {
      
        try {
            const accountid = jwt_decode(token).id
          console.log(accountid),
          console.log(id)
            const param={idaccount:accountid,idactivity:id
            }
            if(like==true){
               const likes=await likeapi.postdistlike(param,{
                
                headers: {
                Authorization: token
            }
               })
               setlike(!like)
               settotallike(likes.totallike)

            }
            else{
                const likes=await likeapi.postlike(param,{
                    params:param,
                    headers: {
                    Authorization: token
                }
                })
                setlike(!like)
                settotallike(likes.totallike)
            }
            
        } catch (error) {
            alert(error.message)
        }
    }

    
    const sendcommen=async()=>{
       
        try {
           
            if(newcomment!=''){
                const authenticated = await AsyncStorage.getItem('access_token')
                const accountid = jwt_decode(authenticated).id
                const param={idaccount:accountid,idactivity:id ,content:newcomment}
                console.log(param)
                const comments=await commentApi.postcomment(param,{
                   
                    headers: {
                    Authorization: authenticated
                }
                })
                console.log(comments)
                setnewcomment('')
                setlistcomment(comments.listcomment)
             
            }
            else{
                return;
            }
          
            
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <SafeAreaView style={{
            flex: 1,

        }}>
            <UIHeader title={'Hoạt Động'}
                lefIconname={'arrow-left'}
                rightIconname={'search'}
                onpresslefIcon={() => {
                    navigation.goBack()
                }}
                onpressrightIcon={() => {

                }}
            />
            <View style={{
                borderRadius: 5,
                paddingEnd: 15,
                paddingStart: 5,
                flexDirection: "row",
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 8
            }}>
                <Image source={{ uri: activity?.center?.picture||'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/321609005_3225221311122977_2920611145513696996_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=rlC0iUT8wEIAX_vqZS8&_nc_ht=scontent.fdad3-5.fna&oh=00_AfAnS4n2gmHz-vvub5FonTp-vvx_25EjNweIZ6DCw5KvhA&oe=646EECF4' }} style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    marginRight: 16
                }} />


                <Text style={{
                    fontSize: 15,
                    fontWeight: "500",
                    color: "#454D65"
                }}>{activity?.center?.name}</Text>
                <Text style={{
                    fontSize: 11,
                    color: "#C4C6CE",
                    marginTop: 4
                }}>
                    {moment(activity?.updatedAt).fromNow()}
                </Text>
            </View>
            <ScrollView style={{ backgroundColor: '#fff', height: 1000 }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                }}>{activity?.title}</Text>
                <Image source={{ uri:activity?.img ||'https://www.bootdey.com/image/280x280/6495ED/000000' }} style={{
                    height: 180,

                }} />
                <Text style={{
                    fontSize: 14,
                    lineHeight: 20
                }}>{activity?.content}</Text>

            </ScrollView>
            <View style={{
                justifyContent: 'space-around',
                flexDirection: 'row',
                alignItems: 'flex-end',
                marginTop:5
            }}>
                <TouchableOpacity onPress={()=>{heandelcheck()}} style={{backgroundColor:!like?'blue':'white',padding:5,borderRadius: 50,width:80,alignItems: 'center',marginTop:5}}>
                    <Text style={{color:!like?'white':'black'}}>Thich</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <Icon name="heart" size={24} color="red" style={{ marginRight: 16 }} />
                    <Text style={{ marginLeft: 5, }}>
                        {totallike}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Icon name="comment" size={24} color="blue" style={{ marginRight: 10 }} />
                    <Text style={{ marginLeft: 5, paddingEnd: 10 }}>
                       {totalComment}
                    </Text>
                </View>
            </View>

            <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginTop: 10,
            }}>Comments:</Text>
            <FlatList
                data={listcomment}
                extraData={this.state}
                ItemSeparatorComponent={() => {
                    return <View style={{
                        height: 1,
                        backgroundColor: '#CCCCCC',
                    }} />
                }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={item => {
                    const Notification = item.item
                    return (
                        <View style={{
                            paddingLeft: 19,
                            paddingRight: 16,
                            paddingVertical: 12,
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                        }}>
                            <TouchableOpacity onPress={() => { }}>
                                <Image style={{
                                    width: 45,
                                    height: 45,
                                    borderRadius: 22,
                                    marginLeft: 20,
                                }} source={{ uri:Notification?.account?.profile?.avatar||'https://bootdey.com/img/Content/avatar/avatar1.png'  }} />
                            </TouchableOpacity>
                            <View style={{
                                marginLeft: 16,
                                flex: 1,
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginBottom: 6,
                                }}>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                    }}>{Notification?.account?.profile?.name}</Text>
                                    <Text style={{
                                        fontSize: 11,
                                        color: '#808080',
                                    }}>{moment(Notification?.updatedAt).fromNow()}</Text>
                                </View>
                                <Text rkType="primary3 mediumLine">{Notification?.content}</Text>
                            </View>
                        </View>
                    )
                }}
            />
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                margin: 10,
            }}>
                <TextInput
                    style={{
                        flex: 1,
                        height: 40,
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 5,
                        padding: 5,
                        marginRight: 10,
                    }}
                      onChangeText={(text) => {setnewcomment(text)}}
                      value= {newcomment}
                    placeholder="Write a message"
                />
                <TouchableOpacity 
                onPress={()=>{sendcommen()}}
                style={{
                    backgroundColor: 'blue',
                    padding: 10,
                    borderRadius: 5,
                }} >
                    <Text style={{
                        color: 'white',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}>Send</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

}
export default ActivityByid
