import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  root: {
    borderRadius: 5,
    border: 0,
    height: 30,
    fontSize: 14,
    margin: 10,
    flex: 1,
  },
});

const UserTextInput = ({ onChange, value }) => {
  const classes = useStyles();
  return (
    <input className={classes.root} value={value} onChange={e => onChange && onChange(e?.target?.value)} />
  )
};

export default UserTextInput;
