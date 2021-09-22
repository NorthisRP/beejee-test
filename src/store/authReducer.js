const token = JSON.parse(localStorage.getItem("taskData"))?.token;

const defaultState = token ? token : "";

const GET_TOKEN = "getToken";
export const FETCH_TOKEN = "fetchToken";

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_TOKEN:
      return action.payload;
    default:
      return state;
  }
};

export const saveToken = (payload) => ({
  type: GET_TOKEN,
  payload,
});
export const fetchToken = (payload) => ({ type: FETCH_TOKEN, payload });
