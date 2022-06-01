import * as React from 'react';
import '../styles/ui.css';
import generateName from './GenerateName';
import fetchMetaTags from './GenerateAvatar';
//import Sample from './Sample';
import Foo from './foo';
//import Menu from "./Menu";
//import axios from 'axios';

declare function require(path: string): any;

const App = ({}) => {
    const [anchorPoint, setAnchorPoint] = React.useState({x: 0, y: 0});
    const [show, setShow] = React.useState(false);
    const [showDateSettings, setShowDateSettings] = React.useState(false);
    const [dateFormat, setDateFormat] = React.useState('format1');

    const [images, setImage] = React.useState([]);
    const clientId = '4hSO4rtS1wzw9J4AL8hOVnm3Z_SVHvRupy-p7W4Gc6U';
    //const [result, setResult] = React.useState([]);

    parent.postMessage({pluginMessage: {type: 'onLoad'}}, '*');

    const MsgListener = (e) => {
        console.log('e.data.pluginMessage', e.data.pluginMessage);

        if (e.data.pluginMessage.type === 'enable-element') {
            try {
                var data = require(`../../data/${e.data.pluginMessage.user}.json`);
                console.log('Oleey', data);
            } catch (error) {}
        }

        /*
        if (e.data.pluginMessage.type === 'image-url') {
            const imgURL = e.data.pluginMessage.url;
            fetchImagefromURL(imgURL, e.data.pluginMessage.targetID);
        }

        if (e.data.pluginMessage.type === 'get-plugin-storage') {
            if (e.data.pluginMessage.data === '') {
                console.log('empty', e.data.pluginMessage);
            } else {
                console.log(e.data.pluginMessage.data);
            }
        }
        */
    };

    React.useEffect(() => {
        //const apiRoot = 'https://api.unsplash.com';
        //const url = 'https://api.unsplash.com/search/photos?page=1&query=' + 'dog' + '&client_id=' + clientId;

        const url = 'https://api.unsplash.com/photos/random?client_id=' + clientId + '&count=30';
        console.log(url);
        setImage([]);

        /*
        axios.get(url).then((response) => {
            //setResult(response.data.results);
            console.log('response', response);
            setImage([...images, ...response.data]);
        });
*/
        // This is how we read messages sent from the plugin controller
        document.addEventListener('click', handleClick);
        document.addEventListener('contextmenu', handleContextMenu);
        window.onmessage = (event) => {
            const {type, message} = event.data.pluginMessage;
            if (type === 'create-rectangles') {
                console.log(`Figma Says: ${message}`);
            }
        };
        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('contextmenu', handleContextMenu);
        };

        window.addEventListener('message', MsgListener);
        /*
        return () => {
            window.removeEventListener('message', MsgListener);
        };
        */
    });

    const onMaleName = () => {
        const data = generateName('male');
        parent.postMessage({pluginMessage: {type: 'ChangeName', data: data}}, '*');
    };

    const onFemaleName = () => {
        const data = generateName('female');
        parent.postMessage({pluginMessage: {type: 'ChangeName', data: data}}, '*');
    };

    const onDate = () => {
        parent.postMessage({pluginMessage: {type: 'DateFormat', format: dateFormat}}, '*');
    };

    const onSelectDate = () => {
        parent.postMessage({pluginMessage: {type: 'SelectDate', format: dateFormat}}, '*');
    };

    const onDateSettings = () => {
        setShowDateSettings(false);
        console.log('dateFormat', dateFormat);
    };

    const onAvatar = () => {
        fetchMetaTags()
            .then((metaTags) => {
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

    const onCancel = () => {
        parent.postMessage({pluginMessage: {type: 'Cancel'}}, '*');
    };

    const onSettings = () => {
        console.log('Settings');
        setShowDateSettings(true);
        setShow(false);
    };
    const onDateFormat = (format) => {
        setDateFormat(format);
        console.log('select', dateFormat);
    };

    document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        console.log('event', event);
    });

    /*
    const handleContextMenu = React.useCallback(
        (event) => {
            event.preventDefault();
            setAnchorPoint({x: event.pageX, y: event.pageY});
            setShow(true);
            console.log('contextMenu', event.path[0].name);
        },
        [setAnchorPoint, setShow]
    );
*/
    const handleContextMenu = React.useCallback(
        (event) => {
            event.preventDefault();
            setAnchorPoint({x: event.pageX, y: event.pageY});
            setShow(true);
            console.log('contextMenu', event.path[0].name);
        },
        [setShow, setAnchorPoint]
    );

    const handleClick = React.useCallback(() => (show ? setShow(false) : null), [show]);

    React.useEffect(() => {}, []);

    return (
        <div>
            <Foo />
            {show ? (
                <div id="contextMenu" className="context-menu" style={{top: anchorPoint.y, left: anchorPoint.x}}>
                    <ul>
                        <li onClick={onSettings}>Settings</li>
                        <li>
                            <a href="#">Reset</a>
                        </li>
                        <li>
                            <a href="#">Element-3</a>
                        </li>
                        <li>
                            <a href="#">Element-4</a>
                        </li>
                        <li>
                            <a href="#">Element-5</a>
                        </li>
                        <li>
                            <a href="#">Element-6</a>
                        </li>
                        <li>
                            <a href="#">Element-7</a>
                        </li>
                    </ul>
                </div>
            ) : (
                ''
            )}
            {showDateSettings ? (
                <div id="datesettings" className="datesettings">
                    <h4>Date Settings</h4>
                    Date Format
                    <select name="format" id="format" onChange={(e) => onDateFormat(e.target.value)} value={dateFormat}>
                        <option value="format1">04/01/2022</option>
                        <option value="format2">01.04.2022</option>
                    </select>
                    <div style={{textAlign: 'center', margin: '10px'}}>
                        <button id="apply" onClick={onDateSettings}>
                            Apply
                        </button>
                    </div>
                </div>
            ) : (
                ''
            )}
            <h2 className="">Magic Contento</h2>
            <div style={{margin: '5px'}}>
                <button onClick={onMaleName}>Male Name</button>
            </div>
            <div style={{margin: '5px'}}>
                <button onClick={onFemaleName}>Female Name</button>
            </div>
            <div style={{margin: '5px'}}>
                <button onClick={onDate}>Date</button>
            </div>
            <div style={{margin: '5px'}}>
                <button name="Avatar" onClick={onAvatar}>
                    Avatar
                </button>
            </div>
            <div style={{margin: '5px'}}>
                <button name="SelectDate" onClick={onSelectDate}>
                    Select Date
                </button>
            </div>
            <div style={{margin: '5px'}}>
                <button name="Cancel" onClick={onCancel}>
                    Cancel
                </button>
            </div>
            <div>
                Photos
                <div>{images ? images.map((image) => <img src={image.urls.thumb} key={image.id} />) : ''}</div>
            </div>
        </div>
    );
};
/*
window.addEventListener('message', (e) => {
    console.log('e.data.pluginMessage', e.data.pluginMessage);
});
*/
export default App;
