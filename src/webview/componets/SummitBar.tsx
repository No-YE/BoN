import React from 'react';
import {
  withStyles, WithStyles, createStyles, AppBar,
} from '@material-ui/core';
import CustomButton from './Button';

const styles = createStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 5,
    top: 'auto',
    bottom: 0,
    backgroundColor: '#FFFFFF',
  },
});

interface Props extends WithStyles<typeof styles> {}

const SubmitBar: React.FC<Props> = ({
  classes,
}) => (
  <AppBar className={classes.root}>
    <CustomButton text="취소" color="default" />
    <CustomButton text="작성 완료" color="primary" />
  </AppBar>
)

export default withStyles(styles)(SubmitBar);
