import React from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { InputBase, Box } from '@material-ui/core';

const styles = createStyles({
  root: {

  },
  input: {
    padding: 10,
  },
});

interface Props extends WithStyles<typeof styles> {
  placeholder?: string;
}

const TitleInput: React.FC<Props> = ({
  classes,
  placeholder = '',
}) => (
  <Box display="flex" className={classes.root}>
    <InputBase
      className={classes.input}
      placeholder={placeholder}
    />
  </Box>
);

export default withStyles(styles)(TitleInput);
