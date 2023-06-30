import React, { useEffect, useState } from 'react';
import DatePicker from 'react-native-date-picker'
import { View, Text, Touchable, TouchableOpacity, TextInput } from 'react-native';
import Background from '../../component/Background';
import Btn from '../../component/Btn';
import RadioGroup from 'react-native-radio-buttons-group';
import Field from '../../component/Field';
import strftime from 'strftime';
import authApi from '../../Api/authApi';
import { ValidateEmail, isValidatePassword } from '../../utills/Validations';
const Signup = props => {
  const [name, setname] = useState('')
  const [phone, setphone] = useState('')
  const [password, setpassword] = useState('')

  const [email, setemail] = useState('')
 
  const [erroremail, seterroremail] = useState('')
  const [errorPassword, seterrorPassword] = useState('')

  const [passwordconfirm, setpasswordconfirm] = useState('')
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(new Date())
  const [g, setg] = useState('')
  const apiSingup= async data=>{
    try { 
        const mess=await authApi.signup(data)
        alert('Dăng Ký Thành Công')
        props.navigation.navigate('Login')
    } catch (error) {
        alert(error.message)
    }
}
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
    <Background>
      <View style={{ alignItems: 'center', width: 460 }}>
        <Text
          style={{
            color: 'white',
            fontSize: 60,
            fontWeight: 'bold',
            marginTop: 5,
          }}>
          Đăng ký
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 10,
          }}>
          Tạo tài khoản mới
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 20,
            alignItems: 'center',
          }}>
          <Text style={{ width: '70%', }}>Full Name :</Text>
          <Field onChangeText={(text) => { setname(text) }} placeholder="Full Name" />
          <Text style={{ width: '70%' }}>Email :</Text>
          <Field
            onChangeText={(text) => {
              seterroremail(ValidateEmail(text) == true ? '' : 'Email not in correct format')
              setemail(text)
            }}
            placeholder="Email / Username"
            keyboardType={'email-address'}
          />
          <Text style={{ width: '70%' }}>Phone Number :</Text>
          <Field onChangeText={(text) => { setphone(text) }} placeholder="Phone Number" />
          <Text style={{ width: '70%' }}>Birthday :</Text>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={{
              borderRadius: 100,
              color: '#006A42',
              height: 50,
              width: '78%', backgroundColor: 'rgb(220,220, 220)',
              marginVertical: 10,
              padding: 10
            }}
            placeholderTextColor='#006A42'>
            <Text style={{ color: '#006A42' }}
            >{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={open}
            date={date}
            mode='date'
            onConfirm={(date) => {
              setOpen(false)
              setDate(date)
            }}
            onCancel={() => {
              setOpen(false)
            }}
          />
          <View style={{
            width: '70%',
            flexDirection: 'row'
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
            <View style={{

            }}></View>
          </View>
          <Field onChangeText={(text) => {
            seterrorPassword(isValidatePassword(text) == true ? '' : 'Password must be at least 5 characters')
            setpassword(text)
          }}
            placeholder="Password" secureTextEntry={true} />
          <Field
            onChangeText={(text) => {
              setpasswordconfirm(text)
            }}
            placeholder="Confirm Password" secureTextEntry={true} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '78%',
              paddingRight: 16
            }}>

          </View>
          <Btn
            textColor="white"
            bgColor={'#006A42'}
            btnLabel="Đăng ký"
            Press={() => {
              if (isValidatePassword(password) && ValidateEmail(email) && password == passwordconfirm ) {
                data = {
                  phoneNumber: phone,
                  email: email,
                 name:name,
                  gender: g,
                  birthday: strftime('%Y-%m-%d', date),
                  password: password,
                  address: "macdinh"
              }
              apiSingup(data)
              // 
              }else {
                alert('nhap dung form')
           }
            }}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>

            <TouchableOpacity
              onPress={() =>{
                 props.navigation.navigate('Login')
               }}>
              <Text
                style={{ color: '#006A42', fontWeight: 'bold', fontSize: 18 }}>
                Đăng nhập
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Signup;