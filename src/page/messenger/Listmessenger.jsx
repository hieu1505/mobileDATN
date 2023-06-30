import UIHeader from "./UIHeader"
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Keyboard,
    FlatList,
    RefreshControl,
  } from 'react-native';
function Listmessenger({ route, navigation }, props){
 return (
  <View style={{
    flexDirection: 'column',
}}>
    <UIHeader title={'Tin Nhắn'}
        lefIconname={'arrow-left'}
        rightIconname={'search'}
        onpresslefIcon={() => {
            navigation.goBack()
        }}
        onpressrightIcon={() => {
           
        }}
    />
    <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginStart: 10
    }}>
       
    </View></View>
 )
}
export default Listmessenger