import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/userpages/Login";
import Signup from "./pages/userpages/Signup";
import 'react-toastify/dist/ReactToastify.css';
import AddProduct from "./pages/AddProduct";
import PrivateRoute from "./components/routes/Private";
import Dashboard from "./pages/user/Dashboard";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";
import CartPage from "./pages/CartPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return <>     
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/search" element={<SearchPage/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/dashboard" element={<PrivateRoute/>}>
        <Route path="user" element={<Dashboard/>}/>
        <Route path="user/profile" element={<Profile/>}/>
        <Route path="user/orders" element={<Orders/>}/>
      </Route>
      <Route path="/dashboard" element={<AdminRoute/>}>
        <Route path="admin" element={<AdminDashboard/>}/>
        <Route path="admin/create-category" element={<CreateCategory/>}/>
        <Route path="admin/create-product" element={<CreateProduct/>}/>
        <Route path="admin/update-product/:id" element={<UpdateProduct/>}/>
        <Route path="admin/products" element={<Products/>}/>
        <Route path="admin/users" element={<Users/>}/>
      </Route>

      <Route path="/contact" element={<Contact/>}/>
      <Route path="/policy" element={<Policy/>}/>
      <Route path="/pgnotfound" element={<PageNotFound/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/additem" element={<AddProduct/>}/>
      <Route path="/cart" element={<CartPage/>}/>
      
    </Routes>
    </>
  
}

export default App;
