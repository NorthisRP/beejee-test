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

  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem(storageName));
  //   if (data && data.token) {
  //     login(data.token);
  //   }
  // }, [login]);

  return { login, logout, getToken };
};
