import React from 'react';
import { observer } from 'mobx-react-lite';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import SubmitBar from '../componets/SummitBar';
import MarkdownEditor from '../componets/MarkdownEditor';
import { Box } from '@material-ui/core';
import LineInput from '../componets/LineInput';

const styles = createStyles({
  root: {
    justifyContent: "space-between",
    height: '100%',
  },
});

type Props = WithStyles<typeof styles>;

const PageWritePost: React.FC<Props> = observer(({
  classes,
}) => (
  <Box display="flex" className={classes.root} flexDirection="column" justifyContent="space-between">
    <MarkdownEditor />
    <SubmitBar />
  </Box>
));

export default withStyles(styles)(PageWritePost);
