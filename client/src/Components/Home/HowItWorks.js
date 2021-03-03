import React, {useState} from 'react'
import { Button } from '@material-ui/core';
import MyModal from './Modal';
import { ThemeContext } from '../../ThemeContext'
        
const HowItWorks = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return(
    <ThemeContext.Consumer>
    {(isLight) => (
        <>
    <div className="query">
        <Button onClick={handleOpen}  style={{width: '100%', backgroundColor: isLight==='true' ? null : 'white', color: isLight==='true' ? null : '#3f51b5'}} variant="contained" color="primary" disableElevation>
          <h1>How It Works</h1>
        </Button>
        
        <MyModal open={open} handleClose={handleClose} />
      </div>
      </>)}
    </ThemeContext.Consumer>
  )
}
export default HowItWorks