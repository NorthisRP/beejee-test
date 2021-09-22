import React from "react";
import { TextField, Snackbar } from "@material-ui/core";
import Button from "@mui/material/Button";
import { Card, CardContent, CardHeader, CardActions } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useInput } from "./../hooks/input.hook";
import { fetchToken } from "../store/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { getError } from "../store/errorReducer";
import "../styles/form.scss";

export default function AddTask() {
  const username = useInput("");
  const password = useInput("");
  const dispatch = useDispatch();
  let error = useSelector((state) => state.errorReducer);

  const handleClose = () => {
    dispatch(getError(""));
  };

  const loginHandler = () => {
    if (!username.value || !password.value) {
      return dispatch(getError("Поля обязательны для заполнения!"));
    }
    dispatch(fetchToken({ login: username.value, password: password.value }));
  };

  return (
    <Card>
      <CardHeader title="Login"></CardHeader>
      <CardContent>
        <TextField variant="outlined" label="Login" {...username.bind} />
        <TextField variant="outlined" label="Password" {...password.bind} />
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button color="success" onClick={loginHandler} variant="contained">
          Login
        </Button>
      </CardActions>
      <Snackbar open={!!error} autoHideDuration={1400} onClose={handleClose}>
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Card>
  );
}
