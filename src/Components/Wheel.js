import React from "react";
import styled from 'styled-components';

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



export default class IpodWheel extends React.Component{
    render(){
        return (
            <WheelContainer>
              <Wheel>
              <div className="control"id="menu">
                <div>MENU</div>
              </div>
              <div className="control" id="forward">&gt;&gt;|</div>
              <div className="control" id="forward-pause">&gt;||</div>
              <div className="control"id="backward">|&lt;&lt;</div>
              </Wheel>
              <div className="circle"></div>
            </WheelContainer>
          );
    }
}