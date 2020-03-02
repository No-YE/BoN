import React from 'react';
import {
  withStyles, WithStyles, createStyles, Button as MaterialButton, Typography,
} from '@material-ui/core';

const styles = createStyles({
  root: {
    margin: 5,
  },
});

interface Props extends WithStyles<typeof styles> {
  text: string;
  buttonOnClick?: () => void;
  variant?: 'contained' | 'outlined';
  color?: 'default' | 'inherit' | 'primary' | 'secondary';
}

const Button: React.FC<Props> = ({
  classes,
  text,
  buttonOnClick = (): void => {},
  variant = 'contained',
  color = 'primary',
}) => (
  <MaterialButton className={classes.root} variant={variant} color={color} onClick={buttonOnClick}>
    <Typography><b>{text}</b></Typography>
  </MaterialButton>
);

export default withStyles(styles)(Button);
