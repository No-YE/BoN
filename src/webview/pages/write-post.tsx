import React from 'react';
import { observer } from 'mobx-react-lite';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import SubmitBar from '../componets/SummitBar';

const styles = createStyles({});

type Props = WithStyles<typeof styles>;

const PageWritePost: React.FC<Props> = observer(() => (
  <SubmitBar />
));

export default withStyles(styles)(PageWritePost);
