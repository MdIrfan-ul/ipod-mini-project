import React from "react";
import styled from "styled-components";

const Screen = styled.div`
  width: 280px;
  height: 250px;
  border: 3px solid black;
  border-radius:10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;
const Content = styled.div`
  text-align: center;
`;

export default class IpodScreen extends React.Component {
  render() {
    return (
      <>
        <Screen>
          <Content><h3>HELLO</h3></Content>
        </Screen>
      </>
    );
  }
}
