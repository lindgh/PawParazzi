import { ImageSourcePropType } from "react-native";

export type ImageSliderType = {
    title: string;
    image: ImageSourcePropType;
    description: string;
};

export const ImageSlider = [
    {
        title: 'akali',
        image: require('@/assets/images/akali.jpg'),
        description: 'ponyo holding a bucket'
    },
    {
        title: 'gino',
        image: require('@/assets/images/gino.jpg'),
        description: 'mononoke holding knife'
    },
    {
        title: 'olive',
        image: require('@/assets/images/olive.jpg'),
        description: 'haku slay'
    },
    {
        title: 'ponyo',
        image: require('@/assets/images/ponyo.jpg'),
        description: 'haku slay'
    },
    // {
    //     title: 'akali',
    //     image: require('https://firebasestorage.googleapis.com/v0/b/pawparazzi-bearjeans.firebasestorage.app/o/images%2Fakali.jpg?alt=media&token=4e556bf4-0d2d-4717-bdc9-9c8ad94076c4'),
    //     description: 'car'
    // }
]