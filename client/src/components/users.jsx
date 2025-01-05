import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import User from './user'
import { SpeedDial } from 'primereact/speeddial';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

const Users = () => {

    const [visibleCreate, setVisibleCreate] = useState(false);
    const [usersData, setUsersData] = useState([])
    const [filteredData, setFilteredData] = useState()

    const inputName = useRef(null)
    const inputUserName = useRef(null)
    const inputEmail = useRef(null)
    const inputAdress = useRef(null)
    const inputPhone = useRef(null)
    const inputSearch = useRef(null)


    const getUsers = async () => {

        try {
            const res = await axios.get('http://localhost:4455/api/users')
            if (res.status === 200) {
                console.log(res.data);
                setUsersData(res.data)
            }
        } catch (e) {
            console.error(e)
        }
      
    }



    const createUser = async () => {
        if (!inputUserName.current.value)
            return alert("UserName is required")
        const newUser = {

            name: inputName.current.value,
            userName: inputUserName.current.value,
            email: inputEmail.current.value,
            address: inputAdress.current.value,
            phone: inputPhone.current.value

        }
        try {
            const res = await axios.post('http://localhost:4455/api/users', newUser)
            setUsersData(res.data)
            setVisibleCreate(false)
        } catch (error) {

            console.log(error);
        }


    }

    const updateUser = async (user) => {
        try {
            const res = await axios.put('http://localhost:4455/api/users', user)
            setUsersData(res.data)
        } catch (error) {
            alert(error)
            console.log(error);
        }

    }

    const deleteUser = async (id) => {
        try {

            const res = await axios.delete(`http://localhost:4455/api/users/${id}`)
            if (res.status === 200)
                setUsersData(res.data)
            else if (res.data === "dont found users")
                setUsersData([])
        } catch (error) {
            console.log(error.data);
        }
    }

    const search = () => {
        setFilteredData(usersData.filter((user) => {
           if( user.name.toLowerCase().includes(inputSearch.current.value.toLowerCase())){
            return true
           }

        }))
    }
    const footerContent = (
        <div>
            <Button label="Close" icon="pi pi-times" onClick={() => setVisibleCreate(false)} className="p-button-text" />
            <Button label="Save" icon="pi pi-check" onClick={() => createUser()} autoFocus />
        </div>
    );
    useEffect(() => {
        getUsers()
    }, [])
useEffect(() => {
        search()
    }, [usersData])

    return (<>
        {/* <div class="flex border-bottom-1 surface-border w-full">
    <p class="font-bold mr-3 text-blue-500 w-2">font-bold</p>
    <p class="font-bold w-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
</div> */}

        <h1>users</h1>

        <Button icon="pi pi-user-plus" rounded aria-label="Filter" direction="up-left" style={{ right: -100, bottom: 50 }} tooltip="Add user" onClick={() => setVisibleCreate(true)} />
        <IconField iconPosition="left">
            <InputIcon className="pi pi-search"> </InputIcon>
            <InputText ref={inputSearch} onChange={() => search()} placeholder="Search" />
        </IconField>
        <div class="grid">
          
            {filteredData? filteredData.sort((a,b)=>a.name.localeCompare(b.name)).map((user) => { return <User user={user} updateUser={updateUser} deleteUser={deleteUser} /> }) : (usersData ? usersData.sort((a,b)=>a.name.localeCompare(b.name)).map((user) => { return <User user={user} updateUser={updateUser} deleteUser={deleteUser} /> }) : <></>)}
        </div>

        <Dialog header="Create new user" visible={visibleCreate} style={{ width: '50vw' }} onHide={() => { if (!visibleCreate) return; setVisibleCreate(false); }} footer={footerContent}>

            <div class="field grid"  >
                <label for="name" class="col-12 mb-2 md:col-2 md:mb-0">Name:</label>
                <div class="col-12 md:col-10">
                    <InputText ref={inputName} type='text' /><br />
                </div>
            </div>
            <div class="field grid"  >
                <label for="UserName" class="col-12 mb-2 md:col-2 md:mb-0">UserName:</label>
                <div class="col-12 md:col-10">
                    <InputText ref={inputUserName} type='text' indicateRequired="true" required="true" /><br />
                </div>
            </div>
            <div class="field grid"  >
                <label for="Email" class="col-12 mb-2 md:col-2 md:mb-0">Email:</label>
                <div class="col-12 md:col-10">
                    <InputText type='email' ref={inputEmail} /><br />
                </div>
            </div>
            <div class="field grid"  >
                <label for="Adress" class="col-12 mb-2 md:col-2 md:mb-0">Adress:</label>
                <div class="col-12 md:col-10">
                    <InputText ref={inputAdress} type='text' /><br />
                </div>
            </div>
            <div class="field grid"  >
                <label for="Phone" class="col-12 mb-2 md:col-2 md:mb-0">Phone:</label>
                <div class="col-12 md:col-10">
                    <InputMask ref={inputPhone} type='' mask="999-9999999" /><br />
                </div>
            </div>

        </Dialog>
        {/* <Toast ref={toast} /> */}

    </>
    )
}

export default Users;