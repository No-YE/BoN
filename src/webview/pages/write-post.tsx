import React from 'react';
import { observer } from 'mobx-react-lite';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import SubmitBar from '../componets/SummitBar';
import MarkdownEditor from '../componets/MarkdownEditor';
import { Box } from '@material-ui/core';

const styles = createStyles({});

type Props = WithStyles<typeof styles>;

const PageWritePost: React.FC<Props> = observer(({
  classes,
}) => (
  <Box display="flex" flex={1}>
    <MarkdownEditor />
    <SubmitBar />
  </Box>
));

export default withStyles(styles)(PageWritePost);
