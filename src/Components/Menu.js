import Wallpaper from "../static/images/Ipod-wallpaper.jpeg";
import Music from "../static/images/MusicWallpaper.jpeg";
import Games from "../static/images/GamesWallpaper.jpeg"
import Settings from "../static/images/settingsWallpaper.jpeg";

import "../static/css/menu.css";
function Menu(props){
    const { active,menuItems} =props;
    return (
        <>
         <div className="menu-container">
                <div className="menu">
                    <ul>
                        {menuItems.map((element, index)=>{
                            return active===index?<li key={index} className="active">&nbsp;{element}</li>:<li key={index}>&nbsp;{element}</li>
                        })}
                    </ul>
                </div>
                <div className="leaf">
                    {active === 0 && <img className="leaf-img" src={Wallpaper} alt="Wallpaper"/>}
                    {active === 1 && <img className="leaf-img" src={Music} alt="Music-wallpaper"/>}
                    {active === 2 && <img className="leaf-img" src={Games} alt="Games-Wallpaper"/>}
                    {active === 3 && <img className="leaf-img" src={Settings} alt="Settings-Wallpaper"/>}
                </div>
            </div>
        </>
    )
}
export default Menu;