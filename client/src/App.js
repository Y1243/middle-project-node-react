import logo from './logo.svg';
import './App.css';
import { TabMenu } from 'primereact/tabmenu';
//import { useRouter } from 'next/router';
import { Link, Route, Router, Routes,useNavigate  } from 'react-router-dom'

import { Menubar } from 'primereact/menubar';
import Users from './components/users';
import Posts from './components/posts';
import Todos from './components/todos';
function App() {
  //const router = useRouter();
  const navigate = useNavigate();
  const items = [
    {
      label: 'Users',
      icon: 'pi pi-users',
      to: '/users' 
    },
    {
      label: 'Posts',
      icon: 'pi pi-file',
      to: '/posts'
    },
    {
      label: 'Todos',
      icon: 'pi pi-list',
      to: '/todos'
    }
  ];
  const menuModel = items.map(item => ({
    label: (
      <Link to={item.to}  style={{ color:'black' ,textDecoration: 'none' }}>
        <span>{item.label}</span>
      </Link>
    ),
    icon: item.icon,
  }));

  return (<>
    <div className="card">
      <Menubar model={menuModel} />
    </div>
    <Routes>
      <Route path='/posts' element={<Posts/>}/>
      <Route path='/users' element={<Users/>}/>
      <Route path='/todos' element={<Todos/>}/>
      </Routes></>
  )
  
}




export default App;
