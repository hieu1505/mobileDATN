import { Image, ImageBackground, Text, View, TextInput, ScrollView, TouchableOpacity, FlatList, SafeAreaView, Animated, LogBox } from 'react-native';

import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon2 from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/FontAwesome'
import { sliderData } from '../../model/data';
import jwt_decode from "jwt-decode";
import accountApi from '../../Api/acountApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import centerApi from '../../Api/centerApi';
import activityApi from '../../Api/activityApi';


const Home = ({ navigation }) => {
  const [dataListcenter, setdataListcenter] = useState([])
  const [account, setaccount] = useState([])
  const [token, settoken] = useState('')
  const [openmenu, setopenmenu] = useState(true)
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  }, [])
  let Menu = [

    {
      title: 'Trẻ Em',
      name: 'child',
      // image: require('../assets/images/Exercise2.png'),
      subTitle:
        'Live happier and healthier by learning the fundamentals of kegel exercises',
      duration: '10-20 MIN Course',
      navigate: 'ListChildren'
    },
    {
      title: 'Hoạt Động',
      name: 'newspaper-o',
      // image: require('../assets/images/Exercise3.png'),
      subTitle:
        'Live happier and healthier by learning the fundamentals of meditation and mindfulness',
      duration: '3-10 MIN Course',
      navigate: 'ListActivity'
    },
    {
      title: 'Trung Tâm',
      name: 'university',
      // image: require('../assets/images/Exercise4.png'),
      subTitle: 'Live happier and healthier by learning the fundamentals of Yoga',
      duration: '5-10 MIN Course',
      navigate: 'ListCenter'
    }


  ];
  const [listacti,setlistacti]=useState([])
  const [searchtext, setsearchtext] = useState('')
  useEffect(() => {
    (async () => {
      try {
        const param = {key:searchtext}
        const authenticated = await AsyncStorage.getItem('access_token')
        const accountid = jwt_decode(authenticated).id
        console.log(authenticated)
        settoken(authenticated)
        const data = await accountApi.getaccountById(accountid, {
          params: param,
          headers: {
            Authorization: authenticated
          }

        })
        const centers = await centerApi.getallcenter({
          params: param,
          headers: {
            Authorization: authenticated
          }
        })

        setdataListcenter(centers.center)
        setaccount(data.account)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [searchtext])
  useEffect(() => {
    (async () => {
      try {
      
        const authenticated = await AsyncStorage.getItem('access_token')
       
        const data=await activityApi.getactivity({
          
          headers: {
          Authorization: authenticated
      }})
        console.log(data)
        setlistacti(data.activity)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const ExerciseItem = ({ exercise }) => {
    console.log(exercise)
    return (
      <TouchableOpacity
        onPress={() => {
         
          navigation.navigate(exercise.navigate, {
            title: exercise.title,

          })
        }}
        activeOpacity={0.8}
        style={{
          backgroundColor: '#FFF',
          justifyContent: 'center',
          alignItems: 'center',
          width: 100,
          margin: 10,
          marginTop: -5,
          marginBottom: 30,
          height: 100,
          borderRadius: 10,
          padding: 15,
          shadowColor: '#9e9898',
          elevation: 5,
        }}>

        <Icon
          name={exercise.name}
          size={24}
          color='#B8860B'

        />

        <Text style={{ marginTop: 20, textAlign: 'center', fontSize: 13, color: '#5F9EA0' }}>
          {exercise.title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView

      style={{
        flexGrow: 1,
        flex: 1,
        backgroundColor: '#fff', position: 'relative'
      }}>

      <View style={{
        backgroundColor: '#40E0D0',
        height: '20%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingHorizontal: 20
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 30,
          width: '100%'
        }}>
          <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
            < Icon
              name="navicon"
              size={35}
              onPress={() => navigation.openDrawer()}
            />
            <Text style={{
              marginLeft: 20,
              fontSize: 21,
              color: '#fff',
              fontWeight: 'bold'
            }}>
              Xin Chào {account?.profile?.name}
            </Text>
          </View>
          <View style={{ width: '50%', alignItems: 'flex-end' }}>
            <Image style={{ height: 60, width: 60, borderRadius: 40 }} source={{ uri: account?.profile?.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegCgK5aWTTuv_K5TPd10DcJxphcBTBct6R170EamgcCOcYs7LGKVy7ybRc-MCwOcHljg&usqp=CAU' }} />
          </View>
        </View>


      </View>
      <LinearGradient
        colors={["#40E0D0", "transparent"]}
        style={{
          left: 0,
          right: 0,
          height: 90,
          marginTop: -200
        }}
      >
        <View style={{
          backgroundColor: "#FFF",
          paddingVertical: 8,
          paddingHorizontal: 20,
          marginHorizontal: 20,
          borderRadius: 15,
          marginTop: 30,
          flexDirection: "row",
          alignItems: "center"
        }}>
          <TextInput
            onPressIn={() => {
              setopenmenu(false)
              console.log('in')
            }}
            onEndEditing={() => {
              setopenmenu(true)
              console.log('out')
            }}
            onChangeText={(text) => {
              setsearchtext(text)
          }}
            placeholder="Search"
            placeholderTextColor="#b1e5d3"
            style={{
              fontWeight: "bold",
              fontSize: 18,
              width: 260
            }}
          />
          <Icon2
            name={'search1'}
            size={24}
          />
        </View>
      </LinearGradient>
      <Text style={{ fontSize: 18, marginStart: 30, marginTop: 5, color: '#556B2F' }}>Các Hoạt Động Mới</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ height: 600, }}
        pagingEnabled
      >

        <LinearGradient
          colors={["rgba(0,164,109,0.09)", "transparent"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 800,
            marginTop: 200,
            top: 0
          }}
        />
        {listacti?.slice(0, 5)?.map((e, index) => (<TouchableOpacity
         onPress={()=>{navigation.navigate('ActivityByid',{id:e.id})}}
          key={index}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 240,
            elevation: 2,
            backgroundColor: "#E0FFFF",
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
            source={{ uri:e?.img|| 'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/321609005_3225221311122977_2920611145513696996_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=rlC0iUT8wEIAX_vqZS8&_nc_ht=scontent.fdad3-5.fna&oh=00_AfAnS4n2gmHz-vvub5FonTp-vvx_25EjNweIZ6DCw5KvhA&oe=646EECF4' }}
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
                        <Icon name="comment-o" size={20} color='blue' />
                        <Text style={{ marginLeft: 5, color: 'white' }}>
                        {e?.totalComment}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="heart" size={20} color='red' />
                        <Text style={{ marginLeft: 5, color: 'white' }}> {e?.totalLike}</Text>
                    </View>
                </View>
            </ImageBackground>
           <Text numberOfLines={1} style={{ fontSize: 14, color: '#a8a8a8', marginLeft: 5 }}>{e?.title}</Text>
        </TouchableOpacity>))}
      </ScrollView>
      <FlatList
        data={Menu || null}
        style={{
          paddingHorizontal: 20,
          marginTop: -120
        }}
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
        }}

        numColumns={3}
        keyExtractor={() => null}

        renderItem={({ item }) => <ExerciseItem exercise={item} />}
      />
     
      <Text style={{ fontSize: 18, marginStart: 30, marginTop: 40, marginEnd: 10, color: '#556B2F' }}>Các trung tâm cần hỗ trợ  </Text>

      {dataListcenter.slice(0, 5)?.map((e, index) => <CenterItem key={index} name={e.name} picture={e.picture} email={e.email} phone={e.phoneNumber} address={e.adress} onPress={() => { navigation.navigate('CenterById', { id: e.id }) }} />)}
    
    <TouchableOpacity onPress={()=>{ navigation.navigate('ListCenter')}} style={{justifyContent:'center',alignItems:'center',paddingBottom:10,backgroundColor:'#CCFFFF'}}>
      <Text>Xem thêm</Text>
    </TouchableOpacity>
    </ScrollView>
  );
};

export default Home;

function CenterItem(props) {
  let opres = props.onPress

  return (
    <TouchableOpacity
      style={{ paddingStart: 20, marginBottom: 15, }}
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
              height: 150,
              width: 150,
              resizeMode: 'contain',
            }}
          />
        </View>

        {/* Render all the card details here */}
        <View style={{
          height: 120,
         
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
              {props.phone}
            </Text>
          </View>

          

          {/* Render distance and the icon */}
          <View style={{ marginTop: 5, flexDirection: 'row' }}>
            <Icon name="map-marker" color='#306060' size={18} />
            <Text style={{ fontSize: 12, color: '#a8a8a8', marginLeft: 5 }}>
              {props.address}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}