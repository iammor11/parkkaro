import React, { useState } from 'react'
import DarkImg from "../../Images/dark.png";
import LightImg from '../../Images/light.png';

const DarkMode = (props) => {
    const [addCss, setAddCss] = useState(props.isLight==='true' ? 'react-toggle' : 'react-toggle react-toggle--checked')

    const changeCss = () => {
        console.log('hi')
        setAddCss(addCss==='react-toggle' ? 'react-toggle react-toggle--checked' : 'react-toggle')
        props.handleChangeTheme()
    }
        
    return(
        <div className={addCss} id="mode" onClick={changeCss}>
            <div className="react-toggle-track">
                <div className="react-toggle-track-check">
                    <img src={LightImg} style={{pointerEvents: 'none'}} width="16" height="16" role="presentation" alt="Light Mode Logo" />
                </div>
            
                <div className="react-toggle-track-x">
                <img src={DarkImg} style={{pointerEvents: 'none'}} width="16" height="16" role="presentation" alt="Dark Mode Logo" />
                </div>
            </div>
            
            <div className="react-toggle-thumb"></div>
            <input className="react-toggle-screenreader-only" type="checkbox" aria-label="Switch between Dark and Light mode" />
        </div>
    )
}
export default DarkMode