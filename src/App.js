import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link, Outlet  } from 'react-router-dom';
import Brands from './pages/Brands';
import Products from './pages/Products';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import ProductType from './pages/ProductType';
import Supplier from './pages/Supplier';
import Supply from './pages/Supply';
import Checks from './pages/Checks';
import { AuthContext } from './context/authContext';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import { UserRole } from './api/Constants';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
      if (localStorage.getItem('auth')) {
          setIsAuth(true)
          setUserRole(localStorage.getItem('role'))
      }
      setLoading(false);
  }, [])

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth')
  }

  function RoleRoutes (props) {
    console.log(props.userRole);
    if (props.userRole === UserRole.ADMIN){
      return (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="brands" element={<Brands />} />
            <Route path="products" element={<Products />} />
            <Route path="productTypes" element={<ProductType />} />
            <Route path="suppliers" element={<Supplier />} />
            <Route path="supplies" element={<Supply />} />
            <Route path="*" element={<Login />}/>
          </Route>
        </Routes>
      )
    }
    else {
      return (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="*" element={<Login />}/>
            <Route path="checks" element={<Checks />} />
          </Route>
        </Routes>
      )
    }
  }

  return (
    <AuthContext.Provider value={{
        isAuth,
        setIsAuth,
        isLoading,
        setUserRole
    }}>
      <BrowserRouter>
        {isAuth
          ?
            <RoleRoutes userRole={userRole}/>
          :
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="login" element={<Login />} />
                <Route path="*" element={<Login />}/>
              </Route>
            </Routes>
        }
          
      </BrowserRouter>
    </AuthContext.Provider>
  );

  function Layout() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Link to="/" className="navbar-brand" >HairShop</Link>
            {isAuth
              ?
              <NavLink userRole={userRole} />
              :
              <Nav className="me-auto">
                <Link to="login" className="nav-link" >Войти</Link>
              </Nav>
            }
            <div className="">
              <Button variant="secondary" onClick={logout}>Выйти</Button>
            </div>
          </Container>
        </Navbar>
        {/* An <Outlet> renders whatever child route is currently active,
            so you can think about this <Outlet> as a placeholder for
            the child routes we defined above. */}
        <Container className="pt-3">
          <Outlet />
        </Container>
      </div>
    );
  }
}

function NavLink(props) {
  ///console.log(props.userRole);
  if (props.userRole === UserRole.ADMIN){
    return (
      <Nav className="me-auto">
        <Link to="/brands" className="nav-link" >Бренды</Link>
        <Link to="/products" className="nav-link" >Складские остатки</Link>
        <Link to="/productTypes" className="nav-link" >Типы товаров</Link>
        <Link to="/suppliers" className="nav-link" >Поставщики</Link>
        <Link to="/supplies" className="nav-link" >Поставка товара</Link>
      </Nav>
    )
  }
  else {
    return (
      <Nav className="me-auto">
        <Link to="/checks" className="nav-link" >Оформление покупки</Link>
      </Nav>
    )
  }
}

export default App