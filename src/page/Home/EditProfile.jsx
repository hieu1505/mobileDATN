import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    TextInput, SafeAreaView,

} from 'react-native';

import DatePicker from 'react-native-date-picker'
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BottomSheet from 'reanimated-bottom-sheet';

import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import RadioGroup from 'react-native-radio-buttons-group';
import accountApi from '../../Api/acountApi';
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
const options = {
    title: 'Select Image',
    type: 'library',
    options: {
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false
    }
}
const EditProfile = () => {
    const [opens, setOpens] = useState(false)
   
    const [phones, setphone] = useState('')
    const [adress, setadress] = useState('')
    const [name, setname] = useState('')
    const [img, setimg] = useState('')
    const [imguri, setimguri] = useState('https://api.adorable.io/avatars/80/abott@adorable.png')
    const { colors } = useTheme();
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
    
    
   
    const APIupdata = async (value) => {
        try {
            const authenticated = await AsyncStorage.getItem('access_token')
            console.log(authenticated)
            console.log(value)
            const accountid = jwt_decode(authenticated).id
            const data = accountApi.updateprofile(accountid, value, {
                headers: {
                    'Content-Type': 'form-data',
                    Authorization: authenticated
                }
            })
            

        } catch (error) {
            alert(error)
        }
    }
    // bs = React.createRef();
    
    const [open, setopen] = useState(false)
    const [g, setg] = useState('')
    const [date, setDate] = useState(new Date())
    const [gender, setgender] = useState([{
        id: '0',
        label: 'Nam',
        value: 'Nam',
        onPress: () => setg('0')

    }, {
        id: '1',
        label: 'Nữ',
        value: 'Nữ',
        onPress: () => setg('1')
    }
    ])
    function onPressRadioButton(radioArray) {
        setgender(radioArray);
        // console.log(gender.id)
    }
    return (
        <View style={{ flex: 1 }}>
           
            <View style={{
                margin: 15,
                
            }}>
                <SafeAreaView>
                    <View style={{ alignItems: 'center' }}>
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
                            
                        </TouchableOpacity>

                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 48,
                        marginBottom: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: '#f2f2f2',
                        paddingBottom: 5,
                    }}>
                        <FontAwesome name="user-o" color={colors.text} size={20} />
                        <TextInput
                            onChangeText={(text) => { setname(text) }}
                            placeholder="Name"
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={{
                                flex: 1,
                                marginTop: Platform.OS === 'ios' ? 0 : -12,
                                paddingLeft: 10,
                                color: '#05375a',
                            }}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 8,
                        marginBottom: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: '#f2f2f2',
                        paddingBottom: 5,
                    }}>
                        <FontAwesome name="phone" color={colors.text} size={20} />
                        <TextInput
                            onChangeText={(text) => { setphone(text) }}
                            placeholder="Phone Number"
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={{
                                flex: 1,
                                marginTop: Platform.OS === 'ios' ? 0 : -12,
                                paddingLeft: 10,
                                color: '#05375a',
                            }}
                        />
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        marginTop: 8,
                        marginBottom: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: '#f2f2f2',
                        paddingBottom: 5,
                    }}>
                        <Icon name="map-marker-outline" color={colors.text} size={20} />
                        <TextInput
                            onChangeText={(text) => { setadress(text) }}
                            placeholder="Address"
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={{
                                flex: 1,
                                marginTop: Platform.OS === 'ios' ? 0 : -12,
                                paddingLeft: 10,
                                color: '#05375a',
                            }}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 8,
                        marginBottom: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: '#f2f2f2',
                        paddingBottom: 5,
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            color: "black",

                        }}>Giới tính:</Text>
                        <RadioGroup radioButtons={gender} onPress={onPressRadioButton} containerStyle={{
                            justifyContent: 'flex-start',
                            flexDirection: 'row',
                            color: '#006A42'
                        }}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 8,
                        marginBottom: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: '#f2f2f2',
                        paddingBottom: 5,
                        alignItems: 'center'
                    }}>
                        <Icon name="calendar" color={colors.text} size={20} />
                        <TouchableOpacity onPress={() => setOpens(true)}>
                            <Text
                                placeholderTextColor="#666666"
                                autoCorrect={false}
                                style={{
                                    flex: 1,

                                    paddingLeft: 10,
                                    color: '#05375a',
                                }}
                            >{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</Text>
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            open={opens}
                            date={date}
                            mode='date'
                            onConfirm={(date) => {
                                setOpens(false)
                                setDate(date)
                            }}
                            onCancel={() => {
                                setOpens(false)
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            // console.log(phones,adress,name,g,image)
                            if (phones != '' && adress != '' && name != '' && g != '' && img != undefined) {

                                  const   data = new FormData()
                                data.append('image',{
                                    uri: img.uri,
                                    type: img.type,
                                    name: img.fileName
                                })
                                data.append('phoneNumber', phones)
                                data.append('gender', g)
                                data.append('birthday', date)
                                data.append('address', adress)
                                data.append('name', name)
                                
                                
                                APIupdata(data)
                                alert('Cập nhật thành công')
                            }
                            else {
                                alert('Điền đầy đủ thông tin')
                            }

                        }

                        }

                        style={{
                            padding: 15,
                            borderRadius: 10,
                            backgroundColor: '#FF6347',
                            alignItems: 'center',
                            marginTop: 10,
                        }} >
                        <Text style={{
                            fontSize: 17,
                            fontWeight: 'bold',
                            color: 'white',
                        }}>Submit</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View >

        </View>
    )
}
export default EditProfile