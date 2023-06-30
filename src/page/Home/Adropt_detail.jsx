import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity, FlatList,
    Image,
    ImageBackground, TextInput,
    StyleSheet
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/Entypo';
import { Dropdown } from 'react-native-element-dropdown';
import jwt_decode from "jwt-decode";
import accountApi from '../../Api/acountApi';
import adropt_detailAPi from "../../Api/adropt_detailapi";
import AsyncStorage from '@react-native-async-storage/async-storage';

import UIHeader from "../messenger/UIHeader"
const data = [
    { label: 'Độc thân', value: '1' },
    { label: 'Ly hôn', value: '2' },
    { label: 'Đã kết hôn', value: '3' },
    { label: 'Vợ hoặc chồng đã chết', value: '4' },

];
const data2 = [
    { label: 'sống có cùng bố mẹ', value: '1' },
    { label: 'Sống một mình', value: '2' },
    { label: 'Sống có cùng con cái', value: '3' },


];
function Adropt_detail({navigation}) {
    const [account,setaccount]=useState([])
    const [id,setid]=useState('')
    useEffect(() => {
        (async () => {
          try {
            const authenticated = await AsyncStorage.getItem('access_token')
            const accountid = jwt_decode(authenticated).id
            
            const data=await accountApi.getaccountById(accountid,{
              headers: {
                Authorization: authenticated
            }
            })
             setaccount(data.account)
             const adropt_detail=await adropt_detailAPi.getadropt_detailbyacountid(accountid,{ headers: {
                Authorization: authenticated
            }})
            if(adropt_detail?.Adropt_detail==false){
                setchek(true)
            }
            else{
                console.log(adropt_detail?.Adropt_detail)
                setincome(adropt_detail?.Adropt_detail?.income)
                setfamily_status(adropt_detail?.Adropt_detail?.family_status.toString())
                setmarital_status(adropt_detail?.Adropt_detail?.marital_status.toString())
                setid(adropt_detail?.Adropt_detail?.id)
            }
          } catch (error) {
            console.log(error)
          }
        })()
      },[])
      
      const Create= async ()=>{
        try { 
            const authenticated = await AsyncStorage.getItem('access_token')
            const accountid = jwt_decode(authenticated).id
            if(income!=''&& marital_status!=''&&family_status!=''){
                data1 = {
                    income: income,
                    marital_status: marital_status,
                    family_status:family_status,
                    account_id:accountid
                }
                let mess=await adropt_detailAPi.createadropt_detail(data1,{
                    headers: {
                        Authorization: authenticated
                    }
                })
                alert('Tạo hồ sơ thành công')
                setchek(false)
            }
            else{
                alert('nhập đầy đủ thông tin')
            }
           
        } catch (error) {
            console.log(error)
        }
    }
    const update=async()=>{
        try {
            const authenticated = await AsyncStorage.getItem('access_token')
            const accountid = jwt_decode(authenticated).id
            if(income!=''&& marital_status!=''&&family_status!=''){
                data1 = {
                    income: income,
                    marital_status: marital_status,
                    family_status:family_status,
                    account_id:accountid
                }
                console.log(id)
                let mess=await adropt_detailAPi.updateadropt_detail(id,data1,{
                    headers: {
                        Authorization: authenticated
                    }
                })
                console.log(mess)
                alert('Chỉnh sữa hồ sơ thành công')
            }
            else{
                alert('nhập đầy đủ thông tin')
            }
        } catch (error) {
            console.log(error)
        }
    }
    const [isFocus, setIsFocus] = useState(false);
    const [check,setchek]=useState(false)
    const [income,setincome]=useState('')
    const [marital_status,setmarital_status]=useState('')
    const [family_status,setfamily_status]=useState('')
    return <View style={{
        flexDirection: 'column',
        flex: 1
    }}>
        <UIHeader title={"Hồ sơ nhận nuôi"}
            lefIconname={'arrow-left'}
            rightIconname={'ellipsis-v'}
            onpresslefIcon={() => {
                navigation.goBack()
            }}
        />
        <ImageBackground
            source={{
                uri: 'https://images.unsplash.com/photo-1507281736509-c6289f1ea0f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            }}
            style={{ flex: 0.15 }}
            resizeMode={'cover'}>

        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={{
                        uri:account?.profile?.avatar|| 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                    }}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 150 / 2,
                        borderWidth: 3,
                        borderColor: '#FFFFFF',
                        position: 'absolute',
                        zIndex: 2,
                    }}
                />
            </View>
            <View style={{ marginTop: 70 }}>
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#212121',
                    }}>
                    {account?.profile?.name}
                </Text>
                <Text style={{ textAlign: 'auto', marginStart: 15, marginTop: 10 }}>
                    Thu nhập tài chính:
                </Text>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 8,
                    marginBottom: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#f2f2f2',
                    paddingBottom: 5,
                    marginStart: 15
                }}>
                    <FontAwesome name="credit" color='blue' size={24} />
                    <TextInput
                        onChangeText={(text) => { setincome(text) }}
                        value={income}
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={{
                            flex: 1,
                            marginTop: Platform.OS === 'ios' ? 0 : -12,
                            paddingLeft: 10,
                            color: '#05375a',
                            fontSize: 20
                        }}
                    />
                </View>
                <Text style={{ textAlign: 'auto', marginStart: 15, marginTop: 10 }}>
                    Tình trạng hôn nhân:
                </Text>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 8,
                    marginBottom: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#f2f2f2',
                    paddingBottom: 5,
                    marginStart: 15
                }}>

                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Tình trạng hôn nhân' : '...'}
                        searchPlaceholder="Search..."
                        value={marital_status}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            console.log(item)
                            setmarital_status(item.value)
                            setIsFocus(false);
                        }}
                    />
                </View>
                <Text style={{ textAlign: 'auto', marginStart: 15, marginTop: 10 }}>
                    Sống chung với gia đình:
                </Text>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 8,
                    marginBottom: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#f2f2f2',
                    paddingBottom: 5,
                    marginStart: 15
                }}>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data2}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Sống chung với gia đình' : '...'}
                        searchPlaceholder="Search..."
                        value={family_status}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            // setCountry(item.value);
                            // handleState(item.value);
                            setfamily_status(item.value)
                            // setCountryName(item.label);
                            setIsFocus(false);
                        }}
                    />
                   
                </View>
                
            </View>
           {check==false?<View style={{
            flex: 40,
            flexDirection:'row',
            justifyContent:'space-around'
        }}>
           <TouchableOpacity
            onPress={()=>{
                update()
                
            }}
            style={{
                backgroundColor: '#99FFFF',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                
                width: '30%',
                borderRadius: 14,
               
            }}><Text style={{padding: 10,
                fontSize: 12}}>Lưu thay đổi</Text></TouchableOpacity>
            <TouchableOpacity
           onPress={() => {navigation.navigate('ListProof',{id:id}) }}
            style={{
                backgroundColor: '#FF9966',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                color: 'blue',
                width: '40%',
                borderRadius: 14,
                
            }}><Text style={{padding: 10,
                fontSize: 12}}>Ảnh Minh chứng</Text></TouchableOpacity>
        </View>:<View style={{
            flex: 40,
            flexDirection:'row',
            justifyContent:'space-around'
        }}>
           <TouchableOpacity
            onPress={()=>{
                Create()
            }}
            style={{
                backgroundColor: '#99FFFF',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                
                width: '30%',
                borderRadius: 14,
               
            }}><Text style={{padding: 10,
                fontSize: 12}}>Tạo hồ sơ</Text></TouchableOpacity></View>}
        </View>



    </View>
}
export default Adropt_detail
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#533483',
        padding: 6,
        justifyContent: 'center',
        alignContent: 'center',
    },
    dropdown: {
        height: 50,
        width: 350,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 10,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});