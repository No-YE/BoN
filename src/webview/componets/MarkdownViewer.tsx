/*eslint-disable react/no-danger*/
import React from 'react';
import hljs from 'highlight.js';
import markdownIt from 'markdown-it';
import reactHtmlParser from 'react-html-parser';
import {
  withStyles, WithStyles, createStyles, Box,
} from '@material-ui/core';
import '../styles/markdown.css';

const styles = createStyles({
  root: {
    width: '100%',
    maxWidth: 900,
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
    wordBreak: 'break-all',
    paddingLeft: 25,
    paddingRight: 25,
    marginBottom: 20,
    fontSize: 19,
    color: 'rgb(52, 58, 64)',
    fontWeight: 400,
    lineHeight: 1.9,
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
      {reactHtmlParser(md.render(content))}
    </Box>
  );
};

export default withStyles(styles)(MarkdownViewer);
