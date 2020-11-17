import React from 'react';
import {createUseStyles, ThemeProvider} from 'react-jss';
import theme from './styles/theme';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import globalStyles from "./styles/globalStyles";

const useStyles = createUseStyles(globalStyles);
export const GlobalStyleInjector = () => {
  useStyles();
  return null;
};

export const App = () => {
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  const refreshToken = () => {
    setToken(localStorage.getItem('token'));
  };
  return (
    <ThemeProvider theme={theme} >
      <GlobalStyleInjector />
      {
        token ? (
          <Dashboard onLogoutSuccess={refreshToken} />
        ) : (
          <Login onLoginSuccess={refreshToken} />
        )
      }
    </ThemeProvider>
  );
};

export default App;
