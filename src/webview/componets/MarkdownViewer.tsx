/*eslint-disable react/no-danger*/
import React from 'react';
import hljs from 'highlight.js';
import markdownIt from 'markdown-it';
import reactHtmlParser from 'react-html-parser';
import {
  withStyles, WithStyles, createStyles, Box, Typography,
} from '@material-ui/core';

const styles = createStyles({
  root: {
    width: '100%',
    maxWidth: 900,
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
    wordBreak: 'break-all',
    paddingLeft: 20,
    paddingRight: 20,
  },
  content: {
    fontSize: 19,
    color: 'rgba(0, 0, 0, 0.8)',
    fontWeight: 100,
  },
});

interface Props extends WithStyles<typeof styles> {
  content: string;
}

const MarkdownViewer: React.FC<Props> = ({
  classes,
  content,
}) => {
  const md: markdownIt = markdownIt({
    highlight(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (err) {
          console.log(err);
        }
      }

      return '';
    },
  });

  return (
    <Box className={`${classes.root} post`} display="flex" flexDirection="column">
      <Typography className={classes.content}>{reactHtmlParser(md.render(content))}</Typography>
    </Box>
  );
};

export default withStyles(styles)(MarkdownViewer);
