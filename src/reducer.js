export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  //token: null,
  //remove after finishing developing and change it to null
};

const reducer = (state, action) => {
  console.log('ACTION', action);

  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token,
      };
    case 'SET_PLAYLISTS':
      return {
        ...state,
        playlists: action.playlists,
      };
    default:
      return state;
  }
};

export default reducer;
