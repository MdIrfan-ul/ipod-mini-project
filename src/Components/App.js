import React from "react";
import Case from "./Case";

import song1 from "../static/songs/AlanWalker-faded.mp3";
import song2 from "../static/songs/Eminem-Venom.mp3";
import song3 from "../static/songs/Marshmello-friends.mp3";

import artist1 from "../static/images/AlanWalker.png";
import artist2 from "../static/images/Eminem.png";
import artist3 from "../static/images/Marshmello.png";

import album1 from "../static/images/AlanWalker-faded.jpeg";
import album2 from "../static/images/Eminem-Venom.jpg";
import album3 from "../static/images/Marshmello-friends.jpg";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      active: 0, //active menu
      menuItems: ["Cover Flow", "Music", "Games", "Settings"],
      musicItems: ["Songs", "Artists", "Albums"],
      songItemsUrl: [song1, song2, song3],
      artists: [
        { name: "AlanWalker", image: artist1 },
        { name: "Eminem", image: artist2 },
        { name: "Marshmello", image: artist3 },
      ],
      albums:[
        {name:'AlanWalker-Faded',image:album1},{name:'Eminem-Venom',image:album2},{name:'Marshmello-Friends',image:album3}
      ],
      songImgItemUrl: [album1, album2, album3],
      songItems: ["AlanWalker-Faded", "Eminem-Venom", "Marshmello-Friends"],
      songIndex: 0, //current song
      lengthMenuKey: { "-1": 3, 1: 2, 4: 4, 8: 4, 3: 2, 9: 3, 10: 2 }, //length of a particular menu
      menuMapping: { "-1": [0, 1, 2, 3], 1: [4, 5, 6], 3: [8, 9, 10] }, //which menu can be rendered by key menu
      currentMenu: -2, //current menu which is lockscreen initially
      navigationStack: [], //Used for navigation forward and backward
      songUrl: song1, //current song url
      playing: false, //playing or not
      audio: new Audio(song1), //current audio file
      songImgUrl: album1,
    };
  }
  // FUNCTION FOR : ON LONG PRESS OF FORWARD BUTTON TRACKS ARE SEEKED FORWARD
  seekSongForward = (e) => {
    if (this.state.currentMenu === -2 || this.state.playing === false) {
      return;
    }
    if (e.detail.interval < 250) {
      const songIndex = (this.state.songIndex + 1) % this.state.songItemsUrl.length;
      const songUrl = this.state.songItemsUrl[songIndex];
      const songImgUrl = this.state.songImgItemUrl[songIndex];
      this.state.audio.pause();
      this.setState(
        {
          songIndex: songIndex,
          songImgUrl: songImgUrl,
          songUrl: songUrl,
          audio: new Audio(songUrl),
        },
        () => {
          this.state.audio.play().catch((error) => console.log(error));
        }
      );
    } else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      const interval = e.detail.interval / 100;
      this.setState((prevState) => {
        prevState.audio.currentTime += interval;
        return prevState;
      });
    }
  };

  // FUNCTION FOR : ON LONG PRESS OF FORWARD BUTTON TRACKS ARE SEEKED BACKWARD
  seekSongReverse = (e) => {
    if (this.state.currentMenu === -2 || this.state.playing === false) {
      return;
    }
    if (e.detail.interval < 250) {
      let songIndex = this.state.songIndex - 1;
      if (songIndex < 0) {
        songIndex = this.state.songItemsUrl.length - 1;
      }
      const songUrl = this.state.songItemsUrl[songIndex];
      const songImgUrl = this.state.songImgItemUrl[songIndex];
      this.state.audio.pause();
      this.setState(
        {
          songIndex: songIndex,
          songImgUrl: songImgUrl,
          songUrl: songUrl,
          audio: new Audio(songUrl),
        },
        () => {
          this.state.audio.play().catch((error) => console.log(error));
        }
      );
    } else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      const interval = e.detail.interval / 100;
      this.setState((prevState) => {
        prevState.audio.currentTime -= interval;
        return prevState;
      });
    }
  };

  // FUNCTION FOR : TOGGLE SONG PLAY AND PAUSE
  togglePlayPause = async() => {
    try {
      if (this.state.currentMenu === -2) {
        return;
      }
      if (this.state.playing === true) {
      await  this.setState({ playing: false });
        await this.state.audio.pause();
        
      } else {
      await  this.setState({ playing: true });
      // var playPromise = this.state.audio.play();
      // console.log(playPromise);
        await this.state.audio.play();
      }
    } catch (error) {
      console.log(error);
    }
   
  };

  // FUNCTION FOR : UPDATE ACTIVE MENU WHILE ROTATING ON THE TRACK-WHEEL
  updateActiveMenu = (direction, menu) => {
    if (
      menu !== -1 &&
      menu !== 1 &&
      menu !== 4 &&
      menu !== 8 &&
      menu !== 3 &&
      menu !== 9 &&
      menu !== 10
    ) {
      return;
    }
    let min = 0;
    let max = 0;

    max = this.state.lengthMenuKey[menu];

    if (direction === 1) {
      if (this.state.active >= max) {
        this.setState({ active: min });
      } else {
        this.setState({ active: this.state.active + 1 });
      }
    } else {
      if (this.state.active <= min) {
        this.setState({ active: max });
      } else {
        this.setState({ active: this.state.active - 1 });
      }
    }
  };

  // FUNCTION FOR : CHANGE PLAYING MUSIC
  chagePlayingSongFromMusicMenu = (id, navigationStack) => {
    const songUrl = this.state.songItemsUrl[id];
    const songImgUrl = this.state.songImgItemUrl[id];
    this.state.audio.pause();
    this.setState(
      {
        currentMenu: 7,
        songUrl: songUrl,
        navigationStack: navigationStack,
        active: 0,
        playing: true,
        songIndex: id,
        audio: new Audio(songUrl),
        songImgUrl: songImgUrl,
      },
      () => {
        this.state.audio.play().catch((error) => console.log(error));
      }
    );
  };
  // FUNCTION FOR : CHANGE MENU BACKWARDS on PRESS OF CENTER BUTTON
  changeMenuBackward = () => {
    const navigationStack = this.state.navigationStack.slice();
    if (this.state.currentMenu === -2) {
      return;
    } else {
      const prevId = navigationStack.pop();
      this.setState({
        currentMenu: prevId,
        navigationStack: navigationStack,
        active: 0,
      });
      return;
    }
  };

  // FUNCTION FOR : CHANGE MENU FORWARD on PRESS OF CENTER BUTTON using NAVIGATION STACK
  changeMenuForward = (id, fromMenu) => {
    const navigationStack = this.state.navigationStack.slice();

    if (
      fromMenu !== -2 &&
      fromMenu !== -1 &&
      fromMenu !== 1 &&
      fromMenu !== 4 &&
      fromMenu !== 3 &&
      fromMenu !== 8 &&
      fromMenu !== 9 &&
      fromMenu !== 0 &&
      fromMenu !== 7 &&
      fromMenu !== 10
    ) {
      return;
    }

    if (fromMenu === -2) {
      navigationStack.push(this.state.currentMenu);
      this.setState({
        currentMenu: -1,
        navigationStack: navigationStack,
        active: 0,
      });
      return;
    }

    if (fromMenu === -1) {
      navigationStack.push(this.state.currentMenu);
      this.setState({
        currentMenu: id,
        navigationStack: navigationStack,
        active: 0,
      });
      return;
    }

    if (fromMenu === 7 || fromMenu === 0) {
      this.togglePlayPause();
      return;
    }
    navigationStack.push(this.state.currentMenu);

    if (fromMenu === 4) {
      this.chagePlayingSongFromMusicMenu(id, navigationStack, fromMenu);
      return;
    }

    const currentMenuID = this.state.menuMapping[fromMenu][id];
    this.setState({
      currentMenu: currentMenuID,
      navigationStack: navigationStack,
      active: 0,
    });
  };

  render() {
    const {
      audio,
      active,
      currentMenu,
      menuItems,
      musicItems,
      songItems,
      artists,
      albums,
      songIndex,
      playing,
      songUrl,
      songImgUrl,
    } = this.state;
    return (
      <>
        <div className="ipod">
          <Case
            songIndex={songIndex}
            active={active}
            menuItems={menuItems}
            musicItems={musicItems}
            currentMenu={currentMenu}
            changeMenuForward={this.changeMenuForward}
            changeMenuBackward={this.changeMenuBackward}
            updateActiveMenu={this.updateActiveMenu}
            togglePlayPause={this.togglePlayPause}
            songItems={songItems}
            playing={playing}
            audio={audio}
            songUrl={songUrl}
            songImgUrl={songImgUrl}
            seekSongForward={this.seekSongForward}
            seekSongReverse={this.seekSongReverse}
            artists={artists}
            albums={albums}
          />
        </div>
      </>
    );
  }
}

export default App;
