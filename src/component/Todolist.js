import React, { useState,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import './Todo.css';


export default function Todolist() {
    const[iscomplete,setiscomplete] = useState(false);
    const[title,settitle] = useState("");
    const[description,setdescription]=useState("");
    const [todolist,settodolist]=useState([]); 
    let[completedlist,setcompletedlist] = useState([]);

    useEffect(()=>{
        let saveddata = JSON.parse(localStorage.getItem("todolist"));  
        let savedcompleted = JSON.parse(localStorage.getItem("completedlist"));
        if(saveddata){
            settodolist(saveddata);
        } 
        if(completedlist)
        {
            setcompletedlist(savedcompleted);
        }
    },[]);
  
    
    const HandleAdd=(e)=>{

        const todoobj = {
            title : title,
            description : description
        };
        const updatedarr = [...todolist];
        updatedarr.push(todoobj);
        settodolist(updatedarr);
        console.log(updatedarr);
        localStorage.setItem("todolist",JSON.stringify(updatedarr));

        settitle('');
        setdescription('');
    };

    const HandleDelete= index =>
    {
        let reducedarr = [...todolist];
        reducedarr.splice(index,1);
        settodolist(reducedarr);
        localStorage.setItem("todolist",JSON.stringify(reducedarr));
       
       
    };

    const HandleComplete = index =>{
        let date = new Date();
        let dd = date.getDate();
        let mm = date.getMonth();
        let yyyy=date.getFullYear();
        let hh = date.getHours();
        let mi = date.getMinutes();
        let second = date.getSeconds();
        var finalDate =  dd + '-' + mm + '-' + yyyy + ' at ' + hh + ":" + mi + ":" + second;
        console.log(finalDate);

        const filteredtodo = {
            ...todolist[index],
            date : finalDate,
        };

        console.log(completedlist);
        if(!completedlist){
            completedlist = [];
        }
        let updatedcomplete = [...completedlist];
        updatedcomplete.push(filteredtodo);
        setcompletedlist(updatedcomplete);
        localStorage.setItem('completedlist',JSON.stringify(updatedcomplete));
        // let completedarr = [...todolist];
        // let completedtodo = completedarr.splice(index,1);
        // setcompletedlist(completedtodo);
        // localStorage.setItem("completedlist",JSON.stringify(completedtodo));
        HandleDelete(index);



    }

    const HandleCompleteDelete = index =>{
        const reducedcompletelist = [...completedlist];
        reducedcompletelist.splice(index,1);
        localStorage.setItem('completedlist',reducedcompletelist);
        setcompletedlist(reducedcompletelist);
    }

    return (
        <div className='App'>
            <h1>My Todos</h1>
            <div className='todo-wrapper'>
                <div className='todo-input-box'>
                    <div className='todo-input-field'>
                        <label>Title:</label>
                        <input type='text' value={title} size="sm" className="mb-3" onChange={(e)=>settitle(e.target.value)} placeholder="What is the title of To-do?"></input>
                    </div>
                    <div className='todo-input-field'>
                        <label>Description:</label>
                        <input type='text' size="sm"  value={description} className="mb-3" onChange={(e)=>setdescription(e.target.value)} placeholder="What is the description of To-do?"></input>
                    </div>
                    <div className='btn-add todo-input-field'>
                        <Button type="submit" variant="success" onClick={HandleAdd}>Add</Button>{' '}
                    </div>
                </div>
                <div className='Todo-area'>
                <div className='btn-area'>
                    <Button className={'${iscomplete}===false'} onClick={(e)=> setiscomplete(false)} variant="success">Todo</Button>{' '}
                    <Button className={'${iscomplete}===true'} onClick={(e)=>setiscomplete(true)} variant="success">Completed</Button>{' '}
                </div>
                <div className='todo-list'>
                        {iscomplete === false && todolist.map((item,index)=>
                        {
                            return(
                                <div className='todo-list-item' key={index}>
                                <div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <p>{item.id}</p>
                                </div>
                                <div>
                                <i className="icon-todo ri-delete-bin-2-line" onClick={(e)=>HandleDelete(index)}></i>
                                <i className="icon-todo ri-check-line" onClick={(e)=>HandleComplete(index)}></i>
                                </div>
                                </div>
                            )
                        })}

                        {iscomplete === true && completedlist.map((item,index)=>{
                            return(
                                <div className='todo-list-item' key={index}>
                                <div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <p>{item.date}</p>
                                </div>
                                <div>
                                <i className="icon-todo ri-delete-bin-2-line" onClick={(e)=>HandleCompleteDelete(index)}></i>
                                </div>
                                </div>
                            )
                            

                        })}
                    
                </div>
            </div>
            </div>
        </div>

    )
}
