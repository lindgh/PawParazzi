import { StyleSheet, View, Image, Dimensions, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { ImageSliderType } from '../data/SliderData';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

type Props = {
    item: ImageSliderType;
    index: number;
};

const { width } = Dimensions.get('screen');

const SliderItem = ({ item }: Props) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const storage = getStorage();
                const reference = ref(storage, item.imageName);
                const url = await getDownloadURL(reference);
                setImageUrl(url);
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };

        fetchImageUrl();
    }, [item.imageName]);

    return (
        <View style={styles.itemContainer}>
            {imageUrl ? (
                <Image source={{ uri: imageUrl }} style={styles.image} />
            ) : (
                <ActivityIndicator size="large" color="#0000ff" />
            )}
        </View>
    );
};

export default SliderItem;

const styles = StyleSheet.create({
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        width: width,
        backgroundColor: '#c8a7a2'
    },
    image: {
        width: 300,
        height: 500,
        borderRadius: 7,
    }
});
