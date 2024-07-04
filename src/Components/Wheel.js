import React from "react";
import styled from 'styled-components';
import ZingTouch from "zingtouch";
import { FaForwardFast ,FaPlay,FaPause,FaBackwardFast } from "react-icons/fa6";

const WheelContainer = styled.div`
width:200px;
height:200px;
border-radius:50%;
background-color:grey;
margin-top:auto;
position:relative;
display:flex;
box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);

`
const Wheel = styled.div`
position:relative;
width:200px;
height:200px;
border-radius:50%;
background: radial-gradient(circle at top left, white 0%, white 25%, grey 100%);`


export default class IpodWheel extends React.Component {
  constructor(props) {
    super(props);
    this.angle = 0;
  }
   // control the wheel roatation action if rotation is more than 15 degrees and also check direction of rotation
 wheelControll = (e) => {
  const { updateActiveMenu, currentMenu } = this.props;

  if (e.detail.distanceFromOrigin === 0) {
      this.angle = e.detail.angle;
  }
  if (Math.abs(this.angle - e.detail.angle) > 300) {
      this.angle = Math.abs(e.detail.angle);
      if (e.detail.distanceFromLast === 0) {
          return;
      }
      else if (e.detail.distanceFromLast < 0) {
          updateActiveMenu(1, currentMenu);
      } else {
          updateActiveMenu(0, currentMenu);
      }

  } else if (Math.abs(this.angle - e.detail.angle) > 15) {
      this.angle = Math.abs(e.detail.angle);
      if (e.detail.distanceFromLast === 0) {
          return;
      }
      else if (e.detail.distanceFromLast > 0) {
          updateActiveMenu(1, currentMenu);
      } else {
          updateActiveMenu(0, currentMenu);
      }

  }
}

  componentDidMount() {
    const { changeMenuBackward ,togglePlayPause, seekSongForward, seekSongReverse} = this.props;
    const wheelControll = this.wheelControll;
    const wheel = document.getElementById("wheel");
    const activeRegion = ZingTouch.Region(wheel);
    const menuIcon = document.getElementById("menu");
    const forward = document.getElementById("forward");
    const playPause = document.getElementById("forward-pause");
    const reverse = document.getElementById("backward");

    const longTapGesture = new ZingTouch.Tap({
        maxDelay:10000,
        numInputs: 1,
        tolerance: 1,
    })

    activeRegion.bind(menuIcon, 'tap', function (e) {
        changeMenuBackward();
    });
    activeRegion.bind(wheel, 'rotate', function (e) {
        wheelControll(e);
    });
    activeRegion.bind(playPause, 'tap', function (e) {
        togglePlayPause();
    });

    activeRegion.bind(reverse, longTapGesture, function (e) {
        seekSongReverse(e);
    });

    activeRegion.bind(forward, longTapGesture, function (e) {
        seekSongForward(e);
    });
  }


  render() {
    const { changeMenuForward, active, currentMenu } = this.props;
    // console.log(`Current lock state: ${this.props.lock}`);
    return (
      <WheelContainer id="wheelContainer">
        <Wheel id="wheel">
          <div className="control" id="menu">
            <div>MENU</div>
          </div>
          <div className="control" id="forward"><FaForwardFast /></div>
          <div className="control" id="forward-pause"><FaPlay /><FaPause /></div>
          <div className="control" id="backward"><FaBackwardFast /></div>
        </Wheel>
        <div className="circle" id="blank" onClick={() => { changeMenuForward(active, currentMenu) }}></div>
      </WheelContainer>
    );
  }
}
