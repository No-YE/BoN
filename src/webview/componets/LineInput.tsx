import React from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const styles = createStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 5,
  },
  shortRoot: {
    width: 240,
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

const Copy: React.FC<Props> = ({
  classes,
  placeholder = '',
}) => {
  return (
    <div className={`${classes.root} ${classes.shortRoot}`}>
      <IconButton>
        <SearchIcon/>
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder={placeholder}
      />
    </div>
  );
};

export default withStyles(styles)(Copy);
