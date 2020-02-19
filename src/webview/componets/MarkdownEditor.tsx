import React from 'react';
import dynamic from 'next/dynamic';
import MarkdownIt from 'markdown-it';
import {
  withStyles, WithStyles, createStyles, Box,
} from '@material-ui/core';

const styles = createStyles({
  root: {
    position: 'absolute',
    padding: 20,
    top: 0,
    bottom: 60,
    left: 0,
    right: 0,
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
  <Box className={classes.root}>
    <MdEditor
      renderHTML={(text) => mdParser.render(text)}
      onImageUpload={onImageUpload}
    />
  </Box>
);

export default withStyles(styles)(MarkdownEditor);
