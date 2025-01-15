import logo from "./logo.svg";
import "./App.css";
import UserComponent from "./components/UserComponent";
import BookComponent from "./components/BookComponent";
import { BrowserRouter, Route, Routes } from "react-router";
import BookDetail from "./components/BookDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserComponent />} />
          <Route path="/books" element={<BookComponent />} />
          <Route path="/books/:id" element={<BookDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
