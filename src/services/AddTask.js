import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function AddUser() {
    let navigate=useNavigate()
    const [task,setTask]=useState("")
    const {id}=useParams();
    const [anyAll,setanyAll]=useState(false)
    const [position,setPosition]=useState(false)
    const [role, setRole] = useState("");
    const [val, setVal]=useState("");
    var bodyFormData = new FormData();

    if(role==='Role'){
        bodyFormData.append('description', task);
        bodyFormData.append('role',val);
        bodyFormData.append('anyAll',anyAll);
        bodyFormData.append('position',position);
        var url = (`http://localhost:9191/task/addTaskUsingRole/${id}`)
    }
    else{
        bodyFormData.append('description', task);
        bodyFormData.append('userId',val);
        bodyFormData.append('anyAll',anyAll);
        bodyFormData.append('position',position);
        var url = (`http://localhost:9191/task/addTaskUsingUser/${id}`)
    }

    const test=async(e)=>{
        alert("yes!")
    }

    const onSubmit=async(e)=>{
        axios({
            method: "post",
            url: url,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
          .catch(error => {
            alert(error);
            console.log(error)
            //navigate(`/`);
            
        });
        navigate(`/viewtask/${id}`);
        navigate(0);
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Add Task</h2>
                    <form onSubmit={(e)=>onSubmit(e)}>
                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'>
                            Description
                        </label>
                        <input
                            type={"text"}
                            className="form-control"
                            placeholder='Enter Task Name'
                            name="wf_name"
                            //value="wf_name"
                            onChange={(e)=>setTask(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'>
                        Select Task for Any or All :
                        </label>
                        <div><input type='radio' name="anyAll" value="any" on onChange={(e)=>{setanyAll(false);document.getElementById('role').disabled = false;document.getElementById('role1').disabled = false}}/> Any  </div>
                        <div><input type='radio' name="anyAll" value="all" on onChange={(e)=>{alert("If you choose 'All', you can't choose 'task used by'.");setanyAll(true);document.getElementById('role').disabled = true;document.getElementById('role1').disabled = true}}/> 
                        All</div>
                    </div>

                    <div className='mb-3'>
                    <label htmlFor='Name' className='form-label'>
                        Select if it is a First/Final/Middle task: 
                    </label>
                        <div><input type='radio' name="position" value="position" on onChange={(e)=>{setPosition("first");document.getElementById('role').disabled = false;document.getElementById('role1').checked = false}}/> First task  </div>
                        <div><input type='radio' name="position" value="position" on onChange={(e)=>{setPosition("final");document.getElementById('role').disabled = true;document.getElementById('role1').checked = true;setRole("Role")}}/> Final task  </div>
                        <div><input type='radio' name="position" value="position" on onChange={(e)=>{setPosition("");document.getElementById('role').disabled = false; document.getElementById('role1').checked = false}}/> Middle task</div>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'>
                        Select 'Task used by': 
                        </label>
                        <div><input type='radio' name="role" id="role" value="ID" on onChange={e=>setRole(e.target.value)}/> Used By User ID  </div>
                        <div><input type='radio' name="role" id="role1" value="Role" on onChange={e=>setRole(e.target.value)}/> Use By Role</div>
                    </div>
                    Enter {role}
                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'> 
                        </label>
                        <input
                            type={"text"}
                            className="form-control"
                            placeholder=''
                            name="comp_name"
                            //value="comp_name"
                            onChange={(e)=>setVal(e.target.value)}
                            //required
                        />
                    </div>

                    <button type='submit'  className='btn btn-outline-primary'>Submit</button>
                    <Link className='btn btn-outline-danger mx-2' to={`/viewtask/${id}`}>Cancel</Link>
                    </form>
                </div>

            </div>
            <div className="footer">
                <p>Made with ❤️ and 🧑‍💻 by <i>Workflow data model team</i></p>
            </div>
        </div>
    );
}
