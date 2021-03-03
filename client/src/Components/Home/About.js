import React from 'react'
import { ThemeContext } from '../../ThemeContext'
import Light1 from '../../Images/white1.gif'
import Light2 from '../../Images/white2.gif'
import Light3 from '../../Images/white3.gif'
import Dark1 from '../../Images/black1.gif'
import Dark2 from '../../Images/black2.gif'
import Dark3 from '../../Images/black3.gif'


const About = () => {
    return(
        <ThemeContext.Consumer>
        {(isLight) => (
            <>
        <div id="about" style={{color : isLight==='true' ? null : 'white'}}>
            
            <div className="aboutDiv">
            <div className="aboutImg" id="first" style={{backgroundImage: isLight==='true' ? 'url(' + Light1 + ')' : 'url(' + Dark1 + ')'}}></div>

            <div className="myFlex">
            <div className="aboutText">
            <h1 className="h1Size">DISCOVER<br />SPACES</h1>
            <p className="pSize">Find parking anywhere,</p><p className="pSize">for now or for later</p>                
            </div>
            </div>
            </div>
            
            <div className="aboutDiv">

            <div className="myFlex" id="midText">
            <div className="aboutText">
            <h1 className="h1Size">RESERVE<br />AND<br />PREPAY</h1>
            <p className="pSize">Book a space in just</p><p className="pSize">a few easy clicks</p>                
            </div>
            </div>

            <div className="aboutImg" id="second" style={{backgroundImage: isLight==='true' ? 'url(' + Light2 + ')' : 'url(' + Dark2 + ')'}}></div>
            </div>

            <div className="aboutDiv">
            <div className="aboutImg" id="third" style={{backgroundImage: isLight==='true' ? 'url(' + Light3 + ')' : 'url(' + Dark3 + ')'}}></div>

            <div className="myFlex">
            <div className="aboutText">
            <h1 className="h1Size">DRIVE<br />ARRIVE<br />AND<br />PARK</h1>
            <p className="pSize">Come with parkingId</p><p className="pSize">Your space is waiting...</p>                
            
            </div>
            </div>
            </div>
        </div>
        </>)}
    </ThemeContext.Consumer>
    )
}
export default About