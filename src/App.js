import { Provider } from "react-redux";
import { store } from "./store/index";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Router from "./router";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Router />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
