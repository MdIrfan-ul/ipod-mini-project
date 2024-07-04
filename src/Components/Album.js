import style from "../static/css/menuOptions.module.css"
import styled from "styled-components";

const AlbumNames =styled.div`
  background-color:  'white';
  color: 'black';
  padding: 15px;
  display: flex;
  align-items: center;
  &::after {
    color: white;
    margin-left: 30px;
  }`

  const AlbumImages =styled.img`
  background-size:cover;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 50%;
`;
function Albums(props){
    const {albums}=props;
    return(
        <>
        <div className={style.menuOptions}>
{albums.map((album,index)=>
    (<AlbumNames key={index}>
        <AlbumImages src={album.image} alt="album-image"/>
        {album.name}
    </AlbumNames>))}
        </div>
        </>
    )
}

export default Albums;