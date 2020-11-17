import React from 'react'
import { createUseStyles } from 'react-jss'
import OnlineDot from "../../OnlineDot";

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors[5],
    height: 40,
  },
  name: {
    marginLeft: 8,
    color: theme.textColors[1],
  },
});

const useStyles = createUseStyles(styles);

const Title = ({ name, isOnline }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <OnlineDot isOnline={isOnline} />
      <div className={classes.name}>{name}</div>
    </div>
  )
};

export default Title;
