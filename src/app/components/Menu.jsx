import * as React from 'react';
import useContextMenu from "./useContextMenu";

const Menu = () => {
  const { anchorPoint, show } = useContextMenu();
const onSettings = () => {
        console.log('Settings');
      //  setShowDateSettings(true);
        //setShow(false);
    };
    
  if (show) {
    return (
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
    );
  }
  return <></>;
};

export default Menu;