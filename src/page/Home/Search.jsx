import strftime from 'strftime';
import UIHeader from "../messenger/UIHeader"
import React, { useState, useEffect } from "react";
import { Image, Text, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';
import childrenApi from "../../Api/childrenApi";
import centerApi from '../../Api/centerApi';
function Search ({navigation}){
    const [dataListcenter, setdataListcenter] = useState([])
    const[centerseart,setcenterseart]=useState('')
    const [searchtext, setsearchtext] = useState('')
    const [check, setchek] = useState(false)
    useEffect(() => {
        (async () => {
            try {
                
                
                const authenticated = await AsyncStorage.getItem('access_token')
                const centers = await centerApi.getcenteral({
                    
                    headers: {
                        Authorization: authenticated
                    }
                })
                setdataListcenter(centers.center)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    const searchcenter=async ()=>{
        try {
            const param = {key:searchtext}
                const authenticated = await AsyncStorage.getItem('access_token')
                console.log(authenticated)
                const center = await centerApi.getcenteral({
                    params: param,
                    headers: {
                        Authorization: authenticated
                    }
                })
                console.log(center)
                setdataListcenter(center.center)
                setcenterseart(center.searchcenter)
        } catch (error) {
            console.log(error.message)
        }
    }
return(
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
         <View>
         <UIHeader title={'Tìm kiếm'}
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
                    placeholder="Tìm các trẻ cần hỗ trợ"
                    style={{
                        paddingEnd: 5,
                        height: 50,
                        flex: 1,
                        marginEnd: 5,
                        borderRadius: 5,
                        opacity: 0.5,
                        backgroundColor: '#A9A9A9'
                    }} />
                    <TouchableOpacity 
                     onPress={()=>{
                        if(searchtext!=''){ searchcenter()}
                        else { return}
                       
                        
                    }}
                    style={{
                        position: 'absolute',
                        top: 12,
                        right: 20
                    }}>
                         <Icon name='search'
                    size={24} color={'black'}
                   ></Icon>
                    </TouchableOpacity>
               
            </View>
         { centerseart.length!=0&& <View>
           <Text style={{ fontSize: 18, marginStart: 20, marginTop: 20, marginEnd: 10, color: '#556B2F' }}>Trung tâm cần tìm:  </Text>
          < TouchableOpacity
            style={{ paddingStart: 20, marginBottom: 15 }}
            onPress={() => { navigation.navigate('CenterById', { id: centerseart.id })}}
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
                        source={{ uri:centerseart?.picture || 'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/321609005_3225221311122977_2920611145513696996_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=rlC0iUT8wEIAX_vqZS8&_nc_ht=scontent.fdad3-5.fna&oh=00_AfAnS4n2gmHz-vvub5FonTp-vvx_25EjNweIZ6DCw5KvhA&oe=646EECF4' }}
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
                            {centerseart.name}
                        </Text>

                    </View>

                    <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="mobile-phone" color='#306060' size={18} />
                        <Text style={{ fontSize: 12, color: '#a8a8a8', marginLeft: 5 }}>
                            {centerseart.phoneNumber}
                        </Text>
                    </View>

                    

                    {/* Render distance and the icon */}
                    <View style={{ marginTop: 5, flexDirection: 'row' }}>
                        <Icon name="map-marker" color='#306060' size={18} />
                        <Text style={{ fontSize: 12, color: '#a8a8a8', marginLeft: 5 }}>
                            {centerseart.adress}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
           </View>}
           {dataListcenter&&<View>
           <Text style={{ fontSize: 18, marginStart: 20, marginTop: 20, marginEnd: 10, color: '#556B2F' }}>Các trung tâm cần hỗ trợ:  </Text>
           {dataListcenter?.map((e, index) => <CenterItem key={index} name={e.name} picture={e.picture} email={e.email} phone={e.phoneNumber} address={e.adress} onPress={() => { navigation.navigate('CenterById', { id: e.id }) }} />)}
           
            <TouchableOpacity onPress={()=>{ navigation.navigate('ListCenter')}} style={{justifyContent:'center',alignItems:'center',paddingBottom:10,backgroundColor:'#CCFFFF'}}>
            <Text>Xem thêm</Text>
    </TouchableOpacity>

           </View>}
         </View>
    </ScrollView>
)
}
export default Search

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