import React from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { InputBase, Box, Chip } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';

const styles = createStyles({
  root: {
    overflowX: 'auto',
    overflowY: 'hidden',
  },
  input: {
    padding: 10,
    minWidth: 100,
  },
  chip: {
    padding: 5,
    marginRight: 10,
  },
});

interface Props extends WithStyles<typeof styles> {
  placeholder?: string;
}

const TagInput: React.FC<Props> = observer<Props>(({
  classes,
  placeholder = '',
}) => {
  const store = useStore();
  const [categoryInput, setCategoryInput] = React.useState<string>('');

  if (!store.tag) {
    return null;
  }

  const { tag } = store;

  const chipOnClick = (tagName: string): void => {
    tag.removeOne(tagName);
  };

  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Backspace' && categoryInput === '') {
      tag.removeLast();
      return;
    }

    if (e.key === 'Enter' && categoryInput.trim() !== '') {
      tag.add(categoryInput.trim());
      setCategoryInput('');
    }
  };

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCategoryInput(e.target.value);
  };

  return (
    <Box display="flex" className={classes.root} flexDirection="row" alignItems="center">
      {tag.items.map((item) => (
        <Chip
          className={classes.chip}
          key={item}
          label={item}
          size="small"
          clickable
          color="primary"
          onClick={(): void => chipOnClick(item)}
        />
      ))}
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        onKeyDown={inputOnKeyDown}
        onChange={inputOnChange}
        value={categoryInput}
      />
    </Box>
  );
});

export default withStyles(styles)(TagInput);
