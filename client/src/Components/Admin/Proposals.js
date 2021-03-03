import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
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

const Proposals = ({ className, ...rest }) => {
  const classes = useStyles();
  
const [feedbacks, setFeedbacks] = useState()
const [error, setError] = useState()
const [cookies] = useCookies(['token']);

useEffect(() => {
  axios.get('https://parkkaro.herokuapp.com/api/business', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.token}`
    }
})
  .then(res => {
      setFeedbacks(res.data.result)
  })
  .catch(err => {
    setError(err.response.data.message)
  })
}, [cookies.token])


  return (
    error ? <h1>{error}</h1> : <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Business Proposals" />
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
                  Email
                </TableCell>
                <TableCell>
                  Mobile No
                </TableCell>
                <TableCell>
                  Message
                </TableCell>
                <TableCell>
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbacks && feedbacks.map( data => (
                <TableRow
                  hover
                  key={data._id}
                >
                  <TableCell>
                    {data.name}
                  </TableCell>
                  <TableCell>
                    {data.email}
                  </TableCell>
                  <TableCell>
                    0{data.mblno}
                  </TableCell>
                  <TableCell>
                    {data.message}
                  </TableCell>
                  <TableCell>
                    {moment(data.time).format('DD/MM/YYYY')}
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

export default Proposals;