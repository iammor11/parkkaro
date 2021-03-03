import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import axios from  'axios'
import { CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import { useCookies } from 'react-cookie';

const useStyles = makeStyles((theme) => ({
    textField: {
      width: '90%' ,
    },
  }));
  
const CheckoutForm = (props) => {        
    const classes = useStyles();

    const [cookies] = useCookies(['token']);
    const [getTodayDate, setGetTodayDate] = useState()
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [place, setPlace] = useState()
    const [vehicle, setVehicle] = useState()
    const [result, setResult] = useState()
    const [error, setError] = useState()
    const [isProcessing, setIsProcessing] = useState(false)

    const places = [
        { name: 'Lucky One Mall, Karachi', id: 1 },
        { name: 'National Stadium, Karachi', id: 2 },
        { name: 'Jinnah International Airport, Karachi', id: 3 },
        { name: 'The Aga khan University Hospitals, Karachi', id: 4 },
        { name: 'Habib University, Karachi', id: 5 }
        ]
        
    const vehicles = [
        { name: 'Motorcycle', id: 1 },
        { name: 'Car', id: 2 },
        { name: 'Van', id: 3 },
        { name: 'Bus', id: 4 },
        { name: 'Truck', id: 5 }
        ]

    const handleChange = (e, value, setValue) => {
        setValue(value)
    }

    const handleChangeDate = (e, setValue) => {
        setValue(e.target.value)
    }

const handleCardDetailsChange = e => {
      e.error ? setError(e.error.message) : setError(null);
    };
  
  const handlePayment = async (e) => {
    e.preventDefault()
    const {stripe, elements} = props;
   
      setIsProcessing(true)
     
      try {
        const payment_method_data = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
          billing_details: {address: { city: 'Karachi', country: 'Pk' }, name:'mor',email:'mor@gmail.com', phone: '03333333333'}
        });
        if(!payment_method_data.error){

   await axios.post("https://parkkaro.herokuapp.com/api/payment",{amount: 3000})
  }
        if (payment_method_data.error) {
          setError(payment_method_data.error.message)
          setIsProcessing(false)
          return;
        }
        } catch (err) {
        setError(err.message)
      }
    }
  
    
   const handleSubmit = (e) => {
    e.preventDefault()     
    setIsProcessing(true)
  handlePayment(e)
    axios.post('https://parkkaro.herokuapp.com/api/park/create', 
      { 
      startTime, endTime, place, vehicle,
      }, 
      {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.token}`
      }
  })
    .then(res => {
        setResult(res.data.message)
    
   })
    .catch(err => {
     setIsProcessing(false)
      setError(err.response.data.message)
    })
  }

    useEffect(() => {
        let d = new Date();
        let year = d.getFullYear();
        let month = (d.getMonth() + 1).toString();
        let day = d.getDate().toString()
        let hour = d.getHours().toString();
        day = day.length === 1 ? `0${day}` : day;
        hour = hour.length === 1 ? `0${hour}` : hour;
        month = month.length === 1 ? `0${month}` : month;
        let mystrings = [year, month ,day];
        let joined = mystrings.join("-")
        let timeStrings = [ joined, 'T', hour, ':00:00'] 
        let dd = timeStrings.join('')
        setGetTodayDate(dd)
    }, [])
    
    useEffect(() => {
        setTimeout(() => {
         setError(null)
       }, 5000)}, [error])

    return(
      <ElementsConsumer>
      {({ stripe, elements }) => (
        <>
        <div style={{backgroundColor: 'white'}} id="searchSpace">
        <h1>Book Parking in seconds!</h1>
        <h3 style={{color: error ? 'red' : '#3f51b5'}}>{error ? error : result ? result : null}</h3>   
        <form className={classes.container} onSubmit={handleSubmit}>
        <Autocomplete
            id="places"
            options={places}
            getOptionLabel={(option) => option.name}
            getOptionSelected={(option, value) => option.iso === value.iso}
            onChange={(e, value) => handleChange(e, value.name, setPlace)}
            renderInput={(params) => <TextField {...params}
            className={classes.textField}
            InputLabelProps={{
                shrink: true,
            }} 
            label="Where would you like to park?" 
            variant="outlined"  />}
        />
        <br /><br />
        <TextField            
            id="startTime"
            label="Start Time"
            type="datetime-local"
            format="dd/MM/yyyy"
            defaultValue={getTodayDate}
            className={classes.textField}
            InputLabelProps={{
                shrink: true,
            }}
            variant="outlined"
            inputProps={{ min: getTodayDate }}
            onChange={(e) => handleChangeDate(e, setStartTime)}
        />
        <br /><br />
        {startTime && <TextField    
            id="endTime"
            label="End Time"
            type="datetime-local"
            format="dd/MM/yyyy"
            defaultValue={startTime ? startTime : getTodayDate}
            className={classes.textField}
            InputLabelProps={{
            shrink: true,
            }}
            variant="outlined"
            inputProps={{ min: startTime ? startTime : getTodayDate }}
            onChange={(e) => handleChangeDate(e, setEndTime)}
        />}
        <br /><br />
        <Autocomplete
            id="vehicle"
            options={vehicles}
            getOptionLabel={(option) => option.name}
            getOptionSelected={(option, value) => option.iso === value.iso}
            onChange={(e, value) => handleChange(e, value.name, setVehicle)}
            renderInput={(params) => <TextField {...params}
            className={classes.textField}
            InputLabelProps={{
                shrink: true,
            }}                 
            label="Vehicle" 
            variant="outlined"  />}
        />
        <br /><br />
         <div className="form-group">
            <CardElement className="form-control mylist"
            onChange={handleCardDetailsChange}
            options={ {
              iconStyle: "solid",
              style: {
                base: {
                  color: "#000",
                  fontSize: "16px",
                  iconColor: "#fff",
                  "::placeholder": {
                    color: "#000"
                  }
                },
                invalid: {
                  iconColor: "#FFC7EE",
                  color: "#FFC7EE"
                },
                complete: {
                  iconColor: "#cbf4c9"
                }
              },
              hidePostalCode: true
            }  }
           
          />
          <p>Stripe gives card no '4242 4242 4242 4242' for testing, you can write that no for testing else you will get error</p>
          </div> 


        <input type="submit" className="btn" name="SUBMIT" value={result ? 'Submitted' : isProcessing ? "Processing..." : error ? "Failed" : `Pay Rs30`} />
      </form>
    </div>
    </>
    )}
    </ElementsConsumer>
    )
}
const BookAParking = () => {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}

export default BookAParking