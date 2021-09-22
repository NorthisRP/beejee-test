import React, { useState } from "react";
import { TextField, Checkbox, FormControlLabel } from "@material-ui/core";
import { Card, CardContent, CardHeader, CardActions } from "@mui/material";
import Button from "@mui/material/Button";
import { useInput } from "./../hooks/input.hook";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { url } from "./../saga/config";
import { useSelector } from "react-redux";
import { useAuth } from "./../hooks/auth.hook";
import "../styles/form.scss";

export default function Edit(props) {
  const text = useInput("");
  const [check, setCheck] = useState(false);
  const auth = useAuth();
  const token = useSelector((state) => state.authReducer);
  const history = useHistory();
  let status = 0;

  const editHandler = () => {
    const storage = auth.getToken();
    const form = new FormData();
    if (text.value && check) status += 3;
    else if (check && !text.value) status += 2;
    else if (!check && text.value) status += 1;
    form.append("token", token?.token);
    form.append("text", text.value);
    form.append("status", status.toString(2));
    if (token && storage)
      axios.post(url + `/edit/${props.match.params.id}?developer=Roman`, form);
    else auth.logout();
    history.push("/");
  };

  return (
    <Card>
      <CardHeader title={`Edit №${props.match.params.id} task`}></CardHeader>
      <CardContent>
        <TextField variant="outlined" label="Text" {...text.bind} />
        <FormControlLabel
          label="Task done"
          control={<Checkbox onChange={(e) => setCheck(e.target.checked)} />}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button color="success" onClick={editHandler} variant="contained">
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}
