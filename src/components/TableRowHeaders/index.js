import React from 'react'
import * as R from 'ramda'
import { Container, Grid, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    narrowedContainer: {
        marginTop: 20,
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
        [theme.breakpoints.down('md')]: {
            padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`
        }
    }
}))

const TableRowHeaders = props => {
    const { headerList, maxWidth, children, className, ...rest } = props

    const classes = useStyles()
    return (
        <Container
            className={classes.narrowedContainer}
            maxWidth={maxWidth}
            {...rest}
        >
            {children || (
                <Grid container>
                    {headerList.map(
                        header => {
                            const formattedHeader = R.replace(/ /g, '-', header.toLowerCase())
                            return  (
                                <Grid item xs align="left" key={formattedHeader}>
                                    <Typography data-test-id={`table-header-${formattedHeader}`} color="primary" style={{ fontWeight: 400 }}>
                                        {header}
                                    </Typography>
                                </Grid>
                            )

                        }
                    )}
                </Grid>
            )}
        </Container>
    )
}

export default TableRowHeaders
