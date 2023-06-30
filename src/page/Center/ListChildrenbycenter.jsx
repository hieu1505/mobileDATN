import React, { useState,useEffect } from "react";
import { Image, Text, View, TextInput,TouchableOpacity, FlatList,ActivityIndicator, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import childrenApi from "../../Api/childrenApi";
import AsyncStorage from '@react-native-async-storage/async-storage';
import strftime from 'strftime';
import UIHeader from "../messenger/UIHeader";
function ListChildrenbycenter({route,navigation}) {
    const { id,center } = route.params
    const [isLoading, setIsLoading] = useState(false)
    const [refreshControl, setRefreshControl] = useState(false)
    const [searchtext, setsearchtext] = useState('')
    const [dataListchildren, setdataListchildren] = useState([])
    const [page, setpage] = useState(0)
    const [totalpage, settotalpage] = useState('')
    useEffect(() => {
        (async () => {
            try {
              const param={page:page,key:searchtext}
              const authenticated = await AsyncStorage.getItem('access_token')
              console.log(authenticated)
              const childrens=await childrenApi.getallchildrentbycenter(id,{
                params:param,
                headers: {
                Authorization: authenticated
            }})
            if (page < childrens.page.totalPages) {
                console.log(childrens)
              setdataListchildren(childrens.children)
              setpage(childrens.page.page)
                settotalpage(childrens.page.totalPages)
            } 
            } catch (error) {
              console.log(error)
            }
          })()
    },[page,searchtext])
    return <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View>
        <UIHeader title={'Danh sách các trẻ'}
        lefIconname={'arrow-left'}
        rightIconname={'ellipsis-v'}
        onpresslefIcon={() => {
            navigation.goBack()
        }}
        onpressrightIcon={() => {
           
        }}
    />
            <View style={{
                height: 50,
                marginHorizontal: 10,
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center'

            }}>


                <TextInput autoCorrect={false}
                    onChangeText={(text) => {
                        setsearchtext(text)
                    }}
                    style={{
                        paddingEnd: 5,
                        height: 50,
                        flex: 1,
                        marginEnd: 5,
                        borderRadius: 5,
                        opacity: 0.5,
                        backgroundColor: '#A9A9A9'
                    }} />
                <Icon name='search'
                    size={20} color={'black'}
                    style={{
                        position: 'absolute',
                        top: 12,
                        right: 20
                    }}></Icon>
            </View>

            <View style={{ height: 1, backgroundColor: 'black', marginTop: 5 }}></View>
        </View>
        <FlatList
            data={dataListchildren}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item,index }) => <Chilfrenitem
            opres={()=>{navigation.navigate('ChildrentByid',{id:item.id}) } }
                props={item}  center={center}
            />}
            refreshControl={
                <RefreshControl refreshing={refreshControl} onRefresh={() => {
                    setRefreshControl(true)
                    console.log(page)
                    if (page > 0) { setpage(page - 1) }
                    setRefreshControl(false)
                }} colors={['green']} />
            }
            ListFooterComponent={() => (
                isLoading ? //  a==b ? b : a
                    <View style={{
                        marginTop: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        padding: 10,
                        // width : WIDTH,
                        // height : 50 ,
                        flexDirection: 'column'
                    }} >
                        <Text > Tải Thêm </Text>
                        <ActivityIndicator size="large" color='#0000ff' />
                    </View> : null
            )}
            onEndReached={() => {
                setIsLoading(true)
                console.log(page)
                console.log(totalpage)

                if (page < totalpage - 1) {
                    setpage(page + 1)
                    setIsLoading(false)
                }
                else {
                    console.log('khong load')
                    setIsLoading(false)

                }


            }}
            onEndReachedThreshold={0.2}
        />
    </View>
}
export default ListChildrenbycenter

function Chilfrenitem({props,opres,center}) {

    return (
        <TouchableOpacity
            onPress={opres}
            style={{
                height: 120,
                paddingLeft: 10,
                paddingTop: 10,
                flexDirection: 'row'
            }}>
            <Image style={{
                height: 100,
                width: 100,
            }}
                source={{ uri:props?.personalPicture ||'https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/314889784_142291915219117_1164862791585555120_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=hwET1L0VlBUAX87BV4c&_nc_ht=scontent.fdad3-6.fna&oh=00_AfDCnjCHIjQ1YPNIBpGR4DjVrxImG2sct3hnLV1EoUp3iw&oe=647183DF' }} />
            <View style={{
                paddingStart: 10,
                flex: 1,
                marginRight: 10
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{
                        color: '#056edf',
                        fontSize: 18,

                        fontWeight: 'bold'
                    }}>{props?.name}</Text>
                    <Text style={{
                        color: '#33CCCC',
                        fontSize: 18,
                        fontWeight: 'bold'
                    }}>{props?.age} tuổi</Text>
                  { props?.gender==0? <Icon name="female" color='#306060' size={20} />: <Icon name="male" color='#306060' size={20} />
                    }
                </View>
                <View style={{
                    height: 1,
                    backgroundColor: 'black',

                }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{
                            color: 'black',
                            fontSize: 12,
                        }}> Xuất thân: {props?.status}
                        </Text>
                        <Text style={{
                            fontSize: 15,
                            color: 'black'
                        }}>
                            {center}
                        </Text>
                        <Text style={{
                            color: 'black',
                            fontSize: 12,
                        }}>Ngày nhận : { strftime('%d-%m-%Y',new Date(props?.JoinDate))}
                        </Text>
                    </View>
                    
                </View>

            </View>
        </TouchableOpacity>
    )
}
// {
//     name:'ho hoang thien ',
//     age:25,
//     gender:1,
//     status:'mo coi',
//     JoinDate:'15-5-2023',
//     centername:'hkaksdm'
//  }