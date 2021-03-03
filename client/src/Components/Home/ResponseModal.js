import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '3px solid #3f51b5',
  height: '50vh',
  width: '50%',
  textAlign: 'center',
  transform: 'translate(50%, 0%)',
  },
}));

const ResponseModal = (props) => {
    const classes = useStyles();
    return(
        <Modal
          id="resModal"
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
              <h1 id="transition-modal-title" style={{color: props.error ? 'red' : 'black'}}>{props.error ? props.error : props.result ? props.result : null}</h1>
            </div>
          </Fade>
        </Modal>
    )
}
export default ResponseModal