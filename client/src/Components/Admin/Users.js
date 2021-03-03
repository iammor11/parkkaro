import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, CardHeader, Chip, Divider, Table, TableBody, TableCell, TableHead, TableRow, makeStyles} from '@material-ui/core';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const Users = ({ className, ...rest }) => {
  const classes = useStyles();
const [users, setUsers] = useState()
const [error, setError] = useState()
const [cookies] = useCookies(['token']);

  useEffect(() => {
      axios.get('https://parkkaro.herokuapp.com/api/getAll', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.token}`
        }
    })
      .then(res => {
          setUsers(res.data.result)
      })
      .catch(err => {
        setError(err.response && err.response.data.message)
      })
  }, [cookies.token])
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="All Users" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  First Name
                </TableCell>
                <TableCell>
                  Last Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Type
                </TableCell>
                <TableCell>
                  Verify
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users && users.map( data => (
                <TableRow
                  hover
                  key={data._id}
                >
                  <TableCell>
                    {data.first_name}
                  </TableCell>
                  <TableCell>
                    {data.last_name}
                  </TableCell>
                  <TableCell>
                    {data.email}
                  </TableCell>
                  <TableCell>
                    {data.userType}
                  </TableCell>
                  <TableCell>
                    <Chip
                      color="primary"
                      label={data.isVerified?'Verified':'Pending'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
    
  );
};

export default Users;