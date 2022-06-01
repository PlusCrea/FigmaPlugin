import * as React from 'react';
import '../styles/ui.css';
import Firebase from '../firebase';
//import { Disclosure, Tip, Title, Checkbox, Button } from "react-figma-plugin-ds";
//import "react-figma-plugin-ds/figma-plugin-ds.css";

declare function require(path: string): any;

const App = ({}) => {
    const textbox = React.useRef<HTMLInputElement>(undefined);
    const [license, setLicense] = React.useState(false);
    const [errmsg, setErrmsg] = React.useState(false);
    const [user, setUser] = React.useState('');
    //bu kullanıcıyı almaya yarıyor
    parent.postMessage({pluginMessage: {type: 'onLoad'}}, '*');

    const countRef = React.useCallback((element: HTMLInputElement) => {
        if (element) element.value = '';
        textbox.current = element;
    }, []);

    const onCreate = () => {
        const count = textbox.current.value;
        console.log('count', count.trim());
        setErrmsg(false);

        Firebase.CheckLicenseNumber(count.trim()).then((result) => {
            console.log('CheckLicenseNumber : ', result);

            if (!result) {
                setErrmsg(true);
                console.log('errmsg', errmsg);
                return;
            } else {
                Firebase.AddLicense(user, count.trim()).then(() => {
                    setLicense(true);
                });
            }
        });
        console.log('Buraya geldi');

        //parent.postMessage({pluginMessage: {type: 'create-rectangles', count}}, '*');
    };

    const onCancel = () => {
        parent.postMessage({pluginMessage: {type: 'cancel'}}, '*');
    };

    async function getData(usr) {
        Firebase.CheckUserLicense(usr).then((result) => {
            //    imgurl.push(result);
            console.log('License : ', result);
            setLicense(result);
        });
    }
    /*
    async function CheckNumber(number) {
        Firebase.CheckLicenseNumber(number).then((result) => {
            //    imgurl.push(result);
            console.log('CheckLicenseNumber : ', result);
            return result;
        });
    }
    */
    const MsgListener = (e) => {
        //console.log('e.data.pluginMessage', e.data.pluginMessage);
        //console.log('e.data.pluginMessage.user', e.data.pluginMessage.user);
        setUser(e.data.pluginMessage.user);
        getData(e.data.pluginMessage.user);
        /*
        if (e.data.pluginMessage.type === 'enable-element') {
            try {
                var data = require(`../../data/${e.data.pluginMessage.user}.json`);
                console.log('Oleey', data);
            } catch (error) {}
        }
        */
    };

    React.useEffect(() => {
        window.addEventListener('message', MsgListener);

        return () => {
            window.removeEventListener('message', MsgListener);
        };
    }, []);

    return (
        <div>
            <h2 className="baslik">Add License Number</h2>
            <h2 className="baslik">License : </h2>
            {license ? <h2 className="message">OK </h2> : <h2 className="message">NO</h2>}
            <p>
                Key: <input ref={countRef} />
                {errmsg ? <h4 className="message">Invalid License Number</h4> : ''}
            </p>

            <button id="create" onClick={onCreate}>
                Add
            </button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default App;
