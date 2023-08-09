// reducers/userReducer.js
const SET_ID_USUARIO = 'SET_ID_USUARIO';

export const setIdUsuario = (idUsuario) => ({
  type: SET_ID_USUARIO,
  payload: idUsuario,
});

const initialState = {
  idUsuario: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ID_USUARIO:
      return {
        ...state,
        idUsuario: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
