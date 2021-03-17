import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './Component/Login/Login';
import Footer from './Component/Footer/Footer';
import Player from './Component/Player/Player';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import { useStateValue } from './StateProvider';
const spotify = new SpotifyWebApi();
function App() {
  const [{ user, token }, dispatch] = useStateValue();

  useEffect(() => {
    //Gets the token from the url
    const hash = getTokenFromUrl();
    //for security reasons deletes it from the console
    window.location.hash = '';
    const _token = hash.access_token;

    if (_token) {
      dispatch({
        type: 'SET_TOKEN',
        token: _token,
      });

      spotify.setAccessToken(_token);
      spotify.getMe().then(user => {
        dispatch({
          type: 'SET_USER',
          user: user,
        });
      });
    }
  }, []);

  return (
    <div className='app'>
      {token ? <Player /> : <Login />}
      {/*<Login />*/}
      <Footer />
    </div>
  );
}

export default App;