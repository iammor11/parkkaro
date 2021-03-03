import React from 'react'
import { ThemeContext } from '../../ThemeContext'

const NotFound = () => {
    return(
    <ThemeContext.Consumer>
        {(isLight) => (
            <>
        <h1 style={{color : isLight==='true' ? null : 'white'}}>404 Error!</h1>
        <h1 style={{color : isLight==='true' ? null : 'white'}}>Not found!</h1>
        </>)}
    </ThemeContext.Consumer>
    )
}
export default NotFound 