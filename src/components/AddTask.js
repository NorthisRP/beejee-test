import React, { useEffect } from "react";
import { TextField, Snackbar } from "@material-ui/core";
import Button from "@mui/material/Button";
import { Card, CardContent, CardHeader, CardActions } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useInput } from "./../hooks/input.hook";
import { asyncAddTask } from "./../store/taskReducer";
import { useDispatch, useSelector } from "react-redux";
import { getError } from "../store/errorReducer";
import "../styles/form.scss";

const validateEmail = (email) => {
  const re = /.+@.+\..+/;
  return !re.test(email);
};

export default function AddTask() {
  const dispatch = useDispatch();
  const email = useInput("");
  const username = useInput("");
  const text = useInput("");
  let error = useSelector((state) => state.errorReducer);

  useEffect(() => {
    email.setError(validateEmail(email.value));
  }, [email]);

  const handleClose = () => {
    dispatch(getError(""));
  };

  const addHandler = () => {
    if (!email.value || !username.value || !text.value) {
      return dispatch(getError("Поля должны быть заполнены!"));
    } else if (email.error) {
      return dispatch(getError("Неправильный формат email!"));
    }
    dispatch(
      asyncAddTask({
        email: email.value,
        username: username.value,
        text: text.value,
      })
    );
    dispatch(getError("No errors"));
  };

  return (
    <Card>
      <CardHeader title="Add a task"></CardHeader>
      <CardContent>
        <TextField
          error={email.error}
          variant="outlined"
          label="Email"
          {...email.bind}
        />
        <TextField variant="outlined" label="Username" {...username.bind} />
        <TextField variant="outlined" label="Text" {...text.bind} />
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button color="success" onClick={addHandler} variant="contained">
          Add task
        </Button>
      </CardActions>
      <Snackbar open={!!error} autoHideDuration={1400} onClose={handleClose}>
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={error === "No errors"}
        autoHideDuration={1400}
        onClose={handleClose}
      >
        <Alert variant="filled" severity="success">
          Task added successfully!
        </Alert>
      </Snackbar>
    </Card>
  );
}
