import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, CardHeader, Divider, Table, TableBody, TableCell, TableHead, TableRow, makeStyles } from '@material-ui/core';
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

const UserHistory = ({ className, ...rest }) => {
  const classes = useStyles();
  const [users, setUsers] = useState()
  const [error, setError] = useState()
  const [cookies] = useCookies(['token']);

  useEffect(() => {
      axios.get('https://parkkaro.herokuapp.com/api/park/one', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.token}`
        }
    })
      .then(res => {
          setUsers(res.data.result)
      })
      .catch(err => {
        setError(err.response.data.message)
      })
  }, [cookies.token])
  return (
    !users ? <h1 style={{textAlign: "center", backgroundColor: 'white'}}>You don't have any parking history</h1>  : <Card style={{backgroundColor: 'white'}}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Booked Parking" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Start Date
                </TableCell>
                <TableCell>
                  End Date
                </TableCell>
                <TableCell>
                  Vehicle
                </TableCell>
                <TableCell>
                  Place
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
                    {data.name}
                  </TableCell>
                  <TableCell>
                    {data.startTime}
                  </TableCell>
                  <TableCell>
                    {data.endTime}
                  </TableCell>
                  <TableCell>
                    {data.vehicle}
                  </TableCell>
                  <TableCell>
                    {data.place}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  )
}
export default UserHistory;