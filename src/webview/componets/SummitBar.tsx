import React from 'react';
import {
  withStyles, WithStyles, createStyles, AppBar, Box,
} from '@material-ui/core';
import CustomButton from './Button';

const styles = createStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 5,
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 1px 10px 0px rgba(0,0,0,0.2)'
  },
});

interface Props extends WithStyles<typeof styles> {}

const SubmitBar: React.FC<Props> = ({
  classes,
}) => (
  <Box display="flex" flex={1} className={classes.root} borderTop={1} borderColor="grey.300">
    <CustomButton text="취소" color="default" />
    <CustomButton text="작성 완료" color="primary" />
  </Box>
)

export default withStyles(styles)(SubmitBar);
