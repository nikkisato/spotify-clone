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
      spotify.getUserPlaylists().then(playlists => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists,
        });
      });

      spotify.getPlaylist('37i9dQZEVXcLlNtPlgWSDV').then(response => {
        dispatch({
          type: 'SET_DISCOVER_WEEKLY',
          discover_weekly: response,
        });
      });
    }
  }, []);

  return (
    <div className='app'>
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
