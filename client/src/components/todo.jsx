
import React, { useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { InputSwitch } from 'primereact/inputswitch';
        

const Todo = (props) => {
    const [visibleDetails, setVisibleDetails] = useState(false);
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [completed, setCompleted] = useState(props.todo.complete);
    const inputTitle = useRef(null)
    const inputTags = useRef(null)

    const footerDelete = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisibleDelete(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => del()} autoFocus />
        </div>
    );
    const footerContent = (
        <div>
            <Button label="Close" icon="pi pi-times" onClick={() => setVisibleUpdate(false)} className="p-button-text" />
            <Button label="Save" icon="pi pi-check" onClick={() => update()} autoFocus />
        </div>
    );
    const header = (
        <img alt="Card" src= "https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
    const footer = (
        <>
            <Button severity="danger" icon="pi pi-trash" tooltip="Delete" tooltipOptions={{ position: 'bottom' }} onClick={() => setVisibleDelete(true)} />
            <Button severity='info' icon="pi pi-pencil" style={{ marginLeft: '0.5em' }} tooltip="Update" tooltipOptions={{ position: 'bottom' }} onClick={() => setVisibleUpdate(true)} />
            <Button severity="warning" icon="pi pi-eye" style={{ marginLeft: '0.5em' }} tooltip="Show" tooltipOptions={{ position: 'bottom' }} onClick={() => setVisibleDetails(true)} />
            <InputSwitch checked={completed}style={{ marginLeft: '0.5em' }} tooltip="Complete" onChange={(e) =>{
                props.updateComplete(props.todo._id)
                setCompleted(!completed)} } />
        </>

    );

    const update = () => {
        if(!inputTitle.current.value)
            return alert("Title is required")
        
        const todo = {
            id: props.todo._id,
            title: inputTitle.current.value,
            tags: inputTags.current.value.split(','),
         
        }
        props.updateTodo(todo)
        setVisibleUpdate(false)

    }

    const del = () => {
        console.log(props.todo._id);
        console.log(props.todo.title);
        props.deleteTodo(props.todo._id)
        setVisibleDelete(false)
    }

    return (
        
        <div class="col-12 md:col-6 lg:col-3">
            <div class="text-center p-3 border-round-sm bg-primary font-bold" className="card flex justify-content-center">
                <Card title={props.todo.title} footer={footer} header={header} className="md:w-25rem">
                    <Dialog header={props.todo.title} visible={visibleDetails} style={{ width: '50vw' }} onHide={() => { if (!visibleDetails) return; setVisibleDetails(false); }} >
                        <p class="flex border-bottom-1 surface-border w-full" className="m-0" style={{ fontSize: 20 }}>

                            {props.todo.tags.map((tag)=>{
                                return <p>{tag}</p>
                            })}
                        </p>
                    </Dialog>
                    <Dialog header={props.todo.title} visible={visibleUpdate} style={{ width: '50vw' }} onHide={() => { if (!visibleUpdate) return; setVisibleUpdate(false); }} footer={footerContent}>

                    <div class="field grid"  >
                <label for="title" class="col-12 mb-2 md:col-2 md:mb-0">Title:</label>
                <div class="col-12 md:col-10">
                    <InputText defaultValue={props.todo.title} ref={inputTitle} type='text' /><br />
                </div>
            </div>
            
            <div class="field grid"  >
                <label for="Tags" class="col-12 mb-2 md:col-2 md:mb-0">Tags:</label>
                <div class="col-12 md:col-10">
                <InputText ref={inputTags} defaultValue={props.todo.tags}/><br/>
                    <small id="username-help">
                    Insert tags, insert comma as separator.
                    </small>
                </div>
            </div>
                    </Dialog>
                    <Dialog header={props.todo.title} visible={visibleDelete} style={{ width: '50vw' }} onHide={() => { if (!visibleDelete) return; setVisibleDelete(false); }} footer={footerDelete}>
                        <p className="m-0" style={{ fontSize: 20 }}>
                            Are you sure that you want to remove this todo?
                        </p>
                    </Dialog>
                </Card>
            </div></div>
    )
}

export default Todo;

