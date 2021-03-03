import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Home from './Components/Home/Home';
import HelpHome from './Components/Home/HelpHome';
import BusinessHome from './Components/Home/BusinessHome'

import Signup from './Components/Auth/SignUp';
import Login from './Components/Auth/Login';
import Reset from './Components/Auth/Reset'
import ResetPassword from './Components/Auth/ResetPassword'
import VerifiedEmail from "./Components/Auth/VerifiedEmail";

import NotFound from './Components/Home/404'

import HistoryDashboard from './Components/UserDashboard/HistoryDashboard';
import BookedDashboard from './Components/UserDashboard/BookedDashboard';
import OffersDashboard from './Components/UserDashboard/OffersDashboard';
import FeedbackDashboard from './Components/UserDashboard/FeedbackDashboard';

import UsersDashboard from './Components/AdminDashboard/UsersDashboard';
import BookingsDashboard from './Components/AdminDashboard/BookingDashboard';
import QueriesDashboard from './Components/AdminDashboard/QueriesDashboard';
import ProposalsDashboard from './Components/AdminDashboard/ProposalsDashboard';
import HomeDashboard from './Components/AdminDashboard/HomeDashboard';
import FeedbacksDashboard from './Components/AdminDashboard/FeedbacksDashboard';

import { ThemeContext } from './ThemeContext'

const App = (props) => {
  const [getFromStorage] = useState(localStorage.getItem('isLight'));
  const [isLight, setIsLight] = useState(getFromStorage ? getFromStorage : 'true');

  const handleChangeTheme = () => {
    if(isLight==='true'){
    localStorage.setItem('isLight', 'false')
    setIsLight('false')
    }
    else{ 
    localStorage.setItem('isLight', 'true');
    setIsLight('true')
    }
  }
  return (
    <div id={isLight==='true' ? null : 'dark'} className="App">            
    <Elements stripe={loadStripe('pk_test_51HdY9fJreidjy7UKNXs4CW5lxPS0ez17vfI7YuYspxyDXO2Nrmn0pqcjZKRxC0zJr5H5bbULPtHbV4KPcVsQq35P007AERazNr')}>
    <ThemeContext.Provider value={isLight}>
      <BrowserRouter>
          <Switch>  
            <Route exact path="/" render={() => <Home isLight={isLight} handleChangeTheme={handleChangeTheme} />} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/verify/:token" component={VerifiedEmail} />
            <Route exact path="/reset" component={Reset} />
            <Route path="/reset/:token" component={ResetPassword} />
            <Route path="/business" component={BusinessHome} />
            <Route path="/help" component={HelpHome} />
            
            <Route exact path="/admin/:id" component={HomeDashboard} />
            <Route exact path="/admin/:id/users" component={UsersDashboard} />
            <Route path="/admin/:id/booking" component={BookingsDashboard} />
            <Route path="/admin/:id/feedbacks" component={FeedbacksDashboard} />
            <Route path="/admin/:id/proposals" component={ProposalsDashboard} />
            <Route path="/admin/:id/queries" component={QueriesDashboard} />

            <Route exact path="/user/:id" component={BookedDashboard} />
            <Route exact path="/user/:id/history" component={HistoryDashboard} />
            <Route path="/user/:id/offers" component={OffersDashboard} />
            <Route path="/user/:id/feedback" component={FeedbackDashboard} />
            
            <Route path="/*" component={NotFound} />
          </Switch>
          
      </BrowserRouter>
      </ThemeContext.Provider>
      </Elements>
    </div>
  );
}
export default App;