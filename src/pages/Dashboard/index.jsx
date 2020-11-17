import React from 'react'
import { createUseStyles } from 'react-jss'
import FriendsList from "../../components/FriendsList";
import Chat from "../../components/Chat";
import Button from "../../components/Button";
import axios from "axios";

const styles = (theme) => ({
  root: {
    padding: 0,
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  friendsList: {
    maxWidth: '30%',
    flex: 1,
  },
  chat: {
    backgroundColor: theme.colors[4],
    border: '1px solid black',
    flex: 1,
  },
  logoutContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  notice: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    color: theme.textColors[0],
  },
});

const useStyles = createUseStyles(styles);

const Dashboard = ({ onLogoutSuccess }) => {
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const onLogout = () => {
    /** logout */
    localStorage.removeItem('token');
    window.location.reload();
  };
  const [friends, setFriends] = React.useState([]);
  const [selectedFriendId, setSelectedFriendId] = React.useState(null);
  const onSelectFriend = (id) => {
    setSelectedFriendId(id);
  };
  React.useEffect(async () => {
    try {
      const response = await axios.request({
        url: 'http://localhost:3001/users',
        method: 'GET',
        headers: {
          auth: localStorage.getItem('token'),
        },
      });

      setFriends(response.data.users);
    } catch(err) {
      if (err.response?.status === 401) {
        /** logout */
        localStorage.removeItem('token');
        window.location.reload();
      }
    }
  }, []);

  const selectedFriendInfo = friends.find(d => d.id === selectedFriendId);
  return (
    <div className={classes.root}>
      <div className={classes.friendsList}>
        <FriendsList onSelect={onSelectFriend} selectedId={selectedFriendId} list={friends} />
      </div>
      <div className={classes.chat}>
        <div className={classes.logoutContainer}><Button onClick={onLogout}>Logout</Button></div>
        {
          selectedFriendId !== null ? (
            <Chat key={selectedFriendId} friendInfo={selectedFriendInfo} />
          ) : <div className={classes.notice}>Please select a friend to chat with</div>
        }
      </div>
    </div>
  )
};

export default Dashboard;
