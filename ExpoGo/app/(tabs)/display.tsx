import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
// import storage from '@react-native-firebase/storage';

// export storage
export default function display() {
    return (
        <View style = {styles.container}>
            <Text style = {styles.text}> Fetching an image of your furry friend! </Text>
            <Image
                style = {styles.image}
                source = {{
                    uri:'https://firebasestorage.googleapis.com/v0/b/pawparazzi-bearjeans.firebasestorage.app/o/ezgif-1-678ad079dc.jpg?alt=media&token=90e2db5d-f42f-4af7-9610-b13bca002e08'
                }}
            />
            <StatusBar style = "auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width:400,
        height:300,
        resizeMode:'contain',
        borderRadius:50
    },
    text: {
        marginBottom:15,
        fontWeight:'bold',
        fontSize:20
    }
});