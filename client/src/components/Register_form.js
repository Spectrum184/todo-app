import { useEffect, useState } from 'react';
import axios from 'axios'
import '../styles/App.css'

function RegisterForm() {
    const initialUserInfo = {
        username: '',
        password: '',
        role: 'User',
        firstName: '',
        lastName: '',
        email: '',
        telephoneNumber: '',
    }

    const [userInfo, setUserInfo] = useState(initialUserInfo);
    const [listUserInfo, setListUserInfo] = useState([]);

    // useEffect(() => {
    //     const listUserInfo = JSON.parse(localStorage.getItem('listUserInfo'))
    //     if (listUserInfo && listUserInfo.length > 0) {
    //         setListUserInfo(listUserInfo);
    //     }

    // }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value })
    }

    const handleBlur = () => {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (userInfo.email) {
            return regex.test(userInfo.email) ? userInfo.email : alert("truong nay phai la email")
        }

    }

    const handleSubmit = () => {
        console.log(userInfo)
        if (!userInfo.username || !userInfo.password || !userInfo.role || !userInfo.lastName || !userInfo.firstName || !userInfo.email || !userInfo.telephoneNumber) {
            alert("ban hay dien noi dung vao cac o input")
        }
        else {
            axios.post("http://localhost:5000/api/user", { ...userInfo })
                .then(resp => { console.log(resp.data) })
                .catch(function (error) {
                    
                    console.log(error.response.data);
                });
                setUserInfo(initialUserInfo)
        }
    }
    // const handleSubmitReset = () => {
    //     const newListUserInfo = [];
    //     setListUserInfo(newListUserInfo);
    //     localStorage.setItem('listUserInfo', JSON.stringify(newListUserInfo))
    // }

    return (
        <div>
            <div className='register-form'>
                <h1 className='header-1'> beto todo App</h1>
                <div className='container'>
                    <h2 className='header-2'>Create Account</h2>
                    <div className='container-form'>
                        <div className='item'>
                            <h3>UserName</h3>
                            <input
                                className="input-field"
                                type="text"
                                onChange={handleChange}
                                name="username"
                                placeholder='beto-todo-app'
                                value={userInfo.username}
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
                                value={userInfo.password}
                            />
                        </div>

                        <div className='item'>
                            <h3>Role</h3>
                            <select className='input-field'
                                name='role'
                                onChange={handleChange}
                                value={userInfo.role}
                            >
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>

                            </select>
                        </div>

                        <div className='item'>
                            <h3>FirstName</h3>
                            <input
                                className="input-field"
                                type="text"
                                onChange={handleChange}
                                name="firstName"
                                placeholder='firstName'
                                value={userInfo.firstName}
                            />
                        </div>

                        <div className='item'>
                            <h3>LastName</h3>
                            <input
                                className="input-field"
                                type="text"
                                onChange={handleChange}
                                name="lastName"
                                placeholder='lastName'
                                value={userInfo.lastName}
                            />
                        </div>

                        <div className='item'>
                            <h3>Email</h3>
                            <input
                                className="input-field"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="email"
                                placeholder='quocviettn@gmail.com'
                                value={userInfo.email}
                            />
                        </div>

                        <div className='item'>
                            <h3>Telephone</h3>
                            <input
                                className="input-field"
                                type="text"
                                onChange={handleChange}
                                name="telephoneNumber"
                                placeholder='telephone_Number'
                                value={userInfo.telephoneNumber}
                            />
                        </div>
                        <div className='button'>

                            <button className="btn-commit" onClick={handleSubmit}>
                                Register
                            </button>


                            <button className="btn-login" >
                                login
                            </button>

                            <button className="btn-cancel" >
                                cancel
                            </button>

                        </div>


                    </div>

                    <div>
                        {listUserInfo.length > 0 && (
                            listUserInfo.map((item, index) => (

                                <ul key={index}>
                                    <li>username:{item.username}</li>
                                    <li>password:{item.password}</li>
                                    <li>role:{item.role}</li>
                                    <li>firstName:{item.firstName}</li>
                                    <li>lastName:{item.lastName}</li>
                                    <li>fullName: {item.lastName} {item.firstName}</li>
                                    <li>email:{item.email}</li>
                                    <li>telephone_Number:{item.telephoneNumber}</li>
                                </ul>

                            ))
                        )

                        }
                        {/* <div>
                            <button className="btn-cancel" onClick={handleSubmitReset} >
                                reset
                            </button>

                        </div> */}
                    </div>

                </div>
            </div>
        </div>

    );

}

export default RegisterForm