
import React, { useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { InputTextarea } from 'primereact/inputtextarea';

const Post = (props) => {
    const [visibleDetails, setVisibleDetails] = useState(false);
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const inputTitle = useRef(null)
    const inputBody = useRef(null)

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
        </>

    );

    const update = () => {
        if(!inputTitle.current.value)
            return alert("Title is required")
        
        const post = {
            id: props.post._id,
            title: inputTitle.current.value,
            body: inputBody.current.value,
         
        }
        props.updatePost(post)
        setVisibleUpdate(false)

    }

    const del = () => {
        console.log(props.post._id);
        props.deletePost(props.post._id)
        setVisibleDelete(false)
    }

    return (
        
        <div class="col-12 md:col-6 lg:col-3">
            <div class="text-center p-3 border-round-sm bg-primary font-bold" className="card flex justify-content-center">
                <Card title={props.post.title} footer={footer} header={header} className="md:w-25rem">
                    <Dialog header={props.post.title} visible={visibleDetails} style={{ width: '50vw' }} onHide={() => { if (!visibleDetails) return; setVisibleDetails(false); }} >
                        <p class="flex border-bottom-1 surface-border w-full" className="m-0" style={{ fontSize: 20 }}>

                            {props.post.body}
                        </p>
                    </Dialog>
                    <Dialog header={props.post.title} visible={visibleUpdate} style={{ width: '50vw' }} onHide={() => { if (!visibleUpdate) return; setVisibleUpdate(false); }} footer={footerContent}>

                    <div class="field grid"  >
                <label for="title" class="col-12 mb-2 md:col-2 md:mb-0">Title:</label>
                <div class="col-12 md:col-10">
                    <InputText defaultValue={props.post.title} ref={inputTitle} type='text' /><br />
                </div>
            </div>
            
            <div class="field grid"  >
                <label for="Body" class="col-12 mb-2 md:col-2 md:mb-0">Body:</label>
                <div class="col-12 md:col-10">
                <InputTextarea ref={inputBody} defaultValue={props.post.body} rows={7} cols={70} />
                </div>
            </div>
                    </Dialog>
                    <Dialog header={props.post.title} visible={visibleDelete} style={{ width: '50vw' }} onHide={() => { if (!visibleDelete) return; setVisibleDelete(false); }} footer={footerDelete}>
                        <p className="m-0" style={{ fontSize: 20 }}>
                            Are you sure that you want to remove this post?
                        </p>
                    </Dialog>
                </Card>
            </div></div>
    )
}

export default Post;

