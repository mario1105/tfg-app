import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    button: {
        height: '2em', backgroundColor: 'gold'
    }
}))


const ReturnButton = ({ previousRoute, user, ...props }) => {
    const classes = useStyles()
    const [isClicked, setIsClicked] = useState(false)

    const handleIsClicked = () => setIsClicked(true)

    const formattedRoute = previousRoute[0].toUpperCase() + previousRoute.slice(1)

    return (
        isClicked
            ?  <Redirect to={{ pathname: `/${previousRoute}`, state: user }} />
            :  <Button
                data-test-id={`return-to-${previousRoute}-button`}
                className={classes.button}
                variant="contained"
                onClick={()=> handleIsClicked('login')}
                style={{ height: '2em', backgroundColor: 'gold'}}
                {...props}
            >
                Return to {formattedRoute}
            </Button>
    )
}

export default ReturnButton
