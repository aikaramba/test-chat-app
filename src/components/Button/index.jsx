import React from 'react'
import { createUseStyles } from 'react-jss'

const styles = (theme) => ({
  root: {
    borderRadius: 5,
    backgroundColor: theme.colors[0],
    border: 0,
    height: 30,
  },
  text: {
    color: theme.textColors[0],
  },
});

const useStyles = createUseStyles(styles);

const Button = ({ onClick, children }) => {
  const classes = useStyles();
  return (
    <button onClick={onClick} className={classes.root}>
      <div className={classes.text}>
        {children}
      </div>
    </button>
  )
};

export default Button;
