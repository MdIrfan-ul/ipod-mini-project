import React from "react";



class Songs extends React.Component{

  render() {
    const {songItems,active} = this.props;
    return (
      <div className="music">
          <h2>Songs</h2>
          <ul>
          {songItems.map((element, index)=>{
                      return active===index?<li key={index} className="active">&nbsp;{element}<img src="https://cdn-icons-gif.flaticon.com/8312/8312290.gif"alt="song-image"/></li>:<li  id="song1" key={index}>&nbsp;{element}</li>
                  })}
          </ul>
      </div>

  );
  }
}
export default Songs;