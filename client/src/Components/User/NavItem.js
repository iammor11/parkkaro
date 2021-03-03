import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, ListItem } from '@material-ui/core';

const NavItem = ({ to, icon, title }) => {
return (
    <ListItem>
      <NavLink to={to} style={{color: '#3f51b5'}}>
      <Button>
        {icon &&  icon }&nbsp;
        <span >{title}</span>
      </Button>
      </NavLink>
    </ListItem>
  );
};
export default NavItem;