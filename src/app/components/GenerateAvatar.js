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

export default async function fetchMetaTags(type) {
    let metaTags = {};

    let images = [
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1',
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=500',
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=350&dpr=1',
        'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=400&h=350&dpr=1',
    ];

    let logo = [
        'https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        'https://images.pexels.com/photos/1337386/pexels-photo-1337386.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        'https://images.pexels.com/photos/1337384/pexels-photo-1337384.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        'https://images.pexels.com/photos/590059/pexels-photo-590059.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        'https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ];
    let imageData;
    if (type === 'Logo') imageData = await getEncodedImageFromURL(logo[Math.floor(Math.random() * logo.length)]);
    else imageData = await getEncodedImageFromURL(images[Math.floor(Math.random() * images.length)]);

    //    console.log('imageData', imageData);
    metaTags.image = {
        data: imageData.data,
        url: imageData.img.src,
        width: imageData.img.naturalWidth,
        height: imageData.img.naturalHeight,
    };
    //  console.log('metaTags', metaTags);
    return metaTags;
}
