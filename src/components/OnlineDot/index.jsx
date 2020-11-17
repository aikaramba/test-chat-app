import React from 'react'
import { createUseStyles } from 'react-jss'
import classnames from 'classnames';

const useStyles = createUseStyles({
  dot: {
    borderRadius: 5,
    width: 10,
    height: 10,
  },
  onlineDot: {
    backgroundColor: 'green',
  },
  offlineDot: {
    backgroundColor: 'red',
  },
});

const OnlineDot = ({ isOnline }) => {
  const classes = useStyles();
  return (
    <div className={classnames([classes.dot, isOnline ? classes.onlineDot : classes.offlineDot])} />
  );
};

export default OnlineDot;
