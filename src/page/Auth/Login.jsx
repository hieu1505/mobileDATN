import React, { useState } from 'react';
import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import Background from '../../component/Background';
import Btn from '../../component/Btn';
import Field from '../../component/Field';
import { ValidateEmail,isValidatePassword } from '../../utills/Validations';
import authApi from '../../Api/authApi';
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = (props) => {
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')
  const [erroremail, seterroremail] = useState('')
  const [errorPassword, seterrorPassword] = useState('')


  const apilogin = async acc => {
    try {
        const data = await authApi.login(acc)
        console.log(data)
        console.log(data?.accessToken)
        if(data?.errCode==0){
          AsyncStorage.setItem('access_token', data?.accessToken)
       const account= jwt_decode(data.accessToken)
          if(account.role_name==='user'){
       props.navigation.navigate("DrawerNavigator")
       }
        }
        else 
        {
          alert(data?.message)
        }
      //   
    } catch (error) {
        alert(error.message)
    }
}
  return (
    <Background>
      <View style={{alignItems: 'center', width: 460}}>
        <Text
          style={{
            color: 'white',
            fontSize: 55,
            fontWeight: 'bold',
            marginVertical: 20,
          }}>
          Đăng nhập
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 500,
            borderTopLeftRadius: 130,
            paddingTop: 100,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 40, color: '#006A42', fontWeight: 'bold'}}>
           Chào Mừng
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Đến với mái ấm cộng đồng
          </Text>
          <Field
           onChangeText={(text) => {
            seterroremail(ValidateEmail(text) == true ? '' : 'Email không đúng định dạng')
            setemail(text)
          }}
            placeholder="Email / Tài khoản"
            keyboardType={'email-address'}
          />
           <Text style={{ color: 'red', fontSize: 12 }}>{erroremail}</Text>
          <Field
          onChangeText={(text) => {
            seterrorPassword(isValidatePassword(text) == true ? '' : 'Mật khẩu phải có ít nhất 5 ký tự')
            setpassword(text)
        }}
          placeholder="Mật Khẩu" secureTextEntry={true} />
          <Text style={{ color: 'red', fontSize: 12 }}>{errorPassword}</Text>
          <View
            style={{alignItems: 'flex-end', width: '60%', paddingRight: 16, marginBottom: 90}}>
           <TouchableOpacity onPress={() =>{ props.navigation.navigate("Forgotpassword")}}>
           <Text style={{color:'#006A42', fontWeight: 'bold', fontSize: 16}}>
              Quên Mật Khẩu ?
            </Text>
           </TouchableOpacity>
          </View>
          <Btn textColor='white' bgColor='#006A42' btnLabel="Đăng nhập" Press={() => {
             const data = {
              email: email,
              password: password,
          }
          console.log(data)
          if (isValidatePassword(password) && ValidateEmail(email)) {
            apilogin(data)
           
    }
    else {
        alert('nhập đúng tài khoản mật khẩu đăng nhập ')
    }
           
            }} />
          <View style={{ display: 'flex', flexDirection :'row', justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight:"bold" }}>Không có tài khoản ? </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
            <Text style={{ color: '#006A42', fontWeight: 'bold', fontSize: 16 }}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Login;