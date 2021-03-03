import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { ThemeContext } from '../../ThemeContext'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = theme => ({
});

const SwipeableTextMobileStepper = (props) =>  {
  const [feedbacks, setFeedbacks] = useState()
  const [activeStep, setActiveStep] = useState(0)  
    
  useEffect( () => {
    const fetchData = async () => {
    const res = await axios.get("https://parkkaro.herokuapp.com/api/feedback")
    setFeedbacks(res.data.result)
  }
  fetchData()
  }, [])

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  }

  const handleStepChange = activeStep => {
    setActiveStep(activeStep)
  }
  
  const { classes, theme } = props;
  const [maxSteps, setMaxSteps] = useState(feedbacks?.length);
    return (
      <ThemeContext.Consumer>
    {(isLight) => (
        <>
        <div style={{backgroundColor : isLight==='true' ? null : 'black'}} id="reviews">
          
          <div className={classes.root} >
      
            <h1 style={{color : isLight==='true' ? null : 'white'}} className="h1Size">PEOPLE <br /><FavoriteIcon style={{color: 'red', fontSize: '3rem'}} /><br />PARKKARO</h1>
            <AutoPlaySwipeableViews
            style={{backgroundColor : isLight==='true' ? null : 'black', color: isLight==='true' ? null : 'white'}}
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {feedbacks && feedbacks.map((step, index) => (
                <div key={index}>
                  <Paper elevation={0} style={{backgroundColor: isLight==='true' ? null : 'black'}} id="reviews">
                  <Typography><h4 style={{color: isLight==='true' ? null : 'white'}} className="msg">{step.message}</h4></Typography>
                  <Typography><h4 style={{color: isLight==='true' ? null : 'white'}} className="msg">{step.name}</h4></Typography>
                  </Paper>
          </div>
          ))}
            </AutoPlaySwipeableViews> 
        
            <MobileStepper
              id="slider"
              steps={maxSteps}
              position="static"
              style={{backgroundColor: isLight==='true' ? null : 'black', color: isLight==='true' ? null : 'white'}}
              activeStep={activeStep}
              className={classes.mobileStepper}
              nextButton={
                <Button size="small" style={{color: isLight==='true' ? null : 'white'}} onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                Next
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              }
              backButton={
                <Button size="small" style={{color: isLight==='true' ? null : 'white'}} onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Back
                </Button>
              }
            />
        </div>
    </div>
    </>)}
    </ThemeContext.Consumer>
  );
}
export default withStyles(styles, { withTheme: true })(SwipeableTextMobileStepper);