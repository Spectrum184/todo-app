import { useState } from "react";
import axios from "axios";
import "../styles/App.css";

function LoginForm() {
  const initialAccount = {
    username: "",
    password: "",
  };

  const [account, setAccount] = useState(initialAccount);
  const [listAccount, setListAccount] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
  };

  const handleSubmit = () => {
    if (!account.username || !account.password) {
      alert("vui long nhap username va password");
    } else {
      axios
        .post("http://localhost:5000/api/user/login", account)
        .then((resp) => {
          console.log(resp.data);
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    }
  };

  return (
    <div>
      <div className="register-form">
        <h1 className="header-1"> beto todo App</h1>
        <div className="container">
          <h2 className="header-2"> Login Account</h2>
          <div className="container-form">
            <div className="item">
              <h3>UserName</h3>
              <input
                className="input-field"
                type="text"
                onChange={handleChange}
                name="username"
                placeholder="beto-todo-app"
                value={account.username}
              />
            </div>
            {/* 
                        <div className='item'>
                            <h3>Role</h3>
                            <input
                                className="input-field"
                                type="text"
                                onChange={handleChange}
                                name="role"
                                placeholder='user or admin'
                                value={account.role}
                            />
                        </div> */}

            <div className="item">
              <h3>Password</h3>
              <input
                className="input-field"
                type="password"
                onChange={handleChange}
                name="password"
                placeholder="password"
                value={account.password}
              />
            </div>

            <div className="button">
              <button className="btn-commit" onClick={handleSubmit}>
                login
              </button>

              <button className="btn-login">register</button>
            </div>
          </div>

          <div>
            {listAccount.length > 0 &&
              listAccount.map((item, index) => (
                <ul key={index}>
                  <li>username:{item.username}</li>
                  <li>password:{item.password}</li>
                  <li>role:{item.role}</li>
                </ul>
              ))}
          </div>
          {/* <button className="btn-cancel" onClick={handleSubmitReset} >
                       reset
                    </button> */}
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
