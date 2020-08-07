import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button} from '@material-ui/core';


const ReturnButton = ({ previousRoute, user }) => {
    const [isClicked, setIsClicked] = useState(false)

    const handleIsClicked = () => setIsClicked(true)

    const formattedRoute = previousRoute[0].toUpperCase() + previousRoute.slice(1)

    return (
        isClicked
        ?  <Redirect to={{ pathname: `/${previousRoute}`, state: user }} />
        :  <Button
            variant="contained"
            onClick={()=> handleIsClicked('login')}
            style={{ height: '2em', backgroundColor: 'gold'}}
        >
            Return to {formattedRoute}
        </Button>
)
}

export default ReturnButton
