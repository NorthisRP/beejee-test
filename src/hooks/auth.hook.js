import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { saveToken } from "./../store/authReducer";

const storageName = "taskData";
export const useAuth = () => {
  const dispatch = useDispatch();

  const login = useCallback(
    (jwtToken) => {
      localStorage.setItem(storageName, JSON.stringify({ token: jwtToken }));
      dispatch(saveToken(jwtToken));
    },
    [dispatch]
  );

  const getToken = useCallback(() => {
    return JSON.parse(localStorage.getItem("taskData"))?.token;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(storageName);
    dispatch(saveToken(""));
  }, [dispatch]);

  return { login, logout, getToken };
};
