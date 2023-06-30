import React, { useState } from 'react';
import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import Background from '../../component/Background';
import Btn from '../../component/Btn';
import Field from '../../component/Field';
import { ValidateEmail } from '../../utills/Validations';
import accountApi from '../../Api/acountApi';
const Forgotpassword = (props) => {
  const [email, setemail] = useState('')
  const [erroremail, seterroremail] = useState('')
  const apiResetpass=async data=>{
    try {const mess=await accountApi.resetpassword(data)
        alert(mess.message)

        
    } catch (error) {
        alert(error.message)
    }
}
  return (
    <Background>
      <View style={{ alignItems: 'center', width: 460 }}>
        <Text
          style={{
            color: 'white',
            fontSize: 55,
            fontWeight: 'bold',
            marginVertical: 20,
          }}>

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
          <Text style={{ fontSize: 40, color: '#006A42', fontWeight: 'bold' }}>
            Quên mật khẩu
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>

          </Text>
          <Field
            onChangeText={(text) => {
              seterroremail(ValidateEmail(text) == true ? '' : 'Email not in correct format')
              setemail(text)
            }}
            placeholder="Email / Tài khoản"
            keyboardType={'email-address'}
          />
          <Text style={{ color: 'red', fontSize: 12 }}>{erroremail}</Text>
          <View
            style={{ alignItems: 'flex-end', width: '60%', paddingRight: 16, marginBottom: 50 }}>
          </View>
          <TouchableOpacity
            onPress={() => {
              const data = {
                email: email
              }
              apiResetpass(data)
              // alert('xac thuc')
            }
            }
            style={{

              backgroundColor: "#2BB789",
              borderRadius: 100,
              alignItems: 'center',
              width: 200,
              paddingVertical: 5,
              marginVertical: 10
            }}>
            <Text style={{ color: "white", fontSize: 25, fontWeight: 'bold' }}>
              Gửi</Text>
          </TouchableOpacity>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Không có tài khoản ? </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
              <Text style={{ color: '#006A42', fontWeight: 'bold', fontSize: 16 }}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Forgotpassword;