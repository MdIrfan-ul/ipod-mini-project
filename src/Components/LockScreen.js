import React from 'react';
import "../static/css/LockScreen.css";
import wallPaper from "../static/images/Ipod-wallpaper.jpeg"

// Renderse lockscreen
class LockScreen extends React.Component {
    render() {
        return (
            <div className='lock'>
                    <img src={wallPaper} alt='lock--screen' className="lockImage"/>
                <div className="lock-display">
                <h3>Press Centre Button to unlock!</h3>
                </div>
            </div>
        )
    }

}


export default LockScreen;