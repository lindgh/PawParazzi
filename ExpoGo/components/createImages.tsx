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

    return url ? <img src = { url } alt = "Fetched from Firebae" /> : <p>Loading...</p>
}

export const createImages = (): string[] => {
    let imageNames: string[] = [];

    for (let i = 1; i < 4; i++) {
        let image_name = 'images/photo';
        image_name += i;
        image_name += '.jpg';
        imageNames.push(image_name);
    }

    return imageNames;
}
