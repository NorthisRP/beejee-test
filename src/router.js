import { Route, Switch, Redirect } from "react-router-dom";
import TasksBrowser from "./components/TasksBrowser";
import AddTask from "./components/AddTask";
import Login from "./components/Login";
import Edit from "./components/Edit";
import { useSelector } from "react-redux";

export default function Router() {
  const token = useSelector((state) => state.authReducer);
  return (
    <Switch>
      <Route exact path="/" component={TasksBrowser} />
      <Route exact path="/add_task" component={AddTask} />
      {!!token.token ? (
        <Route exact path="/edit/:id" component={Edit} />
      ) : (
        <Route exact path="/login" component={Login} />
      )}
      <Redirect to="/" />
    </Switch>
  );
}
