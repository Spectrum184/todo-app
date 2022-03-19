import RegisterForm from "components/Register_form";
import LoginForm from "components/Login_form";
import TodoListUser from "components/TodoList_user";
import ProjectTask from "components/Project";
import Manager from "components/TodoListAdmin"

function App() {
  return (
    <div className="App">
      <header className="">
        <RegisterForm/>
        {/* <LoginForm />
        <TodoListUser/>
        <ProjectTask/>
        <Manager/> */}
      </header>
    </div>
  );
}

export default App;
