import { useEffect, useState } from 'react'
import '../styles/TodoListUser.css'

function ProjectTask() {
    const initialTask = {
        task: '',
        deadline: '',
        key: null
    }

    const [task, setTask] = useState(initialTask);
    const [listTask, setListTask] = useState([]);

    useEffect(() => {
        const listTask = JSON.parse(localStorage.getItem('listTask'))
        if (listTask && listTask.length > 0) {
            setListTask(listTask);
        }

    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value })
    }

    const handleSubmit = () => {
        if (!task.task || !task.deadline) {
            alert("vui long nhap task va deadline")
        } else
            if (task.key !== null) {
                const newListTask = [...listTask];
                newListTask[task.key] = task;
                newListTask[task.key].key = null;

                setListTask(newListTask);
                setTask(initialTask);
                localStorage.getItem('listTask', JSON.stringify(newListTask))

            } else {
                const newListTask = [...listTask];
                newListTask.push(task);

                setListTask(newListTask);
                setTask(initialTask);
                localStorage.setItem('listTask', JSON.stringify(newListTask))
            }
    }

    const handleDeleteTask = (id) => {
        const newListTask = [];
        for (let i = 0; i < listTask.length - 1; i++) {
            if (i !== id) {
                newListTask.push(listTask[i])
            }
        }
        setListTask(newListTask);
        localStorage.setItem('listTask', JSON.stringify(newListTask))
    }

    const handleSubmitReset = () => {
        const newListTask = [];
        setListTask(newListTask)
        localStorage.setItem('listTask', JSON.stringify(newListTask))
    }
    const handleEditTask = (value) => {
        setTask(value)
    }

    return (
        <div className='project'>
            <div className="folder-commit">
                <div className="addPlan">
                    <h4 className="task"> Task </h4>
                    <input
                        className="task-input-field"
                        type="text"
                        placeholder="add task..."
                        onChange={handleChange}
                        name="task"
                        value={task.task}
                    />
                </div>

                <div className="addDeadline">
                    <h4 className="date"> Deadline </h4>
                    <input
                        className="deadline-input-field"
                        type="date"
                        onChange={handleChange}
                        name="deadline"
                        value={task.deadline}
                    />
                </div>
                <button className="btn-commit" onClick={handleSubmit}>
                    commit
                </button>
                <button className='btn-Reset' onClick={handleSubmitReset}>
                    Reset
                </button>
                <button className='btn-cancel' >
                    cancel
                </button>
            </div>
            <div>

                {listTask.length > 0 ? (
                    <table className='main-table'>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Task</th>
                                <th>Deadline</th>
                                <th>edit</th>
                                <th>delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {listTask.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.task}</td>
                                        <td>{item.deadline}</td>
                                        <td><button className='btn-edit' onClick={() => handleEditTask({ ...item, key: index })}>
                                            edit
                                        </button>
                                        </td>
                                        <td><button className='btn-delete' onClick={handleDeleteTask}>
                                            delete
                                        </button>
                                        </td>
                                    </tr>

                            ))}

                        </tbody>
                    </table>
                ) : (
                    <h3 className='noListTask'>ban chua tao danh sach cong viec</h3>
                )}
            </div>

        </div >
    )
}

export default ProjectTask