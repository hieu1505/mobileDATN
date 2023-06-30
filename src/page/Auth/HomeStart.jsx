import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Background from '../../component/Background';
import Btn from '../../component/Btn';


const HomeStart = (props) => {
  return (
    <Background>
      <View style={{ marginHorizontal: 40, marginVertical: 100 }}>
      <Text style={{ color: 'white', fontSize: 64 }}>Mái ấm </Text>
      <Text style={{ color: 'white', fontSize: 64, marginBottom: 40 }}>Cộng đồng</Text>
      <Btn bgColor='#2BB789' textColor='white' btnLabel="Đăng nhập" Press={() => props.navigation.navigate("Login")} />
      <Btn bgColor='white' textColor='#006A42' btnLabel="Đăng ký" Press={() => props.navigation.navigate("Signup")} />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({})

export default HomeStart;