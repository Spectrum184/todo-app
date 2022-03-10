import { useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import ProjectTask from "./Project"
import '../styles/createPlan.css'


function Manager() {
    const initialPlan = {
        title: '',
        deadline: '',
        user: [],
        project: [],
        key: null,
    }
    const username = [
        {
            value:1,
            label:"Luong Van A"
        },
        {
            value: 2,
            label: "Luong Van B"
        },
        {
            value: 3,
            label: "Luong Van D"
        },
        {
            value: 4,
            label: "Luong Van E"
        },
    ];

    const [plan, setPlan] = useState(initialPlan);
    const [listPlan, setListPlan] = useState([]);
    const [selected,setSelected] = useState([]);
    const [addProject,setAddProject] = useState(false)

    useEffect(()=>{
        const listPlan = JSON.parse(localStorage.getItem("listPlan"))
        if(listPlan && listPlan.length>0){
            setListPlan(listPlan)
        }
    },[])
    
    const handleChange =(e) =>{
        
        const { name, value } = e.target;
        setPlan({ ...plan, [name]: value, user: selected})
        console.log(plan)
    }

    const handleToggle = () =>{
        setAddProject(!addProject)

    }

    return (
        <div className="project-manager">
            <h1 className='header-1'> beto todo App</h1>


            <h2 className='header-createPlan'>Create Plan</h2>
            <div className='container-form'>
                <div className='item'>
                    <h3>Title</h3>
                    <input
                        className="title-input-field"
                        type="text"
                        onChange={handleChange}
                        name="title"
                        placeholder='plan 1...'
                        value={plan.title}
                    />
                </div>

                <div className='item'>
                    <h3>Deadline</h3>
                    <input
                        className="deadline-input-field"
                        type="date"
                        onChange={handleChange}
                        name="deadline"
                        placeholder='30/04/2022'
                        value={plan.deadline}
                    />
                </div>

                <div className='item'>
                    <h3>employer</h3>
                    <MultiSelect
                    className="multiple-select"
                    placeholder="select options"
                    value={ selected} 
                    options={username}
                    onChange={setSelected}
                    />  
                </div>

                <div className='button'>

                    <button className="btn-commit" onClick={handleToggle}>
                        {addProject ?"Back":"add"}
                    </button>

                   

                </div>
                {addProject && (
                <div className="projectTask"><ProjectTask/>
                </div>)}

                <button className="btn-commit">
                    Create
                </button>
                <button className="btn-cancel" >
                    cancel
                </button>
            </div>

        </div>
    )


}

export default Manager