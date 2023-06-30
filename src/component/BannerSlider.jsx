
import React from "react";
import { Image, StyleSheet, Text, View, TextInput, } from 'react-native';
export default function BannerSlide({data}){
    return(
        <View>
            <Image source={data.img} style={{height:150, width:300,borderRadius:10}}/>
        </View>
    )
}