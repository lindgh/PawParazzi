// Credit to Pradip Debnath
// https://www.youtube.com/watch?v=wIh60UQzUKY&t=338s
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { ImageSliderType, getImageSliderData } from "../data/SliderData";
import SliderItem from "./SliderItem";

const Slider = () => {
    const [sliderData, setSliderData] = useState<ImageSliderType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getImageSliderData();
            setSliderData(data);
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View>
            <FlatList
                data={sliderData}
                renderItem={({ item, index }) => (
                    <SliderItem item={item} index={index} />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
            />
        </View>
    );
};

export default Slider;

const styles = StyleSheet.create({});
