import Slider from "@/components/Slider"
import App from './display'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
// import storage from '@react-native-firebase/storage';
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { app } from '../../FirebaseConfig'
import React, { useState, useEffect } from 'react'

const Page = () => {
    const [url, setUrl] = useState<string | undefined>("");

    useEffect(() => {
        const func = async () => {
            const storage = getStorage();
            const reference = ref(storage, 'images/photo.jpg');
            await getDownloadURL(reference).then((x) => { setUrl(x) })
        }

        func();
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
                style={{ width: '70%', height: '70%' }}
                source={{ uri: url }}
            />
        </View>
    )
    // return (
    //     <View style = {styles.container}>
    //         <Slider/>
    //     </View>
    // )   
}

export default Page

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'c8a7a2'
    }
})