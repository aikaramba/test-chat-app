import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  root: {
    borderRadius: 5,
    border: 0,
    height: 30,
    margin: 10,
  },
});

const NameInput = ({ onChange }) => {
  const classes = useStyles();
  return (
    <input className={classes.root} onChange={e => onChange && onChange(e?.target?.value)} />
  )
};

export default NameInput;
