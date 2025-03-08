// Credit to Pradip Debnath
// https://www.youtube.com/watch?v=wIh60UQzUKY&t=338s
import { createImages } from "../components/createImages";

export type ImageSliderType = {
    title: string;
    imageName: string;
};

export const getImageSliderData = async (): Promise<ImageSliderType[]> => {
    const imageNames = await createImages();

    return imageNames.map((imageName, index) => ({
        title: `Image ${index}`,
        imageName: imageName.toString(), 
    }));
};