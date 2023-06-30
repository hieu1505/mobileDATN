import {
    Image,
    Text, View, TextInput, TouchableOpacity,
    FlatList,
    ActivityIndicator, RefreshControl
} from 'react-native';
import React, { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';
import centerApi from '../../Api/centerApi';
import UIHeader from '../messenger/UIHeader';



function ListCenter({ navigation }) {
    const [isLoading, setIsLoading] = useState(false)
    const [refreshControl, setRefreshControl] = useState(false)
    const [searchtext, setsearchtext] = useState('')
    const [dataListcenter, setdataListcenter] = useState([])
    const [page, setpage] = useState(0)
    const [totalpage, settotalpage] = useState('')
    useEffect(() => {
        (async () => {
            try {
                const param = { page: page,key:searchtext }
                const authenticated = await AsyncStorage.getItem('access_token')
                console.log(authenticated)
                const centers = await centerApi.getallcenter({
                    params: param,
                    headers: {
                        Authorization: authenticated
                    }
                })
               
                if (page < centers.page.totalPages) {
                    setdataListcenter(centers.center)
                    setpage(centers.page.page)
                    settotalpage(centers.page.totalPages)
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [page,searchtext])
    
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View>
                <UIHeader title={'Danh sách Trung tâm'}
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
                style={{ marginTop: 5 }}
                showsVerticalScrollIndicator={false}
                data={dataListcenter}
                renderItem={({ item }) => (
                    <CenterItem props={item} opres={() => { navigation.navigate('CenterById', { id: item.id }) }} />
                )}
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
                onEndReachedThreshold={0.01}

            />
        </View>)
}
export default ListCenter
function CenterItem({ props, opres }) {
    // console.log(props.picture)
    return (
        <TouchableOpacity
            style={{ paddingStart: 20, marginBottom: 15 }}
            onPress={opres}
        >
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
            }}>
                {/* Render the card image */}
                <View style={{
                    height: 150,
                    width: 150,
                    backgroundColor: '#d0d8dc',
                    borderRadius: 20,
                }}>
                    <Image
                        source={{ uri: props?.picture || 'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/321609005_3225221311122977_2920611145513696996_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=rlC0iUT8wEIAX_vqZS8&_nc_ht=scontent.fdad3-5.fna&oh=00_AfAnS4n2gmHz-vvub5FonTp-vvx_25EjNweIZ6DCw5KvhA&oe=646EECF4' }}
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                        }}
                    />
                </View>

                {/* Render all the card details here */}
                <View style={{
                    height: 120,
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
                            {props.name}
                        </Text>

                    </View>

                    <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="mobile-phone" color='#306060' size={18} />
                        <Text style={{ fontSize: 12, color: '#a8a8a8', marginLeft: 5 }}>
                            {props.phoneNumber}
                        </Text>
                    </View>

                    

                    {/* Render distance and the icon */}
                    <View style={{ marginTop: 5, flexDirection: 'row' }}>
                        <Icon name="map-marker" color='#306060' size={18} />
                        <Text style={{ fontSize: 12, color: '#a8a8a8', marginLeft: 5 }}>
                            {props.adress}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}