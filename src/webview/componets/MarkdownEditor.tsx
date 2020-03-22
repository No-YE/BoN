import React from 'react';
import dynamic from 'next/dynamic';
import MarkdownIt from 'markdown-it';
import {
  withStyles, WithStyles, createStyles, Box,
} from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import TitleInput from './TitleInput';
import TagInput from './TagInput';
import { useStore } from '../store';

const styles = createStyles({
  root: {
    padding: 20,
    width: '100%',
    height: '100vh',
  },
});

interface Props extends WithStyles<typeof styles> {
  onImageUpload?: (file: File) => Promise<string>;
  id?: number;
}

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false });
const mdParser = new MarkdownIt();

const MarkdownEditor: React.FC<Props> = observer<Props>(({
  classes,
  onImageUpload = async (): Promise<void> => {},
}) => {
  const store = useStore();

  if (!store.post) {
    return null;
  }

  const { post } = store;

  return (
    <Box className={classes.root} display="flex" flex={15} flexDirection="column">
      <TitleInput placeholder="제목" />
      <TagInput placeholder="카테고리" />
      <MdEditor
        value={post.content}
        renderHTML={(text): string => mdParser.render(text)}
        onChange={(content): void => post.setContent(content.text)}
        onImageUpload={onImageUpload}
        style={{ width: '100%', height: '100%' }}
      />
    </Box>
  );
});

export default withStyles(styles)(MarkdownEditor);
