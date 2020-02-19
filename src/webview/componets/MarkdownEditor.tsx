import React from 'react';
import dynamic from 'next/dynamic';
import MarkdownIt from 'markdown-it';
import {
  withStyles, WithStyles, createStyles, Box,
} from '@material-ui/core';

const styles = createStyles({
  root: {
    padding: 20,
    width: '100%',
  },
});

interface Props extends WithStyles<typeof styles> {
  onImageUpload?: (file: File) => Promise<void>;
}

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false });
const mdParser = new MarkdownIt();

const MarkdownEditor: React.FC<Props> = ({
  classes,
  onImageUpload = async () => {},
}) => (
  <Box className={classes.root} display="flex" flex={15}>
    <MdEditor
      renderHTML={(text) => mdParser.render(text)}
      onImageUpload={onImageUpload}
      style={{ width: '100%', height: '100%' }}
    />
  </Box>
);

export default withStyles(styles)(MarkdownEditor);
