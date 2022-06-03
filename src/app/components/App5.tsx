import * as React from 'react';
import '../styles/ui.css';
//import axios from 'axios';
import MaterialIcon from 'material-icons-react';
import * as ReactDOMServer from 'react-dom/server';

declare function require(path: string): any;

const App = ({}) => {
    const textbox = React.useRef<HTMLInputElement>(undefined);
    //    const [license, setLicense] = React.useState(false);
    //const [images, setImage] = React.useState([]);
    //const clientId = '4hSO4rtS1wzw9J4AL8hOVnm3Z_SVHvRupy-p7W4Gc6U';

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

    function getEditIconPath() {
        const iconString = ReactDOMServer.renderToString(<MaterialIcon icon="account_box" size="large" />);
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(iconString, 'image/svg+xml');
        const iconPath = svgDoc.querySelector('path')?.getAttribute('d') as string;

        //return iconPath;
        console.log('iconPath', iconPath);
    }

    const MsgListener = (e) => {
        console.log('geldi', e.clientX);

        if (e.view.length === 0) return;

        const file = new File([e.target.innerHTML], 'content.svg', {type: 'image/svg+xml'});
        parent.postMessage({pluginMessage: {type: 'AddIcon', data: file}}, '*');
        /*
        parent.postMessage(
            {
                pluginMessage: {
                    type: 'AddIcon',
                    pluginDrop: {
                        clientX: e.clientX,
                        clientY: e.clientY,
                        files: [file],
                    },
                },
            },
            '*'
        );
        */
    };

    React.useEffect(() => {
        getEditIconPath();
        window.addEventListener('dragend', MsgListener);

        return () => {
            window.removeEventListener('dragend', MsgListener);
        };
    }, []);

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
                <p>Drag any icon to the canvas:</p>
                <div className="icons-grid">
                    <span className="icon" draggable="true">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="feather feather-activity"
                        >
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                        </svg>
                    </span>

                    <span className="icon" draggable="true">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="feather feather-airplay"
                        >
                            <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
                            <polygon points="12 15 17 21 7 21 12 15"></polygon>
                        </svg>
                    </span>

                    <span className="icon" draggable="true">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="feather feather-alert-circle"
                        >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                    </span>

                    <span className="icon" draggable="true">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="feather feather-align-center"
                        >
                            <line x1="18" y1="10" x2="6" y2="10"></line>
                            <line x1="21" y1="6" x2="3" y2="6"></line>
                            <line x1="21" y1="14" x2="3" y2="14"></line>
                            <line x1="18" y1="18" x2="6" y2="18"></line>
                        </svg>
                    </span>

                    <span className="icon" draggable="true">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="feather feather-anchor"
                        >
                            <circle cx="12" cy="5" r="3"></circle>
                            <line x1="12" y1="22" x2="12" y2="8"></line>
                            <path d="M5 12H2a10 10 0 0 0 20 0h-3"></path>
                        </svg>
                    </span>

                    <span className="icon" draggable="true">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="feather feather-arrow-left-circle"
                        >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 8 8 12 12 16"></polyline>
                            <line x1="16" y1="12" x2="8" y2="12"></line>
                        </svg>
                    </span>

                    <span className="icon" draggable="true">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="feather feather-bar-chart"
                        >
                            <line x1="12" y1="20" x2="12" y2="10"></line>
                            <line x1="18" y1="20" x2="18" y2="4"></line>
                            <line x1="6" y1="20" x2="6" y2="16"></line>
                        </svg>
                    </span>

                    <span className="icon" draggable="true">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="feather feather-bluetooth"
                        >
                            <polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"></polyline>
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default App;
