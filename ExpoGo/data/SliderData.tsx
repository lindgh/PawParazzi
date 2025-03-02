import { createImages } from "../components/createImages";

export type ImageSliderType = {
    title: string;
    imageName: string;
};

export const getImageSliderData = async (): Promise<ImageSliderType[]> => {
    const imageNames = await createImages();

    return imageNames.map((imageName, index) => ({
        title: 'Image ${index}', // ${} format doesn't work for some reason ?
        imageName: imageName.toString(), 
    }));
};