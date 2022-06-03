import * as React from 'react';
import '../styles/ui.css';
import axios from 'axios';
import fetchMetaTags from './GenerateAvatar';

declare function require(path: string): any;

const App = ({}) => {
    const textbox = React.useRef<HTMLInputElement>(undefined);
    //    const [license, setLicense] = React.useState(false);
    const [images, setImage] = React.useState([]);
    const clientId = '4hSO4rtS1wzw9J4AL8hOVnm3Z_SVHvRupy-p7W4Gc6U';

    const countRef = React.useCallback((element: HTMLInputElement) => {
        if (element) element.value = '';
        textbox.current = element;
    }, []);

    const onCreate = () => {
        const count = textbox.current.value;
        console.log('count', count.trim());
        getSearchImage(count.trim());
    };

    const onCancel = () => {
        parent.postMessage({pluginMessage: {type: 'cancel'}}, '*');
    };

    React.useEffect(() => {
        getRandomImage();
    }, []);

    function getSearchImage(keyword) {
        const url =
            'https://api.unsplash.com/search/photos?query=' + keyword + '&client_id=' + clientId + '&per_page=30';
        axios.get(url).then((response) => {
            //setResult(response.data.results);
            setImage(response.data.results);
            console.log('unsplashresponse', response.data.results);
        });
    }

    function getRandomImage() {
        const url = 'https://api.unsplash.com/photos/random?client_id=' + clientId + '&count=30';
        //const url = 'https://api.unsplash.com/collections/1298463/?client_id=' + clientId + '&count=30';
        axios.get(url).then((response) => {
            //setResult(response.data.results);
            console.log('unsplashresponse', response);
            setImage([...images, ...response.data]);
        });
    }

    const generateImage = (imageUrl) => {
        console.log('imageUrl', imageUrl);

        fetchMetaTags(imageUrl)
            .then((metaTags) => {
                console.log('metaTags', metaTags.image.data);

                parent.postMessage({pluginMessage: {type: 'Avatar', image: metaTags.image.data}}, '*');
            })
            .catch((err) => {
                parent.postMessage(
                    {
                        pluginMessage: {
                            function: 'fetchError',
                            data: err,
                        },
                    },
                    '*'
                );
            });
    };

    return (
        <div>
            <h2 className="baslik">UnSplash</h2>
            <p>
                Search: <input ref={countRef} />
            </p>

            <button id="create" onClick={onCreate}>
                Search
            </button>
            <button onClick={onCancel}>Cancel</button>
            <div>
                <div>
                    {images
                        ? images.map((image) => (
                              <img
                                  style={{cursor: 'pointer'}}
                                  src={image.urls.thumb}
                                  key={image.id}
                                  onClick={() => generateImage(image.urls.regular)}
                              />
                          ))
                        : ''}
                </div>
            </div>
        </div>
    );
};

export default App;
