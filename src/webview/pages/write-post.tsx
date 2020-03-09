import React from 'react';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import SubmitBar from '../componets/SummitBar';
import MarkdownEditor from '../componets/MarkdownEditor';
import { getSignedUrl } from '../lib/api/image';

const styles = createStyles({
  root: {
    justifyContent: 'space-between',
    height: '100%',
  },
});

type Props = WithStyles<typeof styles>;

const PageWritePost: React.FC<Props> = observer(({
  classes,
}) => {
  const onImageUpload = async (file: File): Promise<string> => {
    const filename = file.name;
    const kind = 'post';

    const res = await getSignedUrl({ filename, kind });
    await axios.put(res.data.uploadUri, file, {
      headers: {
        'Content-Type': file.type,
      },
    });

    //eslint-disable-next-line max-len
    return res.data.realUri;
  };

  return (
    <Box display="flex" className={classes.root} flexDirection="column" justifyContent="space-between">
      <MarkdownEditor onImageUpload={onImageUpload} />
      <SubmitBar />
    </Box>
  );
});

export default withStyles(styles)(PageWritePost);
