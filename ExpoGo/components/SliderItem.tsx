import { StyleSheet, Text, View, Image, Dimensions} from "react-native"
import React, {useEffect, useState} from "react"
import { ImageSlider, ImageSliderType } from '../data/SliderData'
import storage from '@react-native-firebase/storage';

type Props = {
    item: ImageSliderType;
    index: number;
}

const {width} = Dimensions.get('screen');

const SliderItem = ({item, index}: Props) => {


    return (
        <View style = {styles.itemContainer}>
            <Image source = {item.image} style = {{width: 300, height: 500}} />
            <Text>{item.title}</Text>

            {/* <Image source = {{uri: 'https://firebasestorage.googleapis.com/v0/b/pawparazzi-bearjeans.firebasestorage.app/o/images%2Fakali.jpg?alt=media&token=4e556bf4-0d2d-4717-bdc9-9c8ad94076c4'}}
                    style = {{width: 300, height: 500}} />*/}
        </View>

    )   
}

export default SliderItem

const styles = StyleSheet.create({
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        width: width,
        backgroundColor: '#c8a7a2'
    }
})