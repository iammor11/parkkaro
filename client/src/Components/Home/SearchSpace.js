import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import HomeDark from '../../Images/homeDark.gif'  
import HomeLight from '../../Images/homeLight.gif'
import ResponseModal from './ResponseModal'
import { ThemeContext } from '../../ThemeContext'
const SearchSpace = () => {        
    const [getTodayDate, setGetTodayDate] = useState()
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [place, setPlace] = useState()
    const [vehicle, setVehicle] = useState()
    const [result, setResult] = useState()
    const [error, setError] = useState()

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

        const [open, setOpen] = useState(false);

        const handleOpen = () => {
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
        };
      

    const handleChange = (e, value, setValue) => {
        setValue(value)
    }

    const handleChangeDate = (e, setValue) => {
        setValue(e.target.value)
    }

    
   const handleSubmit = async (e) => {
    e.preventDefault()     
    try {
      const res = await axios.post('https://parkkaro.herokuapp.com/api/park/search',{ startTime, endTime, vehicle, place});
      console.log(res)
      setResult(res.data.message && res.data.message)     
    } 
    catch (error) {
        console.log(error)
     setError(error.response && error.response.data.message)
    }
    handleOpen()
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

    
  
    return(
       <ThemeContext.Consumer>
           {(isLight) => (
               <>
       <div id="searchSpace">
        <h1 style={{color : isLight==='true' ? null : 'white'}}>Check Slot Before Booking!</h1>
      
        <form id="searchForm" onSubmit={handleSubmit}>
        
        <Autocomplete
            id="places"
            options={places}
            className="autocomplete"
            getOptionLabel={(option) => option.name}
            getOptionSelected={(option, value) => option.iso === value.iso}
            onChange={(e, value) => handleChange(e, value.name, setPlace)}
            renderInput={(params) => <TextField {...params}
        style={{backgroundColor : isLight==='true' ? null : 'white', borderRadius : isLight==='true' ? null : '5px', border : isLight==='true' ? null : '5px solid white'}}
            required={true}
            InputLabelProps={{
                shrink: true,
            }} 
            label="Where would you like to park?" 
            variant="outlined"  />}
        />
      
        <TextField            
        style={{backgroundColor : isLight==='true' ? null : 'white', borderRadius : isLight==='true' ? null : '2px', border : isLight==='true' ? null : '2px solid white'}}
        
            id="startTime"
            label="Start Time"
            required={true}
            type="datetime-local"
            format="dd/MM/yyyy"
            className="textfield"
            defaultValue={getTodayDate}
            InputLabelProps={{
                shrink: true,
            }}
            variant="outlined"
            inputProps={{ min: getTodayDate }}
            onChange={(e) => handleChangeDate(e, setStartTime)}
        />
        
        <TextField    
        style={{backgroundColor : isLight==='true' ? null : 'white', borderRadius : isLight==='true' ? null : '2px', border : isLight==='true' ? null : '2px solid white'}}
        
            id="endTime"
            label="End Time"
            required={true}
            type="datetime-local"
            format="dd/MM/yyyy"
            className="textfield"
            defaultValue={getTodayDate}
            InputLabelProps={{
            shrink: true,
            }}
            variant="outlined"
            inputProps={{ min: startTime ? startTime : getTodayDate }}
            onChange={(e) => handleChangeDate(e, setEndTime)}
        />

        <Autocomplete
           id="vehicle"
            options={vehicles}
            className="autocomplete"
            getOptionLabel={(option) => option.name}
            getOptionSelected={(option, value) => option.iso === value.iso}
            onChange={(e, value) => handleChange(e, value.name, setVehicle)}
            renderInput={(params) => <TextField {...params}
        
            style={{backgroundColor : isLight==='true' ? null : 'white', borderRadius : isLight==='true' ? null : '5px', border : isLight==='true' ? null : '5px solid white'}}
            required={true}
            InputLabelProps={{
                shrink: true,
            }}                 
            label="Vehicle" 
            variant="outlined"  />}
        />
 <input type="submit" className={isLight==='true' ? 'btn' : 'btnDark'} name="SUBMIT" value="SUBMIT" />
             
        <br /><br />
</form>
        {isLight==='true' ? <img src={HomeLight}  className="imgMargin" id="searchImg" alt="background animation gif" />
    : <img src={HomeDark}  className="imgMargin" id="searchImg" alt="background animation gif" />
        }
     </div>
    <ResponseModal result={result} error={error} open={open} handleClose={handleClose}/>
    </>)}
    </ThemeContext.Consumer>
    )
}
export default SearchSpace