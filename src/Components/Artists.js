import React from "react";
import styled from "styled-components";
import style from "../static/css/menuOptions.module.css";

const ArtistNames = styled.div`
 background-color:  'white';
  color: 'black';
  padding: 15px;
  display: flex;
  align-items: center;
  &::after {
    color: white;
    margin-left: 30px;
  }`;

const ArtistImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 50%;
`;

function Artists(props) {
  const { artists, active} = props;
  return (
    <div className={style.menuOptions}>
      {artists.map((artist, index) => { 
        return active === index?
        <ArtistNames key={index} >
          <ArtistImage src={artist.image} alt={artist.name} />
          {artist.name}
        </ArtistNames>:<ArtistNames key={index} >
          <ArtistImage src={artist.image} alt={artist.name} />
          {artist.name}
        </ArtistNames>
})}
    </div>
  );
}

export default Artists;
