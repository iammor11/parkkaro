import React from 'react'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { ThemeContext } from '../../ThemeContext'

const Footer = () => {
    return(
        <ThemeContext.Consumer>
      {(isLight) => (
          <>
        <div style={{backgroundColor : isLight==='true' ? null : 'black'}} id="footer">
        <br /><br />

            <div className="footerDiv">
            <h2>Who we are</h2>
            <p>We provide parking reservation</p>
            <p>in airports, hospitals, stadiums, malls etc ...</p>
            </div>

            <div className="footerDiv">        
            <h2>Follow</h2>
            <a href="https://www.facebook.com/iamMor11" rel="noreferrer" target='_blank'><FacebookIcon style={{color: 'white'}} /></a>&nbsp;&nbsp;&nbsp;
            <a href="https://twitter.com/iamMor11" rel="noreferrer" target='_blank'><TwitterIcon style={{color: 'white'}} /></a>&nbsp;&nbsp;&nbsp;
            <a href="https://www.instagram.com/iamMor11/" rel="noreferrer" target='_blank'><InstagramIcon style={{color: 'white'}} /></a>&nbsp;&nbsp;&nbsp;
            <a href="https://www.linkedin.com/in/iamMor11/" rel="noreferrer" target='_blank'><LinkedInIcon style={{color: 'white'}} /></a>&nbsp;&nbsp;&nbsp;
            <a href="https://github.com/iamMor11" rel="noreferrer" target='_blank'><GitHubIcon style={{color: 'white'}} /></a>&nbsp;&nbsp;&nbsp;
            <br /><br />
            </div>

            <div className="footerDiv">
            <h2>Contact Info</h2>
            <p>Address: Karachi</p>
            <p>Phone: +923200206211</p>
            <p>Email: osamarizwan444@gmail.com</p>
            </div>

        <br /><br />    
        
            <p>All rights reserved | This is made with <FavoriteIcon style={{color: 'red'}} /> by MOR.</p>
        <br />
        </div>
    </>)}
    </ThemeContext.Consumer>
    )
}
export default Footer