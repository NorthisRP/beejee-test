const defaultState = "";

const GET_ERROR = "getError";

export const errorReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_ERROR:
      return action.payload ? action.payload : "";
    default:
      return state;
  }
};

export const getError = (payload) => ({
  type: GET_ERROR,
  payload,
});
