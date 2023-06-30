
import React, { useRef, useState ,useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    TextInput, SafeAreaView,
    FlatList, Image,
    ScrollView

} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import UIHeader from '../messenger/UIHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'react-test-renderer';
import ProofApi from '../../Api/ProofApi';
const options = {
    title: 'Select Image',
    type: 'library',
    options: {
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false
    }
}

function ListProof({ route,navigation}) {
    const { id } = route.params
    const [imguri, setimguri] = useState('https://file1.dangcongsan.vn/data/0/images/2023/02/27/upload_59/3.png')
    const [img, setimg] = useState('')
    const opengallery = async () => {
        try {
            const result = await launchImageLibrary(options)
        console.log(result);
        setimg(result.assets[0])
        setimguri(result.assets[0].uri)
        } catch (error) {
            console.log(error)
        }
    }
    const [listproof,setlistproof]=useState([])

   
    const Create= async ()=>{
        try {
            const   data1 = new FormData()
            data1.append('image',{
                uri: img.uri,
                type: img.type,
                name: img.fileName
            })
            const authenticated = await AsyncStorage.getItem('access_token')
            const data=await ProofApi.createProof(id,data1,{
                headers: {
                    'Content-Type': 'form-data',
                    Authorization: authenticated
                }
            })
            console.log(data)
            setlistproof(data?.resData?.proofs)
        } catch (error) {
            console.log(error)
        }
    }
    const Delete= async (ids)=>{
        try {
            
           
            const authenticated = await AsyncStorage.getItem('access_token')
            const data=await ProofApi.deleteProof(ids,{
                headers: {
                    Authorization: authenticated
                }
            })
            console.log(data)
            // setlistproof(data?.resData?.proofs)
            console.log(id)
            const lists=await ProofApi.getlistProof(id,{
                headers: {
                    
                    Authorization: authenticated
                }
            })
           setlistproof(lists?.proofs)
            
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        (async () => {
          try {
            const authenticated = await AsyncStorage.getItem('access_token')
            const lists=await ProofApi.getlistProof(id,{
                headers: {
                    
                    Authorization: authenticated
                }
            })
           setlistproof(lists?.proofs)
          } catch (error) {
            console.log(error)
          }
        })()
      },[])
    return (
        <View style={{ flex: 1, }}>
            <UIHeader title={"Ảnh Minh chứng "}
                lefIconname={'arrow-left'}
                rightIconname={'ellipsis-v'}
                onpresslefIcon={() => {
                    navigation.goBack()
                }}
            />
                
              <TouchableOpacity onPress={() => {
                            opengallery()
                        }}
                        style={{ alignItems: 'center'}}>
                            <View style={{
                                height: 180,
                                width: 180,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignContent: 'center'
                            }}>
                                <ImageBackground style={{ height: 180, width: 180 }}
                                    imageStyle={{ borderRadius: 15 }}
                                    source={{ uri: imguri }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Icon
                                            name="camera"
                                            size={35}
                                            color="#fff"
                                            style={{
                                                opacity: 0.7,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderWidth: 1,
                                                borderColor: '#fff',
                                                borderRadius: 10,
                                            }}
                                        />
                                    </View>
                                </ImageBackground>
                                
                            </View>
                            <Text style={{
                                fontSize:18,
                                alignItems: 'center'
                            }} >Thêm hình ảnh minh chứng</Text>
                        </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            Create()
                        }
                        }
                        style={{
                            padding: 10,
                            borderRadius: 10,
                            backgroundColor: '#FF6347',
                            alignItems: 'center',
                            marginTop: 10,
                        }} >
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: 'white',
                        }}>Gửi</Text>
                    </TouchableOpacity>

                    <FlatList
                        data={listproof}
                        style={{marginTop:20}}
                        renderItem={({ item }) => {
                            return (
                                <View style={{
                                    marginHorizontal:16,
                                marginVertical:10,
                                paddingBottom:32,
                                borderRadius:6,
                                justifyContent:'center',
                                alignItems:'center',
                                backgroundColor:'blue'}}>
                                    <Image
                                        source={{ uri: item?.Link||'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/321609005_3225221311122977_2920611145513696996_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=rlC0iUT8wEIAX_vqZS8&_nc_ht=scontent.fdad3-5.fna&oh=00_AfAnS4n2gmHz-vvub5FonTp-vvx_25EjNweIZ6DCw5KvhA&oe=646EECF4' }}
                                        style={{
                                            height: 200,
                                            width: 200,
                                            resizeMode: 'contain',
                                        }}
                                    />
                                    <TouchableOpacity
                        onPress={() => {
                            Delete(item?.id)
                        }
                        }
                        style={{
                            padding: 10,
                            borderRadius: 10,
                            backgroundColor: '#FF6347',
                            alignItems: 'center',
                            marginTop: 5,
                        }} >
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: 'white',
                        }}>Xoá</Text>
                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    />
              

        </View>
    )

}
export default ListProof