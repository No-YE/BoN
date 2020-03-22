import React from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { InputBase, Box } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';

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

const TitleInput: React.FC<Props> = observer<Props>(({
  classes,
  placeholder = '',
}) => {
  const store = useStore();

  if (!store.post) {
    return null;
  }

  const { post } = store;

  return (
    <Box display="flex" className={classes.root}>
      <InputBase
        className={classes.input}
        value={post.title}
        placeholder={placeholder}
        onChange={(e): void => post.setTitle(e.target.value)}
      />
    </Box>
  );
});

export default withStyles(styles)(TitleInput);
