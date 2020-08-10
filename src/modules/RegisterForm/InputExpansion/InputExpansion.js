import React from 'react';
import {
  makeStyles, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails
} from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { blue } from '@material-ui/core/colors';
import PropTypes from 'prop-types';

const setFocus = () => {
  document.getElementById('mobile-phone-input').focus();
};

const useStyles = makeStyles(() => ({
  expansionPanelStyle: {
    boxShadow: 'none',
    '&:before': {
      content: 'none'
    },
  },
  expansionPanelExpandedStyle: {
    margin: '0 !important',
    paddingBottom: '1em'
  },
  expansionPanelSummaryStyle: {
    padding: 0,
  },
  expansionPanelSummaryStyleFocused: {
    backgroundColor: 'transparent !important'
  },
  expansionPanelSummaryContentStyle: {
    margin: '0 !important'
  },
  expansionPanelSummaryExpandedStyle: {
    transform: 'none !important'
  },
  expansionPanelDetails: {
    padding: 0
  }
}));

const InputExpansion = ({
  content, expanded, handleChange, children, ...props
}) => {
  const classes = useStyles();
  return (
    <ExpansionPanel
      className={classes.expansionPanelStyle}
      expanded={expanded}
      onChange={handleChange}
      onFocus={setFocus}
      classes={{
        expanded: classes.expansionPanelExpandedStyle,
      }}
      {...props}
    >
      <ExpansionPanelSummary
        data-test-id="expansion-panel-summary"
        className={classes.expansionPanelSummaryStyle}
        expandIcon={<HelpOutlineIcon style={{ color: blue[500] }} />}
        aria-controls="panel1d-content"
        id="panel1d-header"
        classes={{
          content: classes.expansionPanelSummaryContentStyle,
          expanded: classes.expansionPanelSummaryExpandedStyle,
          focused: classes.expansionPanelSummaryStyleFocused,
        }}
      >
        {children}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails
        classes={{ root: classes.expansionPanelDetails }}
        onFocus={() => null}
        onClick={() => null}
      >
        <Typography>
          {content}
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

InputExpansion.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node.isRequired,
  expanded: PropTypes.bool,
  handleChange: PropTypes.func,
};

export default InputExpansion;
