import * as React from 'react';
import '../styles/ui.css';
//import { Disclosure, Tip, Title, Checkbox, Button } from "react-figma-plugin-ds";
//import "react-figma-plugin-ds/figma-plugin-ds.css";

declare function require(path: string): any;

const App = ({}) => {
    const textbox = React.useRef<HTMLInputElement>(undefined);

    const countRef = React.useCallback((element: HTMLInputElement) => {
        if (element) element.value = '5';
        textbox.current = element;
    }, []);

    const onCreate = () => {
        const count = parseInt(textbox.current.value, 10);
        parent.postMessage({pluginMessage: {type: 'create-rectangles', count}}, '*');
    };

    const onCancel = () => {
        parent.postMessage({pluginMessage: {type: 'cancel'}}, '*');
    };

    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            const {type, message} = event.data.pluginMessage;
            if (type === 'create-rectangles') {
                console.log(`Figma Says: ${message}`);
            }
        };
    }, []);

    return (
        <div>
            <img src={require('../assets/logo.svg')} />
            <img  style={{width: "164px", height: "102px", borderRadius: "9999px"}} src="https://via.placeholder.com/164x102" />
            <h2 className="baslik">Rectangle Creator</h2>
            <p>
                Count: <input ref={countRef} />
            </p>
            <button id="create" onClick={onCreate}>
                Create
            </button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default App;
