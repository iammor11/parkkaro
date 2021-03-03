import React, { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import PeopleIcon from '@material-ui/icons/People';
import FeedbackIcon from '@material-ui/icons/Feedback';
import BusinessIcon from '@material-ui/icons/Business';
import HelpIcon from '@material-ui/icons/Help';
import BookIcon from '@material-ui/icons/Book';
import HomeIcon from '@material-ui/icons/Home';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import NavItem from './NavItem';

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    
    width: 256,
    top: 64,
    height: 'calc(100%)',

  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const [cookies, setCookies, removeCookies] = useCookies(['token']);
  const [id] = useState(localStorage.getItem('id'))   
  const [items] = useState([
    {
      to: `/admin/${id}`,
      icon: <HomeIcon style={{color: '3f51b5'}} />,
      title: 'Home'
    },
    {
      to: `/admin/${id}/users`,
      icon: <PeopleIcon style={{color: '3f51b5'}} />,
      title: 'Users'
    },
    {
      to: `/admin/${id}/booking`,
      icon: <BookIcon style={{color: '3f51b5'}} />,
      title: 'Booking'
    },
    {
      to: `/admin/${id}/feedbacks`,
      icon: <FeedbackIcon style={{color: '3f51b5'}} />,
      title: 'Feedbacks'
    },
    {
      to: `/admin/${id}/proposals`,
      icon: <BusinessIcon style={{color: '3f51b5'}} />,
      title: 'Proposals'
    },
    {
      to: `/admin/${id}/queries`,
      icon: <HelpIcon style={{color: '3f51b5'}} />,
      title: 'Queries'
    },
  ])
  
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);


  const handleClick = async (e) => {
    await localStorage.removeItem('status')
    await localStorage.removeItem('id')
    await removeCookies('token', { path: '/' })
     }

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {'iammor11'}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              to={item.to}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Divider />
      
      <Box p={2}>
        <List>
          <NavLink onClick={handleClick} to={'/'}>
          <LockIcon style={{color: '3f51b5'}} />&nbsp;Logout
          </NavLink>
          
        </List>
      </Box>
      </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
