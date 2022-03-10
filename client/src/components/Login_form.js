import { useEffect, useState } from 'react'
import '../styles/App.css'

function LoginForm() {
    const initialAccount = {
        username: '',
        password: '',
        role:'',
        key: null
    }

    const [account, setAccount] = useState(initialAccount);
    const [listAccount, setListAccount] = useState([]);

    useEffect(() => {
        const listAccount = JSON.parse(localStorage.getItem('listAccount'))
        if (listAccount && listAccount.length > 0) {
            setListAccount(listAccount);
        }

    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccount({ ...account, [name]: value })
    }

    const handleSubmit = () => {
        if (!account.username || !account.password) {
            alert("vui long nhap username va password")
        }
        else {
            const newListAccount = [...listAccount];
            newListAccount.push(account);
            setListAccount(newListAccount);
            console.log(newListAccount)
            setAccount(initialAccount);
            localStorage.setItem('listAccount', JSON.stringify(newListAccount))
        }
    }

    const handleSubmitReset = ()=>{
        const newListAccount =[];
        setListAccount(newListAccount)
        localStorage.setItem('listAccount', JSON.stringify(newListAccount))
    }

    return (
        <div>
            <div className='register-form'>
                <h1 className='header-1'> beto todo App</h1>
                <div className='container'>
                    <h2 className='header-2'> Login Account</h2>
                    <div className='container-form'>
                        <div className='item'>
                            <h3>UserName</h3>
                            <input
                                className="input-field"
                                type="text"
                                onChange={handleChange}
                                name="username"
                                placeholder='beto-todo-app'
                                value={account.username}
                            />
                        </div>

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
                        </div>

                        <div className='item'>
                            <h3>Password</h3>
                            <input
                                className="input-field"
                                type="password"
                                onChange={handleChange}
                                name="password"
                                placeholder='password'
                                value={account.password}
                            />
                        </div>

                        <div className='button'>

                            <button className="btn-commit" onClick={handleSubmit}>
                                login
                            </button>

                            <button className="btn-login" >
                               register
                            </button>

                            <button className="btn-cancel" >
                                cancel
                            </button>

                        </div>


                    </div>

                    <div>
                        {listAccount.length > 0 && (
                            listAccount.map((item, index) => (

                                <ul key={index}>
                                    <li>username:{item.username}</li>
                                    <li>password:{item.password}</li>
                                    <li>role:{item.role}</li>
                                   
                                </ul>
                                

                            ))
                        )

                        }
                    </div>
                    <button className="btn-cancel" onClick={handleSubmitReset} >
                       reset
                    </button>

                </div>
            </div>
        </div>

    );

}

export default LoginForm