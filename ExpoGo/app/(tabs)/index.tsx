import Slider from "@/components/Slider"
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react'

const { width, height } = Dimensions.get('window');
const output_text = "Fetching the latest picture\nof your furry friend!";
const showSlider = () => {
    return (
        <View style = {styles.container}>
            <Image 
            source={require('../../assets/images/pawparazzi-logo.png')}
            style={styles.tinyLogo} 
            />
            <Text style={[styles.text, {textAlign: 'center'}]}>{output_text}</Text>
            <View style={{marginTop: -275}}>
                <Slider/>
            </View>
        </View>
    )
}

export default showSlider

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c8a7a2',
        resizeMode: 'contain'
    },
    tinyLogo: {
        marginTop: 475,
        width: '80%',
        height: '10%',
        resizeMode: 'cover',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        justifyContent: 'center',
    }
})