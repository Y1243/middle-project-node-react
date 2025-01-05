
import React, { useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';

const User = (props) => {
    const [visibleDetails, setVisibleDetails] = useState(false);
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const inputName = useRef(null)
    const inputUserName = useRef(null)
    const inputEmail = useRef(null)
    const inputAdress = useRef(null)
    const inputPhone = useRef(null)

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
    //
    const footer = (
        <>
            <Button severity="danger" icon="pi pi-trash" tooltip="Delete" tooltipOptions={{ position: 'bottom' }} onClick={() => setVisibleDelete(true)} />
            <Button severity='info' icon="pi pi-pencil" style={{ marginLeft: '0.5em' }} tooltip="Update" tooltipOptions={{ position: 'bottom' }} onClick={() => setVisibleUpdate(true)} />
            <Button severity="warning" icon="pi pi-eye" style={{ marginLeft: '0.5em' }} tooltip="More details" tooltipOptions={{ position: 'bottom' }} onClick={() => setVisibleDetails(true)} />
        </>

    );

    const update = () => {
        if(!inputUserName.current.value)
            return alert("UserName is required")
        
        const user = {
            id: props.user._id,
            name: inputName.current.value,
            userName: inputUserName.current.value,
            email: inputEmail.current.value,
            address: inputAdress.current.value,
            phone: inputPhone.current.value ? inputPhone.current.value : props.user.phone

        }
        props.updateUser(user)
        setVisibleUpdate(false)

    }

    const del = () => {
        console.log(props.user._id);
        props.deleteUser(props.user._id)
        setVisibleDelete(false)
    }

    return (
        
        <div class="col-12 md:col-6 lg:col-3">
            <div class="text-center p-3 border-round-sm bg-primary font-bold" className="card flex justify-content-center">
                <Card title={props.user.name} footer={footer} header={header} className="md:w-25rem">
                    <Dialog header={props.user.name} visible={visibleDetails} style={{ width: '50vw' }} onHide={() => { if (!visibleDetails) return; setVisibleDetails(false); }} >
                        <p class="flex border-bottom-1 surface-border w-full" className="m-0" style={{ fontSize: 20 }}>

                            {props.user.userName ? <><span class="font-bold w-10">userName:</span>{props.user.userName}<br /></> : <></>}
                            {props.user.email ? <><span class="font-bold w-10">email:</span>{props.user.email}<br /></> : <></>}
                            {props.user.address ? <><span class="font-bold w-10">address:</span>{props.user.address}<br /></> : <></>}
                            {props.user.phone ? <><span class="font-bold w-10">phone:</span>{props.user.phone}<br /></> : <></>}

                        </p>
                    </Dialog>
                    <Dialog header={props.user.name} visible={visibleUpdate} style={{ width: '50vw' }} onHide={() => { if (!visibleUpdate) return; setVisibleUpdate(false); }} footer={footerContent}>

                        <div class="field grid"  >
                            <label for="name" class="col-12 mb-2 md:col-2 md:mb-0">Name:</label>
                            <div class="col-12 md:col-10">
                                <InputText ref={inputName} type='text' defaultValue={props.user.name} /><br />
                            </div>
                        </div>
                        <div class="field grid"  >
                            <label for="UserName" class="col-12 mb-2 md:col-2 md:mb-0">UserName:</label>
                            <div class="col-12 md:col-10">
                                <InputText ref={inputUserName} required="true" type='text' defaultValue={props.user.userName} /><br />
                            </div>
                        </div>
                        <div class="field grid"  >
                            <label for="Email" class="col-12 mb-2 md:col-2 md:mb-0">Email:</label>
                            <div class="col-12 md:col-10">
                                <InputText type='email' ref={inputEmail} defaultValue={props.user.email} /><br />
                            </div>
                        </div>
                        <div class="field grid"  >
                            <label for="Adress" class="col-12 mb-2 md:col-2 md:mb-0">Adress:</label>
                            <div class="col-12 md:col-10">
                                <InputText ref={inputAdress} type='text' defaultValue={props.user.address} /><br />
                            </div>
                        </div>
                        <div class="field grid"  >
                            <label for="Phone" class="col-12 mb-2 md:col-2 md:mb-0">Phone:</label>
                            <div class="col-12 md:col-10">
                                <InputMask  ref={inputPhone} type='' placeholder={props.user.phone} mask="999-9999999" /><br />
                            </div>
                        </div>

                    </Dialog>
                    <Dialog header={props.user.name} visible={visibleDelete} style={{ width: '50vw' }} onHide={() => { if (!visibleDelete) return; setVisibleDelete(false); }} footer={footerDelete}>
                        <p className="m-0" style={{ fontSize: 20 }}>
                            Are you sure that you want to remove this user?
                        </p>
                    </Dialog>
                </Card>
            </div></div>
    )
}

export default User;

