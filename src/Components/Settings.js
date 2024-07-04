import style from "../static/css/menuOptions.module.css"
function Settings(){
    return(
        <>
        <div className={style.menuOptions}>
            <h3 style={{textAlign:'center'}}>
                Settings
            </h3>
            <img src="https://cdn-icons-png.flaticon.com/128/738/738853.png" alt="settings-icon"/>
        </div>
        </>
    )
}

export default Settings;