async function getEncodedImageFromURL(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();

        // Some websites will allow loading of images into a canvas if set to Anonymous
        img.crossOrigin = 'Anonymous';

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(async (blob) => {
                let blobBuffer = await blob.arrayBuffer();
                resolve({
                    img: img,
                    data: new Uint8Array(blobBuffer),
                });
            });
        };
        // If an Anonymous image does not load, attempt to load it
        // cross origin using cors-anywhere
        img.onerror = () => {
            if (img.src.indexOf('cors-anywhere') === -1) {
                img.src = `https://cors-anywhere.com/${url.replace(/http(s)?:\/\//, '')}`;
            } else {
                reject('Error fetching image');
            }
        };

        img.src = url;
    });
}

export default async function fetchMetaTags(imageUrl) {
    let metaTags = {};

    let images = [
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1',
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=500',
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=350&dpr=1',
        'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=400&h=350&dpr=1',
    ];
    let imageData;
    if (imageUrl === undefined)
        imageData = await getEncodedImageFromURL(images[Math.floor(Math.random() * images.length)]);
    else imageData = await getEncodedImageFromURL(imageUrl);

    metaTags.image = {
        data: imageData.data,
        url: imageData.img.src,
        width: imageData.img.naturalWidth,
        height: imageData.img.naturalHeight,
    };
    console.log('metaTags', metaTags);
    return metaTags;
}
