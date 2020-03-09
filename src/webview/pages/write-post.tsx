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

    const uriRes = await getSignedUrl({ filename, kind });
    console.log(uriRes.data);
    await axios.put(uriRes.data.uri, file, {
      headers: {
        'Content-Type': file.type,
      },
    });

    //eslint-disable-next-line max-len
    return 'https://blog-of-noye.s3.ap-northeast-2.amazonaws.com/image/post/1/Mon+Mar+09+2020+11%3A52%3A26+GMT%2B0900+(Korean+Standard+Time)-abc';
  };

  return (
    <Box display="flex" className={classes.root} flexDirection="column" justifyContent="space-between">
      <MarkdownEditor onImageUpload={onImageUpload} />
      <SubmitBar />
    </Box>
  );
});

export default withStyles(styles)(PageWritePost);
