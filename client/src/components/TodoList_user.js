import { useEffect, useState } from 'react'
import '../styles/TodoListUser.css'

function TodoListUser() {
    const initialTodo = {
        todo: '',
        completed: false,
        key: null,
    }

    const [todo, setTodo] = useState(initialTodo);
    const [listTodo, setListTodo] = useState([]);

    useEffect(()=>{
        const listTodo = JSON.parse(localStorage.getItem('listTodo'))
        if(listTodo && listTodo.length>0){
            setListTodo(listTodo)
        }
    },[])

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setTodo({...todo,[name]:value})
    }

    const handleSubmit = () =>{
        if(!todo.todo){
            alert("dien noi dung cv vao")
        }
        else {
            const newListTodo = [...listTodo]
            newListTodo.push(todo)
            setListTodo(newListTodo)
            setTodo(initialTodo)
            localStorage.setItem('listTodo',JSON.stringify(newListTodo))
        }
    }

    const handleChangeCheckbox = (id)=>{
        const newListTodo =[...listTodo]
            if(!newListTodo[id]?.completed){
                newListTodo[id].completed =true;
    
            }else{
                newListTodo[id].completed = false;
            }

            setListTodo(newListTodo);
        localStorage.setItem('listTodo', JSON.stringify(newListTodo))
    }

    const handleSubmitReset = ()=>{
        const newListTodo=[];
        setListTodo(newListTodo)
        localStorage.setItem('listTodo', JSON.stringify(newListTodo))
    }

    return (
        <div className='todoListUser'>
            <h1>Beto todo App</h1>
            <div className='container'>
                <div className='form-addTodo'>
                    <input
                    className='input-field'
                    type='text'
                    name='todo'
                    onChange={handleChange}
                    value={todo.todo}
                    />
                    <button className='btn-add' onClick = {handleSubmit}>
                        add
                    </button>
                </div>
                <div className='header_container'>
                    <h2 className='h2'>Your's Todo List</h2>
                    <h3 className='h3'>title:di choi ngam hoa cung ban</h3>
                    <h3 className='h3'>deadline:30/09/2022</h3>
                </div>

                <div>
                    {listTodo.length > 0 && (
                        listTodo.map((item, index) => (
                            <div key={index}>
                                <div className='listItem' >
                                    <div className='item'>{index+1}</div>
                                    <div className='item'>{item.todo}</div>
                                    <div className='item'>
                                        <input 
                                        type='checkbox'
                                        checked = {item.completed}
                                        onChange = {()=>handleChangeCheckbox(index)}
                                        />
                                    </div>
                                </div>

                            </div>
                        ))
                    )}
                </div>
                <button className="btn-cancel" onClick={handleSubmitReset}>
                    reset
                </button>

            </div>
        </div>
    );

}

export default TodoListUser
