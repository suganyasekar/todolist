import React from 'react'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function TodoDB() {
    let [iscomplete, setiscomplete] = useState(false);
    const [id, setid] = useState();
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [todolist, settodolist] = useState([]);
    const [completelist, setcompletelist] = useState([]);


    useEffect(() => {
        fetchData();
    }, []);

    const SearchItem = (index) => {
        fetch('http://localhost:3001/posts' + index,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }

            }).then(function (response) {
                return response.json();
            }).then(function (searchlist) {
                settodolist(searchlist);
            })

    }

    const fetchData = () => {
        fetch('http://localhost:3001/posts'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                var list1 = myJson.filter((item) => item.iscomplete == true);
                var list2 = myJson.filter((item) => item.iscomplete == false);
                settodolist(list2);
                setcompletelist(list1);

            });
    }

    const HandleAdd = () => {
        const mylist = {
            title: title,
            description: description,
            iscomplete: iscomplete,
            id: id
        }

        fetch('http://localhost:3001/posts',
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }, body: JSON.stringify(mylist)
            }).then(fetchData());


        settitle('');
        setdescription('');
    }


    const HandleDelete = (index) => {

        fetch('http://localhost:3001/posts/' + index, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(() => {
            fetchData();
        });

    }

    const HandleComplete = (item) => {
        let completelist = {
            title: item.title,
            description: item.description,
            iscomplete: true,
            id: item.id
        }
        fetch('http://localhost:3001/posts/' + item.id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(completelist)
        }).then(() => fetchData());

    }



    return (
        <div className='App'>
            <h1>My Todos</h1>
            <div className='todo-wrapper'>
                <div className='todo-input-box'>
                    <div className='todo-input-field'>
                        <label>Title:</label>
                        <input type='text' size="sm" value={title} className="mb-3" onChange={(e) => settitle(e.target.value)} placeholder="What is the title of To-do?"></input>
                    </div>
                    <div className='todo-input-field'>
                        <label>Description:</label>
                        <input type='text' size="sm" value={description} className="mb-3" onChange={(e) => setdescription(e.target.value)} placeholder="What is the description of To-do?"></input>
                    </div>
                    <div className='btn-add todo-input-field'>
                        <Button type="submit" onClick={(e) => HandleAdd()} variant="success">Add</Button>{' '}
                    </div>
                </div>
                <div class="search-todo">
                    <div class="txt-search">
                <Form.Control type="text" style={{paddingLeft: "23px"}} placeholder="Search for Title......" /><i class="search-icon ri-search-eye-line"></i>
                    </div>
                </div>
                <div className='Todo-area'>
                    <div className='btn-area'>
                        <Button className={'${iscomplete}===false'} onClick={(e) => setiscomplete(false)} variant="success">Todo</Button>{' '}
                        <Button className={'${iscomplete}===true'} onClick={(e) => setiscomplete(true)} variant="success">Completed</Button>{' '}
                    </div>
                    <div className='todo-list'>
                        {iscomplete === false && todolist.map((item, index) => {
                            return (
                                <div className='todo-list-item' key={index}>
                                    <div>
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                    <div>
                                        <i className="icon-todo ri-delete-bin-2-line" onClick={(e) => HandleDelete(item.id)}></i>
                                        <i className="icon-todo ri-check-line" onClick={(e) => HandleComplete(item)}></i>
                                    </div>
                                </div>
                            )
                        })}

                        {iscomplete === true && completelist.map((item, index) => {
                            return (
                                <div className='todo-list-item' key={index}>
                                    <div>
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                    <div>
                                        <i className="icon-todo ri-delete-bin-2-line" onClick={(e) => HandleDelete(item.id)}></i>
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

export default TodoDB