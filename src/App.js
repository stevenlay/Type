import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Game from './pages/Game';
import GameOver from './pages/GameOver';
import HighScores from './pages/HighScores';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { Container } from './styled/Container';
import Loader from './styled/Loader';
import { Main } from './styled/Main';
import GlobalStyle from './styled/Global';
import { useAuth0 } from '@auth0/auth0-react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styled/Themes';
import useTheme from './hooks/UseTheme';

function App() {
  const { isLoading } = useAuth0();
  const [theme, toggleTheme] = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  return (
    <Router>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle />
        <Main>
          {isLoading && (
            <Loader>
              <p>Loading...</p>
            </Loader>
          )}
          {!isLoading && (
            <Container>
              <Navbar toggleTheme={toggleTheme} />
              <Switch>
                <Route path='/game' component={Game} />
                <Route path='/highScores' component={HighScores} />
                <Route path='/gameOver' component={GameOver} />
                <Route path='/' component={Home} />
              </Switch>
            </Container>
          )}
        </Main>
      </ThemeProvider>
    </Router>
  );
}

export default App;
