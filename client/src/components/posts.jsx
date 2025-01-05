import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import Post from './post'
import { SpeedDial } from 'primereact/speeddial';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

const Posts = () => {

    const [visibleCreate, setVisibleCreate] = useState(false);
    const [postsData, setPostsData] = useState([])
    const [filteredData, setFilteredData] = useState()

    const inputTitle = useRef(null)
    const inputBody = useRef(null)
    const inputSearch = useRef(null)

    const getPosts = async () => {
        
        try {
            const res = await axios.get('http://localhost:4455/api/posts')
            if (res.status === 200) {
                console.log(res.data);
                setPostsData(res.data)
            }
        } catch (e) {
            console.error(e)
        }

    }

  

    const createPost = async () => {
        if(!inputTitle.current.value)
               return alert("Title is required")
       const newPost = {

            title: inputTitle.current.value,
            body: inputBody.current.value,
         
        }
        try {
            const res = await axios.post('http://localhost:4455/api/posts',newPost)
             setPostsData(res.data)
        setVisibleCreate(false)
        } catch (error) {
            
            console.log(error);
        }
        
       
    }

    const updatePost = async (post) => {
        try {
            const res = await axios.put('http://localhost:4455/api/posts', post)
        setPostsData(res.data)
        } catch (error) {
            alert(error)
            console.log(error);
        }
       
    }

    const deletePost = async (id) => {
        try {

            const res = await axios.delete(`http://localhost:4455/api/posts/${id}`)
            if (res.status === 200)
                setPostsData(res.data)
            else if (res.data === "dont found posts")
                setPostsData([])
        } catch (error) {
            console.log(error.data);
        }
    }
    const search = () => {
        setFilteredData(postsData.filter((post) => {
           if( post.title.toLowerCase().includes(inputSearch.current.value.toLowerCase())){
            return true
           }

        }))
    }

    const footerContent = (
        <div>
            <Button label="Close" icon="pi pi-times" onClick={() => setVisibleCreate(false)} className="p-button-text" />
            <Button label="Save" icon="pi pi-check" onClick={() => createPost()} autoFocus />
        </div>
    );

    useEffect(() => {getPosts()},[])
    
    useEffect(() => {
        search()
}, [postsData])

    return (<>

 
        <h1>posts</h1>

        <Button icon="pi pi-file-plus" rounded aria-label="Filter" direction="up-left" style={{ right:-100, bottom:50}} tooltip="Add post" onClick={()=>setVisibleCreate(true)}/>
        <IconField iconPosition="left">
            <InputIcon className="pi pi-search"> </InputIcon>
            <InputText ref={inputSearch} onChange={() => search()} placeholder="Search" />
        </IconField>
        <div class="grid">
            {filteredData ?filteredData.map((post) => {return <Post post={post} updatePost={updatePost} deletePost={deletePost} />}):(postsData ?postsData.map((post) => {return <Post post={post} updatePost={updatePost} deletePost={deletePost} />}) : <></>)}
        </div>

        <Dialog header="Create new post" visible={visibleCreate} style={{ width: '50vw' }} onHide={() => { if (!visibleCreate) return; setVisibleCreate(false); }} footer={footerContent}>

            <div class="field grid"  >
                <label for="title" class="col-12 mb-2 md:col-2 md:mb-0">Title:</label>
                <div class="col-12 md:col-10">
                    <InputText ref={inputTitle} type='text' /><br />
                </div>
            </div>
            
            <div class="field grid"  >
                <label for="Body" class="col-12 mb-2 md:col-2 md:mb-0">Body:</label>
                <div class="col-12 md:col-10">
                <InputTextarea ref={inputBody}  rows={5} cols={30} />
                </div>
            </div>

        </Dialog>
      
        
    </>
    )
}

export default Posts;