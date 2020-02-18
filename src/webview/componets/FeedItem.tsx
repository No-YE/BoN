import React from 'react';
import {
  Typography, withStyles, WithStyles, createStyles, Box, Chip,
} from '@material-ui/core';
import Image from 'material-ui-image';
import { Category } from '../type/Category';

const styles = createStyles({
  root: {
    marginBottom: 40,
  },
  content: {
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: 14,
    minHeight: 60,
    marginBottom: 10,
  },
  image: {
    width: '30%',
    minWidth: 100,
    marginLeft: 10,
  },
  metadata: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 14,
  },
  chip: {
    padding: 5,
    marginRight: 10,
    marginBottom: 10,
  },
});

interface Props extends WithStyles<typeof styles> {
  id: string | number;
  title: string;
  summary: string;
  mainImageUri?: string;
  categories?: Array<Category>;
}

const FeedItem: React.FC<Props> = ({
  classes,
  id,
  title,
  summary,
  mainImageUri,
  categories = [],
}) => (
  <Box key={id} display="flex" flexDirection="column" className={classes.root}>
    <Box display="flex" flexDirection="row">
      <Box display="flex" flexDirection="column">
        <Typography variant="h6">{title}</Typography>
        <Typography className={classes.content}>{summary}</Typography>
        <Box>
          {categories.map((category) => (
            <Chip
              className={classes.chip}
              key={category.id}
              label={category.name}
              size="small"
              clickable
              color="primary"
            />
          ))}
        </Box>
      </Box>
      <Box className={classes.image}>
        {mainImageUri
          ? <Image src={mainImageUri} aspectRatio={4 / 3} />
          : null}
      </Box>
    </Box>
    <Box display="flex" flexDirection="row">
      <Typography className={classes.metadata}>2020.02.20.17:23</Typography>
    </Box>
  </Box>
);

export default withStyles(styles)(FeedItem);