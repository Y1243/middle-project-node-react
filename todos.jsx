import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import Todo from './todo'
import { SpeedDial } from 'primereact/speeddial';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';

const Todos = () => {

    const [visibleCreate, setVisibleCreate] = useState(false);
    const [todosData, setTodosData] = useState([])

    const inputTitle = useRef(null)
    const inputTags = useRef(null)

    const getTodos = async () => {

        try {
            const res = await axios.get('http://localhost:4455/api/todos')
            if (res.status === 200) {
                console.log(res.data);
                setTodosData(res.data)
            }
        } catch (e) {
            console.error(e)
        }

    }



    const createTodo = async () => {

        if (!inputTitle.current.value)
            return alert("Title is required")
        const newTodo = {
            title: inputTitle.current.value,
            tags: inputTags.current.value.split(","),
        }
        try {
            const res = await axios.post('http://localhost:4455/api/todos', newTodo)
            setTodosData(res.data)
            setVisibleCreate(false)
        } catch (error) {

            console.log(error);
        }


    }

    const updateTodo = async (todo) => {
        try {
            const res = await axios.put('http://localhost:4455/api/todos', todo)
            setTodosData(res.data)
        } catch (error) {
            alert(error)
            console.log(error);
        }

    }

    const deleteTodo = async (id) => {
        try {

            const res = await axios.delete(`http://localhost:4455/api/todos/${id}`)
            if (res.status === 200)
                setTodosData(res.data)
            else if (res.data === "dont found todos")
                setTodosData([])
        } catch (error) {
            console.log(error.data);
        }
    }

    const updateComplete = async (id) => {
        try {

            const res = await axios.put(`http://localhost:4455/api/todos/${id}`)
            
                setTodosData(res.data)
    
        } catch (error) {
            console.log(error.data);
        }
    }

    const footerContent = (
        <div>
            <Button label="Close" icon="pi pi-times" onClick={() => setVisibleCreate(false)} className="p-button-text" />
            <Button label="Save" icon="pi pi-check" onClick={() => createTodo()} autoFocus />
        </div>
    );
    useEffect(() => {
        getTodos()
    }, [])

    return (<>


        <h1>todos</h1>

        <Button icon="pi pi-plus" rounded aria-label="Filter" direction="up-left" style={{ right: -100, bottom: 50 }} tooltip="Add todo" onClick={() => setVisibleCreate(true)} />

        <div class="grid">
            {todosData ? todosData.map((todo) => { return <Todo todo={todo} updateComplete={updateComplete} updateTodo={updateTodo} deleteTodo={deleteTodo} /> }) : <></>}
        </div>

        <Dialog header="Create new todo" visible={visibleCreate} style={{ width: '50vw' }} onHide={() => { if (!visibleCreate) return; setVisibleCreate(false); }} footer={footerContent}>

            <div class="field grid"  >
                <label for="title" class="col-12 mb-2 md:col-2 md:mb-0">Title:</label>
                <div class="col-12 md:col-10">
                    <InputText ref={inputTitle} type='text' /><br />
                </div>
            </div>

            <div class="field grid"  >
                <label for="Tags" class="col-12 mb-2 md:col-2 md:mb-0">Tags:</label>
                <div class="col-12 md:col-10">
                    <InputText ref={inputTags} rows={5} cols={30} /><br/>
                    <small id="username-help">
                    Insert tags, insert comma as separator.
                    </small>
                </div>
            </div>

        </Dialog>


    </>
    )
}

export default Todos;