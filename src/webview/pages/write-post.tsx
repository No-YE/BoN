import React from 'react';
import { observer } from 'mobx-react-lite';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { useStore } from '../store';
import CustomButton from '../componets/Button';

const styles = createStyles({});

type Props = WithStyles<typeof styles>;

const PageWritePost: React.FC<Props> = observer(() => (
    <CustomButton text="작성 완료" color="default" />
));

export default withStyles(styles)(PageWritePost);
