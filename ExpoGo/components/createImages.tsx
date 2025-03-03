import { useState, useEffect } from 'react'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

export const Page = ({ image_name } : {image_name:string}) => {
    const [url, setUrl] = useState<string | undefined>("");

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const storage = getStorage();
                const reference = ref(storage, image_name);
                const downloadUrl = await getDownloadURL(reference);
                setUrl(downloadUrl);
            } catch (error) {
                console.error("Error fetching image from Firebase: ", error);
            }
        };

        fetchImageUrl();
    }, [image_name]);

    return url ? <img src = { url } alt = "Fetched from Firebase" /> : <p>Loading...</p>
}

let file = "photoCount.txt";
const getPhotoAmount = async () => {
    const storage = getStorage();
    const file_ref = ref(storage, file);
    const downloadUrl = await getDownloadURL(file_ref);
    const response = await fetch(downloadUrl);
    const text = await response.text();
    return text;
}

export const createImages = async (): Promise<string[]> => {
    let imageNames: string[] = [];
    let photo_count = parseInt(await getPhotoAmount());

    for (let i = 1; i < photo_count  + 1; i++) {
        let image_name = 'images/photo';
        image_name += i;
        image_name += '.jpg';
        imageNames.push(image_name);
    }

    return imageNames;
}
