import React from 'react'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames';

const styles = (theme) => ({
  messageSection: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  messageSectionSelf: {
    justifyContent: 'flex-end',
  },
  messageBox: {
    padding: '8px 15px',
    color: theme.textColors[0],
    backgroundColor: 'grey',
    borderRadius: 5,
  },
  messageBoxSelf: {
    backgroundColor: 'blue'
  },
});

const useStyles = createUseStyles(styles);

const Message = ({ text, isSelf }) => {
  const classes = useStyles();
  return (
    <div className={classNames(classes.messageSection, isSelf && classes.messageSectionSelf)}>
      <div className={classNames(classes.messageBox, isSelf && classes.messageBoxSelf)}>
        {text}
      </div>
    </div>
  )
};

export default Message;
