import React from 'react'
import { Container, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    containerStyles: {
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
        [theme.breakpoints.down('md')]: {
            padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`
        }
    }
}))

const TableDataRowWrapper = ({children, maxWidth, style, className, ...rest}) => {
    const classes = useStyles()
    return (
        <Container maxWidth={false} disableGutters className="table-odd-rows">
            <Container
                className={classes.containerStyles}
                maxWidth={maxWidth}
                style={{ ...style }}
                {...rest}
            >
                {children}
            </Container>
        </Container>
    )
}

export default TableDataRowWrapper
