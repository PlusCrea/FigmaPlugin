import * as React from 'react';
import '../styles/ui.css';

declare function require(path: string): any;

const App = ({}) => {
    const textbox = React.useRef<HTMLInputElement>(undefined);
    //    const [license, setLicense] = React.useState(false);

    const countRef = React.useCallback((element: HTMLInputElement) => {
        if (element) element.value = '';
        textbox.current = element;
    }, []);

    const onCreate = () => {
        const count = textbox.current.value;
        console.log('count', count.trim());
    };

    const onCancel = () => {
        parent.postMessage({pluginMessage: {type: 'cancel'}}, '*');
    };

    React.useEffect(() => {}, []);

    return (
        <div>
            <h2 className="baslik">UnSplash</h2>
            <p>
                Search: <input ref={countRef} />
            </p>

            <button id="create" onClick={onCreate}>
                Add
            </button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default App;
