import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import Register from "pages/Register";
import Login from "pages/Login";
import TodoListUser from "components/TodoListUser";
import Project from "components/Project";
import TodoListAdmin from "components/TodoListAdmin";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/admin/todo-list-admin"
          element={<TodoListAdmin />}
        ></Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
