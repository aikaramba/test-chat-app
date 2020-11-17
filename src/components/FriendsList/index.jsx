import React from 'react'
import { createUseStyles } from 'react-jss'
import classnames from 'classnames';
import OnlineDot from "../OnlineDot";

const useStyles = createUseStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  friend: {
    display: 'flex',
    flexDirection: 'row',
    userSelect: 'none',
    alignItems: 'center',
    cursor: 'pointer',
    backgroundColor: theme.colors[5],
    padding: 10,
    margin: 2,
    '&:hover': {
      filter: 'brightness(90%)',
    },
    '&:active': {
      filter: 'brightness(80%)',
    },
  },
  selectedFriend: {
    backgroundColor: theme.colors[1],
  },
  name: {
    marginLeft: 8,
  },
}));

const Friend = ({ isOnline, name, id, onSelect, selectedId }) => {
  const classes = useStyles();
  return (
    <div className={classnames(classes.friend, selectedId === id && classes.selectedFriend)} onClick={() => onSelect(id)}>
      <OnlineDot isOnline={isOnline} />
      <div className={classes.name}>{name}</div>
    </div>
  );
};

const FriendsList = ({ list, onSelect, selectedId }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {list.map((friendInfo) => <Friend onSelect={onSelect} selectedId={selectedId} {...friendInfo} />)}
    </div>
  );
};

export default FriendsList;
