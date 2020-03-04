import React from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 5,
    height: 40,
  },
  shortRoot: {
    width: '50%',
    maxWidth: 240,
  },
  longRoot: {
  },
  input: {
    padding: 0,
  },
});

interface Props extends WithStyles<typeof styles> {
  placeholder?: string;
}

const LineInput: React.FC<Props> = ({
  classes,
  placeholder = '',
}) => (
  <div className={`${classes.root} ${classes.shortRoot}`}>
    <IconButton>
      <SearchIcon />
    </IconButton>
    <InputBase
      className={classes.input}
      placeholder={placeholder}
    />
  </div>
);

export default withStyles(styles)(LineInput);
