import * as React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Typography } from '@material-ui/core'
import {
    enqueueSnackbar,
    dismissAllSnackbars
} from '@dlefuen/react-redux-snackbars'
import shortid from 'shortid'

const App = () => {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(enqueueSnackbar('Failed fetching data.', 
            {
                key: shortid.generate(),
                variant: 'warning'
            }
        ));
    };

    const handleDimissAll = () => dispatch(dismissAllSnackbars())

    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom>react-redux-snackbars example</Typography>

            <Button variant="contained" onClick={handleClick}>Display snackbar</Button>
            <Button variant="contained" onClick={handleDimissAll}>Dismiss all snackbars</Button>
        </React.Fragment>
    )
}

export default App