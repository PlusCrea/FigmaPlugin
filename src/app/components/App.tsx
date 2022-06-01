import * as React from 'react';
import '../styles/ui.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faUser,
    faChevronDown,
    faChevronUp,
    faPhone,
    faLocationDot,
    faBuildingColumns,
    faAt,
    faHashtag,
    faCalendar,
    faUtensils,
    faStar,
    faUpDown,
    faMusic,
    faAppleWhole,
} from '@fortawesome/free-solid-svg-icons';
import fetchMetaTags from './GenerateAvatar';
import generateName, {pickRandomPhoneNumber} from './GenerateName';
import data from '../data/data.json';
//import avatar from '../assets/avatar.png';
import avatar from '../../../dist/img/avatar.png';
//import {pickRandomPhoneNumber} from './Utils';

declare function require(path: string): any;

const App = ({}) => {
    const [selectedMenu, setSelectedMenu] = React.useState('Contento');
    React.useEffect(() => {
        //        console.log('selectedMenu', selectedMenu);
        console.log('aaa', process.env.PUBLIC_URL);
    }, []);

    const onMenuClick = (name) => {
        setSelectedMenu(name);
    };
    const onChangeAvatar = () => {
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

    const onChangeName = () => {
        const data = generateName('');
        parent.postMessage({pluginMessage: {type: 'ChangeName', data: data}}, '*');
    };

    const onChangePhoneNumber = () => {
        const data = pickRandomPhoneNumber();
        parent.postMessage({pluginMessage: {type: 'ChangePhoneNumber', data: data}}, '*');
    };

    const onChangeMail = () => {
        //const data = pickRandomPhoneNumber();
        parent.postMessage({pluginMessage: {type: 'ChangeMail'}}, '*');
    };

    const onChangeNumber = () => {
        parent.postMessage({pluginMessage: {type: 'ChangeNumber'}}, '*');
    };

    const onChangeDate = () => {
        parent.postMessage({pluginMessage: {type: 'ChangeDate'}}, '*');
    };

    const onChangeSerialNo = () => {
        parent.postMessage({pluginMessage: {type: 'ChangeSerialNo'}}, '*');
    };

    const onChangeFood = () => {
        var food = data.Foods[Math.floor(Math.random() * data.Foods.length)];
        parent.postMessage({pluginMessage: {type: 'ChangeFood', data: food}}, '*');
    };

    const onChangeSinger = () => {
        var singer = data.Singer[Math.floor(Math.random() * data.Singer.length)];
        parent.postMessage({pluginMessage: {type: 'ChangeSigner', data: singer}}, '*');
    };

    const onChangeAdres = () => {
        var adres = data.Adres[Math.floor(Math.random() * data.Adres.length)];
        parent.postMessage({pluginMessage: {type: 'ChangeAdres', data: adres}}, '*');
    };

    const onChangeCompany = () => {
        var company = data.Company[Math.floor(Math.random() * data.Company.length)];
        parent.postMessage({pluginMessage: {type: 'ChangeCompany', data: company}}, '*');
    };

    const onChangeScore = () => {
        parent.postMessage({pluginMessage: {type: 'ChangeScore'}}, '*');
    };

    const onChangeLogo = () => {
        fetchMetaTags('Logo')
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
    return (
        <div>
            <header className="header">
                <ul className="navbar">
                    <li
                        className={`${selectedMenu === 'Contento' ? 'linkactive' : ''}`}
                        onClick={() => onMenuClick('Contento')}
                    >
                        <a href="#">Contento</a>
                    </li>
                    <li
                        className={`${selectedMenu === 'Unsplash' ? 'linkactive' : ''}`}
                        onClick={() => onMenuClick('Unsplash')}
                    >
                        <a href="#">Unsplash</a>
                    </li>
                    <li
                        className={`${selectedMenu === 'LIpsum' ? 'linkactive' : ''}`}
                        onClick={() => onMenuClick('LIpsum')}
                    >
                        <a href="#">LIpsum</a>
                    </li>
                    <li
                        className={`${selectedMenu === 'ColourPal' ? 'linkactive' : ''}`}
                        onClick={() => onMenuClick('ColourPal')}
                    >
                        <a href="#">Colour Pal</a>
                    </li>
                    <li
                        className={`${selectedMenu === 'Charts' ? 'linkactive' : ''}`}
                        onClick={() => onMenuClick('Charts')}
                    >
                        <a href="#">Charts</a>
                    </li>
                    <li
                        className={`${selectedMenu === 'Icons' ? 'linkactive' : ''}`}
                        onClick={() => onMenuClick('Icons')}
                    >
                        <a href="#">Icons</a>
                    </li>
                </ul>
                <div className="icons">
                    <FontAwesomeIcon icon={faChevronDown} className="header-icon" />
                    <FontAwesomeIcon icon={faChevronUp} className="header-icon" />
                </div>
            </header>
            <main className="mainbar">
                {selectedMenu === 'Contento' ? (
                    <section className="cards">
                        <div className="card" onClick={onChangeAvatar}>
                            <div className="cardimg" style={{backgroundColor: 'rgba(253, 233, 207, 0.5)'}}>
                                <img src={avatar} />{' '}
                            </div>
                            <div className="cardtitle">Avatar</div>
                        </div>
                        <div className="card" onClick={onChangeName}>
                            <div className="cardimg" style={{backgroundColor: 'rgba(239, 220, 253, 0.5)'}}>
                                <FontAwesomeIcon icon={faUser} className="card-icon" />
                            </div>
                            <div className="cardtitle">Name</div>
                        </div>
                        <div className="card" onClick={onChangePhoneNumber}>
                            <div className="cardimg" style={{backgroundColor: 'rgba(204, 227, 252, 0.5)'}}>
                                <FontAwesomeIcon icon={faPhone} className="card-icon" />
                            </div>
                            <div className="cardtitle">Phone</div>
                        </div>
                        <div className="card" onClick={onChangeAdres}>
                            <div className="cardimg" style={{backgroundColor: 'rgba(198, 245, 253, 0.5)'}}>
                                <FontAwesomeIcon icon={faLocationDot} className="card-icon" />
                            </div>
                            <div className="cardtitle">Address</div>
                        </div>
                        <div className="card" onClick={onChangeCompany}>
                            <div className="cardimg" style={{backgroundColor: 'rgba(253, 233, 207, 0.5)'}}>
                                <FontAwesomeIcon icon={faBuildingColumns} className="card-icon" />
                            </div>
                            <div className="cardtitle">Company</div>
                        </div>
                        <div className="card" onClick={onChangeMail}>
                            <div className="cardimg" style={{backgroundColor: 'rgba(222, 213, 253, 0.5)'}}>
                                <FontAwesomeIcon icon={faAt} className="card-icon" />
                            </div>
                            <div className="cardtitle">E-Mail</div>
                        </div>
                        <div className="card" onClick={onChangeNumber}>
                            <div className="cardimg" style={{backgroundColor: 'rgba(0, 240, 255, 0.2)'}}>
                                <FontAwesomeIcon icon={faHashtag} className="card-icon" />
                            </div>
                            <div className="cardtitle">Number</div>
                        </div>
                        <div className="card" onClick={onChangeDate}>
                            <div className="cardimg" style={{backgroundColor: 'rgba(227, 253, 220, 0.5)'}}>
                                <FontAwesomeIcon icon={faCalendar} className="card-icon" />
                            </div>
                            <div className="cardtitle">Date</div>
                        </div>
                        <div className="card" onClick={onChangeFood}>
                            <div className="cardimg" style={{backgroundColor: 'rgba(255, 185, 185, 0.5)'}}>
                                <FontAwesomeIcon icon={faUtensils} className="card-icon" />
                            </div>
                            <div className="cardtitle">Food</div>
                        </div>
                        <div className="card" onClick={onChangeScore}>
                            <div className="cardimg" style={{backgroundColor: 'rgba(255, 247, 178, 0.5)'}}>
                                <FontAwesomeIcon icon={faStar} className="card-icon" />
                            </div>
                            <div className="cardtitle">Score</div>
                        </div>
                        <div className="card" onClick={onChangeSerialNo}>
                            <div className="cardimg" style={{backgroundColor: 'rgba(182, 244, 233, 0.5)'}}>
                                <FontAwesomeIcon icon={faUpDown} className="card-icon" />
                            </div>
                            <div className="cardtitle">Serial No</div>
                        </div>
                        <div className="card" onClick={onChangeSinger}>
                            <div className="cardimg" style={{backgroundColor: 'rgba(232, 244, 182, 0.5)'}}>
                                <FontAwesomeIcon icon={faMusic} className="card-icon" />
                            </div>
                            <div className="cardtitle">Singer</div>
                        </div>
                        <div className="card" onClick={onChangeLogo}>
                            <div className="cardimg" style={{backgroundColor: 'rgba(213, 229, 253, 0.5)'}}>
                                <FontAwesomeIcon icon={faAppleWhole} className="card-icon" />
                            </div>
                            <div className="cardtitle">Logo</div>
                        </div>
                    </section>
                ) : (
                    <section className="provers">
                        <div className="protitle">
                            <h3>Master Plugin Pro</h3>
                        </div>
                        <div className="prodesc">
                            <h4>Only $5 for Month</h4>
                        </div>
                        <div className="btn">
                            <button className="probutton">Unlock All Feature Buy Now</button>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default App;
