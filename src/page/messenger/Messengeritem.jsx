import React from "react";
import {View, Text, Image, TouchableOpacity} from 'react-native';
import strftime from 'strftime';
function Messengeritem(props){
  
  let {name, img, firstmessage, date} = props.user;
  let opres = props.onPress;
  let h = strftime('%d-%m-%Y,%H:%M', new Date(date));
    return   (
        <TouchableOpacity
          onPress={opres}
          style={{
            height: 80,
            paddingLeft: 20,
            paddingTop: 10,
            flexDirection: 'row',
          }}>
          <View>
            <Image
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                marginRight: 15,
                marginStart: 10,
              }}
              source={{uri: img}}
            />
          </View>
          <View
            style={{
              marginRight: 10,
              flexDirection: 'column',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              {name}
            </Text>
            
          </View>
          <View
            style={{
              padding: 10,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginRight: 10,
              flexDirection: 'column',
              marginRight: 10,
            }}></View>
        </TouchableOpacity>
      );
}
export default Messengeritem