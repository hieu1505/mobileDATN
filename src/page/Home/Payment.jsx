import {
  CardField,
  StripeProvider,
  useStripe,
} from '@stripe/stripe-react-native';
import React, { useEffect, useState } from 'react';
import { Image,Alert,Button, ImageBackground, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, FlatList, SafeAreaView, Animated, LogBox } from 'react-native';
import UIHeader from '../messenger/UIHeader';
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import donorapi from '../../Api/donorapi';
function Payment({ navigation,route }) {
  const { id } = route.params
  return (
    <StripeProvider
      publishableKey={'pk_test_51NH5WFEnS31hCB3TK4yAimJuWG0FhnzRhAKpFlPcTmSslhEhpkrtyce5dqWkOmLB6idqTgHrKoD12N7zCYES097f00O4l2mvma'}
      merchantIdentifier="merchant.identifier">
      <SafeAreaView>
        <StripeTest navigation={navigation} id={id} />
      </SafeAreaView>
    </StripeProvider>);
}
const StripeTest = ({ navigation ,id}) => {
 
  const { confirmPayment, initPaymentSheet } = useStripe();
  const [amount,setamount]=useState('')
  const [note,setnote]=useState('Hỗ trợ trẻ tai trung tâm')
  const [key, setKey] = useState('');

  useEffect(() => {
   
    fetch('https://trungtamquanlytremocoi.onrender.com/create-payment-intent', {
      method: 'POST',
    })
      .then(res => res.json())
      .then(res => {
        console.log('intent', res);
        const clientSecret = res.clientSecret;
        setKey(clientSecret);
        initPaymentSheet({ paymentIntentClientSecret: key });
      })
      .catch(e => Alert.alert(e.message));
  }, []);

  const handleConfirmation = async (id) => {
    if(amount==''){
      Alert.alert('nhap so tien can ho tro');
    }
    else{
    if (key) {
      if (key) {
        const {paymentIntent, error} = await confirmPayment(key, {
          paymentMethodType: 'Card',
  
        });
  
        if (!error) {
          try {
            const authenticated = await AsyncStorage.getItem('access_token')
            const accountid = jwt_decode(authenticated).id
            if(note== ""){
              setnote('Hỗ trợ trẻ tai trung tâm')
            }
            data={idaccount:accountid,idcenter:id,amount:amount,note:note}
            console.log(data)
            const a=await donorapi.postdonor(data,{
              headers: {
                Authorization: authenticated
            }
            })
            console.log(a)
            Alert.alert('Thanh Toan thanh cong');
          } catch (error) {
            console.log(error)
          }
         
        } else {
          Alert.alert('Error', error.message);
        
        }
      }

      }}
  };

 

  return (
    <View >
      <UIHeader title={'Hỗ trợ Trung Tâm'}
                    lefIconname={'arrow-left'}
                    rightIconname={'search'}
                    onpresslefIcon={() => {
                        navigation.goBack()
                    }}
                    onpressrightIcon={() => {

                    }}
                />
      <Text style={{marginTop:5,paddingStart:10}}>Số tiền hỗ trợ (VNĐ)</Text>
      <TextInput
                    onChangeText={(text) => {
                       setamount(text)
                    }}
                    style={{ fontSize:18 ,
                    width: '100%',
                    height: 50,
                    marginVertical: 10,
                    marginBottom:20,
                    backgroundColor: '#FFFFFF',
                    borderColor: '#000000',
                    borderRadius: 8,
                    fontSize: 14,
                   }}
                   keyboardType="numeric"
                   
                ></TextInput>
       
       <Text style={{paddingStart:10}}>Ghi chu</Text>
      <TextInput
                    onChangeText={(text) => {
                       setnote(text)
                    }}
                    style={{ fontSize:18 ,
                    width: '100%',
                    height: 50,
                    marginVertical: 10,
                    marginBottom:20,
                    backgroundColor: '#FFFFFF',
                    borderColor: '#000000',
                    borderRadius: 8,
                    fontSize: 14,
                   }}
                   
                   
                ></TextInput>
      <Text style={{paddingStart:10}}>Số thẻ Visa</Text>
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          borderWidth: 1,
          backgroundColor: '#FFFFFF',
          borderColor: '#000000',
          borderRadius: 8,
          fontSize: 14,
          placeholderColor: '#999999',
        }}

        style={{
          width: '100%',
          height: 50,
          marginVertical: 10,
          marginBottom:40
        }}

        onCardChange={cardDetails => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
     
     
      <Button style={{fontSize:20}} title="Thanh Toán" onPress={()=>{handleConfirmation(id)}} />
      
    </View>
  );
};

export default Payment