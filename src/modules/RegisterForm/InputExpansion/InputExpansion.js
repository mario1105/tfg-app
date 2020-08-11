import React from 'react';
import {
  makeStyles, Typography, Accordion, AccordionSummary, AccordionDetails
} from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { blue } from '@material-ui/core/colors';

const setFocus = () => {
  document.getElementById('mobile-phone-input').focus();
};

const useStyles = makeStyles((theme) => ({
  AccordionStyle: {
    boxShadow: 'none',
    '&:before': {
      content: 'none'
    },
  },
  AccordionExpandedStyle: {
    margin: '0 !important',
    paddingBottom: '1em'
  },
  AccordionSummaryStyle: {
    padding: 0,
    backgroundColor: `${theme.app.background['300']} !important`
  },
  AccordionSummaryStyleFocused: {
    backgroundColor: `${theme.app.background['300']} !important`
  },
  AccordionSummaryContentStyle: {
    margin: '0 !important'
  },
  AccordionSummaryExpandedStyle: {
    transform: 'none !important'
  },
  AccordionDetails: {
    padding: 0
  }
}));

const InputExpansion = ({
  content, expanded, handleChange, children, ...props
}) => {
  const classes = useStyles();
  return (
    <Accordion
      className={classes.AccordionStyle}
      expanded={expanded}
      onChange={handleChange}
      onFocus={setFocus}
      classes={{
        expanded: classes.AccordionExpandedStyle,
      }}
      {...props}
    >
      <AccordionSummary
        data-test-id="expansion-panel-summary"
        className={classes.AccordionSummaryStyle}
        expandIcon={<HelpOutlineIcon style={{ color: blue[500] }} />}
        aria-controls="panel1d-content"
        id="panel1d-header"
        classes={{
          content: classes.AccordionSummaryContentStyle,
          expanded: classes.AccordionSummaryExpandedStyle,
          focused: classes.AccordionSummaryStyleFocused,
        }}
      >
        {children}
      </AccordionSummary>
      <AccordionDetails
        classes={{ root: classes.AccordionDetails }}
        onFocus={() => null}
        onClick={() => null}
      >
        <Typography>
          {content}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default InputExpansion;
