import React, { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import FeedbackIcon from '@material-ui/icons/Feedback';
import BookIcon from '@material-ui/icons/Book';
import HistoryIcon from '@material-ui/icons/History';
import OfferIcon from '@material-ui/icons/LocalOffer';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, Hidden, List, makeStyles } from '@material-ui/core';
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
      to: `/user/${id}`,
      icon: <BookIcon style={{color: '3f51b5'}} />,
      title: 'Book A Parking'
    },
    {
      to: `/user/${id}/history`,
      icon: <HistoryIcon style={{color: '3f51b5'}} />,
      title: 'History'
    },
    {
      to: `/user/${id}/offers`,
      icon: <OfferIcon style={{color: '3f51b5'}} />,
      title: 'Offers'
    },
    {
      to: `/user/${id}/feedback`,
      icon: <FeedbackIcon style={{color: '3f51b5'}} />,
      title: 'Feedback'
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
        <NavLink onClick={handleClick} to="/">
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
