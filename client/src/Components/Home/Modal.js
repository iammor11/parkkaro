import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import First from '../../Images/modalWhite1.gif'
import Second from '../../Images/modalWhite2.gif'
import Third from '../../Images/modalWhite3.gif'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '3px solid #3f51b5',
  },
}));

const MyModal = (props) => {
    const classes = useStyles();
    return(
        <Modal
          id="workModal"
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={props.open}
          onClose={props.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
          timeout: 500,
        }}
        >
          <Fade in={props.open}>
            <div className={classes.paper}>
              <div className="modalText">
              <h1 id="transition-modal-title">Find space!</h1>
              <p id="transition-modal-description" className="pModalSize">in stadium, hotel, restaurant, mall, airport...</p>
            </div>
            <div className="modalImg hideModal"> 
              <img src={First} alt="Find Space" className="image" /> 
            </div>
          
           <div className="modalText" style={{float: "right"}}>
              <h1 id="transition-modal-title">Book!</h1>
              <p id="transition-modal-description" className="pModalSize">in just a second!</p>
            </div>
            <div className="modalImg hideModal" style={{float: "left"}}>    
              <img src={Second} alt="Find Space" className="image" /> 
            </div>

            <div className="modalText">
              <h1 id="transition-modal-title">And Park!</h1>
              <p id="transition-modal-description" className="pModalSize">Upon arrival, just show your reservation</p>
            </div>
            <div className="modalImg hideModal">  
              <img src={Third} alt="Find Space" className="image" style={{borderRadius: "50%"}} />
            </div>
            </div>
          </Fade>
        </Modal>
    )
}
export default MyModal