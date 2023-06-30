import React from "react";
import { View,Text,TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

function UIHeader(props){
    const {title,
        lefIconname,
        rightIconname,
        onpresslefIcon,
        onpressrightIcon}=props
    return <View style={{
        height:55,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }}>
       {lefIconname!=undefined? <Icon  name={lefIconname} style={{padding:10}} size={25} color={'black'}  onPress={onpresslefIcon}/>:<View style={{width:50,height:50}}></View>} 
        <Text style={{
            fontSize:20,
            alignSelf:'center',
            lineHeight:45,
            color:'black'
        }}>{title}
        </Text>
      {rightIconname!=undefined? <Icon  name={rightIconname} style={{padding:10}} size={25} color={'black'}  onPress={onpressrightIcon}/>:<View style={{width:50,height:50}}></View>}  

    </View>
}
export default UIHeader