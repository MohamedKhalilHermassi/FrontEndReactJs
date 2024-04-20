import { lazy } from 'react'
import  { useEffect } from 'react';

//import './App.css'
import LandingPage from './components/landingPage'
import {  Routes, Route ,useNavigate } from 'react-router-dom'
import Dashboard from './components/backOffice/Dashboard'
import AdminLandingPage from './components/backOffice/adminLandingPage'
import Acceuil from './components/acceuil'
import Login from './components/login'
import AddProductForm from './components/sell'
import ProductList from './components/market'
import ProductListBack from './components/backOffice/products'
import Register from './components/register'
import Users from './components/backOffice/users'
import ArchivedProductList from './components/backOffice/archivedProducts'
import OrdersList from './components/backOffice/orders'
import CourseAdd from './components/backOffice/course/courseAdd'
import CourseList from './components/backOffice/course/courseList'
import { Toaster } from 'react-hot-toast'
import MyProducts from './components/myproducts'
import SessionAdd from './components/backOffice/Session/SessionAdd'
import SessionList from './components/backOffice/Session/SessionList'
import SessionListS from './components/backOffice/Session/SessionListS'
import SessionEdit from './components/backOffice/Session/SessionEdit'
import ListS from './components/backOffice/Session/ListS'
import Schedul from './components/schedul'
import SessionDrag from './components/backOffice/Session/SessionDrag'
import Reclamtions from './components/Reclamtions'
import Editadmin from './components/backOffice/editadmin'
import Recla from './components/backOffice/reclamationadmin'
import AuthService from './service/AuthService';
import MyCourses from './components/myCourses';
import ClassroomAdd from './components/backOffice/classroom/classroomAdd';
import AddLocation from './components/backOffice/location/addLocation';
import LocationList from './components/backOffice/location/locationList';
import EventList from './components/backOffice/event/eventList.jsx'
import AddEvent from './components/backOffice/event/addEvent.jsx'
import EditEvent from './components/backOffice/event/editEvent.jsx'
import EventsCalendar from './components/backOffice/event/eventsCalendar.jsx'
import EventRegister from './components/eventRegister'
import MyEvents from './components/myevents'
import RegisteredUsers from './components/backOffice/event/registeredUsers.jsx';

import AddBook from './components/backOffice/addBook';
import BookList from './components/backOffice/booklist';
import BookStore from './components/bookStore';
import Guitar from './components/skills';
import MyOrders from './components/myOrders';
import MyBooks from './components/myBooks';
import SoldProducts from './components/backOffice/soldProducts';
import TeacherCourses from './components/teacherCourses.jsx';
import StudentsList from './components/studentsList.jsx';
import UserNotes from './components/userNores.jsx';
import Location from './components/backOffice/location/location';
import PricingPack from './components/subscription/pricingPack.jsx';
import Chat from './components/realtime-chat/Chat.jsx';
import TeacherMessageSender from './components/realtime-chat/teacherSend.jsx';
import StudentMessageReplier from './components/realtime-chat/studentSend.jsx';
import TransactionList from './components/backOffice/transactionList.jsx';

const Events = lazy(()=> import("./components/events"));
const Profil = lazy(()=> import("./components/profil"));
const Courses = lazy(()=> import ("./components/courses"));
function App() {
  const navigate = useNavigate();
  const excludedRoutes = ["/signin", "/register","/events","/courses","/market","/pricing-pack"];
  const adminRoutes = ["/admin", "/admin/products","/admin/user","/admin/editadmin", "/admin/addsession","/admin/listsession", "/admin/listsession2", "/admin/editSession", "/admin/ListS", "/admin/ListDrag", "/admin/courses", "/admin/addcourse", "/admin/locations", "/admin/map", "/admin/addlocation", "/admin/addclassroom", "/admin/Archivedproducts", "/admin/ordersList", "/admin/products", "/admin/events", "/admin/addevent", "/admin/edit-event", "/admin/eventscalendar", "/admin/registeredusers"];
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    
    if (!excludedRoutes.includes(window.location.pathname) && AuthService.isTokenExpired(token)) {
      AuthService.logout(); 
      navigate('/');
    }
  }, [navigate]);
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (adminRoutes.includes(window.location.pathname) && !AuthService.hasPermission(token,"admin")) {
      navigate('/');
    }
  }, [navigate]);

  

  return (

    <>
     
<div><Toaster position="top-right"/></div>


<div>
    <Routes>
      <Route path="" element={<LandingPage />}>
        <Route path="" element={<Acceuil />} />
        <Route path="events" element={<Events />} />
        <Route path="bookstore" element={<BookStore />} />
        <Route path="skills" element={<Guitar />} />
       <Route path="pricing-pack" element={<PricingPack/>} />
        <Route path="courses" element={<Courses />} />
        <Route path="market" element={<AddProductForm />} />
        <Route path="marketplace" element={<ProductList />} />
        <Route path="Profil" element={<Profil />} />
        <Route path = "myproducts" element={<MyProducts/>}></Route>
        <Route path = "myorders" element={<MyOrders/>}></Route>
        <Route path = "mybooks" element={<MyBooks/>}></Route>
        <Route path = "teachercourses" element={<TeacherCourses/>}></Route>
        <Route path = "/studentsList/:courseId" element={<StudentsList/>}></Route>

        <Route path = "mycourses" element={<MyCourses/>}></Route>
        <Route path = "schedule" element={<Schedul/>}></Route>
        <Route path='add-session/:id' element={<SessionAdd />} />

        <Route path='add-session' element={<SessionAdd/>}></Route>
        <Route path = "reclamation" element={<Reclamtions/>}></Route>
        <Route path = "eventRegister" element={<EventRegister/>}></Route>
        <Route path = "myevents" element={<MyEvents/>}></Route>
        <Route path = "mymarks" element={<UserNotes/>}></Route>
        <Route path = "chat" element={<Chat/>}></Route>
        <Route path = "teacherSend/:studentId" element={<TeacherMessageSender/>}></Route>
        <Route path = "studentSend" element={<StudentMessageReplier/>}></Route>


      </Route>

      {/* Section d'administration */}
    
        <Route path="admin" element={<Dashboard />}>
          <Route path="" element={<AdminLandingPage />} />
          <Route path="user" element={<Users />} />
          <Route path="addBook" element={<AddBook />} />
          <Route path="books" element={<BookList />} />
          <Route path="soldproducts" element={<SoldProducts />} />

          <Route path="editadmin" element={<Editadmin />} />
          <Route path="reclamaation" element={<Recla />} />
          
          <Route path="addsession" element={<SessionAdd/>} />
          <Route path="listsession" element={<SessionList/>} />
          <Route path="listsession2" element={<SessionListS/>} />
          <Route path="editSession/:id" element={<SessionEdit/>} />
          <Route path="ListS" element={<ListS/>} />
          <Route path="ListDrag" element={<SessionDrag/>} />
          <Route path="courses" element={<CourseList/>} />
          <Route path="addcourse" element={<CourseAdd/>} />
          <Route path='location/:locationId' element={<Location/>}/>
          <Route path="locations" element={<LocationList/>} />
          <Route path="addlocation" element={<AddLocation/>} />
          <Route path="addclassroom/:locationId" element={<ClassroomAdd/>} />
          <Route path='Archivedproducts' element={<ArchivedProductList/>}/>
          <Route path='ordersList' element={<OrdersList/>}/>
          <Route path='products' element={<ProductListBack></ProductListBack>}/>
          <Route path="events" element={<EventList/>}/>
          <Route path="addevent" element={<AddEvent/>}/>
          <Route path="edit-event/:id" element={<EditEvent/>} />
          <Route path="eventscalendar" element={<EventsCalendar/>} />
          <Route path="registeredusers" element={<RegisteredUsers/>} />
          <Route path = "user" element={<Users/>}></Route>
          <Route path = "trasnsactionList" element={<TransactionList/>}></Route>


        </Route>
    

      {/* Routes signin et register */}
      <Route path="signin" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
    </div>
      </>
  );

}

export default App


