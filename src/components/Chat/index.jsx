import React from 'react'
import { createUseStyles } from 'react-jss'
import Message from "./Message";
import Title from './Title';
import UserTextInput from "../UserTextInput";
import Button from "../Button";
import axios from "axios";

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch',
  },
  bottomPanel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messagesContainer: {
    overflow: 'scroll',
  },
});

const Chat = ({ friendInfo }) => {
  const [messages, setMessages] = React.useState([]);

  const [userInputText, setUserInputText] = React.useState('');

  const refreshData = async () => {
    try {
      const response = await axios.request({
        url: `http://localhost:3001/messages?user_id=${friendInfo.id}`,
        method: 'GET',
        headers: {
          auth: localStorage.getItem('token'),
        },
      });
      setMessages(response.data.messages);
    } catch(err) {
      if (err.response?.status === 401) {
        /** logout */
        localStorage.removeItem('token');
        window.location.reload();
      }
    }
  };

  const onSend = async () => {
    if (userInputText) {
      try {
        await axios.request({
          url: 'http://localhost:3001/send',
          method: 'POST',
          headers: {
            auth: localStorage.getItem('token'),
          },
          data: {
            text: userInputText,
            to: friendInfo.id,
          },
        });
        setUserInputText('');
        refreshData();
      } catch(err) {
        if (err.response?.status === 401) {
          /** logout */
          localStorage.removeItem('token');
          window.location.reload();
        }
      }
    }
  };
  const classes = useStyles();

  React.useEffect(() => {
    refreshData();
  }, []);
  return (
    <div className={classes.root}>
      <Title name={friendInfo.name} isOnline={friendInfo.isOnline} />
      <div className={classes.messagesContainer}>
        {messages.map((messageData) => <Message {...messageData} />)}
      </div>
      <div className={classes.bottomPanel}>
        <UserTextInput value={userInputText} onChange={(d) => setUserInputText(d)} />
        <Button onClick={onSend}>
          Send
        </Button>
      </div>
    </div>
  )
};

export default Chat;
