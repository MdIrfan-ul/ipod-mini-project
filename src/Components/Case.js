import IpodWheel from "./Wheel";
import IpodScreen from "./Screen";
import "../static/css/case.css";



function Case(props) {
  const {
    active,
    updateActiveMenu,
    currentMenu,
    changeMenuBackward,
    changeMenuForward,
    menuItems,
    musicItems,
    togglePlayPause,
    songItems,
    playing,
    songIndex,
    audio,
    songUrl,
    songImgUrl,
    seekSongForward,
    seekSongReverse,
    artists,
    albums
  } = props;
  return (
    <>
      <IpodScreen
        songIndex={songIndex}
        playing={playing}
        active={active}
        musicItems={musicItems}
        menuItems={menuItems}
        currentMenu={currentMenu}
        songItems={songItems}
        audio={audio}
        songUrl={songUrl}
        songImgUrl={songImgUrl}
        artists={artists}
        albums={albums}
      />
      <IpodWheel
        active={active}
        menuItems={menuItems}
        currentMenu={currentMenu}
        changeMenuForward={changeMenuForward}
        changeMenuBackward={changeMenuBackward}
        updateActiveMenu={updateActiveMenu}
        togglePlayPause={togglePlayPause}
        seekSongForward={seekSongForward}
        seekSongReverse={seekSongReverse}
      />
    </>
  );
}

export default Case;