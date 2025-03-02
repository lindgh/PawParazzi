import Slider from "@/components/Slider"
import { StyleSheet, View, Text } from 'react-native';
import React, { useState, useEffect } from 'react'

const showSlider = () => {
    return (
        <View style = {styles.container}>
            <Slider/>
        </View>
    )
}

export default showSlider

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c8a7a2'
    }
})