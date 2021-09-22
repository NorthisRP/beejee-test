import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveToken } from "./../store/authReducer";
import { useAuth } from "./../hooks/auth.hook";
import "../styles/header.scss";

export default function Header() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer);
  const auth = useAuth();

  useEffect(() => {
    dispatch(saveToken(token));
  }, [dispatch, token]);

  return (
    <div className="header">
      <div>
        <Link className="header-link" to="/">
          Task List
        </Link>
        <Link className="header-link" to="/add_task">
          Add Task
        </Link>
      </div>
      <div>
        {token.token ? (
          <Link className="header-link" onClick={() => auth.logout()}>
            Logout
          </Link>
        ) : (
          <Link className="header-link" to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
