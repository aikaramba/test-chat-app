import React from 'react'
import { createUseStyles } from 'react-jss'
import NameInput from "../../components/NameInput";
import Button from "../../components/Button";
import axios from 'axios';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: theme.colors[4],
  },
  dialog: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid black',
  },
  description: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    color: theme.textColors[0],
  },
  inputSection: {

  },
  text: {
    backgroundColor: theme.textColors[0],
  },
});

const useStyles = createUseStyles(styles);

const Login = ({ onLoginSuccess }) => {
  const classes = useStyles();
  const [name, setName] = React.useState('');

  const onLogin = async () => {
    try {
      const response = await axios.request({
        url: 'http://localhost:3001/login',
        method: 'POST',
        data: {
          name,
        },
      });
      localStorage.setItem('token', response?.data?.token);
      onLoginSuccess && onLoginSuccess();
    } catch(err) {

    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.dialog}>
        <div className={classes.description}>
          It seems like it's you first visit to this site.
          Please login by providing your name.
        </div>
        <div className={classes.inputSection}>
          <NameInput onChange={d => setName(d)} />
          <Button onClick={onLogin}>
            Login
          </Button>
        </div>
      </div>
    </div>
  )
};

export default Login;
