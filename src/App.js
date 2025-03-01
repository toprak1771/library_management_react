import logo from "./logo.svg";
import "./App.css";
import UserComponent from "./components/UserComponent";
import BookComponent from "./components/BookComponent";
import { BrowserRouter, Route, Routes } from "react-router";
import BookDetail from "./components/BookDetail";
import UserDetail from "./components/UserDetail";
import { Provider } from "react-redux";
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<UserComponent />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/books" element={<BookComponent />} />
            <Route path="/books/:id" element={<BookDetail />} />
          </Routes>
        </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
