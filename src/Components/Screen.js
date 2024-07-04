import React from "react";
import LockScreen from "./LockScreen";
import Music from "./Music";
import Games from "./Games";
import Settings from "./Settings";
import Songs from "./Songs"
import Playing from "./Playing";
import Menu from "./Menu";
import Artists from "./Artists";
import Albums from "./Album";
import CoverFlow from "./coverFlow";

import "../static/css/display.css";





export default class IpodScreen extends React.Component {

  render() {
    const {active, currentMenu, menuItems, musicItems,songItems, playing, songIndex, audio, songUrl ,songImgUrl,artists,albums}=this.props;
    return (
      <>
        <div className="display">
          {currentMenu===-2&&<LockScreen/>}
                {currentMenu ===-1 && <Menu menuItems={menuItems} active={active} />}
                {currentMenu === 0 && <CoverFlow />}
                {currentMenu === 1 && <Music musicItems={musicItems} active={active} />}
                {currentMenu === 2 && <Games />}
                {currentMenu === 3 && <Settings/>}
                {currentMenu === 4 && <Songs songItems={songItems} active={active} />}
                {currentMenu === 5 && <Artists artists={artists} active={active}/>}
                {currentMenu === 6 && <Albums albums={albums} active={active}/>}
                {currentMenu===7 && <Playing songImgUrl={songImgUrl} audio={audio} songUrl={songUrl} playing={playing} songIndex={songIndex} songItems={songItems} />}
        </div>
      </>
    );
  }
}
